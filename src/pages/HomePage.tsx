import React, { useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/common/SeoHead';
import { FaqAccordion } from '../components/common/FaqAccordion';
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Zap,
  Check,
  FileCheck2,
  Lock,
  Download,
  UploadCloud,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { CompactPromoVideoSection } from '../components/common/CompactPromoVideoSection';
import { RESUME_EXAMPLES } from '../data/resumeExamplesData';

// Dynamic lazy import for UploadResumeModal to prevent heavy parsing libraries from loading on initial homepage render
const UploadResumeModal = lazy(() => import('../components/builder/UploadResumeModal').then(m => ({ default: m.UploadResumeModal })));

interface BulletDemoItem {
  role: string;
  category: string;
  before: string;
  after: string;
  impactMetric: string;
}

const BULLET_REWRITE_DEMOS: BulletDemoItem[] = [
  {
    role: 'Software Engineer',
    category: 'Engineering & Tech',
    before: 'Worked on backend services and fixed database bugs for client API.',
    after: 'Architected high-throughput Golang microservices and optimized PostgreSQL queries, reducing overall API latency by 38% across 1.2M daily requests.',
    impactMetric: '38% Latency Reduction'
  },
  {
    role: 'Senior Product Manager',
    category: 'Product & Leadership',
    before: 'Led weekly agile standups and gathered requirements from design teams.',
    after: 'Spearheaded end-to-end product roadmap for enterprise SaaS platform, driving $4.2M in net new ARR and boosting quarterly user retention by 22%.',
    impactMetric: '$4.2M Net New ARR'
  },
  {
    role: 'Growth Marketing Lead',
    category: 'Marketing & Sales',
    before: 'Managed Google Search Ads and created weekly performance campaigns.',
    after: 'Optimized multi-channel digital acquisition funnels across Meta and Google Ads, decreasing Blended CAC by 29% while scaling MQL output by 3.5x.',
    impactMetric: '29% CAC Reduction'
  }
];

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [uploadInitialStep, setUploadInitialStep] = useState<'upload' | 'template'>('upload');

  const handleOpenUpload = () => {
    setUploadInitialStep('upload');
    setShowUploadModal(true);
  };

  const handleOpenTemplates = () => {
    setUploadInitialStep('template');
    setShowUploadModal(true);
  };

  return (
    <div className="space-y-16 md:space-y-24 pb-12">
      <SeoHead
        title="Free AI Resume Builder & ATS Resume Checker | Resume Craft"
        description="Build an ATS-optimized, recruiter-approved resume in minutes. Use AI bullet rewrites, real-time ATS scoring, and professional vector PDF export. No forced subscriptions."
        canonicalPath="/"
      />

      {/* HERO SECTION */}
      <section className="relative pt-6 md:pt-12 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Value Prop */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200 text-xs font-extrabold tracking-wide">
                <Sparkles size={14} className="text-brand-600 animate-pulse-subtle" />
                <span>Next-Gen 2026 AI Resume &amp; ATS Intelligence</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
                Land More Interviews with an <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 bg-clip-text text-transparent">ATS-Optimized</span> Resume.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Create a professional, bulletproof resume tailor-made for applicant tracking systems. Get instant AI suggestions, X-Y-Z bullet rewrites, and 100% free vector PDF downloads.
              </p>

              {/* Primary Call to Action */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/builder"
                  aria-label="Build My Resume Now"
                  className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-base rounded-xl transition-all duration-200 shadow-lg shadow-brand-600/25 flex items-center justify-center gap-2 group focus-visible:ring-2 focus-visible:ring-brand-400"
                >
                  <span>Build My Resume Now</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={handleOpenUpload}
                  aria-label="Upload Existing Resume to Audit"
                  className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 hover:border-slate-300 font-bold text-base rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <UploadCloud size={20} className="text-brand-600" />
                  <span>Upload Existing Resume</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-600" /> Free PDF Download
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-brand-600" /> ATS Compatibility Tested
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock size={16} className="text-slate-500" /> No Card Required
                </span>
              </div>
            </div>

            {/* Right Column: Dynamic Preview Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-slate-200/80 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-slate-600 ml-2">ATS Live Score Audit</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                    94/100 ATS Match
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-700 font-bold">
                      <span>Full Name &amp; Role</span>
                      <span className="text-emerald-700 font-bold">Validated</span>
                    </div>
                    <div className="text-xs text-slate-600 font-medium">Sarah Jenkins • Senior Product Lead</div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 uppercase">Keyword Density</span>
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">High</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 uppercase">X-Y-Z Metrics</span>
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Pass</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-brand-900 text-white rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-brand-200">AI Bullet Optimizer</span>
                      <span className="text-emerald-400 font-bold">+18% Score</span>
                    </div>
                    <p className="text-xs text-slate-200 italic leading-relaxed">
                      &quot;Scaled user retention by 22% and managed $4.2M ARR across 6 cross-functional engineering teams.&quot;
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/builder"
                    aria-label="Create ATS Resume Free"
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors focus-visible:ring-2 focus-visible:ring-brand-400"
                  >
                    <Zap size={15} className="text-amber-400" />
                    <span>Create ATS Resume Free</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROMO VIDEO & FEATURE DEMO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Video Component */}
            <div className="lg:col-span-6 flex justify-center">
              <CompactPromoVideoSection />
            </div>

            {/* Right: Key Highlights */}
            <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-bold">
                <Check size={14} />
                <span>Built for 2026 Hiring Standards</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Stop Getting Rejected by Automated ATS Scanners
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Most resumes fail before a recruiter ever reads them because of poor formatting, missing keywords, or non-parseable layouts. Resume Craft guarantees 100% parseable text.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-left space-y-1">
                  <div className="text-xs font-bold text-brand-300 flex items-center gap-1.5">
                    <FileCheck2 size={15} /> Real-Time Scoring
                  </div>
                  <p className="text-xs text-slate-400">Instant feedback on bullet metrics, verbs, and keywords.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-left space-y-1">
                  <div className="text-xs font-bold text-brand-300 flex items-center gap-1.5">
                    <Download size={15} /> Clean Vector PDF
                  </div>
                  <p className="text-xs text-slate-400">High-resolution selectable text PDF download without distortion.</p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  to="/builder"
                  aria-label="Start Building Free"
                  className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl transition-all shadow flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-brand-400"
                >
                  <span>Start Building Free</span>
                  <ArrowRight size={16} />
                </Link>
                <button
                  type="button"
                  onClick={handleOpenTemplates}
                  aria-label="Explore Templates"
                  className="w-full sm:w-auto px-5 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-brand-400"
                >
                  Explore Templates
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* INTERACTIVE BULLET REWRITE DEMO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
            <Sparkles size={14} className="text-emerald-600" />
            <span>Google X-Y-Z Bullet Framework</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            See How AI Transforms Weak Bullet Points
          </h2>
          <p className="text-base text-slate-600">
            Click across roles below to see how weak responsibility statements become high-impact achievement bullets.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {BULLET_REWRITE_DEMOS.map((item, index) => (
            <button
              key={item.role}
              type="button"
              onClick={() => setActiveTab(index)}
              aria-label={`Select ${item.role} bullet demo`}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === index
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              } focus-visible:ring-2 focus-visible:ring-brand-500`}
            >
              {item.role}
            </button>
          ))}
        </div>

        {/* Selected Tab Content */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xl max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              {BULLET_REWRITE_DEMOS[activeTab].category}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
              {BULLET_REWRITE_DEMOS[activeTab].impactMetric}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="p-4 bg-rose-50/60 border border-rose-200/80 rounded-xl space-y-2">
              <div className="text-xs font-bold text-rose-800 uppercase flex items-center gap-1.5">
                <AlertCircle size={14} /> Weak / Standard Bullet
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                &quot;{BULLET_REWRITE_DEMOS[activeTab].before}&quot;
              </p>
            </div>

            {/* After */}
            <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-xl space-y-2">
              <div className="text-xs font-bold text-emerald-800 uppercase flex items-center gap-1.5">
                <CheckCircle2 size={14} /> AI X-Y-Z Optimized Bullet
              </div>
              <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-bold">
                &quot;{BULLET_REWRITE_DEMOS[activeTab].after}&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Everything You Need to Beat the ATS
          </h2>
          <p className="text-base text-slate-600">
            Professional tools designed specifically for job seekers looking for top-tier tech, product, and business roles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <FileCheck2 size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-950">Real-Time ATS Checker</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Upload your resume or paste a job description to get instant match scores, missing keyword alerts, and formatting fixes.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Sparkles size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-950">AI Bullet Generator</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Transform basic duties into quantifiable achievement bullets using Google&apos;s X-Y-Z formula in one click.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Download size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-950">Clean Vector PDF Export</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Download 100% clean, selectable-text PDFs built with standard typography to ensure maximum ATS parseability.
            </p>
          </div>
        </div>
      </section>

      {/* RESUME EXAMPLES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Tested Resume Examples by Role
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Browse role-specific resume samples with pre-written high-impact bullet points.
            </p>
          </div>
          <Link
            to="/resume-examples"
            aria-label="View All Resume Examples"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 shrink-0 focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <span>View All Examples</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESUME_EXAMPLES.slice(0, 3).map((ex) => (
            <div key={ex.slug} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  {ex.category}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {ex.experienceLevel}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-950">{ex.roleTitle}</h3>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{ex.shortIntro}</p>
              <Link
                to={`/resume-examples/${ex.slug}`}
                aria-label={`Read full resume guide for ${ex.roleTitle}`}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1 pt-1 focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <span>Read Full Resume Guide &rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-8">
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600">
            Clear answers about ATS compatibility, PDF exports, and privacy.
          </p>
        </div>
        <FaqAccordion />
      </section>

      {/* DYNAMIC LAZY MODAL: Upload Resume & Apply Template */}
      {showUploadModal && (
        <Suspense fallback={null}>
          <UploadResumeModal
            isOpen={showUploadModal}
            onClose={() => setShowUploadModal(false)}
            initialStep={uploadInitialStep}
          />
        </Suspense>
      )}
    </div>
  );
};

export default HomePage;
