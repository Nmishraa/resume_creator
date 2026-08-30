import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, FileText, CheckCircle2, ShieldCheck, ArrowRight, Zap, Award, Target, Download, BarChart2, Star, Eye, ExternalLink, UserCheck, Layers, FileCheck, X } from 'lucide-react';

export default function Home({ user }) {
  const navigate = useNavigate();
  const [activeSamplePdf, setActiveSamplePdf] = useState(null);

  const handleStartBuilding = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/editor/demo');
    }
  };

  const templates = [
    {
      id: 'modern',
      name: 'Modern Tech & Product',
      badge: 'Most Popular',
      color: '#4f46e5',
      desc: 'Single-column layout with clean hierarchy. Preferred by Tech, SaaS, and Product companies.',
      previewText: 'Senior Software Engineer • 5+ Yrs Exp • PyTorch, React, Node.js',
      sampleName: 'Jordan Alexander - Senior Full Stack Engineer.pdf'
    },
    {
      id: 'technical',
      name: 'AI & Data Engineering',
      badge: 'High ATS Score',
      color: '#0284c7',
      desc: 'Optimized for high keyword density, GitHub projects, and quantifiable metrics.',
      previewText: 'AI Engineer • LLM Fine-tuning • Reduced latency by 42% on 2M+ requests',
      sampleName: 'Alex Rivera - Senior AI & Data Lead.pdf'
    },
    {
      id: 'minimal',
      name: 'Minimal Executive',
      badge: 'Clean Classic',
      color: '#0f172a',
      desc: 'Timeless typography for management, finance, consulting, and senior leadership.',
      previewText: 'Director of Product • Scaled ARR from $2M to $12M • Managed 14 Engineers',
      sampleName: 'Marcus Thorne - Chief Operations Officer.pdf'
    },
    {
      id: 'student',
      name: 'Student & Entry-Level',
      badge: 'No Experience Needed',
      color: '#16a34a',
      desc: 'Puts education, hackathons, open-source work, and technical projects at the top.',
      previewText: 'CS Graduate • 3.8 GPA • Hackathon Winner • Open Source Contributor',
      sampleName: 'Sarah Chen - Entry Level CS Graduate.pdf'
    }
  ];

  const testimonials = [
    {
      name: 'Marcus K.',
      role: 'Senior Machine Learning Engineer',
      company: 'Landed Interviews at Meta & Stripe',
      text: 'The AI Engineer template and ATS checker caught 6 missing framework keywords that were holding my old resume back. Got 4 recruiter calls in my first week!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    },
    {
      name: 'Priya Sharma',
      role: 'Full Stack Developer',
      company: 'Landed Role at Cloudflare',
      text: 'Finally a resume builder that is 100% free with zero credit card traps or hidden paywalls. Exported a crisp vector PDF in under 10 minutes.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80'
    },
    {
      name: 'David Lin',
      role: 'CS Graduate (Class of 2026)',
      company: 'New Grad Software Engineer',
      text: 'The Google X-Y-Z bullet optimizer turned my basic academic projects into quantifiable achievement statements that impressed hiring managers.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div style={{ background: '#f8fafc', color: '#1e293b', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* HERO SECTION */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3.5rem 1.5rem 2.5rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e0e7ff', color: '#4338ca', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.88rem', fontWeight: 700, marginBottom: '1.5rem' }}>
          <Sparkles size={16} /> 100% Free AI Resume Builder & ATS Checker
        </div>

        <h1 style={{ fontSize: '3.2rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.15, letterSpacing: '-0.03em', maxWidth: '900px', margin: '0 auto 1.25rem' }}>
          Build ATS-Friendly Resumes & Optimize Key Metrics
        </h1>

        <p style={{ fontSize: '1.25rem', color: '#475569', maxWidth: '780px', margin: '0 auto 2.25rem', lineHeight: 1.6 }}>
          Create professional, ATS-optimized PDF resumes in minutes. Test your compatibility score against common ATS formatting guidelines and keyword criteria.
        </p>

        {/* Primary CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          <button
            onClick={handleStartBuilding}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)', color: '#ffffff', padding: '1rem 2.2rem', borderRadius: '14px', fontSize: '1.05rem', fontWeight: 800, border: 'none', cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)' }}
          >
            <FileText size={20} /> Create Resume Free <ArrowRight size={18} />
          </button>

          <Link to="/ats-resume-checker" style={{ textDecoration: 'none' }}>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#ffffff', color: '#0f172a', padding: '1rem 2rem', borderRadius: '14px', fontSize: '1.05rem', fontWeight: 700, border: '1px solid #cbd5e1', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <BarChart2 size={20} color="#4f46e5" /> Test ATS Score Free
            </button>
          </Link>
        </div>

        {/* Trust Badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', fontSize: '0.88rem', color: '#64748b', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><CheckCircle2 size={16} color="#22c55e" /> No Credit Card Required</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><ShieldCheck size={16} color="#22c55e" /> 100% Client-Side Privacy</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Download size={16} color="#22c55e" /> Instant Vector PDF Export</span>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '3.5rem 1.5rem', marginBottom: '3.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            How It Works in 3 Simple Steps
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Go from a blank page to a clean ATS resume in under 10 minutes.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.75rem', textAlign: 'left' }}>
              <div style={{ width: 44, height: 44, borderRadius: '12px', background: '#e0e7ff', color: '#4338ca', fontWeight: 900, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                01
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                Select an ATS Template
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                Choose a single-column layout built with standard web typography engineered for high text parser readability.
              </p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.75rem', textAlign: 'left' }}>
              <div style={{ width: 44, height: 44, borderRadius: '12px', background: '#e0f2fe', color: '#0369a1', fontWeight: 900, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                02
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                Fill & Optimize with AI
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                Use Google X-Y-Z bullet formulas and live ATS keyword scanners to highlight quantifiable achievements.
              </p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.75rem', textAlign: 'left' }}>
              <div style={{ width: 44, height: 44, borderRadius: '12px', background: '#dcfce7', color: '#15803d', fontWeight: 900, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                03
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                Download Instant PDF
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                Export a clean, vector text-selectable PDF ready for direct submission to corporate applicant portals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEMPLATE PREVIEW GRID WITH REAL RESUME LIGHTBOX */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 3.5rem', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
            Professional ATS Templates
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem' }}>
            Click any template to preview full-size sample data or open the builder.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              className="template-card"
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: tpl.color, background: `${tpl.color}15`, padding: '0.25rem 0.6rem', borderRadius: '6px' }}>
                    {tpl.badge}
                  </span>
                  <button 
                    onClick={() => setActiveSamplePdf(tpl)}
                    title="Preview full sample PDF layout"
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#4f46e5', fontSize: '0.78rem', fontWeight: 700 }}
                  >
                    <Eye size={16} /> Preview
                  </button>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  {tpl.name}
                </h3>

                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {tpl.desc}
                </p>

                {/* Realistic Miniature Document Thumbnail */}
                <div 
                  onClick={() => setActiveSamplePdf(tpl)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '10px',
                    padding: '0.85rem',
                    fontSize: '0.68rem',
                    color: '#334155',
                    marginBottom: '1.25rem',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.04)',
                    cursor: 'pointer',
                    position: 'relative',
                    height: '140px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.78rem', color: '#0f172a', borderBottom: `2px solid ${tpl.color}`, paddingBottom: '3px', marginBottom: '6px' }}>
                      JORDAN ALEXANDER
                      <div style={{ fontSize: '0.65rem', fontWeight: 600, color: tpl.color }}>Senior Software Engineer</div>
                    </div>

                    <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.3px', margin: '4px 0 2px 0' }}>
                      PROFESSIONAL EXPERIENCE
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', fontWeight: 700, color: '#1e293b' }}>
                      <span>TechFlow • Sr. Engineer</span>
                      <span style={{ color: '#94a3b8' }}>2022–Present</span>
                    </div>
                    <div style={{ fontSize: '0.6rem', color: '#64748b', margin: '2px 0' }}>
                      • Architected real-time stream pipelines processing 2M+ daily events...
                    </div>
                    <div style={{ fontSize: '0.6rem', color: '#64748b' }}>
                      • Optimized PostgreSQL queries reducing page load times by 40%...
                    </div>
                  </div>

                  <div style={{ background: 'linear-gradient(to top, rgba(255,255,255,1) 40%, rgba(255,255,255,0) 100%)', position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '8px' }}>
                    <span style={{ background: tpl.color, color: 'white', fontSize: '0.68rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Eye size={12} /> Click to Preview Full PDF
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setActiveSamplePdf(tpl)}
                  style={{ flex: 1, padding: '0.65rem', background: '#ffffff', color: '#334155', fontWeight: 700, fontSize: '0.82rem', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer' }}
                >
                  View Sample PDF
                </button>
                <button
                  onClick={handleStartBuilding}
                  style={{ flex: 1, padding: '0.65rem', background: '#4f46e5', color: '#ffffff', fontWeight: 700, fontSize: '0.82rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* USER TESTIMONIALS SECTION */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 4rem', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#eab308', marginBottom: '0.5rem' }}>
            <Star size={18} fill="#eab308" />
            <Star size={18} fill="#eab308" />
            <Star size={18} fill="#eab308" />
            <Star size={18} fill="#eab308" />
            <Star size={18} fill="#eab308" />
          </div>
          <h2 style={{ fontSize: '2.1rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>
            Loved by Job Seekers Nationwide
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            See how software engineers, data analysts, and graduates use Resume & CV Craft to land interviews.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
          {testimonials.map((test, idx) => (
            <div key={idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                "{test.text}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img src={test.avatar} alt={test.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>{test.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#4f46e5', fontWeight: 700 }}>{test.role}</div>
                  <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>{test.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW AI & ATS SCORING WORK (TRANSPARENT BREAKDOWN) */}
      <section style={{ background: '#0f172a', color: '#ffffff', padding: '4rem 1.5rem', marginBottom: '4rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Transparent Engineering
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', marginTop: '0.4rem', marginBottom: '0.6rem' }}>
              How Our AI & ATS Algorithm Works
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto' }}>
              We decode corporate candidate screening software so your resume gets read by real human recruiters.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '1.75rem' }}>
              <div style={{ color: '#818cf8', marginBottom: '1rem' }}><FileCheck size={28} /></div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>1. PDF.js Raw Text Stream Extraction</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                ATS screeners do not "look" at styling—they extract raw text characters. Our builder renders clean vector PDF streams so every word is 100% extractable.
              </p>
            </div>

            <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '1.75rem' }}>
              <div style={{ color: '#38bdf8', marginBottom: '1rem' }}><Target size={28} /></div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>2. Boolean Keyword Density Matching</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                Our algorithm scans required hard skills, certifications, and technical stack terms from target job descriptions, scoring match density instantly.
              </p>
            </div>

            <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '1.75rem' }}>
              <div style={{ color: '#4ade80', marginBottom: '1rem' }}><Sparkles size={28} /></div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>3. Google X-Y-Z Bullet Point Refining</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                Transforms passive duties into high-value accomplishment statements: "Accomplished [X], as measured by [Y], by doing [Z]".
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 4rem', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>
            Everything You Need to Win Interviews
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
            From instant ATS scoring to AI bullet point optimization and STAR interview prep.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
          <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5', marginBottom: '1.25rem' }}>
              <BarChart2 size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Instant ATS Score Checker</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              Scan your resume against real job descriptions to identify missing keywords, formatting errors, and metric density gaps before applying.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7', marginBottom: '1.25rem' }}>
              <Sparkles size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>AI Bullet Point Optimizer</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              Rewrite passive duty bullet points into high-impact accomplishment statements using the Google X-Y-Z formula.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', marginBottom: '1.25rem' }}>
              <ShieldCheck size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>100% Client-Side Privacy</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              Your data stays in your browser memory or encrypted local storage. We never harvest, track, or sell job seeker data.
            </p>
          </div>
        </div>
      </section>

      {/* VISIBLE FAQ SECTION */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, textAlign: 'center', color: '#0f172a', marginBottom: '1.75rem' }}>
          Frequently Asked Questions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem 1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
              Is Resume & CV Craft completely free to use?
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
              Yes, Resume & CV Craft offers 100% free resume creation, AI bullet point analysis, ATS scoring, and PDF exports without hidden paywalls or subscription traps.
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem 1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
              How does the AI Resume Builder optimize for ATS?
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
              Resume & CV Craft uses single-column layouts, clean typography, and keyword matching designed for standard Applicant Tracking Systems like Workday, Greenhouse, and Lever.
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem 1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
              Can I export my resume as an ATS-compliant PDF?
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
              Yes, all resumes generated on Resume & CV Craft export as clean, selectable-text vector PDFs optimized for ATS text parsers.
            </p>
          </div>
        </div>
      </section>

      {/* SAMPLE RESUME LIGHTBOX MODAL */}
      {activeSamplePdf && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1.5rem' }}>
          <div style={{ background: '#ffffff', width: '100%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '20px', padding: '2rem', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <button
              onClick={() => setActiveSamplePdf(null)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', border: 'none', background: '#f1f5f9', borderRadius: '50%', width: 34, height: 34, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={20} color="#64748b" />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: activeSamplePdf.color, background: `${activeSamplePdf.color}15`, padding: '0.25rem 0.6rem', borderRadius: '6px' }}>
                {activeSamplePdf.badge}
              </span>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Sample ATS PDF Preview</span>
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f172a', marginBottom: '1rem' }}>
              {activeSamplePdf.name} Template
            </h3>

            {/* High Resolution Simulated PDF Document */}
            <div style={{ background: '#ffffff', border: '2px solid #e2e8f0', borderRadius: '12px', padding: '2rem', fontFamily: 'Inter, sans-serif', color: '#1e293b', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', marginBottom: '1.5rem' }}>
              <div style={{ borderBottom: `3px solid ${activeSamplePdf.color}`, paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '0 0 0.25rem 0', color: '#0f172a' }}>JORDAN ALEXANDER</h4>
                <p style={{ fontSize: '0.88rem', fontWeight: 700, color: activeSamplePdf.color, margin: '0 0 0.5rem 0' }}>Senior Software & AI Engineer</p>
                <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>
                  jordan@example.com • (555) 012-3456 • San Francisco, CA • linkedin.com/in/jordanalexander
                </p>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <h5 style={{ fontSize: '0.82rem', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>Professional Summary</h5>
                <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: '#334155', margin: 0 }}>
                  High-throughput Software Engineer with 6+ years of experience architecting LLM applications and scalable microservices. Reduced inference latency by 42% on 2M+ daily requests.
                </p>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <h5 style={{ fontSize: '0.82rem', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>Technical Experience</h5>
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '0.85rem' }}>
                    <span>TechFlow Solutions — Senior AI Engineer</span>
                    <span style={{ color: '#64748b', fontSize: '0.78rem' }}>2022 – Present</span>
                  </div>
                  <ul style={{ margin: '0.35rem 0 0 1rem', padding: 0, fontSize: '0.8rem', color: '#334155', lineHeight: 1.5 }}>
                    <li>Architected RAG pipelines using LangChain & Pinecone, achieving 99.4% factual accuracy.</li>
                    <li>Optimized PostgreSQL queries, reducing database latency by 38% under high load.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h5 style={{ fontSize: '0.82rem', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>Education & Skills</h5>
                <p style={{ fontSize: '0.8rem', color: '#334155', margin: '0 0 0.4rem 0' }}><strong>Stanford University</strong> — B.S. Computer Science (GPA: 3.8/4.0)</p>
                <p style={{ fontSize: '0.8rem', color: '#334155', margin: 0 }}><strong>Core Stack:</strong> Python, PyTorch, React, TypeScript, Node.js, AWS, Docker, Pinecone</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => {
                  setActiveSamplePdf(null);
                  handleStartBuilding();
                }}
                style={{ flex: 1, padding: '0.85rem', background: '#4f46e5', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', border: 'none', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <FileText size={18} /> Use This Template Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
