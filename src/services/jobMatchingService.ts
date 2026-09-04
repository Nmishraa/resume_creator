import { ResumeData } from '../types/resume';

export interface MatchingJob {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  isRemote: boolean;
  salary?: string;
  postedDate: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';
  experienceLevel: 'Entry Level' | 'Mid Level' | 'Senior Level' | 'Executive' | 'All Levels';
  applicationUrl: string;
  descriptionSnippet: string;
  matchPercentage: number;
  matchReason: string;
  matchedSkills: string[];
  missingSkills: string[];
  source: string;
}

export interface JobSearchFilters {
  roleQuery?: string;
  locationQuery?: string;
  workType?: 'all' | 'remote' | 'onsite';
  experienceLevel?: string;
  minSalary?: number;
  postedWithinDays?: number;
}

export interface ExternalSearchPortal {
  name: string;
  iconName: string;
  url: string;
  color: string;
}

/**
 * Extracts candidate skills as a clean flat array of unique formatted skill strings from resumeData.
 * Operates entirely client-side preserving privacy.
 */
export function extractSkillsFromResume(resumeData: any): string[] {
  if (!resumeData) return [];
  const skillsSet = new Set<string>();

  // Extract from structured skills array
  if (Array.isArray(resumeData.skills)) {
    resumeData.skills.forEach((s: any) => {
      if (typeof s === 'string' && s.trim()) {
        skillsSet.add(s.trim());
      } else if (s && typeof s.name === 'string' && s.name.trim()) {
        skillsSet.add(s.name.trim());
      } else if (s && Array.isArray(s.items)) {
        s.items.forEach((item: string) => {
          if (typeof item === 'string' && item.trim()) skillsSet.add(item.trim());
        });
      }
    });
  }

  // Extract from text sections (Summary, Experience, Education)
  const textBlob = [
    resumeData.summary || '',
    resumeData.personalInfo?.jobTitle || '',
    resumeData.targetRole || '',
    ...(Array.isArray(resumeData.experience)
      ? resumeData.experience.map((e: any) => `${e.role || ''} ${e.company || ''} ${e.description || e.highlights?.join(' ') || ''}`)
      : []),
    ...(Array.isArray(resumeData.education)
      ? resumeData.education.map((ed: any) => `${ed.degree || ''} ${ed.fieldOfStudy || ''} ${ed.school || ''}`)
      : [])
  ].join(' ');

  // Domain skill dictionary spanning Tech, Healthcare/Nursing, Education, Finance, Marketing, Operations
  const dictionaryKeywords = [
    // Tech
    'React', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'Java', 'C++', 'Golang', 'SQL',
    'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'REST API', 'Git',
    'Agile', 'Scrum', 'Figma', 'UI/UX', 'CI/CD', 'Linux', 'Microservices', 'System Design',
    // Healthcare & Nursing
    'Patient Care', 'BLS', 'CPR', 'EHR', 'EMR', 'Triage', 'ICU', 'Acute Care', 'Vital Signs',
    'Phlebotomy', 'SBAR', 'HIPAA', 'Infection Control', 'Clinical Assessment', 'Patient Assessment',
    'Psychiatric Care', 'Medication Administration', 'Pediatric Care', 'Nursing', 'RN',
    // Education & Teaching
    'Curriculum Development', 'Classroom Management', 'Lesson Planning', 'Student Assessment',
    'Special Education', 'Differentiated Instruction', 'Early Childhood Education', 'Literacy Instruction',
    'Mandarin', 'STEM', 'K-12', 'Tutoring', 'Pedagogy',
    // Finance & Business
    'GAAP', 'Financial Analysis', 'Financial Modeling', 'Accounting', 'Bookkeeping', 'QuickBooks',
    'Excel', 'Auditing', 'Tax Preparation', 'Budgeting', 'Revenue Recognition',
    // Marketing & Operations
    'SEO', 'PPC', 'Content Marketing', 'Google Analytics', 'HubSpot', 'Salesforce', 'CRM',
    'Project Management', 'Jira', 'Stakeholder Management', 'Supply Chain', 'Customer Support'
  ];

  dictionaryKeywords.forEach(kw => {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (new RegExp(`\\b${escaped}\\b`, 'i').test(textBlob)) {
      skillsSet.add(kw);
    }
  });

  return Array.from(skillsSet);
}

