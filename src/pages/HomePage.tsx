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
  Check,
  Target,
  Lock,
  UploadCloud,
  Sliders,
  Briefcase
} from 'lucide-react';
import { CompactPromoVideoSection } from '../components/common/CompactPromoVideoSection';
import { UploadResumeModal } from '../components/builder/UploadResumeModal';

interface BulletDemoItem {
  role: string;
  before: string;
  after: string;
}

const BULLET_DEMOS: BulletDemoItem[] = [
  {
    role: 'Software Engineer',
    before: 'Responsible for writing code and fixing bugs for the web app.',
    after: 'Architected high-throughput microservices handling 4.2M daily API requests with 99.98% uptime using React, Node.js, and GCP.'
  },
  {
    role: 'Marketing Manager',
    before: 'Managed social media accounts and created weekly email newsletters.',
    after: 'Increased organic social engagement by 42% and email CTR by 18% across 120k subscribers via automated weekly content strategies.'
  },
  {
    role: 'Product Manager',
    before: 'Led sprint meetings and gathered feature requirements from customers.',
    after: 'Spearheaded user onboarding redesign across 4 agile teams, decreasing customer time-to-value by 35% and boosting retention by 22%.'
  }
];

export const HomePage: React.FC = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadInitialStep, setUploadInitialStep] = useState<'upload' | 'template' | 'preview'>('upload');
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<'builder' | 'ats' | 'bullet' | 'matcher'>('builder');
  const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);

  const activeBullet = BULLET_DEMOS[selectedBulletIndex];

  const homeFaqs = [
    {
      question: 'Is Resume Craft free to use?',
      answer: 'Yes. Resume Craft provides free step-by-step resume creation, AI bullet point enhancements, ATS scoring, and vector PDF exports with zero credit card requirements and no hidden paywalls.'
    },
    {
      question: 'Do I need to create an account?',
      answer: 'No account is required. You can build, optimize, and export your resume immediately using local browser storage.'
    },
    {
      question: 'Are the resume templates ATS-friendly?',
      answer: 'Yes. All templates adhere to ATS-safe layout standards: standard headings, single-column reading order, and selectable vector fonts.'
    },
    {
      question: 'Is my resume data private and secure?',
      answer: 'Your resume data is stored locally in your browser by default. It is never sold or shared. Read our dedicated Privacy Policy page for full details.'
    }
  ];

  return (
    <div className="space-y-14 pb-16">
      <SeoHead
        title="Free AI Resume Builder & ATS Resume Checker | Resume Craft"
        description="Build an ATS-friendly resume in minutes. Use AI to strengthen bullet points with the Google X-Y-Z formula, match job descriptions, and export vector PDFs for free."
        canonicalPath="/"
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50 pt-12 pb-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/90 border border-brand-200 text-brand-950 text-xs sm:text-sm font-extrabold shadow-2xs">
                <Sparkles size={15} className="text-brand-600 shrink-0" />
                <span>Modern AI Resume Builder • 100% Free</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12]">
                Build a Resume That Gets Past <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-600">ATS Filters</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Create an ATS-optimized resume with a guided step-by-step workflow, AI bullet enhancements, and direct vector PDF downloads.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/builder"
                  className="w-full sm:w-auto px-7 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-xl text-sm sm:text-base shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <FileText size={18} />
                  <span>Build My Resume &rarr;</span>
                </Link>

                <button
                  onClick={() => {
                    setUploadInitialStep('upload');
                    setShowUploadModal(true);
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <UploadCloud size={18} />
                  <span>Upload Resume</span>
                </button>

                <Link
                  to="/ats-resume-checker"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-900 font-extrabold rounded-xl text-sm sm:text-base border border-slate-300 shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={18} className="text-emerald-600" />
                  <span>Check ATS Score</span>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="pt-4 border-t border-slate-200/90 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-700 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Check size={16} className="text-emerald-600 stroke-[3]" /> No registration required
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={16} className="text-emerald-600 stroke-[3]" /> Selectable vector PDFs
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={16} className="text-emerald-600 stroke-[3]" /> Single-column ATS parsing
                </span>
              </div>
            </div>

            {/* Right Column: Hero Preview & Video (5 cols) */}
            <div className="lg:col-span-5 space-y-4 flex flex-col items-center lg:items-end">
              <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold text-xs">
                      RC
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">ATS Resume Optimizer</div>
                      <div className="text-[10px] text-slate-500">Live Interactive Workspace</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    <span>88/100 ATS Score</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-150">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase block">Keywords</span>
                    <div className="font-bold text-emerald-700">92% Matched</div>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-150">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase block">Google X-Y-Z</span>
                    <div className="font-bold text-emerald-700">Pass (8 Metrics)</div>
                  </div>
                </div>

                <Link
                  to="/builder"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Open Guided Resume Builder</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Compact Video Demo */}
              <CompactPromoVideoSection />
            </div>

          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE PRODUCT SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 uppercase tracking-wider bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
            <Layers size={13} />
            <span>Interactive Features</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Key Tools Engineered for Your Job Search
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100/90 rounded-2xl max-w-xl mx-auto border border-slate-200">
          <button
            onClick={() => setActiveShowcaseTab('builder')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeShowcaseTab === 'builder' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText size={14} className="text-brand-600" />
            <span>Step-by-Step Builder</span>
          </button>
          <button
            onClick={() => setActiveShowcaseTab('ats')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeShowcaseTab === 'ats' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 size={14} className="text-emerald-600" />
            <span>ATS Checker</span>
          </button>
          <button
            onClick={() => setActiveShowcaseTab('bullet')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeShowcaseTab === 'bullet' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles size={14} className="text-purple-600" />
            <span>AI Bullet Writer</span>
          </button>
          <button
            onClick={() => setActiveShowcaseTab('matcher')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeShowcaseTab === 'matcher' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Target size={14} className="text-blue-600" />
            <span>Job Matcher</span>
          </button>
        </div>

        {/* Tab Content Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 transition-all">
          {activeShowcaseTab === 'builder' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-6 space-y-3">
                <h3 className="text-xl font-bold text-slate-900">Guided 7-Step Workflow</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Focus on one step at a time: Personal Details, Summary, Work Experience, Education, Skills, Design, and Download.
                </p>
                <div className="pt-2">
                  <Link to="/builder" className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors">
                    <span>Open Guided Builder</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-6 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-slate-800">✓ Step-by-Step Focus</div>
                <div className="font-bold text-slate-800">✓ Single-Column Vector Layouts</div>
                <div className="font-bold text-slate-800">✓ Instant High-Res PDF Generation</div>
              </div>
            </div>
          )}

          {activeShowcaseTab === 'ats' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-6 space-y-3">
                <h3 className="text-xl font-bold text-slate-900">0–100 ATS Score Compatibility Check</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Scans target job keywords, metric density, and single-column formatting compatibility before you apply.
                </p>
                <div className="pt-2">
                  <Link to="/ats-resume-checker" className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors">
                    <span>Check ATS Score</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-6 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-emerald-700">✓ Keyword Density Evaluation</div>
                <div className="font-bold text-emerald-700">✓ Action Verb Analysis</div>
                <div className="font-bold text-emerald-700">✓ Single-Column Reading Order Check</div>
              </div>
            </div>
          )}

          {activeShowcaseTab === 'bullet' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles size={16} className="text-purple-600" />
                  <span>Google X-Y-Z Bullet Enhancer</span>
                </h3>
                <div className="flex gap-1.5">
                  {BULLET_DEMOS.map((item, idx) => (
                    <button
                      key={item.role}
                      onClick={() => setSelectedBulletIndex(idx)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                        selectedBulletIndex === idx ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                  <span className="font-bold text-rose-700 uppercase block mb-1">Before: Duty</span>
                  <p className="text-slate-700 italic">&ldquo;{activeBullet.before}&rdquo;</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="font-bold text-emerald-800 uppercase block mb-1">After: Google X-Y-Z Metric</span>
                  <p className="text-slate-900 font-medium">&ldquo;{activeBullet.after}&rdquo;</p>
                </div>
              </div>
            </div>
          )}

          {activeShowcaseTab === 'matcher' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-6 space-y-3">
                <h3 className="text-xl font-bold text-slate-900">Job Description Matcher</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Paste any job posting to identify missing hard skills and add them directly into your draft with one click.
                </p>
                <div className="pt-2">
                  <Link to="/job-description-resume-matcher" className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors">
                    <span>Match Job Posting</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-6 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-blue-700">✓ Missing Skill Extraction</div>
                <div className="font-bold text-blue-700">✓ Role Match Percentage</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. RESUME TEMPLATES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              ATS-Friendly Templates
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clean single-column layouts for maximum scanner accuracy.
            </p>
          </div>
          <Link to="/resume-templates" className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 shrink-0">
            <span>View All Templates &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { name: 'Modern Clean', tag: 'Popular', desc: 'Balanced typography & clean spacing for engineering & business.' },
            { name: 'Tech Minimal', tag: 'Tech', desc: 'Minimalist developer layout prioritizing skills & repos.' },
            { name: 'Executive Serif', tag: 'Executive', desc: 'Traditional serif structure for senior management & leaders.' }
          ].map((tpl) => (
            <div key={tpl.name} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">{tpl.name}</h3>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                    ✓ ATS Safe
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{tpl.desc}</p>
              </div>
              <Link
                to="/builder"
                className="w-full py-2 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
              >
                <span>Use Template</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DEDICATED CALLOUT: ROLE-SPECIFIC EXAMPLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-brand-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
              <Briefcase size={13} />
              <span>Role-Specific Examples</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">Need Inspiration for Your Specific Industry?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Browse 12+ pre-populated resume examples with industry skills and metric bullets for Software Engineers, Product Managers, Marketing Leaders, Data Scientists, and more.
            </p>
          </div>
          <Link
            to="/resume-examples"
            className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-md transition-all shrink-0 flex items-center gap-2"
          >
            <span>Explore All Resume Examples &rarr;</span>
          </Link>
        </div>
      </section>

      {/* 5. DEDICATED CALLOUT: PRIVACY & DATA TRANSPARENCY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-50/70 rounded-3xl border border-emerald-200/90 p-6 sm:p-8 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
              <Lock size={22} />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-slate-900">100% Client-Side Privacy Guarantee</h3>
              <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed">
                Your resume data is stored locally in your browser by default. We do not collect credit cards, lock your PDF downloads behind paywalls, or sell candidate data to recruiters.
              </p>
            </div>
          </div>
          <Link
            to="/privacy"
            className="px-5 py-2.5 bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold rounded-xl text-xs shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
          >
            <ShieldCheck size={15} className="text-emerald-700" />
            <span>Read Privacy Policy &rarr;</span>
          </Link>
        </div>
      </section>

      {/* 6. FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>
        <FaqAccordion items={homeFaqs} />
        <div className="text-center pt-2">
          <Link to="/faq" className="text-xs font-bold text-brand-600 hover:underline inline-flex items-center gap-1">
            <span>View All FAQs Page</span>
            <ArrowRight size={12} />
          </Link>
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

