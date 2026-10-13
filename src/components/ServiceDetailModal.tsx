import React, { useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, Phone } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onStartConsultation: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onStartConsultation
}) => {
  // Close on Escape key press
  useEffect(() => {
    if (!service) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div 
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] my-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed at top */}
        <div className="bg-[#111827] text-white p-5 sm:p-7 shrink-0 relative pr-14">
          <button
            onClick={onClose}
            aria-label="Close service modal"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#E30613] mb-1">
            Macee Service Capability · External Workforce
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm text-white/80 mt-1.5 leading-relaxed">
            {service.shortDesc}
          </p>
        </div>

        {/* Modal Scrollable Body */}
        <div 
          data-lenis-prevent 
          className="p-4 sm:p-6 md:p-8 space-y-5 overflow-y-auto flex-1 overscroll-contain modal-scrollable"
          onWheel={(e) => e.stopPropagation()}
        >
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-1.5">
              Service Scope & Business Impact
            </h4>
            <p className="text-xs sm:text-sm md:text-base text-[#54595F] leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
              Core Deliverables & Highlights:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F8FAFB] border border-gray-100 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#E30613] shrink-0 mt-0.5" />
                  <span className="leading-snug">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Callout */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-xs text-[#54595F] flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#E30613]" />
              <span>Direct Consultation: +31 (0)26 744 0024</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onStartConsultation();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[6px] bg-[#E30613] hover:bg-[#111827] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm active:scale-[0.99]"
            >
              <span>Consult on {service.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
