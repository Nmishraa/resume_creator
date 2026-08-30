import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, FileText, CheckCircle2, ArrowRight, GraduationCap, Award, BookOpen } from 'lucide-react';

export default function FreshGraduatesBuilderPage() {
  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto', padding: '2.5rem 1.5rem', color: '#1e293b' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#fef3c7', color: '#92400e', padding: '0.35rem 0.9rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
          <GraduationCap size={16} /> Designed for Class of 2026 Fresh Graduates
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, marginBottom: '1rem' }}>
          Free Resume Builder for Fresh Graduates
        </h1>

        <p style={{ fontSize: '1.15rem', color: '#475569', maxWidth: '750px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
          Turn academic achievements, hackathons, and class projects into high-scoring ATS resumes. Download clean, professional PDFs without paying a single dollar.
        </p>

        <Link to="/editor/demo" style={{ textDecoration: 'none' }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)', color: '#ffffff', padding: '0.95rem 2rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 800, border: 'none', cursor: 'pointer', boxShadow: '0 8px 20px -4px rgba(217, 119, 6, 0.4)' }}>
            <FileText size={18} /> Build Fresh Graduate Resume Free <ArrowRight size={16} />
          </button>
        </Link>
      </header>

      {/* Advice for Fresh Graduates */}
      <section style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
          3 Rules for Writing a Winning Fresh Graduate Resume
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>1. Lead with Education & Technical Skills</h3>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
              Place your university degree, graduation year, GPA (if 3.5+), and core technical skills near the top of your resume above work history.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>2. Treat Capstone Projects Like Real Work</h3>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
              Describe senior capstone projects, hackathon submissions, and open-source contributions using action verbs and measurable metrics.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>3. Use Single-Column ATS Formatting</h3>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
              Avoid complex two-column graphic templates that confuse entry-level campus ATS screeners at major employers.
            </p>
          </div>
        </div>
      </section>

      <footer style={{ textAlign: 'center', background: '#fffbeb', borderRadius: '16px', padding: '2.5rem 1.5rem', border: '1px solid #fde68a' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#92400e', marginBottom: '0.5rem' }}>
          Get Hired Faster Out of College
        </h3>
        <p style={{ color: '#b45309', marginBottom: '1.5rem', fontSize: '1rem' }}>
          Free forever. No credit card, subscription, or login required.
        </p>
        <Link to="/editor/demo" style={{ textDecoration: 'none' }}>
          <button style={{ background: '#d97706', color: '#ffffff', padding: '0.85rem 1.8rem', borderRadius: '10px', fontWeight: 800, border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
            Start Building Free Now
          </button>
        </Link>
      </footer>
    </div>
  );
}
