import React, { useState, useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import { extractTextFromFile, parseResumeContent, ExtractedResumeResult } from '../../services/resumeExtractor';
import { downloadPdfFromElement, exportToVectorPdf } from '../../services/pdfService';
import { TemplateType, FontFamilyType, FontSizeType, SpacingType, ResumeData } from '../../types/resume';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
  Layout,
  Palette,
  Eye,
  Download,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Check,
  Sliders,
  Type,
  Maximize2
} from 'lucide-react';
import { ResumePreview } from './ResumePreview';

interface UploadResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: 'upload' | 'template' | 'preview';
}

export const UploadResumeModal: React.FC<UploadResumeModalProps> = ({
  isOpen,
  onClose,
  initialStep = 'upload'
}) => {
  const { resume, setResume, updateResume, updateFormatting } = useResume();

  const [step, setStep] = useState<'upload' | 'review' | 'template' | 'preview'>(
    initialStep === 'template' ? 'template' : initialStep === 'preview' ? 'preview' : 'upload'
  );

  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [extractedResult, setExtractedResult] = useState<ExtractedResumeResult | null>(null);
  const [editedData, setEditedData] = useState<Partial<ResumeData> | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // 1. File Upload Handler
  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    setErrorMessage(null);
    setUploadProgress(20);

    try {
      setUploadProgress(50);
      const text = await extractTextFromFile(file);
      setUploadProgress(80);

      const parsed = parseResumeContent(text);
      setUploadProgress(100);

      setExtractedResult(parsed);

      // Merge with initial blank structure for field edits
      const merged: Partial<ResumeData> = {
        ...parsed.data,
        personalInfo: {
          fullName: parsed.data.personalInfo?.fullName || '',
          jobTitle: parsed.data.personalInfo?.jobTitle || '',
          email: parsed.data.personalInfo?.email || '',
          phone: parsed.data.personalInfo?.phone || '',
          location: parsed.data.personalInfo?.location || '',
          website: parsed.data.personalInfo?.website || '',
          linkedin: parsed.data.personalInfo?.linkedin || '',
          github: parsed.data.personalInfo?.github || ''
        },
        summary: parsed.data.summary || '',
        experience: parsed.data.experience || [],
        education: parsed.data.education || [],
        skills: parsed.data.skills || [],
        projects: parsed.data.projects || [],
        certifications: parsed.data.certifications || [],
        customSections: parsed.data.customSections || []
      };

      setEditedData(merged);
      setStep('review');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to extract file contents.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // 2. Clear Uploaded Data
  const handleDeleteUploadedData = () => {
    if (window.confirm('Delete extracted upload data and reset form?')) {
      setExtractedResult(null);
      setEditedData(null);
      setStep('upload');
      setErrorMessage(null);
    }
  };

  // 3. Apply extracted data to active editor state
  const handleApplyToResume = () => {
    if (!editedData) return;
    updateResume(prev => ({
      ...prev,
      ...editedData,
      personalInfo: { ...prev.personalInfo, ...(editedData.personalInfo || {}) },
      summary: editedData.summary || prev.summary,
      experience: editedData.experience || prev.experience,
      education: editedData.education || prev.education,
      skills: editedData.skills || prev.skills,
      projects: editedData.projects || prev.projects,
      certifications: editedData.certifications || prev.certifications,
      customSections: editedData.customSections || prev.customSections
    }));
    setStep('template');
  };

  // 4. Download PDF
  const handleDownloadPdf = async () => {
    try {
      await downloadPdfFromElement('resume-preview-sheet', `${(resume.personalInfo.fullName || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`);
    } catch (e: any) {
      exportToVectorPdf();
    }
  };

  const templates: Array<{ id: TemplateType; name: string; desc: string }> = [
    { id: 'modern', name: 'Modern Clean', desc: 'Balanced single-column layout suitable for tech and corporate roles.' },
    { id: 'tech', name: 'Tech Minimal', desc: 'Sleek developer layout emphasizing technical skills and project metrics.' },
    { id: 'executive', name: 'Executive Serif', desc: 'Sophisticated typography designed for leadership and finance roles.' },
    { id: 'slate', name: 'Slate Elegant', desc: 'Contemporary layout with dark accent headings and clean section dividers.' },
    { id: 'compact', name: 'Compact Density', desc: 'Maximizes page efficiency for dense multi-year work histories.' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center font-bold shadow-md">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg">Upload Resume &amp; Apply Template</h2>
              <p className="text-xs text-slate-400">Convert PDF, DOCX, or TXT into ATS-optimized templates</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Action Button Navigation Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Required CTA Headline */}
          <div className="text-xs sm:text-sm font-bold text-slate-800 max-w-xl">
            Already have a resume? Upload it, choose a template, and create a professionally formatted resume in minutes.
          </div>

          {/* 4 Required Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setStep('upload')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                step === 'upload' ? 'bg-brand-600 text-white shadow-xs' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-250'
              }`}
            >
              <UploadCloud size={14} />
              <span>Upload My Resume</span>
            </button>

            <button
              onClick={() => setStep('template')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                step === 'template' ? 'bg-brand-600 text-white shadow-xs' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-250'
              }`}
            >
              <Layout size={14} className="text-brand-600" />
              <span>Choose a Template</span>
            </button>

            <button
              onClick={() => setStep('preview')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                step === 'preview' ? 'bg-brand-600 text-white shadow-xs' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-250'
              }`}
            >
              <Eye size={14} className="text-indigo-600" />
              <span>Preview Resume</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-black text-white transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Download size={14} className="text-emerald-400" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          
          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <AlertTriangle size={16} className="text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: UPLOAD */}
          {step === 'upload' && (
            <div className="space-y-6 max-w-2xl mx-auto py-4">
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-3 border-dashed border-brand-200 hover:border-brand-500 bg-brand-50/30 hover:bg-brand-50/70 p-8 sm:p-12 rounded-3xl text-center cursor-pointer transition-all space-y-4 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-100 text-brand-600 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UploadCloud size={32} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    Drop your resume file here or click to browse
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Supports <strong>PDF, DOCX, or TXT</strong> files (Max 10MB)
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                  className="hidden"
                />

                {isProcessing && (
                  <div className="pt-4 max-w-xs mx-auto space-y-2">
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-600 transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                    <span className="text-[11px] font-bold text-brand-700">Extracting &amp; parsing sections ({uploadProgress}%)...</span>
                  </div>
                )}
              </div>

              {/* Privacy Notice */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">100% Privacy Protected:</strong> Uploaded files are processed in your browser memory and will not be stored permanently unless you choose to save them. You can delete uploaded data at any time.
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: REVIEW & CORRECT EXTRACTED FIELDS */}
          {step === 'review' && editedData && (
            <div className="space-y-6">
              
              {/* Unextracted Fields Warning Banner */}
              {extractedResult && extractedResult.unextractedFields.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                    <AlertTriangle size={16} className="text-amber-600" />
                    <span>Field Extraction Summary ({extractedResult.unextractedFields.length} items not detected):</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {extractedResult.unextractedFields.map((field) => (
                      <span key={field} className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-md font-bold">
                        ⚠️ {field} missing in upload
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-amber-800">
                    Please review and complete any empty fields below before applying to your template.
                  </p>
                </div>
              )}

              {/* Section 1: Contact Info */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <FileText size={15} className="text-brand-600" />
                  <span>1. Full Name &amp; Contact Information</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={editedData.personalInfo?.fullName || ''}
                      onChange={(e) => setEditedData({ ...editedData, personalInfo: { ...editedData.personalInfo!, fullName: e.target.value } })}
                      className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Job Title</label>
                    <input
                      type="text"
                      value={editedData.personalInfo?.jobTitle || ''}
                      onChange={(e) => setEditedData({ ...editedData, personalInfo: { ...editedData.personalInfo!, jobTitle: e.target.value } })}
                      className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={editedData.personalInfo?.email || ''}
                      onChange={(e) => setEditedData({ ...editedData, personalInfo: { ...editedData.personalInfo!, email: e.target.value } })}
                      className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={editedData.personalInfo?.phone || ''}
                      onChange={(e) => setEditedData({ ...editedData, personalInfo: { ...editedData.personalInfo!, phone: e.target.value } })}
                      className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Summary */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">2. Professional Summary</h3>
                <textarea
                  rows={3}
                  value={editedData.summary || ''}
                  onChange={(e) => setEditedData({ ...editedData, summary: e.target.value })}
                  className="w-full text-xs p-3 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="Professional summary..."
                />
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={handleDeleteUploadedData}
                  className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold border border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 size={14} />
                  <span>Delete Uploaded Data</span>
                </button>

                <button
                  onClick={handleApplyToResume}
                  className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Apply &amp; Select Template</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: TEMPLATE SELECTION & FORMATTING */}
          {step === 'template' && (
            <div className="space-y-6">
              
              {/* Template Cards */}
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  Select ATS Template Style
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {templates.map((tpl) => (
                    <div
                      key={tpl.id}
                      onClick={() => updateFormatting({ template: tpl.id })}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        resume.formatting.template === tpl.id
                          ? 'border-brand-600 bg-brand-50/50 shadow-md'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-black text-sm text-slate-900">{tpl.name}</h4>
                          {resume.formatting.template === tpl.id && (
                            <span className="p-1 rounded-full bg-brand-600 text-white">
                              <Check size={12} />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{tpl.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formatting Controls */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Palette size={15} className="text-brand-600" />
                  <span>Customize Colors, Fonts &amp; Spacing</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  {/* Colors */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Accent Color</label>
                    <div className="flex items-center gap-2">
                      {['#4f46e5', '#0284c7', '#059669', '#dc2626', '#334155'].map((color) => (
                        <button
                          key={color}
                          onClick={() => updateFormatting({ accentColor: color })}
                          className={`w-7 h-7 rounded-full border-2 transition-transform ${
                            resume.formatting.accentColor === color ? 'scale-110 border-slate-900' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Fonts */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Font Family</label>
                    <select
                      value={resume.formatting.fontFamily}
                      onChange={(e) => updateFormatting({ fontFamily: e.target.value as FontFamilyType })}
                      className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl font-bold"
                    >
                      <option value="outfit">Outfit (Sans)</option>
                      <option value="inter">Inter (Clean)</option>
                      <option value="serif">Merriweather (Serif)</option>
                      <option value="mono">JetBrains (Mono)</option>
                    </select>
                  </div>

                  {/* Font Size */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Font Size</label>
                    <select
                      value={resume.formatting.fontSize}
                      onChange={(e) => updateFormatting({ fontSize: e.target.value as FontSizeType })}
                      className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl font-bold"
                    >
                      <option value="sm">Small (Compact)</option>
                      <option value="base">Medium (Standard)</option>
                      <option value="lg">Large (Spacious)</option>
                    </select>
                  </div>

                  {/* Spacing */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Section Spacing</label>
                    <select
                      value={resume.formatting.spacing}
                      onChange={(e) => updateFormatting({ spacing: e.target.value as SpacingType })}
                      className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl font-bold"
                    >
                      <option value="compact">Tight</option>
                      <option value="normal">Normal</option>
                      <option value="relaxed">Relaxed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step Navigation */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setStep('preview')}
                  className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Go to Live Preview</span>
                  <Eye size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: LIVE PREVIEW */}
          {step === 'preview' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700">
                  Live Preview: Template &ldquo;{resume.formatting.template.toUpperCase()}&rdquo;
                </span>

                <button
                  onClick={handleDownloadPdf}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download ATS-Friendly PDF</span>
                </button>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-inner max-h-[550px] overflow-y-auto bg-slate-200 p-4">
                <ResumePreview />
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
