import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AuthModal } from '../firebase/AuthModal';
import { FirebaseConfigModal } from '../firebase/FirebaseConfigModal';
import { CookieConsentBanner } from '../common/CookieConsentBanner';
import { initGA, trackPageView, trackResumeBuilderOpened } from '../../services/analytics';

export const AppLayout: React.FC = () => {
  const location = useLocation();

  // Initialize GA4 script tag & consent mode on mount
  useEffect(() => {
    initGA();
  }, []);

  // Track SPA Page Views & Resume Builder Open events on location changes
  useEffect(() => {
    trackPageView(location.pathname + location.search);

    const isBuilder =
      location.pathname === '/builder' ||
      location.pathname === '/resume-builder' ||
      location.pathname.startsWith('/editor');

    if (isBuilder) {
      trackResumeBuilderOpened(location.pathname);
    }
  }, [location.pathname, location.search]);

  // Check if current page is the resume builder or editor workspace
  const isBuilderPage =
    location.pathname === '/builder' ||
    location.pathname === '/resume-builder' ||
    location.pathname.startsWith('/editor');

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      {!isBuilderPage && <Navbar />}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      {!isBuilderPage && <Footer />}

      {/* Global Modals & Banners */}
      <AuthModal />
      <FirebaseConfigModal />
      <CookieConsentBanner />
    </div>
  );
};
