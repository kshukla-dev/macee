/**
 * ============================================================================
 * OTYS RECRUITMENT WEB API CLIENT
 * ============================================================================
 * Location: src/lib/api.ts
 *
 * This module provides a clean, fully typed client to interact with the
 * OTYS Recruitment Web API.
 *
 * Core Features:
 * 1. Automatic Bearer Token Management (via auth.ts)
 * 2. 401 Unauthorized Auto-Retry (refreshes token and retries once)
 * 3. Dynamic Query Parameter Builder for Vacancy Filtering
 * 4. Data Adapter: Converts raw OTYS JSON-LD into Macee ProjectAssignmentItem
 * 5. Full Application Flow: Vacancy List, Details, CV Upload, and Application
 */

import { getValidToken, getAuthConfig, clearToken } from './auth';
import { ProjectAssignmentItem, ALL_PROJECTS } from '../pages/ProjectsPage';

// ============================================================================
// 1. API ENDPOINTS REGISTRY
// ============================================================================

export const API_ENDPOINTS = {
  auth: {
    appAuth: '/auth',
  },
  vacancies: {
    list: '/vacancies',
    bySlug: (slug: string) =>
      `/vacancies/slug/${encodeURIComponent(slug)}?includeUnpublishedTextfields=true`,
    details: (id: string | number) =>
      `/vacancies/${encodeURIComponent(String(id))}?includeUnpublishedTextfields=true`,
  },
  files: {
    upload: '/files',
  },
  forms: {
    jobAlert: '/jobalert-form',
    vacancyApplication: (vacancyId: string | number) =>
      `/vacancy_application/${encodeURIComponent(String(vacancyId))}`,
  },
} as const;

// ============================================================================
// 2. QUERY PARAMS BUILDER
// ============================================================================

export interface VacancyFilterParams {
  /** Page number (1-based) */
  page?: number;
  /** Number of items to fetch per page (default: 10) */
  itemsPerPage?: number;
  /** Criteria ID 1 to 18 (e.g. { 15: 1234 } or string) */
  MatchCriteria?: Record<number | string, string | number[] | number> | string;
  matchcriteria?: Record<number | string, string | number[] | number>;
  /** Vacancy Category ID or comma-separated list */
  VacancyCategory?: number | string | number[];
  category?: number | string | number[];
  /** Country code filter: 'nl', 'be', 'de', etc. */
  'geo-country'?: string;
  country?: string;
  /** Radius from geo location in km */
  'geo-radius'?: number | string;
  radius?: number | string;
  /** Postal code / zip code for geo search */
  'geo-zipcode'?: string;
  zipcode?: string;
  /** Free text search across title, description, skills */
  keywords?: string;
  /** Filter by language: e.g. ['nl', 'en'] */
  publishedLanguage?: string[] | string;
  /** Filter by published status (true = active only) */
  published?: boolean;
  /** Include rich unpublished textfields */
  includeUnpublishedTextfields?: boolean;
}

/**
 * Builds the vacancies request URL with proper query parameters for OTYS Web API.
 * Default endpoint: GET /vacancies?page=1&itemsPerPage=10&published=true...
 */
