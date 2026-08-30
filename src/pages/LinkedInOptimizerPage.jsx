import React, { useState } from 'react';
import { Share2, Sparkles, Copy, Check, UserCheck, ShieldCheck, Download } from 'lucide-react';

export default function LinkedInOptimizerPage() {
  const [fullName, setFullName] = useState('Alex Vance');
  const [currentRole, setCurrentRole] = useState('Senior Full Stack Engineer');
  const [topSkills, setTopSkills] = useState('React, Node.js, TypeScript, Cloud Architecture, PostgreSQL');
  const [keyMetric, setKeyMetric] = useState('architected microservices serving 2M+ daily active users with 99.99% uptime');
  
  const [headline, setHeadline] = useState('');
  const [bioText, setBioText] = useState('');
  const [copiedHeadline, setCopiedHeadline] = useState(false);
  const [copiedBio, setCopiedBio] = useState(false);

  const handleOptimize = (e) => {
    if (e) e.preventDefault();

    const generatedHeadline = `${currentRole} | ${topSkills.split(',').slice(0, 3).join(' • ')} | Building High-Throughput Scalable Systems`;
    const generatedBio = `👋 Hi, I'm ${fullName}! I'm a ${currentRole} passionate about building scalable, resilient software applications and delivering exceptional user experiences.

🚀 CORE SPECIALIZATIONS:
${topSkills.split(',').map(s => `• ${s.trim()}`).join('\n')}

📈 CAREER HIGHLIGHTS:
• In my recent work, I ${keyMetric}.
• Experienced in leading cross-functional engineering teams, conducting code reviews, and optimizing continuous integration pipelines.
• Dedicated to clean architecture, performance optimization, and data-driven product execution.

📫 Open to technical discussions, advisory, and high-impact engineering opportunities. Let's connect!`;

    setHeadline(generatedHeadline);
    setBioText(generatedBio);
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'headline') {
      setCopiedHeadline(true);
      setTimeout(() => setCopiedHeadline(false), 2000);
    } else {
      setCopiedBio(true);
      setTimeout(() => setCopiedBio(false), 2000);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem', color: '#1e293b' }}>
      {/* Hero Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#0077b5', color: '#ffffff', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1rem' }}>
          <Share2 size={16} /> LinkedIn Profile Optimizer & Bio Generator
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
          Turn Your Resume into a Recruiter-Magnet LinkedIn Profile
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
          Generate optimized LinkedIn Headlines, About bios, and keyword tags designed to boost recruiter search rankings and InMail outreach.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
        {/* Form Inputs */}
        <form onSubmit={handleOptimize} style={{ background: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} color="#0077b5" /> Profile Customizer
          </h2>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>Full Name</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} required />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>Current Role Title</label>
            <input type="text" value={currentRole} onChange={(e) => setCurrentRole(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} required />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>Top Skills (Comma Separated)</label>
            <input type="text" value={topSkills} onChange={(e) => setTopSkills(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} required />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>Key Achievement / Metric</label>
            <textarea rows={3} value={keyMetric} onChange={(e) => setKeyMetric(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'inherit' }} required />
          </div>

          <button type="submit" style={{ padding: '0.85rem', borderRadius: '10px', border: 'none', background: '#0077b5', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(0,119,181,0.3)' }}>
            <Sparkles size={18} /> Generate Optimized LinkedIn Bio
          </button>
        </form>

        {/* Generated Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Headline Box */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>LinkedIn Headline</h3>
              {headline && (
                <button onClick={() => copyToClipboard(headline, 'headline')} style={{ border: 'none', background: '#e0f2fe', color: '#0369a1', padding: '0.35rem 0.7rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  {copiedHeadline ? <Check size={14} /> : <Copy size={14} />}
                  {copiedHeadline ? 'Copied!' : 'Copy Headline'}
                </button>
              )}
            </div>
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.9rem', color: '#0f172a', fontWeight: 700, minHeight: '50px' }}>
              {headline || 'Fill out the form and click generate.'}
            </div>
          </div>

          {/* About Bio Box */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>LinkedIn About Bio</h3>
                {bioText && (
                  <button onClick={() => copyToClipboard(bioText, 'bio')} style={{ border: 'none', background: '#0077b5', color: '#ffffff', padding: '0.35rem 0.7rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {copiedBio ? <Check size={14} /> : <Copy size={14} />}
                    {copiedBio ? 'Copied!' : 'Copy Bio'}
                  </button>
                )}
              </div>
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.6, whiteSpace: 'pre-wrap', minHeight: '200px' }}>
                {bioText || 'Click generate to create your custom bio.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
