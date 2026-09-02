import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';

import { HomePage } from './pages/HomePage';
import { FreeResumeBuilderPage } from './pages/FreeResumeBuilderPage';
import { AiResumeBuilderPage } from './pages/AiResumeBuilderPage';
import { AtsCheckerPage } from './pages/AtsCheckerPage';
import { ResumeScoreCheckerPage } from './pages/ResumeScoreCheckerPage';
import { StudentResumeBuilderPage } from './pages/StudentResumeBuilderPage';
import { NoExperienceResumeBuilderPage } from './pages/NoExperienceResumeBuilderPage';
import { JobMatcherPage } from './pages/JobMatcherPage';
import { CoverLetterPage } from './pages/CoverLetterPage';
import { TemplatesGalleryPage } from './pages/TemplatesGalleryPage';
import { ResumeExamplesHubPage } from './pages/ResumeExamplesHubPage';
import { ResumeExampleDetailPage } from './pages/ResumeExampleDetailPage';
import { GuidesHubPage } from './pages/GuidesHubPage';
import { GuideDetailPage } from './pages/GuideDetailPage';
import { BuilderPage } from './pages/BuilderPage';
import { JobTrackerPage } from './pages/JobTrackerPage';
import { InterviewPrepPage } from './pages/InterviewPrepPage';
import { LinkedInOptimizerPage } from './pages/LinkedInOptimizerPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FaqPage } from './pages/FaqPage';
import { AtsResumeBuilderPage } from './pages/seo/AtsResumeBuilderPage';
import { SoftwareEngineerBuilderPage } from './pages/seo/SoftwareEngineerBuilderPage';
import { KeywordMatcherPage } from './pages/seo/KeywordMatcherPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* Main Index */}
        <Route index element={<HomePage />} />
        
        {/* Dedicated Google-Targeted SEO Landing Pages */}
        <Route path="free-resume-builder" element={<FreeResumeBuilderPage />} />
        <Route path="free-ai-resume-builder" element={<Navigate to="/free-resume-builder" replace />} />
        <Route path="ai-resume-builder" element={<AiResumeBuilderPage />} />
        <Route path="ats-resume-builder" element={<AtsResumeBuilderPage />} />
        <Route path="ats-resume-checker" element={<AtsCheckerPage />} />
        <Route path="ats-checker" element={<Navigate to="/ats-resume-checker" replace />} />
        <Route path="ats-methodology" element={<Navigate to="/ats-resume-checker" replace />} />
        <Route path="ats-resume-checker-without-signup" element={<Navigate to="/ats-resume-checker" replace />} />
        <Route path="resume-score-checker" element={<ResumeScoreCheckerPage />} />
        <Route path="resume-builder-for-students" element={<StudentResumeBuilderPage />} />
        <Route path="student-resume-example" element={<Navigate to="/resume-builder-for-students" replace />} />
        <Route path="resume-builder-no-experience" element={<NoExperienceResumeBuilderPage />} />
        <Route path="resume-builder-for-software-engineers" element={<SoftwareEngineerBuilderPage />} />
        <Route path="job-description-resume-matcher" element={<JobMatcherPage />} />
        <Route path="resume-keyword-matcher" element={<KeywordMatcherPage />} />
        
        {/* Cover Letter & Templates */}
        <Route path="cover-letters" element={<CoverLetterPage />} />
        <Route path="cover-letter-generator" element={<Navigate to="/cover-letters" replace />} />
        <Route path="templates" element={<Navigate to="/resume-templates" replace />} />
        <Route path="resume-templates" element={<TemplatesGalleryPage />} />

        {/* Resume Examples Hub & Dynamic Detail */}
        <Route path="resume-examples" element={<ResumeExamplesHubPage />} />
        <Route path="examples" element={<Navigate to="/resume-examples" replace />} />
        <Route path="resume-examples/:role" element={<ResumeExampleDetailPage />} />

        {/* Career & ATS Guides */}
        <Route path="guides" element={<GuidesHubPage />} />
        <Route path="guides/:slug" element={<GuideDetailPage />} />

        {/* Core Tools & Editor Aliases */}
        <Route path="builder" element={<BuilderPage />} />
        <Route path="editor/demo" element={<BuilderPage />} />
        <Route path="editor/:id" element={<BuilderPage />} />
        <Route path="editor/new" element={<BuilderPage />} />
        <Route path="resume-builder" element={<BuilderPage />} />
        <Route path="applications" element={<JobTrackerPage />} />
        <Route path="interview-prep" element={<InterviewPrepPage />} />
        <Route path="linkedin-optimizer" element={<LinkedInOptimizerPage />} />

        {/* Trust & Legal */}
        <Route path="faq" element={<FaqPage />} />
        <Route path="faqs" element={<Navigate to="/faq" replace />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy" element={<PrivacyPolicyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="how-it-works" element={<HowItWorksPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
