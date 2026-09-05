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
  FileText
} from 'lucide-react';

export interface ExampleCardData {
  id: string;
  slug: string;
  roleTitle: string;
  category: string;
  badgeColor: string;
  icon: any;
  shortDescription: string;
  candidateName: string;
  candidateRole: string;
  metrics: string[];
  skills: string[];
  presetData: any;
}

export const FIVE_HIGH_QUALITY_EXAMPLES: ExampleCardData[] = [
  {
    id: 'ex-ai-fullstack',
    slug: 'ai-engineer',
    roleTitle: 'Senior Full Stack AI Architect',
    category: 'Engineering & AI',
    badgeColor: '#4f46e5',
    icon: Code,
    shortDescription: 'Specialized in LLM fine-tuning, multi-stage RAG agent pipelines, and high-throughput production microservices.',
    candidateName: 'Alex Vance',
    candidateRole: 'Senior Full Stack AI Engineer',
    metrics: ['RAG Hallucinations -64%', 'p95 Latency 240ms', '99.99% Uptime'],
    skills: ['PyTorch', 'TypeScript', 'LangChain', 'Pinecone', 'AWS EKS'],
    presetData: {
      title: 'Senior Full Stack AI Architect (Example)',
      personalInfo: {
        fullName: 'Alex Vance',
        jobTitle: 'Senior Full Stack AI Architect',
        email: 'alex.vance@example.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA (Remote)',
        website: 'alexvance.ai',
        linkedin: 'linkedin.com/in/alexvance-ai',
        github: 'github.com/alexvance-dev'
      },
      summary: 'Results-driven Senior Full Stack AI Engineer with 6+ years of experience architecting LLM fine-tuning pipelines, RAG microservices, and high-scale SaaS web platforms processing 5M+ daily API calls.',
      experience: [
        {
          id: 'exp-ai-1',
          role: 'Senior Full Stack AI Engineer',
          company: 'CloudPulse Cognitive Labs',
          location: 'San Francisco, CA',
          startDate: '2022-01',
          endDate: 'Present',
          current: true,
          highlights: [
            'Architected a multi-stage Retrieval-Augmented Generation (RAG) pipeline using LangChain, Pinecone, and GPT-4o, reducing hallucination rates by 64% across 800k monthly queries.',
            'Optimized model inference latency with TensorRT-LLM on NVIDIA H100 GPU clusters, cutting p95 response time from 1.8s to 240ms and reducing cloud compute expenses by $22,000/month.',
            'Spearheaded frontend migration to Next.js and TypeScript, boosting core Web Vitals score to 98/100.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-ai-1',
          degree: 'B.S. in Computer Science & Artificial Intelligence',
          institution: 'UC Berkeley',
          location: 'Berkeley, CA',
          startDate: '2016',
          endDate: '2020',
          gpa: '3.91 / 4.0'
        }
      ],
      skills: [
        { id: 's-1', category: 'AI & Engineering', items: ['PyTorch', 'TypeScript', 'LangChain', 'Pinecone', 'React', 'Node.js', 'Docker', 'AWS EKS'] }
      ]
    }
  },
  {
    id: 'ex-product-leader',
    slug: 'project-manager',
    roleTitle: 'Lead Product Strategy Manager',
    category: 'Product & Leadership',
    badgeColor: '#0284c7',
    icon: Briefcase,
    shortDescription: 'Data-driven Product Leader skilled in zero-to-one SaaS launches, user growth, and scaling ARR from $1M to $8M.',
    candidateName: 'Elena Rostova',
    candidateRole: 'Lead Product Manager',
    metrics: ['ARR Growth +$7M', 'Checkout Conversion +28%', '100+ User Interviews'],
    skills: ['Product Strategy', 'Agile/Scrum', 'Mixpanel', 'A/B Testing', 'SQL'],
    presetData: {
      title: 'Lead Product Strategy Manager (Example)',
      personalInfo: {
        fullName: 'Elena Rostova',
        jobTitle: 'Lead Product Manager',
        email: 'elena.rostova@prodmail.io',
        phone: '+1 (555) 876-5432',
        location: 'New York, NY',
        website: 'elenarostova.com',
        linkedin: 'linkedin.com/in/elenarostova-pm',
        github: ''
      },
      summary: 'Strategic Lead Product Manager with 7+ years of experience launching zero-to-one SaaS products, growing ARR from $1M to $8M, and leading cross-functional engineering squads.',
      experience: [
        {
          id: 'exp-pm-1',
          role: 'Lead Product Manager',
          company: 'Finnovate Pay',
          location: 'New York, NY',
          startDate: '2021-08',
          endDate: 'Present',
          current: true,
          highlights: [
            'Owned the core checkout product line, driving a 28% increase in conversion rate and generating $3.2M incremental annual revenue.',
            'Conducted 100+ customer interviews and usability tests to define product roadmap and backlog priorities for 3 engineering squads.',
            'Initiated automated A/B testing framework that reduced user onboarding friction by 40%.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-pm-1',
          degree: 'B.S. in Business Administration & Marketing',
          institution: 'New York University (NYU)',
          location: 'New York, NY',
          startDate: '2014',
          endDate: '2018',
          gpa: '3.88 / 4.0'
        }
      ],
      skills: [
        { id: 'spm-1', category: 'Product Leadership', items: ['Product Discovery', 'User Metrics & Mixpanel', 'Agile Roadmap', 'Jira', 'A/B Testing'] }
      ]
    }
  },
  {
    id: 'ex-uxui-designer',
    slug: 'data-analyst',
    roleTitle: 'Senior UX/UI Design Systems Specialist',
    category: 'Design & Creative',
    badgeColor: '#ec4899',
    icon: Palette,
    shortDescription: 'Senior UX Designer expert in tokenized Figma design systems, WCAG 2.1 accessibility, and usability metrics.',
    candidateName: 'Maya Lin',
    candidateRole: 'Senior Product Designer',
    metrics: ['SUS Score 68 -> 89', '200+ Token Components', 'Design Handoff -40%'],
    skills: ['Figma', 'Design Systems', 'Usability Testing', 'Prototyping', 'WCAG 2.1'],
    presetData: {
      title: 'Senior UX/UI Product Designer (Example)',
      personalInfo: {
        fullName: 'Maya Lin',
        jobTitle: 'Senior UX/UI Product Designer',
        email: 'maya.lin@designstudio.co',
        phone: '+1 (555) 444-9988',
        location: 'Los Angeles, CA',
        website: 'mayalin.design',
        linkedin: 'linkedin.com/in/mayalin-ux',
        github: ''
      },
      summary: 'Passionate Senior Product Designer with 5+ years of experience designing intuitive iOS, Android, and web applications. Creator of scalable multi-brand Figma design systems.',
      experience: [
        {
          id: 'exp-ux-1',
          role: 'Senior UX/UI Designer',
          company: 'Aura Design Labs',
          location: 'Los Angeles, CA',
          startDate: '2021-09',
          endDate: 'Present',
          current: true,
          highlights: [
            'Redesigned mobile banking workflow for 1.2M users, increasing System Usability Scale (SUS) score from 68 to 89.',
            'Built accessible Figma Design System with 200+ tokenized UI components, cutting design-to-development handoff time by 40%.',
            'Moderated 40+ qualitative user testing sessions to iterate on interactive high-fidelity prototypes.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-ux-1',
          degree: 'B.F.A. in Graphic & Interaction Design',
          institution: 'Rhode Island School of Design (RISD)',
          location: 'Providence, RI',
          startDate: '2015',
          endDate: '2019',
          gpa: '3.94 / 4.0'
        }
      ],
      skills: [
        { id: 'sux-1', category: 'Design Competencies', items: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'WCAG Accessibility'] }
      ]
    }
  },
  {
    id: 'ex-registered-nurse',
    slug: 'nurse',
    roleTitle: 'Charge Nurse & Clinical Operations Lead',
    category: 'Healthcare & Clinical',
    badgeColor: '#059669',
    icon: HeartPulse,
    shortDescription: 'BSN-certified Registered Nurse specializing in ER triage assessment, Epic EHR documentation, and patient advocacy.',
    candidateName: 'Rachel Adams',
    candidateRole: 'Registered Nurse (BSN, RN, ACLS)',
    metrics: ['30+ Daily ER Admissions', '99.2% Safety Score', 'Epic EHR Specialist'],
    skills: ['Acute Triage', 'Epic EHR', 'ACLS / BLS', 'Medication Safety', 'Patient Advocacy'],
    presetData: {
      title: 'Registered Nurse & Clinical Lead (Example)',
      personalInfo: {
        fullName: 'Rachel Adams, BSN, RN',
        jobTitle: 'Charge Nurse & Emergency Room RN',
        email: 'rachel.adams@healthmail.org',
        phone: '+1 (555) 222-7788',
        location: 'Boston, MA',
        website: '',
        linkedin: 'linkedin.com/in/racheladams-rn',
        github: ''
      },
      summary: 'Dedicated Registered Nurse (BSN, RN) with 5+ years of acute care experience in Level-1 Trauma Emergency Departments. Expert in rapid triage assessment, Epic EHR, and patient advocacy.',
      experience: [
        {
          id: 'exp-rn-1',
          role: 'Charge Nurse & ER Specialist',
          company: 'Massachusetts General Hospital',
          location: 'Boston, MA',
          startDate: '2020-07',
          endDate: 'Present',
          current: true,
          highlights: [
            'Managed acute patient care for 30+ daily ER admissions in high-volume Level-1 Trauma Center.',
            'Trained and onboarded 12 new graduate nurses on hospital safety protocols and Epic EHR workflows.',
            'Maintained 99.2% medication safety compliance and 98% patient satisfaction rating.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-rn-1',
          degree: 'B.S. in Nursing (BSN)',
          institution: 'Boston College School of Nursing',
          location: 'Boston, MA',
          startDate: '2016',
          endDate: '2020',
          gpa: '3.89 / 4.0'
        }
      ],
      skills: [
        { id: 'srn-1', category: 'Clinical Competencies', items: ['Acute Triage', 'Epic EHR', 'ACLS & BLS Certified', 'Medication Administration', 'Patient Advocacy'] }
      ]
    }
  },
  {
    id: 'ex-data-finance-analyst',
    slug: 'data-scientist',
    roleTitle: 'Senior Financial & Quantitative Analyst',
    category: 'Finance & Analytics',
    badgeColor: '#d97706',
    icon: BarChart3,
    shortDescription: 'Analytical FP&A Specialist proficient in DCF valuation models, SQL data pipelines, and Tableau reporting.',
    candidateName: 'Robert Sterling',
    candidateRole: 'Senior Financial & Business Analyst',
    metrics: ['$60M Operating Budget', '98.5% Forecast Accuracy', 'Saved 15 hrs/mo'],
    skills: ['Financial Modeling', 'SQL', 'Tableau', 'Excel VBA', 'FP&A Forecasting'],
    presetData: {
      title: 'Senior Financial & Data Analyst (Example)',
      personalInfo: {
        fullName: 'Robert Sterling, CFA',
        jobTitle: 'Senior Financial & Business Analyst',
        email: 'robert.sterling@finmail.com',
        phone: '+1 (555) 777-3322',
        location: 'Chicago, IL',
        website: '',
        linkedin: 'linkedin.com/in/robertsterling-cfa',
        github: ''
      },
      summary: 'CFA Charterholder and Senior Financial Analyst with 5+ years of experience managing $60M+ operating budgets, building DCF valuation models, and optimizing corporate cash flows with SQL and Tableau.',
      experience: [
        {
          id: 'exp-fa-1',
          role: 'Senior Financial Analyst',
          company: 'Apex Global Capital',
          location: 'Chicago, IL',
          startDate: '2021-06',
          endDate: 'Present',
          current: true,
          highlights: [
            'Managed annual budgeting and quarterly re-forecasting for $60M business division, achieving 98.5% forecast accuracy.',
            'Developed automated Excel VBA financial models and Tableau dashboards, saving 15 hours of monthly reporting effort.',
            'Identified $1.4M in operational cost-saving opportunities through variance analysis.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-fa-1',
          degree: 'B.S. in Finance & Quantitative Economics',
          institution: 'University of Chicago Booth School of Business',
          location: 'Chicago, IL',
          startDate: '2016',
          endDate: '2020',
          gpa: '3.86 / 4.0'
        }
      ],
      skills: [
        { id: 'sfa-1', category: 'Finance & Tools', items: ['DCF Valuation', 'Advanced Excel & VBA', 'SQL', 'Tableau', 'FP&A Forecasting'] }
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
  title = "Explore ATS-Optimized Resume Examples",
  subtitle = "Hover over any card to pause auto-scrolling. Click 'Use This Example' to edit immediately in the builder."
}) => {
  const { updateResume } = useResume();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4); // 4 on desktop, 2 on tablet, 1 on mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const totalOriginal = FIVE_HIGH_QUALITY_EXAMPLES.length;

  // Quadruple items to ensure smooth infinite looping in both directions
  const carouselItems = [
    ...FIVE_HIGH_QUALITY_EXAMPLES,
    ...FIVE_HIGH_QUALITY_EXAMPLES,
    ...FIVE_HIGH_QUALITY_EXAMPLES,
    ...FIVE_HIGH_QUALITY_EXAMPLES
  ];

  // Update visible card count based on screen breakpoint (Desktop: 4, Tablet: 2, Mobile: 1)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1); // Mobile
      } else if (width < 1024) {
        setVisibleCount(2); // Tablet
      } else {
        setVisibleCount(4); // Desktop
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth infinite auto-scroll timer right to left
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3200);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

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

  // Touch Swipe Handlers for mobile & tablet
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

  // Calculate card width percentage based on visible columns
  const itemWidthPercent = 100 / visibleCount;

  return (
    <section 
      className="w-full py-8 space-y-6 relative overflow-hidden select-none"
      aria-label="Resume Examples Carousel"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 px-1">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-extrabold border border-brand-200 mb-2">
            <Sparkles size={14} className="text-brand-600 animate-pulse" />
            <span>5 High-Impact ATS Examples • Infinite Loop</span>
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
            Showing {visibleCount} on {visibleCount === 4 ? 'Desktop' : visibleCount === 2 ? 'Tablet' : 'Mobile'}
          </span>
          <button
            onClick={handlePrev}
            aria-label="Previous Resume Example"
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-brand-600 hover:border-brand-300 shadow-xs hover:shadow-md flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Resume Example"
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
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${item.badgeColor}15` }}
                        >
                          <IconComp size={18} color={item.badgeColor} />
                        </div>
                        <span
                          className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md"
                          style={{ color: item.badgeColor, backgroundColor: `${item.badgeColor}10` }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        ATS 98/100
                      </span>
                    </div>

                    <h3 className="text-base font-black text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                      {item.roleTitle}
                    </h3>

                    {/* Visual Mini-Resume Preview Box */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-2 text-[11px] font-sans text-slate-700 shadow-2xs group-hover:bg-brand-50/30 transition-colors">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                        <span className="font-extrabold text-slate-900">{item.candidateName}</span>
                        <span className="text-[9px] font-bold text-brand-600">{item.candidateRole}</span>
                      </div>

                      {/* Achievement Highlights */}
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
                        {item.skills.slice(0, 3).map((sk, skIdx) => (
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

                  {/* Card Action Button */}
                  <div className="pt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleUseExample(item)}
                      className="w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white rounded-xl text-xs font-extrabold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Use This Example</span>
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
