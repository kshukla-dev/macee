import React, { useState } from 'react';
import { ChevronDown, Phone, ArrowUpRight } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: () => void;
  onNavigateSection: (sectionId: string) => void;
  onNavigatePage?: (page: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenConsultation,
  onNavigateSection,
  onNavigatePage,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleNav = (target: string) => {
    onNavigateSection(target);
    onClose();
  };

  const handlePage = (page: string) => {
    if (onNavigatePage) {
      onNavigatePage(page);
    } else {
      onNavigateSection('why-wfs');
    }
    onClose();
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 lg:hidden flex flex-col justify-between bg-white overflow-y-auto"
      onWheel={(e) => e.stopPropagation()}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handlePage('home');
          }}
          className="cursor-pointer"
        >
          <img
            src="/images/macee-logo.png"
            alt="Macee"
            className="h-8 w-auto"
          />
        </a>
        <button
          onClick={onClose}
          className="p-2 text-gray-700 hover:text-[#E30613] rounded-md text-sm font-semibold cursor-pointer"
        >
          Close ✕
        </button>
      </div>

      {/* Nav List */}
      <div className="p-6 space-y-4 flex-1">

        {/* About */}
        <div>
          <button
            onClick={() => handlePage('about')}
            className="w-full text-left py-2.5 text-base font-medium text-gray-800 border-b border-gray-100"
          >
            About Us
          </button>
        </div>

        {/* Clients */}
        <div>
          <button
            onClick={() => handlePage('clients')}
            className="w-full text-left py-2.5 text-base font-medium text-gray-800 border-b border-gray-100"
          >
            Clients
          </button>
        </div>

        {/* Professionals */}
        <div>
          <button
            onClick={() => handlePage('professionals')}
            className="w-full text-left py-2.5 text-base font-medium text-gray-800 border-b border-gray-100"
          >
            Professionals
          </button>
        </div>

        {/* Industries Accordion */}
        <div className="border-b border-gray-100 pb-2">
          <button
            onClick={() => toggleSection('industries')}
            className="w-full flex items-center justify-between py-2 text-base font-medium text-gray-800"
          >
            <span>Industries</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${expandedSection === 'industries' ? 'rotate-180 text-[#E30613]' : ''
                }`}
            />
          </button>
          {expandedSection === 'industries' && (
            <div className="pl-4 space-y-2 py-2 text-sm text-gray-600 bg-[#F8FAFB] rounded-lg">
              <button onClick={() => handleNav('why-wfs')} className="w-full text-left py-1 hover:text-[#E30613]">ICT & Software Development</button>
              <button onClick={() => handleNav('why-wfs')} className="w-full text-left py-1 hover:text-[#E30613]">Banking / Fintech / Finance</button>
              <button onClick={() => handleNav('why-wfs')} className="w-full text-left py-1 hover:text-[#E30613]">High Tech (Brainport)</button>
              <button onClick={() => handleNav('why-wfs')} className="w-full text-left py-1 hover:text-[#E30613]">Government & Public Sector</button>
              <button onClick={() => handleNav('why-wfs')} className="w-full text-left py-1 hover:text-[#E30613]">Telecom & Energy / Oil & Gas</button>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => handlePage('projects')}
            className="w-full text-left py-2.5 text-base font-medium text-gray-800 border-b border-gray-100"
          >
            Projects &amp; Vacancies
          </button>
        </div>

        <div>
          <button
            onClick={() => handlePage('faq')}
            className="w-full text-left py-2.5 text-base font-medium text-gray-800 border-b border-gray-100"
          >
            FAQ
          </button>
        </div>

        <div>
          <button
            onClick={() => handlePage('contact')}
            className="w-full text-left py-2.5 text-base font-medium text-gray-800 border-b border-gray-100"
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="p-6 border-t border-gray-100 bg-[#F8FAFB] space-y-3">
        <a
          href="tel:+310267440024"
          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-[5px] bg-[#E30613] text-white font-medium text-sm hover:bg-[#153439] transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>Call: +31 (0)26 744 0024</span>
        </a>

        <button
          onClick={() => {
            onClose();
            onOpenConsultation();
          }}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-[5px] bg-[#E30613] text-white font-semibold text-sm hover:bg-[#540833] transition-colors shadow-sm"
        >
          <span>Get in Touch with Macee</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
