import React, { useState, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import {
  Zap,
  X,
  Target,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  PlusCircle,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface JobTailorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_JOB_DESCRIPTION = `
Senior Software & Full-Stack Engineer

About the Role:
We are looking for a Senior Software Engineer to help build high-scale cloud platforms and web APIs. You will work across modern web applications, microservices, and automated DevOps infrastructure.

Key Responsibilities:
- Architect and maintain scalable backend microservices using Node.js, Python, or Go.
- Build responsive, user-friendly frontend web applications using React and TypeScript.
- Design database schemas and optimize query performance on PostgreSQL and Redis.
- Deploy containerized applications to AWS (ECS/EKS) using Docker, Kubernetes, and CI/CD pipelines.
- Practice Agile/Scrum development, GraphQL/REST API design, and automated Jest/Cypress testing.

Required Qualifications & Skills:
- 4+ years of professional full-stack software development experience.
- Strong proficiency in React, TypeScript, Node.js, and PostgreSQL.
- Hands-on experience with Docker, Kubernetes, AWS, GraphQL, CI/CD, and Redis.
- Bachelor's Degree in Computer Science, Software Engineering, or equivalent experience.
`;

export const JobTailorModal: React.FC<JobTailorModalProps> = ({ isOpen, onClose }) => {
  const { resume, updateResume, targetJobDescription, setTargetJobDescription } = useResume();
  const [jdText, setJdText] = useState(targetJobDescription || '');
  const [mode, setMode] = useState<'input' | 'results' | 'tailorReview'>('input');
  const [selectedMissingSkills, setSelectedMissingSkills] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync JD text if context changes
  useEffect(() => {
    if (targetJobDescription) {
      setJdText(targetJobDescription);
    }
  }, [targetJobDescription]);

  if (!isOpen) return null;

  // Extract all text from resume for keyword matching
  const extractResumeTokens = (): { fullText: string; existingSkills: Set<string> } => {
    const parts: string[] = [];
    const existingSkills = new Set<string>();

    if (resume.personalInfo) {
      parts.push(resume.personalInfo.fullName || '');
      parts.push(resume.personalInfo.jobTitle || '');
    }
    if (resume.summary) parts.push(resume.summary);

    resume.experience?.forEach((exp) => {
      parts.push(exp.role || '');
      parts.push(exp.company || '');
      exp.highlights?.forEach((h) => parts.push(h));
    });

    resume.education?.forEach((edu) => {
      parts.push(edu.degree || '');
      parts.push(edu.institution || '');
    });

    resume.skills?.forEach((sCategory) => {
      parts.push(sCategory.category || '');
      sCategory.items?.forEach((item) => {
        parts.push(item);
        existingSkills.add(item.toLowerCase().trim());
      });
    });

    resume.projects?.forEach((proj) => {
      parts.push(proj.title || '');
      proj.technologies?.forEach((t) => parts.push(t));
      proj.highlights?.forEach((h) => parts.push(h));
    });

    return {
      fullText: parts.join(' ').toLowerCase(),
      existingSkills
    };
  };

  // Perform ATS Keyword Match Analysis
  const performAnalysis = () => {
    const { fullText, existingSkills } = extractResumeTokens();
    const textToAnalyze = jdText.trim();

    if (!textToAnalyze) {
      return {
        matchScore: 0,
        matchedKeywords: [],
        missingKeywords: [],
        extractedJdSkills: []
      };
    }

    // Stopwords list
    const stopwords = new Set([
      'and', 'the', 'for', 'with', 'you', 'will', 'are', 'that', 'this', 'have', 'from',
      'our', 'team', 'work', 'your', 'about', 'role', 'must', 'what', 'looking', 'years',
      'experience', 'requirements', 'responsibilities', 'qualifications', 'degree',
      'ability', 'skills', 'strong', 'working', 'help', 'using', 'build', 'create', 'plus'
    ]);

    // Tech & Industry terms dictionary for precision matching
    const knownTechTerms = [
      'react', 'typescript', 'javascript', 'node.js', 'python', 'sql', 'postgresql', 'redis',
      'aws', 'docker', 'kubernetes', 'ci/cd', 'graphql', 'rest api', 'next.js', 'tailwind css',
      'mongodb', 'microservices', 'agile', 'scrum', 'system architecture', 'machine learning',
      'ai', 'golang', 'go', 'java', 'c++', 'c#', '.net', 'azure', 'gcp', 'terraform', 'kafka',
      'jest', 'cypress', 'unit testing', 'git', 'github', 'jira', 'figma', 'tableau', 'power bi'
    ];

    const jdLower = textToAnalyze.toLowerCase();
    const words = (jdLower.match(/[a-z0-9+#.-]{3,}/g) || []) as string[];
    const freq: Record<string, number> = {};

    words.forEach((w) => {
      if (!stopwords.has(w) && w.length >= 3) {
        freq[w] = (freq[w] || 0) + 1;
      }
    });

    // Extract top keywords + explicit tech terms present in JD
    const topFreqWords = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 18)
      .map((entry) => entry[0]);

    const techInJd = knownTechTerms.filter((term) => jdLower.includes(term));
    const allExtractedJdSkills = Array.from(new Set([...techInJd, ...topFreqWords]));

    const matched: string[] = [];
    const missing: string[] = [];

    allExtractedJdSkills.forEach((skill) => {
      const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'i');
      if (regex.test(fullText) || existingSkills.has(skill.toLowerCase())) {
        matched.push(formatSkillTitle(skill));
      } else {
        missing.push(formatSkillTitle(skill));
      }
    });

    const matchRatio = allExtractedJdSkills.length > 0 ? matched.length / allExtractedJdSkills.length : 0;
    const matchScore = Math.min(100, Math.max(0, Math.round(matchRatio * 100)));

    return {
      matchScore,
      matchedKeywords: matched,
      missingKeywords: missing,
      extractedJdSkills: allExtractedJdSkills
    };
  };

  // Capitalize/Format Skill titles cleanly
  function formatSkillTitle(skill: string): string {
    const map: Record<string, string> = {
      'react': 'React',
      'typescript': 'TypeScript',
      'javascript': 'JavaScript',
      'node.js': 'Node.js',
      'python': 'Python',
      'sql': 'SQL',
      'postgresql': 'PostgreSQL',
      'redis': 'Redis',
      'aws': 'AWS',
      'docker': 'Docker',
      'kubernetes': 'Kubernetes',
      'ci/cd': 'CI/CD Pipelines',
      'graphql': 'GraphQL',
      'rest api': 'REST APIs',
      'next.js': 'Next.js',
      'tailwind css': 'Tailwind CSS',
      'mongodb': 'MongoDB',
      'microservices': 'Microservices Architecture',
      'agile': 'Agile / Scrum',
      'machine learning': 'Machine Learning',
      'ai': 'AI / GenAI',
      'golang': 'Go (Golang)',
      'java': 'Java',
      'azure': 'Azure Cloud',
      'gcp': 'Google Cloud (GCP)',
      'terraform': 'Terraform (IaC)',
      'kafka': 'Apache Kafka',
      'jest': 'Jest Unit Testing',
      'cypress': 'Cypress E2E'
    };

    if (map[skill.toLowerCase()]) {
      return map[skill.toLowerCase()];
    }
    return skill.charAt(0).toUpperCase() + skill.slice(1);
  }

  const analysis = performAnalysis();

  // Handle Analyze Action
  const handleAnalyze = () => {
    if (!jdText.trim()) return;
    setTargetJobDescription(jdText);
    setSelectedMissingSkills(analysis.missingKeywords);
    setMode('results');
  };

  // Handle Load Sample
  const handleLoadSample = () => {
    setJdText(SAMPLE_JOB_DESCRIPTION.trim());
    setTargetJobDescription(SAMPLE_JOB_DESCRIPTION.trim());
  };

  // Handle Auto-insert action
  const handleOpenTailorReview = () => {
    setSelectedMissingSkills(analysis.missingKeywords);
    setMode('tailorReview');
  };

  // Toggle skill selection in tailor review
  const toggleSkillSelection = (skill: string) => {
    if (selectedMissingSkills.includes(skill)) {
      setSelectedMissingSkills(selectedMissingSkills.filter((s) => s !== skill));
    } else {
      setSelectedMissingSkills([...selectedMissingSkills, skill]);
    }
  };

  // Confirm auto-inserting selected missing skills into user's resume
  const handleConfirmInsertSkills = () => {
    if (selectedMissingSkills.length === 0) {
      setMode('results');
      return;
    }

    updateResume((prevResume) => {
      const currentSkills = prevResume.skills || [];
      
      // Look for an existing "Target Job Skills" or "Core Skills" category
      let categoryIndex = currentSkills.findIndex(
        (s) => s.category.toLowerCase().includes('target') || s.category.toLowerCase().includes('job') || s.category.toLowerCase().includes('skills')
      );

      let updatedSkills = [...currentSkills];

      if (categoryIndex >= 0) {
        const existingCategory = updatedSkills[categoryIndex];
        const existingSet = new Set(existingCategory.items.map((i) => i.toLowerCase().trim()));
        const newItemsToAdd = selectedMissingSkills.filter((sk) => !existingSet.has(sk.toLowerCase().trim()));

        updatedSkills[categoryIndex] = {
          ...existingCategory,
          items: [...existingCategory.items, ...newItemsToAdd]
        };
      } else {
        // Create new category
        updatedSkills.push({
          id: `skill-jd-${Date.now()}`,
          category: 'Target Job Skills',
          items: [...selectedMissingSkills]
        });
      }

      return {
        ...prevResume,
        skills: updatedSkills
      };
    });

    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.8 }
    });

    setToastMessage(`🎉 Successfully added ${selectedMissingSkills.length} target skills into your resume!`);
    setTimeout(() => setToastMessage(null), 5000);
    setMode('results');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Zap size={20} className="fill-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Job Description Tailor &amp; Keyword Matcher
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase border border-amber-500/40">
                  1-Click ATS
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Compare your resume against any job description &amp; auto-insert missing skills safely.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white text-xs font-extrabold px-6 py-2.5 flex items-center gap-2 animate-in slide-in-from-top">
            <CheckCircle2 size={16} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">

          {/* MODE 1: Job Description Input */}
          {mode === 'input' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                  <span>Paste Target Job Description</span>
                  <button
                    type="button"
                    onClick={handleLoadSample}
                    className="text-brand-600 hover:text-brand-700 font-bold text-xs underline cursor-pointer"
                  >
                    + Load Sample Senior Full-Stack Engineer JD
                  </button>
                </label>
                <textarea
                  rows={9}
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Paste the job posting description here from LinkedIn, Indeed, Glassdoor, or any company site..."
                  className="w-full p-4 bg-white border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 shadow-2xs font-mono"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                  <span>No data is sent to external servers. Parsed locally in your browser.</span>
                </div>

                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={!jdText.trim()}
                  className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-xl text-sm font-extrabold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Target size={18} />
                  <span>Analyze Job Description</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* MODE 2: Results Display */}
          {(mode === 'results' || mode === 'tailorReview') && (
            <div className="space-y-6">
              
              {/* Score Gauge Header Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Keyword Match Score
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-black ${
                      analysis.matchScore >= 75 ? 'text-emerald-600' : analysis.matchScore >= 50 ? 'text-amber-600' : 'text-rose-600'
                    }`}>
                      Resume Match: {analysis.matchScore}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    Based on {analysis.matchedKeywords.length + analysis.missingKeywords.length} key technical skills &amp; job requirements extracted from the target job posting.
                  </p>
                </div>

                {/* Primary 1-Click Tailor Action Button */}
                {analysis.missingKeywords.length > 0 && mode === 'results' && (
                  <button
                    type="button"
                    onClick={handleOpenTailorReview}
                    className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95 border border-amber-400"
                  >
                    <Zap size={18} className="fill-slate-950" />
                    <span>Auto-insert missing skills into my resume</span>
                  </button>
                )}
              </div>

              {/* MODE 2 CONTENT: Side-by-side Matched vs Missing Keywords */}
              {mode === 'results' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 🟢 Matched Keywords */}
                  <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between border-b border-emerald-100 pb-2.5">
                      <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs uppercase tracking-wider">
                        <CheckCircle2 size={16} className="text-emerald-600" />
                        <span>Matched Keywords ({analysis.matchedKeywords.length})</span>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full">
                        Present in Resume
                      </span>
                    </div>

                    {analysis.matchedKeywords.length === 0 ? (
                      <p className="text-xs text-slate-500 italic">No matched keywords found yet.</p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {analysis.matchedKeywords.map((kw, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold flex items-center gap-1"
                          >
                            <Check size={12} className="text-emerald-600 stroke-[3]" />
                            {kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 🔴 Missing Keywords */}
                  <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between border-b border-rose-100 pb-2.5">
                      <div className="flex items-center gap-2 text-rose-800 font-extrabold text-xs uppercase tracking-wider">
                        <AlertCircle size={16} className="text-rose-600" />
                        <span>Missing Keywords ({analysis.missingKeywords.length})</span>
                      </div>
                      <span className="px-2 py-0.5 bg-rose-100 text-rose-800 text-[10px] font-extrabold rounded-full">
                        In Job Posting
                      </span>
                    </div>

                    {analysis.missingKeywords.length === 0 ? (
                      <p className="text-xs text-emerald-700 font-bold">🎉 Outstanding! All extracted skills are present in your resume!</p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {analysis.missingKeywords.map((kw, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded-lg text-xs font-bold flex items-center gap-1"
                          >
                            <span className="text-rose-500 font-black">+</span>
                            {kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* MODE 3: User Control & Review Panel for Auto-Inserting */}
              {mode === 'tailorReview' && (
                <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-xs space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                        <Sparkles size={18} className="text-amber-500" />
                        <span>Review Missing Skills to Insert</span>
                      </h4>
                      <p className="text-xs text-slate-600">
                        Select which missing skills you possess to add them to your resume&apos;s Core Skills.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMode('results')}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 underline"
                    >
                      Back to Analysis
                    </button>
                  </div>

                  {/* Safety Guard Callout */}
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1">
                    <div className="font-extrabold flex items-center gap-1.5">
                      <ShieldCheck size={16} className="text-amber-600 shrink-0" />
                      <span>Zero Fabrication Safety Guard</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-amber-900">
                      These missing skills will be added directly into your resume&apos;s <strong>Core Skills</strong> section. We will <strong>never fabricate fake job titles, companies, dates, or achievements</strong>.
                    </p>
                  </div>

                  {/* Skills Checkbox Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto p-1 border border-slate-200 rounded-xl bg-slate-50">
                    {analysis.missingKeywords.map((skill, idx) => {
                      const isChecked = selectedMissingSkills.includes(skill);
                      return (
                        <label
                          key={idx}
                          onClick={() => toggleSkillSelection(skill)}
                          className={`p-2.5 rounded-lg border text-xs font-bold flex items-center gap-2.5 cursor-pointer transition-colors ${
                            isChecked
                              ? 'bg-brand-50 border-brand-300 text-brand-950'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 cursor-pointer"
                          />
                          <span>{skill}</span>
                        </label>
                      );
                    })}
                  </div>

                  {/* Confirmation Action Buttons */}
                  <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setMode('results')}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleConfirmInsertSkills}
                      disabled={selectedMissingSkills.length === 0}
                      className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                    >
                      <PlusCircle size={16} />
                      <span>Confirm &amp; Insert {selectedMissingSkills.length} Selected Skills</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Nav Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={() => setMode('input')}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 underline flex items-center gap-1 cursor-pointer"
                >
                  <FileText size={14} />
                  <span>Edit Job Description</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
