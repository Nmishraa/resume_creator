import { ResumeData } from '../types/resume';

export type OccupationCategory =
  | 'Education'
  | 'Technology'
  | 'Healthcare'
  | 'Finance'
  | 'Product Management'
  | 'Marketing'
  | 'Administration'
  | 'General';

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
  isZeroSkillsMatch: boolean;
  isTopMatch: boolean;
  matchType: 'Resume Match' | 'Keyword and Location Match';
  occupationCategory: OccupationCategory;
  scoreBreakdown?: {
    skillsScore: number;
    categoryScore: number;
    titleScore: number;
    expScore: number;
    eduScore: number;
    locScore: number;
  };
}

export interface JobSearchFilters {
  roleQuery?: string;
  locationQuery?: string;
  workType?: 'all' | 'remote' | 'onsite';
  experienceLevel?: string;
  minSalary?: number;
  postedWithinDays?: number;
  clarifiedCategory?: OccupationCategory;
}

export interface ExternalSearchPortal {
  name: string;
  iconName: string;
  url: string;
  color: string;
}

export interface ExtractedResumeProfile {
  targetRole: string;
  candidateLocation: string;
  skills: string[];
  experienceRoles: string[];
  education: string[];
  certifications: string[];
  occupationCategory: OccupationCategory;
  hasResumePayload: boolean;
  noSkillsIdentified: boolean;
}

/**
 * Categorizes a candidate's resume or target role into an Occupation Category
 */
export function detectOccupationCategory(
  targetRole: string,
  skills: string[],
  textBlob: string
): OccupationCategory {
  const normText = `${targetRole} ${skills.join(' ')} ${textBlob}`.toLowerCase();

  // 1. Education
  if (/teacher|teaching|principal|school|k-12|curriculum|pedagogy|tutor|professor|faculty|academic director|education/i.test(targetRole) ||
      (/curriculum|lesson plan|classroom management|k-12|literacy|student assessment/i.test(normText) && !/product manager|software|engineer/i.test(targetRole))) {
    return 'Education';
  }

  // 2. Product Management
  if (/product manager|product owner|head of product|vp of product|director of product|group product manager|technical product manager/i.test(targetRole) ||
      /product strategy|product roadmap|user stories|product backlog/i.test(normText)) {
    return 'Product Management';
  }

  // 3. Healthcare
  if (/nurse|nursing|rn|clinical|healthcare|doctor|physician|patient care|triage|hospital|medical|phlebotomy/i.test(normText)) {
    return 'Healthcare';
  }

  // 4. Technology
  if (/software|developer|engineer|fullstack|frontend|backend|devops|data scientist|machine learning|system architect|coder|programmer|it manager/i.test(normText)) {
    return 'Technology';
  }

  // 5. Finance
  if (/accountant|accounting|finance|financial analyst|cpa|auditor|tax|bookkeeper|investment/i.test(normText)) {
    return 'Finance';
  }

  // 6. Marketing
  if (/marketing|seo|growth|content manager|copywriter|advertising|digital marketing|pr/i.test(normText)) {
    return 'Marketing';
  }

  // 7. Administration
  if (/administrative|office manager|executive assistant|receptionist|clerk|admin assistant/i.test(normText)) {
    return 'Administration';
  }

  return 'General';
}

/**
 * Extracts candidate profile from resumeData
 */
