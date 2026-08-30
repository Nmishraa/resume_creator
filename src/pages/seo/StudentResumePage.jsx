import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function StudentResumePage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem', color: '#1e293b' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#fce7f3', color: '#be185d', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1rem' }}>
          <GraduationCap size={16} /> Students & Recent Graduates
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.8rem' }}>
          Student & Entry-Level Resume Example
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '700px', margin: '0 auto 1.8rem auto' }}>
          How to write a standout resume with zero prior experience. Highlight coursework, hackathons, open-source projects, and leadership roles.
        </p>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '0.85rem 2rem', borderRadius: '10px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Build Student Resume <ArrowRight size={18} />
          </button>
        </Link>
      </div>

      <div style={{ background: '#ffffff', padding: '2.5rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Key Sections for College Students</h2>
        <ul style={{ paddingLeft: '1.2rem', fontSize: '0.95rem', color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
          <li><strong>Education First:</strong> Place degree, university, expected graduation date, and GPA (if 3.5+) at the top of your resume.</li>
          <li><strong>Relevant Coursework:</strong> List relevant CS, data, or business classes (e.g. Data Structures, Software Engineering).</li>
          <li><strong>Projects & Hackathons:</strong> Feature personal coding projects with GitHub links and tech stacks used.</li>
        </ul>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '0.85rem 2rem', borderRadius: '10px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer' }}>
              Create Free Resume
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
