import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Sparkles, AlertTriangle, CheckCircle, RefreshCw, FileText, BarChart3, Zap } from 'lucide-react';
import { auditRawResumeText } from '../../utils/ai';
import { trackAtsCheckCompleted } from '../../services/analytics';
import AtsTips from '../AtsTips';
import AuthorMetadata from '../../components/AuthorMetadata';
import FaqSection from '../../components/FaqSection';
import RelatedResources from '../../components/RelatedResources';
import { ROUTE_SEO_MAP } from '../../utils/seoData';

const DEMO_RESUME_TEXT = `Alex Vance
Senior Full Stack Engineer | San Francisco, CA | alex.vance@example.com | (555) 019-2834 | linkedin.com/in/alexvance

PROFESSIONAL SUMMARY
Dynamic Senior Full Stack Engineer with 6+ years of experience engineering high-throughput microservices and responsive React applications. Spearheaded cloud architecture migrations that improved uptime to 99.99% and reduced server latency by 42%.

WORK EXPERIENCE
Senior Full Stack Engineer | CloudPulse Analytics (2022 - Present)
• Architected a real-time data streaming pipeline using Node.js, Kafka, and React, processing 2M+ daily active user events.
• Reduced web bundle size by 38% and optimized Largest Contentful Paint (LCP) from 3.2s to 1.1s.
• Led a cross-functional team of 8 developers, delivering 14 major feature releases ahead of schedule.

Software Engineer | TechNova Solutions (2019 - 2022)
• Developed 20+ reusable React UI components, standardizing design systems across 3 product lines.
• Integrated PostgreSQL database indexing and Redis caching, cutting API query response times by 55%.

SKILLS & TECHNOLOGIES
JavaScript, TypeScript, React, Node.js, Express, PostgreSQL, Redis, Docker, AWS, Git, REST APIs, GraphQL, CI/CD

EDUCATION
Bachelor of Science in Computer Science | University of California, Berkeley (2015 - 2019)`;

