import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../../components/common/SeoHead';
import { FaqAccordion } from '../../components/common/FaqAccordion';
import { Target, Search, CheckCircle2, ArrowRight, FileCheck, Zap } from 'lucide-react';

export const KeywordMatcherPage: React.FC = () => {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Resume Keyword Matcher – Match Your Resume to a Job Description',
    description: 'Paste a job description and compare it against your resume. Identify matching and missing keywords, technical skills, and requirements to boost ATS score.',
    url: 'https://resume.gnanamai.com/resume-keyword-matcher'
  };

  const faqs = [
    {
      question: 'Why is resume keyword matching important?',
      answer: 'ATS software scans applicants for exact keyword matches specified in the job posting. Having a high keyword match score increases your likelihood of reaching human recruiters by over 300%.'
    },
    {
      question: 'How does the Resume Keyword Matcher work?',
      answer: 'It extracts hard skills, technical requirements, and industry keywords from any job description, compares them against your resume text, and generates a list of missing keywords.'
    },
    {
      question: 'Is the keyword matcher free to use?',
      answer: 'Yes! 100% free with unlimited scans and no account registration needed.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <SeoHead
        title="Resume Keyword Matcher – Match Your Resume to a Job Description"
        description="Paste a job description and compare it against your resume. Identify matching and missing keywords, technical skills, and requirements to boost ATS score."
        canonicalPath="/resume-keyword-matcher"
        jsonLd={pageSchema}
      />

      {/* Hero Header */}
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
          <Target size={14} className="text-teal-600" />
          <span>Real-Time Job Description Analysis • 100% Free</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Resume Keyword Matcher
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Paste any job description to compare it against your resume in real time. Identify matching keywords, discover missing technical skills, and tailor your application to pass ATS filters effortlessly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/job-description-resume-matcher"
            className="w-full sm:w-auto px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 min-h-[44px]"
          >
            <Search size={18} />
            <span>Launch Keyword Matcher Scanner &rarr;</span>
          </Link>
          <Link
            to="/resume-builder"
            className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-sm border border-slate-300 shadow-xs transition-all flex items-center justify-center gap-2 min-h-[44px]"
          >
            <FileCheck size={18} className="text-brand-600" />
            <span>Go to Free Resume Builder</span>
          </Link>
        </div>
      </section>

      {/* Interactive Scan Process */}
      <section className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-xl w-fit font-bold">1</div>
          <h3 className="font-bold text-slate-900 text-lg">Paste Job Description</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Copy the target job posting responsibilities and requirements into the scanner.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="p-3 bg-brand-50 text-brand-600 rounded-xl w-fit font-bold">2</div>
          <h3 className="font-bold text-slate-900 text-lg">Extract Key Terms</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Our algorithm parses hard skills, soft skills, software tools, and required qualifications.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit font-bold">3</div>
          <h3 className="font-bold text-slate-900 text-lg">1-Click Keyword Insertion</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Insert missing keywords directly into your skills and work experience sections with 1 click.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <FaqAccordion items={faqs} title="Resume Keyword Matcher FAQs" />
      </section>
    </div>
  );
};
