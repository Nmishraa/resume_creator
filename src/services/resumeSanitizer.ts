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
 * Common category headings that should be used as category titles, not skill tags
 */
const SKILL_CATEGORY_HEADINGS = [
  'tools & software',
  'tools and software',
  'academic assignments',
  'core strengths',
  'programming languages',
  'technical proficiencies',
  'technologies',
  'frameworks & libraries',
  'frameworks and libraries',
  'core competencies',
  'technical skills',
  'key skills'
];

/**
 * Identifies if a text string is a project (e.g. "AI Travel Assistant", "Academic Assignments - Travel Assistant")
 */
function isProjectItem(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase().trim();

  // Explicit project names mentioned in requirements
  if (lower.includes('ai travel assistant') || lower.includes('travel assistant')) {
    return true;
  }

  // Keywords indicating project
  const projectKeywords = [
    'assistant',
    'system',
    'application',
    'platform',
    'bot',
    'tracker',
    'portfolio website',
    'e-commerce',
    'dashboard',
    'academic assignment',
    'coursework project'
  ];

  for (const kw of projectKeywords) {
    if (lower.includes(kw) && !lower.startsWith('experience with') && !lower.startsWith('knowledge of')) {
      return true;
    }
  }

  // Sentences longer than 35 characters inside skills are usually project descriptions
  if (text.length > 35 && /\b(built|developed|created|designed|implemented|using|with)\b/i.test(text)) {
    return true;
  }

  return false;
}

/**
 * Cleans standalone dashes, bullets, and whitespace from text
 */
export function cleanString(text: string | null | undefined): string {
  if (!text) return '';
  let cleaned = text.trim();

  // Strip leading/trailing bullet points or dashes
  cleaned = cleaned.replace(/^[•\-*–—\s]+/, '').replace(/[•\-*–—\s]+$/, '').trim();

  // If string is only dashes or placeholders, return empty
  if (/^[\-–—\s•]+$/.test(cleaned)) return '';
  if (PLACEHOLDER_STRINGS.includes(cleaned.toLowerCase())) return '';

  return cleaned;
}

/**
 * 1. Sanitizes Personal Contact Info
 * - Separates email, phone, location
 * - Prevents email domain (e.g. "gmail.com") from combining with location
 * - Prevents location duplication
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

  // Clean location if it contains email or email domains (e.g. "email@gmail.com, City, State" or "gmail.com City, State")
  if (location) {
    // Remove email address if present in location
    location = location.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi, '').trim();
    // Remove email domains
    location = location.replace(/\b(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|icloud\.com)\b/gi, '').trim();
    // Remove phone numbers if present in location
    location = location.replace(/(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/gi, '').trim();
    // Clean up leading/trailing punctuation
    location = location.replace(/^[,\s\.\-–—]+/, '').replace(/[,\s\.\-–—]+$/, '').trim();

    // Deduplicate repetitive city/state tokens (e.g. "River Forest, IL, River Forest, IL")
    const parts = location.split(',').map(p => p.trim()).filter(Boolean);
    const uniqueParts: string[] = [];
    parts.forEach(p => {
      if (!uniqueParts.some(u => u.toLowerCase() === p.toLowerCase())) {
        uniqueParts.push(p);
      }
    });
    location = uniqueParts.join(', ');
  }

  // Ensure email does not contain location
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
 * - Max 3-4 concise points
 * - Grammar fixes (e.g. "2 year" -> "2 years", "1 years" -> "1 year")
 */
export function sanitizeSummary(summaryText: string): string {
  if (!summaryText) return '';

  let text = summaryText.trim();

  // Grammar correction: "X year" -> "X years" (where X > 1)
  text = text.replace(/\b(\d+)\s+years?\b/gi, (match, count) => {
    const num = parseInt(count, 10);
    return num === 1 ? `${num} year` : `${num} years`;
  });

  // Handle "X year" without preceding "a" (e.g. "2 year experience" -> "2 years experience")
  text = text.replace(/\b([2-9]|\d{2,})\s+year\b/gi, '$1 years');

  // Handle "1 years" -> "1 year"
  text = text.replace(/\b1\s+years\b/gi, '1 year');

  // Split into sentences / points
  const rawPoints = text
    .split(/(?<=[.!?])\s+|\n|•|\ballow\b/i)
    .map(p => cleanString(p))
    .filter(p => p.length > 10);

  // Take maximum 3 to 4 concise points
  const concisePoints = (rawPoints.length > 0 ? rawPoints : [text]).slice(0, 4);

  return concisePoints.join(' ');
}

