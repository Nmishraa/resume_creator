import React from 'react';
import { useResume } from '../../context/ResumeContext';
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  Target,
  Sparkles,
  TrendingUp,
  FileCheck,
  Zap
} from 'lucide-react';

interface AtsScoreDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AtsScoreDrawer: React.FC<AtsScoreDrawerProps> = ({ isOpen, onClose }) => {
  const { resume, atsAnalysis, targetJobDescription, setTargetJobDescription, loadSampleResume } = useResume();

  if (!isOpen) return null;

  const { overallScore, categoryScores, matchedKeywords, missingKeywords, actionVerbsFound, quantifiableBulletsCount, totalBulletsCount, recommendations } = atsAnalysis;

  const hasResumeContent = Boolean(
    (resume.personalInfo?.fullName && resume.personalInfo.fullName.trim().length > 0) ||
    (resume.summary && resume.summary.trim().length > 0) ||
    (resume.experience && resume.experience.length > 0) ||
    (resume.skills && resume.skills.length > 0)
  );

  const scoreBadgeColor = overallScore >= 80 ? 'text-emerald-600 bg-emerald-50 border-emerald-300' : overallScore >= 60 ? 'text-amber-600 bg-amber-50 border-amber-300' : 'text-rose-600 bg-rose-50 border-rose-300';

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-brand-500/20 rounded-lg text-brand-400">
              <Zap size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm">ATS Optimization Score &amp; Analyzer</h3>
              <p className="text-[11px] text-slate-400">Structure &amp; keyword compatibility analyzer</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          
          {!hasResumeContent ? (
            /* Clean Empty State Card */
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-brand-600 flex items-center justify-center mx-auto shadow-2xs">
                <FileCheck size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-slate-900">Upload your resume to calculate your ATS score</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fill in your details in the builder or upload an existing PDF/DOCX file to analyze formatting, keyword density, and Google X-Y-Z metrics.
                </p>
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  Enter Details in Builder
                </button>
                <button
                  onClick={() => {
                    loadSampleResume();
                  }}
                  className="w-full py-2.5 bg-white hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold border border-slate-250 transition-colors cursor-pointer"
                >
                  Load Sample Resume
                </button>
              </div>
            </div>
          ) : (
            /* Real ATS Results when resume content exists */
            <>
              {/* Main Score Gauge */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                <div className="inline-flex items-baseline gap-1">
                  <span className={`text-4xl font-black ${overallScore >= 80 ? 'text-emerald-600' : overallScore >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>
                    {overallScore}
                  </span>
                  <span className="text-sm font-bold text-slate-400">/ 100</span>
                </div>
                <div className="text-xs font-semibold text-slate-600 mt-1">
                  {overallScore >= 80 ? '🎉 Excellent! High ATS Format Compatibility' : overallScore >= 60 ? '⚠️ Good, but requires keyword & metric optimization' : '🚨 High Risk of ATS rejection'}
                </div>

                {/* Formula Explanation Callout */}
                <div className="mt-3 p-2.5 bg-blue-50/80 border border-blue-200/80 rounded-xl text-[11px] text-blue-900 text-left space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-blue-950">
                    <Info size={13} className="text-blue-600 shrink-0" />
                    <span>How this score is calculated:</span>
                  </div>
                  <p className="leading-relaxed opacity-90">
                    Formula: Contact Completeness (20%), X-Y-Z Metrics (25%), Action Power Verbs (20%), Keyword Density (25%), and Single-Column Layout (10%).
                  </p>
                  <div className="text-[10px] text-blue-700 italic border-t border-blue-200/60 pt-1 mt-1">
                    * Note: This score is an optimization proxy designed for ATS compatibility, not an employer&apos;s proprietary ATS result.
                  </div>
                </div>

                {/* Category Bars */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-left text-xs">
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <div className="text-slate-500 text-[10px] font-bold uppercase">Keywords Match</div>
                    <div className="font-bold text-slate-900">{categoryScores.keywords}%</div>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <div className="text-slate-500 text-[10px] font-bold uppercase">Google X-Y-Z Metrics</div>
                    <div className="font-bold text-slate-900">{quantifiableBulletsCount}/{totalBulletsCount} Bullets ({categoryScores.quantifiableResults}%)</div>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <div className="text-slate-500 text-[10px] font-bold uppercase">Action Verbs</div>
                    <div className="font-bold text-slate-900">{actionVerbsFound.length} Power Verbs ({categoryScores.actionVerbs}%)</div>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <div className="text-slate-500 text-[10px] font-bold uppercase">Layout & Readability</div>
                    <div className="font-bold text-slate-900">{categoryScores.formatting}%</div>
                  </div>
                </div>
              </div>

              {/* Target Job Description Matcher */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1.5">
                  <Target size={14} className="text-brand-600" />
                  <span>Target Job Description (Optional)</span>
                </div>
                <textarea
                  rows={3}
                  value={targetJobDescription}
                  onChange={(e) => setTargetJobDescription(e.target.value)}
                  placeholder="Paste job posting text here to scan specific role keywords..."
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              {/* Matched & Missing Keywords */}
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-1.5">
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    <span>Matched Skills ({matchedKeywords.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {matchedKeywords.map((kw, i) => (
                      <span key={i} className="text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md font-medium">
                        ✓ {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {missingKeywords.length > 0 && (
                  <div>
                    <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5 mb-1.5">
                      <AlertTriangle size={13} className="text-amber-600" />
                      <span>Missing Recommended Keywords ({missingKeywords.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {missingKeywords.map((kw, i) => (
                        <span key={i} className="text-[11px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md font-medium">
                          + {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actionable Recommendations */}
              <div>
                <div className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <TrendingUp size={14} className="text-purple-600" />
                  <span>Recommended Improvements</span>
                </div>
                <div className="space-y-2">
                  {recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-xs ${rec.type === 'critical' ? 'bg-rose-50 border-rose-200 text-rose-950' : rec.type === 'improvement' ? 'bg-amber-50 border-amber-200 text-amber-950' : 'bg-emerald-50 border-emerald-200 text-emerald-950'}`}
                    >
                      <div className="font-bold mb-0.5 flex items-center gap-1">
                        {rec.type === 'critical' && <span className="text-rose-600">🚨 Critical:</span>}
                        {rec.type === 'improvement' && <span className="text-amber-600">💡 Suggestion:</span>}
                        {rec.type === 'positive' && <span className="text-emerald-600">✅ Strength:</span>}
                        {rec.title}
                      </div>
                      <p className="text-[11px] leading-relaxed opacity-90">{rec.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
