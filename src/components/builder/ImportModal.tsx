import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { parseLinkedInOrRawText } from '../../services/linkedinParser';
import { importResumeFromJson } from '../../services/pdfService';
import { initialResumeData } from '../../data/initialData';
import { UploadCloud, FileJson, Sparkles, X, CheckCircle, AlertCircle } from 'lucide-react';
import { LinkedinIcon } from '../common/BrandIcons';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose }) => {
  const { setResume, updateResume } = useResume();
  const [activeTab, setActiveTab] = useState<'text' | 'json' | 'samples'>('text');
  const [rawText, setRawText] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  if (!isOpen) return null;

  const handleParseRawText = () => {
    if (!rawText.trim()) return;
    try {
      const parsed = parseLinkedInOrRawText(rawText);
      updateResume((prev) => ({
        ...prev,
        ...parsed,
        personalInfo: { ...prev.personalInfo, ...(parsed.personalInfo || {}) },
        experience: parsed.experience && parsed.experience.length > 0 ? parsed.experience : prev.experience,
        skills: parsed.skills && parsed.skills.length > 0 ? parsed.skills : prev.skills,
        education: parsed.education && parsed.education.length > 0 ? parsed.education : prev.education,
        summary: parsed.summary || prev.summary
      }));
      setStatusMessage({ text: 'Successfully extracted resume data and merged into editor!', type: 'success' });
      setTimeout(() => {
        onClose();
        setStatusMessage(null);
      }, 1200);
    } catch (err: any) {
      setStatusMessage({ text: 'Could not parse text. Please try pasting raw text sections.', type: 'error' });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const parsedResume = await importResumeFromJson(file);
      setResume(parsedResume);
      setStatusMessage({ text: 'Resume JSON imported successfully!', type: 'success' });
      setTimeout(() => {
        onClose();
        setStatusMessage(null);
      }, 1000);
    } catch (err: any) {
      setStatusMessage({ text: err.message || 'Failed to import JSON', type: 'error' });
    }
  };

  const handleLoadSample = (type: 'senior' | 'cs_grad' | 'manager') => {
    if (type === 'senior') {
      setResume({ ...initialResumeData, id: `resume-${Date.now()}` });
    } else if (type === 'cs_grad') {
      setResume({
        ...initialResumeData,
        id: `resume-${Date.now()}`,
        title: 'CS Graduate Resume',
        personalInfo: {
          ...initialResumeData.personalInfo,
          fullName: 'Maya Patel',
          jobTitle: 'Junior Software Engineer & CS Graduate',
          email: 'maya.patel@example.edu',
          phone: '+1 (555) 789-0123',
          location: 'San Jose, CA',
          website: 'mayapatel.io'
        },
        summary: 'Motivated Computer Science graduate from UC Berkeley with strong foundation in full-stack web development, algorithms, and distributed systems. Built 4+ full-stack production projects and completed software engineering internships delivering features to 50k+ active users.',
        experience: [
          {
            id: 'exp-g1',
            role: 'Software Engineering Intern',
            company: 'NextGen Cloud Labs',
            location: 'San Jose, CA',
            startDate: '2025-06',
            endDate: '2025-09',
            current: false,
            highlights: [
              'Built reusable React & TypeScript UI components, reducing page load latency by 25% across customer onboarding flows.',
              'Created Python automated integration tests, preventing 15+ potential production regression errors before major product launch.'
            ]
          }
        ]
      });
    } else {
      setResume({
        ...initialResumeData,
        id: `resume-${Date.now()}`,
        title: 'Technical Product Manager Resume',
        personalInfo: {
          ...initialResumeData.personalInfo,
          fullName: 'Marcus Vance',
          jobTitle: 'Lead Technical Product Manager',
          email: 'marcus.vance@example.com'
        },
        summary: 'Strategic Technical Product Manager with 7+ years bridging business goals and engineering execution. Delivered enterprise AI products scaling from 0 to $3.2M ARR while maintaining 99.9% customer satisfaction ratings.'
      });
    }

    setStatusMessage({ text: 'Sample profile loaded!', type: 'success' });
    setTimeout(() => {
      onClose();
      setStatusMessage(null);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/10 rounded-lg">
              <UploadCloud size={18} className="text-brand-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Import Profile & Resume Data</h3>
              <p className="text-xs text-slate-400">LinkedIn text, JSON backups or ready-made samples</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10">
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2 gap-2 text-xs">
          <button
            onClick={() => setActiveTab('text')}
            className={`px-3 py-2 font-bold border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === 'text' ? 'border-brand-600 text-brand-700 bg-white rounded-t-lg' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          >
            <LinkedinIcon size={13} className="text-blue-600" />
            <span>LinkedIn / Raw Text</span>
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`px-3 py-2 font-bold border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === 'json' ? 'border-brand-600 text-brand-700 bg-white rounded-t-lg' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          >
            <FileJson size={13} className="text-amber-600" />
            <span>JSON Backup</span>
          </button>
          <button
            onClick={() => setActiveTab('samples')}
            className={`px-3 py-2 font-bold border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === 'samples' ? 'border-brand-600 text-brand-700 bg-white rounded-t-lg' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          >
            <Sparkles size={13} className="text-purple-600" />
            <span>Resume Presets</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {statusMessage && (
            <div className={`p-3 rounded-xl flex items-center gap-2 text-xs font-semibold ${statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
              {statusMessage.type === 'success' ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {activeTab === 'text' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                Copy text directly from your <strong>LinkedIn Profile</strong> or existing resume document and paste below. The parser will extract name, contacts, work experience, bullets, and skills.
              </p>
              <textarea
                rows={7}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste LinkedIn summary, work experience, or resume text here...&#10;&#10;e.g.&#10;Alexander Wright&#10;Senior Software Engineer&#10;alex@example.com&#10;&#10;Experience:&#10;Staff Engineer at Apex Cloud (2022 - Present)&#10;• Architected distributed AI pipelines reducing latency by 40%..."
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-mono"
              />
              <button
                onClick={handleParseRawText}
                disabled={!rawText.trim()}
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles size={14} />
                <span>Parse & Populate Resume</span>
              </button>
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-4 text-center p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
              <FileJson size={36} className="mx-auto text-amber-500" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Upload Resume Craft Backup (.json)</h4>
                <p className="text-xs text-slate-500 mt-1">Restore your previously exported resume state instantly.</p>
              </div>
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow">
                <UploadCloud size={14} />
                <span>Choose JSON File</span>
                <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          )}

          {activeTab === 'samples' && (
            <div className="space-y-2.5">
              <p className="text-xs text-slate-600">
                Pick a pre-filled, ATS-optimized template profile to test or start with:
              </p>
              
              <button
                onClick={() => handleLoadSample('senior')}
                className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-brand-300 hover:bg-brand-50/40 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900">Senior Full-Stack & AI Engineer</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">6+ YOE, distributed systems, GCP, 99.8% ATS score</div>
                </div>
                <span className="text-xs text-brand-600 font-bold">Load →</span>
              </button>

              <button
                onClick={() => handleLoadSample('cs_grad')}
                className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-brand-300 hover:bg-brand-50/40 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900">Fresh CS Graduate / Entry Level</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Academic coursework, internship experience, GPA, projects</div>
                </div>
                <span className="text-xs text-brand-600 font-bold">Load →</span>
              </button>

              <button
                onClick={() => handleLoadSample('manager')}
                className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-brand-300 hover:bg-brand-50/40 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900">Technical Product Manager (TPM)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Product roadmap, KPIs, enterprise revenue, cross-functional leadership</div>
                </div>
                <span className="text-xs text-brand-600 font-bold">Load →</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};
