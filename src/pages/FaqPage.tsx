import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  ArrowLeft, 
  Search, 
  FileText, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight, 
  X, 
  Send,
  Phone,
  Mail
} from 'lucide-react';
import { JobalertBanner } from '../components/JobalertBanner';
import { ContactFormSection } from '../components/ContactFormSection';
import { ResourceItem } from '../types';
import faqData from '../data/faqData.json';

interface FaqPageProps {
  onNavigate: (page: string) => void;
  onOpenConsultation?: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate, onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'faqs' | 'guides'>('all');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadEmail, setDownloadEmail] = useState('');

  const categories = faqData.categories;
  const ALL_FAQS = faqData.faqs;
  const resourcesList = faqData.resources as ResourceItem[];

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

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloadSuccess(true);
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
            <Sparkles className="w-3.5 h-3.5 text-[#E30613]" />
            <span>{faqData.hero.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-tight">
            {faqData.hero.titlePrefix} <span className="text-[#E30613]">{faqData.hero.titleHighlight}</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-[#f8dada] font-medium max-w-2xl mx-auto leading-relaxed">
            {faqData.hero.description}
          </p>

          {/* Quick Jump Tabs */}
          <div className="mt-8 inline-flex items-center p-1.5 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#E30613] text-white shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {faqData.hero.tabs.all}
            </button>
            <button
              onClick={() => {
                setActiveTab('faqs');
                const el = document.getElementById('faq-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'faqs'
                  ? 'bg-[#E30613] text-white shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {faqData.hero.tabs.faqs} ({ALL_FAQS.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('guides');
                const el = document.getElementById('guides-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'guides'
                  ? 'bg-[#E30613] text-white shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {faqData.hero.tabs.guides} ({resourcesList.length})
            </button>
          </div>
        </div>
      </section>

      {/* 2. Downloadable Guides Section */}
      {(activeTab === 'all' || activeTab === 'guides') && (
        <section id="guides-section" className="py-16 sm:py-20 bg-white border-b border-gray-100">
          <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#E30613]">
                  {faqData.guidesSection.tag}
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold font-display text-gray-900 mt-1">
                  {faqData.guidesSection.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-xl">
                  {faqData.guidesSection.description}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                <BookOpen className="w-4 h-4 text-[#E30613]" />
                <span>{faqData.guidesSection.badge}</span>
              </div>
            </div>

            {/* Guides Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {resourcesList.map((res) => (
                <div
                  key={res.id}
                  className="group bg-[#F8FAFB] rounded-2xl border border-gray-200 overflow-hidden hover:border-[#E30613]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Media Thumbnail */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                      <img
                        src={res.image}
                        alt={res.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = '/uploads/Software-Development-2.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      <span className="absolute top-3 left-3 text-[11px] font-bold text-white bg-[#E30613] px-2.5 py-1 rounded">
                        {res.type}
                      </span>

                      <span className="absolute bottom-3 right-3 text-xs font-mono font-bold text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                        {res.pages}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold font-display text-gray-900 group-hover:text-[#E30613] transition-colors leading-snug mb-3">
                        {res.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                        {res.description}
                      </p>

                      {/* Topics pills */}
                      <div className="space-y-1.5 pt-3 border-t border-gray-200/60">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                          Key Topics:
                        </span>
                        {res.topics.slice(0, 3).map((t, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-xs text-gray-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#E30613] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="p-6 pt-0">
                    <button
                      onClick={() => {
                        setSelectedResource(res);
                        setDownloadSuccess(false);
                      }}
                      className="w-full py-3 px-4 rounded-[5px] bg-white border border-gray-200 group-hover:bg-[#E30613] group-hover:border-[#E30613] group-hover:text-white text-gray-800 text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>{faqData.guidesSection.buttonText}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. FAQ Section */}
      {(activeTab === 'all' || activeTab === 'faqs') && (
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      )}

      {/* 4. Modal for Guide Details & Download */}
      {selectedResource && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto"
          onClick={() => setSelectedResource(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] my-auto animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#111827] text-white p-6 sm:p-7 shrink-0 relative pr-14">
              <button
                onClick={() => setSelectedResource(null)}
                aria-label="Close guide modal"
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#E30613] mb-1">
                {selectedResource.type}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white leading-snug">
                {selectedResource.title}
              </h3>
              <p className="text-xs text-gray-300 font-mono mt-1">
                {selectedResource.pages} · Macee BV Compliance Publications
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
              {downloadSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-2xl font-bold font-display text-gray-900">
                    Your Guide is on its Way!
                  </h4>
                  <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    We’ve prepared <strong>{selectedResource.downloadName}</strong>. A copy has been dispatched to <strong>{downloadEmail || 'your email'}</strong>.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSelectedResource(null);
                        setDownloadSuccess(false);
                      }}
                      className="px-8 py-3 rounded-[5px] bg-[#E30613] text-white text-sm font-semibold hover:bg-[#111827] transition-colors cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Publication Summary
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {selectedResource.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
                      Topics Included in this Whitepaper
                    </h4>
                    <div className="space-y-2 bg-[#F8FAFB] p-4 rounded-xl border border-gray-200">
                      {selectedResource.topics.map((top, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#E30613] shrink-0 mt-0.5" />
                          <span>{top}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleDownloadSubmit} className="pt-4 border-t border-gray-100 space-y-3">
                    <label className="block text-xs font-semibold text-gray-700">
                      Enter your work email for instant access:
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        required
                        placeholder="e.g. name@company.nl"
                        value={downloadEmail}
                        onChange={(e) => setDownloadEmail(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#E30613]"
                      />
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-[5px] bg-[#E30613] hover:bg-[#111827] text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

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
