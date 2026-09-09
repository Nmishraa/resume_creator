import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../../components/common/SeoHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { FaqAccordion } from '../../components/common/FaqAccordion';
import {
  FileText,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  BookOpen,
  Send
} from 'lucide-react';

export const CoverLetterBuilderSeoPage: React.FC = () => {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Free Cover Letter Builder – Create a Professional Cover Letter',
    description: 'Build a personalized, professional cover letter tailored to your target job role. Match your resume style, highlight key achievements, and download free.',
    url: 'https://resume.gnanamai.com/cover-letter-builder'
  };

  const faqs = [
    {
      question: 'Why do I need a cover letter with my resume?',
      answer: 'A targeted cover letter lets you explain why you are uniquely interested in the company, elaborate on key career wins that do not fit in bullet points, and address potential transitions directly.'
    },
    {
      question: 'Does the cover letter builder match my resume design?',
      answer: 'Yes! The cover letter builder uses matching typography, margins, header styles, and accent colors to ensure your job application package looks cohesive and polished.'
    },
    {
      question: 'Is the cover letter builder free?',
      answer: 'Yes, 100% free with no paywalls, watermarks, or credit card requirements.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <SeoHead
        title="Free Cover Letter Builder – Create a Professional Cover Letter"
        description="Build a personalized, professional cover letter tailored to your target job role. Match your resume style, highlight key achievements, and download free."
        canonicalPath="/cover-letter-builder"
        jsonLd={pageSchema}
      />

      <Breadcrumbs items={[{ name: 'Free Cover Letter Builder', path: '/cover-letter-builder' }]} />

      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold">
          <FileText size={14} className="text-brand-600" />
          <span>Tailored Job Applications • 100% Free</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Free Cover Letter Builder
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Create compelling, customized cover letters that complement your resume. Match your formatting styles, address hiring managers directly, and export clean PDFs instantly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/cover-letters"
            className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2 min-h-[44px]"
          >
            <Send size={18} />
            <span>Create Cover Letter Now &rarr;</span>
          </Link>
          <Link
            to="/resume-builder"
            className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-sm border border-slate-300 shadow-xs transition-all flex items-center justify-center gap-2 min-h-[44px]"
          >
            <FileText size={18} className="text-brand-600" />
            <span>Build Matching ATS Resume</span>
          </Link>
        </div>
      </section>

      {/* Core Benefits */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
            <Sparkles size={20} />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Job-Specific Customization</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Tailor your opening hook, company alignment paragraph, and key metric callouts specifically for the role you are applying to.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 size={20} />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Consistent Resume Styling</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Automatically inherit the exact color schemes, fonts, and header spacing from your resume for a unified application packet.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <BookOpen size={20} />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Proven Letter Blueprints</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Utilize structured 3-paragraph blueprints: Hook &amp; Interest, Core Achievements &amp; Alignment, and Action-Oriented Closing.
          </p>
        </div>
      </section>

      {/* Internal Navigation Section */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900">Recommended Next Steps:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link to="/resume-builder" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-xs transition-all block text-xs font-bold text-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-brand-600"><FileText size={15} /> Free Resume Builder</div>
            <span className="text-slate-500 font-normal block">Create a matching ATS-friendly resume</span>
          </Link>
          <Link to="/ai-resume-builder" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-xs transition-all block text-xs font-bold text-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-purple-600"><Sparkles size={15} /> AI Bullet Enhancer</div>
            <span className="text-slate-500 font-normal block">Enhance achievement bullets with AI</span>
          </Link>
          <Link to="/resume-keyword-matcher" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-xs transition-all block text-xs font-bold text-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-teal-600"><Zap size={15} /> Resume Keyword Matcher</div>
            <span className="text-slate-500 font-normal block">Match resume to job description</span>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <FaqAccordion items={faqs} title="Cover Letter Builder FAQs" />

      {/* Bottom CTA */}
      <section className="text-center bg-gradient-to-r from-brand-900 to-indigo-900 text-white rounded-2xl p-8 space-y-4">
        <h3 className="text-2xl font-black">Ready to Write Your Cover Letter?</h3>
        <p className="text-xs sm:text-sm text-brand-200 max-w-xl mx-auto">
          Write a tailored cover letter in minutes and pair it with your ATS resume.
        </p>
        <Link
          to="/cover-letters"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-950 font-bold rounded-xl text-xs sm:text-sm hover:bg-brand-50 transition-colors shadow-lg"
        >
          <span>Open Cover Letter Builder</span>
          <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
};
