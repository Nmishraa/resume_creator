import React from 'react';
import { ResumeData, DensityMode } from '../../types/resume';
import { getFontFamilyClass, getFontSizeClass, getAdaptiveDensityStyles, getSummaryBullets } from './templateStyles';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../common/BrandIcons';

interface TemplateProps {
  resume: ResumeData;
  densityMode?: DensityMode;
}

export const TechMinimal: React.FC<TemplateProps> = ({ resume, densityMode = 'standard' }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, formatting } = resume;
  const fontClass = getFontFamilyClass(formatting.fontFamily);
  const size = getFontSizeClass(formatting.fontSize);
  const accentColor = formatting.accentColor || '#0f766e';
  const densityStyles = getAdaptiveDensityStyles(densityMode);

  let sectionCounter = 1;
  const getSectionNum = () => {
    const num = sectionCounter++;
    return num < 10 ? `0${num}` : `${num}`;
  };

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
      {/* Header */}
      <div className="pb-3 mb-4 border-b-2" style={{ borderColor: accentColor }}>
        <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2">
          <div>
            <div
              style={{ fontSize: 'var(--resume-name-size, 25px)' }}
              className="text-slate-950 font-mono tracking-tight uppercase font-bold"
              role="heading"
              aria-level={2}
            >
              {personalInfo.fullName || 'Developer Name'}
            </div>
            <p className="text-sm font-mono font-medium tracking-wide mt-0.5" style={{ color: accentColor }}>
              &gt; {personalInfo.jobTitle || 'Full Stack Engineer'}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600 font-mono">
            {personalInfo.email && <span className="flex items-center gap-1"><Mail size={11} /> {personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={11} /> {personalInfo.phone}</span>}
            {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={11} /> {personalInfo.location}</span>}
            {personalInfo.github && <span className="flex items-center gap-1"><GithubIcon size={11} /> {personalInfo.github}</span>}
            {personalInfo.linkedin && <span className="flex items-center gap-1"><LinkedinIcon size={11} /> {personalInfo.linkedin}</span>}
            {personalInfo.website && <span className="flex items-center gap-1"><Globe size={11} /> {personalInfo.website}</span>}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-section-gap, 18px)' }}>
        {/* Summary */}
        {summary && (
          <div>
            <div
              style={{ fontSize: 'var(--resume-section-title-size, 13px)', breakAfter: 'avoid', pageBreakAfter: 'avoid' }}
              className="resume-section-title font-mono font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
              {getSectionNum()} // SUMMARY
            </div>
            <ul
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-bullet-gap, 6px)' }}
              className="resume-entry summary-entry list-disc list-outside ml-4 text-slate-700 font-sans"
            >
              {getSummaryBullets(summary).map((bullet, idx) => (
                <li key={idx} className="pl-1 leading-snug">{bullet}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <div
              style={{ fontSize: 'var(--resume-section-title-size, 13px)', breakAfter: 'avoid', pageBreakAfter: 'avoid' }}
              className="resume-section-title font-mono font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
              {getSectionNum()} // TECHNICAL SKILLS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {skills.map((s) => (
                <div key={s.id} className="skill-group resume-entry bg-slate-50 p-2 rounded border border-slate-200 page-break-avoid">
                  <div className="font-mono font-semibold text-slate-900 mb-1">{s.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {s.items.map((item, idx) => (
                      <span key={idx} className="bg-white border border-slate-200 px-1.5 py-0.5 rounded font-mono text-[10px] text-slate-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div>
            <div
              style={{ fontSize: 'var(--resume-section-title-size, 13px)', breakAfter: 'avoid', pageBreakAfter: 'avoid' }}
              className="resume-section-title font-mono font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
              {getSectionNum()} // EXPERIENCE
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-item-gap, 10px)' }}>
              {experience.map((exp) => (
                <div key={exp.id} className="experience-entry resume-entry page-break-avoid resume-section-item">
                  <div className="flex justify-between items-baseline flex-wrap font-mono">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{exp.role}</span>
                      {exp.company && <span className="text-slate-500 text-xs"> @ {exp.company}</span>}
                    </div>
                    {(exp.startDate || exp.endDate) && (
                      <span className="text-xs text-slate-500">
                        {exp.startDate}{exp.endDate ? ` - ${exp.current ? 'Present' : exp.endDate}` : ''}
                      </span>
                    )}
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul
                      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-bullet-gap, 6px)' }}
                      className="mt-1.5 list-disc list-outside ml-4 text-slate-700 font-sans"
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
            <div
              style={{ fontSize: 'var(--resume-section-title-size, 13px)', breakAfter: 'avoid', pageBreakAfter: 'avoid' }}
              className="resume-section-title font-mono font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
              {getSectionNum()} // PROJECTS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-item-gap, 10px)' }}>
              {projects.map((proj) => (
                <div key={proj.id} className="project-entry resume-entry page-break-avoid resume-section-item">
                  <div className="flex justify-between items-baseline flex-wrap font-mono">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{proj.title}</span>
                      {proj.subtitle && <span className="text-slate-500 text-xs"> ({proj.subtitle})</span>}
                    </div>
                    {proj.startDate && (
                      <span className="text-xs text-slate-500">
                        {proj.startDate}{proj.endDate ? ` - ${proj.endDate}` : ''}
                      </span>
                    )}
                  </div>
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul
                      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-bullet-gap, 6px)' }}
                      className="mt-1.5 list-disc list-outside ml-4 text-slate-700 font-sans"
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

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <div
              style={{ fontSize: 'var(--resume-section-title-size, 13px)', breakAfter: 'avoid', pageBreakAfter: 'avoid' }}
              className="resume-section-title font-mono font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
              {getSectionNum()} // EDUCATION
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-item-gap, 10px)' }}>
              {education.map((edu) => (
                <div key={edu.id} className="education-entry resume-entry page-break-avoid resume-section-item font-mono text-xs">
                  <div className="font-bold text-slate-900">
                    {edu.degree}{edu.degree && edu.institution ? ' — ' : ''}{edu.institution}
                  </div>
                  <div className="text-slate-500">
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

