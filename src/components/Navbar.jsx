import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, LogOut, LayoutDashboard, Sparkles, Target, Mail, Briefcase } from 'lucide-react';

export default function Navbar({ user, logout }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem 2rem', background: '#ffffff', borderBottom: '1px solid #e2e8f0', sticky: 'top', zIndex: 50 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.25rem', color: '#0f172a' }}>
            <FileText size={26} color="var(--accent, #4f46e5)" />
            <span>ResumeCraft</span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {user && (
            <Link
              to="/dashboard"
              style={{
                textDecoration: 'none',
                padding: '0.45rem 0.8rem',
                borderRadius: '8px',
                color: isActive('/dashboard') ? '#4f46e5' : '#475569',
                background: isActive('/dashboard') ? '#e0e7ff' : 'transparent',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                transition: 'all 0.2s ease'
              }}
            >
              <LayoutDashboard size={15} /> Dashboard
            </Link>
          )}

          <Link
            to="/examples"
            style={{
              textDecoration: 'none',
              padding: '0.45rem 0.8rem',
              borderRadius: '8px',
              color: isActive('/examples') ? '#4f46e5' : '#475569',
              background: isActive('/examples') ? '#e0e7ff' : 'transparent',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Sparkles size={15} /> Examples
          </Link>

          <Link
            to="/ats-tips"
            style={{
              textDecoration: 'none',
              padding: '0.45rem 0.8rem',
              borderRadius: '8px',
              color: isActive('/ats-tips') ? '#4f46e5' : '#475569',
              background: isActive('/ats-tips') ? '#e0e7ff' : 'transparent',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Target size={15} /> ATS Tips
          </Link>

          <Link
            to="/cover-letters"
            style={{
              textDecoration: 'none',
              padding: '0.45rem 0.8rem',
              borderRadius: '8px',
              color: isActive('/cover-letters') ? '#4f46e5' : '#475569',
              background: isActive('/cover-letters') ? '#e0e7ff' : 'transparent',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Mail size={15} /> Cover Letters
          </Link>

          {user && (
            <Link
              to="/applications"
              style={{
                textDecoration: 'none',
                padding: '0.45rem 0.8rem',
                borderRadius: '8px',
                color: isActive('/applications') ? '#4f46e5' : '#475569',
                background: isActive('/applications') ? '#e0e7ff' : 'transparent',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                transition: 'all 0.2s ease'
              }}
            >
              <Briefcase size={15} /> App Tracker
            </Link>
          )}
        </div>
      </div>

      {user ? (
        <div className="nav-user" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="flex-row" style={{ alignItems: 'center', gap: '0.6rem' }}>
            {user.photoURL && <img src={user.photoURL} alt="Profile" className="user-img" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>{user.name || user.displayName || (user.email ? user.email.split('@')[0] : 'Guest User')}</span>
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{user.email || 'Guest Mode'}</span>
            </div>
          </div>
          <button onClick={logout} className="btn-secondary" style={{ padding: '0.45rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', borderRadius: '8px', cursor: 'pointer', border: '1px solid #cbd5e1', background: '#ffffff', color: '#334155', fontWeight: 700, fontSize: '0.85rem' }}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      ) : (
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button className="btn-primary" style={{ padding: '0.55rem 1.2rem', borderRadius: '8px', background: '#4f46e5', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}>
            Sign In / Guest Access
          </button>
        </Link>
      )}
    </nav>
  );
}
