import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Copy, Check, ArrowRight, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import AuthorMetadata from '../../components/AuthorMetadata';
import FaqSection from '../../components/FaqSection';
import RelatedResources from '../../components/RelatedResources';
import { ROUTE_SEO_MAP } from '../../utils/seoData';

const SUMMARY_LIBRARY = [
  { role: 'Senior Full Stack Engineer', category: 'Engineering', text: 'Results-driven Senior Full Stack Engineer with 6+ years of experience architecting high-throughput microservices and responsive React applications. Spearheaded cloud architecture migrations that improved uptime to 99.99% and reduced server latency by 42%.' },
  { role: 'AI & Machine Learning Engineer', category: 'Engineering', text: 'Innovative AI Specialist with 5+ years of experience fine-tuning LLMs (Llama 3, QLoRA) and building high-performance RAG pipelines. Reduced inference latency by 38% while maintaining sub-100ms vector search response times.' },
  { role: 'Lead Product Manager', category: 'Product', text: 'Data-driven Lead Product Manager with 7+ years of experience scaling B2B SaaS platforms. Grown ARR from $2M to $9M and led A/B testing experimentation that boosted customer onboarding conversion by 34%.' },
  { role: 'Senior Data Scientist', category: 'Data', text: 'Senior Data Scientist specializing in Machine Learning, Python, PyTorch, and NLP. Built predictive recommendation engines serving 10M+ daily requests with 99.9% uptime.' },
  { role: 'Senior UX/UI Product Designer', category: 'Design', text: 'User-centric Senior Product Designer with 5+ years of experience building accessible Figma design systems. Redesigned core checkout workflows for 1.2M active mobile users, elevating SUS usability scores from 68 to 89.' },
  { role: 'DevOps & Cloud Architect', category: 'Engineering', text: 'AWS Certified Cloud Architect with 6+ years automating multi-region Kubernetes (EKS) infrastructure with Terraform and ArgoCD. Reduced annual AWS cloud infrastructure spend by 35%.' },
  { role: 'Senior Financial Analyst', category: 'Finance', text: 'CFA Charterholder with 5+ years of corporate FP&A experience managing $50M+ annual budgets. Built automated Excel VBA models and Tableau dashboards, improving forecast accuracy to 98.5%.' },
  { role: 'Registered Nurse (BSN, RN)', category: 'Healthcare', text: 'Compassionate ER Registered Nurse with 5+ years of acute care experience in Level-1 Trauma Emergency Departments. Expert in Epic EHR documentation, rapid triage, and leading 12+ clinical staff.' },
  { role: 'Growth Marketing Manager', category: 'Marketing', text: 'Growth Marketer expert in organic SEO, Google Ads, and automated lifecycle email funnels. Managed $500K annual ad budgets delivering a 3.4x ROAS and scaling monthly organic traffic to 150,000+ sessions.' },
  { role: 'Computer Science Graduate', category: 'Student', text: 'High-achieving CS Graduate from UC Berkeley (3.9 GPA) with strong foundation in full-stack web development, algorithms, and open-source contributions. 1st place Hackathon winner seeking Junior Software Engineer role.' }
];

export default function SummaryExamplesPage() {
  const seoInfo = ROUTE_SEO_MAP['/resume-summary-examples'];
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [filterCat, setFilterCat] = useState('All');

  const handleCopy = (txt, idx) => {
    navigator.clipboard.writeText(txt);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const filteredItems = filterCat === 'All' 
    ? SUMMARY_LIBRARY 
    : SUMMARY_LIBRARY.filter(i => i.category === filterCat);

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '3rem 1.5rem', color: '#1e293b', lineHeight: 1.7 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e0e7ff', color: '#4338ca', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1rem' }}>
          <FileText size={16} /> Resume Summary Library 2026
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.8rem' }}>
          {seoInfo.h1}
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#64748b', maxWidth: '750px', margin: '0 auto 1.8rem auto' }}>
          Copy and customize high-impact, recruiter-aligned resume summary statements written for software engineers, product managers, data scientists, and recent graduates.
        </p>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '0.85rem 2rem', borderRadius: '12px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 8px 24px rgba(79,70,229,0.3)' }}>
            Build Your Resume Now <ArrowRight size={18} />
          </button>
        </Link>
      </div>

      <AuthorMetadata />

      {/* Guide Article Content */}
      <article style={{ background: '#ffffff', padding: '2.5rem', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>What Makes a High-Scoring Resume Summary?</h2>
        <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
          Your resume summary statement (also known as a executive profile) is the first section a recruiter reads after your contact header. In 3 to 4 concise sentences, it must establish your professional identity, years of experience, core technical stack, and a major metric-backed accomplishment.
        </p>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {['All', 'Engineering', 'Product', 'Data', 'Design', 'Finance', 'Healthcare', 'Marketing', 'Student'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '20px',
                border: filterCat === cat ? 'none' : '1px solid #cbd5e1',
                background: filterCat === cat ? '#4f46e5' : '#ffffff',
                color: filterCat === cat ? '#ffffff' : '#475569',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Summary Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {filteredItems.map((item, idx) => (
            <div key={idx} style={{ background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.6rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase' }}>{item.role}</span>
                  <span style={{ fontSize: '0.72rem', background: '#e0e7ff', color: '#3730a3', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: 700 }}>{item.category}</span>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.6 }}>"{item.text}"</p>
              </div>

              <button
                onClick={() => handleCopy(item.text, idx)}
                style={{ marginTop: '1.2rem', padding: '0.6rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#1e293b', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              >
                {copiedIdx === idx ? <Check size={16} color="#16a34a" /> : <Copy size={16} />}
                {copiedIdx === idx ? 'Copied to Clipboard!' : 'Copy Summary'}
              </button>
            </div>
          ))}
        </div>
      </article>

      {/* Visible FAQs */}
      <FaqSection faqs={seoInfo.faqs} title="Resume Summary FAQs" />

      {/* Related Internal Links */}
      <RelatedResources currentPath="/resume-summary-examples" />
    </div>
  );
}
