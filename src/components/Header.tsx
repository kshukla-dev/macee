import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import './HeaderNav.css';

interface HeaderProps {
  onOpenConsultation: () => void;
  onSelectService: (serviceId: string) => void;
  onSelectResource: (resourceId: string) => void;
  onNavigateSection: (sectionId: string) => void;
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  currentPage?: string;
  onNavigatePage?: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenConsultation,
  onSelectService,
  onNavigateSection,
  onToggleMobileMenu,
  isMobileMenuOpen,
  currentPage = 'home',
  onNavigatePage,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
          className="flex items-center gap-3 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D454C] rounded cursor-pointer"
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
                span.className = 'fallback-brand font-display font-bold text-2xl text-[#1D454C] tracking-tight';
                span.innerText = 'MACEE';
                parent.appendChild(span);
              }
            }}
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">


          {/* About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('about')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => {
                if (onNavigatePage) {
                  onNavigatePage('about');
                } else {
                  onNavigateSection('why-wfs');
                }
              }}
              className={`nav-button rounded-md group ${
                currentPage === 'about' ? 'text-[#6B0D43] font-bold' : 'hover:text-[#1D454C]'
              }`}
            >
              <span>About Us</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#1D454C] transition-transform duration-200" />
            </button>

            {activeDropdown === 'about' && (
              <div className="absolute top-full left-0 w-52 bg-white border border-gray-100 shadow-xl rounded-md py-2 animate-fadeIn z-50">
                <button
                  onClick={() => {
                    if (onNavigatePage) {
                      onNavigatePage('about');
                    } else {
                      onNavigateSection('why-wfs');
                    }
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-[#F8FAFB] hover:text-[#1D454C] font-medium transition-colors cursor-pointer"
                >
                  About Us Overview
                </button>
                <button
                  onClick={() => {
                    if (onNavigatePage) {
                      onNavigatePage('about');
                    } else {
                      onNavigateSection('why-wfs');
                    }
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-[#F8FAFB] hover:text-[#1D454C] font-medium transition-colors cursor-pointer"
                >
                  What We Do & How We Work
                </button>
                <button
                  onClick={() => {
                    if (onNavigatePage) {
                      onNavigatePage('about');
                    } else {
                      onNavigateSection('why-wfs');
                    }
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-[#F8FAFB] hover:text-[#1D454C] font-medium transition-colors cursor-pointer"
                >
                  Team MACEE
                </button>
              </div>
            )}
          </div>

          {/* Clients Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('clients')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => onNavigateSection('what-we-do')}
              className="nav-button hover:text-[#1D454C] rounded-md group"
            >
              <span>Clients</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#1D454C] transition-transform duration-200" />
            </button>

            {activeDropdown === 'clients' && (
              <div className="absolute top-full left-0 w-64 bg-white border border-gray-100 shadow-xl rounded-md py-2 animate-fadeIn z-50">
                <button
                  onClick={() => {
                    onSelectService('recruitment-staffing');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-[#F8FAFB] hover:text-[#1D454C] font-medium transition-colors cursor-pointer"
                >
                  Recruitment & Staffing
                </button>
                <button
                  onClick={() => {
                    onSelectService('contract-administration');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-[#F8FAFB] hover:text-[#1D454C] font-medium transition-colors cursor-pointer"
                >
                  Contract Administration
                </button>
                <button
                  onClick={() => {
                    onSelectService('compliancy-support');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-[#F8FAFB] hover:text-[#1D454C] font-medium transition-colors cursor-pointer"
                >
                  Compliancy & Support
                </button>
                <button
                  onClick={() => {
                    onSelectService('it-outsourcing');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-[#F8FAFB] hover:text-[#1D454C] font-medium transition-colors cursor-pointer"
                >
                  Outsourcing & Project Services
                </button>
                <button
                  onClick={() => {
                    onNavigateSection('resources');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-[#F8FAFB] hover:text-[#1D454C] font-medium transition-colors cursor-pointer border-t border-gray-100"
                >
                  SNA / NEN 4400-1 Certifications
                </button>
              </div>
            )}
          </div>

          {/* Professionals Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('professionals')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => onNavigateSection('what-we-do')}
              className="nav-button hover:text-[#1D454C] rounded-md group"
            >
              <span>Professionals</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#1D454C] transition-transform duration-200" />
            </button>

            {activeDropdown === 'professionals' && (
              <div className="absolute top-full left-0 w-64 bg-white border border-gray-100 shadow-xl rounded-md py-2 animate-fadeIn z-50">
                <button
                  onClick={() => {
                    onSelectService('contracting-secondment');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-[#F8FAFB] hover:text-[#1D454C] font-medium transition-colors cursor-pointer"
                >
                  Contracting & Secondment
                </button>
                <button
                  onClick={() => {
                    onSelectService('freelance-zzp');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-[#F8FAFB] hover:text-[#1D454C] font-medium transition-colors cursor-pointer"
                >
                  Freelance / ZZP
                </button>
                <button
                  onClick={() => {
                    onSelectService('hsm-expats');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-[#F8FAFB] hover:text-[#1D454C] font-medium transition-colors cursor-pointer"
                >
                  HSM / Expats / Visa Sponsorship
                </button>
                <button
                  onClick={() => {
                    onSelectService('recruitment-staffing');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-[#F8FAFB] hover:text-[#1D454C] font-medium transition-colors cursor-pointer"
                >
                  Permanent Positions
                </button>
              </div>
            )}
          </div>

          {/* Industries Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('industries')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => onNavigateSection('why-wfs')}
              className="nav-button hover:text-[#1D454C] rounded-md group"
            >
              <span>Industries</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#1D454C] transition-transform duration-200" />
            </button>

            {activeDropdown === 'industries' && (
              <div className="absolute top-full left-0 w-60 bg-white border border-gray-100 shadow-xl rounded-md py-2 animate-fadeIn z-50">
                <button
                  onClick={() => {
                    onNavigateSection('why-wfs');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-[#F8FAFB] hover:text-[#1D454C] font-medium transition-colors cursor-pointer"
                >
                  ICT & Software Development
                </button>
                <button
                  onClick={() => {
                    onNavigateSection('why-wfs');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-[#F8FAFB] hover:text-[#1D454C] font-medium transition-colors cursor-pointer"
                >
                  Banking / Fintech / Finance
                </button>
                <button
                  onClick={() => {
                    onNavigateSection('why-wfs');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-[#F8FAFB] hover:text-[#1D454C] font-medium transition-colors cursor-pointer"
                >
                  High Tech Industry (Brainport)
                </button>
                <button
                  onClick={() => {
                    onNavigateSection('why-wfs');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-[#F8FAFB] hover:text-[#1D454C] font-medium transition-colors cursor-pointer"
                >
                  Government & Public Sector
                </button>
                <button
                  onClick={() => {
                    onNavigateSection('why-wfs');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-[#F8FAFB] hover:text-[#1D454C] font-medium transition-colors cursor-pointer"
                >
                  Telecom & Energy / Oil & Gas
                </button>
              </div>
            )}
          </div>

          {/* Projects / Assignments */}
          <button
            onClick={() => onNavigateSection('jobs')}
            className="nav-button hover:text-[#1D454C] rounded-md"
          >
            Projects
          </button>

          {/* Resources & FAQ */}
          <button
            onClick={() => onNavigateSection('resources')}
            className="nav-button hover:text-[#1D454C] rounded-md"
          >
            FAQ & Guides
          </button>


        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex items-center gap-2 bg-[#6B0D43] hover:bg-[#1D454C] text-white px-5 py-2.5 rounded-[5px] text-sm font-semibold shadow-sm transition-all duration-200 cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={onToggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden p-2 rounded-md text-[#1D454C] hover:bg-gray-100 transition-colors cursor-pointer"
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