export function buildVacanciesUrl(params: VacancyFilterParams = {}): string {
  const query = new URLSearchParams();

  // 1. Pagination: page (default 1) & itemsPerPage (default 6)
  const page = params.page !== undefined && params.page !== null ? Math.max(1, Number(params.page)) : 1;
  query.set('page', String(page));

  const itemsPerPage = params.itemsPerPage !== undefined && params.itemsPerPage !== null ? Number(params.itemsPerPage) : 6;
  query.set('itemsPerPage', String(itemsPerPage));

  // 2. Published status filter (defaults to true for active vacancies)
  const published = params.published !== undefined ? params.published : true;
  query.set('published', String(published));

  // 3. Include unpublished textfields (defaults to true for full descriptions)
  const includeUnpublishedTextfields =
    params.includeUnpublishedTextfields !== undefined ? params.includeUnpublishedTextfields : true;
  query.set('includeUnpublishedTextfields', String(includeUnpublishedTextfields));

  // 4. Keywords search (Vacancy title, descriptions, external ref, culture, salary, etc.)
  if (params.keywords && String(params.keywords).trim()) {
    query.set('keywords', String(params.keywords).trim());
  }

  // 5. VacancyCategory (single ID or comma-separated list of IDs)
  const category = params.VacancyCategory ?? params.category;
  if (category !== undefined && category !== null && category !== '') {
    const catVal = Array.isArray(category) ? category.join(',') : String(category).trim();
    if (catVal) query.set('VacancyCategory', catVal);
  }

  // 6. MatchCriteria (criteria ID 1 to 18, e.g. ?matchcriteria[1]=xxxx,xxxx)
  const criteriaObj =
    params.matchcriteria ?? (typeof params.MatchCriteria === 'object' ? params.MatchCriteria : undefined);
  if (criteriaObj && typeof criteriaObj === 'object') {
    for (const [critId, val] of Object.entries(criteriaObj)) {
      if (val !== undefined && val !== null && val !== '') {
        const valStr = Array.isArray(val) ? val.join(',') : String(val).trim();
        if (valStr) query.set(`matchcriteria[${critId}]`, valStr);
      }
    }
  } else if (typeof params.MatchCriteria === 'string' && params.MatchCriteria.trim()) {
    const rawParts = params.MatchCriteria.split('&');
    for (const part of rawParts) {
      const [k, v] = part.split('=');
      if (k && v) query.set(k.trim(), v.trim());
    }
  }

  // 7. Geo location filters (geo-country, geo-radius, geo-zipcode)
  const country = params['geo-country'] ?? params.country;
  if (country && String(country).trim()) {
    query.set('geo-country', String(country).trim().toLowerCase());
  }

  const radius = params['geo-radius'] ?? params.radius;
  if (radius !== undefined && radius !== null && radius !== '') {
    query.set('geo-radius', String(radius).trim());
  }

  const zipcode = params['geo-zipcode'] ?? params.zipcode;
  if (zipcode && String(zipcode).trim()) {
    query.set('geo-zipcode', String(zipcode).trim());
  }

  // 8. Published Language (array or comma-separated string)
  if (params.publishedLanguage) {
    if (Array.isArray(params.publishedLanguage)) {
      params.publishedLanguage.forEach((lang) => {
        if (lang && String(lang).trim()) {
          query.append('publishedLanguage[]', String(lang).trim());
        }
      });
    } else if (typeof params.publishedLanguage === 'string' && params.publishedLanguage.trim()) {
      params.publishedLanguage.split(',').forEach((lang) => {
        const trimmed = lang.trim();
        if (trimmed) query.append('publishedLanguage[]', trimmed);
      });
    }
  }

  const queryString = query.toString();
  return queryString ? `${API_ENDPOINTS.vacancies.list}?${queryString}` : API_ENDPOINTS.vacancies.list;
}

// ============================================================================
// 3. HTTP CLIENT & NETWORK LOGIC
// ============================================================================

export interface ApiRequestOptions<T = unknown> extends RequestInit {
  /** Internal flag to avoid infinite 401 retry loops */
  _hasRetried?: boolean;
  /** Fallback data to return if the request fails */
  fallbackData?: T;
}

/**
 * Resolves a relative endpoint (e.g. '/vacancies') to the correct base URL.
 * Automatically handles dev proxy (/api/otys) or production URL.
 */
export function resolveUrl(endpoint: string): string {
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint;
  }
  const { baseUrl } = getAuthConfig();
  let cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // Prevent double '/api/api' if baseUrl already ends with '/api'
  if (baseUrl.endsWith('/api') && cleanEndpoint.startsWith('/api/')) {
    cleanEndpoint = cleanEndpoint.replace(/^\/api/, '');
  }

  return `${baseUrl}${cleanEndpoint}`;
}

/**
 * Low-level authenticated fetch wrapper:
 * 1. Automatically injects Bearer token
 * 2. Injects required Website-ID header
 * 3. On 401 Unauthorized, automatically refreshes token and retries once
 */
