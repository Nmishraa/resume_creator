import React, { useState } from 'react';
import { Briefcase, Plus, Trash2, Calendar, CheckCircle2, Clock, XCircle, Search, LayoutGrid, List, DollarSign, TrendingUp, Filter } from 'lucide-react';

const INITIAL_APPLICATIONS = [
  {
    id: 'app-1',
    company: 'Stripe',
    role: 'Senior Full Stack Engineer',
    appliedDate: '2026-08-20',
    salary: '$180,000 - $210,000',
    status: 'Interviewing',
    interviewDate: '2026-08-30',
    notes: 'Passed initial recruiter call. Technical coding round scheduled with Staff Engineer.'
  },
  {
    id: 'app-2',
    company: 'OpenAI',
    role: 'AI Infrastructure Engineer',
    appliedDate: '2026-08-22',
    salary: '$220,000 - $260,000',
    status: 'Applied',
    interviewDate: '',
    notes: 'Submitted tailored AI Engineer resume via referral link.'
  },
  {
    id: 'app-3',
    company: 'Figma',
    role: 'Product Engineer',
    appliedDate: '2026-08-15',
    salary: '$190,000 - $225,000',
    status: 'Offer',
    interviewDate: '2026-08-25',
    notes: 'Offer letter received! Reviewing equity package.'
  }
];

const STAGES = ['Applied', 'Interviewing', 'Offer', 'Rejected'];

