import React from 'react';
import { ResumeData, DensityMode } from '../../types/resume';
import { getFontFamilyClass, getFontSizeClass, getAdaptiveDensityStyles, getSummaryBullets } from './templateStyles';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../common/BrandIcons';

interface TemplateProps {
  resume: ResumeData;
  densityMode?: DensityMode;
}

export const ModernClean: React.FC<TemplateProps> = ({ resume, densityMode = 'standard' }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, formatting } = resume;
  const fontClass = getFontFamilyClass(formatting.fontFamily);
  const size = getFontSizeClass(formatting.fontSize);
  const accentColor = formatting.accentColor || '#0284c7';
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
      {/* Header */}
      <div className="border-b pb-3 mb-4" style={{ borderColor: `${accentColor}30` }}>
        <div
          style={{ fontSize: 'var(--resume-name-size, 25px)' }}
          className="text-slate-900 leading-tight mb-1 font-bold tracking-tight"
          role="heading"
          aria-level={2}
        >
          {personalInfo.fullName || 'Your Name'}
        </div>
        <p className="text-sm font-semibold tracking-wide" style={{ color: accentColor }}>
          {personalInfo.jobTitle || 'Professional Title'}
        </p>

        {/* Contact info row */}
        <div style={{ gap: 'var(--resume-contact-gap, 10px)' }} className="flex flex-wrap gap-y-1.5 mt-2 text-xs text-slate-600">
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:text-slate-900 transition-colors">
              {formatting.showIcons && <Mail size={12} className="text-slate-400" />}
              <span>{personalInfo.email}</span>
            </a>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              {formatting.showIcons && <Phone size={12} className="text-slate-400" />}
              <span>{personalInfo.phone}</span>
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              {formatting.showIcons && <MapPin size={12} className="text-slate-400" />}
              <span>{personalInfo.location}</span>
            </span>
          )}
          {personalInfo.website && (
            <a href={`https://${personalInfo.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-slate-900">
              {formatting.showIcons && <Globe size={12} className="text-slate-400" />}
              <span>{personalInfo.website}</span>
            </a>
          )}
          {personalInfo.linkedin && (
            <a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-slate-900">
              {formatting.showIcons && <LinkedinIcon size={12} className="text-slate-400" />}
              <span>{personalInfo.linkedin}</span>
            </a>
          )}
          {personalInfo.github && (
            <a href={`https://${personalInfo.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-slate-900">
              {formatting.showIcons && <GithubIcon size={12} className="text-slate-400" />}
              <span>{personalInfo.github}</span>
            </a>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-section-gap, 18px)' }}>
        {/* Summary */}
        {summary && (
          <div>
            <h2
              style={{
                fontSize: 'var(--resume-section-title-size, 14px)',
                color: accentColor,
                borderColor: `${accentColor}25`,
                breakAfter: 'avoid',
                pageBreakAfter: 'avoid'
              }}
              className="resume-section-title font-bold uppercase tracking-wider mb-2 pb-1 border-b flex items-center gap-2"
            >
              Professional Summary
            </h2>
            <ul
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-bullet-gap, 6px)' }}
              className="resume-entry summary-entry list-disc list-outside ml-4 text-slate-700"
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
                fontSize: 'var(--resume-section-title-size, 14px)',
                color: accentColor,
                borderColor: `${accentColor}25`,
                breakAfter: 'avoid',
                pageBreakAfter: 'avoid'
              }}
              className="resume-section-title font-bold uppercase tracking-wider mb-2.5 pb-1 border-b flex items-center gap-2"
            >
              Work Experience
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-item-gap, 10px)' }}>
              {experience.map((exp) => (
                <div key={exp.id} className="experience-entry resume-entry page-break-avoid resume-section-item">
                  <div className="flex justify-between items-baseline flex-wrap gap-x-2">
                    <div className="flex items-center gap-2">
                      <span className={`${size.itemTitle} text-slate-900`}>{exp.role}</span>
                      <span className="text-slate-400 font-medium">|</span>
                      <span className="font-semibold text-slate-700 text-xs sm:text-sm">{exp.company}</span>
                    </div>
                    <div className={size.meta}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate} {exp.location && `• ${exp.location}`}
                    </div>
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul
                      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-bullet-gap, 6px)' }}
                      className="mt-1.5 list-disc list-outside ml-4 text-slate-700"
                    >
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="pl-1 leading-snug">{h}</li>
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
                fontSize: 'var(--resume-section-title-size, 14px)',
                color: accentColor,
                borderColor: `${accentColor}25`,
                breakAfter: 'avoid',
                pageBreakAfter: 'avoid'
              }}
              className="resume-section-title font-bold uppercase tracking-wider mb-2 pb-1 border-b flex items-center gap-2"
            >
              Core Skills &amp; Technologies
            </h2>
            <div className="space-y-1.5 text-slate-700">
              {skills.map((cat) => (
                <div key={cat.id} className="skill-group resume-entry flex flex-wrap items-baseline gap-1 text-xs page-break-avoid">
                  <span className="font-bold text-slate-900 min-w-[120px]">{cat.category}:</span>
                  <span className="text-slate-700">{cat.items.join(' • ')}</span>
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
                borderColor: `${accentColor}25`,
                breakAfter: 'avoid',
                pageBreakAfter: 'avoid'
              }}
              className="resume-section-title font-bold uppercase tracking-wider mb-2.5 pb-1 border-b flex items-center gap-2"
            >
              Key Projects
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-item-gap, 10px)' }}>
              {projects.map((proj) => (
                <div key={proj.id} className="project-entry resume-entry page-break-avoid resume-section-item">
                  <div className="flex justify-between items-baseline flex-wrap gap-x-2">
                    <div className="flex items-center gap-2">
                      <span className={`${size.itemTitle} text-slate-900`}>{proj.title}</span>
                      {proj.subtitle && <span className="text-xs text-slate-500 font-medium">({proj.subtitle})</span>}
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-700 inline-flex items-center">
                          <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                    {proj.startDate && (
                      <div className={size.meta}>{proj.startDate} {proj.endDate && `- ${proj.endDate}`}</div>
                    )}
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      <span className="font-semibold">Tech:</span> {proj.technologies.join(', ')}
                    </div>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul
                      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-bullet-gap, 6px)' }}
                      className="mt-1 list-disc list-outside ml-4 text-slate-700"
                    >
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="pl-1 leading-snug">{h}</li>
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
            <h2
              style={{
                fontSize: 'var(--resume-section-title-size, 14px)',
                color: accentColor,
                borderColor: `${accentColor}25`,
                breakAfter: 'avoid',
                pageBreakAfter: 'avoid'
              }}
              className="resume-section-title font-bold uppercase tracking-wider mb-2 pb-1 border-b flex items-center gap-2"
            >
              Education
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-item-gap, 10px)' }}>
              {education.map((edu) => (
                <div key={edu.id} className="education-entry resume-entry page-break-avoid resume-section-item">
                  <div className="font-bold text-slate-900 flex flex-wrap items-center gap-1.5">
                    <span>{edu.degree}</span>
                    {edu.degree && edu.institution && <span className="text-slate-400 font-normal">—</span>}
                    <span className="text-slate-700 font-medium text-xs sm:text-sm">{edu.institution}</span>
                  </div>
                  <div className={`${size.meta} text-slate-500 mt-0.5`}>
                    {[edu.location, edu.endDate || edu.startDate].filter(Boolean).join(' | ')}
                  </div>
                  {edu.gpa && <div className="text-xs text-slate-500 font-semibold mt-0.5">GPA: {edu.gpa}</div>}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul
                      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--resume-bullet-gap, 6px)' }}
                      className="mt-1 list-disc list-outside ml-4 text-slate-700"
                    >
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="pl-1 leading-snug">{h}</li>
                      ))}
                    </ul>
                  )}
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
                fontSize: 'var(--resume-section-title-size, 14px)',
                color: accentColor,
                borderColor: `${accentColor}25`,
                breakAfter: 'avoid',
                pageBreakAfter: 'avoid'
              }}
              className="resume-section-title font-bold uppercase tracking-wider mb-2 pb-1 border-b flex items-center gap-2"
            >
              Certifications &amp; Licensures
            </h2>
            <div className="space-y-1 text-slate-700">
              {certifications.map((cert) => (
                <div key={cert.id} className="certification-entry resume-entry flex justify-between items-baseline text-xs page-break-avoid">
                  <div>
                    <span className="font-bold text-slate-900">{cert.name}</span>
                    {cert.issuer && <span className="text-slate-500"> — {cert.issuer}</span>}
                  </div>
                  {cert.date && <span className={size.meta}>{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
