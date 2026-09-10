import React, { useState, useRef } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { getResumeBySlug, getAllResumes } from '../services/resumeRegistry';
import { useResume } from '../context/ResumeContext';
import { SeoHead } from '../components/common/SeoHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { ResumeRenderer } from '../components/templates';
import { downloadPdfFromElement } from '../services/pdfService';
import { ResumeData } from '../types/resume';
import {
  FileText,
  Sparkles,
  Download,
  FileDown,
  Layers,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Tag,
  ArrowLeft
} from 'lucide-react';

export const DedicatedResumePage: React.FC = () => {
  const { slug, role } = useParams<{ slug?: string; role?: string }>();
  const targetSlug = slug || role || '';
  const { updateResume } = useResume();
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);
  const printableRef = useRef<HTMLDivElement>(null);

  const resume = getResumeBySlug(targetSlug);

  if (!resume) {
    return <Navigate to="/resume-examples" replace />;
  }

  const fullResumeData = resume.presetData as ResumeData;

  const handleUsePreset = () => {
    if (resume.presetData) {
      updateResume(resume.presetData);
      navigate('/builder');
    }
  };

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    try {
      await downloadPdfFromElement('dedicated-resume-sheet', `${resume.slug}-resume.pdf`);
    } catch (err) {
      console.error('PDF Export Error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadDocx = () => {
    handleUsePreset();
  };

  const allResumes = getAllResumes();
  const relatedResumes = allResumes
    .filter(r => r.slug !== resume.slug)
    .slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: resume.metaTitle,
    description: resume.metaDescription,
    author: {
      '@type': 'Organization',
      name: 'Resume Craft'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Resume Craft',
      logo: {
        '@type': 'ImageObject',
        url: 'https://resume.gnanamai.com/og-image.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://resume.gnanamai.com/resumes/${resume.slug}`
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <SeoHead
        title={resume.metaTitle}
        description={resume.metaDescription}
        canonicalPath={`/resumes/${resume.slug}`}
        ogType="article"
        jsonLd={articleSchema}
      />

      {/* Top Header & Breadcrumbs Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <Breadcrumbs
          items={[
            { name: 'Resumes', path: '/resume-examples' },
            { name: `${resume.jobTitle} Resume`, path: `/resumes/${resume.slug}` }
          ]}
        />
        <Link
          to="/resume-examples"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Explore All Resume Examples</span>
        </Link>
      </div>

      {/* Hero Header Section */}
      <section className="space-y-4 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200 uppercase tracking-wider">
            {resume.category}
          </span>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
            {resume.experienceLevel}
          </span>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            100% Recruiter Approved
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          {resume.h1}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
          {resume.shortIntro}
        </p>

        {/* Dedicated Action Toolbar */}
        <div className="flex flex-wrap items-center gap-3 pt-3">
          <button
            onClick={handleUsePreset}
            className="px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles size={16} />
            <span>Use This Resume Template</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="px-5 py-3.5 bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Download size={16} />
            <span>{isExporting ? 'Preparing PDF...' : 'Download PDF'}</span>
          </button>

          <button
            onClick={handleDownloadDocx}
            disabled={isExporting}
            className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-xs sm:text-sm border border-slate-300 shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <FileDown size={16} className="text-blue-600" />
            <span>Download Word (DOCX)</span>
          </button>

          <Link
            to={`/resume-templates/${resume.slug}`}
            className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs sm:text-sm border border-slate-300 shadow-xs transition-all flex items-center gap-2"
          >
            <Layers size={16} className="text-purple-600" />
            <span>Template Details</span>
          </Link>
        </div>
      </section>

      {/* Main Resume Sheet Preview Card */}
      <section className="bg-slate-100/70 border border-slate-300/80 rounded-3xl p-4 sm:p-8 space-y-4 shadow-sm flex flex-col items-center">
        <div className="w-full flex items-center justify-between px-2 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
              Dedicated Interactive Resume Preview
            </span>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {resume.jobTitle}
          </span>
        </div>

        {/* Clean Printable A4 Resume Renderer Sheet */}
        <div className="w-full overflow-x-auto flex justify-center py-2">
          <div id="dedicated-resume-sheet" ref={printableRef} className="bg-white text-black shadow-2xl rounded-sm border border-slate-300 w-[794px] min-h-[1123px] box-border p-6 sm:p-10 shrink-0">
            <ResumeRenderer resume={fullResumeData} />
          </div>
        </div>
      </section>

      {/* Summary Example Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-brand-700 text-xs font-extrabold uppercase tracking-wider">
          <FileText size={16} />
          <span>Professional Summary Example</span>
        </div>
        <div className="p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          &ldquo;{fullResumeData.summary || resume.metaDescription}&rdquo;
        </div>
      </section>

      {/* Skills Grid */}
      {resume.skills && resume.skills.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-950">
            Top Skills Highlighted for {resume.jobTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {resume.skills.map((skillGroup, idx) => (
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
      )}

      {/* Google X-Y-Z Achievement Bullets */}
      {resume.experienceBullets && resume.experienceBullets.length > 0 && (
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-purple-700 text-xs font-extrabold uppercase tracking-wider">
              <Zap size={16} />
              <span>Google X-Y-Z Bullet Highlights</span>
            </div>
            <h2 className="text-2xl font-black text-slate-950">
              Work Accomplishment Examples
            </h2>
          </div>

          <ul className="space-y-3">
            {resume.experienceBullets.map((bullet, idx) => (
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
      )}

      {/* ATS Keyword Strategy */}
      {resume.atsKeywords && (
        <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-extrabold uppercase tracking-wider">
            <Tag size={16} />
            <span>ATS Keyword Strategy</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Targeted Keywords for {resume.jobTitle}
          </h2>
          <div className="flex flex-wrap gap-2 pt-2">
            {resume.atsKeywords.map((kw, idx) => (
              <span
                key={idx}
                className="text-xs bg-white text-emerald-900 border border-emerald-200 px-3 py-1.5 rounded-lg font-bold shadow-2xs"
              >
                + {kw}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Formatting & Avoid Mistakes */}
      {resume.commonMistakes && resume.formattingTips && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-rose-50/50 rounded-2xl border border-rose-200 space-y-3">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
              <AlertTriangle size={17} />
              <span>Common Mistakes to Avoid</span>
            </div>
            <ul className="space-y-2 text-xs text-rose-950 leading-relaxed">
              {resume.commonMistakes.map((m, i) => (
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
              <span>Formatting Best Practices</span>
            </div>
            <ul className="space-y-2 text-xs text-emerald-950 leading-relaxed">
              {resume.formattingTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* FAQs */}
      {resume.faqs && resume.faqs.length > 0 && (
        <FaqAccordion items={resume.faqs} title={`${resume.jobTitle} Resume FAQs`} />
      )}

      {/* Related Resumes */}
      <section className="space-y-4 border-t border-slate-200 pt-8">
        <h3 className="text-xl font-bold text-slate-900">Explore Related Resumes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedResumes.map((rel) => (
            <Link
              key={rel.slug}
              to={rel.url}
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-xs transition-all space-y-1 block"
            >
              <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">{rel.category}</span>
              <h4 className="text-xs font-bold text-slate-900">{rel.jobTitle} Resume</h4>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
