import React, { useState, useRef, useEffect } from 'react';

export type Language = 'EN' | 'NL';

interface LanguageSelectorProps {
  currentLang: Language;
  onChangeLang: (lang: Language) => void;
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLang,
  onChangeLang,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 px-2 py-1 text-sm font-semibold text-gray-700 hover:text-[#E30613] transition-colors rounded cursor-pointer select-none"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <span>{currentLang}</span>
        <span className="text-[8px] text-gray-800 transition-transform duration-150">
          ▲
        </span>
      </button>

      {/* Dropdown Card */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-0.5 w-14 bg-white border border-gray-200 shadow-md rounded-b-md overflow-hidden z-50">
          <button
            type="button"
            onClick={() => {
              onChangeLang('NL');
              setIsOpen(false);
            }}
            className={`w-full py-1.5 text-center text-xs font-bold transition-colors cursor-pointer ${
              currentLang === 'NL'
                ? 'bg-[#E30613] text-white'
                : 'text-black hover:bg-gray-100 hover:text-[#E30613]'
            }`}
          >
            NL
          </button>

          <button
            type="button"
            onClick={() => {
              onChangeLang('EN');
              setIsOpen(false);
            }}
            className={`w-full py-1.5 text-center text-xs font-bold transition-colors cursor-pointer ${
              currentLang === 'EN'
                ? 'bg-[#E30613] text-white'
                : 'text-black hover:bg-gray-100 hover:text-[#E30613]'
            }`}
          >
            EN
          </button>
        </div>
      )}
    </div>
  );
};
