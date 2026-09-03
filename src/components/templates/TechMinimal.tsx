import React from 'react';
import { ResumeData } from '../../types/resume';
import { getFontFamilyClass, getFontSizeClass, getSpacingClass } from './templateStyles';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../common/BrandIcons';

export const TechMinimal: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, formatting } = resume;
  const fontClass = getFontFamilyClass(formatting.fontFamily);
  const size = getFontSizeClass(formatting.fontSize);
  const spacing = getSpacingClass(formatting.spacing);
  const accentColor = formatting.accentColor || '#0f766e';

  return (
    <div className={`w-full max-w-[794px] box-border bg-white text-slate-800 px-8 sm:px-10 py-8 sm:py-10 ${fontClass} ${size.body}`}>
      {/* Header */}
      <div className="pb-3 mb-4 border-b-2" style={{ borderColor: accentColor }}>
        <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2">
          <div>
            <div className={`${size.name} text-slate-950 font-mono tracking-tight uppercase font-bold`} role="heading" aria-level={2}>
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

      <div className={spacing.sectionGap}>
        {/* Summary */}
        {summary && (
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
              01 // SUMMARY
            </div>
            <p className="text-slate-700 leading-relaxed font-sans">{summary}</p>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
              02 // TECHNICAL SKILLS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {skills.map((s) => (
                <div key={s.id} className="bg-slate-50 p-2 rounded border border-slate-200">
                  <div className="font-mono font-semibold text-slate-900 mb-1">{s.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {s.items.map((item, idx) => (
                      <span key={idx} className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-[11px] font-mono text-slate-700">
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
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
              03 // EXPERIENCE
            </div>
            <div className={spacing.itemGap}>
              {experience.map((exp) => (
                <div key={exp.id} className="page-break-avoid border-l-2 pl-3" style={{ borderColor: `${accentColor}40` }}>
                  <div className="flex justify-between items-baseline flex-wrap">
                    <div>
                      <span className={`${size.itemTitle} text-slate-950 font-bold`}>{exp.role}</span>
                      <span className="text-slate-500 text-xs font-mono"> @ {exp.company}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      [{exp.startDate} - {exp.current ? 'PRESENT' : exp.endDate}] {exp.location && `| ${exp.location}`}
                    </span>
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className={`mt-1.5 list-disc list-outside ml-4 text-slate-700 ${spacing.bulletGap}`}>
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="pl-0.5 leading-snug">{h}</li>
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
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
              04 // PROJECTS
            </div>
            <div className={spacing.itemGap}>
              {projects.map((proj) => (
                <div key={proj.id} className="page-break-avoid">
                  <div className="flex justify-between items-baseline flex-wrap">
                    <span className={`${size.itemTitle} text-slate-900 font-mono`}>{proj.title}</span>
                    {proj.startDate && <span className="text-xs font-mono text-slate-500">{proj.startDate}</span>}
                  </div>
                  {proj.technologies && (
                    <div className="text-[11px] font-mono text-slate-500">
                      stack: [{proj.technologies.join(', ')}]
                    </div>
                  )}
                  {proj.highlights && (
                    <ul className={`mt-1 list-disc list-outside ml-4 text-slate-700 ${spacing.bulletGap}`}>
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="pl-0.5 leading-snug">{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Certs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {education && education.length > 0 && (
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                05 // EDUCATION
              </div>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600 font-mono">{edu.institution} ({edu.startDate}-{edu.endDate})</div>
                    {edu.gpa && <div className="text-slate-500 font-mono">GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                06 // CERTIFICATIONS
              </div>
              <div className="space-y-1.5 text-xs">
                {certifications.map((c) => (
                  <div key={c.id} className="font-mono text-slate-700">
                    • <span className="font-semibold text-slate-900">{c.name}</span> <span className="text-slate-500">({c.issuer})</span>
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
