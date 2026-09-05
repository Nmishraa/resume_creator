import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { FullPageResumePreview } from '../components/common/FullPageResumePreview';
import { RESUME_EXAMPLES } from '../data/resumeExamplesData';
import { ResumeData } from '../types/resume';

export const FullPagePreviewPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const stateResumeData = (location.state as { resumeData?: Partial<ResumeData> })?.resumeData;
  const slug = searchParams.get('slug');

  let resumeDataToDisplay: Partial<ResumeData> | undefined = stateResumeData;

  if (!resumeDataToDisplay && slug) {
    const foundExample = RESUME_EXAMPLES.find((ex) => ex.slug === slug);
    if (foundExample?.presetData) {
      resumeDataToDisplay = foundExample.presetData;
    }
  }

  // Default fallback if accessed without state
  if (!resumeDataToDisplay) {
    resumeDataToDisplay = RESUME_EXAMPLES[0].presetData;
  }

  return (
    <FullPageResumePreview
      resumeData={resumeDataToDisplay}
      onBack={() => navigate(-1)}
    />
  );
};
