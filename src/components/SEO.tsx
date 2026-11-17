import React, { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  schema?: Record<string, any> | Array<Record<string, any>>;
  lang?: 'EN' | 'NL';
}

/**
 * Standard Google SEO length rules:
 * - Title: 50-60 characters (max 60)
 * - Description: 140-160 characters (max 160)
 */
export function formatStandardTitle(rawTitle: string, maxLen = 60): string {
  const clean = rawTitle.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  // Truncate cleanly before maxLen
  const truncated = clean.slice(0, maxLen - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 30 ? truncated.slice(0, lastSpace) : truncated) + '...';
}

export function formatStandardDescription(rawDesc: string, maxLen = 160): string {
  const clean = rawDesc.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  const truncated = clean.slice(0, maxLen - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 100 ? truncated.slice(0, lastSpace) : truncated) + '...';
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath = '/',
  keywords,
  ogType = 'website',
  ogImage = 'https://macee.com/uploads/people-working-dsk.jpg',
  schema,
  lang = 'EN',
}) => {
  const standardTitle = formatStandardTitle(title);
  const standardDescription = formatStandardDescription(description);

  useEffect(() => {
    // 1. Update Document Title & Language
    document.title = standardTitle;
    document.documentElement.lang = lang === 'NL' ? 'nl' : 'en';

    // Helper to safely set or create meta tag
    const setMetaTag = (attribute: 'name' | 'property', value: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to safely set or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute(rel, rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Base SEO Meta Tags (Clamped to standard Google lengths)
    setMetaTag('name', 'description', standardDescription);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }
    setMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // Canonical URL
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const canonicalUrl = `https://macee.com${cleanPath === '/' ? '' : cleanPath}`;
    setLinkTag('canonical', canonicalUrl);

    // 3. OpenGraph Tags
    setMetaTag('property', 'og:title', standardTitle);
    setMetaTag('property', 'og:description', standardDescription);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'Macee External Workforce Solutions');
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:locale', lang === 'NL' ? 'nl_NL' : 'en_US');
    setMetaTag('property', 'og:locale:alternate', lang === 'NL' ? 'en_US' : 'nl_NL');

    // 4. Twitter / X Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', standardTitle);
    setMetaTag('name', 'twitter:description', standardDescription);
    setMetaTag('name', 'twitter:image', ogImage);

    // 5. Schema.org JSON-LD Dynamic Injection
    const SCRIPT_ID = 'macee-page-schema';
    let scriptEl = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (schema) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = SCRIPT_ID;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schema, null, 2);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    return () => {
      // Optional cleanup on unmount
    };
  }, [standardTitle, standardDescription, canonicalPath, keywords, ogType, ogImage, schema, lang]);

  return null;
};
