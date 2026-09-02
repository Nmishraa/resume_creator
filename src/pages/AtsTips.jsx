import React, { useState } from 'react';
import { Target, CheckCircle, AlertTriangle, HelpCircle, Zap, ShieldCheck, Sparkles, BookOpen, Layers, Award } from 'lucide-react';
import AuthorMetadata from '../components/AuthorMetadata';
import FaqSection from '../components/FaqSection';
import RelatedResources from '../components/RelatedResources';
import { ROUTE_SEO_MAP } from '../utils/seoData';

const ACTION_VERBS = {
  Leadership: ['Architected', 'Spearheaded', 'Directed', 'Championed', 'Orchestrated', 'Guided', 'Mentored', 'Pioneered'],
  Technical: ['Implemented', 'Engineered', 'Optimized', 'Refactored', 'Deployed', 'Configured', 'Automated', 'Migrated'],
  Growth: ['Accelerated', 'Expanded', 'Scaled', 'Maximized', 'Increased', 'Boosted', 'Generated', 'Acquired'],
  Efficiency: ['Streamlined', 'Reduced', 'Eliminated', 'Condensed', 'Consolidated', 'Automated', 'Standardized']
};

export default function AtsTips({ isEmbedded = false }) {
  const seoInfo = ROUTE_SEO_MAP['/ats-tips'];
  const [activeTab, setActiveTab] = useState('analyzer');
  const [bulletText, setBulletText] = useState('• Spearheaded frontend migration to React & TypeScript, improving page load speed by 45% and reducing customer support tickets by 200/month.');

  // Analyzer Logic
  const analyzeText = (text) => {
    if (!text.trim()) return null;

    const words = text.trim().split(/\s+/);
    const wordCount = words.length;

    // Check for metrics (numbers, %, $, x)
    const hasMetrics = /\d+%|\$\d+|\d+x|\d+\+|\d+/.test(text);

    // Check for action verbs
    const lowerText = text.toLowerCase();
    let foundVerbs = [];
    Object.values(ACTION_VERBS).flat().forEach((verb) => {
      if (lowerText.includes(verb.toLowerCase())) {
        foundVerbs.push(verb);
      }
    });

    // Check for weak phrases
    const weakPhrases = ['responsible for', 'helped with', 'worked on', 'assisted in', 'duties included'];
    const foundWeak = weakPhrases.filter((phrase) => lowerText.includes(phrase));

    // Calculate score
    let score = 60;
    if (foundVerbs.length > 0) score += 20;
    if (hasMetrics) score += 20;
    if (foundWeak.length > 0) score -= 25;
    if (wordCount >= 10 && wordCount <= 25) score += 10;

    score = Math.min(100, Math.max(20, score));

    return {
      score,
      wordCount,
      hasMetrics,
      foundVerbs,
      foundWeak
    };
  };

  const analysis = analyzeText(bulletText);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem', color: '#1e293b' }}>
      {/* Hero Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#dcfce7', color: '#15803d', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
          <ShieldCheck size={16} /> ATS Optimization Masterclass
        </div>
        {isEmbedded ? (
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            Beat the Applicant Tracking System (ATS)
          </h2>
        ) : (
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            Beat the Applicant Tracking System (ATS)
          </h1>
        )}
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
          Learn how systems like Workday, Greenhouse, and Lever parse your resume. Test your bullet points in real-time and discover the formulas top candidates use.
        </p>
      </div>

      {!isEmbedded && (
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <AuthorMetadata />
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', borderBottom: '2px solid #e2e8f0', marginBottom: '2.5rem' }}>
        <button
          onClick={() => setActiveTab('analyzer')}
          style={{
            padding: '0.8rem 1.5rem',
            border: 'none',
            borderBottom: activeTab === 'analyzer' ? '3px solid #4f46e5' : '3px solid transparent',
            background: 'none',
            color: activeTab === 'analyzer' ? '#4f46e5' : '#64748b',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Zap size={18} /> Bullet Point Analyzer
        </button>

        <button
          onClick={() => setActiveTab('formula')}
          style={{
            padding: '0.8rem 1.5rem',
            border: 'none',
            borderBottom: activeTab === 'formula' ? '3px solid #4f46e5' : '3px solid transparent',
            background: 'none',
            color: activeTab === 'formula' ? '#4f46e5' : '#64748b',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Target size={18} /> Google X-Y-Z Formula
        </button>

        <button
          onClick={() => setActiveTab('verbs')}
          style={{
            padding: '0.8rem 1.5rem',
            border: 'none',
            borderBottom: activeTab === 'verbs' ? '3px solid #4f46e5' : '3px solid transparent',
            background: 'none',
            color: activeTab === 'verbs' ? '#4f46e5' : '#64748b',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Sparkles size={18} /> Power Action Verbs
        </button>

        <button
          onClick={() => setActiveTab('myths')}
          style={{
            padding: '0.8rem 1.5rem',
            border: 'none',
            borderBottom: activeTab === 'myths' ? '3px solid #4f46e5' : '3px solid transparent',
            background: 'none',
            color: activeTab === 'myths' ? '#4f46e5' : '#64748b',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <BookOpen size={18} /> ATS Rules & Myths
        </button>
      </div>

      {/* Tab 1: Live Analyzer */}
      {activeTab === 'analyzer' && (
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            Instant ATS Bullet Point Evaluator
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '1.5rem' }}>
            Paste any accomplishment bullet point from your resume to check its ATS strength score, action verb presence, and quantifiable metrics.
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', color: '#334155' }}>
              Your Resume Bullet Point:
            </label>
            <textarea
              rows={3}
              value={bulletText}
              onChange={(e) => setBulletText(e.target.value)}
              placeholder="e.g. Architected and launched a microservices API using Node.js..."
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '10px',
                border: '1.5px solid #cbd5e1',
                fontFamily: 'inherit',
                fontSize: '1rem',
                color: '#1e293b',
                outline: 'none',
                lineHeight: 1.5
              }}
            />
          </div>

          {analysis && (
            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>ATS Impact Score</span>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: analysis.score >= 80 ? '#16a34a' : analysis.score >= 60 ? '#d97706' : '#dc2626' }}>
                    {analysis.score} <span style={{ fontSize: '1.2rem', color: '#94a3b8' }}>/ 100</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ background: analysis.foundVerbs.length > 0 ? '#dcfce7' : '#fee2e2', color: analysis.foundVerbs.length > 0 ? '#15803d' : '#991b1b', padding: '0.6rem 1rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {analysis.foundVerbs.length > 0 ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                    {analysis.foundVerbs.length > 0 ? `Action Verb Found: (${analysis.foundVerbs.join(', ')})` : 'Missing Strong Action Verb'}
                  </div>

                  <div style={{ background: analysis.hasMetrics ? '#dcfce7' : '#fef3c7', color: analysis.hasMetrics ? '#15803d' : '#b45309', padding: '0.6rem 1rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {analysis.hasMetrics ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                    {analysis.hasMetrics ? 'Quantifiable Metric Present (%, $, #)' : 'No Numbers / Metrics Found'}
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.6rem' }}>Optimization Feedback:</h4>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                  {!analysis.hasMetrics && (
                    <li style={{ color: '#b45309', marginBottom: '0.3rem' }}>
                      <strong>Add Quantifiable Proof:</strong> Include specific numbers, percentages, team size, or revenue impact (e.g. "by 30%", "saving $50K", "for 100,000+ users").
                    </li>
                  )}
                  {analysis.foundWeak.length > 0 && (
                    <li style={{ color: '#dc2626', marginBottom: '0.3rem' }}>
                      <strong>Remove Weak Passive Words:</strong> Avoid passive phrasing like "{analysis.foundWeak.join(', ')}". Start directly with high-impact verbs like "Led", "Engineered", or "Spearheaded".
                    </li>
                  )}
                  {analysis.hasMetrics && analysis.foundVerbs.length > 0 && (
                    <li style={{ color: '#16a34a' }}>
                      <strong>Excellent Bullet Structure!</strong> You started with a strong power verb and provided clear measurable results.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Formula */}
      {activeTab === 'formula' && (
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            The Google X-Y-Z Accomplishment Formula
          </h2>
          <p style={{ fontSize: '1rem', color: '#64748b', marginBottom: '2rem', lineHeight: 1.6 }}>
            Google recruiters famously advocate for writing every bullet point using this exact structure to maximize ATS ranking and hiring manager interest:
          </p>

          <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)', color: '#ffffff', padding: '2rem', borderRadius: '16px', marginBottom: '2.5rem', textAlign: 'center', boxShadow: '0 8px 24px rgba(79,70,229,0.3)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '0.02em' }}>
              "Accomplished <span style={{ color: '#93c5fd' }}>[X]</span> as measured by <span style={{ color: '#86efac' }}>[Y]</span>, by doing <span style={{ color: '#fde047' }}>[Z]</span>"
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#3b82f6', marginBottom: '0.5rem' }}>[X] = What you achieved</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569' }}>The main business outcome or problem you solved (e.g. "Reduced application crash rate").</p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#22c55e', marginBottom: '0.5rem' }}>[Y] = The measurable metric</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569' }}>Concrete percentage, dollar amount, or time saved (e.g. "by 60% over 3 months").</p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#eab308', marginBottom: '0.5rem' }}>[Z] = How you did it</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569' }}>Specific technical tools, algorithms, or methodologies used (e.g. "by implementing automated Sentry error handling and TypeScript").</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Power Action Verbs */}
      {activeTab === 'verbs' && (
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            High-Impact ATS Action Verbs Directory
          </h2>
          <p style={{ fontSize: '1rem', color: '#64748b', marginBottom: '2rem' }}>
            Replace passive phrases like "worked on" or "helped with" with these recruiter-tested power verbs:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {Object.entries(ACTION_VERBS).map(([category, verbs]) => (
              <div key={category} style={{ background: '#f8fafc', borderRadius: '12px', padding: '1.5rem', border: '1px solid #cbd5e1' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#4f46e5', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Award size={18} /> {category}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {verbs.map((v) => (
                    <span key={v} style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Rules & Myths */}
      {activeTab === 'myths' && (
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
            ATS Truths vs Common Myths
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1.2rem', borderRadius: '10px', background: '#fef2f2', borderLeft: '4px solid #ef4444' }}>
              <h4 style={{ color: '#991b1b', fontWeight: 800, margin: '0 0 0.3rem 0' }}>❌ Myth: "You must use white text to hide keywords."</h4>
              <p style={{ color: '#7f1d1d', margin: 0, fontSize: '0.9rem' }}>
                <strong>Fact:</strong> Modern ATS parsers like Workday and Lever strip styling and flag hidden text as spam, automatically rejecting your application.
              </p>
            </div>

            <div style={{ padding: '1.2rem', borderRadius: '10px', background: '#f0fdf4', borderLeft: '4px solid #22c55e' }}>
              <h4 style={{ color: '#166534', fontWeight: 800, margin: '0 0 0.3rem 0' }}>✅ Fact: Single-column PDF layouts ensure clean text-stream extraction.</h4>
              <p style={{ color: '#14532d', margin: 0, fontSize: '0.9rem' }}>
                Standard single-column PDFs created with clean HTML typography (like Resume & CV Craft exports) maintain 100% linear text reading order across ATS text parsers.
              </p>
            </div>

            <div style={{ padding: '1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #cbd5e1', marginTop: '1rem' }}>
              <h4 style={{ color: '#0f172a', fontWeight: 800, margin: '0 0 0.5rem 0', fontSize: '1.05rem' }}>🔬 How We Test ATS Compatibility</h4>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 0.75rem 0' }}>
                Our templates undergo automated PDF text extraction testing using PDF.js and plain-text stream parsing tools to simulate backend parser behavior in Workday, Greenhouse, Lever, Taleo, and iCIMS. We verify that dates, company names, titles, and bullet metrics parse into structured fields to reduce the risk of text corruption during automated resume parsing.
              </p>
            </div>

            <div style={{ padding: '1.2rem', borderRadius: '10px', background: '#fef2f2', borderLeft: '4px solid #ef4444' }}>
              <h4 style={{ color: '#991b1b', fontWeight: 800, margin: '0 0 0.3rem 0' }}>❌ Myth: "Putting vital contact details inside page headers or footers is fine."</h4>
              <p style={{ color: '#7f1d1d', margin: 0, fontSize: '0.9rem' }}>
                <strong>Fact:</strong> Many ATS parsers ignore header/footer margins completely, missing your email and phone number! Keep contact info in the body flow.
              </p>
            </div>
          </div>
        </div>
      )}

      {!isEmbedded && (
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <FaqSection faqs={seoInfo.faqs} title="ATS Optimization FAQs" />
          <RelatedResources currentPath="/ats-tips" />
        </div>
      )}
    </div>
  );
}
