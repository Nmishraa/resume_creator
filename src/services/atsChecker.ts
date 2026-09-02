import { ResumeData, AtsAnalysisResult, AtsRecommendation } from '../types/resume';

const STRONG_ACTION_VERBS = [
  'architected', 'spearheaded', 'engineered', 'deployed', 'optimized', 'pioneered',
  'automated', 'streamlined', 'orchestrated', 'designed', 'formulated', 'accelerated',
  'implemented', 'scaled', 'reduced', 'revamped', 'generated', 'mentored', 'established',
  'transformed', 'delivered', 'boosted', 'curated', 'integrated', 'executed', 'built',
  'championed', 'directed', 'navigated', 'modernized', 'maximized', 'eliminated'
];

const WEAK_PHRASES = [
  'responsible for', 'worked on', 'helped with', 'assisted in', 'handled',
  'duties included', 'participated in', 'tasked with', 'did some'
];

const COMMON_TECH_KEYWORDS = [
  'react', 'typescript', 'javascript', 'python', 'node.js', 'sql', 'nosql',
  'aws', 'gcp', 'azure', 'docker', 'kubernetes', 'ci/cd', 'git', 'rest api',
  'graphql', 'tailwind css', 'next.js', 'redis', 'postgresql', 'mongodb',
  'microservices', 'distributed systems', 'agile', 'scrum', 'system architecture',
  'machine learning', 'ai', 'cloud computing', 'performance optimization', 'testing'
];

export function extractTextFromResume(resume: ResumeData): string {
  const parts: string[] = [];
  
  if (resume.personalInfo) {
    parts.push(resume.personalInfo.fullName || '');
    parts.push(resume.personalInfo.jobTitle || '');
    parts.push(resume.personalInfo.location || '');
  }

  if (resume.summary) {
    parts.push(resume.summary);
  }

  resume.experience?.forEach(exp => {
    parts.push(exp.role || '');
    parts.push(exp.company || '');
    exp.highlights?.forEach(h => parts.push(h));
  });

  resume.education?.forEach(edu => {
    parts.push(edu.degree || '');
    parts.push(edu.institution || '');
    edu.highlights?.forEach(h => parts.push(h));
  });

  resume.skills?.forEach(s => {
    parts.push(s.category || '');
    parts.push(s.items?.join(' ') || '');
  });

  resume.projects?.forEach(p => {
    parts.push(p.title || '');
    p.technologies?.forEach(t => parts.push(t));
    p.highlights?.forEach(h => parts.push(h));
  });

  resume.certifications?.forEach(c => {
    parts.push(c.name || '');
    parts.push(c.issuer || '');
  });

  return parts.join(' ').toLowerCase();
}

