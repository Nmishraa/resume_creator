import * as mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
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

// Configure pdfjs worker if available
try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.0.379'}/pdf.worker.min.mjs`;
} catch (e) {
  console.warn('PDF.js worker setup fallback:', e);
}

export interface ExtractedResumeResult {
  data: Partial<ResumeData>;
  unextractedFields: string[];
  rawText: string;
}

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

/**
 * Validates and extracts text from uploaded file (PDF, DOCX, TXT)
 */
export async function extractTextFromFile(file: File): Promise<string> {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error('File size exceeds the maximum limit of 10MB.');
  }

  const fileExt = file.name.split('.').pop()?.toLowerCase();
  const fileType = file.type;

  if (fileExt === 'txt' || fileType === 'text/plain') {
    return await file.text();
  }

  if (fileExt === 'docx' || fileType.includes('wordprocessingml')) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value || '';
  }

  if (fileExt === 'pdf' || fileType === 'application/pdf') {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;
    let fullText = '';

    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      let lastY: number | null = null;
      let pageText = '';

      for (const item of textContent.items as any[]) {
        if (!item.str) continue;
        const currentY = item.transform ? item.transform[5] : null;

        // If Y-coordinate shifts noticeably (new line on page) or PDF item indicates EOL
        if (lastY !== null && currentY !== null && Math.abs(lastY - currentY) > 4) {
          pageText += '\n';
        } else if (item.hasEOL) {
          pageText += '\n';
        } else if (pageText.length > 0 && !pageText.endsWith('\n') && !pageText.endsWith(' ')) {
          pageText += ' ';
        }

        pageText += item.str;
        if (currentY !== null) {
          lastY = currentY;
        }
      }
      fullText += pageText + '\n';
    }
    return fullText;
  }

  throw new Error('Unsupported file format. Please upload a PDF, DOCX, or TXT file.');
}

/**
 * Helper regex patterns for parsing date ranges, locations, and section headers
 */
const DATE_RANGE_REGEX = /(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?|\d{1,2}[\/\.-]\d{2,4}|\d{4})\s*(?:-|–|to|until)\s*(?:Present|Current|Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?|\d{1,2}[\/\.-]\d{2,4}|\d{4})/i;

const LOCATION_REGEX = /(?:[A-Z][a-zA-Z\s\.-]+,\s*(?:[A-Z]{2}\b|[A-Z][a-zA-Z\s]+)|Remote|\bSan Francisco\b|\bNew York\b|\bSeattle\b|\bAustin\b|\bLondon\b|\bToronto\b)/i;

const DEGREE_KEYWORDS = /bachelor|master|doctor|ph\.?d|b\.?s\.?|b\.?a\.?|m\.?s\.?|m\.?a\.?|m\.?b\.?a\.?|associate|diploma|degree/i;

const INST_KEYWORDS = /university|college|institute|academy|polytechnic|school/i;

/**
 * Parses raw extracted resume text into structured ResumeData sections
 */
