import { describe, it, expect } from 'vitest';
import {
  sanitizePersonalInfo,
  sanitizeSummary,
  sanitizeEducation,
  sanitizeSkillsAndProjects,
  cleanString
} from '../resumeSanitizer';
import { parseResumeContent } from '../resumeExtractor';

describe('Resume Parser & Data Mapping Validation Tests', () => {
  it('Test 1: Incorrect Contact Mapping (Email domain not combined with location)', () => {
    const sampleRawInfo = {
      fullName: 'Neha Mishra',
      jobTitle: 'AI Engineer',
      email: 'neha@gmail.com',
      phone: '+1 555-123-4567',
      location: 'gmail.com, River Forest, IL, River Forest, IL',
      website: '',
      linkedin: 'linkedin.com/in/neha',
      github: ''
    };

    const sanitized = sanitizePersonalInfo(sampleRawInfo);

    expect(sanitized.location).toBe('River Forest, IL');
    expect(sanitized.email).toBe('neha@gmail.com');
    expect(sanitized.phone).toBe('+1 555-123-4567');
  });

  it('Test 2: Duplicate Education Consolidation', () => {
    const duplicateEduList = [
      {
        id: 'edu-1',
        degree: 'B.S. in Computer Science',
        institution: 'Academic Institution',
        location: '',
        startDate: '',
        endDate: '',
        highlights: []
      },
      {
        id: 'edu-2',
        degree: 'Degree / Diploma',
        institution: 'Dominican University',
        location: 'River Forest, IL',
        startDate: '2020',
        endDate: '2024',
        highlights: []
      }
    ];

    const consolidated = sanitizeEducation(duplicateEduList);

    expect(consolidated.length).toBe(1);
    expect(consolidated[0]?.degree).toBe('B.S. in Computer Science');
    expect(consolidated[0]?.institution).toBe('Dominican University');
    expect(consolidated[0]?.location).toBe('River Forest, IL');
    expect(consolidated[0]?.endDate).toBe('2024');
  });

  it('Test 3: Projects Classified as Skills ("AI Travel Assistant" moved to Projects)', () => {
    const rawSkills = [
      {
        id: 'cat-1',
        category: 'Tools & Software',
        items: ['Python', 'React', 'AI Travel Assistant', 'Academic Assignments', 'TypeScript']
      }
    ];
    const rawProjects: any[] = [];

    const { skills, projects } = sanitizeSkillsAndProjects(rawSkills, rawProjects);

    const hasAiTravelAssistantInSkills = skills.some(c =>
      c.items.some(i => i.toLowerCase().includes('ai travel assistant'))
    );
    const hasAiTravelAssistantInProjects = projects.some(p =>
      p.title.toLowerCase().includes('ai travel assistant')
    );

    expect(hasAiTravelAssistantInSkills).toBe(false);
    expect(hasAiTravelAssistantInProjects).toBe(true);

    const hasCategoryHeadingInItems = skills.some(c =>
      c.items.some(i => i.toLowerCase() === 'tools & software' || i.toLowerCase() === 'academic assignments')
    );
    expect(hasCategoryHeadingInItems).toBe(false);
  });

  it('Test 4: Grammar Correction in Summary ("2 year" -> "2 years")', () => {
    const rawSummary = 'Results-driven AI Engineer with 2 year of experience building 1 years applications.';
    const cleaned = sanitizeSummary(rawSummary);

    expect(cleaned).toContain('2 years');
    expect(cleaned).toContain('1 year');
  });

  it('Test 5: Removal of Placeholders and Standalone Dashes', () => {
    expect(cleanString('Academic Institution')).toBe('');
    expect(cleanString('Company / Organization')).toBe('');
    expect(cleanString('-')).toBe('');
    expect(cleanString('–')).toBe('');
    expect(cleanString('—')).toBe('');
  });

  it('Test 6: Full Resume Extraction & Sanitization Pipeline', () => {
    const sampleResumeText = `
      Neha Mishra
      AI Engineer
      neha@gmail.com | +1 555-123-4567 | River Forest, IL
      
      Professional Summary
      Motivated AI Developer with 2 year of experience developing machine learning models and travel assistants.
      
      Skills
      Tools & Software: Python, React, PyTorch, AI Travel Assistant, Git
      
      Work Experience
      AI Developer at TechCorp - 2022 to Present
      • Developed NLP sentiment analysis pipelines.
      
      Education
      B.S. in Computer Science - Academic Institution
      Degree / Diploma - Dominican University, River Forest, IL - 2024
    `;

    const parsed = parseResumeContent(sampleResumeText);

    expect(parsed.data.personalInfo?.location).toBe('River Forest, IL');
    expect(parsed.data.education?.length).toBe(1);
    expect(parsed.data.education?.[0]?.institution).toBe('Dominican University');
    expect(parsed.data.projects?.some(p => p.title.toLowerCase().includes('ai travel assistant'))).toBe(true);
    expect(parsed.data.summary).toContain('2 years');
  });
});

