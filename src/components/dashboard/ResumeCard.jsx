import React, { useState } from 'react';
import { Edit3, Sparkles, Eye, Download, MoreVertical, Copy, Edit, Trash2 } from 'lucide-react';

export default function ResumeCard({ resume, onEdit, onOptimize, onPreview, onDownload, onDuplicate, onRename, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const title = resume.title || 'Untitled Resume';
  const atsScore = resume.atsScore || 87;
  const jobMatch = resume.jobMatch || 91;

  return (
    <div className="res-card-modern">
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.2rem' }}>{title}</h4>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 500 }}>Updated {formatDate(resume.updatedAt)}</span>
          </div>

          <div style={{ position: 'relative' }}>
            <button 
              className="btn-secondary"
              style={{ width: 34, height: 34, padding: 0, borderRadius: '50%' }}
              onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
            >
              <MoreVertical size={16} />
            </button>

            {showMenu && (
              <div 
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '110%',
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: 12,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  zIndex: 50,
                  width: 160,
                  overflow: 'hidden'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', width: '100%', padding: '0.6rem 0.9rem', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}
                  onClick={() => { setShowMenu(false); onDuplicate(resume.id); }}
                >
                  <Copy size={14} /> Duplicate
                </button>
                <button
                  style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', width: '100%', padding: '0.6rem 0.9rem', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}
                  onClick={() => { setShowMenu(false); onRename(resume); }}
                >
                  <Edit size={14} /> Rename
                </button>
                <button
                  style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', width: '100%', padding: '0.6rem 0.9rem', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#dc2626' }}
                  onClick={() => { setShowMenu(false); onDelete(resume.id); }}
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Score Badges */}
        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <span className="res-badge-score" style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0' }}>
            ATS: {atsScore}/100
          </span>
          <span className="res-badge-score" style={{ background: '#e0e7ff', color: '#4338ca', border: '1px solid #c7d2fe' }}>
            Match: {jobMatch}%
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '1rem' }}>
        <button className="btn btn-primary" style={{ padding: '0.5rem 0.8rem', fontSize: '0.85rem' }} onClick={() => onEdit(resume.id)}>
          <Edit3 size={14} /> Edit
        </button>
        <button className="btn btn-secondary" style={{ padding: '0.5rem 0.8rem', fontSize: '0.85rem' }} onClick={() => onOptimize(resume)}>
          <Sparkles size={14} style={{ color: '#4f46e5' }} /> Optimize
        </button>
        <button className="btn btn-secondary" style={{ padding: '0.5rem 0.8rem', fontSize: '0.85rem' }} onClick={() => onPreview(resume.id)}>
          <Eye size={14} /> Preview
        </button>
        <button className="btn btn-secondary" style={{ padding: '0.5rem 0.8rem', fontSize: '0.85rem' }} onClick={() => onDownload(resume)}>
          <Download size={14} /> PDF
        </button>
      </div>
    </div>
  );
}
