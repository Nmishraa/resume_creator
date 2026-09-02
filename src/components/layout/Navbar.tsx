import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FileText,
  CheckCircle2,
  Briefcase,
  Layers,
  Sparkles,
  LogOut,
  Settings,
  Menu,
  X,
  Mail,
  HelpCircle,
  BookOpen,
  ChevronDown,
  GraduationCap,
  FileCheck2,
  Compass,
  ArrowRight,
  Shield
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, isGuest, signOut, setShowAuthModal, setShowConfigModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [toolsDropdown, setToolsDropdown] = useState(false);

  const mainTools = [
    { label: 'Resume Builder', path: '/builder', desc: 'Interactive real-time ATS editor & PDF export', icon: FileText },
    { label: 'ATS Score Checker', path: '/ats-resume-checker', desc: 'Scan 0–100 score against job descriptions', icon: CheckCircle2 },
    { label: 'AI Bullet Enhancer', path: '/ai-resume-builder', desc: 'Google X-Y-Z formula bullet writer', icon: Sparkles },
    { label: 'Student Resume Builder', path: '/resume-builder-for-students', desc: 'Coursework, projects & beginner tips', icon: GraduationCap },
    { label: 'Cover Letter Generator', path: '/cover-letters', desc: 'AI-tailored cover letters in seconds', icon: Mail },
    { label: 'Job Application Tracker', path: '/applications', desc: 'Visual Kanban pipeline & status tracking', icon: Briefcase },
    { label: 'Interview Prep (10-Q)', path: '/interview-prep', desc: 'Role-specific mock questions & STAR framework', icon: HelpCircle },
    { label: 'Job Description Matcher', path: '/job-description-resume-matcher', desc: 'Keyword match & skill gap analyzer', icon: FileCheck2 }
  ];

  return (
    <header className="no-print bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="Resume Craft Home">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 via-brand-700 to-slate-900 flex items-center justify-center text-white shadow-md shadow-brand-500/20 font-black text-sm tracking-wider group-hover:scale-[1.02] transition-transform">
              RC
            </div>
            <div>
              <div className="font-extrabold text-slate-950 text-base leading-tight tracking-tight flex items-center gap-1.5">
                Resume Craft
              </div>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wider block">
                AI Resume &amp; ATS Suite
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            
            {/* Resume Builder Link */}
            <Link
              to="/builder"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                location.pathname === '/builder' || location.pathname === '/resume-builder'
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
              }`}
            >
              <FileText size={14} className="text-brand-600" />
              <span>Builder</span>
            </Link>

            {/* ATS Checker Link */}
            <Link
              to="/ats-resume-checker"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                location.pathname.startsWith('/ats')
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
              }`}
            >
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>ATS Checker</span>
            </Link>

            {/* Templates Link */}
            <Link
              to="/resume-templates"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                location.pathname === '/templates' || location.pathname === '/resume-templates'
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
              }`}
            >
              <Layers size={14} className="text-slate-500" />
              <span>Templates</span>
            </Link>

            {/* Resume Examples Link */}
            <Link
              to="/resume-examples"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                location.pathname.startsWith('/resume-examples')
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
              }`}
            >
              <Compass size={14} className="text-blue-600" />
              <span>Examples</span>
            </Link>

            {/* More Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setToolsDropdown(true)}
              onMouseLeave={() => setToolsDropdown(false)}
            >
              <button
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100/70 transition-colors cursor-pointer"
                aria-expanded={toolsDropdown}
              >
                <span>More</span>
                <ChevronDown size={13} className={`transition-transform duration-150 ${toolsDropdown ? 'rotate-180 text-brand-600' : 'text-slate-400'}`} />
              </button>

              {toolsDropdown && (
                <div className="absolute left-0 mt-0.5 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-2.5 z-50 animate-in fade-in grid grid-cols-1 gap-1">
                  {mainTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.path}
                        to={tool.path}
                        onClick={() => setToolsDropdown(false)}
                        className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="p-2 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-brand-600 group-hover:text-white transition-colors shrink-0">
                          <Icon size={16} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                            {tool.label}
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">
                            {tool.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Cloud Config / Settings */}
            <button
              onClick={() => setShowConfigModal(true)}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Cloud Sync Settings"
              aria-label="Cloud Configuration"
            >
              <Settings size={17} />
            </button>

            {/* Auth / Account */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 p-1.5 pl-2.5 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors text-xs font-semibold text-slate-800 cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center text-[10px] font-bold">
                    {user.displayName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="max-w-[90px] truncate">{user.displayName || (isGuest ? 'Guest' : 'Account')}</span>
                </button>

                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 animate-in fade-in">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <div className="font-bold text-xs text-slate-900 truncate">{user.displayName}</div>
                      <div className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                        <Shield size={11} className="text-emerald-600" />
                        <span>{user.email || (isGuest ? 'Guest Session' : 'Anonymous')}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => { setShowConfigModal(true); setUserDropdown(false); }}
                      className="w-full text-left p-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 mt-1 cursor-pointer"
                    >
                      <Settings size={14} /> Cloud Sync Settings
                    </button>
                    <button
                      onClick={() => { signOut(); setUserDropdown(false); }}
                      className="w-full text-left p-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 mt-1 font-semibold cursor-pointer"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* High-Converting Primary CTA */}
            <Link
              to="/builder"
              className="px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 active:scale-95"
            >
              <span>Build My Resume</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 max-h-[85vh] overflow-y-auto shadow-lg animate-in slide-in-from-top-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">Navigation</div>
          <div className="grid grid-cols-1 gap-1">
            <Link
              to="/builder"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
            >
              <FileText size={16} className="text-brand-600" />
              <span>Resume Builder</span>
            </Link>
            <Link
              to="/ats-resume-checker"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
            >
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>ATS Score Checker</span>
            </Link>
            <Link
              to="/resume-templates"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
            >
              <Layers size={16} className="text-slate-500" />
              <span>Resume Templates</span>
            </Link>
            <Link
              to="/resume-examples"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
            >
              <Compass size={16} className="text-blue-600" />
              <span>Resume Examples Hub</span>
            </Link>
            <Link
              to="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
            >
              <BookOpen size={16} className="text-slate-500" />
              <span>How It Works</span>
            </Link>
          </div>

          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pt-2">Additional Tools</div>
          <div className="grid grid-cols-1 gap-1">
            {mainTools.slice(2).map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.path}
                  to={tool.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-2 rounded-xl text-xs text-slate-600 hover:bg-slate-50"
                >
                  <Icon size={15} className="text-slate-400" />
                  <span>{tool.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            {user ? (
              <button
                onClick={() => { signOut(); setMobileMenuOpen(false); }}
                className="w-full text-left p-2.5 text-xs text-rose-600 font-bold bg-rose-50 rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <LogOut size={15} /> Sign Out ({user.displayName || 'Account'})
              </button>
            ) : (
              <button
                onClick={() => { setShowAuthModal(true); setMobileMenuOpen(false); }}
                className="w-full text-center py-2.5 text-xs font-bold text-slate-800 bg-slate-100 rounded-xl cursor-pointer"
              >
                Sign In / Register
              </button>
            )}
            
            <Link
              to="/builder"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 text-xs font-bold text-white bg-brand-600 rounded-xl shadow flex items-center justify-center gap-2"
            >
              <span>Build My Resume Free</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
