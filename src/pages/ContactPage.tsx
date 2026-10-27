import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Globe2, 
  Calendar, 
  ArrowRight,
  Sparkles,
  UserCheck
} from 'lucide-react';
import contactData from '../data/contactData.json';

interface ContactPageProps {
  onNavigate: (page: string) => void;
  onOpenConsultation?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenConsultation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [inquiryType, setInquiryType] = useState('Hiring External Specialists');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setMessage('');
  };

  return (
    <div className="page_contact min-h-screen bg-[#F8FAFB]">
      {/* 1. Header Banner */}
      <section
        className="relative py-20 sm:py-28 bg-cover bg-center text-white overflow-hidden"
        style={{ backgroundImage: `url("/uploads/PM-2.jpg")` }}
      >
        <div className="absolute inset-0 bg-[#2a0209]/85 backdrop-blur-[2px]" />
        
        {/* Glow ambient shapes */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#E30613]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-black/40 blur-3xl pointer-events-none" />

        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white/95 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-xs mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E30613]" />
            <span>{contactData.hero.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-tight">
            {contactData.hero.titlePrefix} <span className="text-[#E30613]">{contactData.hero.titleHighlight}</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-[#f8dada] font-medium max-w-2xl mx-auto leading-relaxed">
            {contactData.hero.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-white/90">
            {contactData.hero.highlights.map((item, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E30613]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Main Content Area */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Office Details, Desks & Map (5 Cols) */}
            <div className="lg:col-span-5 space-y-8">
              
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#E30613]">
                  {contactData.office.tag}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-gray-900 mt-1">
                  {contactData.office.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
                  {contactData.office.description}
                </p>
              </div>

              {/* Office Details Card */}
              <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="text-xl font-bold font-display text-gray-900">
                      {contactData.office.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-mono">
                      {contactData.office.city}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#f8dada] text-[#E30613]">
                    {contactData.office.badge}
                  </span>
                </div>

                <div className="space-y-3.5 text-sm text-gray-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#E30613] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Physical Address</p>
                      <p className="text-gray-600">{contactData.office.address.line1}</p>
                      <p className="text-gray-600">{contactData.office.address.line2}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                    <Phone className="w-5 h-5 text-[#E30613] shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Direct Telephone</p>
                      <a
                        href={`tel:${contactData.office.phoneTel}`}
                        className="font-bold text-gray-900 hover:text-[#E30613] transition-colors"
                      >
                        {contactData.office.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                    <Mail className="w-5 h-5 text-[#E30613] shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Official Email</p>
                      <a
                        href={`mailto:${contactData.office.email}`}
                        className="font-bold text-gray-900 hover:text-[#E30613] transition-colors"
                      >
                        {contactData.office.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2 border-t border-gray-100 text-xs text-gray-500">
                    <Clock className="w-5 h-5 text-gray-400 shrink-0" />
                    <span>{contactData.office.hours}</span>
                  </div>
                </div>
              </div>

              {/* Department Desks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactData.desks.map((desk, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#E30613] block">
                      {desk.badge}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900">
                      {desk.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {desk.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Map Embed Frame */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-xs h-64 bg-gray-100 relative">
                <iframe
                  title="Macee Arnhem Office Location"
                  className="w-full h-full border-0"
                  src={contactData.office.mapQuery}
                  loading="lazy"
                />
              </div>

              {/* Certifications micro banner */}
              <div className="p-4 rounded-xl bg-white border border-gray-200 flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#E30613]" />
                  <span>{contactData.certifications[0]}</span>
                </div>
                <span className="text-gray-300">·</span>
                <div className="flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-[#E30613]" />
                  <span>{contactData.certifications[1]}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Contact Form (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-200">
                
                {submitted ? (
                  <div className="text-center py-12 space-y-5">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-gray-900">
                      Message Sent Successfully!
                    </h3>

                    <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong>{firstName || 'there'}</strong>. We have received your inquiry regarding{' '}
                      <strong>{inquiryType}</strong>. A dedicated Macee specialist will review your details and contact you within 24 business hours.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={handleReset}
                        className="px-6 py-2.5 rounded-[5px] bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Send Another Inquiry
                      </button>

                      <button
                        onClick={() => onNavigate('projects')}
                        className="px-6 py-2.5 rounded-[5px] bg-[#E30613] hover:bg-[#111827] text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Browse Current Projects
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="border-b border-gray-100 pb-5 mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#E30613]">
                        Online Contact Form
                      </span>
                      <h3 className="text-2xl font-bold font-display text-gray-900 mt-1">
                        {contactData.form.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        {contactData.form.subtitle}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            First Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Maarten"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#E30613]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. de Jong"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#E30613]"
                          />
                        </div>
                      </div>

                      {/* Contact Info Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. m.dejong@company.nl"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#E30613]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            placeholder="+31 6 1234 5678"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#E30613]"
                          />
                        </div>
                      </div>

                      {/* Company & Topic Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Organisation / Company (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Macee Partner BV"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#E30613]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Subject / Inquiry Topic
                          </label>
                          <select
                            value={inquiryType}
                            onChange={(e) => setInquiryType(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:border-[#E30613]"
                          >
                            {contactData.form.topics.map((item, idx) => (
                              <option key={idx} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Message Textarea */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Your Message / Description of Needs *
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Please tell us about your requirements, project details, or any questions..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#E30613]"
                        />
                      </div>

                      {/* Privacy Notice */}
                      <p className="text-[11px] text-gray-500 leading-normal">
                        {contactData.form.privacy}
                      </p>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-[5px] bg-[#E30613] hover:bg-[#111827] text-white font-semibold text-sm shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <span>Sending message...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>{contactData.form.buttonText}</span>
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Consultation Banner CTA */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#111827] rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E30613]">
                {contactData.consultationBanner.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display">
                {contactData.consultationBanner.title}
              </h3>
              <p className="text-sm text-gray-300 max-w-xl">
                {contactData.consultationBanner.description}
              </p>
            </div>

            <button
              onClick={() => {
                if (onOpenConsultation) {
                  onOpenConsultation();
                } else {
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[5px] bg-[#E30613] hover:bg-white hover:text-[#111827] text-white font-semibold text-sm transition-all duration-200 shrink-0 cursor-pointer shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>{contactData.consultationBanner.buttonText}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
