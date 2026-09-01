import { SITE_URL, SEO_ROUTES } from '../data/sitemapData';

export const INDEXNOW_KEY = '5f4e3d2c1b0a9876543210abcdef';

/**
 * Submits changed URLs to Bing / IndexNow API endpoint
 * https://www.bing.com/indexnow
 */
export async function submitToIndexNow(urlList?: string[]): Promise<boolean> {
  const urlsToSubmit = urlList || SEO_ROUTES.map(r => r.canonical);
  const host = new URL(SITE_URL).hostname;

  const payload = {
    host: host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urlsToSubmit
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    return response.ok || response.status === 202;
  } catch {
    // Graceful fallback in browser / offline mode
    return false;
  }
}
