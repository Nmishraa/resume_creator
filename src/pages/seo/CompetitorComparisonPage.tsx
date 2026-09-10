import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { SeoHead } from '../../components/common/SeoHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { FaqAccordion } from '../../components/common/FaqAccordion';
import {
  Check,
  X,
  Sparkles,
  Zap,
  ShieldCheck,
  Download,
  FileText,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Award
} from 'lucide-react';

interface CompetitorProfile {
  slug: string;
  name: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  pricingNote: string;
  competitorPrice: string;
  comparisonFeatures: Array<{
    feature: string;
    resumeCraft: boolean | string;
    competitor: boolean | string;
    note: string;
  }>;
  faqs: Array<{ question: string; answer: string }>;
}

const COMPETITOR_DATA: Record<string, CompetitorProfile> = {
  'zety-alternative': {
    slug: 'zety-alternative',
    name: 'Zety',
    tagline: 'Looking for a 100% Free Zety Alternative Without Watermarks or Paywalls?',
    metaTitle: 'Free Zety Alternative (No Watermark & Free PDF Download) | Resume Craft',
    metaDescription: 'Looking for a free alternative to Zety? Build, ATS-check, and download vector PDF resumes 100% free on Resume Craft with no watermarks or credit card required.',
    pricingNote: 'Zety charges $2.95 for a 14-day trial and $24.95/month thereafter.',
    competitorPrice: '$24.95/mo (or $2.95 trial)',
    comparisonFeatures: [
      { feature: '100% Free Unlimited PDF Downloads', resumeCraft: true, competitor: false, note: 'Resume Craft is completely free forever. Zety locks PDF downloads behind a paywall.' },
      { feature: 'No Watermark on Exported Resumes', resumeCraft: true, competitor: false, note: 'Resume Craft exports clean, professional PDFs without branding watermarks.' },
      { feature: 'No Account or Registration Required', resumeCraft: true, competitor: false, note: 'Jump straight into the editor. No sign up, password, or email verification required.' },
      { feature: 'Vector PDF Layer (ATS Parsable)', resumeCraft: true, competitor: true, note: 'Both produce vector PDF layers, but Resume Craft includes zero hidden fees.' },
      { feature: 'Google X-Y-Z AI Bullet Enhancer', resumeCraft: true, competitor: false, note: 'Resume Craft uses the Google X-Y-Z metric formula to quantify duty bullets.' },
      { feature: 'Real-Time 0–100 ATS Score Checker', resumeCraft: true, competitor: false, note: 'Scan your resume against target job postings for missing keywords in real-time.' },
      { feature: '100% Local Data Privacy (No Data Tracking)', resumeCraft: true, competitor: false, note: 'Resume Craft stores resume content locally in your browser by default.' }
    ],
    faqs: [
      {
        question: 'Why is Resume Craft the best free alternative to Zety?',
        answer: 'Resume Craft provides all premium resume creation, AI bullet point enhancement, and vector PDF exports 100% free. Unlike Zety, there are no mandatory subscriptions, hidden trial fees, or watermarks.'
      },
      {
        question: 'Can I export a PDF without paying or adding a credit card?',
        answer: 'Yes. On Resume Craft, clicking "Download PDF" instantly exports your formatted vector PDF file onto your device with no paywall or trial countdowns.'
      },
      {
        question: 'Are Resume Craft templates ATS-friendly like Zety?',
        answer: 'Yes! All Resume Craft templates use single-column reading flows, standard typography, and clean vector text layers designed to pass Applicant Tracking Systems (Workday, Greenhouse, Taleo).'
      }
    ]
  },
  'resume-io-alternative': {
    slug: 'resume-io-alternative',
    name: 'Resume.io',
    tagline: 'Looking for a Free Resume.io Alternative with Free PDF Exports & No Hidden Subscriptions?',
    metaTitle: 'Free Resume.io Alternative (No Watermark & Free Vector PDF) | Resume Craft',
    metaDescription: 'Switch from Resume.io to Resume Craft. Build ATS-optimized resumes, enhance bullet points with AI, and download high-resolution vector PDFs 100% free with no watermark.',
    pricingNote: 'Resume.io limits free tier to TXT files and charges $2.95 trial / $24.95/mo for PDFs.',
    competitorPrice: '$24.95/mo (TXT only on free tier)',
    comparisonFeatures: [
      { feature: 'Free Vector PDF Download (Not TXT)', resumeCraft: true, competitor: false, note: 'Resume.io forces free users to download plain TXT files. Resume Craft gives full PDF exports for free.' },
      { feature: 'Zero Watermarks or Hidden Fees', resumeCraft: true, competitor: false, note: 'Export clean, high-impact resumes without paying subscription fees.' },
      { feature: 'No Sign-Up or Login Required', resumeCraft: true, competitor: false, note: 'Edit and export immediately without creating an account.' },
      { feature: 'Real-Time ATS Keyword Matcher', resumeCraft: true, competitor: false, note: 'Match your resume directly against any job description to find missing technical skills.' },
      { feature: 'Google X-Y-Z Metric Bullet Enhancer', resumeCraft: true, competitor: 'Paid Add-On', note: 'Transform passive duty statements into metric-backed accomplishments.' },
      { feature: 'Privacy-First Local Storage', resumeCraft: true, competitor: false, note: 'Your personal data stays on your device inside browser local storage.' }
    ],
    faqs: [
      {
        question: 'How does Resume Craft compare to Resume.io?',
        answer: 'Resume.io restricts free users to plain text (.txt) downloads while placing formatted PDFs behind a recurring subscription. Resume Craft gives you complete access to PDF downloads, ATS scoring, and AI bullet optimization for free.'
      },
      {
        question: 'Do I need an account to download my PDF?',
        answer: 'No account creation is required on Resume Craft. Build your resume and download your vector PDF immediately.'
      }
    ]
  }
};

