import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Clock, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { JobalertBanner } from '../components/JobalertBanner';
import { MACEE_PROJECTS, BRANCHES_LIST, JobAssignment } from '../data/maceeContent';

interface AssignmentsPageProps {
  onNavigate: (page: string) => void;
  initialQuery?: string;
}

export const AssignmentsPage: React.FC<AssignmentsPageProps> = ({ onNavigate, initialQuery = '' }) => {
  const [keyword, setKeyword] = useState(initialQuery);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedBranche, setSelectedBranche] = useState('All');
  const [selectedContract, setSelectedContract] = useState('All');
  const [activeJobModal, setActiveJobModal] = useState<JobAssignment | null>(null);
  const [applySubmitted, setApplySubmitted] = useState(false);

  const locations = ['All', 'Arnhem / Hybrid', 'Den Haag / Hybrid', 'Eindhoven / Hybrid', 'Amsterdam / Hybrid'];
  const contractTypes = ['All', 'Contracting', 'Freelance / ZZP', 'Permanent / Contract to perm'];

  const filteredProjects = MACEE_PROJECTS.filter((proj) => {
    const matchesKeyword = !keyword || 
      proj.title.toLowerCase().includes(keyword.toLowerCase()) ||
      proj.description.toLowerCase().includes(keyword.toLowerCase()) ||
      proj.requirements.some(r => r.toLowerCase().includes(keyword.toLowerCase()));

    const matchesLocation = selectedLocation === 'All' || proj.location.includes(selectedLocation.replace(' / Hybrid', ''));
    const matchesBranche = selectedBranche === 'All' || proj.branche === selectedBranche;
    const matchesContract = selectedContract === 'All' || proj.contractType === selectedContract;

    return matchesKeyword && matchesLocation && matchesBranche && matchesContract;
  });

  return (
    <div className="page_assignments">
      {/* Hero Banner with /media/cache/hero/uploads/PM-2.jpg */}
      <section
        className="relative py-20 sm:py-28 bg-cover bg-center text-white"
        style={{ backgroundImage: `url("/media/cache/hero/uploads/PM-2.jpg")` }}
      >
        <div className="absolute inset-0 bg-[#2a0209]/75 backdrop-blur-[1px]" />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Projects
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#f8dada] font-heading font-medium">
            Discover top-tier contract, interim, and permanent IT opportunities
          </p>
        </div>
      </section>

      {/* Main Filter and Listings Section */}
      <section className="py-12 sm:py-16 bg-[#F8FAFB]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Search by keyword
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. .NET, Kafka, Security..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#e8382e]"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:border-[#e8382e]"
                >
                  {locations.map((loc, i) => (
                    <option key={i} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Branche
                </label>
                <select
                  value={selectedBranche}
                  onChange={(e) => setSelectedBranche(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:border-[#e8382e]"
                >
                  <option value="All">All Branches</option>
                  {BRANCHES_LIST.slice(0, 10).map((br, i) => (
                    <option key={i} value={br}>{br}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Type of contract
                </label>
                <select
                  value={selectedContract}
                  onChange={(e) => setSelectedContract(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:border-[#e8382e]"
                >
                  {contractTypes.map((ct, i) => (
                    <option key={i} value={ct}>{ct}</option>
                  ))}
                </select>
              </div>
            </div>

            {(keyword || selectedLocation !== 'All' || selectedBranche !== 'All' || selectedContract !== 'All') && (
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-600">
                  Showing {filteredProjects.length} of {MACEE_PROJECTS.length} results
                </span>
                <button
                  onClick={() => {
                    setKeyword('');
                    setSelectedLocation('All');
                    setSelectedBranche('All');
                    setSelectedContract('All');
                  }}
                  className="text-xs font-bold text-[#e8382e] hover:underline cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>

          {/* Project Cards List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold font-heading text-gray-900">
                All vacancies ({filteredProjects.length} results)
              </h2>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8">
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">
                  No results
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  No vacancies currently matched your filter criteria. Create a Jobalert to receive new openings immediately!
                </p>
                <button
                  onClick={() => onNavigate('jobalert')}
                  className="is-btn text-sm mt-6"
                >
                  Create a Jobalert
                </button>
              </div>
            ) : (
              filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 hover:border-[#e8382e] transition-all duration-200 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#f8dada] text-[#e8382e]">
                        {proj.branche}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
                        {proj.contractType}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-gray-900">
                      {proj.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#e8382e]" />
                        {proj.location}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1.5 font-mono">
                        <Clock className="w-4 h-4 text-[#e8382e]" />
                        {proj.hours}
                      </span>
                      {proj.rate && (
                        <>
                          <span>·</span>
                          <span className="font-semibold text-gray-800">
                            {proj.rate}
                          </span>
                        </>
                      )}
                    </div>

                    <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
                    <button
                      onClick={() => setActiveJobModal(proj)}
                      className="is-btn text-sm"
                    >
                      <span>Bekijk &amp; Solliciteer</span>
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Modal for Job Details & Application */}
      {activeJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 my-8 border-t-4 border-[#e8382e]">
            <button
              onClick={() => {
                setActiveJobModal(null);
                setApplySubmitted(false);
              }}
              className="absolute top-5 right-5 text-gray-400 hover:text-black cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {applySubmitted ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                <h3 className="text-2xl font-bold font-heading text-gray-900">
                  Application Received!
                </h3>
                <p className="text-sm text-gray-600">
                  Thank you for applying to <span className="font-bold">{activeJobModal.title}</span>. Our recruitment team in Arnhem will review your application and contact you promptly.
                </p>
                <button
                  onClick={() => {
                    setActiveJobModal(null);
                    setApplySubmitted(false);
                  }}
                  className="is-btn text-sm"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#e8382e]">
                    {activeJobModal.branche} · {activeJobModal.contractType}
                  </span>
                  <h3 className="text-2xl font-bold font-heading text-gray-900 mt-1">
                    {activeJobModal.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-600 mt-2">
                    <span>{activeJobModal.location}</span>
                    <span>·</span>
                    <span>{activeJobModal.hours}</span>
                    {activeJobModal.rate && (
                      <>
                        <span>·</span>
                        <span className="font-bold">{activeJobModal.rate}</span>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-2">
                    Project Overview
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {activeJobModal.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-2">
                    Key Requirements
                  </h4>
                  <ul className="space-y-1.5 text-sm text-gray-700">
                    {activeJobModal.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#e8382e] shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Apply Form */}
                <div className="p-5 card-pink">
                  <h4 className="text-sm font-bold font-heading text-gray-900 mb-3">
                    Direct Application
                  </h4>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setApplySubmitted(true);
                    }}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Your Name *"
                        className="px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:border-[#e8382e]"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Your Email *"
                        className="px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:border-[#e8382e]"
                      />
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:border-[#e8382e]"
                    />
                    <button
                      type="submit"
                      className="is-btn w-full text-sm py-3"
                    >
                      Submit Application
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Jobalert Banner */}
      <JobalertBanner
        onNavigate={onNavigate}
        bgImage="/media/cache/hero/uploads/Hightech Industry 2.jpg"
      />
    </div>
  );
};
