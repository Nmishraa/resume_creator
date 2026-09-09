import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { SeoHead } from '../components/common/SeoHead';
import { FaqAccordion } from '../components/common/FaqAccordion';
import {
  Sparkles,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Layers,
  ArrowRight,
  Check,
  Lock,
  UploadCloud,
  Briefcase,
  Star,
  Download,
  CheckCircle,
  Zap,
  Layout,
  Award,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { UploadResumeModal } from '../components/builder/UploadResumeModal';
import { TEMPLATE_LIST } from '../components/templates';
import { ResumeExamplesCarousel } from '../components/common/ResumeExamplesCarousel';

export const HomePage: React.FC = () => {
  const { updateResume } = useResume();
  const navigate = useNavigate();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadInitialStep, setUploadInitialStep] = useState<'upload' | 'template' | 'preview'>('upload');
  const [activeHeroCardIndex, setActiveHeroCardIndex] = useState(0);
  const [isHeroCarouselPaused, setIsHeroCarouselPaused] = useState(false);
  const [heroTouchStart, setHeroTouchStart] = useState<number | null>(null);
  const [heroTouchEnd, setHeroTouchEnd] = useState<number | null>(null);

  const alexMorganData = {
    title: 'Alex Morgan - Senior Full-Stack Engineer Resume',
    formatting: {
      template: 'modern' as const,
      fontFamily: 'inter' as const,
      fontSize: 'base' as const,
      spacing: 'normal' as const,
      accentColor: '#2563eb',
      showIcons: true,
      sectionOrder: ['summary', 'experience', 'skills', 'education', 'projects', 'certifications']
    },
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
        id: 'exp-1',
        role: 'Lead Systems Engineer',
        company: 'Cloud Scale',
        location: 'San Francisco, CA',
        startDate: '2021',
        endDate: 'Present',
        current: true,
        highlights: [
          'Architected multi-region Kubernetes clusters, reducing downtime by 99.9%.',
          'Optimized API gateway throughput by 42% using React & Node.js microservices.'
        ]
      }
    ],
    skills: [
      {
        id: 'skill-1',
        category: 'Core Stack',
        items: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker']
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'B.S. in Computer Science',
        institution: 'UC Berkeley',
        location: 'Berkeley, CA',
        startDate: '2013',
        endDate: '2017'
      }
    ],
    projects: [],
    certifications: [],
    customSections: []
  };

  const heroResumeCards = [
    {
      id: 'alex-morgan',
      atsScore: '98/100',
      templateId: 'modern',
      templateName: 'Modern Clean',
      templateTag: 'Most Popular',
      pageLength: '1-Page',
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
      id: 'sophia-chen',
      atsScore: '96/100',
      templateId: 'tech',
      templateName: 'Tech Minimal',
      templateTag: 'Tech Favorite',
      pageLength: '2-Page',
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
        title: 'Sophia Chen - Lead Data Scientist Resume',
        formatting: {
          template: 'tech' as const,
          fontFamily: 'mono' as const,
          fontSize: 'base' as const,
          spacing: 'normal' as const,
          accentColor: '#0284c7',
          showIcons: true,
          sectionOrder: ['summary', 'experience', 'skills', 'education', 'projects', 'certifications']
        },
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
            id: 'exp-sc-1',
            role: 'Principal AI Engineer',
            company: 'Nexus Analytics',
            location: 'Seattle, WA',
            startDate: '2022',
            endDate: 'Present',
            current: true,
            highlights: [
              'Fine-tuned domain LLMs, cutting external model API costs by $45,000/month.',
              'Designed vector search architecture achieving sub-40ms latency across 10M vectors.'
            ]
          }
        ],
        skills: [
          { id: 'sk-sc-1', category: 'AI & Data', items: ['Python', 'PyTorch', 'LangChain', 'Pinecone', 'AWS', 'Docker'] }
        ],
        education: [
          { id: 'edu-sc-1', degree: 'M.S. in Data Science', institution: 'University of Washington', location: 'Seattle, WA', startDate: '2016', endDate: '2018' }
        ],
        projects: [],
        certifications: [],
        customSections: []
      }
    },
    {
      id: 'marcus-vance',
      atsScore: '99/100',
      templateId: 'executive',
      templateName: 'Executive Serif',
      templateTag: 'Executive',
      pageLength: '3-Page',
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
        title: 'Marcus Vance - Principal Cloud Architect Resume',
        formatting: {
          template: 'executive' as const,
          fontFamily: 'serif' as const,
          fontSize: 'base' as const,
          spacing: 'normal' as const,
          accentColor: '#059669',
          showIcons: true,
          sectionOrder: ['summary', 'experience', 'skills', 'education', 'projects', 'certifications']
        },
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
            id: 'exp-mv-1',
            role: 'Lead Cloud Architect',
            company: 'Strata Infrastructure',
            location: 'Austin, TX',
            startDate: '2020',
            endDate: 'Present',
            current: true,
            highlights: [
              'Managed $14M annual AWS cloud budget, reducing infrastructure operational costs by 32%.',
              'Engineered automated failover across dual cloud regions achieving 99.999% uptime SLA.'
            ]
          }
        ],
        skills: [
          { id: 'sk-mv-1', category: 'DevOps & Cloud', items: ['AWS', 'Terraform', 'Kubernetes', 'ArgoCD', 'Go', 'Docker'] }
        ],
        education: [
          { id: 'edu-mv-1', degree: 'B.S. in Computer Engineering', institution: 'UT Austin', location: 'Austin, TX', startDate: '2012', endDate: '2016' }
        ],
        projects: [],
        certifications: [],
        customSections: []
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
        title: 'Elena Rostova - Staff Technical Product Manager Resume',
        formatting: {
          template: 'slate' as const,
          fontFamily: 'inter' as const,
          fontSize: 'base' as const,
          spacing: 'normal' as const,
          accentColor: '#4f46e5',
          showIcons: true,
          sectionOrder: ['summary', 'experience', 'skills', 'education', 'projects', 'certifications']
        },
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
            id: 'exp-er-1',
            role: 'Senior Product Manager',
            company: 'Horizon SaaS',
            location: 'New York, NY',
            startDate: '2021',
            endDate: 'Present',
            current: true,
            highlights: [
              'Spearheaded enterprise API portal launch, boosting 90-day active user retention by 38%.',
              'Directed product discovery across 4 engineering squads with 96% sprint velocity delivery.'
            ]
          }
        ],
        skills: [
          { id: 'sk-er-1', category: 'Product', items: ['Product Strategy', 'A/B Testing', 'SQL', 'Mixpanel', 'Jira', 'OpenAPI'] }
        ],
        education: [
          { id: 'edu-er-1', degree: 'B.S. in Information Systems', institution: 'NYU Stern', location: 'New York, NY', startDate: '2014', endDate: '2018' }
        ],
        projects: [],
        certifications: [],
        customSections: []
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
        title: 'David Miller - Senior Frontend Architect Resume',
        formatting: {
          template: 'compact' as const,
          fontFamily: 'inter' as const,
          fontSize: 'base' as const,
          spacing: 'compact' as const,
          accentColor: '#d97706',
          showIcons: true,
          sectionOrder: ['summary', 'experience', 'skills', 'education', 'projects', 'certifications']
        },
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
            id: 'exp-dm-1',
            role: 'Lead Frontend Engineer',
            company: 'Pixel Craft Labs',
            location: 'Chicago, IL',
            startDate: '2021',
            endDate: 'Present',
            current: true,
            highlights: [
              'Optimized Core Web Vitals (LCP/INP), improving mobile page load performance by 55%.',
              'Architected cross-app design system component library adopted by 60+ engineers.'
            ]
          }
        ],
        skills: [
          { id: 'sk-dm-1', category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Web Vitals', 'GraphQL'] }
        ],
        education: [
          { id: 'edu-dm-1', degree: 'B.S. in Computer Science', institution: 'UIUC', location: 'Urbana, IL', startDate: '2013', endDate: '2017' }
        ],
        projects: [],
        certifications: [],
        customSections: []
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
        title: 'Amara Okafor - Senior Cybersecurity Engineer Resume',
        formatting: {
          template: 'modern' as const,
          fontFamily: 'outfit' as const,
          fontSize: 'base' as const,
          spacing: 'normal' as const,
          accentColor: '#10b981',
          showIcons: true,
          sectionOrder: ['summary', 'experience', 'skills', 'education', 'projects', 'certifications']
        },
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
            id: 'exp-ao-1',
            role: 'Lead Security Engineer',
            company: 'Cipher Guard',
            location: 'Boston, MA',
            startDate: '2022',
            endDate: 'Present',
            current: true,
            highlights: [
              'Deployed Okta & Azure Entra ID federated Zero-Trust IAM across 15,000 corporate users.',
              'Achieved 100% compliance score during ISO 27001 and SOC 2 Type II audit certifications.'
            ]
          }
        ],
        skills: [
          { id: 'sk-ao-1', category: 'Security', items: ['Cyber Security', 'Zero Trust', 'Okta', 'Python', 'AWS Security', 'CISSP'] }
        ],
        education: [
          { id: 'edu-ao-1', degree: 'B.S. in Cybersecurity Engineering', institution: 'Northeastern University', location: 'Boston, MA', startDate: '2015', endDate: '2019' }
        ],
        projects: [],
        certifications: [],
        customSections: []
      }
    }
  ];

  // Hero Carousel Auto-play timer
  useEffect(() => {
    if (isHeroCarouselPaused) return;
    const timer = setInterval(() => {
      setActiveHeroCardIndex((prev) => (prev >= heroResumeCards.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(timer);
  }, [isHeroCarouselPaused, heroResumeCards.length]);

  // Mobile Touch Swipe Handlers for Hero Carousel
  const handleHeroTouchStart = (e: React.TouchEvent) => {
    setIsHeroCarouselPaused(true);
    setHeroTouchEnd(null);
    setHeroTouchStart(e.targetTouches[0].clientX);
  };

  const handleHeroTouchMove = (e: React.TouchEvent) => {
    setHeroTouchEnd(e.targetTouches[0].clientX);
  };

  const handleHeroTouchEnd = () => {
    setIsHeroCarouselPaused(false);
    if (!heroTouchStart || !heroTouchEnd) return;
    const distance = heroTouchStart - heroTouchEnd;
    if (distance > 40) {
      setActiveHeroCardIndex((prev) => (prev >= heroResumeCards.length - 1 ? 0 : prev + 1));
    } else if (distance < -40) {
      setActiveHeroCardIndex((prev) => (prev <= 0 ? heroResumeCards.length - 1 : prev - 1));
    }
  };

  const handleUseAlexMorganLayout = () => {
    updateResume(alexMorganData);
    navigate('/builder');
  };

  const handlePreviewAlexMorganLayout = () => {
    navigate('/resume-preview?slug=alex-morgan', { state: { resumeData: alexMorganData } });
  };

  const homeFaqs = [
    {
      question: 'Is Resume Craft completely free to use?',
      answer: 'Yes, 100% free. You can build, edit, score, and download your resume as a high-resolution vector PDF with no watermark, no hidden fees, and no credit card required.'
    },
    {
      question: 'Do I need to sign up or create an account?',
      answer: 'No account creation is required. You can build and download your resume immediately using secure local browser storage.'
    },
    {
      question: 'Are these resume templates ATS-friendly?',
      answer: 'Yes. All templates are built using single-column reading orders, standard section headings, and ATS-parseable text layers designed to pass Applicant Tracking Systems effortlessly.'
    },
    {
      question: 'How does the PDF download work?',
      answer: 'Clicking "Download PDF" directly generates and downloads a clean .pdf file onto your device. It preserves exact fonts, colors, and margins without opening print dialogs.'
    },
    {
      question: 'Is My personal information kept private?',
      answer: 'Yes. All resume data is stored locally in your web browser. We do not sell your personal data or track your resume contents.'
    }
  ];

  const renderHeroTemplateBody = (card: typeof heroResumeCards[0]) => {
    if (card.templateId === 'tech') {
      return (
        <div className="font-mono text-slate-800 space-y-3 text-left">
          {/* Terminal Header */}
          <div className="bg-slate-950 text-slate-100 p-3 rounded-lg border border-slate-800 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-1 font-mono">
              <span>root@sys:~/{card.fullName.toLowerCase().replace(/\s+/g, '_')}</span>
              <span className="text-emerald-400 font-bold">● ONLINE</span>
            </div>
            <h3 className="text-base font-bold text-emerald-400 font-mono pt-0.5">{card.fullName}</h3>
            <p className="text-xs font-semibold text-sky-300 font-mono">{card.jobTitle}</p>
            <p className="text-[10px] text-slate-400 font-mono">{card.contact}</p>
          </div>

          {/* Summary */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-800 font-mono border-b border-slate-300 pb-0.5">// PROFESSIONAL_SUMMARY</h4>
            <p className="text-[11px] text-slate-700 leading-relaxed font-mono">
              {card.summary}
            </p>
          </div>

          {/* Experience */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-800 font-mono border-b border-slate-300 pb-0.5">// WORK_EXPERIENCE</h4>
            <div>
              <div className="flex justify-between items-baseline text-[11px] font-mono font-bold text-slate-900">
                <span>{card.expTitle}</span>
                <span className="text-slate-500 text-[10px]">{card.expDates}</span>
              </div>
              <ul className="text-[11px] text-slate-700 space-y-0.5 mt-0.5 font-mono list-none">
                {card.expHighlights.map((hl, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-1">
                    <span className="text-sky-600 font-bold shrink-0">&gt;</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech Stack Skills */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-800 font-mono border-b border-slate-300 pb-0.5">// TECH_STACK_TAGS</h4>
            <div className="flex flex-wrap gap-1 pt-0.5">
              {card.skills.map((skill) => (
                <span key={skill} className="px-2 py-0.5 bg-slate-900 text-emerald-400 border border-slate-800 rounded font-mono text-[10px] font-bold">
                  [{skill}]
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (card.templateId === 'executive') {
      return (
        <div className="font-serif text-slate-900 space-y-3 text-center sm:text-left">
          {/* Header - Centered Serif */}
          <div className="border-b-2 border-amber-400/80 pb-2 text-center space-y-0.5">
            <h3 className="text-xl font-black font-serif text-slate-900 tracking-wide">{card.fullName}</h3>
            <p className="text-xs font-serif font-bold text-amber-800 uppercase tracking-widest">{card.jobTitle}</p>
            <p className="text-[11px] font-serif text-slate-600">{card.contact}</p>
          </div>

          {/* Summary - Italic Serif */}
          <div className="space-y-1">
            <h4 className="text-xs font-serif font-extrabold text-amber-950 uppercase tracking-widest text-center border-b border-amber-200 pb-0.5">Executive Summary</h4>
            <p className="text-[11px] font-serif italic text-slate-700 leading-relaxed text-center">
              "{card.summary}"
            </p>
          </div>

          {/* Experience */}
          <div className="space-y-1 text-left">
            <h4 className="text-xs font-serif font-extrabold text-amber-950 uppercase tracking-widest text-center border-b border-amber-200 pb-0.5">Leadership &amp; Experience</h4>
            <div>
              <div className="flex justify-between items-baseline text-[11px] font-serif font-bold text-slate-900">
                <span>{card.expTitle}</span>
                <span className="text-slate-600 text-[10px] italic">{card.expDates}</span>
              </div>
              <ul className="text-[11px] font-serif text-slate-700 list-disc list-inside space-y-0.5 mt-0.5">
                {card.expHighlights.map((hl, hIdx) => (
                  <li key={hIdx}>{hl}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-1">
            <h4 className="text-xs font-serif font-extrabold text-amber-950 uppercase tracking-widest text-center border-b border-amber-200 pb-0.5">Core Competencies</h4>
            <div className="flex flex-wrap justify-center gap-1 pt-0.5">
              {card.skills.map((skill) => (
                <span key={skill} className="px-2.5 py-0.5 bg-amber-50/90 text-amber-950 border border-amber-200/90 rounded-xs font-serif text-[10px] font-bold">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (card.templateId === 'slate') {
      return (
        <div className="text-slate-900 space-y-3 text-left">
          {/* Header - Slate Dark Banner */}
          <div className="bg-slate-900 text-white rounded-t-xl p-3.5 -mx-6 -mt-6 mb-1 border-b-4 border-emerald-500 shadow-xs space-y-0.5">
            <h3 className="text-xl font-black text-white tracking-tight">{card.fullName}</h3>
            <p className="text-xs font-extrabold text-emerald-400 uppercase tracking-wide">{card.jobTitle}</p>
            <p className="text-[10px] text-slate-300">{card.contact}</p>
          </div>

          {/* Summary */}
          <div className="space-y-1">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider border-l-4 border-slate-900 pl-2">Professional Summary</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {card.summary}
            </p>
          </div>

          {/* Experience */}
          <div className="space-y-1">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider border-l-4 border-slate-900 pl-2">Work Experience</h4>
            <div>
              <div className="flex justify-between items-baseline text-[11px]">
                <span className="font-bold text-slate-900">{card.expTitle}</span>
                <span className="text-slate-500 font-medium text-[10px]">{card.expDates}</span>
              </div>
              <ul className="text-[11px] text-slate-600 list-disc list-inside space-y-0.5 mt-0.5">
                {card.expHighlights.map((hl, hIdx) => (
                  <li key={hIdx}>{hl}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-1">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider border-l-4 border-slate-900 pl-2">Skills &amp; Expertise</h4>
            <div className="flex flex-wrap gap-1 pt-0.5">
              {card.skills.map((skill) => (
                <span key={skill} className="px-2 py-0.5 bg-slate-800 text-white rounded text-[10px] font-bold">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (card.templateId === 'compact') {
      return (
        <div className="text-slate-900 space-y-2 text-left">
          {/* 2-Column Grid Layout */}
          <div className="grid grid-cols-12 gap-2.5 bg-slate-50/70 p-2.5 rounded-xl border border-slate-200/80">
            {/* Left Dedicated Sidebar (4 cols) */}
            <div className="col-span-4 bg-slate-100/90 p-2 rounded-lg border border-slate-200 space-y-2 shrink-0">
              <div className="space-y-0.5 border-b border-slate-200 pb-1.5">
                <span className="text-[9px] font-black text-amber-800 uppercase block tracking-wider">Contact</span>
                <p className="text-[9px] text-slate-600 leading-tight break-words">{card.contact.replace(/ • /g, '\n')}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-black text-amber-800 uppercase block tracking-wider">Core Skills</span>
                <div className="flex flex-wrap gap-1">
                  {card.skills.map((skill) => (
                    <span key={skill} className="w-full text-[9px] font-bold bg-white border border-slate-300 text-slate-800 px-1 py-0.5 rounded text-center truncate shadow-2xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Main Column (8 cols) */}
            <div className="col-span-8 space-y-2 pl-0.5">
              <div className="border-b border-slate-200 pb-1">
                <h3 className="text-base font-black text-slate-900 leading-tight">{card.fullName}</h3>
                <p className="text-[11px] font-bold text-amber-700">{card.jobTitle}</p>
              </div>

              <div className="space-y-0.5">
                <h4 className="text-[10px] font-black text-slate-900 uppercase border-b border-slate-200 pb-0.5">Summary</h4>
                <p className="text-[10px] text-slate-600 leading-tight">{card.summary}</p>
              </div>

              <div className="space-y-0.5">
                <h4 className="text-[10px] font-black text-slate-900 uppercase border-b border-slate-200 pb-0.5">Experience</h4>
                <div>
                  <p className="text-[10px] font-bold text-slate-800">{card.expTitle}</p>
                  <p className="text-[9px] text-slate-500 font-medium">{card.expDates}</p>
                  <ul className="text-[9px] text-slate-600 list-disc list-inside space-y-0.5 mt-0.5">
                    {card.expHighlights.map((hl, hIdx) => (
                      <li key={hIdx} className="leading-tight">{hl}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default: Modern Clean
    return (
      <div className="text-slate-900 space-y-3 text-left">
        {/* Sample Resume Header */}
        <div className="border-b-2 border-brand-600 pb-2 space-y-0.5">
          <h3 className="text-xl font-black text-slate-900">{card.fullName}</h3>
          <p className="text-xs font-bold text-brand-600">{card.jobTitle}</p>
          <p className="text-[11px] text-slate-500">{card.contact}</p>
        </div>

        {/* Summary Section */}
        <div className="space-y-1">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-0.5">Professional Summary</h4>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            {card.summary}
          </p>
        </div>

        {/* Experience Section */}
        <div className="space-y-1">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-0.5">Work Experience</h4>
          <div>
            <div className="flex justify-between items-baseline text-[11px]">
              <span className="font-bold text-slate-800">{card.expTitle}</span>
              <span className="text-slate-500 font-medium text-[10px]">{card.expDates}</span>
            </div>
            <ul className="text-[11px] text-slate-600 list-disc list-inside space-y-0.5 mt-0.5">
              {card.expHighlights.map((hl, hIdx) => (
                <li key={hIdx}>{hl}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Skills Section */}
        <div className="space-y-1">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-0.5">Core Skills</h4>
          <div className="flex flex-wrap gap-1 pt-0.5">
            {card.skills.map((skill) => (
              <span key={skill} className="px-2 py-0.5 bg-brand-50 text-brand-700 border border-brand-200 rounded text-[10px] font-bold">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-16 pb-16 bg-slate-50/50">
      <SeoHead
        title="Build an ATS-Friendly Resume for Free | Resume Craft"
        description="Create an ATS-optimized resume in minutes. No login, no watermark, and no hidden fees. Download high-resolution vector PDFs free."
        canonicalPath="/"
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/80 via-white to-slate-50 pt-10 pb-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Focused Copy & Primary Action (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100/90 border border-brand-200 text-brand-950 text-xs sm:text-sm font-extrabold shadow-2xs">
                <Sparkles size={15} className="text-brand-600 shrink-0" />
                <span>No login, no watermark, and no hidden fees.</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12]">
                Build an <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-600">ATS-Friendly Resume</span> for Free
              </h1>

              <p className="text-base sm:text-lg text-slate-700 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Create a professional, interview-ready resume in minutes with our guided builder, AI bullet enhancers, and direct vector PDF export.
              </p>

              {/* Prominent Action Buttons with Front-and-Center PDF Importer */}
              <div className="flex flex-col sm:flex-row items-stretch justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => {
                    setUploadInitialStep('upload');
                    setShowUploadModal(true);
                  }}
                  className="px-7 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-2xl text-base shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer min-h-[50px] border border-emerald-400/30"
                >
                  <UploadCloud size={22} className="animate-bounce" />
                  <div className="text-left leading-tight">
                    <span className="block font-black text-base">Upload &amp; Parse Existing Resume</span>
                    <span className="block text-[11px] font-semibold text-emerald-100 opacity-90">Auto-fill builder in 3 seconds (PDF / Word)</span>
                  </div>
                </button>

                <Link
                  to="/builder"
                  className="px-7 py-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-2xl text-base shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer min-h-[50px]"
                >
                  <FileText size={20} className="text-brand-400" />
                  <span>Build From Scratch</span>
                  <ArrowRight size={18} />
                </Link>
              </div>

              {/* Instant Dropzone Quick-Import Highlight Banner */}
              <div
                onClick={() => {
                  setUploadInitialStep('upload');
                  setShowUploadModal(true);
                }}
                className="bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200/90 rounded-2xl p-3.5 text-center lg:text-left flex items-center justify-between gap-3 cursor-pointer transition-all shadow-xs group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <UploadCloud size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                      <span>🚀 PDF &amp; Word Resume Importer</span>
                      <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-extrabold">Instant Parse</span>
                    </div>
                    <p className="text-[11px] text-emerald-800 font-medium">Already have a resume? Upload your PDF or Word document to pre-fill all sections automatically.</p>
                  </div>
                </div>
                <span className="hidden sm:inline-block text-xs font-bold text-emerald-700 group-hover:translate-x-0.5 transition-transform shrink-0">
                  Upload PDF &rarr;
                </span>
              </div>

              {/* Trust Badges */}
              <div className="pt-3 border-t border-slate-200/90 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-sm text-slate-700 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Check size={16} className="text-emerald-600 stroke-[3]" /> 100% Free Forever
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={16} className="text-emerald-600 stroke-[3]" /> No Registration Required
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={16} className="text-emerald-600 stroke-[3]" /> Direct PDF Download
                </span>
              </div>
            </div>

            {/* Right Column: 6 Interactive Resume Previews Carousel (5 cols) */}
            <div 
              className="lg:col-span-5 space-y-3 relative overflow-hidden"
              onMouseEnter={() => setIsHeroCarouselPaused(true)}
              onMouseLeave={() => setIsHeroCarouselPaused(false)}
              onTouchStart={handleHeroTouchStart}
              onTouchMove={handleHeroTouchMove}
              onTouchEnd={handleHeroTouchEnd}
            >
              {/* Header Selector Pills & Navigation Controls */}
              <div className="flex items-center justify-between gap-2 bg-white/90 backdrop-blur-xs border border-slate-300 rounded-2xl p-2 shadow-xs">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-1 max-w-[280px] sm:max-w-[320px]">
                  {heroResumeCards.map((card, idx) => (
                    <button
                      key={card.id}
                      onClick={() => setActiveHeroCardIndex(idx)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        activeHeroCardIndex === idx
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                      }`}
                    >
                      {card.fullName.split(' ')[0]} ({card.pageLength})
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => setActiveHeroCardIndex((prev) => (prev <= 0 ? heroResumeCards.length - 1 : prev - 1))}
                    aria-label="Previous Resume Card"
                    className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:bg-brand-50 hover:text-brand-600 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-[11px] font-black text-slate-700 min-w-[32px] text-center">
                    {activeHeroCardIndex + 1}/{heroResumeCards.length}
                  </span>
                  <button
                    onClick={() => setActiveHeroCardIndex((prev) => (prev >= heroResumeCards.length - 1 ? 0 : prev + 1))}
                    aria-label="Next Resume Card"
                    className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:bg-brand-50 hover:text-brand-600 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Sliding Horizontal Carousel Track Container */}
              <div className="w-full overflow-hidden pt-2 pb-1">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${activeHeroCardIndex * 100}%)` }}
                >
                  {heroResumeCards.map((card) => (
                    <div
                      key={card.id}
                      className="w-full shrink-0 px-1 box-border"
                    >
                      <div
                        onClick={() => navigate('/resume-preview?slug=' + card.id, { state: { resumeData: card.presetData } })}
                        className="relative w-full max-w-md mx-auto lg:ml-auto bg-white rounded-2xl shadow-2xl border border-slate-300 p-6 space-y-3.5 transform hover:scale-[1.01] transition-transform cursor-pointer overflow-hidden min-h-[460px] flex flex-col justify-between"
                        title="Click to view full-page resume preview"
                      >
                        {/* Floating ATS Score Badge */}
                        <div className="absolute -top-3 -right-3 z-10 bg-emerald-600 text-white px-3.5 py-1.5 rounded-full font-black text-xs sm:text-sm shadow-md border-2 border-white flex items-center gap-1.5">
                          <CheckCircle2 size={15} />
                          <span>(Example result) ATS Score: {card.atsScore}</span>
                        </div>

                        {/* Top Metadata Badges Header */}
                        <div className="flex flex-wrap items-center justify-between gap-1.5 pt-0.5 pb-1 border-b border-slate-100">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-md bg-brand-50 text-brand-700 border border-brand-200">
                              🎨 Template: {card.templateName}
                            </span>
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
                              card.templateTag === 'Most Popular' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                              card.templateTag === 'Tech Favorite' ? 'bg-sky-100 text-sky-800 border-sky-300' :
                              card.templateTag === 'Executive' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                              card.templateTag === 'Modern' ? 'bg-indigo-100 text-indigo-900 border-indigo-300' :
                              'bg-rose-100 text-rose-900 border-rose-300'
                            }`}>
                              🏷️ {card.templateTag}
                            </span>
                          </div>
                          <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-md border ${
                            card.pageLength === '1-Page' ? 'bg-slate-100 text-slate-700 border-slate-300' :
                            card.pageLength === '2-Page' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                            'bg-purple-50 text-purple-800 border-purple-300'
                          }`}>
                            📄 {card.pageLength} Layout
                          </span>
                        </div>

                        {/* Authentic Template Visual Body */}
                        <div className="grow flex flex-col justify-center py-1">
                          {renderHeroTemplateBody(card)}
                        </div>

                        {/* Interactive Preview Link Button */}
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate('/resume-preview?slug=' + card.id, { state: { resumeData: card.presetData } });
                            }}
                            className="w-full py-2.5 bg-brand-50 hover:bg-brand-100 active:scale-[0.99] text-brand-700 font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 border border-brand-200 cursor-pointer shadow-xs"
                          >
                            <span>View &amp; Use Layout Preview</span>
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Carousel Dot Indicators */}
              <div className="flex items-center justify-center gap-1.5 pt-1">
                {heroResumeCards.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveHeroCardIndex(dotIdx)}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      activeHeroCardIndex === dotIdx ? 'w-6 bg-brand-600' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. RESUME EXAMPLES CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ResumeExamplesCarousel
          featuredOnly={true}
          title="5 Featured ATS Resume Examples"
          subtitle="Explore 5 recruiter-vetted resume samples spanning 1-page, 2-page, and 3-page layouts across diverse roles. Hover to pause auto-scroll, click 'View Example' for full details, or 'Use Example' to edit."
        />
      </section>

      {/* 3. CORE BENEFITS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-extrabold text-brand-600 uppercase tracking-wider bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
            Why Choose Resume Craft
          </span>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Engineered for High ATS Pass Rates
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <Layout size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">ATS-Proof Formatting</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Clean single-column layouts and standard typography ensure your resume is parsed correctly by recruiter systems.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">AI Bullet Enhancer</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Transform generic duty bullets into high-impact metric achievements using the Google X-Y-Z formula.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Download size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Direct Vector PDF Export</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Download clean vector PDFs with selectable text layers directly onto your device without browser print dialogs.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURE BANNER: FIND JOBS WITH YOUR RESUME */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-brand-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-extrabold border border-brand-400/30">
              <Briefcase size={14} className="text-brand-400" />
              <span>AI Job Matcher</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Find Jobs With Your Resume
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              Upload your resume or build one free to discover verified live job openings matched to your target role, technical skills, experience level, and preferred location.
            </p>
          </div>
          <Link
            to="/find-jobs-with-resume"
            className="px-6 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-extrabold rounded-2xl text-sm transition-all shadow-lg flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <span>Explore Job Matcher</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* FEATURE BANNER: INTERVIEW QUESTION GENERATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-extrabold border border-purple-200">
              <HelpCircle size={14} className="text-purple-600" />
              <span>Free Role-Based Interview Prep</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Prepare for Interviews by Job Role
            </h3>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              Generate 10 role-specific interview questions, technical trade-off scenarios, and STAR framework answer blueprints for any job title.
            </p>
          </div>
          <Link
            to="/interview-questions"
            className="px-6 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-2xl text-sm transition-all shadow-lg flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <span>Interview Question Generator</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl font-black text-slate-950 tracking-tight">
              How to Build Your Resume in Minutes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="space-y-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-extrabold flex items-center justify-center text-sm shadow-md">
                1
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Enter Your Information</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Follow our step-by-step guided forms for personal details, work history, education, and skills.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-extrabold flex items-center justify-center text-sm shadow-md">
                2
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Choose a Template</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Select from clean, ATS-compliant designs and customize colors, font sizes, and layout density.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-extrabold flex items-center justify-center text-sm shadow-md">
                3
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Download Your PDF</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Export a vector PDF file directly to your device. No sign up, no watermark, and 100% free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEMPLATES GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            ATS Templates
          </span>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Professional &amp; ATS-Compliant Layouts
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TEMPLATE_LIST.map((tpl) => (
            <div key={tpl.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-base">{tpl.name}</h3>
                  <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded">{tpl.tag}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{tpl.description}</p>
              </div>
              <Link
                to="/builder"
                className="w-full py-2.5 bg-slate-100 hover:bg-brand-600 hover:text-white text-slate-800 text-xs font-bold rounded-xl transition-colors text-center flex items-center justify-center gap-1.5"
              >
                <span>Build With This Template</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>



      {/* 6. PRIVACY & FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <FaqAccordion items={homeFaqs} />
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight max-w-2xl mx-auto">
            Ready to Build Your Free ATS-Friendly Resume?
          </h2>
          <p className="text-sm sm:text-base text-brand-100 max-w-xl mx-auto">
            Join thousands of job seekers creating professional resumes with zero login, zero watermark, and zero hidden fees.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              to="/builder"
              className="px-8 py-4 bg-white hover:bg-slate-100 text-brand-900 font-extrabold rounded-2xl text-base shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <FileText size={20} className="text-brand-600" />
              <span>Build My Resume Free</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Global Upload Resume Modal */}
      <UploadResumeModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        initialStep={uploadInitialStep}
      />
    </div>
  );
};
