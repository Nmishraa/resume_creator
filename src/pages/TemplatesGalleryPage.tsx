import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { TEMPLATE_LIST } from '../components/templates';
import { TemplateType } from '../types/resume';
import { SeoHead } from '../components/common/SeoHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Layers, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export const TemplatesGalleryPage: React.FC = () => {
  const { resume, updateFormatting } = useResume();
  const navigate = useNavigate();

  const handleSelectTemplate = (id: TemplateType) => {
    updateFormatting({ template: id });
    navigate('/builder');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <SeoHead
        title="Free ATS-Friendly Resume Templates – Clean & Scannable Layouts | Resume Craft"
        description="Explore 5 ATS-compliant resume templates built with standard fonts and clean single-column layouts for Workday, Greenhouse, Taleo, and Lever."
        canonicalPath="/resume-templates"
      />

      <Breadcrumbs items={[{ name: 'Resume Templates', path: '/resume-templates' }]} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold border border-brand-200">
          <ShieldCheck size={13} className="text-emerald-600" />
          <span>ATS-Optimized Layouts</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950">
          Free ATS-Friendly Resume Templates
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Every template is designed with standard fonts, single-column parsing flow, and clean vector typography to maximize parsing compatibility through Taleo, Workday, and Greenhouse.
        </p>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATE_LIST.map((tpl) => (
          <div
            key={tpl.id}
            className={`bg-white rounded-2xl border-2 transition-all p-6 flex flex-col justify-between space-y-5 shadow-xs hover:shadow-lg ${resume.formatting.template === tpl.id ? 'border-brand-500 ring-2 ring-brand-500/20' : 'border-slate-200 hover:border-slate-300'}`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-base">{tpl.name}</h3>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 font-bold text-slate-700">
                  {tpl.tag}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{tpl.description}</p>
            </div>

            {/* Template visual mock preview */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 font-mono text-[10px] text-slate-400">
              <div className="flex items-center justify-between">
                <div className="h-3 w-1/3 bg-slate-300 rounded"></div>
                <div className="h-2 w-1/4 bg-slate-200 rounded"></div>
              </div>
              <div className="h-1.5 w-full bg-slate-200 rounded"></div>
              <div className="h-1.5 w-4/5 bg-slate-200 rounded"></div>
              <div className="pt-2 flex gap-1">
                <div className="h-3 w-12 bg-slate-200 rounded"></div>
                <div className="h-3 w-12 bg-slate-200 rounded"></div>
              </div>
            </div>

            <button
              onClick={() => handleSelectTemplate(tpl.id)}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${resume.formatting.template === tpl.id ? 'bg-brand-600 text-white shadow' : 'bg-slate-100 hover:bg-brand-600 hover:text-white text-slate-800'}`}
            >
              <span>{resume.formatting.template === tpl.id ? 'Currently Active — Edit in Builder' : 'Use This Template'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
