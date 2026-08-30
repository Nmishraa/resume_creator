import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ROUTE_SEO_MAP, SITE_URL } from '../src/utils/seoData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

async function prerender() {
  console.log('🚀 Starting Static Pre-Rendering Build Step...');

  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('❌ dist/index.html not found! Run `vite build` first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf8');

  for (const [routePath, seo] of Object.entries(ROUTE_SEO_MAP)) {
    console.log(`  [PRERENDER] Processing route: ${routePath}`);

    // Build structured JSON-LD schema graph
    const schemaGraph = [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": seo.title,
        "description": seo.description,
        "url": seo.canonical,
        "publisher": {
          "@type": "Organization",
          "name": "Resume & CV Craft",
          "url": SITE_URL,
          "logo": `${SITE_URL}/favicon.svg`
        }
      }
    ];

    if (seo.faqs && seo.faqs.length > 0) {
      schemaGraph.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": seo.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      });
    }

    const jsonLdHtml = `<script id="route-jsonld-schema" type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": schemaGraph })}</script>`;

    // Build unique head meta block
    const metaBlock = `
    <!-- Route Primary Meta Tags -->
    <title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <meta name="keywords" content="${escapeHtml(seo.keywords)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${seo.canonical}" />

    <!-- Open Graph -->
    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:url" content="${seo.canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${SITE_URL}/og-image.png" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
    <meta name="twitter:image" content="${SITE_URL}/og-image.png" />

    <!-- JSON-LD Structured Data -->
    ${jsonLdHtml}
    `;

    // Generate static body content shell inside <div id="root">
    const bodyContent = generateStaticBody(routePath, seo);

    let prerenderedHtml = baseHtml;

    // Inject unique metadata placeholder
    if (prerenderedHtml.includes('<!-- SEO_HEAD_META_PLACEHOLDER -->')) {
      prerenderedHtml = prerenderedHtml.replace('<!-- SEO_HEAD_META_PLACEHOLDER -->', metaBlock);
    } else {
      prerenderedHtml = prerenderedHtml.replace('</head>', `${metaBlock}\n</head>`);
    }

    // Inject prerendered body into <div id="root"></div>
    prerenderedHtml = prerenderedHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${bodyContent}</div>`
    );

    // Write file to output location
    if (routePath === '/') {
      fs.writeFileSync(path.join(DIST_DIR, 'index.html'), prerenderedHtml, 'utf8');
    } else {
      const pageDir = path.join(DIST_DIR, routePath.replace(/^\//, ''));
      if (!fs.existsSync(pageDir)) {
        fs.mkdirSync(pageDir, { recursive: true });
      }
      fs.writeFileSync(path.join(pageDir, 'index.html'), prerenderedHtml, 'utf8');
    }
  }

  console.log('✅ Pre-rendering complete! Static HTML pages generated in dist/.');
}

function escapeHtml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function generateStaticBody(routePath, seo) {
  let faqHtml = '';
  if (seo.faqs && seo.faqs.length > 0) {
    faqHtml = `
      <section style="margin-top: 3.5rem; margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.8rem; font-weight: 800; text-align: center; color: #0f172a; margin-bottom: 1.5rem;">Frequently Asked Questions</h2>
        <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 850px; margin: 0 auto;">
          ${seo.faqs.map(faq => `
            <div style="background: #ffffff; border-radius: 14px; border: 1px solid #e2e8f0; padding: 1.2rem 1.5rem;">
              <h3 style="font-size: 1.05rem; font-weight: 700; color: #0f172a; margin: 0 0 0.5rem 0;">${escapeHtml(faq.q)}</h3>
              <p style="font-size: 0.95rem; color: #475569; line-height: 1.7; margin: 0;">${escapeHtml(faq.a)}</p>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  return `
    <div class="app-container" style="display: flex; flex-direction: column; min-height: 100vh;">
      <div class="main-content" style="flex: 1;">
        <div style="max-width: 960px; margin: 0 auto; padding: 3rem 1.5rem; color: #1e293b; line-height: 1.7;">
          <header style="text-align: center; margin-bottom: 2.5rem;">
            <h1 style="font-size: 2.6rem; font-weight: 900; color: #0f172a; margin-bottom: 1rem; letter-spacing: -0.02em;">
              ${escapeHtml(seo.h1 || seo.title)}
            </h1>
            <p style="font-size: 1.15rem; color: #64748b; max-width: 750px; margin: 0 auto;">
              ${escapeHtml(seo.description)}
            </p>
          </header>
          
          <div style="background: #ffffff; padding: 2.5rem; border-radius: 24px; border: 1px solid #e2e8f0;">
            <p style="font-size: 1.05rem; color: #334155;">
              Welcome to <strong>Resume & CV Craft</strong>. Create ATS-optimized resumes, test resume scores against hiring algorithms, and access recruiter-approved templates for free.
            </p>
          </div>

          ${faqHtml}

          <footer style="margin-top: 3rem; text-align: center; color: #64748b; font-size: 0.85rem;">
            <p>&copy; 2026 Resume & CV Craft. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  `;
}

prerender().catch(err => {
  console.error('❌ Prerender script error:', err);
  process.exit(1);
});
