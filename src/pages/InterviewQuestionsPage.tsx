import React, { useState, useRef } from 'react';
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
  FileText,
  Lightbulb,
  CheckCircle2
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
      setValidationError('Please enter a job role, e.g., AI Engineer, Nurse, Accountant.');
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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      <SeoHead
        title="Prepare for Your Target Job Interview | Resume Craft"
        description="Generate 10 role-specific interview questions with sample answers, STAR framework tips, and interactive answer practice for any job role."
        canonicalPath="/interview-questions"
      />

      <Breadcrumbs items={[{ name: 'Interview Questions', path: '/interview-questions' }]} />

      {/* Page Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-800 text-sm font-extrabold border border-brand-200 shadow-2xs">
          <HelpCircle size={16} className="text-brand-600" />
          <span>Role-Specific Interview Prep Suite</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Prepare for Your Target Job Interview
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Generate 10 tailored interview questions specifically designed for your target position—covering general fundamentals, technical expertise, behavioral scenarios, and crisis problem-solving.
        </p>
      </div>

      {/* Role Input Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-5">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="job-role-input"
              className="block text-base font-extrabold text-slate-900"
            >
              What job role are you looking for?
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
                placeholder="Enter a job role, e.g., AI Engineer, Nurse, Accountant"
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
              <span className="text-sm font-semibold text-slate-500 mr-1">Examples:</span>
              {['AI Engineer', 'Nurse', 'Accountant', 'Software Developer'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setRoleInput(preset);
                    setValidationError('');
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 transition-colors cursor-pointer min-h-[36px]"
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
              <div className="text-sm font-extrabold uppercase tracking-wider text-brand-400">
                Generated 10-Question Study Guide
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Interview Questions for {results.role}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-slate-300 font-medium">
                <span className="bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700 text-xs font-bold text-brand-300">
                  3 General
                </span>
                <span className="bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700 text-xs font-bold text-purple-300">
                  4 Role-Specific
                </span>
                <span className="bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700 text-xs font-bold text-amber-300">
                  2 Behavioral
                </span>
                <span className="bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700 text-xs font-bold text-emerald-300">
                  1 Scenario
                </span>
              </div>
            </div>

            {/* Top Action Bar Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 md:pt-0">
              <button
                type="button"
                onClick={handleGenerateNew}
                className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer min-h-[44px]"
              >
                <RotateCw size={16} />
                <span>Generate 10 New Questions</span>
              </button>

              <button
                type="button"
                onClick={handleChangeRole}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold rounded-xl transition-all border border-slate-700 flex items-center gap-1.5 cursor-pointer min-h-[44px]"
              >
                <Edit3 size={16} />
                <span>Change Job Role</span>
              </button>

              <button
                type="button"
                onClick={handleCopyAll}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer min-h-[44px]"
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
                      className={`px-4 py-2 text-sm font-extrabold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer min-h-[44px] ${
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
                      className={`px-4 py-2 text-sm font-extrabold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer min-h-[44px] ${
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
                      className="px-4 py-2 text-sm font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer min-h-[44px]"
                    >
                      {isCopied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                      <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Expandable Sample Answer Container */}
                  {isAnswerShown && (
                    <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 space-y-3 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                        <CheckCircle2 size={16} className="text-emerald-600" />
                        <span>Recommended Sample Answer Strategy:</span>
                      </div>
                      <p className="text-base text-slate-800 leading-relaxed font-medium bg-white p-4 rounded-lg border border-slate-200">
                        {q.sampleAnswer}
                      </p>

                      {q.keyTakeaways && q.keyTakeaways.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
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
                        <span className="text-sm font-extrabold text-purple-950 flex items-center gap-1.5">
                          <Edit3 size={16} className="text-purple-600" />
                          Draft Your Answer (STAR Method: Situation, Task, Action, Result)
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
                        className="w-full p-3.5 bg-white border border-purple-200 rounded-xl text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                      />
                      <p className="text-xs text-purple-800 font-medium">
                        💡 <strong>STAR Tip:</strong> Keep your response concise (60-90 seconds spoken). Include concrete metrics in the <em>Result</em> stage.
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
              <h4 className="text-lg font-extrabold text-slate-950">Done Studying {results.role}?</h4>
              <p className="text-sm text-slate-600">Re-generate questions, try another role, or copy all questions to your study notes.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleGenerateNew}
                className="px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white text-sm font-extrabold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer min-h-[44px]"
              >
                <RotateCw size={18} />
                <span>Generate 10 New Questions</span>
              </button>

              <button
                type="button"
                onClick={handleChangeRole}
                className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-sm font-extrabold rounded-xl transition-all flex items-center gap-2 cursor-pointer min-h-[44px]"
              >
                <Edit3 size={18} className="text-brand-600" />
                <span>Change Job Role</span>
              </button>

              <button
                type="button"
                onClick={handleCopyAll}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-extrabold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer min-h-[44px]"
              >
                {copiedAll ? <Check size={18} /> : <Copy size={18} />}
                <span>{copiedAll ? 'All Copied!' : 'Copy All Questions'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SEO FAQ Accordion Section for Search Engine Indexing */}
      <div className="pt-8 border-t border-slate-200 space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            Interview Preparation Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Everything you need to know about preparing for technical, behavioral, and scenario-based job interviews.
          </p>
        </div>

        <FaqAccordion
          hideHeader
          items={[
            {
              question: 'How does the 10-Question Interview Generator work?',
              answer: 'Our generator crafts 10 targeted questions based on your specific job role (e.g. AI Engineer, Nurse, Accountant). The set consists of 3 general background questions, 4 role-specific or technical questions, 2 behavioral questions, and 1 scenario problem-solving question.'
            },
            {
              question: 'What is the STAR framework for answering behavioral interview questions?',
              answer: 'STAR stands for Situation (setting the context), Task (explaining the challenge), Action (detailing your tools and decisions), and Result (stating measurable metrics like %, $, or hours saved).'
            },
            {
              question: 'Can I practice drafting my answers directly on this page?',
              answer: 'Yes! Click "Practice Answer" under any question to open an interactive response box. You can draft your STAR narrative and track your response length before your real interview.'
            },
            {
              question: 'Is this interview preparation tool 100% free?',
              answer: 'Yes. Resume Craft provides full access to role-specific question generation, STAR practice guidelines, sample answers, and instant clipboard exports without requiring an account or credit card.'
            }
          ]}
        />
      </div>
    </div>
  );
};
