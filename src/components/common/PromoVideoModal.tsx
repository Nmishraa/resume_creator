import React from 'react';
import { X, Play, Sparkles } from 'lucide-react';

interface PromoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromoVideoModal: React.FC<PromoVideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-brand-500/20 rounded-xl border border-brand-500/30">
              <Sparkles size={18} className="text-brand-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">Resume Craft — Quick Video Tour</h3>
              <p className="text-xs text-slate-400">Step-by-step 4-step walkthrough with soft voiceover narration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <video
            controls
            autoPlay
            src="/app_promo_video.mp4"
            className="w-full h-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-400 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>100% Free • Zero Paywalls • Instant PDF Downloads</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/builder"
              onClick={onClose}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow transition-colors flex items-center gap-1.5"
            >
              <span>Build Your Resume Now</span>
              <Play size={12} className="fill-current" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
