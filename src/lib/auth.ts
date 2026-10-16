/**
 * ============================================================================
 * OTYS RECRUITMENT AUTHENTICATION SERVICE
 * ============================================================================
 * Location: src/lib/auth.ts
 *
 * This module manages authentication with the OTYS Web API:
 * 1. Generates Bearer tokens via POST /auth with API key
 * 2. Caches tokens in memory (valid up to 12 hours)
 * 3. Handles automatic token renewal (5-minute refresh buffer)
 * 4. Deduplicates simultaneous auth requests (inFlightAuth promise)
 * 5. Circuit-breaker protection against runaway authentication loops
 */

export interface TokenData {
  accessToken: string;
  tokenType?: string;
  expiresAt: number;
}

export interface OtysConfig {
  apiKey: string;
  baseUrl: string;
  websiteId: string;
  authEnabled: boolean;
}

// In-memory token cache & circuit breaker state
let cachedToken: TokenData | null = null;
let inFlightAuth: Promise<string> | null = null;
let consecutiveFailures = 0;
let circuitBreakerTripUntil = 0;

const MAX_FAILURES = 5;
const CIRCUIT_COOLDOWN_MS = 60 * 1000; // 1-minute cooldown if 5 consecutive errors occur

/**
 * Reads OTYS configuration from environment variables (.env), localStorage, or defaults.
 */
export function getOtysConfig(): OtysConfig {
  const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : ({} as Record<string, string>);
  const procEnv = typeof process !== 'undefined' && process.env ? process.env : ({} as Record<string, string>);

  const localKey = typeof window !== 'undefined' ? localStorage.getItem('OTYS_API_KEY') || '' : '';
  const localBaseUrl = typeof window !== 'undefined' ? localStorage.getItem('OTYS_API_BASE_URL') || '' : '';

  // Default API Key
  const DEFAULT_KEY = 'gv0MSr8EV3HovrVzLWcCQ0SkkA8PiortyNWZ2/zrih9IfsTZQ8y33Q==';

  const apiKey =
    localKey ||
    env.VITE_OTYS_API_KEY ||
    env.OTYS_API_KEY ||
    procEnv.OTYS_API_KEY ||
    DEFAULT_KEY;

  // Always use the /api/otys proxy in browser environments (both local Vite dev and Vercel production)
  // to prevent browser CORS errors since webapi.otys.app does not allow third-party client origins.
  const isBrowser = typeof window !== 'undefined';

  let baseUrl =
    localBaseUrl ||
    env.VITE_OTYS_API_BASE_URL ||
    env.OTYS_API_BASE_URL ||
    procEnv.OTYS_API_BASE_URL ||
    'https://webapi.otys.app/api';

  if (isBrowser && (!localBaseUrl || localBaseUrl.includes('webapi.otys.app') || baseUrl.includes('webapi.otys.app'))) {
    baseUrl = '/api/otys';
  }

  // Website-ID: Defaults to '1' as requested
  const websiteId = '1';

  const authEnabled =
    (env.VITE_AUTH_API_ENABLED ?? env.AUTH_API_ENABLED ?? procEnv.AUTH_API_ENABLED ?? 'true') !== 'false';

  return {
    apiKey: apiKey.trim(),
    baseUrl: baseUrl.trim(),
    websiteId: websiteId.trim(),
    authEnabled,
  };
}

/**
 * Checks if a valid OTYS API key is present.
 */
export function isOtysConfigured(): boolean {
  const { apiKey } = getOtysConfig();
  return Boolean(apiKey && apiKey.length > 5 && apiKey !== 'your_otys_api_key_here');
}

const TOKEN_STORAGE_KEY = '__macee_auth_session__';

function getStoredToken(): TokenData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.accessToken === 'string' && typeof parsed.expiresAt === 'number') {
      return parsed;
    }
  } catch {
    // Ignore JSON parse errors
  }
  return null;
}

function setStoredToken(tokenData: TokenData | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (tokenData) {
      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokenData));
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Allows dynamic configuration of credentials directly from settings modal.
 */
export function saveOtysCredentials(apiKey: string, websiteId?: string, baseUrl?: string): void {
  if (typeof window === 'undefined') return;
  if (apiKey) localStorage.setItem('OTYS_API_KEY', apiKey.trim());
  if (websiteId) localStorage.setItem('OTYS_WEBSITE_ID', websiteId.trim());
  if (baseUrl) localStorage.setItem('OTYS_API_BASE_URL', baseUrl.trim());
  clearTokenCache();
}

