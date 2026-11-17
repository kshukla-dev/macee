import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Search,
  CheckCircle2,
  Phone,
  Mail,
  Sparkles,
  Layers,
  FileQuestion
} from 'lucide-react';
import { JobalertBanner } from '../components/JobalertBanner';
import { ContactFormSection } from '../components/ContactFormSection';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { getFaqPageSchema } from '../data/seoSchemas';
import { getFullFaqList, getFaqCategories, AllFaqItem, FaqCategoryDef } from '../data/allFaqs';

interface FaqPageProps {
  onNavigate: (page: string) => void;
  onOpenConsultation?: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate, onOpenConsultation }) => {
  const { lang, t } = useLanguage();
  const categories = getFaqCategories(lang);
  const allFaqsList = getFullFaqList(lang);

  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allFaqsList.length };
    categories.forEach((cat) => {
      if (cat.key !== 'all') {
        counts[cat.key] = allFaqsList.filter((f) => f.categoryKey === cat.key).length;
      }
    });
    return counts;
  }, [allFaqsList, categories]);

  // Filter FAQs
  const filteredFaqs = useMemo(() => {
      return allFaqsList.filter((faq) => {
        const matchesCategory = selectedCategoryKey === 'all' || faq.categoryKey === selectedCategoryKey;
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !q ||
          faq.question.toLowerCase().includes(q) ||
          faq.answer.toLowerCase().includes(q) ||
        faq.categoryTitle.toLowerCase().includes(q) ||
          faq.tag.toLowerCase().includes(q);
        return matchesCategory && matchesSearch;
      });
  }, [allFaqsList, selectedCategoryKey, searchQuery]);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  // Carousel State for FAQ Category Cards on Mobile
  const [catSlide, setCatSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Exclude 'all' from swipeable cards, show as main toggle
  const visualCategories = categories.filter((c) => c.key !== 'all');
  const totalCatSlides = visualCategories.length;

  const handlePrevCat = () => {
    setCatSlide((prev) => (prev > 0 ? prev - 1 : totalCatSlides - 1));
  };

  const handleNextCat = () => {
    setCatSlide((prev) => (prev < totalCatSlides - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 45) {
      handleNextCat();
    } else if (distance < -45) {
      handlePrevCat();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

    const renderCategoryCard = (cat: FaqCategoryDef) => {
      const isSelected = selectedCategoryKey === cat.key;
      const count = categoryCounts[cat.key] || 0;
      return (
        <div
          key={cat.key}
          onClick={() => {
            setSelectedCategoryKey(isSelected ? 'all' : cat.key);
          }}
          className={`group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-xs hover:shadow-md transition-all duration-300 border-2 h-full flex flex-col ${isSelected
                ? 'border-[#E30613] ring-2 ring-[#E30613]/20 shadow-md'
                : 'border-transparent hover:border-gray-200'
        }`}
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 shrink-0">
            <img
              src={cat.image || '/uploads/Software-Development-2.jpg'}
              alt={cat.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.src = '/uploads/Software-Development-2.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-[#E30613] px-2.5 py-0.5 rounded-full shadow-xs">
              {count} {lang === 'NL' ? 'Vragen' : 'Questions'}
            </span>
            <span className="absolute top-3 right-3 text-[11px] font-semibold text-white/90 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md uppercase tracking-wider">
              {cat.page}
            </span>
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold font-display text-gray-900 group-hover:text-[#E30613] transition-colors leading-snug">
                {cat.title}
              </h3>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
            </div>
          </div>
        </div>
      );
    };

    const seoTitle =
      lang === 'NL'
        ? 'Veelgestelde Vragen & Kennisbank | Inhuur & Wet DBA | Macee'
        : 'FAQ & Knowledge Base | Contracting & Compliance | Macee';

    const seoDescription =
      lang === 'NL'
        ? 'Vind antwoorden over Macee’s externe inhuurdesk, detachering, ZZP-contracten, SNA NEN 4400-1 compliance, IND-kennismigrantenvisa en de 30%-regeling.'
        : 'Find answers about Macee’s external workforce desk, secondment, ZZP contracts, SNA NEN 4400-1 compliance, IND visa sponsorship, and the 30% tax ruling.';

    return (
      <div className="page_faq min-h-screen bg-[#F8FAFB]">
        {/* Dynamic SEO & JSON-LD FAQPage Schema */}
        <SEO
          title={seoTitle}
          description={seoDescription}
          canonicalPath="/faq"
          lang={lang}
          schema={getFaqPageSchema(
            allFaqsList.map((f) => ({ question: f.question, answer: f.answer })),
            lang
          )}
        />

        {/* 1. Hero Banner */}
        <section
          className="relative py-20 sm:py-28 bg-cover bg-center text-white overflow-hidden"
          style={{ backgroundImage: `url("/uploads/PM-2.jpg")` }}
        >
          <div className="absolute inset-0 bg-[#2a0209]/85 backdrop-blur-[2px]" />

          {/* Ambient glow */}
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#E30613]/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-black/40 blur-3xl pointer-events-none" />

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white/95 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-xs mb-4">
                <HelpCircle className="w-3.5 h-3.5 text-[#E30613]" />
                <span>
                  {lang === 'NL'
                    ? 'Complete Kennisbank & Veelgestelde Vragen'
                    : 'Complete Knowledge Base & FAQs'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-tight">
                {lang === 'NL' ? (
                  <>Veelgestelde <span className="text-[#E30613]">Vragen</span></>
                ) : (
                  <>Frequently Asked <span className="text-[#E30613]">Questions</span></>
                )}
              </h1>

                <p className="mt-4 text-base sm:text-xl text-[#f8dada] font-medium max-w-3xl mx-auto leading-relaxed">
                  {lang === 'NL'
                    ? 'Alles wat u wilt weten over Macee op één plek: over onze organisatie, voor opdrachtgevers, professionals, vacatures, compliance en wetgeving.'
                    : 'Everything you need to know about Macee in one place: overview, clients & hiring, professionals, vacancies, compliance, and regulations.'}
                </p>

                {/* Quick Stats Pill Bar */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-white/90">
                  <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full">
                    <FileQuestion className="w-3.5 h-3.5 text-[#E30613]" />
                    {allFaqsList.length} {lang === 'NL' ? 'totaal vragen beantwoord' : 'total questions answered'}
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E30613]" />
                    {lang === 'NL' ? 'Alle pagina’s gedekt' : 'All pages & services covered'}
                  </span>
                </div>
            </div>
        </section>

        {/* 2. FAQ Section */}
            <section id="faq-section" className="py-12 sm:py-20">
              <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Search & Topic Filters Bar */}
                    <div className="mb-10">
                      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-[#E30613]">
                            {lang === 'NL' ? 'Zoek op Onderwerp' : 'Explore by Topic'}
                          </span>
                          <h2 className="text-2xl sm:text-4xl font-bold font-display text-gray-900 mt-1">
                            {lang === 'NL' ? 'Kies een categorie of zoek direct' : 'Select a Category or Search Below'}
                          </h2>
                        </div>

                        {/* Search Bar */}
                          <div className="w-full sm:w-80 relative">
                            <input
                              type="text"
                              placeholder={lang === 'NL' ? 'Zoek in alle vragen & antwoorden...' : 'Search all questions & answers...'}
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm bg-white shadow-2xs focus:outline-none focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/20"
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                            {searchQuery && (
                              <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-gray-600 cursor-pointer font-bold"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Category Quick Filter Pills (Top Horizontal Navigation) */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
                          <button
                            type="button"
                            onClick={() => setSelectedCategoryKey('all')}
                            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer ${selectedCategoryKey === 'all'
                                ? 'bg-[#E30613] text-white shadow-sm'
                                : 'bg-white text-gray-700 border border-gray-200 hover:border-[#E30613] hover:text-[#E30613]'
                              }`}
                          >
                            {lang === 'NL' ? 'Alle Vragen' : 'All Questions'} ({allFaqsList.length})
                          </button>
                          {visualCategories.map((cat) => {
                            const isSelected = selectedCategoryKey === cat.key;
                            const count = categoryCounts[cat.key] || 0;
                            return (
                              <button
                                key={cat.key}
                                type="button"
                                onClick={() => setSelectedCategoryKey(cat.key)}
                                className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${isSelected
                                    ? 'bg-[#E30613] text-white shadow-sm'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#E30613] hover:text-[#E30613]'
                                  }`}
                              >
                                <span>{cat.title}</span>
                                <span
                                  className={`text-[11px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                                    }`}
                                >
                                  {count}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Mobile View: Swipeable Carousel */}
                        <div
                          className="md:hidden relative overflow-hidden mb-8"
                          onTouchStart={handleTouchStart}
                          onTouchMove={handleTouchMove}
                          onTouchEnd={handleTouchEnd}
                        >
                              <div className="flex items-center justify-between mb-3 px-1">
                                <span className="text-xs font-bold text-gray-500">
                                  {lang === 'NL' ? 'Veeg voor onderwerpen' : 'Swipe for categories'}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-gray-500 bg-white border border-gray-200/80 px-2.5 py-1 rounded-full shadow-2xs">
                                    <span className="text-[#111827]">{catSlide + 1}</span> / {totalCatSlides}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={handlePrevCat}
                                    aria-label="Previous category"
                                    className="w-8 h-8 rounded-full bg-white border border-gray-200 hover:border-[#E30613] hover:bg-[#E30613] text-[#111827] hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs cursor-pointer"
                                  >
                                    <ChevronLeft size={15} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={handleNextCat}
                                    aria-label="Next category"
                                    className="w-8 h-8 rounded-full bg-white border border-gray-200 hover:border-[#E30613] hover:bg-[#E30613] text-[#111827] hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs cursor-pointer"
                                  >
                                    <ChevronRight size={15} />
                                  </button>
                                </div>
                              </div>

                              {/* Slides Track */}
                              <div
                                className="flex items-stretch transition-transform duration-500 ease-out"
                                style={{ transform: `translateX(-${catSlide * 100}%)` }}
                              >
                                    {visualCategories.map((cat) => (
                                      <div key={cat.key} className="w-full shrink-0 px-1 flex flex-col">
                                        {renderCategoryCard(cat)}
                                      </div>
                                    ))}
                                  </div>
                          </div>

                            {/* Desktop View: Grid of Category Visual Cards */}
                            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                              {visualCategories.slice(0, 4).map((cat) => renderCategoryCard(cat))}
                            </div>
                          </div>

                              {/* Active Filter Indicator / Reset */}
                              {(selectedCategoryKey !== 'all' || searchQuery) && (
                                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
                                  <div className="flex items-center gap-3">
                                    <button
                                      onClick={() => {
                                        setSelectedCategoryKey('all');
                                        setSearchQuery('');
                                      }}
                                      className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#E30613] hover:underline cursor-pointer"
                                    >
                                      <ArrowLeft className="w-4 h-4" />
                                      <span>{lang === 'NL' ? 'Toon alle vragen' : 'Show all questions'}</span>
                                    </button>
                                    <span className="text-gray-300">|</span>
                                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                                      {lang === 'NL'
                                        ? `${filteredFaqs.length} vragen gevonden`
                                        : `${filteredFaqs.length} questions found`}
                                      {selectedCategoryKey !== 'all' && (
                                        <> in <strong>{categories.find((c) => c.key === selectedCategoryKey)?.title}</strong></>
                                      )}
                                      {searchQuery && (
                                        <> matching "<strong>{searchQuery}</strong>"</>
                                      )}
                                    </span>
                                  </div>

                                  <button
                                    onClick={() => {
                                      setSelectedCategoryKey('all');
                                      setSearchQuery('');
                                    }}
                                    className="text-xs font-semibold text-gray-500 hover:text-[#E30613] cursor-pointer"
                                  >
                                    {lang === 'NL' ? 'Filters wissen' : 'Clear filters'}
                                  </button>
                                </div>
                              )}

                              {/* Accordion List */}
                                <div className="space-y-4 max-w-5xl mx-auto">
                                  {filteredFaqs.length === 0 ? (
                                      <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8 shadow-xs">
                                        <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                        <h4 className="text-lg font-bold font-display text-gray-900 mb-1">
                                          {lang === 'NL'
                                            ? 'Geen vragen gevonden voor deze zoekopdracht'
                                            : 'No questions matched your search criteria'}
                                        </h4>
                                          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
                                            {lang === 'NL'
                                              ? 'Probeer een andere zoekterm of selecteer een andere categorie hierboven.'
                                              : 'Try adjusting your search terms or filter by a different category above.'}
                                          </p>
                                          <button
                                            onClick={() => {
                                              setSelectedCategoryKey('all');
                                              setSearchQuery('');
                                            }}
                                            className="mt-5 px-6 py-2.5 rounded-lg bg-[#E30613] text-white text-xs font-bold hover:bg-[#111827] transition-colors cursor-pointer"
                                          >
                                            {lang === 'NL' ? 'Herstel zoekopdracht' : 'Reset Search'}
                                          </button>
                                      </div>
                                      ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                                      return (
                                      <div
                                        key={faq.id}
                                        className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white shadow-2xs hover:shadow-xs ${isOpen
                                            ? 'border-[#E30613]/50 ring-1 ring-[#E30613]/10'
                                            : 'border-gray-200 hover:border-gray-300'
                                          }`}
                                      >
                                        <button
                                          onClick={() => toggleFaq(faq.id)}
                                          className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-gray-50/70 transition-colors"
                                        >
                                              <div className="space-y-1.5 flex-1 pr-2">
                                                <div className="flex flex-wrap items-center gap-2">
                                                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E30613] bg-[#f8dada]/60 px-2 py-0.5 rounded-full">
                                                    {faq.categoryTitle}
                                                  </span>
                                                  <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                                    {faq.tag}
                                                  </span>
                                                </div>
                                                <h4 className="text-base sm:text-lg font-bold font-display text-gray-900 leading-snug">
                                                  {faq.question}
                                                </h4>
                                              </div>

                                              <div
                                                className={`p-2 rounded-full border shrink-0 transition-transform duration-200 ${isOpen
                                                    ? 'rotate-180 text-[#E30613] bg-[#f8dada]/40 border-[#E30613]/30'
                                                    : 'text-gray-500 bg-[#F8FAFB] border-gray-100'
                                                  }`}
                                              >
                                                <ChevronDown className="w-5 h-5" />
                                              </div>
                                            </button>

                                            {isOpen && (
                                                <div className="px-5 sm:px-6 pb-6 pt-3 text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line border-t border-gray-100 bg-[#F8FAFB]/50">
                                                  {faq.answer}
                                                </div>
                    )}
                                              </div>
                                            );
              })
            )}
                                          </div>

                                          {/* Direct Question Assistance Card */}
                                            <div className="mt-14 max-w-5xl mx-auto bg-white rounded-2xl border border-gray-200 p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                                              <div className="space-y-2 text-center sm:text-left">
                                                <span className="text-xs font-bold uppercase tracking-wider text-[#E30613]">
                                                  {lang === 'NL' ? 'Persoonlijk Advies' : 'Direct Support'}
                                                </span>
                                                <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-900">
                                                  {lang === 'NL' ? 'Heeft u een specifieke vraag?' : 'Still have a question?'}
                                                </h3>
                                                <p className="text-sm text-gray-600 max-w-md">
                                                  {lang === 'NL'
                                                    ? 'Neem direct contact op met onze specialisten voor maatwerkadvies over detachering, Wet DBA compliance of salarisadministratie.'
                                                    : 'Reach out to our workforce specialists for tailored advice on contracting, payroll, or visa sponsorship.'}
                                                </p>
                                              </div>

                                              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                                                <a
                                                  href="tel:+310267851010"
                                                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#111827] text-white text-xs font-bold hover:bg-black transition-colors"
                                                >
                                                  <Phone className="w-4 h-4 text-[#E30613]" />
                                                  <span>+31 (0) 26 785 1010</span>
                                                </a>

                                                <button
                                                  onClick={() => onNavigate('contact')}
                                                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#E30613] text-white text-xs font-bold hover:bg-[#111827] transition-colors cursor-pointer"
                                                >
                                                  <span>{lang === 'NL' ? 'Contact Opnemen' : 'Contact Our Team'}</span>
                                                  <ArrowRight className="w-4 h-4" />
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </section>

                                        {/* 3. Bottom Jobalert Banner */}
                                        <JobalertBanner
                                          onNavigate={onNavigate}
                                          bgImage="/uploads/Hightech-Industry-3.jpg"
                                        />

                                        {/* 4. Contact Form Section */}
                                        <ContactFormSection title={lang === 'NL' ? 'Stel Uw Vraag aan Ons Team' : 'Get in Touch with Us'} />
                                      </div>
                                      );
};
