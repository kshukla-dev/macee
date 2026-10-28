import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
  tag?: string;
}

export interface PageFaqSectionProps {
  id?: string;
  badge?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  description?: string;
  faqs: FaqItem[];
  onNavigate?: (page: string) => void;
  background?: 'white' | 'gray';
  ctaText?: string;
}

export const PageFaqSection: React.FC<PageFaqSectionProps> = ({
  id = 'page-faq',
  badge = 'Common Questions',
  titlePrefix = 'Frequently Asked',
  titleHighlight = 'Questions',
  description = 'Everything you need to know about our services, compliance, and processes.',
  faqs,
  onNavigate,
  background = 'gray',
  ctaText = 'Explore All FAQs & Regulatory Guides',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const bgClasses =
    background === 'white'
      ? 'bg-white border-b border-gray-100'
      : 'bg-[#F8FAFB] border-b border-gray-100';

  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${bgClasses}`}>
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111827]/5 text-[#111827] text-xs sm:text-sm font-semibold tracking-wide mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#E30613]" />
            <span>{badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#111827] tracking-tight">
            {titlePrefix} <span className="text-[#E30613]">{titleHighlight}</span>
          </h2>

          {description && (
            <p className="mt-4 text-base sm:text-lg text-[#54595F] leading-relaxed max-w-2xl mx-auto font-normal">
              {description}
            </p>
          )}
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-white border-[#E30613]/40 shadow-md ring-1 ring-[#E30613]/10'
                    : 'bg-white border-gray-200/80 hover:border-gray-300 shadow-2xs hover:shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-5 px-6 sm:px-7 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center">
                    <span
                      className={`text-base sm:text-lg font-bold font-display transition-colors ${
                        isOpen ? 'text-[#111827]' : 'text-[#111827] hover:text-[#E30613]'
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#E30613] text-white rotate-180'
                        : 'bg-[#F8FAFB] text-gray-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 pt-1 text-sm sm:text-base text-[#54595F] leading-relaxed border-t border-gray-100/80">
                    <p className="whitespace-pre-line mt-2">{faq.answer}</p>

                    {faq.tag && (
                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-[#111827]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E30613]" />
                        <span>{faq.tag}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Navigation Link to Full FAQ Page */}
        {onNavigate && (
          <div className="text-center mt-10 sm:mt-12">
            <button
              onClick={() => onNavigate('faq')}
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#111827] hover:text-[#E30613] transition-colors cursor-pointer group"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4 text-[#E30613] transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
