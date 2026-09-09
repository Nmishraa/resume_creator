import { ResumeData } from '../types/resume';
import { generateRandomResume } from '../services/aiService';

export interface ResumeExampleItem {
  slug: string;
  roleTitle: string;
  category: string;
  experienceLevel: string;
  metaTitle: string;
  metaDescription: string;
  targetKeyword: string;
  h1: string;
  shortIntro: string;
  summaryExample: string;
  skills: {
    category: string;
    items: string[];
  }[];
  experienceBullets: string[];
  keyAchievements: string[];
  atsKeywords: string[];
  commonMistakes: string[];
  formattingTips: string[];
  pageLength?: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  presetData: Partial<ResumeData>;
}

export const alexMorganData: Partial<ResumeData> = {
  title: 'Alex Morgan - Senior Full-Stack Engineer Resume',
  personalInfo: {
    fullName: 'Alex Morgan',
    jobTitle: 'Senior Full-Stack & Systems Architect',
    email: 'alex.morgan@dev.io',
    phone: '(555) 234-5678',
    location: 'San Francisco, CA',
    website: 'alexmorgan.dev',
    linkedin: 'linkedin.com/in/alexmorgan',
    github: 'github.com/alexmorgan'
  },
  summary: 'Results-driven Senior Full-Stack & Systems Architect with 8+ years of experience building high-throughput microservices, multi-region cloud infrastructures, and high-availability web applications. Spearheaded distributed system architecture handling 5M daily active users with sub-50ms latency. Accomplished speaker, open-source contributor, and engineering director.',
  experience: [
    {
      id: 'exp-alex-1',
      role: 'Principal Systems Architect',
      company: 'Cloud Scale Technologies',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: 'Present',
      current: true,
      highlights: [
        'Architected multi-region Kubernetes clusters across AWS and GCP, achieving 99.999% availability for payment APIs.',
        'Optimized GraphQL API gateway throughput by 42% using React, Node.js, and Redis microservices, serving 15M daily calls.',
        'Managed an annual cloud infrastructure budget of $4.2M, implementing auto-scaling policies that cut compute expenses by $680,000.',
        'Led a team of 14 senior engineers across 3 squads, driving agile release frequency from bi-weekly to 4x daily.'
      ]
    },
    {
      id: 'exp-alex-2',
      role: 'Staff Full-Stack Engineer',
      company: 'Vanguard SaaS Platforms',
      location: 'San Francisco, CA',
      startDate: '2019-06',
      endDate: '2022-02',
      current: false,
      highlights: [
        'Engineered real-time collaboration dashboard in Next.js, WebSockets, and Tailwind CSS, boosting user session time by 35%.',
        'Integrated Stripe Connect billing pipelines and OAuth2 SSO authentication, generating $8.4M in annual recurring revenue.',
        'Refactored legacy monolithic backend into containerized Go microservices, reducing p99 response times from 380ms to 60ms.'
      ]
    },
    {
      id: 'exp-alex-3',
      role: 'Senior Software Engineer',
      company: 'Apex Digital Labs',
      location: 'San Jose, CA',
      startDate: '2017-02',
      endDate: '2019-05',
      current: false,
      highlights: [
        'Built automated CI/CD deployment pipelines using Terraform, Docker, and GitHub Actions, reducing build times by 65%.',
        'Spearheaded ATS-compliant document parsing engine with Gemini LLM embeddings, improving extraction accuracy by 40%.',
        'Authored end-to-end Jest and Cypress testing suites, increasing code coverage from 45% to 92%.'
      ]
    },
    {
      id: 'exp-alex-4',
      role: 'Full-Stack Developer',
      company: 'Nova Interactive',
      location: 'Oakland, CA',
      startDate: '2015-08',
      endDate: '2017-01',
      current: false,
      highlights: [
        'Developed 25+ responsive UI components in React and TypeScript, accelerating team feature velocity by 25%.',
        'Optimized PostgreSQL database queries and indexing strategies, eliminating database CPU bottlenecks during peak traffic.'
      ]
    },
    {
      id: 'exp-alex-5',
      role: 'Systems Engineer & Consultant',
      company: 'Strata Tech Solutions',
      location: 'San Francisco, CA',
      startDate: '2014-01',
      endDate: '2015-07',
      current: false,
      highlights: [
        'Constructed ETL data pipelines in Python processing 400GB daily log data feeds with sub-1% failure rates.',
        'Partnered with enterprise clients to conduct security threat modeling and penetration test remediation.'
      ]
    },
    {
      id: 'exp-alex-6',
      role: 'Junior Developer Intern',
      company: 'PixelCraft Studios',
      location: 'Berkeley, CA',
      startDate: '2013-05',
      endDate: '2013-12',
      current: false,
      highlights: [
        'Created technical documentation and user guides for REST API endpoints.',
        'Resolved 60+ customer-reported bug tickets during initial onboarding phase.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-alex-1',
      degree: 'M.S. in Computer Science (Distributed Systems)',
      institution: 'Stanford University',
      location: 'Stanford, CA',
      startDate: '2015',
      endDate: '2017',
      gpa: '3.94 / 4.0',
      highlights: ['Thesis on High-Throughput Vector Databases and Consensus Protocols']
    },
    {
      id: 'edu-alex-2',
      degree: 'B.S. in Computer Science',
      institution: 'UC Berkeley',
      location: 'Berkeley, CA',
      startDate: '2011',
      endDate: '2015',
      gpa: '3.88 / 4.0',
      highlights: ['Dean’s Honor List (All Semesters)', 'President of ACM Student Chapter']
    }
  ],
  skills: [
    { id: 'sk-alex-1', category: 'Languages & Core', items: ['TypeScript', 'JavaScript (ES6+)', 'Go', 'Python', 'SQL', 'HTML5/CSS3', 'Rust'] },
    { id: 'sk-alex-2', category: 'Frontend & UI', items: ['React', 'Next.js', 'Redux / Zustand', 'Tailwind CSS', 'GraphQL', 'Webpack'] },
    { id: 'sk-alex-3', category: 'Backend & Cloud', items: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'AWS (EKS, S3, Lambda)', 'Docker', 'Kubernetes'] },
    { id: 'sk-alex-4', category: 'DevOps & AI', items: ['Terraform', 'CI/CD Pipelines', 'Kafka', 'Prometheus', 'Grafana', 'LangChain', 'Pinecone'] }
  ],
  projects: [
    {
      id: 'proj-alex-1',
      title: 'High-Throughput Vector Search Engine',
      subtitle: 'Open-Source Distributed Indexer',
      link: 'https://github.com/alexmorgan/vector-search',
      startDate: '2023',
      endDate: '2024',
      technologies: ['Go', 'Pinecone', 'Docker', 'gRPC'],
      highlights: [
        'Engineered semantic search engine handling 10M+ vector embeddings with sub-30ms retrieval latency.',
        'Slashing external LLM API cost overhead by $40,000/year.'
      ]
    },
    {
      id: 'proj-alex-2',
      title: 'Multi-Region Kubernetes Failover Tool',
      subtitle: 'Infrastructure Resilience',
      link: 'https://github.com/alexmorgan/k8s-failover',
      startDate: '2022',
      endDate: '2023',
      technologies: ['Python', 'Kubernetes', 'AWS Route53', 'Terraform'],
      highlights: [
        'Automated cross-region cluster failover achieving zero-downtime SLA during simulated cloud outages.'
      ]
    }
  ],
  certifications: [
    { id: 'cert-alex-1', name: 'AWS Certified Solutions Architect – Professional', issuer: 'Amazon Web Services', date: '2023' },
    { id: 'cert-alex-2', name: 'Certified Kubernetes Administrator (CKA)', issuer: 'CNCF', date: '2022' },
    { id: 'cert-alex-3', name: 'Google Cloud Certified Professional Cloud Architect', issuer: 'Google Cloud', date: '2021' }
  ],
  customSections: [
    {
      id: 'custom-alex-1',
      title: 'Patents & Technical Keynotes',
      items: [
        {
          id: 'custom-item-alex-1',
          title: 'US Patent #11,940,210: Distributed Quantization in Neural Search Engines',
          subtitle: 'Co-Inventor • Granted 2023',
          date: '2023',
          description: 'Architected vector compression algorithm reducing index memory footprint by 55% without precision loss.'
        },
        {
          id: 'custom-item-alex-2',
          title: 'Keynote Speaker: Building Resilient Microservices at Scale',
          subtitle: 'Cloud Native Summit',
          date: '2022',
          description: 'Presented to 1,500+ engineers on automated zero-downtime failover strategies in Kubernetes.'
        }
      ]
    }
  ],
  formatting: {
    template: 'modern',
    fontFamily: 'inter',
    fontSize: 'base',
    spacing: 'normal',
    accentColor: '#0284c7',
    showIcons: true,
    sectionOrder: ['summary', 'experience', 'skills', 'education', 'projects', 'certifications', 'customSections']
  }
};

