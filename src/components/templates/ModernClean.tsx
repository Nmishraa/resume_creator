import React from 'react';
import { ResumeData } from '../../types/resume';
import { getFontFamilyClass, getFontSizeClass, getSpacingClass } from './templateStyles';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../common/BrandIcons';

interface TemplateProps {
  resume: ResumeData;
}

export const ModernClean: React.FC<TemplateProps> = ({ resume }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, formatting } = resume;
  const fontClass = getFontFamilyClass(formatting.fontFamily);
  const size = getFontSizeClass(formatting.fontSize);
  const spacing = getSpacingClass(formatting.spacing);
  const accentColor = formatting.accentColor || '#0284c7';

  return (
    <div className={`w-full bg-white text-slate-800 p-8 sm:p-10 ${fontClass} ${size.body}`}>
      {/* Header */}
      <div className="border-b pb-4 mb-4" style={{ borderColor: `${accentColor}30` }}>
        <h1 className={`${size.name} text-slate-900 leading-tight mb-1`}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-sm font-semibold tracking-wide" style={{ color: accentColor }}>
          {personalInfo.jobTitle || 'Professional Title'}
        </p>

        {/* Contact info row */}
        <div className="flex flex-wrap gap-y-1.5 gap-x-4 mt-2.5 text-xs text-slate-600">
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

      <div className={spacing.sectionGap}>
        {/* Summary */}
        {summary && (
          <div>
            <h2 className={`${size.sectionTitle} flex items-center gap-2 mb-2 pb-1 border-b`} style={{ color: accentColor, borderColor: `${accentColor}25` }}>
              Professional Summary
            </h2>
            <p className="text-slate-700 leading-relaxed text-justify">
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div>
            <h2 className={`${size.sectionTitle} flex items-center gap-2 mb-2.5 pb-1 border-b`} style={{ color: accentColor, borderColor: `${accentColor}25` }}>
              Work Experience
            </h2>
            <div className={spacing.itemGap}>
              {experience.map((exp) => (
                <div key={exp.id} className="page-break-avoid">
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
                    <ul className={`mt-1.5 list-disc list-outside ml-4 text-slate-700 ${spacing.bulletGap}`}>
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
            <h2 className={`${size.sectionTitle} flex items-center gap-2 mb-2 pb-1 border-b`} style={{ color: accentColor, borderColor: `${accentColor}25` }}>
              Core Skills & Technologies
            </h2>
            <div className="space-y-1.5 text-slate-700">
              {skills.map((cat) => (
                <div key={cat.id} className="flex flex-wrap items-baseline gap-1 text-xs">
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
            <h2 className={`${size.sectionTitle} flex items-center gap-2 mb-2.5 pb-1 border-b`} style={{ color: accentColor, borderColor: `${accentColor}25` }}>
              Key Projects
            </h2>
            <div className={spacing.itemGap}>
              {projects.map((proj) => (
                <div key={proj.id} className="page-break-avoid">
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
                    <ul className={`mt-1 list-disc list-outside ml-4 text-slate-700 ${spacing.bulletGap}`}>
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
            <h2 className={`${size.sectionTitle} flex items-center gap-2 mb-2 pb-1 border-b`} style={{ color: accentColor, borderColor: `${accentColor}25` }}>
              Education
            </h2>
            <div className={spacing.itemGap}>
              {education.map((edu) => (
                <div key={edu.id} className="page-break-avoid">
                  <div className="flex justify-between items-baseline flex-wrap gap-x-2">
                    <div className="flex items-center gap-2">
                      <span className={`${size.itemTitle} text-slate-900`}>{edu.degree}</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-slate-700 font-medium text-xs sm:text-sm">{edu.institution}</span>
                    </div>
                    <div className={size.meta}>
                      {edu.startDate} - {edu.endDate} {edu.location && `• ${edu.location}`}
                    </div>
                  </div>
                  {edu.gpa && <div className="text-xs text-slate-600 mt-0.5">GPA: {edu.gpa}</div>}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className={`mt-1 list-disc list-outside ml-4 text-slate-600 ${spacing.bulletGap}`}>
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="pl-1 text-xs">{h}</li>
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
            <h2 className={`${size.sectionTitle} flex items-center gap-2 mb-2 pb-1 border-b`} style={{ color: accentColor, borderColor: `${accentColor}25` }}>
              Certifications & Credentials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-center bg-slate-50/70 p-1.5 rounded border border-slate-100">
                  <span className="font-semibold text-slate-800">{cert.name}</span>
                  <span className="text-slate-500 text-[11px]">{cert.issuer} ({cert.date})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
