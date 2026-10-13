import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

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
  title = 'Get in contact with us',
  badge = 'Reach Out To Macee',
  subtitle = 'Have a question about flexible staffing, contract administration, or compliance? Send us a message and our team will get back to you promptly.',
  className = '',
  onSuccess,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    remark: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        {badge && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E30613]/10 text-[#E30613] text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E30613]" />
            {badge}
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[#111827] tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2.5 text-sm sm:text-base text-[#54595F] leading-relaxed">
            {subtitle}
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
            Message Sent Successfully!
          </h3>
          <p className="text-sm text-[#54595F] leading-relaxed max-w-md mx-auto mb-6">
            Thank you for reaching out to Macee BV. Our team will review your inquiry and contact you at{' '}
            <span className="font-semibold text-[#111827] underline decoration-[#E30613]/40">
              {formData.email}
            </span>{' '}
            within 1 business day.
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[5px] bg-[#E30613] hover:bg-[#111827] text-white font-semibold text-sm transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        /* Form Card */
        <div className="relative bg-white p-4 sm:p-8 lg:p-10 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm w-full">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
              <div>
                <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1.5">
                  First Name <span className="text-[#E30613]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alexander"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-sm text-[#333333] placeholder-gray-400 focus:outline-none focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/15 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. van den Berg"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-sm text-[#333333] placeholder-gray-400 focus:outline-none focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/15 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
              <div>
                <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+31 6 12345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-sm text-[#333333] placeholder-gray-400 focus:outline-none focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/15 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-[#E30613]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-sm text-[#333333] placeholder-gray-400 focus:outline-none focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/15 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1.5">
                Your Message or Question <span className="text-[#E30613]">*</span>
              </label>
              <textarea
                rows={4}
                required
                placeholder="Tell us about your staffing requirements, contracting inquiries, or partnership opportunities..."
                value={formData.remark}
                onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-sm text-[#333333] placeholder-gray-400 focus:outline-none focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/15 transition-all resize-y"
              />
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
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-gray-400 text-center sm:text-right">
                🔒 We respect your privacy and never share your details.
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