export function extractResumeProfile(resumeData: any): ExtractedResumeProfile {
  const hasPayload = Boolean(
    resumeData &&
    (resumeData.summary ||
     resumeData.personalInfo?.jobTitle ||
     resumeData.targetRole ||
     (Array.isArray(resumeData.skills) && resumeData.skills.length > 0) ||
     (Array.isArray(resumeData.experience) && resumeData.experience.length > 0) ||
     (Array.isArray(resumeData.education) && resumeData.education.length > 0))
  );

  if (!resumeData || !hasPayload) {
    return {
      targetRole: 'Software Engineer',
      candidateLocation: 'Remote',
      skills: [],
      experienceRoles: [],
      education: [],
      certifications: [],
      occupationCategory: 'General',
      hasResumePayload: false,
      noSkillsIdentified: false
    };
  }

  const skillsSet = new Set<string>();

  if (Array.isArray(resumeData.skills)) {
    resumeData.skills.forEach((s: any) => {
      if (typeof s === 'string' && s.trim()) skillsSet.add(s.trim());
      else if (s && typeof s.name === 'string' && s.name.trim()) skillsSet.add(s.name.trim());
      else if (s && Array.isArray(s.items)) {
        s.items.forEach((item: string) => {
          if (typeof item === 'string' && item.trim()) skillsSet.add(item.trim());
        });
      }
    });
  }

  const experienceRoles: string[] = [];
  if (Array.isArray(resumeData.experience)) {
    resumeData.experience.forEach((e: any) => {
      if (e?.role && typeof e.role === 'string') experienceRoles.push(e.role.trim());
      if (e?.title && typeof e.title === 'string') experienceRoles.push(e.title.trim());
    });
  }

  const education: string[] = [];
  if (Array.isArray(resumeData.education)) {
    resumeData.education.forEach((ed: any) => {
      const edStr = `${ed?.degree || ''} ${ed?.fieldOfStudy || ed?.major || ''} ${ed?.school || ''}`.trim();
      if (edStr) education.push(edStr);
    });
  }

  const certifications: string[] = [];
  if (Array.isArray(resumeData.certifications)) {
    resumeData.certifications.forEach((c: any) => {
      if (typeof c === 'string' && c.trim()) certifications.push(c.trim());
      else if (c?.name && typeof c.name === 'string') certifications.push(c.name.trim());
    });
  }

  const textBlob = [
    resumeData.summary || '',
    resumeData.personalInfo?.jobTitle || '',
    resumeData.targetRole || '',
    ...experienceRoles,
    ...(Array.isArray(resumeData.experience)
      ? resumeData.experience.map((e: any) => `${e.description || ''} ${e.highlights?.join(' ') || ''}`)
      : []),
    ...education,
    ...certifications
  ].join(' ');

  const dictionaryKeywords = [
    'Computer Science', 'STEM', 'Mandarin', 'Mathematics', 'Math', 'Physics', 'Chemistry',
    'Biology', 'Coding', 'Robotics', 'Web Development', 'Algorithms', 'Data Structures',
    'Curriculum Development', 'Classroom Management', 'Lesson Planning', 'Student Assessment',
    'Differentiated Instruction', 'Special Education', 'Early Childhood Education', 'K-12',
    'Literacy Instruction', 'Pedagogy', 'Educational Technology', 'Tutoring', 'English Literature',
    'Language Arts', 'Social Studies', 'History',
    'Patient Care', 'BLS', 'CPR', 'EHR', 'EMR', 'Triage', 'ICU', 'Acute Care', 'Vital Signs',
    'Phlebotomy', 'SBAR', 'HIPAA', 'Infection Control', 'Clinical Assessment', 'Patient Assessment',
    'Psychiatric Care', 'Medication Administration', 'Pediatric Care', 'Nursing', 'RN',
    'React', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'Java', 'C++', 'Golang', 'SQL',
    'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'REST API', 'Git',
    'Agile', 'Scrum', 'Figma', 'UI/UX', 'CI/CD', 'Linux', 'Microservices', 'System Design',
    'GAAP', 'Financial Analysis', 'Financial Modeling', 'Accounting', 'Bookkeeping', 'QuickBooks',
    'SEO', 'PPC', 'Content Marketing', 'Google Analytics', 'HubSpot', 'Salesforce',
    'Project Management', 'Jira', 'Stakeholder Management'
  ];

  dictionaryKeywords.forEach(kw => {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (new RegExp(`\\b${escaped}\\b`, 'i').test(textBlob)) {
      skillsSet.add(kw);
    }
  });

  const skills = Array.from(skillsSet);

  const targetRole =
    (resumeData.personalInfo?.jobTitle && typeof resumeData.personalInfo.jobTitle === 'string' && resumeData.personalInfo.jobTitle.trim()) ||
    (resumeData.targetRole && typeof resumeData.targetRole === 'string' && resumeData.targetRole.trim()) ||
    (experienceRoles[0] && typeof experienceRoles[0] === 'string' && experienceRoles[0].trim()) ||
    'Software Engineer';

  const candidateLocation =
    (resumeData.personalInfo?.location && typeof resumeData.personalInfo.location === 'string' && resumeData.personalInfo.location.trim()) ||
    'Remote';

  const occupationCategory = detectOccupationCategory(targetRole, skills, textBlob);

  return {
    targetRole,
    candidateLocation,
    skills,
    experienceRoles,
    education,
    certifications,
    occupationCategory,
    hasResumePayload: true,
    noSkillsIdentified: skills.length === 0
  };
}

