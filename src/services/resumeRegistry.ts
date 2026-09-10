import { ResumeData } from '../types/resume';
import { RESUME_EXAMPLES } from '../data/resumeExamplesData';
import { HERO_RESUME_CARDS } from '../data/heroResumeCards';
import { TWENTY_ATS_EXAMPLES } from '../components/common/ResumeExamplesCarousel';
import { ROLE_SEO_DATA } from '../data/roleSeoData';

export interface RegisteredResume {
  slug: string;
  url: string;
  roleTitle: string;
  jobTitle: string;
  category: string;
  experienceLevel: string;
  presetData: Partial<ResumeData>;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  shortIntro: string;
  skills?: { category: string; items: string[] }[];
  experienceBullets?: string[];
  atsKeywords?: string[];
  commonMistakes?: string[];
  formattingTips?: string[];
  faqs?: { question: string; answer: string }[];
}

/**
  * Converts any job title / professional role into a clean, lowercase, hyphen-separated slug.
  * Examples:
  * - Senior DevOps & Platform Engineer -> senior-devops-platform-engineer
  * - Product Manager -> product-manager
  * - AI Product Manager -> ai-product-manager
  */
export function slugifyJobTitle(title: string): string {
  if (!title) return 'resume';
  return title
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Global Registry Storage
const REGISTRY_BY_SLUG = new Map<string, RegisteredResume>();
const SLUG_BY_ID_OR_ROLE = new Map<string, string>();

let isInitialized = false;

function initializeRegistry() {
  if (isInitialized) return;
  isInitialized = true;

  const usedSlugs = new Map<string, number>();

  function register(
    rawTitle: string,
    presetData: Partial<ResumeData>,
    metadata: {
      category?: string;
      experienceLevel?: string;
      metaTitle?: string;
      metaDescription?: string;
      h1?: string;
      shortIntro?: string;
      skills?: { category: string; items: string[] }[];
      experienceBullets?: string[];
      atsKeywords?: string[];
      commonMistakes?: string[];
      formattingTips?: string[];
      faqs?: { question: string; answer: string }[];
      originalKeys?: string[];
    }
  ): RegisteredResume {
    const jobTitle = presetData.personalInfo?.jobTitle || rawTitle || 'Software Engineer';
    const baseSlug = slugifyJobTitle(jobTitle);

    let finalSlug = baseSlug;
    const count = usedSlugs.get(baseSlug) || 0;
    if (count > 0) {
      finalSlug = `${baseSlug}-${count}`;
    }
    usedSlugs.set(baseSlug, count + 1);

    const registered: RegisteredResume = {
      slug: finalSlug,
      url: `/resumes/${finalSlug}`,
      roleTitle: jobTitle,
      jobTitle,
      category: metadata.category || 'Professional',
      experienceLevel: metadata.experienceLevel || 'Mid-Senior',
      presetData,
      metaTitle: metadata.metaTitle || `${jobTitle} Resume Example — Free ATS Resume | Resume Craft`,
      metaDescription: metadata.metaDescription || `Professional ATS-optimized ${jobTitle} resume example. Clean formatting, recruiter-vetted sections, and instant PDF/DOCX downloads.`,
      h1: metadata.h1 || `${jobTitle} Resume Example`,
      shortIntro: metadata.shortIntro || `Explore our recruiter-vetted ${jobTitle} resume example built to pass ATS scanners and impress hiring managers.`,
      skills: metadata.skills || presetData.skills?.map(s => ({ category: s.category, items: s.items })),
      experienceBullets: metadata.experienceBullets || presetData.experience?.flatMap(e => e.highlights) || [],
      atsKeywords: metadata.atsKeywords || [jobTitle, 'ATS Resume', 'Professional'],
      commonMistakes: metadata.commonMistakes,
      formattingTips: metadata.formattingTips,
      faqs: metadata.faqs
    };

    REGISTRY_BY_SLUG.set(finalSlug, registered);

    // Register alias lookups for legacy keys/ids
    if (metadata.originalKeys) {
      metadata.originalKeys.forEach(key => {
        if (key) SLUG_BY_ID_OR_ROLE.set(key, finalSlug);
      });
    }

    return registered;
  }

  // 1. Register 20 ATS Examples from Carousel
  TWENTY_ATS_EXAMPLES.forEach(ats => {
    const jobTitle = ats.candidateRole || ats.roleTitle;
    register(jobTitle, ats.presetData, {
      category: ats.category,
      experienceLevel: ats.experienceLevel,
      shortIntro: ats.shortDescription,
      experienceBullets: ats.fullResume.experience.flatMap(e => e.highlights),
      originalKeys: [ats.slug, ats.id]
    });
  });

  // 2. Register HERO Resume Cards
  HERO_RESUME_CARDS.forEach(card => {
    const jobTitle = card.jobTitle;
    // Check if already registered
    const existingSlug = SLUG_BY_ID_OR_ROLE.get(card.id);
    if (!existingSlug) {
      register(jobTitle, card.presetData, {
        category: card.templateTag || 'Engineering',
        experienceLevel: 'Senior',
        shortIntro: card.summary,
        originalKeys: [card.id, `hero-${card.id}`]
      });
    }
  });

  // 3. Register RESUME_EXAMPLES from resumeExamplesData.ts
  RESUME_EXAMPLES.forEach(ex => {
    const jobTitle = ex.presetData.personalInfo?.jobTitle || ex.roleTitle;
    const existingSlug = SLUG_BY_ID_OR_ROLE.get(ex.slug);
    if (!existingSlug) {
      register(jobTitle, ex.presetData, {
        category: ex.category,
        experienceLevel: ex.experienceLevel,
        metaTitle: ex.metaTitle,
        metaDescription: ex.metaDescription,
        h1: ex.h1,
        shortIntro: ex.shortIntro,
        skills: ex.skills,
        experienceBullets: ex.experienceBullets,
        atsKeywords: ex.atsKeywords,
        commonMistakes: ex.commonMistakes,
        formattingTips: ex.formattingTips,
        faqs: ex.faqs,
        originalKeys: [ex.slug]
      });
    }
  });

  // 4. Register ROLE_SEO_DATA entries if any remains unindexed
  Object.entries(ROLE_SEO_DATA).forEach(([roleKey, data]) => {
    const jobTitle = data.presetData?.personalInfo?.jobTitle || data.roleTitle;
    const existingSlug = SLUG_BY_ID_OR_ROLE.get(roleKey) || SLUG_BY_ID_OR_ROLE.get(data.slug);
    if (!existingSlug && data.presetData) {
      register(jobTitle, data.presetData as Partial<ResumeData>, {
        category: data.category,
        experienceLevel: data.experienceLevel,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        h1: data.h1,
        shortIntro: data.shortIntro,
        skills: data.skills,
        experienceBullets: data.experienceBullets,
        atsKeywords: data.atsKeywords,
        faqs: data.faqs,
        originalKeys: [roleKey, data.slug]
      });
    }
  });
}

/**
 * Get all registered resumes in the application
 */
export function getAllResumes(): RegisteredResume[] {
  initializeRegistry();
  return Array.from(REGISTRY_BY_SLUG.values());
}

/**
 * Lookup a resume by its clean job title slug or legacy identifier
 */
export function getResumeBySlug(slugOrAlias: string): RegisteredResume | undefined {
  initializeRegistry();
  if (!slugOrAlias) return undefined;
  
  const cleanSlug = slugOrAlias.toLowerCase().trim();
  
  // 1. Direct slug match
  if (REGISTRY_BY_SLUG.has(cleanSlug)) {
    return REGISTRY_BY_SLUG.get(cleanSlug);
  }

  // 2. Legacy alias lookup
  const mappedSlug = SLUG_BY_ID_OR_ROLE.get(cleanSlug);
  if (mappedSlug && REGISTRY_BY_SLUG.has(mappedSlug)) {
    return REGISTRY_BY_SLUG.get(mappedSlug);
  }

  // 3. Fallback title match
  for (const item of REGISTRY_BY_SLUG.values()) {
    if (slugifyJobTitle(item.jobTitle) === cleanSlug || slugifyJobTitle(item.roleTitle) === cleanSlug) {
      return item;
    }
  }

  return undefined;
}

/**
 * Returns the clean /resumes/<title-slug> URL for any job title or identifier
 */
export function getResumeUrl(identifierOrJobTitle: string): string {
  initializeRegistry();
  const found = getResumeBySlug(identifierOrJobTitle);
  if (found) {
    return found.url;
  }
  return `/resumes/${slugifyJobTitle(identifierOrJobTitle)}`;
}
