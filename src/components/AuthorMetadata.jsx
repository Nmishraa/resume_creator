import React from 'react';
import { UserCheck, Calendar, ShieldCheck } from 'lucide-react';
import { AUTHOR_INFO, LAST_UPDATED } from '../utils/seoData';

export default function AuthorMetadata({ updatedDate = LAST_UPDATED, author = AUTHOR_INFO }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '1.2rem 1.5rem',
        background: '#f8fafc',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        marginBottom: '2.5rem',
        fontSize: '0.88rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: '#e0e7ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4f46e5',
            fontWeight: 800
          }}
        >
          <UserCheck size={22} />
        </div>
        <div>
          <div style={{ fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {author.name}
            <span style={{ color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.78rem', background: '#dcfce7', padding: '0.15rem 0.5rem', borderRadius: '12px' }}>
              <ShieldCheck size={13} /> ATS Verified
            </span>
          </div>
          <div style={{ color: '#64748b', fontSize: '0.82rem' }}>{author.role}</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontWeight: 600 }}>
        <Calendar size={16} color="#4f46e5" />
        <span>Last Updated: <strong>{updatedDate}</strong></span>
      </div>
    </div>
  );
}
