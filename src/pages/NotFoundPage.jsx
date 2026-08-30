import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '1rem', padding: '3rem 2rem', maxWidth: '480px', width: '100%', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
        <AlertTriangle size={64} style={{ color: '#ef4444', marginBottom: '1rem' }} />
        <h1 style={{ fontSize: '4rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0.75rem 0', color: '#1e293b' }}>Page Not Found</h2>
        <p style={{ color: '#64748b', marginBottom: '2rem', lineHeight: 1.6 }}>
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#4f46e5', color: '#ffffff', padding: '0.75rem 1.75rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600 }}
        >
          <Home size={18} /> Return to Homepage
        </Link>
      </div>
    </div>
  );
}
