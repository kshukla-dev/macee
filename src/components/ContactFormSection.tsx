import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

interface ContactFormSectionProps {
  title?: string;
}

export const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  title = 'Get in contact with us'
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    remark: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#6B0D43] mb-2">
              Reach Out To Macee
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1D454C] tracking-tight">
              {title}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-[#1D454C]/5 via-white to-[#6B0D43]/5 p-8 sm:p-12 rounded-2xl shadow-xl border border-gray-100">
            {submitted ? (
              <div className="text-center py-8 space-y-4 bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
                <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                <h3 className="text-2xl font-bold font-display text-[#1D454C]">
                  Thank You!
                </h3>
                <p className="text-sm text-[#54595F] max-w-md mx-auto leading-relaxed">
                  Your message has been sent to Macee BV. Our team will contact you shortly at <span className="font-bold text-[#1D454C]">{formData.email}</span>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ firstName: '', lastName: '', phone: '', email: '', remark: '' });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[5px] bg-[#6B0D43] hover:bg-[#1D454C] text-white font-semibold text-sm transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1D454C] uppercase tracking-wider mb-1.5">
                      First name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-sm text-[#333333] focus:outline-none focus:border-[#1D454C] focus:ring-2 focus:ring-[#1D454C]/15 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1D454C] uppercase tracking-wider mb-1.5">
                      Last name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-sm text-[#333333] focus:outline-none focus:border-[#1D454C] focus:ring-2 focus:ring-[#1D454C]/15 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1D454C] uppercase tracking-wider mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-sm text-[#333333] focus:outline-none focus:border-[#1D454C] focus:ring-2 focus:ring-[#1D454C]/15 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1D454C] uppercase tracking-wider mb-1.5">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-sm text-[#333333] focus:outline-none focus:border-[#1D454C] focus:ring-2 focus:ring-[#1D454C]/15 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1D454C] uppercase tracking-wider mb-1.5">
                    Your question *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.remark}
                    onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-sm text-[#333333] focus:outline-none focus:border-[#1D454C] focus:ring-2 focus:ring-[#1D454C]/15 transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[5px] bg-[#6B0D43] hover:bg-[#1D454C] text-white font-semibold text-base shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer w-full sm:w-auto"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
