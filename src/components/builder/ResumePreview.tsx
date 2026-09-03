import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { ResumeRenderer } from '../templates';
import { ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff } from 'lucide-react';

export const ResumePreview: React.FC = () => {
  const { resume } = useResume();
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [showControls, setShowControls] = useState<boolean>(true);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 1.4));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.6));
  const handleResetZoom = () => setZoomLevel(1.0);

  return (
    <div className="relative flex flex-col items-center h-full pt-2">
      {/* Zoom and page control bar */}
      {showControls ? (
        <div className="no-print relative z-10 flex items-center justify-between w-full max-w-[794px] bg-slate-900 text-white border border-slate-800 px-4 py-2.5 rounded-xl shadow-md mb-4 transition-all">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">Live ATS Preview</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold border border-emerald-400/30">
              A4 Standard
            </span>
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
                title="Reset Zoom"
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
            <span>Show Preview Bar ({Math.round(zoomLevel * 100)}%)</span>
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
          className="transition-transform print-area shadow-2xl rounded-sm border border-slate-300 bg-white"
        >
          {/* Target Element for PDF vector extraction */}
          <div
            id="resume-preview-sheet"
            className="w-[794px] min-h-[1123px] bg-white text-black"
          >
            <ResumeRenderer resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
};

