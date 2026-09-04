import React, { useState, useEffect } from 'react';
import { ShieldCheck, X, Check } from 'lucide-react';
import { getConsentStatus, setConsent, ConsentStatus } from '../../services/analytics';

export const CookieConsentBanner: React.FC = () => {
  const [consentStatus, setConsentStatusState] = useState<ConsentStatus>('granted');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const current = getConsentStatus();
    setConsentStatusState(current);
    if (current === 'unset') {
      // Small delay for smooth entry animation
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible || consentStatus !== 'unset') {
    return null;
  }

  const handleAccept = () => {
    setConsent(true);
    setConsentStatusState('granted');
    setVisible(false);
  };

  const handleDecline = () => {
    setConsent(false);
    setConsentStatusState('denied');
    setVisible(false);
  };

  return (
    <div className="no-print fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-2xl space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-brand-300 font-extrabold text-xs">
            <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
            <span>Privacy &amp; Analytics Consent</span>
          </div>
          <button
            type="button"
            onClick={handleDecline}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close Cookie Consent"
          >
            <X size={16} />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          We use privacy-friendly analytics cookies to measure page views, performance metrics, and feature usage to improve Resume Craft. <strong className="text-white">Zero personal resume data, names, or emails are tracked.</strong>
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Check size={14} />
            <span>Accept Analytics</span>
          </button>

          <button
            type="button"
            onClick={handleDecline}
            className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs border border-slate-700 transition-all cursor-pointer active:scale-95"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};
