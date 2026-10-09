import React from 'react';
import { ArrowUp } from 'lucide-react';

interface MaceeFooterProps {
  onNavigate: (page: string) => void;
}

export const MaceeFooter: React.FC<MaceeFooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2a0209] text-white pt-16 pb-10 border-t-2 border-[#ff0000]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo */}
          <div className="footercolumn">
            <div className="site-logo mb-6" style={{ filter: 'brightness(0) invert(1)' }}>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('home');
                }}
                title="Go to homepage"
              >
                <img
                  loading="lazy"
                  src="/uploads/Macee-landscape-tricolore.png"
                  alt="Macee logo"
                  className="h-16 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'https://www.macee.com/uploads/Macee-landscape-tricolore.png';
                  }}
                />
              </a>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed max-w-xs">
              Macee is a leading broker and staffing specialist for flexible IT professionals, international contractors, and expats.
            </p>
          </div>

          {/* Column 2: Contact */}
          <div className="footercolumn">
            <h2 className="text-[#ff0000] text-xl font-bold font-heading mb-4">
              Contact
            </h2>
            <div className="text-sm text-gray-200 space-y-2 leading-relaxed">
              <p className="font-semibold text-white">Macee BV</p>
              <p>Nieuwe Stationsstraat 10<br />6811 KS Arnhem<br />The Netherlands</p>
              <p className="pt-2">
                <a href="mailto:info@macee.com" className="text-white hover:text-[#f8dada] block transition-colors">
                  <span className="font-bold">M: </span>info@macee.com
                </a>
                <a href="tel:+31267440024" className="text-white hover:text-[#f8dada] block transition-colors">
                  <span className="font-bold">T: </span>+31 (0)26 744 0024
                </a>
              </p>
            </div>
          </div>

          {/* Column 3: Information */}
          <div className="footercolumn">
            <h2 className="text-[#ff0000] text-xl font-bold font-heading mb-4">
              Information
            </h2>
            <ul className="space-y-2.5 text-sm list-none p-0 m-0">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-white hover:text-[#f8dada] transition-colors cursor-pointer"
                >
                  About us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('clients')}
                  className="text-white hover:text-[#f8dada] transition-colors cursor-pointer"
                >
                  Clients & Certifications
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('professionals')}
                  className="text-white hover:text-[#f8dada] transition-colors cursor-pointer"
                >
                  Professionals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="text-white hover:text-[#f8dada] transition-colors cursor-pointer"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-white hover:text-[#f8dada] transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: For candidates */}
          <div className="footercolumn">
            <h2 className="text-[#ff0000] text-xl font-bold font-heading mb-4">
              For candidates
            </h2>
            <ul className="space-y-2.5 text-sm list-none p-0 m-0">
              <li>
                <button
                  onClick={() => onNavigate('assignments')}
                  className="text-white hover:text-[#f8dada] transition-colors cursor-pointer"
                >
                  Search vacancies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('jobalert')}
                  className="text-white hover:text-[#f8dada] transition-colors cursor-pointer"
                >
                  Create a jobalert
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-white hover:text-[#f8dada] transition-colors cursor-pointer"
                >
                  Open application
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Subfooter: Certifications & Socials */}
        <div className="mt-14 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <img
              src="/build/images/sna-nen-logo.png"
              alt="SNA NEN-4400-1 certified"
              className="h-10 sm:h-12 w-auto object-contain bg-white/10 p-1 rounded"
              onError={(e) => {
                e.currentTarget.src = 'https://www.macee.com/build/images/sna-nen-logo.png';
              }}
            />
            <span className="text-xs text-gray-400">
              NEN-4400-1 Certified & IND Recognised Sponsor
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>Copyright 2026 Macee BV</span>
            <span>·</span>
            <button
              onClick={() => onNavigate('contact')}
              className="text-white hover:underline cursor-pointer"
            >
              Contact
            </button>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-white hover:text-[#f8dada] transition-colors cursor-pointer font-bold"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
