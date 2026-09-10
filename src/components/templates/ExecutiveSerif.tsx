import React from 'react';
import { ResumeData, DensityMode } from '../../types/resume';
import { getFontSizeClass, getAdaptiveDensityStyles, getSummaryBullets } from './templateStyles';

interface TemplateProps {
  resume: ResumeData;
  densityMode?: DensityMode;
}

export const ExecutiveSerif: React.FC<TemplateProps> = ({ resume, densityMode = 'standard' }) => {
  const {
    personalInfo = { fullName: '', jobTitle: '', email: '', phone: '', location: '', website: '', linkedin: '', github: '' },
    summary,
    experience,
    education,
    skills,
    projects,
    certifications,
    customSections,
    formatting = { template: 'executive', fontFamily: 'serif', fontSize: 'base', accentColor: '#b45309', spacing: 'normal', showIcons: true }
  } = resume || {};
  const size = getFontSizeClass(formatting?.fontSize);
  const densityStyles = getAdaptiveDensityStyles(densityMode);
  // Default accent color for Executive Serif is rich Amber/Gold (#b45309)
  const accentColor = (formatting?.accentColor && !['#059669', '#0284c7', '#2563eb'].includes(formatting.accentColor))
    ? formatting.accentColor
    : '#b45309';

  return (
    <div
      className="w-full max-w-[794px] box-border bg-white text-slate-900 font-serif page-break-container"
      style={{
        ...densityStyles,
        padding: 'var(--resume-page-padding, 15mm 13mm)',
        fontSize: 'var(--resume-body-size, 13.2px)',
        lineHeight: 'var(--resume-line-height, 1.45)'
      }}
    >
      {/* Centered Classic Executive Header */}
      <div className="text-center pb-2 mb-4">
        <h1
          style={{ fontSize: 'var(--resume-name-size, 28px)' }}
          className="font-bold tracking-wide text-slate-950 uppercase mb-1 font-serif"
          role="heading"
          aria-level={1}
        >
          {personalInfo.fullName || 'Candidate Name'}
        </h1>

        {/* Executive Job Title in Accent Amber/Gold */}
        <p className="text-xs sm:text-sm font-bold uppercase tracking-widest mb-2" style={{ color: accentColor }}>
          {personalInfo.jobTitle || 'Executive Leader'}
        </p>

        {/* Centered Contact Info Line */}
        <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 text-xs text-slate-700 font-serif mb-2">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && (
            <span>
              {personalInfo.location ? ' • ' : ''}{personalInfo.phone}
            </span>
          )}
          {personalInfo.email && (
            <span>
              {(personalInfo.location || personalInfo.phone) ? ' • ' : ''}{personalInfo.email}
            </span>
          )}
          {personalInfo.linkedin && (
            <span>
              {(personalInfo.location || personalInfo.phone || personalInfo.email) ? ' • ' : ''}{personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span>
              {(personalInfo.location || personalInfo.phone || personalInfo.email || personalInfo.linkedin) ? ' • ' : ''}{personalInfo.website}
            </span>
          )}
        </div>

        {/* Dual Horizontal Border Divider */}
        <div className="w-full my-1.5" aria-hidden="true">
          <div className="border-t-2 mb-[3px]" style={{ borderColor: accentColor }}></div>
          <div className="border-t" style={{ borderColor: accentColor }}></div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-section-gap, 18px)' }}>
        {/* Professional Summary */}
        {summary && (
          <div className="resume-section page-break-avoid">
            <h2
              style={{
                fontSize: 'var(--resume-section-title-size, 14px)',
                color: accentColor,
                borderColor: `${accentColor}35`,
                breakAfter: 'avoid',
                pageBreakAfter: 'avoid'
              }}
              className="resume-section-title font-bold font-serif text-center mb-2 uppercase tracking-wider border-b pb-0.5"
            >
              Executive Summary
            </h2>
            <ul
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-bullet-gap, 6px)' }}
              className="resume-entry summary-entry list-disc list-outside ml-4 text-slate-800 font-serif"
            >
              {getSummaryBullets(summary).map((bullet, idx) => (
                <li key={idx} className="pl-1 leading-snug">{bullet}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div className="resume-section">
            <h2
              style={{
                fontSize: 'var(--resume-section-title-size, 14px)',
                color: accentColor,
                borderColor: `${accentColor}35`,
                breakAfter: 'avoid',
                pageBreakAfter: 'avoid'
              }}
              className="resume-section-title font-bold font-serif text-center mb-2.5 uppercase tracking-wider border-b pb-0.5"
            >
              Leadership & Experience
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-item-gap, 10px)' }}>
              {experience.map((exp) => (
                <div key={exp.id} className="experience-entry resume-entry page-break-avoid resume-section-item font-serif">
                  <div className="flex justify-between items-baseline flex-wrap">
                    <div className="font-bold text-slate-950">
                      {exp.role} <span className="font-normal italic">at {exp.company}</span>
                    </div>
                    <div className="text-xs text-slate-600 font-sans italic">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate} {exp.location && `(${exp.location})`}
                    </div>
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul
                      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-bullet-gap, 6px)' }}
                      className="mt-1 list-disc list-outside ml-4 text-slate-800"
                    >
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="pl-0.5">{h}</li>
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
          <div className="resume-section">
            <h2
              style={{
                fontSize: 'var(--resume-section-title-size, 14px)',
                color: accentColor,
                borderColor: `${accentColor}35`,
                breakAfter: 'avoid',
                pageBreakAfter: 'avoid'
              }}
              className="resume-section-title font-bold font-serif text-center mb-2.5 uppercase tracking-wider border-b pb-0.5"
            >
              Key Projects
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-item-gap, 10px)' }}>
              {projects.map((proj) => (
                <div key={proj.id} className="project-entry resume-entry page-break-avoid resume-section-item font-serif">
                  <div className="flex justify-between items-baseline flex-wrap">
                    <div className="font-bold text-slate-950">
                      {proj.title} {proj.subtitle && <span className="font-normal italic">({proj.subtitle})</span>}
                    </div>
                    {proj.startDate && (
                      <div className="text-xs text-slate-600 font-sans italic">
                        {proj.startDate}{proj.endDate ? ` – ${proj.endDate}` : ''}
                      </div>
                    )}
                  </div>
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul
                      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-bullet-gap, 6px)' }}
                      className="mt-1 list-disc list-outside ml-4 text-slate-800"
                    >
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="pl-0.5">{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills / Core Competencies */}
        {skills && skills.length > 0 && (
          <div className="resume-section page-break-avoid">
            <h2
              style={{
                fontSize: 'var(--resume-section-title-size, 14px)',
                color: accentColor,
                borderColor: `${accentColor}35`,
                breakAfter: 'avoid',
                pageBreakAfter: 'avoid'
              }}
              className="resume-section-title font-bold font-serif text-center mb-2 uppercase tracking-wider border-b pb-0.5"
            >
              Core Competencies
            </h2>
            <div className="flex flex-wrap justify-center gap-2 text-xs font-serif">
              {skills.flatMap((s) => s.items || [s.category]).map((item, idx) => (
                <span
                  key={idx}
                  style={{ borderColor: `${accentColor}50`, backgroundColor: `${accentColor}08`, color: accentColor }}
                  className="px-3 py-1 rounded font-bold border font-serif"
                >
                  {item.trim().replace(/\.?$/, '')}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="resume-section page-break-avoid">
            <h2
              style={{
                fontSize: 'var(--resume-section-title-size, 14px)',
                color: accentColor,
                borderColor: `${accentColor}35`,
                breakAfter: 'avoid',
                pageBreakAfter: 'avoid'
              }}
              className="resume-section-title font-bold font-serif text-center mb-2 uppercase tracking-wider border-b pb-0.5"
            >
              Education & Credentials
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-item-gap, 10px)' }}>
              {education.map((edu) => (
                <div key={edu.id} className="education-entry resume-entry page-break-avoid resume-section-item font-serif">
                  <div className="font-bold text-slate-950">
                    {edu.degree}{edu.degree && edu.institution ? ' — ' : ''}{edu.institution}
                  </div>
                  <div className="text-xs text-slate-600 font-sans italic">
                    {[edu.location, edu.endDate || edu.startDate].filter(Boolean).join(' | ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div className="resume-section page-break-avoid">
            <h2
              style={{
                fontSize: 'var(--resume-section-title-size, 14px)',
                color: accentColor,
                borderColor: `${accentColor}35`,
                breakAfter: 'avoid',
                pageBreakAfter: 'avoid'
              }}
              className="resume-section-title font-bold font-serif text-center mb-2 uppercase tracking-wider border-b pb-0.5"
            >
              Certifications & Leadership
            </h2>
            <div className="space-y-1 text-xs font-serif text-slate-800">
              {certifications.map((cert) => (
                <div key={cert.id} className="certification-entry resume-entry flex justify-between items-baseline page-break-avoid">
                  <div>
                    <span className="font-bold">{cert.name}</span>
                    {cert.issuer && <span> — {cert.issuer}</span>}
                  </div>
                  {cert.date && <span className="text-slate-600 font-sans italic">{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
