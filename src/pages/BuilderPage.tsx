import React, { useState } from 'react';
import { Toolbar } from '../components/builder/Toolbar';
import { EditorForm } from '../components/builder/EditorForm';
import { ResumePreview } from '../components/builder/ResumePreview';
import { AiAssistantModal } from '../components/builder/AiAssistantModal';
import { ImportModal } from '../components/builder/ImportModal';
import { UploadResumeModal } from '../components/builder/UploadResumeModal';
import { AtsScoreDrawer } from '../components/ats/AtsScoreDrawer';
import { SeoHead } from '../components/common/SeoHead';
import { Edit3, Eye, FilePlus, Sparkles, Upload, RotateCcw, UploadCloud } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { initialResumeData } from '../data/initialData';

export const BuilderPage: React.FC = () => {
  const { resume, setResume } = useResume();
  const [showAiModal, setShowAiModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAtsDrawer, setShowAtsDrawer] = useState(false);
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');
  const [activeChoice, setActiveChoice] = useState<'sample' | 'blank' | 'imported'>(() => {
    return (resume.experience && resume.experience.length > 0) ? 'sample' : 'blank';
  });

  const handleStartBlank = () => {
    if (window.confirm('Clear all fields to start with a blank resume template?')) {
      setResume({
        id: 'blank-resume-' + Date.now(),
        title: 'Untitled Resume',
        updatedAt: new Date().toISOString(),
        personalInfo: { fullName: '', jobTitle: '', email: '', phone: '', location: '', website: '', linkedin: '', github: '' },
        summary: '',
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        customSections: [],
        formatting: {
          template: 'modern',
          fontFamily: 'outfit',
          fontSize: 'base',
          spacing: 'normal',
          accentColor: '#0284c7',
          showIcons: true,
          sectionOrder: ['summary', 'experience', 'skills', 'projects', 'education', 'certifications', 'customSections']
        }
      });
      setActiveChoice('blank');
    }
  };

  const handleLoadSample = () => {
    setResume(initialResumeData);
    setActiveChoice('sample');
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-slate-100">
      <SeoHead
        title="Free Resume Builder – Interactive ATS Resume Editor | Resume Craft"
        description="Build ATS-friendly resumes online with live preview, AI bullet enhancers, Google X-Y-Z formula metrics, and vector PDF exports."
        canonicalPath="/builder"
      />

      {/* Page-level H1 for SEO */}
      <h1 className="sr-only">Free Interactive Resume Builder</h1>

      {/* Builder Top Toolbar */}
      <Toolbar
        onOpenAiModal={() => setShowAiModal(true)}
        onOpenImportModal={() => setShowImportModal(true)}
        onOpenUploadModal={() => setShowUploadModal(true)}
        onOpenAtsDrawer={() => setShowAtsDrawer(true)}
      />

      {/* Clear Initial Choice Banner */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 shadow-2xs">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <span className="font-bold text-slate-900">How would you like to build?</span>
            <span className="hidden md:inline text-slate-400">| Choose your starting workspace:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* 1. Upload & Apply Template */}
            <button
              onClick={() => {
                setShowUploadModal(true);
                setActiveChoice('imported');
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-extrabold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <UploadCloud size={14} className="text-white" />
              <span>Upload Existing Resume</span>
            </button>

            {/* 2. Start Blank */}
            <button
              onClick={handleStartBlank}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeChoice === 'blank'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <FilePlus size={14} />
              <span>Start Blank</span>
            </button>

            {/* 3. Use Sample */}
            <button
              onClick={handleLoadSample}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeChoice === 'sample'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Sparkles size={14} className={activeChoice === 'sample' ? 'text-white' : 'text-brand-600'} />
              <span>Use Sample Data</span>
            </button>

            {/* 4. Import Resume Text */}
            <button
              onClick={() => {
                setShowImportModal(true);
                setActiveChoice('imported');
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Upload size={14} className="text-emerald-600" />
              <span>Paste Text</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden bg-white border-b border-slate-200 p-2 flex gap-2 sticky top-[53px] z-20 shadow-xs">
        <button
          onClick={() => setMobileTab('edit')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${mobileTab === 'edit' ? 'bg-brand-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'}`}
        >
          <Edit3 size={14} />
          <span>Editor Form</span>
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${mobileTab === 'preview' ? 'bg-brand-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'}`}
        >
          <Eye size={14} />
          <span>Live Preview</span>
        </button>
      </div>

      {/* Main Split-Screen Workspace */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto p-3 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left: Editor Form (5 cols on large desktop) */}
        <div className={`lg:col-span-5 h-full ${mobileTab === 'edit' ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-transparent space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Resume Sections &amp; Content
              </h2>
              <span className="text-[11px] text-slate-400 font-medium">Auto-saves to browser &amp; cloud</span>
            </div>
            <EditorForm />
          </div>
        </div>

        {/* Right: Live Resume Sheet Preview (7 cols on large desktop) */}
        <div className={`lg:col-span-7 h-full lg:sticky lg:top-20 ${mobileTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
          <ResumePreview />
        </div>

      </div>

      {/* Global Action Modals */}
      <AiAssistantModal isOpen={showAiModal} onClose={() => setShowAiModal(false)} />
      <ImportModal isOpen={showImportModal} onClose={() => setShowImportModal(false)} />
      <UploadResumeModal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} />
      <AtsScoreDrawer isOpen={showAtsDrawer} onClose={() => setShowAtsDrawer(false)} />
    </div>
  );
};