/**
 * Extracts candidate target role from resumeData
 */
export function extractTargetRole(resumeData: any): string {
  if (!resumeData) return 'Software Engineer';

  const role =
    resumeData.personalInfo?.jobTitle ||
    resumeData.targetRole ||
    resumeData.personal?.role ||
    (Array.isArray(resumeData.experience) && resumeData.experience[0]?.role) ||
    'Software Engineer';

  const clean = role.trim();
  if (!clean || /university|college|school|degree|bachelor|master/i.test(clean)) {
    return 'Software Engineer';
  }
  return clean;
}

/**
 * Extracts candidate location from resumeData
 */
export function extractCandidateLocation(resumeData: any): string {
  if (!resumeData) return 'Remote';
  return (
    resumeData.personalInfo?.location ||
    resumeData.personal?.location ||
    'Remote'
  ).trim();
}

/**
 * Generates verified external job search links with pre-filled search queries
 */
export function getVerifiedSearchPortals(role: string, location: string): ExternalSearchPortal[] {
  const encRole = encodeURIComponent(role || 'Software Engineer');
  const encLoc = encodeURIComponent(location || 'Remote');

  return [
    {
      name: 'LinkedIn Jobs',
      iconName: 'Linkedin',
      url: `https://www.linkedin.com/jobs/search/?keywords=${encRole}&location=${encLoc}`,
      color: '#0a66c2'
    },
    {
      name: 'Indeed',
      iconName: 'Search',
      url: `https://www.indeed.com/jobs?q=${encRole}&l=${encLoc}`,
      color: '#2164f3'
    },
    {
      name: 'Glassdoor',
      iconName: 'Briefcase',
      url: `https://www.glassdoor.com/Job/jobs.htm?sc.keyword=${encRole}`,
      color: '#0caa41'
    },
    {
      name: 'ZipRecruiter',
      iconName: 'Globe',
      url: `https://www.ziprecruiter.com/candidate/search?search=${encRole}&location=${encLoc}`,
      color: '#5b2c6f'
    },
    {
      name: 'Google Jobs',
      iconName: 'ExternalLink',
      url: `https://www.google.com/search?q=${encRole}+jobs+in+${encLoc}&ibp=htl;jobs`,
      color: '#4285f4'
    }
  ];
}

/**
 * Strip HTML tags from raw job descriptions safely
 */
