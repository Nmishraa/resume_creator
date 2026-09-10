import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');

if (!fs.existsSync(INDEX_HTML_PATH)) {
  console.error('dist/index.html does not exist. Run vite build first.');
  process.exit(1);
}

const baseTemplate = fs.readFileSync(INDEX_HTML_PATH, 'utf8');

const SITE_URL = 'https://resume.gnanamai.com';

const PAGES = [
  {
    path: '/',
    title: 'Free AI Resume Builder & ATS Resume Checker | Resume Craft',
    description: 'Build ATS-friendly resumes for free with AI bullet point optimization, real-time ATS scoring, Google X-Y-Z formula, and instant vector PDF downloads.',
    h1: 'Free AI Resume Builder & ATS Resume Checker',
    intro: 'Resume Craft empowers job seekers to build ATS-friendly resumes and CVs for free with AI-powered bullet points, Google X-Y-Z formulas, professional templates, and instant vector PDF downloads.'
  },
  {
    path: '/resume-builder',
    title: 'Free Online Resume Builder – Create ATS Resumes | Resume Craft',
    description: 'Build professional, ATS-friendly resumes for free with live preview, AI bullet enhancers, and vector PDF exports.',
    h1: 'Free Online Resume Builder',
    intro: 'Build professional, ATS-friendly resumes for free with live preview, AI bullet enhancers, and vector PDF exports.'
  },
  {
    path: '/cover-letter-builder',
    title: 'Free AI Cover Letter Builder – Tailored Cover Letters | Resume Craft',
    description: 'Generate customized, role-tailored cover letters from your resume experience and target job title in seconds.',
    h1: 'Free AI Cover Letter Builder',
    intro: 'Generate customized, role-tailored cover letters from your resume experience and target job title in seconds.'
  },
  {
    path: '/free-resume-builder',
    title: 'Free Resume Builder – Create ATS-Friendly Resumes Online | Resume Craft',
    description: '100% free resume builder with ATS-compliant templates, vector PDF export, and no paywalls. Build and download your professional resume in minutes.',
    h1: 'Free Resume Builder – Create ATS-Friendly Resumes Online',
    intro: 'Create, edit, and download professional vector PDF resumes designed to pass automated hiring filters like Workday and Greenhouse. Powered by real-time ATS scoring and AI bullet optimization.'
  },
  {
    path: '/ai-resume-builder',
    title: 'Free AI Resume Builder – AI Bullet Point & Summary Writer | Resume Craft',
    description: 'Craft high-impact resumes with AI-assisted bullet point rewriting, Google X-Y-Z metrics, professional summary generator, and keyword optimization.',
    h1: 'Free AI Resume Builder – Smart Bullet & Summary Writer',
    intro: 'Supercharge your resume achievements with AI-powered bullet point rewriting, Google X-Y-Z formula metrics, role-tailored summaries, and ATS keyword matching.'
  },
  {
    path: '/ats-resume-checker',
    title: 'Free ATS Resume Checker – Check Your Resume Score Online | Resume Craft',
    description: 'Instant 0-100 ATS resume score checker. Compare your resume against any job description, find missing keywords, and fix weak bullet points for free.',
    h1: 'Free ATS Resume Checker',
    intro: 'Scan your resume against any job description to calculate your 0–100 ATS compatibility score, detect missing keywords, and optimize achievements with Google X-Y-Z metrics.'
  },
  {
    path: '/resume-score-checker',
    title: 'Free Resume Score Checker – Instant ATS Analysis & Feedback | Resume Craft',
    description: 'Evaluate your resume formatting, keyword match, and bullet strength with our free real-time resume score checker. Get actionable steps to reach a 90+ score.',
    h1: 'Free Resume Score Checker',
    intro: 'Evaluate your resume formatting, keyword match, and bullet strength with our free real-time resume score checker. Get actionable steps to reach a 90+ score.'
  },
  {
    path: '/resume-builder-for-students',
    title: 'Free Resume Builder for Students & College Graduates | Resume Craft',
    description: 'Tailored student resume builder featuring coursework, academic projects, extracurriculars, GPA, and beginner summaries. Land internships and first jobs.',
    h1: 'Free Resume Builder for Students & College Graduates',
    intro: 'Transform your coursework, academic capstones, club leadership, and university projects into an ATS-tested resume that catches the attention of recruiters and hiring managers.'
  },
  {
    path: '/resume-builder-no-experience',
    title: 'Resume Builder for No Experience – Free ATS-Friendly Templates | Resume Craft',
    description: 'Build a standout resume with no formal work experience. Highlight transferable skills, academic projects, volunteer work, and certifications for free.',
    h1: 'Resume Builder for No Experience – Free ATS-Friendly Templates',
    intro: 'You have more experience than you think. Learn how to transform volunteer hours, school activities, personal projects, and transferable skills into an employer-ready resume.'
  },
  {
    path: '/find-jobs-with-resume',
    title: 'Find Jobs With Your Resume | Free AI Job Matcher',
    description: 'Create or upload your resume to discover matching jobs. Automatically match open positions based on your target role, skills, experience, education, and location.',
    h1: 'Find Jobs With Your Resume',
    intro: 'Create or upload your resume to discover matching jobs. Automatically match open positions based on your target role, skills, experience, education, and location.'
  },
  {
    path: '/find-jobs-by-resume',
    title: 'Find Jobs By Resume – Free AI Job Matcher | Resume Craft',
    description: 'Find matching jobs by uploading or creating your resume. Automatically discover open roles based on your skills, experience level, and preferred location.',
    h1: 'Find Jobs By Resume',
    intro: 'Find matching jobs by uploading or creating your resume. Automatically discover open roles based on your skills, experience level, and preferred location.'
  },
  {
    path: '/job-description-resume-matcher',
    title: 'Job Description Resume Matcher – ATS Keyword Match Tool | Resume Craft',
    description: 'Match your resume against any job description to discover missing technical skills, keyword frequency, and recruiter requirements in real-time.',
    h1: 'Job Description Resume Matcher & ATS Keyword Scanner',
    intro: 'Match your resume against any job description to discover missing technical skills, keyword frequency, and recruiter requirements in real-time.'
  },
  {
    path: '/interview-questions',
    title: 'Free AI Interview Question Generator by Job Role | Resume Craft',
    description: 'Generate free AI-powered interview questions for any job role. Practice common, behavioral, technical, and role-specific questions with Resume Craft.',
    h1: 'AI Interview Question Generator',
    intro: 'Generate free AI-powered interview questions for any job role. Practice common, behavioral, technical, and role-specific questions with Resume Craft.'
  },
  {
    path: '/cover-letter-generator',
    title: 'Free AI Cover Letter Generator – Tailored in Seconds | Resume Craft',
    description: 'Generate customized, role-tailored cover letters from your resume experience and target job title. Download as PDF or copy instantly.',
    h1: 'Free AI Cover Letter Generator',
    intro: 'Generate customized, role-tailored cover letters from your resume experience and target job title. Download as PDF or copy instantly.'
  },
  {
    path: '/resume-templates',
    title: 'Free ATS-Friendly Resume Templates – Clean & Scannable Layouts | Resume Craft',
    description: 'Explore 5 ATS-compliant resume templates built with standard fonts and clean single-column layouts for Workday, Greenhouse, Taleo, and Lever.',
    h1: 'Free ATS-Friendly Resume Templates',
    intro: 'Every template is designed with standard fonts, single-column parsing flow, and clean vector typography to maximize parsing compatibility through Taleo, Workday, and Greenhouse.'
  },
  {
    path: '/resume-examples',
    title: 'Resume Examples & Professional Samples (ATS-Optimized) | Resume Craft',
    description: 'Browse ATS-tested resume examples by industry and role with real bullet points, Google X-Y-Z formulas, recommended skills, and 1-click editing.',
    h1: 'Professional Resume Examples & ATS Samples',
    intro: 'Explore recruiter-aligned resume samples packed with real achievement bullets, Google X-Y-Z formulas, top technical skills, and 1-click builder templates.'
  },
  // Competitor Comparison Pages
  {
    path: '/vs/zety-alternative',
    title: 'Free Zety Alternative (No Watermark & Free PDF Download) | Resume Craft',
    description: 'Looking for a free alternative to Zety? Build, ATS-check, and download vector PDF resumes 100% free on Resume Craft with no watermarks or credit card required.',
    h1: 'Free Zety Alternative (No Watermark & Free Vector PDF)',
    intro: 'Resume Craft is 100% free forever. Build ATS-friendly resumes, enhance bullet points with AI, and download vector PDFs with zero watermarks or credit card requirements.'
  },
  {
    path: '/vs/resume-io-alternative',
    title: 'Free Resume.io Alternative (No Watermark & Free Vector PDF) | Resume Craft',
    description: 'Switch from Resume.io to Resume Craft. Build ATS-optimized resumes, enhance bullet points with AI, and download high-resolution vector PDFs 100% free with no watermark.',
    h1: 'Free Resume.io Alternative (No Watermark & Free Vector PDF)',
    intro: 'Switch from Resume.io to Resume Craft. Export high-resolution vector PDFs for free without plain text restrictions or monthly subscription fees.'
  },
  {
    path: '/resume-preview',
    title: 'Full-Page Resume Preview | Resume Craft',
    description: 'Full-page ATS resume preview with high-resolution layout rendering.',
    h1: 'Resume Preview',
    intro: 'Preview high-resolution ATS-optimized resume layouts.'
  },

  // 23 Role Template Pages
  {
    path: '/resume-templates/product-manager',
    title: 'Product Manager Resume Template — Free ATS Resume | Resume Craft',
    description: 'Create a professional Product Manager resume with Resume Craft. Use an ATS-friendly template, customize your experience and skills, and download your resume as PDF or Word.',
    h1: 'Product Manager Resume Template',
    intro: 'Craft a high-impact Product Manager resume designed to pass ATS screening and impress VP of Product recruiters. Highlight product vision, roadmapping, user research, and metric-backed growth.'
  },
  {
    path: '/resume-templates/technical-product-manager',
    title: 'Technical Product Manager Resume Template — Free ATS Resume | Resume Craft',
    description: 'Create a professional Technical Product Manager resume with Resume Craft. Use an ATS-friendly template, customize your technical skills and system architecture, and download as PDF or Word.',
    h1: 'Technical Product Manager Resume Template',
    intro: 'Highlight your bridge between engineering architecture and product vision. Feature API strategy, system design, technical roadmaps, and developer ecosystem growth.'
  },
  {
    path: '/resume-templates/ai-product-manager',
    title: 'AI Product Manager Resume Template — Free ATS Resume | Resume Craft',
    description: 'Create an ATS-friendly AI Product Manager resume. Showcase LLM applications, RAG pipelines, model evaluation metrics, and responsible AI governance.',
    h1: 'AI Product Manager Resume Template',
    intro: 'Build a recruiter-vetted resume tailored for GenAI and machine learning product management. Highlight prompt engineering, model benchmarks, product analytics, and AI ethics.'
  },
  {
    path: '/resume-templates/enterprise-architect',
    title: 'Enterprise Architect Resume Template — Free ATS Resume | Resume Craft',
    description: 'Download a free ATS Enterprise Architect resume template. Showcase TOGAF 10 governance, cloud strategy, digital transformation, and multimillion-dollar IT roadmaps.',
    h1: 'Enterprise Architect Resume Template',
    intro: 'Demonstrate top-tier IT leadership, TOGAF framework governance, digital transformation roadmaps, and enterprise software architecture across global business units.'
  },
  {
    path: '/resume-templates/cloud-architect',
    title: 'Cloud Architect Resume Template — Free ATS Resume | Resume Craft',
    description: 'Create a Cloud Architect resume with Resume Craft. Feature AWS, Azure, GCP, Kubernetes, Terraform IaC, multi-region failover, and cloud cost optimization.',
    h1: 'Cloud Architect Resume Template',
    intro: 'Highlight multi-cloud infrastructure design, Kubernetes orchestration, Terraform IaC automation, FinOps cost savings, and zero-downtime disaster recovery.'
  },
  {
    path: '/resume-templates/software-engineer',
    title: 'Software Engineer Resume Template — Free ATS Resume | Resume Craft',
    description: 'Create a professional Software Engineer resume. Highlight Full-Stack skills, React, TypeScript, Node.js, Python, system performance, and unit testing.',
    h1: 'Software Engineer Resume Template',
    intro: 'Build a recruiter-approved Software Engineer resume. Showcase full-stack web applications, microservices performance, system optimization, and clean code principles.'
  },
  {
    path: '/resume-templates/senior-software-engineer',
    title: 'Senior Software Engineer Resume Template — Free ATS Resume | Resume Craft',
    description: 'Create a Senior Software Engineer resume. Showcase technical leadership, distributed system design, code reviews, and high-throughput backend scaling.',
    h1: 'Senior Software Engineer Resume Template',
    intro: 'Highlight staff engineering leadership, system architecture, mentoring, multi-region cloud scaling, and measurable business impact.'
  },
  {
    path: '/resume-templates/data-scientist',
    title: 'Data Scientist Resume Template — Free ATS Resume | Resume Craft',
    description: 'Download a free ATS Data Scientist resume template. Feature Machine Learning, Python, PyTorch, XGBoost, A/B testing, and predictive modeling.',
    h1: 'Data Scientist Resume Template',
    intro: 'Highlight predictive modeling, A/B testing, statistical inference, machine learning pipelines, Python/SQL proficiency, and revenue impact.'
  },
  {
    path: '/resume-templates/data-analyst',
    title: 'Data Analyst Resume Template — Free ATS Resume | Resume Craft',
    description: 'Create an ATS-friendly Data Analyst resume. Highlight SQL query optimization, Tableau, Power BI dashboards, KPI tracking, and Excel modeling.',
    h1: 'Data Analyst Resume Template',
    intro: 'Build a standout Data Analyst resume emphasizing complex SQL queries, interactive BI dashboards, revenue trend analysis, and data hygiene.'
  },
  {
    path: '/resume-templates/machine-learning-engineer',
    title: 'Machine Learning Engineer Resume Template — Free ATS Resume | Resume Craft',
    description: 'Create a Machine Learning Engineer resume with Resume Craft. Feature PyTorch, TensorFlow, MLOps, Model Deployment, Docker, and SageMaker.',
    h1: 'Machine Learning Engineer Resume Template',
    intro: 'Highlight MLOps pipelines, production model deployment, PyTorch/TensorFlow deep learning, model quantization, and low-latency GPU inference.'
  },
  {
    path: '/resume-templates/ai-engineer',
    title: 'AI Engineer Resume Template — Free ATS Resume | Resume Craft',
    description: 'Download a free ATS AI Engineer resume template. Showcase Python, LLMs, RAG, LangChain, Vector Databases, APIs, Prompt Engineering, and Model Deployment.',
    h1: 'AI Engineer Resume Template',
    intro: 'Highlight LLM integration, LangChain agents, RAG document search, Pinecone vector databases, prompt engineering, and GenAI production deployment.'
  },
  {
    path: '/resume-templates/devops-engineer',
    title: 'DevOps Engineer Resume Template — Free ATS Resume | Resume Craft',
    description: 'Create a DevOps Engineer resume with Resume Craft. Feature CI/CD pipelines, Kubernetes, Docker, Terraform, AWS, Ansible, and Prometheus monitoring.',
    h1: 'DevOps Engineer Resume Template',
    intro: 'Demonstrate automated CI/CD deployment pipelines, Infrastructure as Code with Terraform, Kubernetes cluster administration, and high-availability cloud monitoring.'
  },
  {
    path: '/resume-templates/cloud-engineer',
    title: 'Cloud Engineer Resume Template — Free ATS Resume | Resume Craft',
    description: 'Create a professional Cloud Engineer resume. Feature AWS, Azure, Terraform, Linux administration, VPC networking, and cloud migration.',
    h1: 'Cloud Engineer Resume Template',
    intro: 'Highlight cloud infrastructure provisioning, AWS/Azure server management, VPC networking, IAM security policies, and automated Terraform scripts.'
  },
  {
    path: '/resume-templates/frontend-developer',
    title: 'Frontend Developer Resume Template — Free ATS Resume | Resume Craft',
    description: 'Create a Frontend Developer resume with Resume Craft. Feature React, Next.js, TypeScript, Tailwind CSS, Web Vitals optimization, and responsive UI design.',
    h1: 'Frontend Developer Resume Template',
    intro: 'Showcase responsive React & Next.js user interfaces, TypeScript type safety, Core Web Vitals performance tuning, and accessible web standards.'
  },
  {
    path: '/resume-templates/backend-developer',
    title: 'Backend Developer Resume Template — Free ATS Resume | Resume Craft',
    description: 'Create a Backend Developer resume with Resume Craft. Highlight Node.js, Python, Go, PostgreSQL, Redis, Microservices, and REST/GraphQL APIs.',
    h1: 'Backend Developer Resume Template',
    intro: 'Demonstrate microservices architecture, REST/GraphQL API design, SQL database indexing, Redis caching, and p99 latency optimization.'
  },
  {
    path: '/resume-templates/full-stack-developer',
    title: 'Full-Stack Developer Resume Template — Free ATS Resume | Resume Craft',
    description: 'Create an ATS Full-Stack Developer resume. Feature React, Next.js, Node.js, TypeScript, PostgreSQL, AWS, and end-to-end web architecture.',
    h1: 'Full-Stack Developer Resume Template',
    intro: 'Highlight end-to-end web engineering, React/Next.js frontends, Node.js/Python backends, SQL databases, and seamless cloud deployments.'
  },
  {
    path: '/resume-templates/project-manager',
    title: 'Project Manager Resume Template — Free ATS Resume | Resume Craft',
    description: 'Create a professional Project Manager resume. Highlight PMP certification, Agile, Scrum, budget management, risk mitigation, and Jira delivery.',
    h1: 'Project Manager Resume Template',
    intro: 'Showcase PMP certifications, Agile/Scrum delivery, multimillion-dollar project budgets, cross-functional risk mitigation, and on-time project completion.'
  },
  {
    path: '/resume-templates/business-analyst',
    title: 'Business Analyst Resume Template — Free ATS Resume | Resume Craft',
    description: 'Create an ATS Business Analyst resume. Highlight requirements gathering, Agile user stories, process mapping, SQL, and stakeholder alignment.',
    h1: 'Business Analyst Resume Template',
    intro: 'Highlight business requirements gathering, BRD/FRD authoring, process mapping (BPMN), SQL data analysis, and bridging business needs with technical solutions.'
  },
  {
    path: '/resume-templates/marketing-manager',
    title: 'Marketing Manager Resume Template — Free ATS Resume | Resume Craft',
    description: 'Create a professional Marketing Manager resume. Highlight digital marketing, SEO/SEM, customer acquisition, ROI metrics, and campaign management.',
    h1: 'Marketing Manager Resume Template',
    intro: 'Highlight multi-channel campaign management, SEO/SEM growth, customer acquisition cost (CAC) reduction, content strategy, and return on ad spend (ROAS).'
  },
  {
    path: '/resume-templates/financial-analyst',
    title: 'Financial Analyst Resume Template — Free ATS Resume | Resume Craft',
    description: 'Create a Financial Analyst resume with Resume Craft. Showcase financial modeling, forecasting, variance analysis, Excel DCF models, and SQL.',
    h1: 'Financial Analyst Resume Template',
    intro: 'Highlight financial modeling (DCF, LBO), budget forecasting, variance analysis, SQL data extraction, and executive presentation of financial reports.'
  },
  {
    path: '/resume-templates/human-resources-manager',
    title: 'Human Resources Manager Resume Template — Free ATS Resume | Resume Craft',
    description: 'Create a professional Human Resources Manager resume. Highlight talent acquisition, employee relations, HRIS (Workday), compensation, and compliance.',
    h1: 'Human Resources Manager Resume Template',
    intro: 'Showcase talent acquisition scaling, HRIS software management (Workday, BambooHR), employee retention programs, labor law compliance, and culture building.'
  },
  {
    path: '/resume-templates/ux-designer',
    title: 'UX Designer Resume Template — Free ATS Resume | Resume Craft',
    description: 'Create a professional UX Designer resume. Feature user research, wireframing, Figma, usability testing, design systems, and prototyping.',
    h1: 'UX Designer Resume Template',
    intro: 'Highlight user research methodologies, Figma wireframing, interactive prototyping, usability testing, and accessible design systems.'
  },
  {
    path: '/resume-templates/ui-ux-designer',
    title: 'UI/UX Designer Resume Template — Free ATS Resume | Resume Craft',
    description: 'Create a UI/UX Designer resume with Resume Craft. Feature Figma, UI visual design, user research, design tokens, micro-interactions, and mobile responsiveness.',
    h1: 'UI/UX Designer Resume Template',
    intro: 'Combine aesthetic visual UI design with deep UX research, Figma design token libraries, responsive layouts, and interactive micro-animations.'
  },

  // 12 Resume Examples
  {
    path: '/resume-examples/ai-engineer',
    title: 'AI Engineer Resume Example & ATS Keywords (2026 Guide) | Resume Craft',
    description: 'Complete AI Engineer resume example with ATS-friendly bullet points, Google X-Y-Z formulas, LLM/PyTorch skills, and 1-click builder template.',
    h1: 'AI Engineer Resume Example & ATS Optimization Guide',
    intro: 'A high-impact, ATS-optimized AI Engineer resume sample demonstrating expertise in LLM fine-tuning, RAG pipelines, PyTorch/TensorFlow, and production machine learning microservices.',
    ogType: 'article'
  },
  {
    path: '/resume-examples/software-engineer',
    title: 'Software Engineer Resume Example & ATS Template (2026) | Resume Craft',
    description: 'ATS-tested Software Engineer resume example with high-impact bullets, React/Node/AWS skill lists, Google X-Y-Z formula, and free vector PDF export.',
    h1: 'Software Engineer Resume Example & ATS Guide',
    intro: 'A proven Software Engineer resume sample highlighting full-stack engineering, cloud microservices, API performance, and automated testing.',
    ogType: 'article'
  },
  {
    path: '/resume-examples/data-scientist',
    title: 'Data Scientist Resume Example & ATS Guide | Resume Craft',
    description: 'ATS-compliant Data Scientist resume example featuring machine learning, predictive modeling, statistical analysis, and Python/SQL skills.',
    h1: 'Data Scientist Resume Example & ATS Keywords',
    intro: 'Showcase predictive modeling, A/B testing, statistical inference, and machine learning pipelines with this recruiter-vetted Data Scientist resume sample.',
    ogType: 'article'
  },
  {
    path: '/resume-examples/data-analyst',
    title: 'Data Analyst Resume Example & ATS Skills Guide | Resume Craft',
    description: 'Professional Data Analyst resume sample featuring SQL query optimization, Power BI / Tableau dashboards, KPI tracking, and free PDF export.',
    h1: 'Data Analyst Resume Example & ATS Keywords',
    intro: 'Craft an ATS-optimized Data Analyst resume with targeted SQL, Tableau/Power BI, Excel, and business reporting metrics.',
    ogType: 'article'
  },
  {
    path: '/resume-examples/business-analyst',
    title: 'Business Analyst Resume Example & ATS Guide | Resume Craft',
    description: 'ATS-friendly Business Analyst resume example with requirements gathering, Agile/Scrum, process mapping, and stakeholder management highlights.',
    h1: 'Business Analyst Resume Example & ATS Guide',
    intro: 'Demonstrate your ability to bridge business requirements, Agile workflows, data analysis, and process optimization with this ATS-tested resume.',
    ogType: 'article'
  },
  {
    path: '/resume-examples/enterprise-architect',
    title: 'Enterprise Architect Resume Example & TOGAF Keywords (2026) | Resume Craft',
    description: 'Complete Enterprise Architect resume example with TOGAF framework, cloud migration metrics, system governance, and 1-click builder template.',
    h1: 'Enterprise Architect Resume Example & ATS Guide',
    intro: 'A recruiter-vetted Enterprise Architect resume sample highlighting IT governance, TOGAF 10, cloud strategy, and multimillion-dollar system modernizations.',
    ogType: 'article'
  },
  {
    path: '/resume-examples/cloud-architect',
    title: 'Cloud Architect Resume Example & AWS/GCP Keywords | Resume Craft',
    description: 'ATS-optimized Cloud Architect resume example featuring Kubernetes, Terraform IaC, multi-cloud strategy, cost optimization, and free vector PDF export.',
    h1: 'Cloud Architect Resume Example & ATS Guide',
    intro: 'A high-impact Cloud Architect resume sample demonstrating AWS/GCP infrastructure, Kubernetes orchestration, Terraform, and FinOps cost savings.',
    ogType: 'article'
  },
  {
    path: '/resume-examples/product-manager',
    title: 'Product Manager Resume Example & ATS Guide (2026) | Resume Craft',
    description: 'Complete Product Manager resume example with ATS-friendly bullet points, metrics, product roadmap achievements, and 1-click builder template.',
    h1: 'Product Manager Resume Example & ATS Optimization Guide',
    intro: 'A recruiter-vetted Product Manager resume sample highlighting product strategy, cross-functional engineering leadership, user metrics, and sprint execution.',
    ogType: 'article'
  },
  {
    path: '/resume-examples/project-manager',
    title: 'Project Manager Resume Example & PMP Keywords | Resume Craft',
    description: 'ATS-optimized Project Manager resume example with budget management, Agile delivery, risk mitigation, and PMP certification highlights.',
    h1: 'Project Manager Resume Example & ATS Guide',
    intro: 'Highlight your project delivery track record, cross-functional leadership, budget governance, and risk mitigation with this ATS-friendly resume.',
    ogType: 'article'
  },
  {
    path: '/resume-examples/customer-service',
    title: 'Customer Service Resume Example & ATS Skills | Resume Craft',
    description: 'ATS-friendly Customer Service resume sample with CSAT score metrics, Zendesk/Salesforce tools, dispute resolution, and 1-click builder export.',
    h1: 'Customer Service Resume Example & ATS Keywords',
    intro: 'Showcase communication skills, issue resolution speed, CSAT scores, and CRM ticketing proficiency with this optimized resume.',
    ogType: 'article'
  },
  {
    path: '/resume-examples/teacher',
    title: 'Teacher Resume Example & ATS Education Keywords | Resume Craft',
    description: 'ATS-optimized Teacher resume sample with curriculum design, differentiated instruction, student engagement, and state certifications.',
    h1: 'Teacher Resume Example & ATS Education Guide',
    intro: 'Highlight lesson planning, classroom management, standardized testing improvements, and differentiated learning with this ATS-compliant teacher resume.',
    ogType: 'article'
  },
  {
    path: '/resume-examples/nurse',
    title: 'Registered Nurse (RN) Resume Example & ATS Guide | Resume Craft',
    description: 'ATS-tested Registered Nurse resume example with patient assessment, medication administration, BLS/ACLS certifications, and EHR systems.',
    h1: 'Registered Nurse (RN) Resume Example & ATS Guide',
    intro: 'Highlight clinical competencies, acute patient care, medication administration, and patient advocacy with this ATS-friendly RN resume.',
    ogType: 'article'
  },
  {
    path: '/resume-examples/college-student',
    title: 'College Student Resume Example & Free ATS Builder | Resume Craft',
    description: 'ATS-friendly College Student resume sample highlighting relevant coursework, university projects, internships, leadership, and high GPA.',
    h1: 'College Student Resume Example & ATS Guide',
    intro: 'Build a strong college student resume that turns coursework, academic projects, club leadership, and part-time jobs into compelling employer value.',
    ogType: 'article'
  },
  {
    path: '/resume-examples/internship',
    title: 'Internship Resume Example & ATS Tips (2026) | Resume Craft',
    description: 'Standout Internship resume example for university students and career switchers. Learn how to highlight projects, coursework, and transferable skills.',
    h1: 'Internship Resume Example & Guide',
    intro: 'Land your dream summer internship with an ATS-optimized resume format designed specifically for candidates with limited corporate tenure.',
    ogType: 'article'
  },
  {
    path: '/resume-examples/no-experience',
    title: 'Resume Example for No Experience (Free ATS Template) | Resume Craft',
    description: 'Free ATS resume example for applicants with no formal work experience. Highlight transferable skills, volunteer work, certifications, and education.',
    h1: 'Resume Example for No Experience & Career Switchers',
    intro: 'How to build an impressive, ATS-compliant resume when you have zero official job experience. Transform everyday skills into employer-ready assets.',
    ogType: 'article'
  },

  // Guides
  {
    path: '/guides',
    title: 'Career & ATS Resume Writing Guides | Resume Craft',
    description: 'Expert guides on beating ATS scanners, mastering the Google X-Y-Z formula, finding high-value keywords, and structuring modern resumes.',
    h1: 'Career & ATS Resume Writing Guides',
    intro: 'Master the proven strategies to pass automated ATS filters, write high-converting resume bullets, and land top-tier interviews.'
  },
  {
    path: '/guides/how-to-make-ats-friendly-resume',
    title: 'How to Make an ATS-Friendly Resume (Step-by-Step Guide) | Resume Craft',
    description: 'Learn how to format, structure, and keyword-optimize your resume to pass automated Applicant Tracking Systems like Workday, Taleo, and Greenhouse.',
    h1: 'How to Make an ATS-Friendly Resume: Complete 2026 Guide',
    intro: 'Applicant Tracking Systems (ATS) filter out over 70% of resumes before a human recruiter ever sees them. Learn how ATS parsers work, which formatting traps to avoid, and how to format your resume for 100% readability.',
    ogType: 'article'
  },
  {
    path: '/guides/google-xyz-formula-guide',
    title: 'Google X-Y-Z Resume Formula Explained (With 25 Examples) | Resume Craft',
    description: 'Master the Google X-Y-Z resume formula: "Accomplished [X] as measured by [Y], by doing [Z]". Transform weak duty bullets into high-impact achievements.',
    h1: 'Mastering the Google X-Y-Z Resume Formula',
    intro: 'Google former SVP of People Operations Laszlo Bock established the gold standard for writing resume bullet points: "Accomplished [X] as measured by [Y], by doing [Z]". Learn how to apply it across all industries.',
    ogType: 'article'
  },
  {
    path: '/guides/how-to-improve-resume-score',
    title: 'How to Improve Your Resume Score to 90+ | Resume Craft',
    description: 'Step-by-step optimization roadmap to raise your resume score from 60 to 90+ on automated ATS scanners. Fix missing keywords, metrics, and formatting.',
    h1: 'How to Improve Your Resume Score to 90+',
    intro: 'A low ATS score means your resume is missing critical technical keywords, measurable achievements, or ATS-friendly formatting. Here is how to achieve a 90+ score.',
    ogType: 'article'
  },

  // Trust Pages
  {
    path: '/how-it-works',
    title: 'How Resume Craft Works – Vector PDFs & AI ATS Architecture | Resume Craft',
    description: 'Discover how Resume Craft generates ATS-scannable vector PDFs and utilizes AI bullet optimization to maximize interview callback rates.',
    h1: 'How Resume Craft Works',
    intro: 'The technical architecture behind our ATS-scannable vector PDFs, real-time keyword matching, and AI bullet optimization.'
  },
  {
    path: '/faq',
    title: 'Frequently Asked Questions (FAQ) | Resume Craft',
    description: 'Find answers to common questions about Resume Craft, ATS resume scoring, AI bullet improvements, vector PDF downloads, and data privacy.',
    h1: 'Frequently Asked Questions (FAQ)',
    intro: 'Everything you need to know about ATS scoring, AI bullet enhancements, document imports, and candidate privacy.'
  },
  {
    path: '/about',
    title: 'About Resume Craft – Our Mission for Free Career Tools | Resume Craft',
    description: 'Learn about Resume Craft mission to provide free, accessible, and privacy-focused ATS resume building tools for job seekers worldwide.',
    h1: 'About Resume Craft',
    intro: 'Democratizing career advancement with free, private, and ATS-optimized tools for job seekers everywhere.'
  },
  {
    path: '/contact',
    title: 'Contact Support & Feedback | Resume Craft',
    description: 'Get in touch with the Resume Craft team for feedback, bug reports, feature suggestions, or enterprise inquiries.',
    h1: 'Contact & Feedback',
    intro: 'Have a question, template request, or bug report? We would love to hear from you.'
  },
  {
    path: '/privacy',
    title: 'Privacy Policy – Data Protection & Security | Resume Craft',
    description: 'Read the Resume Craft privacy policy. Learn how your resume data is handled with local storage privacy and optional cloud synchronization.',
    h1: 'Privacy Policy',
    intro: 'At Resume Craft, we respect your privacy. We believe that your personal career history, contact details, and resume data belong strictly to you.'
  },
  {
    path: '/terms',
    title: 'Terms of Service | Resume Craft',
    description: 'Read the Terms of Service for using Resume Craft free resume builder, ATS checker, and career tools.',
    h1: 'Terms of Service',
    intro: 'By accessing or using Resume Craft, you agree to be bound by these Terms of Service.'
  }
];