export function extractSkillsFromResume(resumeData: any): string[] {
  return extractResumeProfile(resumeData).skills;
}

export function extractTargetRole(resumeData: any): string {
  return extractResumeProfile(resumeData).targetRole;
}

export function extractCandidateLocation(resumeData: any): string {
  return extractResumeProfile(resumeData).candidateLocation;
}

/**
 * Disambiguates queries like "principal" based on Candidate Occupation Category
 */
export function resolveAmbiguousQuery(
  rawQuery: string,
  category: OccupationCategory
): { searchRole: string; needsClarification: boolean } {
  const norm = rawQuery.toLowerCase().trim();

  if (norm === 'principal' || norm === 'principal role') {
    if (category === 'Education') {
      return { searchRole: 'School Principal', needsClarification: false };
    }
    if (category === 'Product Management') {
      return { searchRole: 'Principal Product Manager', needsClarification: false };
    }
    if (category === 'Technology') {
      return { searchRole: 'Principal Engineer', needsClarification: false };
    }
    // Ambiguous query without usable context
    return { searchRole: 'School Principal', needsClarification: true };
  }

  return { searchRole: rawQuery, needsClarification: false };
}

/**
 * Categorizes a Job Listing into an Occupation Category
 */
export function detectJobCategory(jobTitle: string, jobSnippet: string): OccupationCategory {
  const norm = `${jobTitle} ${jobSnippet}`.toLowerCase();

  if (/school principal|assistant principal|academic principal|academic director|headmaster|headmistress|teacher|curriculum|k-12|education|school/i.test(jobTitle) ||
      (/principal/i.test(jobTitle) && /school|academic|student|curriculum|education/i.test(norm) && !/product|engineer|software/i.test(jobTitle))) {
    return 'Education';
  }

  if (/principal product manager|product manager|product owner|head of product/i.test(jobTitle)) {
    return 'Product Management';
  }

  if (/principal engineer|principal software|software engineer|developer|tech lead|solution architect|fullstack|frontend|backend/i.test(jobTitle)) {
    return 'Technology';
  }

  if (/nurse|nursing|rn|clinical|healthcare|doctor|physician|patient care/i.test(norm)) {
    return 'Healthcare';
  }

  if (/accountant|accounting|finance|financial analyst|cpa|auditor/i.test(norm)) {
    return 'Finance';
  }

  if (/marketing|seo|growth|content manager|advertising/i.test(norm)) {
    return 'Marketing';
  }

  if (/administrative|office manager|executive assistant|clerk/i.test(norm)) {
    return 'Administration';
  }

  return 'General';
}

/**
 * Generates verified external job search links
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
 * Fetches genuine live job listings from active job APIs (Jobicy, Remotive).
 * Calculates exact 6-part weighted score & enforces strict score caps:
 *   1. Resume Skills: 40%
 *   2. Occupation Category: 25%
 *   3. Specific Job Title: 15%
 *   4. Experience: 10%
 *   5. Education: 5%
 *   6. Location/Work Mode: 5%
 */
