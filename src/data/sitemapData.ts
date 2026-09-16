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
    path: '/resume-builder',
    title: 'Free Online Resume Builder – Create ATS Resumes | Resume Craft',
    description: 'Build professional, ATS-friendly resumes for free with live preview, AI bullet enhancers, and vector PDF exports.',
    targetKeyword: 'resume builder',
    canonical: `${SITE_URL}/resume-builder/`,
    priority: 1.0,
    changefreq: 'daily'
  },
  {
    path: '/free-resume-builder',
    title: 'Free Resume Builder – Create ATS-Friendly Resumes Online | Resume Craft',
    description: '100% free resume builder with ATS-compliant templates, vector PDF export, and no paywalls. Build and download your professional resume in minutes.',
    targetKeyword: 'free resume builder',
    canonical: `${SITE_URL}/free-resume-builder/`,
    priority: 0.95,
    changefreq: 'weekly'
  },
  {
    path: '/cover-letter-builder',
    title: 'Free AI Cover Letter Builder – Tailored Cover Letters | Resume Craft',
    description: 'Generate customized, role-tailored cover letters from your resume experience and target job title in seconds.',
    targetKeyword: 'cover letter builder',
    canonical: `${SITE_URL}/cover-letter-builder/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/ai-resume-builder',
    title: 'Free AI Resume Builder – AI Bullet Point & Summary Writer | Resume Craft',
    description: 'Craft high-impact resumes with AI-assisted bullet point rewriting, Google X-Y-Z metrics, professional summary generator, and keyword optimization.',
    targetKeyword: 'AI resume builder',
    canonical: `${SITE_URL}/ai-resume-builder/`,
    priority: 0.95,
    changefreq: 'weekly'
  },
  {
    path: '/ats-resume-builder',
    title: 'Free ATS Resume Builder – 100% ATS Compliant Layouts | Resume Craft',
    description: 'Build an ATS-compliant resume engineered to pass Workday, Greenhouse, and Taleo algorithms. Free vector PDF export with zero paywalls.',
    targetKeyword: 'ATS resume builder',
    canonical: `${SITE_URL}/ats-resume-builder/`,
    priority: 0.95,
    changefreq: 'weekly'
  },
  {
    path: '/resume-builder-for-software-engineers',
    title: 'Free Software Engineer Resume Builder – Technical ATS Templates | Resume Craft',
    description: 'Create an ATS-optimized software engineering resume. Highlight tech stacks, system architecture metrics, GitHub projects, and export vector PDFs for free.',
    targetKeyword: 'resume builder for software engineers',
    canonical: `${SITE_URL}/resume-builder-for-software-engineers/`,
    priority: 0.95,
    changefreq: 'weekly'
  },
  {
    path: '/resume-keyword-matcher',
    title: 'Free Resume Keyword Matcher – Compare Resume Against Job Description | Resume Craft',
    description: 'Scan your resume against any job description to find missing technical skills, keyword frequency, and recruiter requirements in real-time.',
    targetKeyword: 'resume keyword matcher',
    canonical: `${SITE_URL}/resume-keyword-matcher/`,
    priority: 0.95,
    changefreq: 'weekly'
  },
  {
    path: '/ats-resume-checker',
    title: 'Free ATS Resume Checker – Check Your Resume Score Online | Resume Craft',
    description: 'Instant 0-100 ATS resume score checker. Compare your resume against any job description, find missing keywords, and fix weak bullet points for free.',
    targetKeyword: 'free ATS resume checker',
    canonical: `${SITE_URL}/ats-resume-checker/`,
    priority: 0.95,
    changefreq: 'weekly'
  },
  {
    path: '/resume-score-checker',
    title: 'Free Resume Score Checker – Instant ATS Analysis & Feedback | Resume Craft',
    description: 'Evaluate your resume formatting, keyword match, and bullet strength with our free real-time resume score checker. Get actionable steps to reach a 90+ score.',
    targetKeyword: 'resume score checker',
    canonical: `${SITE_URL}/resume-score-checker/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-builder-for-students',
    title: 'Free Resume Builder for Students & College Graduates | Resume Craft',
    description: 'Tailored student resume builder featuring coursework, academic projects, extracurriculars, GPA, and beginner summaries. Land internships and first jobs.',
    targetKeyword: 'resume builder for students',
    canonical: `${SITE_URL}/resume-builder-for-students/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-builder-no-experience',
    title: 'Resume Builder for No Experience – Free ATS-Friendly Templates | Resume Craft',
    description: 'Build a standout resume with no formal work experience. Highlight transferable skills, academic projects, volunteer work, and certifications for free.',
    targetKeyword: 'resume builder no experience',
    canonical: `${SITE_URL}/resume-builder-no-experience/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/find-jobs-with-resume',
    title: 'Find Jobs With Your Resume | Free AI Job Matcher',
    description: 'Create or upload your resume to discover matching jobs. Automatically match open positions based on your target role, skills, experience, education, and location.',
    targetKeyword: 'find jobs with your resume',
    canonical: `${SITE_URL}/find-jobs-with-resume/`,
    priority: 0.95,
    changefreq: 'weekly'
  },
  {
    path: '/find-jobs-by-resume',
    title: 'Find Jobs By Resume – Free AI Job Matcher | Resume Craft',
    description: 'Find matching jobs by uploading or creating your resume. Automatically discover open roles based on your skills, experience level, and preferred location.',
    targetKeyword: 'find jobs by resume',
    canonical: `${SITE_URL}/find-jobs-by-resume/`,
    priority: 0.95,
    changefreq: 'weekly'
  },
  {
    path: '/job-description-resume-matcher',
    title: 'Job Description Resume Matcher – ATS Keyword Match Tool | Resume Craft',
    description: 'Match your resume against any job description to discover missing technical skills, keyword frequency, and recruiter requirements in real-time.',
    targetKeyword: 'job description resume matcher',
    canonical: `${SITE_URL}/job-description-resume-matcher/`,
    priority: 0.85,
    changefreq: 'weekly'
  },
  {
    path: '/interview-questions',
    title: 'Free AI Interview Question Generator by Job Role | Resume Craft',
    description: 'Generate free AI-powered interview questions for any job role. Practice common, behavioral, technical, and role-specific questions with Resume Craft.',
    targetKeyword: 'AI interview question generator',
    canonical: `${SITE_URL}/interview-questions/`,
    priority: 0.95,
    changefreq: 'weekly'
  },
  {
    path: '/cover-letter-generator',
    title: 'Free AI Cover Letter Generator – Tailored in Seconds | Resume Craft',
    description: 'Generate customized, role-tailored cover letters from your resume experience and target job title. Download as PDF or copy instantly.',
    targetKeyword: 'AI cover letter generator',
    canonical: `${SITE_URL}/cover-letter-generator/`,
    priority: 0.85,
    changefreq: 'weekly'
  },
  {
    path: '/resume-templates',
    title: 'Free ATS-Friendly Resume Templates – Clean & Scannable Layouts | Resume Craft',
    description: 'Explore 5 ATS-compliant resume templates built with standard fonts and clean single-column layouts for Workday, Greenhouse, Taleo, and Lever.',
    targetKeyword: 'resume templates',
    canonical: `${SITE_URL}/resume-templates/`,
    priority: 0.85,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples',
    title: 'Resume Examples & Professional Samples (ATS-Optimized) | Resume Craft',
    description: 'Browse ATS-tested resume examples by industry and role with real bullet points, Google X-Y-Z formulas, recommended skills, and 1-click editing.',
    targetKeyword: 'resume examples',
    canonical: `${SITE_URL}/resume-examples/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples/senior-full-stack-engineer',
    title: 'Senior Full-Stack Engineer Resume Example & Template | Resume Craft',
    description: 'Explore a Senior Full-Stack Engineer resume example with experience, technical skills, projects, and ATS-friendly formatting. Create your own resume with Resume Craft.',
    targetKeyword: 'senior full stack engineer resume example',
    canonical: `${SITE_URL}/resume-examples/senior-full-stack-engineer/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples/product-manager',
    title: 'Product Manager Resume Example & ATS-Friendly Template | Resume Craft',
    description: 'Explore a professional Product Manager resume example and learn how to create an ATS-friendly Product Manager resume with Resume Craft. Build and download your resume for free.',
    targetKeyword: 'product manager resume',
    canonical: `${SITE_URL}/resume-examples/product-manager`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples/technical-product-manager',
    title: 'Technical Product Manager Resume Example & Template | Resume Craft',
    description: 'Explore a Technical Product Manager resume example with API strategy, system design, requirements, and ATS-friendly formatting. Create your own resume with Resume Craft.',
    targetKeyword: 'technical product manager resume example',
    canonical: `${SITE_URL}/resume-examples/technical-product-manager/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples/ai-product-manager',
    title: 'AI Product Manager Resume Example & Template | Resume Craft',
    description: 'Explore an AI Product Manager resume example with LLMs, RAG, prompt engineering, and ATS-friendly formatting. Create your own resume with Resume Craft.',
    targetKeyword: 'ai product manager resume example',
    canonical: `${SITE_URL}/resume-examples/ai-product-manager/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples/software-engineer',
    title: 'Software Engineer Resume Example & Template | Resume Craft',
    description: 'Explore a Software Engineer resume example with React, TypeScript, Node.js, microservices, and ATS-friendly formatting. Create your own resume with Resume Craft.',
    targetKeyword: 'software engineer resume example',
    canonical: `${SITE_URL}/resume-examples/software-engineer/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples/ai-engineer',
    title: 'AI Engineer Resume Example & Template | Resume Craft',
    description: 'Explore an AI Engineer resume example with PyTorch, RAG pipelines, LLMs, fine-tuning, and ATS-friendly formatting. Create your own resume with Resume Craft.',
    targetKeyword: 'ai engineer resume example',
    canonical: `${SITE_URL}/resume-examples/ai-engineer/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples/data-scientist',
    title: 'Data Scientist Resume Example & Template | Resume Craft',
    description: 'Explore a Data Scientist resume example with predictive modeling, Python, SQL, A/B testing, and ATS-friendly formatting. Create your own resume with Resume Craft.',
    targetKeyword: 'data scientist resume example',
    canonical: `${SITE_URL}/resume-examples/data-scientist/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples/data-analyst',
    title: 'Data Analyst Resume Example & Template | Resume Craft',
    description: 'Explore a Data Analyst resume example with SQL, Tableau, Power BI dashboards, KPI tracking, and ATS-friendly formatting. Create your own resume with Resume Craft.',
    targetKeyword: 'data analyst resume example',
    canonical: `${SITE_URL}/resume-examples/data-analyst/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples/devops-engineer',
    title: 'DevOps Engineer Resume Example & Template | Resume Craft',
    description: 'Explore a DevOps Engineer resume example with AWS, Terraform, Kubernetes, CI/CD pipelines, and ATS-friendly formatting. Create your own resume with Resume Craft.',
    targetKeyword: 'devops engineer resume example',
    canonical: `${SITE_URL}/resume-examples/devops-engineer/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples/cloud-architect',
    title: 'Cloud Architect Resume Example & Template | Resume Craft',
    description: 'Explore a Cloud Architect resume example with multi-cloud strategy, Kubernetes, Terraform IaC, cost optimization, and ATS-friendly formatting. Create your own resume with Resume Craft.',
    targetKeyword: 'cloud architect resume example',
    canonical: `${SITE_URL}/resume-examples/cloud-architect/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples/enterprise-architect',
    title: 'Enterprise Architect Resume Example & Template | Resume Craft',
    description: 'Explore an Enterprise Architect resume example with TOGAF 10, cloud governance, legacy modernization, and ATS-friendly formatting. Create your own resume with Resume Craft.',
    targetKeyword: 'enterprise architect resume example',
    canonical: `${SITE_URL}/resume-examples/enterprise-architect/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples/solutions-architect',
    title: 'Solutions Architect Resume Example & Template | Resume Craft',
    description: 'Explore a Solutions Architect resume example with AWS serverless, disaster recovery, microservices, and ATS-friendly formatting. Create your own resume with Resume Craft.',
    targetKeyword: 'solutions architect resume example',
    canonical: `${SITE_URL}/resume-examples/solutions-architect/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples/project-manager',
    title: 'Project Manager Resume Example & Template | Resume Craft',
    description: 'Explore a Project Manager resume example with budget governance, PMP certification, risk mitigation, and ATS-friendly formatting. Create your own resume with Resume Craft.',
    targetKeyword: 'project manager resume example',
    canonical: `${SITE_URL}/resume-examples/project-manager/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples/business-analyst',
    title: 'Business Analyst Resume Example & Template | Resume Craft',
    description: 'Explore a Business Analyst resume example with BRD documentation, user stories, gap analysis, SQL, and ATS-friendly formatting. Create your own resume with Resume Craft.',
    targetKeyword: 'business analyst resume example',
    canonical: `${SITE_URL}/resume-examples/business-analyst/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples/cybersecurity-engineer',
    title: 'Cybersecurity Engineer Resume Example & Template | Resume Craft',
    description: 'Explore a Cybersecurity Engineer resume example with Zero-Trust IAM, SOC 2 compliance, threat detection, and ATS-friendly formatting. Create your own resume with Resume Craft.',
    targetKeyword: 'cybersecurity engineer resume example',
    canonical: `${SITE_URL}/resume-examples/cybersecurity-engineer/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples/customer-service',
    title: 'Customer Service Resume Example & Template | Resume Craft',
    description: 'Explore a Customer Service resume example with CSAT score metrics, Zendesk tools, dispute resolution, and ATS-friendly formatting. Create your own resume with Resume Craft.',
    targetKeyword: 'customer service resume example',
    canonical: `${SITE_URL}/resume-examples/customer-service/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples/teacher',
    title: 'Teacher Resume Example & Template | Resume Craft',
    description: 'Explore a Teacher resume example with curriculum development, STEM integration, IEP compliance, and ATS-friendly formatting. Create your own resume with Resume Craft.',
    targetKeyword: 'teacher resume example',
    canonical: `${SITE_URL}/resume-examples/teacher/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples/nurse',
    title: 'Registered Nurse (RN) Resume Example & Template | Resume Craft',
    description: 'Explore a Registered Nurse resume example with acute patient care, Epic EHR, BLS/ACLS certifications, and ATS-friendly formatting. Create your own resume with Resume Craft.',
    targetKeyword: 'registered nurse resume example',
    canonical: `${SITE_URL}/resume-examples/nurse/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples/college-student',
    title: 'College Student Resume Example & Template | Resume Craft',
    description: 'Explore a College Student resume example featuring academic projects, GPA, club leadership, and ATS-friendly formatting. Create your own resume with Resume Craft.',
    targetKeyword: 'college student resume example',
    canonical: `${SITE_URL}/resume-examples/college-student/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples/internship',
    title: 'Internship Applicant Resume Example & Template | Resume Craft',
    description: 'Explore an Internship resume example with technical coursework, academic projects, transferable skills, and ATS-friendly formatting. Create your own resume with Resume Craft.',
    targetKeyword: 'internship resume example',
    canonical: `${SITE_URL}/resume-examples/internship/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/resume-examples/no-experience',
    title: 'No Experience Resume Example & Template | Resume Craft',
    description: 'Explore a No Experience resume example with volunteer initiatives, transferable skills, certifications, and ATS-friendly formatting. Create your own resume with Resume Craft.',
    targetKeyword: 'no experience resume example',
    canonical: `${SITE_URL}/resume-examples/no-experience/`,
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/guides',
    title: 'Career & ATS Resume Writing Guides | Resume Craft',
    description: 'Expert guides on beating ATS scanners, mastering the Google X-Y-Z formula, finding high-value keywords, and structuring modern resumes.',
    targetKeyword: 'ATS resume guides',
    canonical: `${SITE_URL}/guides/`,
    priority: 0.8,
    changefreq: 'weekly'
  },
  {
    path: '/how-it-works',
    title: 'How Resume Craft Works – Vector PDFs & AI ATS Architecture | Resume Craft',
    description: 'Discover how Resume Craft generates ATS-scannable vector PDFs and utilizes AI bullet optimization to maximize interview callback rates.',
    targetKeyword: 'how resume craft works',
    canonical: `${SITE_URL}/how-it-works/`,
    priority: 0.7,
    changefreq: 'monthly'
  },
  {
    path: '/about',
    title: 'About Resume Craft – Our Mission for Free Career Tools | Resume Craft',
    description: 'Learn about Resume Craft mission to provide free, accessible, and privacy-focused ATS resume building tools for job seekers worldwide.',
    targetKeyword: 'about resume craft',
    canonical: `${SITE_URL}/about/`,
    priority: 0.6,
    changefreq: 'monthly'
  },
  {
    path: '/contact',
    title: 'Contact Support & Feedback | Resume Craft',
    description: 'Get in touch with the Resume Craft team for feedback, bug reports, feature suggestions, or enterprise inquiries.',
    targetKeyword: 'contact resume craft',
    canonical: `${SITE_URL}/contact/`,
    priority: 0.5,
    changefreq: 'monthly'
  },
  {
    path: '/privacy',
    title: 'Privacy Policy – Data Protection & Security | Resume Craft',
    description: 'Read the Resume Craft privacy policy. Learn how your resume data is handled with local storage privacy and optional cloud synchronization.',
    targetKeyword: 'privacy policy',
    canonical: `${SITE_URL}/privacy/`,
    priority: 0.4,
    changefreq: 'yearly'
  },
  {
    path: '/terms',
    title: 'Terms of Service | Resume Craft',
    description: 'Read the Terms of Service for using Resume Craft free resume builder, ATS checker, and career tools.',
    targetKeyword: 'terms of service',
    canonical: `${SITE_URL}/terms/`,
    priority: 0.4,
    changefreq: 'yearly'
  }
];
