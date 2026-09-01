import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/common/SeoHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { enhanceBulletPoint } from '../services/aiService';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Target,
  Wand2,
  Copy,
  Check
} from 'lucide-react';

export const AiResumeBuilderPage: React.FC = () => {
  const [sampleBullet, setSampleBullet] = useState('Responsible for improving web app performance and fixing bugs.');
  const [enhancedBullet, setEnhancedBullet] = useState('');
  const [copied, setCopied] = useState(false);

  const handleTestAi = () => {
    const res = enhanceBulletPoint(sampleBullet, 'Software Engineer');
    setEnhancedBullet(res);
  };

  const handleCopy = () => {
    if (enhancedBullet) {
      navigator.clipboard.writeText(enhancedBullet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const aiFaqs = [
    {
      question: 'How does the AI Resume Builder improve my bullet points?',
      answer: 'Our AI engine restructures weak, duty-focused bullets into quantifiable achievements using the Google X-Y-Z formula: "Accomplished [X] as measured by [Y], by doing [Z]". It replaces weak verbs with strong action verbs and incorporates performance metrics.'
    },
    {
      question: 'Will AI-generated resumes get flagged by employers?',
      answer: 'No. Unlike generic AI chatbots that generate robotic text, Resume Craft assists you with phrasing, metric formulation, and structural optimization based on your actual achievements, producing natural, professional resume content.'
    },
    {
      question: 'Can the AI generate a professional summary for my target role?',
      answer: 'Yes! The builder reads your experience, top technical skills, and target job title to synthesize a tailored 3-sentence executive summary in 1 click.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <SeoHead
        title="Free AI Resume Builder – AI Bullet Point & Summary Writer | Resume Craft"
        description="Craft high-impact resumes with AI-assisted bullet point rewriting, Google X-Y-Z metrics, professional summary generator, and keyword optimization."
        canonicalPath="/ai-resume-builder"
      />

      <Breadcrumbs items={[{ name: 'AI Resume Builder', path: '/ai-resume-builder' }]} />

      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold">
          <Sparkles size={14} className="text-purple-600" />
          <span>Google X-Y-Z AI Engine • 100% Free</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Free AI Resume Builder – <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-brand-600">Smart Bullet &amp; Summary</span> Writer
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Supercharge your resume achievements with AI-powered bullet point rewriting, Google X-Y-Z formula metrics, role-tailored summaries, and ATS keyword matching.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/builder"
            className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles size={18} />
            <span>Launch AI Resume Builder</span>
          </Link>
          <Link
            to="/ats-checker"
            className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-sm border border-slate-300 shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={18} className="text-emerald-600" />
            <span>Test ATS Resume Score</span>
          </Link>
        </div>
      </section>

      {/* Interactive Live AI Bullet Enhancer Demo */}
      <section className="bg-white rounded-2xl border-2 border-purple-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-purple-700 text-xs font-bold uppercase tracking-wider">
          <Wand2 size={16} />
          <span>Try The Interactive AI Bullet Enhancer</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">Enter a draft bullet point:</label>
            <textarea
              value={sampleBullet}
              onChange={(e) => setSampleBullet(e.target.value)}
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 h-28"
              placeholder="e.g. Handled customer support requests and emails..."
            />
            <button
              onClick={handleTestAi}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-xs"
            >
              <Sparkles size={14} />
              <span>Enhance with Google X-Y-Z Formula</span>
            </button>
          </div>

          <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="text-xs font-bold text-purple-900 flex items-center justify-between">
                <span>AI-Enhanced Result (Google X-Y-Z Formula):</span>
                {enhancedBullet && (
                  <button
                    onClick={handleCopy}
                    className="text-[11px] text-purple-700 hover:text-purple-900 font-semibold flex items-center gap-1"
                  >
                    {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed bg-white p-3.5 rounded-lg border border-purple-100 min-h-[70px]">
                {enhancedBullet || 'Click "Enhance with Google X-Y-Z Formula" to see your bullet point transformed with action verbs and measurable outcomes.'}
              </p>
            </div>

            <div className="text-[11px] text-purple-700 bg-purple-100/60 p-2.5 rounded-lg">
              💡 <strong>Formula Breakdown:</strong> Accomplished [X] as measured by [Y], by doing [Z].
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Grid */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-slate-950 text-center">Built-In AI Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Sparkles size={20} />
            </div>
            <h3 className="font-bold text-slate-900 text-base">AI Executive Summaries</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Synthesizes your employment history and core skills into a compelling 3-sentence introductory summary.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <Target size={20} />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Action Verb Enrichment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Replaces passive words (handled, did, helped) with power verbs like <em>Architected</em>, <em>Spearheaded</em>, and <em>Orchestrated</em>.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <TrendingUp size={20} />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Quantifiable Metrics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Injects realistic performance percentages, latency improvements, and revenue numbers into your achievements.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqAccordion items={aiFaqs} />

      {/* Footer CTA */}
      <section className="text-center bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-8 space-y-4">
        <h3 className="text-2xl font-black">Ready to Build Your AI-Optimized Resume?</h3>
        <p className="text-xs sm:text-sm text-purple-200 max-w-xl mx-auto">
          Start for free. No credit cards, no login hurdles. Create your resume and download your vector PDF in minutes.
        </p>
        <Link
          to="/builder"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-purple-950 font-bold rounded-xl text-xs sm:text-sm hover:bg-purple-50 transition-colors shadow-lg"
        >
          <span>Open AI Resume Builder</span>
          <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
};
