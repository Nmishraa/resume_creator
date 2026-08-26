import React from 'react';

export default function LoadingSkeleton({ type = 'card', count = 3 }) {
  const items = Array.from({ length: count });

  if (type === 'stats') {
    return (
      <div className="stats-grid">
        {items.map((_, i) => (
          <div key={i} className="stat-card" style={{ height: 130 }}>
            <div className="skeleton-pulse" style={{ height: 16, width: '40%', marginBottom: 12 }} />
            <div className="skeleton-pulse" style={{ height: 36, width: '60%', marginBottom: 8 }} />
            <div className="skeleton-pulse" style={{ height: 12, width: '80%' }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="resumes-grid-responsive">
      {items.map((_, i) => (
        <div key={i} className="res-card-modern" style={{ height: 240 }}>
          <div className="skeleton-pulse" style={{ height: 24, width: '70%', marginBottom: 12 }} />
          <div className="skeleton-pulse" style={{ height: 14, width: '40%', marginBottom: 20 }} />
          <div className="skeleton-pulse" style={{ height: 60, width: '100%', marginBottom: 20 }} />
          <div className="skeleton-pulse" style={{ height: 36, width: '100%' }} />
        </div>
      ))}
    </div>
  );
}
