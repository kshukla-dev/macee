import React, { useState } from 'react';
import { Search, Star, ArrowRight } from 'lucide-react';
import { JobalertBanner } from '../components/JobalertBanner';
import { ContactFormSection } from '../components/ContactFormSection';
import homeData from '../data/homeData.json';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onSearch: (keyword: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [zipcode, setZipcode] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword || zipcode);
  };

  return (
    <div className="page_home">
      {/* 1. Hero Search Section with Background /uploads/macee1.png */}
      <section
        className="relative py-24 sm:py-32 bg-cover bg-center text-white"
        style={{ backgroundImage: `url("/uploads/macee1.png")` }}
      >
        <div className="absolute inset-0 bg-[#2a0209]/65 backdrop-blur-[1px]" />

        <div className="max-w-[1050px] mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight mb-8">
            {homeData.hero.title}
          </h1>

          {/* Search Box */}
          <div className="bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-2xl max-w-3xl mx-auto border border-gray-100">
            <form onSubmit={handleHeroSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder={homeData.hero.keywordPlaceholder}
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:border-[#e8382e]"
                />
              </div>
              <div className="sm:w-44">
                <input
                  type="text"
                  placeholder={homeData.hero.zipcodePlaceholder}
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:border-[#e8382e]"
                />
              </div>
              <button
                type="submit"
                className="is-btn text-base px-8 py-3 shrink-0"
              >
                <span>{homeData.hero.searchButtonText}</span>
                <Search className="w-4 h-4 ml-1.5" />
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => onNavigate('assignments')}
                className="text-xs sm:text-sm font-bold text-[#e8382e] hover:underline cursor-pointer"
              >
                {homeData.hero.viewVacanciesText}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "Think Better. Recruit Smarter." Section */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-gray-900 leading-tight">
              {homeData.intro.title}&nbsp;
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed text-left sm:text-center">
              {homeData.intro.paragraphs.map((para, idx) => (
                <p key={idx} className={idx === homeData.intro.paragraphs.length - 1 ? 'font-semibold text-gray-900' : ''}>
                  {para}
                </p>
              ))}
            </div>

            {/* Trustpilot Banner */}
            <div className="pt-6">
              <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-[#f8dada]/50 border border-[#efc9cb] px-6 py-3.5 rounded-2xl">
                <div className="flex items-center gap-1 text-[#00b67a]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="text-xs sm:text-sm text-gray-800">
                  <span className="font-bold">{homeData.intro.trustpilot.title}</span> — {homeData.intro.trustpilot.subtitle}
                </div>
              </div>
            </div>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {homeData.cards.map((card, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate('assignments')}
                className="group cursor-pointer rounded-[25px] overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = card.fallbackImage;
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-[#e8382e] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {card.badge}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 group-hover:text-[#e8382e] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {card.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-sm font-bold text-[#e8382e]">
                    <span>{card.linkText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Jobalert CTA Banner */}
      <JobalertBanner onNavigate={onNavigate} bgImage="/uploads/PM-2.jpg" />

      {/* 4. Contact Form Section */}
      <ContactFormSection title="Get in contact with us" />
    </div>
  );
};