export function parseResumeContent(rawText: string): ExtractedResumeResult {
  const sanitizedText = rawText
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');

  const lines = sanitizedText
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  const unextractedFields: string[] = [];

  const personalInfo: PersonalInfo = {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: ''
  };

  // 1. Contact Information Extraction
  const emailMatch = sanitizedText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    personalInfo.email = emailMatch[0];
  } else {
    unextractedFields.push('Email');
  }

  const phoneMatch = sanitizedText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) {
    personalInfo.phone = phoneMatch[0];
  } else {
    unextractedFields.push('Phone Number');
  }

  const linkedinMatch = sanitizedText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
  if (linkedinMatch) {
    personalInfo.linkedin = linkedinMatch[0].startsWith('http') ? linkedinMatch[0] : `https://${linkedinMatch[0]}`;
  } else {
    unextractedFields.push('LinkedIn Profile');
  }

  const githubMatch = sanitizedText.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_-]+/i);
  if (githubMatch) {
    personalInfo.github = githubMatch[0].startsWith('http') ? githubMatch[0] : `https://${githubMatch[0]}`;
  } else {
    unextractedFields.push('GitHub Link');
  }

  const websiteMatch = sanitizedText.match(/https?:\/\/(?!www\.linkedin|www\.github)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}[^\s]*/i);
  if (websiteMatch) {
    personalInfo.website = websiteMatch[0];
  } else {
    unextractedFields.push('Personal Portfolio Website');
  }

  // Location extraction
  const locationMatch = sanitizedText.match(LOCATION_REGEX);
  if (locationMatch) {
    personalInfo.location = locationMatch[0].trim();
  }

  // Name & Job Title extraction from top lines
  const topLines = lines.slice(0, 8);
  for (let idx = 0; idx < topLines.length; idx++) {
    const l = topLines[idx];
    const isContactLine = l.includes('@') || l.toLowerCase().includes('linkedin') || l.toLowerCase().includes('github') || l.toLowerCase().includes('http');
    const isHeaderWord = /^(resume|curriculum vitae|cv|about|summary|experience|skills|education)$/i.test(l);

    if (!personalInfo.fullName && !isContactLine && !isHeaderWord && l.length > 2 && l.length < 50) {
      const cleanName = l.replace(/[^a-zA-Z\s\.-]/g, '').trim();
      if (cleanName.split(/\s+/).length >= 2) {
        personalInfo.fullName = cleanName;
        continue;
      }
    }

    if (personalInfo.fullName && !personalInfo.jobTitle && !isContactLine && !isHeaderWord && l.length < 60) {
      if (l !== personalInfo.fullName && !/^\+?\d/.test(l)) {
        personalInfo.jobTitle = l;
      }
    }
  }

  if (!personalInfo.fullName) unextractedFields.push('Full Name');
  if (!personalInfo.jobTitle) unextractedFields.push('Job Title / Headline');

  // 2. Section Segmentation
  let currentSection:
    | 'summary'
    | 'experience'
    | 'education'
    | 'skills'
    | 'projects'
    | 'certifications'
    | 'languages'
    | 'additional'
    | 'none' = 'none';

  let summaryText = '';
  const experience: ExperienceItem[] = [];
  const education: EducationItem[] = [];
  const skillCategoriesMap: Map<string, string[]> = new Map();
  const rawSkills: string[] = [];
  const projects: ProjectItem[] = [];
  const certifications: CertificationItem[] = [];
  const languages: string[] = [];
  const customSections: CustomSection[] = [];

  const checkSectionHeader = (line: string): typeof currentSection | null => {
    // Strip leading numbers, bullets, colons, spaces
    const cleanHeader = line
      .replace(/^[\d\.\-\*•I|A-Z]+\s*/i, '')
      .replace(/[:\-–]+$/, '')
      .trim()
      .toLowerCase();

    if (/^(about|summary|professional summary|executive summary|profile|objective|career objective|about me)$/i.test(cleanHeader)) {
      return 'summary';
    }
    if (/^(work experience|professional experience|employment history|work history|experience|career history|positions held|relevant experience)$/i.test(cleanHeader)) {
      return 'experience';
    }
    if (/^(education|academic background|qualifications|academic history|education & training)$/i.test(cleanHeader)) {
      return 'education';
    }
    if (/^(skills|technical skills|technologies|core competencies|areas of expertise|key skills|skills & abilities|technical proficiencies)$/i.test(cleanHeader)) {
      return 'skills';
    }
    if (/^(projects|key projects|featured projects|personal projects|academic projects)$/i.test(cleanHeader)) {
      return 'projects';
    }
    if (/^(certifications|licenses|credentials|certifications & licenses|certificates|courses)$/i.test(cleanHeader)) {
      return 'certifications';
    }
    if (/^(languages|language skills|spoken languages)$/i.test(cleanHeader)) {
      return 'languages';
    }
    if (/^(awards|honors|volunteer|publications|interests|achievements|activities|extracurricular)$/i.test(cleanHeader)) {
      return 'additional';
    }
    return null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const detectedHeader = checkSectionHeader(line);

    if (detectedHeader) {
      currentSection = detectedHeader;
      continue;
    }

    if (currentSection === 'summary') {
      summaryText += (summaryText ? ' ' : '') + line;
    } else if (currentSection === 'skills') {
      // Check if line contains inline category format e.g. "Languages: JS, Python, Go"
      const colonIdx = line.indexOf(':');
      if (colonIdx > 0 && colonIdx < 30) {
        const catName = line.substring(0, colonIdx).replace(/^[•\-\*]\s*/, '').trim();
        const itemsStr = line.substring(colonIdx + 1);
        const parts = itemsStr.split(/[,•|·\t]/).map(p => p.trim()).filter(Boolean);
        if (parts.length > 0) {
          const existing = skillCategoriesMap.get(catName) || [];
          skillCategoriesMap.set(catName, [...existing, ...parts]);
        }
      } else {
        const parts = line.split(/[,•|·\t]/).map(p => p.trim()).filter(Boolean);
        if (parts.length > 0) {
          rawSkills.push(...parts);
        }
      }
    } else if (currentSection === 'languages') {
      const parts = line.split(/[,•|·\t]/).map(p => p.trim()).filter(Boolean);
      if (parts.length > 0) {
        languages.push(...parts);
      }
    } else if (currentSection === 'experience') {
      const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*') || line.startsWith('–');
      const cleanLine = line.replace(/^[•\-*–]\s*/, '');
      const dateMatch = line.match(DATE_RANGE_REGEX);

      if (isBullet && experience.length > 0) {
        experience[experience.length - 1].highlights.push(cleanLine);
      } else if (dateMatch || line.length < 80) {
        // Parse date details if found in line
        let startDate = '';
        let endDate = '';
        let current = false;
        if (dateMatch) {
          const dateStr = dateMatch[0];
          const parts = dateStr.split(/ - | – | to | until /i);
          startDate = parts[0]?.trim() || '';
          endDate = parts[1]?.trim() || '';
          if (/present|current/i.test(endDate)) {
            current = true;
            endDate = 'Present';
          }
        }

        // Check company / role parts
        let role = cleanLine.replace(DATE_RANGE_REGEX, '').trim();
        let company = 'Company / Organization';
        let location = '';

        if (role.includes('|')) {
          const segments = role.split('|').map(s => s.trim());
          role = segments[0] || 'Software Engineer';
          company = segments[1] || company;
          if (segments[2]) location = segments[2];
        } else if (role.includes(' at ')) {
          const segments = role.split(' at ');
          role = segments[0].trim();
          company = segments[1].trim();
        } else if (role.includes(' - ')) {
          const segments = role.split(' - ');
          if (segments.length >= 2) {
            role = segments[0].trim();
            company = segments[1].trim();
          }
        }

        const expLocation = location || (role.match(LOCATION_REGEX)?.[0]) || '';

        experience.push({
          id: `exp-${Date.now()}-${experience.length}`,
          role: role || 'Position Title',
          company: company,
          location: expLocation,
          startDate: startDate || '',
          endDate: endDate || (current ? 'Present' : ''),
          current: current,
          highlights: []
        });
      } else if (experience.length > 0) {
        experience[experience.length - 1].highlights.push(cleanLine);
      }
    } else if (currentSection === 'education') {
      const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*');
      const cleanLine = line.replace(/^[•\-*]\s*/, '');
      const dateMatch = line.match(DATE_RANGE_REGEX);
      const isDegreeLine = DEGREE_KEYWORDS.test(line) || INST_KEYWORDS.test(line);

      if (isDegreeLine || education.length === 0 || dateMatch) {
        let degree = cleanLine;
        let institution = 'Academic Institution';
        let startDate = '';
        let endDate = '';

        if (dateMatch) {
          const parts = dateMatch[0].split(/ - | – | to /i);
          startDate = parts[0]?.trim() || '';
          endDate = parts[1]?.trim() || '';
          degree = degree.replace(DATE_RANGE_REGEX, '').trim();
        }

        if (cleanLine.includes(' - ')) {
          const parts = cleanLine.split(' - ');
          degree = parts[0].trim();
          institution = parts[1].trim();
        } else if (cleanLine.includes(', ')) {
          const parts = cleanLine.split(', ');
          if (DEGREE_KEYWORDS.test(parts[0])) {
            degree = parts[0].trim();
            institution = parts.slice(1).join(', ').trim();
          }
        }

        education.push({
          id: `edu-${Date.now()}-${education.length}`,
          degree: degree || 'Degree / Diploma',
          institution: institution,
          location: (degree.match(LOCATION_REGEX)?.[0]) || '',
          startDate: startDate,
          endDate: endDate,
          highlights: []
        });
      } else if (education.length > 0) {
        education[education.length - 1].highlights.push(cleanLine);
      }
    } else if (currentSection === 'projects') {
      const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*');
      const cleanLine = line.replace(/^[•\-*]\s*/, '');

      if (isBullet && projects.length > 0) {
        projects[projects.length - 1].highlights.push(cleanLine);
      } else if (projects.length === 0 || line.length < 80) {
        let title = cleanLine;
        let subtitle = 'Project Details';
        let link = '';

        const urlMatch = cleanLine.match(/https?:\/\/[^\s]+/i);
        if (urlMatch) {
          link = urlMatch[0];
          title = title.replace(urlMatch[0], '').trim();
        }

        if (title.includes(' - ')) {
          const parts = title.split(' - ');
          title = parts[0].trim();
          subtitle = parts[1].trim();
        } else if (title.includes('|')) {
          const parts = title.split('|');
          title = parts[0].trim();
          subtitle = parts[1].trim();
        }

        projects.push({
          id: `proj-${Date.now()}-${projects.length}`,
          title: title || 'Project Title',
          subtitle: subtitle,
          link: link,
          highlights: []
        });
      } else if (projects.length > 0) {
        projects[projects.length - 1].highlights.push(cleanLine);
      }
    } else if (currentSection === 'certifications') {
      const parts = line.split(/ - | \| |, /);
      certifications.push({
        id: `cert-${Date.now()}-${certifications.length}`,
        name: parts[0]?.trim() || line,
        issuer: parts[1]?.trim() || 'Issuing Authority',
        date: parts[2]?.trim() || ''
      });
    } else if (currentSection === 'additional') {
      if (customSections.length === 0) {
        customSections.push({
          id: `custom-additional`,
          title: 'Additional Achievements & Activities',
          items: []
        });
      }
      customSections[0].items.push({
        id: `custom-item-${Date.now()}-${customSections[0].items.length}`,
        title: line
      });
    }
  }

  // Missing sections notification check
  if (!summaryText) unextractedFields.push('Professional Summary');
  if (experience.length === 0) unextractedFields.push('Work Experience');
  if (education.length === 0) unextractedFields.push('Education');
  if (rawSkills.length === 0 && skillCategoriesMap.size === 0) unextractedFields.push('Skills');
  if (projects.length === 0) unextractedFields.push('Projects');
  if (certifications.length === 0) unextractedFields.push('Certifications');
  if (languages.length === 0) unextractedFields.push('Languages');

  // Format Skills Categories
  const skills: SkillCategory[] = [];
  if (skillCategoriesMap.size > 0) {
    let catIdx = 1;
    skillCategoriesMap.forEach((items, category) => {
      skills.push({
        id: `skill-cat-${catIdx++}`,
        category: category,
        items: Array.from(new Set(items))
      });
    });
  }

  if (rawSkills.length > 0) {
    const uniqueSkills = Array.from(new Set(rawSkills));
    skills.push({
      id: `skill-cat-default-${skills.length + 1}`,
      category: skills.length === 0 ? 'Core Competencies & Technologies' : 'Additional Skills',
      items: uniqueSkills
    });
  }

  // Format Languages into Custom Section
  if (languages.length > 0) {
    customSections.push({
      id: `custom-lang`,
      title: 'Languages',
      items: languages.map((lang, idx) => ({
        id: `lang-${idx}`,
        title: lang
      }))
    });
  }

  const extractedResumeData: Partial<ResumeData> = {
    personalInfo,
    summary: summaryText,
    experience,
    education,
    skills,
    projects,
    certifications,
    customSections
  };

  return {
    data: extractedResumeData,
    unextractedFields,
    rawText: sanitizedText
  };
}
