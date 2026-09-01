import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';

// Dynamic Code Splitting for optimal Core Web Vitals & LCP
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const FreeResumeBuilderPage = lazy(() => import('./pages/FreeResumeBuilderPage').then(m => ({ default: m.FreeResumeBuilderPage })));
const AiResumeBuilderPage = lazy(() => import('./pages/AiResumeBuilderPage').then(m => ({ default: m.AiResumeBuilderPage })));
const AtsCheckerPage = lazy(() => import('./pages/AtsCheckerPage').then(m => ({ default: m.AtsCheckerPage })));
const ResumeScoreCheckerPage = lazy(() => import('./pages/ResumeScoreCheckerPage').then(m => ({ default: m.ResumeScoreCheckerPage })));
const StudentResumeBuilderPage = lazy(() => import('./pages/StudentResumeBuilderPage').then(m => ({ default: m.StudentResumeBuilderPage })));
const NoExperienceResumeBuilderPage = lazy(() => import('./pages/NoExperienceResumeBuilderPage').then(m => ({ default: m.NoExperienceResumeBuilderPage })));
const JobMatcherPage = lazy(() => import('./pages/JobMatcherPage').then(m => ({ default: m.JobMatcherPage })));
const CoverLetterPage = lazy(() => import('./pages/CoverLetterPage').then(m => ({ default: m.CoverLetterPage })));
const TemplatesGalleryPage = lazy(() => import('./pages/TemplatesGalleryPage').then(m => ({ default: m.TemplatesGalleryPage })));
const ResumeExamplesHubPage = lazy(() => import('./pages/ResumeExamplesHubPage').then(m => ({ default: m.ResumeExamplesHubPage })));
const ResumeExampleDetailPage = lazy(() => import('./pages/ResumeExampleDetailPage').then(m => ({ default: m.ResumeExampleDetailPage })));
const GuidesHubPage = lazy(() => import('./pages/GuidesHubPage').then(m => ({ default: m.GuidesHubPage })));
const GuideDetailPage = lazy(() => import('./pages/GuideDetailPage').then(m => ({ default: m.GuideDetailPage })));
const BuilderPage = lazy(() => import('./pages/BuilderPage').then(m => ({ default: m.BuilderPage })));
const JobTrackerPage = lazy(() => import('./pages/JobTrackerPage').then(m => ({ default: m.JobTrackerPage })));
const InterviewPrepPage = lazy(() => import('./pages/InterviewPrepPage').then(m => ({ default: m.InterviewPrepPage })));
const LinkedInOptimizerPage = lazy(() => import('./pages/LinkedInOptimizerPage').then(m => ({ default: m.LinkedInOptimizerPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage').then(m => ({ default: m.HowItWorksPage })));

const LoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-xs font-semibold text-slate-500">Loading Resume Craft...</span>
    </div>
  </div>
);

export function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* Main Index */}
          <Route index element={<HomePage />} />
          
          {/* SEO Landing Pages */}
          <Route path="free-resume-builder" element={<FreeResumeBuilderPage />} />
          <Route path="ai-resume-builder" element={<AiResumeBuilderPage />} />
          <Route path="ats-resume-checker" element={<AtsCheckerPage />} />
          <Route path="ats-checker" element={<AtsCheckerPage />} />
          <Route path="ats-resume-checker-without-signup" element={<AtsCheckerPage />} />
          <Route path="resume-score-checker" element={<ResumeScoreCheckerPage />} />
          <Route path="resume-builder-for-students" element={<StudentResumeBuilderPage />} />
          <Route path="resume-builder-no-experience" element={<NoExperienceResumeBuilderPage />} />
          <Route path="job-description-resume-matcher" element={<JobMatcherPage />} />
          
          {/* Cover Letter & Templates */}
          <Route path="cover-letters" element={<CoverLetterPage />} />
          <Route path="cover-letter-generator" element={<CoverLetterPage />} />
          <Route path="templates" element={<TemplatesGalleryPage />} />
          <Route path="resume-templates" element={<TemplatesGalleryPage />} />

          {/* Resume Examples Hub & Dynamic Detail */}
          <Route path="resume-examples" element={<ResumeExamplesHubPage />} />
          <Route path="resume-examples/:role" element={<ResumeExampleDetailPage />} />

          {/* Career & ATS Guides */}
          <Route path="guides" element={<GuidesHubPage />} />
          <Route path="guides/:slug" element={<GuideDetailPage />} />

          {/* Core Tools */}
          <Route path="builder" element={<BuilderPage />} />
          <Route path="editor/new" element={<BuilderPage />} />
          <Route path="resume-builder" element={<BuilderPage />} />
          <Route path="applications" element={<JobTrackerPage />} />
          <Route path="interview-prep" element={<InterviewPrepPage />} />
          <Route path="linkedin-optimizer" element={<LinkedInOptimizerPage />} />

          {/* Trust & Legal */}
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy" element={<PrivacyPolicyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