export const RESUME_EXAMPLES: ResumeExampleItem[] = [
  {
    slug: 'alex-morgan',
    roleTitle: 'Senior Full-Stack Engineer',
    category: 'Engineering & Technology',
    experienceLevel: 'Senior (7+ Years)',
    metaTitle: 'Alex Morgan - Senior Full-Stack Engineer Resume Example | Resume Craft',
    metaDescription: 'Results-driven Senior Full-Stack Engineer resume example.',
    targetKeyword: 'senior full stack engineer resume',
    h1: 'Alex Morgan - Senior Full-Stack Engineer Resume',
    shortIntro: 'Results-driven engineer with 7+ years of experience building high-throughput microservices.',
    summaryExample: 'Results-driven engineer with 7+ years of experience building high-throughput microservices. Spearheaded system architecture handling 5M daily active users.',
    skills: [
      { category: 'Core Stack', items: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'] }
    ],
    experienceBullets: [
      'Architected multi-region Kubernetes clusters, reducing downtime by 99.9%.',
      'Optimized API gateway throughput by 42% using React & Node.js microservices.'
    ],
    keyAchievements: ['Reduced downtime by 99.9%'],
    atsKeywords: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes'],
    commonMistakes: [],
    formattingTips: [],
    pageLength: '3 Pages',
    faqs: [],
    presetData: alexMorganData
  },
  {
    slug: 'ai-engineer',
    roleTitle: 'AI Engineer',
    category: 'Engineering & Technology',
    experienceLevel: 'Mid-Senior (4-7 Years)',
    metaTitle: 'AI Engineer Resume Example & ATS Keywords (2026 Guide) | Resume Craft',
    metaDescription: 'Complete AI Engineer resume example with ATS-friendly bullet points, Google X-Y-Z formulas, LLM/PyTorch skills, and 1-click builder template.',
    targetKeyword: 'AI engineer resume',
    h1: 'AI Engineer Resume Example & ATS Optimization Guide',
    shortIntro: 'A high-impact, ATS-optimized AI Engineer resume sample demonstrating expertise in LLM fine-tuning, RAG pipelines, PyTorch/TensorFlow, and production machine learning microservices.',
    summaryExample: 'Innovative AI & Machine Learning Engineer with 5+ years of experience designing and deploying scalable deep learning architectures, LLM fine-tuning pipelines, and production RAG microservices. Proven track record reducing inference latency by 45% on GPU clusters and elevating model evaluation accuracy across 5M+ daily user interactions.',
    skills: [
      { category: 'AI & ML Frameworks', items: ['PyTorch', 'TensorFlow', 'Hugging Face', 'LangChain', 'LlamaIndex', 'scikit-learn'] },
      { category: 'LLM & NLP Technologies', items: ['RAG Architectures', 'Vector Databases (Pinecone, Milvus)', 'LoRA / QLoRA', 'Transformer Models', 'OpenAI API', 'Embedding Fine-Tuning'] },
      { category: 'Engineering & Cloud', items: ['Python', 'TypeScript', 'Docker', 'Kubernetes', 'AWS SageMaker', 'GCP Vertex AI', 'CI/CD Pipelines'] }
    ],
    experienceBullets: [
      'Architected and deployed a multi-stage Retrieval-Augmented Generation (RAG) agent pipeline utilizing LangChain, Pinecone, and GPT-4o, decreasing query hallucination rates by 64% across 800k monthly requests.',
      'Fine-tuned open-source LLaMA 3 70B models using LoRA/QLoRA on proprietary domain datasets, elevating domain response accuracy from 71% to 92.4%.',
      'Optimized model inference latency with TensorRT-LLM and vLLM on NVIDIA H100 clusters, cutting p95 response time from 1.8s to 240ms while reducing GPU compute expenses by $22,000/month.',
      'Built automated CI/CD evaluation pipelines measuring BLEU, ROUGE, and cosine similarity scores to prevent regression prior to production releases.'
    ],
    keyAchievements: [
      'Reduced GPU infrastructure cost by 38% through vLLM batching and dynamic quantization.',
      'Published 2 peer-reviewed workshop papers on parameter-efficient fine-tuning (PEFT).',
      'Maintained 99.95% API uptime for enterprise AI assistant serving 1.4M active users.'
    ],
    atsKeywords: ['PyTorch', 'Large Language Models (LLMs)', 'RAG Pipelines', 'Vector Databases', 'Prompt Engineering', 'LangChain', 'Docker', 'GPU Optimization', 'Fine-Tuning', 'MLOps'],
    commonMistakes: [
      'Listing academic courses rather than business impact and measurable metrics.',
      'Omitting specific model evaluation metrics (e.g., latency, F1-score, cost reduction).',
      'Using graphical progress bars or multi-column layouts that break ATS parsers like Taleo and Workday.'
    ],
    formattingTips: [
      'Use a clean, single-column chronological structure.',
      'Group technical competencies into clear categories (Frameworks, Languages, Cloud).',
      'Structure every bullet point using the Google X-Y-Z formula: Accomplished [X] as measured by [Y], by doing [Z].'
    ],
    pageLength: '2 Pages',
    faqs: [
      {
        question: 'What is the most important section on an AI Engineer resume?',
        answer: 'The Work Experience section with measurable achievements (latency reduction, accuracy gains, infrastructure savings) is paramount, followed by a well-categorized Skills section matching the job description.'
      },
      {
        question: 'Should I include personal AI projects on my resume?',
        answer: 'Yes! If you have built open-source tools, Kaggle competition solutions, or production web apps with LLMs, include them under a dedicated "Projects" section with GitHub links.'
      }
    ],
    presetData: generateRandomResume(2, 'Senior AI Engineer', 'tech')
  },
  {
    slug: 'software-engineer',
    roleTitle: 'Software Engineer',
    category: 'Engineering & Technology',
    experienceLevel: 'Mid-Level (3-6 Years)',
    metaTitle: 'Software Engineer Resume Example & ATS Template (2026) | Resume Craft',
    metaDescription: 'ATS-tested Software Engineer resume example with high-impact bullets, React/Node/AWS skill lists, Google X-Y-Z formula, and free vector PDF export.',
    targetKeyword: 'software engineer resume',
    h1: 'Software Engineer Resume Example & ATS Guide',
    shortIntro: 'A proven Software Engineer resume sample highlighting full-stack engineering, cloud microservices, API performance, and automated testing.',
    summaryExample: 'Full-Stack Software Engineer with 4+ years of expertise architecting high-availability distributed systems, responsive React applications, and secure REST/GraphQL APIs. Proven record improving application response times by 40% and deploying mission-critical microservices serving 2M+ active users.',
    skills: [
      { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux Toolkit', 'HTML5/CSS3'] },
      { category: 'Backend & Systems', items: ['Node.js', 'Go', 'Python', 'PostgreSQL', 'Redis', 'GraphQL', 'RESTful APIs'] },
      { category: 'DevOps & Cloud', items: ['AWS (ECS, S3, Lambda)', 'Docker', 'CI/CD (GitHub Actions)', 'Terraform', 'Jest', 'Postman'] }
    ],
    experienceBullets: [
      'Architected and delivered customer-facing dashboard in React and TypeScript, boosting user session duration by 35% and supporting 1.2M daily active users.',
      'Optimized backend PostgreSQL indexing and Redis caching layer, decreasing p99 API latency from 420ms to 85ms across 12M daily requests.',
      'Led migration of monolithic services to Dockerized microservices on AWS ECS, improving infrastructure fault tolerance and enabling 99.99% service availability.',
      'Authored automated Jest and Cypress unit and integration test suites, expanding test coverage from 42% to 89% and cutting production regression bugs by 65%.'
    ],
    keyAchievements: [
      'Reduced cloud infrastructure costs by 28% through AWS Lambda event-driven decoupling.',
      'Promoted from Associate to Senior Software Engineer within 2.5 years due to exceptional technical leadership.'
    ],
    atsKeywords: ['TypeScript', 'React', 'Node.js', 'Microservices', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'CI/CD', 'Unit Testing', 'REST API'],
    commonMistakes: [
      'Writing passive job descriptions (e.g. "Responsible for bug fixes") instead of quantifiable achievements.',
      'Leaving out technical stack details used for each project or employment period.',
      'Using double-column designs that scramble job history when parsed by Greenhouse or Workday.'
    ],
    formattingTips: [
      'Maintain standard heading labels (Experience, Education, Skills, Projects).',
      'Format dates consistently as YYYY-MM or Month YYYY.',
      'Keep resume to 1-2 pages maximum with clear bullet margins.'
    ],
    pageLength: '2 Pages',
    faqs: [
      {
        question: 'How many bullet points should I have per software engineering role?',
        answer: 'Aim for 3 to 5 strong bullets per recent role, focusing on technical architecture, quantifiable performance metrics, and business outcome.'
      }
    ],
    presetData: generateRandomResume(2, 'Full-Stack Software Engineer', 'modern')
  },
  {
    slug: 'data-scientist',
    roleTitle: 'Data Scientist',
    category: 'Data & Analytics',
    experienceLevel: 'Mid-Senior (3-6 Years)',
    metaTitle: 'Data Scientist Resume Example & ATS Guide | Resume Craft',
    metaDescription: 'ATS-compliant Data Scientist resume example featuring machine learning, predictive modeling, statistical analysis, and Python/SQL skills.',
    targetKeyword: 'data scientist resume',
    h1: 'Data Scientist Resume Example & ATS Keywords',
    shortIntro: 'Showcase predictive modeling, A/B testing, statistical inference, and machine learning pipelines with this recruiter-vetted Data Scientist resume sample.',
    summaryExample: 'Data Scientist with 4+ years of experience transforming complex multi-terabyte datasets into predictive machine learning models and actionable executive insights. Expert in Python, SQL, predictive modeling, and causal inference, driving an estimated $3.2M in annual revenue uplift through churn reduction algorithms.',
    skills: [
      { category: 'Data Science & ML', items: ['Predictive Modeling', 'XGBoost', 'scikit-learn', 'Time Series Forecasting', 'A/B Testing', 'Causal Inference'] },
      { category: 'Languages & Tools', items: ['Python (pandas, numpy, scipy)', 'SQL (Snowflake, BigQuery)', 'R', 'Apache Spark', 'Git'] },
      { category: 'Visualization & BI', items: ['Tableau', 'Power BI', 'Looker', 'Matplotlib', 'Seaborn'] }
    ],
    experienceBullets: [
      'Developed customer churn prediction algorithm using XGBoost and SHAP explainability on 4M+ user records, improving retention by 14% and saving $1.8M annually.',
      'Designed and analyzed 40+ rigorous A/B experiments on recommendation algorithms, generating a 6.2% lift in conversion rates and $1.4M incremental revenue.',
      'Built automated data processing pipelines with Apache Spark and Snowflake, decreasing data transformation latency by 60%.'
    ],
    keyAchievements: [
      'Delivered predictive pricing model that increased quarterly gross margins by 4.8%.',
      'Presented findings directly to C-suite leadership to guide product expansion roadmap.'
    ],
    atsKeywords: ['Machine Learning', 'Python', 'SQL', 'Predictive Modeling', 'A/B Testing', 'Snowflake', 'BigQuery', 'XGBoost', 'Tableau', 'Feature Engineering'],
    commonMistakes: [
      'Focusing exclusively on model accuracy metrics without explaining commercial value.',
      'Omitting experimental design and statistical testing methodology.',
      'Leaving SQL out of top technical skills.'
    ],
    formattingTips: [
      'Highlight specific business impacts (revenue saved, churn reduced, conversion lift).',
      'Group technical tools into Data Science, Programming, and Visualization categories.'
    ],
    pageLength: '3 Pages',
    faqs: [
      {
        question: 'Should a Data Scientist resume include GitHub or Kaggle profiles?',
        answer: 'Yes, adding links to public notebooks, repositories, or Kaggle achievements establishes strong technical credibility.'
      }
    ],
    presetData: generateRandomResume(3, 'Senior Data Scientist', 'slate')
  },
  {
    slug: 'data-analyst',
    roleTitle: 'Data Analyst',
    category: 'Data & Analytics',
    experienceLevel: 'Entry-Mid (2-4 Years)',
    metaTitle: 'Data Analyst Resume Example & ATS Skills Guide | Resume Craft',
    metaDescription: 'Professional Data Analyst resume sample featuring SQL query optimization, Power BI / Tableau dashboards, KPI tracking, and free PDF export.',
    targetKeyword: 'data analyst resume',
    h1: 'Data Analyst Resume Example & ATS Keywords',
    shortIntro: 'Craft an ATS-optimized Data Analyst resume with targeted SQL, Tableau/Power BI, Excel, and business reporting metrics.',
    summaryExample: 'Detail-oriented Data Analyst with 3+ years of experience analyzing business metrics, optimizing complex SQL queries, and designing interactive Power BI dashboards for executive decision-making. Proven ability reducing monthly reporting overhead by 20 hours through automation.',
    skills: [
      { category: 'Data Analysis & Querying', items: ['Advanced SQL (Joins, CTEs, Window Functions)', 'Python (pandas)', 'Excel (VLOOKUP, Pivot Tables, VBA)', 'ETL Pipelines'] },
      { category: 'Visualization & BI', items: ['Power BI', 'Tableau', 'Looker Studio', 'DAX', 'Data Storytelling'] }
    ],
    experienceBullets: [
      'Designed and automated 12+ real-time enterprise Power BI dashboards tracking $45M in annual sales, eliminating 15 hours of manual weekly reporting.',
      'Wrote and optimized complex SQL queries across 10M+ transaction rows, cutting report generation runtime by 55%.',
      'Collaborated with marketing and product teams to analyze user journey drop-offs, identifying bottlenecks that boosted checkout conversion by 8.4%.'
    ],
    keyAchievements: [
      'Recognized with Department Excellence Award for automating quarterly financial reporting.',
      'Identified $240,000 in inventory discrepancy losses using exploratory data analysis.'
    ],
    atsKeywords: ['SQL', 'Power BI', 'Tableau', 'Excel', 'Data Visualization', 'ETL', 'Dashboarding', 'KPI Reporting', 'Business Intelligence', 'Data Analysis'],
    commonMistakes: [
      'Listing generic skills without naming specific tools (e.g. saying "analytics" instead of "Power BI / DAX").',
      'Omitting the scale of data worked on (e.g., number of rows, tables, or database systems).'
    ],
    formattingTips: [
      'Quantify results in hours saved, revenue uplift, or report performance improvement.',
      'Keep formatting clean with uniform bullet points.'
    ],
    pageLength: '1 Page',
    faqs: [
      {
        question: 'Should I list Excel formulas on my Data Analyst resume?',
        answer: 'Yes, mentioning Advanced Excel (Pivot Tables, XLOOKUP, Power Query, Macros) shows hands-on data manipulation capabilities.'
      }
    ],
    presetData: generateRandomResume(1, 'Business & Data Analyst', 'compact')
  },
  {
    slug: 'business-analyst',
    roleTitle: 'Business Analyst',
    category: 'Business & Operations',
    experienceLevel: 'Mid-Senior (4-7 Years)',
    metaTitle: 'Business Analyst Resume Example & ATS Guide | Resume Craft',
    metaDescription: 'ATS-friendly Business Analyst resume example with requirements gathering, Agile/Scrum, process mapping, and stakeholder management highlights.',
    targetKeyword: 'business analyst resume',
    h1: 'Business Analyst Resume Example & ATS Guide',
    shortIntro: 'Demonstrate your ability to bridge business requirements, Agile workflows, data analysis, and process optimization with this ATS-tested resume.',
    summaryExample: 'Strategic Business Analyst with 5+ years of experience leading cross-functional digital transformations, eliciting stakeholder requirements, and streamlining enterprise workflows. Proven track record reducing operational expenses by $650,000 through automated CRM process optimization.',
    skills: [
      { category: 'Methodologies & Frameworks', items: ['Agile / Scrum', 'BRD & FRD Documentation', 'Process Mapping (BPMN)', 'User Stories & Acceptance Criteria', 'Gap Analysis'] },
      { category: 'Tools & Systems', items: ['Jira', 'Confluence', 'SQL', 'Visio', 'Salesforce CRM', 'Tableau'] }
    ],
    experienceBullets: [
      'Authored 45+ comprehensive Business Requirement Documents (BRDs) and user stories, achieving 98% first-pass acceptance across 6 agile release trains.',
      'Facilitated weekly backlog grooming and sprint planning sessions for engineering teams of 12+ developers, increasing sprint velocity by 22%.',
      'Conducted end-to-end gap analysis and mapped legacy workflow processes, identifying redundancies that reduced operational turnaround time by 30%.'
    ],
    keyAchievements: [
      'Led $2.1M CRM migration project completed 3 weeks ahead of schedule.',
      'Certified Scrum Master (CSM) and CBAP professional.'
    ],
    atsKeywords: ['Business Requirements', 'BRD', 'Agile', 'Scrum', 'User Stories', 'Process Mapping', 'Jira', 'Stakeholder Management', 'Gap Analysis', 'SQL'],
    commonMistakes: [
      'Focusing on administrative tasks instead of process improvement and financial impact.',
      'Omitting standard documentation acronyms (BRD, FRD, BPMN, UAT).'
    ],
    formattingTips: [
      'Emphasize collaboration between engineering, QA, and business leadership.',
      'Include certifications prominently in a dedicated section.'
    ],
    pageLength: '2 Pages',
    faqs: [
      {
        question: 'Should I list Agile ceremonies on a Business Analyst resume?',
        answer: 'Yes, mentioning sprint planning, user story drafting, backlog grooming, and UAT demonstrates proven Agile project readiness.'
      }
    ],
    presetData: generateRandomResume(2, 'Senior Business Analyst', 'executive')
  },
  {
    slug: 'project-manager',
    roleTitle: 'Project Manager',
    category: 'Management & Operations',
    experienceLevel: 'Senior (5-8+ Years)',
    metaTitle: 'Project Manager Resume Example & PMP Keywords | Resume Craft',
    metaDescription: 'ATS-optimized Project Manager resume example with budget management, Agile delivery, risk mitigation, and PMP certification highlights.',
    targetKeyword: 'project manager resume',
    h1: 'Project Manager Resume Example & ATS Guide',
    shortIntro: 'Highlight your project delivery track record, cross-functional leadership, budget governance, and risk mitigation with this ATS-friendly resume.',
    summaryExample: 'PMP-certified Senior Project Manager with 7+ years of experience orchestrating multimillion-dollar enterprise software implementations and infrastructure modernizations. Proven track record managing cross-functional teams of 25+, maintaining 98% on-time and within-budget delivery across a $12M portfolio.',
    skills: [
      { category: 'Project Governance', items: ['Budget Management ($10M+)', 'Risk Assessment & Mitigation', 'Resource Allocation', 'Scope Governance', 'Vendor Negotiations'] },
      { category: 'Tools & Methodologies', items: ['PMP / PMI Standards', 'Agile / Scrum / Kanban', 'Jira / Asana / MS Project', 'Stakeholder Communication'] }
    ],
    experienceBullets: [
      'Delivered 8 concurrent cloud migration projects totaling $6.5M on time and 7% under budget across 18 months.',
      'Managed cross-functional team of 24 software developers, QA engineers, and UX designers, boosting sprint velocity by 28%.',
      'Instituted proactive risk management framework that averted 14 critical delivery delays and saved an estimated $320,000 in overtime costs.'
    ],
    keyAchievements: [
      'PMP & PMI-ACP certified with zero budget overruns across 5 years.',
      'Received Company Impact Award for orchestrating seamless enterprise ERP transition.'
    ],
    atsKeywords: ['Project Management', 'PMP', 'Budget Management', 'Agile', 'Risk Mitigation', 'Scope Management', 'Stakeholder Communication', 'Resource Planning', 'Jira', 'MS Project'],
    commonMistakes: [
      'Omitting portfolio budget numbers or team sizes.',
      'Listing daily meeting coordination instead of high-level strategic governance.'
    ],
    formattingTips: [
      'Place PMP, CSM, or Prince2 credentials directly in the header or summary.',
      'Quantify budgets and project delivery timelines clearly.'
    ],
    pageLength: '3 Pages',
    faqs: [
      {
        question: 'Should I highlight budget size on a Project Manager resume?',
        answer: 'Yes! Specifying budget scale (e.g. $5M-$15M) proves your capacity to handle significant fiscal responsibility.'
      }
    ],
    presetData: generateRandomResume(3, 'Senior Technical Project Manager (PMP)', 'executive')
  },
  {
    slug: 'customer-service',
    roleTitle: 'Customer Service Representative',
    category: 'Customer Support & Sales',
    experienceLevel: 'Entry-Mid (1-3 Years)',
    metaTitle: 'Customer Service Resume Example & ATS Skills | Resume Craft',
    metaDescription: 'ATS-friendly Customer Service resume sample with CSAT score metrics, Zendesk/Salesforce tools, dispute resolution, and 1-click builder export.',
    targetKeyword: 'customer service resume',
    h1: 'Customer Service Resume Example & ATS Keywords',
    shortIntro: 'Showcase communication skills, issue resolution speed, CSAT scores, and CRM ticketing proficiency with this optimized resume.',
    summaryExample: 'Customer-focused Support Specialist with 3+ years of experience in high-volume omnichannel support environments. Maintained a 98.4% Customer Satisfaction (CSAT) rating while resolving 70+ tickets daily across Zendesk, live chat, and phone channels.',
    skills: [
      { category: 'Customer Support Tools', items: ['Zendesk', 'Salesforce Service Cloud', 'Intercom', 'Freshdesk', 'Jira Service Management'] },
      { category: 'Core Competencies', items: ['Conflict Resolution', 'Omnichannel Support', 'CSAT & NPS Optimization', 'Billing Inquiries', 'De-escalation'] }
    ],
    experienceBullets: [
      'Resolved an average of 75+ customer inquiries daily across email, chat, and phone with a 98.4% CSAT rating, exceeding team benchmark by 6%.',
      'Reduced average first-response time (FRT) from 4.5 minutes to 1.8 minutes by developing 20+ reusable knowledge base macros in Zendesk.',
      'Handled high-priority escalated customer disputes calmly, successfully retaining 92% of at-risk subscription accounts.'
    ],
    keyAchievements: [
      'Awarded Customer Support Representative of the Quarter two consecutive times.',
      'Authored 15 help-center articles that reduced inbound billing support tickets by 18%.'
    ],
    atsKeywords: ['Customer Service', 'CSAT', 'Zendesk', 'Intercom', 'Conflict Resolution', 'Ticketing Systems', 'First Response Time', 'De-escalation', 'CRM', 'NPS'],
    commonMistakes: [
      'Failing to mention ticket volume or satisfaction scores.',
      'Only listing soft skills without naming specific ticketing software.'
    ],
    formattingTips: [
      'Quantify your daily or weekly ticket volume.',
      'Highlight software proficiency clearly.'
    ],
    pageLength: '1 Page',
    faqs: [
      {
        question: 'What metrics should I put on a Customer Service resume?',
        answer: 'CSAT (Customer Satisfaction), FRT (First Response Time), FCR (First Contact Resolution), and daily ticket volumes are the top metrics hiring managers look for.'
      }
    ],
    presetData: generateRandomResume(1, 'Customer Experience Specialist', 'modern')
  },
  {
    slug: 'teacher',
    roleTitle: 'Teacher / Educator',
    category: 'Education',
    experienceLevel: 'Mid-Level (3-6 Years)',
    metaTitle: 'Teacher Resume Example & ATS Education Keywords | Resume Craft',
    metaDescription: 'ATS-optimized Teacher resume sample with curriculum design, differentiated instruction, student engagement, and state certifications.',
    targetKeyword: 'teacher resume',
    h1: 'Teacher Resume Example & ATS Education Guide',
    shortIntro: 'Highlight lesson planning, classroom management, standardized testing improvements, and differentiated learning with this ATS-compliant teacher resume.',
    summaryExample: 'State-certified Secondary Educator with 5+ years of experience developing interactive STEM curricula, implementing differentiated instruction, and integrating educational technology. Elevated standardized science test scores by 18% across 140+ diverse students.',
    skills: [
      { category: 'Instruction & Pedagogy', items: ['Differentiated Instruction', 'Curriculum Development', 'Classroom Management', 'STEM Integration', 'IEP & 504 Plan Compliance'] },
      { category: 'EdTech & Assessment', items: ['Google Classroom', 'Canvas LMS', 'Formative Assessment', 'Parent-Teacher Communication', 'Data-Driven Instruction'] }
    ],
    experienceBullets: [
      'Developed and executed comprehensive STEM curriculum for 140+ 8th-grade students, boosting state science benchmark scores by 18% year-over-year.',
      'Adapted daily instructional strategies for 22 students with Individualized Education Programs (IEPs) and 504 plans, achieving 100% grade-level competency.',
      'Integrated Google Classroom and interactive digital simulations, increasing daily student engagement and assignment completion by 24%.'
    ],
    keyAchievements: [
      'Nominated for District Teacher of the Year (2024).',
      'Secured $15,000 classroom grant for hands-on robotics and coding equipment.'
    ],
    atsKeywords: ['Curriculum Development', 'Differentiated Instruction', 'Classroom Management', 'IEP', '504 Plans', 'STEM', 'Lesson Planning', 'Google Classroom', 'Student Assessment'],
    commonMistakes: [
      'Listing duties instead of student growth and performance achievements.',
      'Omitting state teaching licenses and certifications.'
    ],
    formattingTips: [
      'Place state teaching certification details prominently near the top of the resume.',
      'Quantify student cohort sizes and test score improvements.'
    ],
    pageLength: '1 Page',
    faqs: [
      {
        question: 'Where should I place teaching certifications on my resume?',
        answer: 'Place your State Teaching License, endorsements, and CPR/First Aid certifications in a dedicated section above or alongside your Education.'
      }
    ],
    presetData: generateRandomResume(1, 'Certified STEM Educator', 'slate')
  },
  {
    slug: 'nurse',
    roleTitle: 'Registered Nurse (RN)',
    category: 'Healthcare',
    experienceLevel: 'Mid-Level (3-5 Years)',
    metaTitle: 'Registered Nurse (RN) Resume Example & ATS Guide | Resume Craft',
    metaDescription: 'ATS-tested Registered Nurse resume example with patient assessment, medication administration, BLS/ACLS certifications, and EHR systems.',
    targetKeyword: 'nurse resume',
    h1: 'Registered Nurse (RN) Resume Example & ATS Guide',
    shortIntro: 'Highlight clinical competencies, acute patient care, medication administration, and patient advocacy with this ATS-friendly RN resume.',
    summaryExample: 'Compassionate Registered Nurse (RN, BSN) with 4+ years of acute care and medical-surgical experience in fast-paced 40-bed hospital units. Proficient in Epic EHR, IV therapy, telemetry monitoring, and code response, maintaining a 99.2% medication administration safety score.',
    skills: [
      { category: 'Clinical Competencies', items: ['Acute Patient Assessment', 'Medication Administration (IV/IM/PO)', 'Telemetry Monitoring', 'Wound Care & Sterile Dressing', 'Triage & Code Response'] },
      { category: 'Healthcare Systems & Certifications', items: ['Epic EHR / Cerner', 'BLS / ACLS Certified', 'HIPAA Compliance', 'Patient & Family Education'] }
    ],
    experienceBullets: [
      'Delivered comprehensive nursing care for 5-6 acute med-surg patients per shift, achieving 99.2% medication administration compliance without safety incidents.',
      'Documented patient vitals, care plans, and physician orders meticulously in Epic EHR, maintaining 100% regulatory and HIPAA compliance.',
      'Precepted and mentored 6 newly licensed graduate nurses during clinical onboarding, reducing clinical transition orientation errors by 30%.'
    ],
    keyAchievements: [
      'Daisy Award Nominee for Exceptional Clinical Compassion.',
      'Maintained active ACLS, BLS, and PALS certifications with zero lapses.'
    ],
    atsKeywords: ['Registered Nurse', 'RN', 'BLS', 'ACLS', 'Epic EHR', 'Patient Assessment', 'Medication Administration', 'Acute Care', 'Telemetry', 'HIPAA'],
    commonMistakes: [
      'Forgetting license numbers, state jurisdiction, and expiration dates.',
      'Omitting specific EHR platforms used (Epic, Cerner, Meditech).'
    ],
    formattingTips: [
      'List Licenses & Certifications right after the professional summary.',
      'Specify unit type (ICU, Med-Surg, ER, PACU) and nurse-to-patient ratios.'
    ],
    pageLength: '2 Pages',
    faqs: [
      {
        question: 'Should I include my nurse-to-patient ratio on my resume?',
        answer: 'Yes! Nurse managers specifically look for shift patient ratios (e.g. 1:5 in Med-Surg or 1:2 in ICU) to gauge workload capability.'
      }
    ],
    presetData: generateRandomResume(2, 'Registered Nurse (Med-Surg / Acute Care)', 'compact')
  },
  {
    slug: 'college-student',
    roleTitle: 'College Student',
    category: 'Students & Entry-Level',
    experienceLevel: 'Entry-Level / Student',
    metaTitle: 'College Student Resume Example & Free ATS Builder | Resume Craft',
    metaDescription: 'ATS-friendly College Student resume sample highlighting relevant coursework, university projects, internships, leadership, and high GPA.',
    targetKeyword: 'college student resume',
    h1: 'College Student Resume Example & ATS Guide',
    shortIntro: 'Build a strong college student resume that turns coursework, academic projects, club leadership, and part-time jobs into compelling employer value.',
    summaryExample: 'Driven Computer Science & Business sophomore at University of Michigan with a 3.84 GPA, possessing strong foundational knowledge in Python, SQL, and financial modeling. Seeking a summer 2026 software engineering internship to contribute clean code and analytical problem-solving.',
    skills: [
      { category: 'Technical Foundation', items: ['Python', 'Java', 'SQL', 'Git / GitHub', 'HTML & CSS', 'Data Structures'] },
      { category: 'Academic Competencies', items: ['Object-Oriented Programming', 'Algorithm Design', 'Statistical Analysis', 'Team Collaboration'] }
    ],
    experienceBullets: [
      'Built a full-stack campus marketplace web application in React and Firebase as lead developer for a 4-person capstone project, used by 600+ students.',
      'Served as Vice President of University ACM Student Chapter, organizing 8 technical coding workshops with 350+ total student attendees.',
      'Tutored 30+ underclassmen in Data Structures and Object-Oriented Programming, helping 85% of students achieve an A or B grade.'
    ],
    keyAchievements: [
      'Dean’s List recipient for 4 consecutive academic semesters.',
      '1st Place Winner at University Hackathon (2025) out of 60 competing teams.'
    ],
    atsKeywords: ['College Student', 'Internship', 'Academic Projects', 'Coursework', 'Python', 'Java', 'SQL', 'Git', 'Leadership', 'Hackathon'],
    commonMistakes: [
      'Including high school achievements after freshman year of college.',
      'Leaving off GitHub or portfolio links for software / design roles.'
    ],
    formattingTips: [
      'Place Education and GPA (if >= 3.5) near the top of the resume.',
      'Create a dedicated "Academic Projects" section to demonstrate hands-on skills.'
    ],
    pageLength: '1 Page',
    faqs: [
      {
        question: 'Should I include my GPA on a student resume?',
        answer: 'Include your GPA if it is 3.5 or higher. If lower, focus on relevant coursework, technical skills, and projects instead.'
      }
    ],
    presetData: generateRandomResume(1, 'Computer Science Undergraduate', 'tech')
  },
  {
    slug: 'internship',
    roleTitle: 'Internship Applicant',
    category: 'Students & Entry-Level',
    experienceLevel: 'Student / Internship',
    metaTitle: 'Internship Resume Example & ATS Tips (2026) | Resume Craft',
    metaDescription: 'Standout Internship resume example for university students and career switchers. Learn how to highlight projects, coursework, and transferable skills.',
    targetKeyword: 'internship resume',
    h1: 'Internship Resume Example & Guide',
    shortIntro: 'Land your dream summer internship with an ATS-optimized resume format designed specifically for candidates with limited corporate tenure.',
    summaryExample: 'Eager and analytical third-year student with proven hands-on project experience in web development, data analysis, and cross-functional team projects. Seeking an internship opportunity to apply strong programming skills and rapid learning agility to real-world corporate initiatives.',
    skills: [
      { category: 'Core Skills', items: ['Project Collaboration', 'Analytical Problem Solving', 'Version Control (Git)', 'Technical Writing', 'Time Management'] },
      { category: 'Technical Tools', items: ['Python', 'JavaScript', 'SQL', 'Figma', 'Excel'] }
    ],
    experienceBullets: [
      'Collaborated in a 3-person agile team to develop an automated inventory tracking tool in Python and SQLite, reducing sample audit time by 40%.',
      'Conducted competitive market research across 25 SaaS products, synthesizing insights into a 15-page slide deck presented to university faculty.',
      'Managed social media outreach and event scheduling for Student Entrepreneurship Club, growing active member attendance by 45%.'
    ],
    keyAchievements: [
      'Top 5 Finalist at Regional Collegiate Innovation Challenge.',
      'Completed 4 verified technical certifications on Coursera.'
    ],
    atsKeywords: ['Internship', 'Academic Projects', 'Problem Solving', 'Teamwork', 'Git', 'Python', 'Research', 'Presentations', 'Leadership'],
    commonMistakes: [
      'Leaving resume completely blank instead of listing academic projects.',
      'Using a generic objective statement instead of a tailored summary.'
    ],
    formattingTips: [
      'Use single-page layout exclusively.',
      'Highlight volunteer positions, extracurricular clubs, and hackathons.'
    ],
    pageLength: '1 Page',
    faqs: [
      {
        question: 'Can I list school projects as experience on an internship resume?',
        answer: 'Yes! Treat major academic projects like real jobs: give the project a clear title, specify technologies used, and write 2-3 achievement bullets.'
      }
    ],
    presetData: generateRandomResume(1, 'Software & Product Management Intern Candidate', 'modern')
  },
  {
    slug: 'no-experience',
    roleTitle: 'No Experience / First Job',
    category: 'Students & Entry-Level',
    experienceLevel: 'No Experience / Career Switch',
    metaTitle: 'Resume Example for No Experience (Free ATS Template) | Resume Craft',
    metaDescription: 'Free ATS resume example for applicants with no formal work experience. Highlight transferable skills, volunteer work, certifications, and education.',
    targetKeyword: 'resume for no experience',
    h1: 'Resume Example for No Experience & Career Switchers',
    shortIntro: 'How to build an impressive, ATS-compliant resume when you have zero official job experience. Transform everyday skills into employer-ready assets.',
    summaryExample: 'Enthusiastic and reliable high school / college graduate with strong interpersonal communication, digital literacy, and time management skills. Proven track record in community leadership, volunteer initiatives, and team sports. Ready to bring high energy and fast learning capability to entry-level roles.',
    skills: [
      { category: 'Transferable Strengths', items: ['Verbal & Written Communication', 'Active Listening', 'Time Management', 'Conflict Resolution', 'Punctuality & Reliability'] },
      { category: 'Digital & Software Skills', items: ['Google Workspace (Docs, Sheets, Slides)', 'Microsoft Office (Word, Excel)', 'Social Media Management', 'Cash Handling / Point of Sale (POS)'] }
    ],
    experienceBullets: [
      'Volunteered 150+ hours at local Community Food Bank, coordinating food distribution logistics for 300+ families weekly with 100% accuracy.',
      'Organized neighborhood charity 5K fun run, raising $4,200 for local youth programs and leading a team of 10 volunteer marshals.',
      'Completed comprehensive 40-hour Customer Relations & Digital Workplace certification, scoring in top 5% of cohort.'
    ],
    keyAchievements: [
      'President of High School Student Council (organized 12 school-wide events).',
      'Awarded Community Service Volunteer Certificate with 150+ verified hours.'
    ],
    atsKeywords: ['Transferable Skills', 'Volunteer Experience', 'Customer Service', 'Teamwork', 'Communication', 'Microsoft Office', 'Google Workspace', 'Problem Solving'],
    commonMistakes: [
      'Leaving large blank white spaces instead of describing volunteer projects or extracurriculars.',
      'Apologizing for lack of experience in the summary.'
    ],
    formattingTips: [
      'Use a functional or hybrid chronological layout emphasizing skills and education first.',
      'Include a "Volunteer Work & Community Leadership" section to prove reliability and initiative.'
    ],
    pageLength: '1 Page',
    faqs: [
      {
        question: 'What can I put on a resume if I have never had a job?',
        answer: 'You can include volunteer experience, school clubs, sports team leadership, academic projects, certifications, freelance gigs, babysitting/pet sitting, and coursework.'
      }
    ],
    presetData: generateRandomResume(1, 'Entry-Level Associate', 'modern')
  }
];
