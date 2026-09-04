import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { HomePage } from './pages/HomePage';

// Resilient lazy loader wrapper that auto-reloads page once on deployment asset hash updates
function lazyWithRetry<T extends React.ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
  return lazy(async () => {
    const pageHasBeenReloaded = sessionStorage.getItem('chunk_reload_retry');
    try {
      const component = await componentImport();
      sessionStorage.removeItem('chunk_reload_retry');
      return component;
    } catch (error) {
      if (!pageHasBeenReloaded) {
        sessionStorage.setItem('chunk_reload_retry', 'true');
        window.location.reload();
        return new Promise(() => {});
      }
      throw error;
    }
  });
}

// Lazy-load route chunks to minimize initial bundle size and optimize Lighthouse performance
const BuilderPage = lazyWithRetry(() => import('./pages/BuilderPage').then(m => ({ default: m.BuilderPage })));
const FreeResumeBuilderPage = lazyWithRetry(() => import('./pages/FreeResumeBuilderPage').then(m => ({ default: m.FreeResumeBuilderPage })));
const AiResumeBuilderPage = lazyWithRetry(() => import('./pages/AiResumeBuilderPage').then(m => ({ default: m.AiResumeBuilderPage })));
const AtsCheckerPage = lazyWithRetry(() => import('./pages/AtsCheckerPage').then(m => ({ default: m.AtsCheckerPage })));
const ResumeScoreCheckerPage = lazyWithRetry(() => import('./pages/ResumeScoreCheckerPage').then(m => ({ default: m.ResumeScoreCheckerPage })));
const StudentResumeBuilderPage = lazyWithRetry(() => import('./pages/StudentResumeBuilderPage').then(m => ({ default: m.StudentResumeBuilderPage })));
const NoExperienceResumeBuilderPage = lazyWithRetry(() => import('./pages/NoExperienceResumeBuilderPage').then(m => ({ default: m.NoExperienceResumeBuilderPage })));
const JobMatcherPage = lazyWithRetry(() => import('./pages/JobMatcherPage').then(m => ({ default: m.JobMatcherPage })));
const CoverLetterPage = lazyWithRetry(() => import('./pages/CoverLetterPage').then(m => ({ default: m.CoverLetterPage })));
const TemplatesGalleryPage = lazyWithRetry(() => import('./pages/TemplatesGalleryPage').then(m => ({ default: m.TemplatesGalleryPage })));
const ResumeExamplesHubPage = lazyWithRetry(() => import('./pages/ResumeExamplesHubPage').then(m => ({ default: m.ResumeExamplesHubPage })));
const ResumeExampleDetailPage = lazyWithRetry(() => import('./pages/ResumeExampleDetailPage').then(m => ({ default: m.ResumeExampleDetailPage })));
const GuidesHubPage = lazyWithRetry(() => import('./pages/GuidesHubPage').then(m => ({ default: m.GuidesHubPage })));
const GuideDetailPage = lazyWithRetry(() => import('./pages/GuideDetailPage').then(m => ({ default: m.GuideDetailPage })));
const JobTrackerPage = lazyWithRetry(() => import('./pages/JobTrackerPage').then(m => ({ default: m.JobTrackerPage })));
const InterviewPrepPage = lazyWithRetry(() => import('./pages/InterviewPrepPage').then(m => ({ default: m.InterviewPrepPage })));
const InterviewQuestionsPage = lazyWithRetry(() => import('./pages/InterviewQuestionsPage').then(m => ({ default: m.InterviewQuestionsPage })));
const LinkedInOptimizerPage = lazyWithRetry(() => import('./pages/LinkedInOptimizerPage').then(m => ({ default: m.LinkedInOptimizerPage })));
const AboutPage = lazyWithRetry(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazyWithRetry(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazyWithRetry(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazyWithRetry(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const HowItWorksPage = lazyWithRetry(() => import('./pages/HowItWorksPage').then(m => ({ default: m.HowItWorksPage })));
const FaqPage = lazyWithRetry(() => import('./pages/FaqPage').then(m => ({ default: m.FaqPage })));
const AtsResumeBuilderPage = lazyWithRetry(() => import('./pages/seo/AtsResumeBuilderPage').then(m => ({ default: m.AtsResumeBuilderPage })));
const SoftwareEngineerBuilderPage = lazyWithRetry(() => import('./pages/seo/SoftwareEngineerBuilderPage').then(m => ({ default: m.SoftwareEngineerBuilderPage })));
const KeywordMatcherPage = lazyWithRetry(() => import('./pages/seo/KeywordMatcherPage').then(m => ({ default: m.KeywordMatcherPage })));

const RouteLoadingFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center p-8">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Loading Resume Craft...</span>
    </div>
  </div>
);

export function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoadingFallback />}>
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
            <Route path="interview-questions" element={<InterviewQuestionsPage />} />
            <Route path="interview-prep" element={<InterviewQuestionsPage />} />
            <Route path="linkedin-optimizer" element={<LinkedInOptimizerPage />} />

            {/* Legacy Auth & Login Aliases Redirect */}
            <Route path="login" element={<Navigate to="/" replace />} />
            <Route path="signin" element={<Navigate to="/" replace />} />
            <Route path="signup" element={<Navigate to="/" replace />} />

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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
