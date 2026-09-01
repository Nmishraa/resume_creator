import React from 'react';
import { ResumeData } from '../../types/resume';
import { getFontSizeClass, getSpacingClass } from './templateStyles';

export const ExecutiveSerif: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, formatting } = resume;
  const size = getFontSizeClass(formatting.fontSize);
  const spacing = getSpacingClass(formatting.spacing);
  const accentColor = formatting.accentColor || '#1e293b';

  return (
    <div className={`w-full bg-white text-slate-900 p-8 sm:p-10 font-serif ${size.body}`}>
      {/* Centered Classic Header */}
      <div className="text-center pb-4 mb-4 border-b-2 border-slate-900">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 uppercase mb-1">
          {personalInfo.fullName || 'Executive Candidate'}
        </h1>
        <div className="text-sm italic font-medium text-slate-700 mb-2">
          {personalInfo.jobTitle || 'Senior Technology Executive'}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs text-slate-600 font-sans">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.email && <span>• {personalInfo.email}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </div>

      <div className={spacing.sectionGap}>
        {/* Executive Summary */}
        {summary && (
          <div>
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-1 mb-2">
              Executive Profile
            </h2>
            <p className="text-slate-800 leading-relaxed text-justify">
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div>
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-1 mb-2.5">
              Professional Experience
            </h2>
            <div className={spacing.itemGap}>
              {experience.map((exp) => (
                <div key={exp.id} className="page-break-avoid">
                  <div className="flex justify-between items-baseline flex-wrap">
                    <div>
                      <span className="font-bold text-slate-950 text-sm">{exp.role}</span>
                      <span className="italic text-slate-700">, {exp.company}</span>
                    </div>
                    <span className="text-xs italic text-slate-600 font-sans">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate} | {exp.location}
                    </span>
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className={`mt-1.5 list-disc list-outside ml-4 text-slate-800 font-sans text-xs sm:text-[13px] ${spacing.bulletGap}`}>
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="pl-1 leading-normal">{h}</li>
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
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-1 mb-2">
              Core Competencies & Expertise
            </h2>
            <div className="space-y-1 text-xs font-sans">
              {skills.map((s) => (
                <div key={s.id} className="flex flex-wrap items-baseline gap-1.5">
                  <span className="font-bold text-slate-900">{s.category}:</span>
                  <span className="text-slate-700">{s.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Projects */}
        {projects && projects.length > 0 && (
          <div>
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-1 mb-2">
              Key Initiatives & Projects
            </h2>
            <div className={spacing.itemGap}>
              {projects.map((proj) => (
                <div key={proj.id} className="page-break-avoid font-sans text-xs">
                  <div className="flex justify-between items-baseline font-serif">
                    <span className="font-bold text-slate-900 text-sm">{proj.title}</span>
                    {proj.startDate && <span className="text-xs italic text-slate-600 font-sans">{proj.startDate}</span>}
                  </div>
                  {proj.highlights && (
                    <ul className={`mt-1 list-disc list-outside ml-4 text-slate-800 ${spacing.bulletGap}`}>
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="pl-1">{h}</li>
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
              <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-1 mb-2">
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="text-xs font-sans mb-1.5">
                  <div className="font-bold font-serif text-slate-900">{edu.degree}</div>
                  <div className="text-slate-700 italic">{edu.institution}, {edu.endDate}</div>
                  {edu.gpa && <div className="text-slate-600">Honors / GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-1 mb-2">
                Certifications
              </h2>
              <div className="space-y-1 text-xs font-sans">
                {certifications.map((c) => (
                  <div key={c.id} className="text-slate-800">
                    <span className="font-semibold">{c.name}</span> – <span className="text-slate-600 italic">{c.issuer}</span>
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