export default function ApplicationTracker() {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('rc_job_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'table'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Form State
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState('');
  const [appliedDate, setAppliedDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState('Applied');
  const [interviewDate, setInterviewDate] = useState('');
  const [notes, setNotes] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const saveApps = (newApps) => {
    setApplications(newApps);
    localStorage.setItem('rc_job_applications', JSON.stringify(newApps));
  };

  const handleAddApp = (e) => {
    e.preventDefault();
    if (!company || !role) return;

    const newApp = {
      id: `app_${Date.now()}`,
      company,
      role,
      salary: salary || 'N/A',
      appliedDate,
      status,
      interviewDate,
      notes
    };

    saveApps([newApp, ...applications]);
    setCompany('');
    setRole('');
    setSalary('');
    setNotes('');
    setInterviewDate('');
    setShowAddForm(false);
  };

  const handleUpdateStatus = (id, newStatus) => {
    const updated = applications.map(a => a.id === id ? { ...a, status: newStatus } : a);
    saveApps(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this job application entry?')) {
      saveApps(applications.filter(a => a.id !== id));
    }
  };

  // Metrics
  const totalApps = applications.length;
  const interviewingApps = applications.filter(a => a.status === 'Interviewing').length;
  const offerApps = applications.filter(a => a.status === 'Offer').length;
  const responseRate = totalApps > 0 ? Math.round(((interviewingApps + offerApps) / totalApps) * 100) : 0;

  // Filtered List
  const filteredApplications = applications.filter((app) => {
    const matchesSearch = app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (st) => {
    switch (st) {
      case 'Interviewing': return { bg: '#e0e7ff', color: '#4338ca', icon: Clock };
      case 'Offer': return { bg: '#dcfce7', color: '#15803d', icon: CheckCircle2 };
      case 'Rejected': return { bg: '#fef2f2', color: '#991b1b', icon: XCircle };
      case 'Applied': default: return { bg: '#f1f5f9', color: '#475569', icon: Calendar };
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 1.5rem', color: '#1e293b' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#e0e7ff', color: '#4338ca', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.6rem' }}>
            <Briefcase size={14} /> Career Pipeline Manager
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Job Application Tracker</h1>
          <p style={{ fontSize: '0.95rem', color: '#64748b', marginTop: '0.3rem' }}>
            Organize applications, track interview stages, salary ranges, and follow-up notes.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{ padding: '0.75rem 1.4rem', borderRadius: '10px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 14px rgba(79,70,229,0.3)' }}
        >
          <Plus size={18} /> Add New Application
        </button>
      </div>

      {/* Analytics Counter Banner */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
        <div style={{ background: '#ffffff', padding: '1.4rem', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>Total Tracked Jobs</span>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginTop: '0.2rem' }}>{totalApps}</div>
        </div>

        <div style={{ background: '#ffffff', padding: '1.4rem', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#4338ca' }}>Active Interviews</span>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#4338ca', marginTop: '0.2rem' }}>{interviewingApps}</div>
        </div>

        <div style={{ background: '#ffffff', padding: '1.4rem', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#15803d' }}>Offers Received</span>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#15803d', marginTop: '0.2rem' }}>{offerApps}</div>
        </div>

        <div style={{ background: '#ffffff', padding: '1.4rem', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <TrendingUp size={14} color="#16a34a" /> Response Rate
          </span>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginTop: '0.2rem' }}>{responseRate}%</div>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <form onSubmit={handleAddApp} style={{ background: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem' }}>Add Job Application</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>Company Name</label>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Google, Stripe" style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} required />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>Role Title</label>
              <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Senior Software Engineer" style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} required />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>Target Salary</label>
              <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="e.g. $160k - $190k" style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff' }}>
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer Received</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>Application Date</label>
              <input type="date" value={appliedDate} onChange={(e) => setAppliedDate(e.target.value)} style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>Notes & Interview Prep</label>
            <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Recruiter contact, interview prep notes, technical topics..." style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'inherit' }} />
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setShowAddForm(false)} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ padding: '0.6rem 1.4rem', borderRadius: '8px', border: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: 800, cursor: 'pointer' }}>Save Application</button>
          </div>
        </form>
      )}

      {/* Filter and View Mode Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.8rem', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', padding: '1rem 1.2rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search company or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '0.55rem 0.55rem 0.55rem 2.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Filter size={15} color="#64748b" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', background: '#ffffff' }}
            >
              <option value="All">All Stages</option>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.3rem', background: '#f1f5f9', padding: '0.25rem', borderRadius: '8px' }}>
          <button
            onClick={() => setViewMode('kanban')}
            style={{ padding: '0.45rem 0.8rem', borderRadius: '6px', border: 'none', background: viewMode === 'kanban' ? '#ffffff' : 'transparent', color: viewMode === 'kanban' ? '#4f46e5' : '#64748b', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', boxShadow: viewMode === 'kanban' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none' }}
          >
            <LayoutGrid size={15} /> Kanban Board
          </button>
          <button
            onClick={() => setViewMode('table')}
            style={{ padding: '0.45rem 0.8rem', borderRadius: '6px', border: 'none', background: viewMode === 'table' ? '#ffffff' : 'transparent', color: viewMode === 'table' ? '#4f46e5' : '#64748b', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', boxShadow: viewMode === 'table' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none' }}
          >
            <List size={15} /> Table View
          </button>
        </div>
      </div>

      {/* Mode 1: Kanban Board */}
      {viewMode === 'kanban' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', alignItems: 'start' }}>
          {STAGES.map((stage) => {
            const stageApps = filteredApplications.filter(a => a.status === stage);
            return (
              <div key={stage} style={{ background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>{stage}</h3>
                  <span style={{ background: '#e2e8f0', color: '#475569', fontSize: '0.75rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '10px' }}>
                    {stageApps.length}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {stageApps.map((app) => (
                    <div key={app.id} style={{ background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '1.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                        <div>
                          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>{app.company}</h4>
                          <span style={{ fontSize: '0.85rem', color: '#4f46e5', fontWeight: 700 }}>{app.role}</span>
                        </div>
                        <button onClick={() => handleDelete(app.id)} style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.2rem' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {app.salary && app.salary !== 'N/A' && (
                        <div style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 700, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          <DollarSign size={13} /> {app.salary}
                        </div>
                      )}

                      {app.notes && (
                        <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.4rem 0', lineHeight: 1.4, background: '#f8fafc', padding: '0.5rem', borderRadius: '6px' }}>
                          {app.notes}
                        </p>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.8rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.6rem' }}>
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{app.appliedDate}</span>

                        <select
                          value={app.status}
                          onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                          style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.4rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', cursor: 'pointer' }}
                        >
                          {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                  ))}

                  {stageApps.length === 0 && (
                    <div style={{ padding: '2rem 1rem', textAling: 'center', textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem', border: '1px dashed #cbd5e1', borderRadius: '8px' }}>
                      No applications in {stage}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mode 2: Table View */}
      {viewMode === 'table' && (
        <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 14px rgba(0,0,0,0.02)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 800 }}>
                <th style={{ padding: '1rem' }}>Company</th>
                <th style={{ padding: '1rem' }}>Role</th>
                <th style={{ padding: '1rem' }}>Salary</th>
                <th style={{ padding: '1rem' }}>Applied Date</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => {
                const badge = getStatusBadge(app.status);
                const IconComp = badge.icon;
                return (
                  <tr key={app.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1rem', fontWeight: 800, color: '#0f172a' }}>{app.company}</td>
                    <td style={{ padding: '1rem', color: '#4f46e5', fontWeight: 700 }}>{app.role}</td>
                    <td style={{ padding: '1rem', color: '#16a34a', fontWeight: 700 }}>{app.salary || 'N/A'}</td>
                    <td style={{ padding: '1rem', color: '#64748b' }}>{app.appliedDate}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.25rem 0.6rem', borderRadius: '16px', background: badge.bg, color: badge.color, fontSize: '0.78rem', fontWeight: 800 }}>
                        <IconComp size={13} /> {app.status}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button onClick={() => handleDelete(app.id)} style={{ border: 'none', background: '#fef2f2', color: '#ef4444', padding: '0.4rem 0.7rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '0.78rem' }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
