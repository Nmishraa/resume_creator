import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/common/SeoHead';
import { FaqAccordion } from '../components/common/FaqAccordion';
import {
  Sparkles,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Layers,
  ArrowRight,
  Zap,
  Check,
  Compass,
  GraduationCap,
  Target,
  FileCheck2,
  Lock,
  Download,
  Search,
  Code2,
  Briefcase,
  TrendingUp,
  Sliders,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { CompactPromoVideoSection } from '../components/common/CompactPromoVideoSection';
import { UploadResumeModal } from '../components/builder/UploadResumeModal';
import { UploadCloud, Layout, Eye } from 'lucide-react';
import { RESUME_EXAMPLES } from '../data/resumeExamplesData';

interface BulletDemoItem {
  role: string;
  category: string;
  before: string;
  after: string;
  x: string;
  y: string;
  z: string;
}

const BULLET_DEMOS: BulletDemoItem[] = [
  {
    role: 'Software Engineer',
    category: 'Engineering',
    before: 'Responsible for writing code and fixing bugs for the company web app.',
    after: 'Architected high-throughput microservices handling 4.2M daily API requests with 99.98% uptime using React, Node.js, and Google Cloud Platform.',
    x: 'Architected high-throughput microservices',
    y: '4.2M daily requests with 99.98% uptime',
    z: 'using React, Node.js, and GCP'
  },
  {
    role: 'Marketing Manager',
    category: 'Marketing',
    before: 'Managed social media accounts and created weekly email newsletters.',
    after: 'Increased organic social engagement by 42% and email CTR by 18% across 120k subscribers by implementing an automated weekly content strategy.',
    x: 'Increased organic social engagement and CTR',
    y: 'by 42% engagement & 18% CTR (120k audience)',
    z: 'by implementing automated weekly content strategy'
  },
  {
    role: 'Product Manager',
    category: 'Product',
    before: 'Led sprint meetings and gathered feature requirements from customers.',
    after: 'Spearheaded user onboarding redesign across 4 agile teams, decreasing customer time-to-value by 35% and boosting 30-day retention by 22%.',
    x: 'Spearheaded user onboarding redesign',
    y: 'reduced time-to-value by 35% & boosted retention by 22%',
    z: 'by coordinating 4 cross-functional agile teams'
  },
  {
    role: 'Sales Representative',
    category: 'Sales',
    before: 'Contacted sales leads and conducted product demo calls every week.',
    after: 'Generated $1.4M in new enterprise ARR, exceeding annual quota by 124% through consultative outbound prospecting across Fortune 500 accounts.',
    x: 'Generated $1.4M in new enterprise ARR',
    y: 'exceeded annual sales quota by 124%',
    z: 'through consultative outbound enterprise prospecting'
  }
];

export const HomePage: React.FC = () => {
  // Upload Resume & Apply Template Modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadInitialStep, setUploadInitialStep] = useState<'upload' | 'template' | 'preview'>('upload');

  // Showcase Tab State
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<'builder' | 'ats' | 'bullet' | 'matcher'>('builder');

  // Interactive AI Bullet Demo State
  const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);
  const [isImproving, setIsImproving] = useState(false);
  const [showImproved, setShowImproved] = useState(true);

  const activeBullet = BULLET_DEMOS[selectedBulletIndex];

  const handleImproveBullet = () => {
    setIsImproving(true);
    setShowImproved(false);
    setTimeout(() => {
      setIsImproving(false);
      setShowImproved(true);
    }, 450);
  };

  const handleSelectRole = (index: number) => {
    setSelectedBulletIndex(index);
    setShowImproved(true);
    setIsImproving(false);
  };

  const homeFaqs = [
    {
      question: 'Is Resume Craft free to use?',
      answer: 'Yes. Resume Craft provides free resume creation, AI bullet point enhancements, ATS scoring, and vector PDF exports with zero credit card requirements and no hidden download paywalls.'
    },
    {
      question: 'Do I need to create an account to build or download a resume?',
      answer: 'No account is required. You can build, optimize, and export your resume immediately using local browser storage or Guest mode. An account is only needed if you choose to sync your resumes across multiple devices.'
    },
    {
      question: 'What is an ATS (Applicant Tracking System)?',
      answer: 'An ATS is software used by employers and recruiters (such as Workday, Greenhouse, Taleo, and Lever) to collect, parse, sort, and rank job applicant resumes before a hiring manager reads them.'
    },
    {
      question: 'Will Resume Craft guarantee that my resume passes an ATS?',
      answer: 'No software can guarantee job placement or ATS screening passage because hiring criteria and recruiter preferences vary. Resume Craft is an optimization tool designed to maximize keyword density, single-column parsing reliability, and quantifiable achievement clarity.'
    },
    {
      question: 'Can I upload or import an existing resume?',
      answer: 'Yes! In the Resume Builder, click "Import" to paste your existing resume text, import document text, or load a JSON backup to instantly pre-populate all sections.'
    },
    {
      question: 'Can AI improve my resume bullets?',
      answer: 'Yes. The built-in AI bullet assistant analyzes passive statements and applies the Google X-Y-Z formula ("Accomplished [X], measured by [Y], by doing [Z]") to transform duties into measurable business outcomes.'
    },
    {
      question: 'Can I download my resume as a PDF?',
      answer: 'Yes. All resumes export as clean, selectable-text vector PDFs rendered directly in your browser, ensuring automated ATS scanners can read every word accurately without image compression artifacts.'
    },
    {
      question: 'Are the templates ATS-friendly?',
      answer: 'Yes. All 5 templates adhere to ATS-safe layout standards: standard headings, single-column reading order, readable standard font hierarchies, and zero unparsable background tables or floating graphic text boxes.'
    },
    {
      question: 'How does the ATS score work?',
      answer: 'The ATS score (0–100) evaluates 5 core dimensions: target job description keyword matching, Google X-Y-Z metric density, action verb strength, layout formatting compatibility, and contact detail completeness.'
    },
    {
      question: 'Is my resume data stored or shared?',
      answer: 'Your resume data is stored locally in your browser by default. If you create a free account, your data is stored securely in your private encrypted account database. Your resume data is never sold, shared with recruiters, or used for third-party advertising.'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      <SeoHead
        title="Free AI Resume Builder & ATS Resume Checker | Resume Craft"
        description="Build an ATS-friendly resume in minutes. Use AI to strengthen bullet points with the Google X-Y-Z formula, match job descriptions, and export vector PDFs for free."
        canonicalPath="/"
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50 pt-16 pb-20 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Product Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/90 border border-brand-200 text-brand-900 text-xs font-bold shadow-2xs">
                <Sparkles size={14} className="text-brand-600 shrink-0" />
                <span>Modern AI Career SaaS • 100% Free • No Paywalls</span>
              </div>

              {/* Strong Value Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12]">
                Build a Resume That Gets Past <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-600">ATS Filters</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Create a professional, ATS-friendly resume in minutes. Use AI to improve your experience, match your resume to job descriptions, and download a polished PDF — free.
              </p>

              {/* Primary Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/builder"
                  className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <FileText size={17} />
                  <span>Build My Resume &rarr;</span>
                </Link>

                <Link
                  to="/ats-resume-checker"
                  className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-sm border border-slate-300 shadow-xs hover:border-slate-400 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={17} className="text-emerald-600" />
                  <span>Check My ATS Score</span>
                </Link>
              </div>

              {/* Trust & Transparency Badges */}
              <div className="pt-6 border-t border-slate-200/90 flex flex-wrap items-center justify-center lg:justify-start gap-y-2.5 gap-x-6 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-emerald-600 stroke-[3]" /> No account required
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-emerald-600 stroke-[3]" /> Selectable vector PDFs
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-emerald-600 stroke-[3]" /> Designed for ATS compatibility
                </span>
              </div>
            </div>

            {/* Right Column: Hero Visual Product Preview & Compact Promo Video (5 cols) */}
            <div className="lg:col-span-5 relative space-y-4 flex flex-col items-center lg:items-end">
              <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/90 p-5 space-y-4">
                
                {/* Live Header Bar */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      RC
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">ATS Resume Optimizer</div>
                      <div className="text-[10px] text-slate-500">Sarah Jenkins • Senior Product Lead</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    <span>88/100 ATS Score</span>
                  </div>
                </div>

                {/* Score Category Badges */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-150 space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">Keyword Density</span>
                    <div className="font-bold text-emerald-700 flex items-center justify-between">
                      <span>92% Matched</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">High</span>
                    </div>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-150 space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">X-Y-Z Metrics</span>
                    <div className="font-bold text-emerald-700 flex items-center justify-between">
                      <span>8/9 Bullets</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">Pass</span>
                    </div>
                  </div>
                </div>

                {/* Action in Preview */}
                <div className="flex items-center gap-2 pt-1">
                  <Link
                    to="/builder"
                    className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Open in Resume Builder</span>
                    <ArrowRight size={13} />
                  </Link>
                  <Link
                    to="/ats-resume-checker"
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                    title="Scan ATS Score"
                  >
                    <Sliders size={15} />
                  </Link>
                </div>
              </div>

              {/* Compact Video Tour Widget on the Right */}
              <CompactPromoVideoSection />
            </div>
          </div>
        </div>
      </section>

      {/* UPLOAD RESUME & APPLY TEMPLATE CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-500/30">
                <Sparkles size={13} className="text-brand-400" />
                <span>Instant Resume Conversion</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-snug">
                Already have a resume? Upload it, choose a template, and create a professionally formatted resume in minutes.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Supports PDF, DOCX, or TXT formats. Your information is parsed into 9 structured sections, placed into modern ATS templates, and exported as vector PDFs.
              </p>
            </div>

            {/* 4 Required Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => {
                  setUploadInitialStep('upload');
                  setShowUploadModal(true);
                }}
                className="px-5 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-extrabold rounded-2xl text-xs transition-all shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <UploadCloud size={16} />
                <span>Upload My Resume</span>
              </button>

              <button
                onClick={() => {
                  setUploadInitialStep('template');
                  setShowUploadModal(true);
                }}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-extrabold rounded-2xl text-xs border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Layout size={16} className="text-brand-300" />
                <span>Choose a Template</span>
              </button>

              <button
                onClick={() => {
                  setUploadInitialStep('preview');
                  setShowUploadModal(true);
                }}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-extrabold rounded-2xl text-xs border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye size={16} className="text-indigo-300" />
                <span>Preview Resume</span>
              </button>

              <button
                onClick={() => {
                  setUploadInitialStep('preview');
                  setShowUploadModal(true);
                }}
                className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-2xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Download size={16} />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE PRODUCT SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 uppercase tracking-wider bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
            <Layers size={13} />
            <span>Interactive Product Demonstration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            See How Resume Craft Optimizes Your Career Documents
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Explore the four core tools engineered to get your resume seen by real hiring teams.
          </p>
        </div>

        {/* Showcase Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100/90 rounded-2xl max-w-2xl mx-auto border border-slate-200/80">
          <button
            onClick={() => setActiveShowcaseTab('builder')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeShowcaseTab === 'builder'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText size={14} className="text-brand-600" />
            <span>Resume Builder</span>
          </button>
          <button
            onClick={() => setActiveShowcaseTab('ats')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeShowcaseTab === 'ats'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 size={14} className="text-emerald-600" />
            <span>ATS Scorer</span>
          </button>
          <button
            onClick={() => setActiveShowcaseTab('bullet')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeShowcaseTab === 'bullet'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles size={14} className="text-purple-600" />
            <span>AI Bullet Writer</span>
          </button>
          <button
            onClick={() => setActiveShowcaseTab('matcher')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeShowcaseTab === 'matcher'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Target size={14} className="text-blue-600" />
            <span>Job Matcher</span>
          </button>
        </div>

        {/* Tab Showcase Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-8 transition-all">
          {activeShowcaseTab === 'builder' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-200">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-50 text-brand-700 text-xs font-bold">
                  <span>Step 1: Build</span>
                </div>
                <h3 className="text-2xl font-black text-slate-950">
                  Real-Time Editor with Instant Vector PDF Export
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Type your details or paste existing resume text. The interactive editor auto-formats typography, margins, and headings into single-column ATS layouts.
                </p>
                <div className="space-y-2 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-600" />
                    <span>1-click re-ordering of experience &amp; education</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-600" />
                    <span>5 customizable color accents and font pairings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-600" />
                    <span>Instant high-DPI vector PDF download</span>
                  </div>
                </div>
                <div className="pt-2">
                  <Link
                    to="/builder"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    <span>Launch Resume Builder</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
                <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4">
                  <div className="border-b border-slate-100 pb-3 flex justify-between items-start">
                    <div>
                      <div className="text-sm font-bold text-slate-900">David Martinez</div>
                      <div className="text-xs text-slate-500">San Francisco, CA • david@martinez.dev • github.com/davidm</div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      Modern Clean
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">Work Experience</div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-baseline font-semibold text-slate-800">
                        <span>Senior Backend Engineer — Stripe</span>
                        <span className="text-[11px] text-slate-500">2022 – Present</span>
                      </div>
                      <ul className="list-disc list-inside text-slate-600 text-[11px] space-y-1">
                        <li>Designed low-latency payment processing pipeline handling \$3.2B in annualized transaction volume.</li>
                        <li>Reduced database latency by 45% by transitioning Redis cache layers to distributed cluster nodes.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeShowcaseTab === 'ats' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-200">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-bold">
                  <span>Step 2: Score</span>
                </div>
                <h3 className="text-2xl font-black text-slate-950">
                  Comprehensive 0–100 ATS Compatibility Scanner
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Test your resume against 5 essential dimensions used by automated applicant tracking systems. Detect missing hard skills before submitting your application.
                </p>
                <div className="space-y-2 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-600" />
                    <span>Keyword density &amp; skill matching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-600" />
                    <span>Action verb strength analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-600" />
                    <span>Single-column parse-friendliness check</span>
                  </div>
                </div>
                <div className="pt-2">
                  <Link
                    to="/ats-resume-checker"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    <span>Check My ATS Score Now</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
                <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase">Demonstration Score</div>
                      <div className="text-3xl font-black text-emerald-600">88 <span className="text-sm font-semibold text-slate-400">/ 100</span></div>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                      ✓ High Compatibility
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <div className="text-[10px] text-slate-500 font-bold">Skills Match</div>
                      <div className="font-bold text-slate-900">92%</div>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <div className="text-[10px] text-slate-500 font-bold">Layout &amp; Font</div>
                      <div className="font-bold text-emerald-600">100% (Vector Safe)</div>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="text-[11px] font-bold text-slate-700">Missing Recommended Keywords:</div>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-medium">+ GraphQL</span>
                      <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-medium">+ Kubernetes</span>
                      <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-medium">+ CI/CD Pipelines</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeShowcaseTab === 'bullet' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-950 flex items-center gap-2">
                    <Sparkles size={18} className="text-purple-600" />
                    <span>Google X-Y-Z Bullet Point Optimizer</span>
                  </h3>
                  <p className="text-xs text-slate-600">Select a career role to test how Google&apos;s formula elevates job duties into quantifiable achievements.</p>
                </div>
                {/* Role Selector Tabs */}
                <div className="flex flex-wrap gap-1.5">
                  {BULLET_DEMOS.map((item, idx) => (
                    <button
                      key={item.role}
                      onClick={() => handleSelectRole(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedBulletIndex === idx
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {item.role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Before / After Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-rose-800 uppercase">
                    <span>Before: Passive Job Duty</span>
                    <span className="text-rose-600">❌ Weak</span>
                  </div>
                  <p className="text-xs text-slate-700 italic">&ldquo;{activeBullet.before}&rdquo;</p>
                </div>

                <div className={`p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-2 transition-all ${isImproving ? 'opacity-40' : 'opacity-100'}`}>
                  <div className="flex items-center justify-between text-[11px] font-bold text-emerald-800 uppercase">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-emerald-700" />
                      <span>After: Google X-Y-Z Achievement</span>
                    </span>
                    <span className="text-emerald-700">✓ Strong ATS Impact</span>
                  </div>
                  {isImproving ? (
                    <div className="py-2 text-xs text-brand-700 font-semibold flex items-center gap-1.5">
                      <Sparkles size={12} className="animate-spin" /> Rewriting...
                    </div>
                  ) : (
                    <p className="text-xs text-slate-900 font-medium">&ldquo;{activeBullet.after}&rdquo;</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeShowcaseTab === 'matcher' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-200">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 text-xs font-bold">
                  <span>Step 4: Optimize</span>
                </div>
                <h3 className="text-2xl font-black text-slate-950">
                  Target Job Description Gap Matcher
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Paste the job posting you want to apply for. Resume Craft instantly extracts required skills, compares them to your resume draft, and highlights keyword gaps.
                </p>
                <div className="space-y-2 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-blue-600" />
                    <span>Extracts technical and soft skills automatically</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-blue-600" />
                    <span>1-click addition of missing skills directly into draft</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-blue-600" />
                    <span>Calculates role-specific match percentage</span>
                  </div>
                </div>
                <div className="pt-2">
                  <Link
                    to="/job-description-resume-matcher"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    <span>Match Job Description</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
                <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-3 text-xs">
                  <div className="flex justify-between items-center text-slate-800 font-bold border-b border-slate-100 pb-2">
                    <span>Job Keyword Match: Lead React Engineer</span>
                    <span className="text-brand-600">84% Match</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-emerald-800">Found in Your Resume (7):</div>
                    <div className="flex flex-wrap gap-1">
                      {['React', 'TypeScript', 'Tailwind CSS', 'State Management', 'REST APIs', 'Unit Testing', 'Git'].map((s) => (
                        <span key={s} className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-medium">
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-bold text-amber-800">Missing from Job Posting (2):</div>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-medium">+ Next.js App Router</span>
                      <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-medium">+ WebSockets</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. RESUME TEMPLATES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              ATS-Optimized Resume Templates
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clean, single-column architectures formatted specifically for automated applicant parsing.
            </p>
          </div>
          <Link to="/resume-templates" className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 shrink-0">
            <span>View All Templates Gallery</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Template 1: Modern Clean */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="p-5 space-y-3">
              <div className="h-32 bg-slate-50 rounded-xl border border-slate-150 p-3 space-y-2 font-sans overflow-hidden select-none">
                <div className="h-3 bg-slate-800 rounded w-1/3"></div>
                <div className="h-1.5 bg-slate-300 rounded w-1/2"></div>
                <div className="h-px bg-slate-200"></div>
                <div className="h-2 bg-brand-600 rounded w-1/4"></div>
                <div className="space-y-1">
                  <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                  <div className="h-1.5 bg-slate-200 rounded w-5/6"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Modern Clean</h3>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                  ✓ ATS-Friendly
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Balanced typography with distinct section headers and clean bullet spacing. Ideal for tech, product, and business roles.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <Link
                to="/builder"
                className="w-full py-2 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Use Modern Clean</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Template 2: Tech Minimal */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="p-5 space-y-3">
              <div className="h-32 bg-slate-50 rounded-xl border border-slate-150 p-3 space-y-2 font-mono overflow-hidden select-none">
                <div className="h-3 bg-slate-900 rounded w-2/5"></div>
                <div className="h-1.5 bg-slate-400 rounded w-2/3"></div>
                <div className="h-px bg-slate-200"></div>
                <div className="h-2 bg-slate-700 rounded w-1/3"></div>
                <div className="space-y-1">
                  <div className="h-1.5 bg-slate-200 rounded w-11/12"></div>
                  <div className="h-1.5 bg-slate-200 rounded w-4/5"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Tech Minimal</h3>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                  ✓ ATS-Friendly
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Minimalist developer format prioritizing technical proficiencies, open-source repositories, and scalable architecture impact.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <Link
                to="/builder"
                className="w-full py-2 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Use Tech Minimal</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Template 3: Executive Serif */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="p-5 space-y-3">
              <div className="h-32 bg-slate-50 rounded-xl border border-slate-150 p-3 space-y-2 font-serif overflow-hidden select-none">
                <div className="h-3.5 bg-slate-900 rounded w-1/2"></div>
                <div className="h-1.5 bg-slate-400 rounded w-3/5"></div>
                <div className="h-px bg-slate-300"></div>
                <div className="h-2 bg-slate-800 rounded w-1/4"></div>
                <div className="space-y-1">
                  <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                  <div className="h-1.5 bg-slate-200 rounded w-3/4"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Executive Serif</h3>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                  ✓ ATS-Friendly
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Elegant serif hierarchy engineered for directors, executives, finance leaders, legal advisors, and management consultants.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <Link
                to="/builder"
                className="w-full py-2 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Use Executive Serif</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 7. TRUST, PRIVACY & DATA TRANSPARENCY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            <Lock size={13} className="text-emerald-600" />
            <span>Privacy &amp; Data Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            How Resume Craft Protects Your Career Data
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Your career information is personal and sensitive. Here is exactly how data is handled.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Lock size={18} />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Local Storage First</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              By default, all resume drafts and job applications reside exclusively in your local browser storage.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <ShieldCheck size={18} />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Optional Cloud Sync</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Creating an account via Firebase is completely optional. If signed in, data syncs to your private Firestore account.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Download size={18} />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Client-Side PDF Export</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              PDFs are generated entirely on your device via client-side vector printing, never uploaded to external PDF rendering servers.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <CheckCircle2 size={18} />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Zero Paywalls or Cards</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We do not collect credit card numbers, lock your downloads behind trials, or charge hidden export fees.
            </p>
          </div>

        </div>

        <div className="text-center text-xs text-slate-500">
          <span>Read our full </span>
          <Link to="/privacy" className="text-brand-600 hover:underline font-bold">Privacy Policy</Link>
          <span> and </span>
          <Link to="/terms" className="text-brand-600 hover:underline font-bold">Terms of Service</Link>.
        </div>
      </section>

      {/* 8. FEATURED REAL RESUME EXAMPLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
              Role-Specific Resume Examples
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Curated role samples pre-populated with industry skills and metric-backed bullets.
            </p>
          </div>
          <Link to="/resume-examples" className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 shrink-0">
            <span>Explore all 12+ role examples</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESUME_EXAMPLES.slice(0, 3).map((ex) => (
            <div key={ex.slug} className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between shadow-xs hover:shadow-sm transition-all">
              <div className="space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {ex.category}
                </span>
                <h3 className="font-bold text-slate-900 text-sm">
                  <Link to={`/resume-examples/${ex.slug}`} className="hover:text-brand-600">
                    {ex.roleTitle} Resume Example
                  </Link>
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{ex.shortIntro}</p>
              </div>
              <Link
                to={`/resume-examples/${ex.slug}`}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1 pt-1"
              >
                <span>Read Full Resume Guide &rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FINAL CONVERSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-950 text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-xl border border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-400/30 mx-auto">
            <Sparkles size={13} />
            <span>Ready in under 5 minutes • 100% Free</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-2xl mx-auto">
            Build Your ATS-Friendly Resume Today
          </h2>

          <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Strengthen your experience bullets with AI, optimize keywords against any job description, and export a clean vector PDF — completely free.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/builder"
              className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-brand-500/30 active:scale-95 flex items-center gap-2"
            >
              <FileText size={16} />
              <span>Build My Resume Free &rarr;</span>
            </Link>
            <Link
              to="/ats-resume-checker"
              className="px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-sm border border-white/20 transition-all flex items-center gap-2"
            >
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Check ATS Score</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Upload Resume & Apply Template Modal */}
      <UploadResumeModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        initialStep={uploadInitialStep}
      />
    </div>
  );
};