export function analyzeAtsScore(resume: ResumeData, jobDescription?: string): AtsAnalysisResult {
  const fullText = extractTextFromResume(resume);
  const recommendations: AtsRecommendation[] = [];

  // 1. Completeness Score (0-20 points)
  let completenessScore = 0;
  if (resume.personalInfo.fullName && resume.personalInfo.fullName.length > 2) completenessScore += 4;
  if (resume.personalInfo.email && resume.personalInfo.email.includes('@')) completenessScore += 4;
  if (resume.personalInfo.phone && resume.personalInfo.phone.length >= 7) completenessScore += 3;
  if (resume.personalInfo.linkedin || resume.personalInfo.website) completenessScore += 3;
  if (resume.summary && resume.summary.length >= 60) completenessScore += 3;
  if (resume.experience && resume.experience.length >= 1) completenessScore += 3;

  if (!resume.personalInfo.email || !resume.personalInfo.email.includes('@')) {
    recommendations.push({
      type: 'critical',
      title: 'Missing Valid Email Address',
      description: 'A missing email may prevent recruiters from contacting you.'
    });
  }

  if (!resume.personalInfo.phone) {
    recommendations.push({
      type: 'critical',
      title: 'Missing Contact Phone Number',
      description: 'Include a direct phone number so automated recruiter screeners can reach you.'
    });
  }

  if (!resume.personalInfo.linkedin) {
    recommendations.push({
      type: 'improvement',
      title: 'Add LinkedIn Profile URL',
      description: 'Adding LinkedIn can help recruiters verify your professional background.'
    });
  }

  // 2. Quantifiable Results / Google X-Y-Z Formula (0-25 points)
  const allBullets: string[] = [];
  resume.experience?.forEach(exp => exp.highlights?.forEach(h => allBullets.push(h)));
  resume.projects?.forEach(p => p.highlights?.forEach(h => allBullets.push(h)));

  const metricRegex = /\b(\d+[%kKmMbB]?|\$\d+|\d+x|\d+\.\d+%|\d+\+)\b/i;
  let quantifiableCount = 0;

  allBullets.forEach(bullet => {
    if (metricRegex.test(bullet)) {
      quantifiableCount++;
    }
  });

  const totalBullets = allBullets.length || 1;
  const quantRatio = quantifiableCount / totalBullets;
  const quantScore = Math.min(25, Math.round(quantRatio * 25 + (quantifiableCount >= 3 ? 5 : 0)));

  if (quantifiableCount === 0) {
    recommendations.push({
      type: 'critical',
      title: 'No Measurable Impact (Google X-Y-Z Formula)',
      description: 'Add hard metrics (e.g., "Reduced latency by 45%", "Increased ARR by $1.2M", "Led team of 6") to strengthen bullet impact and parsing clarity.'
    });
  } else if (quantRatio < 0.5) {
    recommendations.push({
      type: 'improvement',
      title: 'Strengthen Measurable Metrics',
      description: `Only ${quantifiableCount} of ${totalBullets} bullets include quantifiable data. Aim for at least 60% with measurable outcomes.`
    });
  } else {
    recommendations.push({
      type: 'positive',
      title: 'High Measurable Impact Density',
      description: `Outstanding! ${quantifiableCount} bullets highlight concrete metrics, percentages, or dollar amounts.`
    });
  }

  // 3. Strong Action Verbs Analysis (0-20 points)
  const foundActionVerbs: string[] = [];
  STRONG_ACTION_VERBS.forEach(verb => {
    const regex = new RegExp(`\\b${verb}\\b`, 'i');
    if (regex.test(fullText)) {
      foundActionVerbs.push(verb);
    }
  });

  let actionScore = Math.min(20, Math.round((foundActionVerbs.length / 8) * 20));

  // Check for weak passive phrases
  const foundWeakPhrases: string[] = [];
  WEAK_PHRASES.forEach(phrase => {
    if (fullText.includes(phrase)) {
      foundWeakPhrases.push(phrase);
    }
  });

  if (foundWeakPhrases.length > 0) {
    actionScore = Math.max(0, actionScore - (foundWeakPhrases.length * 3));
    recommendations.push({
      type: 'improvement',
      title: 'Replace Passive Phrases with Power Verbs',
      description: `Found weak phrases like "${foundWeakPhrases.slice(0, 2).join('", "')}". Replace with strong verbs like "Architected", "Spearheaded", or "Engineered".`
    });
  }

  if (foundActionVerbs.length >= 6) {
    recommendations.push({
      type: 'positive',
      title: 'Strong Action Verb Utilization',
      description: `Detected ${foundActionVerbs.length} high-impact leadership and technical action verbs.`
    });
  }

  // 4. Keyword Matching (0-25 points)
  let targetKeywords: string[] = [];
  if (jobDescription && jobDescription.trim().length > 20) {
    // Extract keywords from provided job description
    const jdLower = jobDescription.toLowerCase();
    const words = (jdLower.match(/[a-z0-9+#.-]{3,}/g) || []) as string[];
    const freq: Record<string, number> = {};
    const stopwords = new Set(['and', 'the', 'for', 'with', 'you', 'will', 'are', 'that', 'this', 'have', 'from', 'our', 'team', 'work', 'your', 'about', 'role', 'must', 'what', 'looking', 'years', 'experience']);
    
    words.forEach((w: string) => {
      if (!stopwords.has(w) && w.length >= 3) {
        freq[w] = (freq[w] || 0) + 1;
      }
    });

    // Pick top frequency keywords plus tech keywords found in JD
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 20).map(entry => entry[0]);
    targetKeywords = Array.from(new Set([...sorted, ...COMMON_TECH_KEYWORDS.filter(k => jdLower.includes(k))]));
  }

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  if (targetKeywords.length > 0) {
    targetKeywords.forEach(kw => {
      const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'i');
      if (regex.test(fullText)) {
        matchedKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    });
  }

  const keywordMatchRatio = targetKeywords.length > 0 ? (matchedKeywords.length / targetKeywords.length) : 0.8;
  const keywordScore = targetKeywords.length > 0 
    ? Math.min(25, Math.round(keywordMatchRatio * 25 + (matchedKeywords.length >= 5 ? 5 : 0)))
    : 20;

  if (jobDescription && missingKeywords.length > 0) {
    recommendations.push({
      type: 'improvement',
      title: 'Target Job Description Keywords Missing',
      description: `Consider adding relevant skills from the JD: ${missingKeywords.slice(0, 5).join(', ')}.`
    });
  }

  // 5. Formatting & ATS Layout Readability (0-10 points)
  let formattingScore = 10;
  if (!resume.summary || resume.summary.length < 30) formattingScore -= 3;
  if (!resume.skills || resume.skills.length === 0) formattingScore -= 4;
  if (totalBullets < 4) formattingScore -= 3;
  formattingScore = Math.max(0, formattingScore);

  // Check if resume is completely empty
  const hasBasicInfo = Boolean(
    (resume.personalInfo?.fullName && resume.personalInfo.fullName.trim().length > 0) ||
    (resume.personalInfo?.email && resume.personalInfo.email.trim().length > 0) ||
    (resume.summary && resume.summary.trim().length > 0) ||
    (resume.experience && resume.experience.length > 0) ||
    (resume.skills && resume.skills.length > 0)
  );

  if (!hasBasicInfo) {
    return {
      overallScore: 0,
      categoryScores: {
        completeness: 0,
        quantifiableResults: 0,
        actionVerbs: 0,
        keywords: 0,
        formatting: 0,
      },
      matchedKeywords: [],
      missingKeywords: missingKeywords.slice(0, 10),
      actionVerbsFound: [],
      quantifiableBulletsCount: 0,
      totalBulletsCount: 0,
      recommendations: [
        {
          type: 'critical',
          title: 'Empty Resume Draft',
          description: 'Your resume is currently blank. Add your contact information, work experience, and skills to calculate your ATS score.'
        }
      ]
    };
  }

  // Calculate Overall Normalized Score (0 - 100)
  const totalRaw = completenessScore + quantScore + actionScore + keywordScore + formattingScore;
  const overallScore = Math.min(100, Math.max(0, Math.round(totalRaw)));

  return {
    overallScore,
    categoryScores: {
      completeness: Math.round((completenessScore / 20) * 100),
      quantifiableResults: Math.round((quantScore / 25) * 100),
      actionVerbs: Math.round((actionScore / 20) * 100),
      keywords: Math.round((keywordScore / 25) * 100),
      formatting: Math.round((formattingScore / 10) * 100),
    },
    matchedKeywords,
    missingKeywords: missingKeywords.slice(0, 10),
    actionVerbsFound: foundActionVerbs,
    quantifiableBulletsCount: quantifiableCount,
    totalBulletsCount: totalBullets,
    recommendations
  };
}
