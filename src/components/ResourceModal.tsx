import React, { useEffect } from 'react';
import { X, CheckCircle2, ArrowUpRight, Lightbulb } from 'lucide-react';
import { ResourceItem } from '../types';

interface ResourceModalProps {
  resource: ResourceItem | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const ResourceModal: React.FC<ResourceModalProps> = ({
  resource,
  onClose,
  onOpenConsultation,
}) => {
  // Close on Escape key press
  useEffect(() => {
    if (!resource) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resource, onClose]);

  if (!resource) return null;

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
            aria-label="Close resource modal"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#E30613] mb-1">
            {resource.type}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white leading-snug">
            {resource.title}
          </h3>
          <p className="text-xs sm:text-sm text-white/80 mt-1 sm:mt-2">
            Macee Workforce Insights & Strategic Advisory
          </p>
        </div>

        {/* Scrollable Content Body */}
        <div
          data-lenis-prevent
          className="p-4 sm:p-6 md:p-8 space-y-6 overflow-y-auto flex-1 overscroll-contain modal-scrollable"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Overview Section */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
            <div className="w-full sm:w-44 h-36 sm:h-auto aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
              <img
                src={resource.image}
                alt={resource.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2 flex-1">
              <h4 className="text-xs sm:text-sm font-bold text-[#111827] uppercase tracking-wide">
                Overview & Strategic Intent
              </h4>
              <p className="text-xs sm:text-sm text-[#54595F] leading-relaxed">
                {resource.description}
              </p>
            </div>
          </div>

          {/* Topics & Key Takeaways */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
              Key Topics Covered:
            </h4>
            <div className="space-y-2">
              {resource.topics.map((topic, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#E30613] shrink-0 mt-0.5" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Card: Inquire & Connect for Full Details */}
          <div className="p-5 sm:p-6 bg-gradient-to-br from-[#F8FAFB] to-[#F1F4F9] rounded-2xl border border-gray-200/90 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E30613] uppercase tracking-wider">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Want More Information?</span>
              </div>
              <h5 className="text-base sm:text-lg font-bold font-display text-[#111827]">
                Connect with our specialists for detailed guidance
              </h5>
              <p className="text-xs sm:text-sm text-[#54595F] max-w-md leading-relaxed">
                Have specific questions about this topic, compliance, or contract setup? Get in touch with our team directly.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[6px] bg-[#E30613] hover:bg-[#111827] text-white text-sm font-semibold transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:scale-[0.99]"
            >
              <span>Get in Touch with Macee</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
