import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { Download, Save, ArrowLeft, Layout, Sparkles, RotateCcw, Maximize2 } from 'lucide-react';
import SectionForm from '../components/editor/SectionForm';
import LivePreview from '../components/editor/LivePreview';
import AIMatch from '../components/editor/AIMatch';
import { api } from '../utils/api';

const DEFAULT_RESUME = {
  personal: { name: '', role: '', email: '', phone: '', location: '', linkedin: '', summary: '' },
  experience: [],
  education: [],
  skills: []
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
  const [resumeData, setResumeData] = useState(DEFAULT_RESUME);
  const [loading, setLoading] = useState(id !== 'new');

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
            setResumeData(docSnap.data);
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
      alert('Resume saved to PostgreSQL successfully!');
    } catch (error) {
      console.error("Detailed Error saving resume:", error);
      alert(`Failed to save: ${error.message}`);
    }
  };

  const handleExportPDF = () => {
    const element = document.getElementById('resume-preview');
    const opt = {
      margin:       0,
      filename:     `resume_${Date.now()}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
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

  return (
    <div className="editor-layout">
      {/* Left Sidebar (Form) */}
      <div className="editor-sidebar">
        <div className="editor-toolbar">
          <button className="btn btn-secondary" style={{ padding: '0.6rem 1rem' }} onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={18} /> Back
          </button>
          
          <div className="flex-row" style={{ gap: '0.5rem' }}>
            <button className="btn btn-secondary" onClick={toggleFullScreen} title="Toggle Full Screen View" style={{ padding: '0.6rem' }}>
              <Maximize2 size={18} />
            </button>
            <button className="btn btn-secondary" onClick={handleResetResume} title="Reset Resume Fields" style={{ padding: '0.6rem', color: 'var(--danger)' }}>
              <RotateCcw size={18} /> Reset
            </button>
            <button className="btn btn-secondary" onClick={handleSave}>
              <Save size={18} /> Save
            </button>
            <button className="btn btn-primary" onClick={handleExportPDF}>
              <Download size={18} /> Export PDF
            </button>
          </div>
        </div>


        <div className="editor-section-header" style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-light)' }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
             <Layout size={16} /> Select Template
          </h3>
          <div className="flex-row" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
             <button 
               className={`btn-template ${template === 'modern' ? 'active' : ''}`}
               onClick={() => setTemplate('modern')}
             >
               Modern
             </button>
             <button 
               className={`btn-template ${template === 'minimalist' ? 'active' : ''}`}
               onClick={() => setTemplate('minimalist')}
             >
               Minimal
             </button>
             <button 
               className={`btn-template ${template === 'creative' ? 'active' : ''}`}
               onClick={() => setTemplate('creative')}
             >
               Creative
             </button>
             <button 
               className={`btn-template ${template === 'executive' ? 'active' : ''}`}
               onClick={() => setTemplate('executive')}
             >
               Executive
             </button>
             <button 
               className={`btn-template ${template === 'tech' ? 'active' : ''}`}
               onClick={() => setTemplate('tech')}
             >
               Tech
             </button>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
               Professional Samples
            </h3>
            <div className="flex-row" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
              <button className="btn-preset" onClick={() => handleLoadPreset('software_engineer')}>Software Engineer</button>
              <button className="btn-preset" onClick={() => handleLoadPreset('marketing_manager')}>Marketing Manager</button>
              <button className="btn-preset" onClick={() => handleLoadPreset('executive')}>Executive Leader</button>
            </div>
          </div>
        </div>

        <div className="editor-tabs">
          {['personal', 'experience', 'education', 'skills', 'aimatch'].map(tab => (
            <button 
              key={tab} 
              className={`tab-btn ${activeTab === tab ? 'active' : ''} ${tab === 'aimatch' ? 'tab-ai' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'aimatch' ? <div className="flex-row" style={{ gap: '0.4rem' }}><Sparkles size={14} /> AI Match</div> : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

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

      {/* Right Pane (Live Preview) */}
      <div className="preview-pane">
         <LivePreview data={resumeData} template={template} />
      </div>
    </div>
  );
}
