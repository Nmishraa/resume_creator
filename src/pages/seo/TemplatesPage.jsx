import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, ArrowRight, Check } from 'lucide-react';
import ResumeExamples from '../ResumeExamples';

export default function TemplatesPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem', color: '#1e293b' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e0e7ff', color: '#4338ca', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1rem' }}>
          <Layout size={16} /> Free Resume Templates
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.8rem' }}>
          ATS-Optimized Resume Templates
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '700px', margin: '0 auto 1.8rem auto', lineHeight: 1.6 }}>
          Choose from 5 modern, battle-tested templates designed for software engineers, executives, data analysts, and students.
        </p>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '0.85rem 2rem', borderRadius: '10px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Build Your Resume <ArrowRight size={18} />
          </button>
        </Link>
      </div>

      <ResumeExamples />
    </div>
  );
}
