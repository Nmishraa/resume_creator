import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AuthModal } from '../firebase/AuthModal';
import { FirebaseConfigModal } from '../firebase/FirebaseConfigModal';

export const AppLayout: React.FC = () => {
  const location = useLocation();

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
      
      {/* Global Modals */}
      <AuthModal />
      <FirebaseConfigModal />
    </div>
  );
};

