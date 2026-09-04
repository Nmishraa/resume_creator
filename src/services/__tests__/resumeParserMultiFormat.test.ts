import { describe, it, expect } from 'vitest';
import { parseResumeContent } from '../resumeExtractor';

describe('15-Structure Universal Resume Parser & Extraction Test Suite', () => {
  it('Structure 1: Single-Column Standard Resume', () => {
    const singleColumnResume = `
Jane Doe
Software Engineer
jane.doe@example.com | (555) 123-4567 | San Francisco, CA
https://linkedin.com/in/janedoe | https://github.com/janedoe

PROFESSIONAL SUMMARY
Results-driven Software Engineer with 4 years of experience building scalable web applications.

TECHNICAL SKILLS
Languages: Python, TypeScript, Java, SQL
Frameworks: React, Node.js, Express, Tailwind CSS

WORK EXPERIENCE
Senior Full Stack Developer | TechCorp | San Francisco, CA
Jan 2022 - Present
• Engineered microservices handling over 1M daily requests.
• Led a team of 4 frontend engineers.

EDUCATION
Bachelor of Science in Computer Science | Stanford University
2018 - 2022
`;

    const res = parseResumeContent(singleColumnResume);
    expect(res.data.personalInfo?.fullName).toBe('Jane Doe');
    expect(res.data.personalInfo?.email).toBe('jane.doe@example.com');
    expect(res.data.experience?.length).toBe(1);
    expect(res.data.experience?.[0].company).toBe('TechCorp');
    expect(res.data.education?.length).toBe(1);
    expect(res.data.education?.[0].institution).toContain('Stanford');
  });

  it('Structure 2: Two-Column Layout Resume', () => {
    const twoColumnResume = `
Alex Mercer
Data Analyst
alex.mercer@analytics.org
(555) 987-6543
New York, NY

SKILLS & PROFICIENCIES
• SQL & Database Querying
• Python (Pandas, NumPy)
• Tableau & PowerBI
• Statistical Analysis

WORK EXPERIENCE
Lead Data Analyst - Financial Insights Inc - New York, NY
March 2021 - Present
• Built real-time revenue dashboards for senior management.
• Automated weekly ETL pipelines reducing manual reporting by 15 hours.

EDUCATION
Master of Science in Business Analytics - Columbia University
2019 - 2021
`;

    const res = parseResumeContent(twoColumnResume);
    expect(res.data.personalInfo?.fullName).toBe('Alex Mercer');
    expect(res.data.personalInfo?.location).toContain('New York');
    expect(res.data.skills?.some(c => c.items.some(i => i.toLowerCase().includes('sql')))).toBe(true);
  });

  it('Structure 3: Student / Entry-Level Resume with Academic Project', () => {
    const studentResume = `
Michael Jordan
Entry Level AI Engineer
mjordan@cs.university.edu | Chicago, IL

OBJECTIVE
Motivated Computer Science graduate seeking an entry-level AI Engineer position.

EDUCATION
B.S. in Computer Science — Dominican University
River Forest, IL | Graduation Year 2024
• GPA: 3.8 / 4.0

ACADEMIC PROJECTS
AI Travel Assistant Project
2023 - 2024
• Implemented RAG chatbot with vector search for trip planning.
• Built data preprocessing and classification algorithms in Python.
`;

    const res = parseResumeContent(studentResume);
    expect(res.data.education?.length).toBe(1);
    expect(res.data.education?.[0].institution).toContain('Dominican');
    expect(res.data.projects?.some(p => p.title.toLowerCase().includes('ai travel assistant'))).toBe(true);
    expect(res.data.projects?.some(p => p.highlights.some(h => h.toLowerCase().includes('rag chatbot')))).toBe(true);
  });

  it('Structure 4: Experienced Executive Professional', () => {
    const executiveResume = `
Sarah Jenkins
VP of Product Engineering
sarah.j@enterprise.com | Austin, TX

EXECUTIVE SUMMARY
Seasoned Technology Executive with 12 years of experience leading multi-disciplinary engineering organizations.

EMPLOYMENT HISTORY
Director of Engineering at CloudScale Operations
Austin, TX | 2020 - Present
• Oversee 50+ engineers across 4 product groups.

Principal Architect at DevWorks Systems
Austin, TX | 2015 - 2020
• Architected cloud infrastructure achieving 99.99% availability.

Senior Engineer at AlphaSoft
Austin, TX | 2012 - 2015
• Developed real-time telemetry processing engine.

CERTIFICATIONS
AWS Certified Solutions Architect - Amazon - 2022
`;

    const res = parseResumeContent(executiveResume);
    expect(res.data.experience?.length).toBe(3);
    expect(res.data.certifications?.length).toBe(1);
    expect(res.data.certifications?.[0].name).toContain('AWS');
  });

  it('Structure 5: Resume with Featured Projects & Repository Links', () => {
    const projectResume = `
David Kim
Backend Systems Developer
david.kim@dev.io

FEATURED PROJECTS
Distributed Key-Value Store - https://github.com/dkim/kvstore
• Designed distributed consensus using Raft protocol in Go.

Smart Home IoT Gateway | https://github.com/dkim/iot-gate
• Developed MQTT message broker for micro-controllers.

TECHNICAL SKILLS
Go, Rust, Docker, Kubernetes, gRPC
`;

    const res = parseResumeContent(projectResume);
    expect(res.data.projects?.length).toBe(2);
    expect(res.data.projects?.[0].link).toContain('github.com');
  });

  it('Structure 6: Resume without Projects Section', () => {
    const noProjectResume = `
Rachel Green
Operations Manager
rachel@company.org | Boston, MA

CAREER SUMMARY
Experienced Operations Manager with expertise in supply chain optimization.

WORK HISTORY
Operations Lead - Retail Logistics Inc - Boston, MA
2019 - Present
• Managed inventory flow across 12 regional distribution centers.

EDUCATION
Bachelor of Arts in Communication - Boston University
2015 - 2019
`;

    const res = parseResumeContent(noProjectResume);
    expect(res.data.experience?.length).toBe(1);
    expect((res.data.projects || []).length).toBe(0);
  });

  it('Structure 7: Resume with Volunteer Experience', () => {
    const volunteerResume = `
Carlos Gomez
Community Manager
carlos@ngo.org

WORK EXPERIENCE
Community Outreach Specialist | Local Foundation | Miami, FL
2021 - Present
• Coordinated community development events for 5,000+ residents.

VOLUNTEER EXPERIENCE
Volunteer Youth Mentor | Youth Empowerment Services | Miami, FL
2019 - 2021
• Mentored high school students in STEM subjects.
`;

    const res = parseResumeContent(volunteerResume);
    expect(res.data.experience?.length).toBeGreaterThanOrEqual(1);
  });

  it('Structure 8: Resume with Unconventional Section Headings', () => {
    const unconventionalResume = `
Taylor Swift
Creative Lead
taylor@creative.com

WHERE I'VE WORKED
Design Lead at Agency Studio
2021 - Present
• Spearheaded visual branding campaigns for Fortune 500 clients.

WHAT I KNOW
UI/UX Design, Figma, Adobe CC, User Research, Prototyping

LEARNING & DEGREES
B.F.A. in Graphic Design from Rhode Island School of Design
2017 - 2021
`;

    const res = parseResumeContent(unconventionalResume);
    expect(res.data.experience?.length).toBe(1);
    expect(res.data.experience?.[0].company).toContain('Agency Studio');
    expect(res.data.skills?.length).toBeGreaterThan(0);
    expect(res.data.education?.length).toBe(1);
  });

  it('Structure 9: Resume with Multiple Degrees', () => {
    const multiEduResume = `
Dr. Alan Turing
Research Scientist
alan@research.edu

EDUCATION
Ph.D. in Computer Science - Cambridge University - 2018
M.S. in Applied Mathematics - Oxford University - 2014
B.S. in Mathematics - Manchester University - 2012
`;

    const res = parseResumeContent(multiEduResume);
    expect(res.data.education?.length).toBe(3);
  });

  it('Structure 10: Resume with Missing Date Ranges (Field Warning Test)', () => {
    const missingDatesResume = `
Kevin Bacon
Actor & Consultant
kevin@acting.com

WORK EXPERIENCE
Lead Consultant | Studio Arts Inc
• Managed client onboarding and creative direction.

EDUCATION
Bachelor of Fine Arts | Drama School
`;

    const res = parseResumeContent(missingDatesResume);
    expect(res.data.experience?.length).toBe(1);
    expect(res.data.experience?.[0].role).toContain('Consultant');
    expect(res.fieldWarnings.some(w => w.section === 'experience')).toBe(true);
  });

  it('Structure 11: Resume with Wrapped / Line-Broken Bullet Sentences', () => {
    const wrappedLinesResume = `
Laura Croft
Explorer & Archaeologist
laura@tomb.org

PROFESSIONAL EXPERIENCE
Lead Researcher | Historical Society
2020 - Present
• Conducted extensive archaeological site surveys across South America and cataloged
over 500 historical artifacts in a central digital database.
`;

    const res = parseResumeContent(wrappedLinesResume);
    expect(res.data.experience?.[0].highlights?.[0]).toContain('cataloged over 500 historical artifacts');
  });

  it('Structure 12: Pipe-Delimited Employment Line', () => {
    const pipeDelimitedResume = `
Robert Chen
Systems Engineer
robert@tech.com

EXPERIENCE
Systems Engineer | CyberData Systems | Seattle, WA | 2021 - Present
• Built automated CI/CD pipeline infrastructure using Jenkins and Terraform.
`;

    const res = parseResumeContent(pipeDelimitedResume);
    expect(res.data.experience?.[0].role).toBe('Systems Engineer');
    expect(res.data.experience?.[0].company).toBe('CyberData Systems');
    expect(res.data.experience?.[0].location).toBe('Seattle, WA');
  });

  it('Structure 13: Technical Engineer Resume (Skills Preservation)', () => {
    const techEngineerResume = `
Nina Williams
AI Software Engineer
nina@ai.dev

SKILLS
Python, C++, PyTorch, TensorFlow, Docker, Kubernetes, AWS, SQL, LangChain, RAG

EXPERIENCE
AI Engineer - DeepMind Lab - San Jose, CA
2022 - Present
• Trained transformer models and deployed REST APIs.
`;

    const res = parseResumeContent(techEngineerResume);
    expect(res.data.skills?.some(c => c.items.includes('LangChain'))).toBe(true);
    expect(res.data.skills?.some(c => c.items.includes('PyTorch'))).toBe(true);
  });

  it('Structure 14: Non-Technical Executive Resume', () => {
    const nonTechResume = `
Elizabeth Bennet
HR Director
elizabeth@corp.com

SUMMARY
Strategic HR Leader with 15 years of experience in talent acquisition and employee engagement.

WORK EXPERIENCE
Director of Human Resources | Premier Services Inc | Chicago, IL
2018 - Present
• Managed corporate recruitment strategy and reduced turnover by 25%.
`;

    const res = parseResumeContent(nonTechResume);
    expect(res.data.personalInfo?.jobTitle).toBe('HR Director');
    expect(res.data.summary).toContain('HR Leader');
  });

  it('Structure 15: Raw Unstructured Text Resume with inline headers', () => {
    const rawTextResume = `
JOHN SMITH
Contact: john.smith@email.com, 555-321-7654
Location: Denver, CO

Summary: Dedicated software tester with QA automation experience.

Skills: Selenium, TestNG, Java, Git, Postman, Jira

Experience:
QA Engineer at TestWorks (2020 - 2023)
- Created automated regression test suites using Selenium WebDriver.
- Logged defect tickets in Jira.

Education:
B.S. Information Technology, University of Colorado, 2020
`;

    const res = parseResumeContent(rawTextResume);
    expect(res.data.personalInfo?.fullName).toBe('JOHN SMITH');
    expect(res.data.personalInfo?.email).toBe('john.smith@email.com');
    expect(res.data.skills?.some(c => c.items.includes('Selenium'))).toBe(true);
    expect(res.data.education?.length).toBe(1);
    expect(res.data.education?.[0].institution).toContain('University of Colorado');
  });
});
