import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SeoHead } from '../components/common/SeoHead';
import { FaqAccordion } from '../components/common/FaqAccordion';
import {
  Sparkles,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Layers,
  ArrowRight,
  Check,
  Lock,
  UploadCloud,
  Briefcase,
  Star,
  Download,
  CheckCircle,
  Zap,
  Layout,
  Award,
  HelpCircle
} from 'lucide-react';
import { UploadResumeModal } from '../components/builder/UploadResumeModal';
import { TEMPLATE_LIST } from '../components/templates';
import { ResumeExamplesCarousel } from '../components/common/ResumeExamplesCarousel';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadInitialStep, setUploadInitialStep] = useState<'upload' | 'template' | 'preview'>('upload');

  const homeFaqs = [
    {
      question: 'Is Resume Craft completely free to use?',
      answer: 'Yes, 100% free. You can build, edit, score, and download your resume as a high-resolution vector PDF with no watermark, no hidden fees, and no credit card required.'
    },
    {
      question: 'Do I need to sign up or create an account?',
      answer: 'No account creation is required. You can build and download your resume immediately using secure local browser storage.'
    },
    {
      question: 'Are these resume templates ATS-friendly?',
      answer: 'Yes. All templates are built using single-column reading orders, standard section headings, and ATS-parseable text layers designed to pass Applicant Tracking Systems effortlessly.'
    },
    {
      question: 'How does the PDF download work?',
      answer: 'Clicking "Download PDF" directly generates and downloads a clean .pdf file onto your device. It preserves exact fonts, colors, and margins without opening print dialogs.'
    },
    {
      question: 'Is my personal information kept private?',
      answer: 'Yes. All resume data is stored locally in your web browser. We do not sell your personal data or track your resume contents.'
    }
  ];



  return (
    <div className="space-y-16 pb-16 bg-slate-50/50">
      <SeoHead
        title="Build an ATS-Friendly Resume for Free | Resume Craft"
        description="Create an ATS-optimized resume in minutes. No login, no watermark, and no hidden fees. Download high-resolution vector PDFs free."
        canonicalPath="/"
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/80 via-white to-slate-50 pt-12 pb-16 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100/90 border border-brand-200 text-brand-950 text-xs sm:text-sm font-extrabold shadow-2xs">
            <Sparkles size={15} className="text-brand-600 shrink-0" />
            <span>No login, no watermark, and no hidden fees.</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12]">
            Build an <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-600">ATS-Friendly Resume</span> for Free
          </h1>

          <p className="text-base sm:text-lg text-slate-700 font-medium max-w-2xl mx-auto leading-relaxed">
            Create a professional, interview-ready resume in minutes with our guided builder, AI bullet enhancers, and direct vector PDF export.
          </p>

          {/* Primary Action Button + Secondary Options */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/builder"
              className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-2xl text-base shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer min-h-[44px]"
            >
              <FileText size={20} />
              <span>Build My Resume Free</span>
              <ArrowRight size={18} />
            </Link>

            <button
              onClick={() => {
                setUploadInitialStep('upload');
                setShowUploadModal(true);
              }}
              className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 font-extrabold rounded-2xl text-sm sm:text-base border border-slate-300 shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <UploadCloud size={18} className="text-brand-600" />
              <span>Upload Existing Resume</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="pt-6 border-t border-slate-200/90 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-sm text-slate-700 font-semibold">
            <span className="flex items-center gap-1.5">
              <Check size={16} className="text-emerald-600 stroke-[3]" /> 100% Free Forever
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={16} className="text-emerald-600 stroke-[3]" /> No Registration Required
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={16} className="text-emerald-600 stroke-[3]" /> Direct PDF Download
            </span>
          </div>
        </div>
      </section>

      {/* 2. CORE BENEFITS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-extrabold text-brand-600 uppercase tracking-wider bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
            Why Choose Resume Craft
          </span>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Engineered for High ATS Pass Rates
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <Layout size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">ATS-Proof Formatting</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Clean single-column layouts and standard typography ensure your resume is parsed correctly by recruiter systems.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">AI Bullet Enhancer</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Transform generic duty bullets into high-impact metric achievements using the Google X-Y-Z formula.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Download size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Direct Vector PDF Export</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Download clean vector PDFs with selectable text layers directly onto your device without browser print dialogs.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURE BANNER: FIND JOBS WITH YOUR RESUME */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-brand-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-extrabold border border-brand-400/30">
              <Briefcase size={14} className="text-brand-400" />
              <span>AI Job Matcher</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Find Jobs With Your Resume
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              Upload your resume or build one free to discover verified live job openings matched to your target role, technical skills, experience level, and preferred location.
            </p>
          </div>
          <Link
            to="/find-jobs-with-resume"
            className="px-6 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-extrabold rounded-2xl text-sm transition-all shadow-lg flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <span>Explore Job Matcher</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* FEATURE BANNER: INTERVIEW QUESTION GENERATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-extrabold border border-purple-200">
              <HelpCircle size={14} className="text-purple-600" />
              <span>Free Role-Based Interview Prep</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Prepare for Interviews by Job Role
            </h3>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              Generate 10 role-specific interview questions, technical trade-off scenarios, and STAR framework answer blueprints for any job title.
            </p>
          </div>
          <Link
            to="/interview-questions"
            className="px-6 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-2xl text-sm transition-all shadow-lg flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <span>Interview Question Generator</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl font-black text-slate-950 tracking-tight">
              How to Build Your Resume in Minutes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="space-y-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-extrabold flex items-center justify-center text-sm shadow-md">
                1
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Enter Your Information</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Follow our step-by-step guided forms for personal details, work history, education, and skills.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-extrabold flex items-center justify-center text-sm shadow-md">
                2
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Choose a Template</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Select from clean, ATS-compliant designs and customize colors, font sizes, and layout density.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-extrabold flex items-center justify-center text-sm shadow-md">
                3
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Download Your PDF</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Export a vector PDF file directly to your device. No sign up, no watermark, and 100% free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TEMPLATES GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            ATS Templates
          </span>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Professional &amp; ATS-Compliant Layouts
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TEMPLATE_LIST.map((tpl) => (
            <div key={tpl.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-base">{tpl.name}</h3>
                  <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded">{tpl.tag}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{tpl.description}</p>
              </div>
              <Link
                to="/builder"
                className="w-full py-2.5 bg-slate-100 hover:bg-brand-600 hover:text-white text-slate-800 text-xs font-bold rounded-xl transition-colors text-center flex items-center justify-center gap-1.5"
              >
                <span>Build With This Template</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 5. RESUME EXAMPLES CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ResumeExamplesCarousel
          title="20 Professional ATS Resume Examples"
          subtitle="Explore 20 complete, recruiter-vetted resume samples. Hover to pause auto-scroll, click 'View Example' for full details, or 'Use Example' to edit in the builder."
        />
      </section>



      {/* 6. PRIVACY & FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <FaqAccordion items={homeFaqs} />
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight max-w-2xl mx-auto">
            Ready to Build Your Free ATS-Friendly Resume?
          </h2>
          <p className="text-sm sm:text-base text-brand-100 max-w-xl mx-auto">
            Join thousands of job seekers creating professional resumes with zero login, zero watermark, and zero hidden fees.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              to="/builder"
              className="px-8 py-4 bg-white hover:bg-slate-100 text-brand-900 font-extrabold rounded-2xl text-base shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <FileText size={20} className="text-brand-600" />
              <span>Build My Resume Free</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Global Upload Resume Modal */}
      <UploadResumeModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        initialStep={uploadInitialStep}
      />
    </div>
  );
};
