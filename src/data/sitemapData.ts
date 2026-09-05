export interface SeoRouteInfo {
  path: string;
  title: string;
  description: string;
  targetKeyword: string;
  canonical: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export const SITE_URL = 'https://resume.gnanamai.com';

export const SEO_ROUTES: SeoRouteInfo[] = [
  {
    path: '/',
    title: 'Free AI Resume Builder & ATS Resume Checker | Resume Craft',
    description: 'Build ATS-friendly resumes for free with AI bullet point optimization, real-time ATS scoring, Google X-Y-Z formula, and instant vector PDF downloads.',
    targetKeyword: 'free AI resume builder, ATS resume checker',
    canonical: `${SITE_URL}/`,
    priority: 1.0,
    changefreq: 'daily'
  },
  {
    path: '/free-resume-builder',
    title: 'Free Resume Builder – Create ATS-Friendly Resumes Online | Resume Craft',
    description: '100% free resume builder with ATS-compliant templates, vector PDF export, and no paywalls. Build and download your professional resume in minutes.',
    targetKeyword: 'free resume builder',
    canonical: `${SITE_URL}/free-resume-builder`,
    priority: 0.95,
    changefreq: 'weekly'
  },
  {
    path: '/ai-resume-builder',
    title: 'Free AI Resume Builder – AI Bullet Point & Summary Writer | Resume Craft',
    description: 'Craft high-impact resumes with AI-assisted bullet point rewriting, Google X-Y-Z metrics, professional summary generator, and keyword optimization.',
    targetKeyword: 'AI resume builder',
    canonical: `${SITE_URL}/ai-resume-builder`,
    priority: 0.95,
    changefreq: 'weekly'
  },
  {
    path: '/ats-resume-builder',
    title: 'Free ATS Resume Builder – 100% ATS Compliant Layouts | Resume Craft',
    description: 'Build an ATS-compliant resume engineered to pass Workday, Greenhouse, and Taleo algorithms. Free vector PDF export with zero paywalls.',
    targetKeyword: 'ATS resume builder',
    canonical: `${SITE_URL}/ats-resume-builder`,
    priority: 0.95,
    changefreq: 'weekly'
  },
  {
    path: '/resume-builder-for-software-engineers',
    title: 'Free Software Engineer Resume Builder – Technical ATS Templates | Resume Craft',
    description: 'Create an ATS-optimized software engineering resume. Highlight tech stacks, system architecture metrics, GitHub projects, and export vector PDFs for free.',
    targetKeyword: 'resume builder for software engineers',
    canonical: `${SITE_URL}/resume-builder-for-software-engineers`,
    priority: 0.95,
    changefreq: 'weekly'
  },
  {
    path: '/resume-keyword-matcher',
    title: 'Free Resume Keyword Matcher – Compare Resume Against Job Description | Resume Craft',
    description: 'Scan your resume against any job description to find missing technical skills, keyword frequency, and recruiter requirements in real-time.',
    targetKeyword: 'resume keyword matcher',
    canonical: `${SITE_URL}/resume-keyword-matcher`,
    priority: 0.95,
    changefreq: 'weekly'
  },
  {
    path: '/ats-resume-checker',
    title: 'Free ATS Resume Checker – Check Your Resume Score Online | Resume Craft',
    description: 'Instant 0-100 ATS resume score checker. Compare your resume against any job description, find missing keywords, and fix weak bullet points for free.',
    targetKeyword: 'free ATS resume checker',
    canonical: `${SITE_URL}/ats-resume-checker`,
    priority: 0.95,
    changefreq: 'weekly'
  },
  {
    path: '/resume-score-checker',
    title: 'Free Resume Score Checker – Instant ATS Analysis & Feedback | Resume Craft',
    description: 'Evaluate your resume formatting, keyword match, and bullet strength with our free real-time resume score checker. Get actionable steps to reach a 90+ score.',
    targetKeyword: 'resume score checker',
    canonical: `${SITE_URL}/resume-score-checker`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-builder-for-students',
    title: 'Free Resume Builder for Students & College Graduates | Resume Craft',
    description: 'Tailored student resume builder featuring coursework, academic projects, extracurriculars, GPA, and beginner summaries. Land internships and first jobs.',
    targetKeyword: 'resume builder for students',
    canonical: `${SITE_URL}/resume-builder-for-students`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-builder-no-experience',
    title: 'Resume Builder for No Experience – Free ATS-Friendly Templates | Resume Craft',
    description: 'Build a standout resume with no formal work experience. Highlight transferable skills, academic projects, volunteer work, and certifications for free.',
    targetKeyword: 'resume builder no experience',
    canonical: `${SITE_URL}/resume-builder-no-experience`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/find-jobs-with-resume',
    title: 'Find Jobs With Your Resume | Free AI Job Matcher',
    description: 'Create or upload your resume to discover matching jobs. Automatically match open positions based on your target role, skills, experience, education, and location.',
    targetKeyword: 'find jobs with your resume',
    canonical: `${SITE_URL}/find-jobs-with-resume`,
    priority: 0.95,
    changefreq: 'weekly'
  },
  {
    path: '/job-description-resume-matcher',
    title: 'Job Description Resume Matcher – ATS Keyword Match Tool | Resume Craft',
    description: 'Match your resume against any job description to discover missing technical skills, keyword frequency, and recruiter requirements in real-time.',
    targetKeyword: 'job description resume matcher',
    canonical: `${SITE_URL}/job-description-resume-matcher`,
    priority: 0.85,
    changefreq: 'weekly'
  },
  {
    path: '/cover-letter-generator',
    title: 'Free AI Cover Letter Generator – Tailored in Seconds | Resume Craft',
    description: 'Generate customized, role-tailored cover letters from your resume experience and target job title. Download as PDF or copy instantly.',
    targetKeyword: 'AI cover letter generator',
    canonical: `${SITE_URL}/cover-letter-generator`,
    priority: 0.85,
    changefreq: 'weekly'
  },
  {
    path: '/resume-templates',
    title: 'Free ATS-Friendly Resume Templates – Clean & Scannable Layouts | Resume Craft',
    description: 'Explore 5 ATS-compliant resume templates built with standard fonts and clean single-column layouts for Workday, Greenhouse, Taleo, and Lever.',
    targetKeyword: 'resume templates',
    canonical: `${SITE_URL}/resume-templates`,
    priority: 0.85,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples',
    title: 'Resume Examples & Professional Samples (ATS-Optimized) | Resume Craft',
    description: 'Browse ATS-tested resume examples by industry and role with real bullet points, Google X-Y-Z formulas, recommended skills, and 1-click editing.',
    targetKeyword: 'resume examples',
    canonical: `${SITE_URL}/resume-examples`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/guides',
    title: 'Career & ATS Resume Writing Guides | Resume Craft',
    description: 'Expert guides on beating ATS scanners, mastering the Google X-Y-Z formula, finding high-value keywords, and structuring modern resumes.',
    targetKeyword: 'ATS resume guides',
    canonical: `${SITE_URL}/guides`,
    priority: 0.8,
    changefreq: 'weekly'
  },
  {
    path: '/how-it-works',
    title: 'How Resume Craft Works – Vector PDFs & AI ATS Architecture | Resume Craft',
    description: 'Discover how Resume Craft generates ATS-scannable vector PDFs and utilizes AI bullet optimization to maximize interview callback rates.',
    targetKeyword: 'how resume craft works',
    canonical: `${SITE_URL}/how-it-works`,
    priority: 0.7,
    changefreq: 'monthly'
  },
  {
    path: '/about',
    title: 'About Resume Craft – Our Mission for Free Career Tools | Resume Craft',
    description: 'Learn about Resume Craft mission to provide free, accessible, and privacy-focused ATS resume building tools for job seekers worldwide.',
    targetKeyword: 'about resume craft',
    canonical: `${SITE_URL}/about`,
    priority: 0.6,
    changefreq: 'monthly'
  },
  {
    path: '/contact',
    title: 'Contact Support & Feedback | Resume Craft',
    description: 'Get in touch with the Resume Craft team for feedback, bug reports, feature suggestions, or enterprise inquiries.',
    targetKeyword: 'contact resume craft',
    canonical: `${SITE_URL}/contact`,
    priority: 0.5,
    changefreq: 'monthly'
  },
  {
    path: '/privacy',
    title: 'Privacy Policy – Data Protection & Security | Resume Craft',
    description: 'Read the Resume Craft privacy policy. Learn how your resume data is handled with local storage privacy and optional cloud synchronization.',
    targetKeyword: 'privacy policy',
    canonical: `${SITE_URL}/privacy`,
    priority: 0.4,
    changefreq: 'yearly'
  },
  {
    path: '/terms',
    title: 'Terms of Service | Resume Craft',
    description: 'Read the Terms of Service for using Resume Craft free resume builder, ATS checker, and career tools.',
    targetKeyword: 'terms of service',
    canonical: `${SITE_URL}/terms`,
    priority: 0.4,
    changefreq: 'yearly'
  }
];
