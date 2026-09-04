import React from 'react';
import { ResumeData, DensityMode } from '../../types/resume';
import { getFontFamilyClass, getFontSizeClass, getAdaptiveDensityStyles, getSummaryBullets } from './templateStyles';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../common/BrandIcons';

interface TemplateProps {
  resume: ResumeData;
  densityMode?: DensityMode;
}

export const CompactSidebar: React.FC<TemplateProps> = ({ resume, densityMode = 'standard' }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, formatting } = resume;
  const fontClass = getFontFamilyClass(formatting.fontFamily);
  const size = getFontSizeClass(formatting.fontSize);
  const accentColor = formatting.accentColor || '#1e40af';
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
      <div
        style={{ columnGap: 'var(--resume-column-gap, 24px)' }}
        className="grid grid-cols-1 md:grid-cols-3 items-stretch"
      >
        {/* Left Sidebar Column (1/3) */}
        <div className="md:border-r md:pr-5 border-slate-200 h-full flex flex-col justify-between">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-section-gap, 18px)' }}>
            <div>
              <div
                style={{ fontSize: 'var(--resume-name-size, 25px)' }}
                className="font-black tracking-tight text-slate-900 leading-tight uppercase font-bold"
                role="heading"
                aria-level={2}
              >
                {personalInfo.fullName || 'Candidate'}
              </div>
              <p className="text-xs font-bold mt-0.5 tracking-wide" style={{ color: accentColor }}>
                {personalInfo.jobTitle || 'Software Engineer'}
              </p>
            </div>

            {/* Contact */}
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-contact-gap, 6px)' }}
              className="text-xs text-slate-600 border-t pt-3 border-slate-100"
            >
              {personalInfo.email && (
                <div className="flex items-center gap-1.5 break-all">
                  <Mail size={12} className="shrink-0 text-slate-400" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone size={12} className="shrink-0 text-slate-400" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin size={12} className="shrink-0 text-slate-400" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-1.5 break-all">
                  <LinkedinIcon size={12} className="shrink-0 text-slate-400" />
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-1.5 break-all">
                  <GithubIcon size={12} className="shrink-0 text-slate-400" />
                  <span>{personalInfo.github}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-1.5 break-all">
                  <Globe size={12} className="shrink-0 text-slate-400" />
                  <span>{personalInfo.website}</span>
                </div>
              )}
            </div>

            {/* Skills */}
            {skills && skills.length > 0 && (
              <div className="border-t pt-3 border-slate-100">
                <h2
                  style={{
                    fontSize: 'var(--resume-section-title-size, 13px)',
                    color: accentColor,
                    breakAfter: 'avoid',
                    pageBreakAfter: 'avoid'
                  }}
                  className="resume-section-title font-bold uppercase tracking-wider mb-2"
                >
                  Skills
                </h2>
                <div className="space-y-2">
                  {skills.map((s) => (
                    <div key={s.id} className="skill-group resume-entry text-xs page-break-avoid">
                      <div className="font-semibold text-slate-800 text-[11px] mb-0.5">{s.category}</div>
                      <div className="flex flex-wrap gap-1">
                        {s.items.map((item, idx) => (
                          <span key={idx} className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] text-slate-700">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <div className="border-t pt-3 border-slate-100">
                <h2
                  style={{
                    fontSize: 'var(--resume-section-title-size, 13px)',
                    color: accentColor,
                    breakAfter: 'avoid',
                    pageBreakAfter: 'avoid'
                  }}
                  className="resume-section-title font-bold uppercase tracking-wider mb-2"
                >
                  Education
                </h2>
                <div className="space-y-2 text-xs">
                  {education.map(edu => (
                    <div key={edu.id} className="education-entry resume-entry page-break-avoid">
                      <div className="font-bold text-slate-900">
                        {edu.degree}{edu.degree && edu.institution ? ' — ' : ''}{edu.institution}
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        {[edu.location, edu.endDate || edu.startDate].filter(Boolean).join(' | ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certs */}
            {certifications && certifications.length > 0 && (
              <div className="border-t pt-3 border-slate-100">
                <h2
                  style={{
                    fontSize: 'var(--resume-section-title-size, 13px)',
                    color: accentColor,
                    breakAfter: 'avoid',
                    pageBreakAfter: 'avoid'
                  }}
                  className="resume-section-title font-bold uppercase tracking-wider mb-2"
                >
                  Certifications
                </h2>
                <div className="space-y-1 text-[11px]">
                  {certifications.map(c => (
                    <div key={c.id} className="certification-entry resume-entry text-slate-700 page-break-avoid">
                      <span className="font-semibold">{c.name}</span>
                      <span className="text-slate-500 block text-[10px]">{c.issuer}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Main Column (2/3) */}
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-section-gap, 18px)' }}
          className="md:col-span-2"
        >
          {/* Summary */}
          {summary && (
            <div>
              <h2
                style={{
                  fontSize: 'var(--resume-section-title-size, 14px)',
                  color: accentColor,
                  borderColor: `${accentColor}30`,
                  breakAfter: 'avoid',
                  pageBreakAfter: 'avoid'
                }}
                className="resume-section-title font-bold uppercase tracking-wider pb-1 border-b mb-1.5"
              >
                Profile
              </h2>
              <ul
                style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-bullet-gap, 6px)' }}
                className="resume-entry summary-entry list-disc list-outside ml-4 text-slate-700 text-left"
              >
                {getSummaryBullets(summary).map((bullet, idx) => (
                  <li key={idx} className="pl-0.5">{bullet}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: 'var(--resume-section-title-size, 14px)',
                  color: accentColor,
                  borderColor: `${accentColor}30`,
                  breakAfter: 'avoid',
                  pageBreakAfter: 'avoid'
                }}
                className="resume-section-title font-bold uppercase tracking-wider pb-1 border-b mb-2"
              >
                Experience
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-item-gap, 10px)' }}>
                {experience.map((exp) => (
                  <div key={exp.id} className="experience-entry resume-entry page-break-avoid">
                    <div className="flex justify-between items-baseline flex-wrap">
                      <span className="font-bold text-slate-900">{exp.role}</span>
                      <span className="text-slate-500 text-xs font-mono">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-600 mb-1">{exp.company} {exp.location && `• ${exp.location}`}</div>
                    {exp.highlights && (
                      <ul
                        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-bullet-gap, 6px)' }}
                        className="list-disc list-outside ml-4 text-slate-700"
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
            <div>
              <h2
                style={{
                  fontSize: 'var(--resume-section-title-size, 14px)',
                  color: accentColor,
                  borderColor: `${accentColor}30`,
                  breakAfter: 'avoid',
                  pageBreakAfter: 'avoid'
                }}
                className="font-bold uppercase tracking-wider pb-1 border-b mb-2"
              >
                Projects
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-item-gap, 10px)' }}>
                {projects.map((proj) => (
                  <div key={proj.id} className="page-break-avoid resume-section-item text-xs">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900">{proj.title}</span>
                      <span className="text-[11px] text-slate-500">{proj.startDate}</span>
                    </div>
                    {proj.highlights && (
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
        </div>
      </div>
    </div>
  );
};
