import React, { useState } from 'react';
import { X, CheckCircle2, Send, Phone, Mail } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    workEmail: '',
    phoneNumber: '',
    inquiryType: 'Hiring External Staff / Secondment',
    serviceInterest: 'Recruitment & Staffing',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden my-8 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1D454C] text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#E5B5D0] mb-1">
            Macee BV · Arnhem, Netherlands
          </span>
          <h3 className="text-2xl font-bold font-display text-white">
            Get in Touch with Macee
          </h3>
          <p className="text-sm text-white/80 mt-1">
            Speak directly with an external workforce advisor. SNA NEN 4400-1 certified and IND Recognised Sponsor.
          </p>
        </div>

        {/* Form Body or Success State */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-[#1D454C] font-display">
                Message Received!
              </h4>
              <p className="text-sm text-[#54595F] max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-gray-800">{formData.fullName}</span>. A specialist from Macee BV will review your request and contact you within 1 business day.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-[#54595F]">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-[#1D454C]" />
                  <span>Direct: +31 (0)26 744 0024</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-[#1D454C]" />
                  <span>info@macee.com</span>
                </div>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-[5px] bg-[#1D454C] text-white text-sm font-semibold hover:bg-[#153439] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Robin van Dijk"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1D454C] focus:ring-1 focus:ring-[#1D454C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Company / Organisation *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Company name or Professional"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1D454C] focus:ring-1 focus:ring-[#1D454C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="robin@company.nl"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1D454C] focus:ring-1 focus:ring-[#1D454C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+31 6 12345678"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1D454C] focus:ring-1 focus:ring-[#1D454C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    I am interested as
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:border-[#1D454C]"
                  >
                    <option>Client: Hiring External Staff / Secondment</option>
                    <option>Client: Contract Administration & Compliance</option>
                    <option>Client: Expat & IND Visa Sponsorship</option>
                    <option>Professional: Seeking Contracting / Interim Project</option>
                    <option>Professional: Freelancer (ZZP) Assignments</option>
                    <option>Professional: Expat Visa Sponsorship (HSM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Primary Service Focus
                  </label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:border-[#1D454C]"
                  >
                    <option>Recruitment & Staffing</option>
                    <option>Contract Administration</option>
                    <option>Compliancy & Support</option>
                    <option>Contracting & Secondment</option>
                    <option>Freelance / ZZP</option>
                    <option>HSM / Expats / Visa Sponsorship</option>
                    <option>Outsourcing & Project Services</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  How can we help you?
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about the project, technical requirements, or contract situation..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1D454C]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-[5px] bg-[#6B0D43] hover:bg-[#1D454C] text-white font-semibold text-sm sm:text-base shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Message to Macee</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-center text-gray-400">
                Your data is managed confidentially in accordance with Dutch GDPR / AVG standards.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
