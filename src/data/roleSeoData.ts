import { ResumeData } from '../types/resume';

export interface RoleSeoData {
  slug: string;
  roleTitle: string;
  category: string;
  experienceLevel: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  shortIntro: string;
  pageLength?: string;
  skills: Array<{
    category: string;
    items: string[];
  }>;
  summaryExamples: string[];
  experienceBullets: string[];
  atsKeywords: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedRoles: Array<{
    slug: string;
    title: string;
    category: string;
  }>;
  presetData: {
    title?: string;
    personalInfo?: Partial<ResumeData['personalInfo']>;
    summary?: string;
    experience?: ResumeData['experience'];
    education?: ResumeData['education'];
    skills?: ResumeData['skills'];
    projects?: ResumeData['projects'];
    certifications?: ResumeData['certifications'];
    customSections?: ResumeData['customSections'];
    formatting?: ResumeData['formatting'];
  };
}

export const ROLE_SEO_DATA: Record<string, RoleSeoData> = {
  'product-manager': {
    slug: 'product-manager',
    roleTitle: 'Product Manager',
    category: 'Product & Project Management',
    experienceLevel: 'Mid-Senior (4-8 Years)',
    metaTitle: 'Product Manager Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create a professional Product Manager resume with Resume Craft. Use an ATS-friendly template, customize your experience and skills, and download your resume as PDF or Word.',
    h1: 'Product Manager Resume Template',
    shortIntro: 'Craft a high-impact Product Manager resume designed to pass ATS screening and impress VP of Product recruiters. Highlight product vision, roadmapping, user research, and metric-backed growth.',
    pageLength: '2-Page',
    skills: [
      { category: 'Product Strategy & Vision', items: ['Product Strategy', 'Roadmapping', 'User Research', 'Market Research', 'Competitive Analysis', 'Product Discovery'] },
      { category: 'Analytics & Optimization', items: ['Product Analytics', 'A/B Testing', 'SQL', 'Mixpanel', 'Amplitude', 'KPI Tracking', 'Funnel Optimization'] },
      { category: 'Execution & Governance', items: ['Agile', 'Scrum', 'Jira', 'Stakeholder Management', 'Product Launches', 'Go-To-Market (GTM)', 'PRD Writing'] }
    ],
    summaryExamples: [
      'Data-driven Senior Product Manager with 6+ years of experience leading cross-functional squads to launch B2B SaaS products. Spearheaded product discovery and GTM strategy for enterprise API portal, boosting 90-day active user retention by 38% while cutting customer churn by 22%.',
      'Customer-centric Product Manager specializing in mobile app growth, A/B experimentation, and conversion funnel optimization. Directed user research across 5,000+ customer interviews, driving 4.8-star app store ratings and 2.4M new downloads.'
    ],
    experienceBullets: [
      'Spearheaded product discovery across 4 engineering squads, launching enterprise subscription tier that generated $3.4M ARR within 6 months.',
      'Designed and executed 40+ A/B experiments on checkout flow, improving conversion velocity by 18% and adding $850k in incremental revenue.',
      'Authored comprehensive PRDs and user stories in Jira, maintaining 96% sprint velocity delivery across 12-week release cycles.',
      'Partnered with UX research and sales leadership to overhaul onboarding UX, reducing customer time-to-value from 14 days to 48 hours.'
    ],
    atsKeywords: ['Product Strategy', 'Roadmapping', 'User Research', 'A/B Testing', 'Agile', 'Scrum', 'Jira', 'SQL', 'Stakeholder Management', 'Product Launches', 'GTM Strategy', 'PRDs'],
    faqs: [
      {
        question: 'What should I include in a Product Manager resume?',
        answer: 'Focus on business metrics and product outcomes rather than just listing daily tasks. Include quantifiable impact (ARR growth, retention rates, conversion lifts), user research methodologies, product tools (Jira, Amplitude, SQL), and cross-functional leadership.'
      },
      {
        question: 'How do I make a Product Manager resume ATS-friendly?',
        answer: 'Use a clean single-column template with standard section headings (Experience, Skills, Education). Incorporate core keywords from the target job posting such as Product Strategy, Agile/Scrum, User Discovery, and Roadmapping.'
      }
    ],
    relatedRoles: [
      { slug: 'technical-product-manager', title: 'Technical Product Manager', category: 'Product & Management' },
      { slug: 'ai-product-manager', title: 'AI Product Manager', category: 'AI & Product' },
      { slug: 'project-manager', title: 'Project Manager', category: 'Management' }
    ],
    presetData: {
      title: 'Product Manager Resume',
      personalInfo: {
        fullName: 'Elena Rostova',
        jobTitle: 'Senior Product Manager',
        email: 'elena.rostova@productlabs.io',
        phone: '(555) 567-8901',
        location: 'New York, NY',
        linkedin: 'linkedin.com/in/elenarostova',
        website: 'elenarostova.com'
      },
      summary: 'Data-driven Senior Product Manager with 6+ years of experience leading cross-functional engineering and design squads. Proven track record launching enterprise B2B SaaS features, optimizing user onboarding funnels, and driving 38% retention lifts.',
      experience: [
        {
          id: 'exp-pm-1',
          role: 'Lead Product Manager',
          company: 'Nexus SaaS Platforms',
          location: 'New York, NY',
          startDate: '2021-04',
          endDate: 'Present',
          current: true,
          highlights: [
            'Spearheaded enterprise API portal launch, boosting 90-day active user retention by 38% and adding $3.4M ARR.',
            'Directed product discovery across 4 engineering squads with 96% sprint velocity delivery in Jira.',
            'Designed and executed 40+ A/B experimentation variants on subscription checkout flows, elevating conversion rates by 18%.'
          ]
        }
      ],
      education: [
        { id: 'edu-pm-1', degree: 'B.S. in Business Administration & Computer Science', institution: 'NYU Stern', location: 'New York, NY', startDate: '2014', endDate: '2018' }
      ],
      skills: [
        { id: 'sk-pm-1', category: 'Product Leadership', items: ['Product Strategy', 'Roadmapping', 'User Research', 'A/B Testing', 'SQL', 'Mixpanel', 'Jira', 'Go-To-Market'] }
      ]
    }
  },

  'technical-product-manager': {
    slug: 'technical-product-manager',
    roleTitle: 'Technical Product Manager',
    category: 'Product & Engineering',
    experienceLevel: 'Senior (5-9 Years)',
    metaTitle: 'Technical Product Manager Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create a professional Technical Product Manager resume with Resume Craft. Use an ATS-friendly template, customize your technical skills and system architecture, and download as PDF or Word.',
    h1: 'Technical Product Manager Resume Template',
    shortIntro: 'Highlight your bridge between engineering architecture and product vision. Feature API strategy, system design, technical roadmaps, and developer ecosystem growth.',
    pageLength: '2-Page',
    skills: [
      { category: 'Technical Architecture', items: ['API Strategy', 'System Design', 'Microservices', 'Cloud Platforms (AWS/GCP)', 'SQL', 'Data Modeling', 'APIs (REST/gRPC)'] },
      { category: 'Product & Execution', items: ['Product Roadmapping', 'Technical Requirements', 'Agile', 'Scrum', 'Jira', 'Technical Backlog Refinement', 'Developer Experience (DX)'] },
      { category: 'Leadership', items: ['Cross-functional Leadership', 'Engineering Alignment', 'Release Planning', 'Technical Governance', 'SDK Strategy'] }
    ],
    summaryExamples: [
      'Technical Product Manager with 7+ years of computer science background bridging complex backend architecture with strategic product goals. Architected developer-facing API platform serving 20M+ daily requests while reducing p99 API latency by 45%.',
      'Senior Technical PM specializing in cloud infrastructure products, Kubernetes tooling, and developer platforms. Partnered with 50+ staff engineers to launch zero-downtime database migration tooling adopted across enterprise clients.'
    ],
    experienceBullets: [
      'Defined technical roadmap for REST and GraphQL API gateways, scaling request throughput by 3x while cutting developer onboarding time from 3 weeks to 2 days.',
      'Authored 80+ granular technical specifications and architectural trade-off documents in Confluence/Jira for 3 backend squads.',
      'Partnered with enterprise architects to migrate monolithic payment system to decoupled event-driven microservices.',
      'Spearheaded developer portal redesign, driving 150% growth in third-party API integration keys issued monthly.'
    ],
    atsKeywords: ['API Strategy', 'System Design', 'Product Roadmapping', 'Agile', 'SQL', 'APIs', 'Cloud Platforms', 'Technical Requirements', 'Jira', 'Cross-functional Leadership', 'Microservices', 'DX'],
    faqs: [
      {
        question: 'What skills should a Technical Product Manager emphasize?',
        answer: 'Highlight both technical depth (API contracts, SQL, microservices, cloud infrastructure) and product capabilities (roadmapping, developer UX, PRDs, backlog grooming, cross-functional communication).'
      }
    ],
    relatedRoles: [
      { slug: 'product-manager', title: 'Product Manager', category: 'Product' },
      { slug: 'ai-product-manager', title: 'AI Product Manager', category: 'AI Product' },
      { slug: 'software-engineer', title: 'Software Engineer', category: 'Engineering' }
    ],
    presetData: {
      title: 'Technical Product Manager Resume',
      personalInfo: { fullName: 'Marcus Vance', jobTitle: 'Technical Product Manager', email: 'marcus.tpm@techcraft.dev', location: 'Austin, TX' },
      summary: 'Technical Product Manager with 7+ years bridging backend engineering with strategic product roadmaps. Specialized in API infrastructure and cloud developer tools.',
      experience: [
        { id: 'exp-tpm-1', role: 'Staff Technical PM', company: 'CloudScale API Labs', location: 'Austin, TX', startDate: '2021-01', endDate: 'Present', current: true, highlights: ['Defined technical roadmap for REST/GraphQL API gateway serving 20M daily requests.', 'Authored 80+ technical specs for backend microservices.'] }
      ],
      skills: [{ id: 'sk-tpm-1', category: 'Technical Stack', items: ['API Strategy', 'System Design', 'Product Roadmapping', 'Agile', 'SQL', 'APIs', 'Cloud Platforms', 'Jira'] }]
    }
  },

  'ai-product-manager': {
    slug: 'ai-product-manager',
    roleTitle: 'AI Product Manager',
    category: 'AI & Product Management',
    experienceLevel: 'Mid-Senior (4-8 Years)',
    metaTitle: 'AI Product Manager Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create an ATS-friendly AI Product Manager resume. Showcase LLM applications, RAG pipelines, model evaluation metrics, and responsible AI governance.',
    h1: 'AI Product Manager Resume Template',
    shortIntro: 'Build a recruiter-vetted resume tailored for GenAI and machine learning product management. Highlight prompt engineering, model benchmarks, product analytics, and AI ethics.',
    pageLength: '5-Page',
    skills: [
      { category: 'GenAI & ML Core', items: ['Generative AI', 'Machine Learning', 'LLMs', 'Prompt Engineering', 'Model Evaluation', 'RAG Architectures', 'Fine-Tuning (LoRA)'] },
      { category: 'Product & Analytics', items: ['AI Product Strategy', 'Product Analytics', 'User Discovery', 'A/B Testing', 'Ethical AI', 'Responsible AI Governance', 'Cost Benchmarking'] },
      { category: 'Tools & Workflows', items: ['Python', 'SQL', 'LangChain', 'Pinecone', 'Jira', 'Mixpanel', 'PRD Authoring'] }
    ],
    summaryExamples: [
      'Innovative AI Product Manager with 5+ years building GenAI features, RAG-powered search assistants, and NLP analytics platforms. Successfully launched enterprise AI copilot that reduced customer support response times by 55%.',
      'Senior AI PM specializing in LLM evaluation frameworks, vector search integration, and responsible AI governance. Led 3 AI engineering teams to deploy domain-tuned models serving 2M+ monthly active users.'
    ],
    experienceBullets: [
      'Spearheaded product vision for enterprise LLM copilot, scaling monthly active AI user queries from 50k to 1.8M within 8 months.',
      'Established model evaluation framework measuring hallucination rates, BLEU scores, and response latency across 5 domain LLM candidates.',
      'Cut inference cost overhead by 40% through intelligent prompt caching and vector database retrieval optimization.',
      'Partnered with legal and compliance teams to formulate company-wide Responsible AI guidelines and data privacy guardrails.'
    ],
    atsKeywords: ['Generative AI', 'Machine Learning', 'LLMs', 'AI Product Strategy', 'Prompt Engineering', 'Model Evaluation', 'RAG', 'Product Analytics', 'Responsible AI', 'Fine-Tuning'],
    faqs: [
      {
        question: 'How is an AI Product Manager resume different from a standard PM resume?',
        answer: 'An AI PM resume highlights domain-specific knowledge around machine learning lifecycles, LLM evaluation, RAG architectures, prompt engineering, GPU cost management, and ethical AI governance alongside core product management competencies.'
      }
    ],
    relatedRoles: [
      { slug: 'product-manager', title: 'Product Manager', category: 'Product' },
      { slug: 'ai-engineer', title: 'AI Engineer', category: 'AI Engineering' },
      { slug: 'machine-learning-engineer', title: 'Machine Learning Engineer', category: 'ML Engineering' }
    ],
    presetData: {
      title: 'AI Product Manager Resume',
      personalInfo: { fullName: 'Sophia Chen', jobTitle: 'Senior AI Product Manager', email: 'sophia.aipm@nexus.ai', location: 'Seattle, WA' },
      summary: 'Senior AI Product Manager with 6+ years driving GenAI features, LLM copilot tools, and vector search architectures for enterprise SaaS applications.',
      experience: [
        { id: 'exp-aipm-1', role: 'Lead AI PM', company: 'Nexus AI Systems', location: 'Seattle, WA', startDate: '2022-02', endDate: 'Present', current: true, highlights: ['Spearheaded enterprise LLM copilot scaling to 1.8M monthly queries.', 'Cut model inference costs by 40% via prompt caching.'] }
      ],
      skills: [{ id: 'sk-aipm-1', category: 'AI Stack', items: ['Generative AI', 'Machine Learning', 'LLMs', 'AI Product Strategy', 'Prompt Engineering', 'Model Evaluation', 'RAG'] }]
    }
  },

  'enterprise-architect': {
    slug: 'enterprise-architect',
    roleTitle: 'Enterprise Architect',
    category: 'Architecture & Leadership',
    experienceLevel: 'Principal / Executive (10+ Years)',
    metaTitle: 'Enterprise Architect Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Download a free ATS Enterprise Architect resume template. Showcase TOGAF 10 governance, cloud strategy, digital transformation, and multimillion-dollar IT roadmaps.',
    h1: 'Enterprise Architect Resume Template',
    shortIntro: 'Demonstrate top-tier IT leadership, TOGAF framework governance, digital transformation roadmaps, and enterprise software architecture across global business units.',
    pageLength: '4-Page',
    skills: [
      { category: 'Frameworks & Strategy', items: ['Enterprise Architecture', 'TOGAF', 'Business Architecture', 'Cloud Strategy', 'IT Governance', 'Digital Transformation'] },
      { category: 'Systems & Integration', items: ['Solution Architecture', 'Integration Architecture', 'Microservices Architecture', 'Legacy Modernization', 'Data Architecture'] },
      { category: 'Leadership & Finance', items: ['IT Roadmapping', 'Vendor Management', 'Cost Optimization', 'Stakeholder Alignment', 'Risk Management', 'Security Governance'] }
    ],
    summaryExamples: [
      'Principal Enterprise Architect with 12+ years directing global IT modernization, TOGAF governance, and cloud transformation across Fortune 500 enterprises. Successfully rationalized 200+ legacy applications, saving $14M in annual licensing expenses.',
      'Strategic Enterprise Solutions Architect specializing in cloud migration, event-driven integration, and zero-trust security governance. Led digital transformation roadmap across 4 business units serving 45,000 corporate employees.'
    ],
    experienceBullets: [
      'Formulated 5-year Enterprise Technology Roadmap aligning IT infrastructure investments with $500M corporate revenue objectives.',
      'Rationalized global application portfolio across 14 subsidiaries, reducing redundant SaaS software licenses by 35%.',
      'Established TOGAF 10 Architecture Review Board (ARB) governance process across 250+ software engineers and solution architects.',
      'Directed multi-cloud migration from legacy mainframe hardware to AWS/Azure hybrid infrastructure with 99.999% availability.'
    ],
    atsKeywords: ['Enterprise Architecture', 'TOGAF', 'Solution Architecture', 'Business Architecture', 'Cloud Strategy', 'Integration Architecture', 'Governance', 'IT Strategy', 'Modernization'],
    faqs: [
      {
        question: 'What certifications should an Enterprise Architect put on a resume?',
        answer: 'Key certifications include TOGAF 10, AWS Certified Solutions Architect Professional, Zachman Framework, Scaled Agile (SAFe) Agilist, and CISSP.'
      }
    ],
    relatedRoles: [
      { slug: 'cloud-architect', title: 'Cloud Architect', category: 'Architecture' },
      { slug: 'software-engineer', title: 'Software Engineer', category: 'Engineering' }
    ],
    presetData: {
      title: 'Enterprise Architect Resume',
      personalInfo: { fullName: 'Arthur Pendelton', jobTitle: 'Chief Enterprise Architect', email: 'arthur.pendelton@globaltech.com', location: 'Chicago, IL' },
      summary: 'Principal Enterprise Architect with 14+ years of experience leading TOGAF architecture governance, enterprise cloud strategy, and legacy IT modernization.',
      experience: [
        { id: 'exp-ea-1', role: 'Principal Enterprise Architect', company: 'Global Tech Enterprises', location: 'Chicago, IL', startDate: '2019-01', endDate: 'Present', current: true, highlights: ['Formulated 5-year technology roadmap for $500M business unit.', 'Rationalized global application portfolio saving $14M.'] }
      ],
      skills: [{ id: 'sk-ea-1', category: 'Architecture Stack', items: ['Enterprise Architecture', 'TOGAF', 'Solution Architecture', 'Business Architecture', 'Cloud Strategy', 'Governance'] }]
    }
  },

  'cloud-architect': {
    slug: 'cloud-architect',
    roleTitle: 'Cloud Architect',
    category: 'Cloud & Infrastructure',
    experienceLevel: 'Senior (6-10 Years)',
    metaTitle: 'Cloud Architect Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create a Cloud Architect resume with Resume Craft. Feature AWS, Azure, GCP, Kubernetes, Terraform IaC, multi-region failover, and cloud cost optimization.',
    h1: 'Cloud Architect Resume Template',
    shortIntro: 'Highlight multi-cloud infrastructure design, Kubernetes orchestration, Terraform IaC automation, FinOps cost savings, and zero-downtime disaster recovery.',
    pageLength: '3-Page',
    skills: [
      { category: 'Cloud Platforms', items: ['AWS', 'Azure', 'Google Cloud (GCP)', 'Multi-Cloud Architecture', 'Hybrid Cloud Solutions'] },
      { category: 'DevOps & Automation', items: ['Kubernetes', 'Docker', 'Terraform', 'Infrastructure as Code (IaC)', 'Ansible', 'CI/CD Pipelines', 'Helm'] },
      { category: 'Security & Reliability', items: ['Cloud Security', 'Networking (VPC/DirectConnect)', 'Scalability', 'FinOps Cost Optimization', 'Disaster Recovery (DR)'] }
    ],
    summaryExamples: [
      'Senior Cloud Architect with 8+ years designing high-availability multi-region cloud infrastructures on AWS and GCP. Managed $12M annual cloud compute budget while maintaining 99.999% SLA uptime across 15M daily API calls.',
      'AWS & Kubernetes Certified Cloud Solutions Architect specializing in zero-trust security governance, Terraform IaC pipelines, and FinOps cost optimization. Reduced enterprise cloud infrastructure bill by $1.2M annually.'
    ],
    experienceBullets: [
      'Architected multi-region EKS Kubernetes clusters across 3 AWS geographic regions, achieving automated sub-60-second disaster recovery failover.',
      'Managed $12M annual AWS infrastructure budget, implementing automated spot instance orchestration that slashed compute expenses by 32%.',
      'Automated 100% of infrastructure deployments using Terraform IaC and GitOps pipelines in ArgoCD.',
      'Enforced Zero-Trust IAM security policies and KMS encryption at rest across 4,000 production database instances.'
    ],
    atsKeywords: ['AWS', 'Azure', 'Google Cloud', 'Cloud Architecture', 'Kubernetes', 'Docker', 'Terraform', 'Networking', 'Security', 'Scalability', 'Infrastructure as Code', 'FinOps'],
    faqs: [
      {
        question: 'What skills should a Cloud Architect put on a resume?',
        answer: 'Emphasize major cloud providers (AWS, Azure, GCP), container orchestration (Kubernetes, Docker), Infrastructure as Code (Terraform), FinOps cost reduction, security governance, and multi-region high-availability design.'
      }
    ],
    relatedRoles: [
      { slug: 'enterprise-architect', title: 'Enterprise Architect', category: 'Architecture' },
      { slug: 'devops-engineer', title: 'DevOps Engineer', category: 'DevOps' },
      { slug: 'cloud-engineer', title: 'Cloud Engineer', category: 'Cloud' }
    ],
    presetData: {
      title: 'Cloud Architect Resume',
      personalInfo: { fullName: 'David Miller', jobTitle: 'Principal Cloud Architect', email: 'david.miller@cloudcraft.io', location: 'Chicago, IL' },
      summary: 'AWS & Kubernetes Certified Cloud Architect with 8+ years automating multi-region cloud infrastructure, Terraform IaC, and FinOps cost optimization.',
      experience: [
        { id: 'exp-ca-1', role: 'Principal Cloud Architect', company: 'Pixel Craft Cloud', location: 'Chicago, IL', startDate: '2020-03', endDate: 'Present', current: true, highlights: ['Architected multi-region EKS clusters achieving 99.999% uptime.', 'Reduced annual cloud spend by 32% ($1.2M).'] }
      ],
      skills: [{ id: 'sk-ca-1', category: 'Cloud Core', items: ['AWS', 'Azure', 'Google Cloud', 'Cloud Architecture', 'Kubernetes', 'Docker', 'Terraform', 'Infrastructure as Code'] }]
    }
  },

  'software-engineer': {
    slug: 'software-engineer',
    roleTitle: 'Software Engineer',
    category: 'Engineering & Technology',
    experienceLevel: 'Mid-Level (3-6 Years)',
    metaTitle: 'Software Engineer Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create a professional Software Engineer resume. Highlight Full-Stack skills, React, TypeScript, Node.js, Python, system performance, and unit testing.',
    h1: 'Software Engineer Resume Template',
    shortIntro: 'Build a recruiter-approved Software Engineer resume. Showcase full-stack web applications, microservices performance, system optimization, and clean code principles.',
    pageLength: '3-Page',
    skills: [
      { category: 'Languages', items: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'Java', 'Go', 'SQL', 'C++'] },
      { category: 'Frameworks & Frontend', items: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'Redux / Zustand', 'REST APIs', 'GraphQL'] },
      { category: 'Databases & Tools', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Git', 'Jest', 'CI/CD Pipelines'] }
    ],
    summaryExamples: [
      'Full-Stack Software Engineer with 5+ years of experience building scalable web applications, REST/GraphQL microservices, and responsive user interfaces. Optimized Core Web Vitals to boost mobile conversion rates by 28%.',
      'Backend Software Engineer specializing in distributed Go and Node.js microservices, PostgreSQL query optimization, and event-driven Kafka messaging. Refactored p99 latency from 350ms to 45ms across 10M daily requests.'
    ],
    experienceBullets: [
      'Developed and deployed 30+ reusable React & TypeScript UI components, accelerating feature shipping velocity across 3 engineering squads by 25%.',
      'Refactored legacy monolithic Node.js backend into containerized Docker microservices, improving throughput by 40%.',
      'Optimized complex PostgreSQL database indexing strategies, reducing API response p99 latencies by 65%.',
      'Authored automated Jest and Cypress unit/integration test suites, elevating total repository code coverage to 94%.'
    ],
    atsKeywords: ['Software Engineer', 'TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'REST API', 'GraphQL', 'Microservices', 'Git', 'Agile'],
    faqs: [
      {
        question: 'Should a Software Engineer resume be 2, 3, 4, or 5 pages?',
        answer: 'For entry-level candidates, a clean 2-page resume is optimal. Candidates with moderate experience benefit from 3 pages, senior engineers use 4 pages, and executives or architects with extensive project portfolios extend to 5 pages.'
      }
    ],
    relatedRoles: [
      { slug: 'senior-software-engineer', title: 'Senior Software Engineer', category: 'Engineering' },
      { slug: 'frontend-developer', title: 'Frontend Developer', category: 'Engineering' },
      { slug: 'backend-developer', title: 'Backend Developer', category: 'Engineering' }
    ],
    presetData: {
      title: 'Software Engineer Resume',
      personalInfo: { fullName: 'Alex Morgan', jobTitle: 'Full-Stack Software Engineer', email: 'alex.morgan@dev.io', location: 'San Francisco, CA' },
      summary: 'Software Engineer with 5+ years building scalable React, Node.js, and TypeScript web applications with clean vector architecture and automated testing.',
      experience: [
        { id: 'exp-se-1', role: 'Software Engineer', company: 'Apex Digital Labs', location: 'San Francisco, CA', startDate: '2021-06', endDate: 'Present', current: true, highlights: ['Developed 30+ React components boosting release velocity by 25%.', 'Refactored backend microservices cutting p99 latency by 65%.'] }
      ],
      skills: [{ id: 'sk-se-1', category: 'Engineering Core', items: ['TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'REST API', 'Git'] }]
    }
  },

  'senior-software-engineer': {
    slug: 'senior-software-engineer',
    roleTitle: 'Senior Software Engineer',
    category: 'Engineering & Technology',
    experienceLevel: 'Senior (6-10 Years)',
    metaTitle: 'Senior Software Engineer Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create a Senior Software Engineer resume. Showcase technical leadership, distributed system design, code reviews, and high-throughput backend scaling.',
    h1: 'Senior Software Engineer Resume Template',
    shortIntro: 'Highlight staff engineering leadership, system architecture, mentoring, multi-region cloud scaling, and measurable business impact.',
    pageLength: '2-Page',
    skills: [
      { category: 'Core Stack & Languages', items: ['TypeScript', 'Go', 'Python', 'Java', 'SQL', 'Rust', 'GraphQL', 'gRPC'] },
      { category: 'System Architecture', items: ['Distributed Systems', 'Microservices', 'System Design', 'Event-Driven Architecture (Kafka)', 'Caching (Redis)'] },
      { category: 'Leadership & DevOps', items: ['Technical Mentorship', 'Code Reviews', 'AWS/GCP', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Performance Tuning'] }
    ],
    summaryExamples: [
      'Senior Software Engineer with 8+ years architecting fault-tolerant microservices, high-throughput data pipelines, and developer platforms. Led a team of 8 engineers delivering 99.99% system availability serving 5M daily users.',
      'Staff Software Engineer specializing in backend distributed systems, Kafka streaming queues, and database scaling. Reduced annual cloud compute costs by $450k through automated infrastructure optimization.'
    ],
    experienceBullets: [
      'Architected distributed event-driven Kafka messaging pipeline processing 50,000 events/second with sub-10ms processing latency.',
      'Mentored 6 junior/mid-level software engineers, establishing company-wide code review standards and engineering RFC templates.',
      'Led zero-downtime database migration of 100M+ user records from MongoDB to PostgreSQL with zero data loss.',
      'Spearheaded performance tuning initiative across core GraphQL gateway, improving overall system throughput by 55%.'
    ],
    atsKeywords: ['Senior Software Engineer', 'Distributed Systems', 'System Design', 'TypeScript', 'Go', 'Python', 'Microservices', 'Kafka', 'PostgreSQL', 'AWS', 'Mentorship'],
    faqs: [
      {
        question: 'What makes a Senior Software Engineer resume stand out?',
        answer: 'Focus on technical leadership, architectural design choices, trade-offs, system scale (RPS, p99 latency, data volumes), cost savings, and engineer mentorship.'
      }
    ],
    relatedRoles: [
      { slug: 'software-engineer', title: 'Software Engineer', category: 'Engineering' },
      { slug: 'backend-developer', title: 'Backend Developer', category: 'Engineering' },
      { slug: 'cloud-engineer', title: 'Cloud Engineer', category: 'Cloud' }
    ],
    presetData: {
      title: 'Senior Software Engineer Resume',
      personalInfo: { fullName: 'Alex Morgan', jobTitle: 'Senior Software Engineer', email: 'alex.senior@dev.io', location: 'San Francisco, CA' },
      summary: 'Senior Software Engineer with 8+ years architecting microservices, event-driven Kafka queues, and multi-region cloud platforms serving 5M users.',
      experience: [
        { id: 'exp-sse-1', role: 'Senior Staff Engineer', company: 'Cloud Scale Tech', location: 'San Francisco, CA', startDate: '2020-01', endDate: 'Present', current: true, highlights: ['Architected Kafka event pipeline handling 50k events/sec.', 'Mentored 6 engineers and instituted RFC architecture standards.'] }
      ],
      skills: [{ id: 'sk-sse-1', category: 'Senior Engineering', items: ['TypeScript', 'Go', 'Python', 'Distributed Systems', 'Microservices', 'Kafka', 'System Design', 'AWS'] }]
    }
  },

  'data-scientist': {
    slug: 'data-scientist',
    roleTitle: 'Data Scientist',
    category: 'Data & Analytics',
    experienceLevel: 'Mid-Senior (4-8 Years)',
    metaTitle: 'Data Scientist Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Download a free ATS Data Scientist resume template. Feature Machine Learning, Python, PyTorch, XGBoost, A/B testing, and predictive modeling.',
    h1: 'Data Scientist Resume Template',
    shortIntro: 'Highlight predictive modeling, A/B testing, statistical inference, machine learning pipelines, Python/SQL proficiency, and revenue impact.',
    pageLength: '2-Page',
    skills: [
      { category: 'Machine Learning & AI', items: ['Python', 'Machine Learning', 'PyTorch', 'TensorFlow', 'scikit-learn', 'XGBoost', 'NLP', 'Deep Learning'] },
      { category: 'Statistics & Analytics', items: ['A/B Testing', 'Statistical Inference', 'Predictive Modeling', 'SQL', 'Pandas', 'NumPy', 'Data Mining'] },
      { category: 'Tools & Cloud', items: ['Tableau', 'Power BI', 'AWS SageMaker', 'Docker', 'Spark', 'Git', 'Jupyter'] }
    ],
    summaryExamples: [
      'Senior Data Scientist with 6+ years deploying machine learning models, customer churn predictors, and recommendation algorithms across 5M+ active users. Generated $1.8M in annual revenue retention via predictive ML models.',
      'Data Scientist specializing in statistical hypothesis testing, NLP sentiment analysis, and AWS SageMaker pipelines. Reduced ML model training time by 40% while raising classification F1 score to 92.4%.'
    ],
    experienceBullets: [
      'Engineered customer churn prediction ML model in PyTorch & XGBoost using 4M user records, saving $1.8M in annual customer loss.',
      'Conducted 30+ rigorous A/B experiments on e-commerce recommendation algorithms, raising checkout conversion by 6.4%.',
      'Constructed automated ETL data pipelines in PySpark and SQL processing 500GB daily log files.',
      'Built executive Tableau dashboards visualizing ML model performance metrics and marketing ROI across 12 product lines.'
    ],
    atsKeywords: ['Data Scientist', 'Python', 'Machine Learning', 'PyTorch', 'SQL', 'A/B Testing', 'Predictive Modeling', 'scikit-learn', 'TensorFlow', 'Spark', 'SageMaker'],
    faqs: [
      {
        question: 'What skills should a Data Scientist put on a resume?',
        answer: 'Include programming (Python, R, SQL), machine learning frameworks (PyTorch, TensorFlow, scikit-learn), statistical methods (A/B testing, regression), data processing (Spark, Pandas), and deployment tools (Docker, AWS SageMaker).'
      }
    ],
    relatedRoles: [
      { slug: 'data-analyst', title: 'Data Analyst', category: 'Data' },
      { slug: 'machine-learning-engineer', title: 'Machine Learning Engineer', category: 'ML' },
      { slug: 'ai-engineer', title: 'AI Engineer', category: 'AI' }
    ],
    presetData: {
      title: 'Data Scientist Resume',
      personalInfo: { fullName: 'Sophia Chen', jobTitle: 'Senior Data Scientist', email: 'sophia.chen@nexus.io', location: 'Seattle, WA' },
      summary: 'Data Scientist with 6+ years developing PyTorch deep learning models, XGBoost churn predictors, and A/B test experiments processing 4M records.',
      experience: [
        { id: 'exp-ds-1', role: 'Lead Data Scientist', company: 'Nexus Data Labs', location: 'Seattle, WA', startDate: '2021-03', endDate: 'Present', current: true, highlights: ['Engineered churn prediction ML models saving $1.8M annually.', 'Conducted 30+ A/B tests raising conversion by 6.4%.'] }
      ],
      skills: [{ id: 'sk-ds-1', category: 'Data Science Core', items: ['Python', 'Machine Learning', 'PyTorch', 'SQL', 'A/B Testing', 'Predictive Modeling', 'scikit-learn', 'Spark'] }]
    }
  },

  'data-analyst': {
    slug: 'data-analyst',
    roleTitle: 'Data Analyst',
    category: 'Data & Analytics',
    experienceLevel: 'Mid-Level (2-5 Years)',
    metaTitle: 'Data Analyst Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create an ATS-friendly Data Analyst resume. Highlight SQL query optimization, Tableau, Power BI dashboards, KPI tracking, and Excel modeling.',
    h1: 'Data Analyst Resume Template',
    shortIntro: 'Build a standout Data Analyst resume emphasizing complex SQL queries, interactive BI dashboards, revenue trend analysis, and data hygiene.',
    pageLength: '3-Page',
    skills: [
      { category: 'Querying & Analysis', items: ['SQL (PostgreSQL, Snowflake)', 'Python (Pandas, NumPy)', 'Data Cleaning', 'Statistical Analysis', 'Excel (VLOOKUP, Pivot Tables)'] },
      { category: 'Visualization & BI', items: ['Tableau', 'Power BI', 'Looker', 'Dashboard Design', 'Executive Reporting', 'KPI Tracking'] },
      { category: 'Data Management', items: ['ETL Pipelines', 'Data Warehousing', 'BigQuery', 'A/B Testing Support', 'Data Hygiene'] }
    ],
    summaryExamples: [
      'Detail-oriented Data Analyst with 4+ years of experience transforming raw transactional data into actionable business intelligence. Automated 15+ executive Tableau dashboards tracking $40M in annual sales pipeline.',
      'SQL Specialist & Data Analyst skilled in Snowflake querying, Python data wrangling, and KPI reporting. Reduced weekly reporting generation time by 80% through automated Python scripts.'
    ],
    experienceBullets: [
      'Automated executive Tableau dashboards tracking $40M annual sales pipeline revenue across 6 regional territories.',
      'Optimized complex SQL queries in PostgreSQL and Snowflake, cutting report generation runtime by 50%.',
      'Partnered with marketing leadership to analyze customer acquisition funnels, identifying drop-off points that improved conversion by 12%.',
      'Cleaned and validated 2M+ customer data records during CRM migration, maintaining 99.8% data accuracy.'
    ],
    atsKeywords: ['Data Analyst', 'SQL', 'Tableau', 'Power BI', 'Python', 'Pandas', 'Snowflake', 'Excel', 'Dashboards', 'KPI Tracking', 'ETL', 'PostgreSQL'],
    faqs: [
      {
        question: 'What are the top keywords for a Data Analyst resume?',
        answer: 'Essential keywords include SQL (PostgreSQL, Snowflake, BigQuery), Data Visualization (Tableau, Power BI, Looker), Python (Pandas, NumPy), Excel modeling, KPI Reporting, and ETL Pipelines.'
      }
    ],
    relatedRoles: [
      { slug: 'data-scientist', title: 'Data Scientist', category: 'Data' },
      { slug: 'business-analyst', title: 'Business Analyst', category: 'Analytics' }
    ],
    presetData: {
      title: 'Data Analyst Resume',
      personalInfo: { fullName: 'Sophia Chen', jobTitle: 'Senior Data Analyst', email: 'sophia.analyst@data.io', location: 'Seattle, WA' },
      summary: 'Data Analyst with 4+ years expertise in SQL query optimization, Tableau dashboards, Python data cleaning, and KPI reporting for sales and product teams.',
      experience: [
        { id: 'exp-da-1', role: 'Senior Data Analyst', company: 'Cascade Analytics', location: 'Seattle, WA', startDate: '2021-08', endDate: 'Present', current: true, highlights: ['Automated executive Tableau dashboards tracking $40M sales pipeline.', 'Optimized Snowflake SQL queries reducing runtime by 50%.'] }
      ],
      skills: [{ id: 'sk-da-1', category: 'Analytics Stack', items: ['SQL', 'Tableau', 'Power BI', 'Python', 'Pandas', 'Snowflake', 'Excel', 'Dashboards', 'KPI Tracking'] }]
    }
  },

  'machine-learning-engineer': {
    slug: 'machine-learning-engineer',
    roleTitle: 'Machine Learning Engineer',
    category: 'AI & Engineering',
    experienceLevel: 'Senior (5-8 Years)',
    metaTitle: 'Machine Learning Engineer Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create a Machine Learning Engineer resume with Resume Craft. Feature PyTorch, TensorFlow, MLOps, Model Deployment, Docker, and SageMaker.',
    h1: 'Machine Learning Engineer Resume Template',
    shortIntro: 'Highlight MLOps pipelines, production model deployment, PyTorch/TensorFlow deep learning, model quantization, and low-latency GPU inference.',
    pageLength: '2-Page',
    skills: [
      { category: 'ML & Deep Learning', items: ['Machine Learning', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'Deep Learning', 'Computer Vision / NLP', 'Model Quantization'] },
      { category: 'MLOps & Infrastructure', items: ['MLOps', 'Model Deployment', 'AWS SageMaker', 'Kubeflow', 'MLflow', 'Docker', 'Kubernetes', 'Triton Inference Server'] },
      { category: 'Engineering & Data', items: ['Python', 'C++', 'SQL', 'Spark', 'Feature Stores (Feast)', 'REST/gRPC APIs', 'Git'] }
    ],
    summaryExamples: [
      'Machine Learning Engineer with 6+ years of experience designing and deploying production MLOps pipelines, PyTorch deep learning models, and real-time inference microservices serving 10M daily requests.',
      'Senior ML Infrastructure Engineer specializing in Triton Inference Server tuning, model quantization (TensorRT), and AWS SageMaker pipelines. Reduced inference latency by 55% while trimming GPU compute costs by $300k.'
    ],
    experienceBullets: [
      'Deployed PyTorch recommendation microservices on AWS SageMaker serving 10M daily API requests with sub-25ms response latency.',
      'Built automated MLOps retraining pipeline with MLflow and Airflow, reducing model decay drift and boosting F1 score by 8.2%.',
      'Optimized LLM model weights using TensorRT quantization, cutting GPU VRAM footprint by 50%.',
      'Constructed feature store infrastructure using Feast and Redis to serve 2,000 ML feature vectors in real time.'
    ],
    atsKeywords: ['Machine Learning Engineer', 'PyTorch', 'TensorFlow', 'MLOps', 'Model Deployment', 'AWS SageMaker', 'Docker', 'Kubernetes', 'Python', 'Feature Store'],
    faqs: [
      {
        question: 'How do I highlight MLOps on an ML Engineer resume?',
        answer: 'Detail your experience with model training pipelines, CI/CD for ML (MLflow, Kubeflow), containerized inference serving (Triton, FastAPI, Docker), feature stores, latency tuning, and monitoring for data drift.'
      }
    ],
    relatedRoles: [
      { slug: 'ai-engineer', title: 'AI Engineer', category: 'AI' },
      { slug: 'data-scientist', title: 'Data Scientist', category: 'Data' }
    ],
    presetData: {
      title: 'Machine Learning Engineer Resume',
      personalInfo: { fullName: 'Sophia Chen', jobTitle: 'Senior ML Engineer', email: 'sophia.mle@ai.io', location: 'Seattle, WA' },
      summary: 'Machine Learning Engineer with 6+ years deploying PyTorch models, SageMaker pipelines, and Triton inference microservices serving 10M daily requests.',
      experience: [
        { id: 'exp-mle-1', role: 'Senior ML Engineer', company: 'Nexus Intelligence', location: 'Seattle, WA', startDate: '2021-05', endDate: 'Present', current: true, highlights: ['Deployed PyTorch recommendation microservices serving 10M requests.', 'Built MLOps pipeline with MLflow boosting F1 score by 8.2%.'] }
      ],
      skills: [{ id: 'sk-mle-1', category: 'ML Core', items: ['PyTorch', 'TensorFlow', 'MLOps', 'Model Deployment', 'AWS SageMaker', 'Docker', 'Kubernetes', 'Python'] }]
    }
  },

  'ai-engineer': {
    slug: 'ai-engineer',
    roleTitle: 'AI Engineer',
    category: 'AI & Engineering',
    experienceLevel: 'Mid-Senior (4-8 Years)',
    metaTitle: 'AI Engineer Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Download a free ATS AI Engineer resume template. Showcase Python, LLMs, RAG, LangChain, Vector Databases, APIs, Prompt Engineering, and Model Deployment.',
    h1: 'AI Engineer Resume Template',
    shortIntro: 'Highlight LLM integration, LangChain agents, RAG document search, Pinecone vector databases, prompt engineering, and GenAI production deployment.',
    pageLength: '2-Page',
    skills: [
      { category: 'GenAI & Agent Frameworks', items: ['Python', 'Machine Learning', 'LLMs', 'RAG', 'LangChain', 'LlamaIndex', 'Prompt Engineering'] },
      { category: 'Vector DBs & APIs', items: ['Vector Databases (Pinecone, Milvus)', 'APIs (REST/FastAPI)', 'OpenAI API', 'Hugging Face', 'Embedding Fine-Tuning'] },
      { category: 'Deployment & DevOps', items: ['Model Deployment', 'Docker', 'Kubernetes', 'AWS SageMaker', 'Git', 'CI/CD'] }
    ],
    summaryExamples: [
      'Innovative AI Engineer with 5+ years of experience engineering production RAG pipelines, fine-tuning open-source LLMs (Llama 3, Mistral), and building LangChain agents. Cut vector retrieval p99 latency to 30ms across 5M embeddings.',
      'GenAI Systems Engineer specializing in vector search optimization, prompt security guardrails, and enterprise copilot development. Built multi-modal RAG assistant serving 500k monthly queries.'
    ],
    experienceBullets: [
      'Architected enterprise RAG retrieval pipeline in LangChain and Pinecone, cutting LLM hallucination rates by 60%.',
      'Fine-tuned open-source 70B parameter LLMs using LoRA/QLoRA, reducing external API vendor costs by $45,000/month.',
      'Constructed production FastAPI microservice wrapper around vector search engine handling 2,000 queries/second.',
      'Implemented automated prompt injection guardrails and moderation filters ensuring 100% enterprise data safety.'
    ],
    atsKeywords: ['AI Engineer', 'Python', 'Machine Learning', 'LLMs', 'RAG', 'LangChain', 'Vector Databases', 'Pinecone', 'APIs', 'Prompt Engineering', 'Model Deployment', 'Docker'],
    faqs: [
      {
        question: 'What skills should an AI Engineer put on a resume?',
        answer: 'Focus on Python, LLM integration, RAG architectures, agent frameworks (LangChain, LlamaIndex), vector databases (Pinecone, Milvus, Qdrant), model fine-tuning (LoRA), prompt engineering, and API deployment (Docker, FastAPI).'
      }
    ],
    relatedRoles: [
      { slug: 'machine-learning-engineer', title: 'Machine Learning Engineer', category: 'ML' },
      { slug: 'ai-product-manager', title: 'AI Product Manager', category: 'AI Product' },
      { slug: 'data-scientist', title: 'Data Scientist', category: 'Data' }
    ],
    presetData: {
      title: 'AI Engineer Resume',
      personalInfo: { fullName: 'Sophia Chen', jobTitle: 'Senior AI Engineer', email: 'sophia.ai@nexus.io', location: 'Seattle, WA' },
      summary: 'AI Engineer with 5+ years building RAG pipelines, fine-tuning LLMs, and deploying Pinecone vector search microservices.',
      experience: [
        { id: 'exp-aie-1', role: 'Lead AI Engineer', company: 'Nexus AI Labs', location: 'Seattle, WA', startDate: '2022-01', endDate: 'Present', current: true, highlights: ['Architected enterprise RAG retrieval pipeline cutting hallucinations by 60%.', 'Fine-tuned LLMs saving $45,000/month in API costs.'] }
      ],
      skills: [{ id: 'sk-aie-1', category: 'AI Engineering Core', items: ['Python', 'Machine Learning', 'LLMs', 'RAG', 'LangChain', 'Vector Databases', 'Pinecone', 'APIs', 'Prompt Engineering', 'Model Deployment', 'Docker'] }]
    }
  },

  'devops-engineer': {
    slug: 'devops-engineer',
    roleTitle: 'DevOps Engineer',
    category: 'DevOps & Infrastructure',
    experienceLevel: 'Mid-Senior (4-8 Years)',
    metaTitle: 'DevOps Engineer Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create a DevOps Engineer resume with Resume Craft. Feature CI/CD pipelines, Kubernetes, Docker, Terraform, AWS, Ansible, and Prometheus monitoring.',
    h1: 'DevOps Engineer Resume Template',
    shortIntro: 'Demonstrate automated CI/CD deployment pipelines, Infrastructure as Code with Terraform, Kubernetes cluster administration, and high-availability cloud monitoring.',
    pageLength: '2-Page',
    skills: [
      { category: 'CI/CD & Automation', items: ['CI/CD Pipelines', 'GitHub Actions', 'GitLab CI', 'Jenkins', 'ArgoCD', 'Ansible', 'Shell Scripting (Bash/Python)'] },
      { category: 'Containers & IaC', items: ['Kubernetes', 'Docker', 'Terraform', 'Infrastructure as Code (IaC)', 'Helm', 'CloudFormation'] },
      { category: 'Cloud & Observability', items: ['AWS', 'GCP', 'Prometheus', 'Grafana', 'Datadog', 'Linux Admin', 'Security Governance'] }
    ],
    summaryExamples: [
      'DevOps Engineer with 6+ years automating enterprise CI/CD pipelines, Kubernetes container orchestration, and Terraform IaC on AWS. Accelerated software deployment frequency from bi-weekly to 15x daily.',
      'Senior Site Reliability & DevOps Engineer specializing in Prometheus/Grafana observability, zero-downtime blue/green deployments, and cloud security. Maintained 99.99% system SLA across 40+ microservices.'
    ],
    experienceBullets: [
      'Automated GitOps deployment pipelines in ArgoCD and Terraform, cutting code deployment lead times from 4 hours to 8 minutes.',
      'Administered production EKS Kubernetes clusters across 3 AWS availability zones, maintaining 99.99% uptime for payment APIs.',
      'Constructed centralized observability stack using Prometheus, Grafana, and Datadog, reducing p99 incident MTTR by 55%.',
      'Containerized 45+ legacy monolith applications into Docker microservices, cutting server compute expenses by $220,000 annually.'
    ],
    atsKeywords: ['DevOps Engineer', 'CI/CD', 'Kubernetes', 'Docker', 'Terraform', 'AWS', 'Ansible', 'Prometheus', 'Grafana', 'Linux', 'GitOps', 'IaC'],
    faqs: [
      {
        question: 'What are the most important skills for a DevOps Engineer resume?',
        answer: 'Highlight CI/CD automation tools (GitHub Actions, GitLab CI, ArgoCD), container orchestration (Kubernetes, Docker), Infrastructure as Code (Terraform), cloud platforms (AWS, GCP, Azure), and observability (Prometheus, Grafana).'
      }
    ],
    relatedRoles: [
      { slug: 'cloud-engineer', title: 'Cloud Engineer', category: 'Cloud' },
      { slug: 'cloud-architect', title: 'Cloud Architect', category: 'Architecture' },
      { slug: 'backend-developer', title: 'Backend Developer', category: 'Engineering' }
    ],
    presetData: {
      title: 'DevOps Engineer Resume',
      personalInfo: { fullName: 'Marcus Vance', jobTitle: 'Senior DevOps Engineer', email: 'marcus.devops@strata.io', location: 'Austin, TX' },
      summary: 'DevOps Engineer with 6+ years automating CI/CD pipelines, Terraform IaC, and Kubernetes container infrastructure on AWS.',
      experience: [
        { id: 'exp-de-1', role: 'Lead DevOps Engineer', company: 'Strata Cloud Systems', location: 'Austin, TX', startDate: '2021-02', endDate: 'Present', current: true, highlights: ['Automated GitOps pipelines cutting deployment lead times to 8 minutes.', 'Administered production EKS clusters maintaining 99.99% uptime.'] }
      ],
      skills: [{ id: 'sk-de-1', category: 'DevOps Core', items: ['CI/CD Pipelines', 'Kubernetes', 'Docker', 'Terraform', 'AWS', 'Ansible', 'Prometheus', 'Grafana', 'GitOps'] }]
    }
  },

  'cloud-engineer': {
    slug: 'cloud-engineer',
    roleTitle: 'Cloud Engineer',
    category: 'Cloud & Infrastructure',
    experienceLevel: 'Mid-Level (3-6 Years)',
    metaTitle: 'Cloud Engineer Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create a professional Cloud Engineer resume. Feature AWS, Azure, Terraform, Linux administration, VPC networking, and cloud migration.',
    h1: 'Cloud Engineer Resume Template',
    shortIntro: 'Highlight cloud infrastructure provisioning, AWS/Azure server management, VPC networking, IAM security policies, and automated Terraform scripts.',
    pageLength: '2-Page',
    skills: [
      { category: 'Cloud Platforms', items: ['AWS (EC2, S3, RDS, Lambda)', 'Azure', 'GCP', 'VPC Networking', 'IAM Security Policies', 'Route53'] },
      { category: 'IaC & Scripting', items: ['Terraform', 'CloudFormation', 'Python', 'Bash Scripting', 'Linux Administration', 'Ansible'] },
      { category: 'Infrastructure & Ops', items: ['Docker', 'Kubernetes', 'Cloud Migration', 'Backup & Disaster Recovery', 'Monitoring (CloudWatch)'] }
    ],
    summaryExamples: [
      'Cloud Engineer with 4+ years of hands-on experience designing, provisioning, and securing AWS/Azure cloud environments using Terraform IaC. Successfully migrated 20+ enterprise workloads to cloud VPCs.',
      'AWS Certified SysOps & Cloud Engineer specializing in Linux server administration, IAM zero-trust policies, and auto-scaling group optimization. Cut monthly AWS cloud bill by 25% through resource right-sizing.'
    ],
    experienceBullets: [
      'Provisioned multi-environment AWS VPC infrastructure using Terraform IaC scripts, maintaining 100% compliance with SOC 2 standards.',
      'Migrated 25 legacy Linux on-premise servers to AWS EC2 and RDS instances with zero operational downtime.',
      'Configured CloudWatch alarms and automated Lambda scripts to scale compute nodes dynamically during high-traffic sales events.',
      'Enforced strict AWS IAM role policies and KMS encryption across all database storage volumes.'
    ],
    atsKeywords: ['Cloud Engineer', 'AWS', 'Azure', 'Terraform', 'Linux Administration', 'VPC Networking', 'IAM', 'Docker', 'Cloud Migration', 'CloudWatch'],
    faqs: [
      {
        question: 'What skills should a Cloud Engineer list on an ATS resume?',
        answer: 'Emphasize cloud providers (AWS, Azure, GCP), Infrastructure as Code (Terraform), Linux system administration, networking (VPC, DNS, Subnets), security (IAM, KMS), and scripting (Python, Bash).'
      }
    ],
    relatedRoles: [
      { slug: 'devops-engineer', title: 'DevOps Engineer', category: 'DevOps' },
      { slug: 'cloud-architect', title: 'Cloud Architect', category: 'Architecture' }
    ],
    presetData: {
      title: 'Cloud Engineer Resume',
      personalInfo: { fullName: 'Marcus Vance', jobTitle: 'Cloud Infrastructure Engineer', email: 'marcus.cloud@strata.io', location: 'Austin, TX' },
      summary: 'Cloud Engineer with 4+ years experience provisioning AWS VPCs, Terraform IaC, and Linux administration.',
      experience: [
        { id: 'exp-ce-1', role: 'Cloud Engineer', company: 'Strata Cloud Systems', location: 'Austin, TX', startDate: '2021-06', endDate: 'Present', current: true, highlights: ['Provisioned AWS VPC infrastructure using Terraform.', 'Migrated 25 legacy servers to AWS EC2 with zero downtime.'] }
      ],
      skills: [{ id: 'sk-ce-1', category: 'Cloud Core', items: ['AWS', 'Azure', 'Terraform', 'Linux Administration', 'VPC Networking', 'IAM', 'Docker', 'Cloud Migration'] }]
    }
  },

  'frontend-developer': {
    slug: 'frontend-developer',
    roleTitle: 'Frontend Developer',
    category: 'Frontend Engineering',
    experienceLevel: 'Mid-Level (3-6 Years)',
    metaTitle: 'Frontend Developer Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create a Frontend Developer resume with Resume Craft. Feature React, Next.js, TypeScript, Tailwind CSS, Web Vitals optimization, and responsive UI design.',
    h1: 'Frontend Developer Resume Template',
    shortIntro: 'Showcase responsive React & Next.js user interfaces, TypeScript type safety, Core Web Vitals performance tuning, and accessible web standards.',
    pageLength: '3-Page',
    skills: [
      { category: 'Frontend Core', items: ['React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Sass'] },
      { category: 'State & Performance', items: ['Redux Toolkit', 'Zustand', 'React Query / SWR', 'Core Web Vitals (LCP/INP)', 'Code Splitting', 'Webpack / Vite'] },
      { category: 'Testing & Tools', items: ['Jest', 'React Testing Library', 'Cypress', 'Git', 'Figma to Code', 'WCAG Accessibility'] }
    ],
    summaryExamples: [
      'Frontend Developer with 5+ years crafting high-performance React and Next.js web applications. Spearheaded Core Web Vitals optimization (LCP/INP) that elevated mobile Lighthouse score from 58 to 98.',
      'UI/UX-focused Frontend Engineer specializing in TypeScript, Tailwind CSS, and accessible design systems. Built component library adopted by 40+ engineers across 5 web properties.'
    ],
    experienceBullets: [
      'Developed 40+ modular, accessible React UI components in TypeScript and Tailwind CSS, speeding up release velocity by 30%.',
      'Optimized mobile web application bundle size by 45% through dynamic code-splitting and image optimization.',
      'Refactored legacy Redux store to lightweight Zustand state management, reducing client-side memory overhead by 35%.',
      'Ensured 100% WCAG 2.1 AA accessibility compliance across core checkout and navigation user flows.'
    ],
    atsKeywords: ['Frontend Developer', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Core Web Vitals', 'HTML5', 'CSS3', 'Jest', 'UI UX'],
    faqs: [
      {
        question: 'What keywords are essential for a Frontend Developer resume?',
        answer: 'Include modern frontend frameworks (React, Next.js, Vue), languages (TypeScript, ES6 JavaScript), styling (Tailwind CSS, CSS3), performance optimization (Core Web Vitals, Vite), and testing (Jest, Cypress).'
      }
    ],
    relatedRoles: [
      { slug: 'software-engineer', title: 'Software Engineer', category: 'Engineering' },
      { slug: 'full-stack-developer', title: 'Full-Stack Developer', category: 'Engineering' },
      { slug: 'ui-ux-designer', title: 'UI/UX Designer', category: 'Design' }
    ],
    presetData: {
      title: 'Frontend Developer Resume',
      personalInfo: { fullName: 'David Miller', jobTitle: 'Senior Frontend Engineer', email: 'david.miller@pixelcraft.dev', location: 'Chicago, IL' },
      summary: 'Frontend Developer with 5+ years crafting React and Next.js web apps with clean TypeScript architectures and 98+ Lighthouse performance scores.',
      experience: [
        { id: 'exp-fe-1', role: 'Senior Frontend Developer', company: 'Pixel Craft Labs', location: 'Chicago, IL', startDate: '2021-04', endDate: 'Present', current: true, highlights: ['Optimized mobile Core Web Vitals boosting Lighthouse score to 98.', 'Built TypeScript component library adopted by 40+ engineers.'] }
      ],
      skills: [{ id: 'sk-fe-1', category: 'Frontend Core', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Core Web Vitals', 'HTML5', 'CSS3', 'Jest'] }]
    }
  },

  'backend-developer': {
    slug: 'backend-developer',
    roleTitle: 'Backend Developer',
    category: 'Backend Engineering',
    experienceLevel: 'Mid-Senior (4-7 Years)',
    metaTitle: 'Backend Developer Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create a Backend Developer resume with Resume Craft. Highlight Node.js, Python, Go, PostgreSQL, Redis, Microservices, and REST/GraphQL APIs.',
    h1: 'Backend Developer Resume Template',
    shortIntro: 'Demonstrate microservices architecture, REST/GraphQL API design, SQL database indexing, Redis caching, and p99 latency optimization.',
    pageLength: '2-Page',
    skills: [
      { category: 'Backend Languages', items: ['Node.js', 'Python', 'Go', 'Java', 'SQL', 'TypeScript', 'Rust'] },
      { category: 'Frameworks & APIs', items: ['Express', 'FastAPI', 'NestJS', 'REST APIs', 'GraphQL', 'gRPC', 'Microservices Architecture'] },
      { category: 'Databases & Infra', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Kafka', 'Docker', 'Kubernetes', 'AWS', 'Git'] }
    ],
    summaryExamples: [
      'Backend Developer with 6+ years architecting high-throughput Go and Node.js microservices, PostgreSQL databases, and Kafka message queues serving 15M daily requests.',
      'API & Backend Engineer specializing in REST/GraphQL gateway design, Redis caching strategies, and sub-50ms database query tuning.'
    ],
    experienceBullets: [
      'Architected Node.js and Go microservices processing 15M daily API requests with p99 response latencies under 45ms.',
      'Optimized PostgreSQL database query indexing and connection pooling, cutting database CPU utilization by 40%.',
      'Constructed real-time event-driven messaging queue using Apache Kafka processing 30,000 transactions/second.',
      'Authored comprehensive OpenAPI/Swagger documentation and unit test suites achieving 92% code coverage.'
    ],
    atsKeywords: ['Backend Developer', 'Node.js', 'Python', 'Go', 'PostgreSQL', 'Redis', 'Microservices', 'REST API', 'GraphQL', 'Kafka', 'Docker', 'SQL'],
    faqs: [
      {
        question: 'How do I highlight backend performance metrics on a resume?',
        answer: 'Include specific numbers: request throughput (RPS or daily calls), response latencies (p99/p95 ms), database optimization metrics (query execution reductions), and cost savings.'
      }
    ],
    relatedRoles: [
      { slug: 'software-engineer', title: 'Software Engineer', category: 'Engineering' },
      { slug: 'senior-software-engineer', title: 'Senior Software Engineer', category: 'Engineering' },
      { slug: 'full-stack-developer', title: 'Full-Stack Developer', category: 'Engineering' }
    ],
    presetData: {
      title: 'Backend Developer Resume',
      personalInfo: { fullName: 'Alex Morgan', jobTitle: 'Senior Backend Engineer', email: 'alex.backend@dev.io', location: 'San Francisco, CA' },
      summary: 'Backend Developer with 6+ years architecting Go and Node.js microservices, PostgreSQL query optimization, and Kafka streaming queues.',
      experience: [
        { id: 'exp-be-1', role: 'Lead Backend Developer', company: 'Vanguard SaaS Platforms', location: 'San Francisco, CA', startDate: '2020-03', endDate: 'Present', current: true, highlights: ['Architected Node.js/Go microservices serving 15M daily requests.', 'Optimized PostgreSQL queries cutting CPU utilization by 40%.'] }
      ],
      skills: [{ id: 'sk-be-1', category: 'Backend Core', items: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'Redis', 'Microservices', 'REST API', 'GraphQL', 'Kafka', 'Docker'] }]
    }
  },

  'full-stack-developer': {
    slug: 'full-stack-developer',
    roleTitle: 'Full-Stack Developer',
    category: 'Full-Stack Engineering',
    experienceLevel: 'Mid-Senior (4-8 Years)',
    metaTitle: 'Full-Stack Developer Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create an ATS Full-Stack Developer resume. Feature React, Next.js, Node.js, TypeScript, PostgreSQL, AWS, and end-to-end web architecture.',
    h1: 'Full-Stack Developer Resume Template',
    shortIntro: 'Highlight end-to-end web engineering, React/Next.js frontends, Node.js/Python backends, SQL databases, and seamless cloud deployments.',
    pageLength: '2-Page',
    skills: [
      { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3', 'Redux', 'GraphQL'] },
      { category: 'Backend', items: ['Node.js', 'Express', 'Python', 'Go', 'REST APIs', 'PostgreSQL', 'MongoDB', 'Redis'] },
      { category: 'DevOps & Cloud', items: ['AWS', 'Docker', 'Git', 'CI/CD Pipelines', 'Jest', 'Vercel'] }
    ],
    summaryExamples: [
      'Versatile Full-Stack Developer with 6+ years delivering end-to-end SaaS applications in React, Next.js, Node.js, and PostgreSQL. Spearheaded product architecture handling 3M monthly active users.',
      'Full-Stack Software Engineer skilled in TypeScript, microservices, cloud deployments, and UI performance tuning. Built Stripe billing and authentication integrations generating $5M ARR.'
    ],
    experienceBullets: [
      'Engineered full-stack SaaS platform using React, Node.js, and PostgreSQL, scaling user base from 10k to 500k active accounts.',
      'Built responsive UI dashboards in Next.js & Tailwind CSS, boosting user session time by 35%.',
      'Integrated Stripe billing pipelines and OAuth2 authentication, generating $5M in annual recurring revenue.',
      'Configured automated Docker container deployments on AWS ECS using GitHub Actions CI/CD pipelines.'
    ],
    atsKeywords: ['Full-Stack Developer', 'React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker', 'REST API', 'Tailwind CSS', 'Git'],
    faqs: [
      {
        question: 'What makes a strong Full-Stack Developer resume?',
        answer: 'Demonstrate balance across frontend (React, Next.js, TypeScript), backend (Node.js, Python, APIs), database management (PostgreSQL, Redis), and DevOps/cloud deployment.'
      }
    ],
    relatedRoles: [
      { slug: 'software-engineer', title: 'Software Engineer', category: 'Engineering' },
      { slug: 'frontend-developer', title: 'Frontend Developer', category: 'Engineering' },
      { slug: 'backend-developer', title: 'Backend Developer', category: 'Engineering' }
    ],
    presetData: {
      title: 'Full-Stack Developer Resume',
      personalInfo: { fullName: 'Alex Morgan', jobTitle: 'Senior Full-Stack Developer', email: 'alex.fullstack@dev.io', location: 'San Francisco, CA' },
      summary: 'Full-Stack Developer with 6+ years building React, Next.js, Node.js, and PostgreSQL SaaS applications with $5M ARR impact.',
      experience: [
        { id: 'exp-fs-1', role: 'Staff Full-Stack Developer', company: 'Vanguard SaaS Platforms', location: 'San Francisco, CA', startDate: '2020-01', endDate: 'Present', current: true, highlights: ['Engineered React/Node.js SaaS platform scaling to 500k active accounts.', 'Integrated Stripe billing generating $5M ARR.'] }
      ],
      skills: [{ id: 'sk-fs-1', category: 'Full Stack Core', items: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker', 'REST API', 'Tailwind CSS'] }]
    }
  },

  'project-manager': {
    slug: 'project-manager',
    roleTitle: 'Project Manager',
    category: 'Project & Operations',
    experienceLevel: 'Mid-Senior (4-8 Years)',
    metaTitle: 'Project Manager Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create a professional Project Manager resume. Highlight PMP certification, Agile, Scrum, budget management, risk mitigation, and Jira delivery.',
    h1: 'Project Manager Resume Template',
    shortIntro: 'Showcase PMP certifications, Agile/Scrum delivery, multimillion-dollar project budgets, cross-functional risk mitigation, and on-time project completion.',
    pageLength: '2-Page',
    skills: [
      { category: 'Methodologies & Certs', items: ['PMP Certified', 'Agile', 'Scrum Master (CSM)', 'Waterfall', 'PRINCE2', 'PMBOK'] },
      { category: 'Management & Operations', items: ['Budget Management', 'Risk Mitigation', 'Resource Allocation', 'Stakeholder Communication', 'Scope Governance'] },
      { category: 'Tools & Software', items: ['Jira', 'Confluence', 'Asana', 'MS Project', 'Smartsheet', 'Trello'] }
    ],
    summaryExamples: [
      'PMP-certified Senior Project Manager with 7+ years directing complex IT and software development projects up to $8M in budget. Maintained 98% on-time and on-budget project delivery across 40+ enterprise deployments.',
      'Agile Scrum Master & Project Manager specializing in cross-functional team coordination, vendor contract negotiation, and risk mitigation. Reduced sprint blocker resolution time by 45%.'
    ],
    experienceBullets: [
      'Managed $8M enterprise software deployment budget across 15 cross-functional teams, completing project 2 weeks ahead of target schedule.',
      'Facilitated daily Scrum standups, sprint planning, and retrospective meetings in Jira for 35 developers and designers.',
      'Formulated risk management mitigation strategies, decreasing unexpected project scope creep by 30%.',
      'Negotiated third-party vendor software contracts, saving $180,000 in annual operational overhead.'
    ],
    atsKeywords: ['Project Manager', 'PMP', 'Agile', 'Scrum', 'Budget Management', 'Risk Mitigation', 'Jira', 'Stakeholder Communication', 'Resource Allocation', 'On-Time Delivery'],
    faqs: [
      {
        question: 'How do I highlight project management results on a resume?',
        answer: 'Specify project budgets ($ values), team sizes, on-time completion rates (%), methodology frameworks (PMP, Scrum), and risk mitigation achievements.'
      }
    ],
    relatedRoles: [
      { slug: 'product-manager', title: 'Product Manager', category: 'Product' },
      { slug: 'business-analyst', title: 'Business Analyst', category: 'Analytics' }
    ],
    presetData: {
      title: 'Project Manager Resume',
      personalInfo: { fullName: 'Elena Rostova', jobTitle: 'Senior PMP Project Manager', email: 'elena.pmp@projectcraft.io', location: 'New York, NY' },
      summary: 'PMP-certified Senior Project Manager with 7+ years leading Agile engineering teams, $8M budgets, and risk mitigation strategies.',
      experience: [
        { id: 'exp-pmg-1', role: 'Lead Project Manager', company: 'Enterprise Project Solutions', location: 'New York, NY', startDate: '2020-04', endDate: 'Present', current: true, highlights: ['Managed $8M software deployment budget delivered 2 weeks early.', 'Facilitated Agile Scrum ceremonies for 35 engineers.'] }
      ],
      skills: [{ id: 'sk-pmg-1', category: 'Project Core', items: ['Project Manager', 'PMP', 'Agile', 'Scrum', 'Budget Management', 'Risk Mitigation', 'Jira', 'Stakeholder Communication'] }]
    }
  },

  'business-analyst': {
    slug: 'business-analyst',
    roleTitle: 'Business Analyst',
    category: 'Business & Analytics',
    experienceLevel: 'Mid-Level (3-6 Years)',
    metaTitle: 'Business Analyst Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create an ATS Business Analyst resume. Highlight requirements gathering, Agile user stories, process mapping, SQL, and stakeholder alignment.',
    h1: 'Business Analyst Resume Template',
    shortIntro: 'Highlight business requirements gathering, BRD/FRD authoring, process mapping (BPMN), SQL data analysis, and bridging business needs with technical solutions.',
    pageLength: '3-Page',
    skills: [
      { category: 'Requirements & Modeling', items: ['Requirements Gathering', 'BRD / FRD Authoring', 'Process Mapping (BPMN)', 'Gap Analysis', 'User Stories & Acceptance Criteria'] },
      { category: 'Data & Analytics', items: ['SQL', 'Excel (Advanced)', 'Tableau', 'Power BI', 'Data Modeling', 'UAT Testing'] },
      { category: 'Methodologies & Tools', items: ['Agile / Scrum', 'Jira', 'Confluence', 'Visio', 'Stakeholder Management', 'Change Management'] }
    ],
    summaryExamples: [
      'Business Analyst with 5+ years of experience analyzing enterprise workflows, gathering technical requirements, and defining user acceptance criteria. Streamlined claims processing workflow, cutting operational turnaround time by 35%.',
      'CBAP-certified Senior Business Analyst skilled in SQL, Tableau visualization, and Agile story mapping. Led requirement workshops for 10+ business units representing $25M in annual operational volume.'
    ],
    experienceBullets: [
      'Authored 60+ detailed Business Requirement Documents (BRDs) and Functional Specifications (FRDs) for legacy ERP migration.',
      'Conducted process gap analysis using BPMN workflows, identifying operational bottlenecks that saved $320,000 annually.',
      'Facilitated User Acceptance Testing (UAT) sessions with 150+ business stakeholders, achieving 99% first-pass sign-off.',
      'Executed SQL queries across PostgreSQL databases to validate data migration accuracy during CRM integration.'
    ],
    atsKeywords: ['Business Analyst', 'Requirements Gathering', 'BRD', 'BPMN', 'Process Mapping', 'SQL', 'Agile', 'User Stories', 'UAT Testing', 'Jira', 'Gap Analysis'],
    faqs: [
      {
        question: 'What skills should a Business Analyst feature on an ATS resume?',
        answer: 'Include requirements gathering, document authoring (BRD/FRD), process mapping (BPMN, Visio), SQL querying, UAT testing, Agile user stories, Jira, and stakeholder alignment.'
      }
    ],
    relatedRoles: [
      { slug: 'data-analyst', title: 'Data Analyst', category: 'Data' },
      { slug: 'product-manager', title: 'Product Manager', category: 'Product' },
      { slug: 'project-manager', title: 'Project Manager', category: 'Management' }
    ],
    presetData: {
      title: 'Business Analyst Resume',
      personalInfo: { fullName: 'Elena Rostova', jobTitle: 'Senior Business Analyst', email: 'elena.ba@businesscraft.io', location: 'New York, NY' },
      summary: 'Business Analyst with 5+ years experience gathering requirements, authoring BRDs, BPMN process mapping, and executing SQL data validation.',
      experience: [
        { id: 'exp-ba-1', role: 'Senior Business Analyst', company: 'Nexus Business Solutions', location: 'New York, NY', startDate: '2021-03', endDate: 'Present', current: true, highlights: ['Authored 60+ BRD/FRD documents for enterprise ERP migration.', 'Conducted BPMN process gap analysis saving $320k annually.'] }
      ],
      skills: [{ id: 'sk-ba-1', category: 'BA Stack', items: ['Business Analyst', 'Requirements Gathering', 'BRD', 'BPMN', 'Process Mapping', 'SQL', 'Agile', 'User Stories', 'UAT Testing'] }]
    }
  },

  'marketing-manager': {
    slug: 'marketing-manager',
    roleTitle: 'Marketing Manager',
    category: 'Marketing & Growth',
    experienceLevel: 'Mid-Senior (4-8 Years)',
    metaTitle: 'Marketing Manager Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create a professional Marketing Manager resume. Highlight digital marketing, SEO/SEM, customer acquisition, ROI metrics, and campaign management.',
    h1: 'Marketing Manager Resume Template',
    shortIntro: 'Highlight multi-channel campaign management, SEO/SEM growth, customer acquisition cost (CAC) reduction, content strategy, and return on ad spend (ROAS).',
    pageLength: '2-Page',
    skills: [
      { category: 'Digital & Growth Marketing', items: ['Digital Marketing', 'SEO / SEM', 'Customer Acquisition (CAC)', 'Content Strategy', 'Email Marketing', 'Social Media Marketing'] },
      { category: 'Analytics & Tools', items: ['Google Analytics 4', 'HubSpot', 'Marketo', 'Google Ads', 'Meta Ads Manager', 'A/B Testing', 'ROAS Tracking'] },
      { category: 'Strategy & Management', items: ['Campaign Management', 'Brand Strategy', 'Budget Allocation', 'Lead Generation', 'Copywriting', 'PR & Communications'] }
    ],
    summaryExamples: [
      'Growth-focused Marketing Manager with 6+ years driving multi-channel digital campaigns, SEO growth, and paid acquisition. Scaled inbound organic traffic by 180% while reducing customer acquisition costs (CAC) by 28%.',
      'Senior B2B Marketing Manager specializing in demand generation, Marketo marketing automation, and content strategy. Generated 4,500+ qualified MQLs annually for enterprise SaaS sales team.'
    ],
    experienceBullets: [
      'Directed $1.5M annual paid digital ad budget across Google Ads and LinkedIn Ads, delivering a 4.2x ROAS.',
      'Spearheaded comprehensive SEO content strategy, increasing organic search organic sessions from 50k to 240k monthly.',
      'Automated email nurture lead scoring workflows in HubSpot, boosting MQL-to-SQL pipeline conversion by 22%.',
      'Managed a creative team of 5 designers and copywriters, producing 50+ high-performing campaign assets per quarter.'
    ],
    atsKeywords: ['Marketing Manager', 'Digital Marketing', 'SEO', 'SEM', 'Customer Acquisition', 'Google Analytics', 'HubSpot', 'Campaign Management', 'ROAS', 'Lead Generation'],
    faqs: [
      {
        question: 'What metrics should a Marketing Manager include on a resume?',
        answer: 'Quantify your impact: ROAS (Return on Ad Spend), CAC reduction, traffic growth (%), MQL/SQL counts, email open/conversion rates, and ad budget managed ($).'
      }
    ],
    relatedRoles: [
      { slug: 'product-manager', title: 'Product Manager', category: 'Product' }
    ],
    presetData: {
      title: 'Marketing Manager Resume',
      personalInfo: { fullName: 'Elena Rostova', jobTitle: 'Senior Growth Marketing Manager', email: 'elena.marketing@growth.io', location: 'New York, NY' },
      summary: 'Marketing Manager with 6+ years driving SEO organic growth, paid acquisition, Google Analytics 4, and $1.5M ad budgets.',
      experience: [
        { id: 'exp-mm-1', role: 'Senior Marketing Manager', company: 'GrowthScale Digital', location: 'New York, NY', startDate: '2021-01', endDate: 'Present', current: true, highlights: ['Directed $1.5M digital ad budget delivering 4.2x ROAS.', 'Scaled organic SEO search sessions from 50k to 240k monthly.'] }
      ],
      skills: [{ id: 'sk-mm-1', category: 'Marketing Core', items: ['Marketing Manager', 'Digital Marketing', 'SEO', 'SEM', 'Customer Acquisition', 'Google Analytics', 'HubSpot', 'Campaign Management'] }]
    }
  },

  'financial-analyst': {
    slug: 'financial-analyst',
    roleTitle: 'Financial Analyst',
    category: 'Finance & Accounting',
    experienceLevel: 'Mid-Level (3-6 Years)',
    metaTitle: 'Financial Analyst Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create a Financial Analyst resume with Resume Craft. Showcase financial modeling, forecasting, variance analysis, Excel DCF models, and SQL.',
    h1: 'Financial Analyst Resume Template',
    shortIntro: 'Highlight financial modeling (DCF, LBO), budget forecasting, variance analysis, SQL data extraction, and executive presentation of financial reports.',
    pageLength: '2-Page',
    skills: [
      { category: 'Financial Modeling & FP&A', items: ['Financial Modeling', 'Financial Forecasting', 'Variance Analysis', 'DCF / LBO Valuation', 'FP&A', 'Budgeting & Planning'] },
      { category: 'Software & Analysis', items: ['Excel (Advanced VBA / Macros)', 'SQL', 'SAP', 'Oracle Financials', 'Hyperion', 'Bloomberg Terminal', 'Power BI'] },
      { category: 'Accounting & Compliance', items: ['GAAP / IFRS', 'Financial Reporting', 'Cash Flow Analysis', 'M&A Due Diligence', 'Audit Support'] }
    ],
    summaryExamples: [
      'Analytical Financial Analyst with 5+ years of experience building complex financial models, quarterly budget forecasts, and corporate valuation analyses for $150M business divisions.',
      'CFA Charterholder & Senior FP&A Analyst skilled in advanced Excel DCF models, SQL query extraction, and variance analysis. Uncovered $1.4M in annual operational expense savings.'
    ],
    experienceBullets: [
      'Constructed 3-statement financial models and 5-year DCF valuation forecasts for 12 corporate M&A acquisition targets.',
      'Spearheaded quarterly financial variance analysis across $150M operating budget, identifying cost savings of $1.4M.',
      'Automated monthly financial reporting dashboards in Power BI and SQL, cutting reporting close cycle from 6 days to 1 day.',
      'Presented monthly P&L financial summaries and capital expenditure recommendations to the CFO and executive committee.'
    ],
    atsKeywords: ['Financial Analyst', 'Financial Modeling', 'Forecasting', 'Variance Analysis', 'FP&A', 'Excel', 'SQL', 'DCF', 'P&L', 'GAAP', 'Budgeting'],
    faqs: [
      {
        question: 'What skills should a Financial Analyst feature on a resume?',
        answer: 'Highlight financial modeling (DCF, 3-statement models), advanced Excel (VBA, Pivot Tables), FP&A forecasting, variance analysis, SQL, SAP/Oracle ERP systems, and GAAP compliance.'
      }
    ],
    relatedRoles: [
      { slug: 'business-analyst', title: 'Business Analyst', category: 'Analytics' },
      { slug: 'data-analyst', title: 'Data Analyst', category: 'Data' }
    ],
    presetData: {
      title: 'Financial Analyst Resume',
      personalInfo: { fullName: 'Elena Rostova', jobTitle: 'Senior Financial Analyst', email: 'elena.finance@fincraft.io', location: 'New York, NY' },
      summary: 'Financial Analyst with 5+ years experience building 3-statement financial models, quarterly FP&A forecasts, and SQL reports for $150M budgets.',
      experience: [
        { id: 'exp-fa-1', role: 'Senior Financial Analyst', company: 'Apex Capital Partners', location: 'New York, NY', startDate: '2021-04', endDate: 'Present', current: true, highlights: ['Constructed 3-statement financial models and DCF forecasts for 12 M&A targets.', 'Uncovered $1.4M in operational cost savings.'] }
      ],
      skills: [{ id: 'sk-fa-1', category: 'Finance Core', items: ['Financial Analyst', 'Financial Modeling', 'Forecasting', 'Variance Analysis', 'FP&A', 'Excel', 'SQL', 'DCF', 'P&L'] }]
    }
  },

  'human-resources-manager': {
    slug: 'human-resources-manager',
    roleTitle: 'Human Resources Manager',
    category: 'Human Resources & Operations',
    experienceLevel: 'Mid-Senior (5-9 Years)',
    metaTitle: 'Human Resources Manager Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create a professional Human Resources Manager resume. Highlight talent acquisition, employee relations, HRIS (Workday), compensation, and compliance.',
    h1: 'Human Resources Manager Resume Template',
    shortIntro: 'Showcase talent acquisition scaling, HRIS software management (Workday, BambooHR), employee retention programs, labor law compliance, and culture building.',
    pageLength: '2-Page',
    skills: [
      { category: 'HR Management & Operations', items: ['Human Resources Management', 'Talent Acquisition', 'Employee Relations', 'Performance Management', 'Onboarding & Training'] },
      { category: 'Systems & Compliance', items: ['HRIS (Workday, BambooHR)', 'Labor Law Compliance', 'Compensation & Benefits', 'HR Analytics', 'FMLA / EEO'] },
      { category: 'Strategy & Culture', items: ['Organizational Development', 'Employee Engagement', 'Retention Strategies', 'Conflict Resolution', 'Diversity & Inclusion (DEI)'] }
    ],
    summaryExamples: [
      'SHRM-SCP certified Human Resources Manager with 7+ years of experience leading HR operations, talent acquisition, and employee retention programs for 800+ headcount enterprise companies. Reduced annual employee turnover by 24%.',
      'Strategic HR Business Partner & Manager skilled in Workday HRIS administration, competitive compensation structuring, and labor compliance. Managed full-cycle recruitment scaling team from 150 to 450 employees.'
    ],
    experienceBullets: [
      'Led HR operations and employee relations across 800+ headcount corporate employees, implementing engagement programs that slashed turnover by 24%.',
      'Administered Workday HRIS system, automating onboarding workflows that reduced new hire administrative processing from 5 days to 4 hours.',
      'Managed full-cycle talent acquisition for 120+ technical and executive positions annually with an average time-to-fill of 28 days.',
      'Overhauled company-wide performance review process, instituting quarterly feedback check-ins adopted by 100% of managers.'
    ],
    atsKeywords: ['Human Resources Manager', 'HRIS', 'Workday', 'Talent Acquisition', 'Employee Relations', 'Performance Management', 'Onboarding', 'Compliance', 'SHRM', 'Retention'],
    faqs: [
      {
        question: 'What certifications help an HR Manager resume?',
        answer: 'Top certifications include SHRM-CP, SHRM-SCP, PHR (Professional in Human Resources), and SPHR.'
      }
    ],
    relatedRoles: [
      { slug: 'project-manager', title: 'Project Manager', category: 'Management' }
    ],
    presetData: {
      title: 'Human Resources Manager Resume',
      personalInfo: { fullName: 'Elena Rostova', jobTitle: 'HR Manager (SHRM-SCP)', email: 'elena.hr@hrcraft.io', location: 'New York, NY' },
      summary: 'SHRM-SCP certified HR Manager with 7+ years directing HR operations, Workday HRIS administration, and talent retention programs for 800+ employees.',
      experience: [
        { id: 'exp-hr-1', role: 'Human Resources Manager', company: 'Global HR Solutions', location: 'New York, NY', startDate: '2020-05', endDate: 'Present', current: true, highlights: ['Led HR operations for 800+ employees cutting turnover by 24%.', 'Administered Workday HRIS automating onboarding workflows.'] }
      ],
      skills: [{ id: 'sk-hr-1', category: 'HR Core', items: ['Human Resources Manager', 'HRIS', 'Workday', 'Talent Acquisition', 'Employee Relations', 'Performance Management', 'Compliance'] }]
    }
  },

  'ux-designer': {
    slug: 'ux-designer',
    roleTitle: 'UX Designer',
    category: 'Design & User Experience',
    experienceLevel: 'Mid-Senior (3-7 Years)',
    metaTitle: 'UX Designer Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create a professional UX Designer resume. Feature user research, wireframing, Figma, usability testing, design systems, and prototyping.',
    h1: 'UX Designer Resume Template',
    shortIntro: 'Highlight user research methodologies, Figma wireframing, interactive prototyping, usability testing, and accessible design systems.',
    pageLength: '3-Page',
    skills: [
      { category: 'UX Research & Strategy', items: ['UX Research', 'User Research', 'Usability Testing', 'Information Architecture', 'User Journey Mapping', 'Personas'] },
      { category: 'Design & Prototyping', items: ['Figma', 'Wireframing', 'Prototyping', 'Design Systems', 'Interactive Design', 'User Flows', 'WCAG Accessibility'] },
      { category: 'Tools & Collaboration', items: ['Adobe XD', 'Miro', 'Principle', 'Design Sprints', 'Agile Collaboration', 'HTML/CSS Awareness'] }
    ],
    summaryExamples: [
      'User-centered UX Designer with 5+ years of experience leading end-to-end user research, wireframing, and Figma prototyping for high-traffic mobile and web products. Redesigned core user flow elevating checkout completion by 32%.',
      'Senior UX Architect & Researcher skilled in usability testing, design systems, and WCAG accessibility. Conducted 100+ user interviews that informed the redesign of a 3M-user SaaS dashboard.'
    ],
    experienceBullets: [
      'Architected comprehensive Figma design system containing 200+ accessible components adopted across 4 product engineering squads.',
      'Conducted 40+ qualitative usability test sessions and card sorts, uncovering friction points that boosted conversion by 32%.',
      'Created low and high-fidelity interactive prototypes for iOS and web apps, accelerating stakeholder design sign-off by 50%.',
      'Partnered with frontend engineers to enforce WCAG 2.1 AA accessibility standards across all core web user journeys.'
    ],
    atsKeywords: ['UX Designer', 'Figma', 'User Research', 'Usability Testing', 'Wireframing', 'Prototyping', 'Design Systems', 'Information Architecture', 'User Journey', 'Accessibility'],
    faqs: [
      {
        question: 'How do I format a UX Designer resume for ATS?',
        answer: 'While your portfolio website showcases visual design, your ATS resume must use plain text formatting with clear standard headings (Experience, Skills, Tools), listing Figma, UX Research, Usability Testing, and metric outcomes.'
      }
    ],
    relatedRoles: [
      { slug: 'ui-ux-designer', title: 'UI/UX Designer', category: 'Design' },
      { slug: 'frontend-developer', title: 'Frontend Developer', category: 'Engineering' },
      { slug: 'product-manager', title: 'Product Manager', category: 'Product' }
    ],
    presetData: {
      title: 'UX Designer Resume',
      personalInfo: { fullName: 'Elena Rostova', jobTitle: 'Senior UX Designer', email: 'elena.ux@designcraft.io', location: 'New York, NY', website: 'elenarostova.design' },
      summary: 'UX Designer with 5+ years leading user research, Figma prototypes, and WCAG accessible design systems that elevated conversion by 32%.',
      experience: [
        { id: 'exp-ux-1', role: 'Lead UX Designer', company: 'Pixel Craft Design', location: 'New York, NY', startDate: '2021-02', endDate: 'Present', current: true, highlights: ['Architected Figma design system with 200+ components.', 'Conducted 40+ usability tests boosting checkout conversion by 32%.'] }
      ],
      skills: [{ id: 'sk-ux-1', category: 'UX Core', items: ['UX Designer', 'Figma', 'User Research', 'Usability Testing', 'Wireframing', 'Prototyping', 'Design Systems', 'Accessibility'] }]
    }
  },

  'ui-ux-designer': {
    slug: 'ui-ux-designer',
    roleTitle: 'UI/UX Designer',
    category: 'Design & User Experience',
    experienceLevel: 'Mid-Senior (4-7 Years)',
    metaTitle: 'UI/UX Designer Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create a UI/UX Designer resume with Resume Craft. Feature Figma, UI visual design, user research, design tokens, micro-interactions, and mobile responsiveness.',
    h1: 'UI/UX Designer Resume Template',
    shortIntro: 'Combine aesthetic visual UI design with deep UX research, Figma design token libraries, responsive layouts, and interactive micro-animations.',
    pageLength: '2-Page',
    skills: [
      { category: 'Visual UI & Product Design', items: ['UI Design', 'Visual Design', 'Design Systems', 'Figma', 'Design Tokens', 'Typography', 'Micro-interactions'] },
      { category: 'UX Research & Flows', items: ['UX Research', 'User Journey Mapping', 'Wireframing', 'Prototyping', 'Usability Testing', 'Information Architecture'] },
      { category: 'Collaboration & Front', items: ['Design Sprints', 'WCAG Accessibility', 'HTML5/CSS3 Awareness', 'Tailwind Knowledge', 'Framer', 'Zeplin'] }
    ],
    summaryExamples: [
      'Versatile UI/UX Designer with 6+ years creating visually stunning, intuitive digital experiences across web, iOS, and Android. Built scalable Figma design token system that cut UI development handoff friction by 40%.',
      'Senior Product & UI/UX Designer specializing in micro-interactions, responsive design systems, and user research. Redesigned mobile app interface to achieve a 4.9-star rating across 1M+ active app downloads.'
    ],
    experienceBullets: [
      'Redesigned core mobile application UI/UX across iOS and Android, boosting 30-day user engagement by 42%.',
      'Created multi-brand Figma design token system covering typography, color palettes, and component states for 50+ engineers.',
      'Conducted 50+ remote usability testing sessions and A/B visual tests, refining navigation to reduce drop-offs by 25%.',
      'Partnered closely with frontend developers to ensure pixel-perfect CSS/Tailwind implementation and 60fps micro-animations.'
    ],
    atsKeywords: ['UI/UX Designer', 'Figma', 'UI Design', 'UX Research', 'Design Systems', 'Wireframing', 'Prototyping', 'Typography', 'Micro-interactions', 'Accessibility'],
    faqs: [
      {
        question: 'What is the difference between a UI/UX Designer resume and a UX Designer resume?',
        answer: 'A UI/UX Designer resume highlights both visual design aesthetic skills (UI, typography, color theory, design tokens, micro-interactions) and user research/usability methodologies (UX, wireframes, testing).'
      }
    ],
    relatedRoles: [
      { slug: 'ux-designer', title: 'UX Designer', category: 'Design' },
      { slug: 'frontend-developer', title: 'Frontend Developer', category: 'Engineering' }
    ],
    presetData: {
      title: 'UI/UX Designer Resume',
      personalInfo: { fullName: 'Elena Rostova', jobTitle: 'Senior UI/UX Designer', email: 'elena.uiux@pixelcraft.io', location: 'New York, NY', website: 'elenarostova.design' },
      summary: 'UI/UX Designer with 6+ years creating visual UI design systems, Figma design tokens, and user-tested mobile app interfaces for 1M+ active users.',
      experience: [
        { id: 'exp-uiux-1', role: 'Lead UI/UX Designer', company: 'Pixel Craft Labs', location: 'New York, NY', startDate: '2020-08', endDate: 'Present', current: true, highlights: ['Redesigned mobile app UI boosting 30-day engagement by 42%.', 'Created multi-brand Figma design token system.'] }
      ],
      skills: [{ id: 'sk-uiux-1', category: 'UI/UX Core', items: ['UI/UX Designer', 'Figma', 'UI Design', 'UX Research', 'Design Systems', 'Wireframing', 'Prototyping', 'Typography'] }]
    }
  },

  'solutions-architect': {
    slug: 'solutions-architect',
    roleTitle: 'Solutions Architect',
    category: 'Architecture & Technology',
    experienceLevel: 'Senior (6-10 Years)',
    metaTitle: 'Solutions Architect Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create a Solutions Architect resume with Resume Craft. Feature AWS/Azure Cloud, Microservices, System Architecture, Integration, and Enterprise Security.',
    h1: 'Solutions Architect Resume Template',
    shortIntro: 'Highlight technical cloud architecture, microservices integrations, client requirements translation, security frameworks, and high-availability systems design.',
    pageLength: '3-Page',
    skills: [
      { category: 'Architecture & Systems', items: ['Solutions Architecture', 'System Design', 'Microservices', 'API Management', 'Cloud Security', 'High Availability'] },
      { category: 'Cloud & Tech Stack', items: ['AWS / Azure / GCP', 'Docker & Kubernetes', 'SQL & NoSQL', 'Kafka', 'Terraform', 'TOGAF'] },
      { category: 'Business & Leadership', items: ['RFP Proposals', 'Client Consultations', 'Cost Optimization', 'Stakeholder Alignment', 'Solution Blueprints'] }
    ],
    summaryExamples: [
      'Customer-focused Senior Solutions Architect with 8+ years designing enterprise cloud architectures for Fortune 500 financial and SaaS platforms. Architected resilient microservices systems handling $100M+ in annual transaction volume.',
      'AWS Certified Solutions Architect specializing in cloud migrations, event-driven integrations, and security governance. Reduced enterprise client infrastructure operating costs by 30%.'
    ],
    experienceBullets: [
      'Architected end-to-end cloud solution blueprints for 15 enterprise clients, generating $12M in new ARR contract value.',
      'Designed zero-downtime multi-tenant microservices platform processing 25M daily transactions on AWS and Kubernetes.',
      'Authored 40+ technical proposal responses (RFPs) and architectural decision records (ADRs) for C-suite stakeholders.',
      'Slashing client infrastructure overhead by 30% through containerization and serverless computing migration.'
    ],
    atsKeywords: ['Solutions Architect', 'AWS', 'Azure', 'System Design', 'Microservices', 'Cloud Architecture', 'APIs', 'TOGAF', 'RFPs', 'Security'],
    faqs: [
      {
        question: 'What is the most important skill for a Solutions Architect resume?',
        answer: 'Demonstrate balance between deep technical architecture (AWS/Azure, APIs, System Design, Microservices) and business strategy (RFP proposals, ROI impact, executive stakeholder alignment).'
      }
    ],
    relatedRoles: [
      { slug: 'enterprise-architect', title: 'Enterprise Architect', category: 'Architecture' },
      { slug: 'cloud-architect', title: 'Cloud Architect', category: 'Cloud' }
    ],
    presetData: {
      title: 'Solutions Architect Resume',
      personalInfo: { fullName: 'David Miller', jobTitle: 'Senior Solutions Architect', email: 'david.solutions@cloudcraft.io', location: 'Chicago, IL' },
      summary: 'Senior Solutions Architect with 8+ years designing AWS/Azure microservices architectures for $100M+ transaction volume platforms.',
      experience: [
        { id: 'exp-sa-1', role: 'Principal Solutions Architect', company: 'Cloud Solutions Group', location: 'Chicago, IL', startDate: '2020-02', endDate: 'Present', current: true, highlights: ['Architected multi-tenant cloud platform processing 25M transactions daily.', 'Authored 40+ technical solution proposals yielding $12M ARR.'] }
      ],
      skills: [{ id: 'sk-sa-1', category: 'Solutions Core', items: ['Solutions Architect', 'AWS', 'Azure', 'System Design', 'Microservices', 'Cloud Architecture', 'APIs', 'Security'] }]
    }
  },

  'scrum-master': {
    slug: 'scrum-master',
    roleTitle: 'Scrum Master',
    category: 'Agile & Project Management',
    experienceLevel: 'Mid-Senior (4-7 Years)',
    metaTitle: 'Scrum Master Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Download a free ATS Scrum Master resume template. Highlight CSM/PSM certifications, Agile ceremonies, sprint velocity, Jira, and team coaching.',
    h1: 'Scrum Master Resume Template',
    shortIntro: 'Demonstrate Agile ceremonies facilitation, CSM/PSM certifications, sprint velocity improvement, Jira workflow optimization, and team coaching.',
    pageLength: '2-Page',
    skills: [
      { category: 'Agile & Frameworks', items: ['Certified Scrum Master (CSM)', 'PSM I / II', 'SAFe Agilist', 'Kanban', 'Scrum Framework', 'Agile Coaching'] },
      { category: 'Ceremonies & Delivery', items: ['Sprint Planning', 'Daily Standups', 'Sprint Retrospectives', 'Backlog Grooming', 'Velocity Metrics', 'Burn-down Charts'] },
      { category: 'Tools & Collaboration', items: ['Jira Software', 'Confluence', 'Miro', 'Azure DevOps', 'Trello', 'Conflict Resolution'] }
    ],
    summaryExamples: [
      'Certified Scrum Master (CSM & PSM II) with 6+ years of experience guiding multi-squad software engineering teams through Agile transformations. Boosted sprint delivery velocity by 35% while cutting team turnover to zero.',
      'Agile Coach & Senior Scrum Master adept at clearing blockers, optimizing Jira backlogs, and fostering psychological safety across distributed engineering teams.'
    ],
    experienceBullets: [
      'Facilitated daily Scrum ceremonies, sprint planning, and retrospective sessions for 4 cross-functional engineering squads in Jira.',
      'Elevated average sprint velocity delivery from 45 to 68 story points per sprint over 6 months.',
      'Coached 30+ developers, product owners, and QA engineers on Agile metrics, story sizing, and definition of done (DoD).',
      'Removed 150+ operational sprint impediments, reducing dependency resolution delays by 40%.'
    ],
    atsKeywords: ['Scrum Master', 'CSM', 'Agile', 'Sprint Planning', 'Jira', 'Kanban', 'Sprint Velocity', 'Backlog Grooming', 'Scrum Ceremonies', 'Agile Coaching'],
    faqs: [
      {
        question: 'What certifications should a Scrum Master include on an ATS resume?',
        answer: 'Prominently display CSM (Certified ScrumMaster), PSM I/II (Professional Scrum Master), SAFe Agilist, or PMI-ACP in your header and certification section.'
      }
    ],
    relatedRoles: [
      { slug: 'project-manager', title: 'Project Manager', category: 'Management' },
      { slug: 'product-manager', title: 'Product Manager', category: 'Product' }
    ],
    presetData: {
      title: 'Scrum Master Resume',
      personalInfo: { fullName: 'Elena Rostova', jobTitle: 'Senior Certified Scrum Master (CSM)', email: 'elena.csm@agilecraft.io', location: 'New York, NY' },
      summary: 'Certified Scrum Master (CSM) with 6+ years guiding engineering squads, elevating sprint velocity by 35% in Jira.',
      experience: [
        { id: 'exp-sm-1', role: 'Lead Scrum Master', company: 'Agile Engineering Labs', location: 'New York, NY', startDate: '2021-01', endDate: 'Present', current: true, highlights: ['Facilitated Agile Scrum ceremonies for 4 cross-functional squads in Jira.', 'Elevated sprint velocity from 45 to 68 story points.'] }
      ],
      skills: [{ id: 'sk-sm-1', category: 'Scrum Core', items: ['Scrum Master', 'CSM', 'Agile', 'Sprint Planning', 'Jira', 'Kanban', 'Sprint Velocity', 'Backlog Grooming'] }]
    }
  },

  'qa-automation-engineer': {
    slug: 'qa-automation-engineer',
    roleTitle: 'QA Automation Engineer',
    category: 'Engineering & Quality Assurance',
    experienceLevel: 'Mid-Senior (3-7 Years)',
    metaTitle: 'QA Automation Engineer Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create a QA Automation Engineer resume. Feature Selenium, Cypress, Playwright, Python, Java, API Testing, CI/CD integration, and test frameworks.',
    h1: 'QA Automation Engineer Resume Template',
    shortIntro: 'Highlight automated test frameworks (Selenium, Cypress, Playwright), CI/CD pipeline integration, API testing (Postman, REST Assured), and bug reduction.',
    pageLength: '3-Page',
    skills: [
      { category: 'Automation Tools', items: ['Selenium WebDriver', 'Cypress', 'Playwright', 'Appium', 'Postman', 'REST Assured', 'JUnit / TestNG'] },
      { category: 'Languages & Scripting', items: ['Python', 'Java', 'JavaScript / TypeScript', 'SQL', 'Bash / Shell Scripting'] },
      { category: 'CI/CD & DevOps', items: ['Jenkins', 'GitHub Actions', 'Docker', 'Jira / Xray', 'Git', 'Agile QA'] }
    ],
    summaryExamples: [
      'QA Automation Engineer with 5+ years of experience constructing scalable UI and API test automation frameworks using Cypress, Selenium, and Python. Reduced regression testing execution time from 3 days to 45 minutes.',
      'Senior Quality Engineer specializing in Playwright automation, Postman API testing, and CI/CD Jenkins pipeline integration. Maintained 99.4% release stability across mobile and web platforms.'
    ],
    experienceBullets: [
      'Built automated Cypress & TypeScript end-to-end test framework covering 450+ critical user paths, slashing manual regression testing time by 85%.',
      'Integrated automated regression test suites into GitHub Actions CI/CD pipelines, preventing 120+ critical bugs from reaching production.',
      'Created REST API automated testing scripts using Postman and Python requests, validating 200+ endpoint responses per build.',
      'Authored comprehensive QA test plans, bug reports, and traceability matrices in Jira and Xray.'
    ],
    atsKeywords: ['QA Automation Engineer', 'Selenium', 'Cypress', 'Playwright', 'Python', 'Java', 'API Testing', 'Jenkins', 'Postman', 'Test Automation', 'Jira'],
    faqs: [
      {
        question: 'What are the most in-demand keywords for a QA Automation Engineer?',
        answer: 'Key ATS terms include Selenium, Cypress, Playwright, API Testing (Postman, REST Assured), Python/Java, CI/CD (Jenkins, GitHub Actions), and Automation Framework Design.'
      }
    ],
    relatedRoles: [
      { slug: 'software-engineer', title: 'Software Engineer', category: 'Engineering' },
      { slug: 'devops-engineer', title: 'DevOps Engineer', category: 'DevOps' }
    ],
    presetData: {
      title: 'QA Automation Engineer Resume',
      personalInfo: { fullName: 'Marcus Vance', jobTitle: 'Senior QA Automation Engineer', email: 'marcus.qa@qualitycraft.dev', location: 'Austin, TX' },
      summary: 'QA Automation Engineer with 5+ years building Cypress, Selenium, and Playwright automated test frameworks, cutting regression times by 85%.',
      experience: [
        { id: 'exp-qa-1', role: 'Lead QA Automation Engineer', company: 'Apex Quality Labs', location: 'Austin, TX', startDate: '2021-02', endDate: 'Present', current: true, highlights: ['Built Cypress test framework covering 450+ user paths.', 'Integrated automated regression suites into CI/CD pipelines.'] }
      ],
      skills: [{ id: 'sk-qa-1', category: 'QA Core', items: ['QA Automation Engineer', 'Selenium', 'Cypress', 'Playwright', 'Python', 'Java', 'API Testing', 'Jenkins', 'Postman'] }]
    }
  },

  'sales-director': {
    slug: 'sales-director',
    roleTitle: 'Sales Director',
    category: 'Sales & Business Development',
    experienceLevel: 'Executive (8-15 Years)',
    metaTitle: 'Sales Director Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Download an executive Sales Director resume template. Highlight enterprise deal closure, quota attainment, revenue growth, Salesforce, and team leadership.',
    h1: 'Sales Director Resume Template',
    shortIntro: 'Highlight multi-million dollar quota attainment, enterprise SaaS sales pipelines, team leadership, Salesforce CRM management, and revenue expansion.',
    pageLength: '4-Page',
    skills: [
      { category: 'Sales Strategy & Revenue', items: ['Enterprise Sales', 'Revenue Growth', 'Quota Attainment', 'SaaS Sales', 'Go-To-Market (GTM)', 'Pipeline Generation'] },
      { category: 'Leadership & Negotiation', items: ['Sales Team Leadership', 'Contract Negotiation', 'Executive Relationship Building', 'Key Account Management', 'MEDDPICC'] },
      { category: 'CRM & Analytics', items: ['Salesforce (SFDC)', 'Gong', 'Outreach', 'HubSpot', 'Sales Analytics & Forecasting'] }
    ],
    summaryExamples: [
      'High-performing Sales Director with 10+ years driving enterprise B2B SaaS revenue growth, managing $25M+ annual quotas, and leading global sales organizations. Consistently exceeded sales targets by an average of 140%.',
      'Vice President of Sales & Executive Leader skilled in MEDDPICC sales methodology, strategic account expansion, and building high-velocity AE teams from scratch.'
    ],
    experienceBullets: [
      'Directed regional sales team of 18 Account Executives, generating $32M in new ARR and exceeding annual quota targets by 142%.',
      'Closed 15 multi-year enterprise SaaS contracts with Fortune 500 clients valued at $1.5M+ average deal size.',
      'Implemented MEDDPICC sales qualification methodology across sales organization, increasing deal win rates from 22% to 38%.',
      'Recruited, onboarded, and coached 25 top-tier sales reps, cutting average ramp time from 6 months to 60 days.'
    ],
    atsKeywords: ['Sales Director', 'Enterprise Sales', 'Revenue Growth', 'Quota Attainment', 'Salesforce', 'MEDDPICC', 'SaaS Sales', 'Pipeline Generation', 'Contract Negotiation'],
    faqs: [
      {
        question: 'What metrics should a Sales Director feature on a resume?',
        answer: 'Include specific numbers: annual quota size ($), quota attainment (%), ARR generated ($), team size managed, average deal size ($), and sales win rate improvement (%).'
      }
    ],
    relatedRoles: [
      { slug: 'account-executive', title: 'Account Executive', category: 'Sales' },
      { slug: 'marketing-manager', title: 'Marketing Manager', category: 'Marketing' }
    ],
    presetData: {
      title: 'Sales Director Resume',
      personalInfo: { fullName: 'Arthur Pendelton', jobTitle: 'Vice President of Enterprise Sales', email: 'arthur.sales@revenuecraft.io', location: 'Chicago, IL' },
      summary: 'Executive Sales Director with 12+ years leading enterprise SaaS sales teams, exceeding $25M+ quotas by 140% using MEDDPICC methodology.',
      experience: [
        { id: 'exp-sd-1', role: 'Regional Sales Director', company: 'Nexus Enterprise SaaS', location: 'Chicago, IL', startDate: '2019-03', endDate: 'Present', current: true, highlights: ['Directed team of 18 AEs generating $32M new ARR at 142% quota.', 'Closed 15 Fortune 500 enterprise deals over $1.5M average value.'] }
      ],
      skills: [{ id: 'sk-sd-1', category: 'Sales Leadership Core', items: ['Sales Director', 'Enterprise Sales', 'Revenue Growth', 'Quota Attainment', 'Salesforce', 'MEDDPICC', 'SaaS Sales', 'Pipeline'] }]
    }
  },

  'operations-manager': {
    slug: 'operations-manager',
    roleTitle: 'Operations Manager',
    category: 'Operations & Management',
    experienceLevel: 'Mid-Senior (5-10 Years)',
    metaTitle: 'Operations Manager Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create a professional Operations Manager resume. Feature process optimization, Lean Six Sigma, budget management, vendor relations, and team efficiency.',
    h1: 'Operations Manager Resume Template',
    shortIntro: 'Highlight operational efficiency, process optimization, Lean Six Sigma methodologies, operating budget management, supply chain coordination, and KPI tracking.',
    pageLength: '2-Page',
    skills: [
      { category: 'Operations & Efficiency', items: ['Operations Management', 'Process Optimization', 'Lean Six Sigma', 'Workflow Streamlining', 'Vendor Management', 'Cost Reduction'] },
      { category: 'Planning & Finance', items: ['Operating Budgets', 'Resource Allocation', 'Inventory Control', 'Compliance & Safety', 'KPI Dashboarding'] },
      { category: 'Tools & Systems', items: ['ERP Systems (SAP, Oracle)', 'Asana', 'Jira', 'Excel (Advanced)', 'Tableau'] }
    ],
    summaryExamples: [
      'Results-driven Operations Manager with 7+ years of experience optimizing enterprise workflows, managing $15M operating budgets, and leading teams of 60+ staff. Reduced operational expenses by $1.2M through Lean process redesign.',
      'Operations Director specializing in cross-departmental alignment, vendor contract negotiation, and warehouse supply chain logistics.'
    ],
    experienceBullets: [
      'Managed $15M annual operating budget across 3 regional fulfillment facilities, cutting operational waste by 18%.',
      'Implemented Lean Six Sigma process workflows, improving daily order fulfillment throughput by 40%.',
      'Renegotiated 20+ logistics vendor contracts, securing a 15% cost reduction saving $450,000 annually.',
      'Supervised a multidisciplinary operations team of 65 employees, achieving a 98% safety compliance audit rating.'
    ],
    atsKeywords: ['Operations Manager', 'Process Optimization', 'Lean Six Sigma', 'Operating Budget', 'Vendor Management', 'Workflow Streamlining', 'Supply Chain', 'KPIs'],
    faqs: [
      {
        question: 'What are key metrics for an Operations Manager resume?',
        answer: 'Quantify operational impact: budget managed ($), cost savings achieved ($ or %), throughput increases (%), team headcount supervised, and error/incident reduction rates.'
      }
    ],
    relatedRoles: [
      { slug: 'project-manager', title: 'Project Manager', category: 'Management' },
      { slug: 'supply-chain-manager', title: 'Supply Chain Manager', category: 'Supply Chain' }
    ],
    presetData: {
      title: 'Operations Manager Resume',
      personalInfo: { fullName: 'Elena Rostova', jobTitle: 'Senior Operations Manager', email: 'elena.ops@opscraft.io', location: 'New York, NY' },
      summary: 'Operations Manager with 7+ years optimizing workflows, managing $15M budgets, and applying Lean Six Sigma to save $1.2M in annual expenses.',
      experience: [
        { id: 'exp-om-1', role: 'Director of Operations', company: 'Nexus Logistics & Operations', location: 'New York, NY', startDate: '2020-05', endDate: 'Present', current: true, highlights: ['Managed $15M operating budget cutting waste by 18%.', 'Implemented Lean Six Sigma workflows improving throughput by 40%.'] }
      ],
      skills: [{ id: 'sk-om-1', category: 'Operations Core', items: ['Operations Manager', 'Process Optimization', 'Lean Six Sigma', 'Operating Budget', 'Vendor Management', 'Workflow Streamlining'] }]
    }
  },

  'cybersecurity-analyst': {
    slug: 'cybersecurity-analyst',
    roleTitle: 'Cybersecurity Analyst',
    category: 'Cybersecurity & IT',
    experienceLevel: 'Mid-Senior (3-7 Years)',
    metaTitle: 'Cybersecurity Analyst Resume Template — Free ATS Resume | Resume Craft',
    metaDescription: 'Create a Cybersecurity Analyst resume. Showcase SOC operations, SIEM (Splunk), threat intelligence, incident response, vulnerability assessment, and CISSP/CEH.',
    h1: 'Cybersecurity Analyst Resume Template',
    shortIntro: 'Highlight Security Operations Center (SOC) monitoring, SIEM tool management (Splunk), incident response protocols, vulnerability assessments, and security compliance.',
    pageLength: '2-Page',
    skills: [
      { category: 'Security & Operations', items: ['SOC Monitoring', 'Incident Response', 'SIEM (Splunk, QRadar)', 'Threat Intelligence', 'Vulnerability Assessment (Nessus)', 'Penetration Testing'] },
      { category: 'Network & Cloud Security', items: ['Firewall Management', 'Zero Trust Architecture', 'IAM Policies', 'AWS / Azure Security', 'Wireshark', 'Endpoint Protection (CrowdStrike)'] },
      { category: 'Certifications & Standards', items: ['CISSP', 'CEH (Certified Ethical Hacker)', 'CompTIA Security+', 'NIST Framework', 'ISO 27001', 'SOC 2 Compliance'] }
    ],
    summaryExamples: [
      'Detail-oriented Cybersecurity Analyst (CISSP & CEH) with 5+ years of experience in 24/7 SOC incident response, SIEM log analysis, and enterprise threat hunting. Neutralized 200+ security incidents with zero data breaches.',
      'Information Security Specialist skilled in vulnerability scanning, penetration testing, and NIST compliance governance across cloud and on-premise environments.'
    ],
    experienceBullets: [
      'Monitored 24/7 Security Operations Center (SOC) using Splunk SIEM, analyzing 10M+ daily security log events across corporate network.',
      'Led incident response protocols during ransomware threat attempt, isolating compromised nodes within 12 minutes to prevent data exfiltration.',
      'Conducted quarterly vulnerability assessments with Nessus across 1,500 server endpoints, remediating 98% of high-severity vulnerabilities.',
      'Spearheaded SOC 2 Type II and ISO 27001 compliance audit preparation, achieving 100% audit pass rate.'
    ],
    atsKeywords: ['Cybersecurity Analyst', 'SOC', 'SIEM', 'Splunk', 'Incident Response', 'CISSP', 'Vulnerability Assessment', 'NIST', 'CrowdStrike', 'Penetration Testing'],
    faqs: [
      {
        question: 'What certifications should a Cybersecurity Analyst highlight?',
        answer: 'Include CISSP, CEH (Certified Ethical Hacker), CompTIA Security+, CySA+, CISM, or GIAC (GSEC/GCIH) in your header and certification section.'
      }
    ],
    relatedRoles: [
      { slug: 'cloud-architect', title: 'Cloud Architect', category: 'Cloud' },
      { slug: 'devops-engineer', title: 'DevOps Engineer', category: 'DevOps' }
    ],
    presetData: {
      title: 'Cybersecurity Analyst Resume',
      personalInfo: { fullName: 'Marcus Vance', jobTitle: 'Senior Cybersecurity Analyst (CISSP)', email: 'marcus.sec@securitycraft.dev', location: 'Austin, TX' },
      summary: 'CISSP-certified Cybersecurity Analyst with 5+ years experience in SOC incident response, Splunk SIEM monitoring, and NIST security governance.',
      experience: [
        { id: 'exp-csa-1', role: 'Lead SOC Security Analyst', company: 'Nexus Security Shield', location: 'Austin, TX', startDate: '2021-04', endDate: 'Present', current: true, highlights: ['Monitored Splunk SIEM log events analyzing 10M daily events.', 'Led incident response isolating ransomware threats within 12 minutes.'] }
      ],
      skills: [{ id: 'sk-csa-1', category: 'Security Core', items: ['Cybersecurity Analyst', 'SOC', 'SIEM', 'Splunk', 'Incident Response', 'CISSP', 'Vulnerability Assessment', 'NIST'] }]
    }
  }
};

