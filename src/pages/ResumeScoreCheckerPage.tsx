import React from 'react';
import { AtsCheckerPage } from './AtsCheckerPage';
import { SeoHead } from '../components/common/SeoHead';

export const ResumeScoreCheckerPage: React.FC = () => {
  return (
    <>
      <SeoHead
        title="Free Resume Score Checker – Instant ATS Analysis & Feedback | Resume Craft"
        description="Evaluate your resume formatting, keyword match, and bullet strength with our free real-time resume score checker. Get actionable steps to reach a 90+ score."
        canonicalPath="/resume-score-checker"
      />
      <AtsCheckerPage />
    </>
  );
};
