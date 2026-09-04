import * as mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import { sanitizeResumeData } from './resumeSanitizer';
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

export interface FieldWarning {
  section: string;
  field: string;
  message: string;
}

export interface ExtractedResumeResult {
  data: Partial<ResumeData>;
  unextractedFields: string[];
  fieldWarnings: FieldWarning[];
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
      const items = textContent.items as any[];

      // Column-aware item sorting for two-column PDF layouts
      const leftColItems = items.filter((i: any) => i.transform && i.transform[4] < 300);
      const rightColItems = items.filter((i: any) => i.transform && i.transform[4] >= 300);
      const isTwoColumn = leftColItems.length > 6 && rightColItems.length > 6;

      let orderedItems = items;
      if (isTwoColumn) {
        const sortTopToBottom = (a: any, b: any) => {
          const yA = a.transform ? a.transform[5] : 0;
          const yB = b.transform ? b.transform[5] : 0;
          if (Math.abs(yA - yB) > 4) return yB - yA;
          const xA = a.transform ? a.transform[4] : 0;
          const xB = b.transform ? b.transform[4] : 0;
          return xA - xB;
        };
        leftColItems.sort(sortTopToBottom);
        rightColItems.sort(sortTopToBottom);
        orderedItems = [...leftColItems, ...rightColItems];
      }

      let lastY: number | null = null;
      let lastX: number | null = null;
      let pageText = '';

