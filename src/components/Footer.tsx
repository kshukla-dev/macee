import React from 'react';
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

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
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111827] text-white border-t border-gray-800">
      {/* Main Footer Container */}
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
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
                <span>Nieuwe Stationsstraat 10, 6811 KS Arnhem, The Netherlands</span>
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
                SNA NEN 4400-1 Certified
              </span>
              <span className="text-[11px] font-mono bg-white/10 text-white/90 px-2.5 py-1 rounded">
                IND Recognised Sponsor
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
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
              <a
                href="mailto:info@macee.com"
                aria-label="Email Macee"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E30613] transition-colors flex items-center justify-center text-white text-xs font-mono font-bold"
              >
                @
              </a>
            </div>
          </div>

          {/* Column 2: Information (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Information</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('about') : onNavigateSection('why-wfs')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('clients') : onNavigateSection('what-we-do')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Clients &amp; Certifications
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('professionals') : onNavigateSection('what-we-do')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Professionals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('projects') : onNavigateSection('jobs')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Projects &amp; Vacancies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('faq') : onNavigateSection('resources')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('contact') : onOpenConsultation()}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: For Candidates (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">For Candidates</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('projects') : onNavigateSection('jobs')}
                  className="hover:text-white transition-colors cursor-pointer text-left font-medium text-white/90"
                >
                  Search vacancies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('jobalert') : null}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Create a Job alert
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('open-application') : null}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Open application
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('professionals') : onNavigateSection('what-we-do')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contracting &amp; Freelance (ZZP)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('professionals') : onNavigateSection('what-we-do')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Expats &amp; Visa Sponsorship (HSM)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Services & Solutions (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('clients') : onNavigateSection('what-we-do')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Clients Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('clients') : onNavigateSection('what-we-do')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contract Administration
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('risk-survey')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Compliance Risk Survey
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenConsultation}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide bg-[#E30613] hover:bg-white hover:text-[#111827] text-white px-3 py-1.5 rounded transition-colors cursor-pointer"
                >
                  Get in touch
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Area */}
        <div className="mt-14 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>
            Copyright © 2026 Macee BV | External Workforce Solutions
          </p>

          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer" onClick={onOpenConsultation}>
              Privacy Statement
            </span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer" onClick={onOpenConsultation}>
              Terms & Conditions
            </span>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
