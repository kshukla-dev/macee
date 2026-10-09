import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Users, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartJourney: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartJourney, onExploreServices }) => {
  return (
    <section 
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFB] to-[#FFFFFF] py-12 sm:py-16 lg:py-20 border-b border-gray-100"
    >
      {/* Subtle background decorative shapes */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#1D454C]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#6B0D43]/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left hero-content">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1D454C]/10 text-[#1D454C] text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#6B0D43]" />
              <span>Think Better. Recruit Smarter.</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-[#1D454C] tracking-tight leading-[1.12]">
              External Workforce <span className="text-[#6B0D43] underline decoration-[#6B0D43]/20 decoration-wavy">Solutions</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#54595F] leading-relaxed max-w-2xl font-normal">
              Hiring external and temporary staff shouldn't slow you down. From sourcing to onboarding, contract administration to full compliancy, we take the complexity off your hands.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onStartJourney}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-[5px] bg-[#6B0D43] hover:bg-[#1D454C] text-white font-semibold text-base shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-0.5"
              >
                <span>Explore Projects & Talent</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-[5px] bg-white border border-[#1D454C]/25 text-[#1D454C] hover:bg-[#F8FAFB] font-semibold text-base transition-colors duration-200 cursor-pointer"
              >
                <span>Our Services</span>
              </button>
            </div>

            {/* Trust points */}
            <div className="pt-6 border-t border-gray-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-[#333333]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1D454C] shrink-0" />
                <span className="font-medium">SNA NEN 4400-1 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1D454C] shrink-0" />
                <span className="font-medium">IND Recognised Sponsor</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#1D454C] shrink-0" />
                <span className="font-medium">30+ Years Experience</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image with refined border & badge */}
          <div className="lg:col-span-5 relative hero-image-container flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Backing decorative frame */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#1D454C]/15 to-[#6B0D43]/15 rounded-2xl transform rotate-1 scale-[0.99]" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100">
                <img
                  src="/images/hero-woman.jpg"
                  alt="Macee Workforce Solutions Professional"
                  className="w-full h-auto object-cover max-h-[520px] aspect-[4/4.3] object-top hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </div>

              {/* Floating strategic badge */}
              <div className="absolute -bottom-5 -left-4 sm:left-4 bg-white/95 backdrop-blur-md border border-gray-200/80 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1D454C] text-white flex items-center justify-center font-bold text-base">
                  M
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1D454C]">Your External Hiring Desk</div>
                  <div className="text-[11px] text-[#54595F]">Sourcing International Talent & Expats</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
