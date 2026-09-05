import React from 'react';
import { ResumeData, DensityMode } from '../../types/resume';
import { getFontFamilyClass, getFontSizeClass, getAdaptiveDensityStyles, getSummaryBullets } from './templateStyles';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../common/BrandIcons';

interface TemplateProps {
  resume: ResumeData;
  densityMode?: DensityMode;
}

export const ProfessionalSlate: React.FC<TemplateProps> = ({ resume, densityMode = 'standard' }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, formatting } = resume;
  const fontClass = getFontFamilyClass(formatting.fontFamily);
  const size = getFontSizeClass(formatting.fontSize);
  const accentColor = formatting.accentColor || '#334155';
  const densityStyles = getAdaptiveDensityStyles(densityMode);

  return (
    <div
      className={`w-full max-w-[794px] box-border bg-white text-slate-800 ${fontClass} page-break-container`}
      style={{
        ...densityStyles,
        padding: 'var(--resume-page-padding, 15mm 13mm)',
        fontSize: 'var(--resume-body-size, 13.2px)',
        lineHeight: 'var(--resume-line-height, 1.45)'
      }}
    >
      {/* Banner Top Header */}
      <div className="bg-slate-900 text-white -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 p-5 sm:p-6 mb-5 box-border rounded-t-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div
              style={{ fontSize: 'var(--resume-name-size, 25px)' }}
              className="font-extrabold tracking-tight text-white uppercase"
              role="heading"
              aria-level={2}
            >
              {personalInfo.fullName || 'Candidate Name'}
            </div>
            <p className="text-sm font-medium text-slate-300 tracking-wide mt-0.5">
              {personalInfo.jobTitle || 'Senior Software Engineer'}
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-1 text-xs text-slate-300">
            {personalInfo.email && <span className="flex items-center gap-1.5"><Mail size={12} className="text-brand-300" /> {personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={12} className="text-brand-300" /> {personalInfo.phone}</span>}
            {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin size={12} className="text-brand-300" /> {personalInfo.location}</span>}
            <div className="flex gap-3 mt-1 text-[11px] text-slate-400">
              {personalInfo.linkedin && <span className="flex items-center gap-1"><LinkedinIcon size={11} /> {personalInfo.linkedin}</span>}
              {personalInfo.github && <span className="flex items-center gap-1"><GithubIcon size={11} /> {personalInfo.github}</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-section-gap, 18px)' }}>
        {/* Summary */}
        {summary && (
          <div>
            <div className="resume-section-title flex items-center gap-2 mb-2" style={{ breakAfter: 'avoid', pageBreakAfter: 'avoid' }}>
              <span className="w-1.5 h-4 bg-slate-800 rounded-sm"></span>
              <h2
                style={{ fontSize: 'var(--resume-section-title-size, 14px)' }}
                className="font-bold uppercase tracking-wider text-slate-900"
              >
                Summary
              </h2>
            </div>
            <ul
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-bullet-gap, 6px)' }}
              className="resume-entry summary-entry list-disc list-outside ml-4 text-slate-700 border-l-0 pl-1"
            >
              {getSummaryBullets(summary).map((bullet, idx) => (
                <li key={idx} className="pl-1 leading-snug">{bullet}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div>
            <div className="resume-section-title flex items-center gap-2 mb-2.5" style={{ breakAfter: 'avoid', pageBreakAfter: 'avoid' }}>
              <span className="w-1.5 h-4 bg-slate-800 rounded-sm"></span>
              <h2
                style={{ fontSize: 'var(--resume-section-title-size, 14px)' }}
                className="font-bold uppercase tracking-wider text-slate-900"
              >
                Experience
              </h2>
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-item-gap, 10px)' }}
              className="pl-3.5 border-l border-slate-200"
            >
              {experience.map((exp) => (
                <div key={exp.id} className="experience-entry resume-entry page-break-avoid resume-section-item">
                  <div className="flex justify-between items-baseline flex-wrap">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{exp.role}</span>
                      <span className="text-slate-600 text-xs font-semibold"> • {exp.company}</span>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.highlights && (
                    <ul
                      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-bullet-gap, 6px)' }}
                      className="mt-1 list-disc list-outside ml-4 text-slate-700"
                    >
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div>
            <div className="resume-section-title flex items-center gap-2 mb-2.5" style={{ breakAfter: 'avoid', pageBreakAfter: 'avoid' }}>
              <span className="w-1.5 h-4 bg-slate-800 rounded-sm"></span>
              <h2
                style={{ fontSize: 'var(--resume-section-title-size, 14px)' }}
                className="font-bold uppercase tracking-wider text-slate-900"
              >
                Key Projects
              </h2>
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-item-gap, 10px)' }}
              className="pl-3.5 border-l border-slate-200"
            >
              {projects.map((proj) => (
                <div key={proj.id} className="project-entry resume-entry page-break-avoid resume-section-item">
                  <div className="flex justify-between items-baseline flex-wrap">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{proj.title}</span>
                      {proj.subtitle && <span className="text-slate-600 text-xs font-semibold"> • {proj.subtitle}</span>}
                    </div>
                    {proj.startDate && (
                      <span className="text-xs text-slate-500 font-mono">
                        {proj.startDate}{proj.endDate ? ` - ${proj.endDate}` : ''}
                      </span>
                    )}
                  </div>
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul
                      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-bullet-gap, 6px)' }}
                      className="mt-1 list-disc list-outside ml-4 text-slate-700"
                    >
                      {proj.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <div className="resume-section-title flex items-center gap-2 mb-2" style={{ breakAfter: 'avoid', pageBreakAfter: 'avoid' }}>
              <span className="w-1.5 h-4 bg-slate-800 rounded-sm"></span>
              <h2
                style={{ fontSize: 'var(--resume-section-title-size, 14px)' }}
                className="font-bold uppercase tracking-wider text-slate-900"
              >
                Skills
              </h2>
            </div>
            <div className="pl-3.5 border-l border-slate-200 space-y-1.5 text-xs">
              {skills.map((s) => (
                <div key={s.id} className="skill-group resume-entry flex gap-2 page-break-avoid">
                  <span className="font-bold text-slate-900 min-w-[110px]">{s.category}:</span>
                  <span className="text-slate-700">{s.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <div className="resume-section-title flex items-center gap-2 mb-2" style={{ breakAfter: 'avoid', pageBreakAfter: 'avoid' }}>
              <span className="w-1.5 h-4 bg-slate-800 rounded-sm"></span>
              <h2
                style={{ fontSize: 'var(--resume-section-title-size, 14px)' }}
                className="font-bold uppercase tracking-wider text-slate-900"
              >
                Education
              </h2>
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-item-gap, 10px)' }}
              className="pl-3.5 border-l border-slate-200"
            >
              {education.map((edu) => (
                <div key={edu.id} className="education-entry resume-entry page-break-avoid resume-section-item">
                  <div className="font-bold text-slate-900">
                    {edu.degree}{edu.degree && edu.institution ? ' — ' : ''}{edu.institution}
                  </div>
                  <div className="text-xs text-slate-600 font-mono">
                    {[edu.location, edu.endDate || edu.startDate].filter(Boolean).join(' | ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
