import React, { useState, useEffect, useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import { ResumeRenderer } from '../templates';
import { calculateDensityModeFromHeight } from '../templates/templateStyles';
import { ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff, Sliders, Layers } from 'lucide-react';

export const ResumePreview: React.FC = () => {
  const { resume, densityInfo, setDensityInfo } = useResume();
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [showControls, setShowControls] = useState<boolean>(true);
  const sheetRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 1.4));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.6));
  const handleResetZoom = () => setZoomLevel(1.0);

  // Measure content height and calculate adaptive density mode (debounced 200ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (sheetRef.current) {
        // Target inner template element to measure true unconstrained content height (avoiding outer sheet min-height)
        const innerContainer =
          sheetRef.current.querySelector('.page-break-container') as HTMLElement ||
          sheetRef.current.firstElementChild as HTMLElement ||
          sheetRef.current;

        const contentHeight = innerContainer.scrollHeight || innerContainer.offsetHeight;
        const result = calculateDensityModeFromHeight(contentHeight, 1010);
        
        if (
          !densityInfo ||
          result.mode !== densityInfo.mode ||
          Math.abs(result.fillPercentage - densityInfo.fillPercentage) > 2 ||
          result.pageCount !== densityInfo.pageCount
        ) {
          setDensityInfo(result);
        }
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [resume, setDensityInfo]);

  // Mode Display Helpers
  const modeBadgeColor = {
    spacious: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
    balanced: 'bg-teal-500/20 text-teal-300 border-teal-400/30',
    standard: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    compact: 'bg-amber-500/20 text-amber-300 border-amber-400/30'
  }[densityInfo?.mode || 'standard'];

  const modeLabel = {
    spacious: 'Spacious (Short Resume Auto-Expanded)',
    balanced: 'Balanced Mode',
    standard: 'Standard Mode',
    compact: 'Compact Mode'
  }[densityInfo?.mode || 'standard'];

  const totalPages = densityInfo?.pageCount || 1;

  return (
    <div className="relative flex flex-col items-center h-full pt-2">
      {/* Zoom and Adaptive Density Control Bar */}
      {showControls ? (
        <div className="no-print relative z-10 flex flex-wrap items-center justify-between gap-2 w-full max-w-[794px] bg-slate-900 text-white border border-slate-800 px-4 py-2.5 rounded-xl shadow-md mb-4 transition-all">
          {/* Left: ATS & Adaptive Density Badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders size={13} className="text-brand-400" />
              Live ATS Preview
            </span>

            {/* Density Mode Badge */}
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-extrabold border flex items-center gap-1 ${modeBadgeColor}`}
              title={`Adaptive Density Auto-Selected: ${modeLabel} (${densityInfo?.fillPercentage || 75}% of A4 Page Height)`}
            >
              <span>{modeLabel}</span>
              <span className="text-[10px] opacity-80 font-mono">({densityInfo?.fillPercentage || 75}%)</span>
            </span>

            {/* Page Count Badge */}
            {totalPages > 1 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-extrabold border border-blue-400/30 flex items-center gap-1">
                <Layers size={11} />
                <span>{totalPages} Pages</span>
              </span>
            )}
          </div>

          {/* Right controls: Zoom + Hide Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
              <button
                onClick={handleZoomOut}
                className="p-1 text-slate-300 hover:text-white rounded hover:bg-slate-700 transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut size={14} />
              </button>
              <span className="text-xs font-mono font-bold px-2 text-slate-200 min-w-[44px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1 text-slate-300 hover:text-white rounded hover:bg-slate-700 transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn size={14} />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1 text-slate-300 hover:text-white rounded hover:bg-slate-700 transition-colors border-l border-slate-700 pl-2 ml-1 cursor-pointer"
                title="Reset Zoom (100%)"
              >
                <RotateCcw size={13} />
              </button>
            </div>

            {/* Hide Controls Button */}
            <button
              onClick={() => setShowControls(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer"
              title="Hide preview control bar"
            >
              <EyeOff size={14} />
              <span className="hidden sm:inline">Hide Bar</span>
            </button>
          </div>
        </div>
      ) : (
        /* Floating Unobtrusive Show Button when hidden */
        <div className="no-print mb-3 w-full max-w-[794px] flex justify-end">
          <button
            onClick={() => setShowControls(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl shadow-xs transition-colors cursor-pointer"
            title="Show preview controls"
          >
            <Eye size={15} className="text-brand-600" />
            <span>Show Bar ({modeLabel} • {Math.round(zoomLevel * 100)}%)</span>
          </button>
        </div>
      )}

      {/* Resume Document Paper Container */}
      <div className="w-full flex justify-center overflow-x-auto pb-16">
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out'
          }}
          className="transition-transform print-area shadow-2xl rounded-sm border border-slate-300 bg-white relative"
        >
          {/* Target Element for PDF vector extraction */}
          <div
            ref={sheetRef}
            id="resume-preview-sheet"
            className="w-[794px] min-h-[1123px] bg-white text-black relative box-border"
          >
            <ResumeRenderer resume={resume} />

            {/* Visual Page Break Line Overlays for Multi-Page Resumes */}
            {totalPages > 1 && Array.from({ length: totalPages - 1 }).map((_, pageIdx) => {
              const topOffsetPx = (pageIdx + 1) * 1123;
              return (
                <div
                  key={pageIdx}
                  style={{ top: `${topOffsetPx}px` }}
                  className="no-print absolute left-0 right-0 z-20 pointer-events-none flex items-center justify-center"
                >
                  <div className="w-full border-b-2 border-dashed border-red-400/80 relative">
                    <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md border border-white">
                      ✂️ A4 Page Break (Page {pageIdx + 1} / {totalPages})
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
