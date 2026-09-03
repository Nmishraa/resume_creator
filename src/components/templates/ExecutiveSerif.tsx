import React from 'react';
import { ResumeData, DensityMode } from '../../types/resume';
import { getFontSizeClass, getAdaptiveDensityStyles, getSummaryBullets } from './templateStyles';

interface TemplateProps {
  resume: ResumeData;
  densityMode?: DensityMode;
}

export const ExecutiveSerif: React.FC<TemplateProps> = ({ resume, densityMode = 'standard' }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, customSections, formatting } = resume;
  const size = getFontSizeClass(formatting.fontSize);
  const densityStyles = getAdaptiveDensityStyles(densityMode);

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

        {/* Dual Horizontal Border Divider */}
        <div className="w-full my-2" aria-hidden="true">
          <div className="border-t-2 border-slate-950 mb-[3px]"></div>
          <div className="border-t border-slate-950"></div>
        </div>

        {/* Centered Contact Info Line */}
        <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 text-xs text-slate-800 font-serif">
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
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-section-gap, 18px)' }}>
        {/* Professional Summary */}
        {summary && (
          <div>
            <h2
              style={{
                fontSize: 'var(--resume-section-title-size, 15px)',
                breakAfter: 'avoid',
                pageBreakAfter: 'avoid'
              }}
              className="resume-section-title font-bold font-serif text-slate-950 mb-1.5 uppercase tracking-wide border-b border-slate-200 pb-0.5"
            >
              Professional Summary
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
          <div>
            <h2
              style={{
                fontSize: 'var(--resume-section-title-size, 15px)',
                breakAfter: 'avoid',
                pageBreakAfter: 'avoid'
              }}
              className="resume-section-title font-bold font-serif text-slate-950 mb-2 uppercase tracking-wide border-b border-slate-200 pb-0.5"
            >
              Work Experience
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-item-gap, 10px)' }}>
              {experience.map((exp) => (
                <div key={exp.id} className="experience-entry resume-entry page-break-avoid resume-section-item font-serif">
                  <div className="flex justify-between items-baseline flex-wrap">
                    <div className="font-bold text-slate-950">
                      {exp.role} <span className="font-normal italic">at {exp.company}</span>
                    </div>
                    <div className="text-xs text-slate-600 font-sans">
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

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: 'var(--resume-section-title-size, 15px)',
                breakAfter: 'avoid',
                pageBreakAfter: 'avoid'
              }}
              className="resume-section-title font-bold font-serif text-slate-950 mb-1.5 uppercase tracking-wide border-b border-slate-200 pb-0.5"
            >
              Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-xs font-serif text-slate-800">
              {skills.map((s) => {
                const itemsToRender = s.items && s.items.length > 0 ? s.items : [s.category];
                return itemsToRender.map((item, idx) => (
                  <div key={`${s.id}-${idx}`} className="skill-group resume-entry flex items-center gap-2 page-break-avoid">
                    <span className="text-slate-950 font-bold">•</span>
                    <span>{item.trim().replace(/\.?$/, '.')}</span>
                  </div>
                ));
              })}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: 'var(--resume-section-title-size, 15px)',
                breakAfter: 'avoid',
                pageBreakAfter: 'avoid'
              }}
              className="resume-section-title font-bold font-serif text-slate-950 mb-1.5 uppercase tracking-wide border-b border-slate-200 pb-0.5"
            >
              Education
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-item-gap, 10px)' }}>
              {education.map((edu) => (
                <div key={edu.id} className="education-entry resume-entry page-break-avoid resume-section-item font-serif">
                  <div className="flex justify-between items-baseline">
                    <div className="font-bold text-slate-950">
                      {edu.degree}
                    </div>
                    <div className="text-xs text-slate-600 font-sans">
                      {edu.startDate} – {edu.endDate}
                    </div>
                  </div>
                  <div className="italic text-slate-800 text-xs">
                    {[edu.institution, edu.location].filter(Boolean).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: 'var(--resume-section-title-size, 15px)',
                breakAfter: 'avoid',
                pageBreakAfter: 'avoid'
              }}
              className="resume-section-title font-bold font-serif text-slate-950 mb-1.5 uppercase tracking-wide border-b border-slate-200 pb-0.5"
            >
              Certifications
            </h2>
            <div className="space-y-1 text-xs font-serif text-slate-800">
              {certifications.map((cert) => (
                <div key={cert.id} className="certification-entry resume-entry flex justify-between items-baseline page-break-avoid">
                  <div>
                    <span className="font-bold">{cert.name}</span>
                    {cert.issuer && <span> — {cert.issuer}</span>}
                  </div>
                  {cert.date && <span className="text-slate-600 font-sans">{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
