import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { RESOURCES_DATA } from '../data/content';
import { ResourceItem } from '../types';

interface DownloadableResourcesProps {
  onSelectResource: (resource: ResourceItem) => void;
}

export const DownloadableResources: React.FC<DownloadableResourcesProps> = ({
  onSelectResource
}) => {
  return (
    <section 
      id="resources"
      className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFB] border-b border-gray-100"
    >
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 resources-heading">
          <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#6B0D43] mb-2">
            Free Guides & Certifications
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#1D454C] tracking-tight">
            Downloadable Resources
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#54595F]">
            Essential compliance frameworks, contractor hiring guides, and expat relocation blueprints curated by Macee specialists.
          </p>
        </div>

        {/* 3 Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESOURCES_DATA.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[26px] overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0px_10px_30px_rgba(0,0,0,0.14)] transition-all duration-300 flex flex-col group border border-gray-100/80 hover:-translate-y-1"
            >
              {/* Card Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#1D454C]/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md tracking-wide backdrop-blur-xs">
                  {item.type}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-[#1D454C] group-hover:text-[#6B0D43] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#54595F] leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#667085]">
                    {item.pages}
                  </span>

                  <button
                    onClick={() => onSelectResource(item)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[5px] bg-[#6B0D43] hover:bg-[#1D454C] text-white text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-2xs hover:shadow"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#54595F]">
            Looking for customized secondment solutions or compliance advice?{' '}
            <button
              onClick={() => onSelectResource(RESOURCES_DATA[0])}
              className="text-[#6B0D43] hover:text-[#1D454C] font-semibold underline underline-offset-4 cursor-pointer inline-flex items-center gap-1"
            >
              <span>Explore all client guides</span>
              <BookOpen className="w-3.5 h-3.5" />
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};
