import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, FileText, CheckCircle2, ArrowRight, Code, Terminal, Cpu } from 'lucide-react';

export default function CsGradBuilderPage() {
  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto', padding: '2.5rem 1.5rem', color: '#1e293b' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#e0e7ff', color: '#4338ca', padding: '0.35rem 0.9rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
          <Terminal size={15} /> Computer Science Career Tool
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, marginBottom: '1rem' }}>
          Computer Science Graduate Resume Builder
        </h1>

        <p style={{ fontSize: '1.15rem', color: '#475569', maxWidth: '750px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
          Optimized for CS students, Software Engineering majors, and bootcamp grads. Format your GitHub links, algorithms background, system design coursework, and tech stack for maximum recruiter response.
        </p>

        <Link to="/editor/demo" style={{ textDecoration: 'none' }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#4f46e5', color: '#ffffff', padding: '0.95rem 2rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 800, border: 'none', cursor: 'pointer', boxShadow: '0 8px 20px -4px rgba(79, 70, 229, 0.4)' }}>
            <FileText size={18} /> Build CS Graduate Resume Free <ArrowRight size={16} />
          </button>
        </Link>
      </header>

      {/* CS Resume Layout Guide */}
      <section style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
          Ideal Section Order for CS Graduates
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid #4f46e5' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem 0' }}>1. Contact Info & Portfolio Links</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Include GitHub, LinkedIn, Personal Portfolio, and LeetCode / Codeforces handle (if top 10%).</p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid #0284c7' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem 0' }}>2. Technical Stack Breakdown</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Languages (C++, Python, Java, JS), Frameworks (React, Node.js, Spring Boot), Cloud & Databases (PostgreSQL, Docker, AWS).</p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid #16a34a' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem 0' }}>3. Software Engineering Projects</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Highlight 2-3 full-stack or systems projects. Describe latency, user scale, tech stack, and GitHub repo links.</p>
          </div>
        </div>
      </section>

      <footer style={{ textAlign: 'center', background: '#e0e7ff', borderRadius: '16px', padding: '2.5rem 1.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#3730a3', marginBottom: '0.5rem' }}>
          Build Your Computer Science Resume Free
        </h3>
        <p style={{ color: '#4338ca', marginBottom: '1.5rem', fontSize: '1rem' }}>
          No subscription required. Download instant vector PDF export.
        </p>
        <Link to="/editor/demo" style={{ textDecoration: 'none' }}>
          <button style={{ background: '#4f46e5', color: '#ffffff', padding: '0.85rem 1.8rem', borderRadius: '10px', fontWeight: 800, border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
            Open Builder Free Now
          </button>
        </Link>
      </footer>
    </div>
  );
}
