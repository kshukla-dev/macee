import React, { useState } from 'react';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import './HeaderNav.css';

interface MaceeHeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  lang: 'EN' | 'NL';
  onToggleLang: (lang: 'EN' | 'NL') => void;
  onOpenSearch: () => void;
}

export const MaceeHeader: React.FC<MaceeHeaderProps> = ({
  currentPage,
  onNavigate,
  lang,
  onToggleLang,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clientsDropdown, setClientsDropdown] = useState(false);

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setClientsDropdown(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-xs">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo */}
          <div className="site-logo shrink-0">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNav('home');
              }}
              title="Go to homepage"
              className="block cursor-pointer"
            >
              <img
                src="/uploads/Macee-landscape-tricolore.png"
                alt="Macee logo"
                className="h-14 sm:h-16 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = 'https://www.macee.com/uploads/Macee-landscape-tricolore.png';
                }}
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 header-nav">
            <ul className="flex items-center space-x-1 text-sm font-bold text-black list-none m-0 p-0">
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    currentPage === 'about'
                      ? 'bg-[#e8382e] text-white'
                      : 'text-black hover:bg-gray-100'
                  }`}
                >
                  About Us
                </button>
              </li>

              {/* Clients with Submenu */}
              <li
                className="relative"
                onMouseEnter={() => setClientsDropdown(true)}
                onMouseLeave={() => setClientsDropdown(false)}
              >
                <div className="flex items-center">
                  <button
                    onClick={() => handleNav('clients')}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                      currentPage === 'clients'
                        ? 'bg-[#e8382e] text-white'
                        : 'text-black hover:bg-gray-100'
                    }`}
                  >
                    <span>Clients</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {clientsDropdown && (
                  <ul className="absolute top-full left-0 w-48 bg-white border border-gray-200 shadow-lg rounded-lg py-2 mt-0 list-none z-50">
                    <li>
                      <button
                        onClick={() => handleNav('clients')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#f8dada] hover:text-[#e8382e] transition-colors cursor-pointer"
                      >
                        Clients Overview
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleNav('clients')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#f8dada] hover:text-[#e8382e] transition-colors cursor-pointer"
                      >
                        Certifications
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <button
                  onClick={() => handleNav('professionals')}
                  className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    currentPage === 'professionals'
                      ? 'bg-[#e8382e] text-white'
                      : 'text-black hover:bg-gray-100'
                  }`}
                >
                  Professionals
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleNav('assignments')}
                  className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    currentPage === 'assignments'
                      ? 'bg-[#e8382e] text-white'
                      : 'text-black hover:bg-gray-100'
                  }`}
                >
                  Projects
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleNav('faq')}
                  className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    currentPage === 'faq'
                      ? 'bg-[#e8382e] text-white'
                      : 'text-black hover:bg-gray-100'
                  }`}
                >
                  FAQ
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    currentPage === 'contact'
                      ? 'bg-[#e8382e] text-white'
                      : 'text-black hover:bg-gray-100'
                  }`}
                >
                  Contact
                </button>
              </li>
            </ul>

            {/* Language Switcher */}
            <div className="flex items-center pl-3 border-l border-gray-200 text-xs font-bold text-gray-700 space-x-1.5">
              <button
                onClick={() => onToggleLang('NL')}
                className={`px-1.5 py-1 rounded cursor-pointer ${
                  lang === 'NL' ? 'text-[#e8382e] font-extrabold underline' : 'hover:text-black'
                }`}
              >
                NL
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => onToggleLang('EN')}
                className={`px-1.5 py-1 rounded cursor-pointer ${
                  lang === 'EN' ? 'text-[#e8382e] font-extrabold underline' : 'hover:text-black'
                }`}
              >
                EN
              </button>
            </div>

            {/* Jobalert Button */}
            <button
              onClick={() => handleNav('jobalert')}
              className={`ml-3 px-4 py-2 rounded-[10px] text-xs font-bold font-heading transition-all cursor-pointer shadow-xs ${
                currentPage === 'jobalert'
                  ? 'bg-[#2a0209] text-white'
                  : 'bg-[#e8382e] text-white hover:bg-[#c9241b]'
              }`}
            >
              Jobalert
            </button>

            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              title="Search"
              className="p-2 ml-1 text-gray-600 hover:text-[#e8382e] transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>
          </nav>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 text-gray-700 hover:text-[#e8382e]"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-[#e8382e] rounded-md"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          <button
            onClick={() => handleNav('home')}
            className="w-full text-left py-2.5 px-3 rounded-lg font-bold text-gray-900 hover:bg-gray-50"
          >
            Home
          </button>
          <button
            onClick={() => handleNav('about')}
            className="w-full text-left py-2.5 px-3 rounded-lg font-bold text-gray-900 hover:bg-gray-50"
          >
            About Us
          </button>
          <button
            onClick={() => handleNav('clients')}
            className="w-full text-left py-2.5 px-3 rounded-lg font-bold text-gray-900 hover:bg-gray-50"
          >
            Clients & Certifications
          </button>
          <button
            onClick={() => handleNav('professionals')}
            className="w-full text-left py-2.5 px-3 rounded-lg font-bold text-gray-900 hover:bg-gray-50"
          >
            Professionals
          </button>
          <button
            onClick={() => handleNav('assignments')}
            className="w-full text-left py-2.5 px-3 rounded-lg font-bold text-gray-900 hover:bg-gray-50"
          >
            Projects
          </button>
          <button
            onClick={() => handleNav('faq')}
            className="w-full text-left py-2.5 px-3 rounded-lg font-bold text-gray-900 hover:bg-gray-50"
          >
            FAQ
          </button>
          <button
            onClick={() => handleNav('contact')}
            className="w-full text-left py-2.5 px-3 rounded-lg font-bold text-gray-900 hover:bg-gray-50"
          >
            Contact
          </button>
          <button
            onClick={() => handleNav('jobalert')}
            className="w-full text-center py-3 px-3 rounded-lg font-bold bg-[#e8382e] text-white hover:bg-[#c9241b]"
          >
            Jobalert
          </button>

          <div className="flex items-center justify-center gap-3 pt-4 border-t border-gray-100 text-sm font-bold">
            <span className="text-gray-500">Language:</span>
            <button
              onClick={() => onToggleLang('NL')}
              className={`px-2 py-1 rounded ${lang === 'NL' ? 'text-[#e8382e] underline' : 'text-gray-700'}`}
            >
              NL
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => onToggleLang('EN')}
              className={`px-2 py-1 rounded ${lang === 'EN' ? 'text-[#e8382e] underline' : 'text-gray-700'}`}
            >
              EN
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
