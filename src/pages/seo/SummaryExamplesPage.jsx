import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Copy, Check, ArrowRight } from 'lucide-react';

const SUMMARY_LIBRARY = [
  { role: 'Software Engineer', text: 'Results-driven Full Stack Developer with 5+ years of experience architecting web applications using React, Node.js, and cloud native microservices. Reduced API latency by 45% and improved SEO score to 98.' },
  { role: 'Product Manager', text: 'Data-driven Product Leader with 6+ years of experience leading cross-functional engineering squads, scaling ARR from $2M to $9M, and running A/B experiments that boosted onboarding conversion by 30%.' },
  { role: 'Data Scientist', text: 'Senior Data Scientist specializing in Machine Learning, Python, PyTorch, and NLP. Built predictive recommendation engines serving 10M+ daily requests with 99.9% uptime.' },
  { role: 'Student / New Grad', text: 'Enthusiastic Computer Science Graduate from UC Berkeley (3.9 GPA) with strong foundation in web development, algorithms, and open-source contributions. Fast learner seeking Junior Software Engineer role.' }
];

export default function SummaryExamplesPage() {
  const [copiedIdx, setCopiedIdx] = useState(null);

  const handleCopy = (txt, idx) => {
    navigator.clipboard.writeText(txt);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1.5rem', color: '#1e293b' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e0e7ff', color: '#4338ca', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1rem' }}>
          <FileText size={16} /> Resume Summary Library
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.8rem' }}>
          Best Resume Summary Examples for 2026
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '700px', margin: '0 auto 1.8rem auto' }}>
          Copy and customize high-impact resume summaries tailored by industry and role.
        </p>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '0.85rem 2rem', borderRadius: '10px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Build Your Resume Now <ArrowRight size={18} />
          </button>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {SUMMARY_LIBRARY.map((item, idx) => (
          <div key={idx} style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.8rem', boxShadow: '0 4px 14px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase' }}>{item.role}</span>
              <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.6, marginTop: '0.6rem' }}>"{item.text}"</p>
            </div>

            <button
              onClick={() => handleCopy(item.text, idx)}
              style={{ marginTop: '1.2rem', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#1e293b', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
            >
              {copiedIdx === idx ? <Check size={16} color="#16a34a" /> : <Copy size={16} />}
              {copiedIdx === idx ? 'Copied Summary!' : 'Copy Summary'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
