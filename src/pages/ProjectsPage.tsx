import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Search,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  X,
  SlidersHorizontal,
  Building2,
  ShieldCheck,
  Send,
  Upload,
  Globe2,
  Euro,
  RefreshCw,
  Key,
  AlertCircle,
  Loader2,
  FileText,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Briefcase
} from 'lucide-react';
import { JobalertBanner } from '../components/JobalertBanner';
import { ContactFormSection } from '../components/ContactFormSection';
import {
  getAllJobs,
  fetchVacancies,
  getJobDetails,
  uploadCvFile,
  submitVacancyApplication,
  mapOtysVacancyToProject,
  buildVacanciesUrl,
  sanitizeHtml,
  API_ENDPOINTS
} from '../lib/api';
import { isOtysConfigured } from '../lib/auth';

export interface ProjectAssignmentItem {
  id: string;
  referenceId?: string;
  slug?: string;
  title: string;
  category: string;
  branche: string;
  location: string;
  contractType: string;
  hours: string;
  rate: string;
  experience: string;
  description: string;
  shortDescriptionHtml?: string;
  jobDescriptionHtml?: string;
  requirementsHtml?: string;
  requirements: string[];
  skills: string[];
  postedDate: string;
  rawDate?: string;
  isFeatured?: boolean;
}

export const ALL_PROJECTS: ProjectAssignmentItem[] = [];

