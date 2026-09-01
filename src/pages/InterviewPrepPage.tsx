import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { generateInterviewQuestions } from '../services/aiService';
import { HelpCircle, Sparkles, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

export const InterviewPrepPage: React.FC = () => {
  const { resume } = useResume();
  const [role, setRole] = useState(resume.personalInfo.jobTitle || 'Software Engineer');
  const [questions, setQuestions] = useState(() => generateInterviewQuestions(role));
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleRefresh = (newRole: string) => {
    setRole(newRole);
    setQuestions(generateInterviewQuestions(newRole));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
          <HelpCircle size={13} />
          <span>AI 10-Q Mock Simulator</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-950">
          Role-Specific Interview Questions &amp; STAR Framework
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Practice answering real behavioral, technical, and architectural questions expected at top tech companies.
        </p>
      </div>

      {/* Role Picker */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs font-bold text-slate-800">Target Role:</span>
        <div className="flex flex-wrap gap-1.5">
          {['Software Engineer', 'Senior Full-Stack', 'Cloud & DevOps', 'Product Manager', 'Data Scientist'].map((r) => (
            <button
              key={r}
              onClick={() => handleRefresh(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${role === r ? 'bg-brand-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* STAR Framework Explanation */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100 text-xs text-slate-800 space-y-1.5">
        <div className="font-bold text-brand-900 flex items-center gap-1.5">
          <Lightbulb size={15} className="text-amber-500" />
          The STAR Framework for Winning Responses:
        </div>
        <p className="text-slate-600 leading-relaxed">
          <strong>Situation:</strong> Set the context. <strong>Task:</strong> Explain the challenge. <strong>Action:</strong> Specify the exact tools, architectures, and decisions you made. <strong>Result:</strong> State measurable metrics (%, $, hours saved).
        </p>
      </div>

      {/* Questions Accordion */}
      <div className="space-y-3">
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-4 flex items-start justify-between text-left gap-3 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-50 text-brand-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-brand-200">
                  {q.id}
                </span>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">{q.question}</div>
                  <span className="text-[10px] text-slate-400 font-medium">{q.category}</span>
                </div>
              </div>
              {openIndex === idx ? <ChevronUp size={16} className="text-slate-400 shrink-0" /> : <ChevronDown size={16} className="text-slate-400 shrink-0" />}
            </button>

            {openIndex === idx && (
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-700 space-y-2 animate-in fade-in">
                <div className="font-semibold text-purple-900 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-purple-600" />
                  Recommended Strategy &amp; Talking Points:
                </div>
                <p className="leading-relaxed bg-white p-3 rounded-xl border border-slate-200">{q.tip}</p>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