export async function authenticatedFetch(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<Response> {
  const { _hasRetried = false, headers, ...restOptions } = options;

  // 1. Resolve absolute URL
  const fullUrl = resolveUrl(endpoint);
  const isProxy = fullUrl.startsWith('/api/otys') || fullUrl.includes('/api/otys');

  // 2. Setup request headers
  const reqHeaders = new Headers(headers);
  if (!reqHeaders.has('Content-Type') && !(restOptions.body instanceof FormData)) {
    reqHeaders.set('Content-Type', 'application/json');
  }
  if (!reqHeaders.has('Accept')) {
    reqHeaders.set('Accept', 'application/ld+json, application/json');
  }

  // 3. Attach Bearer token & Website-ID:
  // When using server proxy (/api/otys), authentication is handled securely on the server side
  // so the auth payload & token remain 100% private and never appear in browser DevTools.
  if (!isProxy) {
    try {
      const token = await getValidToken();
      if (!reqHeaders.has('Authorization')) {
        reqHeaders.set('Authorization', `Bearer ${token}`);
      }
      const { websiteId } = getAuthConfig();
      if (!reqHeaders.has('Website-ID') && websiteId) {
        reqHeaders.set('Website-ID', websiteId);
      }
    } catch (authErr) {
      console.warn('[API Auth] Client token resolution skipped:', authErr);
    }
  }

  // 4. Send HTTP request
  let response: Response;
  try {
    response = await fetch(fullUrl, {
      ...restOptions,
      headers: reqHeaders,
    });
  } catch (networkError: unknown) {
    // Retry once on network dropout
    try {
      await new Promise((r) => setTimeout(r, 600));
      response = await fetch(fullUrl, {
        ...restOptions,
        headers: reqHeaders,
      });
    } catch {
      const msg = networkError instanceof Error ? networkError.message : String(networkError);
      console.error(`[API Network Error] ${fullUrl}:`, msg);
      throw networkError;
    }
  }

  // 5. Handle 401 Unauthorized (Token expired): Retry once
  if (response.status === 401 && !_hasRetried) {
    console.warn('[API Auth] 401 received. Retrying request...');
    if (!isProxy) {
      clearToken();
      try {
        await getValidToken(true);
      } catch (refreshErr) {
        console.error('[API Auth] Token refresh retry failed:', refreshErr);
      }
    }
    return await authenticatedFetch(endpoint, {
      ...options,
      _hasRetried: true,
    });
  }

  return response;
}

/**
 * High-level typed API helper with optional fallback data support.
 */
export async function apiRequest<T = unknown>(
  endpoint: string,
  options?: ApiRequestOptions<T>,
  fallbackData?: T
): Promise<T> {
  const effectiveFallback = fallbackData !== undefined ? fallbackData : options?.fallbackData;

  try {
    const response = await authenticatedFetch(endpoint, options);

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`[Status ${response.status}] ${response.statusText}: ${errText}`);
    }

    if (response.status === 204) {
      return {} as T;
    }

    return (await response.json()) as T;
  } catch (error: unknown) {
    if (effectiveFallback !== undefined) {
      console.warn(`[API Fallback] Request to '${endpoint}' failed. Using fallback data.`);
      return effectiveFallback;
    }
    throw error;
  }
}

// ============================================================================
// 4. DATA ADAPTER & MAPPERS (OTYS -> FRONTEND UI)
// ============================================================================

/**
 * Strips HTML tags and decodes basic HTML entities.
 */
function stripHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Safely sanitizes HTML from OTYS, stripping scripts and unsafe handlers while keeping rich formatting.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');
}

/**
 * Extracts bullet points from HTML unordered lists (<ul><li>...</li></ul>).
 */
function extractBulletPoints(html: string): string[] {
  if (!html) return [];
  const liMatches = html.match(/<li[^>]*>(.*?)<\/li>/gi);
  if (liMatches && liMatches.length > 0) {
    return liMatches
      .map((li) => stripHtml(li))
      .filter((text) => text.length > 3)
      .slice(0, 8);
  }
  const clean = stripHtml(html);
  const sentences = clean.split(/[.\n]/).map((s) => s.trim()).filter((s) => s.length > 15);
  return sentences.slice(0, 6);
}

/**
 * Intelligently separates and structures unstructured or unformatted job text into:
 * 1. shortDescriptionHtml (Start, End, Possible extension, Hours per week)
 * 2. jobDescriptionHtml (intro paragraphs + Key Responsibilities with <ul><li>)
 * 3. requirementsHtml (Required Skills & Experience with <ul><li>)
 */
