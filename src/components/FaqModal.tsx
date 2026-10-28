import React, { useState, useEffect, useMemo } from 'react';
import { X, ChevronDown, HelpCircle, ArrowRight, Bell } from 'lucide-react';
import { getFaqData } from '../data/content';
import { useLanguage } from '../context/LanguageContext';

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
  const { lang } = useLanguage();
  const faqs = useMemo(() => getFaqData(lang), [lang]);
  const allLabel = lang === 'NL' ? 'Alle' : 'All';
  const [activeCategory, setActiveCategory] = useState<string>(allLabel);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Sync category and expanded FAQ on language switch or open
  useEffect(() => {
    setActiveCategory(lang === 'NL' ? 'Alle' : 'All');
    if (faqs.length > 0) {
      setExpandedId(faqs[0].id);
    }
  }, [lang, faqs]);

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

  const categories = [allLabel, ...Array.from(new Set(faqs.map((f) => f.category)))];

  const filteredFaqs = (activeCategory === 'All' || activeCategory === 'Alle')
    ? faqs
    : faqs.filter(f => f.category === activeCategory);

  return (
    <div 
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] my-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed at top */}
        <div className="bg-[#111827] text-white p-5 sm:p-7 shrink-0 relative pr-14">
          <button
            onClick={onClose}
            aria-label="Close FAQ"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <HelpCircle className="w-4 h-4 text-[#E30613]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#E30613]">
              {lang === 'NL' ? 'Macee Kennisbank' : 'Macee Knowledge Base'}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            {lang === 'NL' ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
          </h3>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
            {lang === 'NL'
              ? 'Alles wat u moet weten over externe inhuur, contractopties en visumsponsoring.'
              : 'Everything you need to know about external workforce hiring, contracting options, and visa sponsorship.'}
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${activeCategory === cat
                    ? 'bg-white text-[#111827] shadow-xs'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List - Scrollable Body */}
        <div 
          data-lenis-prevent 
          className="p-4 sm:p-6 md:p-8 space-y-3 overflow-y-auto flex-1 overscroll-contain modal-scrollable"
          onWheel={(e) => e.stopPropagation()}
        >
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
                  className="w-full text-left p-3.5 sm:p-5 bg-[#F8FAFB] hover:bg-gray-50 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm md:text-base font-bold text-[#111827] leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#E30613]' : ''
                      }`}
                  />
                </button>

                {isExpanded && (
                  <div className="p-3.5 sm:p-5 bg-white border-t border-gray-100 text-xs sm:text-sm text-[#54595F] leading-relaxed">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Job Alert & Open Application Callout */}
          <div className="p-4 sm:p-5 mt-4 sm:mt-6 rounded-xl bg-gradient-to-r from-[#111827]/10 to-[#E30613]/10 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-lg bg-[#111827] text-white flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5 text-[#E30613]" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-[#111827]">
                  {lang === 'NL' ? 'Kunt u het project dat u zoekt niet vinden?' : 'Can’t find the project you are looking for?'}
                </h5>
                <p className="text-xs text-[#54595F]">
                  {lang === 'NL'
                    ? 'Maak een Jobalert aan of meld u aan voor automatische notificaties per e-mail.'
                    : 'Create a Jobalert or submit an open application to receive immediate notifications.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-[6px] bg-[#E30613] hover:bg-[#111827] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0 active:scale-[0.99]"
            >
              <span>{lang === 'NL' ? 'Jobalert Aanmaken' : 'Create Jobalert'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
