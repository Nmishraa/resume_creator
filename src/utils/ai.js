export const suggestSummary = async (role) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!role) {
        resolve("Experienced professional with a proven track record of delivering high-quality results. Skilled in project management, team leadership, and strategic planning.");
      } else if (role.toLowerCase().includes('developer') || role.toLowerCase().includes('engineer')) {
        resolve(`Passionate ${role} with expertise in building scalable applications and solving complex technical problems. Proficient in modern web technologies and committed to writing clean, maintainable code.`);
      } else if (role.toLowerCase().includes('design')) {
        resolve(`Creative ${role} dedicated to crafting intuitive and visually stunning user experiences. Strong background in user-centered design principles and a keen eye for aesthetics.`);
      } else {
        resolve(`Results-driven ${role} with a strong ability to collaborate effectively across cross-functional teams to achieve strategic business objectives.`);
      }
    }, 400);
  });
};

export const suggestBulletPoint = async (role, category) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const prefix = category ? `[${category}] ` : '';
      const roleText = role ? `for ${role}` : '';
      resolve(`${prefix}Optimized existing workflows ${roleText}, resulting in a 20% increase in efficiency and reduced operational overhead.`);
    }, 400);
  });
};

export const analyzeJobMatch = async (resumeData, jobDescription) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const descLower = (jobDescription || '').toLowerCase();
      const allSkills = (resumeData?.skills || []).map(s => (s.name || '').toLowerCase());
      const role = (resumeData?.personal?.role || '').toLowerCase();

      // Sample keyword matching simulation
      const keyTechs = ['python', 'react', 'aws', 'langchain', 'rag', 'vector databases', 'rest apis', 'docker', 'typescript', 'postgresql', 'machine learning', 'ci/cd', 'agile'];
      const missingKeywords = keyTechs.filter(k => descLower.includes(k) && !allSkills.some(s => s.includes(k)));

      const foundCount = keyTechs.filter(k => descLower.includes(k) && allSkills.some(s => s.includes(k))).length;
      const skillsMatch = Math.min(95, Math.max(65, 75 + foundCount * 5));
      const experienceMatch = role && descLower.includes(role.split(' ')[0]) ? 88 : 72;
      const educationMatch = 90;
      const atsKeywordsMatch = Math.min(92, Math.max(60, 68 + foundCount * 4));
      const overallMatch = Math.round((skillsMatch * 0.35) + (experienceMatch * 0.3) + (educationMatch * 0.15) + (atsKeywordsMatch * 0.2));

      resolve({
        overallMatch,
        skillsMatch,
        experienceMatch,
        educationMatch,
        atsKeywordsMatch,
        missingKeywords: missingKeywords.length > 0 ? missingKeywords.map(k => k.charAt(0).toUpperCase() + k.slice(1)) : ['LangChain', 'RAG', 'AWS', 'Vector Databases', 'Python', 'REST APIs']
      });
    }, 600);
  });
};

export const analyzeAtsScore = async (resumeData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const hasSummary = Boolean(resumeData?.personal?.summary);
      const hasPhone = Boolean(resumeData?.personal?.phone);
      const hasEmail = Boolean(resumeData?.personal?.email);
      const expCount = resumeData?.experience?.length || 0;
      const skillsCount = resumeData?.skills?.length || 0;
      const eduCount = resumeData?.education?.length || 0;

      const breakdown = {
        formatting: 90,
        contactInfo: hasPhone && hasEmail ? 100 : 70,
        skills: Math.min(100, skillsCount * 20),
        workExperience: Math.min(100, expCount * 30),
        education: eduCount > 0 ? 95 : 60,
        keywords: 78,
        readability: 85,
        sectionStructure: hasSummary ? 92 : 75
      };

      const overallScore = Math.round(
        (breakdown.formatting + breakdown.contactInfo + breakdown.skills + breakdown.workExperience + breakdown.education + breakdown.keywords + breakdown.readability + breakdown.sectionStructure) / 8
      );

      const recommendations = [
        "Add measurable metrics & quantifiable achievements (e.g., %, $, team size) to work bullets.",
        "Improve ATS keyword coverage by matching specific target job requirements.",
        "Use stronger action verbs at the start of each bullet point (e.g., Spearheaded, Engineered, Orchestrated).",
        "Avoid complex nested tables or graphics to ensure 100% ATS parser readability.",
        "Add missing technical and soft skills to the dedicated skills section.",
        "Enhance executive summary section to highlight key career achievements."
      ];

      resolve({ overallScore, breakdown, recommendations });
    }, 500);
  });
};

