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
    <div className="auth-container" style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '2rem 1rem' }}>
      <div style={{ position: 'absolute', top: '1.5rem', right: '2rem' }}>
        <button 
          type="button" 
          onClick={toggleFullScreen}
          className="btn btn-secondary"
          style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', borderRadius: '8px' }}
        >
          🖥️ Full Screen
        </button>
      </div>

      <div className="auth-card" style={{ width: '100%', maxWidth: '520px', padding: '2.5rem', background: '#ffffff', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
        <h1 className="auth-title">ResumeCraft Workspace</h1>
        <p className="auth-subtitle">
          {isSignUp ? 'Create an account to get started' : 'Sign in to start building your resume'}
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

        <form onSubmit={handleSubmit} autoComplete="off">
          {isSignUp && (
            <div className="form-group">
              <label className="label">Full Name</label>
              <input 
                type="text" 
                className="input-field" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Developer"
                autoComplete="off"
              />
            </div>
          )}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="label">Email Address</label>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <button 
                  type="button" 
                  onClick={generateRandomEmail}
                  style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.8rem', cursor: 'pointer', fontWeight: '600' }}
                >
                  ✨ Random Email
                </button>
                <button 
                  type="button" 
                  onClick={handleReset}
                  style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '0.8rem', cursor: 'pointer', fontWeight: '600' }}
                >
                  🔄 Reset
                </button>
              </div>
            </div>
            <input 
              type="email" 
              className="input-field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex.user99@example.com"
              autoComplete="new-password"
              required 
            />
          </div>
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="label">Password</label>
            </div>
            <input 
              type="password" 
              className="input-field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              required 
            />
          </div>

          
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button type="submit" className="btn btn-primary flex-1" style={{ padding: '0.8rem' }}>
              {isSignUp ? 'Create Account' : 'Sign In with Email'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ padding: '0.8rem 1.2rem', color: '#64748b' }}>
              Reset
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
  );
}
