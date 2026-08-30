import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, CheckCircle2, Target } from 'lucide-react';

export default function GuidePage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem', color: '#1e293b', lineHeight: 1.7 }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#dcfce7', color: '#15803d', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1rem' }}>
          <BookOpen size={16} /> Complete Guide 2026
        </div>
        <h1 style={{ fontSize: '2.6rem', fontWeight: 900, color: '#0f172a', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          How to Write a Professional Resume in 2026
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '700px', margin: '0 auto 2rem auto' }}>
          Step-by-step guide to writing a high-scoring ATS resume that gets you interviews at top companies.
        </p>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '0.85rem 2rem', borderRadius: '10px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Build My Resume Now <ArrowRight size={18} />
          </button>
        </Link>
      </div>

      <article style={{ background: '#ffffff', padding: '2.5rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Step 1: Choose the Right Layout</h2>
        <p style={{ fontSize: '1rem', color: '#475569', marginBottom: '1.5rem' }}>
          Use a clean single-column or modern 2-column layout. Avoid using image files or complex graphic tables for contact info because Applicant Tracking Systems (ATS) cannot parse images.
        </p>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Step 2: Write an Executive Summary</h2>
        <p style={{ fontSize: '1rem', color: '#475569', marginBottom: '1.5rem' }}>
          Craft a 2-3 sentence hook outlining your professional title, years of experience, core technical stack, and a major career achievement.
        </p>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Step 3: Format Accomplishment Bullet Points</h2>
        <p style={{ fontSize: '1rem', color: '#475569', marginBottom: '1.5rem' }}>
          Start every bullet point with a high-impact action verb (e.g., <em>Architected</em>, <em>Spearheaded</em>, <em>Optimized</em>). Always include quantifiable metrics (% increase, $ revenue generated, or time saved).
        </p>

        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1', marginTop: '2rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Ready to Create Your Resume?</h3>
          <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '1.2rem' }}>Use ResumeCraft's free AI builder to generate your ATS resume in under 5 minutes.</p>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '0.8rem 1.8rem', borderRadius: '8px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer' }}>
              Create Free Resume
            </button>
          </Link>
        </div>
      </article>
    </div>
  );
}
