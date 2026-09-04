import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../../components/common/SeoHead';
import { FaqAccordion } from '../../components/common/FaqAccordion';
import { Target, Search, CheckCircle2, ArrowRight, FileCheck, Zap } from 'lucide-react';

export const KeywordMatcherPage: React.FC = () => {
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
    <div className="space-y-16 pb-20">
      <SeoHead
        title="Free Resume Keyword Matcher – Compare Resume Against Job Description | Resume Craft"
        description="Scan your resume against any job description to find missing technical skills, keyword frequency, and recruiter requirements in real-time."
        canonicalPath="/resume-keyword-matcher"
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-900 via-teal-950 to-slate-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-bold">
            <Target size={14} />
            <span>Targeting Google Search: "Resume Keyword Matcher"</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-400 to-cyan-300">Resume Keyword Matcher</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Instantly compare your resume against any job posting to discover missing keywords, technical skills gaps, and recruiter requirements.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/job-description-resume-matcher"
              className="w-full sm:w-auto px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Search size={18} />
              <span>Scan Resume Keywords Free &rarr;</span>
            </Link>
            <Link
              to="/ats-resume-checker"
              className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={18} className="text-teal-300" />
              <span>Check ATS Score</span>
            </Link>
          </div>
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
