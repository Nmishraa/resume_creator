import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, CheckCircle2, Target, Award, Sparkles, FileText, Check, AlertCircle } from 'lucide-react';
import AuthorMetadata from '../../components/AuthorMetadata';
import FaqSection from '../../components/FaqSection';
import RelatedResources from '../../components/RelatedResources';
import { ROUTE_SEO_MAP } from '../../utils/seoData';

export default function GuidePage() {
  const seoInfo = ROUTE_SEO_MAP['/how-to-write-a-resume'];

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '3rem 1.5rem', color: '#1e293b', lineHeight: 1.7 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#dcfce7', color: '#15803d', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1rem' }}>
          <BookOpen size={16} /> Complete Guide 2026
        </div>
        <h1 style={{ fontSize: '2.6rem', fontWeight: 900, color: '#0f172a', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          {seoInfo.h1}
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#64748b', maxWidth: '750px', margin: '0 auto 2rem auto' }}>
          Step-by-step masterclass on writing an ATS-compliant resume that ranks in the top 5% of candidate pools and secures interviews at leading global tech companies.
        </p>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '0.85rem 2rem', borderRadius: '12px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 8px 24px rgba(79,70,229,0.3)' }}>
            Build My Resume Now <ArrowRight size={18} />
          </button>
        </Link>
      </div>

      <AuthorMetadata />

      {/* Article Body Content */}
      <article style={{ background: '#ffffff', padding: '3rem 2.5rem', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
        
        {/* Intro */}
        <section style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#334155', marginBottom: '1rem' }}>
            In 2026, many major companies and growing startups rely on Applicant Tracking Systems (ATS) such as Workday, Greenhouse, Lever, and Taleo to automatically filter resumes. Before a hiring manager or internal recruiter ever reads your application, automated parsing algorithms grade your document based on structural hierarchy, font clarity, keyword match density, and measurable accomplishment metrics.
          </p>
          <p style={{ fontSize: '1.05rem', color: '#334155' }}>
            Writing a winning resume is no longer about decorative design templates or abstract skill self-ratings. It requires engineering a clean, highly scannable document that satisfies both computerized screeners and human decision-makers. This comprehensive 2026 guide breaks down every step required to craft an executive-grade resume.
          </p>
        </section>

        {/* Table of Contents */}
        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #cbd5e1', marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem' }}>Guide Overview & Table of Contents</h3>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#4f46e5', fontWeight: 700, fontSize: '0.92rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.5rem' }}>
            <li><a href="#step1" style={{ color: '#4f46e5', textDecoration: 'none' }}>1. ATS Layout & Formatting Standards</a></li>
            <li><a href="#step2" style={{ color: '#4f46e5', textDecoration: 'none' }}>2. Crafting an Executive Summary</a></li>
            <li><a href="#step3" style={{ color: '#4f46e5', textDecoration: 'none' }}>3. The Google X-Y-Z Bullet Formula</a></li>
            <li><a href="#step4" style={{ color: '#4f46e5', textDecoration: 'none' }}>4. Hard Skills & Keyword Extraction</a></li>
            <li><a href="#step5" style={{ color: '#4f46e5', textDecoration: 'none' }}>5. Education & Certifications Layout</a></li>
          </ul>
        </div>

        {/* Step 1 */}
        <section id="step1" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ background: '#4f46e5', color: '#ffffff', width: '32px', height: '32px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>1</span>
            ATS Layout & Formatting Standards
          </h2>
          <p style={{ color: '#475569', marginBottom: '1.2rem' }}>
            The foundational rule of ATS optimization is simplicity. Parsers read documents line-by-line, converting binary PDF or text data into standardized plain-text fields. Complex multi-column graphic tables, embedded images, progress bars, and header/footer margins break parser algorithms, causing critical contact details or work histories to be omitted.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ background: '#f0fdf4', borderLeft: '4px solid #22c55e', padding: '1.2rem', borderRadius: '10px' }}>
              <h4 style={{ color: '#166534', fontWeight: 800, margin: '0 0 0.4rem 0' }}>✅ What ATS Parsers Love</h4>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.88rem', color: '#14532d' }}>
                <li>Single-column or clean 2-column flex hierarchy</li>
                <li>Standard system typography (Inter, Arial, Georgia, Roboto)</li>
                <li>Selectable text vector PDFs exported from clean HTML</li>
                <li>Standard section titles ("Work Experience", "Education")</li>
              </ul>
            </div>
            <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '1.2rem', borderRadius: '10px' }}>
              <h4 style={{ color: '#991b1b', fontWeight: 800, margin: '0 0 0.4rem 0' }}>❌ What Triggers Automatic Rejection</h4>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.88rem', color: '#7f1d1d' }}>
                <li>Canva image exports or flattened PNG/JPG files</li>
                <li>Hidden text or white-text keyword stuffing</li>
                <li>Putting phone numbers inside page top headers</li>
                <li>Uncustomized graphic skill rating percentage bars</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Step 2 */}
        <section id="step2" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ background: '#4f46e5', color: '#ffffff', width: '32px', height: '32px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>2</span>
            Crafting an Executive Summary Statement
          </h2>
          <p style={{ color: '#475569', marginBottom: '1rem' }}>
            Your professional summary sits directly below your contact header. It acts as a 3-sentence elevator pitch summarizing your title, total years of experience, primary technical stack, and a major headline achievement.
          </p>
          <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1', marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Proven Summary Formula Blueprint:</h4>
            <p style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 600, fontStyle: 'italic', margin: 0 }}>
              "[Professional Title] with [X]+ years of experience in [Core Field/Domain]. Specialized in [Skill 1], [Skill 2], and [Skill 3]. Spearheaded [Major Project/Initiative] resulting in [Quantifiable Business Result/Metric]."
            </p>
          </div>
        </section>

        {/* Step 3 */}
        <section id="step3" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ background: '#4f46e5', color: '#ffffff', width: '32px', height: '32px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>3</span>
            Formatting Bullet Points: The Google X-Y-Z Formula
          </h2>
          <p style={{ color: '#475569', marginBottom: '1.2rem' }}>
            Hiring managers at Google, Apple, and Meta evaluate bullet points using a strict impact-driven methodology known as the Google X-Y-Z Formula:
          </p>
          <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: '#ffffff', padding: '1.8rem', borderRadius: '16px', marginBottom: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '0.01em' }}>
              "Accomplished <span style={{ color: '#93c5fd' }}>[X]</span>, as measured by <span style={{ color: '#86efac' }}>[Y]</span>, by doing <span style={{ color: '#fde047' }}>[Z]</span>"
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <strong style={{ color: '#3b82f6', display: 'block', marginBottom: '0.3rem' }}>[X] Business Outcome</strong>
              <span style={{ fontSize: '0.88rem', color: '#475569' }}>Reduced customer churn rate or boosted API throughput.</span>
            </div>
            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <strong style={{ color: '#16a34a', display: 'block', marginBottom: '0.3rem' }}>[Y] Quantifiable Data</strong>
              <span style={{ fontSize: '0.88rem', color: '#475569' }}>Specific percentages (%), dollar values ($), or latency metrics (ms).</span>
            </div>
            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <strong style={{ color: '#d97706', display: 'block', marginBottom: '0.3rem' }}>[Z] Action Method</strong>
              <span style={{ fontSize: '0.88rem', color: '#475569' }}>Tools and stack used (e.g., React, PostgreSQL indexing, PyTorch).</span>
            </div>
          </div>
        </section>

        {/* Step 4 */}
        <section id="step4" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ background: '#4f46e5', color: '#ffffff', width: '32px', height: '32px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>4</span>
            Hard Skills & Keyword Extraction Strategy
          </h2>
          <p style={{ color: '#475569', marginBottom: '1rem' }}>
            To rank high on ATS search queries, customize your Skills section by extracting required hard skills directly from the target job posting. Categorize skills into logical groups (e.g., Programming Languages, Frameworks, Cloud Infrastructure, Database & Analytics).
          </p>
        </section>

        {/* CTA Box */}
        <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)', color: '#ffffff', padding: '2.5rem', borderRadius: '20px', textAlign: 'center', marginTop: '3rem', boxShadow: '0 12px 32px rgba(79,70,229,0.3)' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.8rem' }}>Build Your High-Scoring Resume in Minutes</h3>
          <p style={{ fontSize: '1.05rem', color: '#e0e7ff', maxWidth: '600px', margin: '0 auto 1.8rem auto' }}>
            Stop stressing over formatting errors. Use Resume & CV Craft's free builder to generate ATS-optimized PDFs automatically.
          </p>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '0.9rem 2.2rem', borderRadius: '12px', border: 'none', background: '#ffffff', color: '#4f46e5', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}>
              Create Free ATS Resume
            </button>
          </Link>
        </div>
      </article>

      {/* Visible FAQs */}
      <FaqSection faqs={seoInfo.faqs} title="Resume Writing FAQs" />

      {/* Related Resources Internal Links */}
      <RelatedResources currentPath="/how-to-write-a-resume" />
    </div>
  );
}
