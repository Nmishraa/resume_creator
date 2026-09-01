import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { enhanceBulletPoint, generateSummary } from '../../services/aiService';
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Plus,
  Trash2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Info
} from 'lucide-react';

export const EditorForm: React.FC = () => {
  const {
    resume,
    updatePersonalInfo,
    updateSummary,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkillCategory,
    updateSkillCategory,
    removeSkillCategory,
    addProject,
    updateProject,
    removeProject,
    addCertification,
    updateCertification,
    removeCertification,
  } = useResume();

  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    personal: true,
    summary: true,
    experience: true,
    skills: true,
    education: false,
    projects: false,
    certifications: false
  });

  const [enhancingBulletKey, setEnhancingBulletKey] = useState<string | null>(null);

  const toggleSection = (sec: string) => {
    setOpenSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  const handleAiPolishBullet = (expId: string, bulletIndex: number, currentText: string) => {
    const key = `${expId}-${bulletIndex}`;
    setEnhancingBulletKey(key);
    setTimeout(() => {
      const polished = enhanceBulletPoint(currentText, resume.personalInfo.jobTitle);
      const exp = resume.experience.find(e => e.id === expId);
      if (exp) {
        const newHighlights = [...exp.highlights];
        newHighlights[bulletIndex] = polished;
        updateExperience(expId, { highlights: newHighlights });
      }
      setEnhancingBulletKey(null);
    }, 300);
  };

  const handleAiPolishProjectBullet = (projId: string, bulletIndex: number, currentText: string) => {
    const key = `proj-${projId}-${bulletIndex}`;
    setEnhancingBulletKey(key);
    setTimeout(() => {
      const polished = enhanceBulletPoint(currentText, resume.personalInfo.jobTitle);
      const proj = resume.projects.find(p => p.id === projId);
      if (proj) {
        const newHighlights = [...proj.highlights];
        newHighlights[bulletIndex] = polished;
        updateProject(projId, { highlights: newHighlights });
      }
      setEnhancingBulletKey(null);
    }, 300);
  };

  const handleAiGenerateSummary = () => {
    const aiSummary = generateSummary(resume);
    updateSummary(aiSummary);
  };

  return (
    <div className="space-y-4 pb-20">
      
      {/* 1. PERSONAL DETAILS */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <button
          onClick={() => toggleSection('personal')}
          className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-100/60 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5 font-bold text-slate-800 text-sm">
            <User size={16} className="text-brand-600" />
            <span>Personal Information & Contact</span>
          </div>
          {openSections.personal ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
        </button>

        {openSections.personal && (
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={resume.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  placeholder="e.g. Alexander Wright"
                  className="w-full text-xs p-2.5 bg-slate-50/50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Target Job Title</label>
                <input
                  type="text"
                  value={resume.personalInfo.jobTitle}
                  onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                  placeholder="e.g. Senior Full-Stack Engineer"
                  className="w-full text-xs p-2.5 bg-slate-50/50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={resume.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full text-xs p-2.5 bg-slate-50/50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={resume.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full text-xs p-2.5 bg-slate-50/50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Location</label>
                <input
                  type="text"
                  value={resume.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  placeholder="San Francisco, CA"
                  className="w-full text-xs p-2.5 bg-slate-50/50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">LinkedIn Profile</label>
                <input
                  type="text"
                  value={resume.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/username"
                  className="w-full text-xs p-2.5 bg-slate-50/50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">GitHub / Portfolio</label>
                <input
                  type="text"
                  value={resume.personalInfo.github}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                  placeholder="github.com/username"
                  className="w-full text-xs p-2.5 bg-slate-50/50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Personal Website</label>
                <input
                  type="text"
                  value={resume.personalInfo.website}
                  onChange={(e) => updatePersonalInfo('website', e.target.value)}
                  placeholder="myportfolio.dev"
                  className="w-full text-xs p-2.5 bg-slate-50/50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. SUMMARY */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <button
          onClick={() => toggleSection('summary')}
          className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-100/60 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5 font-bold text-slate-800 text-sm">
            <FileText size={16} className="text-brand-600" />
            <span>Professional Summary</span>
          </div>
          {openSections.summary ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
        </button>

        {openSections.summary && (
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Highlight your years of experience, core technical achievements & metrics</span>
              <button
                onClick={handleAiGenerateSummary}
                className="flex items-center gap-1 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-lg transition-colors border border-purple-200"
              >
                <Sparkles size={12} />
                <span>AI Generate Summary</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={resume.summary}
              onChange={(e) => updateSummary(e.target.value)}
              placeholder="Results-driven Software Engineer with 5+ years building scalable cloud applications..."
              className="w-full text-xs p-3 bg-slate-50/50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none leading-relaxed"
            />
          </div>
        )}
      </div>

      {/* 3. WORK EXPERIENCE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <button
          onClick={() => toggleSection('experience')}
          className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-100/60 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5 font-bold text-slate-800 text-sm">
            <Briefcase size={16} className="text-brand-600" />
            <span>Work Experience ({resume.experience.length})</span>
          </div>
          {openSections.experience ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
        </button>

        {openSections.experience && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between bg-blue-50/60 p-2.5 rounded-lg text-xs text-blue-900 border border-blue-100">
              <div className="flex items-center gap-1.5">
                <Info size={14} className="text-blue-600 shrink-0" />
                <span><strong>Google X-Y-Z Rule:</strong> Accomplished [X], as measured by [Y], by doing [Z]. Use metrics!</span>
              </div>
            </div>

            {resume.experience.map((exp, expIdx) => (
              <div key={exp.id} className="p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Role #{expIdx + 1}</span>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="text-rose-500 hover:text-rose-700 p-1 hover:bg-rose-50 rounded transition-colors"
                    title="Remove experience"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Job Title</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                      placeholder="e.g. Senior Software Engineer"
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                      placeholder="e.g. Google / Stripe"
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                      placeholder="2022-03"
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">End Date</label>
                    <input
                      type="text"
                      disabled={exp.current}
                      value={exp.current ? 'Present' : exp.endDate}
                      onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                      placeholder="2024-06"
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none disabled:bg-slate-100 disabled:text-slate-400"
                    />
                  </div>
                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                        className="rounded text-brand-600"
                      />
                      <span>Current Job</span>
                    </label>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Location</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                      placeholder="San Francisco, CA"
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none"
                    />
                  </div>
                </div>

                {/* Bullets */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[11px] font-bold text-slate-600 uppercase">Key Achievements & Bullets</label>
                    <button
                      onClick={() => {
                        const newBullets = [...exp.highlights, 'Architected scalable feature, reducing load latency by 35% across 200k users.'];
                        updateExperience(exp.id, { highlights: newBullets });
                      }}
                      className="text-xs text-brand-600 font-semibold hover:text-brand-800 flex items-center gap-1"
                    >
                      <Plus size={13} /> Add Bullet
                    </button>
                  </div>

                  <div className="space-y-2">
                    {exp.highlights.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-1.5">
                        <textarea
                          rows={2}
                          value={bullet}
                          onChange={(e) => {
                            const updated = [...exp.highlights];
                            updated[bIdx] = e.target.value;
                            updateExperience(exp.id, { highlights: updated });
                          }}
                          className="flex-1 text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-brand-500 leading-snug"
                        />
                        <button
                          onClick={() => handleAiPolishBullet(exp.id, bIdx, bullet)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg border border-purple-200 bg-white transition-colors shrink-0"
                          title="AI Enhance with Google X-Y-Z formula"
                        >
                          <Sparkles size={13} className={enhancingBulletKey === `${exp.id}-${bIdx}` ? 'animate-spin' : ''} />
                        </button>
                        <button
                          onClick={() => {
                            const updated = exp.highlights.filter((_, idx) => idx !== bIdx);
                            updateExperience(exp.id, { highlights: updated });
                          }}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-slate-200 bg-white transition-colors shrink-0"
                          title="Delete bullet"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={addExperience}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-dashed border-slate-300"
            >
              <Plus size={15} /> Add Work Experience
            </button>
          </div>
        )}
      </div>

      {/* 4. SKILLS */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <button
          onClick={() => toggleSection('skills')}
          className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-100/60 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5 font-bold text-slate-800 text-sm">
            <Wrench size={16} className="text-brand-600" />
            <span>Technical & Core Skills ({resume.skills.length} Categories)</span>
          </div>
          {openSections.skills ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
        </button>

        {openSections.skills && (
          <div className="p-4 space-y-3">
            {resume.skills.map((skillCat) => (
              <div key={skillCat.id} className="p-3 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={skillCat.category}
                    onChange={(e) => updateSkillCategory(skillCat.id, e.target.value, skillCat.items)}
                    placeholder="e.g. Languages & Frameworks"
                    className="font-bold text-xs p-1.5 bg-white border border-slate-200 rounded-lg outline-none flex-1"
                  />
                  <button
                    onClick={() => removeSkillCategory(skillCat.id)}
                    className="text-rose-500 hover:text-rose-700 p-1 hover:bg-rose-50 rounded"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">Skills (comma-separated):</label>
                  <input
                    type="text"
                    value={skillCat.items.join(', ')}
                    onChange={(e) => {
                      const items = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                      updateSkillCategory(skillCat.id, skillCat.category, items);
                    }}
                    placeholder="React, TypeScript, Next.js, Node.js"
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={addSkillCategory}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-dashed border-slate-300"
            >
              <Plus size={15} /> Add Skill Category
            </button>
          </div>
        )}
      </div>

      {/* 5. PROJECTS */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <button
          onClick={() => toggleSection('projects')}
          className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-100/60 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5 font-bold text-slate-800 text-sm">
            <FolderGit2 size={16} className="text-brand-600" />
            <span>Key Projects ({resume.projects.length})</span>
          </div>
          {openSections.projects ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
        </button>

        {openSections.projects && (
          <div className="p-4 space-y-4">
            {resume.projects.map((proj, pIdx) => (
              <div key={proj.id} className="p-3 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Project #{pIdx + 1}</span>
                  <button
                    onClick={() => removeProject(proj.id)}
                    className="text-rose-500 hover:text-rose-700 p-1 hover:bg-rose-50 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Project Name</label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                      placeholder="e.g. AI Resume Builder"
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Project Link / URL</label>
                    <input
                      type="text"
                      value={proj.link || ''}
                      onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                      placeholder="https://github.com/user/project"
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Technologies Used</label>
                  <input
                    type="text"
                    value={proj.technologies?.join(', ') || ''}
                    onChange={(e) => updateProject(proj.id, { technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                    placeholder="React, TypeScript, Firebase, Tailwind CSS"
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase">Impact & Highlights</label>
                    <button
                      onClick={() => {
                        const newHighlights = [...proj.highlights, 'Engineered platform handling 10k requests with 99.9% uptime.'];
                        updateProject(proj.id, { highlights: newHighlights });
                      }}
                      className="text-xs text-brand-600 font-semibold hover:text-brand-800 flex items-center gap-1"
                    >
                      <Plus size={12} /> Add Point
                    </button>
                  </div>
                  {proj.highlights.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-1.5 mt-1.5">
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => {
                          const updated = [...proj.highlights];
                          updated[bIdx] = e.target.value;
                          updateProject(proj.id, { highlights: updated });
                        }}
                        className="flex-1 text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none"
                      />
                      <button
                        onClick={() => handleAiPolishProjectBullet(proj.id, bIdx, bullet)}
                        className="p-1.5 text-purple-600 hover:bg-purple-50 rounded border border-purple-200 bg-white"
                        title="AI Polish"
                      >
                        <Sparkles size={13} className={enhancingBulletKey === `proj-${proj.id}-${bIdx}` ? 'animate-spin' : ''} />
                      </button>
                      <button
                        onClick={() => {
                          const updated = proj.highlights.filter((_, idx) => idx !== bIdx);
                          updateProject(proj.id, { highlights: updated });
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded border border-slate-200 bg-white"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={addProject}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-dashed border-slate-300"
            >
              <Plus size={15} /> Add Project
            </button>
          </div>
        )}
      </div>

      {/* 6. EDUCATION */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <button
          onClick={() => toggleSection('education')}
          className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-100/60 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5 font-bold text-slate-800 text-sm">
            <GraduationCap size={16} className="text-brand-600" />
            <span>Education ({resume.education.length})</span>
          </div>
          {openSections.education ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
        </button>

        {openSections.education && (
          <div className="p-4 space-y-3">
            {resume.education.map((edu) => (
              <div key={edu.id} className="p-3 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700">{edu.degree || 'Degree'}</span>
                  <button onClick={() => removeEducation(edu.id)} className="text-rose-500 hover:text-rose-700 p-1">
                    <Trash2 size={13} />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    placeholder="B.S. in Computer Science"
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none"
                  />
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                    placeholder="University of California, Berkeley"
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                    placeholder="2018"
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none"
                  />
                  <input
                    type="text"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                    placeholder="2022"
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none"
                  />
                  <input
                    type="text"
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                    placeholder="GPA: 3.8 / 4.0"
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={addEducation}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-dashed border-slate-300"
            >
              <Plus size={15} /> Add Education
            </button>
          </div>
        )}
      </div>

      {/* 7. CERTIFICATIONS */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <button
          onClick={() => toggleSection('certifications')}
          className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-100/60 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5 font-bold text-slate-800 text-sm">
            <Award size={16} className="text-brand-600" />
            <span>Certifications ({resume.certifications.length})</span>
          </div>
          {openSections.certifications ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
        </button>

        {openSections.certifications && (
          <div className="p-4 space-y-3">
            {resume.certifications.map((cert) => (
              <div key={cert.id} className="p-3 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700">{cert.name || 'Certification'}</span>
                  <button onClick={() => removeCertification(cert.id)} className="text-rose-500 hover:text-rose-700 p-1">
                    <Trash2 size={13} />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                    placeholder="AWS Certified Solutions Architect"
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none"
                  />
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                    placeholder="Amazon Web Services"
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={addCertification}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-dashed border-slate-300"
            >
              <Plus size={15} /> Add Certification
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
