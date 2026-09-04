import React from 'react';
import { ResumeInterviewQuestions } from '../interview/ResumeInterviewQuestions';

export default function InterviewPrep({ resumeData }) {
  const initialRole = resumeData?.personal?.role || resumeData?.personalInfo?.jobTitle || '';

  return (
    <div className="py-2">
      <ResumeInterviewQuestions initialRole={initialRole} />
    </div>
  );
}
