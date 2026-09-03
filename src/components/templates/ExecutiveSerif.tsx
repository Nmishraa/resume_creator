import React from 'react';
import { ResumeData } from '../../types/resume';
import { getFontSizeClass, getSpacingClass } from './templateStyles';

export const ExecutiveSerif: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, customSections, formatting } = resume;
  const size = getFontSizeClass(formatting.fontSize);
  const spacing = getSpacingClass(formatting.spacing);

  return (
    <div className={`w-full bg-white text-slate-900 p-8 sm:p-12 font-serif ${size.body}`}>
      {/* Centered Classic Executive Header */}
      <div className="text-center pb-2 mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-wide text-slate-950 uppercase mb-2 font-serif" role="heading" aria-level={1}>
          {personalInfo.fullName || 'Neha Mishra'}
        </h1>

        {/* Dual Horizontal Border Divider (Thick top + thin bottom line) */}
        <div className="w-full my-3" aria-hidden="true">
          <div className="border-t-2 border-slate-950 mb-[3px]"></div>
          <div className="border-t border-slate-950"></div>
        </div>

        {/* Centered Contact Info Line */}
        <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 text-sm text-slate-800 font-serif">
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

      <div className="space-y-6">
        {/* Professional Summary */}
        {summary && (
          <div>
            <h2 className="text-xl font-bold font-serif text-slate-950 mb-2">
              Professional Summary
            </h2>
            <p className="text-slate-800 leading-relaxed font-serif text-justify text-sm sm:text-base">
              {summary}
            </p>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold font-serif text-slate-950 mb-2">
              Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 text-sm font-serif text-slate-800">
              {skills.map((s) => {
                const itemsToRender = s.items && s.items.length > 0 ? s.items : [s.category];
                return itemsToRender.map((item, idx) => (
                  <div key={`${s.id}-${idx}`} className="flex items-center gap-2">
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
            <h2 className="text-xl font-bold font-serif text-slate-950 mb-2">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => {
                const degreeTitle = [edu.degree, edu.endDate].filter(Boolean).join(' - ');
                const instDetails = [edu.institution, edu.location].filter(Boolean).join(' - ');
                return (
                  <div key={edu.id} className="page-break-avoid font-serif">
                    <div className="font-bold text-slate-950 text-base">
                      {degreeTitle || edu.degree}
                    </div>
                    {instDetails && (
                      <div className="italic text-slate-800 text-sm">
                        {instDetails}
                      </div>
                    )}
                    {edu.gpa && <div className="text-xs text-slate-600 mt-0.5">GPA: {edu.gpa}</div>}
                    {edu.highlights && edu.highlights.length > 0 && (
                      <ul className="mt-1 list-disc list-outside ml-5 text-slate-800 text-sm space-y-0.5">
                        {edu.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Work History */}
        {experience && experience.length > 0 && (
          <div>
            <h2 className="text-xl font-bold font-serif text-slate-950 mb-2">
              Work History
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => {
                const dateRange = exp.startDate
                  ? `${exp.startDate}${exp.endDate ? ` to ${exp.endDate}` : exp.current ? ' to Present' : ''}`
                  : exp.endDate || '';
                const roleHeader = [exp.role, dateRange].filter(Boolean).join(' - ');
                const companyDetails = [exp.company, exp.location].filter(Boolean).join(' - ');

                return (
                  <div key={exp.id} className="page-break-avoid font-serif">
                    <div className="font-bold text-slate-950 text-base">
                      {roleHeader || exp.role}
                    </div>
                    {companyDetails && (
                      <div className="italic text-slate-800 text-sm mb-1">
                        {companyDetails}
                      </div>
                    )}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="list-disc list-outside ml-5 text-slate-800 text-sm space-y-1">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="pl-1 leading-normal">{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Key Projects */}
        {projects && projects.length > 0 && (
          <div>
            <h2 className="text-xl font-bold font-serif text-slate-950 mb-2">
              Key Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => {
                const dateText = proj.startDate ? `${proj.startDate}${proj.endDate ? ` - ${proj.endDate}` : ''}` : '';
                const titleHeader = [proj.title, dateText].filter(Boolean).join(' - ');
                return (
                  <div key={proj.id} className="page-break-avoid font-serif text-sm">
                    <div className="font-bold text-slate-950 text-base">{titleHeader}</div>
                    {proj.subtitle && <div className="italic text-slate-800">{proj.subtitle}</div>}
                    {proj.highlights && proj.highlights.length > 0 && (
                      <ul className="mt-1 list-disc list-outside ml-5 text-slate-800 space-y-0.5">
                        {proj.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div>
            <h2 className="text-xl font-bold font-serif text-slate-950 mb-2">
              Certifications
            </h2>
            <ul className="list-disc list-outside ml-5 text-slate-800 text-sm font-serif space-y-1">
              {certifications.map((c) => (
                <li key={c.id}>
                  <span className="font-bold">{c.name}</span>
                  {c.issuer && <span className="italic"> - {c.issuer}</span>}
                  {c.date && <span> ({c.date})</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Custom Sections */}
        {customSections && customSections.length > 0 && (
          <>
            {customSections.map((sec) => (
              <div key={sec.id}>
                <h2 className="text-xl font-bold font-serif text-slate-950 mb-2">
                  {sec.title}
                </h2>
                <div className="space-y-2">
                  {sec.items.map((item) => (
                    <div key={item.id} className="font-serif text-sm">
                      <div className="font-bold text-slate-950">
                        {item.title}{item.date ? ` - ${item.date}` : ''}
                      </div>
                      {item.subtitle && <div className="italic text-slate-800">{item.subtitle}</div>}
                      {item.description && <p className="mt-0.5 text-slate-800">{item.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

