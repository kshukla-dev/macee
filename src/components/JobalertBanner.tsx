import React from 'react';

interface JobalertBannerProps {
  onNavigate: (page: string) => void;
  bgImage?: string;
  lang?: 'EN' | 'NL';
}

export const JobalertBanner: React.FC<JobalertBannerProps> = ({
  onNavigate,
  bgImage = '/uploads/PM-2.jpg',
  lang = 'EN'
}) => {
  return (
    <section
      className="relative py-20 px-4 sm:px-6 lg:px-8 text-white bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url("${bgImage}")` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#2a0209]/80 backdrop-blur-[2px]" />

      <div className="max-w-[1000px] mx-auto text-center relative z-10 space-y-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-white leading-snug">
          {lang === 'NL'
            ? 'Kun je de vacature die je zoekt niet vinden?'
            : "Can't find the project you are looking for?"}
        </h2>

        <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
          {lang === 'NL'
            ? 'Maak een Jobalert aan en ontvang een melding per mail wanneer er nieuwe vacatures zijn!'
            : 'Make a Jobalert and receive automatically notifications by email when there are suitable projects!'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('jobalert')}
            className="is-btn text-base px-8 py-3.5 shadow-lg"
          >
            {lang === 'NL' ? 'Jobalert aanmaken' : 'Create a Job alert'}
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="is-btn-white text-base px-8 py-3.5 shadow-lg"
          >
            {lang === 'NL' ? 'Open sollicitatie' : 'Open application'}
          </button>
        </div>
      </div>
    </section>
  );
};
