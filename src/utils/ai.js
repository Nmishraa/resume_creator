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
    }, 300);
  });
};

export const polishBulletPoint = async (bulletText, role = '', tone = 'professional') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!bulletText || bulletText.trim().length < 4) {
        resolve("Spearheaded modern application development, resulting in a 35% improvement in processing speed and enhanced code quality.");
        return;
      }
      const cleaned = bulletText.replace(/^[•\s\-\*]+/, '').trim();

      if (tone === 'concise') {
        resolve(`Streamlined ${cleaned.toLowerCase()}, reducing turnaround time by 30%.`);
      } else if (tone === 'technical') {
        resolve(`Architected and engineered ${cleaned.toLowerCase()} utilizing modular design patterns, boosting system throughput by 42%.`);
      } else if (tone === 'leadership') {
        resolve(`Spearheaded cross-functional team execution of ${cleaned.toLowerCase()}, driving alignment across stakeholders and exceeding KPI targets by 25%.`);
      } else {
        // professional (default)
        const actionVerbs = ['Engineered', 'Spearheaded', 'Orchestrated', 'Architected', 'Pioneered', 'Optimized'];
        const verb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
        resolve(`${verb} and expanded ${cleaned.toLowerCase()}, leveraging industry best practices to achieve a 28% reduction in latency.`);
      }
    }, 300);
  });
};

export const calculateLiveAtsScore = (resumeData) => {
  if (!resumeData) return { score: 0, feedback: ['No resume data available.'] };

  const hasName = Boolean(resumeData?.personal?.name);
  const hasEmail = Boolean(resumeData?.personal?.email);
  const hasPhone = Boolean(resumeData?.personal?.phone);
  const hasLocation = Boolean(resumeData?.personal?.location);
  const hasSummary = Boolean(resumeData?.personal?.summary && resumeData.personal.summary.length >= 30);
  const expCount = resumeData?.experience?.length || 0;
  const skillsCount = resumeData?.skills?.length || 0;
  const eduCount = resumeData?.education?.length || 0;
  const projectsCount = resumeData?.projects?.length || 0;

  // Check metrics in bullet points
  const allBullets = (resumeData?.experience || []).map(e => e.description || '').join(' ');
  const hasMetrics = /\d+%|\$\d+|\d+\+|\d+x|\d+ users|\d+k|\d+m/i.test(allBullets);

  // Check strong action verbs
  const hasActionVerbs = /spearheaded|architected|engineered|optimized|directed|implemented|orchestrated|reduced|built|scaled|developed/i.test(allBullets);

  let score = 0;
  const feedback = [];
  const suggestions = [];

  if (hasName) score += 10; else { feedback.push('Missing full name'); suggestions.push('Enter your full legal name at the top.'); }
  if (hasEmail) score += 10; else { feedback.push('Missing email'); suggestions.push('Add a professional email address.'); }
  if (hasPhone) score += 5; else { feedback.push('Missing phone number'); suggestions.push('Add a contact phone number.'); }
  if (hasLocation) score += 5; else { feedback.push('Missing location'); suggestions.push('Add your city and state/country.'); }
  if (hasSummary) score += 15; else { feedback.push('Summary too short (<30 chars)'); suggestions.push('Write a 2-3 sentence executive summary detailing your career focus.'); }
  
  if (expCount >= 2) score += 20;
  else if (expCount === 1) { score += 12; suggestions.push('Add a second work experience entry if available.'); }
  else { feedback.push('No work experience entries'); suggestions.push('Add at least 1 work experience entry or internship.'); }

  if (skillsCount >= 5) score += 15;
  else if (skillsCount > 0) { score += 8; suggestions.push(`Add more skills (${skillsCount}/5 target skills added).`); }
  else { feedback.push('No skills listed'); suggestions.push('List at least 5 core technical or professional skills.'); }

  if (eduCount > 0) score += 10; else { feedback.push('Missing education history'); suggestions.push('Add your degree or education credentials.'); }
  if (hasMetrics) score += 5; else { feedback.push('No quantifiable metrics'); suggestions.push('Include percentages, dollar amounts, or numbers (e.g., "improved speed by 30%").'); }
  if (hasActionVerbs) score += 5; else { feedback.push('Weak verb density'); suggestions.push('Start bullet points with strong action verbs like Architected, Spearheaded, or Engineered.'); }

  return {
    score: Math.min(100, score),
    feedback: feedback.length > 0 ? feedback : ['Your resume structure is 100% ATS compliant!'],
    suggestions: suggestions.length > 0 ? suggestions : ['Great job! Your resume hits all key recruiter criteria.']
  };
};

