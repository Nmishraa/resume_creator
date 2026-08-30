import React, { useState } from 'react';
import { api } from '../utils/api';

export default function Login({ onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (email && password) {
      try {
        let res;
        if (isSignUp) {
          res = await api.auth.signup(email, password, name);
        } else {
          res = await api.auth.login(email, password);
        }
        if (res && res.user && onAuthSuccess) {
          onAuthSuccess(res.user);
        }
      } catch (err) {
        setError(err.message || 'Authentication failed');
      }
    }
  };

  const handleDemoLogin = async () => {
    setError(null);
    setMessage(null);
    try {
      const res = await api.auth.login('demo@example.com', 'password123');
      if (res && res.user && onAuthSuccess) {
        onAuthSuccess(res.user);
      }
    } catch {
      // If demo user isn't seeded yet, fall back to guest
      try {
        const res = await api.auth.guest();
        if (res && res.user && onAuthSuccess) {
          onAuthSuccess(res.user);
        }
      } catch (guestErr) {
        setError(guestErr.message || 'Demo login failed');
      }
    }
  };

  const handleGuestLogin = async () => {
    setError(null);
    setMessage(null);
    try {
      const res = await api.auth.guest();
      if (res && res.user && onAuthSuccess) {
        onAuthSuccess(res.user);
      }
    } catch (err) {
      setError(err.message || 'Guest login failed');
    }
  };

  const generateRandomEmail = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let prefix = '';
    for (let i = 0; i < 6; i++) {
      prefix += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const domains = ['example.com', 'mail.com', 'workspace.io', 'devmail.org'];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    setEmail(`${prefix}${randNum}@${domain}`);
    setPassword('password123');
  };

  const handleReset = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError(null);
    setMessage(null);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.error(err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="auth-page-wrapper" style={{ minHeight: 'calc(100vh - 72px)', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', padding: '3rem 1.5rem 5rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', alignItems: 'flex-start' }}>
        
        {/* Left Column: Feature Showcase & Discoverability */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#e0e7ff', color: '#4338ca', padding: '0.4rem 0.85rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 800, width: 'fit-content', marginBottom: '1.25rem' }}>
            <span>✨ Free Online AI Resume Creator & CV Builder</span>
          </div>

          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0f172a', lineHeight: '1.15', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            Build Professional Resumes That Pass ATS & Get Hired.
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: '1.6', marginBottom: '2rem' }}>
            Create ATS-friendly resumes in minutes with live previews, multi-tone AI bullet rewriters, job matcher, and instant PDF download.
          </p>

          {/* Feature Highlights Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '0.98rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.3rem' }}>⚡ Live ATS Scoring</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.4' }}>
                Real-time 0–100 score checklist and instant improvement feedback.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '0.98rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.3rem' }}>📄 Instant PDF Export</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.4' }}>
                Pixel-perfect PDF export directly to your device with zero paywalls.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '0.98rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.3rem' }}>🎯 Job Description Matcher</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.4' }}>
                Paste any target job description to instantly find missing keywords.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '0.98rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.3rem' }}>🎨 5 Polished ATS Templates</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.4' }}>
                Modern, Minimalist, Creative, Executive, and Tech themes.
              </p>
            </div>
          </div>

          {/* Quick FAQ Box */}
          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.4rem' }}>
              ❓ Is Resume & CV Craft completely free?
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0 }}>
              Yes! Resume & CV Craft is 100% free to build, edit, tailor, and download your resume without subscriptions or paywalls.
            </p>
          </div>
        </div>

        {/* Right Column: Clean Login / Signup Card */}
        <div className="auth-card" style={{ width: '100%', padding: '2.5rem', background: '#ffffff', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.12)', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.4rem', textAlign: 'center' }}>
            Resume & CV Craft Workspace
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.75rem', textAlign: 'center' }}>
            {isSignUp ? 'Create a free account to get started' : 'Sign in to access your resumes & cover letters'}
          </p>
          
          {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem', padding: '0.5rem', background: '#fef2f2', borderRadius: '6px' }}>{error}</div>}
          {message && <div style={{ color: '#059669', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem', padding: '0.5rem', background: '#f0fdf4', borderRadius: '6px' }}>{message}</div>}

          <div className="flex-row" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
            <button type="button" className="btn btn-google flex-1" onClick={handleDemoLogin}>
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FABB05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Demo Sign-In
            </button>
            
            <button type="button" className="btn btn-secondary flex-1" onClick={handleGuestLogin} title="Try without an account">
              Guest Access
            </button>
          </div>

          <div className="divider">
            <span>or use email</span>
          </div>

          <form onSubmit={handleSubmit} autoComplete="on">
            {isSignUp && (
              <div className="form-group">
                <label htmlFor="full-name" className="label">Full Name</label>
                <input 
                  id="full-name"
                  name="fullName"
                  type="text" 
                  className="input-field" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Developer"
                  autoComplete="name"
                  aria-label="Full Name"
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email-address" className="label">Email Address</label>
              <input 
                id="email-address"
                name="email"
                type="email" 
                className="input-field" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                aria-label="Email Address"
                aria-required="true"
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="account-password" className="label">Password</label>
              <input 
                id="account-password"
                name="password"
                type="password" 
                className="input-field" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                aria-label="Password"
                aria-required="true"
                required 
              />
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <button type="submit" className="btn btn-primary w-full" style={{ padding: '0.8rem', width: '100%', borderRadius: '8px', fontWeight: 800 }}>
                {isSignUp ? 'Create Account' : 'Sign In with Email'}
              </button>
            </div>
          </form>

          <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-light)' }}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              type="button" 
              onClick={() => setIsSignUp(!isSignUp)}
              className="link-btn"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}

