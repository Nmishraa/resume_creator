import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import { SeoHead } from '../../components/common/SeoHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { FaqAccordion } from '../../components/common/FaqAccordion';
import { ResumeRenderer } from '../../components/templates';
import { downloadPdfFromElement } from '../../services/pdfService';
import { ResumeData } from '../../types/resume';
import { ROLE_SEO_DATA } from '../../data/roleSeoData';
import {
  FileText,
  Sparkles,
  Download,
  FileDown,
  Layers,
  ShieldCheck,
  Zap,
  Tag,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  Target,
  BarChart3,
  Award,
  Cpu,
  Users,
  Search,
  BookOpen,
  ArrowLeft
} from 'lucide-react';

export const ProductManagerPage: React.FC = () => {
  const { updateResume } = useResume();
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);
  const printableRef = useRef<HTMLDivElement>(null);

  const seoData = ROLE_SEO_DATA['product-manager'];

  const pmResumeData: ResumeData = {
    id: 'resume-product-manager',
    title: 'Product Manager Resume',
    updatedAt: new Date().toISOString(),
    personalInfo: {
      fullName: 'Elena Rostova',
      jobTitle: 'Senior Product Manager',
      email: 'elena.rostova@productlabs.io',
      phone: '(555) 567-8901',
      location: 'New York, NY',
      website: 'elenarostova.com',
      linkedin: 'linkedin.com/in/elenarostova',
      github: ''
    },
    summary: 'Data-driven Senior Product Manager with 6+ years of experience leading cross-functional engineering and design squads. Proven track record launching enterprise B2B SaaS features, optimizing user onboarding funnels, conducting customer discovery, and driving 38% 90-day retention lifts.',
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
          'Spearheaded enterprise API portal launch across 4 engineering squads, boosting 90-day active user retention by 38% and adding $3.4M ARR in 6 months.',
          'Directed product discovery across 50+ customer interviews, identifying key churn friction points and cutting onboarding drop-offs by 24%.',
          'Designed and executed 40+ A/B experimentation variants on subscription checkout flows, elevating conversion velocity by 18% and generating $850k in incremental revenue.',
          'Authored comprehensive PRDs and user stories in Jira, maintaining 96% sprint velocity delivery across 12-week Agile release cycles.'
        ]
      },
      {
        id: 'exp-pm-2',
        role: 'Senior Product Manager',
        company: 'Apex Growth Labs',
        location: 'New York, NY',
        startDate: '2018-08',
        endDate: '2021-03',
        current: false,
        highlights: [
          'Owned core subscription & checkout growth roadmap, scaling ARR from $12M to $28M through data-driven feature prioritization.',
          'Partnered with UX research and sales leadership to overhaul onboarding UX, reducing customer time-to-value from 14 days to 48 hours.',
          'Introduced Mixpanel & Amplitude event tracking frameworks, empowering PM and engineering teams with self-serve product analytics.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-pm-1',
        degree: 'B.S. in Business Administration & Computer Science',
        institution: 'NYU Stern School of Business',
        location: 'New York, NY',
        startDate: '2014',
        endDate: '2018'
      }
    ],
    skills: [
      {
        id: 'sk-pm-1',
        category: 'Product Strategy & Discovery',
        items: ['Product Strategy', 'Roadmapping', 'User Research', 'Customer Discovery', 'Market Research', 'Competitive Analysis']
      },
      {
        id: 'sk-pm-2',
        category: 'Analytics & Optimization',
        items: ['Product Analytics', 'A/B Testing', 'SQL', 'Mixpanel', 'Amplitude', 'Google Analytics', 'Conversion Rate Optimization']
      },
      {
        id: 'sk-pm-3',
        category: 'Execution & Tools',
        items: ['Agile', 'Scrum', 'Jira', 'Confluence', 'Figma', 'Stakeholder Management', 'Go-To-Market (GTM)']
      }
    ],
    projects: [],
    certifications: [
      { id: 'cert-pm-1', name: 'Certified Scrum Product Owner (CSPO)', issuer: 'Scrum Alliance', date: '2020' },
      { id: 'cert-pm-2', name: 'Pragmatic Institute Certified Product Manager', issuer: 'Pragmatic Institute', date: '2021' }
    ],
    customSections: [],
    formatting: {
      template: 'modern',
      fontFamily: 'inter',
      fontSize: 'base',
      accentColor: '#0284c7',
      spacing: 'normal',
      showIcons: true,
      sectionOrder: ['summary', 'experience', 'skills', 'education', 'certifications']
    }
  };

  const handleUsePreset = () => {
    updateResume(pmResumeData);
    navigate('/builder?example=product-manager');
  };

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    try {
      await downloadPdfFromElement('pm-resume-sheet', 'product-manager-resume.pdf');
    } catch (err) {
      console.error('PDF Export Error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Product Manager Resume Example & ATS-Friendly Template | Resume Craft',
    description: 'Explore a professional Product Manager resume example and learn how to create an ATS-friendly Product Manager resume with Resume Craft. Build and download your resume for free.',
    url: 'https://resume.gnanamai.com/resume-examples/product-manager'
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://resume.gnanamai.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Resume Examples',
        item: 'https://resume.gnanamai.com/resume-examples'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Product Manager Resume',
        item: 'https://resume.gnanamai.com/resume-examples/product-manager'
      }
    ]
  };

  const pmFaqs = [
    {
      question: 'What should a Product Manager include on a resume?',
      answer: 'A Product Manager resume should highlight product strategy, customer discovery, roadmap prioritization, A/B testing experimentation, product analytics, stakeholder alignment, and measurable business outcomes such as revenue growth, retention lifts, or user acquisition metrics.'
    },
    {
      question: 'How long should a Product Manager resume be?',
      answer: 'For most Product Managers with 3–7 years of experience, a 1-to-2 page resume is ideal. Senior PMs, Directors, or Product Executives with 8+ years of experience managing portfolios or large teams can use a structured 2-page format.'
    },
    {
      question: 'How do I make a Product Manager resume ATS-friendly?',
      answer: 'Use a clean single-column structure, standard section titles (Summary, Work Experience, Skills, Education), clear text formatting, and relevant industry terminology like Product Strategy, Agile/Scrum, User Discovery, and Product Analytics. Avoid unparseable tables or graphic skill bars.'
    },
    {
      question: 'What skills should a Product Manager put on a resume?',
      answer: 'Key skills include Product Strategy, Roadmapping, Customer Discovery, User Research, Agile/Scrum, A/B Testing, Product Analytics, SQL, Jira, Confluence, Figma, Market Research, Stakeholder Management, and Go-To-Market (GTM) execution.'
    },
    {
      question: 'Can I create a Product Manager resume for free?',
      answer: 'Yes! Resume Craft allows you to build, format, and download your Product Manager resume as a high-resolution vector PDF completely free with zero watermark and no login required.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <SeoHead
        title="Product Manager Resume Example & ATS-Friendly Template | Resume Craft"
        description="Explore a professional Product Manager resume example and learn how to create an ATS-friendly Product Manager resume with Resume Craft. Build and download your resume for free."
        canonicalPath="https://resume.gnanamai.com/resume-examples/product-manager"
        ogType="article"
        jsonLd={[webPageSchema, breadcrumbSchema]}
        faqItems={pmFaqs}
      />

      {/* Top Header & Breadcrumbs Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Resume Examples', path: '/resume-examples' },
            { name: 'Product Manager Resume', path: '/resume-examples/product-manager' }
          ]}
        />
        <Link
          to="/resume-examples"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Explore All Resume Examples</span>
        </Link>
      </div>

      {/* Hero Header Section */}
      <section className="space-y-4 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200 uppercase tracking-wider">
            Product &amp; Tech
          </span>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
            Mid-Senior (4-8+ Years)
          </span>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            100% Recruiter Approved
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Product Manager Resume Example
        </h1>

        <p className="text-base sm:text-lg text-slate-700 max-w-4xl leading-relaxed font-normal">
          Create a professional Product Manager resume that highlights product strategy, customer research, product discovery, roadmaps, analytics, experimentation, stakeholder management, and measurable business impact. Explore this ATS-friendly Product Manager resume example and use Resume Craft to create and download your own resume for free.
        </p>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-3 pt-3">
          <button
            onClick={handleUsePreset}
            className="px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles size={16} />
            <span>Create This Resume</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="px-5 py-3.5 bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Download size={16} />
            <span>{isExporting ? 'Preparing PDF...' : 'Download PDF'}</span>
          </button>

          <Link
            to="/resume-templates/product-manager"
            className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-xs sm:text-sm border border-slate-300 shadow-xs transition-all flex items-center gap-2"
          >
            <Layers size={16} className="text-brand-600" />
            <span>Product Manager Resume Template</span>
          </Link>

          <Link
            to="/builder"
            className="px-5 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold rounded-xl text-xs sm:text-sm border border-emerald-200 transition-all flex items-center gap-2"
          >
            <Briefcase size={16} className="text-emerald-700" />
            <span>Free Resume Builder</span>
          </Link>
        </div>
      </section>

      {/* Main Resume Sheet Visual Preview */}
      <section className="bg-slate-100/70 border border-slate-300/80 rounded-3xl p-4 sm:p-8 space-y-4 shadow-sm flex flex-col items-center">
        <div className="w-full flex items-center justify-between px-2 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
              Interactive Product Manager Resume Preview
            </span>
          </div>
          <span className="text-xs font-bold text-slate-500">
            Senior Product Manager
          </span>
        </div>

        {/* Printable Resume Renderer */}
        <div className="w-full overflow-x-auto flex justify-center py-2">
          <div id="pm-resume-sheet" ref={printableRef} className="bg-white text-black shadow-2xl rounded-sm border border-slate-300 w-[794px] min-h-[1123px] box-border p-6 sm:p-10 shrink-0">
            <ResumeRenderer resume={pmResumeData} />
          </div>
        </div>
      </section>

      {/* SECTION 1: Product Manager Resume Example Explanation */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-brand-700 text-xs font-extrabold uppercase tracking-wider">
          <CheckCircle2 size={16} />
          <span>Recruiter-Vetted Structure</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
          Product Manager Resume Example
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          This Product Manager resume example demonstrates how to structure product accomplishments with clarity, authority, and measurable business impact. Hiring managers and VPs of Product evaluate candidates based on their ability to lead cross-functional engineering and design squads, formulate strategic product vision, and validate feature hypotheses through data.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          Key elements highlighted in this example include:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-800">
          <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-brand-600 font-bold">✓</span>
            <span><strong>Product Strategy:</strong> Translating business goals into multi-quarter product vision and actionable execution steps.</span>
          </li>
          <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-brand-600 font-bold">✓</span>
            <span><strong>Product Discovery &amp; User Research:</strong> Conducting user interviews, qualitative discovery, and customer journey mapping.</span>
          </li>
          <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-brand-600 font-bold">✓</span>
            <span><strong>Product Roadmaps &amp; Prioritization:</strong> Balancing technical debt, customer feature requests, and business objectives using RICE or Kano.</span>
          </li>
          <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-brand-600 font-bold">✓</span>
            <span><strong>Analytics &amp; Experimentation:</strong> Running A/B tests, monitoring funnel conversion rates, and leveraging Mixpanel, Amplitude, or SQL.</span>
          </li>
          <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-brand-600 font-bold">✓</span>
            <span><strong>Stakeholder Management:</strong> Aligning executive leadership, sales, customer success, engineering, and UX teams behind release milestones.</span>
          </li>
          <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-brand-600 font-bold">✓</span>
            <span><strong>Product Launches &amp; Outcomes:</strong> Demonstrating quantifiable metrics like ARR expansion, DAU/MAU retention lifts, and conversion velocity.</span>
          </li>
        </ul>
      </section>

      {/* SECTION 2: How to Write a Product Manager Resume */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 shadow-xs">
        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Step-by-Step Guidance
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            How to Write a Product Manager Resume
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Writing an effective Product Manager resume requires focusing on outcomes rather than listing daily administrative duties. Follow these essential guidelines to craft a compelling document:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="text-base font-extrabold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>Professional Summary</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Open with a concise 3-line summary introducing your product domain experience (B2B SaaS, Mobile, Fintech, Consumer), team scale, product methodology expertise, and top quantitative accomplishment (e.g., ARR growth or active user retention lift).
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="text-base font-extrabold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>Product Experience &amp; Outcomes</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Detail your employment history using action verbs (Spearheaded, Directed, Architected, Launched). Each bullet point should connect product initiatives directly to business metrics like customer retention, adoption rates, or revenue.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="text-base font-extrabold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>Measurable Product Metrics</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Quantify your achievements using key performance indicators (KPIs) such as Monthly Active Users (MAU), Customer Acquisition Cost (CAC), Net Promoter Score (NPS), and conversion funnel velocity.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="text-base font-extrabold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">4</span>
              <span>Technical &amp; Product Skills</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Organize your technical tools and product methodologies into distinct categories like Product Analytics, Agile Frameworks, Discovery Tools, and Data Analysis.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: Product Manager Resume Skills */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 shadow-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <Zap size={16} />
            <span>Essential Competencies</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            Product Manager Resume Skills
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Product Managers operate at the intersection of business strategy, technology, and user experience. Rather than listing random buzzwords, group your skills naturally across strategic planning, analytical tools, and cross-functional execution:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-2">
              <Target size={16} className="text-brand-600" />
              <span>Strategy &amp; Discovery</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Demonstrates your ability to establish market fit, evaluate competitive landscapes, and uncover real user pain points:
            </p>
            <ul className="space-y-1 text-xs text-slate-800 font-semibold">
              <li>• Product Strategy</li>
              <li>• Product Roadmapping</li>
              <li>• Product Discovery</li>
              <li>• User Research &amp; Customer Interviews</li>
              <li>• Market Research &amp; Benchmarking</li>
            </ul>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-2">
              <BarChart3 size={16} className="text-emerald-600" />
              <span>Analytics &amp; Data</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Validates your data-driven decision-making and hypothesis testing rigor:
            </p>
            <ul className="space-y-1 text-xs text-slate-800 font-semibold">
              <li>• Product Analytics (Amplitude / Mixpanel)</li>
              <li>• A/B Testing &amp; Experimentation</li>
              <li>• SQL Data Extraction</li>
              <li>• Google Analytics</li>
              <li>• Funnel &amp; Cohort Analysis</li>
            </ul>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-2">
              <Cpu size={16} className="text-purple-600" />
              <span>Agile &amp; Tools</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Proves your proficiency leading sprint cycles and collaborating with design and engineering teams:
            </p>
            <ul className="space-y-1 text-xs text-slate-800 font-semibold">
              <li>• Agile &amp; Scrum Methodologies</li>
              <li>• Jira &amp; Confluence</li>
              <li>• Figma Wireframing &amp; Prototyping</li>
              <li>• Stakeholder Management</li>
              <li>• Go-To-Market (GTM) Product Launches</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: Product Manager Resume Summary Example */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 shadow-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-purple-700 text-xs font-bold uppercase tracking-wider">
            <FileText size={16} />
            <span>Tested Summary Templates</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            Product Manager Resume Summary Example
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Your summary statement is your 6-second elevator pitch. Here are 3 realistic examples tailored to different experience levels:
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-5 bg-purple-50/40 rounded-2xl border border-purple-200 space-y-2">
            <span className="text-xs font-extrabold text-purple-900 uppercase tracking-wider bg-purple-100 px-2.5 py-0.5 rounded-md">
              Example 1: Senior B2B SaaS Product Manager
            </span>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium pt-1">
              &ldquo;Data-driven Senior Product Manager with 6+ years of experience leading cross-functional engineering and UX squads to launch enterprise B2B SaaS products. Spearheaded product discovery and GTM strategy for developer API portals, boosting 90-day active user retention by 38% while scaling ARR from $12M to $28M.&rdquo;
            </p>
          </div>

          <div className="p-5 bg-purple-50/40 rounded-2xl border border-purple-200 space-y-2">
            <span className="text-xs font-extrabold text-purple-900 uppercase tracking-wider bg-purple-100 px-2.5 py-0.5 rounded-md">
              Example 2: Growth &amp; Experimentation Product Manager
            </span>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium pt-1">
              &ldquo;Customer-centric Product Manager specializing in mobile app growth, A/B experimentation, and checkout conversion funnel optimization. Directed user research across 100+ customer interviews, driving 4.8-star app store ratings, a 32% onboarding funnel conversion lift, and 2.4M new downloads.&rdquo;
            </p>
          </div>

          <div className="p-5 bg-purple-50/40 rounded-2xl border border-purple-200 space-y-2">
            <span className="text-xs font-extrabold text-purple-900 uppercase tracking-wider bg-purple-100 px-2.5 py-0.5 rounded-md">
              Example 3: Associate / Early-Career Product Manager
            </span>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium pt-1">
              &ldquo;Analytical Associate Product Manager with 2+ years of experience managing sprint backlogs, writing PRDs, and conducting competitive market research. Partnered with engineering leads to release 12 consecutive Jira sprint cycles on schedule, reducing customer ticket escalations by 19%.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: Product Manager Resume Experience */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 shadow-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-brand-700 text-xs font-bold uppercase tracking-wider">
            <Award size={16} />
            <span>Metric-Driven Bullet Points</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            Product Manager Resume Experience
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            When describing product accomplishments, use quantifiable outcomes to illustrate business impact. Every bullet point should pair an initiative with a measurable metric across adoption, revenue, conversion, retention, or operational efficiency:
          </p>
        </div>

        <ul className="space-y-3">
          <li className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 text-xs sm:text-sm text-slate-800 flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
            <div>
              <strong>Product Adoption &amp; Growth:</strong> &ldquo;Spearheaded product discovery across 4 engineering squads, launching enterprise subscription tier that generated $3.4M ARR within 6 months.&rdquo;
            </div>
          </li>
          <li className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 text-xs sm:text-sm text-slate-800 flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
            <div>
              <strong>Conversion Velocity:</strong> &ldquo;Designed and executed 40+ A/B experiments on checkout flow, improving conversion velocity by 18% and adding $850k in incremental revenue.&rdquo;
            </div>
          </li>
          <li className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 text-xs sm:text-sm text-slate-800 flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
            <div>
              <strong>Customer Retention:</strong> &ldquo;Overhauled customer onboarding UX in partnership with design leadership, reducing 90-day churn by 22% and improving NPS scores from +32 to +54.&rdquo;
            </div>
          </li>
          <li className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 text-xs sm:text-sm text-slate-800 flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
            <div>
              <strong>Operational Efficiency &amp; Execution:</strong> &ldquo;Authored detailed PRDs and user stories in Jira, maintaining 96% sprint velocity delivery across 12-week release cycles.&rdquo;
            </div>
          </li>
        </ul>
      </section>

      {/* SECTION 6: ATS-Friendly Product Manager Resume */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl border border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck size={16} />
            <span>Applicant Tracking System Compliance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            ATS-Friendly Product Manager Resume
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Enterprise companies rely on Applicant Tracking Systems (ATS) like Workday, Taleo, Greenhouse, and Lever to filter incoming applications. To ensure your Product Manager resume passes scanner algorithms:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
            <h3 className="font-bold text-emerald-300">Standard Headings</h3>
            <p className="text-slate-300">Use standard titles like "Work Experience", "Skills", and "Education" rather than creative phrasing.</p>
          </div>
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
            <h3 className="font-bold text-emerald-300">Clean Document Flow</h3>
            <p className="text-slate-300">Avoid nested text boxes, unparseable tables, or heavy graphical charts that disrupt text extraction.</p>
          </div>
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
            <h3 className="font-bold text-emerald-300">Relevant Terminology</h3>
            <p className="text-slate-300">Integrate core target keywords directly into summary statements and achievement bullets naturally.</p>
          </div>
        </div>

        <p className="text-xs text-slate-400 italic">
          Note: While an ATS-friendly layout ensures parser readability, callback success depends on matching job requirements and presenting strong achievement metrics.
        </p>
      </section>

      {/* SECTION 7: Product Manager Resume Keywords */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-4">
        <div className="flex items-center gap-2 text-slate-800 text-xs font-bold uppercase tracking-wider">
          <Search size={16} className="text-brand-600" />
          <span>Keyword Index</span>
        </div>
        <h2 className="text-2xl font-black text-slate-950">
          Product Manager Resume Keywords
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Incorporate these industry-standard Product Manager terms naturally into your experience bullets, summary, and skills list:
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {[
            'Product Strategy', 'Roadmapping', 'User Research', 'Product Discovery', 'A/B Testing',
            'Product Analytics', 'Agile', 'Scrum', 'Jira', 'Confluence', 'Figma', 'SQL',
            'Go-To-Market (GTM)', 'PRD Writing', 'Conversion Rate Optimization', 'Cohort Analysis',
            'Stakeholder Management', 'Sprint Planning', 'Customer Journey Mapping', 'MVP Launch'
          ].map((kw, idx) => (
            <span key={idx} className="text-xs bg-white text-slate-800 border border-slate-300 px-3 py-1.5 rounded-lg font-bold shadow-2xs">
              + {kw}
            </span>
          ))}
        </div>
      </section>

      {/* SECTION 8: Senior Product Manager Resume */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-4 shadow-xs">
        <h2 className="text-2xl font-black text-slate-950">
          Senior Product Manager Resume
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          A Senior Product Manager resume must move beyond feature delivery to demonstrate strategic leadership, portfolio ownership, and organizational influence. Senior PM candidates should emphasize:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-800">
          <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">• Multi-quarter product vision and portfolio roadmap governance.</li>
          <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">• Cross-functional leadership across multiple engineering and design squads.</li>
          <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">• Executive communication and C-suite alignment on major GTM launches.</li>
          <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">• Mentoring junior product managers and establishing product operations standards.</li>
        </ul>
      </section>

      {/* SECTION 9: Technical Product Manager Resume */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-4 shadow-xs">
        <h2 className="text-2xl font-black text-slate-950">
          Technical Product Manager Resume
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          While general Product Managers focus heavily on end-user UX and business growth, a Technical Product Manager (TPM) bridges deep system architecture with product strategy. TPM resumes should highlight:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-200">
            <h3 className="font-bold text-purple-900 mb-1">Developer APIs &amp; Platforms</h3>
            <p className="text-slate-700">Designing RESTful APIs, GraphQL endpoints, SDKs, and developer ecosystem portals.</p>
          </div>
          <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-200">
            <h3 className="font-bold text-purple-900 mb-1">Cloud Infrastructure &amp; Data</h3>
            <p className="text-slate-700">Collaborating on microservices, AWS/GCP architecture, and database scaling bottlenecks.</p>
          </div>
          <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-200">
            <h3 className="font-bold text-purple-900 mb-1">Technical Stakeholder Alignment</h3>
            <p className="text-slate-700">Translating complex technical debt into clear business trade-offs for executive leaders.</p>
          </div>
        </div>
        <p className="text-xs pt-1">
          Explore our dedicated <Link to="/resume-templates/technical-product-manager" className="text-brand-600 font-bold hover:underline">Technical Product Manager Resume Template</Link> or <Link to="/resume-examples/technical-product-manager" className="text-brand-600 font-bold hover:underline">Technical Product Manager Resume Example</Link>.
        </p>
      </section>

      {/* SECTION 10: AI Product Manager Resume */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-4 shadow-xs">
        <h2 className="text-2xl font-black text-slate-950">
          AI Product Manager Resume
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          AI Product Managers guide the development of machine learning models, Retrieval-Augmented Generation (RAG) search engines, and generative AI features into intuitive user applications. Key areas to highlight include:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-800">
          <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">• AI Product Strategy &amp; LLM application integration.</li>
          <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">• Model evaluation metrics (latency, accuracy, inference cost optimization).</li>
          <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">• Responsible AI governance, bias testing, and data privacy compliance.</li>
          <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">• Experimentation frameworks for non-deterministic model outputs.</li>
        </ul>
        <p className="text-xs pt-1">
          Explore our dedicated <Link to="/resume-examples/ai-product-manager" className="text-brand-600 font-bold hover:underline">AI Product Manager Resume</Link> resource.
        </p>
      </section>

      {/* SECTION 11: Internal Links Navigation Grid */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-md">
        <h3 className="text-lg font-extrabold text-white">Explore Resume Craft Building Tools &amp; Templates</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
          <Link to="/resume-builder" className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors text-center border border-slate-700">
            Free Resume Builder
          </Link>
          <Link to="/resume-templates/product-manager" className="p-3 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded-xl transition-colors text-center border border-slate-700">
            Product Manager Resume Template
          </Link>
          <Link to="/resume-templates/technical-product-manager" className="p-3 bg-slate-800 hover:bg-slate-700 text-purple-300 rounded-xl transition-colors text-center border border-slate-700">
            Technical Product Manager Resume
          </Link>
          <Link to="/resume-examples/ai-product-manager" className="p-3 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-xl transition-colors text-center border border-slate-700">
            AI Product Manager Resume
          </Link>
          <Link to="/ats-resume-checker" className="p-3 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-xl transition-colors text-center border border-slate-700">
            ATS Resume Checker
          </Link>
          <Link to="/resume-keyword-matcher" className="p-3 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-xl transition-colors text-center border border-slate-700">
            Keyword Matcher
          </Link>
          <Link to="/cover-letter-builder" className="p-3 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-xl transition-colors text-center border border-slate-700">
            Cover Letter Builder
          </Link>
          <Link to="/interview-questions" className="p-3 bg-slate-800 hover:bg-slate-700 text-rose-300 rounded-xl transition-colors text-center border border-slate-700">
            Interview Questions
          </Link>
        </div>
      </section>

      {/* SECTION 12: Product Manager Resume FAQ */}
      <main className="max-w-5xl mx-auto">
        <FaqAccordion items={pmFaqs} title="Product Manager Resume FAQ" />
      </main>

      {/* SECTION 13: Related Resumes */}
      <section className="space-y-4 border-t border-slate-200 pt-8">
        <h3 className="text-xl font-bold text-slate-900">Explore Related Resume Examples</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/resume-examples/technical-product-manager"
            className="p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-xs transition-all space-y-1 block"
          >
            <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">Product &amp; Tech</span>
            <h4 className="text-xs font-bold text-slate-900">Technical Product Manager Resume Example</h4>
          </Link>
          <Link
            to="/resume-examples/ai-product-manager"
            className="p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-xs transition-all space-y-1 block"
          >
            <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">AI &amp; Product</span>
            <h4 className="text-xs font-bold text-slate-900">AI Product Manager Resume Example</h4>
          </Link>
          <Link
            to="/resume-examples/project-manager"
            className="p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-xs transition-all space-y-1 block"
          >
            <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">Management</span>
            <h4 className="text-xs font-bold text-slate-900">Project Manager Resume Example</h4>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProductManagerPage;
