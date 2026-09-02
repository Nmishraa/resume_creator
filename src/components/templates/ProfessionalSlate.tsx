import React from 'react';
import { ResumeData } from '../../types/resume';
import { getFontFamilyClass, getFontSizeClass, getSpacingClass } from './templateStyles';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../common/BrandIcons';

export const ProfessionalSlate: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, formatting } = resume;
  const fontClass = getFontFamilyClass(formatting.fontFamily);
  const size = getFontSizeClass(formatting.fontSize);
  const spacing = getSpacingClass(formatting.spacing);
  const accentColor = formatting.accentColor || '#334155';

  return (
    <div className={`w-full bg-white text-slate-800 p-8 sm:p-10 ${fontClass} ${size.body}`}>
      {/* Banner Top Header */}
      <div className="bg-slate-900 text-white -m-8 sm:-m-10 p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase" role="heading" aria-level={2}>
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

      <div className={`mt-6 ${spacing.sectionGap}`}>
        {/* Summary */}
        {summary && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-4 bg-slate-800 rounded-sm"></span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Summary</h2>
            </div>
            <p className="text-slate-700 leading-relaxed pl-3.5 border-l border-slate-200">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-1.5 h-4 bg-slate-800 rounded-sm"></span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Experience</h2>
            </div>
            <div className={`pl-3.5 border-l border-slate-200 ${spacing.itemGap}`}>
              {experience.map((exp) => (
                <div key={exp.id} className="page-break-avoid">
                  <div className="flex justify-between items-baseline flex-wrap">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{exp.role}</span>
                      <span className="text-slate-600 text-xs"> — {exp.company}</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate} {exp.location && `| ${exp.location}`}
                    </span>
                  </div>
                  {exp.highlights && (
                    <ul className={`mt-1 list-disc list-outside ml-4 text-slate-700 ${spacing.bulletGap}`}>
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
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-4 bg-slate-800 rounded-sm"></span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Technical Skills</h2>
            </div>
            <div className="pl-3.5 border-l border-slate-200 space-y-1.5 text-xs">
              {skills.map((s) => (
                <div key={s.id} className="flex flex-wrap items-baseline gap-1">
                  <span className="font-bold text-slate-900 min-w-[130px]">{s.category}:</span>
                  <span className="text-slate-700">{s.items.join(' • ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-4 bg-slate-800 rounded-sm"></span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Key Projects</h2>
            </div>
            <div className={`pl-3.5 border-l border-slate-200 ${spacing.itemGap}`}>
              {projects.map((proj) => (
                <div key={proj.id} className="page-break-avoid text-xs">
                  <div className="flex justify-between items-baseline font-medium text-slate-900">
                    <span className="font-bold text-sm">{proj.title}</span>
                    <span className="text-slate-500">{proj.startDate}</span>
                  </div>
                  {proj.highlights && (
                    <ul className={`mt-1 list-disc list-outside ml-4 text-slate-700 ${spacing.bulletGap}`}>
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

        {/* Education & Certs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {education && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-4 bg-slate-800 rounded-sm"></span>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Education</h2>
              </div>
              <div className="pl-3.5 border-l border-slate-200 text-xs space-y-1">
                {education.map(edu => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600">{edu.institution} ({edu.startDate}-{edu.endDate})</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-4 bg-slate-800 rounded-sm"></span>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Certifications</h2>
              </div>
              <div className="pl-3.5 border-l border-slate-200 text-xs space-y-1">
                {certifications.map(c => (
                  <div key={c.id} className="text-slate-800">
                    <span className="font-semibold">{c.name}</span> — {c.issuer}
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
