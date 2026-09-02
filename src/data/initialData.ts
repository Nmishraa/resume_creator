import { ResumeData, JobApplication, CoverLetterData } from '../types/resume';

export const emptyResumeData: ResumeData = {
  id: 'blank-resume-init',
  title: 'Untitled Resume',
  updatedAt: new Date().toISOString(),
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: ''
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  customSections: [],
  formatting: {
    template: 'modern',
    fontFamily: 'outfit',
    fontSize: 'base',
    spacing: 'normal',
    accentColor: '#0284c7',
    showIcons: true,
    sectionOrder: ['summary', 'experience', 'skills', 'projects', 'education', 'certifications', 'customSections']
  }
};

export const initialResumeData: ResumeData = {
  id: 'default-resume-1',
  title: 'Senior Software Engineer (ATS Optimized)',
  updatedAt: new Date().toISOString(),
  personalInfo: {
    fullName: 'Alexander Wright',
    jobTitle: 'Senior Full-Stack & AI Systems Engineer',
    email: 'alexander.wright@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    website: 'alexwright.dev',
    linkedin: 'linkedin.com/in/alexwright-dev',
    github: 'github.com/alexwright',
  },
  summary: 'Performance-driven Senior Software Engineer with 6+ years of experience designing scalable distributed cloud architectures, real-time AI microservices, and high-conversion web applications. Proven track record reducing API latency by 45% and leading cross-functional teams to deliver enterprise products serving 1.2M+ monthly active users.',
  experience: [
    {
      id: 'exp-1',
      role: 'Staff / Senior Full-Stack Engineer',
      company: 'Apex Cloud Technologies',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: 'Present',
      current: true,
      highlights: [
        'Architected and deployed a multi-tenant AI workflow platform using React, TypeScript, Node.js, and GCP, reducing customer onboarding time by 60%.',
        'Optimized PostgreSQL query indexing and Redis caching layer, decreasing p99 latency from 420ms to 85ms across 12M daily requests.',
        'Led a team of 6 engineers through CI/CD automated pipeline migrations, boosting deployment frequency from weekly to 4x daily with 99.98% uptime.',
        'Spearheaded ATS-compliant resume extraction pipeline utilizing Google Gemini API and LLM embeddings, improving parser accuracy by 38%.'
      ]
    },
    {
      id: 'exp-2',
      role: 'Full-Stack Software Engineer',
      company: 'Nova Interactive Labs',
      location: 'Seattle, WA',
      startDate: '2019-06',
      endDate: '2022-02',
      current: false,
      highlights: [
        'Engineered responsive customer-facing dashboard in Next.js and Tailwind CSS, increasing user engagement metrics by 28% in Q3.',
        'Integrated Stripe payments and Firebase Authentication for SaaS subscriptions, generating $1.4M in ARR within the first year of rollout.',
        'Implemented comprehensive Jest & Cypress automated test suites, expanding code coverage from 45% to 88% and eliminating 70% of regression bugs.'
      ]
    },
    {
      id: 'exp-3',
      role: 'Associate Frontend Developer',
      company: 'Vanguard Digital Solutions',
      location: 'Austin, TX',
      startDate: '2018-01',
      endDate: '2019-05',
      current: false,
      highlights: [
        'Developed 15+ reusable UI components adhering to WCAG 2.1 AA accessibility standards for Fortune 500 client portals.',
        'Collaborated with UX designers and product managers to redesign checkout flows, elevating transaction completion rates by 19%.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science & Artificial Intelligence',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2014',
      endDate: '2018',
      gpa: '3.85 / 4.0',
      highlights: [
        'Dean’s Honor List (6 Semesters), President of ACM Student Chapter.',
        'Coursework: Distributed Systems, Machine Learning, Data Structures & Algorithms, Cloud Infrastructure.'
      ]
    }
  ],
  skills: [
    {
      id: 'skill-1',
      category: 'Languages & Core',
      items: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'Go', 'SQL', 'HTML5/CSS3']
    },
    {
      id: 'skill-2',
      category: 'Frameworks & Libraries',
      items: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'GraphQL', 'Redux / Zustand']
    },
    {
      id: 'skill-3',
      category: 'Cloud, DevOps & AI',
      items: ['Firebase (Auth, Firestore, Hosting)', 'AWS (Lambda, S3, ECS)', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'Gemini AI API', 'LangChain']
    },
    {
      id: 'skill-4',
      category: 'Practices & Methodologies',
      items: ['System Architecture', 'CI/CD Pipelines', 'Agile / Scrum', 'ATS Optimization', 'RESTful API Design', 'TDD']
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Resume Craft & ATS Matcher',
      subtitle: 'Open-Source AI Career Platform',
      link: 'https://resume.gnanamai.com',
      startDate: '2023',
      endDate: '2024',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Vector PDF'],
      highlights: [
        'Built modern ATS resume builder with real-time scoring engine and vector PDF generation, reaching 45k+ monthly active users.',
        'Integrated zero-latency Google X-Y-Z bullet points analyzer and offline-first Firebase Firestore state synchronization.'
      ]
    },
    {
      id: 'proj-2',
      title: 'Distributed Real-time Analytics Engine',
      subtitle: 'High-Throughput Event Ingestion',
      link: 'https://github.com/alexwright/event-stream',
      startDate: '2022',
      endDate: '2023',
      technologies: ['Go', 'Kafka', 'Redis', 'Docker'],
      highlights: [
        'Engineered an event pipeline capable of processing 80,000 events/second with sub-10ms delivery to downstream subscribers.'
      ]
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: '2023',
      link: 'https://aws.amazon.com/certification'
    },
    {
      id: 'cert-2',
      name: 'Google Cloud Professional Cloud Architect',
      issuer: 'Google Cloud',
      date: '2022',
      link: 'https://cloud.google.com/certification'
    }
  ],
  customSections: [],
  formatting: {
    template: 'modern',
    fontFamily: 'outfit',
    fontSize: 'base',
    spacing: 'normal',
    accentColor: '#0284c7', // Brand Cyan/Blue
    showIcons: true,
    sectionOrder: ['summary', 'experience', 'skills', 'projects', 'education', 'certifications', 'customSections']
  }
};

