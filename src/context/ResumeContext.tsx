import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  ResumeData,
  AtsAnalysisResult,
  JobApplication,
  CoverLetterData,
  TemplateType,
  FontFamilyType,
  FontSizeType,
  SpacingType
} from '../types/resume';
import { initialResumeData, emptyResumeData, sampleJobApplications, sampleCoverLetter } from '../data/initialData';
import { analyzeAtsScore } from '../services/atsChecker';
import { saveResumeApi, fetchUserResumesApi } from '../services/apiAuth';
import { useAuth } from './AuthContext';

interface ResumeContextType {
  resume: ResumeData;
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;
  updateResume: (updates: Partial<ResumeData> | ((prev: ResumeData) => ResumeData)) => void;
  updatePersonalInfo: (field: string, value: string) => void;
  updateSummary: (summary: string) => void;
  updateFormatting: (formattingUpdates: Partial<ResumeData['formatting']>) => void;
  
  // Section CRUD
  addExperience: () => void;
  updateExperience: (id: string, updates: Partial<ResumeData['experience'][0]>) => void;
  removeExperience: (id: string) => void;
  
  addEducation: () => void;
  updateEducation: (id: string, updates: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  
  addSkillCategory: () => void;
  updateSkillCategory: (id: string, category: string, items: string[]) => void;
  removeSkillCategory: (id: string) => void;
  
  addProject: () => void;
  updateProject: (id: string, updates: Partial<ResumeData['projects'][0]>) => void;
  removeProject: (id: string) => void;
  
  addCertification: () => void;
  updateCertification: (id: string, updates: Partial<ResumeData['certifications'][0]>) => void;
  removeCertification: (id: string) => void;

  // History Undo/Redo
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;

  // ATS Analysis
  atsAnalysis: AtsAnalysisResult;
  targetJobDescription: string;
  setTargetJobDescription: (jd: string) => void;

  // Cloud & Resumes list
  savedResumes: ResumeData[];
  loadResumeById: (id: string) => void;
  createNewResume: () => void;
  isSaving: boolean;
  lastSavedTime: string | null;

  // Job Tracker
  jobApplications: JobApplication[];
  addJobApplication: (app: Omit<JobApplication, 'id' | 'updatedAt'>) => void;
  updateJobApplication: (id: string, updates: Partial<JobApplication>) => void;
  deleteJobApplication: (id: string) => void;

  // Cover Letters
  coverLetter: CoverLetterData;
  updateCoverLetter: (updates: Partial<CoverLetterData>) => void;

  // AI Key
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  // Load initial resume from local storage or defaults
  const [resume, setResumeState] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('resume_craft_active_resume');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return emptyResumeData;
  });

  const [history, setHistory] = useState<ResumeData[]>([initialResumeData]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const [savedResumes, setSavedResumes] = useState<ResumeData[]>([initialResumeData]);
  const [targetJobDescription, setTargetJobDescription] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Job Tracker State
  const [jobApplications, setJobApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('resume_craft_job_apps');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return sampleJobApplications;
  });

  // Cover Letter State
  const [coverLetter, setCoverLetter] = useState<CoverLetterData>(() => {
    const saved = localStorage.getItem('resume_craft_cover_letter');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return sampleCoverLetter;
  });

  // Gemini API Key
  const [geminiApiKey, setGeminiApiKeyState] = useState<string>(() => {
    return localStorage.getItem('resume_craft_gemini_key') || '';
  });

  const setGeminiApiKey = (key: string) => {
    setGeminiApiKeyState(key);
    localStorage.setItem('resume_craft_gemini_key', key);
  };

  // Real-time ATS computation
  const [atsAnalysis, setAtsAnalysis] = useState<AtsAnalysisResult>(() =>
    analyzeAtsScore(resume, targetJobDescription)
  );

  useEffect(() => {
    const result = analyzeAtsScore(resume, targetJobDescription);
    setAtsAnalysis(result);
  }, [resume, targetJobDescription]);

  // Push to history with debounce/check
  const updateResume = useCallback((updates: Partial<ResumeData> | ((prev: ResumeData) => ResumeData)) => {
    setResumeState((prev) => {
      const next = typeof updates === 'function' ? updates(prev) : { ...prev, ...updates, updatedAt: new Date().toISOString() };
      
      // Update history
      setHistory(h => [...h.slice(0, historyIndex + 1), next]);
      setHistoryIndex(idx => idx + 1);

      // Local storage persist
      localStorage.setItem('resume_craft_active_resume', JSON.stringify(next));
      return next;
    });
  }, [historyIndex]);

  // Undo / Redo
  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setResumeState(history[newIndex]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setResumeState(history[newIndex]);
    }
  };

  // Field helpers
  const updatePersonalInfo = (field: string, value: string) => {
    updateResume(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateSummary = (summary: string) => {
    updateResume(prev => ({ ...prev, summary }));
  };

  const updateFormatting = (formattingUpdates: Partial<ResumeData['formatting']>) => {
    updateResume(prev => ({
      ...prev,
      formatting: { ...prev.formatting, ...formattingUpdates }
    }));
  };

  // Experience
  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      role: 'Software Engineer',
      company: 'Company Name',
      location: 'City, State',
      startDate: '2023',
      endDate: 'Present',
      current: true,
      highlights: [
        'Architected high-throughput service resulting in 30% latency reduction across 100k daily users.'
      ]
    };
    updateResume(prev => ({ ...prev, experience: [newExp, ...prev.experience] }));
  };

  const updateExperience = (id: string, updates: Partial<ResumeData['experience'][0]>) => {
    updateResume(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, ...updates } : e)
    }));
  };

  const removeExperience = (id: string) => {
    updateResume(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id)
    }));
  };

  // Education
  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      degree: 'B.S. in Computer Science',
      institution: 'University Name',
      location: 'City, State',
      startDate: '2019',
      endDate: '2023',
      highlights: ['Relevant coursework in Software Engineering and Data Structures']
    };
    updateResume(prev => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const updateEducation = (id: string, updates: Partial<ResumeData['education'][0]>) => {
    updateResume(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, ...updates } : e)
    }));
  };

  const removeEducation = (id: string) => {
    updateResume(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };

  // Skills
  const addSkillCategory = () => {
    const newCategory = {
      id: `skill-${Date.now()}`,
      category: 'New Skill Category',
      items: ['JavaScript', 'Python', 'Git']
    };
    updateResume(prev => ({ ...prev, skills: [...prev.skills, newCategory] }));
  };

  const updateSkillCategory = (id: string, category: string, items: string[]) => {
    updateResume(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? { ...s, category, items } : s)
    }));
  };

  const removeSkillCategory = (id: string) => {
    updateResume(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  // Projects
  const addProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: 'New Featured Project',
      subtitle: 'Full-Stack Application',
      link: 'https://github.com',
      startDate: '2024',
      endDate: '2024',
      technologies: ['React', 'TypeScript', 'Node.js'],
      highlights: [
        'Built scalable web application handling 5,000 requests per minute with sub-100ms response time.'
      ]
    };
    updateResume(prev => ({ ...prev, projects: [...prev.projects, newProj] }));
  };

  const updateProject = (id: string, updates: Partial<ResumeData['projects'][0]>) => {
    updateResume(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...updates } : p)
    }));
  };

  const removeProject = (id: string) => {
    updateResume(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  // Certifications
  const addCertification = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      name: 'Professional Certification',
      issuer: 'Issuing Organization',
      date: '2024',
      link: ''
    };
    updateResume(prev => ({ ...prev, certifications: [...prev.certifications, newCert] }));
  };

  const updateCertification = (id: string, updates: Partial<ResumeData['certifications'][0]>) => {
    updateResume(prev => ({
      ...prev,
      certifications: prev.certifications.map(c => c.id === id ? { ...c, ...updates } : c)
    }));
  };

  const removeCertification = (id: string) => {
    updateResume(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id)
    }));
  };

  // Create new blank or template resume
  const createNewResume = () => {
    const blank: ResumeData = {
      ...initialResumeData,
      id: `resume-${Date.now()}`,
      title: 'Untitled ATS Resume',
      updatedAt: new Date().toISOString()
    };
    setResumeState(blank);
    setHistory([blank]);
    setHistoryIndex(0);
    localStorage.setItem('resume_craft_active_resume', JSON.stringify(blank));
  };

  const loadResumeById = (id: string) => {
    const found = savedResumes.find(r => r.id === id);
    if (found) {
      setResumeState(found);
      setHistory([found]);
      setHistoryIndex(0);
      localStorage.setItem('resume_craft_active_resume', JSON.stringify(found));
    }
  };

  // Auto sync to Express API (neha_data) backend when user changes or resume updates
  useEffect(() => {
    const syncTimeout = setTimeout(async () => {
      if (user) {
        setIsSaving(true);
        try {
          await saveResumeApi(resume);
          setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        } catch (e) {
          console.warn('Auto sync warning:', e);
        } finally {
          setIsSaving(false);
        }
      }
    }, 1500);

    return () => clearTimeout(syncTimeout);
  }, [resume, user]);

  // Load backend resumes on user login
  useEffect(() => {
    if (user) {
      fetchUserResumesApi().then(list => {
        if (list && list.length > 0) {
          const parsed = list.map(r => typeof r.data === 'object' ? { ...r.data, id: r.id } : r);
          setSavedResumes(parsed);
        }
      }).catch(e => console.warn('Load resumes error:', e));
    }
  }, [user]);

  // Job Application CRUD
  const addJobApplication = (appData: Omit<JobApplication, 'id' | 'updatedAt'>) => {
    const newApp: JobApplication = {
      ...appData,
      id: `job-${Date.now()}`,
      updatedAt: new Date().toISOString()
    };
    const nextList = [newApp, ...jobApplications];
    setJobApplications(nextList);
    localStorage.setItem('resume_craft_job_apps', JSON.stringify(nextList));
  };

  const updateJobApplication = (id: string, updates: Partial<JobApplication>) => {
    const nextList = jobApplications.map(j => j.id === id ? { ...j, ...updates, updatedAt: new Date().toISOString() } : j);
    setJobApplications(nextList);
    localStorage.setItem('resume_craft_job_apps', JSON.stringify(nextList));
  };

  const deleteJobApplication = (id: string) => {
    const nextList = jobApplications.filter(j => j.id !== id);
    setJobApplications(nextList);
    localStorage.setItem('resume_craft_job_apps', JSON.stringify(nextList));
  };

  // Cover Letter CRUD
  const updateCoverLetter = (updates: Partial<CoverLetterData>) => {
    setCoverLetter(prev => {
      const next = { ...prev, ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem('resume_craft_cover_letter', JSON.stringify(next));
      return next;
    });
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume: setResumeState,
        updateResume,
        updatePersonalInfo,
        updateSummary,
        updateFormatting,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkillCategory,
        updateSkillCategory,
        removeSkillCategory,
        addProject,
        updateProject,
        removeProject,
        addCertification,
        updateCertification,
        removeCertification,
        undo,
        redo,
        canUndo: historyIndex > 0,
        canRedo: historyIndex < history.length - 1,
        atsAnalysis,
        targetJobDescription,
        setTargetJobDescription,
        savedResumes,
        loadResumeById,
        createNewResume,
        isSaving,
        lastSavedTime,
        jobApplications,
        addJobApplication,
        updateJobApplication,
        deleteJobApplication,
        coverLetter,
        updateCoverLetter,
        geminiApiKey,
        setGeminiApiKey
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
