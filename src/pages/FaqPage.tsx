import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  ArrowLeft, 
  ArrowRight,
  Search, 
  CheckCircle2, 
  Sparkles, 
  Phone,
  Mail
} from 'lucide-react';
import { JobalertBanner } from '../components/JobalertBanner';
import { ContactFormSection } from '../components/ContactFormSection';
import faqData from '../data/faqData.json';

interface FaqPageProps {
  onNavigate: (page: string) => void;
  onOpenConsultation?: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate, onOpenConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = faqData.categories;
  const ALL_FAQS = faqData.faqs;

  // Filter FAQs
  const filteredFaqs = useMemo(() => {
    return ALL_FAQS.filter((faq) => {
      const matchesCategory = selectedCategory === null || faq.categoryId === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.categoryName.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [ALL_FAQS, selectedCategory, searchQuery]);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="page_faq min-h-screen bg-[#F8FAFB]">
      {/* 1. Hero Banner */}
      <section
        className="relative py-20 sm:py-28 bg-cover bg-center text-white overflow-hidden"
        style={{ backgroundImage: `url("/uploads/PM-2.jpg")` }}
      >
        <div className="absolute inset-0 bg-[#2a0209]/80 backdrop-blur-[2px]" />
        
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#E30613]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-black/40 blur-3xl pointer-events-none" />

        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white/95 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-xs mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#E30613]" />
            <span>{faqData.hero.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-tight">
            {faqData.hero.titlePrefix} <span className="text-[#E30613]">{faqData.hero.titleHighlight}</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-[#f8dada] font-medium max-w-2xl mx-auto leading-relaxed">
            {faqData.hero.description}
          </p>
        </div>
      </section>

      {/* 2. FAQ Section */}
      <section id="faq-section" className="py-16 sm:py-24">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Category Cards */}
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E30613]">
                    Explore by Topic
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold font-display text-gray-900 mt-1">
                    FAQ Categories
                  </h2>
                </div>

                {/* Search Bar */}
                <div className="w-full sm:w-72 relative">
                  <input
                    type="text"
                    placeholder={faqData.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613]"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(isSelected ? null : cat.id);
                      }}
                      className={`group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-xs hover:shadow-md transition-all duration-300 border-2 ${
                        isSelected
                          ? 'border-[#E30613] ring-2 ring-[#E30613]/20'
                          : 'border-transparent hover:border-gray-200'
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-[#E30613] px-2.5 py-0.5 rounded-full">
                          {cat.count} Questions
                        </span>
                      </div>

                      <div className="p-5">
                        <h3 className="text-base font-bold font-display text-gray-900 group-hover:text-[#E30613] transition-colors leading-snug">
                          {cat.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                          {cat.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Filter Indicator / Reset */}
            {(selectedCategory !== null || searchQuery) && (
              <div className="mb-6 flex items-center gap-3 bg-white p-3.5 rounded-xl border border-gray-200">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery('');
                  }}
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#E30613] hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Show all categories</span>
                </button>
                <span className="text-gray-300">|</span>
                <span className="text-xs sm:text-sm font-medium text-gray-700">
                  Showing {filteredFaqs.length} questions
                  {selectedCategory !== null && (
                    <> in <strong>{categories.find((c) => c.id === selectedCategory)?.title}</strong></>
                  )}
                  {searchQuery && (
                    <> matching "<strong>{searchQuery}</strong>"</>
                  )}
                </span>
              </div>
            )}

            {/* Accordion List */}
            <div className="space-y-4 max-w-4xl mx-auto">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 p-8 shadow-xs">
                  <HelpCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <h4 className="text-lg font-bold font-display text-gray-900 mb-1">
                    {faqData.noResults.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
                    {faqData.noResults.description}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSearchQuery('');
                    }}
                    className="mt-4 px-5 py-2 rounded-[5px] bg-[#E30613] text-white text-xs font-bold hover:bg-[#111827] transition-colors cursor-pointer"
                  >
                    Reset Search
                  </button>
                </div>
              ) : (
                filteredFaqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-xs hover:border-gray-300 transition-all duration-200"
                    >
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-gray-50/70 transition-colors"
                      >
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#E30613]">
                            {faq.categoryName}
                          </span>
                          <h4 className="text-base sm:text-lg font-bold font-display text-gray-900">
                            {faq.question}
                          </h4>
                          <span className="text-[11px] text-gray-400 block font-mono">
                            {faq.date}
                          </span>
                        </div>

                        <div
                          className={`p-2 rounded-full bg-[#F8FAFB] border border-gray-100 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#E30613] bg-[#f8dada]/40' : 'text-gray-500'
                          }`}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-5 sm:px-6 pb-6 pt-2 text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line border-t border-gray-100 bg-[#F8FAFB]/40">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Direct Question Assistance Card */}
            <div className="mt-14 max-w-4xl mx-auto bg-white rounded-2xl border border-gray-200 p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E30613]">
                  Direct Support
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-900">
                  Still have a question?
                </h3>
                <p className="text-sm text-gray-600 max-w-md">
                  Reach out to our specialists in Arnhem for tailored advice on contracting, payroll, or visa sponsorship.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="tel:+310267440024"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[5px] bg-[#111827] text-white text-xs font-bold hover:bg-black transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#E30613]" />
                  <span>+31 (0)26 744 0024</span>
                </a>

                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[5px] bg-[#E30613] text-white text-xs font-bold hover:bg-[#111827] transition-colors cursor-pointer"
                >
                  <span>Contact Our Team</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

      {/* 5. Bottom Jobalert Banner */}
      <JobalertBanner
        onNavigate={onNavigate}
        bgImage="/uploads/Hightech-Industry-3.jpg"
      />

      {/* 6. Contact Form Section */}
      <ContactFormSection title="Get in contact with us" />
    </div>
  );
};
