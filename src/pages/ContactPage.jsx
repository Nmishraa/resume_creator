import React, { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';

const GithubIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '2rem 1.5rem', color: '#1e293b' }}>
      <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0f172a' }}>
          Contact & Support
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
          Have feedback, feature requests, or need help with Resume & CV Craft? Reach out to us.
        </p>
      </header>

      {submitted ? (
        <div style={{ padding: '2.5rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '1rem', textAlign: 'center', color: '#166534' }}>
          <CheckCircle size={48} style={{ marginBottom: '1rem', color: '#22c55e' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Thank You!</h2>
          <p>Your message has been received. We will respond to your inquiry shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Your Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Jane Doe"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', fontSize: '1rem' }}
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="jane@example.com"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', fontSize: '1rem' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Message</label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="How can we help you?"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', fontSize: '1rem', fontFamily: 'inherit' }}
            />
          </div>

          <button
            type="submit"
            style={{ width: '100%', padding: '0.85rem', background: '#4f46e5', color: '#ffffff', border: 'none', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            <Send size={18} /> Send Message
          </button>
        </form>
      )}

      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1.5rem', textAlign: 'center' }}>
        <div>
          <Mail size={24} style={{ color: '#4f46e5', marginBottom: '0.5rem' }} />
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Email Support</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>support@resume-cv-craft.web.app</p>
        </div>
        <div>
          <GithubIcon size={24} />
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginTop: '0.5rem' }}>GitHub Community</h3>
          <a href="https://github.com/Nmishraa/resume_creator" target="_blank" rel="noopener noreferrer" style={{ color: '#4f46e5', fontSize: '0.9rem', textDecoration: 'none' }}>
            Report Issues & Feedback
          </a>
        </div>
      </div>
    </div>
  );
}