/**
 * Clears the active token cache and resets failure counters.
 */
export function clearTokenCache(): void {
  cachedToken = null;
  setStoredToken(null);
  inFlightAuth = null;
  consecutiveFailures = 0;
  circuitBreakerTripUntil = 0;
}

/**
 * Requests a fresh Bearer token from OTYS:
 * POST /auth { key: "your_api_key" }
 */
export async function requestNewToken(): Promise<string> {
  const { apiKey, baseUrl, authEnabled } = getOtysConfig();

  if (!authEnabled) {
    throw new Error('OTYS Auth is disabled in configuration.');
  }

  if (!apiKey || apiKey === 'your_otys_api_key_here') {
    throw new Error('OTYS_API_KEY is not configured. Please set your key in .env or settings.');
  }

  // Circuit breaker: Protect server from repeated failures
  if (Date.now() < circuitBreakerTripUntil) {
    const remainingSecs = Math.ceil((circuitBreakerTripUntil - Date.now()) / 1000);
    throw new Error(`OTYS authentication paused due to repeated errors. Retry in ${remainingSecs}s.`);
  }

  const authUrl = baseUrl.endsWith('/') ? `${baseUrl}auth` : `${baseUrl}/auth`;

  try {
    const res = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, application/ld+json',
      },
      body: JSON.stringify({ key: apiKey }),
      cache: 'no-store',
    });

    if (!res.ok) {
      consecutiveFailures++;
      if (consecutiveFailures >= MAX_FAILURES) {
        circuitBreakerTripUntil = Date.now() + CIRCUIT_COOLDOWN_MS;
      }
      const errText = await res.text().catch(() => '');
      throw new Error(`OTYS Auth failed (Status ${res.status}): ${errText || res.statusText}`);
    }

    const data = await res.json();
    const token = data.access_token || data.accessToken || data.token;

    if (!token) {
      throw new Error('OTYS Auth response did not contain an access_token.');
    }

    // Default to ~12 hours validity if not provided by backend
    const expiresInSeconds = Number(data.expires_in) || Number(data.expiresIn) || 12 * 3600;
    const expiresInMs = expiresInSeconds * 1000;

    cachedToken = {
      accessToken: token,
      tokenType: data.token_type || data.tokenType || 'Bearer',
      expiresAt: Date.now() + expiresInMs,
    };

    // Persist in localStorage so it is not requested again across page reloads/tabs for 12 hours
    setStoredToken(cachedToken);

    consecutiveFailures = 0;
    circuitBreakerTripUntil = 0;
    return token;
  } catch (err: unknown) {
    consecutiveFailures++;
    console.error('OTYS Auth request error:', err);
    if (consecutiveFailures >= MAX_FAILURES) {
      circuitBreakerTripUntil = Date.now() + CIRCUIT_COOLDOWN_MS;
    }
    throw err;
  }
}

/**
 * Returns a valid cached Bearer token, or requests a fresh one if expired.
 * Checks memory and localStorage first before making any network request.
 * (Refreshes proactively 5 minutes before the 12-hour expiration).
 */
export async function getValidToken(forceRefresh = false): Promise<string> {
  const REFRESH_BUFFER = 5 * 60 * 1000; // 5 minutes before expiry

  // 1. Check in-memory token
  if (!forceRefresh && cachedToken && Date.now() < cachedToken.expiresAt - REFRESH_BUFFER) {
    return cachedToken.accessToken;
  }

  // 2. Check persistent localStorage token (persists across refreshes for 12 hours)
  if (!forceRefresh) {
    const stored = getStoredToken();
    if (stored && Date.now() < stored.expiresAt - REFRESH_BUFFER) {
      cachedToken = stored;
      return stored.accessToken;
    }
  }

  // 3. Deduplicate concurrent token requests: reuse pending promise
  if (inFlightAuth && !forceRefresh) {
    return inFlightAuth;
  }

  inFlightAuth = requestNewToken().finally(() => {
    inFlightAuth = null;
  });

  return inFlightAuth;
}

// Aliases for compatibility
export const getAuthConfig = getOtysConfig;
export const clearToken = clearTokenCache;
