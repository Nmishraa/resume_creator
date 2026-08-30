import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTE_SEO_MAP, isPrivateRoute, SITE_URL } from '../utils/seoData';

export default function SeoHead() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const isPrivate = isPrivateRoute(pathname);
    const seoData = ROUTE_SEO_MAP[pathname] || ROUTE_SEO_MAP['/'];

    if (isPrivate) {
      document.title = 'Private Workspace | Resume & CV Craft';
    } else {
      document.title = seoData.title;
    }

    const updateMetaTag = (selector, contentAttr, value) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const matches = selector.match(/meta\[(name|property)="([^"]+)"\]/);
        if (matches) {
          element.setAttribute(matches[1], matches[2]);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(contentAttr, value);
    };

    // Robots Tag: noindex for private pages, index for public pages
    if (isPrivate) {
      updateMetaTag('meta[name="robots"]', 'content', 'noindex, nofollow');
    } else {
      updateMetaTag('meta[name="robots"]', 'content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      updateMetaTag('meta[name="description"]', 'content', seoData.description);
      updateMetaTag('meta[name="keywords"]', 'content', seoData.keywords);
      updateMetaTag('meta[property="og:title"]', 'content', seoData.title);
      updateMetaTag('meta[property="og:description"]', 'content', seoData.description);
      updateMetaTag('meta[property="og:url"]', 'content', seoData.canonical);
      updateMetaTag('meta[name="twitter:title"]', 'content', seoData.title);
      updateMetaTag('meta[name="twitter:description"]', 'content', seoData.description);
    }

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', isPrivate ? `${SITE_URL}${pathname}` : seoData.canonical);

    // JSON-LD WebPage & FAQ Schema
    let scriptTag = document.getElementById('route-jsonld-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'route-jsonld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    if (isPrivate) {
      scriptTag.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Private Workspace",
        "robots": "noindex, nofollow"
      });
    } else {
      const graph = [
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": seoData.title,
          "description": seoData.description,
          "url": seoData.canonical,
          "publisher": {
            "@type": "Organization",
            "name": "Resume & CV Craft",
            "url": SITE_URL,
            "logo": `${SITE_URL}/favicon.svg`
          }
        }
      ];

      if (seoData.faqs && seoData.faqs.length > 0) {
        graph.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": seoData.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.a
            }
          }))
        });
      }

      scriptTag.text = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
    }

    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}
