import React from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { RESUME_EXAMPLES } from '../data/resumeExamplesData';
import { useResume } from '../context/ResumeContext';
import { SeoHead } from '../components/common/SeoHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FaqAccordion } from '../components/common/FaqAccordion';
import {
  FileText,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  Layers,
  ShieldCheck,
  Award,
  Zap,
  TrendingUp,
  Tag
} from 'lucide-react';

export const ResumeExampleDetailPage: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  const { updateResume } = useResume();
  const navigate = useNavigate();

  const example = RESUME_EXAMPLES.find((ex) => ex.slug === role);

  if (!example) {
    return <Navigate to="/resume-examples" replace />;
  }

  const handleUsePreset = () => {
    if (example.presetData) {
      updateResume(example.presetData);
      navigate('/builder');
    }
  };

  const relatedExamples = RESUME_EXAMPLES.filter((ex) => ex.slug !== example.slug).slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: example.metaTitle,
    description: example.metaDescription,
    author: {
      '@type': 'Organization',
      name: 'Resume Craft'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Resume Craft',
      logo: {
        '@type': 'ImageObject',
        url: 'https://resume-cv-craft.web.app/favicon.svg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://resume-cv-craft.web.app/resume-examples/${example.slug}`
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <SeoHead
        title={example.metaTitle}
        description={example.metaDescription}
        canonicalPath={`/resume-examples/${example.slug}`}
        ogType="article"
        jsonLd={articleSchema}
      />

      <Breadcrumbs
        items={[
          { name: 'Resume Examples', path: '/resume-examples' },
          { name: `${example.roleTitle} Resume`, path: `/resume-examples/${example.slug}` }
        ]}
      />

      {/* Header */}
      <section className="space-y-4 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
            {example.category}
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
            {example.experienceLevel}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          {example.h1}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          {example.shortIntro}
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleUsePreset}
            className="px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles size={16} />
            <span>Use This Resume Template</span>
          </button>
          <Link
            to="/ats-checker"
            className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-xs sm:text-sm border border-slate-300 shadow-xs transition-all flex items-center gap-2"
          >
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>Scan with ATS Checker</span>
          </Link>
        </div>
      </section>

      {/* Professional Summary Example Card */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-brand-700 text-xs font-bold uppercase tracking-wider">
          <FileText size={16} />
          <span>Example Professional Summary</span>
        </div>
        <div className="p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          &ldquo;{example.summaryExample}&rdquo;
        </div>
      </section>

      {/* Recommended Skills Grid */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black text-slate-950">
          Top Recommended Skills for {example.roleTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {example.skills.map((skillGroup, idx) => (
            <div key={idx} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skillGroup.items.map((item, i) => (
                  <span
                    key={i}
                    className="text-xs bg-slate-50 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-md font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* High-Impact Experience Bullets (Google X-Y-Z Formula) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-purple-700 text-xs font-bold uppercase tracking-wider">
            <Zap size={16} />
            <span>Google X-Y-Z Achievement Bullets</span>
          </div>
          <h2 className="text-2xl font-black text-slate-950">
            Proven Work Experience Bullet Examples
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Structure your accomplishments with quantifiable outcomes and power verbs.
          </p>
        </div>

        <ul className="space-y-3">
          {example.experienceBullets.map((bullet, idx) => (
            <li
              key={idx}
              className="p-4 bg-purple-50/40 rounded-xl border border-purple-100 text-xs sm:text-sm text-slate-800 leading-relaxed flex items-start gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                ✓
              </div>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ATS Keywords & Matching Strategy */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <Tag size={16} />
          <span>ATS Keyword Strategy</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-950">
          Must-Include ATS Keywords for {example.roleTitle} Resumes
        </h2>
        <div className="flex flex-wrap gap-2 pt-2">
          {example.atsKeywords.map((kw, idx) => (
            <span
              key={idx}
              className="text-xs bg-white text-emerald-900 border border-emerald-200 px-3 py-1.5 rounded-lg font-bold shadow-2xs"
            >
              + {kw}
            </span>
          ))}
        </div>
      </section>

      {/* Common Mistakes & Formatting Tips */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-rose-50/50 rounded-2xl border border-rose-200 space-y-3">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
            <AlertTriangle size={17} />
            <span>Common Mistakes to Avoid</span>
          </div>
          <ul className="space-y-2 text-xs text-rose-950 leading-relaxed">
            {example.commonMistakes.map((m, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✗</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <ShieldCheck size={17} />
            <span>ATS Formatting Recommendations</span>
          </div>
          <ul className="space-y-2 text-xs text-emerald-950 leading-relaxed">
            {example.formattingTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQs */}
      <FaqAccordion items={example.faqs} title={`${example.roleTitle} Resume FAQs`} />

      {/* Related Examples */}
      <section className="space-y-4 border-t border-slate-200 pt-8">
        <h3 className="text-xl font-bold text-slate-900">Related Resume Examples</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedExamples.map((rel) => (
            <Link
              key={rel.slug}
              to={`/resume-examples/${rel.slug}`}
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-xs transition-all space-y-1 block"
            >
              <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">{rel.category}</span>
              <h4 className="text-xs font-bold text-slate-900">{rel.roleTitle} Resume</h4>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
