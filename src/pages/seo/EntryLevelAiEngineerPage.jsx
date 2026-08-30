import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, FileText, CheckCircle2, ArrowRight, BookOpen, GraduationCap, Award } from 'lucide-react';

export default function EntryLevelAiEngineerPage() {
  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto', padding: '2.5rem 1.5rem', color: '#1e293b' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#dcfce7', color: '#15803d', padding: '0.35rem 0.9rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
          <GraduationCap size={16} /> New Grad & Junior AI Engineer Guide
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, marginBottom: '1rem' }}>
          Entry-Level AI Engineer Resume Example & Template
        </h1>

        <p style={{ fontSize: '1.15rem', color: '#475569', maxWidth: '750px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
          How to structure your resume for entry-level Machine Learning and AI roles. Emphasize open-source contributions, HuggingFace models, hackathon wins, and PyTorch projects.
        </p>

        <Link to="/editor/demo" style={{ textDecoration: 'none' }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#16a34a', color: '#ffffff', padding: '0.95rem 2rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 800, border: 'none', cursor: 'pointer', boxShadow: '0 8px 20px -4px rgba(22, 163, 74, 0.4)' }}>
            <FileText size={18} /> Use Entry-Level AI Template Free <ArrowRight size={16} />
          </button>
        </Link>
      </header>

      {/* Key Sections for New Grads */}
      <section style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
          What Belongs on an Entry-Level AI Resume?
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>1. Computer Science / AI Education</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
              Place Education at the top. List B.S. or M.S. degree, GPA (if 3.5+), and key coursework like Deep Learning, Linear Algebra, and Algorithms.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>2. Hands-On AI & LLM Projects</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
              Detail 2-3 personal or open-source projects. Link directly to GitHub repositories or HuggingFace model spaces.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>3. Core Technical Skills</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
              Categorize skills into Languages (Python, C++), ML Frameworks (PyTorch, Scikit-Learn), and AI Tools (LangChain, HuggingFace).
            </p>
          </div>
        </div>
      </section>

      <footer style={{ textAlign: 'center', background: '#f0fdf4', borderRadius: '16px', padding: '2.5rem 1.5rem', border: '1px solid #bbf7d0' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#166534', marginBottom: '0.5rem' }}>
          Build Your Entry-Level AI Resume Today
        </h3>
        <p style={{ color: '#15803d', marginBottom: '1.5rem', fontSize: '1rem' }}>
          Free, instant vector PDF export engineered to pass ATS screeners.
        </p>
        <Link to="/editor/demo" style={{ textDecoration: 'none' }}>
          <button style={{ background: '#16a34a', color: '#ffffff', padding: '0.85rem 1.8rem', borderRadius: '10px', fontWeight: 800, border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
            Open Free Builder Now
          </button>
        </Link>
      </footer>
    </div>
  );
}
