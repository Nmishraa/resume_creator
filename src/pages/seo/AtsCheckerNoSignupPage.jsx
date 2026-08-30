import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, FileText, CheckCircle2, ArrowRight, ShieldCheck, Target, Lock } from 'lucide-react';

export default function AtsCheckerNoSignupPage() {
  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto', padding: '2.5rem 1.5rem', color: '#1e293b' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#dcfce7', color: '#15803d', padding: '0.35rem 0.9rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
          <Lock size={15} /> 100% Private • No Email Required
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, marginBottom: '1rem' }}>
          ATS Resume Checker Without Signup or Registration
        </h1>

        <p style={{ fontSize: '1.15rem', color: '#475569', maxWidth: '750px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
          Scan your resume text against any job description instantly. Get a immediate ATS score breakdown, missing keyword report, and formatting check without creating an account or giving your email address.
        </p>

        <Link to="/ats-resume-checker" style={{ textDecoration: 'none' }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#16a34a', color: '#ffffff', padding: '0.95rem 2rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 800, border: 'none', cursor: 'pointer', boxShadow: '0 8px 20px -4px rgba(22, 163, 74, 0.4)' }}>
            <Target size={18} /> Test ATS Score Free (No Signup) <ArrowRight size={16} />
          </button>
        </Link>
      </header>

      {/* Why No Signup Matters */}
      <section style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
          Why Job Seekers Prefer Registration-Free ATS Checking
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>Zero Spam or Sales Emails</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
              We don't collect email addresses, create account walls, or send promotional marketing emails.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>Instant Results in Seconds</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
              Paste your resume text and target job description to get an immediate compatibility score in under 3 seconds.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>100% In-Browser Privacy</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
              Text processing is executed locally in your browser session. Your resume is never uploaded to third-party databases.
            </p>
          </div>
        </div>
      </section>

      <footer style={{ textAlign: 'center', background: '#f0fdf4', borderRadius: '16px', padding: '2.5rem 1.5rem', border: '1px solid #bbf7d0' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#166534', marginBottom: '0.5rem' }}>
          Test Your ATS Compatibility Free
        </h3>
        <p style={{ color: '#15803d', marginBottom: '1.5rem', fontSize: '1rem' }}>
          No login, no sign-up, 100% free forever.
        </p>
        <Link to="/ats-resume-checker" style={{ textDecoration: 'none' }}>
          <button style={{ background: '#16a34a', color: '#ffffff', padding: '0.85rem 1.8rem', borderRadius: '10px', fontWeight: 800, border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
            Open Free Scanner Now
          </button>
        </Link>
      </footer>
    </div>
  );
}
