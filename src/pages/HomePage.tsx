import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
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
  const { updateResume } = useResume();
  const navigate = useNavigate();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadInitialStep, setUploadInitialStep] = useState<'upload' | 'template' | 'preview'>('upload');

  const alexMorganData = {
    title: 'Alex Morgan - Senior Full-Stack Engineer Resume',
    personalInfo: {
      fullName: 'Alex Morgan',
      jobTitle: 'Senior Full-Stack Engineer',
      email: 'alex.morgan@dev.io',
      phone: '(555) 234-5678',
      location: 'San Francisco, CA',
      website: 'alexmorgan.dev',
      linkedin: 'linkedin.com/in/alexmorgan',
      github: 'github.com/alexmorgan'
    },
    summary: 'Results-driven engineer with 7+ years of experience building high-throughput microservices. Spearheaded system architecture handling 5M daily active users.',
    experience: [
      {
        id: 'exp-1',
        role: 'Lead Systems Engineer',
        company: 'Cloud Scale',
        location: 'San Francisco, CA',
        startDate: '2021',
        endDate: 'Present',
        current: true,
        highlights: [
          'Architected multi-region Kubernetes clusters, reducing downtime by 99.9%.',
          'Optimized API gateway throughput by 42% using React & Node.js microservices.'
        ]
      }
    ],
    skills: [
      {
        id: 'skill-1',
        category: 'Core Stack',
        items: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker']
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'B.S. in Computer Science',
        institution: 'UC Berkeley',
        location: 'Berkeley, CA',
        startDate: '2013',
        endDate: '2017'
      }
    ],
    projects: [],
    certifications: [],
    customSections: []
  };

  const handleUseAlexMorganLayout = () => {
    updateResume(alexMorganData);
    navigate('/builder');
  };

  const handlePreviewAlexMorganLayout = () => {
    navigate('/resume-preview?slug=alex-morgan', { state: { resumeData: alexMorganData } });
  };

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
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/80 via-white to-slate-50 pt-10 pb-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Focused Copy & Primary Action (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100/90 border border-brand-200 text-brand-950 text-xs sm:text-sm font-extrabold shadow-2xs">
                <Sparkles size={15} className="text-brand-600 shrink-0" />
                <span>No login, no watermark, and no hidden fees.</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12]">
                Build an <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-600">ATS-Friendly Resume</span> for Free
              </h1>

              <p className="text-base sm:text-lg text-slate-700 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Create a professional, interview-ready resume in minutes with our guided builder, AI bullet enhancers, and direct vector PDF export.
              </p>

              {/* Prominent Action Buttons with Front-and-Center PDF Importer */}
              <div className="flex flex-col sm:flex-row items-stretch justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => {
                    setUploadInitialStep('upload');
                    setShowUploadModal(true);
                  }}
                  className="px-7 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-2xl text-base shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer min-h-[50px] border border-emerald-400/30"
                >
                  <UploadCloud size={22} className="animate-bounce" />
                  <div className="text-left leading-tight">
                    <span className="block font-black text-base">Upload &amp; Parse Existing Resume</span>
                    <span className="block text-[11px] font-semibold text-emerald-100 opacity-90">Auto-fill builder in 3 seconds (PDF / Word)</span>
                  </div>
                </button>

                <Link
                  to="/builder"
                  className="px-7 py-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-2xl text-base shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer min-h-[50px]"
                >
                  <FileText size={20} className="text-brand-400" />
                  <span>Build From Scratch</span>
                  <ArrowRight size={18} />
                </Link>
              </div>

              {/* Instant Dropzone Quick-Import Highlight Banner */}
              <div
                onClick={() => {
                  setUploadInitialStep('upload');
                  setShowUploadModal(true);
                }}
                className="bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200/90 rounded-2xl p-3.5 text-center lg:text-left flex items-center justify-between gap-3 cursor-pointer transition-all shadow-xs group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <UploadCloud size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                      <span>🚀 PDF &amp; Word Resume Importer</span>
                      <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-extrabold">Instant Parse</span>
                    </div>
                    <p className="text-[11px] text-emerald-800 font-medium">Already have a resume? Upload your PDF or Word document to pre-fill all sections automatically.</p>
                  </div>
                </div>
                <span className="hidden sm:inline-block text-xs font-bold text-emerald-700 group-hover:translate-x-0.5 transition-transform shrink-0">
                  Upload PDF &rarr;
                </span>
              </div>

              {/* Trust Badges */}
              <div className="pt-3 border-t border-slate-200/90 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-sm text-slate-700 font-semibold">
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

            {/* Right Column: Single Professional Resume Preview Visual (5 cols) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div 
                onClick={handlePreviewAlexMorganLayout}
                className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-300 p-6 space-y-4 transform hover:scale-[1.01] transition-transform cursor-pointer"
                title="Click to view full-page resume preview"
              >
                
                {/* Floating ATS Score Badge */}
                <div className="absolute -top-3 -right-3 bg-emerald-600 text-white px-3.5 py-1.5 rounded-full font-black text-xs sm:text-sm shadow-md border-2 border-white flex items-center gap-1.5">
                  <CheckCircle2 size={15} />
                  <span>(Example result) ATS Score: 98/100</span>
                </div>

                {/* Sample Resume Header */}
                <div className="border-b border-slate-200 pb-3 space-y-1">
                  <h3 className="text-xl font-black text-slate-900">Alex Morgan</h3>
                  <p className="text-xs font-bold text-brand-600">Senior Full-Stack Engineer</p>
                  <p className="text-[11px] text-slate-500">alex.morgan@dev.io • (555) 234-5678 • San Francisco, CA</p>
                </div>

                {/* Summary Section */}
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-0.5">Professional Summary</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Results-driven engineer with 7+ years of experience building high-throughput microservices. Spearheaded system architecture handling 5M daily active users.
                  </p>
                </div>

                {/* Experience Section */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-0.5">Work Experience</h4>
                  <div>
                    <div className="flex justify-between items-baseline text-[11px]">
                      <span className="font-bold text-slate-800">Lead Systems Engineer • Cloud Scale</span>
                      <span className="text-slate-500 font-medium">2021 – Present</span>
                    </div>
                    <ul className="text-[11px] text-slate-600 list-disc list-inside space-y-0.5 mt-0.5">
                      <li>Architected multi-region Kubernetes clusters, reducing downtime by 99.9%.</li>
                      <li>Optimized API gateway throughput by 42% using React &amp; Node.js microservices.</li>
                    </ul>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-0.5">Core Skills</h4>
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'].map((skill) => (
                      <span key={skill} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-bold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interactive Preview Link Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePreviewAlexMorganLayout();
                    }}
                    className="w-full py-2.5 bg-brand-50 hover:bg-brand-100 active:scale-[0.99] text-brand-700 font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 border border-brand-200 cursor-pointer shadow-xs"
                  >
                    <span>View &amp; Use Layout Preview</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

              </div>
            </div>

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
          featuredOnly={true}
          title="5 Featured ATS Resume Examples"
          subtitle="Explore 5 recruiter-vetted resume samples spanning 1-page, 2-page, and 3-page layouts across diverse roles. Hover to pause auto-scroll, click 'View Example' for full details, or 'Use Example' to edit."
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
