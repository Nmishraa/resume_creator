import {
  ResumeData,
  PersonalInfo,
  ExperienceItem,
  EducationItem,
  SkillCategory,
  ProjectItem,
  CertificationItem,
  CustomSection
} from '../types/resume';

/**
 * List of known placeholder strings that should be stripped
 */
const PLACEHOLDER_STRINGS = [
  'academic institution',
  'company / organization',
  'position title',
  'degree / diploma',
  'project title',
  'project details',
  'role title',
  'previous company',
  'company name',
  'institution name'
];

/**
 * Known Category Headings that must be used as Category Titles, NOT skill or project tags
 */
const SKILL_CATEGORY_HEADINGS = [
  'ai & data skills',
  'ai and data skills',
  'additional skills',
  'academic assignments',
  'tools & software',
  'tools and software',
  'core strengths',
  'programming languages',
  'technical proficiencies',
  'technologies',
  'frameworks & libraries',
  'frameworks and libraries',
  'core competencies',
  'technical skills',
  'key skills',
  'core skills'
];

/**
 * Whitelist of genuine technologies & skills that must NEVER be misclassified as projects
 */
const GENUINE_SKILL_WHITELIST = [
  'langchain',
  'pandas',
  'numpy',
  'selenium',
  'testng',
  'python',
  'java',
  'sql',
  'c++',
  'c#',
  'machine learning',
  'data annotation',
  'qa',
  'quality assurance',
  'react',
  'typescript',
  'javascript',
  'node.js',
  'aws',
  'docker',
  'kubernetes',
  'git',
  'html',
  'css',
  'tailwind',
  'pytorch',
  'tensorflow',
  'scikit-learn',
  'deep learning',
  'nlp',
  'natural language processing',
  'computer vision',
  'rag',
  'retrieval augmented generation',
  'vector database',
  'postman',
  'jira',
  'confluence',
  'agile',
  'scrum'
];

/**
 * Compares two strings using normalized alphanumeric characters
 */
export function normalizedTextCompare(str1: string | null | undefined, str2: string | null | undefined): boolean {
  if (!str1 || !str2) return false;
  const norm1 = str1.toLowerCase().replace(/[^a-z0-9]/g, '');
  const norm2 = str2.toLowerCase().replace(/[^a-z0-9]/g, '');
  return norm1.length > 0 && norm1 === norm2;
}

/**
 * Cleans standalone dashes, bullets, placeholders, and whitespace from text
 */
export function cleanString(text: string | null | undefined): string {
  if (!text) return '';
  let cleaned = text.trim();

  // Strip leading/trailing bullet points, dashes, or pipes
  cleaned = cleaned.replace(/^[•\-*–—|\s]+/, '').replace(/[•\-*–—|\s]+$/, '').trim();

  // If string is only dashes or placeholders, return empty
  if (/^[\-–—\s•|]+$/.test(cleaned)) return '';
  const lower = cleaned.toLowerCase();
  
  if (PLACEHOLDER_STRINGS.some(p => lower === p || lower === `[${p}]` || lower === `<${p}>`)) return '';
  if (lower === 'n/a' || lower === 'none' || lower === 'null' || lower === 'undefined' || lower === 'tbd') return '';

  return cleaned;
}

/**
 * Determines if a string represents an action sentence / project implementation detail
 */
function isImplementationSentence(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase();
  
  const sentenceKeywords = [
    'implemented',
    'built',
    'developed',
    'designed',
    'created',
    'data preprocessing',
    'classification algorithm',
    'classification algorithms',
    'api integration',
    'rag chatbot',
    'rag chatbots',
    'vector search',
    'fine-tuned',
    'trained model',
    'integrated'
  ];

  return sentenceKeywords.some(kw => lower.includes(kw)) || (text.length > 40 && /\b(using|with|via|for|to)\b/i.test(text));
}

/**
 * Identifies if a text string is a project title (e.g. "AI Travel Assistant")
 */
function isProjectTitle(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase().trim();

  // Must NOT match genuine skills whitelist (e.g., LangChain is a skill, NOT a project!)
  if (GENUINE_SKILL_WHITELIST.some(s => lower === s || lower === `${s} framework`)) {
    return false;
  }

  // Explicit project names mentioned in requirements
  if (lower.includes('ai travel assistant') || lower.includes('travel assistant')) {
    return true;
  }

  // Keywords indicating project
  const projectTitleKeywords = [
    'assistant',
    'system',
    'application',
    'platform',
    'bot',
    'tracker',
    'portfolio website',
    'e-commerce',
    'dashboard',
    'coursework project'
  ];

  for (const kw of projectTitleKeywords) {
    if (lower.includes(kw) && !lower.startsWith('experience with') && !lower.startsWith('knowledge of')) {
      return true;
    }
  }

  return false;
}