export const auditRawResumeText = (rawText) => {
  if (!rawText || rawText.trim().length < 50) {
    return {
      score: 0,
      breakdown: { contactScore: 0, summaryScore: 0, experienceScore: 0, skillsScore: 0, educationScore: 0 },
      issues: ['Resume text is too short. Please paste at least 50 characters of your resume.'],
      recommendations: ['Paste your complete resume including summary, work experience, skills, and education sections.']
    };
  }

  const text = rawText.toLowerCase();

  // Contact audit (max 20)
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(rawText);
  const hasPhone = /(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/.test(rawText);
  const hasLinkedin = /linkedin\.com/i.test(rawText);
  const hasLocation = /city|state|remote|[a-z]+,\s*[a-z]{2}/i.test(rawText);

  let contactScore = 0;
  if (hasEmail) contactScore += 8;
  if (hasPhone) contactScore += 5;
  if (hasLinkedin) contactScore += 4;
  if (hasLocation) contactScore += 3;

  // Summary audit (max 15)
  const hasSummaryHeader = /summary|profile|about me|objective|overview/i.test(rawText);
  const wordCount = rawText.trim().split(/\s+/).length;
  let summaryScore = 0;
  if (hasSummaryHeader) summaryScore += 8;
  if (wordCount >= 100) summaryScore += 7;
  else if (wordCount >= 50) summaryScore += 4;

  // Experience audit & metric count (max 30)
  const metricMatches = rawText.match(/\d+%|\$\d+|\d+\+|\d+x|\d+\s*k|\d+\s*m|\b\d{2,}\b/g) || [];
  const actionVerbMatches = rawText.match(/spearheaded|architected|engineered|optimized|directed|implemented|orchestrated|reduced|built|scaled|developed|delivered|collaborated|initiated|transformed/gi) || [];

  let experienceScore = 0;
  if (/experience|employment|work history|career/i.test(rawText)) experienceScore += 10;
  if (metricMatches.length >= 5) experienceScore += 10;
  else if (metricMatches.length >= 2) experienceScore += 6;
  if (actionVerbMatches.length >= 6) experienceScore += 10;
  else if (actionVerbMatches.length >= 3) experienceScore += 6;

  // Skills audit (max 20)
  const hasSkillsHeader = /skills|technologies|proficiencies|competencies|tools/i.test(rawText);
  const commonTechSkills = ['react', 'javascript', 'typescript', 'python', 'java', 'sql', 'html', 'css', 'aws', 'docker', 'node', 'git', 'agile', 'scrum', 'excel', 'management', 'communication', 'leadership', 'analytics'];
  const detectedSkills = commonTechSkills.filter(sk => text.includes(sk));

  let skillsScore = 0;
  if (hasSkillsHeader) skillsScore += 8;
  if (detectedSkills.length >= 5) skillsScore += 12;
  else if (detectedSkills.length >= 2) skillsScore += 6;

  // Education audit (max 15)
  const hasEducationHeader = /education|university|college|bachelor|master|degree|phd|diploma/i.test(rawText);
  let educationScore = 0;
  if (hasEducationHeader) educationScore += 15;

  const totalScore = Math.min(100, contactScore + summaryScore + experienceScore + skillsScore + educationScore);

  const issues = [];
  const recommendations = [];

  if (!hasEmail) {
    issues.push('Missing Email Address');
    recommendations.push('Add a professional email address (e.g., name@gmail.com).');
  }
  if (!hasPhone) {
    issues.push('Missing Phone Number');
    recommendations.push('Include a contact phone number with country/area code.');
  }
  if (metricMatches.length < 3) {
    issues.push('Low Quantifiable Impact Metrics');
    recommendations.push('Include numbers, percentages, or metrics in bullet points (e.g., "Increased user signups by 35%").');
  }
  if (actionVerbMatches.length < 4) {
    issues.push('Weak Action Verb Density');
    recommendations.push('Start bullet points with strong action verbs like "Spearheaded", "Engineered", or "Architected".');
  }
  if (!hasSkillsHeader || detectedSkills.length < 4) {
    issues.push('Skills Section Underspecified');
    recommendations.push('Create a dedicated "Skills & Technologies" section listing core tools and industry keywords.');
  }
  if (!hasEducationHeader) {
    issues.push('Education History Missing');
    recommendations.push('Add an "Education" section listing degree, university, and graduation year.');
  }

  return {
    score: totalScore,
    breakdown: { contactScore, summaryScore, experienceScore, skillsScore, educationScore },
    detectedMetricsCount: metricMatches.length,
    detectedActionVerbsCount: actionVerbMatches.length,
    detectedSkills,
    issues: issues.length > 0 ? issues : ['No critical formatting or structural issues found!'],
    recommendations: recommendations.length > 0 ? recommendations : ['Your resume passes all key ATS screening filters.']
  };
};

export const matchJobDescription = (resumeData, jdText) => {
  if (!jdText || !jdText.trim()) return null;

  const normalizedJd = jdText.toLowerCase();
  
  // Extract keywords (words 4+ chars long excluding common stop words)
  const stopWords = new Set(['with', 'that', 'this', 'from', 'have', 'your', 'will', 'about', 'team', 'work', 'using', 'ability', 'their', 'which', 'experience', 'building', 'developer', 'management']);
  const rawWords = normalizedJd.match(/[a-z0-9+#.\-]+/g) || [];
  
  const frequencyMap = {};
  rawWords.forEach(w => {
    if (w.length >= 3 && !stopWords.has(w) && !/^\d+$/.test(w)) {
      frequencyMap[w] = (frequencyMap[w] || 0) + 1;
    }
  });

  // Sort top 20 keywords from JD
  const topKeywords = Object.entries(frequencyMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([word]) => word);

  // Resume text string
  const resumeString = [
    resumeData?.personal?.role || '',
    resumeData?.personal?.summary || '',
    ...(resumeData?.skills || []).map(s => s.name || ''),
    ...(resumeData?.experience || []).map(e => `${e.role} ${e.company} ${e.description}`),
    ...(resumeData?.projects || []).map(p => `${p.name} ${p.description}`)
  ].join(' ').toLowerCase();

  const matched = [];
  const missing = [];

  topKeywords.forEach(kw => {
    if (resumeString.includes(kw)) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  });

  const matchPercentage = topKeywords.length > 0
    ? Math.round((matched.length / topKeywords.length) * 100)
    : 0;

  return {
    matchPercentage,
    matchedKeywords: matched,
    missingKeywords: missing,
    recommendations: missing.length > 0
      ? missing.slice(0, 5).map(m => `Incorporate experience with "${m}" into your skills or bullet descriptions if applicable.`)
      : ['Your resume closely aligns with this job description!']
  };
};

export const parseResumeText = (rawText) => {
  if (!rawText) return null;

  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);

  // Extract Email
  const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : '';

  // Extract Phone
  const phoneMatch = rawText.match(/(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : '';

  // Extract LinkedIn
  const linkedinMatch = rawText.match(/(linkedin\.com\/in\/[a-zA-Z0-9_-]+)/i);
  const linkedin = linkedinMatch ? linkedinMatch[0] : '';

  // Extract Name (usually first line)
  const name = lines[0] ? lines[0].replace(/[^a-zA-Z\s]/g, '').trim() : '';

  // Extract Skills
  const skills = [];
  const skillKeywords = ['react', 'javascript', 'typescript', 'node.js', 'python', 'java', 'sql', 'html', 'css', 'git', 'aws', 'docker', 'agile', 'scrum', 'project management'];
  skillKeywords.forEach(sk => {
    if (rawText.toLowerCase().includes(sk)) {
      skills.push({ id: `imported_sk_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`, name: sk.charAt(0).toUpperCase() + sk.slice(1), level: 'Advanced' });
    }
  });

  return {
    personal: {
      name,
      role: 'Software Professional',
      email,
      phone,
      location: 'City, Country',
      linkedin,
      summary: lines.slice(1, 4).join(' ') || 'Experienced professional with a strong track record of project execution.'
    },
    experience: [
      {
        id: `imported_exp_${Date.now()}`,
        company: 'Previous Company',
        role: 'Role Title',
        location: 'Location',
        startDate: '2021-01',
        endDate: 'Present',
        description: lines.slice(4, 8).join('\n• ') || '• Delivered core project features and collaborated with cross-functional teams.'
      }
    ],
    education: [
      {
        id: `imported_edu_${Date.now()}`,
        school: 'University',
        degree: 'Bachelor of Science',
        location: 'Location',
        startDate: '2016-09',
        endDate: '2020-05',
        description: 'Graduated with honors.'
      }
    ],
    skills: skills.length > 0 ? skills : [
      { id: 's1', name: 'JavaScript', level: 'Advanced' },
      { id: 's2', name: 'Problem Solving', level: 'Expert' }
    ]
  };
};

export const generate10InterviewQuestions = (resumeData, targetJob) => {
  const role = targetJob || resumeData?.personal?.role || 'Professional';
  const company = resumeData?.experience?.[0]?.company || 'your previous organization';
  const skillsList = (resumeData?.skills || []).map(s => s.name).filter(Boolean);
  const mainSkill = skillsList[0] || 'core technologies';
  const secondSkill = skillsList[1] || 'system design';
  const projectName = resumeData?.projects?.[0]?.name || 'a key project';

  return [
    {
      id: 1,
      category: 'Background & Overview',
      q: `Walk me through your career journey as a ${role} and your core technical strengths.`,
      answerKey: `Highlight your achievements at ${company}, emphasizing your experience with ${mainSkill} and how your background aligns with this position.`
    },
    {
      id: 2,
      category: 'Technical Expertise',
      q: `How do you apply ${mainSkill} and ${secondSkill} to build high-performance production systems?`,
      answerKey: `Discuss architectural patterns, optimization strategies (caching, query indexing, async jobs), and writing clean, maintainable code.`
    },
    {
      id: 3,
      category: 'STAR Problem Solving',
      q: `Tell me about a complex technical problem or bug you encountered at ${company} and how you fixed it.`,
      answerKey: `Use the STAR method: Describe Situation (latency/outage), Task (root cause analysis), Action (refactoring/debugging), and Result (% improvement).`
    },
    {
      id: 4,
      category: 'System Design & Scalability',
      q: `How would you design a scalable web application architecture to handle 100,000 active users?`,
      answerKey: `Outline load balancing, database sharding/indexing, microservices vs monolith, stateless API servers, and real-time monitoring.`
    },
    {
      id: 5,
      category: 'Project Deep Dive',
      q: `Can you walk through your key contributions to "${projectName}" and why specific stack choices were made?`,
      answerKey: `Explain your role, trade-offs evaluated (framework selection, state management), performance metrics achieved, and user impact.`
    },
    {
      id: 6,
      category: 'Conflict Resolution',
      q: `Describe a situation where you had a technical disagreement with a team member or manager. How was it resolved?`,
      answerKey: `Focus on data-driven benchmarks, collaborative prototyping, active listening, and commitment to the final team solution.`
    },
    {
      id: 7,
      category: 'Prioritization & Deadlines',
      q: `How do you manage competing feature requests when facing strict project launch deadlines?`,
      answerKey: `Emphasize MoSCoW prioritization (Must-haves vs Nice-to-haves), clear stakeholder updates, risk management, and MVP delivery.`
    },
    {
      id: 8,
      category: 'Code Quality & CI/CD',
      q: `What is your approach to unit testing, peer code reviews, and preventing technical debt?`,
      answerKey: `Detail automated test coverage targets, constructive peer code reviews, automated CI/CD deployment checks, and refactoring guidelines.`
    },
    {
      id: 9,
      category: 'Adaptability & Learning',
      q: `Tell me about a time you had to quickly learn a new technology or framework to deliver a project.`,
      answerKey: `Explain your quick-learning framework: official documentation review, rapid proof-of-concept building, and sharing learnings with team peers.`
    },
    {
      id: 10,
      category: 'Growth & Long-Term Impact',
      q: `Where do you see your technical growth as a ${role} over the next 2-3 years?`,
      answerKey: `Connect your long-term goals with continuous learning, technical mentorship, architectural leadership, and driving company growth.`
    }
  ];
};
