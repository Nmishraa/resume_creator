import React from 'react';
import { AtsCheckerPage } from './AtsCheckerPage';
import { SeoHead } from '../components/common/SeoHead';

export const JobMatcherPage: React.FC = () => {
  return (
    <>
      <SeoHead
        title="Job Description Resume Matcher – ATS Keyword Match Tool | Resume Craft"
        description="Match your resume against any job description to discover missing technical skills, keyword frequency, and recruiter requirements in real-time."
        canonicalPath="/job-description-resume-matcher"
      />
      <AtsCheckerPage />
    </>
  );
};
