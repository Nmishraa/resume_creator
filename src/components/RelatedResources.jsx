import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Layout, BookOpen, FileText, Cpu, GraduationCap, Mail, Zap, Target, Share2, DollarSign, Sparkles } from 'lucide-react';

const ALL_RESOURCES = [
  {
    path: '/ats-resume-checker',
    title: 'Free ATS Resume Checker',
    desc: 'Instant diagnostic scoring, keyword audit, and metric detection for your resume.',
    icon: ShieldCheck,
    color: '#4f46e5',
    badge: 'Popular Tool'
  },
  {
    path: '/resume-templates',
    title: 'ATS Resume Templates',
    desc: 'Battle-tested, single-column PDF templates built for Workday, Greenhouse & Lever.',
    icon: Layout,
    color: '#0284c7',
    badge: 'Free Downloads'
  },
  {
    path: '/how-to-write-a-resume',
    title: 'Resume Writing Guide 2026',
    desc: 'Step-by-step masterclass on formatting, bullet points, and Google X-Y-Z formulas.',
    icon: BookOpen,
    color: '#16a34a',
    badge: 'Comprehensive'
  },
  {
    path: '/resume-summary-examples',
    title: '50+ Resume Summary Examples',
    desc: 'Copy & customize role-specific summaries for engineers, managers, and students.',
    icon: FileText,
    color: '#9333ea',
    badge: 'Copy & Paste'
  },
  {
    path: '/ai-engineer-resume-example',
    title: 'AI Engineer Resume Example',
    desc: 'Specialized guide for Machine Learning, PyTorch, LLMs, and RAG architectures.',
    icon: Cpu,
    color: '#6366f1',
    badge: 'Tech Niche'
  },
  {
    path: '/student-resume-example',
    title: 'Student & Entry-Level Resume',
    desc: 'Land top software engineering internships with zero prior work experience.',
    icon: GraduationCap,
    color: '#ec4899',
    badge: 'Entry-Level'
  },
  {
    path: '/cover-letters',
    title: 'AI Cover Letter Generator',
    desc: 'Generate recruiter-approved cover letters tailored to any job posting in seconds.',
    icon: Mail,
    color: '#f59e0b',
    badge: 'AI Tool'
  },
  {
    path: '/ats-tips',
    title: 'ATS Rules & Optimization Myths',
    desc: 'Discover parser rules, action verb directories, and bullet evaluator formulas.',
    icon: Zap,
    color: '#10b981',
    badge: 'Pro Tips'
  },
  {
    path: '/interview-prep',
    title: 'STAR Interview Simulator',
    desc: 'Practice behavioral and technical interview questions with STAR answer frameworks.',
    icon: Target,
    color: '#ef4444',
    badge: 'Interviewing'
  },
  {
    path: '/linkedin-optimizer',
    title: 'LinkedIn Profile Optimizer',
    desc: 'Turn your resume into an inbound recruiter magnet with headline & bio generators.',
    icon: Share2,
    color: '#0077b5',
    badge: 'Social SEO'
  },
  {
    path: '/salary-guide',
    title: 'Salary Negotiation Scripts',
    desc: 'Calculate target compensation and copy proven email scripts for counter-offers.',
    icon: DollarSign,
    color: '#84cc16',
    badge: 'Negotiation'
  },
  {
    path: '/',
    title: 'Interactive Resume Builder',
    desc: 'Build, edit, and export your professional resume with real-time AI guidance.',
    icon: Sparkles,
    color: '#4f46e5',
    badge: 'Main Builder'
  }
];

export default function RelatedResources({ currentPath }) {
  const filteredResources = ALL_RESOURCES.filter(r => r.path !== currentPath);

  return (
    <section style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '2px solid #e2e8f0' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          Explore Related Resume Resources & Free Tools
        </h2>
        <p style={{ fontSize: '1rem', color: '#64748b', maxWidth: '650px', margin: '0 auto' }}>
          Accelerate your job search with our complete suite of AI career tools, templates, and expert guides.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {filteredResources.map((res) => {
          const Icon = res.icon;
          return (
            <Link
              key={res.path}
              to={res.path}
              style={{
                textDecoration: 'none',
                background: '#ffffff',
                borderRadius: '14px',
                border: '1px solid #e2e8f0',
                padding: '1.4rem',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = res.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                  <div style={{ background: `${res.color}15`, color: res.color, padding: '0.5rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={20} />
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, background: '#f1f5f9', color: '#475569', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
                    {res.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                  {res.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                  {res.desc}
                </p>
              </div>
              <div style={{ marginTop: '1rem', fontSize: '0.82rem', fontWeight: 700, color: res.color, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                Access Resource &rarr;
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
