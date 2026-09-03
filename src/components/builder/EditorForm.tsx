import React, { useState, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import { enhanceBulletPoint, generateSummary } from '../../services/aiService';
import { exportToVectorPdf, downloadPdfFromElement, exportResumeToJson } from '../../services/pdfService';
import { TEMPLATE_LIST } from '../templates';
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  Palette,
  Download,
  Plus,
  Trash2,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  FolderGit2,
  Award,
  Info,
  Check,
  Printer,
  FileJson,
  SlidersHorizontal
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STEPS = [
  { id: 1, name: 'Personal Details', shortName: 'Personal', icon: User, desc: 'Contact info & job title' },
  { id: 2, name: 'Professional Summary', shortName: 'Summary', icon: FileText, desc: 'Career summary' },
  { id: 3, name: 'Work Experience', shortName: 'Experience', icon: Briefcase, desc: 'Employment & projects' },
  { id: 4, name: 'Education', shortName: 'Education', icon: GraduationCap, desc: 'Degrees & certifications' },
  { id: 5, name: 'Skills', shortName: 'Skills', icon: Wrench, desc: 'Technical skills & tools' },
  { id: 6, name: 'Template & Design', shortName: 'Design', icon: Palette, desc: 'Layout, fonts & colors' },
  { id: 7, name: 'Preview & Download', shortName: 'Download', icon: Download, desc: 'Final check & PDF export' }
];

export const EditorForm: React.FC = () => {
  const {
    resume,
    updatePersonalInfo,
    updateSummary,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkillCategory,
    updateSkillCategory,
    removeSkillCategory,
    addProject,
    updateProject,
    removeProject,
    addCertification,
    updateCertification,
    removeCertification,
    updateFormatting,
    atsAnalysis
  } = useResume();

  // Remember progress step in localStorage
  const [currentStep, setCurrentStep] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('resume_builder_step');
      return saved ? Math.min(Math.max(parseInt(saved, 10), 1), 7) : 1;
    } catch {
      return 1;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('resume_builder_step', String(currentStep));
    } catch (e) {
      console.warn('Unable to persist step position', e);
    }
  }, [currentStep]);

  // Collapsible sections within steps
  const [showMorePersonal, setShowMorePersonal] = useState(false);
  const [showMoreExperience, setShowMoreExperience] = useState(false);
  const [showMoreEducation, setShowMoreEducation] = useState(false);
  const [showMoreDesign, setShowMoreDesign] = useState(false);

  const [enhancingBulletKey, setEnhancingBulletKey] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [nameError, setNameError] = useState(false);

  const colors = [
    { label: 'Cyan Blue', hex: '#0284c7' },
    { label: 'Teal Emerald', hex: '#0d9488' },
    { label: 'Indigo', hex: '#4f46e5' },
    { label: 'Slate Navy', hex: '#1e293b' },
    { label: 'Rose Burgundy', hex: '#be123c' },
    { label: 'Forest Green', hex: '#15803d' },
  ];

  const handleNextStep = () => {
    if (currentStep === 1 && !resume.personalInfo.fullName.trim()) {
      setNameError(true);
      return;
    }
    setNameError(false);
    if (currentStep < 7) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAiPolishBullet = (expId: string, bulletIndex: number, currentText: string) => {
    const key = `${expId}-${bulletIndex}`;
    setEnhancingBulletKey(key);
    setTimeout(() => {
      const polished = enhanceBulletPoint(currentText, resume.personalInfo.jobTitle);
      const exp = resume.experience.find(e => e.id === expId);
      if (exp) {
        const newHighlights = [...exp.highlights];
        newHighlights[bulletIndex] = polished;
        updateExperience(expId, { highlights: newHighlights });
      }
      setEnhancingBulletKey(null);
    }, 300);
  };

  const handleAiPolishProjectBullet = (projId: string, bulletIndex: number, currentText: string) => {
    const key = `proj-${projId}-${bulletIndex}`;
    setEnhancingBulletKey(key);
    setTimeout(() => {
      const polished = enhanceBulletPoint(currentText, resume.personalInfo.jobTitle);
      const proj = resume.projects.find(p => p.id === projId);
      if (proj) {
        const newHighlights = [...proj.highlights];
        newHighlights[bulletIndex] = polished;
        updateProject(projId, { highlights: newHighlights });
      }
      setEnhancingBulletKey(null);
    }, 300);
  };

  const handleAiGenerateSummary = () => {
    const aiSummary = generateSummary(resume);
    updateSummary(aiSummary);
  };

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
    } catch (error) {
      console.error('Download failed', error);
    } finally {
      setIsExporting(false);
    }
  };

  const currentStepObj = STEPS.find(s => s.id === currentStep) || STEPS[0];
  const progressPercent = Math.round((currentStep / STEPS.length) * 100);

  return (
    <div className="flex flex-col min-h-full pb-24">
      
      {/* 1. TOP PROGRESS STEPPER INDICATOR */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs mb-5 space-y-3">
        {/* Step Title Header & Progress % */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600">
              Step {currentStep} of {STEPS.length}
            </span>
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
              {currentStepObj.name}
            </h2>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-slate-700">{progressPercent}% Completed</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-brand-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step Buttons Row */}
        <div className="grid grid-cols-7 gap-1 pt-1">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isCurrent = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  setNameError(false);
                  setCurrentStep(step.id);
                }}
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={`Go to step ${step.id}: ${step.name}`}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-brand-50 border-2 border-brand-600 text-brand-900 shadow-xs'
                    : isCompleted
                    ? 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                    : 'bg-white border border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isCurrent
                    ? 'bg-brand-600 text-white'
                    : isCompleted
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {isCompleted ? <Check size={12} /> : step.id}
                </div>
                <span className="text-[10px] font-bold mt-1 truncate max-w-full hidden md:inline">
                  {step.shortName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. CURRENT STEP FORM CONTENT */}
      <div className="flex-1 space-y-4">

        {/* STEP 1: PERSONAL DETAILS */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {/* Primary Details Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <User className="text-brand-600 shrink-0" size={18} />
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wide text-slate-800">Primary Contact Details</h3>
                  <p className="text-[11px] text-slate-500">Essential information that appears at the top of your resume.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="field-fullName" className="text-xs font-bold text-slate-700 block mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="field-fullName"
                    type="text"
                    required
                    value={resume.personalInfo.fullName}
                    onChange={(e) => {
                      updatePersonalInfo('fullName', e.target.value);
                      if (e.target.value.trim()) setNameError(false);
                    }}
                    placeholder="e.g. Alexander Wright"
                    className={`w-full text-xs p-2.5 bg-slate-50/60 border rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all ${
                      nameError ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                  {nameError && (
                    <span className="text-[11px] font-semibold text-rose-600 mt-1 block">Please enter your full name to continue.</span>
                  )}
                </div>

                <div>
                  <label htmlFor="field-jobTitle" className="text-xs font-bold text-slate-700 block mb-1">
                    Target Job Title
                  </label>
                  <input
                    id="field-jobTitle"
                    type="text"
                    value={resume.personalInfo.jobTitle}
                    onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                    placeholder="e.g. Senior Full-Stack Engineer"
                    className="w-full text-xs p-2.5 bg-slate-50/60 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label htmlFor="field-email" className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    id="field-email"
                    type="email"
                    value={resume.personalInfo.email}
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full text-xs p-2.5 bg-slate-50/60 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="field-phone" className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    id="field-phone"
                    type="tel"
                    value={resume.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full text-xs p-2.5 bg-slate-50/60 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="field-location" className="text-xs font-bold text-slate-700 block mb-1">Location</label>
                  <input
                    id="field-location"
                    type="text"
                    value={resume.personalInfo.location}
                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                    placeholder="San Francisco, CA"
                    className="w-full text-xs p-2.5 bg-slate-50/60 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Collapsed Optional Settings: Social Links */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => setShowMorePersonal(!showMorePersonal)}
                className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-100/60 transition-colors text-left cursor-pointer"
              >
                <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <SlidersHorizontal size={14} className="text-brand-600" />
                  More options (Social & Portfolio links)
                </span>
                {showMorePersonal ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
              </button>

              {showMorePersonal && (
                <div className="p-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3.5 animate-in fade-in duration-150">
                  <div>
                    <label htmlFor="field-linkedin" className="text-xs font-bold text-slate-700 block mb-1">LinkedIn URL</label>
                    <input
                      id="field-linkedin"
                      type="text"
                      value={resume.personalInfo.linkedin}
                      onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                      placeholder="linkedin.com/in/username"
                      className="w-full text-xs p-2.5 bg-slate-50/60 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="field-github" className="text-xs font-bold text-slate-700 block mb-1">GitHub Profile</label>
                    <input
                      id="field-github"
                      type="text"
                      value={resume.personalInfo.github}
                      onChange={(e) => updatePersonalInfo('github', e.target.value)}
                      placeholder="github.com/username"
                      className="w-full text-xs p-2.5 bg-slate-50/60 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="field-website" className="text-xs font-bold text-slate-700 block mb-1">Personal Website</label>
                    <input
                      id="field-website"
                      type="text"
                      value={resume.personalInfo.website}
                      onChange={(e) => updatePersonalInfo('website', e.target.value)}
                      placeholder="portfolio.dev"
                      className="w-full text-xs p-2.5 bg-slate-50/60 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: PROFESSIONAL SUMMARY */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="text-brand-600 shrink-0" size={18} />
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wide text-slate-800">Professional Summary</h3>
                    <p className="text-[11px] text-slate-500">2-4 sentences showcasing your domain expertise &amp; key accomplishments.</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAiGenerateSummary}
                  className="flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-xl transition-colors border border-purple-200 cursor-pointer shadow-2xs"
                >
                  <Sparkles size={13} className="text-purple-600" />
                  <span>AI Generate Summary</span>
                </button>
              </div>

              <textarea
                rows={6}
                value={resume.summary}
                onChange={(e) => updateSummary(e.target.value)}
                placeholder="Results-driven Senior Software Engineer with 5+ years of experience engineering high-throughput distributed backend services and responsive frontends..."
                className="w-full text-xs p-3.5 bg-slate-50/60 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 leading-relaxed"
              />

              <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-100 text-xs text-blue-900 flex items-start gap-2">
                <Info size={15} className="text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Pro Tip:</strong> Focus on quantitative metrics (e.g. "Increased platform throughput by 40%"). Keep sentences active and concise.</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: WORK EXPERIENCE */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="text-brand-600 shrink-0" size={18} />
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wide text-slate-800">
                      Work Experience ({resume.experience.length})
                    </h3>
                    <p className="text-[11px] text-slate-500">List work history in reverse chronological order.</p>
                  </div>
                </div>
              </div>

              {/* Google X-Y-Z Rule Banner */}
              <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2">
                <Sparkles size={15} className="text-emerald-600 shrink-0" />
                <span><strong>Google X-Y-Z Rule:</strong> "Accomplished [X], as measured by [Y], by doing [Z]". Use the AI polish icon on bullets!</span>
              </div>

              {/* Roles List */}
              {resume.experience.map((exp, expIdx) => (
                <div key={exp.id} className="p-4 bg-slate-50/70 border border-slate-200 rounded-2xl space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-800">Position #{expIdx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      className="text-rose-500 hover:text-rose-700 p-1 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Remove experience"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Job Title</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                        placeholder="Senior Software Engineer"
                        className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Company / Organization</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                        placeholder="Google / Stripe"
                        className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Start Date</label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                        placeholder="2022-03"
                        className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">End Date</label>
                      <input
                        type="text"
                        disabled={exp.current}
                        value={exp.current ? 'Present' : exp.endDate}
                        onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                        placeholder="2024-06"
                        className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-500 disabled:bg-slate-100 disabled:text-slate-400"
                      />
                    </div>
                    <div className="flex items-center pt-5">
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                          className="rounded text-brand-600 focus:ring-brand-500"
                        />
                        <span>Current Role</span>
                      </label>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                        placeholder="San Francisco, CA"
                        className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wide">Key Accomplishments</label>
                      <button
                        type="button"
                        onClick={() => {
                          const newBullets = [...exp.highlights, 'Architected scalable microservices, reducing API latency by 35% across 100k+ active users.'];
                          updateExperience(exp.id, { highlights: newBullets });
                        }}
                        className="text-xs text-brand-600 font-bold hover:text-brand-800 flex items-center gap-1 cursor-pointer"
                      >
                        <Plus size={13} /> Add Bullet Point
                      </button>
                    </div>

                    <div className="space-y-2">
                      {exp.highlights.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-1.5">
                          <textarea
                            rows={2}
                            value={bullet}
                            onChange={(e) => {
                              const updated = [...exp.highlights];
                              updated[bIdx] = e.target.value;
                              updateExperience(exp.id, { highlights: updated });
                            }}
                            className="flex-1 text-xs p-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-500 leading-snug"
                          />
                          <button
                            type="button"
                            onClick={() => handleAiPolishBullet(exp.id, bIdx, bullet)}
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-xl border border-purple-200 bg-white transition-colors cursor-pointer shrink-0"
                            title="AI Polish with Google X-Y-Z Formula"
                          >
                            <Sparkles size={14} className={enhancingBulletKey === `${exp.id}-${bIdx}` ? 'animate-spin' : ''} />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = exp.highlights.filter((_, idx) => idx !== bIdx);
                              updateExperience(exp.id, { highlights: updated });
                            }}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-slate-200 bg-white transition-colors cursor-pointer shrink-0"
                            title="Delete bullet"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addExperience}
                className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 transition-colors border border-dashed border-slate-300 cursor-pointer"
              >
                <Plus size={16} /> Add Work Experience
              </button>
            </div>

            {/* Collapsed Optional Settings: Projects */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => setShowMoreExperience(!showMoreExperience)}
                className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-100/60 transition-colors text-left cursor-pointer"
              >
                <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <FolderGit2 size={15} className="text-brand-600" />
                  More options (Key Projects &amp; Portfolio Highlights) ({resume.projects.length})
                </span>
                {showMoreExperience ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
              </button>

              {showMoreExperience && (
                <div className="p-4 border-t border-slate-100 space-y-4 animate-in fade-in duration-150">
                  {resume.projects.map((proj, pIdx) => (
                    <div key={proj.id} className="p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">Project #{pIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeProject(proj.id)}
                          className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                          placeholder="Project Name (e.g. AI Resume Builder)"
                          className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl outline-none"
                        />
                        <input
                          type="text"
                          value={proj.link || ''}
                          onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                          placeholder="Project URL (e.g. github.com/user/project)"
                          className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl outline-none"
                        />
                      </div>

                      <input
                        type="text"
                        value={proj.technologies?.join(', ') || ''}
                        onChange={(e) => updateProject(proj.id, { technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                        placeholder="Technologies (e.g. React, TypeScript, Node.js)"
                        className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl outline-none"
                      />

                      {/* Project Bullet Highlights */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[11px] font-bold text-slate-700 uppercase">Impact Highlights</label>
                          <button
                            type="button"
                            onClick={() => {
                              const newHighlights = [...proj.highlights, 'Built full-stack web application serving 500+ active users.'];
                              updateProject(proj.id, { highlights: newHighlights });
                            }}
                            className="text-xs text-brand-600 font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Plus size={12} /> Add Point
                          </button>
                        </div>
                        {proj.highlights.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-1.5 mt-1.5">
                            <input
                              type="text"
                              value={bullet}
                              onChange={(e) => {
                                const updated = [...proj.highlights];
                                updated[bIdx] = e.target.value;
                                updateProject(proj.id, { highlights: updated });
                              }}
                              className="flex-1 text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => handleAiPolishProjectBullet(proj.id, bIdx, bullet)}
                              className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg border border-purple-200 bg-white cursor-pointer"
                              title="AI Polish"
                            >
                              <Sparkles size={13} className={enhancingBulletKey === `proj-${proj.id}-${bIdx}` ? 'animate-spin' : ''} />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = proj.highlights.filter((_, idx) => idx !== bIdx);
                                updateProject(proj.id, { highlights: updated });
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg border border-slate-200 bg-white cursor-pointer"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addProject}
                    className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 border border-dashed border-slate-300 cursor-pointer"
                  >
                    <Plus size={15} /> Add Key Project
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: EDUCATION */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <GraduationCap className="text-brand-600 shrink-0" size={18} />
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wide text-slate-800">
                    Education ({resume.education.length})
                  </h3>
                  <p className="text-[11px] text-slate-500">Degrees, universities, and academic accomplishments.</p>
                </div>
              </div>

              {resume.education.map((edu) => (
                <div key={edu.id} className="p-4 bg-slate-50/70 border border-slate-200 rounded-2xl space-y-3 shadow-2xs">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold text-slate-800">{edu.degree || 'Degree'}</span>
                    <button
                      type="button"
                      onClick={() => removeEducation(edu.id)}
                      className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Degree / Program</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                        placeholder="B.S. in Computer Science"
                        className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">University / Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                        placeholder="University of California, Berkeley"
                        className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Start Year</label>
                      <input
                        type="text"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                        placeholder="2018"
                        className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Graduation Year</label>
                      <input
                        type="text"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                        placeholder="2022"
                        className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">GPA (Optional)</label>
                      <input
                        type="text"
                        value={edu.gpa || ''}
                        onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                        placeholder="3.8 / 4.0"
                        className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addEducation}
                className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 border border-dashed border-slate-300 cursor-pointer"
              >
                <Plus size={16} /> Add Education
              </button>
            </div>

            {/* Collapsed Optional Settings: Certifications */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => setShowMoreEducation(!showMoreEducation)}
                className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-100/60 transition-colors text-left cursor-pointer"
              >
                <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <Award size={15} className="text-brand-600" />
                  More options (Certifications &amp; Licenses) ({resume.certifications.length})
                </span>
                {showMoreEducation ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
              </button>

              {showMoreEducation && (
                <div className="p-4 border-t border-slate-100 space-y-3 animate-in fade-in duration-150">
                  {resume.certifications.map((cert) => (
                    <div key={cert.id} className="p-3 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-800">{cert.name || 'Certification'}</span>
                        <button type="button" onClick={() => removeCertification(cert.id)} className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer">
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={cert.name}
                          onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                          placeholder="AWS Certified Solutions Architect"
                          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none"
                        />
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                          placeholder="Amazon Web Services"
                          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addCertification}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 border border-dashed border-slate-300 cursor-pointer"
                  >
                    <Plus size={15} /> Add Certification
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 5: SKILLS */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Wrench className="text-brand-600 shrink-0" size={18} />
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wide text-slate-800">
                    Technical &amp; Core Skills ({resume.skills.length} Categories)
                  </h3>
                  <p className="text-[11px] text-slate-500">Group your skills into clear categories (e.g. Languages, Frameworks, Cloud).</p>
                </div>
              </div>

              {resume.skills.map((skillCat) => (
                <div key={skillCat.id} className="p-4 bg-slate-50/70 border border-slate-200 rounded-2xl space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={skillCat.category}
                      onChange={(e) => updateSkillCategory(skillCat.id, e.target.value, skillCat.items)}
                      placeholder="e.g. Languages & Frameworks"
                      className="font-bold text-xs p-2.5 bg-white border border-slate-200 rounded-xl outline-none flex-1 focus:border-brand-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeSkillCategory(skillCat.id)}
                      className="text-rose-500 hover:text-rose-700 p-1.5 hover:bg-rose-50 rounded-lg cursor-pointer"
                      title="Remove category"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Skills (comma-separated):
                    </label>
                    <input
                      type="text"
                      value={skillCat.items.join(', ')}
                      onChange={(e) => {
                        const items = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                        updateSkillCategory(skillCat.id, skillCat.category, items);
                      }}
                      placeholder="React, TypeScript, Next.js, Node.js, Tailwind CSS"
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addSkillCategory}
                className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 border border-dashed border-slate-300 cursor-pointer"
              >
                <Plus size={16} /> Add Skill Category
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: TEMPLATE & DESIGN */}
        {currentStep === 6 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {/* Template Selection */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Palette className="text-brand-600 shrink-0" size={18} />
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wide text-slate-800">Select Template</h3>
                  <p className="text-[11px] text-slate-500">Pick an ATS-compliant template layout.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TEMPLATE_LIST.map((tpl) => {
                  const isSelected = resume.formatting.template === tpl.id;
                  return (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => updateFormatting({ template: tpl.id })}
                      className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-brand-50/80 border-2 border-brand-600 shadow-sm ring-2 ring-brand-500/20'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-extrabold text-xs text-slate-900">{tpl.name}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">{tpl.tag}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug">{tpl.description}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                        <span className={isSelected ? 'text-brand-700' : 'text-slate-400'}>
                          {isSelected ? '✓ Selected' : 'Choose'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Palette & Font Picker */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wide text-slate-800 block mb-2">Accent Color</label>
                <div className="flex items-center gap-3 flex-wrap">
                  {colors.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => updateFormatting({ accentColor: c.hex })}
                      style={{ backgroundColor: c.hex }}
                      className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer flex items-center justify-center ${
                        resume.formatting.accentColor === c.hex ? 'scale-110 border-slate-900 shadow-md ring-2 ring-slate-400' : 'border-transparent hover:scale-105'
                      }`}
                      title={c.label}
                    >
                      {resume.formatting.accentColor === c.hex && <Check size={14} className="text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <label className="text-xs font-extrabold uppercase tracking-wide text-slate-800 block mb-2">Typography</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'outfit', label: 'Outfit (Modern)' },
                    { id: 'inter', label: 'Inter (Clean)' },
                    { id: 'serif', label: 'Merriweather (Serif)' },
                    { id: 'mono', label: 'JetBrains (Tech)' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => updateFormatting({ fontFamily: f.id as any })}
                      className={`p-2.5 text-xs rounded-xl border text-center font-bold transition-all cursor-pointer ${
                        resume.formatting.fontFamily === f.id
                          ? 'bg-brand-50 border-brand-600 text-brand-900 shadow-xs'
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Collapsed Optional Design Settings */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => setShowMoreDesign(!showMoreDesign)}
                className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-100/60 transition-colors text-left cursor-pointer"
              >
                <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <SlidersHorizontal size={15} className="text-brand-600" />
                  More design options (Font Size &amp; Spacing)
                </span>
                {showMoreDesign ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
              </button>

              {showMoreDesign && (
                <div className="p-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-150">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Font Size Scale</label>
                    <select
                      value={resume.formatting.fontSize}
                      onChange={(e) => updateFormatting({ fontSize: e.target.value as any })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer"
                    >
                      <option value="sm">Small (Compact, 1 Page)</option>
                      <option value="base">Medium (Standard ATS)</option>
                      <option value="lg">Large (Spacious)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Line Spacing</label>
                    <select
                      value={resume.formatting.spacing}
                      onChange={(e) => updateFormatting({ spacing: e.target.value as any })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer"
                    >
                      <option value="compact">Compact Spacing</option>
                      <option value="normal">Normal Spacing</option>
                      <option value="relaxed">Relaxed Spacing</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 7: PREVIEW & DOWNLOAD */}
        {currentStep === 7 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {/* ATS Score Overview Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">Resume Ready</span>
                  <h3 className="text-base font-extrabold text-slate-900">Final Quality &amp; Export Check</h3>
                  <p className="text-xs text-slate-500">Your resume has been compiled and styled using ATS best practices.</p>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-extrabold text-sm">
                  <CheckCircle2 size={20} className="text-emerald-600" />
                  <span>ATS Score: {atsAnalysis.overallScore}/100</span>
                </div>
              </div>

              {/* Big Primary Download CTA */}
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isExporting}
                className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-sm font-extrabold flex items-center justify-center gap-2 shadow-md transition-all transform hover:scale-[1.01] cursor-pointer disabled:opacity-60"
              >
                <Download size={18} className={isExporting ? 'animate-bounce' : ''} />
                <span>{isExporting ? 'Generating High-Res Vector PDF...' : 'Download PDF Resume'}</span>
              </button>

              <p className="text-[11px] text-center text-slate-500">
                Directly generates an ATS-ready vector .pdf file without opening print dialogs.
              </p>
            </div>

            {/* Secondary Export Options */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-600">Alternative Formats &amp; Print Options</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={exportToVectorPdf}
                  className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-slate-200 transition-colors cursor-pointer"
                >
                  <Printer size={15} className="text-brand-600" />
                  <span>Print Vector PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => exportResumeToJson(resume)}
                  className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-slate-200 transition-colors cursor-pointer"
                >
                  <FileJson size={15} className="text-purple-600" />
                  <span>Backup Resume JSON</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 3. STICKY BOTTOM NAVIGATION BAR (BACK & CONTINUE) */}
      <div className="sticky bottom-0 z-20 mt-6 bg-white/95 backdrop-blur-sm border-t border-slate-200 p-3 sm:p-4 rounded-2xl shadow-xl flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handlePrevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-extrabold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-250 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} />
          <span>Back</span>
        </button>

        {currentStep < 7 ? (
          <button
            type="button"
            onClick={handleNextStep}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all cursor-pointer"
          >
            <span>Continue</span>
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all cursor-pointer disabled:opacity-60"
          >
            <Download size={16} />
            <span>{isExporting ? 'Generating PDF...' : 'Download PDF'}</span>
          </button>
        )}
      </div>

    </div>
  );
};

