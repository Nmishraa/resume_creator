import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, FileText, CheckCircle2, ArrowRight, Database, Search, Zap } from 'lucide-react';

export default function RagEngineerPage() {
  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto', padding: '2.5rem 1.5rem', color: '#1e293b' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#e0f2fe', color: '#0369a1', padding: '0.35rem 0.9rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
          <Database size={15} /> LLM & RAG Systems Specialist
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, marginBottom: '1rem' }}>
          RAG & LLM Engineer Resume Example & Builder
        </h1>

        <p style={{ fontSize: '1.15rem', color: '#475569', maxWidth: '750px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
          Tailored for Retrieval-Augmented Generation (RAG) developers. Showcase vector database indexing, hybrid search (BM25 + Dense embeddings), chunking strategies, and Ragas evaluation metrics.
        </p>

        <Link to="/editor/demo" style={{ textDecoration: 'none' }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#0284c7', color: '#ffffff', padding: '0.95rem 2rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 800, border: 'none', cursor: 'pointer', boxShadow: '0 8px 20px -4px rgba(2, 132, 199, 0.4)' }}>
            <FileText size={18} /> Build RAG Engineer Resume Free <ArrowRight size={16} />
          </button>
        </Link>
      </header>

      {/* Essential RAG Keywords */}
      <section style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Search size={20} color="#0284c7" /> Recruiter Keyword Scanner for RAG Roles
        </h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {['Vector Indexing (HNSW, IVFFlat)', 'Pinecone / Qdrant / Milvus / Weaviate', 'Hybrid Search (Reciprocal Rank Fusion)', 'Semantic Chunking & Metadata Filtering', 'Embedding Models (openai, bge-m3, e5)', 'Ragas & TruLens Evaluation Frameworks', 'LlamaIndex & LangChain Routing', 'Query Rewriting & Hypothetical Document Embeddings (HyDE)'].map((kw, i) => (
            <span key={i} style={{ background: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700 }}>
              ✓ {kw}
            </span>
          ))}
        </div>
      </section>

      <footer style={{ textAlign: 'center', background: '#f0f9ff', borderRadius: '16px', padding: '2.5rem 1.5rem', border: '1px solid #bae6fd' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0369a1', marginBottom: '0.5rem' }}>
          Create Your RAG Specialist Resume Free
        </h3>
        <p style={{ color: '#0284c7', marginBottom: '1.5rem', fontSize: '1rem' }}>
          100% free ATS vector PDF export with instant keyword scoring.
        </p>
        <Link to="/editor/demo" style={{ textDecoration: 'none' }}>
          <button style={{ background: '#0284c7', color: '#ffffff', padding: '0.85rem 1.8rem', borderRadius: '10px', fontWeight: 800, border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
            Open Builder Now
          </button>
        </Link>
      </footer>
    </div>
  );
}
