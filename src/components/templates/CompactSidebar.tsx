import React from 'react';
import { ResumeData } from '../../types/resume';
import { getFontFamilyClass, getFontSizeClass, getSpacingClass } from './templateStyles';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../common/BrandIcons';

export const CompactSidebar: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, formatting } = resume;
  const fontClass = getFontFamilyClass(formatting.fontFamily);
  const size = getFontSizeClass(formatting.fontSize);
  const spacing = getSpacingClass(formatting.spacing);
  const accentColor = formatting.accentColor || '#1e40af';

  return (
    <div className={`w-full bg-white text-slate-800 p-6 sm:p-8 ${fontClass} ${size.body}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column (1/3) */}
        <div className="space-y-4 md:border-r md:pr-5 border-slate-200">
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 leading-tight uppercase">
              {personalInfo.fullName || 'Candidate'}
            </h1>
            <p className="text-xs font-bold mt-0.5 tracking-wide" style={{ color: accentColor }}>
              {personalInfo.jobTitle || 'Software Engineer'}
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-1.5 text-xs text-slate-600 border-t pt-3 border-slate-100">
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
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2" style={{ color: accentColor }}>
                Skills
              </h2>
              <div className="space-y-2">
                {skills.map((s) => (
                  <div key={s.id} className="text-xs">
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
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2" style={{ color: accentColor }}>
                Education
              </h2>
              <div className="space-y-2 text-xs">
                {education.map(edu => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600 text-[11px]">{edu.institution}</div>
                    <div className="text-slate-400 text-[10px]">{edu.startDate} - {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certs */}
          {certifications && certifications.length > 0 && (
            <div className="border-t pt-3 border-slate-100">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2" style={{ color: accentColor }}>
                Certifications
              </h2>
              <div className="space-y-1 text-[11px]">
                {certifications.map(c => (
                  <div key={c.id} className="text-slate-700">
                    <span className="font-semibold">{c.name}</span>
                    <span className="text-slate-500 block text-[10px]">{c.issuer}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (2/3) */}
        <div className={`md:col-span-2 ${spacing.sectionGap}`}>
          {/* Summary */}
          {summary && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 border-b mb-1.5" style={{ color: accentColor, borderColor: `${accentColor}30` }}>
                Profile
              </h2>
              <p className="text-slate-700 leading-relaxed text-justify">{summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 border-b mb-2" style={{ color: accentColor, borderColor: `${accentColor}30` }}>
                Experience
              </h2>
              <div className={spacing.itemGap}>
                {experience.map((exp) => (
                  <div key={exp.id} className="page-break-avoid">
                    <div className="flex justify-between items-baseline flex-wrap">
                      <div>
                        <span className="font-bold text-slate-900 text-sm">{exp.role}</span>
                        <span className="text-slate-600 text-xs"> — {exp.company}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
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

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 border-b mb-2" style={{ color: accentColor, borderColor: `${accentColor}30` }}>
                Projects
              </h2>
              <div className={spacing.itemGap}>
                {projects.map((proj) => (
                  <div key={proj.id} className="page-break-avoid text-xs">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900">{proj.title}</span>
                      <span className="text-[11px] text-slate-500">{proj.startDate}</span>
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
        </div>
      </div>
    </div>
  );
};
