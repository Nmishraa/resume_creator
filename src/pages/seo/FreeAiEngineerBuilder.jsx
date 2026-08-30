import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, FileText, CheckCircle2, ArrowRight, ShieldCheck, Cpu, Code, Database, Zap } from 'lucide-react';

export default function FreeAiEngineerBuilder() {
  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto', padding: '2.5rem 1.5rem', color: '#1e293b' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#e0e7ff', color: '#4338ca', padding: '0.35rem 0.9rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
          <Cpu size={15} /> Targeted AI Engineering Tool
        </div>

        <h1 style={{ fontSize: '2.6rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, marginBottom: '1rem' }}>
          Free AI Engineer Resume Builder
        </h1>

        <p style={{ fontSize: '1.15rem', color: '#475569', maxWidth: '750px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
          Engineered specifically for Machine Learning, LLM, RAG, and MLOps developers. Highlight PyTorch, CUDA, Pinecone, and QLoRA metrics that get noticed by AI recruiters.
        </p>

        <Link to="/editor/demo" style={{ textDecoration: 'none' }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)', color: '#ffffff', padding: '0.95rem 2rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 800, border: 'none', cursor: 'pointer', boxShadow: '0 8px 20px -4px rgba(79, 70, 229, 0.4)' }}>
            <FileText size={18} /> Build AI Engineer Resume Free <ArrowRight size={16} />
          </button>
        </Link>
      </header>

      {/* Tech Stack Chips Section */}
      <section style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap color="#4f46e5" size={22} /> High-Priority Keywords for AI Engineers
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
          Our AI builder automatically suggests pre-validated technical keywords extracted from senior AI job descriptions:
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {['PyTorch', 'TensorFlow', 'LLM Fine-Tuning (QLoRA, PEFT)', 'RAG Architectures', 'Pinecone / Milvus Vector DBs', 'LangChain & LlamaIndex', 'CUDA & GPU Optimization', 'vLLM & TensorRT-LLM', 'Docker & Kubernetes', 'MLflow & Weights & Biases', 'Quantization (AWQ, GGUF)'].map((kw, i) => (
            <span key={i} style={{ background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700 }}>
              ✓ {kw}
            </span>
          ))}
        </div>
      </section>

      {/* Sample Bullet Formulas */}
      <section style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
          Proven AI Engineer Bullet Point Examples
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: '#ffffff', borderLeft: '4px solid #4f46e5', padding: '1rem 1.25rem', borderRadius: '0 10px 10px 0' }}>
            <p style={{ fontSize: '0.92rem', color: '#1e293b', fontWeight: 600, margin: 0 }}>
              "Fine-tuned Llama-3 70B using QLoRA and DPO, reducing hallucination rate by 34% and improving domain classification F1-score from 0.82 to 0.94."
            </p>
          </div>

          <div style={{ background: '#ffffff', borderLeft: '4px solid #0284c7', padding: '1rem 1.25rem', borderRadius: '0 10px 10px 0' }}>
            <p style={{ fontSize: '0.92rem', color: '#1e293b', fontWeight: 600, margin: 0 }}>
              "Engineered high-throughput RAG search pipeline over 4M document embeddings using Pinecone and Hybrid Search, maintaining sub-120ms P99 latency."
            </p>
          </div>

          <div style={{ background: '#ffffff', borderLeft: '4px solid #16a34a', padding: '1rem 1.25rem', borderRadius: '0 10px 10px 0' }}>
            <p style={{ fontSize: '0.92rem', color: '#1e293b', fontWeight: 600, margin: 0 }}>
              "Deployed quantized vLLM model instances on AWS EC2 G5 nodes, reducing GPU memory footprint by 50% while scaling to 2,500 concurrent requests."
            </p>
          </div>
        </div>
      </section>

      <footer style={{ textAlign: 'center', background: '#e0e7ff', borderRadius: '16px', padding: '2.5rem 1.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#3730a3', marginBottom: '0.5rem' }}>
          Ready to Build Your AI Engineer Resume?
        </h3>
        <p style={{ color: '#4338ca', marginBottom: '1.5rem', fontSize: '1rem' }}>
          100% free forever. No sign-up or credit card required.
        </p>
        <Link to="/editor/demo" style={{ textDecoration: 'none' }}>
          <button style={{ background: '#4f46e5', color: '#ffffff', padding: '0.85rem 1.8rem', borderRadius: '10px', fontWeight: 800, border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
            Start Building Free Now
          </button>
        </Link>
      </footer>
    </div>
  );
}