export function parseRawContentToStructured(rawText: string): {
  shortDescriptionHtml: string;
  jobDescriptionHtml: string;
  requirementsHtml: string;
  cleanSummary: string;
} {
  if (!rawText) {
    return {
      shortDescriptionHtml: '',
      jobDescriptionHtml: '',
      requirementsHtml: '',
      cleanSummary: '',
    };
  }

  let clean = rawText.replace(/&nbsp;/g, ' ').trim();
  let shortDescriptionHtml = '';
  let jobDescriptionHtml = '';
  let requirementsHtml = '';

  // 1. Extract metadata (Start, End, Possible extension, Hours per week)
  const startMatch = clean.match(/Start:\s*([^\s\n\r]+)/i);
  const endMatch = clean.match(/End:\s*([^\s\n\r]+)/i);
  const extMatch = clean.match(/Possible extension:\s*([^\s\n\r]+)/i);
  const hoursMatch = clean.match(/Hours per week:\s*(\d+)/i);

  if (startMatch || endMatch || extMatch || hoursMatch) {
    const lines: string[] = [];
    if (startMatch) lines.push(`Start: ${startMatch[1]}`);
    if (endMatch) lines.push(`End: ${endMatch[1]}`);
    if (extMatch) lines.push(`Possible extension: ${extMatch[1]}`);
    if (hoursMatch) lines.push(`Hours per week: ${hoursMatch[1]}`);
    shortDescriptionHtml = `<p>${lines.join('<br />\n')}</p>`;

    clean = clean
      .replace(/Start:\s*[^\s\n\r]+\s*/i, '')
      .replace(/End:\s*[^\s\n\r]+\s*/i, '')
      .replace(/Possible extension:\s*[^\s\n\r]+\s*/i, '')
      .replace(/Hours per week:\s*\d+\s*/i, '')
      .trim();
  }

  // 2. Check for Requirements section
  let requirementsPart = '';
  if (/Requirements|Required Skills & Experience/i.test(clean)) {
    const reqSplit = clean.split(/Requirements|Required Skills & Experience/i);
    clean = reqSplit[0].trim();
    requirementsPart = reqSplit.slice(1).join(' ').trim();
  }

  // 3. Check for Key Responsibilities inside clean
  let introPart = clean;
  let responsibilitiesPart = '';
  if (/Key Responsibilities:?/i.test(clean)) {
    const respSplit = clean.split(/Key Responsibilities:?/i);
    introPart = respSplit[0].trim();
    responsibilitiesPart = respSplit.slice(1).join(' ').trim();
  }

  // Build Job Description HTML
  const introSentences = introPart.match(/[^.!?]+[.!?]+/g) || (introPart ? [introPart] : []);
  let p1 = '';
  let p2 = '';
  if (introSentences.length > 2) {
    p1 = introSentences.slice(0, 2).join(' ').trim();
    p2 = introSentences.slice(2).join(' ').trim();
  } else {
    p1 = introPart;
  }

  const jobDescParts: string[] = [];
  if (p1) jobDescParts.push(`<p>${p1}</p>`);
  if (p2) jobDescParts.push(`<p>${p2}</p>`);

  if (responsibilitiesPart) {
    jobDescParts.push('<p><strong>Key Responsibilities</strong></p>');
    const respBullets = responsibilitiesPart.match(/[^.!?]+[.!?]+/g) || [responsibilitiesPart];
    const lis = respBullets
      .map((b) => b.trim())
      .filter((b) => b.length > 5)
      .map((b) => `<li>${b}</li>`)
      .join('\n\t');
    if (lis) {
      jobDescParts.push(`<ul>\n\t${lis}\n</ul>`);
    }
  }
  jobDescriptionHtml = jobDescParts.join('\n\n');

  // Build Requirements HTML
  if (requirementsPart) {
    let profilePart = '';
    let reqSkillsText = requirementsPart;
    if (/Profile:/i.test(requirementsPart)) {
      const profSplit = requirementsPart.split(/Profile:/i);
      reqSkillsText = profSplit[0].trim();
      profilePart = `Profile: ${profSplit[1].trim()}`;
    }

    const reqBullets = reqSkillsText.match(/[^.!?]+[.!?]+/g) || [reqSkillsText];
    const lis = reqBullets
      .map((b) => b.trim())
      .filter((b) => b.length > 5)
      .map((b) => `<li>${b}</li>`)
      .join('\n\t');

    const reqParts = ['<p>Required Skills &amp; Experience</p>'];
    if (lis) reqParts.push(`<ul>\n\t${lis}\n</ul>`);
    if (profilePart) reqParts.push(`<p>${profilePart}</p>`);
    requirementsHtml = reqParts.join('\n\n');
  }

  return {
    shortDescriptionHtml,
    jobDescriptionHtml,
    requirementsHtml,
    cleanSummary: p1 || introPart || 'Exciting professional opportunity with Macee external workforce solutions.',
  };
}

