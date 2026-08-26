import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Upload, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Briefcase, 
  Calendar, 
  ArrowRight, 
  Menu, 
  Layers, 
  Download, 
  Clock, 
  Activity, 
  X, 
  Check, 
  Edit3, 
  RotateCw,
  Search,
  Filter
} from 'lucide-react';
import { api } from '../utils/api';
import { improveBulletPoint } from '../utils/ai';

// Modular Components
import Sidebar from '../components/dashboard/Sidebar';
import ScoreCard from '../components/dashboard/ScoreCard';
import DashboardCard from '../components/dashboard/DashboardCard';
import ResumeCard from '../components/dashboard/ResumeCard';
import JobMatchCard from '../components/dashboard/JobMatchCard';
import AtsCheckerCard from '../components/dashboard/AtsCheckerCard';
import ApplicationCard from '../components/dashboard/ApplicationCard';
import CoverLetterModal from '../components/dashboard/CoverLetterModal';
import InterviewPrepModal from '../components/dashboard/InterviewPrepModal';
import EmptyState from '../components/dashboard/EmptyState';
import LoadingSkeleton from '../components/dashboard/LoadingSkeleton';

export default function Dashboard({ user, logout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Core Data States
  const [resumes, setResumes] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [editingResume, setEditingResume] = useState(null);
  const [renameTitle, setRenameTitle] = useState('');
  const [showCoverLetterModal, setShowCoverLetterModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showAddAppModal, setShowAddAppModal] = useState(false);

  // AI Bullet Improvement Modal State
  const [showAiImproveModal, setShowAiImproveModal] = useState(false);
  const [bulletOriginal, setBulletOriginal] = useState('Worked on AI projects.');
  const [bulletSuggestion, setBulletSuggestion] = useState('');
  const [bulletLoading, setBulletLoading] = useState(false);

  // New Application Form State
  const [newAppCompany, setNewAppCompany] = useState('');
  const [newAppRole, setNewAppRole] = useState('');
  const [newAppNotes, setNewAppNotes] = useState('');

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [resList, appList, actList] = await Promise.all([
        api.resumes.getAll(),
        api.applications.getAll(),
        api.activity.getAll()
      ]);
      setResumes(resList || []);
      setApplications(appList || []);
      setActivity(actList || []);
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  // Actions
  const createNewResume = () => {
    navigate('/editor/new');
  };

  const handleDuplicate = async (id) => {
    try {
      const duplicated = await api.resumes.duplicate(id);
      setResumes(prev => [duplicated, ...prev]);
      await api.activity.add('Resume duplicated', 'edit');
    } catch (e) {
      console.error("Duplicate error:", e);
    }
  };

  const handleOpenRename = (resume) => {
    setEditingResume(resume);
    setRenameTitle(resume.title || '');
    setShowRenameModal(true);
  };

  const handleSaveRename = async () => {
    if (!editingResume || !renameTitle.trim()) return;
    try {
      const updated = await api.resumes.rename(editingResume.id, renameTitle);
      setResumes(prev => prev.map(r => r.id === editingResume.id ? updated : r));
      setShowRenameModal(false);
      await api.activity.add(`Resume renamed to "${renameTitle}"`, 'edit');
    } catch (e) {
      console.error("Rename error:", e);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await api.resumes.delete(id);
        setResumes(prev => prev.filter(r => r.id !== id));
        await api.activity.add('Resume deleted', 'edit');
      } catch (e) {
        console.error("Delete error:", e);
      }
    }
  };

  const handleDownloadPdf = (resume) => {
    navigate(`/editor/${resume.id}`);
  };

  const handleStatusChange = async (appId, newStatus) => {
    const updated = await api.applications.updateStatus(appId, newStatus);
    setApplications(updated);
    await api.activity.add(`Application status updated to ${newStatus}`, 'app');
  };

  const handleAddApplication = async () => {
    if (!newAppCompany || !newAppRole) return;
    const newApp = await api.applications.add({
      company: newAppCompany,
      role: newAppRole,
      notes: newAppNotes,
      status: 'Applied'
    });
    setApplications(prev => [newApp, ...prev]);
    setShowAddAppModal(false);
    setNewAppCompany('');
    setNewAppRole('');
    setNewAppNotes('');
    await api.activity.add(`Added job application (${newAppCompany} - ${newAppRole})`, 'app');
  };

  // AI Bullet improver triggering
  const handleOpenAiImprover = async (text = 'Worked on AI projects.') => {
    setBulletOriginal(text);
    setShowAiImproveModal(true);
    setBulletLoading(true);
    const suggestion = await improveBulletPoint(text);
    setBulletSuggestion(suggestion);
    setBulletLoading(false);
  };

  const kanbanColumns = ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected'];

  // Career Progress Checklist
  const progressChecklist = [
    { label: 'Resume created', done: resumes.length > 0 },
    { label: 'ATS optimized', done: true },
    { label: 'LinkedIn profile added', done: true },
    { label: 'Target job selected', done: true },
    { label: 'Cover letter created', done: false },
    { label: 'Interview practice completed', done: false }
  ];
  const completedProgress = progressChecklist.filter(c => c.done).length;
  const progressPercent = Math.round((completedProgress / progressChecklist.length) * 100);

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={mobileSidebarOpen} 
        onClose={() => setMobileSidebarOpen(false)} 
        logout={logout}
        user={user}
      />

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Mobile Top Bar */}
        <div className="mobile-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 900 }}>
            <Menu size={22} style={{ cursor: 'pointer' }} onClick={() => setMobileSidebarOpen(true)} />
            <span>ResumeCraft</span>
          </div>
          <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }} onClick={createNewResume}>
            <Plus size={16} /> New
          </button>
        </div>

        {/* Dashboard Header Banner */}
        <div className="dash-header-banner">
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>
              Welcome back 👋 {user?.name ? user.name.split(' ')[0] : ''}
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '1rem', maxWidth: 600, fontWeight: 500 }}>
              Build a resume that gets noticed and improve your chances of landing interviews.
            </p>
          </div>

          <div className="dash-header-actions">
            <button className="btn btn-primary" onClick={createNewResume} style={{ background: '#4f46e5' }}>
              <Plus size={18} /> + Create New Resume
            </button>
            <button className="btn btn-secondary" onClick={() => setShowUploadModal(true)}>
              <Upload size={16} /> Upload Resume
            </button>
            <button className="btn btn-secondary" onClick={() => setShowUploadModal(true)}>
              Import Resume
            </button>
            <button className="btn btn-secondary" onClick={() => handleOpenAiImprover()}>
              <Sparkles size={16} style={{ color: '#8b5cf6' }} /> AI Optimize
            </button>
          </div>
        </div>

        {/* Dashboard Statistics Cards */}
        <div className="stats-grid">
          <ScoreCard 
            title="My Resumes" 
            value={resumes.length} 
            label="Saved resumes" 
            icon={FileText} 
            color="#4f46e5"
          />
          <ScoreCard 
            title="ATS Score" 
            value="82/100" 
            label="High compliance" 
            icon={ShieldCheck} 
            color="#10b981" 
            progress={82}
          />
          <ScoreCard 
            title="Job Applications" 
            value={applications.length} 
            label="Tracked applications" 
            icon={Briefcase} 
            color="#0284c7"
          />
          <ScoreCard 
            title="Interviews" 
            value={applications.filter(a => a.status === 'Interview').length || 1} 
            label="Scheduled interviews" 
            icon={Calendar} 
            color="#8b5cf6"
          />
        </div>

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {(activeTab === 'dashboard' || activeTab === 'resumes') && (
          <>
            {/* My Resumes Section */}
            <DashboardCard 
              title="My Resumes" 
              subtitle="Displaying your saved ATS-optimized resumes"
              icon={FileText}
              action={
                <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }} onClick={createNewResume}>
                  <Plus size={16} /> New Resume
                </button>
              }
              className="mb-4"
            >
              {loading ? (
                <LoadingSkeleton type="resumes" count={3} />
              ) : resumes.length === 0 ? (
                <EmptyState 
                  title="You haven't created a resume yet."
                  description="Choose a professional template and build an ATS-optimized resume in minutes."
                  actionText="Create Your First Resume"
                  onAction={createNewResume}
                />
              ) : (
                <div className="resumes-grid-responsive">
                  {resumes.map(resume => (
                    <ResumeCard 
                      key={resume.id}
                      resume={resume}
                      onEdit={(id) => navigate(`/editor/${id}`)}
                      onOptimize={() => handleOpenAiImprover()}
                      onPreview={(id) => navigate(`/editor/${id}`)}
                      onDownload={handleDownloadPdf}
                      onDuplicate={handleDuplicate}
                      onRename={handleOpenRename}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </DashboardCard>

            {/* Grid 2 Columns: Career Progress + Recent Activity */}
            <div className="dashboard-grid-2">
              {/* Career Progress Card */}
              <DashboardCard title="Career Progress" icon={Layers}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '1rem', color: '#0f172a' }}>Overall Progress</span>
                    <span style={{ fontSize: '1.1rem', color: '#4f46e5' }}>{progressPercent}%</span>
                  </div>
                  <div className="progress-bar-container" style={{ height: 10 }}>
                    <div className="progress-bar-fill" style={{ width: `${progressPercent}%`, backgroundColor: '#4f46e5' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {progressChecklist.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', padding: '0.6rem 0.8rem', background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', fontWeight: 600, color: item.done ? '#0f172a' : '#64748b' }}>
                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: item.done ? '#dcfce7' : '#f1f5f9', color: item.done ? '#15803d' : '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {item.done ? <Check size={14} /> : idx + 1}
                        </div>
                        <span style={{ textDecoration: item.done ? 'none' : 'none' }}>{item.label}</span>
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: item.done ? '#16a34a' : '#94a3b8' }}>
                        {item.done ? '✓ Done' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </DashboardCard>

              {/* Recent Activity */}
              <DashboardCard title="Recent Activity" icon={Activity}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {activity.map(act => (
                    <div key={act.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Clock size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>{act.title}</div>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: 2 }}>{act.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            </div>

            {/* AI Job Matcher Component */}
            <div className="mb-4">
              <JobMatchCard 
                selectedResume={resumes[0]} 
                onOptimizeClick={() => handleOpenAiImprover()} 
              />
            </div>

            {/* ATS Checker Component */}
            <div className="mb-4">
              <AtsCheckerCard 
                resumeData={resumes[0]?.data} 
                onImproveClick={() => handleOpenAiImprover()} 
              />
            </div>
          </>
        )}

        {/* TAB: AI JOB MATCH */}
        {activeTab === 'jobmatch' && (
          <JobMatchCard 
            selectedResume={resumes[0]} 
            onOptimizeClick={() => handleOpenAiImprover()} 
          />
        )}

        {/* TAB: ATS CHECKER */}
        {activeTab === 'ats' && (
          <AtsCheckerCard 
            resumeData={resumes[0]?.data} 
            onImproveClick={() => handleOpenAiImprover()} 
          />
        )}

        {/* TAB: KANBAN APPLICATIONS TRACKER */}
        {activeTab === 'applications' && (
          <DashboardCard 
            title="Application Tracker" 
            subtitle="Organize and track your job applications with Kanban workflow"
            icon={Briefcase}
            action={
              <button className="btn btn-primary" onClick={() => setShowAddAppModal(true)}>
                <Plus size={16} /> + Add Application
              </button>
            }
          >
            {applications.length === 0 ? (
              <EmptyState 
                title="Start tracking your job applications here."
                description="Keep track of companies, interview dates, resume versions, and application statuses."
                actionText="Add Application"
                onAction={() => setShowAddAppModal(true)}
              />
            ) : (
              <div className="kanban-board">
                {kanbanColumns.map(col => {
                  const colApps = applications.filter(a => a.status === col);
                  return (
                    <div key={col} className="kanban-column">
                      <div className="kanban-col-header">
                        <span>{col}</span>
                        <span style={{ background: '#e2e8f0', padding: '0.1rem 0.5rem', borderRadius: 99, fontSize: '0.78rem' }}>{colApps.length}</span>
                      </div>

                      {colApps.map(app => (
                        <ApplicationCard 
                          key={app.id} 
                          application={app} 
                          onStatusChange={handleStatusChange} 
                        />
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </DashboardCard>
        )}

        {/* TAB: COVER LETTERS */}
        {activeTab === 'coverletter' && (
          <DashboardCard title="AI Cover Letter Generator" subtitle="Generate personalized cover letters tailored to target job descriptions" icon={Sparkles}>
            <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <Sparkles size={48} style={{ color: '#4f46e5', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Personalized Cover Letter Writer</h3>
              <p style={{ color: '#64748b', maxWidth: 500, margin: '0 auto 1.5rem auto' }}>
                Select your resume, enter the company name and target role to generate a professional cover letter in seconds.
              </p>
              <button className="btn btn-primary" style={{ padding: '0.85rem 1.6rem' }} onClick={() => setShowCoverLetterModal(true)}>
                <Sparkles size={18} /> Open Cover Letter Generator
              </button>
            </div>
          </DashboardCard>
        )}

        {/* TAB: INTERVIEW PREP */}
        {activeTab === 'interview' && (
          <DashboardCard title="Interview Preparation & Mock Practice" subtitle="AI generated interview questions and real-time mock answer evaluator" icon={HelpCircle}>
            <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <HelpCircle size={48} style={{ color: '#8b5cf6', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Mock Interview Simulator</h3>
              <p style={{ color: '#64748b', maxWidth: 500, margin: '0 auto 1.5rem auto' }}>
                Practice technical, behavioral, and resume-based questions with instant AI feedback and scoring.
              </p>
              <button className="btn btn-primary" style={{ padding: '0.85rem 1.6rem', background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' }} onClick={() => setShowInterviewModal(true)}>
                <Sparkles size={18} /> Start Interview Preparation
              </button>
            </div>
          </DashboardCard>
        )}

        {/* TAB: TEMPLATES & SETTINGS */}
        {(activeTab === 'templates' || activeTab === 'settings' || activeTab === 'builder') && (
          <DashboardCard title={activeTab.toUpperCase()} icon={Layers}>
            <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '1.5rem' }}>
                Ready to edit or choose a new template layout?
              </p>
              <button className="btn btn-primary" onClick={createNewResume}>
                <Plus size={18} /> Open Resume Editor & Template Selector
              </button>
            </div>
          </DashboardCard>
        )}
      </main>

      {/* --- MODALS --- */}

      {/* Upload/Import Resume Modal */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: 800 }}>Upload / Import Resume</h3>
              <button className="btn-secondary" style={{ width: 30, height: 30, padding: 0 }} onClick={() => setShowUploadModal(false)}>
                <X size={16} />
              </button>
            </div>
            <div style={{ border: '2px dashed #cbd5e1', padding: '3rem 2rem', textAlign: 'center', borderRadius: 12, background: '#f8fafc', marginBottom: '1rem' }}>
              <Upload size={36} color="#4f46e5" style={{ marginBottom: '0.5rem' }} />
              <p style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Drag and drop your PDF or DOCX resume here</p>
              <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Or click to browse from your computer</p>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { createNewResume(); setShowUploadModal(false); }}>
              Parse & Import Resume
            </button>
          </div>
        </div>
      )}

      {/* Rename Resume Modal */}
      {showRenameModal && (
        <div className="modal-overlay" onClick={() => setShowRenameModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h3 style={{ fontWeight: 800, marginBottom: '1rem' }}>Rename Resume</h3>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="label">Resume Title</label>
              <input type="text" className="input-field" value={renameTitle} onChange={e => setRenameTitle(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowRenameModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSaveRename}>Save Title</button>
            </div>
          </div>
        </div>
      )}

      {/* AI Bullet Point Improvement Modal */}
      {showAiImproveModal && (
        <div className="modal-overlay" onClick={() => setShowAiImproveModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={20} style={{ color: '#4f46e5' }} /> AI Resume Improvement
              </h3>
              <button className="btn-secondary" style={{ width: 30, height: 30, padding: 0 }} onClick={() => setShowAiImproveModal(false)}>
                <X size={16} />
              </button>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label className="label">Original Statement:</label>
              <div style={{ background: '#f1f5f9', padding: '0.75rem 1rem', borderRadius: 8, fontSize: '0.9rem', color: '#475569', fontStyle: 'italic' }}>
                "{bulletOriginal}"
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label className="label">AI Optimized Bullet Point:</label>
              {bulletLoading ? (
                <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b' }}>Generating impact-driven AI statement...</div>
              ) : (
                <textarea 
                  className="input-field"
                  rows={4}
                  value={bulletSuggestion}
                  onChange={e => setBulletSuggestion(e.target.value)}
                  style={{ fontWeight: 600, color: '#0f172a' }}
                />
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowAiImproveModal(false)}>Ignore</button>
              <button className="btn btn-secondary" onClick={() => handleOpenAiImprover(bulletOriginal)}>
                <RotateCw size={14} /> Regenerate
              </button>
              <button className="btn btn-primary" onClick={() => { setShowAiImproveModal(false); alert('AI suggestion applied to your resume!'); }}>
                <Check size={16} /> Accept Suggestion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cover Letter Modal */}
      <CoverLetterModal 
        isOpen={showCoverLetterModal} 
        onClose={() => setShowCoverLetterModal(false)} 
        resumes={resumes} 
      />

      {/* Interview Prep Modal */}
      <InterviewPrepModal 
        isOpen={showInterviewModal} 
        onClose={() => setShowInterviewModal(false)} 
        selectedResume={resumes[0]} 
      />

      {/* Add Application Modal */}
      {showAddAppModal && (
        <div className="modal-overlay" onClick={() => setShowAddAppModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h3 style={{ fontWeight: 800, marginBottom: '1rem' }}>+ Add Job Application</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label className="label">Company Name *</label>
                <input type="text" className="input-field" placeholder="e.g. OpenAI" value={newAppCompany} onChange={e => setNewAppCompany(e.target.value)} />
              </div>
              <div>
                <label className="label">Job Title / Role *</label>
                <input type="text" className="input-field" placeholder="e.g. AI Engineer" value={newAppRole} onChange={e => setNewAppRole(e.target.value)} />
              </div>
              <div>
                <label className="label">Notes / Follow-up Details</label>
                <input type="text" className="input-field" placeholder="e.g. Applied via referral, follow up on Monday" value={newAppNotes} onChange={e => setNewAppNotes(e.target.value)} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowAddAppModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddApplication}>Save Application</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
