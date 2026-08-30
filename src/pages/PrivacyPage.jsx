import React, { useState } from 'react';
import { ShieldCheck, Lock, Trash2, CheckCircle2 } from 'lucide-react';
import { api } from '../utils/api';

export default function PrivacyPage() {
  const [cleared, setCleared] = useState(false);

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to delete all your locally saved resume drafts and data? This action cannot be undone.')) {
      api.auth.logout();
      setCleared(true);
      setTimeout(() => setCleared(false), 5000);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem', color: '#1e293b' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0f172a' }}>
          Privacy Policy & Local Data Controls
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Last updated: August 30, 2026</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', lineHeight: 1.7, color: '#334155' }}>
        
        {/* Interactive Privacy Control Box */}
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#166534', fontWeight: 800, fontSize: '1.1rem' }}>
            <ShieldCheck size={24} /> 100% Private Client-Side Storage
          </div>
          <p style={{ fontSize: '0.95rem', color: '#14532d', margin: 0 }}>
            Your resume drafts and ATS score scans are saved directly in your browser's local memory (`localStorage`). You have 100% ownership of your candidate data.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <button
              onClick={handleClearData}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#dc2626', color: '#ffffff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
            >
              <Trash2 size={16} /> Delete My Local Draft Data
            </button>

            {cleared && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#16a34a', fontWeight: 700, fontSize: '0.9rem' }}>
                <CheckCircle2 size={18} /> All local drafts & session tokens cleared!
              </span>
            )}
          </div>
        </div>

        <section style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4f46e5' }}>
            <Lock size={20} /> 1. Data Security & Storage
          </h2>
          <p>
            At Resume & CV Craft, your privacy is our top priority. Resume data you create or edit using our tools remains stored safely in your browser session or encrypted local storage. We do not sell, rent, or trade your personal resume information to third-party recruiters or data brokers.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0f172a' }}>
            2. Information We Collect
          </h2>
          <p>
            When you use guest mode, zero personal identification data is sent to our servers. If you create an account, we store minimal authentication details (such as your email address and encrypted password) solely to save and synchronize your draft resumes.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0f172a' }}>
            3. PDF Generation & Client-Side Processing
          </h2>
          <p>
            All PDF resumes generated via Resume & CV Craft are compiled directly inside your browser using HTML5 vector rendering engines. Your generated resume PDFs are never uploaded to or stored on external document processing servers.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0f172a' }}>
            4. Contact Us
          </h2>
          <p>
            If you have questions regarding this Privacy Policy or your data, please contact our support team at <a href="mailto:support@resume-cv-craft.web.app" style={{ color: '#4f46e5', fontWeight: 600 }}>support@resume-cv-craft.web.app</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
