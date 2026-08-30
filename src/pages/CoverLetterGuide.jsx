import React, { useState } from 'react';
import { Mail, Copy, Check, Sparkles, FileText, Download, Send, RefreshCw, Printer } from 'lucide-react';

const COVER_LETTER_TEMPLATES = [
  {
    id: 'cl-tech',
    title: 'Software Engineering / Tech Role',
    role: 'Senior Full Stack Engineer',
    company: 'TechCorp',
    content: `Dear Hiring Manager,

I am writing to express my strong enthusiasm for the Senior Full Stack Engineer position at TechCorp. With over 6 years of experience building scalable microservices and high-throughput web applications using React, Node.js, and cloud architecture, I am eager to contribute to TechCorp's mission of building seamless developer tools.

In my previous role at CloudPulse Analytics, I architected a real-time data streaming platform that processed 2M+ daily events with 99.99% uptime and led a frontend performance overhaul that improved page load speeds by 52%. My approach combines rigorous software design with a focus on user experience and business outcomes.

What particularly draws me to TechCorp is your commitment to open-source software and engineering excellence. I thrive in collaborative, fast-paced environments where continuous integration and high engineering standards are valued.

I would welcome the opportunity to discuss how my technical expertise and passion for building scalable software align with TechCorp's goals. Thank you for your time and consideration.

Sincerely,
Alex Vance`
  },
  {
    id: 'cl-pm',
    title: 'Product & Management Role',
    role: 'Lead Product Manager',
    company: 'Stripe / Fintech',
    content: `Dear Hiring Team,

I was thrilled to see the opening for Lead Product Manager at Stripe. Having spent the last 7 years driving product strategy, user discovery, and ARR expansion in fintech, I have long admired Stripe's customer-centric innovation and developer-first payments infrastructure.

At Finnovate Pay, I owned the checkout product suite, executing data-backed product roadmaps that delivered a 28% increase in conversion rates and generated $3.2M in incremental revenue. By conducting over 100 customer interviews and establishing rigorous A/B experimentation, I aligned cross-functional engineering and design squads to deliver high-impact feature releases.

I am excited about the prospect of applying my strategic product leadership to Stripe's global payments platform. 

Thank you for reviewing my application. I look forward to exploring how my background can drive value for your product teams.

Best regards,
Elena Rostova`
  },
  {
    id: 'cl-grad',
    title: 'New Graduate / Entry Level',
    role: 'Junior Software Engineer',
    company: 'InnovateX',
    content: `Dear Hiring Manager,

I am writing to apply for the Junior Software Engineer role at InnovateX. As a recent Computer Science graduate from the University of Washington with hands-on internship experience in full-stack web development, I am eager to begin my career by contributing to InnovateX's cutting-edge projects.

During my software engineering internship at InnovateX Labs, I built responsive React components for a customer portal serving 10,000+ monthly users and improved unit test coverage from 60% to 82%. My academic work focused on algorithms, database design, and software engineering principles, graduating with a 3.85 GPA.

I am deeply impressed by InnovateX's rapid growth and culture of continuous learning. I am confident that my strong technical foundation and enthusiasm for clean code make me a valuable addition to your team.

Thank you for your time and consideration. I look forward to hearing from you.

Warm regards,
Marcus Thorne`
  }
];

