import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AiEngineerPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem', color: '#1e293b' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e0e7ff', color: '#4338ca', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1rem' }}>
          <Cpu size={16} /> AI & Machine Learning Specialization
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.8rem' }}>
          AI Engineer Resume Example & Template
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '700px', margin: '0 auto 1.8rem auto' }}>
          Targeted resume guide for AI Engineers, ML Engineers, and Data Scientists highlighting LLM fine-tuning, PyTorch, MLOps, and vector databases.
        </p>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '0.85rem 2rem', borderRadius: '10px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Build AI Engineer Resume <ArrowRight size={18} />
          </button>
        </Link>
      </div>

      <div style={{ background: '#ffffff', padding: '2.5rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Key ATS Keywords for AI Engineers</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {['Python', 'PyTorch', 'TensorFlow', 'LLM Fine-Tuning', 'LangChain', 'Vector Databases (Pinecone/Milvus)', 'MLOps', 'Transformers', 'CUDA', 'Docker'].map((kw) => (
            <span key={kw} style={{ background: '#f1f5f9', color: '#1e293b', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700 }}>
              {kw}
            </span>
          ))}
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Sample Bullet Points</h2>
        <ul style={{ paddingLeft: '1.2rem', fontSize: '0.95rem', color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
          <li>Fine-tuned Llama 3 models using QLoRA and PyTorch, achieving a 34% reduction in inference latency.</li>
          <li>Architected RAG (Retrieval-Augmented Generation) pipeline handling 500,000+ daily semantic search queries with sub-100ms latency.</li>
          <li>Deployed automated MLOps CI/CD pipelines on AWS SageMaker, reducing model release cycle from 2 weeks to 3 hours.</li>
        </ul>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '0.85rem 2rem', borderRadius: '10px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer' }}>
              Create AI Resume Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