/**
 * Maps an individual OTYS Vacancy object to Macee's ProjectAssignmentItem.
 */
export function mapOtysVacancyToProject(otys: any): ProjectAssignmentItem {
  const rawId = otys.id || (otys['@id'] ? otys['@id'].split('/').pop() : '') || Math.floor(Math.random() * 100000);
  const id = String(rawId);
  const referenceId = otys.externalReferenceId || otys.reference || (otys.id ? `OTYS-${otys.id}` : undefined);
  const slug = otys.slug || '';
  const title = String(otys.title || otys.name || otys.jobTitle || 'Assignment Opportunity');

  // 1. Extract rich HTML & text from textfields (Short description, Job description, Requirements)
  let shortDescriptionHtml = '';
  let jobDescriptionHtml = '';
  let requirementsHtml = '';
  let rawJobDescription = '';
  let requirementsText = '';

  if (Array.isArray(otys.textfields)) {
    for (const tf of otys.textfields) {
      const tfName = (tf.name || tf.key || tf.label || '').toLowerCase();
      const tfVal = (tf.value || tf.content || '').trim();
      if (!tfVal) continue;

      if (tfName.includes('short')) {
        shortDescriptionHtml = tfVal;
      } else if (tfName.includes('requirement') || tfName.includes('eisen') || tfName.includes('profiel')) {
        requirementsHtml = tfVal;
        requirementsText += `\n${tfVal}`;
      } else if (tfName.includes('job') || tfName.includes('omschrijving') || tfName.includes('taken') || tfName.includes('descrip')) {
        jobDescriptionHtml = tfVal;
        rawJobDescription = tfVal;
      }
    }
  }

  // Fallback / auto-structure if textfields were omitted or raw unstructured block was provided
  if (!jobDescriptionHtml || !shortDescriptionHtml || !requirementsHtml) {
    const candidateText =
      stripHtml(jobDescriptionHtml || otys.description || otys.longDescription || otys.introText || '') ||
      stripHtml(otys.shortDescription || '');
    if (candidateText && (candidateText.includes('Key Responsibilities') || candidateText.includes('Start:'))) {
      const structured = parseRawContentToStructured(candidateText);
      if (!shortDescriptionHtml && structured.shortDescriptionHtml) {
        shortDescriptionHtml = structured.shortDescriptionHtml;
      }
      if (!jobDescriptionHtml && structured.jobDescriptionHtml) {
        jobDescriptionHtml = structured.jobDescriptionHtml;
      }
      if (!requirementsHtml && structured.requirementsHtml) {
        requirementsHtml = structured.requirementsHtml;
      }
    }
  }

  if (!jobDescriptionHtml) {
    jobDescriptionHtml = otys.description || otys.longDescription || otys.introText || '';
    rawJobDescription = jobDescriptionHtml;
  }
  if (!shortDescriptionHtml && otys.shortDescription) {
    shortDescriptionHtml = otys.shortDescription;
  }
  if (!requirementsHtml && requirementsText) {
    requirementsHtml = requirementsText;
  }

  // Clean description for card display (first 1-2 summary sentences, without bullet lists or headers)
  let cleanDescription = stripHtml(rawJobDescription || shortDescriptionHtml);
  if (cleanDescription.includes('Key Responsibilities')) {
    cleanDescription = cleanDescription.split('Key Responsibilities')[0].trim();
  }
  if (cleanDescription.startsWith('Start:')) {
    cleanDescription = cleanDescription.replace(/^Start:[^\n\r]+(?:Hours per week:\s*\d+)?/i, '').trim();
  }
  if (!cleanDescription) {
    cleanDescription = 'Exciting professional opportunity with Macee external workforce solutions in the Netherlands.';
  }

  let requirements = extractBulletPoints(requirementsText);
  if (requirements.length === 0) {
    requirements = extractBulletPoints(rawJobDescription);
  }
  if (requirements.length === 0) {
    requirements = [
      'Demonstrated expertise and relevant hands-on domain experience',
      'Strong problem-solving skills and autonomous execution capability',
      'Clear compliance with Dutch Wet DBA / WAADI guidelines',
      'Professional communication in English; Dutch proficiency is a plus',
    ];
  }

  // 2. Location
  let location = 'Arnhem / Hybrid';
  if (typeof otys.location === 'string' && otys.location.trim()) {
    location = `${otys.location.trim()} / Hybrid`;
  } else if (otys.city) {
    location = `${otys.city}${otys.country ? ` (${otys.country.toUpperCase()})` : ''} / Hybrid`;
  }

  // 3. Dynamic fields from matchCriteria (Criterion 5 = Contract, 8 = Hours, 1 = Branche, 7 = Salary, etc.)
  let contractType = 'Contracting';
  let branche = 'ICT';
  let category = 'ICT & Cloud';
  let hours = otys.hoursPerWeek ? `${otys.hoursPerWeek} hours` : '36 - 40 hrs';
  let rate = 'Competitive Market Rate';
  let experience = 'Bachelor / 4+ Years';
  const skills: string[] = [];

  if (Array.isArray(otys.matchCriteria)) {
    for (const crit of otys.matchCriteria) {
      const critName = (crit.name || '').toLowerCase();
      const critId = crit.id;
      const options = Array.isArray(crit.options) ? crit.options : [];
      const optionNames = options.map((opt: any) => opt.name || opt.value || '').filter(Boolean);

      // Contract type (Criterion ID 5)
      if (critId === 5 || critName.includes('contract')) {
        if (optionNames.length > 0) contractType = optionNames[0];
      }
      // Hours per week (Criterion ID 8)
      if (critId === 8 || critName.includes('hour') || critName.includes('uren')) {
        if (optionNames.length > 0) hours = optionNames[0];
      }
      // Branche (Criterion ID 1)
      if (critId === 1 || critName.includes('branche')) {
        if (optionNames.length > 0) branche = optionNames[0];
      }
      // Salary / Rate (Criterion ID 7)
      if (critId === 7 || critName.includes('salary') || critName.includes('salaris')) {
        if (optionNames.length > 0) {
          const val = optionNames[0];
          rate = val.includes('€') ? val : `€${val} / hr`;
        }
      }
      // Education level (Criterion ID 10)
      if (critId === 10 || critName.includes('education') || critName.includes('opleiding')) {
        if (optionNames.length > 0) experience = `${optionNames[0]} Level`;
      }
      // Role / Category (Criterion ID 15)
      if (critId === 15 || critName.includes('role')) {
        if (optionNames.length > 0) category = optionNames[0];
      }
      // Skills (Criterion ID 2)
      if (critId === 2 || critName.includes('skill') || critName.includes('ervaring')) {
        optionNames.forEach((s: string) => {
          if (!skills.includes(s)) skills.push(s);
        });
      }
    }
  }

  // 4. Fallback skills inference based on job title
  if (skills.length === 0) {
    if (title.includes('.NET')) skills.push('.NET 8', 'C#', 'Azure AKS', 'Microservices');
    else if (title.includes('Data')) skills.push('Python', 'Spark', 'Kafka', 'Data Lakehouse');
    else if (title.includes('Security') || title.includes('IAM')) skills.push('IAM', 'Zero Trust', 'CyberArk', 'Ping Identity');
    else if (title.includes('Python')) skills.push('Python', 'APIs', 'REST', 'Cloud');
    else if (title.includes('QA') || title.includes('Test')) skills.push('Automated Testing', 'Selenium', 'CI/CD');
    else if (title.includes('Power Platform')) skills.push('Power Platform', 'Power Automate', 'Power Apps');
    else if (title.includes('Network')) skills.push('Routing & Switching', 'BGP', 'Firewalls', 'Cisco');
    else skills.push('Agile / Scrum', 'Enterprise IT', 'Consulting');
  }

  const rawDateStr = otys.datePublished || otys.dateCreated || otys.publishedDate || otys.entryDate || otys.dateLastModified || '';
  const postedDate = rawDateStr
    ? new Date(rawDateStr).toLocaleDateString()
    : 'Active OTYS Assignment';

  return {
    id: `otys-${id}`,
    referenceId,
    slug,
    title,
    category,
    branche,
    location,
    contractType,
    hours,
    rate,
    experience: otys.experienceYears ? `${otys.experienceYears}+ Years` : experience,
    description: cleanDescription,
    shortDescriptionHtml,
    jobDescriptionHtml,
    requirementsHtml,
    requirements,
    skills: skills.slice(0, 5),
    postedDate,
    rawDate: typeof rawDateStr === 'string' ? rawDateStr : '',
    isFeatured: Boolean(otys.featured || otys.isFeatured || otys.highlighted),
  };
}

