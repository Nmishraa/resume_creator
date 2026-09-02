import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Sparkles, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { RESUME_EXAMPLES } from '../../data/resumeExamplesData';
import { CAREER_GUIDES } from '../../data/guidesData';

export const Footer: React.FC = () => {
  return (
    <footer className="no-print bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="space-y-4 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-600 to-slate-900 flex items-center justify-center text-white font-black text-xs shadow-sm">
                RC
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">Resume Craft</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Modern AI Resume Builder &amp; ATS Optimization Suite. Build, enhance, test against job descriptions, and download vector PDFs with zero paywalls.
            </p>
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800/80 space-y-1.5 text-[11px]">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Lock size={13} />
                <span>100% Free &amp; Private</span>
              </div>
              <p className="text-slate-400 leading-normal">
                Resume drafts stay in your browser by default. Text is processed externally only when you choose an AI feature, and optional cloud sync is available when signed in.
              </p>
            </div>
          </div>

          {/* Product Tools */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Product &amp; Tools</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/free-resume-builder" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <FileText size={13} className="text-brand-400" />
                  <span>Free Resume Builder</span>
                </Link>
              </li>
              <li>
                <Link to="/ai-resume-builder" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Sparkles size={13} className="text-purple-400" />
                  <span>AI Resume Builder</span>
                </Link>
              </li>
              <li>
                <Link to="/ats-resume-checker" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span>ATS-Friendly Resume Checker</span>
                </Link>
              </li>
              <li>
                <Link to="/resume-keyword-matcher" className="hover:text-white transition-colors">
                  Job Description Matcher
                </Link>
              </li>
              <li>
                <Link to="/resume-templates" className="hover:text-white transition-colors">
                  Resume Templates for Jobs
                </Link>
              </li>
              <li>
                <Link to="/cover-letters" className="hover:text-white transition-colors">
                  Free CV &amp; Cover Letter Maker
                </Link>
              </li>
            </ul>
          </div>

          {/* Targeted Keyword Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Popular Resume Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/ai-resume-builder" className="hover:text-white transition-colors">
                  Online Resume Builder Without Signup
                </Link>
              </li>
              <li>
                <Link to="/resume-builder-for-students" className="hover:text-white transition-colors">
                  Resume Builder for Students &amp; Freshers
                </Link>
              </li>
              <li>
                <Link to="/resume-builder-no-experience" className="hover:text-white transition-colors">
                  Entry-Level &amp; No Experience Builder
                </Link>
              </li>
              <li>
                <Link to="/resume-builder-for-software-engineers" className="hover:text-white transition-colors">
                  Software Engineer Resume Builder
                </Link>
              </li>
              <li>
                <Link to="/resume-examples/ai-engineer" className="hover:text-white transition-colors">
                  AI Engineer Resume Example
                </Link>
              </li>
              <li>
                <Link to="/builder" className="hover:text-white transition-colors">
                  Resume Builder Free PDF Download
                </Link>
              </li>
            </ul>
          </div>

          {/* Resume Examples */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              <Link to="/resume-examples" className="hover:text-brand-400 transition-colors">
                Role Resume Examples
              </Link>
            </h4>
            <ul className="space-y-2">
              {RESUME_EXAMPLES.slice(0, 6).map((ex) => (
                <li key={ex.slug}>
                  <Link to={`/resume-examples/${ex.slug}`} className="hover:text-white transition-colors">
                    {ex.roleTitle} Resume
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/resume-examples" className="text-brand-400 hover:text-brand-300 font-semibold transition-colors flex items-center gap-1">
                  <span>View all role examples &rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Company &amp; Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Resume Craft
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Resume Craft. Free AI Resume Builder, ATS Checker &amp; CV Maker.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/free-resume-builder" className="hover:text-slate-300">Free Resume Builder</Link>
            <Link to="/ai-resume-builder" className="hover:text-slate-300">AI Resume Builder</Link>
            <Link to="/ats-resume-checker" className="hover:text-slate-300">ATS Resume Checker</Link>
            <Link to="/resume-templates" className="hover:text-slate-300">Resume Templates</Link>
            <Link to="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
        </div>
      </div>

      </div>
    </footer>
  );
};
