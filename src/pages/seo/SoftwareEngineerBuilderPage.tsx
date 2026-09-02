import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../../components/common/SeoHead';
import { FaqAccordion } from '../../components/common/FaqAccordion';
import { Code2, Terminal, Cpu, ArrowRight, CheckCircle2, FileText } from 'lucide-react';

export const SoftwareEngineerBuilderPage: React.FC = () => {
  const faqs = [
    {
      question: 'How should Software Engineers format their technical skills?',
      answer: 'Group technical skills into clear categories: Languages (TypeScript, Python, Go), Frameworks (React, Node.js, Next.js), Databases (PostgreSQL, Redis), and Tools/Cloud (AWS, Docker, Kubernetes, Git).'
    },
    {
      question: 'Should I include GitHub and portfolio links?',
      answer: 'Yes! Place clean live links to your GitHub profile, technical blog, and live projects in your contact header.'
    },
    {
      question: 'How do I write high-impact engineering bullet points?',
      answer: 'Use Google X-Y-Z formulas: "Built high-throughput backend service (X), reducing latency by 45% across 500k active users (Y), using Go and Redis (Z)".'
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      <SeoHead
        title="Free Software Engineer Resume Builder – Technical ATS Templates | Resume Craft"
        description="Create an ATS-optimized software engineering resume. Highlight tech stacks, system architecture metrics, GitHub projects, and export vector PDFs for free."
        canonicalPath="/resume-builder-for-software-engineers"
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
            <Code2 size={14} />
            <span>Targeting Google Search: "Resume Builder for Software Engineers"</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">Software Engineer Resume Builder</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Tailored specifically for full-stack, frontend, backend, DevOps, and AI software engineers. Highlight system scale, technical stack categories, and metric-backed accomplishments.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/builder"
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Terminal size={18} />
              <span>Build Tech Resume Now &rarr;</span>
            </Link>
            <Link
              to="/resume-examples/software-engineer"
              className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <FileText size={18} className="text-indigo-300" />
              <span>View Software Engineer Example</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Skill Categories Showcase */}
      <section className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Structured Technical Skill Grouping</h2>
          <p className="text-slate-600 text-sm">Organized so tech recruiters and ATS scanners index your primary stack instantly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
            <h3 className="font-bold text-indigo-400 flex items-center gap-2">
              <Terminal size={18} /> Languages & Frameworks
            </h3>
            <p className="text-xs text-slate-300">TypeScript, JavaScript (ES6+), Python, Go, Java, C++, React, Next.js, Node.js, Express, Tailwind CSS</p>
          </div>

          <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-400 flex items-center gap-2">
              <Cpu size={18} /> Databases & Cloud Infrastructure
            </h3>
            <p className="text-xs text-slate-300">PostgreSQL, MongoDB, Redis, GraphQL, Docker, Kubernetes, AWS (S3, EC2, Lambda), CI/CD GitHub Actions</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 text-center">Software Engineering Resume FAQs</h2>
        <FaqAccordion items={faqs} />
      </section>
    </div>
  );
};