export const CompetitorComparisonPage: React.FC = () => {
  const { competitor } = useParams<{ competitor?: string }>();
  
  // Resolve profile from param or fallback to Zety
  const key = competitor && COMPETITOR_DATA[competitor] ? competitor : 'zety-alternative';
  const data = COMPETITOR_DATA[key];

  return (
    <div className="space-y-12 pb-16">
      <SeoHead
        title={data.metaTitle}
        description={data.metaDescription}
        canonicalPath={`/vs/${data.slug}`}
        faqItems={data.faqs}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-50/80 via-white to-slate-50 pt-10 pb-14 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <Breadcrumbs
            items={[
              { name: 'Comparison', path: '/vs/zety-alternative' },
              { name: `${data.name} Alternative`, path: `/vs/${data.slug}` }
            ]}
          />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-200 text-emerald-950 text-xs font-bold shadow-2xs">
            <Sparkles size={15} className="text-emerald-600 shrink-0" />
            <span>100% Free Forever • No Credit Card • No Watermarks</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight max-w-4xl mx-auto">
            {data.tagline}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Stop paying monthly subscriptions or getting surprised by paywalls after creating your resume. Discover why job seekers switch to <strong>Resume Craft</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
            <Link
              to="/builder"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl text-base shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText size={20} />
              <span>Build My Resume Free (No Login) &rarr;</span>
            </Link>
            <Link
              to="/ats-resume-checker"
              className="w-full sm:w-auto px-7 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 size={18} className="text-emerald-400" />
              <span>Check ATS Resume Score</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Comparison Matrix */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
            Side-by-Side Comparison
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            Resume Craft vs. {data.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Compare features, pricing transparency, and ATS diagnostic capabilities before you build.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-900 text-white text-xs uppercase tracking-wider">
                  <th className="p-4 sm:p-5 font-black w-2/5">Feature / Capability</th>
                  <th className="p-4 sm:p-5 font-black text-center bg-brand-600 text-white w-3/10">
                    <div className="flex items-center justify-center gap-1.5">
                      <Award size={16} />
                      <span>Resume Craft</span>
                    </div>
                    <div className="text-[10px] font-normal lowercase opacity-90 mt-0.5">100% Free</div>
                  </th>
                  <th className="p-4 sm:p-5 font-black text-center text-slate-300 w-3/10">
                    <span>{data.name}</span>
                    <div className="text-[10px] font-normal lowercase text-rose-300 mt-0.5">{data.competitorPrice}</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                {data.comparisonFeatures.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                    <td className="p-4 sm:p-5 font-bold text-slate-900">
                      <div>{row.feature}</div>
                      <div className="text-[11px] font-normal text-slate-500 mt-0.5">{row.note}</div>
                    </td>
                    <td className="p-4 sm:p-5 text-center bg-brand-50/50 border-x border-brand-100">
                      {typeof row.resumeCraft === 'boolean' ? (
                        row.resumeCraft ? (
                          <div className="inline-flex items-center gap-1 text-emerald-700 font-extrabold bg-emerald-100 px-3 py-1 rounded-full text-xs">
                            <Check size={14} className="stroke-[3]" /> Yes (Free)
                          </div>
                        ) : (
                          <X size={18} className="text-slate-400 mx-auto" />
                        )
                      ) : (
                        <span className="font-bold text-brand-700">{row.resumeCraft}</span>
                      )}
                    </td>
                    <td className="p-4 sm:p-5 text-center text-slate-600">
                      {typeof row.competitor === 'boolean' ? (
                        row.competitor ? (
                          <div className="inline-flex items-center gap-1 text-slate-700 font-bold bg-slate-100 px-2.5 py-1 rounded-full text-xs">
                            <Check size={14} /> Yes
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1 text-rose-700 font-bold bg-rose-50 px-2.5 py-1 rounded-full text-xs border border-rose-200">
                            <X size={14} /> No (Paid Only)
                          </div>
                        )
                      ) : (
                        <span className="font-semibold text-rose-600">{row.competitor}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Choose Resume Craft Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6 border border-slate-800">
          <div className="space-y-2 text-center sm:text-left max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              Transparent &amp; Free
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Why Job Seekers Switch to Resume Craft
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We believe job seekers shouldn't be forced to pay monthly subscriptions or enter credit card details just to export their own resume.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Download size={20} />
              </div>
              <h3 className="font-bold text-sm text-white">Vector PDF Downloads</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Export crisp, vector-rendered PDFs with selectable text layers directly to your device without watermark fees.
              </p>
            </div>

            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                <Zap size={20} />
              </div>
              <h3 className="font-bold text-sm text-white">Google X-Y-Z AI Engine</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Transform passive duties into metric-backed achievements using recruiters' preferred achievement formula.
              </p>
            </div>

            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-bold text-sm text-white">100% Privacy Preserved</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                All resume drafts stay securely inside your browser local storage. We do not sell or monetize candidate data.
              </p>
            </div>
          </div>

          <div className="pt-2 text-center">
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg cursor-pointer"
            >
              <span>Start Building My Resume Free</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        <FaqAccordion items={data.faqs} />
      </main>
    </div>
  );
};
