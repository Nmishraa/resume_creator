import { ResumeData } from '../types/resume';
import { alexMorganData, marcusVanceData, elenaRostovaData } from './resumeExamplesData';
import { ROLE_SEO_DATA } from './roleSeoData';

export interface HeroResumeCard {
  id: string;
  slug: string;
  atsScore: string;
  templateId: 'modern' | 'tech' | 'executive' | 'slate' | 'compact';
  templateName: string;
  templateTag: string;
  pageLength: '2-Page' | '3-Page' | '4-Page' | '5-Page';
  fullName: string;
  jobTitle: string;
  contact: string;
  summary: string;
  expTitle: string;
  expDates: string;
  expHighlights: string[];
  skills: string[];
  presetData: any;
}

export const HERO_RESUME_CARDS: HeroResumeCard[] = [
  {
    id: 'product-manager',
    slug: 'product-manager',
    atsScore: '97/100',
    templateId: 'slate',
    templateName: 'Professional Slate',
    templateTag: 'Most Popular',
    pageLength: '2-Page',
    fullName: 'Elena Rostova',
    jobTitle: 'Product Manager',
    contact: 'elena.rostova@productlabs.io • (555) 567-8901 • New York, NY',
    summary: 'Data-driven Senior Product Manager with 6+ years of experience leading cross-functional engineering and design squads. Proven track record launching enterprise B2B SaaS features, optimizing user onboarding funnels, and driving 38% retention lifts.',
    expTitle: 'Lead Product Manager • Horizon SaaS',
    expDates: '2021 – Present',
    expHighlights: [
      'Spearheaded product discovery across 4 engineering squads, launching enterprise subscription tier generating $3.4M ARR.',
      'Designed and executed 40+ A/B experiments on checkout flow, improving conversion velocity by 18%.'
    ],
    skills: ['Product Strategy', 'A/B Testing', 'SQL', 'Mixpanel', 'Jira', 'OpenAPI'],
    presetData: elenaRostovaData
  },
  {
    id: 'technical-product-manager',
    slug: 'technical-product-manager',
    atsScore: '96/100',
    templateId: 'compact',
    templateName: 'Compact Sidebar',
    templateTag: 'Tech Leader',
    pageLength: '3-Page',
    fullName: 'Marcus Vance',
    jobTitle: 'Technical Product Manager',
    contact: 'marcus.tpm@apilabs.dev • (555) 345-6789 • Seattle, WA',
    summary: 'Technical Product Manager specializing in developer platforms, API integrations, microservices architecture, and high-scalability cloud infrastructure.',
    expTitle: 'Senior Technical Product Manager • API Nexus',
    expDates: '2021 – Present',
    expHighlights: [
      'Architected developer portal and GraphQL API ecosystem adopted by 12,000+ active third-party developers.',
      'Led technical requirements and RFC discovery for multi-cloud migration, reducing infrastructure overhead by 28%.'
    ],
    skills: ['API Architecture', 'GraphQL', 'AWS', 'System Design', 'Agile', 'SQL'],
    presetData: ROLE_SEO_DATA['technical-product-manager']?.presetData || elenaRostovaData
  },
  {
    id: 'ai-product-manager',
    slug: 'ai-product-manager',
    atsScore: '98/100',
    templateId: 'tech',
    templateName: 'Tech Minimal',
    templateTag: 'AI & Tech',
    pageLength: '3-Page',
    fullName: 'Alexandra Vance',
    jobTitle: 'AI Product Manager',
    contact: 'alexandra.vance@ainexus.io • (555) 019-2834 • San Francisco, CA',
    summary: 'Results-oriented Senior AI Product Manager with 6+ years of experience leading cross-functional squads to launch generative AI features, RAG search engines, and LLM microservices.',
    expTitle: 'Senior AI Product Manager • Aura AI Systems',
    expDates: '2022 – Present',
    expHighlights: [
      'Spearheaded product discovery and release of enterprise RAG assistant serving 1.2M active users, generating $4.2M in net new ARR.',
      'Partnered with ML infrastructure team to adopt model quantization, cutting API inference cost by $18,000/month.'
    ],
    skills: ['LLMs', 'RAG Pipelines', 'Python', 'LangChain', 'Pinecone', 'A/B Testing'],
    presetData: ROLE_SEO_DATA['ai-product-manager']?.presetData || elenaRostovaData
  },
  {
    id: 'senior-full-stack-engineer',
    slug: 'senior-full-stack-engineer',
    atsScore: '98/100',
    templateId: 'modern',
    templateName: 'Modern Clean',
    templateTag: 'Engineering',
    pageLength: '5-Page',
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
    presetData: alexMorganData
  },
  {
    id: 'enterprise-architect',
    slug: 'enterprise-architect',
    atsScore: '99/100',
    templateId: 'executive',
    templateName: 'Executive Serif',
    templateTag: 'Executive',
    pageLength: '4-Page',
    fullName: 'David Miller',
    jobTitle: 'Enterprise Architect',
    contact: 'david.miller@enterprise.io • (555) 678-9012 • Chicago, IL',
    summary: 'Principal Enterprise Architect with 12+ years designing TOGAF-compliant enterprise IT blueprints, legacy modernization roadmaps, and multi-cloud governance.',
    expTitle: 'Chief Enterprise Architect • Global Tech Corp',
    expDates: '2019 – Present',
    expHighlights: [
      'Spearheaded $45M digital transformation roadmap modernizing mainframe systems into cloud-native microservices.',
      'Established enterprise architecture governance board overseeing 180+ global IT applications.'
    ],
    skills: ['TOGAF 10', 'Enterprise Architecture', 'Cloud Governance', 'Microservices', 'SOA', 'AWS'],
    presetData: ROLE_SEO_DATA['enterprise-architect']?.presetData || marcusVanceData
  },
  {
    id: 'cloud-architect',
    slug: 'cloud-architect',
    atsScore: '99/100',
    templateId: 'executive',
    templateName: 'Executive Serif',
    templateTag: 'Cloud Leader',
    pageLength: '4-Page',
    fullName: 'Marcus Vance',
    jobTitle: 'Cloud Architect',
    contact: 'marcus.vance@cloudstrata.io • (555) 456-7890 • Austin, TX',
    summary: 'Cloud Architect with 8+ years automating multi-region Kubernetes clusters, zero-downtime CI/CD pipelines, and enterprise IaC infrastructure.',
    expTitle: 'Lead Cloud Architect • Strata Infrastructure',
    expDates: '2020 – Present',
    expHighlights: [
      'Managed $14M annual AWS cloud budget, reducing infrastructure operational costs by 32%.',
      'Engineered automated failover across dual cloud regions achieving 99.999% uptime SLA.'
    ],
    skills: ['AWS', 'Terraform', 'Kubernetes', 'ArgoCD', 'Go', 'Docker'],
    presetData: marcusVanceData
  }
];
