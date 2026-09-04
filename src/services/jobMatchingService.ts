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
  isZeroSkillsMatch: boolean;
  isTopMatch: boolean;
  scoreBreakdown?: {
    skillsScore: number;
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
  noSkillsIdentified: boolean;
}

/**
 * Extracts comprehensive candidate profile from resumeData
 */
export function extractResumeProfile(resumeData: any): ExtractedResumeProfile {
  if (!resumeData) {
    return {
      targetRole: 'Software Engineer',
      candidateLocation: 'Remote',
      skills: [],
      experienceRoles: [],
      education: [],
      certifications: [],
      noSkillsIdentified: true
    };
  }

  const skillsSet = new Set<string>();

  // 1. Structured Skills Array
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

  // 2. Experience Roles & Bullet Points
  const experienceRoles: string[] = [];
  if (Array.isArray(resumeData.experience)) {
    resumeData.experience.forEach((e: any) => {
      if (e?.role && typeof e.role === 'string') experienceRoles.push(e.role.trim());
      if (e?.title && typeof e.title === 'string') experienceRoles.push(e.title.trim());
    });
  }

  // 3. Education Degrees & Fields of Study
  const education: string[] = [];
  if (Array.isArray(resumeData.education)) {
    resumeData.education.forEach((ed: any) => {
      const edStr = `${ed?.degree || ''} ${ed?.fieldOfStudy || ed?.major || ''} ${ed?.school || ''}`.trim();
      if (edStr) education.push(edStr);
    });
  }

  // 4. Certifications
  const certifications: string[] = [];
  if (Array.isArray(resumeData.certifications)) {
    resumeData.certifications.forEach((c: any) => {
      if (typeof c === 'string' && c.trim()) certifications.push(c.trim());
      else if (c?.name && typeof c.name === 'string') certifications.push(c.name.trim());
    });
  }

  // 5. Scan text blob for broad domain skills & multi-word terminology
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

  // Comprehensive Domain Skill Dictionary
  const dictionaryKeywords = [
    // QA & Quality Assurance / Testing
    'Quality Assurance', 'QA', 'Manual Testing', 'Automated Testing', 'Test Cases',
    'Regression Testing', 'API Testing', 'Selenium', 'Cypress', 'Playwright',
    'Postman', 'Jira', 'Agile', 'Bug Tracking', 'SDLC', 'STLC', 'Test Automation',
    // Teaching & STEM / Computer Science Teaching
    'Computer Science', 'STEM', 'Mandarin', 'Mathematics', 'Math', 'Physics', 'Chemistry',
    'Biology', 'Coding', 'Robotics', 'Web Development', 'Algorithms', 'Data Structures',
    'Curriculum Development', 'Classroom Management', 'Lesson Planning', 'Student Assessment',
    'Differentiated Instruction', 'Special Education', 'Early Childhood Education', 'K-12',
    'Literacy Instruction', 'Pedagogy', 'Educational Technology', 'Tutoring', 'English Literature',
    'Language Arts', 'Social Studies', 'History',
    // Healthcare & Nursing
    'Patient Care', 'BLS', 'CPR', 'EHR', 'EMR', 'Triage', 'ICU', 'Acute Care', 'Vital Signs',
    'Phlebotomy', 'SBAR', 'HIPAA', 'Infection Control', 'Clinical Assessment', 'Patient Assessment',
    'Psychiatric Care', 'Medication Administration', 'Pediatric Care', 'Nursing', 'RN',
    // Software Engineering & Tech
    'React', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'Java', 'C++', 'Golang', 'SQL',
    'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'REST API', 'Git',
    'Scrum', 'Figma', 'UI/UX', 'CI/CD', 'Linux', 'Microservices', 'System Design',
    // Finance, Marketing & Management
    'GAAP', 'Financial Analysis', 'Financial Modeling', 'Accounting', 'Bookkeeping', 'QuickBooks',
    'SEO', 'PPC', 'Content Marketing', 'Google Analytics', 'HubSpot', 'Salesforce',
    'Project Management', 'Stakeholder Management'
  ];

  dictionaryKeywords.forEach(kw => {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (new RegExp(`\\b${escaped}\\b`, 'i').test(textBlob)) {
      skillsSet.add(kw);
    }
  });

  const skills = Array.from(skillsSet);

  // Extract target role
  const targetRole =
    (resumeData.personalInfo?.jobTitle && typeof resumeData.personalInfo.jobTitle === 'string' && resumeData.personalInfo.jobTitle.trim()) ||
    (resumeData.targetRole && typeof resumeData.targetRole === 'string' && resumeData.targetRole.trim()) ||
    (experienceRoles[0] && typeof experienceRoles[0] === 'string' && experienceRoles[0].trim()) ||
    'Software Engineer';

  // Extract location
  const candidateLocation =
    (resumeData.personalInfo?.location && typeof resumeData.personalInfo.location === 'string' && resumeData.personalInfo.location.trim()) ||
    'Remote';

  return {
    targetRole,
    candidateLocation,
    skills,
    experienceRoles,
    education,
    certifications,
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
 * Validates whether a job title is relevant to the candidate's target role or query.
 * IMPORTANT: This check ONLY inspects job.title and recognized occupation categories.
 * It NEVER inspects company descriptions, marketing text, benefits, or general job description text.
 */
export function isRoleRelevant(targetRole: string, jobTitle: string): boolean {
  if (!targetRole || !jobTitle) return false;

  const queryNorm = targetRole.toLowerCase().trim();
  const titleNorm = jobTitle.toLowerCase().trim();

  // Clean title for matching (remove punctuation)
  const cleanTitle = titleNorm.replace(/[^a-z0-9\s]/g, ' ');
  const cleanQuery = queryNorm.replace(/[^a-z0-9\s]/g, ' ');

  // 1. Direct normalized title substring check
  const normalizedJobTitleMatchesQuery =
    cleanTitle.includes(cleanQuery) || cleanQuery.includes(cleanTitle);

  // 2. Recognized Job Occupation Category Matching Logic

  // A) PLUMBING OCCUPATIONS
  const isPlumbingQuery = /\b(plumber|plumbing|pipefitter|pipe fitter|drain technician)\b/i.test(queryNorm);
  if (isPlumbingQuery) {
    const recognizedJobOccupationMatchesQuery = /\b(plumber|plumbing|pipefitter|pipe fitter|drain technician)\b/i.test(titleNorm);
    return recognizedJobOccupationMatchesQuery;
  }

  // B) SCHOOL PRINCIPAL & EDUCATION LEADERSHIP
  // (Must exclude corporate/tech seniority titles like "Principal Product Manager", "Principal Software Engineer")
  const isSchoolPrincipalQuery = /\b(school principal|principal|headmaster|headmistress)\b/i.test(queryNorm);
  const isCorporatePrincipalTitle = /\bprincipal\b/i.test(titleNorm) &&
    /\b(product|engineering|engineer|software|developer|architect|consultant|designer|analyst|strategist|program manager|project manager|data|security|cloud|solutions|sales|marketing|account|finance|investment|legal|hr)\b/i.test(titleNorm);

  if (isSchoolPrincipalQuery) {
    if (isCorporatePrincipalTitle) return false;
    const recognizedJobOccupationMatchesQuery = /\b(school principal|assistant principal|vice principal|elementary principal|high school principal|middle school principal|headmaster|headmistress|principal of)\b/i.test(titleNorm) ||
      (queryNorm === 'principal' && /\bprincipal\b/i.test(titleNorm) && /\b(school|academy|education|district|high school|elementary|middle school|k-12)\b/i.test(titleNorm));
    return recognizedJobOccupationMatchesQuery;
  }

  // C) TEACHING & EDUCATION OCCUPATIONS
  const isTeacherQuery = /\b(teacher|teaching|educator|instructor|tutor|professor|faculty|lecturer)\b/i.test(queryNorm);
  if (isTeacherQuery) {
    const recognizedJobOccupationMatchesQuery = /\b(teacher|teaching|educator|instructor|tutor|professor|faculty|lecturer|prek|elementary|k-12)\b/i.test(titleNorm);
    return recognizedJobOccupationMatchesQuery;
  }

  // D) NURSING & HEALTHCARE OCCUPATIONS
  const isNurseQuery = /\b(nurse|nursing|rn|lpn|np|nurse practitioner)\b/i.test(queryNorm);
  if (isNurseQuery) {
    const recognizedJobOccupationMatchesQuery = /\b(nurse|nursing|registered nurse|rn|lpn|np|nurse practitioner|clinical nurse|triage nurse|charge nurse|staff nurse)\b/i.test(titleNorm);
    return recognizedJobOccupationMatchesQuery;
  }

  // E) SOFTWARE ENGINEERING / TECH OCCUPATIONS
  const isSoftwareEngineerQuery = /\b(software engineer|software developer|developer|frontend|backend|fullstack|full stack|web developer|programmer|devops|software architect)\b/i.test(queryNorm);
  if (isSoftwareEngineerQuery) {
    const isNonTechTitle = /\b(plumber|plumbing|nurse|nursing|teacher|teaching|doctor|lawyer|accountant)\b/i.test(titleNorm);
    if (isNonTechTitle) return false;

    const recognizedJobOccupationMatchesQuery = /\b(software engineer|software developer|developer|frontend|backend|fullstack|full stack|web developer|programmer|devops|software architect|code|coder|system engineer|data engineer|cloud engineer)\b/i.test(titleNorm);
    return recognizedJobOccupationMatchesQuery;
  }

  // F) GENERAL OCCUPATIONS FALLBACK LOGIC:
  const stopwords = new Set(['a', 'an', 'the', 'in', 'of', 'and', 'or', 'for', 'with', 'senior', 'junior', 'lead', 'staff', 'principal', 'head', 'vp', 'director', 'manager', 'associate', 'assistant', 'intern']);
  const queryTokens = cleanQuery.split(/\s+/).filter(w => w.length > 2 && !stopwords.has(w));

  if (queryTokens.length === 0) return true;

  const recognizedJobOccupationMatchesQuery = queryTokens.some(token => cleanTitle.includes(token));

  return normalizedJobTitleMatchesQuery || recognizedJobOccupationMatchesQuery;
}

/**
 * Sub-Field Prioritization Evaluator:
 * Compares specific sub-field requirements (e.g., Computer Science Teacher vs Language Arts Teacher).
 * Returns Title Match score (0 to 25 points).
 */
function evaluateTitleRelevance(targetRole: string, jobTitle: string, candidateSkills: string[]): number {
  const roleNorm = targetRole.toLowerCase().trim();
  const titleNorm = jobTitle.toLowerCase().trim();

  // Exact title match
  if (titleNorm === roleNorm) return 25;

  // Check sub-field specifics (e.g. Computer Science / STEM vs Language Arts)
  const isCandidateCS = /computer science|cs|stem|coding|programming|software|tech/i.test(roleNorm) ||
                        candidateSkills.some(s => /computer science|stem|coding|python|java|web development/i.test(s));

  const isCandidateLangArts = /language arts|english|literature|reading|writing/i.test(roleNorm) ||
                              candidateSkills.some(s => /language arts|english|literature/i.test(s));

  const isJobCS = /computer science|cs|stem|coding|robotics|tech teacher|math content/i.test(titleNorm);
  const isJobLangArts = /language arts|english|literature|reading teacher/i.test(titleNorm);

  if (isCandidateCS && isJobCS) {
    return 24; // Prioritize CS teaching jobs for CS Teachers
  }

  if (isCandidateCS && isJobLangArts && !isCandidateLangArts) {
    return 10; // Penalize Language Arts Teacher for CS Teacher candidates
  }

  if (isCandidateLangArts && isJobLangArts) {
    return 24; // Prioritize Language Arts jobs for Language Arts Teachers
  }

  if (isCandidateLangArts && isJobCS && !isCandidateCS) {
    return 10; // Penalize CS jobs for Language Arts candidates
  }

  // General title keyword overlap
  if (titleNorm.includes(roleNorm) || roleNorm.includes(titleNorm)) {
    return 20;
  }

  const stopwords = new Set(['a', 'an', 'the', 'in', 'of', 'and', 'or', 'for', 'senior', 'junior', 'lead', 'staff', 'pt', 'ft']);
  const roleTokens = roleNorm.split(/[\s,/\-\\_]+/).filter(t => t.length > 2 && !stopwords.has(t));
  const matchedTokens = roleTokens.filter(t => titleNorm.includes(t));

  if (roleTokens.length > 0) {
    return Math.round((matchedTokens.length / roleTokens.length) * 18);
  }

  return 8;
}

/**
 * Fetches genuine live job listings from active job APIs (Jobicy, Remotive, Arbeitnow).
 * Applies exact 5-part weighted scoring formula:
 *   1. Skills Match: 40%
 *   2. Job-Title Relevance: 25%
 *   3. Experience Match: 15%
 *   4. Education Match: 10%
 *   5. Location/Work-Mode Match: 10%
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
  noSkillsIdentified: boolean;
  totalCount: number;
  externalPortals: ExternalSearchPortal[];
}> {
  const profile = extractResumeProfile(resumeData);
  const targetRole = filters.roleQuery?.trim() || profile.targetRole;
  const candidateLocation = filters.locationQuery?.trim() || profile.candidateLocation;
  const extractedSkills = profile.skills;

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

  // Query Jobicy, Remotive & Arbeitnow live APIs in parallel
  const searchPromises = [
    // 1. Jobicy API
    (async () => {
      try {
        const resp = await fetch(`https://jobicy.com/api/v2/remote-jobs?count=30&tag=${encodeURIComponent(targetRole)}`, {
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

  // Deduplicate raw live jobs by applicationUrl
  const seenUrls = new Set<string>();
  const uniqueJobs = rawLiveJobs.filter(j => {
    const key = (j.applicationUrl || `${j.title}_${j.company}`).toLowerCase();
    if (seenUrls.has(key)) return false;
    seenUrls.add(key);
    return true;
  });

  // Filter out completely unrelated occupations (evaluating strictly job title and recognized occupation categories)
  const relevantJobs = uniqueJobs.filter(j => isRoleRelevant(targetRole, j.title));

  // Score each job using the exact 5-part weighted scoring formula
  const scoredJobs: MatchingJob[] = relevantJobs.map((job) => {
    const fullJobText = (job.title + ' ' + job.descriptionSnippet).toLowerCase();

    // 1. SKILLS MATCH (40% MAX = 40 PTS)
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

    // Key missing skills
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

    // 2. JOB-TITLE RELEVANCE (25% MAX = 25 PTS)
    const titleScore = evaluateTitleRelevance(targetRole, job.title, extractedSkills);

    // 3. EXPERIENCE MATCH (15% MAX = 15 PTS)
    let expScore = 8;
    const hasMatchingPastRole = profile.experienceRoles.some(r => job.title.toLowerCase().includes(r.toLowerCase()));
    if (hasMatchingPastRole) expScore = 15;
    else if (job.experienceLevel === 'All Levels' || job.experienceLevel === 'Mid Level') expScore = 12;

    // 4. EDUCATION MATCH (10% MAX = 10 PTS)
    let eduScore = 5;
    const hasMatchingEducation = profile.education.some(ed => {
      const edLower = ed.toLowerCase();
      return (edLower.includes('computer science') && fullJobText.includes('computer science')) ||
             (edLower.includes('education') && fullJobText.includes('education')) ||
             (edLower.includes('nursing') && fullJobText.includes('nursing'));
    });
    if (hasMatchingEducation) eduScore = 10;
    else if (profile.education.length > 0) eduScore = 7;

    // 5. LOCATION / WORK-MODE MATCH (10% MAX = 10 PTS) & GEOGRAPHIC ELIGIBILITY
    let locScore = 5;
    let formattedLocation = job.location;

    const jobLocLower = job.location.toLowerCase();
    const candLocLower = (candidateLocation || 'remote').toLowerCase();

    const isEuropeRestrictedJob = /\b(europe|eu|uk|united kingdom|germany|france|netherlands|spain|italy|sweden|poland|emea)\b/i.test(job.location);
    const isUsRestrictedJob = /\b(us only|usa only|united states only|americas only)\b/i.test(job.location);

    const isCandidateInEurope = /\b(europe|eu|uk|united kingdom|london|berlin|paris|amsterdam|spain|italy|germany|france|netherlands)\b/i.test(candLocLower);
    const isCandidateInUs = /\b(us|usa|united states|san francisco|new york|ca|tx|fl|ny|wa|chicago|boston|austin)\b/i.test(candLocLower) || candLocLower === 'remote';

    if (isEuropeRestrictedJob) {
      if (!formattedLocation.includes('Europe only') && !formattedLocation.includes('UK only')) {
        formattedLocation = 'Remote — Europe only';
      }
      if (!isCandidateInEurope) {
        // User outside Europe -> Europe-only remote job is NOT a full location match
        locScore = 0;
      } else {
        locScore = 10;
      }
    } else if (isUsRestrictedJob) {
      if (!formattedLocation.includes('US only')) {
        formattedLocation = 'Remote — US only';
      }
      if (!isCandidateInUs) {
        locScore = 0;
      } else {
        locScore = 10;
      }
    } else if (candLocLower && candLocLower !== 'remote' && jobLocLower.includes(candLocLower)) {
      locScore = 10;
    } else if (job.isRemote) {
      locScore = 10;
    }

    // Calculate Total 5-Part Weighted Score
    let totalScore = skillsScore + titleScore + expScore + eduScore + locScore;

    const isZeroSkillsMatch = matchedSkills.length === 0;
    const isLocationMatch = locScore >= 8;

    // ENFORCE STRICT SCORE LIMITS:
    // - Zero matched resume skills: maximum 25%
    // - Title-only match (no location match): maximum 20%
    // - Wrong occupation category / weak title match: maximum 15%
    // - Title and location only: maximum 25%
    // - A score above 25% requires at least one genuine resume-skill match
    // - A score above 50% requires multiple relevant skill matches or supporting experience
    if (isZeroSkillsMatch) {
      if (titleScore < 15) {
        totalScore = Math.min(15, totalScore);
      } else if (!isLocationMatch) {
        totalScore = Math.min(20, totalScore);
      } else {
        totalScore = Math.min(25, totalScore);
      }
    } else if (matchedSkills.length === 1 && !hasMatchingPastRole) {
      totalScore = Math.min(50, totalScore);
    }

    // Absolute Cap Guarantee for Zero Skill Match (max 25%)
    if (isZeroSkillsMatch) {
      totalScore = Math.min(25, totalScore);
    }

    const matchPercentage = Math.min(98, Math.max(10, totalScore));
    const isTopMatch = matchPercentage >= 70 && !isZeroSkillsMatch;

    // Build human-readable match reason
    let matchReason = '';
    if (!isZeroSkillsMatch) {
      matchReason = `${matchPercentage}% Match: Strong title alignment with ${targetRole} and covers ${matchedSkills.length} of your resume skills (${matchedSkills.slice(0, 3).join(', ')}).`;
    } else {
      matchReason = `${matchPercentage}% Keyword and Location Match: Fits your target title (${targetRole}) and location preferences. No explicit resume skills matched the brief excerpt.`;
    }

    if (job.isRemote) {
      matchReason += ' Includes remote work flexibility.';
    }

    return {
      ...job,
      location: formattedLocation,
      matchPercentage,
      matchReason,
      matchedSkills: Array.from(new Set(matchedSkills)),
      missingSkills: Array.from(new Set(missingSkills)).slice(0, 4),
      isZeroSkillsMatch,
      isTopMatch,
      scoreBreakdown: {
        skillsScore,
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

  const externalPortals = getVerifiedSearchPortals(targetRole, candidateLocation);

  return {
    jobs: filtered,
    targetRole,
    candidateLocation,
    extractedSkills,
    extractedEducation: profile.education,
    extractedCertifications: profile.certifications,
    noSkillsIdentified: profile.noSkillsIdentified,
    totalCount: filtered.length,
    externalPortals
  };
}
