import { ResumeData } from '../types/resume';

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
