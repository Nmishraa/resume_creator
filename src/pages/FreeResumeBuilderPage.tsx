import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/common/SeoHead';
import { FaqAccordion } from '../components/common/FaqAccordion';
import {
  FileText,
  CheckCircle2,
  Sparkles,
  Download,
  ArrowRight,
  Lock
} from 'lucide-react';
import { TEMPLATE_LIST } from '../components/templates';

export const FreeResumeBuilderPage: React.FC = () => {
  const faqs = [
    {
      question: 'Is this resume builder truly 100% free?',
      answer: 'Yes. Resume Craft offers full access to all 5 professional templates, AI bullet point enhancement, real-time ATS scoring, and high-fidelity vector PDF exports without requiring a credit card or hidden subscription.'
    },
    {
      question: 'Will my resume pass Applicant Tracking Systems (ATS)?',
      answer: 'Every template uses a clean single-column hierarchy, standard system typography, and exportable vector PDF text that is designed for ATS compatibility.'
    },
    {
      question: 'Can I download my resume as a PDF without signing up?',
      answer: 'Yes! You can build, edit, and download your vector PDF resume immediately using our local guest mode without creating an account.'
    },
    {
      question: 'How does the AI bullet writing work?',
      answer: 'Our AI bullet writer uses the Google X-Y-Z formula ("Accomplished [X] as measured by [Y], by doing [Z]") to transform basic task descriptions into quantifiable, recruiter-converting achievements.'
    },
    {
      question: 'Is it completely free to build and download?',
      answer: 'Yes. Resume Craft is 100% free with no credit card requirement and no watermarks on downloaded PDFs.'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      <SeoHead
        title="Free AI Resume Builder | Create ATS-Friendly Resumes Online"
        description="Build a professional, ATS-friendly resume for free. Enhance bullet points with AI, format single-column layouts, and download a vector PDF."
        canonicalPath="/free-resume-builder"
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-brand-50/60 via-white to-slate-50 pt-14 pb-16 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100/80 text-brand-800 text-xs font-bold">
            <Sparkles size={13} className="text-brand-600" />
            <span>100% Free Resume Builder • Vector PDF Exports</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Free AI Resume Builder &amp; Format Checker
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Create, edit, and download professional vector PDF resumes designed for ATS compatibility. Powered by real-time ATS scoring and AI bullet optimization.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/builder"
              className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <FileText size={18} />
              <span>Create My Resume Free</span>
            </Link>
            <Link
              to="/ats-checker"
              className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-sm border border-slate-300 shadow-xs transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <CheckCircle2 size={18} className="text-emerald-600" />
              <span>Check Resume Score</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
            <Download size={20} />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Instant Vector PDF Exports</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Download crisp, selectable vector PDFs that automated ATS parsers can read without missing a single line of work history.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Sparkles size={20} />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Google X-Y-Z AI Enhancer</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Transform passive responsibilities into measurable accomplishments using proven bullet formulas favored by top tech recruiters.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Lock size={20} />
          </div>
          <h3 className="font-bold text-slate-900 text-base">100% Free &amp; Private</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            No watermarks, no trial paywalls, and no credit cards. Your personal career data remains in your control.
          </p>
        </div>
      </section>

      {/* Template Showcase */}
      <section className="max-w-6xl mx-auto px-4 bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-950">ATS-Optimized Resume Templates</h2>
            <p className="text-xs sm:text-sm text-slate-600">Single-column layouts built to ensure high parsing accuracy.</p>
          </div>
          <Link to="/templates" className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
            <span>Explore All 5 Templates</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TEMPLATE_LIST.slice(0, 3).map((tpl) => (
            <div key={tpl.id} className="p-4 bg-white rounded-xl border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">{tpl.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 font-bold text-slate-600">{tpl.tag}</span>
              </div>
              <p className="text-xs text-slate-500">{tpl.description}</p>
              <Link
                to="/builder"
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 pt-1"
              >
                <span>Use in Builder</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-4">
        <FaqAccordion items={faqs} />
      </section>

      {/* Internal Links Hub */}
      <section className="max-w-6xl mx-auto px-4 p-6 bg-slate-900 text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="font-bold text-lg">Explore More Free Career Resources</h3>
          <p className="text-xs text-slate-400">Discover job-specific resume examples and ATS score optimization guides.</p>
        </div>
        <div className="flex flex-wrap gap-2.5 justify-center">
          <Link to="/resume-examples" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold transition-colors">
            Resume Examples
          </Link>
          <Link to="/ats-resume-checker" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold transition-colors">
            ATS Score Checker
          </Link>
          <Link to="/cover-letter-generator" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold transition-colors">
            Cover Letter Generator
          </Link>
        </div>
      </section>
    </div>
  );
};
