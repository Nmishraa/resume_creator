import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../../components/common/SeoHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { FaqAccordion } from '../../components/common/FaqAccordion';
import {
  Briefcase,
  Target,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText,
  UploadCloud,
  ArrowRight,
  Layers,
  Award,
  Zap,
  MapPin,
  Lock
} from 'lucide-react';

export const FindJobsWithResumePage: React.FC = () => {
  const faqs = [
    {
      question: 'How does finding jobs with your resume work?',
      answer: 'Our AI analyzes your complete resume—extracting your target job title, core technical skills, work history, education level, and preferred location. It then scans open job opportunities and ranks them by compatibility percentage so you see the most relevant roles first.'
    },
    {
      question: 'Is my resume data and job search kept private?',
      answer: 'Yes, 100%. Your uploaded resume details, contact information, and job search results remain strictly private to your browser session. We never create public profile pages containing your personal information, and search results are marked as non-indexable.'
    },
    {
      question: 'Do I need to create an account to match jobs?',
      answer: 'No registration or credit card is required. You can upload an existing PDF/DOCX resume or build a new ATS-friendly resume directly in our free builder to instantly find matching jobs.'
    },
    {
      question: 'How does location-based job matching work?',
      answer: 'When your resume contains a location (such as "Chicago, IL" or "Remote"), our job matching engine prioritizes listings in your city or region, while ensuring remote opportunities are ranked appropriately.'
    },
    {
      question: 'What industries and occupations are supported?',
      answer: 'Our AI engine supports a wide range of industries including Technology, Healthcare, Education, Finance, Product Management, Marketing, Engineering, Customer Service, and Administration.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      <SeoHead
        title="Find Jobs With Your Resume | Free AI Job Matcher"
        description="Create or upload your resume to discover matching jobs. Automatically match open positions based on your target role, skills, experience, education, and location."
        canonicalPath="/find-jobs-with-resume"
      />

      <Breadcrumbs items={[{ name: 'Find Jobs With Your Resume', path: '/find-jobs-with-resume' }]} />

      {/* Hero Banner */}
      <section className="text-center space-y-6 max-w-4xl mx-auto pt-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-800 text-xs sm:text-sm font-extrabold border border-brand-200 shadow-2xs">
          <Sparkles size={16} className="text-brand-600 shrink-0" />
          <span>100% Free AI Career Matching Engine</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-tight">
          Find Jobs With Your Resume
        </h1>

        <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-medium max-w-3xl mx-auto">
          Upload your existing resume or build a new ATS-friendly CV to instantly match with relevant job openings based on your target role, technical skills, experience level, and preferred location.
        </p>

        {/* Primary CTA */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/job-description-resume-matcher"
            className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-2xl text-base sm:text-lg shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-3 active:scale-95 cursor-pointer min-h-[48px]"
          >
            <Briefcase size={22} />
            <span>Find Jobs From My Resume</span>
            <ArrowRight size={20} />
          </Link>

          <Link
            to="/builder"
            className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 font-extrabold rounded-2xl text-sm sm:text-base border border-slate-300 shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
          >
            <FileText size={18} className="text-brand-600" />
            <span>Build Resume First</span>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-600 font-semibold pt-2">
          <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-600" /> No Account Needed</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-600" /> 100% Free Matching</span>
          <span className="flex items-center gap-1.5"><Lock size={16} className="text-emerald-600" /> Strictly Private &amp; Secure</span>
        </div>
      </section>

      {/* Three-Step Process */}
      <section className="space-y-6 pt-4 border-t border-slate-200/80">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            How Resume Job Matching Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Three simple steps to discover ranked job opportunities tailored to your professional background.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 font-black text-lg flex items-center justify-center">
              1
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Upload or Build Resume</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Upload your existing PDF or DOCX resume, or create a brand-new ATS-formatted resume in our guided builder.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 font-black text-lg flex items-center justify-center">
              2
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">AI Role &amp; Skill Extraction</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our AI parses your target job title, core technical competencies, work history, education, and geographic location.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 font-black text-lg flex items-center justify-center">
              3
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Get Ranked Job Opportunities</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Review personalized job matches scored by compatibility percentage, matched skills, and direct application links.
            </p>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-extrabold border border-brand-400/30">
            <Award size={14} className="text-brand-400" />
            <span>Why Use Resume-Based Matching</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Stop Searching Manually. Let Your Resume Match the Jobs.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            Generic keyword searches return hundreds of irrelevant listings. Our matching engine uses your full resume context to surface accurate opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
            <Target className="text-brand-400" size={24} />
            <h4 className="font-extrabold text-white text-base">Target Role Relevance</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ensures job titles match your specific occupation (e.g. Computer Science Teacher vs Language Arts Teacher).
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
            <Zap className="text-brand-400" size={24} />
            <h4 className="font-extrabold text-white text-base">40% Skills Scoring</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Calculates match scores based on genuine skill overlap between your resume and employer requirements.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
            <MapPin className="text-brand-400" size={24} />
            <h4 className="font-extrabold text-white text-base">Geographic Priority</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Prioritizes jobs in your candidate location while maintaining flexibility for remote roles.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
            <ShieldCheck className="text-brand-400" size={24} />
            <h4 className="font-extrabold text-white text-base">Direct Application Links</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Apply directly to verified employer listings with complete transparency and zero middleman markups.
            </p>
          </div>
        </div>
      </section>

      {/* Strict Privacy Statement */}
      <section className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3 text-emerald-950 font-black text-xl">
          <ShieldCheck size={26} className="text-emerald-600 shrink-0" />
          <h2>Candidate Privacy &amp; Data Security Statement</h2>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          Your personal career data belongs exclusively to you. All resume analysis and job matching operations are processed in your local browser session. We **never** generate public web pages containing your personal resume details, name, or contact information, and all search results are explicitly marked as non-indexable (`noindex`) to protect your privacy from search engines.
        </p>
      </section>

      {/* Frequently Asked Questions */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600">
            Answers to common questions about finding jobs from your resume.
          </p>
        </div>

        <FaqAccordion items={faqs} />
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
          Ready to Find Jobs Tailored to Your Resume?
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Use our 100% free AI Job Matcher to find relevant open positions, score candidate fit, and land your next role faster.
        </p>
        <div>
          <Link
            to="/job-description-resume-matcher"
            className="inline-flex items-center gap-3 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-extrabold rounded-2xl text-base shadow-lg transition-all cursor-pointer"
          >
            <Briefcase size={20} />
            <span>Find Jobs From My Resume</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};
