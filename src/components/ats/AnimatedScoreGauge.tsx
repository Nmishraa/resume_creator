import React, { useEffect, useState } from 'react';

interface AnimatedScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  sublabel?: string;
}

export const AnimatedScoreGauge: React.FC<AnimatedScoreGaugeProps> = ({
  score,
  size = 'md',
  label,
  sublabel
}) => {
  const [displayedScore, setDisplayedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Math.min(100, Math.max(0, score));
    if (start === end) {
      setDisplayedScore(end);
      return;
    }

    const duration = 1000; // 1s count-up
    const stepTime = 16; // ~60fps
    const steps = duration / stepTime;
    const increment = (end - start) / steps;

    const timer = setInterval(() => {
      start += increment;
      if ((increment > 0 && start >= end) || (increment < 0 && start <= end)) {
        setDisplayedScore(end);
        clearInterval(timer);
      } else {
        setDisplayedScore(Math.round(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  // Dimensions based on size
  const config = {
    sm: { radius: 36, strokeWidth: 7, svgSize: 90, fontSize: 'text-2xl' },
    md: { radius: 54, strokeWidth: 9, svgSize: 130, fontSize: 'text-4xl' },
    lg: { radius: 72, strokeWidth: 12, svgSize: 170, fontSize: 'text-5xl' }
  }[size];

  const circumference = 2 * Math.PI * config.radius;
  const strokeDashoffset = circumference - (displayedScore / 100) * circumference;

  // Determine status color scheme
  const isHigh = score >= 80;
  const isMedium = score >= 60 && score < 80;

  const gradientId = `gauge-gradient-${size}-${Math.random().toString(36).substr(2, 5)}`;
  const shadowColor = isHigh
    ? 'rgba(16, 185, 129, 0.25)'
    : isMedium
    ? 'rgba(245, 158, 11, 0.25)'
    : 'rgba(244, 63, 94, 0.25)';

  const textColor = isHigh
    ? 'text-emerald-600'
    : isMedium
    ? 'text-amber-500'
    : 'text-rose-500';

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <div className="relative inline-flex items-center justify-center">
        {/* Glow backdrop ring */}
        <div
          className="absolute inset-0 rounded-full blur-md transition-all duration-700"
          style={{ backgroundColor: shadowColor }}
        />

        <svg
          width={config.svgSize}
          height={config.svgSize}
          viewBox={`0 0 ${config.svgSize} ${config.svgSize}`}
          className="transform -rotate-90 relative z-10"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              {isHigh ? (
                <>
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#059669" />
                </>
              ) : isMedium ? (
                <>
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#d97706" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#fb7185" />
                  <stop offset="100%" stopColor="#e11d48" />
                </>
              )}
            </linearGradient>
          </defs>

          {/* Background Track */}
          <circle
            cx={config.svgSize / 2}
            cy={config.svgSize / 2}
            r={config.radius}
            className="stroke-slate-200/80"
            strokeWidth={config.strokeWidth}
            fill="transparent"
          />

          {/* Animated Progress Ring */}
          <circle
            cx={config.svgSize / 2}
            cy={config.svgSize / 2}
            r={config.radius}
            stroke={`url(#${gradientId})`}
            strokeWidth={config.strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition: 'stroke-dashoffset 1s ease-out'
            }}
          />
        </svg>

        {/* Inner Score Text */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
          <div className="flex items-baseline">
            <span className={`font-black tracking-tight ${config.fontSize} ${textColor}`}>
              {displayedScore}
            </span>
            <span className="text-xs font-bold text-slate-400 ml-0.5">%</span>
          </div>
        </div>
      </div>

      {label && (
        <div className="mt-2 text-center">
          <p className="font-extrabold text-sm text-slate-900">{label}</p>
          {sublabel && <p className="text-xs text-slate-500 font-medium">{sublabel}</p>}
        </div>
      )}
    </div>
  );
};
