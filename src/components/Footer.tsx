import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenConsultation: () => void;
  onNavigateSection: (sectionId: string) => void;
  onNavigatePage?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenConsultation,
  onNavigateSection,
  onNavigatePage,
}) => {
  const { lang, t } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111827] text-white border-t border-gray-800">
      {/* Main Footer Container */}
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand & Office Location (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="inline-block">
              <img
                src="/images/macee-logo-white.png"
                alt="Macee BV - External Workforce Solutions"
                className="h-14 sm:h-16 w-auto object-contain drop-shadow-sm"
              />
            </div>

            <div className="space-y-2 text-sm text-gray-300">
              <p className="font-semibold text-white text-base">Macee BV</p>
              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-[#E30613] shrink-0 mt-0.5" />
                <span>
                  {lang === 'NL'
                    ? 'Nieuwe Stationsstraat 10, 6811 KS Arnhem, Nederland'
                    : 'Nieuwe Stationsstraat 10, 6811 KS Arnhem, The Netherlands'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E30613] shrink-0" />
                <a href="tel:+310267440024" className="hover:text-white transition-colors">
                  +31 (0)26 744 0024
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E30613] shrink-0" />
                <a href="mailto:info@macee.com" className="hover:text-white transition-colors">
                  info@macee.com
                </a>
              </div>
            </div>

            {/* Certifications micro badges */}
            <div className="pt-2 flex items-center gap-2">
              <span className="text-[11px] font-mono bg-white/10 text-white/90 px-2.5 py-1 rounded">
                {lang === 'NL' ? 'SNA NEN 4400-1 Gecertificeerd' : 'SNA NEN 4400-1 Certified'}
              </span>
              <span className="text-[11px] font-mono bg-white/10 text-white/90 px-2.5 py-1 rounded">
                {lang === 'NL' ? 'IND Erkend Referent' : 'IND Recognised Sponsor'}
              </span>
            </div>
          </div>

          {/* Column 2: Information (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.information')}
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('about') : onNavigateSection('why-wfs')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('clients') : onNavigateSection('what-we-do')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('nav.clients')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('professionals') : onNavigateSection('what-we-do')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('nav.professionals')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('projects') : onNavigateSection('jobs')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('nav.projects')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('faq') : onNavigateSection('resources')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('nav.faq')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('contact') : onOpenConsultation()}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: For Candidates (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.forCandidates')}
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('projects') : onNavigateSection('jobs')}
                  className="hover:text-white transition-colors cursor-pointer text-left font-medium text-white/90"
                >
                  {t('footer.searchVacancies')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('jobalert') : null}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('footer.createJobalert')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('open-application') : null}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('footer.openApplication')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('professionals') : onNavigateSection('what-we-do')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('footer.contracting')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('professionals') : onNavigateSection('what-we-do')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('footer.expats')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Services & Solutions (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.services')}
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('clients') : onNavigateSection('what-we-do')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('footer.clientsOverview')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('clients') : onNavigateSection('what-we-do')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('footer.contractAdmin')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('risk-survey')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('footer.complianceSurvey')}
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenConsultation}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide bg-[#E30613] hover:bg-white hover:text-[#111827] text-white px-3 py-1.5 rounded transition-colors cursor-pointer"
                >
                  {t('footer.getInTouch')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Area: Copyright, SNA NEN Certification Logo & Socials */}
        <div className="mt-6 pt-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            {t('footer.copyright')}
          </p>

          <div className="flex items-center gap-6">
            {/* Official SNA NEN 4400-1 & ISO 9001 Certification Logo */}
            <a
              href="https://www.normeringarbeid.nl"
              target="_blank"
              rel="noopener noreferrer"
              title="Stichting Normering Arbeid - SNA NEN 4400-1 & ISO 9001 Certified"
              className="flex items-center hover:opacity-100 opacity-90 transition-opacity"
            >
              <img
                src="/images/sna-nen-logo.png"
                alt="SNA NEN 4400-1 & ISO 9001 Certified"
                className="h-8 sm:h-9 w-auto object-contain brightness-125 contrast-125"
                onError={(e) => {
                  e.currentTarget.src = 'https://www.macee.com/build/images/sna-nen-logo.png';
                }}
              />
            </a>

            {/* Social Icons (LinkedIn & Email) */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://www.linkedin.com/company/macee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E30613] transition-colors flex items-center justify-center text-white"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button (Sticky bottom-right when scrolled down) */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
        className={`fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-[#E30613] hover:bg-[#111827] text-white shadow-2xl shadow-black/50 border border-white/20 transition-all duration-300 flex items-center justify-center cursor-pointer group hover:scale-110 active:scale-95 ${showScrollTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
      >
        <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
      </button>
    </footer>
  );
};

