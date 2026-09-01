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
  const { atsAnalysis, targetJobDescription, setTargetJobDescription } = useResume();

  if (!isOpen) return null;

  const { overallScore, categoryScores, matchedKeywords, missingKeywords, actionVerbsFound, quantifiableBulletsCount, totalBulletsCount, recommendations } = atsAnalysis;

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
              <h3 className="font-bold text-sm">Real-time ATS Score & Analyzer</h3>
              <p className="text-[11px] text-slate-400">Greenhouse, Workday, Taleo & Lever scanner</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
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
              <span className="text-sm font-bold text-slate-400">/ 100</span>
            </div>
            <div className="text-xs font-semibold text-slate-600 mt-1">
              {overallScore >= 80 ? '🎉 Excellent! Top 5% ATS Compatibility' : overallScore >= 60 ? '⚠️ Good, but requires keyword & metric optimization' : '🚨 High Risk of ATS rejection'}
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
