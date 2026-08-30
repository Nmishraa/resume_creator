import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ArrowRight, CheckCircle2, Code, Zap, Sparkles, Terminal, FileCode, Layers } from 'lucide-react';
import AuthorMetadata from '../../components/AuthorMetadata';
import FaqSection from '../../components/FaqSection';
import RelatedResources from '../../components/RelatedResources';
import { ROUTE_SEO_MAP } from '../../utils/seoData';

export default function AiEngineerPage() {
  const seoInfo = ROUTE_SEO_MAP['/ai-engineer-resume-example'];

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '3rem 1.5rem', color: '#1e293b', lineHeight: 1.7 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e0e7ff', color: '#4338ca', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1rem' }}>
          <Cpu size={16} /> AI & Machine Learning Specialization
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.8rem' }}>
          {seoInfo.h1}
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#64748b', maxWidth: '750px', margin: '0 auto 1.8rem auto' }}>
          Targeted resume guide for AI Engineers, ML Engineers, and Data Scientists highlighting LLM fine-tuning, PyTorch, RAG pipelines, MLOps, and vector databases.
        </p>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '0.85rem 2rem', borderRadius: '12px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 8px 24px rgba(79,70,229,0.3)' }}>
            Build AI Engineer Resume <ArrowRight size={18} />
          </button>
        </Link>
      </div>

      <AuthorMetadata />

      {/* Main Content */}
      <article style={{ background: '#ffffff', padding: '3rem 2.5rem', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
        
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>AI & Machine Learning Hiring Trends in 2026</h2>
          <p style={{ color: '#475569' }}>
            The AI engineering market in 2026 has shifted from generic machine learning models to production-grade Generative AI, Retrieval-Augmented Generation (RAG) architectures, LLM fine-tuning (QLoRA, PEFT), and high-throughput vector database search systems. Technical screeners and AI hiring leads prioritize candidates who demonstrate full-stack MLOps capabilities, low-latency inference optimization, and concrete business ROI.
          </p>
        </section>

        {/* ATS Keywords Grid */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem' }}>High-Value ATS Keywords for AI Engineers</h3>
          <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '1rem' }}>Include these exact technical keywords across your skills matrix and accomplishment bullet points:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {[
              'Python (PyTorch, TensorFlow)',
              'LLM Fine-Tuning (QLoRA, LoRA, PEFT)',
              'RAG Architectures (LangChain, LlamaIndex)',
              'Vector Databases (Pinecone, Milvus, Qdrant, Chroma)',
              'MLOps & Pipeline Automation (AWS SageMaker, MLflow, Kubeflow)',
              'Inference Speed Optimization (vLLM, TensorRT, ONNX)',
              'Transformers & HuggingFace Hub',
              'Distributed Training (DeepSpeed, FSDP, CUDA)',
              'Model Evaluation (DeepEval, Ragas, BLEU, ROUGE)'
            ].map((kw) => (
              <span key={kw} style={{ background: '#e0e7ff', color: '#3730a3', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700 }}>
                {kw}
              </span>
            ))}
          </div>
        </section>

        {/* Proven Sample Resume Content */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Production AI Engineer Accomplishment Bullets</h3>
          <div style={{ background: '#f8fafc', padding: '1.8rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.95rem', color: '#334155', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><strong>LLM Fine-Tuning:</strong> Fine-tuned Llama 3 70B models using QLoRA and PyTorch on 4x NVIDIA H100 GPUs, achieving a 38% reduction in token latency and a 94% accuracy score on domain-specific customer support tasks.</li>
              <li><strong>RAG Infrastructure:</strong> Architected a multi-tenant RAG (Retrieval-Augmented Generation) pipeline using LlamaIndex, Qdrant, and Hybrid Sparse-Dense Vector Search, processing 800,000+ daily queries with sub-90ms P99 latency.</li>
              <li><strong>MLOps & CI/CD:</strong> Implemented automated model monitoring and CI/CD deployment pipelines on AWS SageMaker with MLflow, cutting model release cycle times from 3 weeks to 2 hours.</li>
              <li><strong>Cost Optimization:</strong> Quantized FP16 LLM weights to INT4 using vLLM and TensorRT-LLM, reducing GPU memory footprint by 55% and saving $140,000 in monthly cloud infrastructure overhead.</li>
              <li><strong>Model Evaluation:</strong> Engineered automated evaluation test suites using Ragas metrics (faithfulness, answer relevance), catching 99% of hallucination edge-cases prior to production deployment.</li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #3730a3 0%, #1e1b4b 100%)', color: '#ffffff', padding: '2rem', borderRadius: '18px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.6rem' }}>Create Your AI Engineer Resume Now</h3>
          <p style={{ color: '#c7d2fe', fontSize: '0.95rem', marginBottom: '1.2rem' }}>Clone our pre-formatted AI Engineer sample resume directly into the interactive editor.</p>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '0.8rem 1.8rem', borderRadius: '10px', border: 'none', background: '#818cf8', color: '#ffffff', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer' }}>
              Build AI Resume
            </button>
          </Link>
        </div>
      </article>

      {/* Visible FAQs */}
      <FaqSection faqs={seoInfo.faqs} title="AI Engineer Resume FAQs" />

      {/* Related Internal Links */}
      <RelatedResources currentPath="/ai-engineer-resume-example" />
    </div>
  );
}