/**
 * 1. Sanitizes Personal Contact Info
 * - Displays location only ONCE in contact row
 * - Prevents email domains ("gmail.com") from combining with location
 */
export function sanitizePersonalInfo(info: PersonalInfo): PersonalInfo {
  let email = cleanString(info.email);
  let phone = cleanString(info.phone);
  let location = cleanString(info.location);
  let fullName = cleanString(info.fullName);
  let jobTitle = cleanString(info.jobTitle);
  let website = cleanString(info.website);
  let linkedin = cleanString(info.linkedin);
  let github = cleanString(info.github);

  if (location) {
    // Remove email address if present in location
    location = location.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi, '').trim();
    // Remove email domains
    location = location.replace(/\b(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|icloud\.com)\b/gi, '').trim();
    // Remove phone numbers if present in location
    location = location.replace(/(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/gi, '').trim();
    // Remove degree and institution text if present in location
    location = location.replace(/\b(bachelor|master|doctor|phd|b\.?s|b\.?a|m\.?s|m\.?a|m\.?b\.?a|university|college|institute|degree|diploma)\b.*/gi, '').trim();
    // Clean up leading/trailing punctuation and separators
    location = location.replace(/^[,\s\.\-–—|]+/, '').replace(/[,\s\.\-–—|]+$/, '').trim();

    // Deduplicate repetitive location tokens (e.g. "River Forest, IL, River Forest, IL")
    const parts = location.split(',').map(p => p.trim()).filter(Boolean);
    const uniqueParts: string[] = [];
    parts.forEach(p => {
      if (!uniqueParts.some(u => u.toLowerCase() === p.toLowerCase())) {
        uniqueParts.push(p);
      }
    });
    location = uniqueParts.join(', ');
  }

  if (email && email.includes(',')) {
    const emailMatch = email.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) email = emailMatch[0];
  }

  return {
    fullName,
    jobTitle,
    email,
    phone,
    location,
    website,
    linkedin,
    github
  };
}

/**
 * 2. Cleans Summary
 * - Corrects spaces before punctuation (e.g. "experience ." -> "experience.")
 * - Max 3-4 concise points
 * - Grammar fixes ("2 year" -> "2 years", "1 years" -> "1 year")
 */
export function sanitizeSummary(summaryText: string): string {
  if (!summaryText) return '';

  let text = summaryText.trim();

  // Correct spacing before punctuation and collapse consecutive spaces
  text = text
    .replace(/\s+([.,!?:;])/g, '$1')
    .replace(/\s{2,}/g, ' ');

  // Grammar correction: "X year" -> "X years" (where X > 1)
  text = text.replace(/\b(\d+)\s+years?\b/gi, (match, count) => {
    const num = parseInt(count, 10);
    return num === 1 ? `${num} year` : `${num} years`;
  });

  text = text.replace(/\b([2-9]|\d{2,})\s+year\b/gi, '$1 years');
  text = text.replace(/\b1\s+years\b/gi, '1 year');

  // Split into sentences / points
  const rawPoints = text
    .split(/(?<=[.!?])\s+|\n|•/i)
    .map(p => cleanString(p))
    .filter(p => p.length > 10);

  const concisePoints = (rawPoints.length > 0 ? rawPoints : [text]).slice(0, 4);
  return concisePoints.join(' ');
}

/**
 * 3. Consolidate & Format Education Records into unified entries
 * Structure: Degree — Institution \n Location | Graduation year
 */
