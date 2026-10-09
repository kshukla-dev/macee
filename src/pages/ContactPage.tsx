import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Clock } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
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
    <div className="page_contact">
      {/* Header Banner */}
      <section className="bg-[#2a0209] text-white py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 relative z-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            CONTACT
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#f8dada] font-heading font-medium">
            Get in touch with Macee BV
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Info & Address */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">
                  Get in touch
                </h2>
                <p className="text-base text-gray-700 leading-relaxed">
                  Do you have questions about our contracting services, talent placement, payroll solutions, or visa sponsorships? Reach out to our team in Arnhem.
                </p>
              </div>

              {/* Office Details Card */}
              <div className="bg-[#F8FAFB] p-8 rounded-2xl border border-gray-200 space-y-4">
                <h3 className="text-xl font-bold font-heading text-gray-900">
                  Macee BV
                </h3>

                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <MapPin className="w-5 h-5 text-[#e8382e] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Headquarters</p>
                    <p>Nieuwe Stationsstraat 10</p>
                    <p>6811 KS Arnhem</p>
                    <p>The Netherlands</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-700 pt-2 border-t border-gray-200">
                  <Mail className="w-5 h-5 text-[#e8382e] shrink-0" />
                  <a href="mailto:info@macee.com" className="hover:text-[#e8382e] font-medium transition-colors">
                    info@macee.com
                  </a>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Phone className="w-5 h-5 text-[#e8382e] shrink-0" />
                  <a href="tel:+31267440024" className="hover:text-[#e8382e] font-medium transition-colors">
                    +31 (0)26 744 0024
                  </a>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-500 pt-2 border-t border-gray-200">
                  <Clock className="w-5 h-5 text-gray-400 shrink-0" />
                  <span>Monday – Friday: 08:30 – 17:30 CET</span>
                </div>
              </div>

              {/* Map embed placeholder / styled location frame */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-xs h-56 bg-gray-100 relative">
                <iframe
                  title="Macee Arnhem Office Location"
                  className="w-full h-full border-0"
                  src="https://maps.google.com/maps?q=Nieuwe%20Stationsstraat%2010,%206811%20KS%20Arnhem,%20Netherlands&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <div className="card-pink p-8 sm:p-12 shadow-md">
                <h3 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                  Send Us a Message
                </h3>

                {submitted ? (
                  <div className="text-center py-10 space-y-4 bg-white rounded-2xl p-8">
                    <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                    <h4 className="text-2xl font-bold font-heading text-gray-900">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-sm text-gray-600 max-w-md mx-auto">
                      Thank you for contacting Macee. We will review your question and respond to <span className="font-bold">{formData.email}</span> within 1 business day.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ firstName: '', lastName: '', phone: '', email: '', remark: '' });
                      }}
                      className="is-btn text-sm mt-4"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                          First name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#e8382e]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                          Last name
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#e8382e]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#e8382e]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                          E-mail *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#e8382e]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                        Your question *
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={formData.remark}
                        onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#e8382e]"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="is-btn text-base px-8 py-3.5 w-full sm:w-auto"
                      >
                        {loading ? 'Sending...' : 'Send'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
