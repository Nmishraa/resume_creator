import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#020617', color: '#cbd5e1', borderTop: '1px solid #1e293b', paddingTop: '3.5rem', paddingBottom: '2.5rem', marginTop: '4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
        
        {/* Brand Col */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff', fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>
            <Sparkles style={{ color: '#6366f1' }} size={22} /> Resume Craft
          </div>
          <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1rem' }}>
            Free AI-powered resume builder and ATS checker helping job seekers craft clean, professional resumes and prepare for job applications.
          </p>
        </div>

        {/* Free Resume Tools */}
        <div>
          <h3 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Free Resume Tools</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.95rem', fontWeight: 500 }}>
            <li><Link to="/resume-builder" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Resume Builder</Link></li>
            <li><Link to="/ai-resume-builder" style={{ color: '#e2e8f0', textDecoration: 'none' }}>AI Resume Builder</Link></li>
            <li><Link to="/ats-resume-builder" style={{ color: '#e2e8f0', textDecoration: 'none' }}>ATS Resume Builder</Link></li>
            <li><Link to="/ats-resume-checker" style={{ color: '#e2e8f0', textDecoration: 'none' }}>ATS Resume Checker</Link></li>
            <li><Link to="/job-description-resume-matcher" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Resume Keyword Matcher</Link></li>
            <li><Link to="/cover-letter-builder" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Cover Letter Builder</Link></li>
            <li><Link to="/interview-questions" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Interview Questions</Link></li>
          </ul>
        </div>

        {/* Resume Examples & Templates */}
        <div>
          <h3 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Examples &amp; Templates</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.95rem', fontWeight: 500 }}>
            <li><Link to="/resume-examples" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Resume Examples</Link></li>
            <li><Link to="/resume-templates" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Resume Templates</Link></li>
            <li><Link to="/resume-examples/software-engineer" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Software Engineer Resume</Link></li>
            <li><Link to="/resume-examples/product-manager" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Product Manager Resume</Link></li>
            <li><Link to="/resume-examples/enterprise-architect" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Enterprise Architect Resume</Link></li>
            <li><Link to="/guides/how-to-make-ats-friendly-resume" style={{ color: '#e2e8f0', textDecoration: 'none' }}>How to Make ATS Resume</Link></li>
          </ul>
        </div>

        {/* Company & Legal */}
        <div>
          <h3 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company &amp; Legal</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.95rem', fontWeight: 500 }}>
            <li><Link to="/about" style={{ color: '#e2e8f0', textDecoration: 'none' }}>About Resume Craft</Link></li>
            <li><Link to="/contact" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Contact &amp; Support</Link></li>
            <li><Link to="/privacy" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Privacy Policy</Link></li>
            <li><Link to="/terms" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Terms of Service</Link></li>
          </ul>
        </div>

      </div>

      <div style={{ maxWidth: '1200px', margin: '2rem auto 0', padding: '1.5rem 1.5rem 0', borderTop: '1px solid #1e293b', textAlign: 'center', fontSize: '0.9rem', color: '#94a3b8', fontWeight: 600 }}>
        © {new Date().getFullYear()} Resume Craft (https://resume.gnanamai.com/). All rights reserved. Free AI Resume Builder &amp; ATS Resume Checker.
      </div>
    </footer>
  );
}