export default function CoverLetterGuide() {
  const [activeTab, setActiveTab] = useState('generator');

  // Generator Form State
  const [candidateName, setCandidateName] = useState('Alex Vance');
  const [targetRole, setTargetRole] = useState('Senior Software Engineer');
  const [targetCompany, setTargetCompany] = useState('Google');
  const [tone, setTone] = useState('professional');
  const [keyMetric, setKeyMetric] = useState('architected real-time microservices that boosted throughput by 45%');
  const [topSkill, setTopSkill] = useState('React, Node.js, and Cloud Infrastructure');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e) => {
    if (e) e.preventDefault();

    let opening = `Dear Hiring Team at ${targetCompany},`;
    let closing = `Sincerely,\n${candidateName}`;
    let bodyIntro = `I am writing to express my strong interest in the ${targetRole} position at ${targetCompany}. With extensive experience in ${topSkill}, I have dedicated my career to building high-performance, resilient solutions that directly drive organization growth.`;

    if (tone === 'energetic') {
      bodyIntro = `I was thrilled to come across the ${targetRole} opening at ${targetCompany}! As a passionate professional specializing in ${topSkill}, I am inspired by ${targetCompany}'s commitment to product innovation and user excellence.`;
      closing = `Warmest regards,\n${candidateName}`;
    } else if (tone === 'executive') {
      bodyIntro = `It is with great enthusiasm that I submit my candidature for the ${targetRole} position at ${targetCompany}. Throughout my career in ${topSkill}, I have built a track record of driving strategic execution, cross-functional leadership, and operational scalability.`;
      closing = `Respectfully submitted,\n${candidateName}`;
    } else if (tone === 'direct') {
      bodyIntro = `I am applying for the ${targetRole} role at ${targetCompany}. Given my background in ${topSkill}, I offer proven technical rigor and immediate value delivery for your engineering team.`;
      closing = `Best,\n${candidateName}`;
    }

    const bodyMetric = `In my previous role, I successfully ${keyMetric}. I take pride in establishing robust software design patterns, mentoring team members, and ensuring projects launch seamlessly on schedule.`;
    const bodyCulture = `What excites me most about joining ${targetCompany} is your team's relentless focus on quality and innovation. I am confident that my technical skills and proactive problem-solving mindset make me an exceptional fit for your culture.`;
    const bodyCallToAction = `Thank you for taking the time to review my application. I would welcome the opportunity to discuss how my experience and vision align with ${targetCompany}'s goals.`;

    const letter = `${opening}\n\n${bodyIntro}\n\n${bodyMetric}\n\n${bodyCulture}\n\n${bodyCallToAction}\n\n${closing}`;
    setGeneratedLetter(letter);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = (text, filename = 'cover_letter.txt') => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${candidateName} - Cover Letter</title>
          <style>
            body { font-family: 'Times New Roman', serif; margin: 2in; line-height: 1.6; color: #111; }
            p { white-space: pre-wrap; font-size: 11pt; }
          </style>
        </head>
        <body>
          <p>${generatedLetter || 'No letter generated.'}</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem', color: '#1e293b' }}>
      {/* Hero Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#fce7f3', color: '#be185d', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
          <Mail size={16} /> Interactive AI Cover Letter Generator
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
          Write Job-Winning Cover Letters in Seconds
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
          Generate custom, recruiter-tested cover letters or explore proven templates tailored for software engineering, product management, and career transitions.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', borderBottom: '2px solid #e2e8f0', marginBottom: '2.5rem' }}>
        <button
          onClick={() => setActiveTab('generator')}
          style={{
            padding: '0.8rem 1.5rem',
            border: 'none',
            borderBottom: activeTab === 'generator' ? '3px solid #4f46e5' : '3px solid transparent',
            background: 'none',
            color: activeTab === 'generator' ? '#4f46e5' : '#64748b',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Sparkles size={18} /> Interactive Cover Letter Builder
        </button>

        <button
          onClick={() => setActiveTab('examples')}
          style={{
            padding: '0.8rem 1.5rem',
            border: 'none',
            borderBottom: activeTab === 'examples' ? '3px solid #4f46e5' : '3px solid transparent',
            background: 'none',
            color: activeTab === 'examples' ? '#4f46e5' : '#64748b',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <FileText size={18} /> Proven Examples Library
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
          <Send size={18} /> The 4-Paragraph Blueprint
        </button>
      </div>

      {/* Tab 1: Generator */}
      {activeTab === 'generator' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          {/* Input Form */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={20} color="#4f46e5" /> Customize Inputs
            </h2>

            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>Your Full Name</label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>Target Job Title</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>Target Company Name</label>
                <input
                  type="text"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>Tone Style</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', background: '#ffffff' }}
                >
                  <option value="professional">Professional & Balanced</option>
                  <option value="energetic">Enthusiastic & High-Energy</option>
                  <option value="executive">Executive & Strategic</option>
                  <option value="direct">Direct & Concise</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>Top Skills / Specialization</label>
                <input
                  type="text"
                  value={topSkill}
                  onChange={(e) => setTopSkill(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>Key Accomplishment / Metric</label>
                <textarea
                  rows={2}
                  value={keyMetric}
                  onChange={(e) => setKeyMetric(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', fontFamily: 'inherit' }}
                  required
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: '0.85rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#4f46e5',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                  boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <Sparkles size={18} /> Generate Cover Letter Now
              </button>
            </form>
          </div>

          {/* Generated Result Card */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>Generated Cover Letter</h3>
                {generatedLetter && (
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      onClick={() => handleCopy(generatedLetter)}
                      style={{ padding: '0.45rem 0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                    >
                      {copied ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>

                    <button
                      onClick={handlePrint}
                      style={{ padding: '0.45rem 0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                    >
                      <Printer size={14} /> Print / PDF
                    </button>

                    <button
                      onClick={() => handleDownloadTxt(generatedLetter, `${candidateName.replace(/\s+/g, '_')}_Cover_Letter.txt`)}
                      style={{ padding: '0.45rem 0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#4f46e5', color: '#ffffff', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                    >
                      <Download size={14} /> Save TXT
                    </button>
                  </div>
                )}
              </div>

              {generatedLetter ? (
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.9rem', color: '#334155', lineHeight: 1.65, whiteSpace: 'pre-wrap', fontFamily: 'Georgia, serif' }}>
                  {generatedLetter}
                </div>
              ) : (
                <div style={{ background: '#f8fafc', padding: '3rem 1.5rem', borderRadius: '10px', textAlign: 'center', color: '#94a3b8', border: '2px dashed #cbd5e1' }}>
                  <Mail size={36} color="#cbd5e1" style={{ marginBottom: '0.5rem' }} />
                  <p style={{ fontWeight: 600 }}>Fill out the form on the left and click "Generate Cover Letter Now" to create your letter.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Examples Library */}
      {activeTab === 'examples' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {COVER_LETTER_TEMPLATES.map((tpl) => (
            <div key={tpl.id} style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#4f46e5', letterSpacing: '0.05em' }}>{tpl.title}</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '0.3rem 0 1rem 0' }}>{tpl.role} at {tpl.company}</h3>

                <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, whiteSpace: 'pre-wrap', maxHeight: '280px', overflowY: 'auto' }}>
                  {tpl.content}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  onClick={() => handleCopy(tpl.content)}
                  style={{ flex: 1, padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                >
                  <Copy size={16} /> Copy Template
                </button>
                <button
                  onClick={() => handleDownloadTxt(tpl.content, `${tpl.id}_cover_letter.txt`)}
                  style={{ padding: '0.65rem 1rem', borderRadius: '8px', border: 'none', background: '#4f46e5', color: '#ffffff', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Download size={16} /> Save
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Formula */}
      {activeTab === 'formula' && (
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
            The 4-Paragraph Cover Letter Formula
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', borderRadius: '12px', background: '#f8fafc', borderLeft: '4px solid #4f46e5' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#4f46e5', marginBottom: '0.4rem' }}>Paragraph 1: The Hook & Position</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                State the exact role you are applying for, how you discovered it, and a brief 1-sentence hook expressing genuine enthusiasm for the company.
              </p>
            </div>

            <div style={{ padding: '1.5rem', borderRadius: '12px', background: '#f8fafc', borderLeft: '4px solid #0284c7' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0284c7', marginBottom: '0.4rem' }}>Paragraph 2: The Core Metric Pitch</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                Highlight 1-2 major career achievements directly relevant to the target job description. Use concrete metrics (e.g. percentages, revenue, latency reductions).
              </p>
            </div>

            <div style={{ padding: '1.5rem', borderRadius: '12px', background: '#f8fafc', borderLeft: '4px solid #059669' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669', marginBottom: '0.4rem' }}>Paragraph 3: Culture & Value Alignment</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                Demonstrate research by mentioning a specific company product, recent tech blog post, or corporate value that aligns with your work philosophy.
              </p>
            </div>

            <div style={{ padding: '1.5rem', borderRadius: '12px', background: '#f8fafc', borderLeft: '4px solid #d97706' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#d97706', marginBottom: '0.4rem' }}>Paragraph 4: Confident Call to Action (CTA)</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                Reiterate your excitement, thank the hiring manager, and invite them for an interview or conversation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
