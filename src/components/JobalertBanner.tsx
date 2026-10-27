import React from 'react';
import { ArrowRight, Lock } from 'lucide-react';

export interface JobalertBannerProps {
  /** Navigation callback */
  onNavigate?: (page: string) => void;
  /** Consultation modal callback */
  onOpenConsultation?: () => void;
  /** Top eyebrow badge */
  badge?: string;
  /** Primary heading */
  title?: string;
  /** Subtitle or explanatory text */
  description?: string;
  /** High resolution image url */
  imageSrc?: string;
  /** Fallback background image for backward compatibility */
  bgImage?: string;
  /** Primary button label */
  primaryBtnText?: string;
  /** Target page for primary button */
  primaryBtnPage?: string;
  /** Custom handler for primary button */
  onPrimaryClick?: () => void;
  /** Secondary button label */
  secondaryBtnText?: string;
  /** Target page for secondary button */
  secondaryBtnPage?: string;
  /** Custom handler for secondary button */
  onSecondaryClick?: () => void;
  /** Security / privacy assurance note */
  securityNote?: string;
  /** Language */
  lang?: 'EN' | 'NL';
  /** Additional container classes */
  className?: string;
}

export const JobalertBanner: React.FC<JobalertBannerProps> = ({
  onNavigate,
  onOpenConsultation,
  badge,
  title,
  description,
  imageSrc = '/images/global-team-collaboration.jpg',
  bgImage,
  primaryBtnText,
  primaryBtnPage = 'jobalert',
  onPrimaryClick,
  secondaryBtnText,
  secondaryBtnPage = 'contact',
  onSecondaryClick,
  securityNote,
  lang = 'EN',
  className = ''
}) => {
  // Brand authentic copy with Dutch/English localization
  const effectiveBadge =
    badge ||
    (lang === 'NL' ? 'VACATURES & PROJECT NOTIFICATIES' : 'CAREER & ASSIGNMENT ALERTS');

  const effectiveTitle =
    title ||
    (lang === 'NL'
      ? 'Kun je de vacature die je zoekt niet vinden?'
      : "Can't find the project you are looking for?");

  const effectiveDescription =
    description ||
    (lang === 'NL'
      ? 'Maak een Jobalert aan en ontvang een melding per mail wanneer er nieuwe vacatures zijn!'
      : 'Make a Jobalert and receive automatically notifications by email when there are suitable projects!');

  const effectivePrimaryText =
    primaryBtnText ||
    (lang === 'NL' ? 'Jobalert aanmaken' : 'Create a Job alert');

  const effectiveSecondaryText =
    secondaryBtnText ||
    (lang === 'NL' ? 'Open sollicitatie' : 'Open application');

  const effectiveSecurityNote =
    securityNote ||
    (lang === 'NL'
      ? 'Jouw gegevens worden strikt vertrouwelijk en veilig verwerkt.'
      : 'Your information is secure and confidential.');

  const handlePrimary = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else if (onOpenConsultation && primaryBtnPage === 'consultation') {
      onOpenConsultation();
    } else if (onNavigate) {
      onNavigate(primaryBtnPage);
    }
  };

  const handleSecondary = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else if (onNavigate) {
      onNavigate(secondaryBtnPage);
    }
  };

  const chosenImg = imageSrc || bgImage || '/images/global-team-collaboration.jpg';

  return (
    <section
      className={`relative w-full bg-[#111827] text-white overflow-hidden py-12 sm:py-16 lg:py-20 border-y border-gray-800 ${className}`}
    >
      {/* Macee Brand Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E30613]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-black/50 rounded-full blur-2xl pointer-events-none" />

      {/* Left Visual: global-team-collaboration.jpg with seamless gradient blend into #111827 */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[48%] xl:w-[45%] overflow-hidden pointer-events-none">
        <img
          src={chosenImg}
          alt="Macee Global Workforce Collaboration"
          className="w-full h-full object-cover object-center lg:object-left scale-105 transition-transform duration-700"
          loading="lazy"
        />
        {/* Seamless right-side fade to Macee dark background #111827 on desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#111827]/40 to-[#111827] hidden lg:block pointer-events-none" />
        {/* Seamless bottom fade on mobile/tablet */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/80 to-transparent lg:hidden pointer-events-none" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          
          {/* Spacer to naturally reserve space for the left team visual on desktop */}
          <div className="hidden lg:block lg:w-[44%] xl:w-[42%] shrink-0 pointer-events-none h-1" />

          {/* Right Column: Hero copy and action buttons in Macee Brand styling */}
          <div className="w-full lg:w-[56%] xl:w-[58%] lg:pl-6 flex flex-col justify-center">
            
            {/* 1. Eyebrow Badge in Macee Red */}
            <div className="mb-2.5">
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#E30613]">
                {effectiveBadge}
              </span>
            </div>

            {/* 2. Headline: Can't find the project you are looking for? */}
            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-bold font-display text-white tracking-tight leading-[1.15]">
              {effectiveTitle}
            </h2>

            {/* 3. Description */}
            <p className="mt-3.5 text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl font-normal">
              {effectiveDescription}
            </p>

            {/* 4. Action Buttons (Macee Red Primary + Sleek Glass Outline Secondary) */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={handlePrimary}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#E30613] hover:bg-white hover:text-[#111827] text-white font-bold text-sm shadow-lg shadow-[#E30613]/25 hover:shadow-white/10 transition-all duration-200 cursor-pointer active:scale-95 hover:-translate-y-0.5 group"
              >
                <span>{effectivePrimaryText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={handleSecondary}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm backdrop-blur-xs transition-all duration-200 cursor-pointer active:scale-95 hover:border-white/40"
              >
                <span>{effectiveSecondaryText}</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* 5. Security Assurance Note */}
            <div className="mt-5 flex items-center gap-2 text-xs text-gray-400">
              <Lock className="w-3.5 h-3.5 text-[#E30613] shrink-0" />
              <span>{effectiveSecurityNote}</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

// Also export as GlobalSuccessBanner for semantic reusability
export const GlobalSuccessBanner = JobalertBanner;
export default JobalertBanner;
