import React from 'react';

export default function ProgressBar({ value = 0, max = 100, color = '#4f46e5', height = 8 }) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  
  return (
    <div className="progress-bar-container" style={{ height }}>
      <div 
        className="progress-bar-fill" 
        style={{ 
          width: `${percentage}%`,
          backgroundColor: color 
        }} 
      />
    </div>
  );
}
