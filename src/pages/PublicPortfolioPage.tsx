import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { SeoHead } from '../components/common/SeoHead';
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  FolderGit2,
  CheckCircle2,
  Share2,
  Sparkles,
  ArrowLeft,
  MessageSquare
} from 'lucide-react';
import { exportToVectorPdf } from '../services/pdfService';
import confetti from 'canvas-confetti';

export const PublicPortfolioPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { resume } = useResume();
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // Fallback demo profile data if URL slug is 'alex-morgan' or empty user name
  const alexMorganFallback = {
    personalInfo: {
      fullName: 'Alex Morgan',
      jobTitle: 'Senior Full-Stack Engineer',
      email: 'alex.morgan@dev.io',
      phone: '(555) 234-5678',
      location: 'San Francisco, CA',
      website: 'https://alexmorgan.dev',
      linkedin: 'linkedin.com/in/alexmorgan',
      github: 'github.com/alexmorgan'
    },
    summary: 'Results-driven engineer with 7+ years of experience building high-throughput microservices. Spearheaded system architecture handling 5M daily active users with 99.99% uptime.',
    experience: [
      {
        id: 'exp-1',
        role: 'Lead Systems Engineer',
        company: 'Cloud Scale Inc.',
        location: 'San Francisco, CA',
        startDate: '2021',
        endDate: 'Present',
        current: true,
        highlights: [
          'Architected multi-region Kubernetes clusters, reducing operational downtime by 99.9%.',
          'Optimized API gateway throughput by 42% using React & Node.js microservices.',
          'Mentored a team of 8 full-stack engineers and instituted automated CI/CD pipelines.'
        ]
      },
      {
        id: 'exp-2',
        role: 'Senior Software Engineer',
        company: 'Apex Data Labs',
        location: 'San Jose, CA',
        startDate: '2018',
        endDate: '2021',
        current: false,
        highlights: [
          'Designed high-frequency RESTful endpoints handling 10k requests per second.',
          'Migrated legacy monolithic database to PostgreSQL with zero data loss.'
        ]
      }
    ],
    skills: [
      { id: 's1', category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux'] },
      { id: 's2', category: 'Backend & Cloud', items: ['Node.js', 'PostgreSQL', 'Docker', 'AWS (EC2, S3)', 'GraphQL', 'Kubernetes'] }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'B.S. in Computer Science',
        institution: 'UC Berkeley',
        location: 'Berkeley, CA',
        startDate: '2013',
        endDate: '2017'
      }
    ],
    projects: [
      {
        id: 'p1',
        name: 'Distributed Event Streaming Engine',
        description: 'Open-source low-latency event broker processing 1M events/sec built in Node.js & C++.'
      }
    ],
    certifications: [
      { id: 'c1', name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', date: '2022' }
    ]
  };

  const isAlexMorgan = slug?.toLowerCase() === 'alex-morgan' || slug?.toLowerCase() === 'alex_morgan';
  const displayResume = (isAlexMorgan || (!resume.personalInfo.fullName && !resume.summary)) ? alexMorganFallback : resume;
  const personal = displayResume.personalInfo;
  const fullName = personal.fullName || 'Candidate Profile';
  const jobTitle = personal.jobTitle || 'Professional Candidate';

  const handleDownloadPdf = () => {
    confetti({ particleCount: 40, spread: 60 });
    exportToVectorPdf();
  };

  const handleShareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mailtoHref = `mailto:${personal.email}?subject=${encodeURIComponent(contactSubject || `Opportunity for ${fullName}`)}&body=${encodeURIComponent(contactMessage || `Hi ${fullName},\n\nI came across your web portfolio and would love to discuss a career opportunity with you.\n\nBest regards,`)}`;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-20">
      <SeoHead
        title={`${fullName} – Interactive Public Web Portfolio | Resume Craft`}
        description={`View ${fullName}'s (${jobTitle}) public web portfolio. Explore work experience, technical skills, projects, and download verified PDF resume.`}
        canonicalPath={`/p/${slug || 'profile'}`}
      />

      {/* Top Banner Navigation */}
      <nav className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Resume Craft</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShareLink}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 size={14} className="text-brand-400" />
            <span>{copied ? '✓ Link Copied!' : 'Share Portfolio'}</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            className="px-4 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-extrabold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Download size={14} />
            <span>Download PDF</span>
          </button>
        </div>
      </nav>

      {/* Hero Portfolio Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 pt-12 pb-10 border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Verified Public Candidate Profile</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {fullName}
              </h1>

              <p className="text-lg sm:text-xl font-bold text-brand-400">
                {jobTitle}
              </p>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400">
                {personal.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={14} className="text-slate-500" />
                    <span>{personal.location}</span>
                  </span>
                )}
                {personal.email && (
                  <a href={`mailto:${personal.email}`} className="flex items-center gap-1 hover:text-brand-400 transition-colors">
                    <Mail size={14} className="text-slate-500" />
                    <span>{personal.email}</span>
                  </a>
                )}
                {personal.phone && (
                  <a href={`tel:${personal.phone}`} className="flex items-center gap-1 hover:text-brand-400 transition-colors">
                    <Phone size={14} className="text-slate-500" />
                    <span>{personal.phone}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Candidate Call to Action Card */}
            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/80 space-y-3 shadow-xl shrink-0 md:min-w-[260px]">
              <div className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                Recruiter Quick Contact
              </div>
              <button
                onClick={() => setShowContactModal(true)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare size={16} />
                <span>Contact Candidate</span>
              </button>

              <button
                onClick={handleDownloadPdf}
                className="w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-xl font-bold text-xs transition-all border border-slate-600 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download size={14} />
                <span>Download Verified PDF</span>
              </button>

              {/* Social links */}
              <div className="flex justify-center items-center gap-3 pt-1 text-slate-400">
                {personal.linkedin && (
                  <a href={`https://${personal.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="hover:text-brand-400 transition-colors text-xs font-bold" title="LinkedIn">
                    LinkedIn
                  </a>
                )}
                {personal.github && (
                  <a href={`https://${personal.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xs font-bold" title="GitHub">
                    GitHub
                  </a>
                )}
                {personal.website && (
                  <a href={`https://${personal.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="hover:text-brand-400 transition-colors text-xs font-bold" title="Personal Website">
                    Website
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        
        {/* Executive Summary */}
        {displayResume.summary && (
          <section className="bg-slate-800/40 p-6 rounded-2xl border border-slate-800 space-y-2">
            <h2 className="text-xs font-black uppercase tracking-wider text-brand-400 flex items-center gap-2">
              <Sparkles size={16} />
              <span>Professional Summary</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {displayResume.summary}
            </p>
          </section>
        )}

        {/* Work Experience Timeline */}
        {displayResume.experience && displayResume.experience.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-brand-400 flex items-center gap-2">
              <Briefcase size={16} />
              <span>Work Experience</span>
            </h2>

            <div className="space-y-4">
              {displayResume.experience.map((exp, i) => (
                <div key={exp.id || i} className="bg-slate-800/30 p-6 rounded-2xl border border-slate-800/90 space-y-3 relative">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-white">{exp.role}</h3>
                      <span className="text-xs font-semibold text-brand-400">{exp.company}</span>
                      {exp.location && <span className="text-xs text-slate-500 ml-2">• {exp.location}</span>}
                    </div>
                    <div className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700/60 self-start">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {exp.highlights.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical Skills & Expertise */}
        {displayResume.skills && displayResume.skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-brand-400 flex items-center gap-2">
              <Code size={16} />
              <span>Skills &amp; Technical Stack</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayResume.skills.map((cat, i) => (
                <div key={cat.id || i} className="bg-slate-800/30 p-5 rounded-2xl border border-slate-800 space-y-2.5">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{cat.category}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((skill, idx) => (
                      <span key={idx} className="text-xs bg-slate-800 hover:bg-slate-700 text-brand-300 font-semibold px-2.5 py-1 rounded-lg border border-slate-700/80 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Projects */}
        {displayResume.projects && displayResume.projects.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-brand-400 flex items-center gap-2">
              <FolderGit2 size={16} />
              <span>Key Projects</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayResume.projects.map((proj, i) => (
                <div key={proj.id || i} className="bg-slate-800/30 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <h3 className="text-sm font-bold text-white">{proj.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayResume.education && displayResume.education.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-wider text-brand-400 flex items-center gap-2">
                <GraduationCap size={16} />
                <span>Education</span>
              </h2>
              <div className="space-y-3">
                {displayResume.education.map((edu, i) => (
                  <div key={edu.id || i} className="bg-slate-800/30 p-4 rounded-xl border border-slate-800 space-y-1">
                    <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
                    <div className="text-xs text-slate-400">{edu.institution} {edu.location ? `• ${edu.location}` : ''}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{edu.startDate} – {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {displayResume.certifications && displayResume.certifications.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-wider text-brand-400 flex items-center gap-2">
                <Award size={16} />
                <span>Certifications</span>
              </h2>
              <div className="space-y-3">
                {displayResume.certifications.map((cert, i) => (
                  <div key={cert.id || i} className="bg-slate-800/30 p-4 rounded-xl border border-slate-800 space-y-1">
                    <h3 className="text-sm font-bold text-white">{cert.name}</h3>
                    <div className="text-xs text-slate-400">{cert.issuer} {cert.date ? `(${cert.date})` : ''}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

      </main>

      {/* Footer Branding */}
      <footer className="border-t border-slate-800/80 max-w-4xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          Verified Digital Portfolio hosted on <strong className="text-slate-300">Resume Craft</strong>
        </div>
        <Link to="/" className="text-brand-400 hover:underline font-semibold">
          Create Your Own Free Web Portfolio &rarr;
        </Link>
      </footer>

      {/* Contact Recruiter Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="text-lg font-black text-white">Contact {fullName}</h3>
              <button onClick={() => setShowContactModal(false)} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Subject</label>
                <input
                  type="text"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  placeholder={`e.g. ${jobTitle} Role at [Company]`}
                  className="w-full text-xs p-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Message</label>
                <textarea
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder={`Hi ${fullName},\n\nWe love your background and would like to invite you for an initial conversation...`}
                  className="w-full text-xs p-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowContactModal(false)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <a
                href={mailtoHref}
                onClick={() => setShowContactModal(false)}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black text-center shadow-md cursor-pointer"
              >
                Send Email &rarr;
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
