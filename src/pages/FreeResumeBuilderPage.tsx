import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/common/SeoHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FaqAccordion } from '../components/common/FaqAccordion';
import {
  FileText,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
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
      answer: 'Yes. Every template uses a clean single-column hierarchy, standard system typography (Inter, Outfit, Serif), and exportable vector PDF text that is 100% readable by Workday, Taleo, Greenhouse, and Lever.'
    },
    {
      question: 'Can I download my resume as a PDF without signing up?',
      answer: 'Yes! You can build, edit, and download your vector PDF resume immediately using our local guest mode without creating an account.'
    },
    {
      question: 'How does the AI bullet writing work?',
      answer: 'Our AI bullet writer uses the Google X-Y-Z formula ("Accomplished [X] as measured by [Y], by doing [Z]") to transform basic task descriptions into quantifiable, recruiter-converting achievements.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <SeoHead
        title="Free Resume Builder – Create ATS-Friendly Resumes Online | Resume Craft"
        description="100% free resume builder with ATS-compliant templates, AI bullet point suggestions, vector PDF export, and no paywalls. Build and download your resume in minutes."
        canonicalPath="/free-resume-builder"
      />

      <Breadcrumbs items={[{ name: 'Free Resume Builder', path: '/free-resume-builder' }]} />

      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <ShieldCheck size={14} className="text-emerald-600" />
          <span>100% Free • No Credit Card • ATS-Compliant</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Free Resume Builder – Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">ATS-Friendly</span> Resumes Online
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Create, edit, and download professional vector PDF resumes designed to pass automated hiring filters like Workday and Greenhouse. Powered by real-time ATS scoring and AI bullet optimization.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/builder"
            className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
          >
            <FileText size={18} />
            <span>Create My Resume Free</span>
          </Link>
          <Link
            to="/ats-checker"
            className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-sm border border-slate-300 shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={18} className="text-emerald-600" />
            <span>Check Resume Score</span>
          </Link>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-950">ATS-Optimized Resume Templates</h2>
            <p className="text-xs sm:text-sm text-slate-600">Single-column layouts built to ensure 99%+ parsing accuracy.</p>
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

      {/* Comprehensive Editorial Content */}
      <section className="prose max-w-none text-slate-700 space-y-6 border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-black text-slate-950">How Our Free Resume Builder Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 not-prose">
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
            <div className="text-brand-600 font-black text-lg">01</div>
            <h4 className="font-bold text-slate-900 text-sm">Choose ATS Template</h4>
            <p className="text-xs text-slate-600">Select from our recruiter-approved, single-column templates.</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
            <div className="text-brand-600 font-black text-lg">02</div>
            <h4 className="font-bold text-slate-900 text-sm">Fill or Import Info</h4>
            <p className="text-xs text-slate-600">Import your LinkedIn history or start with an industry preset.</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
            <div className="text-brand-600 font-black text-lg">03</div>
            <h4 className="font-bold text-slate-900 text-sm">AI Bullet Polish</h4>
            <p className="text-xs text-slate-600">Optimize bullets with quantifiable Google X-Y-Z metrics.</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
            <div className="text-brand-600 font-black text-lg">04</div>
            <h4 className="font-bold text-slate-900 text-sm">Download Vector PDF</h4>
            <p className="text-xs text-slate-600">Instant PDF download ready to submit to employers.</p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqAccordion items={faqs} />

      {/* Internal Links Hub */}
      <section className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
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
