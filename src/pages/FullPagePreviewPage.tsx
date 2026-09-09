import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { FullPageResumePreview } from '../components/common/FullPageResumePreview';
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
import { ResumeData } from '../types/resume';

const HERO_CANDIDATE_MAP: Record<string, Partial<ResumeData>> = {
  'alex-morgan': alexMorganData,
  'sophia-chen': sophiaChen3PageData,
  'marcus-vance': marcusVanceData,
  'elena-rostova': elenaRostovaData,
  'david-miller': davidMillerData,
  'amara-okafor': amaraOkaforData
};

export const FullPagePreviewPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const stateResumeData = (location.state as { resumeData?: Partial<ResumeData> })?.resumeData;
  const slug = searchParams.get('slug') || searchParams.get('id');

  let resumeDataToDisplay: Partial<ResumeData> | undefined = stateResumeData;

  if (!resumeDataToDisplay && slug) {
    // 1. Check Hero Candidate Map
    if (HERO_CANDIDATE_MAP[slug]) {
      resumeDataToDisplay = HERO_CANDIDATE_MAP[slug];
    }

    // 2. Check RESUME_EXAMPLES
    if (!resumeDataToDisplay) {
      const foundExample = RESUME_EXAMPLES.find((ex) => ex.slug === slug);
      if (foundExample?.presetData) {
        resumeDataToDisplay = foundExample.presetData;
      }
    }

    // 3. Check TWENTY_ATS_EXAMPLES
    if (!resumeDataToDisplay) {
      const foundAts = TWENTY_ATS_EXAMPLES.find((ex) => ex.slug === slug || ex.id === slug);
      if (foundAts?.presetData) {
        resumeDataToDisplay = foundAts.presetData;
      }
    }
  }

  // Fallback to Alex Morgan if accessed directly without valid parameter
  if (!resumeDataToDisplay) {
    resumeDataToDisplay = alexMorganData;
  }

  return (
    <FullPageResumePreview
      resumeData={resumeDataToDisplay}
      onBack={() => navigate(-1)}
    />
  );
};