export const sampleJobApplications: JobApplication[] = [
  {
    id: 'job-1',
    company: 'Stripe',
    role: 'Senior Staff Frontend Engineer',
    status: 'interview',
    salary: '$190,000 - $240,000',
    location: 'San Francisco, CA (Remote)',
    appliedDate: '2026-08-15',
    deadline: '2026-09-05',
    url: 'https://stripe.com/jobs',
    notes: 'Completed technical phone screen. Next step: Virtual onsite with VP of Engineering.',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'job-2',
    company: 'Google',
    role: 'Lead Cloud & AI Engineer',
    status: 'applied',
    salary: '$210,000 - $260,000',
    location: 'Mountain View, CA',
    appliedDate: '2026-08-20',
    deadline: '2026-09-12',
    url: 'https://careers.google.com',
    notes: 'Referral submitted by former colleague.',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'job-3',
    company: 'Vercel',
    role: 'Product Engineer - Next.js AI',
    status: 'offer',
    salary: '$195,000 + Equity',
    location: 'Remote',
    appliedDate: '2026-08-01',
    deadline: '2026-09-02',
    url: 'https://vercel.com/careers',
    notes: 'Offer received! Reviewing equity package and benefits.',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'job-4',
    company: 'OpenAI',
    role: 'Full Stack Engineer - Platform',
    status: 'wishlist',
    salary: '$220,000 - $280,000',
    location: 'San Francisco, CA',
    appliedDate: '',
    deadline: '2026-09-15',
    url: 'https://openai.com/careers',
    notes: 'Tailor resume emphasizing vector embeddings and LLM streaming API experience.',
    updatedAt: new Date().toISOString(),
  }
];

export const sampleCoverLetter: CoverLetterData = {
  id: 'cl-1',
  title: 'Cover Letter - Apex Cloud Senior Role',
  recipientName: 'Hiring Committee',
  recipientTitle: 'Director of Engineering',
  companyName: 'Apex Cloud Technologies',
  companyAddress: '500 Howard Street, San Francisco, CA',
  jobTitle: 'Senior Full-Stack & AI Systems Engineer',
  date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  senderName: 'Alexander Wright',
  senderEmail: 'alexander.wright@example.com',
  senderPhone: '+1 (555) 234-5678',
  senderLocation: 'San Francisco, CA',
  letterBody: `Dear Hiring Team,\n\nI am writing to express my enthusiasm for the Senior Full-Stack & AI Systems Engineer position at Apex Cloud Technologies. With over 6 years of experience architecting high-throughput distributed systems and intuitive user interfaces, I have consistently driven technical innovations that reduce latency and accelerate customer onboarding.\n\nIn my previous roles, I spearheaded the deployment of a multi-tenant AI workflow platform that reduced onboarding times by 60% and optimized database indexing layers to serve 12M+ daily requests with sub-100ms p99 latency. I believe my deep expertise in React, TypeScript, Cloud Infrastructure, and AI LLM integrations aligns seamlessly with your team's mission to deliver world-class developer tools.\n\nI am particularly drawn to Apex Cloud's commitment to reliability and developer productivity. I would welcome the opportunity to discuss how my background in scalable architecture and engineering leadership can contribute to your upcoming product milestones.\n\nThank you for your time and consideration.\n\nSincerely,\nAlexander Wright`,
  tone: 'professional',
  updatedAt: new Date().toISOString(),
};
