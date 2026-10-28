import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  LANGUAGES,
  getCurrentGoogleLang,
  changePageLanguage,
} from '../lib/googleTranslate';

interface AutoLanguageSelectorProps {
  className?: string;
}

export const AutoLanguageSelector: React.FC<AutoLanguageSelectorProps> = ({
  className = '',
}) => {
  const [currentLang, setCurrentLang] = useState<string>('en');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync current language
  useEffect(() => {
    setCurrentLang(getCurrentGoogleLang());

    const interval = setInterval(() => {
      const active = getCurrentGoogleLang();
      if (active !== currentLang) {
        setCurrentLang(active);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentLang]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: string) => {
    setCurrentLang(code);
    setIsOpen(false);
    changePageLanguage(code);
  };

  const currentLabel = currentLang.toUpperCase();

  return (
    <div ref={dropdownRef} className={`relative inline-block notranslate ${className}`} translate="no">
      {/* Simple Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle language"
        className="flex items-center gap-1.5 px-2 py-1 text-sm font-semibold text-gray-700 hover:text-[#E30613] transition-colors cursor-pointer select-none"
      >
        <span>{currentLabel}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-black' : 'text-gray-600'
          }`}
        />
      </button>

      {/* Simple Dropdown matching screenshot */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 min-w-[62px] bg-white rounded-md shadow-lg border border-gray-100 overflow-hidden z-50 animate-fadeIn">
          {/* Options: NL and EN */}
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === currentLang;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`w-full py-1.5 px-3 text-center text-xs font-semibold tracking-wide transition-colors cursor-pointer block ${
                  isSelected
                    ? 'bg-[#E30613] text-white'
                    : 'text-gray-800 hover:bg-gray-100'
                }`}
              >
                {lang.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
