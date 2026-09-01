export type TemplateType = 'modern' | 'tech' | 'executive' | 'slate' | 'compact';
export type FontFamilyType = 'outfit' | 'inter' | 'serif' | 'mono';
export type FontSizeType = 'sm' | 'base' | 'lg';
export type SpacingType = 'compact' | 'normal' | 'relaxed';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  highlights?: string[];
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  link?: string;
  startDate?: string;
  endDate?: string;
  highlights: string[];
  technologies?: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface ResumeFormatting {
  template: TemplateType;
  fontFamily: FontFamilyType;
  fontSize: FontSizeType;
  spacing: SpacingType;
  accentColor: string;
  showIcons: boolean;
  sectionOrder: string[];
}

export interface ResumeData {
  id: string;
  title: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  customSections: CustomSection[];
  formatting: ResumeFormatting;
}

export interface AtsRecommendation {
  type: 'critical' | 'improvement' | 'positive';
  title: string;
  description: string;
}

export interface AtsAnalysisResult {
  overallScore: number;
  categoryScores: {
    keywords: number;
    quantifiableResults: number;
    actionVerbs: number;
    formatting: number;
    completeness: number;
  };
  matchedKeywords: string[];
  missingKeywords: string[];
  actionVerbsFound: string[];
  quantifiableBulletsCount: number;
  totalBulletsCount: number;
  recommendations: AtsRecommendation[];
}

export type ApplicationStatus = 'wishlist' | 'applied' | 'interview' | 'offer' | 'rejected';

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  salary?: string;
  location?: string;
  appliedDate?: string;
  deadline?: string;
  url?: string;
  notes?: string;
  resumeId?: string;
  updatedAt: string;
}

export interface CoverLetterData {
  id: string;
  title: string;
  recipientName: string;
  recipientTitle: string;
  companyName: string;
  companyAddress: string;
  jobTitle: string;
  date: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderLocation: string;
  letterBody: string;
  tone: 'professional' | 'enthusiastic' | 'confident' | 'academic';
  updatedAt: string;
}

export interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAnonymous: boolean;
}
