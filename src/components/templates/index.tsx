import React from 'react';
import { ResumeData, TemplateType, DensityMode } from '../../types/resume';
import { useResume } from '../../context/ResumeContext';
import { ModernClean } from './ModernClean';
import { TechMinimal } from './TechMinimal';
import { ExecutiveSerif } from './ExecutiveSerif';
import { ProfessionalSlate } from './ProfessionalSlate';
import { CompactSidebar } from './CompactSidebar';

export const TEMPLATE_LIST: Array<{ id: TemplateType; name: string; description: string; tag: string }> = [
  {
    id: 'modern',
    name: 'Modern Clean',
    description: 'Clean single-column layout optimized for high ATS parsing compatibility across Taleo, Workday & Greenhouse.',
    tag: 'Most Popular'
  },
  {
    id: 'tech',
    name: 'Tech Minimal',
    description: 'Monospace badges & crisp dividers tailored for Software Engineers, Cloud Architects & AI Developers.',
    tag: 'Tech Favorite'
  },
  {
    id: 'executive',
    name: 'Executive Serif',
    description: 'Sophisticated serif styling with center-aligned headers for Directors, Managers & Executives.',
    tag: 'Executive'
  },
  {
    id: 'slate',
    name: 'Professional Slate',
    description: 'Bold dark banner header with organized section hierarchy and clear timeline indicators.',
    tag: 'Modern'
  },
  {
    id: 'compact',
    name: 'Compact Sidebar',
    description: 'Two-column presentation with dedicated skills/education sidebar while preserving ATS line-flow.',
    tag: 'Space Saver'
  }
];

export interface TemplateProps {
  resume: ResumeData;
  densityMode?: DensityMode;
}

export const ResumeRenderer: React.FC<TemplateProps> = ({ resume, densityMode: overrideMode }) => {
  let activeMode: DensityMode = 'standard';

  try {
    const { densityInfo } = useResume();
    if (densityInfo?.mode) {
      activeMode = densityInfo.mode;
    }
  } catch (e) {
    // Fallback if rendered outside ResumeProvider
  }

  if (overrideMode) {
    activeMode = overrideMode;
  } else if (resume.formatting?.spacing === 'compact') {
    activeMode = 'compact';
  } else if (resume.formatting?.spacing === 'relaxed') {
    activeMode = 'spacious';
  }

  switch (resume.formatting.template) {
    case 'tech':
      return <TechMinimal resume={resume} densityMode={activeMode} />;
    case 'executive':
      return <ExecutiveSerif resume={resume} densityMode={activeMode} />;
    case 'slate':
      return <ProfessionalSlate resume={resume} densityMode={activeMode} />;
    case 'compact':
      return <CompactSidebar resume={resume} densityMode={activeMode} />;
    case 'modern':
    default:
      return <ModernClean resume={resume} densityMode={activeMode} />;
  }
};
