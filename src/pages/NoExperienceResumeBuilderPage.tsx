import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { RESUME_EXAMPLES } from '../data/resumeExamplesData';
import { SeoHead } from '../components/common/SeoHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FaqAccordion } from '../components/common/FaqAccordion';
import {
  HeartHandshake,
  Sparkles,
  Award,
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const NoExperienceResumeBuilderPage: React.FC = () => {
  const { updateResume } = useResume();
  const navigate = useNavigate();

  const noExpExample = RESUME_EXAMPLES.find(e => e.slug === 'no-experience') || RESUME_EXAMPLES[11];

  const handleLoadNoExpTemplate = () => {
    if (noExpExample?.presetData) {
      updateResume(noExpExample.presetData);
      navigate('/builder');
    }
  };

  const noExpFaqs = [
    {
      question: 'What can I put on my resume if I have never had a job?',
      answer: 'You can feature volunteer activities, community leadership, academic honors, group projects, informal freelance work (pet sitting, lawn care, tutoring), online certifications, and transferable digital skills (Google Docs, Excel, social media).'
    },
    {
      question: 'What resume format is best for no experience?',
      answer: 'A functional or hybrid format that puts your Skills, Education, and Volunteer / Project Experience at the top works best to showcase your strengths rather than a chronological timeline.'
    },
    {
      question: 'How long should a beginner resume be?',
      answer: 'A beginner resume should always be strictly one single page with clear margins and bullet points.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <SeoHead
        title="Resume Builder for No Experience – Free ATS-Friendly Templates | Resume Craft"
        description="Build a standout resume with no formal work experience. Highlight transferable skills, academic projects, volunteer work, and certifications for free."
        canonicalPath="/resume-builder-no-experience"
      />

      <Breadcrumbs items={[{ name: 'Resume Builder for No Experience', path: '/resume-builder-no-experience' }]} />

      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <HeartHandshake size={16} className="text-emerald-600" />
          <span>Perfect for First-Time Job Seekers &amp; Career Switchers</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Resume Builder for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-brand-600">No Experience</span> – ATS-Friendly
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          You have more experience than you think. Learn how to transform volunteer hours, school activities, personal projects, and transferable skills into an employer-ready resume.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={handleLoadNoExpTemplate}
            className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles size={18} />
            <span>Use No Experience Template</span>
          </button>
          <Link
            to="/ats-checker"
            className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-sm border border-slate-300 shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={18} className="text-emerald-600" />
            <span>Test ATS Compatibility</span>
          </Link>
        </div>
      </section>

      {/* What to Include Section */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 text-center">
          What to Put on a Resume with No Work Experience
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <HeartHandshake size={20} />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Volunteer &amp; Community Work</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Showcase reliability, team collaboration, and civic responsibility with hours spent volunteering at charities, shelters, or event logistics.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Award size={20} />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Online Certifications</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete free or low-cost courses (Google Career Certificates, Coursera, HubSpot) in digital marketing, Excel, Python, or customer relations.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Zap size={20} />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Transferable Skills</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Highlight communication, time management, problem-solving, Google Workspace, and POS/cash handling abilities.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Sample Card */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Featured Sample: Entry-Level First Job Resume</h3>
            <p className="text-xs text-slate-600">Features volunteer leadership, extracurriculars, and transferable software skills.</p>
          </div>
          <button
            onClick={handleLoadNoExpTemplate}
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>Load in Builder</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 font-sans text-xs text-slate-700">
          <div className="border-b border-slate-200 pb-3">
            <h4 className="font-black text-slate-900 text-base">{noExpExample.presetData.personalInfo?.fullName}</h4>
            <p className="text-slate-500">{noExpExample.presetData.personalInfo?.jobTitle} • {noExpExample.presetData.personalInfo?.location}</p>
          </div>

          <div className="space-y-1">
            <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Professional Summary</div>
            <p className="text-slate-600">{noExpExample.summaryExample}</p>
          </div>

          <div className="space-y-1 pt-2">
            <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Volunteer &amp; Community Experience</div>
            <ul className="list-disc pl-4 space-y-1 text-slate-600">
              {noExpExample.experienceBullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqAccordion items={noExpFaqs} title="No Experience Resume FAQs" />
    </div>
  );
};
