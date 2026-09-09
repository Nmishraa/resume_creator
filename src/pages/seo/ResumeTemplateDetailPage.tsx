import React from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { RESUME_EXAMPLES } from '../../data/resumeExamplesData';
import { useResume } from '../../context/ResumeContext';
import { SeoHead } from '../../components/common/SeoHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { FaqAccordion } from '../../components/common/FaqAccordion';
import {
  FileText,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layout,
  Award,
  BookOpen
} from 'lucide-react';

export const ResumeTemplateDetailPage: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  const { updateResume } = useResume();
  const navigate = useNavigate();

  const example = RESUME_EXAMPLES.find((ex) => ex.slug === role);

  if (!example) {
    return <Navigate to="/resume-templates" replace />;
  }

  const handleUseTemplate = () => {
    if (example.presetData) {
      updateResume(example.presetData);
      navigate('/builder');
    }
  };

  const templateSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${example.roleTitle} Resume Template – Free ATS-Friendly Example`,
    description: `Download a free ATS-compliant ${example.roleTitle} resume template. Includes recommended section layout, core skills, summary examples, and achievement bullet formatting.`,
    url: `https://resume.gnanamai.com/resume-templates/${example.slug}`
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <SeoHead
        title={`${example.roleTitle} Resume Template – Free ATS-Friendly Example`}
        description={`Download a free ATS-compliant ${example.roleTitle} resume template. Includes recommended section layout, core skills, summary examples, and achievement bullet formatting.`}
        canonicalPath={`/resume-templates/${example.slug}`}
        jsonLd={templateSchema}
      />

      <Breadcrumbs
        items={[
          { name: 'Resume Templates', path: '/resume-templates' },
          { name: `${example.roleTitle} Resume Template`, path: `/resume-templates/${example.slug}` }
        ]}
      />

      {/* Header */}
      <section className="space-y-4 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
            🎨 Layout Template: {example.roleTitle}
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
            {example.experienceLevel}
          </span>
          {example.pageLength && (
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
              {example.pageLength} Layout
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          {example.roleTitle} Resume Template
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Recruiter-tested, ATS-friendly resume template tailored specifically for {example.roleTitle} positions. Includes standard sections, skill placement recommendations, and 1-click preset data.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleUseTemplate}
            className="px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles size={16} />
            <span>Use This {example.roleTitle} Template</span>
          </button>
          <Link
            to={`/resume-examples/${example.slug}`}
            className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-xs sm:text-sm border border-slate-300 shadow-xs transition-all flex items-center gap-2"
          >
            <BookOpen size={16} className="text-purple-600" />
            <span>View Full Resume Example Guide</span>
          </Link>
          <Link
            to={`/resume-skills/${example.slug}`}
            className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-xs sm:text-sm border border-slate-300 shadow-xs transition-all flex items-center gap-2"
          >
            <Zap size={16} className="text-amber-600" />
            <span>View Skills &amp; Keywords</span>
          </Link>
        </div>
      </section>

      {/* Recommended Section Order */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-brand-700 text-xs font-bold uppercase tracking-wider">
          <Layout size={16} />
          <span>Recommended Template Architecture</span>
        </div>
        <h2 className="text-2xl font-black text-slate-950">
          Essential Resume Sections for {example.roleTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-900 block">1. Header &amp; Contact Info</span>
            <p className="text-xs text-slate-600">Full name, target title ({example.roleTitle}), email, phone, location, LinkedIn &amp; GitHub/Portfolio URL.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-900 block">2. Professional Summary</span>
            <p className="text-xs text-slate-600">3-sentence hook highlighting total experience, core technical stack, and top business impact.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-900 block">3. Core Skills Grid</span>
            <p className="text-xs text-slate-600">Categorized hard skills (tools, platforms, methodologies) positioned for fast 6-second recruiter scanning.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-900 block">4. Work Experience (Google X-Y-Z)</span>
            <p className="text-xs text-slate-600">Reverse-chronological bullet points incorporating metrics, latency reductions, and revenue results.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-900 block">5. Key Projects &amp; Capstones</span>
            <p className="text-xs text-slate-600">Selected production implementations or architectural accomplishments proving hands-on competence.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-900 block">6. Education &amp; Certifications</span>
            <p className="text-xs text-slate-600">Degree, institution, graduation year, and verified industry credentials (AWS, PMP, TOGAF, etc.).</p>
          </div>
        </div>
      </section>

      {/* Summary Example for Template */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-purple-700 text-xs font-bold uppercase tracking-wider">
          <FileText size={16} />
          <span>Professional Summary Template</span>
        </div>
        <h2 className="text-2xl font-black text-slate-950">
          Example Summary Phrasing for {example.roleTitle}
        </h2>
        <div className="p-4 sm:p-5 bg-purple-50/50 rounded-xl border border-purple-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          &ldquo;{example.summaryExample}&rdquo;
        </div>
      </section>

      {/* Experience Bullet Examples */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <Zap size={16} />
          <span>Experience Bullet Template</span>
        </div>
        <h2 className="text-2xl font-black text-slate-950">
          Sample Achievement Bullets for {example.roleTitle}
        </h2>
        <ul className="space-y-2.5">
          {example.experienceBullets.map((bullet, idx) => (
            <li key={idx} className="p-3.5 bg-emerald-50/40 rounded-xl border border-emerald-100 text-xs sm:text-sm text-slate-800 flex items-start gap-2.5">
              <span className="text-emerald-600 font-bold">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ATS Formatting Tips */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-slate-800 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck size={16} className="text-brand-600" />
          <span>ATS Compliance Strategy</span>
        </div>
        <h2 className="text-2xl font-black text-slate-950">
          ATS Formatting Guidelines for {example.roleTitle} Resumes
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
          {example.formattingTips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Related Template Links */}
      <section className="space-y-4 border-t border-slate-200 pt-8">
        <h3 className="text-xl font-bold text-slate-900">Explore Other Role Templates</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/resume-templates/product-manager" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-xs transition-all space-y-1 block">
            <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">Product &amp; AI</span>
            <h4 className="text-xs font-bold text-slate-900">Product Manager Template</h4>
          </Link>
          <Link to="/resume-templates/cloud-architect" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-xs transition-all space-y-1 block">
            <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">Architecture</span>
            <h4 className="text-xs font-bold text-slate-900">Cloud Architect Template</h4>
          </Link>
          <Link to="/resume-templates/enterprise-architect" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-xs transition-all space-y-1 block">
            <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">Enterprise Architecture</span>
            <h4 className="text-xs font-bold text-slate-900">Enterprise Architect Template</h4>
          </Link>
        </div>
      </section>
    </div>
  );
};
