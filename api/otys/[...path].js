// Universal Server-Side OTYS Proxy
// Handles authentication securely on the server side so credentials/tokens are never exposed to clients.
const OTYS_KEY = process.env.OTYS_API_KEY || 'gv0MSr8EV3HovrVzLWcCQ0SkkA8PiortyNWZ2/zrih9IfsTZQ8y33Q==';
const OTYS_BASE = process.env.OTYS_API_BASE_URL || 'https://webapi.otys.app/api';
const WEBSITE_ID = process.env.OTYS_WEBSITE_ID || '1';

let cachedToken = null;

async function getServerToken() {
  const BUFFER = 5 * 60 * 1000; // 5 min buffer before 12h expiry
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

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Extract subpath from URL (e.g. /api/otys/vacancies?page=1 -> /vacancies?page=1)
    const subPath = req.url.replace(/^\/api\/otys/, '');
    const targetUrl = `${OTYS_BASE.replace(/\/+$/, '')}${subPath.startsWith('/') ? '' : '/'}${subPath}`;

    // Get server-side cached token (12 hours)
    const token = await getServerToken();

    const headers = new Headers();
    for (const [key, val] of Object.entries(req.headers)) {
      if (['host', 'connection', 'content-length', 'authorization', 'website-id'].includes(key.toLowerCase())) continue;
      if (typeof val === 'string') headers.set(key, val);
      else if (Array.isArray(val)) headers.set(key, val.join(', '));
    }

    // Securely attach auth token & website ID on the server
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('Website-ID', WEBSITE_ID);
    headers.set('Accept', 'application/ld+json, application/json');

    const fetchOpts = {
      method: req.method,
      headers,
    };

    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
      fetchOpts.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, fetchOpts);

    res.status(response.status);
    response.headers.forEach((val, key) => {
      if (!['transfer-encoding', 'content-encoding'].includes(key.toLowerCase())) {
        res.setHeader(key, val);
      }
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    return res.send(buffer);
  } catch (err) {
    console.error('[Serverless Proxy Error]:', err.message);
    return res.status(502).json({ error: 'OTYS Gateway Error', details: err.message });
  }
}
