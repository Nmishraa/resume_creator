import React from 'react';
import { useResume } from '../../context/ResumeContext';
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  Target,
  TrendingUp,
  Zap
} from 'lucide-react';

interface AtsScoreDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AtsScoreDrawer: React.FC<AtsScoreDrawerProps> = ({ isOpen, onClose }) => {
  const { atsAnalysis, targetJobDescription, setTargetJobDescription } = useResume();

  if (!isOpen) return null;

  const { overallScore, categoryScores, matchedKeywords, missingKeywords, actionVerbsFound, quantifiableBulletsCount, totalBulletsCount, recommendations } = atsAnalysis;

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
              <p className="text-xs text-slate-300">Structure &amp; keyword compatibility analyzer</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            aria-label="Close ATS Score Drawer"
            className="p-1 text-slate-400 hover:text-white rounded-lg focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          
          {/* Main Score Gauge */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
            <div className="inline-flex items-baseline gap-1">
              <span className={`text-4xl font-black ${overallScore >= 80 ? 'text-emerald-600' : overallScore >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>
                {overallScore}
              </span>
              <span className="text-sm font-bold text-slate-500">/ 100</span>
            </div>
            <div className="text-xs font-bold text-slate-700 mt-1">
              {overallScore >= 80 ? '🎉 Excellent! High ATS Format Compatibility' : overallScore >= 60 ? '⚠️ Good, but requires keyword & metric optimization' : '🚨 High Risk of ATS rejection'}
            </div>

            {/* Formula Explanation Callout */}
            <div className="mt-3 p-3 bg-blue-50/90 border border-blue-200 rounded-xl text-xs text-blue-950 text-left space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-blue-950">
                <Info size={14} className="text-blue-600 shrink-0" />
                <span>How this score is calculated:</span>
              </div>
              <p className="leading-relaxed opacity-95">
                Formula: Contact Completeness (20%), X-Y-Z Metrics (25%), Action Power Verbs (20%), Keyword Density (25%), and Single-Column Layout (10%).
              </p>
              <div className="text-xs text-blue-800 italic border-t border-blue-200/80 pt-1.5 mt-1 font-medium">
                * Note: This score is an optimization proxy designed for ATS compatibility, not an employer&apos;s proprietary ATS result.
              </div>
            </div>

            {/* Category Bars */}
            <div className="grid grid-cols-2 gap-2 mt-4 text-left text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="text-slate-700 text-xs font-bold uppercase">Keywords Match</div>
                <div className="font-extrabold text-slate-950 text-sm mt-0.5">{categoryScores.keywords}%</div>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="text-slate-700 text-xs font-bold uppercase">Google X-Y-Z Metrics</div>
                <div className="font-extrabold text-slate-950 text-sm mt-0.5">{quantifiableBulletsCount}/{totalBulletsCount} Bullets ({categoryScores.quantifiableResults}%)</div>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="text-slate-700 text-xs font-bold uppercase">Action Verbs</div>
                <div className="font-extrabold text-slate-950 text-sm mt-0.5">{actionVerbsFound.length} Power Verbs ({categoryScores.actionVerbs}%)</div>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="text-slate-700 text-xs font-bold uppercase">Layout &amp; Readability</div>
                <div className="font-extrabold text-slate-950 text-sm mt-0.5">{categoryScores.formatting}%</div>
              </div>
            </div>
          </div>

          {/* Target Job Description Matcher */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1.5">
              <Target size={15} className="text-brand-600" />
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
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span>Matched Skills ({matchedKeywords.length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {matchedKeywords.map((kw, i) => (
                  <span key={i} className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md font-semibold">
                    ✓ {kw}
                  </span>
                ))}
              </div>
            </div>

            {missingKeywords.length > 0 && (
              <div>
                <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5 mb-1.5">
                  <AlertTriangle size={14} className="text-amber-600" />
                  <span>Missing Recommended Keywords ({missingKeywords.length})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {missingKeywords.map((kw, i) => (
                    <span key={i} className="text-xs bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-md font-semibold">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actionable Recommendations */}
          <div>
            <div className="text-xs font-bold text-slate-950 mb-2 flex items-center gap-1.5">
              <TrendingUp size={15} className="text-purple-600" />
              <span>Recommended Improvements</span>
            </div>
            <div className="space-y-2">
              {recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border text-xs ${rec.type === 'critical' ? 'bg-rose-50 border-rose-200 text-rose-950' : rec.type === 'improvement' ? 'bg-amber-50 border-amber-200 text-amber-950' : 'bg-emerald-50 border-emerald-200 text-emerald-950'}`}
                >
                  <div className="font-bold mb-1 flex items-center gap-1 text-xs">
                    {rec.type === 'critical' && <span className="text-rose-600">🚨 Critical:</span>}
                    {rec.type === 'improvement' && <span className="text-amber-600">💡 Suggestion:</span>}
                    {rec.type === 'positive' && <span className="text-emerald-600">✅ Strength:</span>}
                    {rec.title}
                  </div>
                  <p className="text-xs leading-relaxed opacity-95">{rec.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            aria-label="Close ATS Score Drawer"
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
