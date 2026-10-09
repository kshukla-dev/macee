import React from 'react';
import { Phone } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#1D454C] text-white py-2 px-4 sm:px-6 lg:px-8 border-b border-[#255760] transition-colors">
      <div className="max-w-[1220px] mx-auto flex items-center justify-between text-xs sm:text-sm font-medium">
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-white/80" />
          <a 
            href="tel:+310267440024" 
            className="hover:text-[#f8fafc] hover:underline underline-offset-4 transition-colors"
          >
            Call: +31 (0)26 744 0024
          </a>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-white/70 text-xs">
            Nieuwe Stationsstraat 10, Arnhem · The Netherlands
          </span>
          <div className="flex items-center gap-3">
            <a
              href="mailto:info@macee.com"
              aria-label="Macee Email"
              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/25 transition-all text-white text-xs font-mono font-semibold"
            >
              @
            </a>
            <a
              href="https://www.linkedin.com/company/macee"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Macee LinkedIn"
              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/25 transition-all text-white"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
