import React from 'react';
import { SeoHead } from '../components/common/SeoHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ShieldCheck, Lock } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <SeoHead
        title="Privacy Policy – Data Protection & Security | Resume Craft"
        description="Read the Resume Craft privacy policy. Learn how your resume data is handled with local storage privacy and optional cloud synchronization."
        canonicalPath="/privacy"
      />

      <Breadcrumbs items={[{ name: 'Privacy Policy', path: '/privacy' }]} />

      <header className="space-y-3 pt-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950">Privacy Policy</h1>
        <p className="text-xs text-slate-500">Last updated: January 2026</p>
      </header>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Commitment to Privacy</h2>
          <p>
            At Resume Craft, we respect your privacy. We believe that your personal career history, contact details, and resume data belong strictly to you.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Local-First Architecture &amp; Cloud Sync</h2>
          <p>
            By default, your resume data is stored locally in your web browser via <code>localStorage</code>. When you choose to sign in with Google Firebase Authentication, your data is securely synchronized to your private Firestore database account protected by user-isolated security rules.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. No Sale of Personal Data</h2>
          <p>
            We do not sell, rent, monetize, or trade your personal information or resume contents to any third parties, advertisers, or recruitment agencies.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. AI Processing</h2>
          <p>
            When utilizing AI bullet optimization or summary generation, text snippets are processed securely in memory to generate suggestions and are not used to train public machine learning models without your explicit consent.
          </p>
        </div>
      </div>
    </div>
  );
};
