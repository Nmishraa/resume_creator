import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Link } from 'react-router-dom';
import {
  Share2,
  Copy,
  Check,
  ExternalLink,
  Globe,
  Mail,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SharePortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SharePortfolioModal: React.FC<SharePortfolioModalProps> = ({ isOpen, onClose }) => {
  const { resume } = useResume();
  const [copied, setCopied] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  if (!isOpen) return null;

  const userSlug = resume.personalInfo.fullName
    ? resume.personalInfo.fullName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')
    : 'alex-morgan';

  const portfolioUrl = `${window.location.origin}/p/${userSlug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    confetti({ particleCount: 30, spread: 50 });
    setTimeout(() => setCopied(false), 2500);
  };

  const shareText = `Check out my interactive public web resume portfolio: ${portfolioUrl}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-6 shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <Globe size={18} />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-950">Free Public Web Portfolio Link</h3>
              <p className="text-[11px] text-slate-500">Share on LinkedIn, email signatures, or GitHub</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 font-bold text-sm w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Link Status & Copy Input Box */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isPublic ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
              <span>{isPublic ? 'Public Web Link Active' : 'Private Draft Mode'}</span>
            </span>
            <button
              onClick={() => setIsPublic(!isPublic)}
              className="text-[11px] text-brand-600 hover:underline cursor-pointer"
            >
              Toggle Privacy
            </button>
          </div>

          <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl">
            <input
              type="text"
              readOnly
              value={portfolioUrl}
              className="w-full text-xs font-mono bg-transparent text-slate-800 outline-none select-all px-1"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-extrabold transition-all flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <Link
            to={`/p/${userSlug}`}
            target="_blank"
            onClick={onClose}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Preview Interactive Digital Profile</span>
            <ExternalLink size={14} />
          </Link>
        </div>

        {/* Social Share Shortcuts */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Share</div>
          <div className="flex gap-2">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portfolioUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2 bg-[#0A66C2] hover:bg-[#084e96] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>LinkedIn</span>
            </a>

            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2 bg-[#1DA1F2] hover:bg-[#0c85d0] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Twitter / X</span>
            </a>

            <a
              href={`mailto:?subject=${encodeURIComponent(`Web Resume Portfolio – ${userSlug}`)}&body=${encodeURIComponent(shareText)}`}
              className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Mail size={14} />
              <span>Email</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
