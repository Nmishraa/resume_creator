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
import { initialResumeData } from '../data/initialData';

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
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }
    return fullText;
  }

  throw new Error('Unsupported file format. Please upload a PDF, DOCX, or TXT file.');
}

/**
 * Parses raw extracted resume text into the 9 explicit sections:
 * 1. Full name & contact info
 * 2. Professional summary
 * 3. Skills
 * 4. Work experience
 * 5. Education
 * 6. Projects
 * 7. Certifications
 * 8. Languages
 * 9. Additional sections
 */
export function parseResumeContent(rawText: string): ExtractedResumeResult {
  const sanitizedText = rawText
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, ''); // Remove non-printable control chars

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

  // Name extraction from first non-contact line
  if (lines.length > 0) {
    const candidateNameLine = lines[0];
    if (candidateNameLine.length < 50 && !candidateNameLine.includes('@') && !candidateNameLine.toLowerCase().includes('http')) {
      personalInfo.fullName = candidateNameLine.replace(/[^a-zA-Z\s.-]/g, '');
    }
  }
  if (!personalInfo.fullName) {
    unextractedFields.push('Full Name');
  }

  // Job Title extraction from second line if available
  if (lines.length > 1 && lines[1].length < 60 && !lines[1].includes('@') && !lines[1].toLowerCase().includes('http')) {
    personalInfo.jobTitle = lines[1];
  }
  if (!personalInfo.jobTitle) {
    unextractedFields.push('Job Title / Headline');
  }

  // Section Segmentation
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
  const rawSkills: string[] = [];
  const projects: ProjectItem[] = [];
  const certifications: CertificationItem[] = [];
  const languages: string[] = [];
  const customSections: CustomSection[] = [];

  const sectionHeaderRegex = {
    summary: /^(about|summary|professional summary|executive summary|profile|objective)/i,
    experience: /^(work experience|professional experience|experience|employment history|work history)/i,
    education: /^(education|academic background|qualifications|academic history)/i,
    skills: /^(skills|technical skills|technologies|core competencies|areas of expertise)/i,
    projects: /^(projects|key projects|featured projects|personal projects)/i,
    certifications: /^(certifications|licenses|credentials|certifications & licenses)/i,
    languages: /^(languages|language skills|spoken languages)/i,
    additional: /^(awards|honors|volunteer|publications|interests|achievements)/i
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lowerLine = line.toLowerCase();

    // Check header matches
    if (sectionHeaderRegex.summary.test(lowerLine)) {
      currentSection = 'summary';
      continue;
    } else if (sectionHeaderRegex.experience.test(lowerLine)) {
      currentSection = 'experience';
      continue;
    } else if (sectionHeaderRegex.education.test(lowerLine)) {
      currentSection = 'education';
      continue;
    } else if (sectionHeaderRegex.skills.test(lowerLine)) {
      currentSection = 'skills';
      continue;
    } else if (sectionHeaderRegex.projects.test(lowerLine)) {
      currentSection = 'projects';
      continue;
    } else if (sectionHeaderRegex.certifications.test(lowerLine)) {
      currentSection = 'certifications';
      continue;
    } else if (sectionHeaderRegex.languages.test(lowerLine)) {
      currentSection = 'languages';
      continue;
    } else if (sectionHeaderRegex.additional.test(lowerLine)) {
      currentSection = 'additional';
      continue;
    }

    if (currentSection === 'summary') {
      summaryText += (summaryText ? ' ' : '') + line;
    } else if (currentSection === 'skills') {
      const parts = line.split(/[,•|·\t]/).map(p => p.trim()).filter(Boolean);
      if (parts.length > 0) {
        rawSkills.push(...parts);
      }
    } else if (currentSection === 'languages') {
      const parts = line.split(/[,•|·\t]/).map(p => p.trim()).filter(Boolean);
      if (parts.length > 0) {
        languages.push(...parts);
      }
    } else if (currentSection === 'experience') {
      const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*');
      const cleanLine = line.replace(/^[•\-*]\s*/, '');

      if (isBullet && experience.length > 0) {
        experience[experience.length - 1].highlights.push(cleanLine);
      } else if (line.length < 70) {
        // Potential new role entry
        experience.push({
          id: `exp-${Date.now()}-${experience.length}`,
          role: cleanLine,
          company: lines[i + 1] && lines[i + 1].length < 50 && !lines[i + 1].startsWith('•') ? lines[++i] : 'Organization',
          location: 'Location',
          startDate: '2022',
          endDate: 'Present',
          current: true,
          highlights: []
        });
      } else if (experience.length > 0) {
        experience[experience.length - 1].highlights.push(cleanLine);
      }
    } else if (currentSection === 'education') {
      if (education.length === 0 || line.toLowerCase().includes('university') || line.toLowerCase().includes('college') || line.toLowerCase().includes('bachelor') || line.toLowerCase().includes('master') || line.toLowerCase().includes('degree')) {
        education.push({
          id: `edu-${Date.now()}-${education.length}`,
          degree: line,
          institution: lines[i + 1] && lines[i + 1].length < 60 ? lines[++i] : 'Academic Institution',
          location: '',
          startDate: '2018',
          endDate: '2022',
          highlights: []
        });
      }
    } else if (currentSection === 'projects') {
      const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*');
      const cleanLine = line.replace(/^[•\-*]\s*/, '');

      if (isBullet && projects.length > 0) {
        projects[projects.length - 1].highlights.push(cleanLine);
      } else if (projects.length === 0 || line.length < 60) {
        projects.push({
          id: `proj-${Date.now()}-${projects.length}`,
          title: cleanLine,
          subtitle: 'Featured Application',
          highlights: []
        });
      } else if (projects.length > 0) {
        projects[projects.length - 1].highlights.push(cleanLine);
      }
    } else if (currentSection === 'certifications') {
      certifications.push({
        id: `cert-${Date.now()}-${certifications.length}`,
        name: line,
        issuer: 'Certification Authority',
        date: '2024'
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

  // Check missing 9 sections
  if (!summaryText) unextractedFields.push('Professional Summary');
  if (experience.length === 0) unextractedFields.push('Work Experience');
  if (education.length === 0) unextractedFields.push('Education');
  if (rawSkills.length === 0) unextractedFields.push('Skills');
  if (projects.length === 0) unextractedFields.push('Projects');
  if (certifications.length === 0) unextractedFields.push('Certifications');
  if (languages.length === 0) unextractedFields.push('Languages');

  // Format Skills
  const uniqueSkills = Array.from(new Set(rawSkills)).slice(0, 24);
  const skills: SkillCategory[] = uniqueSkills.length > 0 ? [
    {
      id: `skill-cat-1`,
      category: 'Core Competencies',
      items: uniqueSkills.slice(0, 12)
    },
    ...(uniqueSkills.length > 12 ? [{
      id: `skill-cat-2`,
      category: 'Tools & Technologies',
      items: uniqueSkills.slice(12)
    }] : [])
  ] : [];

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
