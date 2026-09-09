import { ResumeData, TemplateType, FontFamilyType } from '../types/resume';

// Smart rule-based generators + Google X-Y-Z formula engines
const XYZ_ENHANCEMENT_TEMPLATES: { [key: string]: string[] } = {
  software: [
    'Architected and deployed high-performance microservices using React and TypeScript, reducing client-side load times by 42%.',
    'Spearheaded automated CI/CD pipeline modernization with Docker and GitHub Actions, slashing deployment cycles from 4 hours to 12 minutes.',
    'Optimized distributed database queries and caching layers with Redis, scaling system throughput by 3.5x during peak traffic.',
    'Engineered zero-downtime REST & GraphQL APIs serving 500k+ daily active users with 99.99% service availability.',
    'Led code reviews and technical mentoring for 5 junior developers, improving sprint velocity and team delivery rates by 25%.'
  ],
  ai: [
    'Fine-tuned and evaluated LLM transformer pipelines utilizing PyTorch and HuggingFace, improving response semantic accuracy by 34%.',
    'Deployed high-throughput Retrieval-Augmented Generation (RAG) agent architecture with Pinecone vector search, reducing hallucination rates by 68%.',
    'Streamlined AI inference workflows on Google Cloud Platform, decreasing GPU computational costs by $18,000 monthly.',
    'Built automated data preprocessing pipelines handling 2TB+ daily training records with 99.4% parsing precision.'
  ],
  general: [
    'Spearheaded cross-functional project deliverables across 3 departments, executing on-time launch and increasing customer satisfaction (CSAT) by 22%.',
    'Redesigned core business operations workflows, automating manual entry and saving 15+ team hours weekly.',
    'Identified and resolved critical bottlenecks in product roadmap, driving 30% uplift in quarterly key performance indicators (KPIs).'
  ]
};

export function enhanceBulletPoint(originalText: string, roleTitle: string = 'Software Engineer'): string {
  const trimmed = originalText.trim();
  if (!trimmed) {
    return 'Architected and deployed responsive UI workflows, improving user engagement metrics by 25% across 50k+ active sessions.';
  }

  // If already strong with numbers, polish with power verb
  const hasNumber = /\d+/.test(trimmed);
  const words = trimmed.split(' ');
  const firstWord = words[0]?.toLowerCase();

  const strongVerbs = ['Architected', 'Spearheaded', 'Engineered', 'Orchestrated', 'Streamlined', 'Optimized', 'Formulated'];
  const randomVerb = strongVerbs[Math.floor(Math.random() * strongVerbs.length)];

  if (['worked', 'helped', 'assisted', 'handled', 'responsible', 'did', 'made'].includes(firstWord)) {
    const rest = words.slice(1).join(' ');
    return `${randomVerb} and executed ${rest}${hasNumber ? '' : ', resulting in a 30% increase in operational efficiency'}.`;
  }

  if (!hasNumber) {
    return `${trimmed}, boosting performance metrics and productivity by 35% across key deliverables.`;
  }

  return `${randomVerb} ${trimmed.charAt(0).toLowerCase() + trimmed.slice(1)}`;
}

export function generateSummary(resume: ResumeData, targetRole?: string): string {
  const role = targetRole || resume.personalInfo.jobTitle || 'Software Engineer';
  const skillsList = resume.skills.flatMap(s => s.items).slice(0, 5).join(', ');
  const companyName = resume.experience[0]?.company || 'leading tech companies';

  return `Results-driven ${role} with extensive experience architecting scalable solutions and delivering high-impact products at ${companyName}. Proficient across modern technology stacks including ${skillsList || 'Full-Stack architectures & Cloud Infrastructure'}. Proven ability applying Google X-Y-Z methodology to elevate system reliability, optimize team velocity, and drive measurable revenue growth.`;
}

