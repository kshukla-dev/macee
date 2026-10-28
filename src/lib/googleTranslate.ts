/**
 * Google Translate Automatic Translation Helper
 * Supports 2 clean languages: EN (English) and NL (Dutch)
 */

export interface SimpleLanguage {
  code: string;
  label: string;
}

export const LANGUAGES: SimpleLanguage[] = [
  { code: 'en', label: 'EN' },
  { code: 'nl', label: 'NL' },
];

/**
 * Gets the current active language code ('en' or 'nl')
 */
export function getCurrentGoogleLang(): string {
  if (typeof document === 'undefined') return 'en';

  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (match && match[1]) {
    const parts = decodeURIComponent(match[1]).split('/');
    const lang = parts[parts.length - 1];
    if (lang && (lang === 'nl' || lang === 'en')) {
      return lang;
    }
  }

  const stored = localStorage.getItem('macee_auto_lang');
  return stored === 'nl' ? 'nl' : 'en';
}

/**
 * Translates the entire page dynamically into 'en' or 'nl'
 */
export function changePageLanguage(langCode: string): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const code = (langCode || 'en').toLowerCase() === 'nl' ? 'nl' : 'en';
  localStorage.setItem('macee_auto_lang', code);

  const domain = window.location.hostname;
  const cookieValue = `/en/${code}`;
  const maxAge = 60 * 60 * 24 * 365;

  // Set googtrans cookie
  document.cookie = `googtrans=${cookieValue}; path=/; max-age=${maxAge};`;
  document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain}; max-age=${maxAge};`;
  if (domain.includes('.')) {
    document.cookie = `googtrans=${cookieValue}; path=/; domain=.${domain}; max-age=${maxAge};`;
  }

  // Trigger Google Translate select element
  const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
  if (select) {
    select.value = code;
    select.dispatchEvent(new Event('change', { bubbles: true }));
  } else {
    window.location.reload();
  }
}
