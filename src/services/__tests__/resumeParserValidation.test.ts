import {
  sanitizePersonalInfo,
  sanitizeSummary,
  sanitizeEducation,
  sanitizeSkillsAndProjects,
  cleanString,
  sanitizeResumeData
} from '../resumeSanitizer';
import { parseResumeContent } from '../resumeExtractor';

/**
 * Suite of validation tests for resume parsing, data mapping, and section formatting
 */
export function runResumeParserValidationTests() {
  console.log('🧪 Running Resume Parser & Data Mapping Validation Tests...\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName} - ${detail || 'Assertion failed'}`);
      failed++;
    }
  }

  // TEST 1: Incorrect Contact Mapping (Email domain not combined with location)
  {
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

    assert(
      sanitized.location === 'River Forest, IL',
      'Test 1.1: Email domain (gmail.com) & location duplicates stripped from contact location',
      `Got "${sanitized.location}"`
    );
    assert(
      sanitized.email === 'neha@gmail.com',
      'Test 1.2: Email separated cleanly without location contamination',
      `Got "${sanitized.email}"`
    );
    assert(
      sanitized.phone === '+1 555-123-4567',
      'Test 1.3: Phone number mapped cleanly',
      `Got "${sanitized.phone}"`
    );
  }

  // TEST 2: Duplicate Education Consolidation
  {
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

    assert(
      consolidated.length === 1,
      'Test 2.1: Duplicate fragmented education consolidated into 1 complete entry',
      `Got length ${consolidated.length}`
    );
    assert(
      consolidated[0]?.degree === 'B.S. in Computer Science',
      'Test 2.2: Consolidated entry preserves degree name',
      `Got "${consolidated[0]?.degree}"`
    );
    assert(
      consolidated[0]?.institution === 'Dominican University',
      'Test 2.3: Consolidated entry preserves institution',
      `Got "${consolidated[0]?.institution}"`
    );
    assert(
      consolidated[0]?.location === 'River Forest, IL',
      'Test 2.4: Consolidated entry preserves location',
      `Got "${consolidated[0]?.location}"`
    );
    assert(
      consolidated[0]?.endDate === '2024',
      'Test 2.5: Consolidated entry preserves graduation year',
      `Got "${consolidated[0]?.endDate}"`
    );
  }

  // TEST 3: Projects Classified as Skills ("AI Travel Assistant" moved to Projects)
  {
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

    assert(
      !hasAiTravelAssistantInSkills,
      'Test 3.1: "AI Travel Assistant" removed from Technical Skills tags',
      `Found in skills: ${hasAiTravelAssistantInSkills}`
    );
    assert(
      hasAiTravelAssistantInProjects,
      'Test 3.2: "AI Travel Assistant" classified into Projects section',
      `Found in projects: ${hasAiTravelAssistantInProjects}`
    );

    // Check category heading classification
    const hasCategoryHeadingInItems = skills.some(c =>
      c.items.some(i => i.toLowerCase() === 'tools & software' || i.toLowerCase() === 'academic assignments')
    );
    assert(
      !hasCategoryHeadingInItems,
      'Test 3.3: Category headings ("Tools & Software", "Academic Assignments") not rendered as individual skill tags',
      `Category headings in items: ${hasCategoryHeadingInItems}`
    );
  }

  // TEST 4: Grammar Correction in Summary ("2 year" -> "2 years")
  {
    const rawSummary = 'Results-driven AI Engineer with 2 year of experience building 1 years applications.';
    const cleaned = sanitizeSummary(rawSummary);

    assert(
      cleaned.includes('2 years'),
      'Test 4.1: Corrected "2 year" to "2 years"',
      `Got "${cleaned}"`
    );
    assert(
      cleaned.includes('1 year'),
      'Test 4.2: Corrected "1 years" to "1 year"',
      `Got "${cleaned}"`
    );
  }

  // TEST 5: Removal of Placeholders and Standalone Dashes
  {
    assert(
      cleanString('Academic Institution') === '',
      'Test 5.1: Placeholder "Academic Institution" stripped',
      `Got "${cleanString('Academic Institution')}"`
    );
    assert(
      cleanString('Company / Organization') === '',
      'Test 5.2: Placeholder "Company / Organization" stripped',
      `Got "${cleanString('Company / Organization')}"`
    );
    assert(
      cleanString('-') === '' && cleanString('–') === '' && cleanString('—') === '',
      'Test 5.3: Standalone dashes stripped',
      `Got cleanString('-')="${cleanString('-')}"`
    );
  }

  // TEST 6: Full Resume Extraction & Sanitization Pipeline
  {
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

    assert(
      parsed.data.personalInfo?.location === 'River Forest, IL',
      'Test 6.1: Extracted location cleanly without email domain',
      `Got "${parsed.data.personalInfo?.location}"`
    );
    assert(
      parsed.data.education?.length === 1 && parsed.data.education[0].institution === 'Dominican University',
      'Test 6.2: Extracted education consolidated into single entry "Dominican University"',
      `Got length ${parsed.data.education?.length}, inst "${parsed.data.education?.[0]?.institution}"`
    );
    assert(
      parsed.data.projects?.some(p => p.title.toLowerCase().includes('ai travel assistant')),
      'Test 6.3: Extracted "AI Travel Assistant" from skills into Projects section',
      `Projects count: ${parsed.data.projects?.length}`
    );
    assert(
      parsed.data.summary?.includes('2 years'),
      'Test 6.4: Summary grammar corrected ("2 year" -> "2 years")',
      `Got "${parsed.data.summary}"`
    );
  }

  console.log(`\n📊 Validation Test Results: ${passed} Passed, ${failed} Failed.`);
  return { passed, failed };
}

// Auto-run when executed in Node environment
if (typeof (globalThis as any).process !== 'undefined' && (globalThis as any).process.argv) {
  runResumeParserValidationTests();
}
