import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { ResumeRenderer } from '../templates';
import { ZoomIn, ZoomOut, Maximize2, RotateCcw } from 'lucide-react';

export const ResumePreview: React.FC = () => {
  const { resume } = useResume();
  const [zoomLevel, setZoomLevel] = useState<number>(0.95);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 1.4));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.6));
  const handleResetZoom = () => setZoomLevel(0.95);

  return (
    <div className="relative flex flex-col items-center h-full">
      {/* Zoom and page bar */}
      <div className="no-print sticky top-16 z-20 flex items-center justify-between w-full max-w-[794px] bg-white/90 backdrop-blur border border-slate-200/80 px-3 py-1.5 rounded-xl shadow-sm mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Live ATS Preview</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
            A4 Standard
          </span>
        </div>

        {/* Zoom Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
          <button
            onClick={handleZoomOut}
            className="p-1 text-slate-600 hover:text-slate-900 rounded hover:bg-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={13} />
          </button>
          <span className="text-[11px] font-mono font-medium px-1.5 text-slate-600 min-w-[40px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-1 text-slate-600 hover:text-slate-900 rounded hover:bg-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={13} />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1 text-slate-600 hover:text-slate-900 rounded hover:bg-white transition-colors border-l border-slate-200 pl-1.5 ml-0.5"
            title="Reset Zoom"
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </div>

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
