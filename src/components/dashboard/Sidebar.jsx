import React from 'react';
import { 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  Target, 
  Mail, 
  Briefcase, 
  HelpCircle, 
  Layout, 
  Settings, 
  LogOut, 
  X, 
  Zap 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isOpen, onClose, logout, user }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layout },
    { id: 'resumes', label: 'My Resumes', icon: FileText },
    { id: 'builder', label: 'AI Resume Builder', icon: Sparkles },
    { id: 'ats', label: 'ATS Checker', icon: ShieldCheck },
    { id: 'jobmatch', label: 'Job Matcher', icon: Target },
    { id: 'coverletter', label: 'Cover Letters', icon: Mail },
    { id: 'applications', label: 'Applications', icon: Briefcase },
    { id: 'interview', label: 'Interview Prep', icon: HelpCircle },
    { id: 'templates', label: 'Templates', icon: Layout },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.5)', zIndex: 90 }} 
          onClick={onClose} 
        />
      )}

      <aside className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Zap size={24} style={{ color: '#4f46e5' }} />
            <span>ResumeCraft</span>
          </div>
          {isOpen && (
            <button className="btn-secondary" style={{ width: 28, height: 28, padding: 0 }} onClick={onClose}>
              <X size={16} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  if (onClose) onClose();
                }}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem' }}>
            <div style={{ overflow: 'hidden', paddingRight: '0.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {user?.name || 'User Profile'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {user?.email || 'user@resumecraft.local'}
              </div>
            </div>
            {logout && (
              <button className="btn-logout" title="Sign Out" onClick={logout} style={{ width: 34, height: 34, flexShrink: 0 }}>
                <LogOut size={15} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