export default function AtsCheckerPage() {
  const seoInfo = ROUTE_SEO_MAP['/ats-resume-checker'];
  const [resumeText, setResumeText] = useState('');
  const [auditResult, setAuditResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = (e) => {
    if (e) e.preventDefault();
    setIsScanning(true);
    setTimeout(() => {
      const res = auditRawResumeText(resumeText);
      setAuditResult(res);
      setIsScanning(false);
      trackAtsCheckCompleted(res.score);
    }, 450);
  };

  const getScoreColor = (score) => {
    if (score >= 75) return '#16a34a';
    if (score >= 50) return '#d97706';
    return '#dc2626';
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 1.5rem', color: '#1e293b' }}>
      {/* Hero Header */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff', borderRadius: '24px', padding: '3.5rem 2rem', textAlign: 'center', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', color: '#818cf8', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1.2rem' }}>
          <ShieldCheck size={16} /> Instant Online ATS Resume Compatibility Checker
        </div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
          {seoInfo.h1}
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#94a3b8', maxWidth: '720px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
          Many resumes are filtered out by Applicant Tracking Systems (ATS) due to formatting errors and missing keywords. Paste your resume text below for instant AI diagnostic scoring and optimization recommendations.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#interactive-scanner" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '0.85rem 2rem', borderRadius: '12px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 8px 24px rgba(79,70,229,0.4)' }}>
              Run Live Scanner <Sparkles size={18} />
            </button>
          </a>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '0.85rem 2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Create ATS Resume <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <AuthorMetadata />
      </div>

      {/* Interactive Live Scanner Tool */}
      <div id="interactive-scanner" style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '2.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={24} color="#4f46e5" /> Interactive ATS Scanner & Diagnostic Tool
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.2rem' }}>
              Paste your raw resume text to audit formatting, verb density, action metrics, and skills.
            </p>
          </div>
          <button
            onClick={() => setResumeText(DEMO_RESUME_TEXT)}
            style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <RefreshCw size={14} /> Load Sample Resume
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: auditResult ? '1fr 1fr' : '1fr', gap: '2rem' }}>
          {/* Left: Input Textarea */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>
              Paste Resume Content (Plain Text):
            </label>
            <textarea
              rows={16}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your complete resume here..."
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', fontFamily: 'monospace', lineHeight: 1.5, color: '#0f172a', resize: 'vertical' }}
            />
            <button
              onClick={handleScan}
              disabled={isScanning || !resumeText.trim()}
              style={{ width: '100%', padding: '0.95rem', borderRadius: '12px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(79,70,229,0.3)' }}
            >
              {isScanning ? 'Scanning ATS Compatibility...' : 'Scan Resume ATS Score Now'} <Zap size={18} />
            </button>
          </div>

          {/* Right: Results Panel */}
          {auditResult && (
            <div style={{ background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                {/* Score Header */}
                <div style={{ textAlign: 'center', marginBottom: '1.8rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.5px' }}>
                    (Example result) Overall ATS Readiness Score
                  </span>
                  <div style={{ fontSize: '3.6rem', fontWeight: 900, color: getScoreColor(auditResult.score), margin: '0.2rem 0' }}>
                    {auditResult.score}<span style={{ fontSize: '1.5rem', color: '#94a3b8' }}>/100</span>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', borderRadius: '20px', background: auditResult.score >= 75 ? '#dcfce7' : '#fef3c7', color: auditResult.score >= 75 ? '#166534' : '#92400e', fontSize: '0.85rem', fontWeight: 800 }}>
                    {auditResult.score >= 75 ? <CheckCircle size={15} /> : <AlertTriangle size={15} />}
                    {auditResult.score >= 75 ? 'ATS Optimized & Screen-Ready' : 'Optimization Required'}
                  </div>
                </div>

                {/* Score Breakdown Progress Bars */}
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem' }}>Section Breakdown:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.2rem' }}>
                      <span>Contact & Personal Info</span>
                      <span>{auditResult.breakdown.contactScore}/20</span>
                    </div>
                    <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${(auditResult.breakdown.contactScore / 20) * 100}%`, height: '100%', background: '#4f46e5' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.2rem' }}>
                      <span>Professional Summary</span>
                      <span>{auditResult.breakdown.summaryScore}/15</span>
                    </div>
                    <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${(auditResult.breakdown.summaryScore / 15) * 100}%`, height: '100%', background: '#0284c7' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.2rem' }}>
                      <span>Work Experience & Metrics</span>
                      <span>{auditResult.breakdown.experienceScore}/30</span>
                    </div>
                    <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${(auditResult.breakdown.experienceScore / 30) * 100}%`, height: '100%', background: '#16a34a' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.2rem' }}>
                      <span>Skills & Keywords</span>
                      <span>{auditResult.breakdown.skillsScore}/20</span>
                    </div>
                    <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${(auditResult.breakdown.skillsScore / 20) * 100}%`, height: '100%', background: '#d97706' }} />
                    </div>
                  </div>
                </div>

                {/* Audit Signals */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: '#ffffff', padding: '0.8rem', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>Metrics Detected</span>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>{auditResult.detectedMetricsCount}</div>
                  </div>
                  <div style={{ background: '#ffffff', padding: '0.8rem', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>Action Verbs Detected</span>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>{auditResult.detectedActionVerbsCount}</div>
                  </div>
                </div>

                {/* Key Recommendations */}
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Actionable Recommendations:</h4>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                  {auditResult.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>

              <Link to="/" style={{ textDecoration: 'none', marginTop: '1.5rem' }}>
                <button style={{ width: '100%', padding: '0.85rem', borderRadius: '10px', border: 'none', background: '#0f172a', color: '#ffffff', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                  <FileText size={16} /> Open Resume Builder Editor
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <AtsTips isEmbedded={true} />

      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <FaqSection faqs={seoInfo.faqs} title="ATS Resume Checker FAQs" />
        <RelatedResources currentPath="/ats-resume-checker" />
      </div>
    </div>
  );
}
