import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import './HeaderNav.css';

interface HeaderProps {
  onOpenConsultation: () => void;
  onSelectResource: (resourceId: string) => void;
  onNavigateSection: (sectionId: string) => void;
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  currentPage?: string;
  onNavigatePage?: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenConsultation,
  onNavigateSection,
  onToggleMobileMenu,
  isMobileMenuOpen,
  currentPage = 'home',
  onNavigatePage,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-all duration-300 ${scrolled ? 'shadow-md py-2.5' : 'border-b border-gray-100 py-3.5'
        }`}
    >
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigatePage) {
              onNavigatePage('home');
            } else {
              onNavigateSection('hero');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] rounded cursor-pointer"
        >
          <img
            src="/images/macee-logo.png"
            alt="Macee - External Workforce Solutions"
            className="h-9 sm:h-11 w-auto object-contain"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent && !parent.querySelector('.fallback-brand')) {
                const span = document.createElement('span');
                span.className = 'fallback-brand font-display font-bold text-2xl text-[#E30613] tracking-tight';
                span.innerText = 'MACEE';
                parent.appendChild(span);
              }
            }}
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">


          {/* About */}
          <button
            onClick={() => {
              if (onNavigatePage) {
                onNavigatePage('about');
              } else {
                onNavigateSection('why-wfs');
              }
            }}
            className={`nav-button hover:text-[#E30613] rounded-md ${currentPage === 'about' ? 'text-[#E30613] font-bold' : ''
              }`}
          >
            About Us
          </button>

          {/* Clients */}
          <button
            onClick={() => {
              if (onNavigatePage) {
                onNavigatePage('clients');
              } else {
                onNavigateSection('what-we-do');
              }
            }}
            className={`nav-button hover:text-[#E30613] rounded-md ${currentPage === 'clients' ? 'text-[#E30613] font-bold' : ''
              }`}
          >
            Clients
          </button>

          {/* Professionals */}
          <button
            onClick={() => {
              if (onNavigatePage) {
                onNavigatePage('professionals');
              } else {
                onNavigateSection('what-we-do');
              }
            }}
            className={`nav-button hover:text-[#E30613] rounded-md ${currentPage === 'professionals' ? 'text-[#E30613] font-bold' : ''
              }`}
          >
            Professionals
          </button>

          {/* Projects */}
          <button
            onClick={() => {
              if (onNavigatePage) {
                onNavigatePage('projects');
              } else {
                onNavigateSection('jobs');
              }
            }}
            className={`nav-button hover:text-[#E30613] rounded-md ${currentPage === 'projects' ? 'text-[#E30613] font-bold' : ''
              }`}
          >
            Projects
          </button>

          {/* FAQ & Guides */}
          <button
            onClick={() => {
              if (onNavigatePage) {
                onNavigatePage('faq');
              } else {
                onNavigateSection('resources');
              }
            }}
            className={`nav-button hover:text-[#E30613] rounded-md ${currentPage === 'faq' ? 'text-[#E30613] font-bold' : ''
              }`}
          >
            FAQ &amp; Guides
          </button>

          {/* Contact */}
          <button
            onClick={() => {
              if (onNavigatePage) {
                onNavigatePage('contact');
              } else {
                onNavigateSection('contact');
              }
            }}
            className={`nav-button hover:text-[#E30613] rounded-md ${currentPage === 'contact' ? 'text-[#E30613] font-bold' : ''
              }`}
          >
            Contact
          </button>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex items-center gap-2 bg-[#E30613] hover:bg-[#111827] text-white px-5 py-2.5 rounded-[5px] text-sm font-semibold shadow-sm transition-all duration-200 cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={onToggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden p-2 rounded-md text-[#E30613] hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