export function generateCoverLetterText(resume: ResumeData, company: string, role: string, tone: string = 'professional'): string {
  const candidateName = resume.personalInfo.fullName || 'Applicant';
  const candidateEmail = resume.personalInfo.email || '';
  const topSkills = resume.skills.flatMap(s => s.items).slice(0, 4).join(', ');
  const recentExp = resume.experience[0];
  const highlight = recentExp?.highlights[0] || 'engineered high-availability applications that increased user retention by 25%';

  return `Dear Hiring Team,\n\nI am writing to express my strong interest in the ${role} position at ${company}. Having followed ${company}'s industry leadership and commitment to excellence, I am eager to bring my expertise in ${topSkills || 'full-stack engineering and system scalability'} to your forward-thinking engineering team.\n\nIn my recent role as ${recentExp?.role || 'Software Engineer'} at ${recentExp?.company || 'Apex Technologies'}, I ${highlight.charAt(0).toLowerCase() + highlight.slice(1)}. Throughout my career, I have prioritized clean architecture, rigorous testing, and measurable outcomes to ensure high software reliability and team productivity.\n\nI am confident that my technical skills, proactive problem-solving mindset, and dedication to ATS-compliant standards make me an ideal match for ${company}. I would welcome the opportunity to discuss how my background aligns with your upcoming roadmap.\n\nThank you for your time and consideration.\n\nSincerely,\n${candidateName}\n${candidateEmail}`;
}

export function generateInterviewQuestions(role: string): Array<{ id: number; question: string; category: string; tip: string }> {
  return [
    {
      id: 1,
      question: `Can you walk me through your most impactful project as a ${role}?`,
      category: 'Project Deep Dive',
      tip: 'Use the STAR method (Situation, Task, Action, Result) and quantify the final outcome (e.g. % speedup, revenue, users).'
    },
    {
      id: 2,
      question: 'Describe a situation where you had to debug a critical production outage under tight time pressure.',
      category: 'Technical Problem Solving',
      tip: 'Focus on your systematic triage process: telemetry logs, isolation, temporary mitigation, and long-term RCA prevention.'
    },
    {
      id: 3,
      question: 'How do you approach architectural trade-offs between speed of delivery and technical debt?',
      category: 'System Design & Tradeoffs',
      tip: 'Highlight pragmatic engineering, modular boundaries, and creating actionable backlog tickets with clear ROI.'
    },
    {
      id: 4,
      question: 'Tell me about a time you disagreed with a product manager or team member on a technical requirement.',
      category: 'Behavioral & Collaboration',
      tip: 'Emphasize empathy, data-driven reasoning, user impact, and finding a win-win consensus.'
    },
    {
      id: 5,
      question: 'How do you ensure application security and data privacy in modern cloud environments?',
      category: 'Security & Best Practices',
      tip: 'Mention least privilege IAM, encryption at rest/transit, input sanitization, and automated secret scanning.'
    },
    {
      id: 6,
      question: 'What is your strategy for optimizing latency and API performance across distributed systems?',
      category: 'Performance Engineering',
      tip: 'Discuss database indexing, caching strategies (Redis/CDN), connection pooling, and payload minimization.'
    },
    {
      id: 7,
      question: 'Describe a time you mentored a junior engineer or championed a new engineering standard.',
      category: 'Leadership & Mentorship',
      tip: 'Show how you empowered others through pair programming, constructive code reviews, and documentation.'
    },
    {
      id: 8,
      question: 'How do you stay up-to-date with emerging technologies like AI/LLMs and cloud architectures?',
      category: 'Continuous Learning',
      tip: 'Share concrete examples: building side-projects, reading whitepapers, and benchmarking new tools.'
    },
    {
      id: 9,
      question: 'Explain how you design a system to scale from 10k to 1 million daily active users.',
      category: 'Scalability',
      tip: 'Walk through horizontal scaling, load balancing, asynchronous message queues, and read-replica databases.'
    },
    {
      id: 10,
      question: 'Why are you specifically excited to work on our products and technology stack?',
      category: 'Motivation & Cultural Fit',
      tip: 'Tie your personal engineering passions directly to the company mission and recent technical challenges.'
    }
  ];
}

export function generateLinkedInOptimization(resume: ResumeData): {
  headlines: string[];
  about: string;
} {
  const role = resume.personalInfo.jobTitle || 'Senior Software Engineer';
  const skills = resume.skills.flatMap(s => s.items).slice(0, 6).join(' | ');

  const headlines = [
    `${role} | Building High-Performance AI & Cloud Systems | ${skills.split(' | ').slice(0, 3).join(' • ')}`,
    `${role} @ ${resume.experience[0]?.company || 'Tech'} | Ex-UC Berkeley | Scaling Web & Distributed Architectures (1M+ Users)`,
    `Transforming Ideas into Resilient Software | ${role} | Passionate about AI, ATS Systems & Developer Experience`
  ];

  const about = `👋 Hi, I'm ${resume.personalInfo.fullName || 'Alexander'}!\n\nI am a passionate ${role} focused on creating scalable, user-centric software and robust cloud architectures.\n\n🚀 Key Highlights:\n• ${resume.experience[0]?.highlights[0] || 'Architected high-throughput services with sub-100ms latency'}\n• Expertise in ${skills}\n• Dedicated to clean code, Google X-Y-Z measurable outcomes, and engineering excellence\n\n📫 Let's connect: ${resume.personalInfo.email} | GitHub: ${resume.personalInfo.github}`;

  return { headlines, about };
}

