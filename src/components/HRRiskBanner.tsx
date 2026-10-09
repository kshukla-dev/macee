import React from 'react';
import { ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HRRiskBannerProps {
  onBeginSurvey: () => void;
}

export const HRRiskBanner: React.FC<HRRiskBannerProps> = ({ onBeginSurvey }) => {
  return (
    <section 
      id="risk-survey"
      className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFB] border-b border-gray-100 relative overflow-hidden"
    >
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-[#1D454C] via-[#17383E] to-[#12282C] text-white rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden border border-white/10">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#6B0D43]/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-xs">
              <ShieldAlert className="w-4 h-4 text-[#E5B5D0]" />
              <span>Complimentary 3-Minute Assessment</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white tracking-tight leading-snug">
              Are Compliance Gaps Putting Your Hiring at Risk?
            </h2>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed">
              With the strict enforcement of the Dutch Wet DBA, chain liability (inlenersaansprakelijkheid), and cross-border immigration rules, hiring external contractors without proper verification exposes organizations to severe penalties. Complete our free assessment to reveal where you may have risk exposure, and what to do next.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/80 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E5B5D0]" />
                100% Confidential
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E5B5D0]" />
                Instant Score Breakdown
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E5B5D0]" />
                Dutch Wet DBA & WAADI Aligned
              </span>
            </div>

            <div className="pt-4">
              <button
                onClick={onBeginSurvey}
                className="inline-flex items-center gap-2.5 px-9 py-4 rounded-[5px] bg-[#6B0D43] hover:bg-white hover:text-[#1D454C] text-white font-semibold text-base shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-0.5 group"
              >
                <span>Begin Compliance Assessment</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
