import React from 'react';
import { ArrowRight, UserCheck, Share2, Clock, HeartHandshake, ShieldCheck, Layers } from 'lucide-react';
import { PILLARS_DATA } from '../data/content';

interface WhyWorkforceSolutionsProps {
  onStartConsultation: () => void;
}

export const WhyWorkforceSolutions: React.FC<WhyWorkforceSolutionsProps> = ({
  onStartConsultation
}) => {
  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-[#6B0D43]" />;
      case 'Share2':
        return <Share2 className="w-6 h-6 text-[#6B0D43]" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-[#6B0D43]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-[#6B0D43]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#6B0D43]" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#6B0D43]" />;
      default:
        return <UserCheck className="w-6 h-6 text-[#6B0D43]" />;
    }
  };

  return (
    <section 
      id="why-wfs"
      className="py-16 sm:py-20 lg:py-24 bg-[#1D454C] text-white relative overflow-hidden"
    >
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#6B0D43]/20 blur-3xl pointer-events-none" />

      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 why-wfs-header">
          <div className="inline-block text-xs font-bold uppercase tracking-widest text-[#E5B5D0] mb-3">
            The Macee Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white">
            Discover the Difference: Why Choose Macee
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
            With more than 30 years of experience, we provide tailored workforce solutions that take the complexity off your hands, letting you focus on what truly matters.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PILLARS_DATA.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white/95 backdrop-blur-sm text-[#333333] rounded-xl p-6 sm:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 border border-white/20"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#F8FAFB] border border-gray-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#6B0D43]/10 transition-all duration-300">
                    {getPillarIcon(pillar.iconName)}
                  </div>
                  {pillar.highlight && (
                    <span className="text-[11px] font-mono font-medium text-[#1D454C] bg-[#1D454C]/10 px-2 py-0.5 rounded">
                      {pillar.highlight}
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-display text-[#1D454C] group-hover:text-[#6B0D43] transition-colors leading-snug">
                  {pillar.title}
                </h3>

                <p className="mt-3 text-sm text-[#54595F] leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center text-xs font-semibold text-[#1D454C] group-hover:text-[#6B0D43] transition-colors">
                <span>Verified Compliance</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-14 sm:mt-16 text-center">
          <button
            onClick={onStartConsultation}
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-[5px] bg-[#6B0D43] hover:bg-white hover:text-[#1D454C] text-white font-semibold text-base shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-0.5 group"
          >
            <span>Start Your Collaboration</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
