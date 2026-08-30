import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { 
  Download, 
  Save, 
  ArrowLeft, 
  Layout, 
  Sparkles, 
  RotateCcw, 
  Maximize2, 
  Palette, 
  Type, 
  ShieldCheck, 
  FileText, 
  Check, 
  Upload, 
  X,
  History as HistoryIcon, 
  FileCode,
  ChevronDown,
  ChevronUp,
  Copy,
  HelpCircle,
  Target 
} from 'lucide-react';
import SectionForm from '../components/editor/SectionForm';
import LivePreview from '../components/editor/LivePreview';
import AIMatch from '../components/editor/AIMatch';
import ResumeImporter from '../components/editor/ResumeImporter';
import GuidedWizard from '../components/editor/GuidedWizard';
import TailorResumeModal from '../components/editor/TailorResumeModal';
import InterviewPrep from '../components/editor/InterviewPrep';
import { api } from '../utils/api';
import { calculateLiveAtsScore } from '../utils/ai';

const DEFAULT_RESUME = {
  personal: { name: '', role: '', email: '', phone: '', location: '', linkedin: '', summary: '' },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: []
};

const RESUME_PRESETS = {
  software_engineer: {
    template: 'modern',
    data: {
      personal: {
        name: 'Jordan Alexander',
        role: 'Senior Full Stack Engineer',
        email: 'jordan.a@example.com',
        phone: '+1 (555) 012-3456',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/jordanalexander',
        summary: 'Innovative Full Stack Engineer with 8+ years of experience in building scalable web applications. Expert in React, Node.js, and Cloud Infrastructure. Proven track record of leading engineering teams and delivering high-impact products.'
      },
      experience: [
        {
          id: '1',
          company: 'TechFlow Solutions',
          role: 'Senior Software Engineer',
          location: 'Remote',
          startDate: '2021-03',
          endDate: 'Present',
          description: '• Architected and developed a real-time data visualization platform using React and D3.js.\n• Optimized database queries, resulting in a 40% reduction in page load times.\n• Mentored a team of 5 junior developers and implemented CI/CD pipelines.'
        },
        {
          id: '2',
          company: 'CloudScale Inc.',
          role: 'Full Stack Developer',
          location: 'San Francisco, CA',
          startDate: '2018-06',
          endDate: '2021-02',
          description: '• Developed microservices using Node.js and Go for a high-traffic e-commerce backend.\n• Collaborative with UX designers to implement responsive, accessible user interfaces.'
        }
      ],
      education: [
        {
          id: 'e1',
          school: 'Stanford University',
          degree: 'B.S. in Computer Science',
          location: 'Stanford, CA',
          startDate: '2014-09',
          endDate: '2018-05',
          description: 'Specialization in Systems and Networks. GPA: 3.9/4.0'
        }
      ],
      skills: [
        { id: 's1', name: 'JavaScript (ES6+)', level: 'Expert' },
        { id: 's2', name: 'React & Next.js', level: 'Expert' },
        { id: 's3', name: 'Node.js & Express', level: 'Advanced' },
        { id: 's4', name: 'PostgreSQL & MongoDB', level: 'Advanced' },
        { id: 's5', name: 'AWS (S3, EC2, Lambda)', level: 'Intermediate' }
      ],
      projects: [
        {
          id: 'p1',
          name: 'AI Resume Analytics Engine',
          technologies: 'React, Node.js, OpenAI API',
          link: 'github.com/jordanalexander/resume-ai',
          description: 'Built an open-source resume analysis tool that scores bullet points and extracts missing ATS keywords.'
        }
      ],
      certifications: [
        { id: 'c1', name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2023' }
      ],
      languages: [
        { id: 'l1', name: 'English', proficiency: 'Native' },
        { id: 'l2', name: 'Spanish', proficiency: 'Professional' }
      ]
    }
  },
  data_analyst: {
    template: 'tech',
    data: {
      personal: {
        name: 'Alex Rivera',
        role: 'Senior Data & Analytics Lead',
        email: 'alex.rivera@example.com',
        phone: '+1 (555) 234-5678',
        location: 'Chicago, IL',
        linkedin: 'linkedin.com/in/alexrivera-data',
        summary: 'Analytical Data Specialist with expertise in SQL, Python, Tableau, and business intelligence pipelines. Experienced in translating complex datasets into actionable business strategies.'
      },
      experience: [
        {
          id: '1',
          company: 'DataMetrics Corp',
          role: 'Lead Business Intelligence Analyst',
          location: 'Chicago, IL',
          startDate: '2020-05',
          endDate: 'Present',
          description: '• Built automated ETL data pipelines in Python and SQL, saving 15 hours of manual reporting weekly.\n• Designed interactive executive Tableau dashboards used by senior leadership.'
        }
      ],
      education: [
        { id: 'e1', school: 'University of Chicago', degree: 'B.S. in Statistics & Data Science', location: 'Chicago, IL', year: '2019' }
      ],
      skills: [
        { id: 's1', name: 'Python & Pandas' },
        { id: 's2', name: 'SQL & PostgreSQL' },
        { id: 's3', name: 'Tableau & PowerBI' },
        { id: 's4', name: 'A/B Testing & Statistics' }
      ]
    }
  },
  marketing_manager: {
    template: 'creative',
    data: {
      personal: {
        name: 'Sarah Chen',
        role: 'Senior Marketing Strategist',
        email: 'sarah.mkt@example.com',
        phone: '+1 (555) 987-6543',
        location: 'New York, NY',
        linkedin: 'linkedin.com/in/sarahchen-mkt',
        summary: 'Dynamic Marketing Professional with a passion for storytelling and data-driven growth. Specialist in brand positioning, content strategy, and multi-channel campaign management for global lifestyle brands.'
      },
      experience: [
        {
          id: '1',
          company: 'Vanguard Media Group',
          role: 'Head of Growth Marketing',
          location: 'New York, NY',
          startDate: '2020-01',
          endDate: 'Present',
          description: '• Increased organic traffic by 150% through aggressive SEO and content marketing strategies.\n• Managed a $2M annual performance marketing budget with a 4.5x ROAS.\n• Launched a viral social media campaign that generated 50M+ impressions.'
        }
      ],
      education: [
        {
          id: 'e1',
          school: 'Columbia Business School',
          degree: 'MBA in Marketing Management',
          location: 'New York, NY',
          startDate: '2017-09',
          endDate: '2019-05',
          description: 'Dean\'s List. President of the Marketing Association.'
        }
      ],
      skills: [
        { id: 's1', name: 'Growth Marketing', level: 'Expert' },
        { id: 's2', name: 'Content Strategy', level: 'Expert' },
        { id: 's3', name: 'SEO/SEM', level: 'Advanced' },
        { id: 's4', name: 'Brand Management', level: 'Advanced' }
      ]
    }
  },
  executive: {
    template: 'executive',
    data: {
      personal: {
        name: 'Marcus Thorne',
        role: 'Chief Operations Officer',
        email: 'm.thorne@globalcorp.com',
        phone: '+1 (555) 444-3322',
        location: 'Austin, TX',
        linkedin: 'linkedin.com/in/marcusthorne-exec',
        summary: 'Strategic Operations Executive with 15+ years of leadership in streamlining corporate workflows and driving profitability. Expert in P&L management, organizational transformation, and global supply chain optimization.'
      },
      experience: [
        {
          id: '1',
          company: 'Global Logistics Corp.',
          role: 'VP of Operations',
          location: 'Dallas, TX',
          startDate: '2015-11',
          endDate: 'Present',
          description: '• Orchestrated a major digital transformation that reduced operational costs by $10M annually.\n• Directly supervised a global workforce of 2,000+ employees across 12 countries.\n• Negotiated strategic partnerships that expanded market share by 15%.'
        }
      ],
      education: [
        {
          id: 'e1',
          school: 'Wharton School of Business',
          degree: 'M.S. in Organizational Leadership',
          location: 'Philadelphia, PA',
          startDate: '2008-09',
          endDate: '2010-05',
          description: 'Honors in Business Strategy and Global Management.'
        }
      ],
      skills: [
        { id: 's1', name: 'Strategic Planning', level: 'Executive' },
        { id: 's2', name: 'P&L Management', level: 'Executive' },
        { id: 's3', name: 'Crisis Leadership', level: 'Expert' },
        { id: 's4', name: 'Mergers & Acquisitions', level: 'Expert' }
      ]
    }
  }
};

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [template, setTemplate] = useState('modern');
  const [themeColor, setThemeColor] = useState('theme-indigo');
  const [fontFamily, setFontFamily] = useState('font-inter');
  const [resumeData, setResumeData] = useState(DEFAULT_RESUME);
  const [loading, setLoading] = useState(id !== 'new');
  const [showDesignControls, setShowDesignControls] = useState(false);
  const [showAtsPopover, setShowAtsPopover] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showImporter, setShowImporter] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [saveStatus, setSaveStatus] = useState('Saved');
  const [lastSavedTime, setLastSavedTime] = useState(new Date().toLocaleTimeString());
  const [versionHistory, setVersionHistory] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showTailorModal, setShowTailorModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);

  // Compute live ATS score dynamically
  const liveAts = calculateLiveAtsScore(resumeData);

  // Debounced Autosave
  useEffect(() => {
    if (loading || id === 'new') return;
    setSaveStatus('Saving...');
    const timer = setTimeout(async () => {
      const title = resumeData.personal?.name ? `${resumeData.personal.name}'s Resume` : 'Untitled Resume';
      try {
        await api.resumes.update(id, { title, data: resumeData });
        const timeStr = new Date().toLocaleTimeString();
        setSaveStatus('Saved');
        setLastSavedTime(timeStr);
        setVersionHistory(prev => [{ time: timeStr, data: JSON.parse(JSON.stringify(resumeData)) }, ...prev.slice(0, 8)]);
      } catch (err) {
        setSaveStatus('Saved locally');
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [resumeData, id, loading]);

  const handleLoadPreset = (presetKey) => {
    const preset = RESUME_PRESETS[presetKey];
    if (preset) {
      setResumeData(preset.data);
      setTemplate(preset.template);
      setActiveTab('personal');
    }
  };

  useEffect(() => {
    if (id !== 'new') {
      const fetchResume = async () => {
        try {
          const docSnap = await api.resumes.getById(id);
          if (docSnap && docSnap.data) {
            setResumeData(typeof docSnap.data === 'string' ? JSON.parse(docSnap.data) : docSnap.data);
          }
        } catch (error) {
          console.error("Error fetching resume:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchResume();
    }
  }, [id]);

  const handleSave = async () => {
    const title = resumeData.personal?.name ? `${resumeData.personal.name}'s Resume` : 'Untitled Resume';

    try {
      if (id === 'new') {
        const created = await api.resumes.create({
          title,
          data: resumeData
        });
        navigate(`/editor/${created.id}`, { replace: true });
      } else {
        await api.resumes.update(id, {
          title,
          data: resumeData
        });
      }
      alert('Resume saved successfully!');
    } catch (error) {
      console.error("Error saving resume:", error);
      alert(`Failed to save: ${error.message}`);
    }
  };

  const handleExportPDF = () => {
    setShowExportMenu(false);
    const element = document.getElementById('resume-preview');
    const opt = {
      margin:       0,
      filename:     `${resumeData.personal?.name ? resumeData.personal.name.replace(/\s+/g, '_') : 'Resume'}_${Date.now()}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const handleExportTXT = () => {
    setShowExportMenu(false);
    const p = resumeData.personal || {};
    let txt = `${p.name || 'YOUR NAME'}\n`;
    if (p.role) txt += `${p.role}\n`;
    txt += `${p.email || ''} | ${p.phone || ''} | ${p.location || ''}\n\n`;
    
    if (p.summary) {
      txt += `SUMMARY:\n${p.summary}\n\n`;
    }

    if (resumeData.experience?.length > 0) {
      txt += `EXPERIENCE:\n`;
      resumeData.experience.forEach(exp => {
        txt += `${exp.role} - ${exp.company} (${exp.startDate || ''} - ${exp.endDate || ''})\n`;
        if (exp.description) txt += `${exp.description}\n`;
        txt += `\n`;
      });
    }

    if (resumeData.skills?.length > 0) {
      txt += `SKILLS:\n` + resumeData.skills.map(s => s.name).join(', ') + `\n\n`;
    }

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${p.name ? p.name.replace(/\s+/g, '_') : 'Resume'}.txt`;
    a.click();
  };

  const handleExportJSON = () => {
    setShowExportMenu(false);
    const jsonStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.personal?.name ? resumeData.personal.name.replace(/\s+/g, '_') : 'Resume'}_backup.json`;
    a.click();
  };

  const handleResetResume = () => {
    if (window.confirm('Are you sure you want to reset all resume fields to blank?')) {
      setResumeData(DEFAULT_RESUME);
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.error(err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--text-muted)' }}>
        Loading resume...
      </div>
    );
  }

  const atsPillClass = liveAts.score >= 80 ? 'excellent' : liveAts.score >= 60 ? 'good' : 'needs-work';

  return (
    <div className="editor-layout">
      {/* Left Sidebar (Form Controls) */}
      <div className="editor-sidebar">
        {/* Toolbar */}
        <div className="editor-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', padding: '0.85rem 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button className="btn btn-secondary" style={{ padding: '0.45rem 0.8rem', fontSize: '0.82rem' }} onClick={() => navigate('/dashboard')}>
              <ArrowLeft size={16} /> Back
            </button>

            {/* Live Floating ATS Score Pill */}
            <div style={{ position: 'relative' }}>
              <div 
                className={`live-ats-pill ${atsPillClass}`}
                onClick={() => setShowAtsPopover(!showAtsPopover)}
                title="Click to view real-time ATS checklist"
                style={{ padding: '0.35rem 0.6rem', fontSize: '0.78rem' }}
              >
                <ShieldCheck size={15} />
                <span>ATS: {liveAts.score}/100</span>
              </div>

              {showAtsPopover && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '120%',
                    left: 0,
                    background: 'white',
                    border: '1px solid #cbd5e1',
                    borderRadius: 12,
                    padding: '1rem',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    width: 270,
                    zIndex: 100
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a' }}>Live ATS Score Checklist</span>
                    <button className="btn-secondary" style={{ width: 22, height: 22, padding: 0 }} onClick={() => setShowAtsPopover(false)}>
                      <X size={12} />
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.78rem', color: '#475569' }}>
                    {liveAts.feedback.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ color: item.includes('100%') ? '#10b981' : '#f59e0b', fontWeight: 900 }}>•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Autosave Status Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#f1f5f9', padding: '0.35rem 0.6rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: saveStatus === 'Saving...' ? '#f59e0b' : '#10b981' }}></span>
              <span>{saveStatus} ({lastSavedTime})</span>
            </div>
          </div>
          
          <div className="flex-row" style={{ gap: '0.4rem', alignItems: 'center' }}>
            <button className="btn btn-secondary" onClick={() => setShowHistoryModal(true)} title="Version History & Recovery" style={{ padding: '0.45rem', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HistoryIcon size={15} color="#0284c7" />
            </button>

            <button className="btn btn-secondary" onClick={toggleFullScreen} title="Toggle Full Screen View" style={{ padding: '0.45rem', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Maximize2 size={15} />
            </button>

            <button className="btn btn-secondary" onClick={handleResetResume} title="Reset Resume Fields" style={{ padding: '0.45rem', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--danger)' }}>
              <RotateCcw size={15} />
            </button>

            <button 
              type="button" 
              className="btn" 
              onClick={handleSave} 
              style={{ 
                padding: '0.45rem 0.85rem', 
                fontSize: '0.82rem', 
                whiteSpace: 'nowrap', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.35rem',
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                color: '#ffffff',
                fontWeight: 800,
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 3px 8px rgba(5, 150, 105, 0.3)',
                cursor: 'pointer'
              }}
            >
              <Save size={15} color="#ffffff" /> Save
            </button>

            {/* Export Dropdown */}
            <div style={{ position: 'relative' }}>
              <button 
                type="button" 
                className="btn" 
                style={{ 
                  padding: '0.45rem 0.95rem', 
                  fontSize: '0.82rem', 
                  whiteSpace: 'nowrap', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.35rem', 
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 3px 10px rgba(79, 70, 229, 0.4)',
                  cursor: 'pointer'
                }} 
                onClick={() => setShowExportMenu(!showExportMenu)}
              >
                <Download size={15} color="#ffffff" /> Export PDF ▾
              </button>

              {showExportMenu && (
                <div 
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '110%',
                    background: 'white',
                    border: '1px solid #cbd5e1',
                    borderRadius: 12,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    zIndex: 100,
                    width: 170,
                    overflow: 'hidden'
                  }}
                >
                  <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.6rem 0.9rem', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }} onClick={handleExportPDF}>
                    <Download size={14} color="#4f46e5" /> Download PDF
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.6rem 0.9rem', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }} onClick={handleExportTXT}>
                    <FileText size={14} color="#0284c7" /> Plain Text (.TXT)
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.6rem 0.9rem', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }} onClick={handleExportJSON}>
                    <Upload size={14} color="#10b981" /> Backup (.JSON)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick AI & Feature Assistant Bar */}
        <div style={{ background: '#f8fafc', padding: '0.65rem 1rem', borderBottom: '1px solid #cbd5e1', display: 'flex', gap: '0.45rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Sparkles size={12} /> AI Assistants:
          </span>

          <button
            type="button"
            onClick={() => setActiveTab('aimatch')}
            style={{ padding: '0.35rem 0.75rem', borderRadius: '20px', border: '1px solid #f59e0b', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', color: '#78350f', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', boxShadow: '0 2px 4px rgba(245,158,11,0.2)' }}
          >
            <Target size={14} color="#b45309" /> Match Job Posting
          </button>

          <button
            type="button"
            onClick={() => setShowWizard(true)}
            style={{ padding: '0.35rem 0.75rem', borderRadius: '20px', border: '1px solid #c7d2fe', background: '#e0e7ff', color: '#3730a3', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <Sparkles size={13} color="#4f46e5" /> Step-by-Step Wizard
          </button>

          <button
            type="button"
            onClick={() => setShowImporter(true)}
            style={{ padding: '0.35rem 0.75rem', borderRadius: '20px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#1e293b', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <Upload size={13} color="#4f46e5" /> Import PDF/DOCX
          </button>

          <button
            type="button"
            onClick={() => setShowTailorModal(true)}
            style={{ padding: '0.35rem 0.75rem', borderRadius: '20px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#1e293b', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <Copy size={13} color="#0284c7" /> Tailor Version
          </button>

          <button
            type="button"
            onClick={() => setShowInterviewModal(true)}
            style={{ padding: '0.35rem 0.75rem', borderRadius: '20px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#1e293b', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <HelpCircle size={13} color="#d97706" /> Interview Prep
          </button>
        </div>

        {/* Collapsible Design & Styling Panel */}
        <div style={{ background: '#f8fafc', borderBottom: '1px solid #cbd5e1' }}>
          <button
            type="button"
            onClick={() => setShowDesignControls(!showDesignControls)}
            style={{
              width: '100%',
              padding: '0.65rem 1.25rem',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              border: 'none',
              background: '#f1f5f9',
              color: '#0f172a',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Palette size={15} color="#4f46e5" />
              <span style={{ color: '#0f172a', fontWeight: 800 }}>Customize Design (Layout, Colors, Fonts, Samples)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#4f46e5', color: '#ffffff', padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, boxShadow: '0 2px 6px rgba(79, 70, 229, 0.35)' }}>
              <span>{showDesignControls ? 'Hide Controls' : 'Show Controls'}</span>
              {showDesignControls ? <ChevronUp size={15} color="#ffffff" /> : <ChevronDown size={15} color="#ffffff" />}
            </div>
          </button>

          {showDesignControls && (
            <div className="editor-section-header" style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #e2e8f0' }}>
              {/* Templates */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                   <Layout size={15} /> Select Layout
                </h3>
                <div className="flex-row" style={{ flexWrap: 'wrap', gap: '0.4rem' }}>
                   {['modern', 'minimalist', 'creative', 'executive', 'tech'].map(t => (
                     <button 
                       key={t}
                       className={`btn-template ${template === t ? 'active' : ''}`}
                       onClick={() => setTemplate(t)}
                       style={{ padding: '0.4rem 0.6rem', fontSize: '0.78rem' }}
                     >
                       {t.charAt(0).toUpperCase() + t.slice(1)}
                     </button>
                   ))}
                </div>
              </div>

              {/* Theme Color Switcher */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                   <Palette size={15} /> Theme Color
                </h3>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  {[
                    { id: 'theme-indigo', color: '#4f46e5', name: 'Indigo' },
                    { id: 'theme-emerald', color: '#059669', name: 'Emerald' },
                    { id: 'theme-slate', color: '#0f172a', name: 'Slate' },
                    { id: 'theme-crimson', color: '#be123c', name: 'Crimson' },
                    { id: 'theme-violet', color: '#7c3aed', name: 'Violet' }
                  ].map(c => (
                    <button
                      key={c.id}
                      onClick={() => setThemeColor(c.id)}
                      title={c.name}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: c.color,
                        border: themeColor === c.id ? '2px solid #0f172a' : '2px solid transparent',
                        cursor: 'pointer',
                        boxShadow: themeColor === c.id ? '0 0 0 2px white' : 'none'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Font Family Selector */}
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                   <Type size={15} /> Typography
                </h3>
                <div className="flex-row" style={{ flexWrap: 'wrap', gap: '0.4rem' }}>
                  {[
                    { id: 'font-inter', label: 'Inter' },
                    { id: 'font-merriweather', label: 'Merriweather' },
                    { id: 'font-mono', label: 'JetBrains Mono' },
                    { id: 'font-outfit', label: 'Outfit' }
                  ].map(f => (
                    <button
                      key={f.id}
                      className={`btn-template ${fontFamily === f.id ? 'active' : ''}`}
                      onClick={() => setFontFamily(f.id)}
                      style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Role Presets */}
              <div>
                <h3 style={{ fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                   Starter Samples
                </h3>
                <div className="flex-row" style={{ flexWrap: 'wrap', gap: '0.4rem' }}>
                  <button className="btn-preset" onClick={() => handleLoadPreset('software_engineer')}>Software Engineer</button>
                  <button className="btn-preset" onClick={() => handleLoadPreset('data_analyst')}>Data Analyst</button>
                  <button className="btn-preset" onClick={() => handleLoadPreset('marketing_manager')}>Marketing Lead</button>
                  <button className="btn-preset" onClick={() => handleLoadPreset('executive')}>Executive Leader</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section Header: Resume Content & Details */}
        <div style={{ background: '#ffffff', padding: '0.7rem 1.25rem 0.35rem 1.25rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <FileText size={15} color="#4f46e5" />
            <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Fill Resume Details
            </span>
          </div>
          <span style={{ fontSize: '0.72rem', background: '#e0e7ff', color: '#3730a3', padding: '0.25rem 0.65rem', borderRadius: '12px', fontWeight: 800 }}>
            Active: {activeTab === 'aimatch' ? 'AI Job Matcher' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </span>
        </div>

        {/* Section Tabs */}
        <div className="editor-tabs" style={{ flexWrap: 'wrap' }}>
          {['personal', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'aimatch'].map(tab => (
            <button 
              key={tab} 
              className={`tab-btn ${activeTab === tab ? 'active' : ''} ${tab === 'aimatch' ? 'tab-ai' : ''}`}
              onClick={() => setActiveTab(tab)}
              style={{ fontSize: '0.78rem', padding: '0.4rem 0.6rem' }}
            >
              {tab === 'aimatch' ? <div className="flex-row" style={{ gap: '0.4rem' }}><Sparkles size={13} /> AI Matcher</div> : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Section Form */}
        <div className="editor-form">
          {activeTab === 'aimatch' ? (
            <AIMatch 
              resumeData={resumeData} 
              onUpdate={setResumeData} 
              currentTemplate={template}
              onSetTemplate={setTemplate}
            />
          ) : (
            <SectionForm 
              activeTab={activeTab} 
              data={resumeData} 
              onChange={setResumeData} 
            />
          )}
        </div>
      </div>

      {/* Right Pane (Live Preview with dynamic theme & font) */}
      <div className="preview-pane">
         <LivePreview 
           data={resumeData} 
           template={template} 
           themeColor={themeColor} 
           fontFamily={fontFamily} 
         />
      </div>

      {/* Resume Importer Modal */}
      {showImporter && (
        <ResumeImporter
          onImport={(importedData) => setResumeData(importedData)}
          onClose={() => setShowImporter(false)}
        />
      )}

      {/* Version History Restore Modal */}
      {showHistoryModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1.5rem' }}>
          <div style={{ background: '#ffffff', width: '100%', maxWidth: '520px', borderRadius: '16px', padding: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative' }}>
            <button
              onClick={() => setShowHistoryModal(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', border: 'none', background: '#f1f5f9', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18} color="#64748b" />
            </button>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HistoryIcon size={20} color="#0284c7" /> Version History & Recovery
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.2rem' }}>
              Restore any previous version saved during your editing session:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '300px', overflowY: 'auto' }}>
              {versionHistory.length > 0 ? (
                versionHistory.map((ver, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div>
                      <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#1e293b' }}>Snapshot {idx + 1}</span>
                      <span style={{ fontSize: '0.78rem', color: '#64748b', marginLeft: '0.5rem' }}>Saved at {ver.time}</span>
                    </div>
                    <button
                      onClick={() => {
                        setResumeData(ver.data);
                        setShowHistoryModal(false);
                        alert(`Restored snapshot from ${ver.time}!`);
                      }}
                      style={{ padding: '0.35rem 0.75rem', borderRadius: '6px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                    >
                      Restore
                    </button>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', textAlign: 'center', padding: '1rem' }}>No previous snapshots stored yet. Edit fields to generate auto-saves.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Guided Resume Wizard Modal */}
      {showWizard && (
        <GuidedWizard
          data={resumeData}
          onChange={setResumeData}
          onClose={() => setShowWizard(false)}
          onComplete={() => setShowWizard(false)}
        />
      )}

      {/* Resume Tailor Modal */}
      {showTailorModal && (
        <TailorResumeModal
          resumeData={resumeData}
          onClose={() => setShowTailorModal(false)}
        />
      )}

      {/* Interview Prep Modal */}
      {showInterviewModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1.5rem' }}>
          <div style={{ background: '#ffffff', width: '100%', maxWidth: '650px', maxHeight: '85vh', overflowY: 'auto', borderRadius: '16px', padding: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative' }}>
            <button
              onClick={() => setShowInterviewModal(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', border: 'none', background: '#f1f5f9', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18} color="#64748b" />
            </button>

            <InterviewPrep resumeData={resumeData} />
          </div>
        </div>
      )}
    </div>
  );
}
