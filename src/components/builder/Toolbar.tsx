import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { useAuth } from '../../context/AuthContext';
import { exportToVectorPdf, downloadPdfFromElement, exportResumeToJson } from '../../services/pdfService';
import { TEMPLATE_LIST } from '../templates';
import {
  Download,
  Printer,
  Sparkles,
  UploadCloud,
  FileJson,
  Undo2,
  Redo2,
  Palette,
  CheckCircle2,
  Layers,
  FileText,
  Type,
  ChevronDown,
  MoreHorizontal
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ToolbarProps {
  onOpenAiModal: () => void;
  onOpenImportModal: () => void;
  onOpenUploadModal?: () => void;
  onOpenAtsDrawer: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onOpenAiModal,
  onOpenImportModal,
  onOpenUploadModal,
  onOpenAtsDrawer
}) => {
  const {
    resume,
    updateFormatting,
    undo,
    redo,
    canUndo,
    canRedo,
    atsAnalysis
  } = useResume();

  const [showStyleMenu, setShowStyleMenu] = useState(false);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const colors = [
    { label: 'Cyan Blue', hex: '#0284c7' },
    { label: 'Teal Emerald', hex: '#0d9488' },
    { label: 'Indigo', hex: '#4f46e5' },
    { label: 'Slate Navy', hex: '#1e293b' },
    { label: 'Rose Burgundy', hex: '#be123c' },
    { label: 'Forest Green', hex: '#15803d' },
  ];

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    try {
      await downloadPdfFromElement('resume-preview-sheet', `${(resume.personalInfo.fullName || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch (e) {
      console.error('PDF Download Error:', e);
    } finally {
      setIsExporting(false);
    }
  };

  const score = atsAnalysis.overallScore;
  const scoreColor = score >= 80 ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : score >= 60 ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-rose-600 bg-rose-50 border-rose-200';

  return (
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-30 px-3 sm:px-6 py-2.5 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Left: Template & Design controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {/* Template Selector */}
          <div className="relative">
            <button
              onClick={() => { setShowTemplateMenu(!showTemplateMenu); setShowStyleMenu(false); setShowMoreMenu(false); }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <Layers size={14} className="text-brand-600" />
              <span>Template: <strong className="text-slate-900">{TEMPLATE_LIST.find(t => t.id === resume.formatting.template)?.name || 'Modern'}</strong></span>
              <ChevronDown size={12} className="text-slate-400" />
            </button>

            {showTemplateMenu && (
              <div className="absolute left-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase px-2 py-1">Choose Template</div>
                {TEMPLATE_LIST.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => {
                      updateFormatting({ template: tpl.id });
                      setShowTemplateMenu(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex flex-col cursor-pointer ${resume.formatting.template === tpl.id ? 'bg-brand-50 border border-brand-200' : 'hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{tpl.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">{tpl.tag}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-0.5">{tpl.description}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Style & Font Picker */}
          <div className="relative">
            <button
              onClick={() => { setShowStyleMenu(!showStyleMenu); setShowTemplateMenu(false); setShowMoreMenu(false); }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <Palette size={14} className="text-purple-600" />
              <span className="hidden sm:inline">Design &amp; Colors</span>
              <span className="sm:hidden">Style</span>
              <ChevronDown size={12} className="text-slate-400" />
            </button>

            {showStyleMenu && (
              <div className="absolute left-0 mt-1.5 w-72 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 space-y-3">
                {/* Accent Color */}
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1.5">Accent Color</label>
                  <div className="flex items-center gap-2">
                    {colors.map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => updateFormatting({ accentColor: c.hex })}
                        style={{ backgroundColor: c.hex }}
                        className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${resume.formatting.accentColor === c.hex ? 'scale-110 border-slate-900 shadow-sm' : 'border-transparent hover:scale-105'}`}
                        title={c.label}
                      />
                    ))}
                  </div>
                </div>

                {/* Font Family */}
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase mb-1.5 flex items-center gap-1">
                    <Type size={12} /> Font Family
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'outfit', label: 'Outfit (Modern)' },
                      { id: 'inter', label: 'Inter (Clean)' },
                      { id: 'serif', label: 'Merriweather (Serif)' },
                      { id: 'mono', label: 'JetBrains (Tech)' }
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => updateFormatting({ fontFamily: f.id as any })}
                        className={`px-2 py-1 text-xs rounded border text-left transition-colors cursor-pointer ${resume.formatting.fontFamily === f.id ? 'bg-brand-50 border-brand-400 font-bold text-brand-900' : 'border-slate-200 hover:bg-slate-50'}`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size & Spacing */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Font Size</label>
                    <select
                      value={resume.formatting.fontSize}
                      onChange={(e) => updateFormatting({ fontSize: e.target.value as any })}
                      className="w-full text-xs p-1.5 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer"
                    >
                      <option value="sm">Small (Compact)</option>
                      <option value="base">Medium (Standard)</option>
                      <option value="lg">Large (Spacious)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Spacing</label>
                    <select
                      value={resume.formatting.spacing}
                      onChange={(e) => updateFormatting({ spacing: e.target.value as any })}
                      className="w-full text-xs p-1.5 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer"
                    >
                      <option value="compact">Compact</option>
                      <option value="normal">Normal</option>
                      <option value="relaxed">Relaxed</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Undo / Redo */}
          <div className="flex items-center border-l border-slate-200 pl-2 gap-0.5">
            <button
              onClick={undo}
              disabled={!canUndo}
              className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-30 rounded hover:bg-slate-100 transition-colors cursor-pointer"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 size={15} />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-30 rounded hover:bg-slate-100 transition-colors cursor-pointer"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 size={15} />
            </button>
          </div>
        </div>

        {/* Center: Realtime ATS Score & AI Assistant button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAtsDrawer}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-transform hover:scale-105 shadow-xs cursor-pointer ${scoreColor}`}
          >
            <CheckCircle2 size={14} />
            <span>ATS Score: {score}/100</span>
          </button>

          <button
            onClick={onOpenAiModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs hover:opacity-95 transition-opacity cursor-pointer"
          >
            <Sparkles size={13} className="text-amber-300 animate-spin-slow" />
            <span>AI Assistant</span>
          </button>
        </div>

        {/* Right: Primary Upload & Download Actions + Compact "More Actions" Menu */}
        <div className="flex items-center gap-2">
          {/* Upload Resume Button */}
          {onOpenUploadModal && (
            <button
              onClick={onOpenUploadModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors cursor-pointer"
              title="Upload existing PDF, DOCX, or TXT resume and extract fields"
            >
              <UploadCloud size={15} className="text-white" />
              <span>Upload Resume</span>
            </button>
          )}

          {/* Download PDF Direct */}
          <button
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-extrabold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-60"
          >
            <Download size={15} />
            <span>{isExporting ? 'Exporting...' : 'Download PDF'}</span>
          </button>

          {/* Compact "More Actions" Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setShowMoreMenu(!showMoreMenu); setShowStyleMenu(false); setShowTemplateMenu(false); }}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-250 rounded-lg transition-colors cursor-pointer"
              title="More Actions (Paste Text, Print ATS PDF, Export JSON)"
            >
              <MoreHorizontal size={16} />
              <span className="hidden md:inline">More</span>
              <ChevronDown size={12} className="text-slate-400" />
            </button>

            {showMoreMenu && (
              <div className="absolute right-0 mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-1 space-y-0.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase px-2.5 py-1">Document Actions</div>
                
                {/* Paste Text / Import */}
                <button
                  onClick={() => {
                    onOpenImportModal();
                    setShowMoreMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <FileText size={15} className="text-slate-500" />
                  <span>Paste Raw Text / LinkedIn</span>
                </button>

                {/* Print ATS Vector PDF */}
                <button
                  onClick={() => {
                    exportToVectorPdf();
                    setShowMoreMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <Printer size={15} className="text-brand-600" />
                  <span>Print Vector ATS PDF</span>
                </button>

                {/* Export JSON Backup */}
                <button
                  onClick={() => {
                    exportResumeToJson(resume);
                    setShowMoreMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <FileJson size={15} className="text-purple-600" />
                  <span>Backup Resume JSON</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
