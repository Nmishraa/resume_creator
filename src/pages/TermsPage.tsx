import React from 'react';
import { SeoHead } from '../components/common/SeoHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <SeoHead
        title="Terms of Service | Resume Craft"
        description="Read the Terms of Service for using Resume Craft free resume builder, ATS checker, and career tools."
        canonicalPath="/terms"
      />

      <Breadcrumbs items={[{ name: 'Terms of Service', path: '/terms' }]} />

      <header className="space-y-3 pt-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950">Terms of Service</h1>
        <p className="text-xs text-slate-500">Last updated: January 2026</p>
      </header>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Resume Craft (https://resume-cv-craft.web.app), you agree to be bound by these Terms of Service. If you disagree with any part, you may discontinue use of the platform.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Free Use of Service</h2>
          <p>
            Resume Craft is provided as a free software platform for personal resume building, ATS checking, and job application tracking.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. User Responsibility</h2>
          <p>
            You are responsible for ensuring the accuracy and truthfulness of all employment history, educational credentials, and personal information you enter into the application.
          </p>
        </div>
      </div>
    </div>
  );
};
