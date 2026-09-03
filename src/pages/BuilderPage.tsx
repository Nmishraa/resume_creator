import React, { useState } from 'react';
import { Toolbar } from '../components/builder/Toolbar';
import { EditorForm } from '../components/builder/EditorForm';
import { ResumePreview } from '../components/builder/ResumePreview';
import { AiAssistantModal } from '../components/builder/AiAssistantModal';
import { ImportModal } from '../components/builder/ImportModal';
import { UploadResumeModal } from '../components/builder/UploadResumeModal';
import { AtsScoreDrawer } from '../components/ats/AtsScoreDrawer';
import { SeoHead } from '../components/common/SeoHead';
import { Edit3, Eye, X } from 'lucide-react';

export const BuilderPage: React.FC = () => {
  const [showAiModal, setShowAiModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAtsDrawer, setShowAtsDrawer] = useState(false);
  const [showMobilePreviewModal, setShowMobilePreviewModal] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <SeoHead
        title="Free Step-by-Step Resume Builder – ATS Resume Editor | Resume Craft"
        description="Build ATS-friendly resumes online with a clean guided workflow, live preview, AI bullet enhancers, and vector PDF exports."
        canonicalPath="/builder"
      />

      {/* Page-level H1 for SEO */}
      <h1 className="sr-only">Free Interactive Resume Builder</h1>

      {/* Builder Top Toolbar Header */}
      <Toolbar
        onOpenAiModal={() => setShowAiModal(true)}
        onOpenImportModal={() => setShowImportModal(true)}
        onOpenUploadModal={() => setShowUploadModal(true)}
        onOpenAtsDrawer={() => setShowAtsDrawer(true)}
        onOpenMobilePreview={() => setShowMobilePreviewModal(true)}
      />

      {/* Main Workspace (Split Screen on Desktop) */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto p-3 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Column: Form Wizard (5 cols on desktop) */}
        <div className="lg:col-span-5 h-full">
          <EditorForm />
        </div>

        {/* Right Column: Live Resume Preview (7 cols on desktop, hidden on mobile unless modal opened) */}
        <div className="hidden lg:block lg:col-span-7 h-full lg:sticky lg:top-20">
          <ResumePreview />
        </div>

      </div>

      {/* Mobile Live Preview Modal Drawer */}
      {showMobilePreviewModal && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex flex-col animate-in fade-in duration-200">
          <div className="bg-slate-900 text-white p-3.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-brand-400" />
              <span className="text-xs font-bold uppercase tracking-wider">Live Resume Preview</span>
            </div>
            <button
              onClick={() => setShowMobilePreviewModal(false)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Close Preview"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 flex justify-center bg-slate-800">
            <ResumePreview />
          </div>
        </div>
      )}

      {/* Global Action Modals */}
      <AiAssistantModal isOpen={showAiModal} onClose={() => setShowAiModal(false)} />
      <ImportModal isOpen={showImportModal} onClose={() => setShowImportModal(false)} />
      <UploadResumeModal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} />
      <AtsScoreDrawer isOpen={showAtsDrawer} onClose={() => setShowAtsDrawer(false)} />
    </div>
  );
};