// Support for direct Google Gemini API if user supplies API Key
export async function callGeminiApi(prompt: string, apiKey: string): Promise<string> {
  if (!apiKey) throw new Error('No API key provided');
  
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

/**
 * Generates a full, realistic ResumeData object with a REAL random page length of exactly 1, 2, or 3 pages.
 */
export function generateRandomResume(
  targetPageCount?: 1 | 2 | 3,
  targetRole?: string,
  targetTemplate?: TemplateType
): ResumeData {
  const pageCount = targetPageCount || ((Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3);
  const templates: TemplateType[] = ['modern', 'tech', 'executive', 'slate', 'compact'];
  const template = targetTemplate || templates[Math.floor(Math.random() * templates.length)];
  const fontFamily: FontFamilyType = template === 'tech' ? 'mono' : template === 'executive' ? 'serif' : 'inter';

  const candidates = [
    {
      fullName: 'Alex Morgan',
      jobTitle: 'Senior Full-Stack Engineer',
      email: 'alex.morgan@dev.io',
      phone: '(555) 234-5678',
      location: 'San Francisco, CA',
      website: 'alexmorgan.dev',
      linkedin: 'linkedin.com/in/alexmorgan',
      github: 'github.com/alexmorgan'
    },
    {
      fullName: 'Sophia Chen',
      jobTitle: 'Lead Data Scientist & AI Specialist',
      email: 'sophia.chen@ai-nexus.io',
      phone: '(555) 345-6789',
      location: 'Seattle, WA',
      website: 'sophiachen.ai',
      linkedin: 'linkedin.com/in/sophiachen-ai',
      github: 'github.com/sophiachen-ai'
    },
    {
      fullName: 'Marcus Vance',
      jobTitle: 'Principal Cloud & DevOps Architect',
      email: 'marcus.vance@cloudstrata.io',
      phone: '(555) 456-7890',
      location: 'Austin, TX',
      website: 'marcusvance.cloud',
      linkedin: 'linkedin.com/in/marcusvance-cloud',
      github: 'github.com/marcusvance-cloud'
    },
    {
      fullName: 'Elena Rostova',
      jobTitle: 'Staff Technical Product Manager',
      email: 'elena.rostova@horizon.io',
      phone: '(555) 567-8901',
      location: 'New York, NY',
      website: 'elenarostova.pm',
      linkedin: 'linkedin.com/in/elenarostova-pm',
      github: 'github.com/elenarostova'
    },
    {
      fullName: 'David Miller',
      jobTitle: 'Senior Frontend Architect',
      email: 'david.miller@pixelcraft.dev',
      phone: '(555) 678-9012',
      location: 'Chicago, IL',
      website: 'davidmiller.dev',
      linkedin: 'linkedin.com/in/davidmiller-fe',
      github: 'github.com/davidmiller-fe'
    },
    {
      fullName: 'Amara Okafor',
      jobTitle: 'Senior Cybersecurity & IAM Engineer',
      email: 'amara.okafor@cipherguard.sec',
      phone: '(555) 789-0123',
      location: 'Boston, MA',
      website: 'amaraokafor.sec',
      linkedin: 'linkedin.com/in/amaraokafor-sec',
      github: 'github.com/amaraokafor-sec'
    }
  ];

  const candidate = { ...candidates[Math.floor(Math.random() * candidates.length)] };
  if (targetRole) {
    candidate.jobTitle = targetRole;
  }

  // Full pool of experience entries
  const allExperience = [
    {
      id: `exp-${Date.now()}-1`,
      role: `Principal / Lead ${candidate.jobTitle.split('&')[0].trim()}`,
      company: 'Aura Cloud Systems',
      location: candidate.location,
      startDate: '2023-01',
      endDate: 'Present',
      current: true,
      highlights: [
        'Architected and deployed multi-region distributed microservices handling 4.5M daily active users with 99.99% uptime SLA.',
        'Optimized database query indexing and Redis cache layer, reducing p99 latency from 450ms to 65ms across 15M daily requests.',
        'Spearheaded Google X-Y-Z formula automated CI/CD pipeline modernization, slashing release cycle times from 4 hours to 14 minutes.',
        'Led technical mentoring for 8 senior engineers, driving agile sprint velocity and team delivery rates by 32%.',
        'Managed annual cloud infrastructure budget of $3.5M, negotiating enterprise volume discounts that saved $450,000 annually.'
      ]
    },
    {
      id: `exp-${Date.now()}-2`,
      role: `Senior ${candidate.jobTitle.split('&')[0].trim()}`,
      company: 'Vanguard SaaS Labs',
      location: candidate.location,
      startDate: '2020-05',
      endDate: '2022-12',
      current: false,
      highlights: [
        'Engineered high-throughput event streaming architecture using Kafka and Node.js, processing 120k events/second.',
        'Spearheaded cross-functional technical discovery across 4 squads, elevating 90-day user retention rates by 38%.',
        'Integrated Stripe payments and federated OAuth2 security protocols, generating $6.2M in annual recurring subscription revenue.',
        'Expanded automated unit and integration test coverage from 42% to 91%, eliminating 75% of production regression bugs.'
      ]
    },
    {
      id: `exp-${Date.now()}-3`,
      role: `Staff Engineer & Solutions Specialist`,
      company: 'Nexus Innovations',
      location: candidate.location,
      startDate: '2018-02',
      endDate: '2020-04',
      current: false,
      highlights: [
        'Designed and launched custom internal developer dashboard, saving 25+ engineering hours per week across 12 teams.',
        'Refactored legacy monolithic backend into decoupled containerized microservices running on AWS EKS and Kubernetes.',
        'Implemented strict WCAG 2.1 AA accessibility standards across 40+ customer portals, passing external compliance audits.',
        'Automated real-time telemetry monitoring with Prometheus and Grafana, reducing mean time to detection (MTTD) by 60%.'
      ]
    },
    {
      id: `exp-${Date.now()}-4`,
      role: `Systems Engineer & Consultant`,
      company: 'Strata Tech Solutions',
      location: candidate.location,
      startDate: '2016-01',
      endDate: '2018-01',
      current: false,
      highlights: [
        'Built automated ETL data pipelines in Python and SQL processing 500GB daily transaction feeds with sub-1% failure rates.',
        'Partnered with enterprise clients to conduct architecture security reviews and threat modeling assessments.',
        'Pioneered zero-downtime blue/green deployment strategy using AWS Route53 weighted routing and ECS target groups.',
        'Mentored 5 junior developers on code quality standards, automated testing, and git branching workflows.'
      ]
    },
    {
      id: `exp-${Date.now()}-5`,
      role: `Associate Software Engineer`,
      company: 'Apex Digital Labs',
      location: candidate.location,
      startDate: '2014-06',
      endDate: '2015-12',
      current: false,
      highlights: [
        'Developed 20+ responsive web components utilizing HTML5, CSS3, and JavaScript, reducing client bundle size by 28%.',
        'Built REST API endpoints for user account management and billing history verification.',
        'Participated in daily Scrum standups, bi-weekly sprint planning, and quarterly retrospective sessions.'
      ]
    },
    {
      id: `exp-${Date.now()}-6`,
      role: `Junior Developer & Co-op Intern`,
      company: 'PixelCraft Studios',
      location: candidate.location,
      startDate: '2013-05',
      endDate: '2014-05',
      current: false,
      highlights: [
        'Assisted senior engineers in refactoring database schemas and writing automated end-to-end Cypress test suites.',
        'Created technical documentation and user guides for API integrations.',
        'Resolved 80+ customer-reported bug tickets during initial onboarding phase.'
      ]
    }
  ];

  // Full pool of education
  const allEducation = [
    {
      id: `edu-${Date.now()}-1`,
      degree: 'M.S. in Computer Science & Artificial Intelligence',
      institution: 'Stanford University / UC Berkeley',
      location: 'CA',
      startDate: '2016',
      endDate: '2018',
      gpa: '3.92 / 4.0',
      highlights: ['Specialization in Distributed Systems & Neural Machine Learning', 'Thesis on High-Throughput Vector Databases']
    },
    {
      id: `edu-${Date.now()}-2`,
      degree: 'B.S. in Computer Science & Information Systems',
      institution: 'University of Washington / UT Austin',
      location: 'WA',
      startDate: '2012',
      endDate: '2016',
      gpa: '3.85 / 4.0',
      highlights: ['Dean’s Honor List (6 Semesters)', 'President of ACM Student Chapter']
    },
    {
      id: `edu-${Date.now()}-3`,
      degree: 'Executive Specialization Certificate in Cloud Security',
      institution: 'MIT Professional Education',
      location: 'Remote',
      startDate: '2019',
      endDate: '2019',
      highlights: ['Completed Advanced Zero-Trust Architecture & Cryptography Practicum']
    }
  ];

  // Full pool of skills
  const allSkills = [
    {
      id: `sk-${Date.now()}-1`,
      category: 'Languages & Core Stack',
      items: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'Go', 'SQL', 'HTML5/CSS3', 'Rust', 'C++']
    },
    {
      id: `sk-${Date.now()}-2`,
      category: 'Frameworks & Frontend',
      items: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'GraphQL', 'Redux / Zustand', 'Webpack']
    },
    {
      id: `sk-${Date.now()}-3`,
      category: 'Cloud, DevOps & AI',
      items: ['AWS (Lambda, S3, ECS)', 'Docker', 'Kubernetes', 'Terraform', 'PostgreSQL', 'Redis', 'PyTorch', 'LangChain', 'Pinecone']
    },
    {
      id: `sk-${Date.now()}-4`,
      category: 'Security & Systems',
      items: ['Zero-Trust IAM', 'Okta', 'OAuth2/OIDC', 'Prometheus', 'Grafana', 'ArgoCD', 'CI/CD Pipelines', 'Kafka']
    },
    {
      id: `sk-${Date.now()}-5`,
      category: 'Leadership & Methodologies',
      items: ['System Architecture', 'Agile / Scrum', 'ATS Optimization', 'A/B Testing', 'Cost Optimization', 'Technical Mentorship']
    }
  ];

  // Full pool of projects
  const allProjects = [
    {
      id: `proj-${Date.now()}-1`,
      title: 'Enterprise High-Throughput RAG Assistant',
      subtitle: 'LLM Document Search Engine',
      link: 'https://github.com/example/rag-assistant',
      startDate: '2023',
      endDate: '2024',
      technologies: ['Python', 'PyTorch', 'Pinecone', 'LangChain', 'FastAPI'],
      highlights: [
        'Engineered semantic search pipeline across 10M+ documents achieving sub-40ms latency.',
        'Fine-tuned domain-specific LLM models, slashing external model API costs by $35,000/month.',
        'Implemented real-time hallucination scoring benchmarks with 95% evaluation accuracy.'
      ]
    },
    {
      id: `proj-${Date.now()}-2`,
      title: 'Multi-Region Kubernetes Failover Orchestrator',
      subtitle: 'Zero-Downtime Infrastructure',
      link: 'https://github.com/example/k8s-failover',
      startDate: '2022',
      endDate: '2023',
      technologies: ['Go', 'Kubernetes', 'Terraform', 'ArgoCD', 'AWS'],
      highlights: [
        'Automated cross-region cluster failover achieving 99.999% uptime SLA for critical payment gateways.',
        'Reduced deployment rollback time from 15 minutes to under 30 seconds.'
      ]
    },
    {
      id: `proj-${Date.now()}-3`,
      title: 'Real-Time Web Analytics Ingestion Platform',
      subtitle: 'High-Scale Event Pipeline',
      link: 'https://github.com/example/analytics-stream',
      startDate: '2021',
      endDate: '2022',
      technologies: ['React', 'TypeScript', 'Node.js', 'Kafka', 'PostgreSQL'],
      highlights: [
        'Processed 100,000 incoming user events/sec with sub-10ms delivery to real-time dashboards.',
        'Designed interactive visual charts and cohort retention reports for 5,000 business users.'
      ]
    },
    {
      id: `proj-${Date.now()}-4`,
      title: 'Zero-Trust IAM Policy Validator',
      subtitle: 'Security & Access Control',
      link: 'https://github.com/example/iam-validator',
      startDate: '2020',
      endDate: '2021',
      technologies: ['Python', 'AWS IAM', 'Docker', 'OpenAPI'],
      highlights: [
        'Built automated static analysis tool detecting overly permissive IAM roles prior to production deployments.',
        'Prevented 40+ security misconfigurations across enterprise cloud environments.'
      ]
    }
  ];

  // Certifications
  const allCertifications = [
    {
      id: `cert-${Date.now()}-1`,
      name: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      date: '2023',
      link: 'https://aws.amazon.com/certification'
    },
    {
      id: `cert-${Date.now()}-2`,
      name: 'Google Cloud Certified Professional Cloud Architect',
      issuer: 'Google Cloud',
      date: '2022',
      link: 'https://cloud.google.com/certification'
    },
    {
      id: `cert-${Date.now()}-3`,
      name: 'Certified Information Systems Security Professional (CISSP)',
      issuer: '(ISC)²',
      date: '2021',
      link: 'https://www.isc2.org/Certifications/CISSP'
    },
    {
      id: `cert-${Date.now()}-4`,
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation',
      date: '2020',
      link: 'https://www.cncf.io/certification/cka/'
    }
  ];

  // Custom section for 3-page resumes
  const customSections = pageCount === 3 ? [
    {
      id: `custom-${Date.now()}-1`,
      title: 'Patents & Technical Publications',
      items: [
        {
          id: `custom-item-1`,
          title: 'US Patent #11,842,109: Distributed Vector Indexing in Neural Search Systems',
          subtitle: 'Co-Inventor • Granted 2023',
          date: '2023',
          description: 'Architected novel quantization technique for vector embeddings reducing memory footprint by 60% without loss of recall precision.'
        },
        {
          id: `custom-item-2`,
          title: 'Keynote Speaker: Building Resilient Microservices at Scale',
          subtitle: 'Cloud Native Summit',
          date: '2022',
          description: 'Delivered technical presentation to 2,000+ engineers on automated zero-downtime failovers and multi-region Kubernetes architectures.'
        }
      ]
    }
  ] : [];

  // Slice data content precisely according to pageCount to guarantee REAL 1, 2, or 3 page count!
  let expToUse = allExperience.slice(0, 2);
  let eduToUse = allEducation.slice(0, 1);
  let skillsToUse = allSkills.slice(0, 2);
  let projToUse = allProjects.slice(0, 1);
  let certsToUse = allCertifications.slice(0, 1);
  let summaryText = `Results-driven ${candidate.jobTitle} with experience architecting high-availability systems and scalable microservices. Proven track record reducing API latency by 45% and leading teams to deliver enterprise products.`;

  if (pageCount === 2) {
    expToUse = allExperience.slice(0, 4);
    eduToUse = allEducation.slice(0, 2);
    skillsToUse = allSkills.slice(0, 4);
    projToUse = allProjects.slice(0, 2);
    certsToUse = allCertifications.slice(0, 2);
    summaryText = `Performance-driven ${candidate.jobTitle} with 6+ years of experience designing scalable distributed cloud architectures, real-time AI microservices, and high-conversion web applications. Proven track record reducing API latency by 45% and leading cross-functional engineering teams to deliver enterprise SaaS platforms serving 2M+ active monthly users.`;
  } else if (pageCount === 3) {
    expToUse = allExperience.slice(0, 6);
    eduToUse = allEducation.slice(0, 3);
    skillsToUse = allSkills;
    projToUse = allProjects;
    certsToUse = allCertifications;
    summaryText = `Executive ${candidate.jobTitle} with 8+ years of technical leadership driving multi-region cloud infrastructures, zero-downtime CI/CD pipelines, and high-throughput AI vector search engines. Accomplished author, patent co-inventor, and engineering director with proven success scaling engineering orgs, managing $3.5M+ annual cloud budgets, and delivering enterprise software generating $10M+ in net new ARR.`;
  }

  return {
    id: `generated-resume-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: `${candidate.fullName} - ${candidate.jobTitle} (${pageCount}-Page ${template.toUpperCase()} Resume)`,
    updatedAt: new Date().toISOString(),
    personalInfo: candidate,
    summary: summaryText,
    experience: expToUse,
    education: eduToUse,
    skills: skillsToUse,
    projects: projToUse,
    certifications: certsToUse,
    customSections,
    formatting: {
      template,
      fontFamily,
      fontSize: 'base',
      spacing: 'normal',
      accentColor: template === 'tech' ? '#0284c7' : template === 'executive' ? '#059669' : template === 'slate' ? '#4f46e5' : template === 'compact' ? '#d97706' : '#2563eb',
      showIcons: true,
      sectionOrder: ['summary', 'experience', 'skills', 'education', 'projects', 'certifications', 'customSections']
    }
  };
}
