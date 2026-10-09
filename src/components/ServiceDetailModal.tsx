import React from 'react';
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
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden my-8 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1D454C] text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            aria-label="Close service modal"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#E5B5D0] mb-1">
            Macee Service Capability · External Workforce
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
            {service.title}
          </h3>
          <p className="text-sm text-white/80 mt-2">
            {service.shortDesc}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1D454C] mb-2">
              Service Scope & Business Impact
            </h4>
            <p className="text-sm sm:text-base text-[#54595F] leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              Core Deliverables & Highlights:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F8FAFB] border border-gray-100 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#1D454C] shrink-0 mt-0.5" />
                  <span className="leading-snug">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Callout */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#54595F] flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#1D454C]" />
              <span>Direct Consultation: +31 (0)26 744 0024</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onStartConsultation();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[5px] bg-[#6B0D43] hover:bg-[#1D454C] text-white text-sm font-semibold transition-all cursor-pointer shadow-sm"
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
