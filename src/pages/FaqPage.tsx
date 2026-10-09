import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowLeft } from 'lucide-react';
import { JobalertBanner } from '../components/JobalertBanner';
import { MACEE_FAQS, FaqItem } from '../data/maceeContent';

interface FaqPageProps {
  onNavigate: (page: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const categories = [
    {
      id: 1,
      title: 'What does MACEE do',
      image: '/media/cache/square_crop_center/rc/BS0BPM5r/uploads/Den Haag 02.jpg',
      count: 3
    },
    {
      id: 2,
      title: 'Services and Contract options',
      image: '/media/cache/square_crop_center/rc/W5f5eBnU/uploads/Amsterdam 01 (3).jpg',
      count: 3
    },
    {
      id: 3,
      title: 'Specialties and positions',
      image: '/media/cache/square_crop_center/rc/C2gVOxvQ/uploads/Rotterdam 01.jpg',
      count: 2
    }
  ];

  const displayedFaqs = selectedCategory !== null
    ? MACEE_FAQS.filter(f => f.categoryId === selectedCategory)
    : MACEE_FAQS;

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="page_faq">
      {/* Hero Banner with /media/cache/hero/uploads/PM-2.jpg */}
      <section
        className="relative py-20 sm:py-28 bg-cover bg-center text-white"
        style={{ backgroundImage: `url("/media/cache/hero/uploads/PM-2.jpg")` }}
      >
        <div className="absolute inset-0 bg-[#2a0209]/75 backdrop-blur-[1px]" />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            FAQ
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#f8dada] font-heading font-medium">
            Frequently Asked Questions about MACEE services, contracts, and expertise
          </p>
        </div>
      </section>

      {/* Categories & Questions Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Cards */}
          <div className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900 mb-8">
              FAQ - Categories
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(selectedCategory === cat.id ? null : cat.id);
                  }}
                  className={`group cursor-pointer rounded-[25px] overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border-2 ${
                    selectedCategory === cat.id
                      ? 'border-[#e8382e] ring-2 ring-[#e8382e]/20'
                      : 'border-transparent'
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = '/uploads/Software-Development-2.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 text-xs font-bold text-white bg-[#e8382e] px-2.5 py-1 rounded-full">
                      {cat.count} Questions
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold font-heading text-gray-900 group-hover:text-[#e8382e] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2">
                      {selectedCategory === cat.id ? 'Click to show all categories' : 'Click to filter questions'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Filter Indicator */}
          {selectedCategory !== null && (
            <div className="mb-8 flex items-center gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-1.5 text-sm font-bold text-[#e8382e] hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Show all FAQ categories</span>
              </button>
              <span className="text-gray-300">|</span>
              <span className="text-sm font-bold text-gray-700">
                Viewing: {categories.find(c => c.id === selectedCategory)?.title}
              </span>
            </div>
          )}

          {/* FAQ Accordion List */}
          <div className="space-y-4 max-w-4xl">
            {displayedFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-gray-200 overflow-hidden bg-[#F8FAFB] transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-gray-100/70 transition-colors"
                  >
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#e8382e]">
                        {faq.categoryName}
                      </span>
                      <h4 className="text-lg sm:text-xl font-bold font-heading text-gray-900 mt-1">
                        {faq.question}
                      </h4>
                      <span className="text-xs text-gray-400 mt-1 block">
                        {faq.date}
                      </span>
                    </div>

                    <div className={`p-2 rounded-full bg-white shadow-xs shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-[#e8382e]' : 'text-gray-500'
                    }`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line border-t border-gray-200/60 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Jobalert Banner with /media/cache/hero/uploads/Hightech Industry 2.jpg */}
      <JobalertBanner
        onNavigate={onNavigate}
        bgImage="/media/cache/hero/uploads/Hightech Industry 2.jpg"
      />
    </div>
  );
};
