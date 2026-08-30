import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { api } from './utils/api';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import ResumeExamples from './pages/ResumeExamples';
import AtsTips from './pages/AtsTips';
import CoverLetterGuide from './pages/CoverLetterGuide';
import PublicPortfolio from './pages/PublicPortfolio';
import ApplicationTracker from './pages/ApplicationTracker';

// Feature Pages
import InterviewPrepPage from './pages/InterviewPrepPage';
import LinkedInOptimizerPage from './pages/LinkedInOptimizerPage';

// SEO Public Pages
import AtsCheckerPage from './pages/seo/AtsCheckerPage';
import TemplatesPage from './pages/seo/TemplatesPage';
import GuidePage from './pages/seo/GuidePage';
import SummaryExamplesPage from './pages/seo/SummaryExamplesPage';
import AiEngineerPage from './pages/seo/AiEngineerPage';
import StudentResumePage from './pages/seo/StudentResumePage';
import FreeAiEngineerBuilder from './pages/seo/FreeAiEngineerBuilder';
import EntryLevelAiEngineerPage from './pages/seo/EntryLevelAiEngineerPage';
import RagEngineerPage from './pages/seo/RagEngineerPage';
import FreshGraduatesBuilderPage from './pages/seo/FreshGraduatesBuilderPage';
import AtsCheckerNoSignupPage from './pages/seo/AtsCheckerNoSignupPage';
import CsGradBuilderPage from './pages/seo/CsGradBuilderPage';

// Company Pages & 404
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

import SeoHead from './components/SeoHead';

import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await api.auth.me();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const logout = () => {
    api.auth.logout();
    setUser(null);
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  if (loading) return null;

  return (
    <BrowserRouter>
      <SeoHead />
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar user={user} logout={logout} />
        <div className="main-content" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onAuthSuccess={handleAuthSuccess} />} />
            <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
            <Route path="/editor/:id" element={<Editor user={user} />} />
            <Route path="/examples" element={<ResumeExamples user={user} onAuthSuccess={handleAuthSuccess} />} />
            <Route path="/ats-tips" element={<AtsTips />} />
            <Route path="/cover-letters" element={<CoverLetterGuide />} />
            <Route path="/p/:id" element={<PublicPortfolio />} />
            <Route path="/applications" element={<ApplicationTracker />} />

            {/* Career Tools */}
            <Route path="/interview-prep" element={<InterviewPrepPage />} />
            <Route path="/linkedin-optimizer" element={<LinkedInOptimizerPage />} />

            {/* Public SEO Routes */}
            <Route path="/ats-resume-checker" element={<AtsCheckerPage />} />
            <Route path="/resume-templates" element={<TemplatesPage />} />
            <Route path="/how-to-write-a-resume" element={<GuidePage />} />
            <Route path="/resume-summary-examples" element={<SummaryExamplesPage />} />
            <Route path="/ai-engineer-resume-example" element={<AiEngineerPage />} />
            <Route path="/student-resume-example" element={<StudentResumePage />} />
            <Route path="/free-ai-engineer-resume-builder" element={<FreeAiEngineerBuilder />} />
            <Route path="/entry-level-ai-engineer-resume-example" element={<EntryLevelAiEngineerPage />} />
            <Route path="/rag-engineer-resume-example" element={<RagEngineerPage />} />
            <Route path="/resume-builder-for-fresh-graduates" element={<FreshGraduatesBuilderPage />} />
            <Route path="/ats-resume-checker-without-signup" element={<AtsCheckerNoSignupPage />} />
            <Route path="/computer-science-graduate-resume-builder" element={<CsGradBuilderPage />} />

            {/* Company & Legal Routes */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Catch-all 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
