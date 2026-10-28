import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Users, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartJourney: () => void;
  onExploreServices: () => void;
}

const HERO_CAROUSEL_IMAGES = [
  {
    src: '/images/hero-woman.jpg',
    alt: 'Macee Strategic Talent Partner',
    title: 'Your External Hiring Desk',
    subtitle: 'Sourcing International Talent & Expats',
  },
  {
    src: '/images/global-team-collaboration.jpg',
    alt: 'Global Talent & International Team Collaboration',
    title: 'Cross-Border Talent Network',
    subtitle: 'High-Caliber Interim & Expat Specialists',
  },
  {
    src: '/uploads/people-working-dsk.jpg',
    alt: 'Specialized Interim Professionals in Action',
    title: 'End-to-End Workforce Solutions',
    subtitle: 'Compliance, Payroll & Rapid Deployment',
  },
  {
    src: '/images/careers-handshake.jpg',
    alt: 'Trusted Placement & Partnership',
    title: 'Certified & Compliant Staffing',
    subtitle: 'SNA NEN 4400-1 & IND Recognised Sponsor',
  },
];

export const Hero: React.FC<HeroProps> = ({ onStartJourney, onExploreServices }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_CAROUSEL_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFB] to-[#FFFFFF] py-12 sm:py-16 lg:py-20 border-b border-gray-100"
    >
      {/* Subtle background decorative shapes */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#8E96CB]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#E30613]/10 blur-3xl pointer-events-none" />

      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left hero-content">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8E96CB]/15 text-[#36427D] text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#E30613]" />
              <span>Think Better. Recruit Smarter.</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-[#111827] tracking-tight leading-[1.12]">
              External Workforce <span className="text-[#E30613] decoration-[#E30613]/20">Solutions</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#54595F] leading-relaxed max-w-2xl font-normal">
              Hiring external and temporary staff shouldn't slow you down. From sourcing to onboarding, contract administration to full compliancy, we take the complexity off your hands.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onStartJourney}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-[5px] bg-[#E30613] hover:bg-[#111827] text-white font-semibold text-base shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-0.5"
              >
                <span>Explore Projects & Talent</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-[5px] bg-white border border-gray-300 text-[#111827] hover:bg-[#F0F2FA] hover:text-[#E30613] font-semibold text-base transition-colors duration-200 cursor-pointer"
              >
                <span>Our Services</span>
              </button>
            </div>

            {/* Trust points */}
            <div className="pt-6 border-t border-gray-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-[#333333]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E30613] shrink-0" />
                <span className="font-medium">SNA NEN 4400-1 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E30613] shrink-0" />
                <span className="font-medium">IND Recognised Sponsor</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#E30613] shrink-0" />
                <span className="font-medium">30+ Years Experience</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image Carousel with smooth crossfade & live desk badge */}
          <div className="lg:col-span-5 relative hero-image-container flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Backing decorative frame */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#E30613]/15 to-[#8E96CB]/20 rounded-2xl transform rotate-1 scale-[0.99]" />

              {/* Crossfade Image Carousel Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#111827] border border-gray-100 aspect-[4/4.3] max-h-[520px]">
                {HERO_CAROUSEL_IMAGES.map((img, idx) => (
                  <div
                    key={img.src}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className={`w-full h-full object-cover object-top transition-transform duration-[6000ms] ease-out ${idx === currentSlide ? 'scale-105' : 'scale-100'
                        }`}
                    />
                    {/* Subtle bottom shadow vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                ))}

                {/* Sleek Carousel Indicators */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                  {HERO_CAROUSEL_IMAGES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentSlide ? 'w-5 bg-[#E30613]' : 'w-1.5 bg-white/60 hover:bg-white'
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating strategic badge (Replacing plain "M" box with high-end live desk emblem) */}
              <div className="absolute -bottom-5 -left-3 sm:left-4 z-30 bg-white/95 backdrop-blur-md border border-gray-200/90 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3.5 transition-all duration-300 hover:shadow-2xl">
                <div className="shrink-0 flex items-center justify-center">
                  <img
                    src="/uploads/favicon-96x96.png"
                    alt="Macee"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-[#111827] tracking-tight">
                    {HERO_CAROUSEL_IMAGES[currentSlide].title}
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#54595F] font-medium mt-0.5">
                    {HERO_CAROUSEL_IMAGES[currentSlide].subtitle}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
