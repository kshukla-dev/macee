import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const OTYS_KEY = process.env.OTYS_API_KEY || 'gv0MSr8EV3HovrVzLWcCQ0SkkA8PiortyNWZ2/zrih9IfsTZQ8y33Q==';
const OTYS_BASE = process.env.OTYS_API_BASE_URL || 'https://webapi.otys.app/api';
const WEBSITE_ID = process.env.OTYS_WEBSITE_ID || '1';

// Server-side token cache (12 hours)
let cachedToken = null;

async function getServerToken() {
  const BUFFER = 5 * 60 * 1000; // 5 min buffer before expiry
  if (cachedToken && Date.now() < cachedToken.expiresAt - BUFFER) {
    return cachedToken.token;
  }

  const res = await fetch(`${OTYS_BASE.replace(/\/+$/, '')}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, application/ld+json',
    },
    body: JSON.stringify({ key: OTYS_KEY }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Server authentication failed (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const token = data.access_token || data.token;
  const expiresIn = (Number(data.expires_in) || 12 * 3600) * 1000;

  cachedToken = {
    token,
    expiresAt: Date.now() + expiresIn,
  };

  return token;
}

// Support raw body for proxying
app.use(express.raw({ type: '*/*', limit: '10mb' }));

// 1. Universal OTYS Proxy endpoint (/api/otys/*)
app.all('/api/otys/*', async (req, res) => {
  try {
    const subPath = req.originalUrl.replace(/^\/api\/otys/, '');
    const targetUrl = `${OTYS_BASE.replace(/\/+$/, '')}${subPath.startsWith('/') ? '' : '/'}${subPath}`;

    // Get server-side token
    const token = await getServerToken();

    const headers = new Headers();
    for (const [key, val] of Object.entries(req.headers)) {
      if (['host', 'connection', 'content-length', 'authorization', 'website-id'].includes(key.toLowerCase())) continue;
      if (typeof val === 'string') {
        headers.set(key, val);
      } else if (Array.isArray(val)) {
        headers.set(key, val.join(', '));
      }
    }

    // Securely attach auth token & website ID on the server
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('Website-ID', WEBSITE_ID);
    headers.set('Accept', 'application/ld+json, application/json');

    const fetchOptions = {
      method: req.method,
      headers,
    };

    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body && req.body.length > 0) {
      fetchOptions.body = req.body;
    }

    const response = await fetch(targetUrl, fetchOptions);

    res.status(response.status);
    response.headers.forEach((val, key) => {
      if (!['transfer-encoding', 'content-encoding'].includes(key.toLowerCase())) {
        res.setHeader(key, val);
      }
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    res.send(buffer);
  } catch (err) {
    console.error('[OTYS Proxy Error]:', err.message);
    res.status(502).json({ error: 'OTYS Gateway Proxy Error', details: err.message });
  }
});

// 2. Serve static production assets
app.use(express.static(path.join(__dirname, 'dist')));

// 3. SPA Fallback for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Macee Application Server running on http://0.0.0.0:${PORT}`);
});
