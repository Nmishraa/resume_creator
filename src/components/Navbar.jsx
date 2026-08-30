import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, LogOut, LayoutDashboard, Sparkles, Target, Mail, Briefcase, HelpCircle, Share2, DollarSign, Menu, X } from 'lucide-react';

export default function Navbar({ user, logout }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="navbar" aria-label="Main Navigation" style={{ position: 'sticky', top: 0, zIndex: 100, background: '#ffffff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1.5rem', width: '100%' }}>
        
        {/* Brand */}
        <Link to="/" onClick={closeMobileMenu} style={{ textDecoration: 'none' }}>
          <div className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.2rem', color: '#0f172a' }}>
            <FileText size={26} color="var(--accent, #4f46e5)" />
            <span>Resume & CV Craft</span>
          </div>
        </Link>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          style={{ display: 'none', background: 'transparent', border: 'none', color: '#0f172a', padding: '0.5rem', cursor: 'pointer', minHeight: '44px', minWidth: '44px' }}
          className="mobile-menu-btn"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Desktop Nav Links */}
        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexWrap: 'wrap' }}>
          {user && (
            <Link
              to="/dashboard"
              onClick={closeMobileMenu}
              style={{
                textDecoration: 'none',
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                color: isActive('/dashboard') ? '#4f46e5' : '#475569',
                background: isActive('/dashboard') ? '#e0e7ff' : 'transparent',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                minHeight: '44px'
              }}
            >
              <LayoutDashboard size={15} /> Dashboard
            </Link>
          )}

          <Link
            to="/ats-resume-checker"
            onClick={closeMobileMenu}
            style={{
              textDecoration: 'none',
              padding: '0.5rem 0.75rem',
              borderRadius: '8px',
              color: isActive('/ats-resume-checker') ? '#4f46e5' : '#475569',
              background: isActive('/ats-resume-checker') ? '#e0e7ff' : 'transparent',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              minHeight: '44px'
            }}
          >
            <Target size={15} /> ATS Scanner
          </Link>

          <Link
            to="/cover-letters"
            onClick={closeMobileMenu}
            style={{
              textDecoration: 'none',
              padding: '0.5rem 0.75rem',
              borderRadius: '8px',
              color: isActive('/cover-letters') ? '#4f46e5' : '#475569',
              background: isActive('/cover-letters') ? '#e0e7ff' : 'transparent',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              minHeight: '44px'
            }}
          >
            <Mail size={15} /> Cover Letters
          </Link>

          <Link
            to="/interview-prep"
            onClick={closeMobileMenu}
            style={{
              textDecoration: 'none',
              padding: '0.5rem 0.75rem',
              borderRadius: '8px',
              color: isActive('/interview-prep') ? '#4f46e5' : '#475569',
              background: isActive('/interview-prep') ? '#e0e7ff' : 'transparent',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              minHeight: '44px'
            }}
          >
            <HelpCircle size={15} /> Interview Prep
          </Link>

          <Link
            to="/linkedin-optimizer"
            onClick={closeMobileMenu}
            style={{
              textDecoration: 'none',
              padding: '0.5rem 0.75rem',
              borderRadius: '8px',
              color: isActive('/linkedin-optimizer') ? '#0284c7' : '#475569',
              background: isActive('/linkedin-optimizer') ? '#e0f2fe' : 'transparent',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              minHeight: '44px'
            }}
          >
            <Share2 size={15} /> LinkedIn Bio
          </Link>


          <Link
            to="/applications"
            onClick={closeMobileMenu}
            style={{
              textDecoration: 'none',
              padding: '0.5rem 0.75rem',
              borderRadius: '8px',
              color: isActive('/applications') ? '#4f46e5' : '#475569',
              background: isActive('/applications') ? '#e0e7ff' : 'transparent',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              minHeight: '44px'
            }}
          >
            <Briefcase size={15} /> Job Tracker
          </Link>
        </div>

        {/* Right Auth Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }} className="hide-mobile">
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>{user.name || user.email?.split('@')[0]}</span>
              </div>
              <button
                onClick={logout}
                aria-label="Sign out of your account"
                style={{ padding: '0.45rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', borderRadius: '8px', cursor: 'pointer', border: '1px solid #cbd5e1', background: '#ffffff', color: '#334155', fontWeight: 700, fontSize: '0.85rem', minHeight: '44px' }}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={closeMobileMenu} style={{ textDecoration: 'none' }}>
              <button
                aria-label="Sign in or access workspace"
                style={{ padding: '0.55rem 1.2rem', borderRadius: '8px', background: '#4f46e5', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.85rem', minHeight: '44px' }}
              >
                Sign In / Workspace
              </button>
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}
