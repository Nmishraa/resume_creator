import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_SEO_MAP = {
  '/': {
    title: 'ResumeCraft - Free AI Resume Builder & Online CV Maker',
    description: 'Create ATS-friendly professional resumes online in minutes with ResumeCraft. Free AI resume builder with modern templates and instant PDF download.',
    keywords: 'resume builder, free resume maker, ATS resume templates, AI resume creator, PDF resume export',
    canonical: 'https://smartresumecraft.netlify.app/'
  },
  '/dashboard': {
    title: 'My Resumes & Dashboard | ResumeCraft',
    description: 'Manage your saved resumes, draft new CVs, and track your job application progress.',
    keywords: 'resume dashboard, saved resumes, CV manager',
    canonical: 'https://smartresumecraft.netlify.app/dashboard'
  },
  '/ats-resume-checker': {
    title: 'Free ATS Resume Checker & Compatibility Test | ResumeCraft',
    description: 'Test your resume against ATS algorithms for free. Get immediate score breakdown, missing keyword alerts, and bullet point recommendations.',
    keywords: 'ATS resume checker, free resume score, ATS resume scanner, resume compatibility test',
    canonical: 'https://smartresumecraft.netlify.app/ats-resume-checker'
  },
  '/resume-templates': {
    title: 'Free ATS Resume Templates (PDF Export) | ResumeCraft',
    description: 'Browse 100% free ATS-optimized resume templates. Tested against Workday, Greenhouse, and Lever.',
    keywords: 'free resume templates, ATS CV templates, modern resume layout, professional CV format',
    canonical: 'https://smartresumecraft.netlify.app/resume-templates'
  },
  '/how-to-write-a-resume': {
    title: 'How to Write a Resume in 2026: Step-by-Step Guide | ResumeCraft',
    description: 'Complete guide on writing a high-scoring resume in 2026. Master action verbs, quantifiable metrics, and ATS keywords.',
    keywords: 'how to write a resume, resume guide 2026, resume bullet points, CV writing tips',
    canonical: 'https://smartresumecraft.netlify.app/how-to-write-a-resume'
  },
  '/resume-summary-examples': {
    title: '50+ Resume Summary Examples for Every Career Level | ResumeCraft',
    description: 'Copy and customize professional resume summary examples for software engineers, product managers, marketing, and students.',
    keywords: 'resume summary examples, professional summary, profile statement, CV summary',
    canonical: 'https://smartresumecraft.netlify.app/resume-summary-examples'
  },
  '/ai-engineer-resume-example': {
    title: 'AI & Machine Learning Engineer Resume Example | ResumeCraft',
    description: 'Proven AI Engineer resume sample with high ATS score. Technical skills, PyTorch/TensorFlow metrics, and project structure.',
    keywords: 'AI engineer resume, machine learning resume example, LLM engineer CV',
    canonical: 'https://smartresumecraft.netlify.app/ai-engineer-resume-example'
  },
  '/student-resume-example': {
    title: 'Student & Entry-Level Resume Example with No Experience | ResumeCraft',
    description: 'Step-by-step entry-level resume template for college students and recent graduates.',
    keywords: 'student resume, entry level resume, college graduate CV, no experience resume',
    canonical: 'https://smartresumecraft.netlify.app/student-resume-example'
  },
  '/examples': {
    title: 'Professional Resume Examples Library | ResumeCraft',
    description: 'Explore sample resumes across engineering, management, design, and finance roles.',
    keywords: 'resume examples, CV samples, industry resume templates',
    canonical: 'https://smartresumecraft.netlify.app/examples'
  },
  '/ats-tips': {
    title: 'Top 10 ATS Optimization Secrets for Job Seekers | ResumeCraft',
    description: 'Learn how Applicant Tracking Systems parse resume text and how to pass resume screeners.',
    keywords: 'ATS tips, beat ATS systems, resume formatting rules, applicant tracking systems',
    canonical: 'https://smartresumecraft.netlify.app/ats-tips'
  },
  '/cover-letters': {
    title: 'Free Interactive Cover Letter Generator & Templates | ResumeCraft',
    description: 'Generate customized, recruiter-approved cover letters in seconds. Choose from 4 proven formulas and download instant TXT/PDF.',
    keywords: 'cover letter generator, cover letter builder, free cover letter templates, job application letter',
    canonical: 'https://smartresumecraft.netlify.app/cover-letters'
  },
  '/applications': {
    title: 'Job Application Tracker & Career Kanban Board | ResumeCraft',
    description: 'Track job applications, interview stages, follow-up dates, and salary notes in one intuitive dashboard.',
    keywords: 'job tracker, application tracker, job search kanban, career pipeline manager',
    canonical: 'https://smartresumecraft.netlify.app/applications'
  }
};

export default function SeoHead() {
  const location = useLocation();

  useEffect(() => {
    const seoData = ROUTE_SEO_MAP[location.pathname] || ROUTE_SEO_MAP['/'];

    // Update document title
    document.title = seoData.title;

    // Helper to set meta tag
    const updateMetaTag = (selector, contentAttr, value) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const [attr, attrVal] = selector.replace('meta[', '').replace(']', '').split('=');
        element.setAttribute(attr, attrVal.replace(/"/g, ''));
        document.head.appendChild(element);
      }
      element.setAttribute(contentAttr, value);
    };

    updateMetaTag('meta[name="description"]', 'content', seoData.description);
    updateMetaTag('meta[name="keywords"]', 'content', seoData.keywords);
    updateMetaTag('meta[property="og:title"]', 'content', seoData.title);
    updateMetaTag('meta[property="og:description"]', 'content', seoData.description);
    updateMetaTag('meta[property="og:url"]', 'content', seoData.canonical);
    updateMetaTag('meta[name="twitter:title"]', 'content', seoData.title);
    updateMetaTag('meta[name="twitter:description"]', 'content', seoData.description);

    // Update canonical link tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', seoData.canonical);

    // Dynamic JSON-LD structured data for Google & Bing
    let scriptTag = document.getElementById('route-jsonld-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'route-jsonld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": seoData.title,
      "description": seoData.description,
      "url": seoData.canonical,
      "publisher": {
        "@type": "Organization",
        "name": "ResumeCraft",
        "url": "https://smartresumecraft.netlify.app/",
        "logo": "https://smartresumecraft.netlify.app/favicon.svg"
      }
    };

    scriptTag.text = JSON.stringify(structuredData);

    // Scroll to top on page navigation
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}
