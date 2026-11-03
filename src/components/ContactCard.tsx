import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  isValidEmail,
  isValidPhone,
  isValidName,
  isValidText,
  VALIDATION_MESSAGES,
} from '../lib/validation';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  remark: string;
}

export interface ContactCardProps {
  /** Heading title displayed on the card */
  title?: string;
  /** Sub-badge text above the title */
  badge?: string;
  /** Explanatory description below the title */
  subtitle?: string;
  /** Extra CSS classes applied to the root card container */
  className?: string;
  /** Callback fired upon successful form submission */
  onSuccess?: (data: ContactFormData) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  title,
  badge,
  subtitle,
  className = '',
  onSuccess,
}) => {
  const { lang } = useLanguage();
  const msgs = VALIDATION_MESSAGES[lang] || VALIDATION_MESSAGES.EN;

  const effectiveTitle = title || (lang === 'NL' ? 'Neem contact met ons op' : 'Get in Touch with Us');
  const effectiveBadge = badge || (lang === 'NL' ? 'Vrijblijvend Contact' : 'Reach Out To Macee');
  const effectiveSubtitle =
    subtitle ||
    (lang === 'NL'
      ? 'Heeft u vragen over flexibele inhuur, contractbeheer of compliance? Stuur ons een bericht en onze specialisten reageren binnen 24 uur.'
      : 'Have a question about flexible staffing, contract administration, or compliance? Send us a message and our team will get back to you promptly.');

  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    remark: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateField = (field: keyof ContactFormData, value: string): string => {
    switch (field) {
      case 'firstName':
        if (!value.trim()) return msgs.firstNameRequired;
        if (!isValidName(value)) return msgs.firstNameRequired;
        return '';
      case 'lastName':
        if (value.trim() && !isValidName(value)) return msgs.lastNameRequired;
        return '';
      case 'email':
        if (!value.trim()) return msgs.emailRequired;
        if (!isValidEmail(value)) return msgs.emailInvalid;
        return '';
      case 'phone':
        if (value.trim() && !isValidPhone(value)) return msgs.phoneInvalid;
        return '';
      case 'remark':
        if (!value.trim()) return msgs.messageRequired;
        if (!isValidText(value, 8)) return msgs.messageRequired;
        return '';
      default:
        return '';
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleBlur = (field: keyof ContactFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {
      firstName: validateField('firstName', formData.firstName),
      lastName: validateField('lastName', formData.lastName),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      remark: validateField('remark', formData.remark),
    };

    // Filter non-empty errors
    const hasErrors = Object.values(newErrors).some((err) => Boolean(err));
    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      remark: true,
    });

    if (hasErrors) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      if (onSuccess) {
        onSuccess(formData);
      }
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ firstName: '', lastName: '', phone: '', email: '', remark: '' });
    setErrors({});
    setTouched({});
  };

  return (
    <div
      className={`relative w-full bg-gradient-to-br from-[#111827]/5 via-white to-[#E30613]/5 rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 lg:p-12 shadow-xl border border-gray-100/80 overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Decorative gradient corner glows */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#E30613]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#111827]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Area */}
      <div className="relative text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        {effectiveBadge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E30613]/10 text-[#E30613] text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-[#E30613]" />
            <span>{effectiveBadge}</span>
          </div>
        )}

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[#111827] tracking-tight">
          {effectiveTitle}
        </h2>
        {effectiveSubtitle && (
          <p className="mt-2.5 text-sm sm:text-base text-[#54595F] leading-relaxed">
            {effectiveSubtitle}
          </p>
        )}
      </div>

      {submitted ? (
        /* Submitted Success State */
        <div className="relative bg-white rounded-2xl p-8 sm:p-12 border border-emerald-100 shadow-md text-center max-w-xl mx-auto animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50/50">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h3 className="text-2xl font-bold font-display text-[#111827] mb-2">
            {lang === 'NL' ? 'Bericht succesvol verzonden!' : 'Message Sent Successfully!'}
          </h3>
          <p className="text-sm text-[#54595F] leading-relaxed max-w-md mx-auto mb-6">
            {lang === 'NL'
              ? 'Bedankt voor uw bericht aan Macee BV. Onze specialisten nemen binnen 1 werkdag contact met u op via '
              : 'Thank you for reaching out to Macee BV. Our team will review your inquiry and contact you at '}
            <span className="font-semibold text-[#111827] underline decoration-[#E30613]/40">
              {formData.email}
            </span>
            {lang === 'NL' ? '.' : ' within 1 business day.'}
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[5px] bg-[#E30613] hover:bg-[#111827] text-white font-semibold text-sm transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
          >
            {lang === 'NL' ? 'Nog een bericht sturen' : 'Send Another Message'}
          </button>
        </div>
      ) : (
        /* Form Card */
        <div className="relative bg-white p-4 sm:p-8 lg:p-10 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm w-full">
          <form onSubmit={handleSubmit} noValidate className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
              <div>
                <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1.5">
                  {lang === 'NL' ? 'Voornaam' : 'First Name'} <span className="text-[#E30613]">*</span>
                </label>
                <input
                  type="text"
                  placeholder={lang === 'NL' ? 'bijv. Jan' : 'e.g. Alexander'}
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  onBlur={() => handleBlur('firstName')}
                  className={`w-full px-4 py-3 rounded-lg bg-white border text-sm text-[#333333] placeholder-gray-400 focus:outline-none transition-all ${
                    errors.firstName
                      ? 'border-[#E30613] focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15'
                      : 'border-gray-200 focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/15'
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-[#E30613] font-medium flex items-center gap-1 animate-fadeIn">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.firstName}</span>
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1.5">
                  {lang === 'NL' ? 'Achternaam' : 'Last Name'}
                </label>
                <input
                  type="text"
                  placeholder={lang === 'NL' ? 'bijv. Jansen' : 'e.g. van den Berg'}
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  onBlur={() => handleBlur('lastName')}
                  className={`w-full px-4 py-3 rounded-lg bg-white border text-sm text-[#333333] placeholder-gray-400 focus:outline-none transition-all ${
                    errors.lastName
                      ? 'border-[#E30613] focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15'
                      : 'border-gray-200 focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/15'
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-[#E30613] font-medium flex items-center gap-1 animate-fadeIn">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.lastName}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
              <div>
                <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1.5">
                  {lang === 'NL' ? 'Telefoonnummer' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  placeholder="+31 6 12345678"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  className={`w-full px-4 py-3 rounded-lg bg-white border text-sm text-[#333333] placeholder-gray-400 focus:outline-none transition-all ${
                    errors.phone
                      ? 'border-[#E30613] focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15'
                      : 'border-gray-200 focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/15'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-[#E30613] font-medium flex items-center gap-1 animate-fadeIn">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1.5">
                  {lang === 'NL' ? 'E-mailadres' : 'Email Address'} <span className="text-[#E30613]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="naam@bedrijf.nl"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={`w-full px-4 py-3 rounded-lg bg-white border text-sm text-[#333333] placeholder-gray-400 focus:outline-none transition-all ${
                    errors.email
                      ? 'border-[#E30613] focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15'
                      : 'border-gray-200 focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/15'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-[#E30613] font-medium flex items-center gap-1 animate-fadeIn">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1.5">
                {lang === 'NL' ? 'Uw bericht of vraag' : 'Your Message or Question'} <span className="text-[#E30613]">*</span>
              </label>
              <textarea
                rows={4}
                placeholder={
                  lang === 'NL'
                    ? 'Vertel ons over uw personeelsbehoefte, contracting-vraagstuk of samenwerkingsmogelijkheden...'
                    : 'Tell us about your staffing requirements, contracting inquiries, or partnership opportunities...'
                }
                value={formData.remark}
                onChange={(e) => handleChange('remark', e.target.value)}
                onBlur={() => handleBlur('remark')}
                className={`w-full px-4 py-3 rounded-lg bg-white border text-sm text-[#333333] placeholder-gray-400 focus:outline-none transition-all resize-y ${
                  errors.remark
                    ? 'border-[#E30613] focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15'
                    : 'border-gray-200 focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/15'
                }`}
              />
              {errors.remark && (
                <p className="mt-1 text-xs text-[#E30613] font-medium flex items-center gap-1 animate-fadeIn">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.remark}</span>
                </p>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-[5px] bg-[#E30613] hover:bg-[#111827] text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer disabled:opacity-60 group"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{lang === 'NL' ? 'Verzenden...' : 'Sending...'}</span>
                  </>
                ) : (
                  <>
                    <span>{lang === 'NL' ? 'Verstuur Bericht' : 'Send Message'}</span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-gray-400 text-center sm:text-right">
                {lang === 'NL'
                  ? '🔒 Wij respecteren uw privacy en delen uw gegevens nooit.'
                  : '🔒 We respect your privacy and never share your details.'}
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