/**
 * Maps the OTYS vacancy collection response payload into an array of ProjectAssignmentItem.
 */
export function mapOtysCollectionToProjects(data: any): ProjectAssignmentItem[] {
  if (!data) return [];

  // Return directly if already mapped
  if (Array.isArray(data) && data.length > 0 && ('contractType' in data[0] || 'referenceId' in data[0])) {
    return data;
  }

  // OTYS returns the vacancies array in 'member'
  let list: any[] = [];
  if (Array.isArray(data.member)) {
    list = data.member;
  } else if (Array.isArray(data['hydra:member'])) {
    list = data['hydra:member'];
  } else if (Array.isArray(data)) {
    list = data;
  } else if (Array.isArray(data.items)) {
    list = data.items;
  } else if (Array.isArray(data.data)) {
    list = data.data;
  }

  if (list.length === 0) return [];
  return list.map(mapOtysVacancyToProject);
}

// ============================================================================
// 5. PUBLIC API METHODS (FOR PAGES & COMPONENTS)
// ============================================================================

/**
 * Fetches all vacancies from OTYS API and formats them for the Projects page.
 */
export async function getAllJobs(filterParams?: VacancyFilterParams): Promise<ProjectAssignmentItem[]> {
  const endpoint = buildVacanciesUrl(filterParams);

  try {
    const rawData = await apiRequest<any>(endpoint, { method: 'GET' });
    const jobs = mapOtysCollectionToProjects(rawData);
    const sorted = [...jobs].sort((a, b) => {
      const timeA = a.rawDate ? new Date(a.rawDate).getTime() : a.postedDate ? new Date(a.postedDate).getTime() : 0;
      const timeB = b.rawDate ? new Date(b.rawDate).getTime() : b.postedDate ? new Date(b.postedDate).getTime() : 0;
      if (!isNaN(timeA) && !isNaN(timeB) && timeA !== timeB) {
        return timeB - timeA;
      }
      const numA = parseInt(a.id.replace(/\D/g, ''), 10) || 0;
      const numB = parseInt(b.id.replace(/\D/g, ''), 10) || 0;
      return numB - numA;
    });
    return sorted.length > 0 ? sorted : ALL_PROJECTS;
  } catch (error) {
    console.error('Failed to fetch vacancies, using fallback data:', error);
    return ALL_PROJECTS;
  }
}

