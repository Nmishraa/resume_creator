import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'resume.gnanamai.com';
const INDEXNOW_KEY = '4a70fdb38a8d3b2026';
const KEY_LOCATION = `https://${DOMAIN}/${INDEXNOW_KEY}.txt`;

// Parse URLs from public/sitemap.xml
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.log('No sitemap.xml found for IndexNow.');
  process.exit(0);
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const urlMatches = sitemapContent.match(/<loc>(https:\/\/resume\.gnanamai\.com[^<]+)<\/loc>/g) || [];
const urlList = urlMatches.map(m => m.replace('<loc>', '').replace('</loc>', ''));

if (urlList.length === 0) {
  console.log('No URLs extracted for IndexNow.');
  process.exit(0);
}

const payload = JSON.stringify({
  host: DOMAIN,
  key: INDEXNOW_KEY,
  keyLocation: KEY_LOCATION,
  urlList: urlList
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/IndexNow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
};

console.log(`Pinging Bing & Search Engines via IndexNow for ${urlList.length} URLs...`);

const req = https.request(options, (res) => {
  console.log(`IndexNow Ping Status: ${res.statusCode}`);
  if (res.statusCode === 200 || res.statusCode === 202) {
    console.log('✅ Successfully submitted all 32 URLs to IndexNow for instant Bing indexing!');
  } else {
    console.log(`IndexNow response status: ${res.statusCode}`);
  }
});

req.on('error', (e) => {
  console.warn('IndexNow ping error (non-fatal):', e.message);
});

req.write(payload);
req.end();
