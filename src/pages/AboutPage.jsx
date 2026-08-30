import React from 'react';
import { Sparkles, Shield, Target, CheckCircle2, ExternalLink } from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem', color: 'var(--text-main, #1e293b)' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', background: 'linear-gradient(135deg, #4f46e5, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          About Resume & CV Craft
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
          Empowering job seekers worldwide with free, AI-driven, ATS-optimized resume building tools and career intelligence.
        </p>
      </header>

      <section style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '1rem', padding: '2rem', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Target style={{ color: '#4f46e5' }} /> Our Mission
        </h2>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#334155' }}>
          Resume & CV Craft was built with a single goal: to level the playing field for candidates. Many top employers screen applicants using Applicant Tracking Systems (ATS). High-quality resume tools shouldn't be locked behind expensive monthly paywalls. We provide 100% free, privacy-first tools to help you stand out and land interviews.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>Why Choose Resume & CV Craft?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div style={{ padding: '1.5rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <Sparkles style={{ color: '#4f46e5', marginBottom: '0.75rem' }} size={28} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>AI-Powered Writing Assistant</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>Generate tailored summary statements and bullet points packed with industry keywords.</p>
          </div>

          <div style={{ padding: '1.5rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <CheckCircle2 style={{ color: '#10b981', marginBottom: '0.75rem' }} size={28} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>ATS-Compliant Formatting</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>Designed for clean text parsing with standard applicant tracking systems.</p>
          </div>

          <div style={{ padding: '1.5rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <Shield style={{ color: '#0284c7', marginBottom: '0.75rem' }} size={28} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>Privacy First & Free</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>No watermarks, no hidden paywalls, and instant client-side vector PDF downloads.</p>
          </div>
        </div>
      </section>

      <section style={{ textAlign: 'center', padding: '2rem', background: '#eff6ff', borderRadius: '1rem', border: '1px solid #bfdbfe' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1e3a8a' }}>Open Source & Developer Community</h3>
        <p style={{ color: '#1e40af', marginBottom: '1rem' }}>Explore the source code or contribute to the project on GitHub.</p>
        <a
          href="https://github.com/Nmishraa/resume_creator"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#1e293b', color: '#ffffff', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600 }}
        >
          <GithubIcon size={18} /> View on GitHub <ExternalLink size={14} />
        </a>
      </section>
    </div>
  );
}
