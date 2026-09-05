import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Sparkles, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

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

          {/* Product & Core Tools */}
          <div className="space-y-3.5">
            <h4 className="text-white font-black text-sm uppercase tracking-wider">Product &amp; Tools</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/builder" className="text-slate-200 hover:text-white transition-colors font-medium flex items-center gap-1.5">
                  <FileText size={14} className="text-brand-400" />
                  <span>Resume Builder</span>
                </Link>
              </li>
              <li>
                <Link to="/ats-resume-checker" className="text-slate-200 hover:text-white transition-colors font-medium flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>ATS Resume Checker</span>
                </Link>
              </li>
              <li>
                <Link to="/ai-resume-builder" className="text-slate-200 hover:text-white transition-colors font-medium flex items-center gap-1.5">
                  <Sparkles size={14} className="text-purple-400" />
                  <span>AI Bullet Writer</span>
                </Link>
              </li>
              <li>
                <Link to="/find-jobs-with-resume" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Find Jobs With Your Resume
                </Link>
              </li>
              <li>
                <Link to="/cover-letters" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Cover Letter Generator
                </Link>
              </li>
              <li>
                <Link to="/resume-templates" className="text-slate-200 hover:text-white transition-colors font-medium">
                  ATS Resume Templates
                </Link>
              </li>
            </ul>
          </div>

          {/* Specialized Builders */}
          <div className="space-y-3.5">
            <h4 className="text-white font-black text-sm uppercase tracking-wider">
              Specialized Builders
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/resume-builder-for-students" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Student &amp; Fresher Builder
                </Link>
              </li>
              <li>
                <Link to="/resume-builder-no-experience" className="text-slate-200 hover:text-white transition-colors font-medium">
                  No Experience Resume Builder
                </Link>
              </li>
              <li>
                <Link to="/resume-builder-for-software-engineers" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Software Engineer Builder
                </Link>
              </li>
              <li>
                <Link to="/applications" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Job Application Tracker
                </Link>
              </li>
              <li>
                <Link to="/interview-questions" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Interview Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Examples & Career Guides */}
          <div className="space-y-3.5">
            <h4 className="text-white font-black text-sm uppercase tracking-wider">
              Examples &amp; Guides
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/resume-examples/software-engineer" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Software Engineer Example
                </Link>
              </li>
              <li>
                <Link to="/resume-examples/ai-engineer" className="text-slate-200 hover:text-white transition-colors font-medium">
                  AI Engineer Example
                </Link>
              </li>
              <li>
                <Link to="/resume-examples/data-scientist" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Data Scientist Example
                </Link>
              </li>
              <li>
                <Link to="/guides/google-xyz-formula-guide" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Google X-Y-Z Formula Guide
                </Link>
              </li>
              <li>
                <Link to="/guides/how-to-make-ats-friendly-resume" className="text-slate-200 hover:text-white transition-colors font-medium">
                  ATS Resume Writing Guide
                </Link>
              </li>
              <li>
                <Link to="/resume-examples" className="text-brand-400 hover:text-brand-300 font-extrabold transition-colors flex items-center gap-1">
                  <span>Explore all examples &rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-3.5">
            <h4 className="text-white font-black text-sm uppercase tracking-wider">Company &amp; Support</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/about" className="text-slate-200 hover:text-white transition-colors font-medium">
                  About Resume Craft
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-slate-200 hover:text-white transition-colors font-medium">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Frequently Asked Questions (FAQ)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-200 hover:text-white transition-colors font-medium">
                  Contact Support
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
            <Link to="/builder" className="hover:text-white transition-colors">Resume Builder</Link>
            <Link to="/ats-resume-checker" className="hover:text-white transition-colors">ATS Checker</Link>
            <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