export function sanitizeEducation(educationList: EducationItem[]): EducationItem[] {
  if (!educationList || educationList.length === 0) return [];

  const cleanItems = educationList.map(item => {
    let inst = cleanString(item.institution);
    let loc = cleanString(item.location);
    let deg = cleanString(item.degree);

    // Strip duplicate "University University" words
    if (inst) {
      inst = inst.replace(/\b(University|College|Institute)\s+\1\b/gi, '$1');
    }

    if (inst && inst.includes(', ')) {
      const parts = inst.split(', ').map(p => p.trim());
      if (parts.length >= 2) {
        inst = parts[0];
        if (!loc) loc = parts.slice(1).join(', ');
      }
    }

    return {
      id: item.id,
      degree: deg,
      institution: inst,
      location: loc,
      startDate: cleanString(item.startDate),
      endDate: cleanString(item.endDate),
      gpa: cleanString(item.gpa),
      highlights: (item.highlights || []).map(h => cleanString(h)).filter(Boolean)
    };
  }).filter(item => item.degree || item.institution || item.endDate);

  if (cleanItems.length === 0) return [];

  const consolidated: EducationItem[] = [];

  for (const item of cleanItems) {
    let merged = false;
    for (const existing of consolidated) {
      const canMerge =
        (!existing.institution || !item.institution || existing.institution.toLowerCase().includes(item.institution.toLowerCase()) || item.institution.toLowerCase().includes(existing.institution.toLowerCase())) &&
        (!existing.degree || !item.degree || existing.degree.toLowerCase().includes(item.degree.toLowerCase()) || item.degree.toLowerCase().includes(existing.degree.toLowerCase()));

      if (canMerge) {
        if (!existing.degree && item.degree) existing.degree = item.degree;
        if (!existing.institution && item.institution) existing.institution = item.institution;
        if (!existing.location && item.location) existing.location = item.location;
        if (!existing.startDate && item.startDate) existing.startDate = item.startDate;
        if (!existing.endDate && item.endDate) existing.endDate = item.endDate;
        if (!existing.gpa && item.gpa) existing.gpa = item.gpa;
        if (item.highlights.length > 0) {
          existing.highlights = Array.from(new Set([...(existing.highlights || []), ...item.highlights]));
        }
        merged = true;
        break;
      }
    }

    if (!merged) {
      consolidated.push({
        id: item.id || `edu-${consolidated.length + 1}`,
        degree: item.degree,
        institution: item.institution,
        location: item.location,
        startDate: item.startDate,
        endDate: item.endDate,
        gpa: item.gpa,
        highlights: item.highlights
      });
    }
  }

  return consolidated.map((item, idx) => ({
    ...item,
    id: item.id || `edu-${idx + 1}`,
    degree: item.degree || '',
    institution: item.institution || ''
  }));
}

/**
 * 4. Separates Technical Skills from Projects & Sentence Implementation Descriptions
 */
export function sanitizeSkillsAndProjects(
  skillsList: SkillCategory[],
  projectsList: ProjectItem[]
): { skills: SkillCategory[]; projects: ProjectItem[] } {
  const cleanSkills: SkillCategory[] = [];
  const extractedProjects: ProjectItem[] = [...(projectsList || [])];
  const pendingSentences: string[] = [];

  for (const cat of skillsList || []) {
    const catNameClean = cleanString(cat.category);
    
    // Ignore category headings if they match SKILL_CATEGORY_HEADINGS
    let validCategoryTitle = 'Technical Skills';
    if (catNameClean && !SKILL_CATEGORY_HEADINGS.includes(catNameClean.toLowerCase())) {
      validCategoryTitle = catNameClean;
    }

    const genuineSkills: string[] = [];

    for (const rawItem of cat.items || []) {
      const itemClean = cleanString(rawItem);
      if (!itemClean) continue;

      // Skip if item is a category heading
      if (SKILL_CATEGORY_HEADINGS.includes(itemClean.toLowerCase())) {
        continue;
      }

      // Check if item is an implementation sentence (e.g., "Implemented RAG chatbot with vector search")
      if (isImplementationSentence(itemClean)) {
        pendingSentences.push(itemClean);
        continue;
      }

      // Check if item is a Project Title (e.g., "AI Travel Assistant")
      if (isProjectTitle(itemClean)) {
        const existingProj = extractedProjects.find(p => p.title.toLowerCase() === itemClean.toLowerCase());
        if (!existingProj) {
          extractedProjects.push({
            id: `proj-extracted-${Date.now()}-${extractedProjects.length}`,
            title: itemClean,
            subtitle: '',
            highlights: []
          });
        }
      } else {
        // Genuine Skill
        if (!genuineSkills.some(s => s.toLowerCase() === itemClean.toLowerCase())) {
          genuineSkills.push(itemClean);
        }
      }
    }

    if (genuineSkills.length > 0) {
      cleanSkills.push({
        id: cat.id || `skill-cat-${cleanSkills.length + 1}`,
        category: validCategoryTitle,
        items: genuineSkills
      });
    }
  }

  // Assign pending implementation sentences into extracted projects
  if (pendingSentences.length > 0) {
    if (extractedProjects.length === 0) {
      extractedProjects.push({
        id: `proj-auto-1`,
        title: 'Key Project',
        subtitle: '',
        highlights: pendingSentences
      });
    } else {
      // Append sentences to the most relevant project or first project
      const targetProj = extractedProjects.find(p => p.title.toLowerCase().includes('ai travel') || p.title.toLowerCase().includes('assistant')) || extractedProjects[0];
      targetProj.highlights = Array.from(new Set([...(targetProj.highlights || []), ...pendingSentences]));
    }
  }

  // Clean and merge projects
  const sanitizedProjects: ProjectItem[] = [];
  for (const proj of extractedProjects) {
    const title = cleanString(proj.title);
    const subtitle = cleanString(proj.subtitle);
    const link = cleanString(proj.link);
    const startDate = cleanString(proj.startDate);
    const endDate = cleanString(proj.endDate);
    const highlights = (proj.highlights || [])
      .map(h => cleanBulletSentence(h))
      .filter(Boolean);

    // Ignore project titles created from bullet fragments or incomplete sentences
    if (title && !title.startsWith('with ') && !title.startsWith('using ') && title.length >= 3) {
      sanitizedProjects.push({
        id: proj.id || `proj-${sanitizedProjects.length + 1}`,
        title,
        subtitle: subtitle === 'Project' || subtitle === '(Project)' ? '' : subtitle,
        link: link || '',
        startDate: startDate || '',
        endDate: endDate || '',
        highlights
      });
    }
  }

  return {
    skills: cleanSkills,
    projects: sanitizedProjects
  };
}

