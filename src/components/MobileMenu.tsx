import React, { useState } from 'react';
import { ChevronDown, Phone, ArrowUpRight } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: () => void;
  onSelectService: (serviceId: string) => void;
  onNavigateSection: (sectionId: string) => void;
  onNavigatePage?: (page: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenConsultation,
  onSelectService,
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

  const handleService = (serviceId: string) => {
    onSelectService(serviceId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-between bg-white overflow-y-auto">
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
          className="p-2 text-gray-700 hover:text-[#1D454C] rounded-md text-sm font-semibold cursor-pointer"
        >
          Close ✕
        </button>
      </div>

      {/* Nav List */}
      <div className="p-6 space-y-4 flex-1">

        {/* About Accordion */}
        <div className="border-b border-gray-100 pb-2">
          <button
            onClick={() => handlePage('about')}
            className="w-full flex items-center justify-between py-2 text-base font-medium text-gray-800 cursor-pointer"
          >
            <span>About Us</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${expandedSection === 'about' ? 'rotate-180 text-[#1D454C]' : ''
                }`}
            />
          </button>
          {expandedSection === 'about' && (
            <div className="pl-4 space-y-2 py-2 text-sm text-gray-600 bg-[#F8FAFB] rounded-lg">
              <button
                onClick={() => handlePage('about')}
                className="w-full text-left py-1 hover:text-[#1D454C] cursor-pointer"
              >
                About Us Overview
              </button>
              <button
                onClick={() => handlePage('about')}
                className="w-full text-left py-1 hover:text-[#1D454C] cursor-pointer"
              >
                What We Do & How We Work
              </button>
              <button
                onClick={() => handlePage('about')}
                className="w-full text-left py-1 hover:text-[#1D454C] cursor-pointer"
              >
                Team MACEE
              </button>
            </div>
          )}
        </div>

        {/* Clients Accordion */}
        <div className="border-b border-gray-100 pb-2">
          <button
            onClick={() => toggleSection('clients')}
            className="w-full flex items-center justify-between py-2 text-base font-medium text-gray-800"
          >
            <span>Clients</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${expandedSection === 'clients' ? 'rotate-180 text-[#1D454C]' : ''
                }`}
            />
          </button>
          {expandedSection === 'clients' && (
            <div className="pl-4 space-y-2 py-2 text-sm text-gray-600 bg-[#F8FAFB] rounded-lg">
              <button onClick={() => handleService('recruitment-staffing')} className="w-full text-left py-1 hover:text-[#1D454C]">Recruitment & Staffing</button>
              <button onClick={() => handleService('contract-administration')} className="w-full text-left py-1 hover:text-[#1D454C]">Contract Administration</button>
              <button onClick={() => handleService('compliancy-support')} className="w-full text-left py-1 hover:text-[#1D454C]">Compliancy & Support</button>
              <button onClick={() => handleService('it-outsourcing')} className="w-full text-left py-1 hover:text-[#1D454C]">Outsourcing & Project Services</button>
              <button onClick={() => handleNav('resources')} className="w-full text-left py-1 hover:text-[#1D454C]">Certifications (SNA NEN 4400-1)</button>
            </div>
          )}
        </div>

        {/* Professionals Accordion */}
        <div className="border-b border-gray-100 pb-2">
          <button
            onClick={() => toggleSection('professionals')}
            className="w-full flex items-center justify-between py-2 text-base font-medium text-gray-800"
          >
            <span>Professionals</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${expandedSection === 'professionals' ? 'rotate-180 text-[#1D454C]' : ''
                }`}
            />
          </button>
          {expandedSection === 'professionals' && (
            <div className="pl-4 space-y-2 py-2 text-sm text-gray-600 bg-[#F8FAFB] rounded-lg">
              <button onClick={() => handleService('contracting-secondment')} className="w-full text-left py-1 hover:text-[#1D454C]">Contracting & Secondment</button>
              <button onClick={() => handleService('freelance-zzp')} className="w-full text-left py-1 hover:text-[#1D454C]">Freelance / ZZP</button>
              <button onClick={() => handleService('hsm-expats')} className="w-full text-left py-1 hover:text-[#1D454C]">HSM / Expats / Visa Sponsorship</button>
              <button onClick={() => handleService('recruitment-staffing')} className="w-full text-left py-1 hover:text-[#1D454C]">Permanent Positions</button>
            </div>
          )}
        </div>

        {/* Industries Accordion */}
        <div className="border-b border-gray-100 pb-2">
          <button
            onClick={() => toggleSection('industries')}
            className="w-full flex items-center justify-between py-2 text-base font-medium text-gray-800"
          >
            <span>Industries</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${expandedSection === 'industries' ? 'rotate-180 text-[#1D454C]' : ''
                }`}
            />
          </button>
          {expandedSection === 'industries' && (
            <div className="pl-4 space-y-2 py-2 text-sm text-gray-600 bg-[#F8FAFB] rounded-lg">
              <button onClick={() => handleNav('why-wfs')} className="w-full text-left py-1 hover:text-[#1D454C]">ICT & Software Development</button>
              <button onClick={() => handleNav('why-wfs')} className="w-full text-left py-1 hover:text-[#1D454C]">Banking / Fintech / Finance</button>
              <button onClick={() => handleNav('why-wfs')} className="w-full text-left py-1 hover:text-[#1D454C]">High Tech (Brainport)</button>
              <button onClick={() => handleNav('why-wfs')} className="w-full text-left py-1 hover:text-[#1D454C]">Government & Public Sector</button>
              <button onClick={() => handleNav('why-wfs')} className="w-full text-left py-1 hover:text-[#1D454C]">Telecom & Energy / Oil & Gas</button>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => handleNav('jobs')}
            className="w-full text-left py-2.5 text-base font-medium text-gray-800 border-b border-gray-100"
          >
            Projects / Assignments
          </button>
        </div>

        <div>
          <button
            onClick={() => handleNav('resources')}
            className="w-full text-left py-2.5 text-base font-medium text-gray-800 border-b border-gray-100"
          >
            FAQ & Certifications
          </button>
        </div>

        <div>
          <button
            onClick={() => {
              onClose();
              onOpenConsultation();
            }}
            className="w-full text-left py-2.5 text-base font-medium text-gray-800 border-b border-gray-100"
          >
            Contact
          </button>
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="p-6 border-t border-gray-100 bg-[#F8FAFB] space-y-3">
        <a
          href="tel:+310267440024"
          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-[5px] bg-[#1D454C] text-white font-medium text-sm hover:bg-[#153439] transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>Call: +31 (0)26 744 0024</span>
        </a>

        <button
          onClick={() => {
            onClose();
            onOpenConsultation();
          }}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-[5px] bg-[#6B0D43] text-white font-semibold text-sm hover:bg-[#540833] transition-colors shadow-sm"
        >
          <span>Get in Touch with Macee</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