export async function fetchMatchingJobs(
  resumeData: any,
  filters: JobSearchFilters = {}
): Promise<{
  jobs: MatchingJob[];
  targetRole: string;
  candidateLocation: string;
  extractedSkills: string[];
  extractedEducation: string[];
  extractedCertifications: string[];
  occupationCategory: OccupationCategory;
  needsClarification: boolean;
  noSkillsIdentified: boolean;
  totalCount: number;
  externalPortals: ExternalSearchPortal[];
}> {
  const profile = extractResumeProfile(resumeData);
  const userQuery = filters.roleQuery?.trim();
  const candidateLocation = filters.locationQuery?.trim() || profile.candidateLocation;
  const extractedSkills = profile.skills;

  let effectiveCategory = filters.clarifiedCategory || profile.occupationCategory;

  // Resolve ambiguous queries like "principal"
  const rawTargetRole = userQuery || profile.targetRole;
  const { searchRole, needsClarification } = resolveAmbiguousQuery(rawTargetRole, effectiveCategory);

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

  // Query Jobicy & Remotive APIs in parallel
  const searchPromises = [
    (async () => {
      try {
        const resp = await fetch(`https://jobicy.com/api/v2/remote-jobs?count=30&tag=${encodeURIComponent(searchRole)}`, {
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
                  descriptionSnippet: snippet.substring(0, 280) + (snippet.length > 280 ? '...' : ''),
                  source: 'Jobicy Live API'
                });
              }
            });
          }
        }
      } catch {
        // Silently handle API timeout
      }
    })(),

    (async () => {
      try {
        const resp = await fetch(`https://remotive.com/api/remote-jobs?search=${encodeURIComponent(searchRole)}`, {
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
                  descriptionSnippet: snippet.substring(0, 280) + (snippet.length > 280 ? '...' : ''),
                  source: 'Remotive Live Jobs'
                });
              }
            });
          }
        }
      } catch {
        // Silently handle API timeout
      }
    })()
  ];

  await Promise.allSettled(searchPromises);

  // Deduplicate by applicationUrl
  const seenUrls = new Set<string>();
  const uniqueJobs = rawLiveJobs.filter(j => {
    const key = (j.applicationUrl || `${j.title}_${j.company}`).toLowerCase();
    if (seenUrls.has(key)) return false;
    seenUrls.add(key);
    return true;
  });

  // Score each job using the exact 6-part weighted formula
  const scoredJobs: MatchingJob[] = uniqueJobs.map((job) => {
    const fullJobText = (job.title + ' ' + job.descriptionSnippet).toLowerCase();
    const jobCategory = detectJobCategory(job.title, job.descriptionSnippet);

    // 1. RESUME SKILLS MATCH (40% MAX = 40 PTS)
    const matchedSkills: string[] = [];
    extractedSkills.forEach((skill) => {
      const skLower = skill.toLowerCase();
      if (fullJobText.includes(skLower)) {
        matchedSkills.push(skill);
      }
    });

    let skillsScore = 0;
    if (extractedSkills.length > 0) {
      const ratio = matchedSkills.length / Math.max(1, Math.min(5, extractedSkills.length));
      skillsScore = Math.min(40, Math.round(ratio * 40));
    }

    const domainTerms = [
      'Computer Science', 'Python', 'Java', 'STEM', 'Mandarin', 'React', 'Node.js',
      'BLS', 'CPR', 'EHR', 'EMR', 'Triage', 'GAAP', 'SEO', 'Jira', 'Agile'
    ];
    const missingSkills: string[] = [];
    domainTerms.forEach((term) => {
      if (fullJobText.includes(term.toLowerCase()) && !extractedSkills.some(s => s.toLowerCase() === term.toLowerCase())) {
        missingSkills.push(term);
      }
    });

    // 2. OCCUPATION CATEGORY MATCH (25% MAX = 25 PTS)
    let categoryScore = 0;
    const isCategoryMismatch = effectiveCategory !== 'General' && jobCategory !== 'General' && jobCategory !== effectiveCategory;

    if (jobCategory === effectiveCategory) {
      categoryScore = 25;
    } else if (!isCategoryMismatch) {
      categoryScore = 12;
    } else {
      categoryScore = 0;
    }

    // 3. SPECIFIC JOB-TITLE RELEVANCE (15% MAX = 15 PTS)
    let titleScore = 0;
    const roleNorm = searchRole.toLowerCase().trim();
    const titleNorm = job.title.toLowerCase().trim();

    if (titleNorm === roleNorm) {
      titleScore = 15;
    } else if (titleNorm.includes(roleNorm) || roleNorm.includes(titleNorm)) {
      titleScore = 12;
    } else {
      const stopwords = new Set(['a', 'an', 'the', 'in', 'of', 'and', 'or', 'for', 'senior', 'junior', 'lead', 'staff']);
      const roleTokens = roleNorm.split(/[\s,/\-\\_]+/).filter(t => t.length > 2 && !stopwords.has(t));
      const matchedTokens = roleTokens.filter(t => titleNorm.includes(t));
      if (roleTokens.length > 0) {
        titleScore = Math.round((matchedTokens.length / roleTokens.length) * 10);
      } else {
        titleScore = 4;
      }
    }

    // 4. EXPERIENCE MATCH (10% MAX = 10 PTS)
    let expScore = 5;
    const hasMatchingPastRole = profile.experienceRoles.some(r => job.title.toLowerCase().includes(r.toLowerCase()));
    if (hasMatchingPastRole) expScore = 10;
    else if (job.experienceLevel === 'All Levels' || job.experienceLevel === 'Mid Level') expScore = 8;

    // 5. EDUCATION MATCH (5% MAX = 5 PTS)
    let eduScore = 2;
    const hasMatchingEducation = profile.education.some(ed => {
      const edLower = ed.toLowerCase();
      return (edLower.includes('computer science') && fullJobText.includes('computer science')) ||
             (edLower.includes('education') && fullJobText.includes('education')) ||
             (edLower.includes('nursing') && fullJobText.includes('nursing'));
    });
    if (hasMatchingEducation) eduScore = 5;
    else if (profile.education.length > 0) eduScore = 3;

    // 6. LOCATION / WORK-MODE MATCH (5% MAX = 5 PTS)
    let locScore = 2;
    if (candidateLocation && candidateLocation.toLowerCase() !== 'remote' && job.location.toLowerCase().includes(candidateLocation.toLowerCase())) {
      locScore = 5;
    } else if (job.isRemote) {
      locScore = 5;
    }

    // Total 6-part weighted score
    let calculatedScore = skillsScore + categoryScore + titleScore + expScore + eduScore + locScore;

    const isZeroSkillsMatch = matchedSkills.length === 0;

    // STRICT SCORE CAPS:
    // 1. Mismatched occupation category: MAX 15% (e.g. Principal Product Manager for Teacher)
    if (isCategoryMismatch) {
      calculatedScore = Math.min(15, calculatedScore);
    }
    // 2. Zero matched skills: MAX 25%
    else if (isZeroSkillsMatch) {
      calculatedScore = Math.min(25, calculatedScore);
    }
    // 3. Title-only match: MAX 20%
    else if (skillsScore === 0 && expScore <= 5 && eduScore <= 2) {
      calculatedScore = Math.min(20, calculatedScore);
    }

    const matchPercentage = Math.min(98, Math.max(10, calculatedScore));
    const isTopMatch = matchPercentage >= 70 && !isZeroSkillsMatch && !isCategoryMismatch;

    const matchType: 'Resume Match' | 'Keyword and Location Match' =
      profile.hasResumePayload && !isZeroSkillsMatch && !isCategoryMismatch
        ? 'Resume Match'
        : 'Keyword and Location Match';

    // Build human-readable match reason
    let matchReason = '';
    if (matchType === 'Resume Match') {
      matchReason = `${matchPercentage}% Resume Match: Aligns with your target role (${searchRole}) in ${effectiveCategory} and matches ${matchedSkills.length} key resume skills (${matchedSkills.slice(0, 3).join(', ')}).`;
    } else if (isCategoryMismatch) {
      matchReason = `${matchPercentage}% Category Mismatch: This job is in ${jobCategory}, which differs from your resume's field (${effectiveCategory}).`;
    } else {
      matchReason = `${matchPercentage}% Keyword and Location Match: Fits query "${searchRole}" and location preferences. No explicit resume skills matched the snippet.`;
    }

    if (job.isRemote) matchReason += ' Includes remote flexibility.';

    return {
      ...job,
      matchPercentage,
      matchReason,
      matchedSkills: Array.from(new Set(matchedSkills)),
      missingSkills: Array.from(new Set(missingSkills)).slice(0, 4),
      isZeroSkillsMatch,
      isTopMatch,
      matchType,
      occupationCategory: jobCategory,
      scoreBreakdown: {
        skillsScore,
        categoryScore,
        titleScore,
        expScore,
        eduScore,
        locScore
      }
    };
  });

  // Apply filters
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

  const externalPortals = getVerifiedSearchPortals(searchRole, candidateLocation);

  return {
    jobs: filtered,
    targetRole: searchRole,
    candidateLocation,
    extractedSkills,
    extractedEducation: profile.education,
    extractedCertifications: profile.certifications,
    occupationCategory: effectiveCategory,
    needsClarification: Boolean(needsClarification && (!profile.hasResumePayload || profile.skills.length === 0)),
    noSkillsIdentified: profile.noSkillsIdentified,
    totalCount: filtered.length,
    externalPortals
  };
}
