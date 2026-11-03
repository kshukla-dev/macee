/**
 * Universal OTYS Inbound Webhook Handler
 * Works on ANY domain / host / IP (e.g. macee.com, www.macee.com, localhost, staging)
 * Accepts any path variant:
 * - /api/otys/webhook
 * - /api/webhook
 * - /webhook
 * - /otys/webhook
 */

const VALID_OTYS_EVENTS = new Set([
  'vacancyNew',
  'vacancyUpdate',
  'vacancyDelete',
  'userUpdate',
  'matchCriteriaUpdate',
  'formUpdate',
  'formDelete',
]);

// Rolling memory log of last 50 webhook events for diagnostics
const recentWebhookLogs = [];
const MAX_LOG_SIZE = 50;

/**
 * In-memory cache invalidation timestamp
 * Whenever OTYS triggers a vacancy webhook, this timestamp updates so any connected clients know to refresh.
 */
let lastCacheInvalidationTime = Date.now();

export function getLastCacheInvalidationTime() {
  return lastCacheInvalidationTime;
}

export function getRecentWebhookLogs() {
  return [...recentWebhookLogs];
}

/**
 * Universal OTYS Webhook Handler
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
export async function handleOtysWebhook(req, res) {
  // 1. Enable Global CORS for any domain/caller
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Website-ID');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Support GET / HEAD for health-checks on any URL (e.g. uptime monitors, OTYS webhook verification)
  if (req.method === 'GET' || req.method === 'HEAD') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify(
        {
          status: 'online',
          service: 'Macee OTYS Webhook Gateway',
          host: req.headers?.host || 'unknown',
          url: req.url || '/api/otys/webhook',
          supportedEvents: Array.from(VALID_OTYS_EVENTS),
          totalEventsProcessed: recentWebhookLogs.length,
          lastInvalidation: new Date(lastCacheInvalidationTime).toISOString(),
          recentEvents: recentWebhookLogs.slice(-5),
        },
        null,
        2
      )
    );
    return;
  }

  // OTYS Webhooks send POST requests
  try {
    // 2. Read raw payload flexibly
    let rawBody = '';
    if (Buffer.isBuffer(req.body)) {
      rawBody = req.body.toString('utf-8');
    } else if (typeof req.body === 'string') {
      rawBody = req.body;
    } else if (typeof req.body === 'object' && req.body !== null) {
      rawBody = JSON.stringify(req.body);
    } else {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      rawBody = Buffer.concat(chunks).toString('utf-8');
    }

    // 3. Parse JSON or URLSearchParams payload
    let payload = {};
    if (rawBody.trim()) {
      try {
        payload = JSON.parse(rawBody);
      } catch {
        // Fallback: parse as URL encoded if not JSON
        try {
          const params = new URLSearchParams(rawBody);
          payload = Object.fromEntries(params.entries());
        } catch {
          payload = {};
        }
      }
    }

    // Also check query parameters as fallback
    if (req.url && req.url.includes('?')) {
      try {
        const queryPart = req.url.split('?')[1] || '';
        const qParams = new URLSearchParams(queryPart);
        for (const [k, v] of qParams.entries()) {
          if (!payload[k]) payload[k] = v;
        }
      } catch {
        // Ignore query parse error
      }
    }

    // 4. Extract event and identifier flexibly
    const eventName = payload.eventName || payload.event || payload.type || 'vacancyUpdate';
    const identifier = String(
      payload.identifier || payload.id || payload.vacancyId || payload.userId || 'all'
    );

    lastCacheInvalidationTime = Date.now();

    const logEntry = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      receivedAt: new Date().toISOString(),
      host: req.headers?.host || 'unknown',
      url: req.url,
      eventName,
      identifier,
      ip: req.socket?.remoteAddress || req.headers?.['x-forwarded-for'] || 'unknown',
    };

    recentWebhookLogs.push(logEntry);
    if (recentWebhookLogs.length > MAX_LOG_SIZE) {
      recentWebhookLogs.shift();
    }

    console.log(
      `⚡ [OTYS Webhook Universal] Received event "${eventName}" for ID "${identifier}" on host "${logEntry.host}"`
    );

    // 5. Invalidate caches on vacancy updates
    if (eventName.toLowerCase().includes('vacancy')) {
      console.log(`🔄 [OTYS Webhook] Invalidate vacancy cache for identifier: ${identifier}`);
    }

    // 6. Always return 200 OK so OTYS marks the webhook delivery as 100% successful
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        success: true,
        status: 'processed',
        host: logEntry.host,
        eventName,
        identifier,
        receivedAt: logEntry.receivedAt,
      })
    );
  } catch (err) {
    console.error('❌ [OTYS Webhook Error]:', err.message);
    if (!res.headersSent) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          success: true,
          status: 'acknowledged_with_warning',
          warning: err.message,
        })
      );
    }
  }
}

