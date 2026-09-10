import React from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { ResumeData } from '../../types/resume';
import { ROLE_SEO_DATA } from '../../data/roleSeoData';
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
  BookOpen,
  Check,
  Layers,
  Search,
  Download
} from 'lucide-react';

export const ResumeTemplateDetailPage: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  const { updateResume } = useResume();
  const navigate = useNavigate();

  // Try finding role data in ROLE_SEO_DATA first, fallback to RESUME_EXAMPLES
  const roleKey = role || '';
  const seoData = ROLE_SEO_DATA[roleKey];
  const legacyExample = RESUME_EXAMPLES.find((ex) => ex.slug === roleKey);

  if (!seoData && !legacyExample) {
    return <Navigate to="/resume-templates" replace />;
  }

  // Unified Data Accessors
  const roleTitle = seoData?.roleTitle || legacyExample?.roleTitle || 'Professional';
  const metaTitle = seoData?.metaTitle || `${roleTitle} Resume Template — Free ATS Resume | Resume Craft`;
  const metaDescription = seoData?.metaDescription || `Create a professional ${roleTitle} resume with Resume Craft. Use an ATS-friendly template, customize your experience and skills, and download as PDF or Word.`;
  const h1 = seoData?.h1 || `${roleTitle} Resume Template`;
  const shortIntro = seoData?.shortIntro || legacyExample?.shortIntro || `Create a recruiter-vetted, ATS-friendly ${roleTitle} resume in minutes.`;
  const skills = seoData?.skills || legacyExample?.skills || [];
  const summaryExamples = seoData?.summaryExamples || (legacyExample?.summaryExample ? [legacyExample.summaryExample] : []);
  const experienceBullets = seoData?.experienceBullets || legacyExample?.experienceBullets || [];
  const atsKeywords = seoData?.atsKeywords || legacyExample?.atsKeywords || [];
  const faqs = seoData?.faqs || legacyExample?.faqs || [];
  const relatedRoles = seoData?.relatedRoles || [
    { slug: 'software-engineer', title: 'Software Engineer', category: 'Engineering' },
    { slug: 'product-manager', title: 'Product Manager', category: 'Product' },
    { slug: 'cloud-architect', title: 'Cloud Architect', category: 'Architecture' }
  ];
  const presetData = seoData?.presetData || legacyExample?.presetData;

  const handleUseRoleTemplate = () => {
    if (presetData) {
      const fullPreset: Partial<ResumeData> = {
        ...presetData,
        personalInfo: {
          fullName: presetData.personalInfo?.fullName || '',
          jobTitle: presetData.personalInfo?.jobTitle || roleTitle,
          email: presetData.personalInfo?.email || '',
          phone: presetData.personalInfo?.phone || '',
          location: presetData.personalInfo?.location || '',
          website: presetData.personalInfo?.website || '',
          linkedin: presetData.personalInfo?.linkedin || '',
          github: presetData.personalInfo?.github || ''
        }
      };
      updateResume(fullPreset);
    }
    navigate('/builder');
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: metaTitle,
    description: metaDescription,
    url: `https://resume.gnanamai.com/resume-templates/${roleKey}`
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <SeoHead
        title={metaTitle}
        description={metaDescription}
        canonicalPath={`/resume-templates/${roleKey}`}
        jsonLd={webPageSchema}
        faqItems={faqs}
      />

      <Breadcrumbs
        items={[
          { name: 'Resume Templates', path: '/resume-templates' },
          { name: `${roleTitle} Template`, path: `/resume-templates/${roleKey}` }
        ]}
      />

      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-brand-50/70 via-white to-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-brand-100 text-brand-900 border border-brand-200">
            🎨 Layout Template: {roleTitle}
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
            {seoData?.category || legacyExample?.category || 'Professional'}
          </span>
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
            100% Free • No Watermark
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          {h1}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed font-normal">
          {shortIntro}
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-3">
          <button
            onClick={handleUseRoleTemplate}
            className="px-7 py-4 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-black rounded-2xl text-sm sm:text-base shadow-lg shadow-brand-500/25 transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <Sparkles size={18} />
            <span>Create Your Free {roleTitle} Resume</span>
          </button>

          <Link
            to="/ats-resume-checker"
            className="px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-2xl text-sm border border-slate-300 shadow-xs transition-all flex items-center gap-2"
          >
            <CheckCircle2 size={18} className="text-emerald-600" />
            <span>Check {roleTitle} ATS Score</span>
          </Link>
        </div>
      </section>

      {/* 2. RESUME PREVIEW / TEMPLATE SECTION */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex items-center gap-2 text-brand-700 text-xs font-bold uppercase tracking-wider">
          <Layout size={16} />
          <span>Interactive Template Starting Point</span>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              {roleTitle} Resume Layout &amp; Structure
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clicking below opens a tailored starting experience pre-populated for {roleTitle} candidates in the free Resume Craft editor.
            </p>
          </div>

          <button
            onClick={handleUseRoleTemplate}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
          >
            <span>Open in Editor</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Live Card Preview Box */}
        <div
          onClick={handleUseRoleTemplate}
          className="bg-slate-50 hover:bg-slate-100/80 border-2 border-dashed border-brand-300 rounded-2xl p-6 transition-all cursor-pointer space-y-4 group"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-extrabold text-brand-700 uppercase tracking-wider">Pre-Configured Template</span>
              <h3 className="text-lg font-bold text-slate-950 group-hover:text-brand-600 transition-colors">
                {presetData?.personalInfo?.fullName || 'Professional Candidate'} — {roleTitle}
              </h3>
            </div>
            <span className="px-3 py-1 bg-brand-600 text-white text-xs font-bold rounded-lg shadow-xs group-hover:scale-105 transition-transform">
              Use Template &rarr;
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 italic border-l-4 border-brand-500 pl-3 py-1 bg-white rounded-r-lg">
            &ldquo;{presetData?.summary || summaryExamples[0] || 'Proven track record delivering scalable business results and technical excellence.'}&rdquo;
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {skills[0]?.items?.slice(0, 8).map((skill, sIdx) => (
              <span key={sIdx} className="text-xs bg-white text-slate-700 border border-slate-200 px-2.5 py-1 rounded-md font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW TO WRITE A [ROLE] RESUME */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Step-by-Step Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            How to Write a {roleTitle} Resume
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Follow this section-by-section strategy to structure your achievements for max ATS readability and recruiter engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="text-sm font-extrabold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>Professional Summary</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Write a 2–3 sentence summary highlighting your years of experience, core technical stack or strategic competencies, and top quantitative outcome. Avoid passive fluff.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="text-sm font-extrabold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>Categorized Skills Grid</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Organize your technical tools, platforms, and domain methodologies into categorized skill blocks. This makes it effortless for 6-second recruiter scans.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="text-sm font-extrabold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>Work Experience (Google X-Y-Z)</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Format bullet points using action verbs and measurable metrics (e.g. percentages, latency drops, revenue generated) rather than simple task descriptions.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="text-sm font-extrabold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">4</span>
              <span>Education, Projects &amp; Certifications</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              List relevant degrees, industry certifications (AWS, PMP, TOGAF, SHRM, etc.), and key production implementations that validate your hands-on competence.
            </p>
          </div>
        </div>
      </section>

      {/* 4. [ROLE] RESUME SKILLS */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <Zap size={16} />
          <span>Core Competencies</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
          {roleTitle} Resume Skills
        </h2>

        <p className="text-xs sm:text-sm text-slate-600">
          Top hard skills, software tools, and domain methodologies recommended for a {roleTitle} position:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {skills.map((group, idx) => (
            <div key={idx} className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((skill, sIdx) => (
                  <span key={sIdx} className="text-xs bg-white text-slate-800 border border-slate-300/80 px-2.5 py-1 rounded-md font-semibold shadow-2xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. RESUME SUMMARY EXAMPLES */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex items-center gap-2 text-purple-700 text-xs font-bold uppercase tracking-wider">
          <FileText size={16} />
          <span>Professional Summary Examples</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
          Resume Summary Examples for {roleTitle}
        </h2>

        <p className="text-xs sm:text-sm text-slate-600">
          Adapt these realistic, achievement-focused summary examples for your experience level:
        </p>

        <div className="space-y-4 pt-1">
          {summaryExamples.map((summary, idx) => (
            <div key={idx} className="p-5 bg-purple-50/40 rounded-2xl border border-purple-200 space-y-2">
              <div className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                Example {idx + 1}
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                &ldquo;{summary}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. EXPERIENCE BULLET EXAMPLES */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <Award size={16} />
          <span>Achievement Bullets</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
          Experience Bullet Examples for {roleTitle}
        </h2>

        <p className="text-xs sm:text-sm text-slate-600">
          Use these metric-backed achievement bullets as blueprints for your work history section:
        </p>

        <ul className="space-y-3 pt-1">
          {experienceBullets.map((bullet, idx) => (
            <li key={idx} className="p-4 bg-emerald-50/40 rounded-2xl border border-emerald-200/80 text-xs sm:text-sm text-slate-800 flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                ✓
              </span>
              <span className="leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 7. ATS KEYWORDS SECTION */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-slate-800 text-xs font-bold uppercase tracking-wider">
          <Search size={16} className="text-brand-600" />
          <span>ATS Keyword Density Guide</span>
        </div>

        <h2 className="text-2xl font-black text-slate-950">
          ATS Keywords for {roleTitle} Resumes
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Applicant Tracking Systems (ATS) scan resumes for hard skills and terminology matching employer job postings. Incorporate these keywords naturally into your summary, experience bullets, and skills section:
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {atsKeywords.map((keyword, idx) => (
            <span key={idx} className="text-xs bg-white text-slate-800 border border-slate-300 px-3 py-1.5 rounded-lg font-bold shadow-2xs">
              {keyword}
            </span>
          ))}
        </div>

        <p className="text-[11px] text-slate-500 italic pt-2">
          💡 <em>Note: Keyword alignment increases ATS matching scores, but should always be backed by genuine experience. Avoid keyword stuffing.</em>
        </p>
      </section>

      {/* 8. FAQ SECTION */}
      <main className="max-w-5xl mx-auto">
        <FaqAccordion items={faqs} />
      </main>

      {/* 9. RELATED RESUME TEMPLATES */}
      <section className="space-y-4 border-t border-slate-200 pt-8">
        <h3 className="text-xl font-bold text-slate-950">Related Resume Templates</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedRoles.map((rel, idx) => (
            <Link
              key={idx}
              to={`/resume-templates/${rel.slug}`}
              className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-brand-400 hover:shadow-md transition-all space-y-1 block group"
            >
              <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">{rel.category}</span>
              <h4 className="text-sm font-bold text-slate-950 group-hover:text-brand-600 transition-colors">
                {rel.title} Template &rarr;
              </h4>
            </Link>
          ))}
        </div>
      </section>

      {/* 10. FINAL CTA SECTION */}
      <section className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-xl border border-slate-800">
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          Create Your Free {roleTitle} Resume
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Free to use. No login required. ATS-friendly formatting. Download as PDF or Word.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleUseRoleTemplate}
            className="px-8 py-4 bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-black rounded-2xl text-sm sm:text-base transition-all shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <Sparkles size={18} />
            <span>Build My {roleTitle} Resume Free &rarr;</span>
          </button>
        </div>
      </section>
    </div>
  );
};