/**
 * Fetches raw vacancies list from OTYS API.
 */
export async function fetchVacancies(params: VacancyFilterParams = {}): Promise<any[]> {
  const endpoint = buildVacanciesUrl(params);
  const response = await authenticatedFetch(endpoint);
  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`Failed to fetch vacancies (Status ${response.status}): ${errText}`);
  }

  const data = await response.json();
  const rawList = Array.isArray(data.member) ? data.member : Array.isArray(data) ? data : [];
  return rawList;
}

/**
 * Fetches single vacancy details by ID using:
 * GET /vacancies/{id}?includeUnpublishedTextfields=true
 */
export async function fetchVacancyDetails(id: string | number): Promise<any> {
  const cleanId = String(id).replace(/^otys-/, '');
  const endpoint = API_ENDPOINTS.vacancies.details(cleanId);
  const response = await authenticatedFetch(endpoint);
  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`Failed to fetch vacancy details for ${id} (Status ${response.status}): ${errText}`);
  }
  return await response.json();
}

/**
 * Fetches full vacancy details by ID using:
 * GET /vacancies/{id}?includeUnpublishedTextfields=true
 * and maps the rich textfields (Job description, requirements, benefits) to ProjectAssignmentItem.
 */
export async function getJobDetails(id: string | number): Promise<ProjectAssignmentItem> {
  const cleanId = String(id).replace(/^otys-/, '');
  const endpoint = API_ENDPOINTS.vacancies.details(cleanId);
  const rawData = await apiRequest<any>(endpoint, { method: 'GET' });
  return mapOtysVacancyToProject(rawData);
}

