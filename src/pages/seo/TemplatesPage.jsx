import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, ArrowRight, Check } from 'lucide-react';
import ResumeExamples from '../ResumeExamples';
import AuthorMetadata from '../../components/AuthorMetadata';
import FaqSection from '../../components/FaqSection';
import RelatedResources from '../../components/RelatedResources';
import { ROUTE_SEO_MAP } from '../../utils/seoData';

export default function TemplatesPage() {
  const seoInfo = ROUTE_SEO_MAP['/resume-templates'];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem', color: '#1e293b' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e0e7ff', color: '#4338ca', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1rem' }}>
          <Layout size={16} /> Free Resume Templates 2026
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.8rem' }}>
          {seoInfo.h1}
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '750px', margin: '0 auto 1.8rem auto', lineHeight: 1.6 }}>
          Choose from modern, battle-tested templates designed for software engineers, executives, data analysts, nurses, and students. Guaranteed to pass Workday, Greenhouse, and Lever ATS screeners.
        </p>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '0.85rem 2rem', borderRadius: '12px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 8px 24px rgba(79,70,229,0.3)' }}>
            Build Your Resume <ArrowRight size={18} />
          </button>
        </Link>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <AuthorMetadata />
      </div>

      {/* Render Resume Examples library component with single h2 */}
      <ResumeExamples isEmbedded={true} />

      {/* Visible FAQs */}
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <FaqSection faqs={seoInfo.faqs} title="Resume Template FAQs" />
        <RelatedResources currentPath="/resume-templates" />
      </div>
    </div>
  );
}
