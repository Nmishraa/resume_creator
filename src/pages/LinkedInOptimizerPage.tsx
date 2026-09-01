import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { generateLinkedInOptimization } from '../services/aiService';
import { Sparkles, Copy, Check } from 'lucide-react';

export const LinkedInOptimizerPage: React.FC = () => {
  const { resume } = useResume();
  const [data, setData] = useState(() => generateLinkedInOptimization(resume));
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleRegenerate = () => {
    setData(generateLinkedInOptimization(resume));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
          <span>Profile SEO &amp; Recruiter Visibility</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-950">
          LinkedIn Headline &amp; Bio Generator
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Optimize your LinkedIn profile to rank higher in recruiter searches with keyword-packed headlines and summary copy.
        </p>
      </div>

      {/* Headlines Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Sparkles size={16} className="text-brand-600" />
            <span>High-Ranking Headline Options (120-220 characters)</span>
          </h2>
          <button
            onClick={handleRegenerate}
            className="text-xs font-bold text-brand-600 hover:text-brand-800"
          >
            Regenerate
          </button>
        </div>

        <div className="space-y-3">
          {data.headlines.map((headline: string, idx: number) => (
            <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between gap-3 text-xs">
              <p className="text-slate-800 font-medium leading-relaxed">{headline}</p>
              <button
                onClick={() => handleCopy(headline, `h-${idx}`)}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-lg shrink-0 flex items-center gap-1 shadow-2xs transition-colors"
              >
                {copiedIndex === `h-${idx}` ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                <span>{copiedIndex === `h-${idx}` ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* About Section Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-sm text-slate-900">
            LinkedIn "About / Summary" Story
          </h2>
          <button
            onClick={() => handleCopy(data.about, 'about')}
            className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow"
          >
            {copiedIndex === 'about' ? <Check size={13} /> : <Copy size={13} />}
            <span>{copiedIndex === 'about' ? 'Copied About Section!' : 'Copy Summary'}</span>
          </button>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 whitespace-pre-line leading-relaxed font-sans">
          {data.about}
        </div>
      </div>

    </div>
  );
};
