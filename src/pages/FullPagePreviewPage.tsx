import React from 'react';
import { useLocation, useNavigate, useSearchParams, useParams, Link } from 'react-router-dom';
import { FullPageResumePreview } from '../components/common/FullPageResumePreview';
import { getResumeBySlug } from '../services/resumeRegistry';
import {
  RESUME_EXAMPLES,
  alexMorganData,
  sophiaChenData,
  sophiaChen3PageData,
  marcusVanceData,
  elenaRostovaData,
  davidMillerData,
  amaraOkaforData
} from '../data/resumeExamplesData';
import { TWENTY_ATS_EXAMPLES } from '../components/common/ResumeExamplesCarousel';
import { ROLE_SEO_DATA } from '../data/roleSeoData';
import { useResume } from '../context/ResumeContext';
import { ResumeData } from '../types/resume';

const HERO_CANDIDATE_MAP: Record<string, Partial<ResumeData>> = {
  'alex-morgan': alexMorganData,
  'alex-morgan-1page': alexMorganData,
  'sophia-chen': sophiaChen3PageData,
  'sophia-chen-3page': sophiaChen3PageData,
  'marcus-vance': marcusVanceData,
  'marcus-vance-4page': marcusVanceData,
  'elena-rostova': elenaRostovaData,
  'elena-rostova-2page': elenaRostovaData,
  'david-miller': davidMillerData,
  'david-miller-2page': davidMillerData,
  'amara-okafor': amaraOkaforData,
  'amara-okafor-1page': amaraOkaforData
};

export const FullPagePreviewPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { slug: routeSlug } = useParams<{ slug?: string }>();
  const { updateResume } = useResume();

  const stateResumeData = (location.state as { resumeData?: Partial<ResumeData> })?.resumeData;
  const rawSlug = (routeSlug || searchParams.get('slug') || searchParams.get('id') || searchParams.get('role') || '').trim();

  let resumeDataToDisplay: Partial<ResumeData> | undefined = stateResumeData;
  let resolvedSlug = rawSlug;

  if (!resumeDataToDisplay && rawSlug) {
    // 1. Check Global Resume Registry (handles all 90+ roles across all datasources)
    const registered = getResumeBySlug(rawSlug);
    if (registered?.presetData) {
      resumeDataToDisplay = registered.presetData;
      resolvedSlug = registered.slug;
    }

    // 2. Check ROLE_SEO_DATA fallback
    if (!resumeDataToDisplay && ROLE_SEO_DATA[rawSlug]?.presetData) {
      resumeDataToDisplay = ROLE_SEO_DATA[rawSlug].presetData as unknown as Partial<ResumeData>;
      resolvedSlug = rawSlug;
    }

    // 3. Check Hero Candidate Map
    if (!resumeDataToDisplay && HERO_CANDIDATE_MAP[rawSlug]) {
      resumeDataToDisplay = HERO_CANDIDATE_MAP[rawSlug];
    }

    // 4. Check RESUME_EXAMPLES
    if (!resumeDataToDisplay) {
      const foundExample = RESUME_EXAMPLES.find((ex) => ex.slug === rawSlug);
      if (foundExample?.presetData) {
        resumeDataToDisplay = foundExample.presetData;
        resolvedSlug = foundExample.slug;
      }
    }

    // 5. Check TWENTY_ATS_EXAMPLES
    if (!resumeDataToDisplay) {
      const foundAts = TWENTY_ATS_EXAMPLES.find((ex) => ex.slug === rawSlug || ex.id === rawSlug);
      if (foundAts?.presetData) {
        resumeDataToDisplay = foundAts.presetData;
        resolvedSlug = foundAts.slug;
      }
    }
  }

  // If NO slug or state was provided at all (e.g. direct access to /resume-preview), default cleanly to Alex Morgan
  if (!resumeDataToDisplay && !rawSlug) {
    resumeDataToDisplay = alexMorganData;
    resolvedSlug = 'senior-full-stack-engineer';
  }

  // Handle missing/unrecognized slug gracefully
  if (!resumeDataToDisplay) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 space-y-4 font-sans text-center">
        <h1 className="text-2xl sm:text-3xl font-black">Resume Example Not Found</h1>
        <p className="text-slate-400 text-sm max-w-md">
          We couldn't find a preview matching &quot;{rawSlug}&quot;. Browse our directory of recruiter-approved ATS resume examples.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            ← Go Back
          </button>
          <Link
            to="/resume-examples"
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Explore All Resume Examples
          </Link>
        </div>
      </div>
    );
  }

  return (
    <FullPageResumePreview
      resumeData={resumeDataToDisplay}
      onBack={() => navigate(-1)}
      onUseResume={() => {
        if (resumeDataToDisplay) {
          const fullData: ResumeData = {
            id: (resumeDataToDisplay as any).id || `resume-${resolvedSlug || 'custom'}`,
            title: (resumeDataToDisplay as any).title || `${resumeDataToDisplay.personalInfo?.jobTitle || 'Custom'} Resume`,
            updatedAt: new Date().toISOString(),
            personalInfo: {
              fullName: resumeDataToDisplay.personalInfo?.fullName || '',
              jobTitle: resumeDataToDisplay.personalInfo?.jobTitle || '',
              email: resumeDataToDisplay.personalInfo?.email || '',
              phone: resumeDataToDisplay.personalInfo?.phone || '',
              location: resumeDataToDisplay.personalInfo?.location || '',
              website: resumeDataToDisplay.personalInfo?.website || '',
              linkedin: resumeDataToDisplay.personalInfo?.linkedin || '',
              github: resumeDataToDisplay.personalInfo?.github || ''
            },
            summary: resumeDataToDisplay.summary || '',
            experience: resumeDataToDisplay.experience || [],
            education: resumeDataToDisplay.education || [],
            skills: resumeDataToDisplay.skills || [],
            projects: resumeDataToDisplay.projects || [],
            certifications: resumeDataToDisplay.certifications || [],
            customSections: resumeDataToDisplay.customSections || [],
            formatting: {
              template: resumeDataToDisplay.formatting?.template || 'modern',
              fontFamily: resumeDataToDisplay.formatting?.fontFamily || 'inter',
              fontSize: resumeDataToDisplay.formatting?.fontSize || 'base',
              accentColor: resumeDataToDisplay.formatting?.accentColor || '#0284c7',
              spacing: resumeDataToDisplay.formatting?.spacing || 'normal',
              showIcons: resumeDataToDisplay.formatting?.showIcons ?? true,
              sectionOrder: resumeDataToDisplay.formatting?.sectionOrder || ['summary', 'experience', 'skills', 'education', 'projects', 'certifications']
            }
          };
          updateResume(fullData);
        }
        navigate(`/builder?example=${resolvedSlug || 'custom'}`);
      }}
    />
  );
};


