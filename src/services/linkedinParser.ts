import { ResumeData, ExperienceItem, EducationItem, SkillCategory } from '../types/resume';
import { initialResumeData } from '../data/initialData';

export function parseLinkedInOrRawText(rawText: string): Partial<ResumeData> {
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return {};

  const result: Partial<ResumeData> = {
    personalInfo: { ...initialResumeData.personalInfo },
    experience: [],
    education: [],
    skills: [],
    summary: ''
  };

  // 1. Extract Emails and Phone numbers
  const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch && result.personalInfo) {
    result.personalInfo.email = emailMatch[0];
  }

  const phoneMatch = rawText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch && result.personalInfo) {
    result.personalInfo.phone = phoneMatch[0];
  }

  const linkedinMatch = rawText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/);
  if (linkedinMatch && result.personalInfo) {
    result.personalInfo.linkedin = linkedinMatch[0];
  }

  // 2. Extract Name from first line if plausible
  if (lines.length > 0 && lines[0].length < 40 && !lines[0].includes('@') && !lines[0].includes('http')) {
    if (result.personalInfo) {
      result.personalInfo.fullName = lines[0];
    }
  }

  // 3. Extract Role / Headline from second line
  if (lines.length > 1 && lines[1].length < 60 && !lines[1].includes('@')) {
    if (result.personalInfo) {
      result.personalInfo.jobTitle = lines[1];
    }
  }

  // 4. Section parsing
  let currentSection: 'summary' | 'experience' | 'education' | 'skills' | 'none' = 'none';
  const experiences: ExperienceItem[] = [];
  const educations: EducationItem[] = [];
  const skillItems: string[] = [];
  let summaryParagraphs: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lower = line.toLowerCase();

    // Section header detection
    if (lower === 'about' || lower === 'summary' || lower === 'professional summary') {
      currentSection = 'summary';
      continue;
    } else if (lower.includes('experience') || lower.includes('work history') || lower.includes('employment')) {
      currentSection = 'experience';
      continue;
    } else if (lower.includes('education') || lower.includes('academic background')) {
      currentSection = 'education';
      continue;
    } else if (lower.includes('skills') || lower.includes('technologies') || lower.includes('technical skills')) {
      currentSection = 'skills';
      continue;
    }

    if (currentSection === 'summary') {
      if (line.length > 20) {
        summaryParagraphs.push(line);
      }
    } else if (currentSection === 'skills') {
      // Split by comma, bullet, or pipes
      const parts = line.split(/[,•|·\t]/).map(p => p.trim()).filter(p => p.length > 1);
      if (parts.length > 0) {
        skillItems.push(...parts);
      }
    } else if (currentSection === 'experience') {
      // If line contains bullet point or date
      if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
        const bullet = line.replace(/^[•\-*]\s*/, '');
        if (experiences.length > 0) {
          experiences[experiences.length - 1].highlights.push(bullet);
        }
      } else if (experiences.length === 0 || (line.length < 50 && experiences[experiences.length - 1].highlights.length > 0)) {
        experiences.push({
          id: `exp-${Date.now()}-${experiences.length}`,
          role: line,
          company: lines[i + 1] && lines[i + 1].length < 40 ? lines[++i] : 'Tech Company',
          location: 'Remote',
          startDate: '2022',
          endDate: 'Present',
          current: true,
          highlights: []
        });
      } else {
        experiences[experiences.length - 1].highlights.push(line);
      }
    } else if (currentSection === 'education') {
      if (educations.length === 0 || line.includes('University') || line.includes('College') || line.includes('Bachelor') || line.includes('Master')) {
        educations.push({
          id: `edu-${Date.now()}-${educations.length}`,
          degree: line,
          institution: lines[i + 1] && lines[i + 1].length < 50 ? lines[++i] : 'University',
          location: '',
          startDate: '2018',
          endDate: '2022',
          highlights: []
        });
      }
    }
  }

  if (summaryParagraphs.length > 0) {
    result.summary = summaryParagraphs.join(' ');
  }

  if (experiences.length > 0) {
    result.experience = experiences;
  }

  if (educations.length > 0) {
    result.education = educations;
  }

  if (skillItems.length > 0) {
    const uniqueSkills = Array.from(new Set(skillItems)).slice(0, 18);
    const skillCats: SkillCategory[] = [
      { id: 'cat-1', category: 'Core & Technical Skills', items: uniqueSkills.slice(0, 8) },
      { id: 'cat-2', category: 'Tools & Methodologies', items: uniqueSkills.slice(8) }
    ];
    result.skills = skillCats.filter(c => c.items.length > 0);
  }

  return result;
}
