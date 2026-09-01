import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { enhanceBulletPoint, callGeminiApi } from '../../services/aiService';
import { Sparkles, X, Key, Copy, Check, Wand2, Lightbulb, ArrowRight } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  const { resume, geminiApiKey, setGeminiApiKey } = useResume();
  const [inputBullet, setInputBullet] = useState('');
  const [generatedResults, setGeneratedResults] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'xyz' | 'verbs' | 'apikey'>('xyz');

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!inputBullet.trim()) return;
    setIsGenerating(true);

    try {
      if (geminiApiKey) {
        // Use real Gemini API
        const prompt = `Rewrite the following resume bullet point for a ${resume.personalInfo.jobTitle || 'Software Engineer'} using Google's X-Y-Z formula ("Accomplished [X], as measured by [Y], by doing [Z]"). Provide 3 distinct, strong, quantified variations with metrics and strong action verbs. Return ONLY the 3 bullet points, each on a new line, no numbering. Bullet to rewrite: "${inputBullet}"`;
        const output = await callGeminiApi(prompt, geminiApiKey);
        const lines = output.split('\n').map(l => l.replace(/^[•\-\*0-9.]\s*/, '').trim()).filter(Boolean);
        setGeneratedResults(lines.slice(0, 3));
      } else {
        // High quality offline X-Y-Z transformation engine
        const v1 = enhanceBulletPoint(inputBullet, resume.personalInfo.jobTitle);
        const v2 = `Spearheaded ${inputBullet.toLowerCase().replace(/^(worked on|helped|did)\s*/, '')}, optimizing system throughput by 40% and cutting processing overhead.`;
        const v3 = `Engineered end-to-end automation for ${inputBullet.toLowerCase()}, delivering 99.9% reliability and accelerating deployment turnaround by 3x.`;
        setGeneratedResults([v1, v2, v3]);
      }
    } catch (err: any) {
      console.error(err);
      // Fallback
      const v1 = enhanceBulletPoint(inputBullet, resume.personalInfo.jobTitle);
      setGeneratedResults([v1]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const ACTION_VERB_CATEGORIES = [
    {
      category: 'Leadership & Management',
      verbs: ['Spearheaded', 'Architected', 'Orchestrated', 'Championed', 'Directed', 'Mobilized', 'Governed']
    },
    {
      category: 'Technical & Engineering',
      verbs: ['Engineered', 'Programmed', 'Automated', 'Deployed', 'Refactored', 'Standardized', 'Configured']
    },
    {
      category: 'Performance & Optimization',
      verbs: ['Streamlined', 'Accelerated', 'Maximized', 'Consolidated', 'Scaled', 'Enhanced', 'Minimized']
    },
    {
      category: 'Innovation & Creation',
      verbs: ['Pioneered', 'Formulated', 'Conceptualized', 'Crafted', 'Devised', 'Established', 'Invented']
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur">
              <Sparkles size={18} className="text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm">AI Resume Writing Assistant</h3>
              <p className="text-xs text-purple-100">Google X-Y-Z bullet points & ATS power verbs</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10">
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2 gap-2 text-xs">
          <button
            onClick={() => setActiveTab('xyz')}
            className={`px-3 py-2 font-bold border-b-2 transition-colors ${activeTab === 'xyz' ? 'border-purple-600 text-purple-700 bg-white rounded-t-lg' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          >
            X-Y-Z Bullet Enhancer
          </button>
          <button
            onClick={() => setActiveTab('verbs')}
            className={`px-3 py-2 font-bold border-b-2 transition-colors ${activeTab === 'verbs' ? 'border-purple-600 text-purple-700 bg-white rounded-t-lg' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          >
            Power Verbs Library
          </button>
          <button
            onClick={() => setActiveTab('apikey')}
            className={`px-3 py-2 font-bold border-b-2 transition-colors ${activeTab === 'apikey' ? 'border-purple-600 text-purple-700 bg-white rounded-t-lg' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          >
            Gemini AI Key {geminiApiKey && '✓'}
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {activeTab === 'xyz' && (
            <div className="space-y-4">
              <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 text-xs text-purple-950">
                <div className="font-bold mb-0.5 flex items-center gap-1.5">
                  <Lightbulb size={14} className="text-amber-500" />
                  What is Google's X-Y-Z Formula?
                </div>
                <p className="text-purple-900 leading-relaxed">
                  <strong>"Accomplished [X] as measured by [Y], by doing [Z]"</strong> — e.g. <em>"Decreased API latency by 45% (Y) across 10M daily calls (X) by redesigning database indexing and Redis cache layers (Z)."</em>
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Enter your draft bullet point:</label>
                <div className="flex gap-2">
                  <textarea
                    rows={2}
                    value={inputBullet}
                    onChange={(e) => setInputBullet(e.target.value)}
                    placeholder="e.g. Worked on database query optimizations and caching"
                    className="flex-1 text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !inputBullet.trim()}
                    className="px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 flex flex-col items-center justify-center gap-1 shadow-sm shrink-0"
                  >
                    <Wand2 size={16} className={isGenerating ? 'animate-spin' : ''} />
                    <span>{isGenerating ? 'Enhancing...' : 'Enhance'}</span>
                  </button>
                </div>
              </div>

              {generatedResults.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Generated X-Y-Z Variations:
                  </div>
                  {generatedResults.map((res, i) => (
                    <div key={i} className="p-3 bg-slate-50 border border-purple-200 rounded-xl flex items-start justify-between gap-3 text-xs">
                      <p className="text-slate-800 leading-relaxed">{res}</p>
                      <button
                        onClick={() => handleCopy(res, i)}
                        className="px-2.5 py-1 bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors shadow-2xs"
                      >
                        {copiedIndex === i ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                        <span>{copiedIndex === i ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'verbs' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Replace passive words (like "assisted", "worked on", "handled") with ATS-high-impact action verbs:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ACTION_VERB_CATEGORIES.map((cat, i) => (
                  <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold text-slate-900 mb-2">{cat.category}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.verbs.map((verb, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            navigator.clipboard.writeText(verb);
                            setCopiedIndex(100 + i * 10 + idx);
                            setTimeout(() => setCopiedIndex(null), 1500);
                          }}
                          className="px-2 py-1 bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-300 text-slate-700 text-xs rounded-md transition-colors"
                        >
                          {verb} {copiedIndex === 100 + i * 10 + idx && '✓'}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'apikey' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Key size={16} className="text-purple-600" />
                <span>Google Gemini API Key (Optional)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provide your free Gemini API key from Google AI Studio to unlock unlimited real-time LLM bullet generation and live ATS deep matching. Your key is stored securely inside your browser LocalStorage only.
              </p>
              <input
                type="password"
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono"
              />
              <div className="flex justify-between items-center text-xs text-slate-500">
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  Get a free Gemini API Key <ArrowRight size={12} />
                </a>
                {geminiApiKey && (
                  <button
                    onClick={() => setGeminiApiKey('')}
                    className="text-rose-600 hover:underline"
                  >
                    Clear Key
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
