import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/common/SeoHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FaqAccordion } from '../components/common/FaqAccordion';
import {
  generateTenRoleQuestions,
  QuestionGenerationResult
} from '../services/interviewQuestionService';
import { trackInterviewQuestionsGenerated } from '../services/analytics';
import {
  HelpCircle,
  Sparkles,
  Copy,
  Check,
  RotateCw,
  Edit3,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Target,
  Briefcase,
  UserCheck,
  ShieldCheck,
  Award
} from 'lucide-react';

export const InterviewQuestionsPage: React.FC = () => {
  const [roleInput, setRoleInput] = useState('');
  const [validationError, setValidationError] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<QuestionGenerationResult | null>(null);

  // Per-question state tracking
  const [expandedAnswers, setExpandedAnswers] = useState<Record<number, boolean>>({});
  const [practiceOpen, setPracticeOpen] = useState<Record<number, boolean>>({});
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, string>>({});
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const trimmed = roleInput.trim();
    if (!trimmed) {
      setValidationError('Please enter a job role, e.g., Software Engineer, Product Manager, Nurse.');
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    setValidationError('');
    setLoading(true);

    setTimeout(() => {
      const generated = generateTenRoleQuestions(trimmed, 'Mid Level');
      setResults(generated);
      setLoading(false);

      // Expand first sample answer by default for convenience
      setExpandedAnswers({ 1: true });

      // Track GA4 event
      trackInterviewQuestionsGenerated(trimmed, 'Mid Level');

      // Scroll smoothly to results
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }, 400);
  };

  const handleGenerateNew = () => {
    if (!results?.role) return;
    handleGenerate();
  };

  const handleChangeRole = () => {
    setResults(null);
    setValidationError('');
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const toggleAnswer = (id: number) => {
    setExpandedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePractice = (id: number) => {
    setPracticeOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePracticeChange = (id: number, text: string) => {
    setPracticeAnswers((prev) => ({ ...prev, [id]: text }));
  };

  const handleCopySingle = (q: QuestionGenerationResult['questions'][0]) => {
    let content = `Question ${q.id} (${q.category}):\n${q.question}\n\n`;
    content += `Sample Answer:\n${q.sampleAnswer}\n`;
    if (q.keyTakeaways && q.keyTakeaways.length > 0) {
      content += `\nKey Talking Points:\n- ${q.keyTakeaways.join('\n- ')}\n`;
    }

    navigator.clipboard.writeText(content);
    setCopiedId(q.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAll = () => {
    if (!results) return;

    let content = `=====================================================\n`;
    content += `RESUME CRAFT - INTERVIEW QUESTIONS (10-Q)\n`;
    content += `Job Role: ${results.role}\n`;
    content += `Generated Date: ${new Date().toLocaleDateString()}\n`;
    content += `=====================================================\n\n`;

    results.questions.forEach((q) => {
      content += `${q.id}. [${q.category}] ${q.question}\n`;
      content += `   Sample Answer:\n   ${q.sampleAnswer}\n`;
      if (q.keyTakeaways && q.keyTakeaways.length > 0) {
        content += `   Key Takeaways: ${q.keyTakeaways.join(' | ')}\n`;
      }
      content += `-----------------------------------------------------\n\n`;
    });

    navigator.clipboard.writeText(content);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const faqList = [
    {
      question: 'How does the AI Interview Question Generator work?',
      answer: 'Our tool generates 10 role-specific interview questions based on your input position (e.g., Software Engineer, Product Manager, Registered Nurse). It constructs a balanced mix of 3 general background questions, 4 technical/role-specific questions, 2 behavioral questions, and 1 scenario-based problem-solving question, complete with sample answer blueprints and key talking points.'
    },
    {
      question: 'What is the STAR framework for answering behavioral interview questions?',
      answer: 'STAR is an acronym for Situation, Task, Action, and Result. When answering behavioral questions like "Tell me about a time you handled conflict," describe the background (Situation), your core responsibility (Task), the exact steps you took (Action), and the measurable outcome (Result, e.g., 25% efficiency gain or 100% on-time delivery).'
    },
    {
      question: 'Can I practice drafting my responses directly inside the generator?',
      answer: 'Yes! Click "Practice Answer" under any generated question to open an interactive text area. You can type out your response using the STAR method, track character length, and refine your spoken narrative before your actual job interview.'
    },
    {
      question: 'Are the generated interview questions free to copy and export?',
      answer: '100% free. You can copy individual questions and sample answers or click "Copy All Questions" to export your entire 10-question study guide into your notes without creating an account or paying any fees.'
    },
    {
      question: 'How does interview preparation relate to ATS resume optimization?',
      answer: 'Top recruiters cross-reference your spoken interview answers with the keywords, metrics, and achievements highlighted on your ATS resume. Preparing with role-specific questions ensures your verbal answers match your resume metrics.'
    }
  ];

  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Free AI Interview Question Generator by Job Role | Resume Craft',
      description: 'Generate free AI-powered interview questions for any job role. Practice common, behavioral, technical, and role-specific questions with Resume Craft.',
      url: 'https://resume.gnanamai.com/interview-questions'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'AI Interview Question Generator',
      operatingSystem: 'All Web Browsers',
      applicationCategory: 'BusinessApplication',
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD'
      },
      description: 'Free AI interview question generator providing role-specific behavioral, technical, and scenario questions with STAR framework answer blueprints.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqList.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer
        }
      }))
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      <SeoHead
        title="Free AI Interview Question Generator by Job Role | Resume Craft"
        description="Generate free AI-powered interview questions for any job role. Practice common, behavioral, technical, and role-specific questions with Resume Craft."
        canonicalPath="/interview-questions"
        jsonLd={jsonLdData}
      />

      <Breadcrumbs items={[{ name: 'Interview Question Generator', path: '/interview-questions' }]} />

      {/* Page Hero Header - Single H1 tag */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-800 text-sm font-extrabold border border-brand-200 shadow-2xs">
          <HelpCircle size={16} className="text-brand-600" />
          <span>Role-Specific Interview Prep Suite</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          AI Interview Question Generator
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
          Generate free AI-powered interview questions for any job role. Practice common, behavioral, technical, and role-specific questions with Resume Craft.
        </p>
      </div>

      {/* Interactive Role Input Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-5">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="job-role-input"
              className="block text-base font-extrabold text-slate-900"
            >
              Enter Target Job Role
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                id="job-role-input"
                type="text"
                value={roleInput}
                onChange={(e) => {
                  setRoleInput(e.target.value);
                  if (validationError) setValidationError('');
                }}
                placeholder="e.g., Software Engineer, Product Manager, Nurse, Teacher, Data Analyst"
                className={`w-full p-4 text-base bg-slate-50 border rounded-xl font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  validationError
                    ? 'border-rose-400 focus:ring-rose-500'
                    : 'border-slate-300 focus:ring-brand-500'
                }`}
              />
            </div>
            {validationError && (
              <div className="flex items-center gap-1.5 text-sm font-bold text-rose-600 pt-1">
                <AlertCircle size={16} />
                <span>{validationError}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 active:scale-[0.99] text-white font-extrabold rounded-xl text-base shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer min-h-[44px] disabled:opacity-70"
            >
              {loading ? (
                <>
                  <RotateCw size={18} className="animate-spin" />
                  <span>Generating Questions...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Generate 10 Interview Questions</span>
                </>
              )}
            </button>

            {/* Quick Suggestion Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 sm:pt-0">
              <span className="text-sm font-semibold text-slate-500 mr-1">Popular Roles:</span>
              {[
                'Software Engineer',
                'Product Manager',
                'Teacher',
                'Registered Nurse',
                'Data Analyst',
                'Customer Service Rep'
              ].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setRoleInput(preset);
                    setValidationError('');
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 transition-colors cursor-pointer min-h-[36px]"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* Generated Results Section */}
      {results && (
        <div ref={resultsRef} className="space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
          
          {/* Results Top Header & Action Controls Bar */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-800">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-brand-400">
                Generated 10-Question Study Guide
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Interview Questions for {results.role}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-300 font-medium">
                <span className="bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700 font-bold text-brand-300">
                  3 Fundamental
                </span>
                <span className="bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700 font-bold text-purple-300">
                  4 Role Technical
                </span>
                <span className="bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700 font-bold text-amber-300">
                  2 Behavioral
                </span>
                <span className="bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700 font-bold text-emerald-300">
                  1 Scenario
                </span>
              </div>
            </div>

            {/* Top Action Bar Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 md:pt-0">
              <button
                type="button"
                onClick={handleGenerateNew}
                className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer min-h-[44px]"
              >
                <RotateCw size={16} />
                <span>Generate 10 New Questions</span>
              </button>

              <button
                type="button"
                onClick={handleChangeRole}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all border border-slate-700 flex items-center gap-1.5 cursor-pointer min-h-[44px]"
              >
                <Edit3 size={16} />
                <span>Change Job Role</span>
              </button>

              <button
                type="button"
                onClick={handleCopyAll}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer min-h-[44px]"
              >
                {copiedAll ? <Check size={16} /> : <Copy size={16} />}
                <span>{copiedAll ? 'All Copied!' : 'Copy All Questions'}</span>
              </button>
            </div>
          </div>

          {/* List of 10 Questions */}
          <div className="space-y-5">
            {results.questions.map((q) => {
              const isAnswerShown = Boolean(expandedAnswers[q.id]);
              const isPracticeOpen = Boolean(practiceOpen[q.id]);
              const isCopied = copiedId === q.id;

              const categoryBadgeColors = {
                'Beginner / Fundamental': 'bg-brand-50 text-brand-800 border-brand-200',
                'Technical / Role-Specific': 'bg-purple-50 text-purple-800 border-purple-200',
                'Behavioral': 'bg-amber-50 text-amber-900 border-amber-200',
                'Scenario-Based': 'bg-emerald-50 text-emerald-900 border-emerald-200'
              }[q.category] || 'bg-slate-100 text-slate-800 border-slate-200';

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-5 sm:p-6 space-y-4"
                >
                  {/* Question Header & Category Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center">
                          {q.id}
                        </span>
                        <span
                          className={`text-xs font-extrabold px-3 py-1 rounded-full border ${categoryBadgeColors}`}
                        >
                          {q.category}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-950 leading-snug">
                        {q.question}
                      </h3>
                    </div>
                  </div>

                  {/* 3 Per-Question Actions: Show Sample Answer | Practice Answer | Copy */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => toggleAnswer(q.id)}
                      className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer min-h-[44px] ${
                        isAnswerShown
                          ? 'bg-brand-100 text-brand-900 border border-brand-300'
                          : 'bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200'
                      }`}
                    >
                      <Lightbulb size={16} />
                      <span>{isAnswerShown ? 'Hide Sample Answer' : 'Show Sample Answer'}</span>
                      {isAnswerShown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    <button
                      type="button"
                      onClick={() => togglePractice(q.id)}
                      className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer min-h-[44px] ${
                        isPracticeOpen
                          ? 'bg-purple-100 text-purple-900 border border-purple-300'
                          : 'bg-white hover:bg-purple-50 text-purple-700 border border-purple-200'
                      }`}
                    >
                      <Edit3 size={16} />
                      <span>{isPracticeOpen ? 'Close Practice' : 'Practice Answer'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopySingle(q)}
                      className="px-4 py-2 text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer min-h-[44px]"
                    >
                      {isCopied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                      <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Expandable Sample Answer Container */}
                  {isAnswerShown && (
                    <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 space-y-3 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
                        <CheckCircle2 size={16} className="text-emerald-600" />
                        <span>Recommended Sample Answer Blueprint:</span>
                      </div>
                      <p className="text-sm text-slate-800 leading-relaxed font-medium bg-white p-4 rounded-lg border border-slate-200">
                        {q.sampleAnswer}
                      </p>

                      {q.keyTakeaways && q.keyTakeaways.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">
                            Key Recruiter Talking Points:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {q.keyTakeaways.map((tip, idx) => (
                              <span
                                key={idx}
                                className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 flex items-center gap-1"
                              >
                                💡 {tip}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Interactive Practice Answer Textbox */}
                  {isPracticeOpen && (
                    <div className="bg-purple-50/60 rounded-xl p-4 sm:p-5 border border-purple-200 space-y-3 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-purple-950 flex items-center gap-1.5">
                          <Edit3 size={16} className="text-purple-600" />
                          Draft Your Response (STAR Method: Situation, Task, Action, Result)
                        </span>
                        <span className="text-xs font-mono text-purple-700 font-bold">
                          {(practiceAnswers[q.id] || '').length} characters
                        </span>
                      </div>
                      <textarea
                        rows={4}
                        value={practiceAnswers[q.id] || ''}
                        onChange={(e) => handlePracticeChange(q.id, e.target.value)}
                        placeholder="Write your practice response here using STAR framework...&#10;e.g. S: At my previous company... T: I was assigned to... A: I executed... R: Resulting in 25% improvement..."
                        className="w-full p-3.5 bg-white border border-purple-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                      />
                      <p className="text-xs text-purple-800 font-medium">
                        💡 <strong>STAR Tip:</strong> Keep your response concise (60–90 seconds spoken). Include concrete metrics in the <em>Result</em> stage.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Action Controls Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="text-base font-extrabold text-slate-950">Done Studying {results.role}?</h4>
              <p className="text-xs text-slate-600">Re-generate questions, try another role, or copy all questions to your study notes.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleGenerateNew}
                className="px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white text-xs font-extrabold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer min-h-[44px]"
              >
                <RotateCw size={18} />
                <span>Generate 10 New Questions</span>
              </button>

              <button
                type="button"
                onClick={handleChangeRole}
                className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-extrabold rounded-xl transition-all flex items-center gap-2 cursor-pointer min-h-[44px]"
              >
                <Edit3 size={18} className="text-brand-600" />
                <span>Change Job Role</span>
              </button>

              <button
                type="button"
                onClick={handleCopyAll}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer min-h-[44px]"
              >
                {copiedAll ? <Check size={18} /> : <Copy size={18} />}
                <span>{copiedAll ? 'All Copied!' : 'Copy All Questions'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATIC SEO RICH CONTENT (Visible to search engines & users without clicking) */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-10 text-slate-800">
        
        {/* Section 1: How it Works */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight flex items-center gap-2.5">
            <Sparkles className="text-brand-600 shrink-0" size={26} />
            <span>How the AI Interview Question Generator Works</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-medium">
            Preparing for a job interview requires practicing questions tailored specifically to your target position. Our <strong>AI Interview Question Generator</strong> dynamically analyzes job roles across industries—from software engineering and data analytics to healthcare and education—to construct a comprehensive, balanced 10-question study guide.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Target size={18} className="text-brand-600" />
                <span>Role-Based Question Mapping</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The generator evaluates core competencies, industry standards, and employer expectations to craft questions that mirror real technical screenings and hiring manager interviews.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <BookOpen size={18} className="text-purple-600" />
                <span>Balanced 10-Question Structure</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Each output set contains 3 general background questions, 4 role-specific or technical questions, 2 behavioral questions, and 1 high-stakes scenario question.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: How to Prepare for an Interview */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight flex items-center gap-2.5">
            <UserCheck className="text-indigo-600 shrink-0" size={26} />
            <span>How to Prepare for a Job Interview</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-medium">
            Successful job interview performance is the result of structured preparation rather than improvisation. To make a lasting impression on recruiters and hiring managers:
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 font-extrabold flex items-center justify-center text-sm shrink-0">
                1
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">Research the Company and Product Suite</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Understand the company&apos;s mission, key product lines, target audience, recent press releases, and major industry competitors before your interview call.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 font-extrabold flex items-center justify-center text-sm shrink-0">
                2
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">Align Your Spoken Answers with ATS Resume Metrics</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Recruiters evaluate candidates by matching verbal responses to the achievements listed on their resume. Ensure your spoken examples incorporate the same quantifiable metrics (e.g., %, $, team size) featured on your <Link to="/builder" className="text-brand-600 hover:underline font-bold">ATS-optimized resume</Link>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 font-extrabold flex items-center justify-center text-sm shrink-0">
                3
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">Master Spoken Delivery and Answer Conciseness</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Practice speaking your responses aloud. Aim to keep answers between 60 and 90 seconds in length to maintain high listener engagement without rambling.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Question Categories Explained */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight flex items-center gap-2.5">
            <ShieldCheck className="text-emerald-600 shrink-0" size={26} />
            <span>Behavioral, Technical, and Role-Specific Questions Explained</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-medium">
            Interview questions generally fall into three core categories. Understanding how to structure answers for each category helps you deliver clear, convincing responses:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-200 space-y-2">
              <h3 className="text-base font-extrabold text-amber-950">Behavioral Questions</h3>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                Questions starting with <em>&quot;Tell me about a time when...&quot;</em> test how you handled past workplace challenges. Use the <strong>STAR Method</strong> (Situation, Task, Action, Result) to format your response with measurable outcomes.
              </p>
            </div>

            <div className="bg-purple-50/50 p-5 rounded-2xl border border-purple-200 space-y-2">
              <h3 className="text-base font-extrabold text-purple-950">Technical &amp; Hard Skill Questions</h3>
              <p className="text-xs sm:text-sm text-purple-900 leading-relaxed">
                Evaluates your domain knowledge, software fluency, architecture choices, and methodology. Explain the technical trade-offs behind your decisions clearly.
              </p>
            </div>

            <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200 space-y-2">
              <h3 className="text-base font-extrabold text-emerald-950">Scenario &amp; Problem Solving</h3>
              <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                Hypothetical challenges like <em>&quot;What would you do if a deployment failed in production?&quot;</em> test your crisis management, communication, and step-by-step reasoning.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Sample Questions by Popular Role */}
        <div className="space-y-6 pt-6 border-t border-slate-100">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight flex items-center gap-2.5">
              <Briefcase className="text-purple-600 shrink-0" size={26} />
              <span>Sample Interview Questions by Target Job Role</span>
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-medium">
              Explore example questions and talking point blueprints across 6 top job roles:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Role 1: Software Engineer */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-lg font-black text-slate-950 flex items-center justify-between">
                <span>Software Engineers &amp; Developers</span>
                <span className="text-xs bg-brand-100 text-brand-800 px-2.5 py-0.5 rounded-full font-bold">Tech</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-brand-600">•</span>
                  <span><strong>Technical:</strong> How do you optimize microservice API response times and database queries under high concurrency?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-brand-600">•</span>
                  <span><strong>Behavioral:</strong> Describe a technical dispute during code review and how you resolved it collaboratively.</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link to="/resume-examples/software-engineer" className="text-xs font-extrabold text-brand-600 hover:underline flex items-center gap-1">
                  <span>View Software Engineer Resume Example</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* Role 2: Product Manager */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-lg font-black text-slate-950 flex items-center justify-between">
                <span>Product Managers</span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full font-bold">Product</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-purple-600">•</span>
                  <span><strong>Strategy:</strong> How do you prioritize conflicting feature requests from sales, engineering, and executive stakeholders?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-purple-600">•</span>
                  <span><strong>Execution:</strong> Tell me about a feature that failed to meet adoption goals and what metrics you analyzed post-launch.</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link to="/resume-examples/technical-product-manager" className="text-xs font-extrabold text-purple-600 hover:underline flex items-center gap-1">
                  <span>View Technical Product Manager Resume Example</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* Role 3: Teachers */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-lg font-black text-slate-950 flex items-center justify-between">
                <span>Teachers &amp; Educators</span>
                <span className="text-xs bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-bold">Education</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600">•</span>
                  <span><strong>Pedagogy:</strong> How do you differentiate instruction for diverse learning styles and IEP requirements in large classrooms?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600">•</span>
                  <span><strong>Behavioral:</strong> How do you handle challenging classroom behavioral incidents while maintaining a supportive learning environment?</span>
                </li>
              </ul>
            </div>

            {/* Role 4: Registered Nurses */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-lg font-black text-slate-950 flex items-center justify-between">
                <span>Registered Nurses &amp; Healthcare</span>
                <span className="text-xs bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full font-bold">Healthcare</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">•</span>
                  <span><strong>Clinical:</strong> Walk me through your triage decision process during peak emergency room admissions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">•</span>
                  <span><strong>Safety:</strong> How do you ensure 100% HIPAA compliance and patient medication safety under tight shift handoffs?</span>
                </li>
              </ul>
            </div>

            {/* Role 5: Data Analysts */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-lg font-black text-slate-950 flex items-center justify-between">
                <span>Data Analysts &amp; Scientists</span>
                <span className="text-xs bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full font-bold">Data</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">•</span>
                  <span><strong>Technical:</strong> How do you handle missing values, outliers, and data pipeline anomalies in SQL and Python?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">•</span>
                  <span><strong>Communication:</strong> How do you translate complex statistical model insights into actionable recommendations for non-technical leadership?</span>
                </li>
              </ul>
            </div>

            {/* Role 6: Customer Service Reps */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-lg font-black text-slate-950 flex items-center justify-between">
                <span>Customer Service Representatives</span>
                <span className="text-xs bg-rose-100 text-rose-900 px-2.5 py-0.5 rounded-full font-bold">Support</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-rose-600">•</span>
                  <span><strong>De-escalation:</strong> Describe a situation where you successfully de-escalated a frustrated customer while maintaining high CSAT ratings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-rose-600">•</span>
                  <span><strong>Efficiency:</strong> How do you manage multi-channel ticket queues (chat, email, phone) without sacrificing resolution accuracy?</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Section 5: Essential Preparation Tips */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight flex items-center gap-2.5">
            <Award className="text-amber-600 shrink-0" size={26} />
            <span>Essential Interview Preparation Tips</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-medium">
            Boost your callback and offer rates with these recruiter-backed guidelines:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-slate-900 block text-base font-extrabold">1. Tailor Answers to the Job Description</strong>
              <p className="text-slate-600">Scan the target job posting for key hard skills and soft skill keywords. Use our <Link to="/resume-keyword-matcher" className="text-brand-600 hover:underline font-bold">Resume Keyword Matcher</Link> to identify top phrases recruiters want to hear.</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-slate-900 block text-base font-extrabold">2. Quantify Every Result</strong>
              <p className="text-slate-600">Whenever explaining an achievement, state the numerical impact (e.g. &quot;increased revenue by 30%&quot;, &quot;reduced processing time from 4 hours to 30 minutes&quot;).</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-slate-900 block text-base font-extrabold">3. Prepare 3 Smart Questions for the Interviewer</strong>
              <p className="text-slate-600">End your interview strongly by asking about team roadmap priorities, engineering trade-offs, or success benchmarks for the first 90 days.</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-slate-900 block text-base font-extrabold">4. Verify Your Resume Formatting</strong>
              <p className="text-slate-600">Make sure your printed or PDF resume passes <Link to="/ats-resume-checker" className="text-brand-600 hover:underline font-bold">ATS Resume Checking</Link> so hiring managers have a clean copy during your call.</p>
            </div>
          </div>
        </div>

      </section>

      {/* SEO FAQ Section for Search Engine Indexing */}
      <div className="pt-8 border-t border-slate-200 space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            Interview Preparation Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Everything you need to know about practicing role-specific questions and mastering job interviews.
          </p>
        </div>

        <FaqAccordion
          hideHeader
          items={faqList}
        />
      </div>
    </div>
  );
};
