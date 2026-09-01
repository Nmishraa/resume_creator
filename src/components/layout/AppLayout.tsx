import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AuthModal } from '../firebase/AuthModal';
import { FirebaseConfigModal } from '../firebase/FirebaseConfigModal';

export const AppLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      
      {/* Global Modals */}
      <AuthModal />
      <FirebaseConfigModal />
    </div>
  );
};
