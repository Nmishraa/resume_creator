import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, CheckCircle2, BookOpen, Code, Award, Users, Star } from 'lucide-react';
import AuthorMetadata from '../../components/AuthorMetadata';
import FaqSection from '../../components/FaqSection';
import RelatedResources from '../../components/RelatedResources';
import { ROUTE_SEO_MAP } from '../../utils/seoData';

export default function StudentResumePage() {
  const seoInfo = ROUTE_SEO_MAP['/student-resume-example'];

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '3rem 1.5rem', color: '#1e293b', lineHeight: 1.7 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#fce7f3', color: '#be185d', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1rem' }}>
          <GraduationCap size={16} /> Students & Recent Graduates
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.8rem' }}>
          {seoInfo.h1}
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#64748b', maxWidth: '750px', margin: '0 auto 1.8rem auto' }}>
          How to write a standout software engineering resume with zero prior corporate work experience. Highlight coursework, hackathons, open-source pull requests, and campus leadership.
        </p>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '0.85rem 2rem', borderRadius: '12px', border: 'none', background: '#be185d', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 8px 24px rgba(190,24,93,0.3)' }}>
            Build Student Resume <ArrowRight size={18} />
          </button>
        </Link>
      </div>

      <AuthorMetadata />

      {/* Main Content */}
      <article style={{ background: '#ffffff', padding: '3rem 2.5rem', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
        
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>How Students Break Into Tech in 2026</h2>
          <p style={{ color: '#475569' }}>
            Securing software engineering internships or full-time entry-level roles without formal industry work experience can feel daunting. However, recruiters care far more about your hands-on coding ability, personal GitHub projects, hackathon achievements, and foundational understanding of data structures than previous corporate titles.
          </p>
        </section>

        {/* Essential Section Blueprint */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Key Sections for Student Resumes</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ background: '#f8fafc', padding: '1.3rem', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
              <h4 style={{ color: '#be185d', fontWeight: 800, margin: '0 0 0.4rem 0' }}>1. Education Section (Placed First)</h4>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#475569' }}>
                Position your degree, university name, expected graduation month/year, and GPA (if 3.5 or higher) at the top. List relevant upper-division coursework such as <em>Data Structures & Algorithms</em>, <em>Operating Systems</em>, <em>Database Systems</em>, and <em>Distributed Systems</em>.
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.3rem', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
              <h4 style={{ color: '#be185d', fontWeight: 800, margin: '0 0 0.4rem 0' }}>2. Personal Coding Projects & Hackathons</h4>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#475569' }}>
                Treat major coding projects like real software jobs. Include a clear project title, live demo link, GitHub repository URL, technical stack tags (e.g. React, Node.js, PostgreSQL), and bullet points following the Google X-Y-Z formula.
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.3rem', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
              <h4 style={{ color: '#be185d', fontWeight: 800, margin: '0 0 0.4rem 0' }}>3. Campus Leadership & Open Source Contributions</h4>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#475569' }}>
                Highlight positions in computer science societies, ACM chapters, or open-source pull requests. Demonstrating leadership and collaborative Git workflows sets entry-level applicants apart.
              </p>
            </div>
          </div>
        </section>

        {/* Sample Student Project Bullets */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Sample Student Project Bullet Points</h3>
          <div style={{ background: '#fdf2f8', padding: '1.5rem', borderRadius: '16px', border: '1px solid #fbcfe8' }}>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.92rem', color: '#831843', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><strong>Full Stack E-Commerce Platform (React, Node.js, MongoDB):</strong> Architected a web app handling 2,000+ mock transactions with JWT authentication and Stripe payment integration.</li>
              <li><strong>Hackathon Winner (1st Place out of 45 Teams):</strong> Built a real-time collaborative whiteboarding tool using WebSockets and Canvas API in 36 hours.</li>
              <li><strong>Open Source Contributor (React Router):</strong> Merged 3 bug-fix pull requests addressing URL query string parsing edge cases.</li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #be185d 0%, #831843 100%)', color: '#ffffff', padding: '2rem', borderRadius: '18px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.6rem' }}>Create Your Free Student Resume</h3>
          <p style={{ color: '#fbcfe8', fontSize: '0.95rem', marginBottom: '1.2rem' }}>Export your single-page entry-level PDF in minutes.</p>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '0.8rem 1.8rem', borderRadius: '10px', border: 'none', background: '#ffffff', color: '#be185d', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer' }}>
              Start Building Free
            </button>
          </Link>
        </div>
      </article>

      {/* Visible FAQs */}
      <FaqSection faqs={seoInfo.faqs} title="Student Resume FAQs" />

      {/* Related Internal Links */}
      <RelatedResources currentPath="/student-resume-example" />
    </div>
  );
}
