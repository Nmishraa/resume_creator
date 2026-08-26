import React from 'react';
import ProgressBar from './ProgressBar';

export default function ScoreCard({ title, value, label, icon: Icon, color = '#4f46e5', progress, max = 100 }) {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <span className="stat-label">{title}</span>
        <div className="stat-icon-box" style={{ backgroundColor: `${color}15`, color: color }}>
          {Icon && <Icon size={22} />}
        </div>
      </div>
      
      <div>
        <div className="stat-value">{value}</div>
        <div style={{ fontSize: '0.84rem', color: '#64748b', fontWeight: 500 }}>{label}</div>
        {progress !== undefined && (
          <div style={{ marginTop: '0.5rem' }}>
            <ProgressBar value={progress} max={max} color={color} height={6} />
          </div>
        )}
      </div>
    </div>
  );
}
