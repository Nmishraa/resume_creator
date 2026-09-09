import { ResumeData } from '../types/resume';

export interface HeroResumeCard {
  id: string;
  atsScore: string;
  templateId: 'modern' | 'tech' | 'executive' | 'slate' | 'compact';
  templateName: string;
  templateTag: string;
  pageLength: '1-Page' | '2-Page' | '3-Page' | '4-Page';
  fullName: string;
  jobTitle: string;
  contact: string;
  summary: string;
  expTitle: string;
  expDates: string;
  expHighlights: string[];
  skills: string[];
  presetData: ResumeData;
}

export const HERO_RESUME_CARDS: HeroResumeCard[] = [
  {
    id: 'alex-morgan',
    atsScore: '98/100',
    templateId: 'modern',
    templateName: 'Modern Clean',
    templateTag: 'Most Popular',
    pageLength: '4-Page',
    fullName: 'Alex Morgan',
    jobTitle: 'Senior Full-Stack Engineer',
    contact: 'alex.morgan@dev.io • (555) 234-5678 • San Francisco, CA',
    summary: 'Results-driven engineer with 7+ years of experience building high-throughput microservices. Spearheaded system architecture handling 5M daily active users.',
    expTitle: 'Lead Systems Engineer • Cloud Scale',
    expDates: '2021 – Present',
    expHighlights: [
      'Architected multi-region Kubernetes clusters, reducing downtime by 99.9%.',
      'Optimized API gateway throughput by 42% using React & Node.js microservices.'
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    presetData: {
      id: 'hero-alex-morgan',
      title: 'Alex Morgan - Senior Full-Stack Engineer',
      updatedAt: new Date().toISOString(),
      personalInfo: {
        fullName: 'Alex Morgan',
        jobTitle: 'Senior Full-Stack Engineer',
        email: 'alex.morgan@dev.io',
        phone: '(555) 234-5678',
        location: 'San Francisco, CA',
        website: 'alexmorgan.dev',
        linkedin: 'linkedin.com/in/alexmorgan',
        github: 'github.com/alexmorgan'
      },
      summary: 'Results-driven engineer with 7+ years of experience building high-throughput microservices. Spearheaded system architecture handling 5M daily active users.',
      experience: [
        {
          id: 'exp-alex-1',
          role: 'Lead Systems Engineer',
          company: 'Cloud Scale',
          location: 'San Francisco, CA',
          startDate: '2021-01',
          endDate: 'Present',
          current: true,
          highlights: [
            'Architected multi-region Kubernetes clusters, reducing downtime by 99.9%.',
            'Optimized API gateway throughput by 42% using React & Node.js microservices.',
            'Mentored 6 senior software engineers and established automated CI/CD deployment pipelines.'
          ]
        },
        {
          id: 'exp-alex-2',
          role: 'Senior Full Stack Developer',
          company: 'Apex Digital Labs',
          location: 'San Francisco, CA',
          startDate: '2018-03',
          endDate: '2020-12',
          current: false,
          highlights: [
            'Developed real-time web analytics dashboard processing 100k events/sec using React, TypeScript, and Kafka.',
            'Migrated monolithic backend codebase into decoupled Docker microservices running on AWS EKS.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-alex-1',
          degree: 'B.S. in Computer Science',
          institution: 'University of California, Berkeley',
          location: 'Berkeley, CA',
          startDate: '2014',
          endDate: '2018',
          gpa: '3.88 / 4.0'
        }
      ],
      skills: [
        { id: 'skill-alex-1', category: 'Core Stack', items: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'] }
      ],
      projects: [],
      certifications: [],
      customSections: [],
      formatting: {
        template: 'modern',
        fontFamily: 'inter',
        fontSize: 'base',
        accentColor: '#0284c7',
        spacing: 'normal',
        showIcons: true,
        sectionOrder: ['summary', 'experience', 'skills', 'education']
      }
    }
  },
  {
    id: 'sophia-chen',
    atsScore: '96/100',
    templateId: 'tech',
    templateName: 'Tech Minimal',
    templateTag: 'Tech Favorite',
    pageLength: '3-Page',
    fullName: 'Sophia Chen',
    jobTitle: 'Lead Data Scientist & AI Specialist',
    contact: 'sophia.chen@ai-nexus.io • (555) 345-6789 • Seattle, WA',
    summary: 'Senior ML practitioner specializing in LLM fine-tuning, RAG pipelines, and high-throughput vector search engines processing 3M+ daily queries.',
    expTitle: 'Principal AI Engineer • Nexus Analytics',
    expDates: '2022 – Present',
    expHighlights: [
      'Fine-tuned domain LLMs, cutting external model API costs by $45,000/month.',
      'Designed vector search architecture achieving sub-40ms latency across 10M vectors.'
    ],
    skills: ['Python', 'PyTorch', 'LangChain', 'Pinecone', 'AWS', 'Docker'],
    presetData: {
      id: 'hero-sophia-chen',
      title: 'Sophia Chen - Lead Data Scientist & AI Specialist',
      updatedAt: new Date().toISOString(),
      personalInfo: {
        fullName: 'Sophia Chen',
        jobTitle: 'Lead Data Scientist & AI Specialist',
        email: 'sophia.chen@ai-nexus.io',
        phone: '(555) 345-6789',
        location: 'Seattle, WA',
        website: 'sophiachen.ai',
        linkedin: 'linkedin.com/in/sophiachen-ai',
        github: 'github.com/sophiachen-ai'
      },
      summary: 'Senior ML practitioner specializing in LLM fine-tuning, RAG pipelines, and high-throughput vector search engines processing 3M+ daily queries.',
      experience: [
        {
          id: 'exp-sophia-1',
          role: 'Principal AI Engineer',
          company: 'Nexus Analytics',
          location: 'Seattle, WA',
          startDate: '2022-01',
          endDate: 'Present',
          current: true,
          highlights: [
            'Fine-tuned domain LLMs, cutting external model API costs by $45,000/month.',
            'Designed vector search architecture achieving sub-40ms latency across 10M vectors.',
            'Built automated evaluation suite for hallucinations with 96% accuracy on enterprise benchmarks.'
          ]
        },
        {
          id: 'exp-sophia-2',
          role: 'Senior Data Scientist',
          company: 'Cognitive Systems',
          location: 'Seattle, WA',
          startDate: '2019-05',
          endDate: '2021-12',
          current: false,
          highlights: [
            'Built NLP classification models with 94.8% accuracy across 200k customer support tickets.',
            'Deployed distributed PyTorch training jobs on AWS EC2 GPU clusters.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-sophia-1',
          degree: 'M.S. in Machine Learning & AI',
          institution: 'University of Washington',
          location: 'Seattle, WA',
          startDate: '2017',
          endDate: '2019',
          gpa: '3.94 / 4.0'
        }
      ],
      skills: [
        { id: 'skill-sophia-1', category: 'AI & Machine Learning', items: ['Python', 'PyTorch', 'LangChain', 'Pinecone', 'AWS', 'Docker'] }
      ],
      projects: [],
      certifications: [],
      customSections: [],
      formatting: {
        template: 'tech',
        fontFamily: 'mono',
        fontSize: 'base',
        accentColor: '#0f766e',
        spacing: 'normal',
        showIcons: true,
        sectionOrder: ['summary', 'experience', 'skills', 'education']
      }
    }
  },
  {
    id: 'marcus-vance',
    atsScore: '99/100',
    templateId: 'executive',
    templateName: 'Executive Serif',
    templateTag: 'Executive',
    pageLength: '4-Page',
    fullName: 'Marcus Vance',
    jobTitle: 'Principal Cloud & DevOps Architect',
    contact: 'marcus.vance@cloudstrata.io • (555) 456-7890 • Austin, TX',
    summary: 'Cloud Architect with 8+ years automating multi-region Kubernetes clusters, zero-downtime CI/CD pipelines, and enterprise IaC infrastructure.',
    expTitle: 'Lead Cloud Architect • Strata Infrastructure',
    expDates: '2020 – Present',
    expHighlights: [
      'Managed $14M annual AWS cloud budget, reducing infrastructure operational costs by 32%.',
      'Engineered automated failover across dual cloud regions achieving 99.999% uptime SLA.'
    ],
    skills: ['AWS', 'Terraform', 'Kubernetes', 'ArgoCD', 'Go', 'Docker'],
    presetData: {
      id: 'hero-marcus-vance',
      title: 'Marcus Vance - Principal Cloud & DevOps Architect',
      updatedAt: new Date().toISOString(),
      personalInfo: {
        fullName: 'Marcus Vance',
        jobTitle: 'Principal Cloud & DevOps Architect',
        email: 'marcus.vance@cloudstrata.io',
        phone: '(555) 456-7890',
        location: 'Austin, TX',
        website: 'marcusvance.cloud',
        linkedin: 'linkedin.com/in/marcusvance-cloud',
        github: 'github.com/marcusvance-cloud'
      },
      summary: 'Cloud Architect with 8+ years automating multi-region Kubernetes clusters, zero-downtime CI/CD pipelines, and enterprise IaC infrastructure.',
      experience: [
        {
          id: 'exp-marcus-1',
          role: 'Lead Cloud Architect',
          company: 'Strata Infrastructure',
          location: 'Austin, TX',
          startDate: '2020-01',
          endDate: 'Present',
          current: true,
          highlights: [
            'Managed $14M annual AWS cloud budget, reducing infrastructure operational costs by 32%.',
            'Engineered automated failover across dual cloud regions achieving 99.999% uptime SLA.',
            'Direct technical leadership for 12 DevOps engineers across multi-region infrastructure projects.'
          ]
        },
        {
          id: 'exp-marcus-2',
          role: 'Principal DevOps Engineer',
          company: 'Aura Cloud Systems',
          location: 'Austin, TX',
          startDate: '2017-04',
          endDate: '2019-12',
          current: false,
          highlights: [
            'Spearheaded enterprise Terraform IaC migration across 40+ AWS cloud accounts.',
            'Automated CI/CD pipelines with ArgoCD and GitHub Actions, cutting release cycles from 4 hours to 12 minutes.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-marcus-1',
          degree: 'B.S. in Computer Engineering',
          institution: 'University of Texas at Austin',
          location: 'Austin, TX',
          startDate: '2013',
          endDate: '2017'
        }
      ],
      skills: [
        { id: 'skill-marcus-1', category: 'Cloud Infrastructure', items: ['AWS', 'Terraform', 'Kubernetes', 'ArgoCD', 'Go', 'Docker'] }
      ],
      projects: [],
      certifications: [],
      customSections: [],
      formatting: {
        template: 'executive',
        fontFamily: 'serif',
        fontSize: 'base',
        accentColor: '#b45309',
        spacing: 'normal',
        showIcons: true,
        sectionOrder: ['summary', 'experience', 'skills', 'education']
      }
    }
  },
  {
    id: 'elena-rostova',
    atsScore: '97/100',
    templateId: 'slate',
    templateName: 'Professional Slate',
    templateTag: 'Modern',
    pageLength: '1-Page',
    fullName: 'Elena Rostova',
    jobTitle: 'Staff Technical Product Manager',
    contact: 'elena.rostova@horizon.io • (555) 567-8901 • New York, NY',
    summary: 'Product Leader scaling enterprise B2B SaaS platforms, developer-facing APIs, and AI features resulting in $6.5M net-new annual revenue.',
    expTitle: 'Senior Product Manager • Horizon SaaS',
    expDates: '2021 – Present',
    expHighlights: [
      'Spearheaded enterprise API portal launch, boosting 90-day active user retention by 38%.',
      'Directed product discovery across 4 engineering squads with 96% sprint velocity delivery.'
    ],
    skills: ['Product Strategy', 'A/B Testing', 'SQL', 'Mixpanel', 'Jira', 'OpenAPI'],
    presetData: {
      id: 'hero-elena-rostova',
      title: 'Elena Rostova - Staff Technical Product Manager',
      updatedAt: new Date().toISOString(),
      personalInfo: {
        fullName: 'Elena Rostova',
        jobTitle: 'Staff Technical Product Manager',
        email: 'elena.rostova@horizon.io',
        phone: '(555) 567-8901',
        location: 'New York, NY',
        website: 'elenarostova.pm',
        linkedin: 'linkedin.com/in/elenarostova-pm',
        github: 'github.com/elenarostova'
      },
      summary: 'Product Leader scaling enterprise B2B SaaS platforms, developer-facing APIs, and AI features resulting in $6.5M net-new annual revenue.',
      experience: [
        {
          id: 'exp-elena-1',
          role: 'Senior Product Manager',
          company: 'Horizon SaaS',
          location: 'New York, NY',
          startDate: '2021-02',
          endDate: 'Present',
          current: true,
          highlights: [
            'Spearheaded enterprise API portal launch, boosting 90-day active user retention by 38%.',
            'Directed product discovery across 4 engineering squads with 96% sprint velocity delivery.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-elena-1',
          degree: 'B.S. in Information Systems & Economics',
          institution: 'New York University',
          location: 'New York, NY',
          startDate: '2016',
          endDate: '2020'
        }
      ],
      skills: [
        { id: 'skill-elena-1', category: 'Product Leadership', items: ['Product Strategy', 'A/B Testing', 'SQL', 'Mixpanel', 'Jira', 'OpenAPI'] }
      ],
      projects: [],
      certifications: [],
      customSections: [],
      formatting: {
        template: 'slate',
        fontFamily: 'inter',
        fontSize: 'base',
        accentColor: '#0f172a',
        spacing: 'normal',
        showIcons: true,
        sectionOrder: ['summary', 'experience', 'skills', 'education']
      }
    }
  },
  {
    id: 'david-miller',
    atsScore: '95/100',
    templateId: 'compact',
    templateName: 'Compact Sidebar',
    templateTag: 'Space Saver',
    pageLength: '2-Page',
    fullName: 'David Miller',
    jobTitle: 'Senior Frontend Architect',
    contact: 'david.miller@pixelcraft.dev • (555) 678-9012 • Chicago, IL',
    summary: 'Frontend Architect crafting resilient web applications, micro-frontends, and accessible design systems serving 10M+ monthly users.',
    expTitle: 'Lead Frontend Engineer • Pixel Craft Labs',
    expDates: '2021 – Present',
    expHighlights: [
      'Optimized Core Web Vitals (LCP/INP), improving mobile page load performance by 55%.',
      'Architected cross-app design system component library adopted by 60+ engineers.'
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Web Vitals', 'GraphQL'],
    presetData: {
      id: 'hero-david-miller',
      title: 'David Miller - Senior Frontend Architect',
      updatedAt: new Date().toISOString(),
      personalInfo: {
        fullName: 'David Miller',
        jobTitle: 'Senior Frontend Architect',
        email: 'david.miller@pixelcraft.dev',
        phone: '(555) 678-9012',
        location: 'Chicago, IL',
        website: 'davidmiller.dev',
        linkedin: 'linkedin.com/in/davidmiller-fe',
        github: 'github.com/davidmiller-fe'
      },
      summary: 'Frontend Architect crafting resilient web applications, micro-frontends, and accessible design systems serving 10M+ monthly users.',
      experience: [
        {
          id: 'exp-david-1',
          role: 'Lead Frontend Engineer',
          company: 'Pixel Craft Labs',
          location: 'Chicago, IL',
          startDate: '2021-03',
          endDate: 'Present',
          current: true,
          highlights: [
            'Optimized Core Web Vitals (LCP/INP), improving mobile page load performance by 55%.',
            'Architected cross-app design system component library adopted by 60+ engineers.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-david-1',
          degree: 'B.S. in Software Engineering',
          institution: 'University of Illinois Urbana-Champaign',
          location: 'Urbana, IL',
          startDate: '2015',
          endDate: '2019'
        }
      ],
      skills: [
        { id: 'skill-david-1', category: 'Frontend Tech', items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Web Vitals', 'GraphQL'] }
      ],
      projects: [],
      certifications: [],
      customSections: [],
      formatting: {
        template: 'compact',
        fontFamily: 'inter',
        fontSize: 'base',
        accentColor: '#d97706',
        spacing: 'normal',
        showIcons: true,
        sectionOrder: ['summary', 'experience', 'skills', 'education']
      }
    }
  },
  {
    id: 'amara-okafor',
    atsScore: '98/100',
    templateId: 'modern',
    templateName: 'Modern Clean',
    templateTag: 'Most Popular',
    pageLength: '3-Page',
    fullName: 'Amara Okafor',
    jobTitle: 'Senior Cybersecurity & IAM Engineer',
    contact: 'amara.okafor@cipherguard.sec • (555) 789-0123 • Boston, MA',
    summary: 'Cybersecurity Architect with 7+ years enforcing Zero-Trust IAM security, automated threat detection, and SOC 2 Type II compliance.',
    expTitle: 'Lead Security Engineer • Cipher Guard',
    expDates: '2022 – Present',
    expHighlights: [
      'Deployed Okta & Azure Entra ID federated Zero-Trust IAM across 15,000 corporate users.',
      'Achieved 100% compliance score during ISO 27001 and SOC 2 Type II audit certifications.'
    ],
    skills: ['Cyber Security', 'Zero Trust', 'Okta', 'Python', 'AWS Security', 'CISSP'],
    presetData: {
      id: 'hero-amara-okafor',
      title: 'Amara Okafor - Senior Cybersecurity & IAM Engineer',
      updatedAt: new Date().toISOString(),
      personalInfo: {
        fullName: 'Amara Okafor',
        jobTitle: 'Senior Cybersecurity & IAM Engineer',
        email: 'amara.okafor@cipherguard.sec',
        phone: '(555) 789-0123',
        location: 'Boston, MA',
        website: 'amaraokafor.sec',
        linkedin: 'linkedin.com/in/amaraokafor-sec',
        github: 'github.com/amaraokafor-sec'
      },
      summary: 'Cybersecurity Architect with 7+ years enforcing Zero-Trust IAM security, automated threat detection, and SOC 2 Type II compliance.',
      experience: [
        {
          id: 'exp-amara-1',
          role: 'Lead Security Engineer',
          company: 'Cipher Guard',
          location: 'Boston, MA',
          startDate: '2022-01',
          endDate: 'Present',
          current: true,
          highlights: [
            'Deployed Okta & Azure Entra ID federated Zero-Trust IAM across 15,000 corporate users.',
            'Achieved 100% compliance score during ISO 27001 and SOC 2 Type II audit certifications.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-amara-1',
          degree: 'B.S. in Cybersecurity & Network Architecture',
          institution: 'Northeastern University',
          location: 'Boston, MA',
          startDate: '2015',
          endDate: '2019'
        }
      ],
      skills: [
        { id: 'skill-amara-1', category: 'Security Stack', items: ['Cyber Security', 'Zero Trust', 'Okta', 'Python', 'AWS Security', 'CISSP'] }
      ],
      projects: [],
      certifications: [],
      customSections: [],
      formatting: {
        template: 'modern',
        fontFamily: 'inter',
        fontSize: 'base',
        accentColor: '#0284c7',
        spacing: 'normal',
        showIcons: true,
        sectionOrder: ['summary', 'experience', 'skills', 'education']
      }
    }
  }
];
