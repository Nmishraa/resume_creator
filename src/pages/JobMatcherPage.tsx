import React, { useState } from 'react';
import { SeoHead } from '../components/common/SeoHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FindMatchingJobsView } from '../components/jobs/FindMatchingJobsView';
import { AtsCheckerPage } from './AtsCheckerPage';
import { Briefcase, Target, Sparkles, CheckCircle2 } from 'lucide-react';

export const JobMatcherPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'findJobs' | 'matchPosting'>('findJobs');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <SeoHead
        title="Find Matching Jobs for Your Resume | Resume Craft"
        description="Discover live verified job listings ranked by match percentage against your resume's skills, experience, and location with verified application links."
        canonicalPath="/job-description-resume-matcher"
      />

      <Breadcrumbs items={[{ name: 'Find Matching Jobs', path: '/job-description-resume-matcher' }]} />

      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-800 text-sm font-extrabold border border-brand-200 shadow-2xs">
          <Sparkles size={16} className="text-brand-600" />
          <span>AI Resume Career Match Suite</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Find Jobs That Match Your Resume
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Analyze your resume against open verified job opportunities. See match scores, breakdown of matched and missing skills, and apply directly via official job listings.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center border-b border-slate-200">
        <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('findJobs')}
            className={`px-5 py-2.5 rounded-lg text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'findJobs'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/60'
            }`}
          >
            <Briefcase size={18} />
            <span>Find Matching Jobs</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('matchPosting')}
            className={`px-5 py-2.5 rounded-lg text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'matchPosting'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/60'
            }`}
          >
            <Target size={18} />
            <span>Match Specific Job Posting</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'findJobs' ? (
        <FindMatchingJobsView />
      ) : (
        <AtsCheckerPage />
      )}
    </div>
  );
};
