import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { exportToVectorPdf, downloadPdfFromElement, exportResumeToJson } from '../../services/pdfService';
import { initialResumeData } from '../../data/initialData';
import {
  Download,
  Printer,
  Sparkles,
  UploadCloud,
  FileJson,
  Undo2,
  Redo2,
  CheckCircle2,
  FileText,
  Eye,
  MoreVertical,
  Check,
  FilePlus,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ToolbarProps {
  onOpenAiModal: () => void;
  onOpenImportModal: () => void;
  onOpenUploadModal: () => void;
  onOpenAtsDrawer: () => void;
  onOpenMobilePreview?: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onOpenAiModal,
  onOpenImportModal,
  onOpenUploadModal,
  onOpenAtsDrawer,
  onOpenMobilePreview
}) => {
  const {
    resume,
    setResume,
    undo,
    redo,
    canUndo,
    canRedo,
    atsAnalysis
  } = useResume();

  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [savedStatus, setSavedStatus] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' } | null>(null);

  const handleDownloadPdf = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const nameSlug = resume.personalInfo.fullName
        ? resume.personalInfo.fullName.trim().replace(/[^a-zA-Z0-9]/g, '-')
        : 'Resume';
      const filename = `${nameSlug}-Resume.pdf`;

      await downloadPdfFromElement('resume-preview-sheet', filename);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
      });
      setToast({ message: 'PDF downloaded successfully!', type: 'success' });
      setTimeout(() => setToast(null), 4000);
    } catch (error: any) {
      console.error("PDF download failed:", error);
      setToast({ message: `PDF export error: ${error?.message || String(error)}`, type: 'error' });
      setTimeout(() => setToast(null), 6000);
    } finally {
      setIsExporting(false);
    }
  };

  const handleManualSave = () => {
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2500);
  };

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
      setShowMoreMenu(false);
    }
  };

  const handleLoadSample = () => {
    setResume(initialResumeData);
    setShowMoreMenu(false);
  };

  const score = atsAnalysis.overallScore;
  const scoreBadgeColor = score >= 80 
    ? 'text-emerald-700 bg-emerald-50 border-emerald-300 hover:bg-emerald-100' 
    : score >= 60 
    ? 'text-amber-700 bg-amber-50 border-amber-300 hover:bg-amber-100' 
    : 'text-rose-700 bg-rose-50 border-rose-300 hover:bg-rose-100';

  return (
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-30 px-3 sm:px-6 py-2.5 shadow-xs">
      {/* Toast Notification Banner */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-2xl border text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 ${
          toast.type === 'error' ? 'bg-rose-950 text-rose-100 border-rose-800' : 'bg-emerald-950 text-emerald-100 border-emerald-800'
        }`}>
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 text-slate-400 hover:text-white cursor-pointer">&times;</button>
        </div>
      )}

      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-3">
        
        {/* Left: Brand / Title & ATS Score */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 text-base tracking-tight hidden sm:inline">Resume Craft</span>
            <span className="text-sm font-semibold text-slate-400 hidden sm:inline">|</span>
            <input
              type="text"
              value={resume.title || 'Untitled Resume'}
              onChange={(e) => setResume({ ...resume, title: e.target.value })}
              className="text-sm font-bold text-slate-800 max-w-[140px] sm:max-w-[200px] bg-transparent hover:bg-slate-100 focus:bg-white focus:ring-1 focus:ring-brand-500 rounded px-1.5 py-1 outline-none truncate"
              title="Click to rename resume"
            />
          </div>

          {/* ATS Score Badge */}
          <button
            onClick={onOpenAtsDrawer}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs sm:text-sm font-bold transition-all cursor-pointer ${scoreBadgeColor}`}
            title="Click to open ATS Score & Optimization Checker"
          >
            <CheckCircle2 size={14} />
            <span>ATS Score: {score}/100</span>
          </button>
        </div>

        {/* Center: Undo / Redo */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-lg">
          <button
            onClick={undo}
            disabled={!canUndo}
            className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-30 rounded hover:bg-white transition-colors cursor-pointer"
            title="Undo"
          >
            <Undo2 size={15} />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-30 rounded hover:bg-white transition-colors cursor-pointer"
            title="Redo"
          >
            <Redo2 size={15} />
          </button>
        </div>

        {/* Right: Primary Visible Actions: Mobile Preview, Save, Download PDF, Three-Dot Menu */}
        <div className="flex items-center gap-2.5">
          
          {/* Mobile Preview Toggle Button */}
          {onOpenMobilePreview && (
            <button
              onClick={onOpenMobilePreview}
              className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-250 rounded-xl transition-colors cursor-pointer"
              title="Preview Resume"
            >
              <Eye size={15} className="text-brand-600" />
              <span>Preview</span>
            </button>
          )}

          {/* Save Status / Save Draft Button */}
          <button
            onClick={handleManualSave}
            className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
            title="Click to save resume changes"
          >
            {savedStatus ? (
              <>
                <Check size={15} className="text-emerald-600" />
                <span className="text-emerald-700 font-bold">Saved!</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Auto-saved</span>
              </>
            )}
          </button>

          {/* Primary Action: Download PDF */}
          <button
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-4.5 py-2 text-sm font-extrabold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-60"
          >
            <Download size={15} className={isExporting ? 'animate-bounce' : ''} />
            <span>{isExporting ? 'Generating...' : 'Download PDF'}</span>
          </button>

          {/* Three-Dot Menu dropdown for Rare/Secondary Actions */}
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors cursor-pointer"
              title="More Actions"
              aria-label="More Options"
            >
              <MoreVertical size={18} />
            </button>

            {showMoreMenu && (
              <div className="absolute right-0 mt-2 w-60 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 space-y-0.5 animate-in fade-in slide-in-from-top-1">
                <div className="text-xs font-bold text-slate-400 uppercase px-2.5 py-1">Actions & Data</div>
                
                {/* Upload Resume */}
                <button
                  onClick={() => {
                    onOpenUploadModal();
                    setShowMoreMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer text-left"
                >
                  <UploadCloud size={16} className="text-emerald-600" />
                  <span>Upload Existing Resume</span>
                </button>

                {/* Paste Text */}
                <button
                  onClick={() => {
                    onOpenImportModal();
                    setShowMoreMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer text-left"
                >
                  <FileText size={16} className="text-blue-600" />
                  <span>Paste Text / LinkedIn</span>
                </button>

                {/* AI Assistant */}
                <button
                  onClick={() => {
                    onOpenAiModal();
                    setShowMoreMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer text-left"
                >
                  <Sparkles size={16} className="text-purple-600" />
                  <span>AI Resume Assistant</span>
                </button>

                {/* ATS Checker */}
                <button
                  onClick={() => {
                    onOpenAtsDrawer();
                    setShowMoreMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer text-left"
                >
                  <CheckCircle2 size={16} className="text-amber-600" />
                  <span>ATS Score Checker</span>
                </button>

                <div className="border-t border-slate-100 my-1"></div>

                {/* Load Sample Data */}
                <button
                  onClick={handleLoadSample}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer text-left"
                >
                  <RotateCcw size={16} className="text-indigo-600" />
                  <span>Load Sample Resume</span>
                </button>

                {/* Start Blank */}
                <button
                  onClick={handleStartBlank}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer text-left"
                >
                  <FilePlus size={16} className="text-slate-500" />
                  <span>Start Blank Template</span>
                </button>

                {/* Backup JSON */}
                <button
                  onClick={() => {
                    exportResumeToJson(resume);
                    setShowMoreMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer text-left"
                >
                  <FileJson size={16} className="text-cyan-600" />
                  <span>Backup JSON File</span>
                </button>

                {/* Print ATS PDF */}
                <button
                  onClick={() => {
                    exportToVectorPdf();
                    setShowMoreMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer text-left"
                >
                  <Printer size={16} className="text-slate-600" />
                  <span>Print Vector PDF</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};


