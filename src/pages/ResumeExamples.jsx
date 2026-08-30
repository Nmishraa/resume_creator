import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  ArrowRight, 
  Eye, 
  Sparkles, 
  Code, 
  Briefcase, 
  BarChart3, 
  Megaphone, 
  GraduationCap, 
  Palette, 
  ShieldAlert, 
  HeartPulse, 
  DollarSign, 
  Users, 
  Server, 
  X 
} from 'lucide-react';
import { api } from '../utils/api';

const SAMPLE_RESUMES = [
  {
    id: 'sample-software-engineer',
    roleTitle: 'Senior Full Stack Engineer',
    category: 'Software & Engineering',
    level: 'Senior (6+ YOE)',
    badgeColor: '#4f46e5',
    icon: Code,
    summary: 'Senior Full Stack Developer specializing in React, Node.js, and cloud native microservices. Proven track record of scaling high-throughput SaaS web applications.',
    keywords: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL', 'CI/CD'],
    data: {
      personal: {
        name: 'Alex Vance',
        role: 'Senior Full Stack Engineer',
        email: 'alex.vance@devmail.org',
        phone: '+1 (555) 234-5678',
        location: 'Austin, TX (Open to Remote)',
        linkedin: 'linkedin.com/in/alexvance-dev',
        github: 'github.com/alexvance-dev',
        summary: 'Results-driven Senior Full Stack Engineer with 6+ years of experience architecting web applications, reducing API latencies by 45%, and leading engineering teams.'
      },
      experience: [
        {
          id: 'exp-1',
          company: 'CloudPulse Analytics',
          role: 'Senior Software Engineer',
          location: 'Austin, TX',
          startDate: '2022-01',
          endDate: 'Present',
          description: '• Architected a real-time data streaming pipeline using Node.js and PostgreSQL, processing over 2M daily events with 99.99% uptime.\n• Spearheaded frontend migration to Next.js and TypeScript, improving LCP performance by 52% and boosting SEO score to 98.\n• Mentored 5 junior engineers and introduced strict automated CI/CD pipelines reducing deployment bug rate by 35%.'
        },
        {
          id: 'exp-2',
          company: 'Nexus Software Studio',
          role: 'Full Stack Engineer',
          location: 'Dallas, TX',
          startDate: '2019-06',
          endDate: '2021-12',
          description: '• Built multi-tenant dashboard interfaces using React, Redux, and TailwindCSS used by 50,000+ active business customers.\n• Designed REST and GraphQL APIs using Express.js and Prisma, optimizing query execution time by 40%.'
        }
      ],
      education: [
        {
          id: 'edu-1',
          school: 'University of Texas at Austin',
          degree: 'B.S. in Computer Science',
          location: 'Austin, TX',
          startDate: '2015-08',
          endDate: '2019-05',
          description: 'Graduated Magna Cum Laude. President of Computer Science Society.'
        }
      ],
      skills: [
        { id: 's-1', name: 'JavaScript / TypeScript', level: 'Expert' },
        { id: 's-2', name: 'React & Next.js', level: 'Expert' },
        { id: 's-3', name: 'Node.js & Express', level: 'Expert' },
        { id: 's-4', name: 'PostgreSQL & MongoDB', level: 'Advanced' },
        { id: 's-5', name: 'Docker & AWS (EC2, S3)', level: 'Advanced' }
      ]
    }
  },
  {
    id: 'sample-data-scientist',
    roleTitle: 'Senior Data Scientist & AI Specialist',
    category: 'Data & AI',
    level: 'Senior (5+ YOE)',
    badgeColor: '#059669',
    icon: BarChart3,
    summary: 'Data Scientist specializing in Machine Learning models, Predictive Analytics, NLP, and LLM fine-tuning to drive data-informed decision making.',
    keywords: ['Python', 'PyTorch', 'Scikit-Learn', 'SQL', 'LLM Fine-tuning', 'Pandas', 'Spark', 'MLOps'],
    data: {
      personal: {
        name: 'David Chen',
        role: 'Senior Data Scientist & AI Specialist',
        email: 'david.chen@aimail.com',
        phone: '+1 (555) 345-6789',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/davidchen-ds',
        github: 'github.com/davidchen-ds',
        summary: 'Senior Data Scientist with 5+ years of expertise in machine learning, statistical modeling, and LLM integration. Successfully deployed ML models serving 10M+ daily predictions.'
      },
      experience: [
        {
          id: 'exp-ds1',
          company: 'IntelliData AI',
          role: 'Senior Data Scientist',
          location: 'San Francisco, CA',
          startDate: '2022-03',
          endDate: 'Present',
          description: '• Developed recommendation algorithms using PyTorch and Transformer architectures, increasing user engagement time by 34%.\n• Built automated MLOps pipelines on AWS SageMaker, reducing model training deployment lifecycle from 2 weeks to 3 hours.\n• Processed terabyte-scale datasets using PySpark and SQL, delivering predictive churn insights to executive stakeholders.'
        }
      ],
      education: [
        {
          id: 'edu-ds1',
          school: 'UC Berkeley',
          degree: 'M.S. in Data Science & Machine Learning',
          location: 'Berkeley, CA',
          startDate: '2018-09',
          endDate: '2020-05',
          description: 'Published paper on NLP Sentiment Classification at NeurIPS workshop.'
        }
      ],
      skills: [
        { id: 'sds-1', name: 'Python & R', level: 'Expert' },
        { id: 'sds-2', name: 'PyTorch & TensorFlow', level: 'Expert' },
        { id: 'sds-3', name: 'SQL & Data Warehousing (Snowflake)', level: 'Expert' },
        { id: 'sds-4', name: 'MLOps & Docker/Kubernetes', level: 'Advanced' }
      ]
    }
  },
  {
    id: 'sample-product-manager',
    roleTitle: 'Lead Product Manager',
    category: 'Product & Design',
    level: 'Lead (7+ YOE)',
    badgeColor: '#0284c7',
    icon: Briefcase,
    summary: 'Strategic Product Leader with a data-driven approach to product discovery, user growth, and agile roadmap execution across fintech and SaaS verticals.',
    keywords: ['Product Strategy', 'Agile/Scrum', 'Data Analytics', 'A/B Testing', 'User Research', 'SQL', 'Jira'],
    data: {
      personal: {
        name: 'Elena Rostova',
        role: 'Lead Product Manager',
        email: 'elena.rostova@prodmail.io',
        phone: '+1 (555) 876-5432',
        location: 'New York, NY',
        linkedin: 'linkedin.com/in/elenarostova-pm',
        summary: 'Data-driven Lead Product Manager with 7+ years of experience launching zero-to-one SaaS products, growing ARR from $1M to $8M, and scaling cross-functional squads.'
      },
      experience: [
        {
          id: 'exp-pm1',
          company: 'Finnovate Pay',
          role: 'Lead Product Manager',
          location: 'New York, NY',
          startDate: '2021-08',
          endDate: 'Present',
          description: '• Owned the core checkout product line, driving a 28% increase in conversion rate and generating $3.2M incremental annual revenue.\n• Conducted 100+ customer interviews and usability tests to define product roadmap and priority backlog for 3 engineering squads.\n• Initiated A/B testing framework that reduced onboarding friction by 40%.'
        }
      ],
      education: [
        {
          id: 'edu-pm1',
          school: 'New York University (NYU)',
          degree: 'B.S. in Business Administration & Marketing',
          location: 'New York, NY',
          startDate: '2013-09',
          endDate: '2017-05',
          description: 'Honors Student. Minored in Computer Science.'
        }
      ],
      skills: [
        { id: 'spm-1', name: 'Product Discovery & Strategy', level: 'Expert' },
        { id: 'spm-2', name: 'User Metrics & Amplitude/Mixpanel', level: 'Expert' },
        { id: 'spm-3', name: 'Agile Roadmap & Jira/Confluence', level: 'Expert' }
      ]
    }
  },
  {
    id: 'sample-uiux-designer',
    roleTitle: 'Senior UX/UI Product Designer',
    category: 'Product & Design',
    level: 'Senior (5+ YOE)',
    badgeColor: '#ec4899',
    icon: Palette,
    summary: 'Creative Senior UX/UI Designer experienced in user research, wireframing, interactive prototyping, and establishing enterprise design systems in Figma.',
    keywords: ['Figma', 'User Research', 'Design Systems', 'Prototyping', 'Accessibility (WCAG)', 'Wireframing'],
    data: {
      personal: {
        name: 'Maya Lin',
        role: 'Senior UX/UI Product Designer',
        email: 'maya.lin@designstudio.co',
        phone: '+1 (555) 444-9988',
        location: 'Los Angeles, CA',
        linkedin: 'linkedin.com/in/mayalin-ux',
        summary: 'Passionate Senior Product Designer with 5+ years of experience designing intuitive iOS, Android, and web applications. Creator of scalable multi-brand Figma design systems.'
      },
      experience: [
        {
          id: 'exp-ux1',
          company: 'Aura Design Labs',
          role: 'Senior UX/UI Designer',
          location: 'Los Angeles, CA',
          startDate: '2021-09',
          endDate: 'Present',
          description: '• Redesigned mobile banking workflow for 1.2M users, increasing SUS (System Usability Scale) score from 68 to 89.\n• Built an accessible Figma Design System with 200+ tokenized UI components, cutting design-to-development handoff time by 40%.\n• Moderated 40+ qualitative user testing sessions to iterate on high-fidelity prototypes.'
        }
      ],
      education: [
        {
          id: 'edu-ux1',
          school: 'Rhode Island School of Design (RISD)',
          degree: 'B.F.A. in Graphic & Interaction Design',
          location: 'Providence, RI',
          startDate: '2015-09',
          endDate: '2019-05',
          description: 'Focus on Digital Product Design & Human-Computer Interaction.'
        }
      ],
      skills: [
        { id: 'sux-1', name: 'Figma & Prototyping', level: 'Expert' },
        { id: 'sux-2', name: 'Design Systems & Component Libraries', level: 'Expert' },
        { id: 'sux-3', name: 'User Research & Usability Testing', level: 'Expert' }
      ]
    }
  },
  {
    id: 'sample-financial-analyst',
    roleTitle: 'Senior Financial & Business Analyst',
    category: 'Finance & Business',
    level: 'Senior (5+ YOE)',
    badgeColor: '#16a34a',
    icon: DollarSign,
    summary: 'Analytical Financial Manager skilled in corporate FP&A, revenue forecasting, financial modeling, SQL, and Excel VBA for multi-million dollar budgets.',
    keywords: ['FP&A', 'Financial Modeling', 'Excel (VBA/Macros)', 'SQL', 'Tableau', 'Budget Forecasting', 'Valuation'],
    data: {
      personal: {
        name: 'Robert Sterling',
        role: 'Senior Financial & Business Analyst',
        email: 'robert.sterling@finmail.com',
        phone: '+1 (555) 777-3322',
        location: 'Chicago, IL',
        linkedin: 'linkedin.com/in/robertsterling-cfa',
        summary: 'CFA Charterholder and Senior Financial Analyst with 5+ years of experience managing $50M+ operating budgets, building DCF valuation models, and optimizing corporate cash flows.'
      },
      experience: [
        {
          id: 'exp-fa1',
          company: 'Apex Global Capital',
          role: 'Senior Financial Analyst',
          location: 'Chicago, IL',
          startDate: '2021-06',
          endDate: 'Present',
          description: '• Managed annual budgeting and quarterly re-forecasting for $60M business division, achieving 98.5% forecast accuracy.\n• Developed automated Excel VBA financial models and Tableau dashboards, saving 15 hours of monthly reporting effort.\n• Identified $1.4M in operational cost-saving opportunities through variance analysis.'
        }
      ],
      education: [
        {
          id: 'edu-fa1',
          school: 'University of Chicago Booth School of Business',
          degree: 'B.S. in Finance & Economics',
          location: 'Chicago, IL',
          startDate: '2016-09',
          endDate: '2020-05',
          description: 'CFA Charterholder. Beta Gamma Sigma Honor Society.'
        }
      ],
      skills: [
        { id: 'sfa-1', name: 'Financial Modeling & Valuation (DCF)', level: 'Expert' },
        { id: 'sfa-2', name: 'Advanced Excel & VBA Macros', level: 'Expert' },
        { id: 'sfa-3', name: 'SQL & Tableau Analytics', level: 'Advanced' }
      ]
    }
  },
  {
    id: 'sample-devops-architect',
    roleTitle: 'DevOps & Cloud Infrastructure Architect',
    category: 'Software & Engineering',
    level: 'Senior (6+ YOE)',
    badgeColor: '#0284c7',
    icon: Server,
    summary: 'Cloud DevOps Architect proficient in Kubernetes, Terraform, AWS, Docker, and zero-downtime CI/CD deployment automation.',
    keywords: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'CI/CD (GitHub Actions)', 'Ansible', 'Prometheus', 'Linux'],
    data: {
      personal: {
        name: 'Jordan Miller',
        role: 'DevOps & Cloud Infrastructure Architect',
        email: 'jordan.m@cloudops.net',
        phone: '+1 (555) 888-1122',
        location: 'Denver, CO (Remote)',
        linkedin: 'linkedin.com/in/jordanmiller-devops',
        summary: 'AWS Certified Solutions Architect & Senior DevOps Engineer with 6+ years automating high-availability Kubernetes clusters, lowering AWS infrastructure spend by 35%.'
      },
      experience: [
        {
          id: 'exp-dev1',
          company: 'ScaleStack Cloud',
          role: 'Lead DevOps Engineer',
          location: 'Denver, CO',
          startDate: '2021-10',
          endDate: 'Present',
          description: '• Provisioned multi-region AWS EKS Kubernetes clusters via Infrastructure-as-Code (Terraform), supporting 50M daily API calls.\n• Built automated GitOps deployment pipelines with ArgoCD and GitHub Actions, achieving zero-downtime releases.\n• Implemented Prometheus & Grafana monitoring stack, reducing Mean Time to Detection (MTTD) by 60%.'
        }
      ],
      education: [
        {
          id: 'edu-dev1',
          school: 'Colorado State University',
          degree: 'B.S. in Computer Information Systems',
          location: 'Fort Collins, CO',
          startDate: '2015-09',
          endDate: '2019-05',
          description: 'AWS Certified Solutions Architect – Professional.'
        }
      ],
      skills: [
        { id: 'sdev-1', name: 'AWS & Cloud Architecture', level: 'Expert' },
        { id: 'sdev-2', name: 'Kubernetes & Docker', level: 'Expert' },
        { id: 'sdev-3', name: 'Terraform & Infrastructure-as-Code', level: 'Expert' }
      ]
    }
  },
  {
    id: 'sample-cybersecurity-analyst',
    roleTitle: 'Cybersecurity Specialist & Ethical Hacker',
    category: 'Healthcare & Operations',
    level: 'Senior (5+ YOE)',
    badgeColor: '#dc2626',
    icon: ShieldAlert,
    summary: 'Security Engineer expert in penetration testing, threat hunting, SIEM monitoring, vulnerability assessments, and SOC incident response.',
    keywords: ['Penetration Testing', 'SIEM (Splunk)', 'Vulnerability Assessment', 'Python', 'CISSP', 'Network Security'],
    data: {
      personal: {
        name: 'Ethan Vance',
        role: 'Cybersecurity Specialist & Threat Analyst',
        email: 'ethan.vance@secnet.org',
        phone: '+1 (555) 999-4455',
        location: 'Washington, DC',
        linkedin: 'linkedin.com/in/ethanvance-sec',
        summary: 'CISSP-certified Senior Security Engineer with 5+ years safeguarding enterprise infrastructure against advanced persistent threats (APT), mitigating 100+ vulnerabilities.'
      },
      experience: [
        {
          id: 'exp-sec1',
          company: 'CyberShield Systems',
          role: 'Senior Cybersecurity Specialist',
          location: 'Washington, DC',
          startDate: '2021-04',
          endDate: 'Present',
          description: '• Conducted comprehensive penetration tests and vulnerability assessments across cloud applications, patching 40+ critical CVE vulnerabilities.\n• Configured Splunk SIEM alert rules, reducing false-positive security events by 50%.\n• Led Incident Response team during live ransomware threat, isolating breached endpoints within 12 minutes.'
        }
      ],
      education: [
        {
          id: 'edu-sec1',
          school: 'George Mason University',
          degree: 'B.S. in Cybersecurity Engineering',
          location: 'Fairfax, VA',
          startDate: '2016-09',
          endDate: '2020-05',
          description: 'CISSP & CEH (Certified Ethical Hacker) Certified.'
        }
      ],
      skills: [
        { id: 'ssec-1', name: 'Penetration Testing & Burp Suite', level: 'Expert' },
        { id: 'ssec-2', name: 'Splunk SIEM & Threat Detection', level: 'Expert' },
        { id: 'ssec-3', name: 'Network Security & Firewalls', level: 'Expert' }
      ]
    }
  },
  {
    id: 'sample-registered-nurse',
    roleTitle: 'Registered Nurse (BSN, RN)',
    category: 'Healthcare & Operations',
    level: 'Mid-Senior (5+ YOE)',
    badgeColor: '#0284c7',
    icon: HeartPulse,
    summary: 'Compassionate Registered Nurse with extensive experience in ER/ICU patient care, triage assessment, electronic health records (Epic), and clinical team leadership.',
    keywords: ['Patient Care', 'ICU/ER Triage', 'Epic EHR', 'BLS / ACLS', 'Medication Administration', 'Patient Advocacy'],
    data: {
      personal: {
        name: 'Rachel Adams',
        role: 'Registered Nurse (BSN, RN, ACLS)',
        email: 'rachel.adams@healthmail.org',
        phone: '+1 (555) 222-7788',
        location: 'Boston, MA',
        linkedin: 'linkedin.com/in/racheladams-rn',
        summary: 'Dedicated Registered Nurse (BSN) with 5+ years of acute care experience in Level-1 Trauma Emergency Departments. Expert in rapid triage, Epic EHR, and patient advocacy.'
      },
      experience: [
        {
          id: 'exp-rn1',
          company: 'Massachusetts General Hospital',
          role: 'Charge Nurse & Emergency Room RN',
          location: 'Boston, MA',
          startDate: '2020-07',
          endDate: 'Present',
          description: '• Managed acute patient care for 30+ daily ER admissions in high-volume Level-1 Trauma Center.\n• Trained and onboarded 12 new graduate nurses on hospital safety protocols and Epic EHR workflows.\n• Maintained 98% patient satisfaction rating while adhering to strict HIPAA compliance.'
        }
      ],
      education: [
        {
          id: 'edu-rn1',
          school: 'Boston College William F. Connell School of Nursing',
          degree: 'B.S. in Nursing (BSN)',
          location: 'Boston, MA',
          startDate: '2016-09',
          endDate: '2020-05',
          description: 'Registered Nurse (RN) License #RN-987654. Certified ACLS & BLS.'
        }
      ],
      skills: [
        { id: 'srn-1', name: 'Acute Patient Care & Triage', level: 'Expert' },
        { id: 'srn-2', name: 'Epic EHR & Clinical Documentation', level: 'Expert' },
        { id: 'srn-3', name: 'ACLS & BLS Certification', level: 'Expert' }
      ]
    }
  },
  {
    id: 'sample-hr-manager',
    roleTitle: 'Human Resources & Talent Manager',
    category: 'Healthcare & Operations',
    level: 'Senior (6+ YOE)',
    badgeColor: '#8b5cf6',
    icon: Users,
    summary: 'Strategic HR Lead expert in full-lifecycle recruitment, employee relations, onboarding, compensation structures, and HRIS platforms (Workday, BambooHR).',
    keywords: ['Talent Acquisition', 'Workday', 'Employee Engagement', 'HR Policy', 'Performance Reviews', 'Benefits Admin'],
    data: {
      personal: {
        name: 'Jessica Taylor',
        role: 'Human Resources & Talent Manager',
        email: 'jessica.t@hrmail.com',
        phone: '+1 (555) 333-6611',
        location: 'Atlanta, GA',
        linkedin: 'linkedin.com/in/jessicataylor-hr',
        summary: 'SHRM-CP certified Senior HR Manager with 6+ years of experience driving talent acquisition, reducing employee turnover by 24%, and implementing scalable Workday HRIS systems.'
      },
      experience: [
        {
          id: 'exp-hr1',
          company: 'Vanguard Global Corp',
          role: 'Senior Human Resources Manager',
          location: 'Atlanta, GA',
          startDate: '2021-02',
          endDate: 'Present',
          description: '• Led recruitment strategies across engineering and sales, hiring 120+ top-tier candidates in 12 months while reducing time-to-hire by 30%.\n• Managed employee engagement programs, improving annual retention rate by 24%.\n• Administered performance review cycles and compensation benchmarking for 500+ global staff.'
        }
      ],
      education: [
        {
          id: 'edu-hr1',
          school: 'Emory University',
          degree: 'B.A. in Human Resource Management & Psychology',
          location: 'Atlanta, GA',
          startDate: '2014-09',
          endDate: '2018-05',
          description: 'SHRM-CP Certified (Society for Human Resource Management).'
        }
      ],
      skills: [
        { id: 'shr-1', name: 'Talent Acquisition & Recruiting', level: 'Expert' },
        { id: 'shr-2', name: 'Workday & BambooHR HRIS', level: 'Expert' },
        { id: 'shr-3', name: 'Employee Relations & Conflict Resolution', level: 'Expert' }
      ]
    }
  },
  {
    id: 'sample-marketing-specialist',
    roleTitle: 'Growth & Digital Marketing Lead',
    category: 'Marketing & Sales',
    level: 'Mid-Senior (4+ YOE)',
    badgeColor: '#d97706',
    icon: Megaphone,
    summary: 'Results-focused Growth Marketer expert in SEO, Paid Acquisition (Google Ads, Meta), Content Strategy, and Email Automation funnels.',
    keywords: ['SEO', 'Google Ads', 'Meta Ads', 'HubSpot', 'Google Analytics 4', 'Conversion Rate Optimization'],
    data: {
      personal: {
        name: 'Sarah Jenkins',
        role: 'Growth & Digital Marketing Lead',
        email: 'sarah.j@growthmail.com',
        phone: '+1 (555) 654-3210',
        location: 'Chicago, IL',
        linkedin: 'linkedin.com/in/sarahjenkins-marketing',
        summary: 'Data-driven Growth Marketing Manager with 4+ years of experience scaling organic and paid channels, lowering customer acquisition cost (CAC) by 30%.'
      },
      experience: [
        {
          id: 'exp-m1',
          company: 'SaaSify Scale',
          role: 'Growth Marketing Lead',
          location: 'Chicago, IL',
          startDate: '2022-04',
          endDate: 'Present',
          description: '• Managed $500K annual ad spend across Google Ads and LinkedIn Ads, achieving a 3.4x return on ad spend (ROAS).\n• Overhauled organic SEO strategy, driving 150,000+ monthly organic visits and securing top 3 Google rankings for 40+ high-intent keywords.\n• Created automated lead nurturing email workflows in HubSpot, increasing MQL-to-SQL conversion rate by 22%.'
        }
      ],
      education: [
        {
          id: 'edu-m1',
          school: 'Northwestern University',
          degree: 'B.A. in Journalism & Integrated Marketing',
          location: 'Evanston, IL',
          startDate: '2016-09',
          endDate: '2020-05',
          description: 'Summa Cum Laude.'
        }
      ],
      skills: [
        { id: 'sm-1', name: 'SEO & Content Marketing', level: 'Expert' },
        { id: 'sm-2', name: 'Google Ads & Paid Social', level: 'Expert' },
        { id: 'sm-3', name: 'Google Analytics 4 & Data Studio', level: 'Expert' }
      ]
    }
  },
  {
    id: 'sample-student-entry',
    roleTitle: 'Software Engineer (Entry Level / Graduate)',
    category: 'Student & New Grad',
    level: 'Entry-Level (0-2 YOE)',
    badgeColor: '#ec4899',
    icon: GraduationCap,
    summary: 'Recent Computer Science Graduate with strong foundation in algorithms, web development, open-source contributions, and internship experience.',
    keywords: ['JavaScript', 'React', 'Python', 'Git', 'Data Structures', 'REST APIs', 'Unit Testing'],
    data: {
      personal: {
        name: 'Marcus Thorne',
        role: 'Junior Software Engineer',
        email: 'marcus.thorne@college.edu',
        phone: '+1 (555) 987-6543',
        location: 'Seattle, WA',
        linkedin: 'linkedin.com/in/marcusthorne',
        github: 'github.com/marcusthorne-code',
        summary: 'Enthusiastic CS Graduate passionate about web development, clean code architecture, and high-performance applications. Fast learner with hackathon winning project.'
      },
      experience: [
        {
          id: 'exp-s1',
          company: 'InnovateX Labs',
          role: 'Software Engineering Intern',
          location: 'Seattle, WA',
          startDate: '2023-06',
          endDate: '2023-09',
          description: '• Developed responsive UI components in React and TailwindCSS for a customer-facing web platform serving 10,000+ monthly users.\n• Fixed 25+ front-end and back-end bugs reported in Jira, improving system reliability score.\n• Wrote unit and integration tests with Jest, increasing test coverage from 60% to 82%.'
        }
      ],
      education: [
        {
          id: 'edu-s1',
          school: 'University of Washington',
          degree: 'B.S. in Computer Science',
          location: 'Seattle, WA',
          startDate: '2020-09',
          endDate: '2024-05',
          description: 'GPA: 3.85/4.0. Relevant Coursework: Algorithms, Database Systems, Web Development, Software Engineering.'
        }
      ],
      skills: [
        { id: 'ss-1', name: 'JavaScript & HTML5/CSS3', level: 'Advanced' },
        { id: 'ss-2', name: 'React.js & Node.js', level: 'Advanced' },
        { id: 'ss-3', name: 'Python & Git/GitHub', level: 'Intermediate' }
      ]
    }
  }
];

