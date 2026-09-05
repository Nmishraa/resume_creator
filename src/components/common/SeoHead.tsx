import React, { useEffect } from 'react';
import { SITE_URL } from '../../data/sitemapData';

export interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
  noindex?: boolean;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  ogImage = `${SITE_URL}/og-image.png`,
  jsonLd,
  noindex = false
}) => {
  const fullCanonical = canonicalPath
    ? (canonicalPath.startsWith('http') ? canonicalPath : `${SITE_URL}${canonicalPath.startsWith('/') ? '' : '/'}${canonicalPath}`)
    : (typeof window !== 'undefined' ? window.location.href : SITE_URL);

  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Helper to set or update meta tag
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // OpenGraph
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', fullCanonical);
    setMetaTag('property', 'og:site_name', 'Resume Craft');
    setMetaTag('property', 'og:locale', 'en_US');
    setMetaTag('property', 'og:image', ogImage);

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // Canonical link
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', fullCanonical);

    // 3. Inject Structured Data JSON-LD
    const SCRIPT_ID = 'seo-structured-data';
    let scriptEl = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = SCRIPT_ID;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    // Generate BreadcrumbList Schema dynamically from path
    const pathParts = (canonicalPath || '').split('/').filter(Boolean);
    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL
      }
    ];

    let currentAcc = SITE_URL;
    pathParts.forEach((part, idx) => {
      currentAcc += `/${part}`;
      const formattedName = part
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: idx + 2,
        name: formattedName,
        item: currentAcc
      });
    });

    const defaultSchemas: Array<Record<string, any>> = [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Resume Craft',
        url: SITE_URL,
        description: 'Free AI Resume Builder, ATS Score Checker, and Career Optimization Platform.',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/resume-examples?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Resume Craft',
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.svg`,
        areaServed: {
          '@type': 'Country',
          name: 'United States'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Resume Craft',
        operatingSystem: 'All Web Browsers',
        applicationCategory: 'BusinessApplication',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD'
        },
        description: 'Free ATS-compatible resume builder and resume score checker powered by AI bullet optimization.'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems
      }
    ];

    const activeSchema = jsonLd
      ? (Array.isArray(jsonLd) ? [...defaultSchemas, ...jsonLd] : [...defaultSchemas, jsonLd])
      : defaultSchemas;

    scriptEl.textContent = JSON.stringify(activeSchema);
  }, [title, description, fullCanonical, ogType, ogImage, jsonLd]);

  return null;
};
