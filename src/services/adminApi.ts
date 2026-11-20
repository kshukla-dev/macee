/**
 * Admin Portal Live API Client with Automatic Fallback
 * Connects to Vercel production or local dev seamlessly.
 */

export const ADMIN_API_BASE =
  import.meta.env.VITE_ADMIN_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3001'
    : 'https://macee-admin-portal.vercel.app');

export const ADMIN_API = {
  team: `${ADMIN_API_BASE}/api/public/team`,
  faqs: `${ADMIN_API_BASE}/api/public/faqs`,
  clients: `${ADMIN_API_BASE}/api/public/clients`,
  blogs: `${ADMIN_API_BASE}/api/public/blogs`,
  contact: `${ADMIN_API_BASE}/api/public/contact`,
};

/**
 * Fetch live data with timeout and automatic fallback guarantee.
 * Never throws — always returns either live data or the fallback defaultValue.
 */
export async function fetchWithFallback<T>(url: string, defaultValue: T): Promise<T> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) return defaultValue;
    const data = await res.json();
    return data || defaultValue;
  } catch (error) {
    // Graceful fallback to static data
    return defaultValue;
  }
}
