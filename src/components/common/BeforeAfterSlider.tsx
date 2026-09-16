import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, MoveHorizontal, FileX, FileCheck2 } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Background ambient radial lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} className="text-brand-400" />
            <span>Interactive Visual Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            See the Difference: <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">Rejected vs. Hired</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Drag the slider to compare an unscannable, multi-column resume against a 100% ATS-compliant Resume Craft vector template.
          </p>
        </div>

        {/* Slider Box */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[520px] rounded-3xl border border-slate-700/80 bg-slate-950/80 backdrop-blur-xl overflow-hidden shadow-2xl select-none cursor-ew-resize group"
        >
          {/* AFTER SIDE (Full Background - 100% ATS Scannable) */}
          <div className="absolute inset-0 w-full h-full bg-slate-900 p-6 sm:p-8 flex flex-col justify-between">
            {/* Top Badge (Right Aligned) */}
            <div className="flex items-center justify-end gap-2 z-10">
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-slate-950/90 px-3 py-1.5 rounded-xl border border-emerald-800/40">
                <CheckCircle2 size={14} /> Passes Workday, Taleo &amp; Greenhouse
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950/95 border border-emerald-500/40 text-emerald-400 text-xs font-black shadow-lg">
                <FileCheck2 size={16} />
                <span>AFTER: 98% ATS Compatibility Score</span>
              </div>
            </div>

            {/* Simulated ATS Resume Card */}
            <div className="my-auto max-w-xl mx-auto w-full bg-white text-slate-900 rounded-2xl p-6 shadow-xl border border-emerald-200/80 space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-lg font-black text-slate-900 tracking-tight">ALEX MORGAN</h3>
                <p className="text-xs font-bold text-brand-600">Senior Full-Stack Engineer | React, Node.js, AWS</p>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">alex@example.com • (555) 019-2834 • San Francisco, CA • linkedin.com/in/alexmorgan</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Professional Experience</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Lead Software Engineer — TechCorp Inc.</span>
                    <span className="text-slate-500">2021 – Present</span>
                  </div>
                  <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-1 pl-1">
                    <li>Architected microservices processing <strong>10M+ daily events</strong>, reducing latency by <strong>42%</strong> using Node.js &amp; Redis.</li>
                    <li>Led a team of 8 engineers delivering <strong>\$1.2M in annual cloud infrastructure savings</strong> via AWS EKS migration.</li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                {['TypeScript', 'React.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS EKS', 'CI/CD'].map((skill, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end items-center z-10">
              <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-emerald-400 font-bold bg-slate-950/95 px-3.5 py-1.5 rounded-xl border border-emerald-500/30 shadow-lg backdrop-blur-md">
                ✅ Single-Column Standard Layout • Vector Text Extraction • Google X-Y-Z Metrics
              </span>
            </div>
          </div>

          {/* BEFORE SIDE (Clipped View - Unscannable Format) */}
          <div
            className="absolute top-0 bottom-0 left-0 bg-slate-950 p-6 sm:p-8 flex flex-col justify-between overflow-hidden border-r border-rose-500/50"
            style={{ width: `${sliderPos}%` }}
          >
            <div className="w-[800px] sm:w-[1000px] h-full flex flex-col justify-between">
              {/* Top Badge (Left Aligned) */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950/95 border border-rose-500/50 text-rose-400 text-xs font-black w-fit z-10 shadow-lg">
                <FileX size={16} />
                <span>BEFORE: 35% ATS Score (Rejected)</span>
              </div>

              {/* Simulated Bad Resume Card */}
              <div className="my-auto max-w-xl w-full bg-slate-100 text-slate-800 rounded-2xl p-6 shadow-md border border-rose-300 space-y-4 filter blur-[0.3px]">
                <div className="flex justify-between items-start border-b border-rose-200 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 italic">Curriculum Vitae - Alex</h3>
                    <p className="text-xs text-slate-500">Software Guy / Tech Enthusiast</p>
                  </div>
                  <div className="w-12 h-12 bg-slate-300 rounded-full flex items-center justify-center text-[9px] text-slate-600 font-bold border border-rose-400">
                    [Photo]
                  </div>
                </div>

                {/* 2-Column Table Warning */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-rose-100/60 p-2.5 rounded-xl border border-rose-300 text-rose-900">
                  <div className="space-y-1">
                    <p className="font-bold text-[11px] text-rose-950 flex items-center gap-1">
                      <AlertTriangle size={12} className="text-rose-600" /> Multi-Column Table
                    </p>
                    <p className="text-[10px] text-rose-800">Taleo &amp; Workday cannot parse multi-column tables.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-[11px] text-rose-950 flex items-center gap-1">
                      <AlertTriangle size={12} className="text-rose-600" /> Missing Metrics
                    </p>
                    <p className="text-[10px] text-rose-800">No quantifiable metrics or Google X-Y-Z formula.</p>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-600">
                  <p className="font-semibold text-slate-800">Work Experience:</p>
                  <p className="text-[11px] italic">"Worked on building websites and fixed bugs in software code..."</p>
                </div>
              </div>

              <div className="flex justify-start items-center z-10">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-rose-400 font-bold bg-slate-950/95 px-3.5 py-1.5 rounded-xl border border-rose-500/30 shadow-lg backdrop-blur-md">
                  ❌ Unparseable Tables • Missing Contact Info • Generic Non-Scannable Bullets
                </span>
              </div>
            </div>
          </div>

          {/* DRAGGABLE SLIDER LINE */}
          <div
            className="absolute top-0 bottom-0 z-30 w-1 bg-gradient-to-b from-rose-400 via-white to-emerald-400 cursor-ew-resize"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Center Drag Handle */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-slate-900 border-2 border-white text-white shadow-2xl flex items-center justify-center transition-transform group-hover:scale-110">
              <MoveHorizontal size={20} className="text-brand-400" />
            </div>
          </div>
        </div>

        {/* Footer instruction */}
        <div className="mt-4 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <span>👈 Move slider left/right to compare formats</span>
        </div>
      </div>
    </section>
  );
};
