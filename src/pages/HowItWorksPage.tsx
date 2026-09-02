import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/common/SeoHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ShieldCheck, Sparkles, FileText, CheckCircle2, Download, ArrowRight, Layers } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <SeoHead
        title="How Resume Craft Works – Vector PDFs & AI ATS Architecture | Resume Craft"
        description="Discover how Resume Craft generates ATS-scannable vector PDFs and utilizes AI bullet optimization to maximize interview callback rates."
        canonicalPath="/how-it-works"
      />

      <Breadcrumbs items={[{ name: 'How It Works', path: '/how-it-works' }]} />

      <header className="space-y-3 pt-2 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950">How Resume Craft Works</h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          The technical architecture behind our ATS-scannable vector PDFs, real-time keyword matching, and AI bullet optimization.
        </p>
      </header>

      <section className="space-y-6">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-black">
            01
          </div>
          <h2 className="text-lg font-bold text-slate-900">Single-Column Structural Parsing</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Applicant Tracking Systems parse documents linearly from top to bottom. Multi-column templates often cause the left and right columns to concatenate into a scrambled mess. Resume Craft templates enforce a clean, single-column visual hierarchy with standard metadata blocks so parsers capture your job titles, companies, dates, and skills with high parsing accuracy.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-black">
            02
          </div>
          <h2 className="text-lg font-bold text-slate-900">Real-Time Keyword &amp; Density Scoring</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            When you paste a target job description into our ATS checker, our natural language extraction tokenizer identifies required technologies, certifications, and responsibilities. The checker calculates keyword density across your resume and enables 1-click addition of missing skills directly to your profile.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
            03
          </div>
          <h2 className="text-lg font-bold text-slate-900">Vector PDF Rendering Engine</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Many online resume builders take a screenshot of your resume and convert it into an image inside a PDF. ATS parsers cannot read raster images. Resume Craft compiles native vector text with embedded standard typography, ensuring every character is selectable and machine-readable.
          </p>
        </div>
      </section>

      <section className="p-8 bg-slate-900 text-white rounded-2xl text-center space-y-4">
        <h3 className="text-2xl font-black">Experience the ATS-Engine Firsthand</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          Start building your resume for free. Download your vector PDF in minutes.
        </p>
        <Link
          to="/builder"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 font-bold text-white rounded-xl text-xs sm:text-sm transition-colors shadow"
        >
          <span>Open Resume Builder</span>
          <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
};
