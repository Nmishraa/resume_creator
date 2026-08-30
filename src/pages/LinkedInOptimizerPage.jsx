import React, { useState } from 'react';
import { Share2, Copy, Check, Sparkles, User, ArrowRight } from 'lucide-react';
import AuthorMetadata from '../components/AuthorMetadata';
import FaqSection from '../components/FaqSection';
import RelatedResources from '../components/RelatedResources';
import { ROUTE_SEO_MAP } from '../utils/seoData';

export default function LinkedInOptimizerPage() {
  const seoInfo = ROUTE_SEO_MAP['/linkedin-optimizer'];
  const [role, setRole] = useState('Senior Full Stack Engineer');
  const [skills, setSkills] = useState('React, Node.js, TypeScript, PostgreSQL, AWS');
  const [metric, setMetric] = useState('reduced API latency by 45% and scaled microservices to 2M daily users');
  const [generatedBio, setGeneratedBio] = useState('');
  const [generatedHeadline, setGeneratedHeadline] = useState('');
  const [copied, setCopied] = useState(false);

  const handleOptimize = (e) => {
    if (e) e.preventDefault();

    const headline = `${role} | ${skills} | Ex-CloudPulse | Speaker & Open Source Contributor`;
    const bio = `Passionate ${role} dedicated to engineering scalable web software and high-throughput systems.\n\n🚀 Key Expertise:\n• Technical Stack: ${skills}\n• Major Impact: Spearheaded architecture overhauls that ${metric}.\n\n📫 Open to networking and technical collaboration. Feel free to connect!`;

    setGeneratedHeadline(headline);
    setGeneratedBio(bio);
  };

  const handleCopy = (txt) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem', color: '#1e293b' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e0f2fe', color: '#0369a1', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
          <Share2 size={16} /> LinkedIn Profile & Headline Optimizer
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
          {seoInfo.h1}
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
          Convert your resume into an optimized LinkedIn About bio and headline designed to attract recruiter InMail messages.
        </p>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <AuthorMetadata />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        {/* Input */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Profile Inputs</h2>
          <form onSubmit={handleOptimize} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>Target Role Title</label>
              <input type="text" value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>Top Skills (Comma Separated)</label>
              <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>Major Outcome / Metric</label>
              <textarea rows={2} value={metric} onChange={(e) => setMetric(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'inherit' }} />
            </div>

            <button type="submit" style={{ width: '100%', padding: '0.85rem', borderRadius: '10px', border: 'none', background: '#0284c7', color: '#ffffff', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <Sparkles size={18} /> Generate LinkedIn Bio & Headline
            </button>
          </form>
        </div>

        {/* Output */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Optimized Profile Content</h2>
            {generatedHeadline ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0284c7' }}>OPTIMIZED HEADLINE</span>
                  <p style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 700, margin: '0.3rem 0' }}>{generatedHeadline}</p>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0284c7' }}>OPTIMIZED ABOUT BIO</span>
                  <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: '0.3rem 0' }}>{generatedBio}</p>
                </div>
              </div>
            ) : (
              <div style={{ background: '#f8fafc', padding: '3rem 1.5rem', borderRadius: '10px', textAlign: 'center', color: '#94a3b8', border: '2px dashed #cbd5e1' }}>
                <Share2 size={36} color="#cbd5e1" style={{ marginBottom: '0.5rem' }} />
                <p style={{ fontWeight: 600 }}>Click "Generate LinkedIn Bio & Headline" to view optimized content.</p>
              </div>
            )}
          </div>

          {generatedHeadline && (
            <button
              onClick={() => handleCopy(`${generatedHeadline}\n\n${generatedBio}`)}
              style={{ marginTop: '1.5rem', padding: '0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#1e293b', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
            >
              {copied ? <Check size={16} color="#16a34a" /> : <Copy size={16} />}
              {copied ? 'Copied Profile Content!' : 'Copy Headline & Bio'}
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <FaqSection faqs={seoInfo.faqs} title="LinkedIn Profile FAQs" />
        <RelatedResources currentPath="/linkedin-optimizer" />
      </div>
    </div>
  );
}
