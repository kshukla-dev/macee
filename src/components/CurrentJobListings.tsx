import React, { useState } from 'react';
import { ArrowRight, MapPin, Briefcase, Clock, CheckCircle } from 'lucide-react';
import { JOBS_DATA } from '../data/content';
import { JobListing } from '../types';

interface CurrentJobListingsProps {
  onSelectJob: (job: JobListing) => void;
  onExploreAllJobs: () => void;
}

export const CurrentJobListings: React.FC<CurrentJobListingsProps> = ({
  onSelectJob,
  onExploreAllJobs
}) => {
  const [selectedDept, setSelectedDept] = useState<string>('All');

  const departments = ['All', 'ICT / Software Development', 'Banking & Fintech', 'Government & Public Sector', 'High Tech Industry'];

  const filteredJobs = selectedDept === 'All' 
    ? JOBS_DATA 
    : JOBS_DATA.filter(j => j.department === selectedDept);

  return (
    <section 
      id="jobs"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-gray-100"
    >
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Heading, intro, and jobs list */}
          <div className="lg:col-span-7 space-y-6 text-left jobs-content">
            <div>
              <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#6B0D43] mb-2">
                Vacancies & Assignments
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#1D454C] tracking-tight">
                Current Projects & Assignments
              </h2>
              <h3 className="text-lg sm:text-xl font-semibold text-[#1D454C] mt-2 font-display">
                Take the next step in your professional career
              </h3>
            </div>

            <p className="text-sm sm:text-base text-[#54595F] leading-relaxed">
              Check out our range of exciting projects and permanent positions at MACEE and our enterprise clients. Click on the project title to explore requirements and submit your application.
            </p>

            {/* Department filter tabs */}
            <div className="flex flex-wrap gap-2 pt-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    selectedDept === dept
                      ? 'bg-[#1D454C] text-white shadow-xs'
                      : 'bg-[#F8FAFB] text-[#54595F] hover:bg-gray-100'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Jobs List */}
            <div className="space-y-3 pt-2">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => onSelectJob(job)}
                  className="p-4 rounded-xl border border-gray-100 bg-[#F8FAFB] hover:bg-white hover:border-[#1D454C]/30 hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-base font-bold font-display text-[#1D454C] group-hover:text-[#6B0D43] transition-colors">
                        {job.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-[#54595F]">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3.5 h-3.5 text-[#1D454C]" />
                          {job.department}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#1D454C]" />
                          {job.location}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3.5 h-3.5 text-[#1D454C]" />
                          {job.type}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center text-xs font-semibold text-[#6B0D43] group-hover:text-[#1D454C] shrink-0">
                      <span>View & Apply</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={onExploreAllJobs}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-[5px] bg-[#6B0D43] hover:bg-[#1D454C] text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Create a Jobalert</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Handshake Career Photo */}
          <div className="lg:col-span-5 relative jobs-image">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 max-w-md mx-auto lg:max-w-none">
              <img
                src="/images/careers-handshake.jpg"
                alt="Connecting Ambition with Opportunity at Macee"
                className="w-full h-auto object-cover max-h-[520px] aspect-[4/4] hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1D454C]">
                  <CheckCircle className="w-4 h-4 text-[#1D454C]" />
                  <span>Can't find the project you are looking for?</span>
                </div>
                <p className="text-xs text-[#54595F] mt-1">
                  Create a Jobalert to receive automated email notifications when suitable projects open!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
