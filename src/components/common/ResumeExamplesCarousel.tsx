import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  Code, 
  Briefcase, 
  Palette, 
  HeartPulse, 
  BarChart3,
  CheckCircle2,
  FileText,
  Eye,
  X,
  Cpu,
  Layers,
  ShieldCheck,
  Server,
  Database,
  Cloud,
  Lock,
  Workflow,
  Sparkle,
  Activity,
  FileCode2,
  Building2,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  Award,
  GraduationCap
} from 'lucide-react';

export interface ResumeSectionData {
  summary: string;
  skills: { category: string; items: string[] }[];
  experience: {
    id: string;
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current?: boolean;
    highlights: string[];
  }[];
  projects: {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    outcomes: string;
  }[];
  education: {
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }[];
  certifications: string[];
  technologies: string[];
}

export interface ExampleCardData {
  id: string;
  slug: string;
  roleTitle: string;
  candidateName: string;
  candidateRole: string;
  experienceLevel: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  category: string;
  badgeColor: string;
  icon: any;
  shortDescription: string;
  metrics: string[];
  skillsBadge: string[];
  fullResume: ResumeSectionData;
  presetData: any;
}

export const TWENTY_ATS_EXAMPLES: ExampleCardData[] = [
  // 1. AI Product Manager
  {
    id: 'ex-1-ai-pm',
    slug: 'ai-product-manager',
    roleTitle: 'AI Product Manager',
    candidateName: 'Alexandra Vance',
    candidateRole: 'Senior AI Product Manager',
    experienceLevel: 'Senior (6+ Years)',
    location: 'San Francisco, CA',
    contactEmail: 'alexandra.vance.demo@example.com',
    contactPhone: '+1 (555) 019-2834',
    category: 'AI & Product',
    badgeColor: '#4f46e5',
    icon: Sparkles,
    shortDescription: 'Product Leader scaling LLM agent features, vector search, and RAG pipelines resulting in $4.2M ARR growth.',
    metrics: ['ARR Growth +$4.2M', 'User Retention +34%', 'Inference Cost -40%'],
    skillsBadge: ['LLM Product Strategy', 'RAG Agents', 'Prompt Ops', 'A/B Testing', 'PyTorch'],
    fullResume: {
      summary: 'Results-oriented Senior AI Product Manager with 6+ years of experience leading cross-functional squads to launch generative AI features, vector search engines, and multi-modal ML microservices. Proven track record increasing product adoption by 34% and cutting model inference expenses by 40%.',
      skills: [
        { category: 'AI Product Strategy', items: ['Generative AI Roadmapping', 'RAG Evaluation Frameworks', 'Prompt Engineering Ops', 'User Analytics', 'A/B Testing'] },
        { category: 'Technical Foundations', items: ['PyTorch', 'LangChain', 'Pinecone', 'REST APIs', 'Python', 'SQL', 'Jira'] }
      ],
      experience: [
        {
          id: 'exp-1-1',
          role: 'Senior AI Product Manager',
          company: 'Aura AI Systems',
          location: 'San Francisco, CA',
          startDate: '2022-03',
          endDate: 'Present',
          current: true,
          highlights: [
            'Spearheaded product discovery and release of enterprise RAG assistant serving 1.2M active users, generating $4.2M in net new ARR.',
            'Implemented automated LLM evaluation benchmark system tracking BLEU and hallucination metrics, improving model response accuracy from 72% to 94%.',
            'Partnered with ML infrastructure team to adopt model quantization on GPU clusters, cutting API inference cost by $18,000/month.'
          ]
        },
        {
          id: 'exp-1-2',
          role: 'Technical Product Manager',
          company: 'Vanguard SaaS Labs',
          location: 'Palo Alto, CA',
          startDate: '2019-06',
          endDate: '2022-02',
          current: false,
          highlights: [
            'Managed product lifecycle of predictive analytics dashboard, boosting 90-day user retention by 28%.',
            'Prioritized sprint backlogs for 14 engineers across 3 Agile squads, maintaining 96% on-time feature delivery.'
          ]
        }
      ],
      projects: [
        {
          id: 'proj-1-1',
          title: 'Enterprise Multi-Modal Search Engine',
          description: 'Designed and launched vector search interface enabling semantic document retrieval across multi-terabyte datasets.',
          techStack: ['Pinecone', 'LangChain', 'OpenAI API', 'React'],
          outcomes: 'Accelerated document discovery speed by 65% for 450 enterprise clients.'
        }
      ],
      education: [
        {
          id: 'edu-1-1',
          degree: 'B.S. in Computer Science & Symbolic Systems',
          institution: 'Stanford University',
          location: 'Stanford, CA',
          startDate: '2015',
          endDate: '2019',
          gpa: '3.92 / 4.0'
        }
      ],
      certifications: ['Certified Scrum Product Owner (CSPO)', 'Pragmatic Institute Certified Product Manager'],
      technologies: ['PyTorch', 'LangChain', 'Pinecone', 'Mixpanel', 'Amplitude', 'Jira', 'SQL', 'Python']
    },
    presetData: {
      title: 'AI Product Manager Resume (Example)',
      personalInfo: {
        fullName: 'Alexandra Vance',
        jobTitle: 'Senior AI Product Manager',
        email: 'alexandra.vance.demo@example.com',
        phone: '+1 (555) 019-2834',
        location: 'San Francisco, CA',
        website: 'alexandravance.demo',
        linkedin: 'linkedin.com/in/alexandravance-demo',
        github: 'github.com/alexandravance-demo'
      },
      summary: 'Results-oriented Senior AI Product Manager with 6+ years of experience leading cross-functional squads to launch generative AI features, vector search engines, and multi-modal ML microservices.',
      experience: [
        {
          id: 'exp-1-1',
          role: 'Senior AI Product Manager',
          company: 'Aura AI Systems',
          location: 'San Francisco, CA',
          startDate: '2022-03',
          endDate: 'Present',
          current: true,
          highlights: [
            'Spearheaded product discovery and release of enterprise RAG assistant serving 1.2M active users, generating $4.2M in net new ARR.',
            'Implemented automated LLM evaluation benchmark system tracking BLEU metrics, improving model response accuracy from 72% to 94%.',
            'Partnered with ML infrastructure team to adopt model quantization, cutting API inference cost by $18,000/month.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1-1',
          degree: 'B.S. in Computer Science & Symbolic Systems',
          institution: 'Stanford University',
          location: 'Stanford, CA',
          startDate: '2015',
          endDate: '2019',
          gpa: '3.92 / 4.0'
        }
      ],
      skills: [
        { id: 's-1-1', category: 'AI Strategy', items: ['Generative AI', 'RAG Pipelines', 'Prompt Ops', 'User Analytics', 'SQL'] }
      ]
    }
  },

  // 2. Technical Product Manager
  {
    id: 'ex-2-tech-pm',
    slug: 'technical-product-manager',
    roleTitle: 'Technical Product Manager',
    candidateName: 'Ethan Montgomery',
    candidateRole: 'Lead Technical Product Manager',
    experienceLevel: 'Lead (7+ Years)',
    location: 'Seattle, WA',
    contactEmail: 'ethan.montgomery.demo@example.com',
    contactPhone: '+1 (555) 028-3941',
    category: 'Product & Tech',
    badgeColor: '#0284c7',
    icon: Briefcase,
    shortDescription: 'API & Microservices Product Leader optimizing backend architecture, developer experience, and system throughput.',
    metrics: ['API Throughput 10k/sec', 'Sprint Velocity +28%', 'Onboarding Time -50%'],
    skillsBadge: ['API First Architecture', 'Microservices', 'GraphQL', 'Agile Scrum', 'Kafka'],
    fullResume: {
      summary: 'Data-driven Lead Technical Product Manager with 7+ years of experience managing developer-facing APIs, distributed microservices, and cloud infrastructure platforms. Proven track record scaling API throughput to 10,000 requests/sec and accelerating developer onboarding by 50%.',
      skills: [
        { category: 'Technical Management', items: ['API Strategy (REST/GraphQL)', 'Microservices Architecture', 'System Scalability', 'Developer Experience (DX)'] },
        { category: 'Product Operations', items: ['Agile / Scrum', 'Jira / Confluence', 'SQL Data Analytics', 'Roadmap Prioritization', 'Kafka Data Pipelines'] }
      ],
      experience: [
        {
          id: 'exp-2-1',
          role: 'Lead Technical Product Manager',
          company: 'CloudScale Networks',
          location: 'Seattle, WA',
          startDate: '2021-05',
          endDate: 'Present',
          current: true,
          highlights: [
            'Owned core API gateway product roadmap supporting 10,000 peak requests/sec with 99.999% uptime SLA across 40 enterprise tenants.',
            'Reduced external developer integration onboarding time from 14 days to 3 days by launching automated interactive API documentation and SDK generators.',
            'Led cross-functional team of 16 backend engineers, increasing sprint velocity by 28% through refined backlog grooming.'
          ]
        },
        {
          id: 'exp-2-2',
          role: 'Senior Technical Product Manager',
          company: 'DevEngine Software',
          location: 'Bellevue, WA',
          startDate: '2018-02',
          endDate: '2021-04',
          current: false,
          highlights: [
            'Spearheaded migration of legacy monolithic payment system to gRPC microservices, reducing transaction processing latency by 45%.',
            'Authored detailed Technical Requirement Documents (TRDs) and OpenAPI specifications.'
          ]
        }
      ],
      projects: [
        {
          id: 'proj-2-1',
          title: 'Event-Driven Data Streaming Pipeline',
          description: 'Architected real-time telemetry streaming feature powered by Apache Kafka and Redis.',
          techStack: ['Kafka', 'Redis', 'OpenAPI', 'Docker'],
          outcomes: 'Processed 5M daily telemetry events with zero data loss.'
        }
      ],
      education: [
        {
          id: 'edu-2-1',
          degree: 'B.S. in Computer Engineering',
          institution: 'University of Washington',
          location: 'Seattle, WA',
          startDate: '2013',
          endDate: '2017',
          gpa: '3.85 / 4.0'
        }
      ],
      certifications: ['AWS Certified Solutions Architect – Associate', 'Certified Scrum Master (CSM)'],
      technologies: ['OpenAPI', 'GraphQL', 'Kafka', 'Redis', 'Docker', 'Jira', 'SQL', 'Postman']
    },
    presetData: {
      title: 'Technical Product Manager Resume (Example)',
      personalInfo: {
        fullName: 'Ethan Montgomery',
        jobTitle: 'Lead Technical Product Manager',
        email: 'ethan.montgomery.demo@example.com',
        phone: '+1 (555) 028-3941',
        location: 'Seattle, WA',
        website: 'ethanmontgomery.demo',
        linkedin: 'linkedin.com/in/ethanmontgomery-demo',
        github: 'github.com/ethanmontgomery-demo'
      },
      summary: 'Data-driven Lead Technical Product Manager with 7+ years of experience managing developer-facing APIs, distributed microservices, and cloud infrastructure platforms.',
      experience: [
        {
          id: 'exp-2-1',
          role: 'Lead Technical Product Manager',
          company: 'CloudScale Networks',
          location: 'Seattle, WA',
          startDate: '2021-05',
          endDate: 'Present',
          current: true,
          highlights: [
            'Owned core API gateway product roadmap supporting 10,000 peak requests/sec with 99.999% uptime SLA.',
            'Reduced developer integration onboarding time from 14 days to 3 days via automated API docs.',
            'Led cross-functional team of 16 engineers, increasing sprint velocity by 28%.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-2-1',
          degree: 'B.S. in Computer Engineering',
          institution: 'University of Washington',
          location: 'Seattle, WA',
          startDate: '2013',
          endDate: '2017',
          gpa: '3.85 / 4.0'
        }
      ],
      skills: [
        { id: 's-2-1', category: 'Technical Management', items: ['API Strategy', 'Microservices', 'GraphQL', 'Kafka', 'Agile'] }
      ]
    }
  },

  // 3. Enterprise Architect
  {
    id: 'ex-3-enterprise-arch',
    slug: 'enterprise-architect',
    roleTitle: 'Enterprise Architect',
    candidateName: 'Marcus Sterling',
    candidateRole: 'Chief Enterprise Architect',
    experienceLevel: 'Architect / Director (10+ Years)',
    location: 'Chicago, IL',
    contactEmail: 'marcus.sterling.demo@example.com',
    contactPhone: '+1 (555) 037-4829',
    category: 'Architecture',
    badgeColor: '#059669',
    icon: Building2,
    shortDescription: 'Enterprise Systems Architect modernizing legacy IT portfolios, TOGAF frameworks, and multi-million dollar cloud migrations.',
    metrics: ['Legacy IT Cost -35%', 'ERP Migration 100%', '$18M Portfolio Managed'],
    skillsBadge: ['TOGAF 10', 'Cloud Governance', 'ERP Transformation', 'SOA', 'EA Governance'],
    fullResume: {
      summary: 'Strategic Chief Enterprise Architect with 11+ years of experience aligning IT capabilities with business goals across Fortune 500 financial and manufacturing sectors. Expert in TOGAF framework implementation, legacy modernization, and governing an $18M annual technology budget.',
      skills: [
        { category: 'Enterprise Frameworks', items: ['TOGAF 10', 'Zachman Framework', 'SOA Architecture', 'Cloud Governance', 'Application Rationalization'] },
        { category: 'Core Technologies', items: ['AWS / Azure Cloud', 'SAP S/4HANA', 'MuleSoft API Gateway', 'PostgreSQL', 'Kubernetes', 'Cybersecurity Governance'] }
      ],
      experience: [
        {
          id: 'exp-3-1',
          role: 'Chief Enterprise Architect',
          company: 'Global Nexus Corp',
          location: 'Chicago, IL',
          startDate: '2020-01',
          endDate: 'Present',
          current: true,
          highlights: [
            'Governed 4-year enterprise IT modernization roadmap for $18M technology portfolio, reducing operational legacy maintenance expenses by 35%.',
            'Orchestrated 100% cloud migration of legacy SAP ERP to AWS cloud, eliminating 120 on-premise physical servers.',
            'Established Architecture Review Board (ARB) standards across 8 business units, enforcing strict zero-trust security compliance.'
          ]
        },
        {
          id: 'exp-3-2',
          role: 'Principal Enterprise Architect',
          company: 'Apex Financial Group',
          location: 'Chicago, IL',
          startDate: '2015-08',
          endDate: '2019-12',
          current: false,
          highlights: [
            'Designed enterprise integration bus using MuleSoft, unifying 24 disparate banking applications and cutting data sync delays by 70%.',
            'Rationalized application portfolio, decommissioning 35 redundant software tools to save $2.4M annually.'
          ]
        }
      ],
      projects: [
        {
          id: 'proj-3-1',
          title: 'Global Multi-Tenant Cloud Landing Zone',
          description: 'Architected standardized enterprise AWS & Azure landing zone compliant with SOC2 and ISO 27001.',
          techStack: ['AWS Control Tower', 'Terraform', 'Azure AD', 'MuleSoft'],
          outcomes: 'Streamlined new environment provisioning from 6 weeks to 4 hours.'
        }
      ],
      education: [
        {
          id: 'edu-3-1',
          degree: 'M.S. in Information Technology & Management',
          institution: 'Northwestern University',
          location: 'Evanston, IL',
          startDate: '2011',
          endDate: '2013',
          gpa: '3.90 / 4.0'
        }
      ],
      certifications: ['TOGAF 10 Certified Enterprise Architect', 'AWS Certified Solutions Architect – Professional'],
      technologies: ['TOGAF', 'MuleSoft', 'AWS', 'Azure', 'SAP S/4HANA', 'Terraform', 'Kubernetes', 'ArchiMate']
    },
    presetData: {
      title: 'Enterprise Architect Resume (Example)',
      personalInfo: {
        fullName: 'Marcus Sterling',
        jobTitle: 'Chief Enterprise Architect',
        email: 'marcus.sterling.demo@example.com',
        phone: '+1 (555) 037-4829',
        location: 'Chicago, IL',
        website: 'marcussterling.demo',
        linkedin: 'linkedin.com/in/marcussterling-demo',
        github: ''
      },
      summary: 'Strategic Chief Enterprise Architect with 11+ years of experience aligning IT capabilities with business goals across Fortune 500 sectors.',
      experience: [
        {
          id: 'exp-3-1',
          role: 'Chief Enterprise Architect',
          company: 'Global Nexus Corp',
          location: 'Chicago, IL',
          startDate: '2020-01',
          endDate: 'Present',
          current: true,
          highlights: [
            'Governed IT modernization roadmap for $18M portfolio, reducing legacy maintenance expenses by 35%.',
            'Orchestrated 100% cloud migration of SAP ERP to AWS, eliminating 120 physical servers.',
            'Established Architecture Review Board (ARB) standards across 8 business units.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-3-1',
          degree: 'M.S. in Information Technology & Management',
          institution: 'Northwestern University',
          location: 'Evanston, IL',
          startDate: '2011',
          endDate: '2013',
          gpa: '3.90 / 4.0'
        }
      ],
      skills: [
        { id: 's-3-1', category: 'Enterprise Architecture', items: ['TOGAF 10', 'Cloud Governance', 'SAP ERP', 'AWS', 'MuleSoft'] }
      ]
    }
  },

  // 4. Solutions Architect
  {
    id: 'ex-4-solutions-arch',
    slug: 'solutions-architect',
    roleTitle: 'Solutions Architect',
    candidateName: 'David Chen',
    candidateRole: 'Principal Cloud Solutions Architect',
    experienceLevel: 'Senior (8+ Years)',
    location: 'Austin, TX',
    contactEmail: 'david.chen.demo@example.com',
    contactPhone: '+1 (555) 046-5910',
    category: 'Architecture',
    badgeColor: '#d97706',
    icon: Cloud,
    shortDescription: 'Cloud Solutions Architect building fault-tolerant SaaS infrastructure on AWS with 99.99% availability SLAs.',
    metrics: ['Cloud Cost -25%', 'SLA Uptime 99.99%', '12 Enterprise Deployments'],
    skillsBadge: ['AWS Architecture', 'Serverless', 'Terraform', 'Microservices', 'Disaster Recovery'],
    fullResume: {
      summary: 'Accomplished Principal Cloud Solutions Architect with 8+ years of experience designing scalable cloud-native applications, serverless microservices, and automated DevOps deployment pipelines. Proven track record reducing cloud infrastructure spend by 25% while maintaining 99.99% system availability SLAs.',
      skills: [
        { category: 'Cloud & Infrastructure', items: ['AWS (Lambda, ECS, EKS, DynamoDB, S3)', 'Serverless Architecture', 'Terraform', 'Docker', 'Kubernetes'] },
        { category: 'Architecture & Design', items: ['Domain-Driven Design (DDD)', 'Disaster Recovery (RTO/RPO)', 'Event-Driven Systems', 'Security Hardening', 'Node.js/Python'] }
      ],
      experience: [
        {
          id: 'exp-4-1',
          role: 'Principal Cloud Solutions Architect',
          company: 'Strata Cloud Solutions',
          location: 'Austin, TX',
          startDate: '2021-04',
          endDate: 'Present',
          current: true,
          highlights: [
            'Designed high-availability serverless architecture using AWS Lambda and DynamoDB, handling 20M daily transactions with 99.99% SLA.',
            'Optimized multi-tenant database provisioning and auto-scaling rules, lowering monthly cloud infrastructure expenses by 25%.',
            'Spearheaded 12 successful enterprise client migrations from legacy data centers to AWS cloud.'
          ]
        },
        {
          id: 'exp-4-2',
          role: 'Senior Infrastructure Solutions Engineer',
          company: 'Pinnacle Software Systems',
          location: 'Austin, TX',
          startDate: '2017-09',
          endDate: '2021-03',
          current: false,
          highlights: [
            'Built automated Infrastructure-as-Code (IaC) deployment templates using Terraform, cutting client environment setup time from 2 weeks to 3 hours.',
            'Implemented automated cross-region disaster recovery replication, meeting strict RTO < 15 minutes requirement.'
          ]
        }
      ],
      projects: [
        {
          id: 'proj-4-1',
          title: 'Global Fintech Payment Processing Gateway',
          description: 'Architected PCI-DSS compliant event-driven payment processing engine.',
          techStack: ['AWS Lambda', 'SQS', 'DynamoDB', 'Terraform'],
          outcomes: 'Processed $1.2B in transactions with zero security incidents.'
        }
      ],
      education: [
        {
          id: 'edu-4-1',
          degree: 'B.S. in Computer Science',
          institution: 'University of Texas at Austin',
          location: 'Austin, TX',
          startDate: '2013',
          endDate: '2017',
          gpa: '3.88 / 4.0'
        }
      ],
      certifications: ['AWS Certified Solutions Architect – Professional', 'HashiCorp Certified Terraform Associate'],
      technologies: ['AWS Lambda', 'Terraform', 'DynamoDB', 'ECS', 'Docker', 'Python', 'Node.js', 'PostgreSQL']
    },
    presetData: {
      title: 'Solutions Architect Resume (Example)',
      personalInfo: {
        fullName: 'David Chen',
        jobTitle: 'Principal Cloud Solutions Architect',
        email: 'david.chen.demo@example.com',
        phone: '+1 (555) 046-5910',
        location: 'Austin, TX',
        website: 'davidchen.demo',
        linkedin: 'linkedin.com/in/davidchen-demo',
        github: 'github.com/davidchen-demo'
      },
      summary: 'Accomplished Principal Cloud Solutions Architect with 8+ years of experience designing scalable cloud-native applications and serverless microservices.',
      experience: [
        {
          id: 'exp-4-1',
          role: 'Principal Cloud Solutions Architect',
          company: 'Strata Cloud Solutions',
          location: 'Austin, TX',
          startDate: '2021-04',
          endDate: 'Present',
          current: true,
          highlights: [
            'Designed high-availability serverless architecture using AWS Lambda, handling 20M daily transactions with 99.99% SLA.',
            'Lowered monthly cloud infrastructure expenses by 25% through auto-scaling optimization.',
            'Spearheaded 12 enterprise client migrations from legacy data centers to AWS cloud.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-4-1',
          degree: 'B.S. in Computer Science',
          institution: 'University of Texas at Austin',
          location: 'Austin, TX',
          startDate: '2013',
          endDate: '2017',
          gpa: '3.88 / 4.0'
        }
      ],
      skills: [
        { id: 's-4-1', category: 'Cloud Architecture', items: ['AWS Lambda', 'Serverless', 'Terraform', 'DynamoDB', 'Microservices'] }
      ]
    }
  },

  // 5. Generative AI Product Manager
  {
    id: 'ex-5-gen-ai-pm',
    slug: 'generative-ai-product-manager',
    roleTitle: 'Generative AI Product Manager',
    candidateName: 'Sophia Lin',
    candidateRole: 'Generative AI Product Lead',
    experienceLevel: 'Mid-Senior (5+ Years)',
    location: 'New York, NY',
    contactEmail: 'sophia.lin.demo@example.com',
    contactPhone: '+1 (555) 055-6021',
    category: 'AI & Product',
    badgeColor: '#ec4899',
    icon: Sparkle,
    shortDescription: 'Product Lead launching GenAI content automation, LLM fine-tuning features, and text-to-code assistants.',
    metrics: ['DAU 1.5M+', 'Prompt Accuracy 94%', 'ARR Growth +$5.8M'],
    skillsBadge: ['Generative AI', 'LLM Fine-Tuning', 'Diffusion Models', 'Product Analytics', 'User Research'],
    fullResume: {
      summary: 'Forward-thinking Generative AI Product Lead with 5+ years of experience commercializing LLM content generation tools, AI copilot assistants, and synthetic media engines. Proven track record growing active user base to 1.5M+ DAU and driving $5.8M in annual recurring revenue.',
      skills: [
        { category: 'GenAI Capabilities', items: ['LLM Copilot Design', 'Synthetic Text/Image Generation', 'RLHF Training Ops', 'Diffusion Models', 'Model Governance'] },
        { category: 'Product Leadership', items: ['User Journey Mapping', 'A/B Testing', 'Amplitude Analytics', 'SQL', 'Agile Roadmapping', 'OpenAI/Anthropic APIs'] }
      ],
      experience: [
        {
          id: 'exp-5-1',
          role: 'Generative AI Product Lead',
          company: 'OmniText Intelligence',
          location: 'New York, NY',
          startDate: '2022-06',
          endDate: 'Present',
          current: true,
          highlights: [
            'Product managed flagship AI Copywriting Copilot, growing daily active users from zero to 1.5M+ DAU within 18 months.',
            'Spearheaded Reinforcement Learning from Human Feedback (RLHF) data collection strategy, elevating prompt output accuracy from 76% to 94%.',
            'Monetized premium AI tier featuring fine-tuned domain models, driving $5.8M incremental ARR.'
          ]
        },
        {
          id: 'exp-5-2',
          role: 'Senior Product Manager',
          company: 'CreativeAI Studio',
          location: 'New York, NY',
          startDate: '2019-09',
          endDate: '2022-05',
          current: false,
          highlights: [
            'Launched automated image generation tool integration using Stable Diffusion APIs, increasing user engagement time by 42%.',
            'Managed squad of 10 ML engineers and UX designers across 2-week agile sprint iterations.'
          ]
        }
      ],
      projects: [
        {
          id: 'proj-5-1',
          title: 'Automated Code Generation Assistant',
          description: 'Led development of domain-specific coding assistant fine-tuned on internal repository standards.',
          techStack: ['Claude API', 'LlamaIndex', 'TypeScript', 'React'],
          outcomes: 'Boosted internal engineering coding speed by 25%.'
        }
      ],
      education: [
        {
          id: 'edu-5-1',
          degree: 'B.S. in Information Systems & HCI',
          institution: 'New York University (NYU)',
          location: 'New York, NY',
          startDate: '2015',
          endDate: '2019',
          gpa: '3.91 / 4.0'
        }
      ],
      certifications: ['Pragmatic Institute Certified Product Manager (PMC)', 'Generative AI Business Leader Certification'],
      technologies: ['OpenAI API', 'Anthropic Claude', 'Stable Diffusion', 'Amplitude', 'SQL', 'Jira', 'Figma', 'Python']
    },
    presetData: {
      title: 'Generative AI Product Manager Resume (Example)',
      personalInfo: {
        fullName: 'Sophia Lin',
        jobTitle: 'Generative AI Product Lead',
        email: 'sophia.lin.demo@example.com',
        phone: '+1 (555) 055-6021',
        location: 'New York, NY',
        website: 'sophialin.demo',
        linkedin: 'linkedin.com/in/sophialin-demo',
        github: ''
      },
      summary: 'Forward-thinking Generative AI Product Lead with 5+ years of experience commercializing LLM content generation tools, AI copilot assistants, and synthetic media engines.',
      experience: [
        {
          id: 'exp-5-1',
          role: 'Generative AI Product Lead',
          company: 'OmniText Intelligence',
          location: 'New York, NY',
          startDate: '2022-06',
          endDate: 'Present',
          current: true,
          highlights: [
            'Product managed flagship AI Copywriting Copilot, growing daily active users from zero to 1.5M+ DAU.',
            'Spearheaded RLHF data collection strategy, elevating prompt output accuracy from 76% to 94%.',
            'Monetized premium AI tier featuring fine-tuned models, driving $5.8M incremental ARR.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-5-1',
          degree: 'B.S. in Information Systems & HCI',
          institution: 'New York University (NYU)',
          location: 'New York, NY',
          startDate: '2015',
          endDate: '2019',
          gpa: '3.91 / 4.0'
        }
      ],
      skills: [
        { id: 's-5-1', category: 'GenAI Strategy', items: ['Generative AI', 'LLMs', 'RLHF', 'Copilots', 'Product Analytics'] }
      ]
    }
  },

  // 6. RAG Architect
  {
    id: 'ex-6-rag-arch',
    slug: 'rag-architect',
    roleTitle: 'RAG Architect',
    candidateName: 'Julian Rodriguez',
    candidateRole: 'Principal RAG Architect',
    experienceLevel: 'Senior Architect (6+ Years)',
    location: 'Boston, MA',
    contactEmail: 'julian.rodriguez.demo@example.com',
    contactPhone: '+1 (555) 064-7182',
    category: 'AI & Data',
    badgeColor: '#8b5cf6',
    icon: Database,
    shortDescription: 'Retrieval-Augmented Generation Specialist optimizing vector databases, hybrid search reranking, and contextual recall.',
    metrics: ['Hallucinations -72%', 'Retrieval Latency <50ms', '800k Monthly Queries'],
    skillsBadge: ['RAG Architecture', 'Vector Databases', 'Milvus', 'Hybrid Search', 'LangChain'],
    fullResume: {
      summary: 'Specialized Principal RAG Architect with 6+ years of experience engineering high-accuracy Retrieval-Augmented Generation systems, vector embedding pipelines, and semantic knowledge graphs. Proven track record reducing LLM hallucination rates by 72% and achieving sub-50ms vector query latency.',
      skills: [
        { category: 'Vector & Search Stack', items: ['Pinecone', 'Milvus', 'Qdrant', 'Elasticsearch Vector Search', 'Cohere Rerank', 'LlamaIndex'] },
        { category: 'AI Engineering', items: ['Python', 'PyTorch', 'LangChain', 'FastAPI', 'Docker', 'Kubernetes', 'OpenAI/Hugging Face Embeddings'] }
      ],
      experience: [
        {
          id: 'exp-6-1',
          role: 'Principal RAG Architect',
          company: 'VectorMind AI',
          location: 'Boston, MA',
          startDate: '2022-04',
          endDate: 'Present',
          current: true,
          highlights: [
            'Architected enterprise RAG retrieval pipeline handling 800k monthly queries with Milvus and Cohere Rerank, reducing model hallucination rate by 72%.',
            'Implemented hybrid BM25 + dense vector semantic search, elevating context recall score from 64% to 92.8%.',
            'Optimized vector index partitioning and GPU memory caching, cutting search retrieval latency to under 50ms.'
          ]
        },
        {
          id: 'exp-6-2',
          role: 'Senior Machine Learning Engineer',
          company: 'Kinesis Data Labs',
          location: 'Cambridge, MA',
          startDate: '2018-08',
          endDate: '2022-03',
          current: false,
          highlights: [
            'Engineered automated document chunking and metadata enrichment pipelines processing 100k daily PDF contracts.',
            'Deployed containerized FastAPI microservices on AWS EKS serving low-latency embeddings.'
          ]
        }
      ],
      projects: [
        {
          id: 'proj-6-1',
          title: 'Financial Knowledge Graph RAG Agent',
          description: 'Built graph-augmented RAG agent connecting Neo4j graph database with vector indexing.',
          techStack: ['Neo4j', 'Pinecone', 'LlamaIndex', 'Python'],
          outcomes: 'Provided financial analysts with 98% accurate audit citation sources.'
        }
      ],
      education: [
        {
          id: 'edu-6-1',
          degree: 'M.S. in Computer Science (Information Retrieval)',
          institution: 'MIT',
          location: 'Cambridge, MA',
          startDate: '2016',
          endDate: '2018',
          gpa: '3.95 / 4.0'
        }
      ],
      certifications: ['Pinecone Certified Vector Database Specialist', 'AWS Certified Machine Learning – Specialty'],
      technologies: ['Milvus', 'Pinecone', 'LangChain', 'LlamaIndex', 'Python', 'FastAPI', 'Docker', 'Neo4j']
    },
    presetData: {
      title: 'RAG Architect Resume (Example)',
      personalInfo: {
        fullName: 'Julian Rodriguez',
        jobTitle: 'Principal RAG Architect',
        email: 'julian.rodriguez.demo@example.com',
        phone: '+1 (555) 064-7182',
        location: 'Boston, MA',
        website: 'julianrodriguez.demo',
        linkedin: 'linkedin.com/in/julianrodriguez-demo',
        github: 'github.com/julianrodriguez-demo'
      },
      summary: 'Specialized Principal RAG Architect with 6+ years of experience engineering high-accuracy Retrieval-Augmented Generation systems, vector embedding pipelines, and semantic knowledge graphs.',
      experience: [
        {
          id: 'exp-6-1',
          role: 'Principal RAG Architect',
          company: 'VectorMind AI',
          location: 'Boston, MA',
          startDate: '2022-04',
          endDate: 'Present',
          current: true,
          highlights: [
            'Architected enterprise RAG retrieval pipeline handling 800k monthly queries, reducing model hallucination rate by 72%.',
            'Implemented hybrid search, elevating context recall score from 64% to 92.8%.',
            'Optimized vector index partitioning, cutting search retrieval latency to under 50ms.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-6-1',
          degree: 'M.S. in Computer Science',
          institution: 'MIT',
          location: 'Cambridge, MA',
          startDate: '2016',
          endDate: '2018',
          gpa: '3.95 / 4.0'
        }
      ],
      skills: [
        { id: 's-6-1', category: 'RAG Architecture', items: ['RAG Pipelines', 'Vector DBs (Milvus/Pinecone)', 'Cohere Rerank', 'LangChain', 'Python'] }
      ]
    }
  },

  // 7. LLM Orchestration Engineer
  {
    id: 'ex-7-llm-orchestration',
    slug: 'llm-orchestration-engineer',
    roleTitle: 'LLM Orchestration Engineer',
    candidateName: 'Rachel Adams',
    candidateRole: 'Senior LLM Systems Engineer',
    experienceLevel: 'Mid-Level (4+ Years)',
    location: 'Denver, CO',
    contactEmail: 'rachel.adams.demo@example.com',
    contactPhone: '+1 (555) 073-8291',
    category: 'AI & Engineering',
    badgeColor: '#0284c7',
    icon: Cpu,
    shortDescription: 'Systems Engineer specializing in vLLM throughput, TensorRT-LLM, model caching, and multi-LLM router gateways.',
    metrics: ['vLLM Throughput 3.5x', 'Token Spend -45%', 'p95 Latency 180ms'],
    skillsBadge: ['vLLM', 'TensorRT-LLM', 'Semantic Caching', 'Python', 'Kubernetes'],
    fullResume: {
      summary: 'Performance-focused Senior LLM Systems Engineer with 4+ years of experience optimizing open-source LLM inference engines, semantic caching layers, and multi-model router gateways. Proven track record increasing GPU inference throughput by 3.5x and reducing API token spend by 45%.',
      skills: [
        { category: 'LLM Infrastructure', items: ['vLLM', 'TensorRT-LLM', 'Triton Inference Server', 'Model Quantization (AWQ/GPTQ)', 'GPU Cluster Scaling'] },
        { category: 'Systems Engineering', items: ['Python', 'C++', 'FastAPI', 'Redis Semantic Cache', 'Docker', 'Kubernetes', 'Prometheus Metrics'] }
      ],
      experience: [
        {
          id: 'exp-7-1',
          role: 'Senior LLM Systems Engineer',
          company: 'PromptScale AI',
          location: 'Denver, CO',
          startDate: '2022-08',
          endDate: 'Present',
          current: true,
          highlights: [
            'Deployed high-throughput vLLM inference clusters serving LLaMA 3 70B models, achieving 3.5x higher token generation throughput than baseline.',
            'Architected semantic Redis caching layer storing frequent prompt embeddings, reducing API token costs by 45% and dropping p95 latency to 180ms.',
            'Engineered dynamic model routing gateway diverting simple queries to lightweight 8B models while reserving 70B models for complex reasoning.'
          ]
        },
        {
          id: 'exp-7-2',
          role: 'Backend Infrastructure Engineer',
          company: 'SynthOps Labs',
          location: 'Boulder, CO',
          startDate: '2020-01',
          endDate: '2022-07',
          current: false,
          highlights: [
            'Built REST microservices in FastAPI handling 2,000 requests/second with 99.98% availability.',
            'Automated Kubernetes cluster auto-scaling rules based on GPU memory pressure.'
          ]
        }
      ],
      projects: [
        {
          id: 'proj-7-1',
          title: 'Distributed Quantized LLM Cluster',
          description: 'Configured AWQ 4-bit quantization pipeline on NVIDIA H100 GPUs.',
          techStack: ['vLLM', 'AWQ', 'Kubernetes', 'Grafana'],
          outcomes: 'Doubled concurrent user capacity on existing GPU hardware.'
        }
      ],
      education: [
        {
          id: 'edu-7-1',
          degree: 'B.S. in Computer Science & Systems Engineering',
          institution: 'Colorado State University',
          location: 'Fort Collins, CO',
          startDate: '2016',
          endDate: '2020',
          gpa: '3.82 / 4.0'
        }
      ],
      certifications: ['NVIDIA Certified Associate – Generative AI & LLMs', 'Certified Kubernetes Administrator (CKA)'],
      technologies: ['vLLM', 'TensorRT-LLM', 'Python', 'FastAPI', 'Redis', 'Kubernetes', 'Docker', 'Prometheus']
    },
    presetData: {
      title: 'LLM Orchestration Engineer Resume (Example)',
      personalInfo: {
        fullName: 'Rachel Adams',
        jobTitle: 'Senior LLM Systems Engineer',
        email: 'rachel.adams.demo@example.com',
        phone: '+1 (555) 073-8291',
        location: 'Denver, CO',
        website: 'racheladams.demo',
        linkedin: 'linkedin.com/in/racheladams-demo',
        github: 'github.com/racheladams-demo'
      },
      summary: 'Performance-focused Senior LLM Systems Engineer with 4+ years of experience optimizing open-source LLM inference engines, semantic caching layers, and multi-model router gateways.',
      experience: [
        {
          id: 'exp-7-1',
          role: 'Senior LLM Systems Engineer',
          company: 'PromptScale AI',
          location: 'Denver, CO',
          startDate: '2022-08',
          endDate: 'Present',
          current: true,
          highlights: [
            'Deployed high-throughput vLLM inference clusters, achieving 3.5x higher token generation throughput.',
            'Architected semantic Redis caching layer, reducing API token costs by 45% with 180ms p95 latency.',
            'Engineered dynamic model routing gateway diverting simple queries to lightweight models.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-7-1',
          degree: 'B.S. in Computer Science',
          institution: 'Colorado State University',
          location: 'Fort Collins, CO',
          startDate: '2016',
          endDate: '2020',
          gpa: '3.82 / 4.0'
        }
      ],
      skills: [
        { id: 's-7-1', category: 'LLM Systems', items: ['vLLM', 'TensorRT-LLM', 'Semantic Cache', 'FastAPI', 'Kubernetes'] }
      ]
    }
  },

  // 8. Agentic Workflow Engineer
  {
    id: 'ex-8-agentic-engineer',
    slug: 'agentic-workflow-engineer',
    roleTitle: 'Agentic Workflow Engineer',
    candidateName: 'Tariq Al-Mansoor',
    candidateRole: 'Lead Autonomous Agent Engineer',
    experienceLevel: 'Senior (5+ Years)',
    location: 'Raleigh, NC',
    contactEmail: 'tariq.almansoor.demo@example.com',
    contactPhone: '+1 (555) 082-9304',
    category: 'AI & Automation',
    badgeColor: '#10b981',
    icon: Workflow,
    shortDescription: 'Autonomous Agent Engineer designing LangGraph multi-agent loops, tool-calling workflows, and self-healing pipelines.',
    metrics: ['Task Accuracy 96%', 'Manual Overhead -65%', '10k Daily Pipelines'],
    skillsBadge: ['LangGraph', 'AutoGPT Frameworks', 'Tool Calling', 'Python', 'FastAPI'],
    fullResume: {
      summary: 'Innovative Lead Autonomous Agent Engineer with 5+ years of experience constructing multi-agent coordination loops, automated tool-calling workflows, and self-correcting AI pipelines. Proven track record eliminating 65% of manual operational overhead and executing 10,000 daily autonomous workflows with 96% task completion accuracy.',
      skills: [
        { category: 'Agentic Frameworks', items: ['LangGraph', 'CrewAI', 'AutoGen', 'Function Calling / Tool Use', 'ReAct Prompting', 'State Machine Loops'] },
        { category: 'Software Engineering', items: ['Python', 'FastAPI', 'AsyncIO', 'PostgreSQL', 'Docker', 'Celery Workers', 'Redis'] }
      ],
      experience: [
        {
          id: 'exp-8-1',
          role: 'Lead Autonomous Agent Engineer',
          company: 'AutonomousAgent Systems',
          location: 'Raleigh, NC',
          startDate: '2022-09',
          endDate: 'Present',
          current: true,
          highlights: [
            'Architected multi-agent graph workflow using LangGraph for automated customer invoice reconciliation, achieving 96% end-to-end task completion without human intervention.',
            'Implemented self-healing retry logic and tool error validation, reducing agent loop execution failures by 80%.',
            'Scaled async Celery worker pool processing 10,000 daily autonomous agent task queues.'
          ]
        },
        {
          id: 'exp-8-2',
          role: 'Senior Automation Engineer',
          company: 'Workflow AI Corp',
          location: 'Raleigh, NC',
          startDate: '2019-05',
          endDate: '2022-08',
          current: false,
          highlights: [
            'Built Python RPA bot frameworks automating data entry across legacy enterprise portals, cutting team manual workload by 65%.',
            'Designed REST APIs in FastAPI integrating Python scripts with Salesforce CRM.'
          ]
        }
      ],
      projects: [
        {
          id: 'proj-8-1',
          title: 'Autonomous Code Review & Refactoring Agent',
          description: 'Built agentic pipeline that pulls GitHub PRs, runs static analysis, and submits inline code improvements.',
          techStack: ['LangGraph', 'GitHub REST API', 'Python', 'Docker'],
          outcomes: 'Reduced pull request review turnaround time by 40%.'
        }
      ],
      education: [
        {
          id: 'edu-8-1',
          degree: 'B.S. in Computer Science & Software Engineering',
          institution: 'North Carolina State University',
          location: 'Raleigh, NC',
          startDate: '2015',
          endDate: '2019',
          gpa: '3.87 / 4.0'
        }
      ],
      certifications: ['DeepLearning.AI Multi-Agent Systems Certification', 'AWS Certified Developer – Associate'],
      technologies: ['LangGraph', 'CrewAI', 'AutoGen', 'Python', 'FastAPI', 'Redis', 'Celery', 'Docker']
    },
    presetData: {
      title: 'Agentic Workflow Engineer Resume (Example)',
      personalInfo: {
        fullName: 'Tariq Al-Mansoor',
        jobTitle: 'Lead Autonomous Agent Engineer',
        email: 'tariq.almansoor.demo@example.com',
        phone: '+1 (555) 082-9304',
        location: 'Raleigh, NC',
        website: 'tariqalmansoor.demo',
        linkedin: 'linkedin.com/in/tariqalmansoor-demo',
        github: 'github.com/tariqalmansoor-demo'
      },
      summary: 'Innovative Lead Autonomous Agent Engineer with 5+ years of experience constructing multi-agent coordination loops, automated tool-calling workflows, and self-correcting AI pipelines.',
      experience: [
        {
          id: 'exp-8-1',
          role: 'Lead Autonomous Agent Engineer',
          company: 'AutonomousAgent Systems',
          location: 'Raleigh, NC',
          startDate: '2022-09',
          endDate: 'Present',
          current: true,
          highlights: [
            'Architected multi-agent graph workflow using LangGraph, achieving 96% task completion without human intervention.',
            'Implemented self-healing retry logic, reducing agent loop execution failures by 80%.',
            'Scaled async Celery worker pool processing 10,000 daily autonomous task queues.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-8-1',
          degree: 'B.S. in Computer Science',
          institution: 'North Carolina State University',
          location: 'Raleigh, NC',
          startDate: '2015',
          endDate: '2019',
          gpa: '3.87 / 4.0'
        }
      ],
      skills: [
        { id: 's-8-1', category: 'Agent Engineering', items: ['LangGraph', 'CrewAI', 'Function Calling', 'Python', 'FastAPI'] }
      ]
    }
  },

  // 9. AI Governance Specialist
  {
    id: 'ex-9-ai-governance',
    slug: 'ai-governance-specialist',
    roleTitle: 'AI Governance Specialist',
    candidateName: 'Claire Dupont',
    candidateRole: 'Senior AI Governance & Ethics Manager',
    experienceLevel: 'Senior Manager (7+ Years)',
    location: 'Washington, DC',
    contactEmail: 'claire.dupont.demo@example.com',
    contactPhone: '+1 (555) 091-0482',
    category: 'Governance & Risk',
    badgeColor: '#6366f1',
    icon: ShieldCheck,
    shortDescription: 'AI Compliance Manager auditing EU AI Act requirements, algorithmic bias mitigation, and responsible AI policies.',
    metrics: ['EU AI Act Audit 100%', 'Bias Rate -80%', '45 Enterprise Audits'],
    skillsBadge: ['EU AI Act', 'NIST AI RMF', 'Algorithmic Bias Audit', 'Model Lineage', 'ISO 42001'],
    fullResume: {
      summary: 'Authoritative Senior AI Governance & Ethics Manager with 7+ years of experience auditing enterprise AI models, implementing NIST AI Risk Management Frameworks (RMF), and enforcing EU AI Act compliance. Proven track record conducting 45+ enterprise AI risk audits and reducing model algorithmic bias by 80%.',
      skills: [
        { category: 'Governance & Frameworks', items: ['EU AI Act Compliance', 'NIST AI RMF', 'ISO/IEC 42001 Standard', 'Algorithmic Impact Assessments', 'Model Card Documentation'] },
        { category: 'Ethics & Risk Audit', items: ['Fairness & Bias Audit (Fairlearn)', 'Model Lineage & Provenance', 'Data Privacy (GDPR/CCPA)', 'AI Risk Matrices', 'Python'] }
      ],
      experience: [
        {
          id: 'exp-9-1',
          role: 'Senior AI Governance & Ethics Manager',
          company: 'Veritas Governance Partners',
          location: 'Washington, DC',
          startDate: '2021-06',
          endDate: 'Present',
          current: true,
          highlights: [
            'Led cross-functional AI Risk Committee conducting 45+ model audits, achieving 100% compliance alignment with EU AI Act High-Risk AI requirements.',
            'Implemented Fairlearn demographic parity auditing tools across credit scoring ML models, reducing demographic bias rate by 80%.',
            'Authored enterprise Responsible AI Policy governing data privacy, model cards, and human-in-the-loop oversight across 1,200 employees.'
          ]
        },
        {
          id: 'exp-9-2',
          role: 'Data Privacy & Ethics Lead',
          company: 'Compliance Trust Global',
          location: 'Washington, DC',
          startDate: '2017-03',
          endDate: '2021-05',
          current: false,
          highlights: [
            'Managed GDPR & CCPA privacy impact assessments for automated customer decision engines.',
            'Established central model registry tracking data lineage and training dataset provenance.'
          ]
        }
      ],
      projects: [
        {
          id: 'proj-9-1',
          title: 'Automated AI Risk Assessment Portal',
          description: 'Designed internal portal allowing product teams to submit AI models for automated NIST RMF scoring.',
          techStack: ['NIST AI RMF', 'Fairlearn', 'Python', 'Jira Service Desk'],
          outcomes: 'Accelerated AI safety compliance review time by 60%.'
        }
      ],
      education: [
        {
          id: 'edu-9-1',
          degree: 'M.P.P. in Public Policy & Technology Governance',
          institution: 'Georgetown University',
          location: 'Washington, DC',
          startDate: '2015',
          endDate: '2017',
          gpa: '3.91 / 4.0'
        }
      ],
      certifications: ['Certified Information Privacy Professional (CIPP/E)', 'ISO 42001 Lead Implementer'],
      technologies: ['Fairlearn', 'NIST AI RMF', 'EU AI Act', 'Python', 'Model Cards', 'Jira', 'Confluence']
    },
    presetData: {
      title: 'AI Governance Specialist Resume (Example)',
      personalInfo: {
        fullName: 'Claire Dupont',
        jobTitle: 'Senior AI Governance & Ethics Manager',
        email: 'claire.dupont.demo@example.com',
        phone: '+1 (555) 091-0482',
        location: 'Washington, DC',
        website: 'clairedupont.demo',
        linkedin: 'linkedin.com/in/clairedupont-demo',
        github: ''
      },
      summary: 'Authoritative Senior AI Governance & Ethics Manager with 7+ years of experience auditing enterprise AI models, implementing NIST AI Risk Management Frameworks (RMF), and enforcing EU AI Act compliance.',
      experience: [
        {
          id: 'exp-9-1',
          role: 'Senior AI Governance & Ethics Manager',
          company: 'Veritas Governance Partners',
          location: 'Washington, DC',
          startDate: '2021-06',
          endDate: 'Present',
          current: true,
          highlights: [
            'Led AI Risk Committee conducting 45+ model audits, achieving 100% compliance with EU AI Act.',
            'Implemented Fairlearn auditing tools, reducing demographic bias rate by 80%.',
            'Authored enterprise Responsible AI Policy governing data privacy and human-in-the-loop oversight.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-9-1',
          degree: 'M.P.P. in Public Policy & Technology Governance',
          institution: 'Georgetown University',
          location: 'Washington, DC',
          startDate: '2015',
          endDate: '2017',
          gpa: '3.91 / 4.0'
        }
      ],
      skills: [
        { id: 's-9-1', category: 'AI Governance', items: ['EU AI Act', 'NIST AI RMF', 'Bias Audit', 'Model Cards', 'ISO 42001'] }
      ]
    }
  },

  // 10. Cloud Modernization Architect
  {
    id: 'ex-10-cloud-mod-arch',
    slug: 'cloud-modernization-architect',
    roleTitle: 'Cloud Modernization Architect',
    candidateName: 'Harrison Forde',
    candidateRole: 'Principal Cloud Modernization Architect',
    experienceLevel: 'Architect (9+ Years)',
    location: 'San Jose, CA',
    contactEmail: 'harrison.forde.demo@example.com',
    contactPhone: '+1 (555) 100-1592',
    category: 'Architecture & Cloud',
    badgeColor: '#0284c7',
    icon: Cloud,
    shortDescription: 'Modernization Architect refactoring mainframe monoliths into microservices with zero downtime.',
    metrics: ['Mainframe Decom -$6M/yr', '40 Microservices', 'Zero Downtime'],
    skillsBadge: ['Cloud Migration', 'Mainframe Refactoring', 'Containerization', 'AWS', 'Strangler Fig Pattern'],
    fullResume: {
      summary: 'Seasoned Principal Cloud Modernization Architect with 9+ years of experience refactoring legacy mainframe applications, monolithic codebases, and database architectures into cloud-native AWS microservices. Proven track record decommissioning legacy infrastructure to save $6M annually while achieving zero downtime.',
      skills: [
        { category: 'Modernization Patterns', items: ['Strangler Fig Migration Pattern', 'Monolith-to-Microservices Refactoring', 'Database Replatforming', 'Domain-Driven Design (DDD)'] },
        { category: 'Cloud Stack', items: ['AWS (EKS, Aurora, ECS, Lambda)', 'Docker', 'Kubernetes', 'Terraform', 'Kafka', 'Java / Spring Boot', 'Python'] }
      ],
      experience: [
        {
          id: 'exp-10-1',
          role: 'Principal Cloud Modernization Architect',
          company: 'LegacyTransform Networks',
          location: 'San Jose, CA',
          startDate: '2020-04',
          endDate: 'Present',
          current: true,
          highlights: [
            'Architected Strangler Fig migration strategy refactoring 25-year-old COBOL mainframe monolith into 40 Dockerized Spring Boot microservices on AWS EKS.',
            'Decommissioned physical mainframe hardware, saving $6M in annual licensing and maintenance overhead.',
            'Executed blue-green database migration for 15M customer records with zero application downtime.'
          ]
        },
        {
          id: 'exp-10-2',
          role: 'Senior Cloud Architect',
          company: 'Mainframe2Cloud Systems',
          location: 'San Francisco, CA',
          startDate: '2016-01',
          endDate: '2020-03',
          current: false,
          highlights: [
            'Migrated 80 legacy Oracle databases to AWS Aurora PostgreSQL, reducing licensing costs by 50%.',
            'Standardized Terraform infrastructure templates across 12 product engineering teams.'
          ]
        }
      ],
      projects: [
        {
          id: 'proj-10-1',
          title: 'Real-Time Event Migration Bridge',
          description: 'Designed Apache Kafka CDC (Change Data Capture) pipeline replicating legacy DB changes to cloud.',
          techStack: ['Debezium', 'Kafka', 'AWS Aurora', 'Docker'],
          outcomes: 'Enabled real-time bi-directional data sync during 18-month migration phase.'
        }
      ],
      education: [
        {
          id: 'edu-10-1',
          degree: 'B.S. in Computer Science & Information Systems',
          institution: 'San Jose State University',
          location: 'San Jose, CA',
          startDate: '2011',
          endDate: '2015',
          gpa: '3.84 / 4.0'
        }
      ],
      certifications: ['AWS Certified Solutions Architect – Professional', 'AWS Certified Migration Evaluator'],
      technologies: ['AWS EKS', 'AWS Aurora', 'Docker', 'Kubernetes', 'Terraform', 'Kafka', 'Java', 'Spring Boot']
    },
    presetData: {
      title: 'Cloud Modernization Architect Resume (Example)',
      personalInfo: {
        fullName: 'Harrison Forde',
        jobTitle: 'Principal Cloud Modernization Architect',
        email: 'harrison.forde.demo@example.com',
        phone: '+1 (555) 100-1592',
        location: 'San Jose, CA',
        website: 'harrisonforde.demo',
        linkedin: 'linkedin.com/in/harrisonforde-demo',
        github: 'github.com/harrisonforde-demo'
      },
      summary: 'Seasoned Principal Cloud Modernization Architect with 9+ years of experience refactoring legacy mainframe applications, monolithic codebases, and database architectures.',
      experience: [
        {
          id: 'exp-10-1',
          role: 'Principal Cloud Modernization Architect',
          company: 'LegacyTransform Networks',
          location: 'San Jose, CA',
          startDate: '2020-04',
          endDate: 'Present',
          current: true,
          highlights: [
            'Architected Strangler Fig migration strategy refactoring mainframe monolith into 40 Spring Boot microservices on AWS EKS.',
            'Decommissioned physical mainframe hardware, saving $6M in annual licensing overhead.',
            'Executed database migration for 15M customer records with zero application downtime.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-10-1',
          degree: 'B.S. in Computer Science',
          institution: 'San Jose State University',
          location: 'San Jose, CA',
          startDate: '2011',
          endDate: '2015',
          gpa: '3.84 / 4.0'
        }
      ],
      skills: [
        { id: 's-10-1', category: 'Modernization', items: ['Cloud Migration', 'Microservices', 'AWS EKS', 'Strangler Pattern', 'Terraform'] }
      ]
    }
  },

  // 11. AWS and Azure Architect
  {
    id: 'ex-11-aws-azure-arch',
    slug: 'aws-and-azure-architect',
    roleTitle: 'AWS and Azure Architect',
    candidateName: 'Vikram Patel',
    candidateRole: 'Senior Multi-Cloud Architect',
    experienceLevel: 'Senior Architect (8+ Years)',
    location: 'Dallas, TX',
    contactEmail: 'vikram.patel.demo@example.com',
    contactPhone: '+1 (555) 119-2038',
    category: 'Architecture & Cloud',
    badgeColor: '#2563eb',
    icon: Server,
    shortDescription: 'Multi-Cloud Architect managing hybrid AWS & Azure environments with automated Terraform landing zones.',
    metrics: ['Multi-Cloud Cost -30%', 'RTO <5min', '150+ Tenants'],
    skillsBadge: ['AWS Architecture', 'Azure Cloud', 'Terraform', 'Hybrid Identity', 'Kubernetes'],
    fullResume: {
      summary: 'Expert Senior Multi-Cloud Architect with 8+ years of experience designing high-resilience infrastructure across AWS and Microsoft Azure platforms. Specialized in hybrid cloud identity federation, cross-cloud disaster recovery, and cost governance across 150+ enterprise cloud subscriptions.',
      skills: [
        { category: 'Cloud Infrastructure', items: ['AWS (EC2, S3, IAM, Transit Gateway)', 'Azure (VNets, ExpressRoute, Entra ID, AKS)', 'Terraform Enterprise', 'Disaster Recovery (RTO < 5m)'] },
        { category: 'Networking & Security', items: ['Hybrid Identity (Azure AD / AWS IAM Identity Center)', 'Cost Optimization (FinOps)', 'Kubernetes', 'Python', 'Bash'] }
      ],
      experience: [
        {
          id: 'exp-11-1',
          role: 'Senior Multi-Cloud Architect',
          company: 'MultiCloud Dynamics',
          location: 'Dallas, TX',
          startDate: '2021-02',
          endDate: 'Present',
          current: true,
          highlights: [
            'Architected cross-cloud disaster recovery failover between AWS us-east-1 and Azure East US, achieving RTO < 5 minutes for tier-1 workloads.',
            'Implemented FinOps cloud cost management framework across 150+ AWS accounts and Azure subscriptions, reducing monthly spending by 30%.',
            'Federated hybrid identity using Azure Entra ID and AWS IAM Identity Center, streamlining SSO access for 8,500 employees.'
          ]
        },
        {
          id: 'exp-11-2',
          role: 'Cloud Infrastructure Engineer',
          company: 'Enterprise Cloud Infrastructure',
          location: 'Dallas, TX',
          startDate: '2017-06',
          endDate: '2021-01',
          current: false,
          highlights: [
            'Configured Azure ExpressRoute and AWS Direct Connect hybrid network tunnels connected to corporate data centers.',
            'Automated multi-cloud resource provisioning using Terraform and CI/CD pipelines.'
          ]
        }
      ],
      projects: [
        {
          id: 'proj-11-1',
          title: 'Unified Multi-Cloud Kubernetes Cluster Governance',
          description: 'Deployed AWS EKS and Azure AKS clusters managed centrally via HashiCorp Consul.',
          techStack: ['AWS EKS', 'Azure AKS', 'Terraform', 'Consul'],
          outcomes: 'Unified deployment workflow across hybrid cloud environments.'
        }
      ],
      education: [
        {
          id: 'edu-11-1',
          degree: 'B.S. in Electrical & Computer Engineering',
          institution: 'Texas A&M University',
          location: 'College Station, TX',
          startDate: '2013',
          endDate: '2017',
          gpa: '3.86 / 4.0'
        }
      ],
      certifications: ['AWS Certified Solutions Architect – Professional', 'Microsoft Certified: Azure Solutions Architect Expert'],
      technologies: ['AWS', 'Azure', 'Terraform', 'Kubernetes', 'Azure Entra ID', 'Python', 'FinOps', 'Consul']
    },
    presetData: {
      title: 'AWS and Azure Architect Resume (Example)',
      personalInfo: {
        fullName: 'Vikram Patel',
        jobTitle: 'Senior Multi-Cloud Architect',
        email: 'vikram.patel.demo@example.com',
        phone: '+1 (555) 119-2038',
        location: 'Dallas, TX',
        website: 'vikrampatel.demo',
        linkedin: 'linkedin.com/in/vikrampatel-demo',
        github: 'github.com/vikrampatel-demo'
      },
      summary: 'Expert Senior Multi-Cloud Architect with 8+ years of experience designing high-resilience infrastructure across AWS and Microsoft Azure platforms.',
      experience: [
        {
          id: 'exp-11-1',
          role: 'Senior Multi-Cloud Architect',
          company: 'MultiCloud Dynamics',
          location: 'Dallas, TX',
          startDate: '2021-02',
          endDate: 'Present',
          current: true,
          highlights: [
            'Architected cross-cloud disaster recovery failover between AWS and Azure, achieving RTO < 5 minutes.',
            'Implemented FinOps cloud cost management framework across 150+ subscriptions, reducing spend by 30%.',
            'Federated hybrid identity using Azure Entra ID and AWS IAM Identity Center.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-11-1',
          degree: 'B.S. in Electrical & Computer Engineering',
          institution: 'Texas A&M University',
          location: 'College Station, TX',
          startDate: '2013',
          endDate: '2017',
          gpa: '3.86 / 4.0'
        }
      ],
      skills: [
        { id: 's-11-1', category: 'Multi-Cloud', items: ['AWS', 'Azure', 'Terraform', 'FinOps', 'Disaster Recovery'] }
      ]
    }
  },

  // 12. Kubernetes and Terraform Engineer
  {
    id: 'ex-12-kube-tf-eng',
    slug: 'kubernetes-and-terraform-engineer',
    roleTitle: 'Kubernetes and Terraform Engineer',
    candidateName: 'Lucas Vance',
    candidateRole: 'Senior DevOps & Platform Engineer',
    experienceLevel: 'Mid-Senior (5+ Years)',
    location: 'Salt Lake City, UT',
    contactEmail: 'lucas.vance.demo@example.com',
    contactPhone: '+1 (555) 128-3149',
    category: 'DevOps & Infrastructure',
    badgeColor: '#3b82f6',
    icon: FileCode2,
    shortDescription: 'DevOps & GitOps Specialist automating EKS/GKE clusters, Helm charts, and Terraform IaC pipelines.',
    metrics: ['100% IaC Coverage', 'Deploy Frequency 50/day', 'MTTR -60%'],
    skillsBadge: ['Kubernetes (EKS)', 'Terraform', 'ArgoCD GitOps', 'Helm', 'Prometheus'],
    fullResume: {
      summary: 'Hands-on Senior DevOps & Platform Engineer with 5+ years of experience automating Kubernetes cluster management, Infrastructure-as-Code (Terraform), and GitOps continuous delivery pipelines. Proven track record achieving 100% IaC coverage and increasing release deployment frequency to 50+ per day.',
      skills: [
        { category: 'Container & IaC Stack', items: ['Kubernetes (EKS, GKE, K3s)', 'Terraform Enterprise', 'ArgoCD / Flux GitOps', 'Helm Charts', 'Docker'] },
        { category: 'CI/CD & Observability', items: ['GitHub Actions', 'Prometheus & Grafana', 'Datadog', 'Python', 'Go', 'Bash Scripting'] }
      ],
      experience: [
        {
          id: 'exp-12-1',
          role: 'Senior DevOps & Platform Engineer',
          company: 'KubeScale Infrastructure',
          location: 'Salt Lake City, UT',
          startDate: '2021-08',
          endDate: 'Present',
          current: true,
          highlights: [
            'Provisioned multi-region AWS EKS Kubernetes clusters using modularized Terraform, supporting 50+ microservices with 100% IaC coverage.',
            'Implemented ArgoCD GitOps deployment pipeline, enabling developers to ship 50+ production releases daily with zero manual intervention.',
            'Configured Prometheus & Grafana alerting rules, reducing Mean Time to Recovery (MTTR) by 60% during incident responses.'
          ]
        },
        {
          id: 'exp-12-2',
          role: 'Site Reliability Engineer (SRE)',
          company: 'ScaleStack Ops',
          location: 'Salt Lake City, UT',
          startDate: '2019-02',
          endDate: '2021-07',
          current: false,
          highlights: [
            'Migrated manual AWS console configurations into version-controlled HCL Terraform scripts.',
            'Authored custom Helm charts for standardized microservice deployment templates.'
          ]
        }
      ],
      projects: [
        {
          id: 'proj-12-1',
          title: 'Automated Kubernetes Cluster Autoscaler',
          description: 'Configured Karpenter auto-scaling on EKS clusters to optimize node utilization.',
          techStack: ['Karpenter', 'AWS EKS', 'Terraform', 'Prometheus'],
          outcomes: 'Reduced idle compute costs by 35% across 200 node instances.'
        }
      ],
      education: [
        {
          id: 'edu-12-1',
          degree: 'B.S. in Computer Science',
          institution: 'University of Utah',
          location: 'Salt Lake City, UT',
          startDate: '2015',
          endDate: '2019',
          gpa: '3.80 / 4.0'
        }
      ],
      certifications: ['Certified Kubernetes Administrator (CKA)', 'HashiCorp Certified Terraform Associate'],
      technologies: ['Kubernetes', 'Terraform', 'AWS EKS', 'ArgoCD', 'Helm', 'Docker', 'Prometheus', 'Python']
    },
    presetData: {
      title: 'Kubernetes and Terraform Engineer Resume (Example)',
      personalInfo: {
        fullName: 'Lucas Vance',
        jobTitle: 'Senior DevOps & Platform Engineer',
        email: 'lucas.vance.demo@example.com',
        phone: '+1 (555) 128-3149',
        location: 'Salt Lake City, UT',
        website: 'lucasvance.demo',
        linkedin: 'linkedin.com/in/lucasvance-demo',
        github: 'github.com/lucasvance-demo'
      },
      summary: 'Hands-on Senior DevOps & Platform Engineer with 5+ years of experience automating Kubernetes cluster management, Infrastructure-as-Code (Terraform), and GitOps pipelines.',
      experience: [
        {
          id: 'exp-12-1',
          role: 'Senior DevOps & Platform Engineer',
          company: 'KubeScale Infrastructure',
          location: 'Salt Lake City, UT',
          startDate: '2021-08',
          endDate: 'Present',
          current: true,
          highlights: [
            'Provisioned multi-region AWS EKS Kubernetes clusters using modularized Terraform with 100% IaC coverage.',
            'Implemented ArgoCD GitOps pipeline, enabling 50+ production releases daily.',
            'Configured Prometheus & Grafana alerting rules, reducing MTTR by 60%.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-12-1',
          degree: 'B.S. in Computer Science',
          institution: 'University of Utah',
          location: 'Salt Lake City, UT',
          startDate: '2015',
          endDate: '2019',
          gpa: '3.80 / 4.0'
        }
      ],
      skills: [
        { id: 's-12-1', category: 'DevOps & Platform', items: ['Kubernetes', 'Terraform', 'ArgoCD', 'Helm', 'Prometheus'] }
      ]
    }
  },

  // 13. API Strategy Architect
  {
    id: 'ex-13-api-strategy',
    slug: 'api-strategy-architect',
    roleTitle: 'API Strategy Architect',
    candidateName: 'Elena Vasquez',
    candidateRole: 'Principal API Strategy Architect',
    experienceLevel: 'Senior Architect (8+ Years)',
    location: 'Atlanta, GA',
    contactEmail: 'elena.vasquez.demo@example.com',
    contactPhone: '+1 (555) 137-4250',
    category: 'Architecture & APIs',
    badgeColor: '#6366f1',
    icon: Code,
    shortDescription: 'API Governance & Ecosystem Lead designing Kong gateways, OpenAPI specs, and developer portal ecosystems.',
    metrics: ['100M+ Daily API Calls', 'Portal Adoption +180%', 'p99 Latency <20ms'],
    skillsBadge: ['Kong Gateway', 'OpenAPI 3.0', 'API Governance', 'OAuth2 / OIDC', 'GraphQL'],
    fullResume: {
      summary: 'Visionary Principal API Strategy Architect with 8+ years of experience leading enterprise API governance, API gateway design (Kong / Apigee), and developer portal ecosystems processing 100M+ daily API transactions. Proven track record increasing external developer API adoption by 180%.',
      skills: [
        { category: 'API Management & Design', items: ['Kong Gateway', 'Apigee', 'OpenAPI 3.0 Specification', 'GraphQL Federation', 'gRPC', 'RESTful API Standards'] },
        { category: 'Security & Analytics', items: ['OAuth2.0 / OpenID Connect (OIDC)', 'API Rate Limiting & Throttling', 'Kong Konnect', 'Node.js', 'Go', 'Datadog API Monitoring'] }
      ],
      experience: [
        {
          id: 'exp-13-1',
          role: 'Principal API Strategy Architect',
          company: 'API Gateways Global',
          location: 'Atlanta, GA',
          startDate: '2021-03',
          endDate: 'Present',
          current: true,
          highlights: [
            'Designed enterprise Kong API Gateway topology handling 100M+ daily API requests with p99 latency under 20ms across 250 microservices.',
            'Launched Developer Portal ecosystem featuring self-service API key provisioning, increasing external partner integration by 180%.',
            'Enforced OAuth2 / OIDC security policies and rate-limiting rules across all public and internal API endpoints.'
          ]
        },
        {
          id: 'exp-13-2',
          role: 'Senior Integration Architect',
          company: 'Integration Hub Inc',
          location: 'Atlanta, GA',
          startDate: '2017-04',
          endDate: '2021-02',
          current: false,
          highlights: [
            'Created centralized OpenAPI 3.0 linting and governance rules in CI/CD pipelines to mandate backward compatibility.',
            'Architected GraphQL federation layer unifying 12 backend REST APIs into single schema.'
          ]
        }
      ],
      projects: [
        {
          id: 'proj-13-1',
          title: 'Monetized Partner API Marketplace',
          description: 'Built usage-based API billing gateway integrated with Stripe Billing.',
          techStack: ['Kong Enterprise', 'Stripe API', 'Go', 'Redis'],
          outcomes: 'Generated $2.1M in API monetization revenue in first year.'
        }
      ],
      education: [
        {
          id: 'edu-13-1',
          degree: 'B.S. in Computer Science',
          institution: 'Georgia Institute of Technology',
          location: 'Atlanta, GA',
          startDate: '2013',
          endDate: '2017',
          gpa: '3.89 / 4.0'
        }
      ],
      certifications: ['Kong Certified API Gateway Architect', 'Apigee Certified API Engineer'],
      technologies: ['Kong', 'Apigee', 'OpenAPI', 'GraphQL', 'OAuth2', 'Go', 'Node.js', 'Stripe API']
    },
    presetData: {
      title: 'API Strategy Architect Resume (Example)',
      personalInfo: {
        fullName: 'Elena Vasquez',
        jobTitle: 'Principal API Strategy Architect',
        email: 'elena.vasquez.demo@example.com',
        phone: '+1 (555) 137-4250',
        location: 'Atlanta, GA',
        website: 'elenavasquez.demo',
        linkedin: 'linkedin.com/in/elenavasquez-demo',
        github: 'github.com/elenavasquez-demo'
      },
      summary: 'Visionary Principal API Strategy Architect with 8+ years of experience leading enterprise API governance, API gateway design (Kong / Apigee), and developer portal ecosystems.',
      experience: [
        {
          id: 'exp-13-1',
          role: 'Principal API Strategy Architect',
          company: 'API Gateways Global',
          location: 'Atlanta, GA',
          startDate: '2021-03',
          endDate: 'Present',
          current: true,
          highlights: [
            'Designed enterprise Kong API Gateway handling 100M+ daily API requests with p99 latency under 20ms.',
            'Launched Developer Portal ecosystem, increasing external partner integration by 180%.',
            'Enforced OAuth2 / OIDC security policies and rate-limiting rules across all API endpoints.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-13-1',
          degree: 'B.S. in Computer Science',
          institution: 'Georgia Institute of Technology',
          location: 'Atlanta, GA',
          startDate: '2013',
          endDate: '2017',
          gpa: '3.89 / 4.0'
        }
      ],
      skills: [
        { id: 's-13-1', category: 'API Architecture', items: ['Kong Gateway', 'OpenAPI 3.0', 'GraphQL Federation', 'OAuth2', 'Go'] }
      ]
    }
  },

  // 14. Healthcare Automation Specialist
  {
    id: 'ex-14-health-auto-spec',
    slug: 'healthcare-automation-specialist',
    roleTitle: 'Healthcare Automation Specialist',
    candidateName: 'Dr. Samantha Reed',
    candidateRole: 'Lead Healthcare Automation Specialist',
    experienceLevel: 'Senior Specialist (6+ Years)',
    location: 'Pittsburgh, PA',
    contactEmail: 'samantha.reed.demo@example.com',
    contactPhone: '+1 (555) 146-5361',
    category: 'Healthcare & Automation',
    badgeColor: '#059669',
    icon: HeartPulse,
    shortDescription: 'Clinical Workflow Automation Specialist integrating Epic EHR, HL7/FHIR protocols, and RPA bot streams.',
    metrics: ['EHR Doc Time -3 hrs/day', 'HIPAA Audit 100%', 'Patient CSAT 98%'],
    skillsBadge: ['Epic EHR', 'HL7 / FHIR', 'UiPath RPA', 'HIPAA Compliance', 'Python'],
    fullResume: {
      summary: 'Accomplished Lead Healthcare Automation Specialist with 6+ years of experience integrating Epic EHR systems, HL7/FHIR data interoperability protocols, and UiPath RPA bots. Proven track record eliminating 3 hours of daily clinical documentation overhead for physicians and achieving 100% HIPAA compliance.',
      skills: [
        { category: 'Healthcare Systems', items: ['Epic EHR Integration', 'HL7 v2 / FHIR Standards', 'Cerner Millennium', 'Clinical Decision Support (CDS)', 'HIPAA Compliance'] },
        { category: 'Automation Technologies', items: ['UiPath Healthcare RPA', 'Python Healthcare Scripts', 'RESTful FHIR APIs', 'SQL', 'Process Mining'] }
      ],
      experience: [
        {
          id: 'exp-14-1',
          role: 'Lead Healthcare Automation Specialist',
          company: 'CarePulse Health Automation',
          location: 'Pittsburgh, PA',
          startDate: '2021-07',
          endDate: 'Present',
          current: true,
          highlights: [
            'Designed and deployed automated FHIR API data sync between Epic EHR and lab results systems, saving clinicians 3 hours of daily manual charting.',
            'Implemented UiPath RPA bots handling automated prior authorization requests, cutting insurance approval wait times from 5 days to 2 hours.',
            'Maintained 100% HIPAA and HITECH compliance across all automated patient data processing pipelines.'
          ]
        },
        {
          id: 'exp-14-2',
          role: 'Clinical IT Integration Engineer',
          company: 'Clinical Workflow Systems',
          location: 'Pittsburgh, PA',
          startDate: '2018-05',
          endDate: '2021-06',
          current: false,
          highlights: [
            'Configured HL7 interface engines (Mirth Connect) transmitting 50,000 daily HL7 messages between hospital radiology and billing systems.',
            'Trained 200+ healthcare staff on automated patient check-in kiosks.'
          ]
        }
      ],
      projects: [
        {
          id: 'proj-14-1',
          title: 'Automated Telehealth Patient Intake Pipeline',
          description: 'Built FHIR-compliant mobile intake workflow populating Epic EHR charts in real-time.',
          techStack: ['HL7 FHIR API', 'Python', 'UiPath', 'Epic SmartForms'],
          outcomes: 'Elevated patient satisfaction score to 98%.'
        }
      ],
      education: [
        {
          id: 'edu-14-1',
          degree: 'M.S. in Health Informatics',
          institution: 'University of Pittsburgh',
          location: 'Pittsburgh, PA',
          startDate: '2016',
          endDate: '2018',
          gpa: '3.93 / 4.0'
        }
      ],
      certifications: ['Epic Certified Interface Engineer', 'Certified Health Informatics Professional (CPHIMS)'],
      technologies: ['Epic EHR', 'HL7 / FHIR', 'UiPath', 'Python', 'Mirth Connect', 'SQL', 'Cerner']
    },
    presetData: {
      title: 'Healthcare Automation Specialist Resume (Example)',
      personalInfo: {
        fullName: 'Dr. Samantha Reed',
        jobTitle: 'Lead Healthcare Automation Specialist',
        email: 'samantha.reed.demo@example.com',
        phone: '+1 (555) 146-5361',
        location: 'Pittsburgh, PA',
        website: 'samanthareed.demo',
        linkedin: 'linkedin.com/in/samanthareed-demo',
        github: ''
      },
      summary: 'Accomplished Lead Healthcare Automation Specialist with 6+ years of experience integrating Epic EHR systems, HL7/FHIR data interoperability protocols, and UiPath RPA bots.',
      experience: [
        {
          id: 'exp-14-1',
          role: 'Lead Healthcare Automation Specialist',
          company: 'CarePulse Health Automation',
          location: 'Pittsburgh, PA',
          startDate: '2021-07',
          endDate: 'Present',
          current: true,
          highlights: [
            'Designed automated FHIR API data sync between Epic EHR and labs, saving clinicians 3 hours daily charting.',
            'Implemented UiPath RPA bots for prior authorization, cutting insurance approval times from 5 days to 2 hours.',
            'Maintained 100% HIPAA compliance across all patient data processing pipelines.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-14-1',
          degree: 'M.S. in Health Informatics',
          institution: 'University of Pittsburgh',
          location: 'Pittsburgh, PA',
          startDate: '2016',
          endDate: '2018',
          gpa: '3.93 / 4.0'
        }
      ],
      skills: [
        { id: 's-14-1', category: 'Health Tech', items: ['Epic EHR', 'HL7 FHIR', 'UiPath RPA', 'HIPAA', 'Python'] }
      ]
    }
  },

  // 15. OCR Automation Engineer
  {
    id: 'ex-15-ocr-auto-eng',
    slug: 'ocr-automation-engineer',
    roleTitle: 'OCR Automation Engineer',
    candidateName: 'Benjamin Hayes',
    candidateRole: 'Senior OCR & Computer Vision Engineer',
    experienceLevel: 'Mid-Level (4+ Years)',
    location: 'Minneapolis, MN',
    contactEmail: 'benjamin.hayes.demo@example.com',
    contactPhone: '+1 (555) 155-8293',
    category: 'AI & Automation',
    badgeColor: '#f59e0b',
    icon: FileText,
    shortDescription: 'Computer Vision & OCR Engineer building Tesseract/AWS Textract document extraction models with 99.4% precision.',
    metrics: ['Extraction Accuracy 99.4%', 'Invoices 500k/mo', 'OpEx -55%'],
    skillsBadge: ['AWS Textract', 'Tesseract OCR', 'OpenCV', 'Python', 'PDF Parsing'],
    fullResume: {
      summary: 'Detail-driven Senior OCR & Computer Vision Engineer with 4+ years of experience engineering intelligent document processing (IDP) pipelines, AWS Textract models, and OpenCV image preprocessing. Proven track record extracting structured data from 500,000 monthly invoices with 99.4% character accuracy.',
      skills: [
        { category: 'OCR & Vision Tools', items: ['AWS Textract', 'Tesseract OCR', 'Azure Form Recognizer', 'OpenCV', 'LayoutLM', 'PDFPlumber'] },
        { category: 'Machine Learning & Dev', items: ['Python (PyTorch, scikit-learn)', 'FastAPI', 'Docker', 'PostgreSQL', 'Regex Extraction', 'AWS S3/Lambda'] }
      ],
      experience: [
        {
          id: 'exp-15-1',
          role: 'Senior OCR & Computer Vision Engineer',
          company: 'DocuVision AI',
          location: 'Minneapolis, MN',
          startDate: '2022-02',
          endDate: 'Present',
          current: true,
          highlights: [
            'Architected intelligent document processing (IDP) pipeline using AWS Textract and custom LayoutLM transformers, processing 500,000 monthly financial invoices.',
            'Elevated key-value table extraction accuracy from 84% to 99.4% by developing custom OpenCV image deskewing and denoising preprocessing filters.',
            'Reduced manual accounts payable data entry operating expenses by 55%.'
          ]
        },
        {
          id: 'exp-15-2',
          role: 'Computer Vision Developer',
          company: 'Intelligent Document Solutions',
          location: 'Minneapolis, MN',
          startDate: '2020-01',
          endDate: '2022-01',
          current: false,
          highlights: [
            'Engineered Tesseract OCR parsing engine for scanned medical receipts in Python.',
            'Built REST microservices using FastAPI wrapped in Docker containers on AWS ECS.'
          ]
        }
      ],
      projects: [
        {
          id: 'proj-15-1',
          title: 'Handwritten Form Recognition Pipeline',
          description: 'Trained custom PyTorch CRNN model recognizing handwritten patient registration forms.',
          techStack: ['PyTorch', 'OpenCV', 'AWS Textract', 'FastAPI'],
          outcomes: 'Achieved 95.2% accuracy on cursive handwriting samples.'
        }
      ],
      education: [
        {
          id: 'edu-15-1',
          degree: 'B.S. in Computer Science & Data Science',
          institution: 'University of Minnesota',
          location: 'Minneapolis, MN',
          startDate: '2016',
          endDate: '2020',
          gpa: '3.86 / 4.0'
        }
      ],
      certifications: ['AWS Certified Machine Learning – Specialty', 'OpenCV Computer Vision Certification'],
      technologies: ['AWS Textract', 'Tesseract', 'OpenCV', 'Python', 'PyTorch', 'LayoutLM', 'Docker', 'FastAPI']
    },
    presetData: {
      title: 'OCR Automation Engineer Resume (Example)',
      personalInfo: {
        fullName: 'Benjamin Hayes',
        jobTitle: 'Senior OCR & Computer Vision Engineer',
        email: 'benjamin.hayes.demo@example.com',
        phone: '+1 (555) 155-8293',
        location: 'Minneapolis, MN',
        website: 'benjaminhayes.demo',
        linkedin: 'linkedin.com/in/benjaminhayes-demo',
        github: 'github.com/benjaminhayes-demo'
      },
      summary: 'Detail-driven Senior OCR & Computer Vision Engineer with 4+ years of experience engineering intelligent document processing (IDP) pipelines and AWS Textract models.',
      experience: [
        {
          id: 'exp-15-1',
          role: 'Senior OCR & Computer Vision Engineer',
          company: 'DocuVision AI',
          location: 'Minneapolis, MN',
          startDate: '2022-02',
          endDate: 'Present',
          current: true,
          highlights: [
            'Architected IDP pipeline using AWS Textract, processing 500,000 monthly financial invoices.',
            'Elevated key-value table extraction accuracy from 84% to 99.4% via OpenCV preprocessing.',
            'Reduced manual accounts payable operating expenses by 55%.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-15-1',
          degree: 'B.S. in Computer Science',
          institution: 'University of Minnesota',
          location: 'Minneapolis, MN',
          startDate: '2016',
          endDate: '2020',
          gpa: '3.86 / 4.0'
        }
      ],
      skills: [
        { id: 's-15-1', category: 'OCR & Vision', items: ['AWS Textract', 'Tesseract', 'OpenCV', 'LayoutLM', 'Python'] }
      ]
    }
  },

  // 16. Data Governance Specialist
  {
    id: 'ex-16-data-gov-spec',
    slug: 'data-governance-specialist',
    roleTitle: 'Data Governance Specialist',
    candidateName: 'Isabella Rossi',
    candidateRole: 'Senior Data Governance Manager',
    experienceLevel: 'Senior Manager (6+ Years)',
    location: 'Charlotte, NC',
    contactEmail: 'isabella.rossi.demo@example.com',
    contactPhone: '+1 (555) 164-9201',
    category: 'Governance & Data',
    badgeColor: '#10b981',
    icon: Database,
    shortDescription: 'Data Lineage & Catalog Specialist enforcing Collibra, Alation, metadata quality, and GDPR data compliance.',
    metrics: ['GDPR Pass 100%', 'Metadata Coverage 95%', '0 Data Breaches'],
    skillsBadge: ['Collibra', 'Alation', 'Metadata Management', 'GDPR / CCPA', 'SQL'],
    fullResume: {
      summary: 'Data Lineage & Quality Lead with 6+ years of experience deploying enterprise data catalogs (Collibra, Alation), establishing master data management (MDM) policies, and ensuring 100% compliance with GDPR/CCPA regulations across multi-terabyte financial databases.',
      skills: [
        { category: 'Data Governance Tools', items: ['Collibra Data Governance', 'Alation Data Catalog', 'Informatica MDM', 'Apache Atlas', 'Data Quality Frameworks'] },
        { category: 'Compliance & Analytics', items: ['GDPR / CCPA Data Lineage', 'PII Masking & Anonymization', 'Advanced SQL', 'Snowflake', 'BigQuery'] }
      ],
      experience: [
        {
          id: 'exp-16-1',
          role: 'Senior Data Governance Manager',
          company: 'DataQuality Enterprise',
          location: 'Charlotte, NC',
          startDate: '2021-04',
          endDate: 'Present',
          current: true,
          highlights: [
            'Deployed Collibra Data Catalog across 450 enterprise data assets, expanding metadata lineage coverage from 35% to 95%.',
            'Implemented automated PII scanning and masking policies in Snowflake, achieving 100% pass rate during external GDPR and CCPA audits.',
            'Established Data Quality Index dashboard tracking missing values and schema drifts, cutting bad data incidents by 75%.'
          ]
        },
        {
          id: 'exp-16-2',
          role: 'Data Steward Specialist',
          company: 'Financial Data Security',
          location: 'Charlotte, NC',
          startDate: '2018-01',
          endDate: '2021-03',
          current: false,
          highlights: [
            'Authored enterprise business glossary defining 1,500+ standardized metrics across banking divisions.',
            'Audited database access controls to eliminate unnecessary PII table privileges.'
          ]
        }
      ],
      projects: [
        {
          id: 'proj-16-1',
          title: 'Automated Metadata Lineage Extraction Engine',
          description: 'Configured automated SQL query parser capturing table dependencies into Apache Atlas.',
          techStack: ['Apache Atlas', 'SQL', 'Snowflake', 'Python'],
          outcomes: 'Automated data lineage tracking for 2,000 daily ETL pipelines.'
        }
      ],
      education: [
        {
          id: 'edu-16-1',
          degree: 'B.S. in Management Information Systems',
          institution: 'University of North Carolina at Charlotte',
          location: 'Charlotte, NC',
          startDate: '2014',
          endDate: '2018',
          gpa: '3.88 / 4.0'
        }
      ],
      certifications: ['Certified Data Management Professional (CDMP)', 'Collibra Certified Solution Architect'],
      technologies: ['Collibra', 'Alation', 'Informatica', 'Snowflake', 'SQL', 'Apache Atlas', 'Python']
    },
    presetData: {
      title: 'Data Governance Specialist Resume (Example)',
      personalInfo: {
        fullName: 'Isabella Rossi',
        jobTitle: 'Senior Data Governance Manager',
        email: 'isabella.rossi.demo@example.com',
        phone: '+1 (555) 164-9201',
        location: 'Charlotte, NC',
        website: 'isabellarossi.demo',
        linkedin: 'linkedin.com/in/isabellarossi-demo',
        github: ''
      },
      summary: 'Data Lineage & Quality Lead with 6+ years of experience deploying enterprise data catalogs (Collibra, Alation), establishing master data management (MDM) policies.',
      experience: [
        {
          id: 'exp-16-1',
          role: 'Senior Data Governance Manager',
          company: 'DataQuality Enterprise',
          location: 'Charlotte, NC',
          startDate: '2021-04',
          endDate: 'Present',
          current: true,
          highlights: [
            'Deployed Collibra Data Catalog across 450 assets, expanding metadata lineage coverage from 35% to 95%.',
            'Implemented automated PII scanning and masking policies, achieving 100% pass rate in GDPR/CCPA audits.',
            'Cut bad data incidents by 75% via automated schema drift detection.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-16-1',
          degree: 'B.S. in MIS',
          institution: 'UNC Charlotte',
          location: 'Charlotte, NC',
          startDate: '2014',
          endDate: '2018',
          gpa: '3.88 / 4.0'
        }
      ],
      skills: [
        { id: 's-16-1', category: 'Data Governance', items: ['Collibra', 'Alation', 'GDPR/CCPA', 'Data Lineage', 'SQL'] }
      ]
    }
  },

  // 17. IAM and Zero Trust Architect
  {
    id: 'ex-17-iam-zero-trust',
    slug: 'iam-and-zero-trust-architect',
    roleTitle: 'IAM and Zero Trust Architect',
    candidateName: 'Gabriel Thorne',
    candidateRole: 'Senior Zero Trust Security Architect',
    experienceLevel: 'Senior Security Architect (8+ Years)',
    location: 'San Diego, CA',
    contactEmail: 'gabriel.thorne.demo@example.com',
    contactPhone: '+1 (555) 173-0492',
    category: 'Security & Infrastructure',
    badgeColor: '#dc2626',
    icon: Lock,
    shortDescription: 'Zero Trust Security Architect designing Okta/Entra ID IAM topologies, RBAC policies, and micro-segmentation.',
    metrics: ['Zero Trust Onboarding 15k Users', '0 Security Breaches', 'MFA 100%'],
    skillsBadge: ['Zero Trust Architecture', 'Okta IAM', 'Azure Entra ID', 'OAuth2 / SAML', 'SASE / Zscaler'],
    fullResume: {
      summary: 'Battle-tested Senior Zero Trust Security Architect with 8+ years of experience designing Identity & Access Management (IAM) frameworks, Least-Privilege RBAC models, and Zscaler SASE micro-segmentation. Proven track record onboarding 15,000 enterprise users to Zero Trust identity controls with zero security breaches.',
      skills: [
        { category: 'IAM & Identity', items: ['Okta Universal Directory', 'Azure Entra ID', 'SAML 2.0 / OAuth2.0 / OIDC', 'Privileged Access Management (CyberArk)', 'MFA Enforcement'] },
        { category: 'Zero Trust & Network', items: ['Zscaler Private Access (ZPA)', 'Least-Privilege RBAC/ABAC', 'Micro-segmentation', 'Python', 'Terraform IAM Modules'] }
      ],
      experience: [
        {
          id: 'exp-17-1',
          role: 'Senior Zero Trust Security Architect',
          company: 'ZeroTrust CyberWorks',
          location: 'San Diego, CA',
          startDate: '2020-09',
          endDate: 'Present',
          current: true,
          highlights: [
            'Architected end-to-end Zero Trust Network Access (ZTNA) transition replacing legacy VPNs with Zscaler for 15,000 global remote employees.',
            'Implemented passwordless FIDO2 MFA and risk-based conditional access policies in Okta, achieving 100% MFA compliance and zero identity credential breaches.',
            'Automated IAM role lifecycle provisioning via Terraform and SCIM APIs, eliminating 8 hours of manual ticket processing weekly.'
          ]
        },
        {
          id: 'exp-17-2',
          role: 'IAM Systems Engineer',
          company: 'IdentityGuard Enterprise',
          location: 'San Diego, CA',
          startDate: '2016-08',
          endDate: '2020-08',
          current: false,
          highlights: [
            'Deployed CyberArk PAM vault securing root administrative credentials across 400 cloud server instances.',
            'Configured SAML single sign-on (SSO) integrations for 85 SaaS enterprise applications.'
          ]
        }
      ],
      projects: [
        {
          id: 'proj-17-1',
          title: 'Automated RBAC Role Mining Engine',
          description: 'Built Python tool analyzing active user entitlements to suggest least-privilege role shrinkages.',
          techStack: ['Python', 'Okta API', 'Azure Entra ID', 'SQL'],
          outcomes: 'Removed 3,500 stale over-privileged access permissions.'
        }
      ],
      education: [
        {
          id: 'edu-17-1',
          degree: 'B.S. in Cybersecurity & Information Assurance',
          institution: 'San Diego State University',
          location: 'San Diego, CA',
          startDate: '2012',
          endDate: '2016',
          gpa: '3.87 / 4.0'
        }
      ],
      certifications: ['Certified Information Systems Security Professional (CISSP)', 'Okta Certified Solution Architect'],
      technologies: ['Okta', 'Azure Entra ID', 'Zscaler', 'CyberArk', 'SAML', 'OAuth2', 'Terraform', 'Python']
    },
    presetData: {
      title: 'IAM and Zero Trust Architect Resume (Example)',
      personalInfo: {
        fullName: 'Gabriel Thorne',
        jobTitle: 'Senior Zero Trust Security Architect',
        email: 'gabriel.thorne.demo@example.com',
        phone: '+1 (555) 173-0492',
        location: 'San Diego, CA',
        website: 'gabrielthorne.demo',
        linkedin: 'linkedin.com/in/gabrielthorne-demo',
        github: ''
      },
      summary: 'Battle-tested Senior Zero Trust Security Architect with 8+ years of experience designing Identity & Access Management (IAM) frameworks and Zscaler SASE micro-segmentation.',
      experience: [
        {
          id: 'exp-17-1',
          role: 'Senior Zero Trust Security Architect',
          company: 'ZeroTrust CyberWorks',
          location: 'San Diego, CA',
          startDate: '2020-09',
          endDate: 'Present',
          current: true,
          highlights: [
            'Architected ZTNA transition replacing legacy VPNs with Zscaler for 15,000 global remote employees.',
            'Implemented passwordless FIDO2 MFA in Okta, achieving zero identity credential breaches.',
            'Automated IAM role lifecycle provisioning via Terraform and SCIM APIs.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-17-1',
          degree: 'B.S. in Cybersecurity',
          institution: 'San Diego State University',
          location: 'San Diego, CA',
          startDate: '2012',
          endDate: '2016',
          gpa: '3.87 / 4.0'
        }
      ],
      skills: [
        { id: 's-17-1', category: 'Zero Trust & IAM', items: ['Zero Trust', 'Okta IAM', 'Azure Entra ID', 'Zscaler ZPA', 'CISSP'] }
      ]
    }
  },

  // 18. Product Roadmap Manager
  {
    id: 'ex-18-prod-roadmap-mgr',
    slug: 'product-roadmap-manager',
    roleTitle: 'Product Roadmap Manager',
    candidateName: 'Nora Kim',
    candidateRole: 'Senior Product Roadmap Manager',
    experienceLevel: 'Senior Manager (6+ Years)',
    location: 'Phoenix, AZ',
    contactEmail: 'nora.kim.demo@example.com',
    contactPhone: '+1 (555) 182-9384',
    category: 'Product & Leadership',
    badgeColor: '#0284c7',
    icon: Briefcase,
    shortDescription: 'Product Strategy Manager specializing in multi-horizon roadmap planning, RICE prioritization, and sprint execution.',
    metrics: ['On-Time Delivery 94%', 'NPS +22 Points', 'Efficiency +30%'],
    skillsBadge: ['Product Roadmapping', 'RICE Scoring', 'Jira Align', 'Productboard', 'Stakeholder Strategy'],
    fullResume: {
      summary: 'Strategic Senior Product Roadmap Manager with 6+ years of experience driving product vision, RICE framework backlog scoring, and multi-quarter release alignment across engineering squads. Proven track record elevating on-time feature delivery to 94% and boosting Net Promoter Score (NPS) by 22 points.',
      skills: [
        { category: 'Roadmap & Strategy', items: ['Multi-Horizon Product Planning', 'RICE / Kano Prioritization', 'Productboard', 'Jira Align', 'Feature Lifecycle Ops'] },
        { category: 'Analytics & Delivery', items: ['User NPS Analytics', 'Agile / Scrum', 'Mixpanel', 'SQL Data Querying', 'Cross-Functional Leadership'] }
      ],
      experience: [
        {
          id: 'exp-18-1',
          role: 'Senior Product Roadmap Manager',
          company: 'SaaS Visionary Labs',
          location: 'Phoenix, AZ',
          startDate: '2021-05',
          endDate: 'Present',
          current: true,
          highlights: [
            'Owned 3-year strategic product roadmap for flagship enterprise SaaS application, maintaining 94% on-time milestone execution.',
            'Instituted RICE backlog scoring methodology across 5 product managers, eliminating low-impact feature creep and boosting developer efficiency by 30%.',
            'Analyzed user feedback loops and customer churn surveys, prioritizing UX enhancements that raised Net Promoter Score (NPS) from +42 to +64.'
          ]
        },
        {
          id: 'exp-18-2',
          role: 'Product Operations Lead',
          company: 'ProductSprint Corp',
          location: 'Phoenix, AZ',
          startDate: '2018-03',
          endDate: '2021-04',
          current: false,
          highlights: [
            'Configured Productboard integrations with Jira and Zendesk, mapping customer feedback directly to roadmap feature requests.',
            'Facilitated quarterly executive roadmap presentation reviews.'
          ]
        }
      ],
      projects: [
        {
          id: 'proj-18-1',
          title: 'Automated Product Release Dashboard',
          description: 'Built real-time release tracking board in Jira Align for C-suite executive visibility.',
          techStack: ['Jira Align', 'Productboard', 'Mixpanel', 'SQL'],
          outcomes: 'Reduced roadmap status sync meetings by 50%.'
        }
      ],
      education: [
        {
          id: 'edu-18-1',
          degree: 'B.S. in Business Administration & Innovation',
          institution: 'Arizona State University',
          location: 'Tempe, AZ',
          startDate: '2014',
          endDate: '2018',
          gpa: '3.86 / 4.0'
        }
      ],
      certifications: ['Pragmatic Institute Certified Product Manager', 'SAFe Product Owner / Product Manager (POPM)'],
      technologies: ['Productboard', 'Jira Align', 'Mixpanel', 'Amplitude', 'SQL', 'Confluence', 'Figma']
    },
    presetData: {
      title: 'Product Roadmap Manager Resume (Example)',
      personalInfo: {
        fullName: 'Nora Kim',
        jobTitle: 'Senior Product Roadmap Manager',
        email: 'nora.kim.demo@example.com',
        phone: '+1 (555) 182-9384',
        location: 'Phoenix, AZ',
        website: 'norakim.demo',
        linkedin: 'linkedin.com/in/norakim-demo',
        github: ''
      },
      summary: 'Strategic Senior Product Roadmap Manager with 6+ years of experience driving product vision, RICE framework backlog scoring, and multi-quarter release alignment.',
      experience: [
        {
          id: 'exp-18-1',
          role: 'Senior Product Roadmap Manager',
          company: 'SaaS Visionary Labs',
          location: 'Phoenix, AZ',
          startDate: '2021-05',
          endDate: 'Present',
          current: true,
          highlights: [
            'Owned 3-year strategic product roadmap, maintaining 94% on-time milestone execution.',
            'Instituted RICE backlog scoring methodology, boosting developer efficiency by 30%.',
            'Prioritized UX enhancements that raised Net Promoter Score (NPS) from +42 to +64.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-18-1',
          degree: 'B.S. in Business Administration',
          institution: 'Arizona State University',
          location: 'Tempe, AZ',
          startDate: '2014',
          endDate: '2018',
          gpa: '3.86 / 4.0'
        }
      ],
      skills: [
        { id: 's-18-1', category: 'Roadmap Strategy', items: ['Product Roadmapping', 'RICE Scoring', 'Productboard', 'Jira Align', 'NPS Analytics'] }
      ]
    }
  },

  // 19. Stakeholder Management Product Manager
  {
    id: 'ex-19-stakeholder-pm',
    slug: 'stakeholder-management-product-manager',
    roleTitle: 'Stakeholder Management Product Manager',
    candidateName: 'Oliver Wright',
    candidateRole: 'Lead Product Manager & Stakeholder Liaison',
    experienceLevel: 'Lead Product Manager (7+ Years)',
    location: 'Nashville, TN',
    contactEmail: 'oliver.wright.demo@example.com',
    contactPhone: '+1 (555) 191-2840',
    category: 'Product & Leadership',
    badgeColor: '#4f46e5',
    icon: Briefcase,
    shortDescription: 'Executive Liaison Product Leader negotiating cross-functional requirements, sales alignment, and customer retention.',
    metrics: ['Alignment Rate 98%', 'Churn Rate -18%', 'Stakeholder CSAT 96%'],
    skillsBadge: ['Stakeholder Alignment', 'Executive Communication', 'Change Management', 'SaaS Retention', 'SQL'],
    fullResume: {
      summary: 'Diplomatic Lead Product Manager with 7+ years of experience aligning executive C-suite stakeholders, sales leadership, and engineering teams behind strategic product initiatives. Proven track record achieving 98% cross-functional requirement alignment and reducing enterprise customer churn by 18%.',
      skills: [
        { category: 'Stakeholder Governance', items: ['Executive C-Suite Alignment', 'Customer Advisory Boards (CAB)', 'Change Management', 'Conflict Resolution', 'Feature Negotiation'] },
        { category: 'Product Strategy', items: ['Product Discovery', 'Value Proposition Design', 'GTM Strategy', 'SQL Analytics', 'Jira / Confluence'] }
      ],
      experience: [
        {
          id: 'exp-19-1',
          role: 'Lead Product Manager & Stakeholder Liaison',
          company: 'Enterprise Synergy SaaS',
          location: 'Nashville, TN',
          startDate: '2020-10',
          endDate: 'Present',
          current: true,
          highlights: [
            'Founded quarterly Customer Advisory Board (CAB) with 15 key enterprise accounts ($12M ARR), incorporating client feedback into core product roadmap.',
            'Negotiated roadmap trade-offs between Sales, Engineering, and Finance, achieving 98% stakeholder sign-off alignment.',
            'Delivered custom enterprise feature requests that saved 4 key accounts from churning, reducing annual churn rate by 18%.'
          ]
        },
        {
          id: 'exp-19-2',
          role: 'Senior Product Manager',
          company: 'AlignProduct Networks',
          location: 'Nashville, TN',
          startDate: '2017-02',
          endDate: '2020-09',
          current: false,
          highlights: [
            'Managed internal communication tools for 300+ sales and customer success managers.',
            'Conducted monthly release demo webinars for key executive sponsors.'
          ]
        }
      ],
      projects: [
        {
          id: 'proj-19-1',
          title: 'Executive Roadmap Visibility Portal',
          description: 'Built interactive dashboard tracking product feature status for executive sponsors.',
          techStack: ['Jira Align', 'Confluence', 'Tableau', 'SQL'],
          outcomes: 'Achieved 96% stakeholder satisfaction rating on communication transparency.'
        }
      ],
      education: [
        {
          id: 'edu-19-1',
          degree: 'B.A. in Organizational Communication & Economics',
          institution: 'Vanderbilt University',
          location: 'Nashville, TN',
          startDate: '2013',
          endDate: '2017',
          gpa: '3.89 / 4.0'
        }
      ],
      certifications: ['Certified Scrum Product Owner (CSPO)', 'Prosci Certified Change Management Practitioner'],
      technologies: ['Jira', 'Confluence', 'Tableau', 'SQL', 'Productboard', 'Salesforce', 'Figma']
    },
    presetData: {
      title: 'Stakeholder Management Product Manager Resume (Example)',
      personalInfo: {
        fullName: 'Oliver Wright',
        jobTitle: 'Lead Product Manager & Stakeholder Liaison',
        email: 'oliver.wright.demo@example.com',
        phone: '+1 (555) 191-2840',
        location: 'Nashville, TN',
        website: 'oliverwright.demo',
        linkedin: 'linkedin.com/in/oliverwright-demo',
        github: ''
      },
      summary: 'Diplomatic Lead Product Manager with 7+ years of experience aligning executive C-suite stakeholders, sales leadership, and engineering teams behind strategic product initiatives.',
      experience: [
        {
          id: 'exp-19-1',
          role: 'Lead Product Manager & Stakeholder Liaison',
          company: 'Enterprise Synergy SaaS',
          location: 'Nashville, TN',
          startDate: '2020-10',
          endDate: 'Present',
          current: true,
          highlights: [
            'Founded Customer Advisory Board with 15 key enterprise accounts, incorporating feedback into core roadmap.',
            'Negotiated roadmap trade-offs, achieving 98% stakeholder sign-off alignment.',
            'Delivered custom features that saved 4 key accounts, reducing churn rate by 18%.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-19-1',
          degree: 'B.A. in Organizational Communication',
          institution: 'Vanderbilt University',
          location: 'Nashville, TN',
          startDate: '2013',
          endDate: '2017',
          gpa: '3.89 / 4.0'
        }
      ],
      skills: [
        { id: 's-19-1', category: 'Stakeholder Management', items: ['Executive Liaison', 'Customer Advisory Boards', 'Change Management', 'Scrum CSPO', 'SQL'] }
      ]
    }
  },

  // 20. Digital Transformation Manager
  {
    id: 'ex-20-digital-trans-mgr',
    slug: 'digital-transformation-manager',
    roleTitle: 'Digital Transformation Manager',
    candidateName: 'Chloe Bennett',
    candidateRole: 'Director of Digital Transformation',
    experienceLevel: 'Director / Manager (9+ Years)',
    location: 'Tampa, FL',
    contactEmail: 'chloe.bennett.demo@example.com',
    contactPhone: '+1 (555) 200-4829',
    category: 'Transformation & Leadership',
    badgeColor: '#059669',
    icon: TrendingUp,
    shortDescription: 'Digital Transformation Leader guiding paperless workflow transitions, OpEx reductions, and cloud adoption.',
    metrics: ['Paperless Transition 100%', 'OpEx Reduction $4.5M', 'Adoption Rate 92%'],
    skillsBadge: ['Digital Transformation', 'Business Process Reengineering', 'Change Management', 'Cloud Transition', 'Agile Operations'],
    fullResume: {
      summary: 'Impactful Director of Digital Transformation with 9+ years of experience leading enterprise paperless workflow migrations, cloud business process reengineering (BPR), and organizational change management. Proven track record reducing operating expenses by $4.5M and driving 92% employee software adoption.',
      skills: [
        { category: 'Transformation Strategy', items: ['Digital Business Process Reengineering (BPR)', 'Change Management (Prosci ADKAR)', 'Paperless Automation', 'Enterprise Cloud Migration'] },
        { category: 'Operational Leadership', items: ['Process Mining (Celonis)', 'Program Management Office (PMO)', 'KPI Tracking', 'Lean Six Sigma', 'Jira / Confluence'] }
      ],
      experience: [
        {
          id: 'exp-20-1',
          role: 'Director of Digital Transformation',
          company: 'Transcend Enterprise Consulting',
          location: 'Tampa, FL',
          startDate: '2019-11',
          endDate: 'Present',
          current: true,
          highlights: [
            'Spearheaded enterprise-wide paperless digital transformation across 12 regional offices, eliminating 2M annual physical document printouts.',
            'Redesigned core supply chain approval workflows using Celonis process mining, reducing annual operating expenses by $4.5M.',
            'Executed Prosci ADKAR change management training program for 3,500 employees, achieving 92% active digital platform adoption within 6 months.'
          ]
        },
        {
          id: 'exp-20-2',
          role: 'Senior Digital Business Analyst',
          company: 'Legacy2Digital Partners',
          location: 'Tampa, FL',
          startDate: '2015-06',
          endDate: '2019-10',
          current: false,
          highlights: [
            'Mapped as-is vs. to-be workflow processes for legacy insurance claim processing.',
            'Automated manual document intake using electronic signature and cloud storage integrations.'
          ]
        }
      ],
      projects: [
        {
          id: 'proj-20-1',
          title: 'Cloud Document Management System (DMS) Rollout',
          description: 'Architected cloud-based document repository with role-based access control.',
          techStack: ['SharePoint Online', 'Power Automate', 'Celonis', 'Azure AD'],
          outcomes: 'Accelerated document approval turnaround times by 70%.'
        }
      ],
      education: [
        {
          id: 'edu-20-1',
          degree: 'M.B.A. in Strategic Management & Technology',
          institution: 'University of Florida',
          location: 'Gainesville, FL',
          startDate: '2013',
          endDate: '2015',
          gpa: '3.90 / 4.0'
        }
      ],
      certifications: ['Prosci Certified Change Management Practitioner (CCMP)', 'Lean Six Sigma Black Belt (LSSBB)'],
      technologies: ['Celonis', 'Power Automate', 'SharePoint Online', 'Prosci ADKAR', 'Jira', 'Confluence', 'Tableau']
    },
    presetData: {
      title: 'Digital Transformation Manager Resume (Example)',
      personalInfo: {
        fullName: 'Chloe Bennett',
        jobTitle: 'Director of Digital Transformation',
        email: 'chloe.bennett.demo@example.com',
        phone: '+1 (555) 200-4829',
        location: 'Tampa, FL',
        website: 'chloebennett.demo',
        linkedin: 'linkedin.com/in/chloebennett-demo',
        github: ''
      },
      summary: 'Impactful Director of Digital Transformation with 9+ years of experience leading enterprise paperless workflow migrations, cloud business process reengineering, and organizational change management.',
      experience: [
        {
          id: 'exp-20-1',
          role: 'Director of Digital Transformation',
          company: 'Transcend Enterprise Consulting',
          location: 'Tampa, FL',
          startDate: '2019-11',
          endDate: 'Present',
          current: true,
          highlights: [
            'Spearheaded paperless digital transformation across 12 regional offices, eliminating 2M annual printouts.',
            'Redesigned supply chain approval workflows, reducing annual operating expenses by $4.5M.',
            'Executed Prosci ADKAR change management training for 3,500 employees with 92% adoption.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-20-1',
          degree: 'M.B.A. in Strategic Management',
          institution: 'University of Florida',
          location: 'Gainesville, FL',
          startDate: '2013',
          endDate: '2015',
          gpa: '3.90 / 4.0'
        }
      ],
      skills: [
        { id: 's-20-1', category: 'Transformation', items: ['Digital Transformation', 'Celonis Mining', 'Change Management', 'Lean Six Sigma', 'Power Automate'] }
      ]
    }
  }
];

interface ResumeExamplesCarouselProps {
  onSelectExample?: (example: ExampleCardData) => void;
  title?: string;
  subtitle?: string;
}

export const ResumeExamplesCarousel: React.FC<ResumeExamplesCarouselProps> = ({
  onSelectExample,
  title = "20 Professional ATS Resume Examples",
  subtitle = "Hover over any card to pause auto-scrolling. Click 'View Example' to inspect the full resume, or 'Use This Example' to edit in the builder."
}) => {
  const { updateResume } = useResume();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4); // 4 desktop, 2 tablet, 1 mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Full Resume Modal State for "View Example"
  const [activeModalExample, setActiveModalExample] = useState<ExampleCardData | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const totalOriginal = TWENTY_ATS_EXAMPLES.length;

  // Quadruple items to ensure smooth infinite looping in both directions
  const carouselItems = [
    ...TWENTY_ATS_EXAMPLES,
    ...TWENTY_ATS_EXAMPLES,
    ...TWENTY_ATS_EXAMPLES,
    ...TWENTY_ATS_EXAMPLES
  ];

  // Responsive column counts (Desktop: 4, Tablet: 2, Mobile: 1)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth infinite auto-scroll timer right to left
  useEffect(() => {
    if (isPaused || activeModalExample !== null) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3200);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex, activeModalExample]);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev <= 0 ? totalOriginal - 1 : prev - 1));
  };

  // Reset index seamlessly when reaching boundary without visual jump
  const handleTransitionEnd = () => {
    if (currentIndex >= totalOriginal * 2) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex % totalOriginal);
    }
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 40;
    const isRightSwipe = distance < -40;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const handleUseExample = (example: ExampleCardData) => {
    if (onSelectExample) {
      onSelectExample(example);
    } else {
      updateResume(example.presetData);
      navigate('/builder');
    }
  };

  const handleOpenViewModal = (example: ExampleCardData) => {
    setActiveModalExample(example);
  };

  const itemWidthPercent = 100 / visibleCount;

  return (
    <section 
      className="w-full py-8 space-y-6 relative overflow-hidden select-none"
      aria-label="20 ATS Resume Examples Carousel"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 px-1">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-extrabold border border-brand-200 mb-2">
            <Sparkles size={14} className="text-brand-600 animate-pulse" />
            <span>20 Complete ATS Resume Examples • Infinite Carousel</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Manual Arrow Controls & Indicators */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs font-bold text-slate-400 mr-2 hidden sm:inline">
            Showing {visibleCount} of 20
          </span>
          <button
            onClick={handlePrev}
            aria-label="Previous Example"
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-brand-600 hover:border-brand-300 shadow-xs hover:shadow-md flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Example"
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-brand-600 hover:border-brand-300 shadow-xs hover:shadow-md flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Outer Carousel Container - Strictly Prevents Page Overflow */}
      <div
        className="w-full overflow-hidden rounded-2xl p-1 relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Horizontal Track */}
        <div
          ref={containerRef}
          onTransitionEnd={handleTransitionEnd}
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * itemWidthPercent}%)`,
            transitionProperty: isTransitioning ? 'transform' : 'none'
          }}
        >
          {carouselItems.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={`${item.id}-${idx}`}
                className="px-2.5 shrink-0 box-border"
                style={{ width: `${itemWidthPercent}%` }}
              >
                <div className="h-full bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-brand-400 hover:shadow-xl transition-all duration-300 group relative">
                  
                  {/* Card Header & Badge */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${item.badgeColor}15` }}
                        >
                          <IconComp size={16} color={item.badgeColor} />
                        </div>
                        <span
                          className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md"
                          style={{ color: item.badgeColor, backgroundColor: `${item.badgeColor}10` }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {item.experienceLevel}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                      {item.roleTitle}
                    </h3>

                    {/* Visual Mini-Resume Preview Box */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-2 text-[11px] font-sans text-slate-700 shadow-2xs group-hover:bg-brand-50/30 transition-colors">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                        <span className="font-extrabold text-slate-900">{item.candidateName}</span>
                        <span className="text-[9px] font-bold text-brand-600 truncate max-w-[120px]">{item.candidateRole}</span>
                      </div>

                      {/* Measurable Achievement Highlights */}
                      <div className="space-y-1 pt-0.5">
                        {item.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="flex items-center gap-1.5 text-[10px] text-slate-600">
                            <CheckCircle2 size={11} className="text-emerald-500 shrink-0" />
                            <span className="truncate font-medium">{m}</span>
                          </div>
                        ))}
                      </div>

                      {/* Technical Keyword Badges */}
                      <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-200/60">
                        {item.skillsBadge.slice(0, 3).map((sk, skIdx) => (
                          <span key={skIdx} className="text-[9px] font-semibold bg-white border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {item.shortDescription}
                    </p>
                  </div>

                  {/* Dual Card Action Buttons */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenViewModal(item)}
                      className="flex-1 py-2 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye size={14} className="text-slate-600" />
                      <span>View Example</span>
                    </button>

                    <button
                      onClick={() => handleUseExample(item)}
                      className="flex-1 py-2 px-2.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Use Example</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FULL RESUME DETAIL MODAL FOR "VIEW EXAMPLE" */}
      {activeModalExample && (
        <div 
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setActiveModalExample(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-slate-900 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header & Close Button */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span 
                    className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full"
                    style={{ color: activeModalExample.badgeColor, backgroundColor: `${activeModalExample.badgeColor}15` }}
                  >
                    {activeModalExample.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {activeModalExample.experienceLevel}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
                  {activeModalExample.fullResume.summary ? activeModalExample.candidateName : activeModalExample.roleTitle}
                </h2>
                <p className="text-sm font-bold text-brand-600">
                  {activeModalExample.candidateRole} • {activeModalExample.location}
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-slate-500 pt-1">
                  <span>✉ {activeModalExample.contactEmail}</span>
                  <span>📞 {activeModalExample.contactPhone}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveModalExample(null)}
                aria-label="Close Preview"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Standard ATS Headings Structure */}
            
            {/* 1. Professional Summary */}
            <div className="space-y-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 flex items-center gap-2">
                <FileText size={16} className="text-brand-600" />
                <span>Professional Summary</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {activeModalExample.fullResume.summary}
              </p>
            </div>

            {/* 2. Core Skills */}
            <div className="space-y-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 flex items-center gap-2">
                <Sparkles size={16} className="text-brand-600" />
                <span>Core Skills</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeModalExample.fullResume.skills.map((sg, sgIdx) => (
                  <div key={sgIdx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1.5">
                    <span className="text-xs font-bold text-slate-900 block">{sg.category}</span>
                    <div className="flex flex-wrap gap-1">
                      {sg.items.map((item, itemIdx) => (
                        <span key={itemIdx} className="text-[11px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-700 font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Professional Experience */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 flex items-center gap-2">
                <Briefcase size={16} className="text-brand-600" />
                <span>Professional Experience</span>
              </h3>
              <div className="space-y-4">
                {activeModalExample.fullResume.experience.map((exp) => (
                  <div key={exp.id} className="space-y-2 border-l-2 border-brand-500 pl-4 py-0.5">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="text-sm font-black text-slate-900">{exp.role}</span>
                      <span className="text-xs font-bold text-slate-500">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <div className="text-xs font-bold text-brand-600">
                      {exp.company} • {exp.location}
                    </div>
                    <ul className="space-y-1.5 pt-1">
                      {exp.highlights.map((hl, hlIdx) => (
                        <li key={hlIdx} className="text-xs text-slate-700 leading-relaxed flex items-start gap-2">
                          <span className="text-brand-600 font-bold">•</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Key Projects */}
            {activeModalExample.fullResume.projects && activeModalExample.fullResume.projects.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 flex items-center gap-2">
                  <Code size={16} className="text-brand-600" />
                  <span>Key Projects</span>
                </h3>
                {activeModalExample.fullResume.projects.map((proj) => (
                  <div key={proj.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900">{proj.title}</span>
                    </div>
                    <p className="text-xs text-slate-600">{proj.description}</p>
                    <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      Outcome: {proj.outcomes}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 5. Education */}
            <div className="space-y-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 flex items-center gap-2">
                <GraduationCap size={16} className="text-brand-600" />
                <span>Education</span>
              </h3>
              {activeModalExample.fullResume.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start text-xs text-slate-800">
                  <div>
                    <span className="font-bold text-slate-900 block">{edu.degree}</span>
                    <span className="text-slate-600">{edu.institution} • {edu.location}</span>
                  </div>
                  <span className="font-semibold text-slate-500">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>

            {/* 6. Certifications */}
            <div className="space-y-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 flex items-center gap-2">
                <Award size={16} className="text-brand-600" />
                <span>Certifications</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeModalExample.fullResume.certifications.map((cert, certIdx) => (
                  <span key={certIdx} className="text-xs bg-slate-100 text-slate-800 px-3 py-1 rounded-lg border border-slate-200 font-semibold">
                    ✓ {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* 7. Technologies */}
            <div className="space-y-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 flex items-center gap-2">
                <Cpu size={16} className="text-brand-600" />
                <span>Technologies</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {activeModalExample.fullResume.technologies.map((tech, techIdx) => (
                  <span key={techIdx} className="text-xs bg-brand-50 text-brand-700 px-2.5 py-0.5 rounded-md border border-brand-200 font-bold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom CTA Button */}
            <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setActiveModalExample(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  const item = activeModalExample;
                  setActiveModalExample(null);
                  handleUseExample(item);
                }}
                className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Use This Example in Builder</span>
                <ArrowRight size={15} />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