export default function ResumeExamples({ user, onAuthSuccess }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewSample, setPreviewSample] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const categories = [
    'All', 
    'Software & Engineering', 
    'Data & AI', 
    'Product & Design', 
    'Finance & Business', 
    'Marketing & Sales', 
    'Healthcare & Operations', 
    'Student & New Grad'
  ];

  const filteredSamples = selectedCategory === 'All'
    ? SAMPLE_RESUMES
    : SAMPLE_RESUMES.filter((s) => s.category === selectedCategory);

  const handleUseTemplate = async (sample) => {
    setLoadingId(sample.id);
    try {
      let currentUser = user;
      if (!currentUser) {
        const guestRes = await api.auth.guest();
        currentUser = guestRes.user;
        if (onAuthSuccess) onAuthSuccess(currentUser);
      }

      const newResume = await api.resumes.create({
        title: `${sample.roleTitle} (From Template)`,
        data: sample.data
      });

      navigate(`/editor/${newResume.id}`);
    } catch (err) {
      console.error('Failed to create resume from template:', err);
      alert('Failed to clone template. Please try again.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 1.5rem', color: '#1e293b' }}>
      {/* Header Banner */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e0e7ff', color: '#4338ca', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
          <Sparkles size={16} /> Professionally Crafted Examples
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
          ATS-Friendly Resume Templates & Examples
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
          Explore battle-tested resume templates designed across tech, design, data, finance, healthcare, marketing, and entry-level roles. Click any template to customize and export your PDF instantly.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '0.55rem 1.1rem',
              borderRadius: '30px',
              border: selectedCategory === cat ? 'none' : '1px solid #cbd5e1',
              background: selectedCategory === cat ? 'var(--accent, #4f46e5)' : '#ffffff',
              color: selectedCategory === cat ? '#ffffff' : '#475569',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: selectedCategory === cat ? '0 4px 14px rgba(79, 70, 229, 0.3)' : 'none'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        {filteredSamples.map((sample) => {
          const IconComponent = sample.icon;
          return (
            <div
              key={sample.id}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                position: 'relative'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${sample.badgeColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconComponent size={22} color={sample.badgeColor} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: sample.badgeColor, letterSpacing: '0.05em' }}>
                        {sample.category}
                      </span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: '0.2rem 0 0 0' }}>
                        {sample.roleTitle}
                      </h3>
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  {sample.summary}
                </p>

                <div style={{ marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '0.5rem' }}>
                    ATS Keywords Targeted:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {sample.keywords.map((kw) => (
                      <span key={kw} style={{ background: '#f1f5f9', color: '#334155', fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.6rem', borderRadius: '6px' }}>
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                <button
                  onClick={() => setPreviewSample(sample)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#334155',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    cursor: 'pointer'
                  }}
                >
                  <Eye size={16} /> Quick Preview
                </button>

                <button
                  onClick={() => handleUseTemplate(sample)}
                  disabled={loadingId === sample.id}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'var(--accent, #4f46e5)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)'
                  }}
                >
                  {loadingId === sample.id ? 'Loading...' : <>Use Example <ArrowRight size={16} /></>}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Preview */}
      {previewSample && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1.5rem' }}>
          <div style={{ background: '#ffffff', width: '100%', maxWidth: '750px', maxHeight: '90vh', borderRadius: '20px', overflowY: 'auto', padding: '2.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.2)', position: 'relative' }}>
            <button
              onClick={() => setPreviewSample(null)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', border: 'none', background: '#f1f5f9', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={20} color="#475569" />
            </button>

            <div style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>{previewSample.data.personal.name}</h2>
              <p style={{ fontSize: '1.1rem', color: '#4f46e5', fontWeight: 700 }}>{previewSample.data.personal.role}</p>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                {previewSample.data.personal.email} | {previewSample.data.personal.phone} | {previewSample.data.personal.location}
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', color: '#334155', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.3rem', marginBottom: '0.6rem' }}>Professional Summary</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>{previewSample.data.personal.summary}</p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', color: '#334155', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.3rem', marginBottom: '0.8rem' }}>Work Experience</h3>
              {previewSample.data.experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '1.2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.95rem' }}>
                    <span>{exp.role} — <span style={{ color: '#4f46e5' }}>{exp.company}</span></span>
                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '0.88rem', color: '#475569', marginTop: '0.4rem', lineHeight: 1.5 }}>
                    {exp.description}
                  </pre>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', color: '#334155', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.3rem', marginBottom: '0.6rem' }}>Core Skills</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {previewSample.data.skills.map((sk) => (
                  <span key={sk.id} style={{ background: '#e0e7ff', color: '#3730a3', fontSize: '0.8rem', fontWeight: 700, padding: '0.3rem 0.7rem', borderRadius: '6px' }}>
                    {sk.name} ({sk.level})
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                onClick={() => setPreviewSample(null)}
                style={{ padding: '0.7rem 1.4rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 700, cursor: 'pointer' }}
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  const sample = previewSample;
                  setPreviewSample(null);
                  handleUseTemplate(sample);
                }}
                style={{ padding: '0.7rem 1.5rem', borderRadius: '10px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 700, cursor: 'pointer' }}
              >
                Use This Example Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
