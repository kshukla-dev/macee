import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const OTYS_TARGET = process.env.OTYS_API_BASE_URL || 'https://webapi.otys.app/api';

// Support raw body for proxying
app.use(express.raw({ type: '*/*', limit: '10mb' }));

// 1. Universal OTYS Proxy endpoint (/api/otys/*)
app.all('/api/otys/*', async (req, res) => {
  try {
    const subPath = req.originalUrl.replace(/^\/api\/otys/, '');
    const targetUrl = `${OTYS_TARGET.replace(/\/+$/, '')}${subPath.startsWith('/') ? '' : '/'}${subPath}`;

    const headers = new Headers();
    for (const [key, val] of Object.entries(req.headers)) {
      if (['host', 'connection', 'content-length'].includes(key.toLowerCase())) continue;
      if (typeof val === 'string') {
        headers.set(key, val);
      } else if (Array.isArray(val)) {
        headers.set(key, val.join(', '));
      }
    }

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
  console.log(`🔗 OTYS API Proxy active at http://0.0.0.0:${PORT}/api/otys`);
});
