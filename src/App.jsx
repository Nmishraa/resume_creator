import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { api } from './utils/api';
import Navbar from './components/Navbar';
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
import SalaryGuidePage from './pages/SalaryGuidePage';

// SEO Public Pages
import AtsCheckerPage from './pages/seo/AtsCheckerPage';
import TemplatesPage from './pages/seo/TemplatesPage';
import GuidePage from './pages/seo/GuidePage';
import SummaryExamplesPage from './pages/seo/SummaryExamplesPage';
import AiEngineerPage from './pages/seo/AiEngineerPage';
import StudentResumePage from './pages/seo/StudentResumePage';

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
      <div className="app-container">
        <Navbar user={user} logout={logout} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login onAuthSuccess={handleAuthSuccess} />} />
            <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
            <Route path="/editor/:id" element={user ? <Editor user={user} /> : <Navigate to="/" />} />
            <Route path="/examples" element={<ResumeExamples user={user} onAuthSuccess={handleAuthSuccess} />} />
            <Route path="/ats-tips" element={<AtsTips />} />
            <Route path="/cover-letters" element={<CoverLetterGuide />} />
            <Route path="/p/:id" element={<PublicPortfolio />} />
            <Route path="/applications" element={<ApplicationTracker />} />

            {/* Career Tools */}
            <Route path="/interview-prep" element={<InterviewPrepPage />} />
            <Route path="/linkedin-optimizer" element={<LinkedInOptimizerPage />} />
            <Route path="/salary-guide" element={<SalaryGuidePage />} />

            {/* Public SEO Routes */}
            <Route path="/ats-resume-checker" element={<AtsCheckerPage />} />
            <Route path="/resume-templates" element={<TemplatesPage />} />
            <Route path="/how-to-write-a-resume" element={<GuidePage />} />
            <Route path="/resume-summary-examples" element={<SummaryExamplesPage />} />
            <Route path="/ai-engineer-resume-example" element={<AiEngineerPage />} />
            <Route path="/student-resume-example" element={<StudentResumePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
