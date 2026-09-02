import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, FileText, Play, CheckCircle2 } from 'lucide-react';

export const CompactPromoVideoSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy-load video player only when card approaches viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Track viewer conversion metrics when navigating to builder from video section
  const handleTrackConversion = () => {
    try {
      const currentCount = parseInt(localStorage.getItem('rc_video_conversions') || '0', 10);
      localStorage.setItem('rc_video_conversions', (currentCount + 1).toString());
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <section ref={containerRef} className="max-w-2xl mx-auto px-4 sm:px-6 my-12">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5 overflow-hidden text-white">
        
        {/* Header & Primary CTA ABOVE the Video Player */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-[11px] font-bold">
                <Sparkles size={12} />
                <span>40-Second Quick Tour</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                See How Resume Craft Works
              </h2>
            </div>

            {/* MAIN CTA BUTTON ABOVE VIDEO PLAYER */}
            <Link
              to="/builder"
              onClick={handleTrackConversion}
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-brand-600/30 flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
            >
              <FileText size={14} />
              <span>Build My Resume &rarr;</span>
            </Link>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            4-step workflow: contact details, Workday/Greenhouse ATS-friendly template selection, live score analysis, and instant vector PDF downloads.
          </p>
        </div>

        {/* Video Player Container (Lazy loaded, No Autoplay with Sound, Poster Image, Captions) */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-slate-800 shadow-inner max-h-[310px] mx-auto">
          {isVisible ? (
            <video
              controls
              playsInline
              muted
              preload="none"
              poster="/og-image.png"
              onPlay={() => setHasInteracted(true)}
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
              Your browser does not support HTML5 video playback.
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

        {/* Post-Video Micro Trust Notice & Secondary Action */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <CheckCircle2 size={13} /> Free Vector PDF Export
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
    </section>
  );
};