interface ProjectsPageProps {
  onNavigate: (page: string) => void;
  initialQuery?: string;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate, initialQuery = '' }) => {
  const [keyword, setKeyword] = useState(initialQuery);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedBranche, setSelectedBranche] = useState('All');
  const [selectedContract, setSelectedContract] = useState('All');

  // API & Vacancies state
  const [projectsList, setProjectsList] = useState<ProjectAssignmentItem[]>(ALL_PROJECTS);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Modal & Application Form state
  const [activeProject, setActiveProject] = useState<ProjectAssignmentItem | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [applySubmitted, setApplySubmitted] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantRate, setApplicantRate] = useState('');
  const [applicantNote, setApplicantNote] = useState('');
  const [applicantFile, setApplicantFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');



  // Load vacancies from OTYS API or fallback to curated list
  const loadVacancies = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      if (isOtysConfigured()) {
        const jobs = await getAllJobs({
          keywords: keyword.trim() || undefined,
          itemsPerPage: 50
        });


        if (Array.isArray(jobs) && jobs.length > 0) {
          setProjectsList(jobs);
          setIsLiveConnected(true);
          return;
        } else {
          console.log('ℹ️ [ProjectsPage] OTYS returned 0 vacancies, using curated Macee assignments.');
        }
      } else {
        console.log('⚠️ [ProjectsPage] OTYS API Key not detected in .env or local settings. Add OTYS_API_KEY in .env or via OTYS settings button.');
      }
      setProjectsList(ALL_PROJECTS);
      setIsLiveConnected(false);
    } catch (err: any) {
      console.error('❌ [ProjectsPage] Error loading OTYS vacancies:', err);
      setApiError(err.message || 'Unable to fetch from OTYS API');
      setProjectsList(ALL_PROJECTS);
      setIsLiveConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, [keyword]);

  useEffect(() => {
    loadVacancies();
  }, [loadVacancies]);

  // Dynamic filter options based on available projects
  const locations = useMemo(() => {
    const locSet = new Set<string>(['All']);
    projectsList.forEach((p) => {
      const city = p.location.split('/')[0].trim();
      if (city) locSet.add(city);
    });
    return Array.from(locSet);
  }, [projectsList]);

  const branches = useMemo(() => {
    const brSet = new Set<string>(['All']);
    projectsList.forEach((p) => {
      if (p.branche) brSet.add(p.branche);
    });
    return Array.from(brSet);
  }, [projectsList]);

  const contractTypes = useMemo(() => {
    const ctSet = new Set<string>(['All']);
    projectsList.forEach((p) => {
      if (p.contractType) ctSet.add(p.contractType);
    });
    return Array.from(ctSet);
  }, [projectsList]);

  const filteredProjects = useMemo(() => {
    const list = projectsList.filter((proj) => {
      const q = keyword.trim().toLowerCase();
      const matchesKeyword =
        !q ||
        proj.title.toLowerCase().includes(q) ||
        proj.description.toLowerCase().includes(q) ||
        proj.category.toLowerCase().includes(q) ||
        proj.skills.some((s) => s.toLowerCase().includes(q)) ||
        proj.requirements.some((r) => r.toLowerCase().includes(q));

      const matchesLocation =
        selectedLocation === 'All' ||
        proj.location.toLowerCase().includes(selectedLocation.toLowerCase());

      const matchesBranche =
        selectedBranche === 'All' ||
        proj.branche.toLowerCase() === selectedBranche.toLowerCase();

      const matchesContract =
        selectedContract === 'All' ||
        proj.contractType.toLowerCase().includes(selectedContract.toLowerCase());

      return matchesKeyword && matchesLocation && matchesBranche && matchesContract;
    });

    // Ensure latest vacancies appear first (newest to oldest)
    return [...list].sort((a, b) => {
      const timeA = a.rawDate ? new Date(a.rawDate).getTime() : a.postedDate ? new Date(a.postedDate).getTime() : 0;
      const timeB = b.rawDate ? new Date(b.rawDate).getTime() : b.postedDate ? new Date(b.postedDate).getTime() : 0;
      if (!isNaN(timeA) && !isNaN(timeB) && timeA !== timeB) {
        return timeB - timeA;
      }
      const numA = parseInt(a.id.replace(/\D/g, ''), 10) || 0;
      const numB = parseInt(b.id.replace(/\D/g, ''), 10) || 0;
      return numB - numA;
    });
  }, [projectsList, keyword, selectedLocation, selectedBranche, selectedContract]);

  // 6 items per page pagination
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page whenever search keyword or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, selectedLocation, selectedBranche, selectedContract]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const handleOpenModal = async (proj: ProjectAssignmentItem) => {
    // 1. Immediately open modal with existing summary card data
    setActiveProject(proj);
    setApplySubmitted(false);
    setSubmitMessage('');
    setApplicantFile(null);
    setIsDescriptionExpanded(false);

    // 2. Fetch full details from OTYS: GET /vacancies/{id}?includeUnpublishedTextfields=true
    if (isOtysConfigured()) {
      setIsLoadingDetails(true);
      try {
        const cleanId = proj.id.replace(/^otys-/, '');
        console.log(`🔍 [ProjectsPage] Fetching complete vacancy details for ID: ${cleanId}...`);
        const fullDetails = await getJobDetails(cleanId);
        if (fullDetails) {
          console.log('✅ [ProjectsPage] Live vacancy details loaded from API:', fullDetails);
          setActiveProject(fullDetails);
        }
      } catch (err: any) {
        console.warn('Notice: Could not load extra details from API, using cached card info:', err.message);
      } finally {
        setIsLoadingDetails(false);
      }
    }
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProject) return;

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      let fileId: string | undefined;
      let owsFileUid: string | undefined;

      // 1. Upload CV file to OTYS if file selected and OTYS configured
      if (applicantFile && isOtysConfigured()) {
        try {
          const uploadRes = await uploadCvFile(applicantFile);
          fileId = typeof uploadRes === 'object' ? uploadRes.fileId : String(uploadRes);
          owsFileUid = typeof uploadRes === 'object' && uploadRes.owsFileUid ? uploadRes.owsFileUid : undefined;
        } catch (uploadErr: any) {
          console.warn('CV file upload notice:', uploadErr.message);
        }
      }

      // 2. Submit application into OTYS recruitment system & bind CV to Dossier in OTYS Go!
      if (isOtysConfigured()) {
        const cleanVacancyId = activeProject.id.replace('otys-', '').replace('macee-', '');
        const res = await submitVacancyApplication(cleanVacancyId, {
          name: applicantName,
          email: applicantEmail,
          phone: applicantPhone,
          rate: applicantRate,
          note: applicantNote,
          fileId,
          owsFileUid,
        });
        setSubmitMessage(res.message);
      } else {
        setSubmitMessage(`Thank you, ${applicantName || 'Applicant'}. Your profile for ${activeProject.title} has been logged with Macee's recruitment desk in Arnhem.`);
      }

      setApplySubmitted(true);
    } catch (err: any) {
      alert(`Submission notice: ${err.message || 'Please check your inputs and try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetFilters = () => {
    setKeyword('');
    setSelectedLocation('All');
    setSelectedBranche('All');
    setSelectedContract('All');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    Boolean(keyword) ||
    selectedLocation !== 'All' ||
    selectedBranche !== 'All' ||
    selectedContract !== 'All';

  return (
    <div className="page_projects min-h-screen bg-[#F8FAFB]">
      {/* 1. Hero Banner */}
      <section
        className="relative py-20 sm:py-28 bg-cover bg-center text-white overflow-hidden"
        style={{ backgroundImage: `url("/uploads/PM-2.jpg")` }}
      >
        <div className="absolute inset-0 bg-[#2a0209]/80 backdrop-blur-[2px]" />

        {/* Glow ambient shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#E30613]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-black/40 blur-3xl pointer-events-none" />

        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white/95 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-xs mb-4">
            <Briefcase className="w-3.5 h-3.5 text-[#E30613]" />
            <span>Macee Project &amp; Assignment Desk</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-tight">
            Projects &amp; <span className="text-[#E30613]">Vacancies</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-[#f8dada] font-medium max-w-2xl mx-auto leading-relaxed">
            Discover top-tier contract, interim, secondment, and permanent IT and Finance assignments across the Netherlands.
          </p>

          {/* Micro trust indicators & Live API status */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/90">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#E30613]" />
              SNA NEN 4400-1 Certified
            </span>
            <span className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-[#E30613]" />
              IND Recognised Sponsor
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E30613]" />
              100% Wet DBA / WAADI Compliant
            </span>


          </div>
        </div>
      </section>

      {/* 2. Main Filter Bar & Listings */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter Container */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-wider">
                <SlidersHorizontal className="w-4 h-4 text-[#E30613]" />
                <span>Search &amp; Filter Assignments</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={loadVacancies}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors cursor-pointer"
                  title="Reload vacancies from OTYS Recruitment API"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-[#E30613] ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
                <span className="text-xs text-gray-500 font-mono">
                  {filteredProjects.length} of {projectsList.length} roles shown
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Keyword Search */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Search keyword / tech
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. .NET, Kafka, Java, Security..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 focus:outline-none focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613]"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Location Select */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-gray-900 focus:outline-none focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613]"
                >
                  {locations.map((loc, i) => (
                    <option key={i} value={loc}>
                      {loc === 'All' ? 'All Locations' : loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Branche / Industry Select */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Sector / Branche
                </label>
                <select
                  value={selectedBranche}
                  onChange={(e) => setSelectedBranche(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-gray-900 focus:outline-none focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613]"
                >
                  {branches.map((br, i) => (
                    <option key={i} value={br}>
                      {br === 'All' ? 'All Sectors' : br}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contract Type Select */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Contract Model
                </label>
                <select
                  value={selectedContract}
                  onChange={(e) => setSelectedContract(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-gray-900 focus:outline-none focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613]"
                >
                  {contractTypes.map((ct, i) => (
                    <option key={i} value={ct}>
                      {ct === 'All' ? 'All Contracts' : ct}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-600">
                  Filters applied. Found <strong>{filteredProjects.length}</strong> matching vacancies.
                </span>
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-[#E30613] hover:underline cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>



          {/* 3. Project Cards Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2" id="opportunities-heading">
              <h2 className="text-2xl font-bold font-display text-gray-900">
                Current Opportunities ({filteredProjects.length})
              </h2>
              {totalPages > 1 && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                  Page {currentPage} of {totalPages}
                </span>
              )}
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 animate-pulse space-y-4">
                    <div className="h-5 bg-gray-200 rounded w-1/4" />
                    <div className="h-7 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-10 bg-gray-100 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8 shadow-xs">
                <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-xl font-bold font-display text-gray-900 mb-2">
                  No matching projects found
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  We didn't find any assignments matching your current search parameters. You can clear filters or register for automated notifications.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 px-6 py-2.5 rounded-[5px] bg-[#E30613] text-white text-sm font-semibold hover:bg-[#111827] transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              paginatedProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="group bg-white rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md border border-gray-200 hover:border-[#E30613]/50 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  {/* Left: Role Details */}
                  <div className="space-y-3.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">

                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#f8dada] text-[#E30613]">
                        {proj.branche}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                        {proj.contractType}
                      </span>
                      {proj.isFeatured && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#111827] text-white">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-900 group-hover:text-[#E30613] transition-colors">
                      {proj.title}
                    </h3>

                    {/* Metadata pills */}
                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-600">
                      <span className="flex items-center gap-1.5 font-medium">
                        <MapPin className="w-4 h-4 text-[#E30613]" />
                        {proj.location}
                      </span>
                      <span className="text-gray-300 hidden sm:inline">·</span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-4 h-4 text-[#E30613]" />
                        {proj.hours}
                      </span>
                      <span className="text-gray-300 hidden sm:inline">·</span>
                      <span className="flex items-center gap-1.5 font-bold text-gray-900">
                        <Euro className="w-4 h-4 text-[#E30613]" />
                        {proj.rate}
                      </span>
                    </div>

                    {/* Description excerpt */}
                    <p className="text-sm text-gray-700 leading-relaxed max-w-3xl">
                      {proj.description}
                    </p>

                    {/* Skill chips */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {proj.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#F8FAFB] border border-gray-200 text-gray-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[200px]">
                    <button
                      onClick={() => handleOpenModal(proj)}
                      className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-[5px] bg-[#E30613] hover:bg-[#111827] text-white font-semibold text-sm shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                    >
                      <span>View &amp; Apply</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleOpenModal(proj)}
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-[5px] border border-gray-200 hover:border-gray-300 bg-white text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Assignment Details
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* Pagination Controls */}
            {filteredProjects.length > ITEMS_PER_PAGE && (
              <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs sm:text-sm text-gray-600 font-medium">
                  Showing <span className="font-bold text-gray-900">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-bold text-gray-900">{Math.min(currentPage * ITEMS_PER_PAGE, filteredProjects.length)}</span> of <span className="font-bold text-gray-900">{filteredProjects.length}</span> opportunities
                </div>

                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => {
                      if (currentPage > 1) {
                        setCurrentPage((p) => p - 1);
                        document.getElementById('opportunities-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    disabled={currentPage === 1}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${currentPage === 1
                      ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed'
                      : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 shadow-2xs'
                      }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => {
                          setCurrentPage(pageNum);
                          document.getElementById('opportunities-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className={`w-9 h-9 rounded-lg text-xs font-bold transition-all cursor-pointer ${currentPage === pageNum
                          ? 'bg-[#E30613] text-white shadow-xs'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                          }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => {
                      if (currentPage < totalPages) {
                        setCurrentPage((p) => p + 1);
                        document.getElementById('opportunities-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    disabled={currentPage === totalPages}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${currentPage === totalPages
                      ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed'
                      : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 shadow-2xs'
                      }`}
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Modal for Detailed View & Application */}
      {activeProject && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] my-auto animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between bg-[#F8FAFB]">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">

                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#f8dada] text-[#E30613]">
                    {activeProject.branche}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-700">
                    {activeProject.contractType}
                  </span>
                  {isLoadingDetails && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
                      Loading full details...
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-900">
                  {activeProject.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-600">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#E30613]" />
                    {activeProject.location}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#E30613]" />
                    {activeProject.hours}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 font-bold text-gray-900">
                    <Euro className="w-3.5 h-3.5 text-[#E30613]" />
                    {activeProject.rate}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-4"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
              {applySubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-2xl font-bold font-display text-gray-900">
                    Application Received!
                  </h4>
                  <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    {submitMessage || `Thank you, ${applicantName || 'Applicant'}. Your application for ${activeProject.title} has been logged with Macee’s recruitment desk in Arnhem.`}
                  </p>
                  <button
                    onClick={() => {
                      setActiveProject(null);
                      setApplySubmitted(false);
                      setApplicantFile(null);
                    }}
                    className="mt-4 px-8 py-3 rounded-[5px] bg-[#E30613] text-white text-sm font-semibold hover:bg-[#111827] transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : isLoadingDetails ? (
                /* Skeleton Loader while details API loads */
                <div className="space-y-6 animate-pulse">
                  {/* Overview Skeleton */}
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-44" />
                    <div className="h-3.5 bg-gray-100 rounded w-full" />
                    <div className="h-3.5 bg-gray-100 rounded w-11/12" />
                    <div className="h-3.5 bg-gray-100 rounded w-4/5" />
                    <div className="h-3.5 bg-gray-100 rounded w-9/12" />
                  </div>

                  {/* Qualifications Skeleton */}
                  <div className="space-y-3 pt-3">
                    <div className="h-4 bg-gray-200 rounded w-48" />
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-gray-200 shrink-0" />
                        <div className="h-3.5 bg-gray-100 rounded w-10/12" />
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-gray-200 shrink-0" />
                        <div className="h-3.5 bg-gray-100 rounded w-9/12" />
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-gray-200 shrink-0" />
                        <div className="h-3.5 bg-gray-100 rounded w-11/12" />
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-gray-200 shrink-0" />
                        <div className="h-3.5 bg-gray-100 rounded w-8/12" />
                      </div>
                    </div>
                  </div>

                  {/* Compliance Box Skeleton */}
                  <div className="h-20 bg-gray-50 border border-gray-100 rounded-xl" />

                  {/* Form Skeleton */}
                  <div className="pt-4 border-t border-gray-100 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-40" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="h-10 bg-gray-100 rounded" />
                      <div className="h-10 bg-gray-100 rounded" />
                    </div>
                    <div className="h-10 bg-gray-100 rounded" />
                  </div>
                </div>
              ) : (
                <>
                  {/* 1. Assignment Parameters (Start, End, Extension, Hours) */}
                  {activeProject.shortDescriptionHtml ? (
                    <div
                      className="text-sm text-gray-800 leading-relaxed font-sans space-y-1 [&_p]:mb-0 [&_br]:block"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(activeProject.shortDescriptionHtml),
                      }}
                    />
                  ) : null}

                  {/* 2. Job Description with Show More / Show Less */}
                  <div className="pt-2">
                    <h4 className="text-xl sm:text-2xl font-normal text-gray-900 font-display mb-3">
                      Job description
                    </h4>

                    <div className="relative">
                      {activeProject.jobDescriptionHtml ? (
                        <div
                          className={`text-sm text-gray-700 leading-relaxed transition-all duration-300
                            [&_p]:mb-4 [&_p]:text-sm [&_p]:leading-relaxed
                            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3.5 [&_ul]:space-y-2.5 [&_ul]:text-sm
                            [&_li]:text-gray-700 [&_li]:leading-relaxed
                            [&_strong]:font-semibold [&_strong]:text-gray-900
                            ${!isDescriptionExpanded ? 'line-clamp-6 max-h-56 overflow-hidden' : ''}
                          `}
                          dangerouslySetInnerHTML={{
                            __html: sanitizeHtml(activeProject.jobDescriptionHtml),
                          }}
                        />
                      ) : (
                        <p
                          className={`text-sm text-gray-700 leading-relaxed whitespace-pre-line transition-all duration-300 ${!isDescriptionExpanded && activeProject.description.length > 250
                            ? 'line-clamp-4 max-h-28 overflow-hidden'
                            : ''
                            }`}
                        >
                          {activeProject.description}
                        </p>
                      )}

                      {/* Gradient fade overlay when collapsed */}
                      {!isDescriptionExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                      )}
                    </div>

                    {/* Show More / Show Less Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                      className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#E30613] hover:text-[#111827] transition-colors cursor-pointer py-1"
                    >
                      <span>{isDescriptionExpanded ? 'Show Less' : 'Show More...'}</span>
                      {isDescriptionExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* 3. Requirements & Qualifications */}
                  <div className="pt-2">
                    <h4 className="text-xl sm:text-2xl font-normal text-gray-900 font-display mb-2">
                      Requirements
                    </h4>

                    {activeProject.requirementsHtml ? (
                      <div
                        className="text-sm text-gray-700 leading-relaxed
                          [&_p]:mb-3 [&_p]:text-sm [&_p]:font-normal [&_p]:text-gray-900
                          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul]:space-y-2.5 [&_ul]:text-sm
                          [&_li]:text-gray-700 [&_li]:leading-relaxed
                          [&_strong]:font-semibold [&_strong]:text-gray-900"
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHtml(activeProject.requirementsHtml),
                        }}
                      />
                    ) : (
                      <div>
                        <p className="text-sm font-normal text-gray-900 mb-2">Required Skills &amp; Experience</p>
                        <ul className="list-disc pl-5 space-y-2.5 text-sm text-gray-700">
                          {activeProject.requirements.map((req, rIdx) => (
                            <li key={rIdx} className="leading-relaxed">
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Compliance Guarantee */}
                  <div className="p-4 rounded-xl bg-[#F8FAFB] border border-gray-200 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#E30613] shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-600 leading-relaxed">
                      <strong className="text-gray-900 block font-semibold mb-0.5">
                        Macee Compliance Assurance
                      </strong>
                      All engagements are fully covered under SNA NEN 4400-1 audit protocols, mitigating chain liability (inlenersaansprakelijkheid) and conforming with Dutch Wet DBA / WAADI guidelines.
                    </div>
                  </div>

                  {/* Quick Application Form */}
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-base font-bold font-display text-gray-900 mb-3 flex items-center gap-2">
                      <Send className="w-4 h-4 text-[#E30613]" />
                      <span>Direct Application Form</span>
                    </h4>

                    <form onSubmit={handleApplySubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Robin van Dijk"
                            value={applicantName}
                            onChange={(e) => setApplicantName(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#E30613]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. robin@example.com"
                            value={applicantEmail}
                            onChange={(e) => setApplicantEmail(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#E30613]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            placeholder="+31 6 1234 5678"
                            value={applicantPhone}
                            onChange={(e) => setApplicantPhone(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#E30613]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Target Rate or Salary Expectation
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. €95/hr or €85k/yr"
                            value={applicantRate}
                            onChange={(e) => setApplicantRate(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#E30613]"
                          />
                        </div>
                      </div>

                      {/* File upload to OTYS */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Resume / CV (PDF or Word)
                        </label>
                        <div className="relative border border-dashed border-gray-300 rounded-lg p-3.5 text-center hover:border-[#E30613] transition-colors bg-gray-50/50">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setApplicantFile(e.target.files[0]);
                              }
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                            {applicantFile ? (
                              <FileText className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Upload className="w-4 h-4 text-[#E30613]" />
                            )}
                            <span>
                              {applicantFile ? (
                                <span className="font-semibold text-gray-900">
                                  {applicantFile.name} ({(applicantFile.size / 1024).toFixed(0)} KB)
                                </span>
                              ) : (
                                'Click or drag your CV here (.pdf, .doc, .docx)'
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Short Motivation / Availability
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Available immediately, 36-40 hrs/week..."
                          value={applicantNote}
                          onChange={(e) => setApplicantNote(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#E30613]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-[5px] bg-[#E30613] hover:bg-[#111827] text-white font-semibold text-sm shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting Application to OTYS...</span>
                          </>
                        ) : (
                          <span>Submit Application to Macee Arnhem Desk</span>
                        )}
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}



      {/* 6. Job Alert Banner */}
      <JobalertBanner onNavigate={onNavigate} />

      {/* 7. Contact Form Section */}
      <ContactFormSection title="Have questions about our open projects?" />
    </div>
  );
};
