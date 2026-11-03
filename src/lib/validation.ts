/**
 * Form Validation Utilities for Macee Workforce Solutions
 * Supports bilingual error feedback (NL / EN) and rigorous sanity checks.
 */

export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

/**
 * Validates standard email address with RFC 5322 compliance and required TLD
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length < 5 || trimmed.length > 254) return false;
  return EMAIL_REGEX.test(trimmed);
}

/**
 * Validates international and Dutch phone numbers (+31, 06, local formats)
 * Allows optional +, spaces, dashes, dots, and brackets with 8 to 16 digits total.
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  const trimmed = phone.trim();
  if (!trimmed) return false;
  const cleanDigits = trimmed.replace(/[\s\-\(\)\.]/g, '');
  return /^\+?[0-9]{8,16}$/.test(cleanDigits);
}

/**
 * Validates full name or first/last name with min 2 chars
 */
export function isValidName(name: string, minLength = 2): boolean {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  return trimmed.length >= minLength && /[a-zA-Z\u00C0-\u024F]/.test(trimmed);
}

/**
 * Validates non-empty text (message / note / company)
 */
export function isValidText(text: string, minLength = 5): boolean {
  if (!text || typeof text !== 'string') return false;
  return text.trim().length >= minLength;
}

export const MAX_CV_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
export const ALLOWED_CV_EXTENSIONS = ['.pdf', '.doc', '.docx'];

/**
 * Validates candidate CV file upload
 */
export function validateCvFile(
  file: File | null,
  lang: 'EN' | 'NL' = 'EN'
): { valid: boolean; error?: string } {
  if (!file) return { valid: true };

  if (file.size > MAX_CV_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error:
        lang === 'NL'
          ? 'Het bestand is te groot (maximaal 10 MB toegestaan).'
          : 'File size exceeds maximum limit of 10 MB.',
    };
  }

  const name = file.name || '';
  const ext = ('.' + (name.split('.').pop() || '')).toLowerCase();
  if (!ALLOWED_CV_EXTENSIONS.includes(ext)) {
    return {
      valid: false,
      error:
        lang === 'NL'
          ? 'Ongeldig bestandsformaat. Alleen .pdf, .doc en .docx zijn toegestaan.'
          : 'Invalid file format. Only .pdf, .doc, and .docx files are permitted.',
    };
  }

  return { valid: true };
}

/**
 * Standard validation error messages dictionary
 */
export const VALIDATION_MESSAGES = {
  EN: {
    firstNameRequired: 'Please enter your first name (at least 2 letters).',
    lastNameRequired: 'Please enter your last name (at least 2 letters).',
    fullNameRequired: 'Please enter your full name (at least 2 letters).',
    companyRequired: 'Please enter your company or organisation name.',
    emailRequired: 'Please provide an email address.',
    emailInvalid: 'Please enter a valid email address (e.g. name@company.com).',
    phoneInvalid: 'Please enter a valid phone number (minimum 8 digits, e.g. +31 6 12345678).',
    messageRequired: 'Please enter your message (at least 10 characters).',
    cvRequired: 'Please upload your CV (.pdf, .doc, or .docx).',
    privacyRequired: 'Please agree to the privacy policy to submit.',
  },
  NL: {
    firstNameRequired: 'Vul alstublieft uw voornaam in (minimaal 2 letters).',
    lastNameRequired: 'Vul alstublieft uw achternaam in (minimaal 2 letters).',
    fullNameRequired: 'Vul alstublieft uw volledige naam in (minimaal 2 letters).',
    companyRequired: 'Vul alstublieft uw bedrijfs- of organisatienaam in.',
    emailRequired: 'Vul alstublieft een e-mailadres in.',
    emailInvalid: 'Vul een geldig e-mailadres in (bijv. naam@bedrijf.nl).',
    phoneInvalid: 'Vul een geldig telefoonnummer in (minimaal 8 cijfers, bijv. +31 6 12345678).',
    messageRequired: 'Vul uw toelichting of vraag in (minimaal 10 tekens).',
    cvRequired: 'Upload alstublieft uw CV (.pdf, .doc of .docx).',
    privacyRequired: 'U dient akkoord te gaan met de privacyvoorwaarden.',
  },
};

