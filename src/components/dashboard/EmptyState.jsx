import React from 'react';
import { FileQuestion, Plus } from 'lucide-react';

export default function EmptyState({ title = 'No data found', description, icon: Icon = FileQuestion, actionText, onAction }) {
  return (
    <div style={{ textAlign: 'center', padding: '3.5rem 2rem', background: '#f8fafc', borderRadius: '16px', border: '2px dashed #cbd5e1' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#e0e7ff', color: '#4f46e5', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
        <Icon size={32} />
      </div>
      <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>{title}</h4>
      {description && <p style={{ fontSize: '0.9rem', color: '#64748b', maxWidth: 400, margin: '0 auto 1.5rem auto', lineHeight: 1.5 }}>{description}</p>}
      {actionText && onAction && (
        <button className="btn btn-primary" onClick={onAction}>
          <Plus size={18} /> {actionText}
        </button>
      )}
    </div>
  );
}
