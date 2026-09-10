import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import { ResumeData } from '../../types/resume';
import { ResumeRenderer } from '../templates';
import { calculateDensityModeFromHeight } from '../templates/templateStyles';
import { applyBlockAwarePagination } from '../../services/paginationEngine';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface FullPageResumePreviewProps {
  resumeData: Partial<ResumeData>;
  onBack?: () => void;
  onUseResume?: () => void;
}

export const FullPageResumePreview: React.FC<FullPageResumePreviewProps> = ({
  resumeData,
  onBack,
  onUseResume
}) => {
  const { updateResume } = useResume();
  const navigate = useNavigate();
  const sheetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1.0);
  const [pageCount, setPageCount] = useState<number>(1);
  const [paginatedHtml, setPaginatedHtml] = useState<string>('');

  // Default sanitize/ensure formatting object exists
  const fullResumeData: ResumeData = {
    id: resumeData.id || 'preview-id',
    title: resumeData.title || 'Resume Preview',
    updatedAt: resumeData.updatedAt || new Date().toISOString(),
    personalInfo: {
      fullName: resumeData.personalInfo?.fullName || '',
      jobTitle: resumeData.personalInfo?.jobTitle || '',
      email: resumeData.personalInfo?.email || '',
      phone: resumeData.personalInfo?.phone || '',
      location: resumeData.personalInfo?.location || '',
      website: resumeData.personalInfo?.website || '',
      linkedin: resumeData.personalInfo?.linkedin || '',
      github: resumeData.personalInfo?.github || ''
    },
    summary: resumeData.summary || '',
    experience: resumeData.experience || [],
    education: resumeData.education || [],
    skills: resumeData.skills || [],
    projects: resumeData.projects || [],
    certifications: resumeData.certifications || [],
    customSections: resumeData.customSections || [],
    formatting: {
      template: resumeData.formatting?.template || 'modern',
      fontFamily: resumeData.formatting?.fontFamily || 'inter',
      fontSize: resumeData.formatting?.fontSize || 'base',
      accentColor: resumeData.formatting?.accentColor || '#0284c7',
      spacing: resumeData.formatting?.spacing || 'normal',
      showIcons: resumeData.formatting?.showIcons ?? true,
      sectionOrder: resumeData.formatting?.sectionOrder || ['summary', 'experience', 'skills', 'education', 'projects', 'certifications']
    }
  };

  // Handle Back Action
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  // Handle Use Resume Action
  const handleUse = () => {
    if (onUseResume) {
      onUseResume();
    } else {
      updateResume(fullResumeData);
      navigate('/builder');
    }
  };

  // Auto-fit scale to container screen width for responsive viewing
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth - 32; // 16px padding on each side
        const targetWidth = 794; // Standard A4 width
        if (availableWidth < targetWidth) {
          setScale(Math.max(0.35, Math.round((availableWidth / targetWidth) * 100) / 100));
        } else {
          setScale(1.0);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Measure content height and calculate page breaks cleanly
  useEffect(() => {
    let isMounted = true;

    const runPagination = () => {
      if (!isMounted || !sheetRef.current) return;
      const innerContainer =
        (sheetRef.current.querySelector('.page-break-container') as HTMLElement) ||
        (sheetRef.current.firstElementChild as HTMLElement) ||
        sheetRef.current;

      const computedPageCount = applyBlockAwarePagination(innerContainer);
      const contentHeight = innerContainer.scrollHeight || innerContainer.offsetHeight;
      const result = calculateDensityModeFromHeight(contentHeight, 1010);
      
      setPageCount(Math.max(result.pageCount, computedPageCount, 1));
      setPaginatedHtml(sheetRef.current.innerHTML);
    };

    // Run initial pagination immediately
    runPagination();

    // Run again after short layout & web font settle delay
    const timer = setTimeout(runPagination, 120);

    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (isMounted) runPagination();
      }).catch(() => {});
    }

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [resumeData]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col overflow-hidden text-slate-900 font-sans">
      {/* Sticky Header Bar — Contains ONLY Back & Use This Resume buttons */}
      <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between shadow-lg shrink-0">
        <button
          type="button"
          onClick={handleBack}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border border-slate-700 cursor-pointer shadow-xs"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={handleUse}
          className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 active:bg-brand-700 text-white rounded-xl text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
        >
          <Sparkles size={16} />
          <span>Use This Resume</span>
        </button>
      </header>

      {/* Main Full-Page Document Viewing Canvas — Displaying All Pages Clearly */}
      <main ref={containerRef} className="flex-1 overflow-y-auto bg-slate-950/90 py-8 px-4 flex flex-col items-center space-y-8">
        {/* Hidden measurement container rendered with absolute visibility for 100% accurate layout metrics */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '794px',
            visibility: 'hidden',
            pointerEvents: 'none',
            zIndex: -9999
          }}
          aria-hidden="true"
        >
          <div ref={sheetRef} className="w-[794px] bg-white text-black box-border">
            <ResumeRenderer resume={fullResumeData} />
          </div>
        </div>

        {/* Render each page as a clean, separate A4 page sheet */}
        {Array.from({ length: pageCount }).map((_, pageIdx) => (
          <div key={pageIdx} className="flex flex-col items-center shrink-0">

            {/* A4 Sheet Card */}
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top center',
                width: '794px',
                height: '1123px',
                marginBottom: scale < 1.0 ? `-${(1 - scale) * 1123}px` : '0px'
              }}
              className="shadow-2xl rounded-sm border border-slate-300 bg-white relative overflow-hidden shrink-0 box-border"
            >
              <div
                style={{
                  transform: `translateY(-${pageIdx * 1123}px)`
                }}
                className="w-[794px] bg-white text-black relative box-border"
              >
                {paginatedHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: paginatedHtml }} />
                ) : (
                  <ResumeRenderer resume={fullResumeData} />
                )}
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};
