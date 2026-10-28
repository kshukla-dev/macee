import React, { useState, useEffect } from 'react';
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
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#E30613] mb-1">
            Macee BV · Arnhem, Netherlands
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            Get in Touch with Macee
          </h3>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Speak directly with an external workforce advisor. SNA NEN 4400-1 certified and IND Recognised Sponsor.
          </p>
        </div>

        {/* Scrollable Form Body or Success State */}
        <div 
          data-lenis-prevent 
          className="p-5 sm:p-7 overflow-y-auto flex-1 overscroll-contain modal-scrollable"
          onWheel={(e) => e.stopPropagation()}
        >
          {isSubmitted ? (
            <div className="text-center py-6 sm:py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-[#111827] font-display">
                Message Received!
              </h4>
              <p className="text-xs sm:text-sm text-[#54595F] max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-gray-800">{formData.fullName}</span>. A specialist from Macee BV will review your request and contact you within 1 business day.
              </p>
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs text-[#54595F]">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#E30613]" />
                  <span>Direct: +31 (0)26 744 0024</span>
                </div>
                <span className="hidden sm:inline">·</span>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#E30613]" />
                  <span>info@macee.com</span>
                </div>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-[6px] bg-[#111827] text-white text-sm font-semibold hover:bg-black transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
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
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15 transition-all"
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
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
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
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15 transition-all"
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
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15 transition-all"
                  />
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