export interface UploadCvResult {
  fileId: string;
  id: string;
  owsFileUid?: string | null;
  name?: string;
}

/**
 * Uploads a CV or resume file to OTYS: POST /files
 * Returns the generated OTYS file ID and OWS file UID.
 */
export async function uploadCvFile(file: File): Promise<UploadCvResult> {
  const formData = new FormData();
  formData.append('file', file, file.name);

  const response = await authenticatedFetch(API_ENDPOINTS.files.upload, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`File upload failed (Status ${response.status}): ${errText}`);
  }

  const result = await response.json();
  const fileId = Array.isArray(result) ? result[0]?.id : (result?.id || result?.fileId);
  const owsFileUid = result?.owsFileUid || null;

  if (!fileId && !owsFileUid) {
    throw new Error('OTYS did not return a valid file ID for the uploaded CV.');
  }

  const validId = String(fileId || owsFileUid);
  return {
    fileId: validId,
    id: validId,
    owsFileUid,
    name: file.name,
    toString() {
      return validId;
    },
  } as UploadCvResult;
}

export const uploadOtysFile = uploadCvFile;

/**
 * Structure of a candidate's application submission.
 */
export interface ApplicationSubmissionData {
  name: string;
  email: string;
  phone?: string;
  rate?: string;
  note?: string;
  fileId?: string;
  owsFileUid?: string;
}

/**
 * Submits a candidate job application to OTYS: POST /vacancy_application/{vacancyId}
 * Also binds the uploaded CV directly to the candidate's dossier in OTYS Go!
 */
export async function submitVacancyApplication(
  vacancyId: string | number,
  data: ApplicationSubmissionData | { answers: Record<string, string | string[]>; metaData?: Record<string, unknown>; owsFileUid?: string }
): Promise<{ success: boolean; message: string; dossierId?: string | null }> {
  let payload: Record<string, any>;

  if ('answers' in data) {
    payload = { ...data };
  } else {
    const nameParts = data.name.trim().split(' ');
    const firstName = nameParts[0] || 'Applicant';
    const lastName = nameParts.slice(1).join(' ') || '.';

    const answers: Record<string, any> = {
      q1356387: firstName,
      q1356388: lastName,
      q1356389: data.email,
      q1356392: ['1'],
      'q-666': ['1'],
    };

    if (data.phone) answers.q1356390 = data.phone;
    if (data.fileId) answers.q1356391 = data.fileId;

    payload = {
      firstName,
      lastName,
      name: data.name,
      email: data.email,
      phone: data.phone,
      fileId: data.fileId,
      owsFileUid: data.owsFileUid,
      answers,
      metaData: {
        utmTags: {
          source: 'macee-portal',
          medium: 'website_project_application',
        },
        referer: typeof window !== 'undefined' ? window.location.href : 'https://macee.nl/projects',
      },
    };
  }

  const response = await authenticatedFetch(API_ENDPOINTS.forms.vacancyApplication(vacancyId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ld+json',
      Accept: 'application/ld+json, application/json',
    },
    body: JSON.stringify(payload),
  });

  if (response.status === 409) {
    return {
      success: true,
      message: 'You have already applied for this assignment. The Macee team is already reviewing your profile.',
    };
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    if (errorText.toLowerCase().includes('already') || errorText.toLowerCase().includes('duplicate')) {
      return {
        success: true,
        message: 'You have already submitted an application for this vacancy.',
      };
    }
    throw new Error(`Application failed (Status ${response.status}): ${errorText || response.statusText}`);
  }

  const resJson = await response.json().catch(() => ({}));

  return {
    success: true,
    message: 'Your application and CV have been successfully submitted into OTYS Recruitment System!',
    dossierId: resJson?.dossierId || null,
  };
}
