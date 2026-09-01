export interface GuideItem {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  targetKeyword: string;
  h1: string;
  readTime: string;
  category: string;
  summary: string;
  sections: {
    heading: string;
    content: string;
    keyTakeaway?: string;
    bulletPoints?: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const CAREER_GUIDES: GuideItem[] = [
  {
    slug: 'how-to-make-ats-friendly-resume',
    title: 'How to Make an ATS-Friendly Resume in 2026',
    metaTitle: 'How to Make an ATS-Friendly Resume (Step-by-Step Guide) | Resume Craft',
    metaDescription: 'Learn how to format, structure, and keyword-optimize your resume to pass automated Applicant Tracking Systems like Workday, Taleo, and Greenhouse.',
    targetKeyword: 'how to make an ATS-friendly resume',
    h1: 'How to Make an ATS-Friendly Resume: Complete 2026 Guide',
    readTime: '6 min read',
    category: 'ATS Strategy',
    summary: 'Applicant Tracking Systems (ATS) filter out over 70% of resumes before a human recruiter ever sees them. Learn how ATS parsers work, which formatting traps to avoid, and how to format your resume for 100% readability.',
    sections: [
      {
        heading: '1. What is an Applicant Tracking System (ATS)?',
        content: 'An Applicant Tracking System (ATS) is software utilized by corporate employers and recruiters to collect, parse, rank, and filter job applications. Common systems include Workday, Taleo, Greenhouse, Lever, and iCIMS. When you submit a resume, the software parses your document into discrete fields (Contact Information, Work Experience, Education, Skills) and calculates a match percentage against the employer’s job description.',
        keyTakeaway: 'Your resume must be formatted so automated parsers can extract every word without distortion or scrambled text.'
      },
      {
        heading: '2. Top Formatting Rules for ATS Compliance',
        content: 'Many visually fancy resume templates fail in ATS algorithms because complex graphic elements confuse parser reading order.',
        bulletPoints: [
          'Use single-column layout: Multi-column tables often cause text to merge across columns horizontally, scrambling your employment dates and job titles.',
          'Stick to standard system fonts: Use clean typography such as Inter, Outfit, Merriweather, Arial, or Calibri.',
          'Export as clean Vector PDF: Ensure your PDF contains actual selectable text (not rasterized images or scanned pictures).',
          'Use standard section headings: Use recognized labels like "Work Experience", "Education", "Skills", and "Certifications" rather than whimsical names.'
        ]
      },
      {
        heading: '3. Keyword Matching and Density Strategy',
        content: 'ATS algorithms search for specific hard skills, certifications, tools, and job titles explicitly mentioned in the job posting. Tailor your resume by matching the exact phrasing used in the job description (e.g. if the posting asks for "React.js and TypeScript", avoid writing only "Frontend libraries").',
        keyTakeaway: 'Always compare your resume keywords with the target job posting using our free ATS Resume Checker.'
      }
    ],
    faqs: [
      {
        question: 'Is PDF or Word better for ATS?',
        answer: 'Modern ATS platforms (Workday, Greenhouse, Lever) parse vector PDFs with selectable text flawlessly while preserving your exact typography. If an application specifically requests .docx, submit Word; otherwise, vector PDF is best.'
      },
      {
        question: 'Will tables and text boxes fail an ATS scan?',
        answer: 'Yes, complex tables, text boxes, and Photoshop-designed graphics frequently fail or result in scrambled text during automated parsing.'
      }
    ]
  },
  {
    slug: 'google-xyz-formula-guide',
    title: 'How to Write Resume Bullets Using Google X-Y-Z Formula',
    metaTitle: 'Google X-Y-Z Resume Formula Explained (With 25 Examples) | Resume Craft',
    metaDescription: 'Master the Google X-Y-Z resume formula: "Accomplished [X] as measured by [Y], by doing [Z]". Transform weak duty bullets into high-impact achievements.',
    targetKeyword: 'Google XYZ resume formula',
    h1: 'Mastering the Google X-Y-Z Resume Formula',
    readTime: '5 min read',
    category: 'Resume Writing',
    summary: 'Google former SVP of People Operations Laszlo Bock established the gold standard for writing resume bullet points: "Accomplished [X] as measured by [Y], by doing [Z]". Learn how to apply it across all industries.',
    sections: [
      {
        heading: '1. The Anatomy of the X-Y-Z Formula',
        content: 'Most applicants write passive job descriptions like "Responsible for website maintenance". The Google X-Y-Z formula turns passive duties into compelling, quantifiable achievements: \n\n• [X] = The outcome or accomplishment\n• [Y] = The measurable data point or metric\n• [Z] = The specific action, method, or technology you employed.',
        keyTakeaway: 'Every bullet should demonstrate what you achieved, how much it improved, and exactly how you did it.'
      },
      {
        heading: '2. Before and After Examples',
        content: 'See how standard bullets are transformed with the X-Y-Z framework:',
        bulletPoints: [
          'Before: "Helped with customer support inquiries and emails."',
          'After (XYZ): "Resolved 75+ customer inquiries daily with a 98.4% CSAT rating [X/Y] by developing 20+ automated Zendesk knowledge base macros [Z]."',
          'Before: "Worked on database performance."',
          'After (XYZ): "Decreased p99 API query latency from 420ms to 85ms across 12M daily requests [X/Y] by optimizing PostgreSQL indexing and Redis caching layers [Z]."'
        ]
      }
    ],
    faqs: [
      {
        question: 'What if I do not have exact metrics or numbers?',
        answer: 'You can estimate reasonable ranges (e.g., "served 50-100 customers daily", "reduced manual process time by ~30%"). Recruiters value estimated metrics over vague statements.'
      }
    ]
  },
  {
    slug: 'how-to-improve-resume-score',
    title: 'How to Improve Your Resume ATS Score to 90+',
    metaTitle: 'How to Improve Your Resume Score to 90+ | Resume Craft',
    metaDescription: 'Step-by-step optimization roadmap to raise your resume score from 60 to 90+ on automated ATS scanners. Fix missing keywords, metrics, and formatting.',
    targetKeyword: 'improve resume score',
    h1: 'How to Improve Your Resume Score to 90+',
    readTime: '5 min read',
    category: 'ATS Strategy',
    summary: 'A low ATS score means your resume is missing critical technical keywords, measurable achievements, or ATS-friendly formatting. Here is how to achieve a 90+ score.',
    sections: [
      {
        heading: '1. Keyword Alignment with Job Requirements',
        content: 'Identify the top 10 hard skills and technical requirements in the target job posting. Ensure these terms appear naturally in both your Skills section and Work Experience bullets.',
        keyTakeaway: 'Do not hide invisible white text keywords—modern ATS parsers flag keyword stuffing as spam.'
      },
      {
        heading: '2. Increase Quantifiable Metric Density',
        content: 'Ensure at least 60% of your work experience bullet points include numbers, percentages, dollar amounts, team sizes, or time savings.',
        bulletPoints: [
          'Include percentages for efficiency, growth, or error reduction.',
          'Specify user or customer scale (e.g. 500k monthly active users).',
          'State project budgets or cost savings achieved.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is a good ATS resume score?',
        answer: 'An ATS score of 80 or above is considered strong and puts your application in the top 15% of candidates parsed by automated screeners.'
      }
    ]
  }
];
