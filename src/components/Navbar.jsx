import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, LogOut } from 'lucide-react';

export default function Navbar({ user, logout }) {
  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="nav-brand">
          <FileText size={24} color="var(--accent)" />
          <span>ResumeCraft</span>
        </div>
      </Link>
      
      {user && (
        <div className="nav-user">
          <div className="flex-row" style={{ alignItems: 'center', gap: '0.8rem' }}>
            {user.photoURL && <img src={user.photoURL} alt="Profile" className="user-img" />}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800 }}>{user.name || user.displayName || (user.email ? user.email.split('@')[0] : 'Guest User')}</span>

              {user.email && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</span>}
              {!user.email && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Anonymous Session</span>}
            </div>
          </div>
          <button onClick={logout} className="btn-secondary" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <LogOut size={16} />
            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Sign Out</span>
          </button>
        </div>
      )}
    </nav>
  );
}