/**
 * 3. Consolidate Duplicate Education Entries
 */
export function sanitizeEducation(educationList: EducationItem[]): EducationItem[] {
  if (!educationList || educationList.length === 0) return [];

  const cleanItems = educationList.map(item => {
    let inst = cleanString(item.institution);
    let loc = cleanString(item.location);
    const deg = cleanString(item.degree);

    if (inst && inst.includes(', ')) {
      const parts = inst.split(', ').map(p => p.trim());
      if (parts.length >= 2) {
        // e.g. "Dominican University, River Forest, IL"
        inst = parts[0];
        if (!loc) {
          loc = parts.slice(1).join(', ');
        }
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

  // If there are multiple education items where fields are complementary (e.g. one has degree, one has institution/date), merge them!
  const consolidated: EducationItem[] = [];

  for (const item of cleanItems) {
    let merged = false;
    for (const existing of consolidated) {
      // Check if item can be merged into existing entry:
      // Either degree matches, institution matches, or one of them is missing degree/institution and the other has it!
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

  // Ensure clean non-empty values
  return consolidated.map((item, idx) => ({
    ...item,
    id: item.id || `edu-${idx + 1}`,
    degree: item.degree || 'Bachelor of Science',
    institution: item.institution || 'University'
  }));
}

/**
 * 4. Separates genuine technical skills from projects and categorizes headings
 */
export function sanitizeSkillsAndProjects(
  skillsList: SkillCategory[],
  projectsList: ProjectItem[]
): { skills: SkillCategory[]; projects: ProjectItem[] } {
  const cleanSkills: SkillCategory[] = [];
  const extractedProjects: ProjectItem[] = [...(projectsList || [])];

  for (const cat of skillsList || []) {
    const catNameClean = cleanString(cat.category);
    const validCategoryTitle = catNameClean || 'Technical Skills';

    const genuineSkills: string[] = [];

    for (const rawItem of cat.items || []) {
      const itemClean = cleanString(rawItem);
      if (!itemClean) continue;

      // Check if this item is a Category Heading rather than a skill tag
      if (SKILL_CATEGORY_HEADINGS.includes(itemClean.toLowerCase())) {
        // Skip adding as individual skill tag
        continue;
      }

      // Check if this item is a Project (e.g., "AI Travel Assistant")
      if (isProjectItem(itemClean)) {
        // Move to projects section
        const existingProj = extractedProjects.find(p => p.title.toLowerCase() === itemClean.toLowerCase());
        if (!existingProj) {
          extractedProjects.push({
            id: `proj-extracted-${Date.now()}-${extractedProjects.length}`,
            title: itemClean,
            subtitle: 'Project',
            highlights: ['Designed and implemented application features using modern frameworks.']
          });
        }
      } else {
        // Genuine skill
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

  // Clean projects
  const sanitizedProjects: ProjectItem[] = [];
  for (const proj of extractedProjects) {
    const title = cleanString(proj.title);
    const subtitle = cleanString(proj.subtitle);
    const link = cleanString(proj.link);
    const startDate = cleanString(proj.startDate);
    const endDate = cleanString(proj.endDate);
    const highlights = (proj.highlights || []).map(h => cleanString(h)).filter(Boolean);

    if (title) {
      sanitizedProjects.push({
        id: proj.id || `proj-${sanitizedProjects.length + 1}`,
        title,
        subtitle,
        link,
        startDate,
        endDate,
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
 * 5. Sanitizes Work Experience
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
    const highlights = (exp.highlights || []).map(h => cleanString(h)).filter(Boolean);

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
