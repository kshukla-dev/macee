import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const OTYS_KEY = process.env.OTYS_API_KEY || 'gv0MSr8EV3HovrVzLWcCQ0SkkA8PiortyNWZ2/zrih9IfsTZQ8y33Q==';
const OTYS_BASE = process.env.OTYS_API_BASE_URL || 'https://webapi.otys.app/api';
const WEBSITE_ID = process.env.OTYS_WEBSITE_ID || '1';

// Server-side token cache (valid for 12 hours)
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getServerToken(): Promise<string> {
  const BUFFER = 5 * 60 * 1000;
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
    throw new Error(`Local dev proxy auth failed: ${res.status}`);
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

// Vite plugin providing secure server-side authentication proxy
function otysServerAuthPlugin() {
  return {
    name: 'otys-server-auth',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (!req.url || !req.url.startsWith('/api/otys')) return next();

        try {
          const subPath = req.url.replace(/^\/api\/otys/, '');
          const targetUrl = `${OTYS_BASE.replace(/\/+$/, '')}${subPath.startsWith('/') ? '' : '/'}${subPath}`;
          const token = await getServerToken();

          const headers = new Headers();
          for (const [k, v] of Object.entries(req.headers)) {
            if (['host', 'connection', 'content-length', 'authorization', 'website-id'].includes(k.toLowerCase())) continue;
            if (typeof v === 'string') headers.set(k, v);
            else if (Array.isArray(v)) headers.set(k, v.join(', '));
          }

          // Securely inject authentication headers server-to-server
          headers.set('Authorization', `Bearer ${token}`);
          headers.set('Website-ID', WEBSITE_ID);
          headers.set('Accept', 'application/ld+json, application/json');

          const fetchOpts: RequestInit = {
            method: req.method,
            headers,
          };

          if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
            const chunks: Buffer[] = [];
            for await (const chunk of req) chunks.push(chunk);
            if (chunks.length > 0) fetchOpts.body = Buffer.concat(chunks);
          }

          const response = await fetch(targetUrl, fetchOpts);
          res.statusCode = response.status;
          response.headers.forEach((val: string, key: string) => {
            if (!['transfer-encoding', 'content-encoding'].includes(key.toLowerCase())) {
              res.setHeader(key, val);
            }
          });
          const buf = Buffer.from(await response.arrayBuffer());
          res.end(buf);
        } catch (err: any) {
          console.error('[Vite Proxy Auth Error]:', err.message);
          res.statusCode = 502;
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), otysServerAuthPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    envPrefix: ['VITE_', 'OTYS_', 'AUTH_'],
  };
});
