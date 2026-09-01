import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { JobApplication, ApplicationStatus } from '../types/resume';
import {
  Briefcase,
  Plus,
  Trash2,
  ExternalLink,
  DollarSign,
  Calendar,
  MapPin,
  Clock,
  MoreVertical,
  X,
  Sparkles
} from 'lucide-react';

const COLUMNS: { id: ApplicationStatus; title: string; color: string; badgeBg: string }[] = [
  { id: 'wishlist', title: 'Wishlist', color: 'border-slate-300', badgeBg: 'bg-slate-100 text-slate-700' },
  { id: 'applied', title: 'Applied', color: 'border-blue-300', badgeBg: 'bg-blue-100 text-blue-800' },
  { id: 'interview', title: 'Interviewing', color: 'border-purple-300', badgeBg: 'bg-purple-100 text-purple-800' },
  { id: 'offer', title: 'Offer Received', color: 'border-emerald-300', badgeBg: 'bg-emerald-100 text-emerald-800' },
  { id: 'rejected', title: 'Archived / Rejected', color: 'border-rose-300', badgeBg: 'bg-rose-100 text-rose-800' },
];

export const JobTrackerPage: React.FC = () => {
  const { jobApplications, addJobApplication, updateJobApplication, deleteJobApplication } = useResume();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newJob, setNewJob] = useState<Partial<JobApplication>>({
    company: '',
    role: '',
    status: 'wishlist',
    salary: '',
    location: '',
    url: '',
    notes: '',
    appliedDate: new Date().toISOString().split('T')[0]
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.company || !newJob.role) return;

    addJobApplication({
      company: newJob.company,
      role: newJob.role,
      status: (newJob.status as ApplicationStatus) || 'wishlist',
      salary: newJob.salary,
      location: newJob.location,
      url: newJob.url,
      notes: newJob.notes,
      appliedDate: newJob.appliedDate,
    });

    setNewJob({
      company: '',
      role: '',
      status: 'wishlist',
      salary: '',
      location: '',
      url: '',
      notes: '',
      appliedDate: new Date().toISOString().split('T')[0]
    });
    setShowAddModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-1">
            <Briefcase size={13} />
            <span>Kanban Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
            Job Application Tracker
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Organize interviews, target offers, salaries, and notes in one place with cloud synchronization.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-colors flex items-center gap-1.5 shadow"
        >
          <Plus size={15} />
          <span>Add Application</span>
        </button>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
        {COLUMNS.map((col) => {
          const appsInCol = jobApplications.filter(j => j.status === col.id);
          return (
            <div key={col.id} className="bg-slate-100/70 p-3 rounded-2xl border border-slate-200/80 min-h-[500px] flex flex-col">
              
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold text-slate-800">{col.title}</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${col.badgeBg}`}>
                  {appsInCol.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="space-y-3 flex-1">
                {appsInCol.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow space-y-2 text-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{app.company}</h4>
                        <div className="text-slate-600 font-medium">{app.role}</div>
                      </div>
                      <button
                        onClick={() => deleteJobApplication(app.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Delete application"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    {app.salary && (
                      <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                        <DollarSign size={11} />
                        <span>{app.salary}</span>
                      </div>
                    )}

                    {app.location && (
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <MapPin size={11} />
                        <span>{app.location}</span>
                      </div>
                    )}

                    {app.notes && (
                      <p className="text-[11px] text-slate-600 bg-slate-50 p-1.5 rounded border border-slate-100 line-clamp-2">
                        {app.notes}
                      </p>
                    )}

                    {/* Status Dropdown selector */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <select
                        value={app.status}
                        onChange={(e) => updateJobApplication(app.id, { status: e.target.value as ApplicationStatus })}
                        className="text-[10px] font-semibold bg-slate-50 border border-slate-200 rounded p-1 text-slate-700 outline-none"
                      >
                        <option value="wishlist">Wishlist</option>
                        <option value="applied">Applied</option>
                        <option value="interview">Interviewing</option>
                        <option value="offer">Offer</option>
                        <option value="rejected">Archived</option>
                      </select>

                      {app.url && (
                        <a
                          href={app.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-brand-600 hover:text-brand-800 flex items-center gap-0.5 text-[10px] font-bold"
                        >
                          <span>Link</span>
                          <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

      {/* Add Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in zoom-in-95">
            
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Add New Job Application</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-5 space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  value={newJob.company}
                  onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                  placeholder="e.g. Stripe, Google, OpenAI"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Job Role *</label>
                <input
                  type="text"
                  required
                  value={newJob.role}
                  onChange={(e) => setNewJob({ ...newJob, role: e.target.value })}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Stage / Status</label>
                  <select
                    value={newJob.status}
                    onChange={(e) => setNewJob({ ...newJob, status: e.target.value as ApplicationStatus })}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  >
                    <option value="wishlist">Wishlist</option>
                    <option value="applied">Applied</option>
                    <option value="interview">Interviewing</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Target Salary</label>
                  <input
                    type="text"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                    placeholder="$160k - $200k"
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Job Posting Link</label>
                <input
                  type="text"
                  value={newJob.url}
                  onChange={(e) => setNewJob({ ...newJob, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Notes & Follow-ups</label>
                <textarea
                  rows={3}
                  value={newJob.notes}
                  onChange={(e) => setNewJob({ ...newJob, notes: e.target.value })}
                  placeholder="Technical screener date, recruiter name, key tech questions..."
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 text-xs text-slate-600 font-semibold hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow"
                >
                  Save Application
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
