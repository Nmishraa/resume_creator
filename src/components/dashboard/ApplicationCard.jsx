import React from 'react';
import { Building2, Calendar, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

export default function ApplicationCard({ application, onStatusChange }) {
  const statuses = ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Saved': return { bg: '#f1f5f9', color: '#475569' };
      case 'Applied': return { bg: '#e0e7ff', color: '#4338ca' };
      case 'Interview': return { bg: '#fef3c7', color: '#d97706' };
      case 'Offer': return { bg: '#dcfce7', color: '#15803d' };
      case 'Rejected': return { bg: '#ffe4e6', color: '#be123c' };
      default: return { bg: '#f1f5f9', color: '#475569' };
    }
  };

  const badge = getStatusColor(application.status);

  return (
    <div className="kanban-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <div>
          <h5 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.1rem' }}>{application.role}</h5>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
            <Building2 size={14} /> {application.company}
          </div>
        </div>
        <span 
          style={{ 
            fontSize: '0.72rem', 
            fontWeight: 800, 
            padding: '0.2rem 0.5rem', 
            borderRadius: 6, 
            background: badge.bg, 
            color: badge.color 
          }}
        >
          {application.match}% Match
        </span>
      </div>

      <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Calendar size={13} /> Applied: {application.appliedDate}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <FileText size={13} /> Resume: {application.resumeTitle}
        </div>
        {application.notes && (
          <div style={{ background: '#f8fafc', padding: '0.4rem 0.6rem', borderRadius: 6, fontSize: '0.78rem', fontStyle: 'italic', border: '1px solid #e2e8f0', marginTop: '0.25rem' }}>
            "{application.notes}"
          </div>
        )}
      </div>

      {/* Move Status Dropdown */}
      <div style={{ marginTop: '0.85rem', paddingTop: '0.6rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Move to:</span>
        <select 
          value={application.status}
          onChange={(e) => onStatusChange(application.id, e.target.value)}
          style={{ padding: '0.2rem 0.4rem', fontSize: '0.78rem', borderRadius: 6, border: '1px solid #cbd5e1', fontWeight: 600, background: 'white', cursor: 'pointer' }}
        >
          {statuses.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
