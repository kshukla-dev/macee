import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleOtysProxy } from './server/otysProxy.js';
import { handleOtysWebhook } from './server/otysWebhook.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Support raw body for proxying & webhook JSON parsing
app.use(express.raw({ type: '*/*', limit: '10mb' }));

// 1. Inbound OTYS Webhook endpoints (Universal receiver for any URL/path)
app.all(
  ['/api/otys/webhook', '/api/otys/webhook/*', '/api/webhook', '/api/webhook/*', '/webhook', '/webhook/*'],
  (req, res) => {
    handleOtysWebhook(req, res);
  }
);

// 2. Universal Authenticated OTYS Proxy endpoint (/api/otys/*)
app.all('/api/otys/*', (req, res) => {
  const subPath = req.originalUrl.replace(/^\/api\/otys/, '') || '/';
  handleOtysProxy(req, res, subPath);
});

// 3. Serve static production assets
app.use(express.static(path.join(__dirname, 'dist')));

// 4. SPA Fallback for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Macee Application Server running on http://0.0.0.0:${PORT}`);
  console.log(`🔗 OTYS API Proxy active at http://0.0.0.0:${PORT}/api/otys`);
  console.log(`⚡ OTYS Webhook endpoint active at http://0.0.0.0:${PORT}/api/otys/webhook`);
});
