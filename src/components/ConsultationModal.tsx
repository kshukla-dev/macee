import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, Phone, Mail, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  isValidEmail,
  isValidPhone,
  isValidName,
  isValidText,
  VALIDATION_MESSAGES,
} from '../lib/validation';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialNotes?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialNotes = '',
}) => {
  const { lang } = useLanguage();
  const msgs = VALIDATION_MESSAGES[lang] || VALIDATION_MESSAGES.EN;

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    workEmail: '',
    phoneNumber: '',
    notes: initialNotes || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync initialNotes whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        notes: initialNotes || '',
      }));
      setErrors({});
      setTouched({});
      setIsSubmitted(false);
    }
  }, [isOpen, initialNotes]);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'fullName':
        if (!value.trim()) return msgs.fullNameRequired;
        if (!isValidName(value)) return msgs.fullNameRequired;
        return '';
      case 'companyName':
        if (!value.trim()) return msgs.companyRequired;
        if (!isValidText(value, 2)) return msgs.companyRequired;
        return '';
      case 'workEmail':
        if (!value.trim()) return msgs.emailRequired;
        if (!isValidEmail(value)) return msgs.emailInvalid;
        return '';
      case 'phoneNumber':
        if (value.trim() && !isValidPhone(value)) return msgs.phoneInvalid;
        return '';
      default:
        return '';
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleFieldBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const val = (formData as any)[field] || '';
    const err = validateField(field, val);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {
      fullName: validateField('fullName', formData.fullName),
      companyName: validateField('companyName', formData.companyName),
      workEmail: validateField('workEmail', formData.workEmail),
      phoneNumber: validateField('phoneNumber', formData.phoneNumber),
    };

    setErrors(newErrors);
    setTouched({
      fullName: true,
      companyName: true,
      workEmail: true,
      phoneNumber: true,
    });

    const hasErrors = Object.values(newErrors).some((err) => Boolean(err));
    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] my-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed at top of modal */}
        <div className="bg-[#111827] text-white p-5 sm:p-7 shrink-0 relative pr-14">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E30613] text-white tracking-wider uppercase mb-2">
            Macee Workforce Solutions
          </span>

          <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
            {lang === 'NL' ? 'Vrijblijvend Adviesgesprek' : 'Request Consultation'}
          </h3>

          <p className="mt-1 text-xs sm:text-sm text-gray-300">
            {lang === 'NL'
              ? 'Bespreek direct uw inhuur- of capaciteitsvraagstuk met een senior adviseur.'
              : 'Direct consultation on interim staffing, compliance, or contracting strategies.'}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-3 pt-3 border-t border-white/10 text-xs text-white/80">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#E30613]" />
              info@macee.com
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#E30613]" />
              +31 (0)26 744 0024
            </span>
            <span>·</span>
            <span className="text-white/60">
              Macee BV · Arnhem, {lang === 'NL' ? 'Nederland' : 'Netherlands'}
            </span>
          </div>
        </div>

        {/* Scrollable Body Container */}
        <div
          data-lenis-prevent
          className="p-5 sm:p-7 overflow-y-auto flex-1 modal-scrollable"
          onWheel={(e) => e.stopPropagation()}
        >
          {isSubmitted ? (
            <div className="text-center py-6 sm:py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-[#111827] font-display">
                {lang === 'NL' ? 'Aanvraag succesvol ontvangen!' : 'Inquiry Received Successfully!'}
              </h4>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                {lang === 'NL' ? (
                  <>
                    Hartelijk dank, <strong>{formData.fullName}</strong>. Een adviseur van Macee neemt binnen 1 werkdag contact met u op via{' '}
                    <span className="text-[#E30613] font-semibold">{formData.workEmail}</span>.
                  </>
                ) : (
                  <>
                    Thank you, <strong>{formData.fullName}</strong>. A dedicated Macee advisor will review your notes and contact you within 1 business day at{' '}
                    <span className="text-[#E30613] font-semibold">{formData.workEmail}</span>.
                  </>
                )}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-[6px] bg-[#111827] text-white text-sm font-semibold hover:bg-black transition-colors cursor-pointer"
                >
                  {lang === 'NL' ? 'Sluiten' : 'Done'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {lang === 'NL' ? 'Volledige naam *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'NL' ? 'Robin van Dijk' : 'Robin van Dijk'}
                    value={formData.fullName}
                    onChange={(e) => handleFieldChange('fullName', e.target.value)}
                    onBlur={() => handleFieldBlur('fullName')}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none transition-all ${
                      errors.fullName
                        ? 'border-[#E30613] focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15'
                        : 'border-gray-200 focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-[#E30613] font-medium flex items-center gap-1 animate-fadeIn">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {lang === 'NL' ? 'Bedrijf / Organisatie *' : 'Company / Organisation *'}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'NL' ? 'Bedrijfsnaam of Professional' : 'Company name or Professional'}
                    value={formData.companyName}
                    onChange={(e) => handleFieldChange('companyName', e.target.value)}
                    onBlur={() => handleFieldBlur('companyName')}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none transition-all ${
                      errors.companyName
                        ? 'border-[#E30613] focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15'
                        : 'border-gray-200 focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15'
                    }`}
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-xs text-[#E30613] font-medium flex items-center gap-1 animate-fadeIn">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.companyName}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {lang === 'NL' ? 'Zakelijk e-mailadres *' : 'Work Email *'}
                  </label>
                  <input
                    type="email"
                    placeholder="robin@company.nl"
                    value={formData.workEmail}
                    onChange={(e) => handleFieldChange('workEmail', e.target.value)}
                    onBlur={() => handleFieldBlur('workEmail')}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none transition-all ${
                      errors.workEmail
                        ? 'border-[#E30613] focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15'
                        : 'border-gray-200 focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15'
                    }`}
                  />
                  {errors.workEmail && (
                    <p className="mt-1 text-xs text-[#E30613] font-medium flex items-center gap-1 animate-fadeIn">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.workEmail}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {lang === 'NL' ? 'Telefoonnummer' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    placeholder="+31 6 12345678"
                    value={formData.phoneNumber}
                    onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
                    onBlur={() => handleFieldBlur('phoneNumber')}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none transition-all ${
                      errors.phoneNumber
                        ? 'border-[#E30613] focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15'
                        : 'border-gray-200 focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15'
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-xs text-[#E30613] font-medium flex items-center gap-1 animate-fadeIn">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phoneNumber}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {lang === 'NL' ? 'Hoe kunnen wij u helpen?' : 'How can we help you?'}
                </label>
                <textarea
                  rows={3}
                  placeholder={
                    lang === 'NL'
                      ? 'Vertel ons over uw project, technische eisen of contractuele situatie...'
                      : 'Tell us about the project, technical requirements, or contract situation...'
                  }
                  value={formData.notes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15 transition-all resize-y"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-[6px] bg-[#E30613] hover:bg-[#111827] text-white font-semibold text-sm sm:text-base shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <span>{lang === 'NL' ? 'Bericht wordt verzonden...' : 'Sending Message...'}</span>
                  ) : (
                    <>
                      <span>{lang === 'NL' ? 'Verstuur bericht naar Macee' : 'Send Message to Macee'}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-center text-gray-400">
                {lang === 'NL'
                  ? 'Uw gegevens worden vertrouwelijk behandeld conform de AVG / GDPR.'
                  : 'Your data is managed confidentially in accordance with Dutch GDPR / AVG standards.'}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
