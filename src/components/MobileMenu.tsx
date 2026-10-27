import React, { useState } from 'react';
import { ChevronDown, Phone, ArrowUpRight } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: () => void;
  onNavigateSection: (sectionId: string) => void;
  onNavigatePage?: (page: string) => void;
  currentPage?: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenConsultation,
  onNavigateSection,
  onNavigatePage,
  currentPage = 'home',
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
      <div className="p-6 space-y-2 flex-1">

        {/* About */}
        <div>
          <button
            onClick={() => handlePage('about')}
            className={`w-full text-left py-2.5 px-3 rounded-md text-base transition-colors ${currentPage === 'about'
              ? 'text-[#E30613] font-bold bg-[#E30613]/5 border-l-4 border-[#E30613]'
              : 'font-medium text-gray-800 hover:text-[#E30613]'
              }`}
          >
            About Us
          </button>
        </div>

        {/* Clients */}
        <div>
          <button
            onClick={() => handlePage('clients')}
            className={`w-full text-left py-2.5 px-3 rounded-md text-base transition-colors ${currentPage === 'clients'
              ? 'text-[#E30613] font-bold bg-[#E30613]/5 border-l-4 border-[#E30613]'
              : 'font-medium text-gray-800 hover:text-[#E30613]'
              }`}
          >
            Clients
          </button>
        </div>

        {/* Professionals */}
        <div>
          <button
            onClick={() => handlePage('professionals')}
            className={`w-full text-left py-2.5 px-3 rounded-md text-base transition-colors ${currentPage === 'professionals'
              ? 'text-[#E30613] font-bold bg-[#E30613]/5 border-l-4 border-[#E30613]'
              : 'font-medium text-gray-800 hover:text-[#E30613]'
              }`}
          >
            Professionals
          </button>
        </div>

        {/* Projects */}
        <div>
          <button
            onClick={() => handlePage('projects')}
            className={`w-full text-left py-2.5 px-3 rounded-md text-base transition-colors ${currentPage === 'projects'
              ? 'text-[#E30613] font-bold bg-[#E30613]/5 border-l-4 border-[#E30613]'
              : 'font-medium text-gray-800 hover:text-[#E30613]'
              }`}
          >
            Projects
          </button>
        </div>

        {/* FAQ */}
        <div>
          <button
            onClick={() => handlePage('faq')}
            className={`w-full text-left py-2.5 px-3 rounded-md text-base transition-colors ${currentPage === 'faq'
              ? 'text-[#E30613] font-bold bg-[#E30613]/5 border-l-4 border-[#E30613]'
              : 'font-medium text-gray-800 hover:text-[#E30613]'
              }`}
          >
            FAQ
          </button>
        </div>

        {/* Contact */}
        <div>
          <button
            onClick={() => handlePage('contact')}
            className={`w-full text-left py-2.5 px-3 rounded-md text-base transition-colors ${currentPage === 'contact'
              ? 'text-[#E30613] font-bold bg-[#E30613]/5 border-l-4 border-[#E30613]'
              : 'font-medium text-gray-800 hover:text-[#E30613]'
              }`}
          >
            Contact
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
