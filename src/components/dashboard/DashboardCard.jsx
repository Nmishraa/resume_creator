import React from 'react';

export default function DashboardCard({ title, subtitle, icon: Icon, action, children, className = '' }) {
  return (
    <div className={`dash-card ${className}`}>
      {(title || action) && (
        <div className="dash-card-header">
          <div>
            {title && (
              <h3 className="dash-card-title">
                {Icon && <Icon size={22} style={{ color: '#4f46e5' }} />}
                {title}
              </h3>
            )}
            {subtitle && (
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem', fontWeight: 500 }}>
                {subtitle}
              </p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
