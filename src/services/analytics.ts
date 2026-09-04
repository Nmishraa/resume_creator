// Google Analytics 4 (GA4) Integration Service for Resume Craft

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const STORAGE_KEY = 'resumecraft_cookie_consent';

export function getMeasurementId(): string {
  return (import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim();
}

export type ConsentStatus = 'granted' | 'denied' | 'unset';

export function getConsentStatus(): ConsentStatus {
  if (typeof window === 'undefined') return 'unset';
  const val = localStorage.getItem(STORAGE_KEY);
  if (val === 'granted' || val === 'denied') return val;
  return 'unset';
}

/**
 * Initialize Google Tag (gtag.js) script dynamically if Measurement ID is present
 */
export function initGA(): void {
  if (typeof window === 'undefined') return;

  const measurementId = getMeasurementId();
  if (!measurementId) {
    console.info('[Analytics] VITE_GA_MEASUREMENT_ID is not configured. GA4 tracking is in mock mode.');
    return;
  }

  // Ensure dataLayer array exists
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }

  const currentConsent = getConsentStatus();

  // Set default GA4 consent mode state
  window.gtag('consent', 'default', {
    analytics_storage: currentConsent === 'granted' ? 'granted' : 'denied',
    ad_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted'
  });

  // Inject Google Tag script if not already present
  const scriptId = 'ga4-gtag-script';
  if (!document.getElementById(scriptId)) {
    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: false, // We manually send page_view via React Router listener
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });
  }
}

/**
 * Update Analytics Cookie Consent choice
 */
export function setConsent(granted: boolean): void {
  if (typeof window === 'undefined') return;

  const status: ConsentStatus = granted ? 'granted' : 'denied';
  localStorage.setItem(STORAGE_KEY, status);

  if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: status === 'granted' ? 'granted' : 'denied'
    });
  }
}

/**
 * Strip potential PII (emails, phone numbers, long text strings) from event params
 */
function sanitizeParams(params: Record<string, any> = {}): Record<string, any> {
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string') {
      // Strip emails
      let val = value.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL]');
      // Strip phone numbers
      val = val.replace(/(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g, '[REDACTED_PHONE]');
      // Truncate long strings to prevent accidental resume text payload
      if (val.length > 100) {
        val = val.substring(0, 100) + '...';
      }
      sanitized[key] = val;
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Track SPA Page View for React Router navigation
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined') return;

  const measurementId = getMeasurementId();
  const cleanPath = path.split('?')[0]; // Omit raw query string to protect sensitive params

  if (window.gtag && measurementId) {
    window.gtag('event', 'page_view', {
      page_path: cleanPath,
      page_title: title || document.title,
      send_to: measurementId
    });
  }
}

/**
 * Track Custom Event in GA4
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}): void {
  if (typeof window === 'undefined') return;

  const cleanParams = sanitizeParams(params);
  const measurementId = getMeasurementId();

  if (window.gtag && measurementId) {
    window.gtag('event', eventName, cleanParams);
  } else {
    // Development debug log
    if (import.meta.env.DEV) {
      console.log(`[Analytics Event Debug] ${eventName}:`, cleanParams);
    }
  }
}

// Dedicated Tracking Functions for User Requirements

/** Event 1: Resume Builder Opened */
export function trackResumeBuilderOpened(source: string = 'direct'): void {
  trackEvent('resume_builder_opened', {
    source,
    timestamp: new Date().toISOString()
  });
}

/** Event 2: Resume Created */
export function trackResumeCreated(templateId: string = 'default'): void {
  trackEvent('resume_created', {
    template_id: templateId,
    timestamp: new Date().toISOString()
  });
}

/** Event 3: ATS Check Completed */
export function trackAtsCheckCompleted(score: number): void {
  trackEvent('ats_check_completed', {
    ats_score: Math.min(100, Math.max(0, Math.round(score))),
    score_range: score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Improvement'
  });
}

/** Event 4: Interview Questions Generated */
export function trackInterviewQuestionsGenerated(role: string, experienceLevel: string): void {
  trackEvent('interview_questions_generated', {
    role_category: role.substring(0, 40),
    experience_level: experienceLevel,
    question_count: 10
  });
}

/** Event 5: Resume Downloaded */
export function trackResumeDownloaded(fileFormat: string = 'pdf'): void {
  trackEvent('resume_downloaded', {
    file_format: fileFormat,
    download_timestamp: new Date().toISOString()
  });
}
