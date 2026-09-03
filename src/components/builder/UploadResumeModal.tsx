import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import { extractTextFromFile, parseResumeContent, ExtractedResumeResult } from '../../services/resumeExtractor';
import { downloadPdfFromElement, exportToVectorPdf } from '../../services/pdfService';
import { TemplateType, FontFamilyType, FontSizeType, SpacingType, ResumeData, ExperienceItem, EducationItem, SkillCategory, ProjectItem, CertificationItem } from '../../types/resume';
import { emptyResumeData } from '../../data/initialData';
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
  Plus,
  Briefcase,
  GraduationCap,
  Code,
  FolderGit2,
  Award,
  User,
  Globe,
  MapPin,
  Mail,
  Phone,
  Edit3
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
  const navigate = useNavigate();
  const { resume, setResume, updateFormatting } = useResume();

  const [step, setStep] = useState<'upload' | 'review' | 'template' | 'preview'>(
    initialStep === 'template' ? 'template' : initialStep === 'preview' ? 'preview' : 'upload'
  );

  const [activeReviewTab, setActiveReviewTab] = useState<'contact' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications'>('contact');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [extractedResult, setExtractedResult] = useState<ExtractedResumeResult | null>(null);
  const [editedData, setEditedData] = useState<Partial<ResumeData> | null>(null);

  const [isExporting, setIsExporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Back button handler
  const handleGoBack = () => {
    if (step === 'review') {
      setStep('upload');
    } else if (step === 'template') {
      if (editedData) {
        setStep('review');
      } else {
        setStep('upload');
      }
    } else if (step === 'preview') {
      setStep('template');
    } else if (step === 'upload') {
      onClose();
    }
  };

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

  // Build full clean ResumeData object from current edited state
  const buildCleanResumeData = (): ResumeData => {
    return {
      ...emptyResumeData,
      id: `resume-${Date.now()}`,
      title: `${editedData?.personalInfo?.fullName || 'Uploaded'} Resume`,
      updatedAt: new Date().toISOString(),
      personalInfo: {
        fullName: editedData?.personalInfo?.fullName || '',
        jobTitle: editedData?.personalInfo?.jobTitle || '',
        email: editedData?.personalInfo?.email || '',
        phone: editedData?.personalInfo?.phone || '',
        location: editedData?.personalInfo?.location || '',
        website: editedData?.personalInfo?.website || '',
        linkedin: editedData?.personalInfo?.linkedin || '',
        github: editedData?.personalInfo?.github || ''
      },
      summary: editedData?.summary || '',
      experience: editedData?.experience || [],
      education: editedData?.education || [],
      skills: editedData?.skills || [],
      projects: editedData?.projects || [],
      certifications: editedData?.certifications || [],
      customSections: editedData?.customSections || [],
      formatting: {
        ...resume.formatting
      }
    };
  };

  // 3. Apply extracted data to active editor state and move to template selection step
  const handleApplyToResume = () => {
    if (!editedData) return;
    const appliedData = buildCleanResumeData();
    setResume(appliedData);
    setStep('template');
  };

  // 4. Apply extracted data and open directly in main Builder creating workspace
  const handleApplyAndEditInBuilder = () => {
    if (!editedData) return;
    const appliedData = buildCleanResumeData();
    setResume(appliedData);
    onClose();
    navigate('/builder');
  };

  // 5. Download PDF
  const handleDownloadPdf = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const nameSlug = (resume.personalInfo.fullName || 'Resume').trim().replace(/\s+/g, '_');
      await downloadPdfFromElement('resume-preview-sheet', `${nameSlug}_Resume.pdf`);
    } catch (e: any) {
      console.error("PDF download failed:", e);
      alert(`PDF download failed: ${e?.message || String(e)}`);
    } finally {
      setIsExporting(false);
    }
  };

  // Helper mutation functions for review editor
  const updatePersonalInfo = (field: keyof typeof emptyResumeData.personalInfo, value: string) => {
    if (!editedData) return;
    setEditedData({
      ...editedData,
      personalInfo: {
        ...editedData.personalInfo!,
        [field]: value
      }
    });
  };

  const addExperienceItem = () => {
    if (!editedData) return;
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: 'Software Role / Title',
      company: 'Company Name',
      location: 'City, State',
      startDate: '2022',
      endDate: 'Present',
      current: true,
      highlights: ['Key accomplishment or metric...']
    };
    setEditedData({
      ...editedData,
      experience: [...(editedData.experience || []), newExp]
    });
  };

  const removeExperienceItem = (id: string) => {
    if (!editedData) return;
    setEditedData({
      ...editedData,
      experience: (editedData.experience || []).filter(e => e.id !== id)
    });
  };

  const addEducationItem = () => {
    if (!editedData) return;
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: 'B.S. in Computer Science',
      institution: 'University Name',
      location: 'City, State',
      startDate: '2018',
      endDate: '2022',
      highlights: []
    };
    setEditedData({
      ...editedData,
      education: [...(editedData.education || []), newEdu]
    });
  };

  const removeEducationItem = (id: string) => {
    if (!editedData) return;
    setEditedData({
      ...editedData,
      education: (editedData.education || []).filter(e => e.id !== id)
    });
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
        
        {/* Header with Back Button */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={handleGoBack}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Go back to previous step"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>

            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center font-bold shadow-md">
              <Sparkles size={18} className="text-white" />
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

        {/* Action Button & Step Navigation Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleGoBack}
              className="px-3 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
            <span className="text-xs sm:text-sm font-bold text-slate-800">
              {step === 'upload' && '1. Upload Resume File'}
              {step === 'review' && '2. Review & Edit Extracted Data'}
              {step === 'template' && '3. Choose ATS Template'}
              {step === 'preview' && '4. Live Preview & Download'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setStep('upload')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                step === 'upload' ? 'bg-brand-600 text-white shadow-xs' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-250'
              }`}
            >
              <UploadCloud size={14} />
              <span>1. Upload</span>
            </button>

            {editedData && (
              <>
                <button
                  onClick={() => setStep('review')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    step === 'review' ? 'bg-brand-600 text-white shadow-xs' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-250'
                  }`}
                >
                  <FileText size={14} className="text-emerald-600" />
                  <span>2. Review Data</span>
                </button>

                <button
                  onClick={handleApplyAndEditInBuilder}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 size={14} />
                  <span>Open in Full Builder</span>
                </button>
              </>
            )}

            <button
              onClick={() => setStep('template')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                step === 'template' ? 'bg-brand-600 text-white shadow-xs' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-250'
              }`}
            >
              <Layout size={14} className="text-brand-600" />
              <span>3. Template</span>
            </button>

            <button
              onClick={() => setStep('preview')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                step === 'preview' ? 'bg-brand-600 text-white shadow-xs' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-250'
              }`}
            >
              <Eye size={14} className="text-indigo-600" />
              <span>4. Preview</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-black text-white transition-all flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-60"
            >
              <Download size={14} className={isExporting ? 'animate-bounce text-emerald-400' : 'text-emerald-400'} />
              <span>{isExporting ? 'Generating PDF...' : 'Download PDF'}</span>
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
                    <span className="text-xs font-semibold text-brand-700">Extracting &amp; parsing all sections ({uploadProgress}%)...</span>
                  </div>
                )}
              </div>

              {/* Privacy Notice */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">100% Privacy Protected:</strong> Uploaded files are processed in browser memory and will not be stored permanently unless you save them.
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: FULL 9-SECTION REVIEW & EDIT INTERFACE */}
          {step === 'review' && editedData && (
            <div className="space-y-6">
              
              {/* Extraction Summary Badges Header */}
              <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-200 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-brand-900 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-brand-600" />
                    <span>Resume Sections Extracted Successfully</span>
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">Review data below or open directly in full Builder creating workspace.</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="text-[11px] bg-white border border-brand-300 text-brand-800 px-2.5 py-1 rounded-xl font-bold">
                    💼 {editedData.experience?.length || 0} Experience
                  </span>
                  <span className="text-[11px] bg-white border border-brand-300 text-brand-800 px-2.5 py-1 rounded-xl font-bold">
                    🎓 {editedData.education?.length || 0} Education
                  </span>
                  <span className="text-[11px] bg-white border border-brand-300 text-brand-800 px-2.5 py-1 rounded-xl font-bold">
                    ⚡ {editedData.skills?.reduce((acc, cat) => acc + cat.items.length, 0) || 0} Skills
                  </span>
                  <span className="text-[11px] bg-white border border-brand-300 text-brand-800 px-2.5 py-1 rounded-xl font-bold">
                    🚀 {editedData.projects?.length || 0} Projects
                  </span>
                </div>
              </div>

              {/* Review Section Navigation Tabs */}
              <div className="flex border-b border-slate-200 overflow-x-auto gap-2 pb-1">
                {[
                  { id: 'contact', label: 'Contact Info', icon: User },
                  { id: 'summary', label: 'Summary', icon: FileText },
                  { id: 'experience', label: `Experience (${editedData.experience?.length || 0})`, icon: Briefcase },
                  { id: 'education', label: `Education (${editedData.education?.length || 0})`, icon: GraduationCap },
                  { id: 'skills', label: 'Skills', icon: Code },
                  { id: 'projects', label: `Projects (${editedData.projects?.length || 0})`, icon: FolderGit2 },
                  { id: 'certifications', label: 'Certifications & Extra', icon: Award },
                ].map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveReviewTab(tab.id as any)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                        activeReviewTab === tab.id
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <Icon size={14} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* TAB 1: CONTACT INFO */}
              {activeReviewTab === 'contact' && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <User size={15} className="text-brand-600" />
                    <span>Personal &amp; Contact Information</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editedData.personalInfo?.fullName || ''}
                        onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                        className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title</label>
                      <input
                        type="text"
                        value={editedData.personalInfo?.jobTitle || ''}
                        onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                        className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                        placeholder="Senior Software Engineer"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={editedData.personalInfo?.email || ''}
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                        className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={editedData.personalInfo?.phone || ''}
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                        className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={editedData.personalInfo?.location || ''}
                        onChange={(e) => updatePersonalInfo('location', e.target.value)}
                        className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                        placeholder="San Francisco, CA"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Website / Portfolio</label>
                      <input
                        type="text"
                        value={editedData.personalInfo?.website || ''}
                        onChange={(e) => updatePersonalInfo('website', e.target.value)}
                        className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                        placeholder="mywebsite.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile</label>
                      <input
                        type="text"
                        value={editedData.personalInfo?.linkedin || ''}
                        onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                        className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                        placeholder="linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub Profile</label>
                      <input
                        type="text"
                        value={editedData.personalInfo?.github || ''}
                        onChange={(e) => updatePersonalInfo('github', e.target.value)}
                        className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                        placeholder="github.com/username"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SUMMARY */}
              {activeReviewTab === 'summary' && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <FileText size={15} className="text-brand-600" />
                    <span>Professional Summary</span>
                  </h3>
                  <textarea
                    rows={4}
                    value={editedData.summary || ''}
                    onChange={(e) => setEditedData({ ...editedData, summary: e.target.value })}
                    className="w-full text-xs p-3 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="Write or review your executive summary..."
                  />
                </div>
              )}

              {/* TAB 3: EXPERIENCE */}
              {activeReviewTab === 'experience' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <Briefcase size={15} className="text-brand-600" />
                      <span>Work Experience ({editedData.experience?.length || 0} roles)</span>
                    </h3>

                    <button
                      onClick={addExperienceItem}
                      className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Add Position</span>
                    </button>
                  </div>

                  {(editedData.experience || []).map((exp, expIdx) => (
                    <div key={exp.id || expIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-xs font-bold text-slate-800">Position #{expIdx + 1}</span>
                        <button
                          onClick={() => removeExperienceItem(exp.id)}
                          className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 size={13} />
                          <span>Delete Position</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Job Role</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => {
                              const updated = [...(editedData.experience || [])];
                              updated[expIdx].role = e.target.value;
                              setEditedData({ ...editedData, experience: updated });
                            }}
                            className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Employer</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => {
                              const updated = [...(editedData.experience || [])];
                              updated[expIdx].company = e.target.value;
                              setEditedData({ ...editedData, experience: updated });
                            }}
                            className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                          <input
                            type="text"
                            value={exp.location || ''}
                            onChange={(e) => {
                              const updated = [...(editedData.experience || [])];
                              updated[expIdx].location = e.target.value;
                              setEditedData({ ...editedData, experience: updated });
                            }}
                            className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Date Range</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={exp.startDate}
                              onChange={(e) => {
                                const updated = [...(editedData.experience || [])];
                                updated[expIdx].startDate = e.target.value;
                                setEditedData({ ...editedData, experience: updated });
                              }}
                              className="w-1/2 text-xs p-2 bg-white border border-slate-300 rounded-xl"
                              placeholder="Start"
                            />
                            <input
                              type="text"
                              value={exp.endDate}
                              onChange={(e) => {
                                const updated = [...(editedData.experience || [])];
                                updated[expIdx].endDate = e.target.value;
                                setEditedData({ ...editedData, experience: updated });
                              }}
                              className="w-1/2 text-xs p-2 bg-white border border-slate-300 rounded-xl"
                              placeholder="End"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Bullet points */}
                      <div className="space-y-1.5 pt-2">
                        <label className="block text-xs font-semibold text-slate-700">Key Accomplishments (One per line)</label>
                        <textarea
                          rows={3}
                          value={(exp.highlights || []).join('\n')}
                          onChange={(e) => {
                            const updated = [...(editedData.experience || [])];
                            updated[expIdx].highlights = e.target.value.split('\n').filter(Boolean);
                            setEditedData({ ...editedData, experience: updated });
                          }}
                          className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl font-sans"
                          placeholder="Bullet point accomplishment..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: EDUCATION */}
              {activeReviewTab === 'education' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <GraduationCap size={15} className="text-brand-600" />
                      <span>Education ({editedData.education?.length || 0} entries)</span>
                    </h3>

                    <button
                      onClick={addEducationItem}
                      className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Add Education</span>
                    </button>
                  </div>

                  {(editedData.education || []).map((edu, eduIdx) => (
                    <div key={edu.id || eduIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-xs font-bold text-slate-800">Education #{eduIdx + 1}</span>
                        <button
                          onClick={() => removeEducationItem(edu.id)}
                          className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Degree / Certification</label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => {
                              const updated = [...(editedData.education || [])];
                              updated[eduIdx].degree = e.target.value;
                              setEditedData({ ...editedData, education: updated });
                            }}
                            className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Institution / School</label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => {
                              const updated = [...(editedData.education || [])];
                              updated[eduIdx].institution = e.target.value;
                              setEditedData({ ...editedData, education: updated });
                            }}
                            className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                          <input
                            type="text"
                            value={edu.location || ''}
                            onChange={(e) => {
                              const updated = [...(editedData.education || [])];
                              updated[eduIdx].location = e.target.value;
                              setEditedData({ ...editedData, education: updated });
                            }}
                            className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Graduation Year</label>
                          <input
                            type="text"
                            value={edu.endDate || ''}
                            onChange={(e) => {
                              const updated = [...(editedData.education || [])];
                              updated[eduIdx].endDate = e.target.value;
                              setEditedData({ ...editedData, education: updated });
                            }}
                            className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 5: SKILLS */}
              {activeReviewTab === 'skills' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <Code size={15} className="text-brand-600" />
                      <span>Extracted Skills Categories &amp; Tags</span>
                    </h3>
                  </div>

                  {(editedData.skills || []).map((cat, catIdx) => (
                    <div key={cat.id || catIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Category Title</label>
                        <input
                          type="text"
                          value={cat.category}
                          onChange={(e) => {
                            const updated = [...(editedData.skills || [])];
                            updated[catIdx].category = e.target.value;
                            setEditedData({ ...editedData, skills: updated });
                          }}
                          className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Skill Items (Comma Separated)</label>
                        <textarea
                          rows={2}
                          value={cat.items.join(', ')}
                          onChange={(e) => {
                            const updated = [...(editedData.skills || [])];
                            updated[catIdx].items = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                            setEditedData({ ...editedData, skills: updated });
                          }}
                          className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 6: PROJECTS */}
              {activeReviewTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <FolderGit2 size={15} className="text-brand-600" />
                      <span>Projects ({editedData.projects?.length || 0} items)</span>
                    </h3>
                  </div>

                  {(editedData.projects || []).map((proj, projIdx) => (
                    <div key={proj.id || projIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Project Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => {
                              const updated = [...(editedData.projects || [])];
                              updated[projIdx].title = e.target.value;
                              setEditedData({ ...editedData, projects: updated });
                            }}
                            className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Subtitle / Tech Stack</label>
                          <input
                            type="text"
                            value={proj.subtitle || ''}
                            onChange={(e) => {
                              const updated = [...(editedData.projects || [])];
                              updated[projIdx].subtitle = e.target.value;
                              setEditedData({ ...editedData, projects: updated });
                            }}
                            className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 7: CERTIFICATIONS & EXTRA */}
              {activeReviewTab === 'certifications' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <Award size={15} className="text-brand-600" />
                      <span>Certifications ({editedData.certifications?.length || 0})</span>
                    </h3>
                  </div>

                  {(editedData.certifications || []).map((cert, certIdx) => (
                    <div key={cert.id || certIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Certification Name</label>
                        <input
                          type="text"
                          value={cert.name}
                          onChange={(e) => {
                            const updated = [...(editedData.certifications || [])];
                            updated[certIdx].name = e.target.value;
                            setEditedData({ ...editedData, certifications: updated });
                          }}
                          className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Issuer</label>
                        <input
                          type="text"
                          value={cert.issuer || ''}
                          onChange={(e) => {
                            const updated = [...(editedData.certifications || [])];
                            updated[certIdx].issuer = e.target.value;
                            setEditedData({ ...editedData, certifications: updated });
                          }}
                          className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                        <input
                          type="text"
                          value={cert.date || ''}
                          onChange={(e) => {
                            const updated = [...(editedData.certifications || [])];
                            updated[certIdx].date = e.target.value;
                            setEditedData({ ...editedData, certifications: updated });
                          }}
                          className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleGoBack}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft size={14} />
                    <span>Back to Upload</span>
                  </button>

                  <button
                    onClick={handleDeleteUploadedData}
                    className="px-3.5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold border border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 size={14} />
                    <span>Reset</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleApplyAndEditInBuilder}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <Edit3 size={15} />
                    <span>Apply &amp; Edit in Full Builder</span>
                  </button>

                  <button
                    onClick={handleApplyToResume}
                    className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Choose Template Style</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: TEMPLATE SELECTION & FORMATTING */}
          {step === 'template' && (
            <div className="space-y-6">
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
              <div className="flex justify-between items-center gap-3 pt-2">
                <button
                  onClick={handleGoBack}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft size={14} />
                  <span>Back to Review Data</span>
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={handleApplyAndEditInBuilder}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <Edit3 size={15} />
                    <span>Open in Full Builder Editor</span>
                  </button>

                  <button
                    onClick={() => setStep('preview')}
                    className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Go to Live Preview</span>
                    <Eye size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: LIVE PREVIEW */}
          {step === 'preview' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleGoBack}
                    className="px-3 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft size={14} />
                    <span>Back to Templates</span>
                  </button>

                  <span className="text-xs font-bold text-slate-700">
                    Live Preview: Template &ldquo;{resume.formatting.template.toUpperCase()}&rdquo;
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      navigate('/builder');
                    }}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Edit3 size={14} />
                    <span>Open in Full Builder Workspace</span>
                  </button>

                  <button
                    onClick={handleDownloadPdf}
                    disabled={isExporting}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-60"
                  >
                    <Download size={14} className={isExporting ? 'animate-bounce' : ''} />
                    <span>{isExporting ? 'Generating PDF...' : 'Download ATS-Friendly PDF'}</span>
                  </button>
                </div>
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
