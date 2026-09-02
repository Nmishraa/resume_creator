import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Sparkles, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { RESUME_EXAMPLES } from '../../data/resumeExamplesData';

export const Footer: React.FC = () => {
  return (
    <footer className="no-print bg-slate-950 text-slate-200 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="space-y-4 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 via-brand-700 to-slate-900 flex items-center justify-center text-white font-black text-sm shadow-md">
                RC
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">Resume Craft</span>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              Modern AI Resume Builder &amp; ATS Optimization Suite. Build, enhance, test against job descriptions, and download vector PDFs with zero paywalls.
            </p>
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold">
                <Lock size={14} />
                <span>100% Free &amp; Private</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Resume drafts stay in your browser by default. Text is processed externally only when you choose an AI feature, and optional cloud sync is available when signed in.
              </p>
            </div>
          </div>

          {/* Product Tools */}
          <div className="space-y-3.5">
            <h4 className="text-white font-black text-sm uppercase tracking-wider">Product &amp; Tools</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/free-resume-builder" className="text-slate-200 hover:text-white transition-colors font-medium flex items-center gap-1.5">
                  <FileText size={14} className="text-brand-400" />
                  <span>Free Resume Builder</span>
                </Link>
              </li>
              <li>
                <Link to="/ai-resume-builder" className="text-slate-200 hover:text-white transition-colors font-medium flex items-center gap-1.5">
                  <Sparkles size={14} className="text-purple-400" />
                  <span>AI Resume Builder</span>
                </Link>
              </li>
              <li>
                <Link to="/ats-resume-checker" className="text-slate-200 hover:text-white transition-colors font-medium flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>ATS-Friendly Resume Checker</span>
                </Link>
              </li>
              <li>
                <Link to="/resume-keyword-matcher" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Job Description Matcher
                </Link>
              </li>
              <li>
                <Link to="/resume-templates" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Resume Templates for Jobs
                </Link>
              </li>
              <li>
                <Link to="/cover-letters" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Free CV &amp; Cover Letter Maker
                </Link>
              </li>
            </ul>
          </div>

          {/* Targeted Keyword Categories */}
          <div className="space-y-3.5">
            <h4 className="text-white font-black text-sm uppercase tracking-wider">
              Popular Resume Tools
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/ai-resume-builder" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Online Resume Builder Without Signup
                </Link>
              </li>
              <li>
                <Link to="/resume-builder-for-students" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Resume Builder for Students &amp; Freshers
                </Link>
              </li>
              <li>
                <Link to="/resume-builder-no-experience" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Entry-Level &amp; No Experience Builder
                </Link>
              </li>
              <li>
                <Link to="/resume-builder-for-software-engineers" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Software Engineer Resume Builder
                </Link>
              </li>
              <li>
                <Link to="/resume-examples/ai-engineer" className="text-slate-200 hover:text-white transition-colors font-medium">
                  AI Engineer Resume Example
                </Link>
              </li>
              <li>
                <Link to="/builder" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Resume Builder Free PDF Download
                </Link>
              </li>
            </ul>
          </div>

          {/* Resume Examples */}
          <div className="space-y-3.5">
            <h4 className="text-white font-black text-sm uppercase tracking-wider">
              <Link to="/resume-examples" className="hover:text-brand-400 transition-colors">
                Role Resume Examples
              </Link>
            </h4>
            <ul className="space-y-2.5">
              {RESUME_EXAMPLES.slice(0, 6).map((ex) => (
                <li key={ex.slug}>
                  <Link to={`/resume-examples/${ex.slug}`} className="text-slate-200 hover:text-white transition-colors font-medium">
                    {ex.roleTitle} Resume
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/resume-examples" className="text-brand-400 hover:text-brand-300 font-extrabold transition-colors flex items-center gap-1">
                  <span>View all role examples &rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3.5">
            <h4 className="text-white font-black text-sm uppercase tracking-wider">Company &amp; Legal</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/about" className="text-slate-200 hover:text-white transition-colors font-medium">
                  About Resume Craft
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Frequently Asked Questions (FAQ)
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-300">
          <div>
            © {new Date().getFullYear()} Resume Craft. Free AI Resume Builder, ATS Checker &amp; CV Maker.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/free-resume-builder" className="hover:text-white transition-colors">Free Resume Builder</Link>
            <Link to="/ai-resume-builder" className="hover:text-white transition-colors">AI Resume Builder</Link>
            <Link to="/ats-resume-checker" className="hover:text-white transition-colors">ATS Resume Checker</Link>
            <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
