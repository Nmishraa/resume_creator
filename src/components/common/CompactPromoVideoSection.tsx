import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, FileText, CheckCircle2 } from 'lucide-react';

export const CompactPromoVideoSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleTrackConversion = () => {
    try {
      const currentCount = parseInt(localStorage.getItem('rc_video_conversions') || '0', 10);
      localStorage.setItem('rc_video_conversions', (currentCount + 1).toString());
    } catch {}
  };

  return (
    <div ref={containerRef} className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3.5 text-white">
      
      {/* Header & Title */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-[10px] font-bold">
            <Sparkles size={11} />
            <span>40-Sec Tour</span>
          </div>
          <h3 className="text-sm font-bold text-white tracking-tight">
            See How Resume Craft Works
          </h3>
        </div>

        <Link
          to="/builder"
          onClick={handleTrackConversion}
          className="px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-lg text-[11px] transition-all shadow flex items-center gap-1 shrink-0"
        >
          <FileText size={12} />
          <span>Build Resume &rarr;</span>
        </Link>
      </div>

      {/* Video Container (Compact Height) */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-slate-800 max-h-[190px]">
        {isVisible ? (
          <video
            controls
            playsInline
            muted
            preload="none"
            poster="/og-image.png"
            className="w-full h-full object-contain"
          >
            <source src="/app_promo_video.mp4" type="video/mp4" />
            <track
              kind="captions"
              src="/app_promo_video.vtt"
              srcLang="en"
              label="English Captions"
              default
            />
            Your browser does not support HTML5 video.
          </video>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-950">
            <img
              src="/og-image.png"
              alt="Resume Craft Video Walkthrough Poster"
              className="w-full h-full object-cover opacity-60"
            />
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
        <span className="flex items-center gap-1 text-emerald-400 font-medium">
          <CheckCircle2 size={12} /> Free Vector PDF Export
        </span>
        <Link
          to="/builder"
          onClick={handleTrackConversion}
          className="text-brand-400 hover:text-brand-300 font-semibold underline underline-offset-2"
        >
          Proceed to Builder
        </Link>
      </div>

    </div>
  );
};