/**
 * Formats bullet points into complete, well-formed sentences ending with proper punctuation.
 * Strips dangling preposition/conjunction fragments and capitalizes the starting letter.
 */
export function cleanBulletSentence(text: string | null | undefined): string {
  if (!text) return '';
  let cleaned = cleanString(text);
  if (!cleaned) return '';

  // Capitalize first letter if needed
  cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

  // Strip dangling trailing prepositions or conjunctions (e.g. "with", "using", "for", "via", "and")
  cleaned = cleaned.replace(/\s+\b(with|using|for|via|and|by|to|of|in|at|on|from)\s*$/i, '');

  // Ensure sentence ends with proper punctuation
  if (!/[.!?]$/.test(cleaned)) {
    cleaned += '.';
  }

  return cleaned;
}

/**
 * 5. Sanitizes Work & Volunteer Experience
 */
export function sanitizeExperience(experienceList: ExperienceItem[]): ExperienceItem[] {
  if (!experienceList) return [];

  const cleanExp: ExperienceItem[] = [];

  for (const exp of experienceList) {
    const role = cleanString(exp.role);
    const company = cleanString(exp.company);
    const location = cleanString(exp.location);
    const startDate = cleanString(exp.startDate);
    const endDate = cleanString(exp.endDate);
    const highlights = (exp.highlights || [])
      .map(h => cleanBulletSentence(h))
      .filter(Boolean);

    if (role || company) {
      cleanExp.push({
        id: exp.id || `exp-${cleanExp.length + 1}`,
        role: role || 'Professional Role',
        company: company || '',
        location: location || '',
        startDate: startDate || '',
        endDate: endDate || '',
        current: Boolean(exp.current),
        highlights: highlights
      });
    }
  }

  return cleanExp;
}

/**
 * Master Sanitizer for complete ResumeData object
 */
export function sanitizeResumeData(data: Partial<ResumeData>): Partial<ResumeData> {
  const personalInfo = sanitizePersonalInfo(data.personalInfo || {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: ''
  });

  const summary = sanitizeSummary(data.summary || '');
  const experience = sanitizeExperience(data.experience || []);
  const education = sanitizeEducation(data.education || []);

  const { skills, projects } = sanitizeSkillsAndProjects(
    data.skills || [],
    data.projects || []
  );

  const certifications: CertificationItem[] = (data.certifications || [])
    .map(c => ({
      id: c.id,
      name: cleanString(c.name),
      issuer: cleanString(c.issuer),
      date: cleanString(c.date)
    }))
    .filter(c => c.name);

  return {
    ...data,
    personalInfo,
    summary,
    experience,
    education,
    skills,
    projects,
    certifications
  };
}
