import React from 'react';
import { ArrowRight, CheckCircle2, Briefcase, Users, Cpu, ShieldCheck, Award, FileCheck, UserCheck } from 'lucide-react';
import { SERVICES_DATA } from '../data/content';

interface WhatWeDoProps {
  onSelectService: (serviceId: string) => void;
  onExploreAllServices: () => void;
}

export const WhatWeDo: React.FC<WhatWeDoProps> = ({
  onSelectService,
  onExploreAllServices
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'recruitment-staffing': return <Users className="w-5 h-5 text-[#1D454C]" />;
      case 'contract-administration': return <Briefcase className="w-5 h-5 text-[#1D454C]" />;
      case 'compliancy-support': return <ShieldCheck className="w-5 h-5 text-[#1D454C]" />;
      case 'contracting-secondment': return <UserCheck className="w-5 h-5 text-[#1D454C]" />;
      case 'freelance-zzp': return <Award className="w-5 h-5 text-[#1D454C]" />;
      case 'hsm-expats': return <FileCheck className="w-5 h-5 text-[#1D454C]" />;
      case 'it-outsourcing': return <Cpu className="w-5 h-5 text-[#1D454C]" />;
      default: return <CheckCircle2 className="w-5 h-5 text-[#1D454C]" />;
    }
  };

  return (
    <section 
      id="what-we-do"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-gray-100"
    >
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Authentic Team Image */}
          <div className="lg:col-span-6 relative what-we-do-image">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100">
              <img
                src="/images/team-room.jpg"
                alt="Macee External Workforce Specialists in Collaboration"
                className="w-full h-auto object-cover max-h-[540px] aspect-[4/3.3] hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-md border border-gray-100">
                <p className="text-sm font-semibold text-[#1D454C]">The Protective Link for External Talent</p>
                <p className="text-xs text-[#54595F] mt-0.5">SNA NEN 4400-1 certified · Official IND Recognised Sponsor</p>
              </div>
            </div>
          </div>

          {/* Right Column: Heading, Subtitle & 7 Services */}
          <div className="lg:col-span-6 space-y-6 text-left what-we-do-content">
            <div>
              <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#6B0D43] mb-2">
                What Can We Support You With?
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#1D454C] tracking-tight">
                What We Do
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#54595F] leading-relaxed">
              We are the seamless extension of your External Hiring Desk, serving as the secure link between your organisation and external talent — ensuring efficiency, full compliance, and complete peace of mind.
            </p>

            {/* List of 7 Services with hover interaction */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {SERVICES_DATA.map((service) => (
                <div
                  key={service.id}
                  onClick={() => onSelectService(service.id)}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-[#F8FAFB] hover:bg-white hover:border-[#1D454C]/30 hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center shrink-0 border border-gray-100 shadow-2xs group-hover:bg-[#1D454C]/10 transition-colors">
                    {getIcon(service.id)}
                  </div>
                  <span className="text-sm font-semibold text-[#1D454C] group-hover:text-[#6B0D43] transition-colors leading-snug">
                    {service.title}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={onExploreAllServices}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-[5px] bg-[#6B0D43] hover:bg-[#1D454C] text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Check Out Our Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
