import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../../components/common/SeoHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { FaqAccordion } from '../../components/common/FaqAccordion';
import {
  FileText,
  CheckCircle2,
  Sparkles,
  Download,
  ArrowRight,
  ShieldCheck,
  Lock,
  UserCheck,
  Zap
} from 'lucide-react';

export const ResumeBuilderWithoutLoginPage: React.FC = () => {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Free Resume Builder Without Login | Resume Craft',
    description: 'Build and download a professional ATS-friendly resume for free without creating an account or logging in. 100% private local browser storage and zero watermarks.',
    url: 'https://resume.gnanamai.com/resume-builder-without-login'
  };

  const faqs = [
    {
      question: 'Can I really build and download a resume without signing up?',
      answer: 'Yes! Resume Craft allows you to access our full resume builder, choose from all 5 ATS-compliant templates, enhance bullet points, and export high-resolution vector PDFs immediately without creating an account or entering an email address.'
    },
    {
      question: 'How is my data stored if I do not create an account?',
      answer: 'Your resume data is stored securely in your browser local storage (`localStorage`). It remains 100% private to your device, ensuring complete data ownership and zero tracking.'
    },
    {
      question: 'Are there watermarks or hidden fees on the downloaded PDF?',
      answer: 'No. The exported vector PDF is 100% clean with zero watermarks, no mandatory subscription fees, and no credit card required.'
    },
    {
      question: 'Can I save my progress and come back later without a login?',
      answer: 'Yes. As long as you use the same web browser, your draft resume will stay saved in local storage. You can also export your raw resume data as a JSON file backup and reload it anytime.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <SeoHead
        title="Free Resume Builder Without Login | Resume Craft"
        description="Build and download a professional ATS-friendly resume for free without creating an account or logging in. 100% private local browser storage and zero watermarks."
        canonicalPath="/resume-builder-without-login"
        jsonLd={pageSchema}
      />

      <Breadcrumbs items={[{ name: 'Resume Builder Without Login', path: '/resume-builder-without-login' }]} />

      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <UserCheck size={14} className="text-emerald-600" />
          <span>No Sign-Up Needed • 100% Free Guest Mode</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Free Resume Builder Without Login
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
          Create, edit, and export an ATS-friendly resume immediately without creating an account, giving your email, or subscribing. Your resume data stays stored 100% privately inside your browser.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/builder"
            className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2 min-h-[44px]"
          >
            <FileText size={18} />
            <span>Launch Resume Builder Free &rarr;</span>
          </Link>
          <Link
            to="/ats-resume-checker"
            className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-sm border border-slate-300 shadow-xs transition-all flex items-center justify-center gap-2 min-h-[44px]"
          >
            <ShieldCheck size={18} className="text-emerald-600" />
            <span>Check ATS Compatibility</span>
          </Link>
        </div>
      </section>

      {/* Core Benefits Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Lock size={20} />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Zero Registration Barriers</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Start building your resume immediately. No email verification codes, password setups, or mandatory social sign-ins standing between you and your PDF download.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
            <ShieldCheck size={20} />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Private Local Storage</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            All career history, contact details, and achievements are cached directly inside your browser local storage. Your private personal information never leaves your device.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Download size={20} />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Clean PDF Downloads</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Export high-resolution, single-column vector PDFs designed for Workday and Greenhouse parsers without forced watermarks or paywalls.
          </p>
        </div>
      </section>

      {/* Step-by-Step Guide Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <h2 className="text-2xl font-black text-slate-950">
          How to Build a Resume Without an Account
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="w-7 h-7 rounded-full bg-brand-600 text-white font-extrabold flex items-center justify-center text-xs">1</span>
            <h3 className="font-bold text-slate-900 text-base">Open Builder &amp; Select Template</h3>
            <p className="text-slate-600 text-xs">Launch the builder and choose from Modern, Tech, Executive, Slate, or Compact templates.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="w-7 h-7 rounded-full bg-purple-600 text-white font-extrabold flex items-center justify-center text-xs">2</span>
            <h3 className="font-bold text-slate-900 text-base">Enter Achievements &amp; AI Bullets</h3>
            <p className="text-slate-600 text-xs">Fill out work history and refine achievement points using the Google X-Y-Z formula prompts.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-extrabold flex items-center justify-center text-xs">3</span>
            <h3 className="font-bold text-slate-900 text-base">Download Free PDF</h3>
            <p className="text-slate-600 text-xs">Click "Download PDF" to save a clean, selectable vector PDF file straight to your computer.</p>
          </div>
        </div>
      </section>

      {/* Internal Navigation Bar */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900">Explore Dedicated Resume Tools:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <Link to="/ai-resume-builder" className="p-3 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-xs transition-all block text-xs font-bold text-slate-800">
            <div className="flex items-center gap-1.5 text-purple-600 mb-1"><Sparkles size={14} /> AI Resume Builder</div>
            <span className="text-slate-500 font-normal">Generate bullets with AI</span>
          </Link>
          <Link to="/ats-resume-builder" className="p-3 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-xs transition-all block text-xs font-bold text-slate-800">
            <div className="flex items-center gap-1.5 text-emerald-600 mb-1"><ShieldCheck size={14} /> ATS Resume Builder</div>
            <span className="text-slate-500 font-normal">Pass ATS filters</span>
          </Link>
          <Link to="/cover-letter-builder" className="p-3 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-xs transition-all block text-xs font-bold text-slate-800">
            <div className="flex items-center gap-1.5 text-brand-600 mb-1"><FileText size={14} /> Cover Letter Builder</div>
            <span className="text-slate-500 font-normal">Role cover letters</span>
          </Link>
          <Link to="/resume-keyword-matcher" className="p-3 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-xs transition-all block text-xs font-bold text-slate-800">
            <div className="flex items-center gap-1.5 text-teal-600 mb-1"><Zap size={14} /> Keyword Matcher</div>
            <span className="text-slate-500 font-normal">Match job postings</span>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <FaqAccordion items={faqs} title="Resume Builder Without Login FAQs" />

      {/* Bottom CTA */}
      <section className="text-center bg-gradient-to-r from-brand-900 to-indigo-900 text-white rounded-2xl p-8 space-y-4">
        <h3 className="text-2xl font-black">Build Your Resume Right Now</h3>
        <p className="text-xs sm:text-sm text-brand-200 max-w-xl mx-auto">
          No sign-up required. Choose a template, add your skills, and export your vector PDF immediately.
        </p>
        <Link
          to="/builder"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-950 font-bold rounded-xl text-xs sm:text-sm hover:bg-brand-50 transition-colors shadow-lg"
        >
          <span>Launch Resume Builder Free</span>
          <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
};
