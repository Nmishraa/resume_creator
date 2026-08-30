import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ExternalLink } from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Footer() {
  return (
    <footer style={{ background: '#0f172a', color: '#94a3b8', borderTop: '1px solid #1e293b', paddingTop: '3rem', paddingBottom: '2rem', marginTop: '4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
        
        {/* Brand Col */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff', fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>
            <Sparkles style={{ color: '#6366f1' }} size={22} /> Resume & CV Craft
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
            Free AI-powered resume builder and ATS checker helping job seekers craft clean, professional resumes and prepare for job applications.
          </p>
        </div>

        {/* AI & Career Tools */}
        <div>
          <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Free AI Tools</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
            <li><Link to="/ats-resume-checker" style={{ color: '#94a3b8', textDecoration: 'none' }}>ATS Resume Checker</Link></li>
            <li><Link to="/resume-templates" style={{ color: '#94a3b8', textDecoration: 'none' }}>ATS Resume Templates</Link></li>
            <li><Link to="/cover-letters" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cover Letter Builder</Link></li>
            <li><Link to="/interview-prep" style={{ color: '#94a3b8', textDecoration: 'none' }}>AI Interview Practice</Link></li>
            <li><Link to="/linkedin-optimizer" style={{ color: '#94a3b8', textDecoration: 'none' }}>LinkedIn Bio Generator</Link></li>
          </ul>
        </div>

        {/* Resume Guides */}
        <div>
          <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Resume Guides</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
            <li><Link to="/how-to-write-a-resume" style={{ color: '#94a3b8', textDecoration: 'none' }}>How to Write a Resume</Link></li>
            <li><Link to="/resume-summary-examples" style={{ color: '#94a3b8', textDecoration: 'none' }}>Resume Summary Samples</Link></li>
            <li><Link to="/ai-engineer-resume-example" style={{ color: '#94a3b8', textDecoration: 'none' }}>AI Engineer Resume Example</Link></li>
            <li><Link to="/student-resume-example" style={{ color: '#94a3b8', textDecoration: 'none' }}>Student Resume Example</Link></li>
            <li><Link to="/examples" style={{ color: '#94a3b8', textDecoration: 'none' }}>All Resume Examples</Link></li>
            <li><Link to="/ats-tips" style={{ color: '#94a3b8', textDecoration: 'none' }}>Top 10 ATS Secrets</Link></li>
          </ul>
        </div>

        {/* Company & Legal */}
        <div>
          <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Company & Legal</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
            <li><Link to="/about" style={{ color: '#94a3b8', textDecoration: 'none' }}>About Resume & CV Craft</Link></li>
            <li><Link to="/privacy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</Link></li>
            <li><Link to="/contact" style={{ color: '#94a3b8', textDecoration: 'none' }}>Contact & Support</Link></li>
          </ul>
        </div>

      </div>

      <div style={{ maxWidth: '1200px', margin: '2rem auto 0', padding: '1.5rem 1.5rem 0', borderTop: '1px solid #1e293b', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
        © 2026 Resume & CV Craft (resume-cv-craft.web.app). All rights reserved. Free AI Resume Builder & ATS Resume Checker.
      </div>
    </footer>
  );
}
