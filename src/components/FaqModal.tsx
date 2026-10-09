import React, { useState } from 'react';
import { X, ChevronDown, HelpCircle, ArrowRight, Bell } from 'lucide-react';
import { FAQ_DATA } from '../data/content';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const FaqModal: React.FC<FaqModalProps> = ({
  isOpen,
  onClose,
  onOpenConsultation
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(FAQ_DATA[0].id);

  if (!isOpen) return null;

  const categories = ['All', 'What does MACEE do', 'Services and Contract options', 'Specialties and positions'];

  const filteredFaqs = activeCategory === 'All'
    ? FAQ_DATA
    : FAQ_DATA.filter(f => f.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden my-8 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1D454C] text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            aria-label="Close FAQ"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <HelpCircle className="w-4 h-4 text-[#E5B5D0]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#E5B5D0]">
              Macee Knowledge Base
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Frequently Asked Questions
          </h3>
          <p className="text-sm text-white/80 mt-1">
            Everything you need to know about external workforce hiring, contracting options, and visa sponsorship.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-[#1D454C]'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="p-6 sm:p-8 space-y-3 max-h-[60vh] overflow-y-auto">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-xl border border-gray-200 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                  className="w-full text-left p-4 sm:p-5 bg-[#F8FAFB] hover:bg-gray-50 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-[#1D454C] leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 text-[#6B0D43]' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="p-4 sm:p-5 bg-white border-t border-gray-100 text-xs sm:text-sm text-[#54595F] leading-relaxed">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Job Alert & Open Application Callout */}
          <div className="p-5 mt-6 rounded-xl bg-gradient-to-r from-[#1D454C]/10 to-[#6B0D43]/10 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#1D454C] text-white flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-[#1D454C]">
                  Can’t find the project you are looking for?
                </h5>
                <p className="text-xs text-[#54595F]">
                  Create a Jobalert or submit an open application to receive immediate notifications.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-[5px] bg-[#6B0D43] hover:bg-[#1D454C] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0"
            >
              <span>Create Jobalert</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