console.log(`Starting SSG Pre-rendering for ${PAGES.length} routes...`);

for (const page of PAGES) {
  const canonicalUrl = `${SITE_URL}${page.path === '/' ? '/' : (page.path.endsWith('/') ? page.path : page.path + '/')}`;
  const ogType = page.ogType || 'website';

  const pathParts = page.path.split('/').filter(Boolean);
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL
    }
  ];
  let currentAcc = SITE_URL;
  pathParts.forEach((part, idx) => {
    currentAcc += `/${part}`;
    const formattedName = part
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: idx + 2,
      name: formattedName,
      item: currentAcc
    });
  });

  const defaultSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Resume Craft',
      url: SITE_URL,
      description: page.description
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Resume Craft',
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      areaServed: {
        '@type': 'Country',
        name: 'United States'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Resume Craft',
      operatingSystem: 'All Web Browsers',
      applicationCategory: 'BusinessApplication',
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD'
      },
      description: 'Free ATS-compatible resume builder and resume score checker powered by AI bullet optimization.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems
    }
  ];

  const metaHtml = `
    <title>${page.title}</title>
    <meta name="description" content="${page.description}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:title" content="${page.title}" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="Resume Craft" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:image" content="${SITE_URL}/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${page.title}" />
    <meta name="twitter:description" content="${page.description}" />
    <meta name="twitter:image" content="${SITE_URL}/og-image.png" />
    <script type="application/ld+json" id="seo-structured-data">${JSON.stringify(defaultSchema)}</script>
  `.trim();

  let rendered = baseTemplate;

  // Strip vendor-pdf modulepreload links from head if present
  rendered = rendered.replace(/<link[^>]*rel="modulepreload"[^>]*vendor-pdf[^>]*\/?>/gi, '');

  // Replace Title & Description in head
  rendered = rendered.replace(/<title>.*?<\/title>/i, '');
  rendered = rendered.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, '');
  rendered = rendered.replace('</head>', `  ${metaHtml}\n  </head>`);

  // For sub-pages, write static target index.html
  if (page.path !== '/') {
    const semanticBodyHtml = `
      <main style="max-width: 1200px; margin: 0 auto; padding: 20px; font-family: system-ui, sans-serif;">
        <header>
          <h1 style="font-size: 2rem; font-weight: 800; color: #0f172a;">${page.h1}</h1>
          <p style="font-size: 1rem; color: #475569; line-height: 1.6;">${page.intro}</p>
        </header>
        <nav aria-label="Quick Links" style="margin-top: 20px;">
          <a href="/builder" style="color: #4f46e5; margin-right: 15px; font-weight: bold;">Open Resume Builder</a>
          <a href="/ats-checker" style="color: #059669; margin-right: 15px; font-weight: bold;">Check ATS Score</a>
          <a href="/resume-examples" style="color: #2563eb; margin-right: 15px; font-weight: bold;">Resume Examples</a>
        </nav>
      </main>
    `.trim();

    const subPageRendered = rendered.replace('<div id="root"></div>', `<div id="root">${semanticBodyHtml}</div>`);
    const targetDir = path.join(DIST_DIR, page.path.replace(/^\//, ''));
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.writeFileSync(path.join(targetDir, 'index.html'), subPageRendered, 'utf8');
  } else {
    // Keep root index.html clean so SPA mounts identical to local dev server
    fs.writeFileSync(INDEX_HTML_PATH, rendered, 'utf8');
  }
}

console.log(`Successfully pre-rendered ${PAGES.length} static SEO HTML routes into dist/ !`);
