import 'dotenv/config';

let cachedToken = null;
let tokenExpiresAt = 0;
let inFlightAuth = null;

const DEFAULT_KEY = 'gv0MSr8EV3HovrVzLWcCQ0SkkA8PiortyNWZ2/zrih9IfsTZQ8y33Q==';

/**
 * Retrieves a valid OTYS Bearer token on the server.
 * Automatically caches token in memory and refreshes before expiration.
 */
export async function getOtysServerToken(forceRefresh = false) {
  const REFRESH_BUFFER = 5 * 60 * 1000; // 5 min buffer

  if (!forceRefresh && cachedToken && Date.now() < tokenExpiresAt - REFRESH_BUFFER) {
    return cachedToken;
  }

  if (inFlightAuth && !forceRefresh) {
    return inFlightAuth;
  }

  inFlightAuth = (async () => {
    const apiKey = process.env.OTYS_API_KEY || DEFAULT_KEY;
    const baseUrl = process.env.OTYS_API_BASE_URL || 'https://webapi.otys.app/api';
    const authUrl = `${baseUrl.replace(/\/+$/, '')}/auth`;

    const res = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, application/ld+json',
      },
      body: JSON.stringify({ key: apiKey }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(`OTYS server auth failed (${res.status}): ${errText}`);
    }

    const data = await res.json();
    const token = data.access_token || data.accessToken || data.token;
    if (!token) {
      throw new Error('OTYS auth response did not contain an access token.');
    }

    const expiresInSeconds = Number(data.expires_in) || Number(data.expiresIn) || 12 * 3600;
    cachedToken = token;
    tokenExpiresAt = Date.now() + expiresInSeconds * 1000;
    return cachedToken;
  })().finally(() => {
    inFlightAuth = null;
  });

  return inFlightAuth;
}

export function clearServerTokenCache() {
  cachedToken = null;
  tokenExpiresAt = 0;
  inFlightAuth = null;
}

/**
 * Universal server proxy handler for OTYS API requests.
 * Automatically injects Bearer token & Website-ID headers on the server side,
 * keeping the secret API key and authentication payload completely private from browser DevTools.
 */
export async function handleOtysProxy(req, res, subPath = '') {
  try {
    let token = await getOtysServerToken();
    const baseUrl = process.env.OTYS_API_BASE_URL || 'https://webapi.otys.app/api';
    const cleanSubPath = subPath.startsWith('/') ? subPath : `/${subPath}`;
    const targetUrl = `${baseUrl.replace(/\/+$/, '')}${cleanSubPath}`;

    // Read incoming body chunks if not already read by express
    let bodyBuffer = null;
    if (Buffer.isBuffer(req.body) && req.body.length > 0) {
      bodyBuffer = req.body;
    } else if (typeof req.body === 'string' && req.body.length > 0) {
      bodyBuffer = Buffer.from(req.body);
    } else if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      if (chunks.length > 0) {
        bodyBuffer = Buffer.concat(chunks);
      }
    }

    // Build headers for upstream OTYS API
    const headers = new Headers();
    for (const [k, v] of Object.entries(req.headers || {})) {
      if (['host', 'connection', 'content-length', 'authorization'].includes(k.toLowerCase())) continue;
      if (typeof v === 'string') headers.set(k, v);
      else if (Array.isArray(v)) headers.set(k, v.join(', '));
    }
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('Website-ID', '1');
    if (!headers.has('Accept')) {
      headers.set('Accept', 'application/ld+json, application/json');
    }

    const fetchOptions = {
      method: req.method,
      headers,
    };
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && bodyBuffer) {
      fetchOptions.body = bodyBuffer;
    }

    let upstreamRes = await fetch(targetUrl, fetchOptions);

    // If 401 Unauthorized received, refresh token on server and retry once
    if (upstreamRes.status === 401) {
      token = await getOtysServerToken(true);
      headers.set('Authorization', `Bearer ${token}`);
      upstreamRes = await fetch(targetUrl, fetchOptions);
    }

    res.writeHead(upstreamRes.status, {
      'Content-Type': upstreamRes.headers.get('content-type') || 'application/json',
    });
    const responseArrayBuffer = await upstreamRes.arrayBuffer();
    res.end(Buffer.from(responseArrayBuffer));
  } catch (err) {
    console.error('[OTYS Server Proxy Error]:', err.message);
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'OTYS Gateway Proxy Error', details: err.message }));
    }
  }
}