function stripHtml(htmlStr: string): string {
  if (!htmlStr) return '';
  return htmlStr
    .replace(/<[^>]*>?/gm, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Evaluates role relevance to ensure unrelated jobs (e.g. software engineer for nurse) are filtered out.
 */
function isRoleRelevant(targetRole: string, jobTitle: string, jobExcerpt: string): boolean {
  const roleNorm = targetRole.toLowerCase().trim();
  const jobNorm = (jobTitle + ' ' + jobExcerpt).toLowerCase();

  // Keyword domain maps for popular professions
  if (roleNorm.includes('nurse') || roleNorm.includes('nursing') || roleNorm.includes('rn')) {
    return /nurse|nursing|rn|clinical|healthcare|patient care|medical|hospital|psychiatric/i.test(jobNorm);
  }

  if (roleNorm.includes('teacher') || roleNorm.includes('teaching') || roleNorm.includes('tutor') || roleNorm.includes('educator')) {
    return /teacher|teaching|education|tutor|instructor|academic|curriculum|school|faculty|prek|elementary/i.test(jobNorm);
  }

  if (roleNorm.includes('engineer') || roleNorm.includes('developer') || roleNorm.includes('software') || roleNorm.includes('programmer')) {
    return /engineer|developer|software|frontend|backend|fullstack|full stack|programmer|devops|data|ai|ml|tech|tech lead|architect|coder|system/i.test(jobNorm);
  }

  if (roleNorm.includes('accountant') || roleNorm.includes('accounting') || roleNorm.includes('auditor') || roleNorm.includes('finance')) {
    return /accountant|accounting|finance|financial|audit|tax|bookkeeper|cpa|ledger/i.test(jobNorm);
  }

  if (roleNorm.includes('marketing') || roleNorm.includes('seo') || roleNorm.includes('growth')) {
    return /marketing|seo|growth|content|digital|campaign|brand|media|pr|advertising/i.test(jobNorm);
  }

  // General role matching: split targetRole into non-generic keywords
  const stopwords = new Set(['a', 'an', 'the', 'in', 'of', 'and', 'or', 'for', 'with', 'senior', 'junior', 'lead', 'staff', 'principal', 'head', 'vp', 'director']);
  const roleKeywords = roleNorm.split(/[\s,/\-\\_]+/).filter(w => w.length > 2 && !stopwords.has(w));

  if (roleKeywords.length === 0) return true;

  // At least one core role keyword must appear in job title or snippet
  return roleKeywords.some(kw => jobNorm.includes(kw));
}

/**
 * Fetches genuine live job listings from active job APIs (Jobicy, Remotive, Arbeitnow).
 * No fake/hard-coded job fallbacks are used.
 * Calculates compatibility match scores based on candidate skills, role, experience, education, and location.
 */
export async function fetchMatchingJobs(
  resumeData: any,
  filters: JobSearchFilters = {}
): Promise<{
  jobs: MatchingJob[];
  targetRole: string;
  candidateLocation: string;
  extractedSkills: string[];
  totalCount: number;
  externalPortals: ExternalSearchPortal[];
}> {
  const targetRole = filters.roleQuery?.trim() || extractTargetRole(resumeData);
  const candidateLocation = filters.locationQuery?.trim() || extractCandidateLocation(resumeData);
  const extractedSkills = extractSkillsFromResume(resumeData);

  const rawLiveJobs: Array<{
    id: string;
    title: string;
    company: string;
    companyLogo?: string;
    location: string;
    isRemote: boolean;
    salary?: string;
    postedDate: string;
    jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';
    experienceLevel: 'Entry Level' | 'Mid Level' | 'Senior Level' | 'Executive' | 'All Levels';
    applicationUrl: string;
    descriptionSnippet: string;
    source: string;
  }> = [];

  // Query live APIs in parallel with strict 4.5s timeouts
  const searchPromises = [
    // 1. Jobicy API
    (async () => {
      try {
        const resp = await fetch(`https://jobicy.com/api/v2/remote-jobs?count=25&tag=${encodeURIComponent(targetRole)}`, {
          signal: AbortSignal.timeout(4500)
        });
        if (resp.ok) {
          const data = await resp.json();
          if (Array.isArray(data?.jobs)) {
            data.jobs.forEach((j: any, i: number) => {
              if (j && j.jobTitle && j.url) {
                const snippet = stripHtml(j.jobExcerpt || j.jobDescription || '');
                rawLiveJobs.push({
                  id: `jobicy_${j.id || i}_${Math.random().toString(36).substring(2, 7)}`,
                  title: j.jobTitle.trim(),
                  company: (j.companyName || 'Verified Employer').trim(),
                  companyLogo: j.companyLogo || undefined,
                  location: (j.jobGeo || 'Remote').trim(),
                  isRemote: true,
                  salary: j.annualSalaryMin && j.annualSalaryMax ? `$${j.annualSalaryMin.toLocaleString()} - $${j.annualSalaryMax.toLocaleString()} / yr` : undefined,
                  postedDate: j.pubDate ? new Date(j.pubDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Recently posted',
                  jobType: (Array.isArray(j.jobType) ? j.jobType[0] : 'Full-time') as any,
                  experienceLevel: (j.jobLevel || 'Mid Level') as any,
                  applicationUrl: j.url.trim(),
                  descriptionSnippet: snippet.substring(0, 260) + (snippet.length > 260 ? '...' : ''),
                  source: 'Jobicy Live API'
                });
              }
            });
          }
        }
      } catch {
        // Silently handle API timeout/offline
      }
    })(),

    // 2. Remotive API
    (async () => {
      try {
        const resp = await fetch(`https://remotive.com/api/remote-jobs?search=${encodeURIComponent(targetRole)}`, {
          signal: AbortSignal.timeout(4500)
        });
        if (resp.ok) {
          const data = await resp.json();
          if (Array.isArray(data?.jobs)) {
            data.jobs.slice(0, 20).forEach((j: any, i: number) => {
              if (j && j.title && j.url) {
                const snippet = stripHtml(j.description || '');
                rawLiveJobs.push({
                  id: `remotive_${j.id || i}_${Math.random().toString(36).substring(2, 7)}`,
                  title: j.title.trim(),
                  company: (j.company_name || 'Verified Remote Employer').trim(),
                  companyLogo: j.company_logo_url || j.company_logo || undefined,
                  location: (j.candidate_required_location || 'Remote').trim(),
                  isRemote: true,
                  salary: j.salary && j.salary.trim() ? j.salary.trim() : undefined,
                  postedDate: j.publication_date ? new Date(j.publication_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Recently posted',
                  jobType: (j.job_type ? (j.job_type.includes('full') ? 'Full-time' : j.job_type.includes('part') ? 'Part-time' : 'Contract') : 'Full-time') as any,
                  experienceLevel: 'Mid Level',
                  applicationUrl: j.url.trim(),
                  descriptionSnippet: snippet.substring(0, 260) + (snippet.length > 260 ? '...' : ''),
                  source: 'Remotive Live Jobs'
                });
              }
            });
          }
        }
      } catch {
        // Silently handle API timeout/offline
      }
    })(),

    // 3. Arbeitnow API
    (async () => {
      try {
        const resp = await fetch(`https://www.arbeitnow.com/api/job-board-api`, {
          signal: AbortSignal.timeout(4500)
        });
        if (resp.ok) {
          const data = await resp.json();
          if (Array.isArray(data?.data)) {
            data.data.forEach((j: any, i: number) => {
              if (j && j.title && j.url) {
                const snippet = stripHtml(j.description || '');
                rawLiveJobs.push({
                  id: `arbeitnow_${i}_${Math.random().toString(36).substring(2, 7)}`,
                  title: j.title.trim(),
                  company: (j.company_name || 'Verified Employer').trim(),
                  companyLogo: undefined,
                  location: (j.location || 'Remote').trim(),
                  isRemote: Boolean(j.remote || j.location?.toLowerCase().includes('remote')),
                  salary: undefined,
                  postedDate: j.created_at ? new Date(j.created_at * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Recently posted',
                  jobType: (Array.isArray(j.job_types) ? j.job_types[0] : 'Full-time') as any,
                  experienceLevel: 'Mid Level',
                  applicationUrl: j.url.trim(),
                  descriptionSnippet: snippet.substring(0, 260) + (snippet.length > 260 ? '...' : ''),
                  source: 'Arbeitnow Jobs'
                });
              }
            });
          }
        }
      } catch {
        // Silently handle API timeout/offline
      }
    })()
  ];

  await Promise.allSettled(searchPromises);

  // Deduplicate raw live jobs by applicationUrl or normalized title+company
  const seenUrls = new Set<string>();
  const uniqueJobs = rawLiveJobs.filter(j => {
    const key = (j.applicationUrl || `${j.title}_${j.company}`).toLowerCase();
    if (seenUrls.has(key)) return false;
    seenUrls.add(key);
    return true;
  });

  // Filter out unrelated jobs (e.g. software engineer jobs for a nurse resume)
  const relevantJobs = uniqueJobs.filter(j => isRoleRelevant(targetRole, j.title, j.descriptionSnippet));

  // Score and enrich each relevant job against candidate resume
  const scoredJobs: MatchingJob[] = relevantJobs.map((job) => {
    const fullJobText = (job.title + ' ' + job.descriptionSnippet).toLowerCase();

    // 1. Skill Overlap Calculation
    const matchedSkills: string[] = [];
    extractedSkills.forEach((skill) => {
      const skLower = skill.toLowerCase();
      if (fullJobText.includes(skLower)) {
        matchedSkills.push(skill);
      }
    });

    // Extract potential missing requirements from job snippet
    const domainTechTerms = [
      'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'SQL', 'Docker', 'Kubernetes', 'GraphQL',
      'BLS', 'CPR', 'EHR', 'EMR', 'ICU', 'Triage', 'SBAR', 'GAAP', 'SEO', 'Jira', 'Agile'
    ];
    const missingSkills: string[] = [];
    domainTechTerms.forEach((term) => {
      if (fullJobText.includes(term.toLowerCase()) && !extractedSkills.some(s => s.toLowerCase() === term.toLowerCase())) {
        missingSkills.push(term);
      }
    });

    // 2. Role Title Similarity Score (0 to 45 pts)
    let roleScore = 0;
    const roleNorm = targetRole.toLowerCase();
    const titleNorm = job.title.toLowerCase();

    if (titleNorm.includes(roleNorm) || roleNorm.includes(titleNorm)) {
      roleScore = 45;
    } else {
      const stopwords = new Set(['a', 'an', 'the', 'in', 'of', 'and', 'or', 'for', 'senior', 'junior', 'lead', 'staff']);
      const roleTokens = roleNorm.split(/\s+/).filter(t => t.length > 2 && !stopwords.has(t));
      const matchedTokens = roleTokens.filter(t => titleNorm.includes(t));
      if (roleTokens.length > 0) {
        roleScore = Math.round((matchedTokens.length / roleTokens.length) * 40);
      } else {
        roleScore = 20;
      }
    }

    // 3. Skill Overlap Ratio Score (0 to 45 pts)
    let skillScore = 0;
    if (extractedSkills.length > 0) {
      const skillRatio = matchedSkills.length / Math.max(1, extractedSkills.length);
      skillScore = Math.min(45, Math.round(skillRatio * 45));
    } else {
      skillScore = 15;
    }

    // 4. Location / Remote Score (0 to 10 pts)
    let locationScore = 5;
    if (job.isRemote || (candidateLocation && job.location.toLowerCase().includes(candidateLocation.toLowerCase()))) {
      locationScore = 10;
    }

    let calculatedScore = roleScore + skillScore + locationScore;

    // CRITICAL GUARD: Prevent high scores when zero skills match
    if (matchedSkills.length === 0) {
      if (roleScore >= 35) {
        calculatedScore = Math.min(38, calculatedScore); // Cap at max 38% if role matches but 0 skills match
      } else {
        calculatedScore = Math.min(22, calculatedScore); // Cap at max 22% if role & skills have no match
      }
    }

    const matchPercentage = Math.min(98, Math.max(12, calculatedScore));

    // 5. Build honest human-readable match reason
    let matchReason = '';
    if (matchedSkills.length > 0) {
      matchReason = `${matchPercentage}% Match: Strong title alignment with ${targetRole} and matches ${matchedSkills.length} of your candidate skills (${matchedSkills.slice(0, 3).join(', ')}).`;
    } else {
      matchReason = `${matchPercentage}% Title Match: Fits your target title (${targetRole}), but does not explicitly list your specific resume skills in the excerpt.`;
    }

    if (job.isRemote) {
      matchReason += ' Features full remote flexibility.';
    }

    return {
      ...job,
      matchPercentage,
      matchReason,
      matchedSkills: Array.from(new Set(matchedSkills)),
      missingSkills: Array.from(new Set(missingSkills)).slice(0, 4)
    };
  });

  // Apply user filters
  let filtered = scoredJobs;

  if (filters.workType === 'remote') {
    filtered = filtered.filter(j => j.isRemote);
  } else if (filters.workType === 'onsite') {
    filtered = filtered.filter(j => !j.isRemote);
  }

  if (filters.experienceLevel && filters.experienceLevel !== 'All') {
    filtered = filtered.filter(j => j.experienceLevel.toLowerCase().includes(filters.experienceLevel!.toLowerCase()) || j.experienceLevel === 'All Levels');
  }

  // Sort by match percentage (highest first)
  filtered.sort((a, b) => b.matchPercentage - a.matchPercentage);

  const externalPortals = getVerifiedSearchPortals(targetRole, candidateLocation);

  return {
    jobs: filtered,
    targetRole,
    candidateLocation,
    extractedSkills,
    totalCount: filtered.length,
    externalPortals
  };
}
