import React from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { RESUME_EXAMPLES } from '../../data/resumeExamplesData';
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
  Tag,
  Code2,
  Cpu,
  Layers
} from 'lucide-react';

export const ResumeSkillsDetailPage: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();

  const example = RESUME_EXAMPLES.find((ex) => ex.slug === role);

  if (!example) {
    return <Navigate to="/resume-examples" replace />;
  }

  const skillsSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${example.roleTitle} Resume Skills – Technical Skills & Keywords`,
    description: `Complete list of essential technical skills, frameworks, databases, cloud tools, and ATS keywords for ${example.roleTitle} resumes.`,
    url: `https://resume.gnanamai.com/resume-skills/${example.slug}`
  };

  const skillsFaqs = [
    {
      question: `How many skills should I list on a ${example.roleTitle} resume?`,
      answer: 'Aim for 10-16 targeted technical and soft skills grouped into 2-4 clean categories (e.g. Technical Foundations, Cloud & Infrastructure, Methodologies).'
    },
    {
      question: 'Should I list skills I am only beginner-level in?',
      answer: 'Only list tools or technologies you can confidently speak to during an interview. For secondary tools, consider listing them under "Familiar With" or "Tools & Technologies".'
    },
    {
      question: 'Where is the best place on a resume to put skills?',
      answer: 'For technical roles, place a categorized Skills grid right after your Professional Summary so ATS software and recruiters catch key keywords in the first 6 seconds.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <SeoHead
        title={`${example.roleTitle} Resume Skills – Technical Skills & Keywords`}
        description={`Complete list of essential technical skills, frameworks, databases, cloud tools, and ATS keywords for ${example.roleTitle} resumes.`}
        canonicalPath={`/resume-skills/${example.slug}`}
        jsonLd={skillsSchema}
      />

      <Breadcrumbs
        items={[
          { name: 'Resume Examples', path: '/resume-examples' },
          { name: `${example.roleTitle} Skills`, path: `/resume-skills/${example.slug}` }
        ]}
      />

      {/* Header */}
      <section className="space-y-4 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            ⚡ Skills &amp; ATS Keywords
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
            {example.experienceLevel}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          {example.roleTitle} Resume Skills
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          In-depth guide to technical competencies, frameworks, databases, tools, soft skills, and ATS keywords needed to build an interview-ready {example.roleTitle} resume.
        </p>

        {/* Primary CTAs & Inter-Linking */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            to={`/resume-templates/${example.slug}`}
            className="px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Layers size={16} />
            <span>View {example.roleTitle} Template</span>
          </Link>
          <Link
            to={`/resume-examples/${example.slug}`}
            className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-xs sm:text-sm border border-slate-300 shadow-xs transition-all flex items-center gap-2"
          >
            <FileText size={16} className="text-purple-600" />
            <span>View Full Resume Example</span>
          </Link>
          <Link
            to="/resume-builder"
            className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-xs sm:text-sm border border-slate-300 shadow-xs transition-all flex items-center gap-2"
          >
            <Sparkles size={16} className="text-brand-600" />
            <span>Build Resume Free</span>
          </Link>
        </div>
      </section>

      {/* Categorized Skills Breakdown */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-brand-700 text-xs font-bold uppercase tracking-wider">
            <Cpu size={16} />
            <span>Recommended Skill Categorization</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            Categorized Skills for {example.roleTitle} Resumes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {example.skills.map((skillGroup, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Code2 size={18} className="text-brand-600" />
                <h3 className="font-bold text-slate-900 text-base">{skillGroup.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item, i) => (
                  <span
                    key={i}
                    className="text-xs bg-slate-50 text-slate-800 border border-slate-200 px-3 py-1.5 rounded-lg font-semibold shadow-2xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Must-Include ATS Keywords */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <Tag size={16} />
          <span>ATS Keyword Density</span>
        </div>
        <h2 className="text-2xl font-black text-slate-950">
          Must-Include ATS Keywords for {example.roleTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Incorporate these exact keyword phrases throughout your professional summary, skills grid, and work experience bullet points:
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {example.atsKeywords.map((kw, idx) => (
            <span
              key={idx}
              className="text-xs bg-white text-emerald-900 border border-emerald-300 px-3 py-1.5 rounded-lg font-bold shadow-2xs"
            >
              ✓ {kw}
            </span>
          ))}
        </div>
      </section>

      {/* How to Format Skills Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-purple-700 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck size={16} />
          <span>Best Practices</span>
        </div>
        <h2 className="text-2xl font-black text-slate-950">
          How to List Skills on Your {example.roleTitle} Resume
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            <strong>1. Group Skills by Category:</strong> Rather than listing 20 random tools in one long paragraph, break them down into 2-4 clean categories like <em>Programming Languages</em>, <em>Frameworks &amp; Libraries</em>, and <em>Cloud &amp; DevOps</em>.
          </p>
          <p>
            <strong>2. Contextualize in Bullet Points:</strong> Do not just list skills in a sidebar. Mention how you applied tools like {example.skills[0]?.items[0] || 'core technologies'} inside your work experience achievement bullets alongside measurable outcomes.
          </p>
          <p>
            <strong>3. Match Job Description Keywords:</strong> Use our <Link to="/resume-keyword-matcher" className="text-brand-600 underline font-bold">Resume Keyword Matcher</Link> to ensure exact term matches for tools specified in target job postings.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FaqAccordion items={skillsFaqs} title={`${example.roleTitle} Resume Skills FAQs`} />

      {/* Related Skills Links */}
      <section className="space-y-4 border-t border-slate-200 pt-8">
        <h3 className="text-xl font-bold text-slate-900">Explore Other Role Skills Guides</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/resume-skills/software-engineer" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-xs transition-all space-y-1 block">
            <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">Engineering</span>
            <h4 className="text-xs font-bold text-slate-900">Software Engineer Skills</h4>
          </Link>
          <Link to="/resume-skills/product-manager" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-xs transition-all space-y-1 block">
            <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">Product</span>
            <h4 className="text-xs font-bold text-slate-900">Product Manager Skills</h4>
          </Link>
          <Link to="/resume-skills/cloud-architect" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-xs transition-all space-y-1 block">
            <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">Cloud &amp; DevOps</span>
            <h4 className="text-xs font-bold text-slate-900">Cloud Architect Skills</h4>
          </Link>
        </div>
      </section>
    </div>
  );
};
