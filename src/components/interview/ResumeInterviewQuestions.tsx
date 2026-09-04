import React, { useState } from 'react';
import {
  HelpCircle,
  Sparkles,
  Copy,
  Check,
  Download,
  RotateCw,
  BookOpen,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Briefcase,
  GraduationCap,
  Award,
  FileText
} from 'lucide-react';
import {
  generateTenRoleQuestions,
  ExperienceLevel,
  InterviewQuestion,
  QuestionGenerationResult
} from '../../services/interviewQuestionService';
import { trackInterviewQuestionsGenerated } from '../../services/analytics';

interface Props {
  initialRole?: string;
  className?: string;
}

const PRESET_ROLES = [
  'AI Engineer',
  'Software Developer',
  'Business Analyst',
  'Data Scientist',
  'Product Manager',
  'Cloud & DevOps'
];

const EXPERIENCE_LEVELS: Array<{ label: ExperienceLevel; icon: typeof GraduationCap; desc: string }> = [
  { label: 'Entry Level', icon: GraduationCap, desc: '0-2 years exp' },
  { label: 'Mid Level', icon: Briefcase, desc: '3-5 years exp' },
  { label: 'Senior Level', icon: Award, desc: '6+ years exp' }
];

export const ResumeInterviewQuestions: React.FC<Props> = ({ initialRole = '', className = '' }) => {
  const sanitizeRole = (r: string) => {
    if (!r || /university|college|school|institute|river forest|degree|bachelor|master|phd/i.test(r)) {
      return '';
    }
    return r;
  };

  const [role, setRole] = useState(() => sanitizeRole(initialRole));
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Entry Level');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingRole, setLoadingRole] = useState('');
  const [results, setResults] = useState<QuestionGenerationResult | null>(null);
  
  // UI State
  const [showAllAnswers, setShowAllAnswers] = useState(true);
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleGenerate = (targetRole?: string, targetLevel?: ExperienceLevel) => {
    const roleToUse = targetRole !== undefined ? targetRole : role;
    const levelToUse = targetLevel !== undefined ? targetLevel : experienceLevel;

    const trimmed = roleToUse.trim();
    if (!trimmed) {
      setError('Please enter a job role, e.g., AI Engineer, Nurse, Accountant.');
      return;
    }

    setError('');
    setLoading(true);
    setLoadingRole(trimmed);

    setTimeout(() => {
      const generated = generateTenRoleQuestions(trimmed, levelToUse);
      setResults(generated);
      setLoading(false);
      setOpenQuestionId(null);
      trackInterviewQuestionsGenerated(trimmed, levelToUse);
    }, 600);
  };

  const handleCopyAll = () => {
    if (!results) return;

    let content = `=====================================================\n`;
    content += `RESUME CRAFT - TAILORED INTERVIEW QUESTIONS (10-Q)\n`;
    content += `Target Role: ${results.role}\n`;
    content += `Experience Level: ${results.experienceLevel}\n`;
    content += `Generated Date: ${new Date().toLocaleDateString()}\n`;
    content += `=====================================================\n\n`;

    results.questions.forEach((q) => {
      content += `${q.id}. [${q.category}] ${q.question}\n`;
      content += `   Sample STAR Answer:\n   ${q.sampleAnswer}\n`;
      content += `   Key Talking Points: ${q.keyTakeaways.join(' | ')}\n\n`;
    });

    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    if (!results) return;

    let content = `=====================================================\n`;
    content += `RESUME CRAFT - TAILORED INTERVIEW QUESTIONS (10-Q)\n`;
    content += `Target Role: ${results.role}\n`;
    content += `Experience Level: ${results.experienceLevel}\n`;
    content += `=====================================================\n\n`;

    results.questions.forEach((q) => {
      content += `Question ${q.id} (${q.category}):\n`;
      content += `${q.question}\n\n`;
      content += `Recommended STAR Answer Strategy:\n`;
      content += `${q.sampleAnswer}\n\n`;
      content += `Key Resume Talking Points:\n- ${q.keyTakeaways.join('\n- ')}\n`;
      content += `-----------------------------------------------------\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${results.role.replace(/[^a-zA-Z0-9]/g, '_')}_${results.experienceLevel.replace(/\s+/g, '_')}_Interview_Questions.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const toggleSampleAnswers = () => {
    setShowAllAnswers(!showAllAnswers);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search & Config Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 border border-brand-200 flex items-center justify-center font-bold shadow-2xs">
              <HelpCircle size={20} />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 leading-snug">
                Resume Interview Questions Generator
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Generate 10 tailored interview questions &amp; STAR answers for your target position
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <Sparkles size={13} />
            AI 10-Q Suite
          </span>
        </div>

        {/* Input Role */}
        <div className="space-y-2">
          <label htmlFor="target-job-role" className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            Target Job Role <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              id="target-job-role"
              type="text"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. AI Engineer, Software Developer, Data Scientist"
              className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 font-semibold focus:outline-none transition-all placeholder:text-slate-400 placeholder:font-normal ${
                error
                  ? 'border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 bg-slate-50/50 focus:bg-white'
              }`}
            />
          </div>

          {/* Validation Error Message */}
          {error && (
            <div className="flex items-center gap-1.5 text-xs text-rose-600 font-bold animate-in fade-in">
              <AlertCircle size={14} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Preset Roles */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Popular Roles:
            </span>
            {PRESET_ROLES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRole(r);
                  if (error) setError('');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  role.toLowerCase() === r.toLowerCase()
                    ? 'bg-brand-600 text-white shadow-2xs font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Level Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            Experience Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {EXPERIENCE_LEVELS.map((lvl) => {
              const Icon = lvl.icon;
              const isSelected = experienceLevel === lvl.label;
              return (
                <button
                  key={lvl.label}
                  type="button"
                  onClick={() => setExperienceLevel(lvl.label)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/20 text-brand-950 font-bold shadow-2xs'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700 font-medium'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-bold leading-tight">{lvl.label}</span>
                    <Icon size={15} className={isSelected ? 'text-brand-600' : 'text-slate-400'} />
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium block">
                    {lvl.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Prominent CTA Button */}
        <button
          type="button"
          onClick={() => handleGenerate()}
          disabled={loading}
          className="w-full py-3.5 px-6 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-brand-600 via-indigo-600 to-slate-900 hover:from-brand-700 hover:to-slate-950 active:scale-[0.99] transition-all shadow-md shadow-brand-500/20 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating questions for {loadingRole || role}...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>Generate 10 Interview Questions</span>
            </>
          )}
        </button>
      </div>

      {/* Results Section */}
      {results && (
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* Action Toolbar Header */}
          <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-brand-500/30 text-brand-200 border border-brand-400/30 text-[11px] font-bold uppercase tracking-wider">
                  10 Questions Ready
                </span>
                <span className="text-xs text-slate-300 font-semibold">
                  • {results.experienceLevel}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white mt-1">
                Interview Questions for <span className="text-brand-300">{results.role}</span>
              </h3>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {/* Regenerate */}
              <button
                type="button"
                onClick={() => handleGenerate()}
                disabled={loading}
                className="flex-1 md:flex-none px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <RotateCw size={14} className={loading ? 'animate-spin' : ''} />
                <span>Regenerate Questions</span>
              </button>

              {/* Copy All */}
              <button
                type="button"
                onClick={handleCopyAll}
                className="flex-1 md:flex-none px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied All!' : 'Copy All'}</span>
              </button>

              {/* Download */}
              <button
                type="button"
                onClick={handleDownload}
                className="flex-1 md:flex-none px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                {downloaded ? <Check size={14} className="text-emerald-400" /> : <Download size={14} />}
                <span>{downloaded ? 'Downloaded!' : 'Download Questions'}</span>
              </button>

              {/* Sample Answers Toggle */}
              <button
                type="button"
                onClick={toggleSampleAnswers}
                className={`flex-1 md:flex-none px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
                  showAllAnswers
                    ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-xs'
                    : 'bg-slate-800 hover:bg-slate-700 text-brand-300 border border-brand-500/40'
                }`}
              >
                <BookOpen size={14} />
                <span>{showAllAnswers ? 'Hide Sample Answers' : 'Generate Sample Answers'}</span>
              </button>
            </div>
          </div>

          {/* Category Legend */}
          <div className="flex flex-wrap items-center gap-2 px-1 text-xs font-bold text-slate-600">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              Question Mixture:
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px]">
              3 Beginner / Fundamental (1-3)
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-[11px]">
              3 Technical / Role-Specific (4-6)
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px]">
              2 Behavioral (7-8)
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px]">
              2 Scenario-Based (9-10)
            </span>
          </div>

          {/* 10 Numbered Questions List */}
          <div className="space-y-3">
            {results.questions.map((q: InterviewQuestion) => {
              const isOpen = openQuestionId === q.id || showAllAnswers;

              let badgeStyle = 'bg-blue-50 text-blue-700 border-blue-200';
              if (q.typeBadge === 'Technical') badgeStyle = 'bg-purple-50 text-purple-700 border-purple-200';
              if (q.typeBadge === 'Behavioral') badgeStyle = 'bg-amber-50 text-amber-800 border-amber-200';
              if (q.typeBadge === 'Scenario') badgeStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200';

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden transition-all hover:border-slate-300"
                >
                  <button
                    type="button"
                    onClick={() => setOpenQuestionId(openQuestionId === q.id ? null : q.id)}
                    className="w-full p-4 sm:p-5 flex items-start justify-between text-left gap-4 hover:bg-slate-50/80 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
                        {q.id}
                      </span>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${badgeStyle}`}
                          >
                            {q.category}
                          </span>
                          <span className="text-[11px] text-slate-400 font-semibold">
                            {q.typeBadge} Q
                          </span>
                        </div>
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                          {q.question}
                        </h4>
                      </div>
                    </div>

                    <div className="shrink-0 text-slate-400 pt-1">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>

                  {/* Sample Answer Details */}
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 bg-slate-50/70 border-t border-slate-100 space-y-3 text-xs text-slate-700 animate-in fade-in">
                      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
                        <div className="font-bold text-emerald-800 flex items-center gap-1.5 text-xs">
                          <Sparkles size={14} className="text-emerald-600" />
                          <span>Recommended STAR Strategy &amp; Sample Response:</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                          {q.sampleAnswer}
                        </p>
                      </div>

                      {/* Key Talking Points */}
                      {q.keyTakeaways && q.keyTakeaways.length > 0 && (
                        <div className="flex items-start gap-2 text-xs text-slate-600 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/70">
                          <FileText size={14} className="text-brand-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-brand-900 block mb-0.5">
                              Key Talking Points:
                            </span>
                            <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                              {q.keyTakeaways.map((tip, idx) => (
                                <li key={idx}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
