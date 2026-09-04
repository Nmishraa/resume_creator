import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../../components/common/SeoHead';
import { FaqAccordion } from '../../components/common/FaqAccordion';
import { FileText, CheckCircle2, ShieldCheck, ArrowRight, Zap, Check, FileCheck } from 'lucide-react';

export const AtsResumeBuilderPage: React.FC = () => {
  const faqs = [
    {
      question: 'What makes a resume 100% ATS-compliant?',
      answer: 'An ATS-compliant resume uses single-column layout formatting, standard headings (Experience, Education, Skills), vector text instead of scanned images, and exact keyword matches from target job descriptions.'
    },
    {
      question: 'Will these templates work with Workday, Taleo, and Greenhouse?',
      answer: 'Yes! All 5 templates in Resume Craft are designed strictly following Workday, Taleo, Greenhouse, and Lever parsing specifications.'
    },
    {
      question: 'Is the ATS Resume Builder completely free?',
      answer: 'Yes, 100% free with zero paywalls, subscriptions, or credit cards required.'
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      <SeoHead
        title="Free ATS Resume Builder – 100% ATS Compliant Layouts | Resume Craft"
        description="Build an ATS-compliant resume engineered to pass Workday, Greenhouse, and Taleo algorithms. Free vector PDF export with zero paywalls."
        canonicalPath="/ats-resume-builder"
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-900 via-brand-950 to-slate-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
            <ShieldCheck size={14} />
            <span>Targeting Google Search: "ATS Resume Builder"</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">ATS Resume Builder</span> Engineered for Modern Hiring Systems
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Ensure your resume passes automated applicant tracking systems (ATS) like Workday, Greenhouse, and Lever with clean single-column layouts and vector PDF exports.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/builder"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <FileText size={18} />
              <span>Create ATS Resume Now &rarr;</span>
            </Link>
            <Link
              to="/ats-resume-checker"
              className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={18} className="text-emerald-400" />
              <span>Check ATS Score Free</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit font-bold">01</div>
          <h3 className="font-bold text-slate-900 text-lg">Single-Column Vector Layouts</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Avoid multi-column tables or graphic boxes that scramble automated ATS parsers.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="p-3 bg-brand-50 text-brand-600 rounded-xl w-fit font-bold">02</div>
          <h3 className="font-bold text-slate-900 text-lg">Exact Keyword Alignment</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Automatically compare your technical skills against job postings to eliminate keyword gaps.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit font-bold">03</div>
          <h3 className="font-bold text-slate-900 text-lg">Vector PDF Downloads</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Export sharp selectable-text PDFs that preserve font hierarchies and section ordering.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <FaqAccordion items={faqs} />
      </section>
    </div>
  );
};