export const improveBulletPoint = async (originalText) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!originalText || originalText.trim().length < 5) {
        resolve("Built and tested AI-powered applications using Python, LangChain, and retrieval-augmented generation (RAG) workflows, increasing team productivity by 35%.");
        return;
      }
      resolve(`Engineered and optimized ${originalText.replace(/^[•\s\-\*]+/, '').toLowerCase()}, leveraging modern cloud tools and best practices, resulting in a 30% reduction in processing overhead and improved system reliability.`);
    }, 500);
  });
};

export const generateCoverLetter = async (resume, company, jobTitle, jobDescription) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const name = resume?.data?.personal?.name || 'Applicant';
      const role = jobTitle || resume?.data?.personal?.role || 'Professional';
      const comp = company || 'Target Company';
      const email = resume?.data?.personal?.email || 'contact@example.com';
      const phone = resume?.data?.personal?.phone || '+1 (555) 012-3456';
      const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

      const letter = `${date}

${name}
${email} | ${phone}

Hiring Manager
${comp}

Dear Hiring Manager,

I am writing to express my enthusiastic interest in the ${role} position at ${comp}. With a strong background in software engineering, system architecture, and delivering high-impact technological solutions, I am confident in my ability to contribute significantly to your team's success.

In my previous roles, I have consistently driven technical innovation, optimized system performance, and collaborated across cross-functional teams to deliver scalable, user-centric applications. Your focus on building state-of-the-art products closely aligns with my career experience and technical passion.

Key achievements I bring to ${comp} include:
• Spearheading high-availability application architecture, reducing latency by over 35%.
• Collaborating with engineering and product leadership to implement robust, clean codebases.
• Leveraging cutting-edge technologies and AI-assisted workflows to accelerate delivery timelines.

I am eager to discuss how my skills and background align with the goals of ${comp}. Thank you for your time and consideration.

Sincerely,

${name}`;

      resolve(letter);
    }, 700);
  });
};

export const generateInterviewPrep = async (resume, targetRole, jobDescription) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const role = targetRole || resume?.data?.personal?.role || 'Software Engineer';
      resolve([
        {
          id: 'q1',
          category: 'Technical Questions',
          question: `How do you approach designing scalable system architectures for a high-traffic ${role} role?`,
          tip: "Focus on microservices vs monolith trade-offs, caching (Redis), database indexing, and asynchronous queue workers."
        },
        {
          id: 'q2',
          category: 'Behavioral Questions',
          question: "Describe a time when you faced a critical production bug or tight deadline. How did you handle it?",
          tip: "Use the STAR method (Situation, Task, Action, Result) and emphasize clear communication and root-cause post-mortems."
        },
        {
          id: 'q3',
          category: 'Resume-Based Questions',
          question: `Walk me through your most impactful achievement at ${resume?.data?.experience?.[0]?.company || 'your previous company'}.`,
          tip: "Highlight quantifiable metrics (e.g. 40% performance gain, revenue impact, or user growth)."
        },
        {
          id: 'q4',
          category: 'Project Questions',
          question: "How do you evaluate and integrate new AI frameworks or libraries into an existing codebase?",
          tip: "Discuss prototyping, security auditing, benchmark testing, and backward compatibility."
        },
        {
          id: 'q5',
          category: 'HR Questions',
          question: `Why are you interested in joining as a ${role}, and where do you see your technical leadership in 3 years?`,
          tip: "Connect your career growth trajectory with engineering leadership and business impact."
        }
      ]);
    }, 600);
  });
};

