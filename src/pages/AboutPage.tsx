import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/common/SeoHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ShieldCheck, Sparkles, Lock } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <SeoHead
        title="About Resume Craft – Our Mission for Free Career Tools | Resume Craft"
        description="Learn about Resume Craft mission to provide free, accessible, and privacy-focused ATS resume building tools for job seekers worldwide."
        canonicalPath="/about"
      />

      <Breadcrumbs items={[{ name: 'About Us', path: '/about' }]} />

      <header className="space-y-3 pt-2 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950">About Resume Craft</h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Democratizing career advancement with free, private, and ATS-optimized tools for job seekers everywhere.
        </p>
      </header>

      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-xs">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Our Core Mission</h2>
          <p>
            Job searching is already stressful without predatory paywalls and deceptive subscriptions that charge job seekers right before downloading their resume.
          </p>
          <p>
            <strong>Resume Craft</strong> was created to give every applicant—from university students to senior principal engineers—unrestricted access to enterprise-grade resume building, AI bullet optimization, real-time ATS scoring, and clean vector PDF exports 100% free of charge.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-center">
            <Lock className="mx-auto text-emerald-600" size={22} />
            <h3 className="font-bold text-slate-900 text-xs">Privacy First</h3>
            <p className="text-xs text-slate-700">Your resume data can be saved offline locally in your browser.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-center">
            <Sparkles className="mx-auto text-purple-600" size={22} />
            <h3 className="font-bold text-slate-900 text-xs">AI Assistance</h3>
            <p className="text-xs text-slate-700">Google X-Y-Z formula engines and ATS keyword matchers.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-center">
            <ShieldCheck className="mx-auto text-brand-600" size={22} />
            <h3 className="font-bold text-slate-900 text-xs">ATS Compatibility</h3>
            <p className="text-xs text-slate-700">Designed for compatibility with widely used applicant-tracking systems.</p>
          </div>
        </div>
      </section>

      <section className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base">Ready to build your next resume?</h3>
          <p className="text-xs text-slate-400">Join job seekers building stronger, more professional resumes.</p>
        </div>
        <Link to="/builder" className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 font-bold rounded-xl text-xs transition-colors">
          Build My Resume Free
        </Link>
      </section>
    </div>
  );
};