      for (const item of orderedItems) {
        if (!item.str) continue;
        const currentY = item.transform ? item.transform[5] : null;
        const currentX = item.transform ? item.transform[4] : null;

        if (lastY !== null && currentY !== null && Math.abs(lastY - currentY) > 4) {
          pageText += '\n';
        } else if (item.hasEOL) {
          pageText += '\n';
        } else if (pageText.length > 0 && !pageText.endsWith('\n') && !pageText.endsWith(' ') && !item.str.startsWith(' ')) {
          if (lastX === null || currentX === null || (currentX - lastX > 3)) {
            pageText += ' ';
          }
        }

        pageText += item.str;
        if (currentY !== null) lastY = currentY;
        if (currentX !== null) lastX = currentX + (item.width || 0);
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
const DATE_RANGE_REGEX = /(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?|\d{1,2}[\/\.-]\d{2,4}|\d{4})\s*(?:-|–|—|to|until)\s*(?:Present|Current|Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?|\d{1,2}[\/\.-]\d{2,4}|\d{4})/i;

const LOCATION_REGEX = /(?:[A-Z][a-zA-Z\s\.-]+,\s*(?:[A-Z]{2}\b|[A-Z][a-zA-Z\s]+)|Remote|\bSan Francisco\b|\bNew York\b|\bSeattle\b|\bAustin\b|\bLondon\b|\bToronto\b|\bChicago\b|\bBoston\b|\bSan Jose\b)/i;

const DEGREE_KEYWORDS = /bachelor|master|doctor|ph\.?d|b\.?s\.?|b\.?a\.?|m\.?s\.?|m\.?a\.?|m\.?b\.?a\.?|associate|diploma|degree/i;

const INST_KEYWORDS = /university|college|institute|academy|polytechnic|school/i;

/**
 * Multi-cue Section Header Classifier recognizing standard and unconventional section names
 */
function detectSectionHeader(line: string): 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'volunteer' | 'awards' | 'languages' | 'additional' | null {
  const trimmed = line.trim();
  if (trimmed.length > 50) return null;
  if (DATE_RANGE_REGEX.test(trimmed) || trimmed.includes('@') || trimmed.includes('http')) return null;

  const cleanHeader = trimmed
    .replace(/^(?:[\d\.\-\*•|]+|[A-Za-z]\.|[IVXLCDM]+\.)\s*/i, '')
    .replace(/[:\-–—]+$/, '')
    .replace(/['’]/g, "'")
    .trim()
    .toLowerCase();

  const headerPrefix = cleanHeader.split(':')[0].trim();

  if (!cleanHeader) return null;

  if (/^(about|summary|professional summary|executive summary|profile|personal profile|objective|career objective|about me|summary of qualifications|overview|statement)$/i.test(headerPrefix)) {
    return 'summary';
  }
  if (/^(work experience|professional experience|employment history|work history|experience|career history|positions held|relevant experience|employment|professional background|where i've worked|work background|history)$/i.test(headerPrefix)) {
    return 'experience';
  }
  if (/^(education|academic background|academic history|qualifications|academic qualifications|scholastic achievement|education & training|degrees|education background|learning|learning & degrees)$/i.test(headerPrefix)) {
    return 'education';
  }
  if (/^(skills|technical skills|core skills|key skills|technologies|core competencies|areas of expertise|skills & abilities|skills & proficiencies|proficiencies|technical proficiencies|skills & expertise|technical background|tools|tools & software|programming languages|hard skills|frameworks & libraries|what i know)$/i.test(headerPrefix)) {
    return 'skills';
  }
  if (/^(projects|key projects|featured projects|personal projects|academic projects|selected projects|major projects|technical projects|assignments|coursework projects|portfolio)$/i.test(headerPrefix)) {
    return 'projects';
  }
  if (/^(certifications|licenses|credentials|certifications & licenses|certificates|courses|certifications & training|accreditation)$/i.test(headerPrefix)) {
    return 'certifications';
  }
  if (/^(volunteer|volunteer experience|volunteer work|community involvement|community service|social work|volunteering|leadership & activities)$/i.test(headerPrefix)) {
    return 'volunteer';
  }
  if (/^(awards|honors|awards & honors|achievements|key achievements|recognition|publications|patents)$/i.test(headerPrefix)) {
    return 'awards';
  }
  if (/^(languages|language skills|spoken languages)$/i.test(headerPrefix)) {
    return 'languages';
  }

  // Non-standard / Unconventional Section Headings (e.g., "CONFERENCES", "DECLARATION", "AFFILIATIONS", "REPOSITORIES")
  // Restrict uppercase matching to known header words or colon-terminated lines so candidate names (e.g. JOHN SMITH) are not misclassified
  const KNOWN_UPPER_HEADERS = /^(SUMMARY|PROFILE|OBJECTIVE|EXPERIENCE|WORK EXPERIENCE|PROFESSIONAL EXPERIENCE|EMPLOYMENT|EMPLOYMENT HISTORY|WORK HISTORY|PROJECTS|KEY PROJECTS|FEATURED PROJECTS|PERSONAL PROJECTS|ACADEMIC PROJECTS|EDUCATION|QUALIFICATIONS|SKILLS|TECHNICAL SKILLS|CORE SKILLS|TECHNOLOGIES|COMPETENCIES|CERTIFICATIONS|CERTIFICATES|LICENSES|VOLUNTEER|VOLUNTEER EXPERIENCE|COMMUNITY|AWARDS|HONORS|PUBLICATIONS|PATENTS|CONFERENCES|LANGUAGES|DECLARATION|AFFILIATIONS|INTERVIEW|PORTFOLIO|ACCOMPLISHMENTS|ACHIEVEMENTS)$/i;

  const isHeaderFormatting =
    (trimmed.length >= 3 && trimmed.length <= 40 && trimmed === trimmed.toUpperCase() && KNOWN_UPPER_HEADERS.test(cleanHeader)) ||
    /^[A-Z][a-zA-Z\s&,/]{2,}:$/.test(trimmed);

  if (isHeaderFormatting && !/^(name|phone|email|location|address|github|linkedin|website|title|page\s*\d+)$/i.test(cleanHeader)) {
    return 'additional';
  }

  return null;
}

/**
 * Parses raw extracted resume text into structured ResumeData sections
 */
export function parseResumeContent(rawText: string): ExtractedResumeResult {
  const sanitizedText = rawText
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');

  const rawLines = sanitizedText
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  // Pre-process lines: merge wrapped lines belonging to same bullet
  const lines: string[] = [];
  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    const isHeader = detectSectionHeader(line) !== null;
    const isBullet = /^[•\-\*–—]/.test(line);
    const isDate = DATE_RANGE_REGEX.test(line);

    if (!isHeader && lines.length > 0) {
      const prevIdx = lines.length - 1;
      const prevLine = lines[prevIdx];
      const prevIsHeader = detectSectionHeader(prevLine) !== null;

      // Merge only if prevLine was a bullet point wrapping to line starting with lowercase or continuation
      const isWrappedBullet = !prevIsHeader && !isBullet && !isDate && (
        (prevLine.startsWith('•') || prevLine.startsWith('-') || prevLine.startsWith('*')) &&
        (/^[a-z]/.test(line) || prevLine.endsWith('-') || prevLine.endsWith(','))
      );

      if (isWrappedBullet) {
        lines[prevIdx] = `${prevLine} ${line}`;
        continue;
      }
    }
    lines.push(line);
  }

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

  const locationMatch = sanitizedText.match(LOCATION_REGEX);
  if (locationMatch) {
    personalInfo.location = locationMatch[0].trim();
  }

  // Name & Job Title extraction from top lines
  const topLines = lines.slice(0, 10);
  for (let idx = 0; idx < topLines.length; idx++) {
    const l = topLines[idx];
    const isContactLine = l.includes('@') || l.toLowerCase().includes('linkedin') || l.toLowerCase().includes('github') || l.toLowerCase().includes('http') || /^\+?\d[\d\s\(\)\.-]{7,}$/.test(l);
    const isHeaderWord = detectSectionHeader(l) !== null;

    if (!personalInfo.fullName && !isContactLine && !isHeaderWord && l.length >= 2 && l.length < 50) {
      let cleanName = l.replace(/[^a-zA-Z\s\.-]/g, '').trim();
      // Collapse single spaced letters only (e.g. "N E H A" -> "NEHA")
      if (/\b[A-Z]\s+[A-Z]\b/.test(cleanName)) {
        cleanName = cleanName.replace(/(?<=\b[A-Z])\s+(?=[A-Z]\b)/g, '');
      }
      cleanName = cleanName.replace(/\s+/g, ' ').trim();

      if (cleanName.length >= 2 && !/^\d+$/.test(cleanName)) {
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

  if (!personalInfo.fullName && lines.length > 0) {
    const firstClean = lines[0].replace(/[^a-zA-Z\s\.-]/g, '').trim();
    if (firstClean.length >= 2) personalInfo.fullName = firstClean;
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
    | 'volunteer'
    | 'awards'
    | 'languages'
    | 'additional'
    | 'none' = 'none';

  let currentCustomTitle = 'Additional Information';
  let summaryText = '';
  const experience: ExperienceItem[] = [];
  const education: EducationItem[] = [];
  const skillCategoriesMap: Map<string, string[]> = new Map();
  const rawSkills: string[] = [];
  const projects: ProjectItem[] = [];
  const certifications: CertificationItem[] = [];
  const languages: string[] = [];
  const customSections: CustomSection[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const detectedHeader = detectSectionHeader(line);

    if (detectedHeader) {
      currentSection = detectedHeader;
      if (detectedHeader === 'additional') {
        currentCustomTitle = line.replace(/[:\-–—]+$/, '').trim();
      }

      // If header line contains content after colon (e.g. "Skills: Java, Python" or "Summary: Dedicated dev...")
      const colonIdx = line.indexOf(':');
      if (colonIdx > 0 && colonIdx < line.length - 2) {
        const lineContent = line.substring(colonIdx + 1).trim();
        if (lineContent) {
          if (currentSection === 'summary') {
            summaryText += (summaryText ? ' ' : '') + lineContent;
          } else if (currentSection === 'skills') {
            const parts = lineContent.split(/[,•|·\t]/).map(p => p.trim()).filter(Boolean);
            if (parts.length > 0) rawSkills.push(...parts);
          }
        }
      }
      continue;
    }

    if (currentSection === 'none') {
      if (line.length > 40 && !line.includes('@') && !line.toLowerCase().includes('http')) {
        summaryText += (summaryText ? ' ' : '') + line;
      }
    } else if (currentSection === 'summary') {
      summaryText += (summaryText ? ' ' : '') + line;
    } else if (currentSection === 'skills') {
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
      const isBullet = /^[•\-*–—]\s*/.test(line);
      const cleanLine = line.replace(/^[•\-*–—]\s*/, '').trim();
      if (!cleanLine) continue;

      const dateMatch = line.match(DATE_RANGE_REGEX);
      const locationMatch = line.match(LOCATION_REGEX);

      // If active experience item exists and doesn't have dates yet, check if this line is its date/location metadata line
      if (experience.length > 0 && !experience[experience.length - 1].startDate && !experience[experience.length - 1].endDate) {
        const lineWithoutDateLoc = cleanLine.replace(DATE_RANGE_REGEX, '').replace(LOCATION_REGEX, '').replace(/^[,\s\|\-–—]+|[,\s\|\-–—]+$/g, '').trim();
        if (dateMatch && lineWithoutDateLoc.length < 25) {
          const parts = dateMatch[0].split(/ - | – | — | to | until /i);
          experience[experience.length - 1].startDate = parts[0]?.trim() || '';
          let endD = parts[1]?.trim() || '';
          if (/present|current/i.test(endD)) {
            experience[experience.length - 1].current = true;
            endD = 'Present';
          }
          experience[experience.length - 1].endDate = endD;
          if (locationMatch && !experience[experience.length - 1].location) {
            experience[experience.length - 1].location = locationMatch[0].trim();
          }
          continue;
        }
      }

      if (isBullet) {
        if (experience.length > 0) {
          experience[experience.length - 1].highlights.push(cleanLine);
        }
        continue;
      }

      const hasRoleSeparator = line.includes('|') || line.includes(' at ') || /\s+-\s+/.test(line);
      const isJobTitlePattern = /engineer|developer|analyst|manager|architect|director|specialist|lead|consultant|designer|administrator|coordinator|intern|assistant|vp|president|officer|associate/i.test(line);

      // A line begins a NEW Experience object ONLY if it contains a role separator or title pattern, or if no experience items exist yet
      const isNewPosition = experience.length === 0 || hasRoleSeparator || isJobTitlePattern;

      if (isNewPosition) {
        let startDate = '';
        let endDate = '';
        let current = false;

        if (dateMatch) {
          const parts = dateMatch[0].split(/ - | – | — | to | until /i);
          startDate = parts[0]?.trim() || '';
          endDate = parts[1]?.trim() || '';
          if (/present|current/i.test(endDate)) {
            current = true;
            endDate = 'Present';
          }
        }

        let role = cleanLine.replace(DATE_RANGE_REGEX, '').trim();
        let company = '';
        let location = '';

        if (role.includes('|')) {
          const segments = role.split('|').map(s => s.trim()).filter(Boolean);
          role = segments[0] || 'Position';
          company = segments[1] || '';
          if (segments[2]) location = segments[2];
        } else if (role.includes(' at ')) {
          const segments = role.split(' at ');
          role = segments[0].trim();
          company = segments[1].trim();
        } else if (/\s+-\s+/.test(role)) {
          const segments = role.split(/\s+-\s+/);
          if (segments.length >= 2) {
            role = segments[0].trim();
            company = segments[1].trim();
            if (segments[2]) location = segments[2];
          }
        }

        const expLocation = location || (role.match(LOCATION_REGEX)?.[0]) || '';
        role = role.replace(LOCATION_REGEX, '').replace(/^[,\s\|\-–—]+|[,\s\|\-–—]+$/g, '').trim();
        company = company.replace(LOCATION_REGEX, '').replace(/^[,\s\|\-–—]+|[,\s\|\-–—]+$/g, '').trim();

        experience.push({
          id: `exp-${Date.now()}-${experience.length}`,
          role: role || 'Position',
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
    } else if (currentSection === 'volunteer') {
      let targetSection = customSections.find(c => c.title.toLowerCase().includes('volunteer'));
      if (!targetSection) {
        targetSection = {
          id: `custom-vol-${Date.now()}`,
          title: 'Volunteer Experience',
          items: []
        };
        customSections.push(targetSection);
      }
      targetSection.items.push({
        id: `vol-item-${Date.now()}-${targetSection.items.length}`,
        title: line.replace(/^[•\-*–—]\s*/, '').trim()
      });
    } else if (currentSection === 'education') {
      const isBullet = /^[•\-*–—]\s*/.test(line);
      const cleanLine = line.replace(/^[•\-*–—]\s*/, '').trim();
      if (!cleanLine) continue;

      const dateMatch = line.match(DATE_RANGE_REGEX);
      const isDegreeLine = DEGREE_KEYWORDS.test(line) || INST_KEYWORDS.test(line);

      if (isBullet && education.length > 0) {
        education[education.length - 1].highlights.push(cleanLine);
      } else if (dateMatch && education.length > 0 && !education[education.length - 1].endDate && cleanLine.replace(DATE_RANGE_REGEX, '').trim().length < 15) {
        const parts = dateMatch[0].split(/ - | – | — | to /i);
        education[education.length - 1].startDate = parts[0]?.trim() || '';
        education[education.length - 1].endDate = parts[1]?.trim() || '';
      } else if (isDegreeLine || education.length === 0 || dateMatch) {
        let degree = cleanLine;
        let institution = '';
        let startDate = '';
        let endDate = '';

        if (dateMatch) {
          const parts = dateMatch[0].split(/ - | – | — | to /i);
          startDate = parts[0]?.trim() || '';
          endDate = parts[1]?.trim() || '';
          degree = degree.replace(DATE_RANGE_REGEX, '').trim();
        }

        if (cleanLine.includes('|')) {
          const parts = cleanLine.split('|').map(s => s.trim());
          degree = parts[0];
          institution = parts[1] || '';
        } else if (cleanLine.includes(' — ') || cleanLine.includes(' – ') || cleanLine.includes(' - ')) {
          const parts = cleanLine.split(/\s+[—–-]\s+/).map(s => s.trim());
          degree = parts[0];
          institution = parts[1] || '';
        } else if (cleanLine.includes(', ')) {
          const parts = cleanLine.split(', ').map(s => s.trim());
          if (DEGREE_KEYWORDS.test(parts[0])) {
            degree = parts[0];
            institution = parts.slice(1).join(', ');
          } else if (INST_KEYWORDS.test(parts[0])) {
            institution = parts[0];
            degree = parts.slice(1).join(', ');
          }
        }

        // Never use degree or institution text as location
        education.push({
          id: `edu-${Date.now()}-${education.length}`,
          degree: degree || 'Degree',
          institution: institution,
          location: '',
          startDate: startDate,
          endDate: endDate,
          highlights: []
        });
      } else if (education.length > 0) {
        education[education.length - 1].highlights.push(cleanLine);
      }
    } else if (currentSection === 'projects') {
      const isBullet = /^[•\-*–—]\s*/.test(line);
      const cleanLine = line.replace(/^[•\-*–—]\s*/, '').trim();
      if (!cleanLine) continue;

      const dateMatch = line.match(DATE_RANGE_REGEX);

      if (isBullet && projects.length > 0) {
        projects[projects.length - 1].highlights.push(cleanLine);
      } else if (dateMatch && projects.length > 0 && !projects[projects.length - 1].startDate && cleanLine.replace(DATE_RANGE_REGEX, '').trim().length < 15) {
        const parts = dateMatch[0].split(/ - | – | — | to /i);
        projects[projects.length - 1].startDate = parts[0]?.trim() || '';
        projects[projects.length - 1].endDate = parts[1]?.trim() || '';
      } else if (projects.length === 0 || line.length < 80) {
        let title = cleanLine;
        let subtitle = '';
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
        issuer: parts[1]?.trim() || '',
        date: parts[2]?.trim() || ''
      });
    } else if (currentSection === 'additional' || currentSection === 'awards') {
      let targetSection = customSections.find(c => c.title.toLowerCase() === currentCustomTitle.toLowerCase());
      if (!targetSection) {
        targetSection = {
          id: `custom-${Date.now()}-${customSections.length}`,
          title: currentCustomTitle || 'Additional Information',
          items: []
        };
        customSections.push(targetSection);
      }
      targetSection.items.push({
        id: `custom-item-${Date.now()}-${targetSection.items.length}`,
        title: line
      });
    }
  }

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

  const extractedResumeData: Partial<ResumeData> = sanitizeResumeData({
    personalInfo,
    summary: summaryText,
    experience,
    education,
    skills,
    projects,
    certifications,
    customSections
  });

  // Calculate fieldWarnings for uncertain or incomplete fields
  const fieldWarnings: FieldWarning[] = [];

  if (!personalInfo.email) {
    fieldWarnings.push({ section: 'contact', field: 'email', message: 'Email address missing or not detected.' });
  }
  if (!personalInfo.phone) {
    fieldWarnings.push({ section: 'contact', field: 'phone', message: 'Phone number missing or not detected.' });
  }
  if (!personalInfo.location) {
    fieldWarnings.push({ section: 'contact', field: 'location', message: 'Location missing or not detected.' });
  }

  (extractedResumeData.experience || []).forEach((exp, idx) => {
    if (!exp.company) {
      fieldWarnings.push({ section: 'experience', field: `exp-${idx}-company`, message: `Employer name missing for "${exp.role || 'Position'}"` });
    }
    if (!exp.startDate && !exp.endDate) {
      fieldWarnings.push({ section: 'experience', field: `exp-${idx}-dates`, message: `Date range missing for "${exp.role || 'Position'}"` });
    }
  });

  (extractedResumeData.education || []).forEach((edu, idx) => {
    if (!edu.institution) {
      fieldWarnings.push({ section: 'education', field: `edu-${idx}-institution`, message: `School/institution missing for degree "${edu.degree || 'Degree'}"` });
    }
    if (!edu.endDate) {
      fieldWarnings.push({ section: 'education', field: `edu-${idx}-endDate`, message: `Graduation year missing for "${edu.degree || 'Degree'}"` });
    }
  });

  (extractedResumeData.projects || []).forEach((proj, idx) => {
    if (!proj.title) {
      fieldWarnings.push({ section: 'projects', field: `proj-${idx}-title`, message: `Project title missing or uncertain` });
    }
  });

  (extractedResumeData.customSections || []).forEach((cs) => {
    fieldWarnings.push({ section: 'additional', field: cs.id, message: `Preserved content from non-standard section "${cs.title}"` });
  });

  // Structural JSON logging and validation before return
  console.log('[Resume Parser Output]', JSON.stringify(extractedResumeData, null, 2));

  return {
    data: extractedResumeData,
    unextractedFields,
    fieldWarnings,
    rawText: sanitizedText
  };
}

