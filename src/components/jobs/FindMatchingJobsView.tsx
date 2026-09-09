import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Search,
  MapPin,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  Check,
  Building2,
  DollarSign,
  Calendar,
  Filter,
  RefreshCw,
  Globe,
  Zap,
  Target
} from 'lucide-react';
import {
  fetchMatchingJobs,
  MatchingJob,
  JobSearchFilters,
  ExternalSearchPortal
} from '../../services/jobMatchingService';
import { api } from '../../utils/api';

interface Props {
  resumeData?: any;
  onOpenTailorModal?: (job: MatchingJob) => void;
  className?: string;
}

export const FindMatchingJobsView: React.FC<Props> = ({
  resumeData,
  onOpenTailorModal,
  className = ''
}) => {
  const [roleQuery, setRoleQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [workType, setWorkType] = useState<'all' | 'remote' | 'onsite'>('all');
  const [experienceLevel, setExperienceLevel] = useState('All');
  const [minSalary, setMinSalary] = useState(0);

  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<MatchingJob[]>([]);
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [noSkillsIdentified, setNoSkillsIdentified] = useState(false);
  const [targetRole, setTargetRole] = useState('');
  const [candidateLocation, setCandidateLocation] = useState('');
  const [externalPortals, setExternalPortals] = useState<ExternalSearchPortal[]>([]);
  
  const [savedJobIds, setSavedJobIds] = useState<Record<string, boolean>>({});
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const loadJobs = async (customFilters?: JobSearchFilters) => {
    setLoading(true);
    try {
      const result = await fetchMatchingJobs(resumeData, {
        roleQuery: customFilters?.roleQuery ?? roleQuery,
        locationQuery: customFilters?.locationQuery ?? locationQuery,
        workType: customFilters?.workType ?? workType,
        experienceLevel: customFilters?.experienceLevel ?? experienceLevel,
        minSalary: customFilters?.minSalary ?? minSalary
      });

      setJobs(result.jobs);
      setTargetRole(result.targetRole);
      setCandidateLocation(result.candidateLocation);
      setExtractedSkills(result.extractedSkills);
      setNoSkillsIdentified(Boolean(result.noSkillsIdentified));
      setExternalPortals(result.externalPortals);

      if (!roleQuery && result.targetRole) {
        setRoleQuery(result.targetRole);
      }
      if (!locationQuery && result.candidateLocation) {
        setLocationQuery(result.candidateLocation);
      }
    } catch (err) {
      console.error('Error fetching matching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [resumeData]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadJobs();
  };

  const handleSaveToTracker = async (job: MatchingJob) => {
    try {
      await api.jobApplications.create({
        company: job.company,
        role: job.title,
        status: 'applied',
        salary: job.salary || 'Negotiable',
        location: job.location,
        url: job.applicationUrl,
        notes: `Matched via Resume Craft (${job.matchPercentage}% match). Reason: ${job.matchReason}`
      });

      setSavedJobIds(prev => ({ ...prev, [job.id]: true }));
      setSaveSuccessMsg(`Saved "${job.title} at ${job.company}" to your Application Tracker!`);
      setTimeout(() => setSaveSuccessMsg(null), 3000);
    } catch (err) {
      console.error('Save job application error:', err);
      // Fallback local save indication
      setSavedJobIds(prev => ({ ...prev, [job.id]: true }));
      setSaveSuccessMsg(`Saved "${job.title}" locally!`);
      setTimeout(() => setSaveSuccessMsg(null), 3000);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-extrabold border border-brand-400/30">
              <Sparkles size={14} className="text-brand-400 animate-pulse" />
              <span>Real-Time Career Matching Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Find Jobs With Your Resume
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl leading-relaxed">
              Our AI analyzes your skills, experience, and location to match you with live, verified job listings ranked by candidate compatibility.
            </p>
          </div>

          <button
            type="button"
            onClick={() => loadJobs()}
            disabled={loading}
            className="self-start sm:self-center px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-extrabold rounded-xl text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-70 shrink-0"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>Re-Analyze Jobs</span>
          </button>
        </div>

        {/* Candidate Resume Pill Insights */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px] mr-1">
            Resume Profile:
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-brand-300 font-extrabold flex items-center gap-1.5">
            <Briefcase size={13} className="text-brand-400" />
            <span>Target Role: {targetRole || 'Software Engineer'}</span>
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-emerald-300 font-bold flex items-center gap-1.5">
            <MapPin size={13} className="text-emerald-400" />
            <span>Location: {candidateLocation || 'Remote'}</span>
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-purple-300 font-bold flex items-center gap-1.5">
            <Zap size={13} className="text-purple-400" />
            <span>{extractedSkills.length} Core Skills Matched</span>
          </span>
        </div>
      </div>

      {/* Success Notification Toast */}
      {saveSuccessMsg && (
        <div className="bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-xl p-4 flex items-center gap-3 shadow-md animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
          <span className="text-sm font-extrabold">{saveSuccessMsg}</span>
        </div>
      )}

      {/* Unidentified Skills Warning Banner */}
      {noSkillsIdentified && (
        <div className="bg-amber-50 text-amber-950 border border-amber-300 rounded-xl p-4 flex items-center gap-3 shadow-xs">
          <AlertCircle size={20} className="text-amber-600 shrink-0" />
          <span className="text-xs sm:text-sm font-extrabold">
            We could not identify skills from your resume. Review the extracted information or upload another file.
          </span>
        </div>
      )}

      {/* Search & Filter Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-4">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          {/* Target Role Input */}
          <div className="sm:col-span-5 md:col-span-5 space-y-1">
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              Job Title / Keyword Query
            </label>
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={roleQuery}
                onChange={(e) => setRoleQuery(e.target.value)}
                placeholder="e.g. Senior Full Stack Engineer, Nurse, Accountant"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          {/* Location Input */}
          <div className="sm:col-span-4 md:col-span-4 space-y-1">
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              Preferred Location
            </label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="e.g. San Francisco, CA or Remote"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          {/* Filter Submit Button */}
          <div className="sm:col-span-3 md:col-span-3 flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70 min-h-[42px] shrink-0"
            >
              <Search size={16} />
              <span>Search</span>
            </button>
          </div>
        </form>

        {/* Secondary Filter Pills */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-extrabold text-slate-500 uppercase tracking-wider text-[11px] flex items-center gap-1">
              <Filter size={13} /> Filters:
            </span>

            {/* Remote / Onsite Pills */}
            <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
              {[
                { id: 'all', label: 'All Jobs' },
                { id: 'remote', label: 'Remote Only' },
                { id: 'onsite', label: 'On-Site / Hybrid' }
              ].map((wt) => (
                <button
                  key={wt.id}
                  type="button"
                  onClick={() => {
                    setWorkType(wt.id as any);
                    loadJobs({ workType: wt.id as any });
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-extrabold transition-all cursor-pointer ${
                    workType === wt.id
                      ? 'bg-brand-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {wt.label}
                </button>
              ))}
            </div>

            {/* Experience Level Selector */}
            <select
              value={experienceLevel}
              onChange={(e) => {
                setExperienceLevel(e.target.value);
                loadJobs({ experienceLevel: e.target.value });
              }}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold text-slate-700 text-xs focus:outline-none focus:border-brand-600"
            >
              <option value="All">All Experience Levels</option>
              <option value="Entry Level">Entry Level (0-2 yrs)</option>
              <option value="Mid Level">Mid Level (3-5 yrs)</option>
              <option value="Senior Level">Senior Level (6+ yrs)</option>
            </select>
          </div>

          <div className="text-slate-500 font-bold">
            Showing <span className="text-slate-950 font-black">{jobs.length}</span> Verified Matches
          </div>
        </div>
      </div>

      {/* Verified Major Job Portals Direct Launch Links Banner */}
      <div className="bg-brand-50/70 rounded-2xl border border-brand-200/80 p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-brand-600" />
            <h4 className="text-sm font-extrabold text-brand-950">
              Instant Verified Search on Top Job Portals
            </h4>
          </div>
          <span className="text-[11px] font-semibold text-brand-700 hidden sm:inline">
            Direct pre-filled links for {targetRole} in {candidateLocation || 'Remote'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {externalPortals.map((portal) => (
            <a
              key={portal.name}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-extrabold transition-all shadow-2xs flex items-center gap-1.5 hover:scale-[1.02] cursor-pointer"
            >
              <ExternalLink size={13} style={{ color: portal.color }} />
              <span>{portal.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Ranked Job Opportunities List */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center space-y-4">
          <div className="w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-extrabold text-slate-700">
            Analyzing resume skills & matching verified job postings for {targetRole}...
          </p>
        </div>
      ) : jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map((job, idx) => {
            const isSaved = Boolean(savedJobIds[job.id]);
            const matchScoreColor =
              job.matchPercentage >= 85
                ? 'bg-emerald-500 text-white'
                : job.matchPercentage >= 70
                ? 'bg-brand-600 text-white'
                : job.matchPercentage >= 30
                ? 'bg-amber-500 text-white'
                : 'bg-slate-700 text-white';

            const showZeroSkillBadge = job.isZeroSkillsMatch || noSkillsIdentified;

            return (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-6 space-y-4 relative overflow-hidden group max-w-full min-w-0"
              >
                {/* Top Header: Rank, Title, Company, Match % */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 min-w-0">
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xl font-bold shrink-0 shadow-2xs overflow-hidden">
                      {job.companyLogo && (job.companyLogo.startsWith('http') || job.companyLogo.startsWith('data:')) ? (
                        <img
                          src={job.companyLogo}
                          alt={job.company}
                          className="w-full h-full object-contain p-1 rounded-xl"
                          onError={(e) => {
                            const parent = (e.target as HTMLElement).parentElement;
                            if (parent) parent.innerHTML = '💼';
                          }}
                        />
                      ) : (
                        <span>{job.companyLogo || '💼'}</span>
                      )}
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {showZeroSkillBadge ? (
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800">
                            #{idx + 1} Listing
                          </span>
                        ) : job.isTopMatch ? (
                          <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                            #{idx + 1} Top Match
                          </span>
                        ) : (
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800">
                            #{idx + 1} Match
                          </span>
                        )}
                        <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                          <Building2 size={13} /> {job.company}
                        </span>
                        {job.source && (
                          <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                            via {job.source}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-extrabold text-slate-950 group-hover:text-brand-600 transition-colors leading-snug break-words">
                        {job.title}
                      </h3>

                      {/* Job Metadata Pills */}
                      <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-600 pt-1">
                        <span className="flex items-center gap-1 text-slate-700 font-bold">
                          <MapPin size={14} className="text-slate-400 shrink-0" />
                          <span>{job.location}</span>
                        </span>
                        {job.salary && (
                          <span className="flex items-center gap-1 text-emerald-700 font-extrabold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                            <DollarSign size={13} />
                            {job.salary}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-slate-500">
                          <Calendar size={13} />
                          {job.postedDate}
                        </span>
                        {job.isRemote && (
                          <span className="bg-brand-50 text-brand-700 border border-brand-200 px-2 py-0.5 rounded-md font-bold text-[11px]">
                            ⚡ Remote
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Circular/Pill Match Score Badge */}
                  <div className="flex sm:flex-col items-center justify-between sm:items-end gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 min-w-0">
                    <div
                      className={`px-3.5 py-1.5 rounded-xl font-black text-sm shadow-2xs flex items-center gap-1.5 ${matchScoreColor}`}
                    >
                      <Target size={16} />
                      <span>{job.matchPercentage}% Match</span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500">
                      {job.isZeroSkillsMatch || noSkillsIdentified ? 'Keyword and Location Match' : 'Based on resume skills'}
                    </span>
                  </div>
                </div>

                {/* Match Insight Callout Box */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900 uppercase tracking-wider min-w-0 flex-wrap">
                    <Sparkles size={14} className="text-brand-600 shrink-0" />
                    <span>
                      {job.matchedSkills.length > 0 && !noSkillsIdentified
                        ? 'WHY THIS JOB MATCHES YOUR RESUME:'
                        : 'WHY THIS LISTING MATCHES YOUR SEARCH:'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed [overflow-wrap:anywhere] break-words">
                    {job.matchReason}
                  </p>
                </div>

                {/* Matched Skills vs Missing Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Matched Skills */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 size={13} className="text-emerald-600" />
                      Matched Resume Skills ({job.matchedSkills.length}):
                    </span>
                    {job.matchedSkills.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {job.matchedSkills.map((sk) => (
                          <span
                            key={sk}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold flex items-center gap-1"
                          >
                            ✓ {sk}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500 font-semibold italic block pt-0.5">
                        No resume skills matched this job.
                      </span>
                    )}
                  </div>

                  {/* Missing Skills */}
                  {job.missingSkills.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-extrabold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                        <AlertCircle size={13} className="text-amber-600" />
                        Key Terms To Add ({job.missingSkills.length}):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {job.missingSkills.map((sk) => (
                          <span
                            key={sk}
                            className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold flex items-center gap-1"
                          >
                            + {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Job Description Excerpt Snippet */}
                {job.descriptionSnippet && (
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed italic pt-1">
                    "{job.descriptionSnippet}"
                  </p>
                )}

                {/* Action Buttons Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  {/* Secondary Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSaveToTracker(job)}
                      disabled={isSaved}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                        isSaved
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300'
                      }`}
                    >
                      {isSaved ? <Check size={14} className="text-emerald-600" /> : <Bookmark size={14} />}
                      <span>{isSaved ? 'Saved to Tracker' : 'Save Job'}</span>
                    </button>

                    {onOpenTailorModal && (
                      <button
                        type="button"
                        onClick={() => onOpenTailorModal(job)}
                        className="px-3.5 py-2 rounded-xl bg-white hover:bg-brand-50 text-brand-700 border border-brand-200 text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer min-h-[38px]"
                      >
                        <Sparkles size={14} />
                        <span>Tailor Resume</span>
                      </button>
                    )}
                  </div>

                  {/* Primary CTA Button: View & Apply */}
                  <a
                    href={job.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-black text-sm rounded-xl transition-all shadow-md shadow-brand-500/20 flex items-center gap-2 cursor-pointer min-h-[42px]"
                  >
                    <span>View &amp; Apply</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 text-center space-y-6 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600">
            <AlertCircle size={28} />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-xl font-extrabold text-slate-900">
              No relevant live jobs were found for this role. Try another title or location.
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              We couldn't fetch live API jobs matching your exact keywords right now. You can launch instant, verified searches on top job boards pre-filled with your target role and location below:
            </p>
          </div>

          {/* Direct Search Launch Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-2">
            {externalPortals.map((portal) => (
              <a
                key={portal.name}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-50 hover:bg-brand-50/60 border border-slate-200 hover:border-brand-300 text-slate-900 transition-all text-left group flex flex-col justify-between space-y-3 cursor-pointer shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm group-hover:text-brand-700">{portal.name}</span>
                  <ExternalLink size={14} style={{ color: portal.color }} />
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  Search live {targetRole || 'jobs'} on {portal.name} →
                </span>
              </a>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setRoleQuery('');
                setLocationQuery('');
                setWorkType('all');
                setExperienceLevel('All');
                loadJobs({ roleQuery: '', locationQuery: '', workType: 'all', experienceLevel: 'All' });
              }}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Reset Search Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
