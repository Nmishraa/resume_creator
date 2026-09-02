import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { SeoHead } from '../components/common/SeoHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FaqAccordion } from '../components/common/FaqAccordion';
import {
  CheckCircle2,
  AlertTriangle,
  Zap,
  Target,
  TrendingUp,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AtsCheckerPage: React.FC = () => {
  const { resume, atsAnalysis, targetJobDescription, setTargetJobDescription, updateResume } = useResume();

  const {
    overallScore,
    categoryScores,
    matchedKeywords,
    missingKeywords,
    actionVerbsFound,
    quantifiableBulletsCount,
    totalBulletsCount,
    recommendations
  } = atsAnalysis;

  const hasResumeContent = Boolean(
    (resume.personalInfo?.fullName && resume.personalInfo.fullName.trim().length > 0) ||
    (resume.experience && resume.experience.length > 0) ||
    (resume.skills && resume.skills.length > 0)
  );
  const hasJobDescription = Boolean(targetJobDescription && targetJobDescription.trim().length > 0);
  const isBothProvided = hasResumeContent && hasJobDescription;

  useEffect(() => {
    if (isBothProvided && overallScore >= 80) {
      confetti({ particleCount: 50, spread: 60 });
    }
  }, [overallScore, isBothProvided]);

  const handleAddMissingKeyword = (kw: string) => {
    if (resume.skills.length > 0) {
      const firstCat = resume.skills[0];
      if (!firstCat.items.includes(kw)) {
        const updatedSkills = resume.skills.map((s, i) =>
          i === 0 ? { ...s, items: [...s.items, kw] } : s
        );
        updateResume({ skills: updatedSkills });
      }
    }
  };

  const scoreBadgeColor =
    overallScore >= 80
      ? 'text-emerald-700 bg-emerald-50 border-emerald-300'
      : overallScore >= 60
      ? 'text-amber-700 bg-amber-50 border-amber-300'
      : 'text-rose-700 bg-rose-50 border-rose-300';

  const atsFaqs = [
    {
      question: 'What is an Applicant Tracking System (ATS)?',
      answer: 'An Applicant Tracking System (ATS) is automated software used by enterprise employers (like Workday, Taleo, Greenhouse, and Lever) to collect, parse, categorize, and rank resumes before a human recruiter reviews them.'
    },
    {
      question: 'How does this free ATS Resume Checker calculate my score?',
      answer: 'Our algorithm evaluates 5 core dimensions: keyword alignment with the target job posting, quantifiable metrics density (Google X-Y-Z formula), action verb strength, formatting layout compatibility, and completeness of contact information.'
    },
    {
      question: 'What is considered a good ATS resume score?',
      answer: 'A score of 80 or higher is considered excellent and significantly increases your chance of passing automated recruiter screeners. Scores between 60–79 need additional keyword alignment, while scores below 60 require formatting and metric revisions.'
    },
    {
      question: 'How can I add missing keywords to my resume?',
      answer: 'In the missing keywords section above, click on any suggested keyword button to automatically add it to your active resume skills list in 1 click.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <SeoHead
        title="Free ATS Resume Checker – Check Your Resume Score | Resume Craft"
        description="Instant 0-100 ATS resume score checker. Compare your resume against any job description, find missing keywords, and fix weak bullet points for free."
        canonicalPath="/ats-resume-checker"
      />

      <Breadcrumbs items={[{ name: 'ATS Resume Checker', path: '/ats-resume-checker' }]} />

      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
          <Zap size={14} className="text-emerald-600" />
          <span>Real-Time ATS Formatting & Keyword Diagnostic • 100% Free</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
          Free ATS Resume Checker
        </h1>
        <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto">
          Scan your resume against any job description to calculate your 0–100 ATS compatibility score, detect missing keywords, and optimize achievements with Google X-Y-Z metrics.
        </p>
      </section>

      {/* Interactive ATS Checker Tool Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Job Description & Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                <Target size={16} className="text-brand-600" />
                <span>Target Job Description</span>
              </div>
              {targetJobDescription && (
                <button
                  onClick={() => setTargetJobDescription('')}
                  className="text-[11px] text-rose-600 hover:underline font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            <textarea
              id="ats-job-description-textarea"
              aria-label="Target Job Description Text"
              rows={8}
              value={targetJobDescription}
              onChange={(e) => setTargetJobDescription(e.target.value)}
              placeholder="Paste job posting or requirements here to calculate keyword match score...&#10;&#10;e.g. Requirements: React, TypeScript, GraphQL, AWS, Distributed Systems, CI/CD..."
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-mono leading-relaxed"
            />

            <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              💡 <strong>Instant Sync:</strong> Match score updates automatically as you paste or type the job description.
            </div>

            <div className="pt-2 border-t border-slate-100">
              <Link
                to="/builder"
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <FileText size={15} />
                <span>Open Active Resume in Builder &rarr;</span>
              </Link>
            </div>
          </div>

          {/* Active Resume Summary Widget */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>Current Resume: {resume.personalInfo.fullName || 'Active Draft'}</span>
              <span className="text-[10px] text-slate-400 font-normal">{resume.experience.length} roles loaded</span>
            </div>
            <div className="text-slate-600 text-[11px]">
              Target Role: <strong className="text-slate-800">{resume.personalInfo.jobTitle || 'Software Engineer'}</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Score Breakdown & Recommendations (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Main Score Hero Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall ATS Score</div>
                <div className="flex items-baseline gap-2 mt-1">
                  {isBothProvided ? (
                    <>
                      <span className={`text-5xl font-black ${overallScore >= 80 ? 'text-emerald-600' : overallScore >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>
                        {overallScore}
                      </span>
                      <span className="text-base font-bold text-slate-400">/ 100</span>
                    </>
                  ) : (
                    <span className="text-2xl font-black text-slate-400 italic">
                      Not calculated yet
                    </span>
                  )}
                </div>
              </div>

              <div className={`p-3 rounded-xl border text-xs font-bold max-w-xs ${isBothProvided ? scoreBadgeColor : 'text-slate-600 bg-slate-100 border-slate-200'}`}>
                {isBothProvided
                  ? (overallScore >= 80 ? '🌟 Highly ATS-Optimized. Ready to submit!' : overallScore >= 60 ? '⚡ Good Baseline. Recommended to add missing keywords.' : '⚠️ Below ATS threshold. Enhance metrics & contact fields.')
                  : '📌 Paste target job description & load resume draft to calculate match score.'
                }
              </div>
            </div>

            {/* Breakdown Category Meters */}
            <div className="space-y-3 pt-1">
              {[
                { label: 'Keyword Matching', score: categoryScores.keywords, detail: `${matchedKeywords.length} matched keywords` },
                { label: 'Google X-Y-Z Metrics', score: categoryScores.quantifiableResults, detail: `${quantifiableBulletsCount} of ${totalBulletsCount} bullets quantified` },
                { label: 'Action Verbs Power', score: categoryScores.actionVerbs, detail: `${actionVerbsFound.length} power verbs` },
                { label: 'Formatting & Layout', score: categoryScores.formatting, detail: 'Single-column vector standard' },
                { label: 'Contact & Completeness', score: categoryScores.completeness, detail: 'Email, phone, location & socials' },
              ].map((cat, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{cat.label}</span>
                    <span className="text-slate-500 font-normal">{cat.detail} — <strong>{cat.score}%</strong></span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${cat.score >= 75 ? 'bg-emerald-500' : cat.score >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                      style={{ width: `${cat.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords Match & Add Section */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                <CheckCircle2 size={15} className="text-emerald-600" />
                <span>Found Keywords in Resume ({matchedKeywords.length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {matchedKeywords.length > 0 ? (
                  matchedKeywords.map((kw, i) => (
                    <span key={i} className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-md font-medium">
                      ✓ {kw}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">No job description keywords matched yet. Paste a job description on the left.</span>
                )}
              </div>
            </div>

            {hasJobDescription && missingKeywords.length > 0 && (
              <div className="pt-3 border-t border-slate-100">
                <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-2">
                  <AlertTriangle size={15} className="text-amber-600" />
                  <span>Missing Keywords from Target Job Description ({missingKeywords.length})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {missingKeywords.map((kw, i) => (
                    <button
                      key={i}
                      onClick={() => handleAddMissingKeyword(kw)}
                      className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded-md font-medium flex items-center gap-1 transition-colors"
                      title="Click to add to your resume skills"
                    >
                      <span>+ {kw}</span>
                      <span className="text-[10px] text-amber-600 font-bold">(Add)</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!hasJobDescription && (
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 leading-relaxed flex items-start gap-2">
                <span className="text-brand-600 text-sm">💡</span>
                <div>
                  <strong className="text-slate-900">Target Keyword Match:</strong> Paste a job posting into the text box on the left to extract specific required skills and identify missing terms.
                </div>
              </div>
            )}
          </div>

          {/* Actionable Recommendations */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <TrendingUp size={16} className="text-purple-600" />
              <span>Step-by-Step ATS Optimization Roadmap</span>
            </div>

            <div className="space-y-2.5">
              {recommendations.map((rec, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border text-xs ${rec.type === 'critical' ? 'bg-rose-50/70 border-rose-200 text-rose-950' : rec.type === 'improvement' ? 'bg-amber-50/70 border-amber-200 text-amber-950' : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'}`}
                >
                  <div className="font-bold mb-0.5">
                    {rec.type === 'critical' && '🚨 Critical: '}
                    {rec.type === 'improvement' && '💡 Recommendation: '}
                    {rec.type === 'positive' && '✅ Strength: '}
                    {rec.title}
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-90">{rec.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </section>

      {/* Educational ATS Guide Content Underneath Tool */}
      <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            How ATS Systems Evaluate Resumes
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Learn common formatting patterns used by ATS systems like Workday, Taleo, and Greenhouse.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Keyword Matching</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Scanners analyze your resume for hard skills, certifications, and technical proficiencies matching the job description with contextual relevance.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Measurable Impact</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Quantified achievements help recruiters quickly understand your impact and make your resume more persuasive—percentages, dollar figures, latency reductions, and team sizes.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Vector PDF Formatting</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clean single-column layouts with selectable vector text reduce the risk of text corruption during automated resume parsing.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqAccordion items={atsFaqs} />

      {/* Internal Navigation Section */}
      <section className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="font-bold text-lg">Enhance Your Resume in the Editor</h3>
          <p className="text-xs text-slate-400">Apply your ATS optimizations directly with our free builder and templates.</p>
        </div>
        <div className="flex flex-wrap gap-2.5 justify-center">
          <Link to="/builder" className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors">
            Open Resume Builder
          </Link>
          <Link to="/resume-examples" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors">
            View Resume Examples
          </Link>
        </div>
      </section>
    </div>
  );
};
