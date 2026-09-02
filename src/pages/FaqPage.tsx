import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/common/SeoHead';
import { FaqAccordion, FaqItem } from '../components/common/FaqAccordion';
import { HelpCircle, FileText, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';

const ALL_FAQS: FaqItem[] = [
  {
    question: 'Is Resume Craft 100% free to use?',
    answer: 'Yes. Resume Craft provides free resume creation, AI bullet point enhancements, ATS score checking, and vector PDF exports with zero credit card requirements and no hidden download paywalls.',
    category: 'General'
  },
  {
    question: 'Do I need to create an account to build or download a resume?',
    answer: 'No account is required. You can build, optimize, and export your resume immediately using local browser storage or Guest mode. An account is only needed if you choose to sync your resumes across multiple devices.',
    category: 'Privacy'
  },
  {
    question: 'What is an ATS (Applicant Tracking System)?',
    answer: 'An ATS is software used by employers and recruiters (such as Workday, Greenhouse, Taleo, and Lever) to collect, parse, sort, and rank job applicant resumes before a human recruiter reads them.',
    category: 'ATS & Scoring'
  },
  {
    question: 'Will Resume Craft guarantee that my resume passes an ATS?',
    answer: 'No software can guarantee job placement or ATS screening passage because hiring criteria and recruiter preferences vary. Resume Craft is an optimization tool designed to maximize keyword density, single-column parsing reliability, and quantifiable achievement clarity.',
    category: 'ATS & Scoring'
  },
  {
    question: 'Can I upload or import an existing resume?',
    answer: 'Yes! In the Resume Builder, click "Upload Existing Resume" to upload a PDF, DOCX, or TXT file. Our parser extracts your content into 9 structured sections for immediate review and template selection.',
    category: 'AI & Templates'
  },
  {
    question: 'Can AI improve my resume bullet points?',
    answer: 'Yes. The built-in AI bullet assistant analyzes passive statements and applies the Google X-Y-Z formula ("Accomplished [X], measured by [Y], by doing [Z]") to transform duties into measurable business outcomes.',
    category: 'AI & Templates'
  },
  {
    question: 'Can I download my resume as a PDF?',
    answer: 'Yes. All resumes export as clean, selectable-text vector PDFs rendered directly in your browser, ensuring automated ATS scanners can read every word accurately without image compression artifacts.',
    category: 'AI & Templates'
  },
  {
    question: 'Are all templates ATS-friendly?',
    answer: 'Yes. All templates adhere to ATS-safe layout standards: standard headings, single-column reading order, readable font hierarchies, and zero unparsable background tables or floating graphic text boxes.',
    category: 'AI & Templates'
  },
  {
    question: 'How does the ATS score work?',
    answer: 'The ATS score (0–100) evaluates 5 core dimensions: target job description keyword matching, Google X-Y-Z metric density, action verb strength, layout formatting compatibility, and contact detail completeness.',
    category: 'ATS & Scoring'
  },
  {
    question: 'Is my resume data stored or shared with third parties?',
    answer: 'No. By default, your resume data remains stored locally in your web browser. When optional cloud sync is enabled, your data is saved securely in your private account. We never sell or share candidate data with third parties.',
    category: 'Privacy'
  },
  {
    question: 'Can I match my resume against a job description?',
    answer: 'Yes. Use our Job Description Matcher tool to paste any job posting. Resume Craft calculates a match percentage and lists missing technical or soft skills you should add.',
    category: 'ATS & Scoring'
  },
  {
    question: 'Can I create multiple resumes for different job applications?',
    answer: 'Yes. You can save, duplicate, and manage unlimited resume versions for different target job titles directly in your local workspace.',
    category: 'General'
  }
];

export const FaqPage: React.FC = () => {
  return (
    <div className="space-y-12 pb-16">
      <SeoHead
        title="Frequently Asked Questions (FAQ) | Resume Craft"
        description="Find answers to common questions about Resume Craft, ATS resume scoring, AI bullet improvements, vector PDF downloads, and data privacy."
        canonicalPath="/faq"
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-brand-50/70 via-white to-slate-50 pt-12 pb-14 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/90 border border-brand-200 text-brand-900 text-xs font-bold shadow-2xs">
            <HelpCircle size={14} className="text-brand-600 shrink-0" />
            <span>Help &amp; Knowledge Base</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Frequently Asked Questions
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about ATS scoring, AI bullet enhancements, document imports, and candidate privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600 pt-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-600" /> 100% Free Forever
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-brand-600" /> No Account Required
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-indigo-600" /> Instant PDF Exports
            </span>
          </div>
        </div>
      </section>

      {/* Main FAQ Component with Category Tabs & Search */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        <FaqAccordion items={ALL_FAQS} hideHeader />
      </main>

      {/* Bottom CTA Card */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 text-center space-y-5 shadow-xl border border-slate-800">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Ready to build your ATS-ready resume?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Use AI bullet generation, match your resume against any job description, and export a clean vector PDF in minutes.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/builder"
              className="px-7 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-2 active:scale-95"
            >
              <FileText size={15} />
              <span>Build My Resume Free &rarr;</span>
            </Link>
            <Link
              to="/ats-resume-checker"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold rounded-xl text-xs transition-colors flex items-center gap-2"
            >
              <CheckCircle2 size={15} className="text-emerald-400" />
              <span>Check ATS Score</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
