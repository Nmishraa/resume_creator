import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { RESUME_EXAMPLES } from '../data/resumeExamplesData';
import { SeoHead } from '../components/common/SeoHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FaqAccordion } from '../components/common/FaqAccordion';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle2,
  Code2
} from 'lucide-react';

export const StudentResumeBuilderPage: React.FC = () => {
  const { updateResume } = useResume();
  const navigate = useNavigate();

  const studentExample = RESUME_EXAMPLES.find(e => e.slug === 'college-student') || RESUME_EXAMPLES[9];

  const handleLoadStudentTemplate = () => {
    if (studentExample?.presetData) {
      updateResume(studentExample.presetData);
      navigate('/builder');
    }
  };

  const studentFaqs = [
    {
      question: 'Should I include high school information on a college resume?',
      answer: 'Freshmen can include notable high school achievements (such as Valedictorian, Varsity Captain, or AP Scholar). By sophomore or junior year, replace high school details with university coursework, collegiate clubs, and academic projects.'
    },
    {
      question: 'Where should Education go on a student resume?',
      answer: 'As a student or recent graduate, your Education section should be placed at the very top, directly below your contact information and summary, followed by Academic Projects and Skills.'
    },
    {
      question: 'What if I do not have any formal work experience yet?',
      answer: 'Highlight classroom projects, hackathons, open-source contributions, student clubs, volunteer positions, and leadership roles. Format these with strong action verbs and Google X-Y-Z bullet formulas.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <SeoHead
        title="Free Resume Builder for Students & College Graduates | Resume Craft"
        description="Tailored student resume builder featuring coursework, academic projects, extracurriculars, GPA, and beginner summaries. Land internships and first jobs."
        canonicalPath="/resume-builder-for-students"
      />

      <Breadcrumbs items={[{ name: 'Resume Builder for Students', path: '/resume-builder-for-students' }]} />

      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
          <GraduationCap size={16} className="text-blue-600" />
          <span>Tailored for Undergraduates, Graduates &amp; Interns</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Free Resume Builder for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-brand-600">Students &amp; College</span> Graduates
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Transform your coursework, academic capstones, club leadership, and university projects into an ATS-tested resume that catches the attention of recruiters and hiring managers.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={handleLoadStudentTemplate}
            className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles size={18} />
            <span>Use Student Resume Template</span>
          </button>
          <Link
            to="/ats-checker"
            className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-sm border border-slate-300 shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={18} className="text-emerald-600" />
            <span>Check ATS Score</span>
          </Link>
        </div>
      </section>

      {/* Student Key Sections Guide */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 text-center">
          How to Structure a Winning Student Resume
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <BookOpen size={18} />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">1. Education &amp; GPA</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              List degree, anticipated graduation date, relevant coursework, and GPA (if 3.5+).
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Code2 size={18} />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">2. Academic Projects</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Treat capstones and coding projects like jobs—highlight tools, scope, and results.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Award size={18} />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">3. Campus Leadership</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Highlight student club officer positions, hackathons, and teaching assistantships.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Sparkles size={18} />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">4. Hard &amp; Soft Skills</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Categorize technical tools, software, programming languages, and communication skills.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Student Sample Card */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Featured Student Sample: Computer Science Undergraduate</h3>
            <p className="text-xs text-slate-600">ATS-optimized layout with coursework, project highlights, and GPA.</p>
          </div>
          <button
            onClick={handleLoadStudentTemplate}
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>Load in Builder</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 font-sans text-xs text-slate-700">
          <div className="border-b border-slate-200 pb-3">
            <h4 className="font-black text-slate-900 text-base">{studentExample.presetData.personalInfo?.fullName}</h4>
            <p className="text-slate-500">{studentExample.presetData.personalInfo?.jobTitle} • {studentExample.presetData.personalInfo?.location}</p>
          </div>

          <div className="space-y-1">
            <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Professional Summary</div>
            <p className="text-slate-600">{studentExample.summaryExample}</p>
          </div>

          <div className="space-y-1 pt-2">
            <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Key Project Bullets</div>
            <ul className="list-disc pl-4 space-y-1 text-slate-600">
              {studentExample.experienceBullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqAccordion items={studentFaqs} title="Student Resume FAQs" />
    </div>
  );
};
