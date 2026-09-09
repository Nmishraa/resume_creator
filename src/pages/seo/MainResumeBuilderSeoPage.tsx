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
  Download,
  Layout,
  Sliders,
  Award,
  Zap
} from 'lucide-react';

export const MainResumeBuilderSeoPage: React.FC = () => {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Free Resume Builder – Create an ATS-Friendly Resume',
    description: 'Create a professional, ATS-friendly resume for free. Choose recruiter-tested templates, customize sections, and download vector PDFs instantly with no login or watermark.',
    url: 'https://resume.gnanamai.com/resume-builder'
  };

  const faqs = [
    {
      question: 'Is this resume builder 100% free to use?',
      answer: 'Yes, 100% free. You can build, customize, and export your resume as a high-resolution vector PDF with zero paywalls, zero watermarks, and no credit card required.'
    },
    {
      question: 'Are the resume templates ATS-friendly?',
      answer: 'Yes. All templates are built using single-column reading hierarchies, standard headings, and ATS-parseable text layers designed to pass Workday, Greenhouse, Taleo, and Lever systems.'
    },
    {
      question: 'Can I customize sections and styling?',
      answer: 'Absolutely. You can customize font sizes, line spacing, accent colors, section order, skills categories, and custom sections like publications, certifications, or awards.'
    },
    {
      question: 'Do I need to create an account or sign in?',
      answer: 'No sign-up is required. You can build and download your resume immediately using secure local browser storage.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <SeoHead
        title="Free Resume Builder – Create an ATS-Friendly Resume"
        description="Create a professional, ATS-friendly resume for free. Choose recruiter-tested templates, customize sections, and download vector PDFs instantly with no login or watermark."
        canonicalPath="/resume-builder"
        jsonLd={pageSchema}
      />

      <Breadcrumbs items={[{ name: 'Free Resume Builder', path: '/resume-builder' }]} />

      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold">
          <Sparkles size={14} className="text-brand-600" />
          <span>100% Free • No Sign-Up • No Watermark</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Free Resume Builder
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Build a recruiter-tested, ATS-friendly resume in minutes. Select from clean templates, customize your content with AI suggestions, and export high-resolution vector PDFs free.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/builder"
            className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2 min-h-[44px]"
          >
            <FileText size={18} />
            <span>Start Building My Resume Free &rarr;</span>
          </Link>
          <Link
            to="/ats-resume-builder"
            className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-sm border border-slate-300 shadow-xs transition-all flex items-center justify-center gap-2 min-h-[44px]"
          >
            <ShieldCheck size={18} className="text-emerald-600" />
            <span>Learn About ATS Formatting</span>
          </Link>
        </div>
      </section>

      {/* Value Pillars Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-brand-600 uppercase tracking-wider bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
            Why Job Seekers Choose Resume Craft
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            Everything You Need for an Interview-Winning Resume
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-bold text-slate-900 text-base">ATS-Friendly Formatting</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clean single-column structure and standard section headings ensure applicant tracking systems parse your contact info, work history, and skills cleanly.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Layout size={20} />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Recruiter-Tested Templates</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Choose from Modern, Tech, Executive, Slate, and Compact layouts designed to highlight candidate strengths across entry-level and executive roles.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Download size={20} />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Direct PDF Export Options</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Download clean vector PDFs with selectable text layers directly onto your device with no watermarks, registration barriers, or hidden charges.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Deep Dive */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <h2 className="text-2xl font-black text-slate-950">
          Easy Resume Customization &amp; Examples
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <Sliders size={18} className="text-brand-600" />
              <span>Full Customization Controls</span>
            </div>
            <p>
              Easily reorder sections, adjust line height, tweak margin density, and change font families to fit your exact experience onto 1-page or 2-page formats without overflowing.
            </p>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600">
              <li>Add custom categories for projects, awards, and certifications</li>
              <li>Re-order experience entries and bullet points drag-and-drop</li>
              <li>Live side-by-side preview updating instantly as you type</li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <Award size={18} className="text-purple-600" />
              <span>Role-Specific Examples &amp; Bullet Prompts</span>
            </div>
            <p>
              Access pre-written summary examples and Google X-Y-Z achievement bullets tailored for Software Engineers, Product Managers, Data Analysts, Project Managers, and Cloud Architects.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <Link to="/resume-examples" className="text-xs font-bold text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1.5 rounded-lg hover:bg-brand-100 transition-colors">
                Explore Resume Examples &rarr;
              </Link>
              <Link to="/resume-templates" className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-lg hover:bg-purple-100 transition-colors">
                Explore Templates &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links Navigation Bar */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900">Explore Dedicated Resume Building Tools:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <Link to="/ai-resume-builder" className="p-3 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-xs transition-all block text-xs font-bold text-slate-800">
            <div className="flex items-center gap-1.5 text-purple-600 mb-1"><Sparkles size={14} /> AI Resume Builder</div>
            <span className="text-slate-500 font-normal">Generate bullets with AI</span>
          </Link>
          <Link to="/ats-resume-builder" className="p-3 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-xs transition-all block text-xs font-bold text-slate-800">
            <div className="flex items-center gap-1.5 text-emerald-600 mb-1"><ShieldCheck size={14} /> ATS Resume Builder</div>
            <span className="text-slate-500 font-normal">Optimize for ATS parsers</span>
          </Link>
          <Link to="/cover-letter-builder" className="p-3 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-xs transition-all block text-xs font-bold text-slate-800">
            <div className="flex items-center gap-1.5 text-brand-600 mb-1"><FileText size={14} /> Cover Letter Builder</div>
            <span className="text-slate-500 font-normal">Write role cover letters</span>
          </Link>
          <Link to="/resume-keyword-matcher" className="p-3 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-xs transition-all block text-xs font-bold text-slate-800">
            <div className="flex items-center gap-1.5 text-teal-600 mb-1"><Zap size={14} /> Keyword Matcher</div>
            <span className="text-slate-500 font-normal">Match job descriptions</span>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <FaqAccordion items={faqs} title="Resume Builder FAQs" />

      {/* Bottom CTA */}
      <section className="text-center bg-gradient-to-r from-brand-900 to-indigo-900 text-white rounded-2xl p-8 space-y-4">
        <h3 className="text-2xl font-black">Build Your Resume in Minutes</h3>
        <p className="text-xs sm:text-sm text-brand-200 max-w-xl mx-auto">
          Choose a template, add your achievements, and download a clean PDF immediately for free.
        </p>
        <Link
          to="/builder"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-950 font-bold rounded-xl text-xs sm:text-sm hover:bg-brand-50 transition-colors shadow-lg"
        >
          <span>Launch Free Resume Builder</span>
          <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
};
