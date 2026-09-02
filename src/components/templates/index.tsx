import React from 'react';
import { ResumeData, TemplateType } from '../../types/resume';
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

export const ResumeRenderer: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  switch (resume.formatting.template) {
    case 'tech':
      return <TechMinimal resume={resume} />;
    case 'executive':
      return <ExecutiveSerif resume={resume} />;
    case 'slate':
      return <ProfessionalSlate resume={resume} />;
    case 'compact':
      return <CompactSidebar resume={resume} />;
    case 'modern':
    default:
      return <ModernClean resume={resume} />;
  }
};
