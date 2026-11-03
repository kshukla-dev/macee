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
import { PageFaqSection } from '../components/PageFaqSection';
import { PROJECTS_FAQS } from '../data/pageFaqs';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
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
import { useLanguage } from '../context/LanguageContext';

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
  contactPerson?: {
    name: string;
    jobTitle?: string;
    email?: string;
    phone?: string;
  };
}

export const ALL_PROJECTS: ProjectAssignmentItem[] = [];

export function matchesProjectBranche(
  proj: { branche?: string; category?: string; title?: string; description?: string },
  selectedBranche: string
): boolean {
  if (!selectedBranche || selectedBranche === 'All') return true;

  const sel = selectedBranche.toLowerCase().trim();
  const pBr = (proj.branche || '').toLowerCase().trim();
  const cat = (proj.category || '').toLowerCase().trim();
  const title = (proj.title || '').toLowerCase().trim();
  const desc = (proj.description || '').toLowerCase().trim();

  if (pBr === sel || pBr.includes(sel) || sel.includes(pBr)) {
    return true;
  }
  if (
    (sel.includes('ict') || sel.includes('software') || sel === 'it') &&
    (pBr.includes('ict') || pBr.includes('it') || pBr.includes('software') || cat.includes('it') || cat.includes('ict') || cat.includes('developer') || title.includes('developer') || title.includes('engineer') || title.includes('.net') || title.includes('java'))
  ) {
    return true;
  }
  if (
    (sel.includes('public') || sel.includes('overheid') || sel.includes('publiek') || sel.includes('governm')) &&
    (pBr.includes('public') || pBr.includes('overheid') || pBr.includes('publiek') || pBr.includes('governm') || cat.includes('public') || cat.includes('overheid') || title.includes('overheid') || title.includes('public'))
  ) {
    return true;
  }
  if (
    (sel.includes('bank') || sel.includes('finan') || sel.includes('fintech') || sel.includes('insurance')) &&
    (pBr.includes('bank') || pBr.includes('finan') || pBr.includes('insurance') || pBr.includes('fintech') || cat.includes('finance') || cat.includes('finan') || title.includes('bank') || title.includes('finance') || title.includes('risk'))
  ) {
    return true;
  }
  if (
    sel.includes('telecom') &&
    (pBr.includes('telecom') || cat.includes('telecom') || title.includes('telecom'))
  ) {
    return true;
  }
  if (
    (sel.includes('oil') || sel.includes('gas') || sel.includes('energy')) &&
    (pBr.includes('energy') || pBr.includes('oil') || pBr.includes('gas') || cat.includes('energy') || title.includes('energy') || title.includes('oil'))
  ) {
    return true;
  }
  if (
    sel.includes('consult') &&
    (pBr.includes('consult') || cat.includes('consult') || title.includes('consult'))
  ) {
    return true;
  }
  if (title.includes(sel) || desc.includes(sel)) {
    return true;
  }
  return false;
}

interface ProjectsPageProps {
  onNavigate: (page: string, options?: any) => void;
  initialQuery?: string;
  initialBranche?: string;
  onBrancheChange?: (branche: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onNavigate,
  initialQuery = '',
  initialBranche = 'All',
  onBrancheChange
}) => {
  const { lang, t } = useLanguage();
  const [keyword, setKeyword] = useState(initialQuery);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedBranche, setSelectedBranche] = useState(initialBranche || 'All');
  const [selectedContract, setSelectedContract] = useState('All');

  useEffect(() => {
    if (initialBranche !== undefined) {
      setSelectedBranche(initialBranche);
    }
  }, [initialBranche]);

  useEffect(() => {
    if (initialQuery !== undefined) {
      setKeyword(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    if (initialBranche && initialBranche !== 'All') {
      const timer = setTimeout(() => {
        const filterEl = document.getElementById('projects-filter-bar');
        if (filterEl) {
          filterEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [initialBranche]);

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
  const [applyError, setApplyError] = useState('');

  // Load vacancies from OTYS API (fetches all active published vacancies)
  const loadVacancies = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      if (isOtysConfigured()) {
        const jobs = await getAllJobs({
          keywords: keyword.trim() || undefined,
          itemsPerPage: 50,
        });

        if (Array.isArray(jobs) && jobs.length > 0) {
          setProjectsList(jobs);
          setIsLiveConnected(true);
          return;
        } else {
          console.log('ℹ️ [ProjectsPage] OTYS returned 0 vacancies, using curated Macee assignments.');
        }
      } else {
        console.log('⚠️ [ProjectsPage] OTYS API Key not detected in .env or local settings.');
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
  }, [keyword, lang]);

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
    ['ICT', 'Public sector', 'Banking and insurance', 'Telecom', 'Energy Transition'].forEach((b) => brSet.add(b));
    if (selectedBranche && selectedBranche !== 'All') {
      brSet.add(selectedBranche);
    }
    projectsList.forEach((p) => {
      if (p.branche) brSet.add(p.branche);
    });
    return Array.from(brSet);
  }, [projectsList, selectedBranche]);

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

        const matchesBranche = matchesProjectBranche(proj, selectedBranche);

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
    setApplyError('');
    setApplicantFile(null);
    setIsDescriptionExpanded(false);

    // 2. Fetch full details from OTYS: GET /vacancies/{id}?includeUnpublishedTextfields=true
    if (isOtysConfigured()) {
      setIsLoadingDetails(true);
      try {
        const cleanId = String(proj.id).replace(/^otys-/, '').replace(/^macee-/, '');
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
    setApplyError('');

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

      // 2. Submit application into OTYS recruitment system
      if (isOtysConfigured()) {
        const cleanVacancyId = String(activeProject.id).replace(/^otys-/, '').replace(/^macee-/, '');
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
        setSubmitMessage(`Thank you, ${applicantName || 'Applicant'}. Your application for ${activeProject.title} has been received by Macee's recruitment team.`);
      }

      setApplySubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setApplyError(err.message || 'Submission error. Please verify your details and try again.');
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
    if (onBrancheChange) {
      onBrancheChange('All');
    }
    window.history.pushState(null, '', '/projects');
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
            <span>{lang === 'NL' ? 'Macee Projecten- & Vacaturedesk' : 'Macee Project & Assignment Desk'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-tight">
            {lang === 'NL' ? (
              <>Projecten &amp; <span className="text-[#E30613]">Vacatures</span></>
            ) : (
              <>Projects &amp; <span className="text-[#E30613]">Vacancies</span></>
            )}
          </h1>

          <p className="mt-4 text-base sm:text-xl text-[#f8dada] font-medium max-w-2xl mx-auto leading-relaxed">
            {lang === 'NL'
              ? 'Ontdek toonaangevende interim-, contract-, detacherings- en vaste IT- en Finance-posities door heel Nederland.'
              : 'Discover top-tier contract, interim, secondment, and permanent IT and Finance assignments across the Netherlands.'}
          </p>

          {/* Micro trust indicators & Live API status */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/90">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#E30613]" />
              {lang === 'NL' ? 'SNA NEN 4400-1 Gecertificeerd' : 'SNA NEN 4400-1 Certified'}
            </span>
            <span className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-[#E30613]" />
              {lang === 'NL' ? 'IND Erkend Referent' : 'IND Recognised Sponsor'}
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E30613]" />
              {lang === 'NL' ? '100% Wet DBA & WAADI Compliant' : '100% Wet DBA / WAADI Compliant'}
            </span>
          </div>
        </div>
      </section>

      {/* 2. Main Filter Bar & Listings */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter Container */}
          <div id="projects-filter-bar" className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-wider">
                <SlidersHorizontal className="w-4 h-4 text-[#E30613]" />
                <span>{lang === 'NL' ? 'Zoek & Filter Opdrachten' : 'Search & Filter Assignments'}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={loadVacancies}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors cursor-pointer"
                  title={lang === 'NL' ? 'Vacatures opnieuw laden via OTYS' : 'Reload vacancies from OTYS Recruitment API'}
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-[#E30613] ${isLoading ? 'animate-spin' : ''}`} />
                  <span>{lang === 'NL' ? 'Vernieuwen' : 'Refresh'}</span>
                </button>
                <span className="text-xs text-gray-500 font-mono">
                  {lang === 'NL'
                    ? `${filteredProjects.length} van ${projectsList.length} functies getoond`
                    : `${filteredProjects.length} of ${projectsList.length} roles shown`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Keyword Search */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {lang === 'NL' ? 'Zoek op trefwoord / tech' : 'Search keyword / tech'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={lang === 'NL' ? 'bijv. .NET, Kafka, Java, Security...' : 'e.g. .NET, Kafka, Java, Security...'}
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
                  {lang === 'NL' ? 'Locatie' : 'Location'}
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-gray-900 focus:outline-none focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613]"
                >
                  {locations.map((loc, i) => (
                    <option key={i} value={loc}>
                      {loc === 'All' ? (lang === 'NL' ? 'Alle Locaties' : 'All Locations') : loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Branche / Industry Select */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {lang === 'NL' ? 'Sector / Branche' : 'Sector / Branche'}
                </label>
                <select
                  value={selectedBranche}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedBranche(val);
                    if (onBrancheChange) {
                      onBrancheChange(val);
                    }
                  }}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-gray-900 focus:outline-none focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613]"
                >
                  {branches.map((br, i) => (
                    <option key={i} value={br}>
                      {br === 'All' ? (lang === 'NL' ? 'Alle Branches' : 'All Sectors') : br}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contract Type Select */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {lang === 'NL' ? 'Contractvorm' : 'Contract Model'}
                </label>
                <select
                  value={selectedContract}
                  onChange={(e) => setSelectedContract(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-gray-900 focus:outline-none focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613]"
                >
                  {contractTypes.map((ct, i) => (
                    <option key={i} value={ct}>
                      {ct === 'All' ? (lang === 'NL' ? 'Alle Contractvormen' : 'All Contracts') : ct}
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
                  {selectedBranche !== 'All'
                    ? (lang === 'NL' ? `Geen vacatures gevonden in ${selectedBranche}` : `No matching projects found in ${selectedBranche}`)
                    : (lang === 'NL' ? 'Geen overeenkomende opdrachten gevonden' : 'No matching projects found')}
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  {selectedBranche !== 'All'
                    ? (lang === 'NL'
                      ? `Momenteel zijn er geen actieve projecten in de sector ${selectedBranche}. U kunt alle vacatures bekijken of een Job Alert instellen.`
                      : `We currently don't have active openings in ${selectedBranche}. You can view all available roles or register a Job Alert for new matches.`)
                    : (lang === 'NL'
                      ? 'We hebben geen opdrachten gevonden die aan de filters voldoen. U kunt de filters wissen of een job alert aanmaken.'
                      : "We didn't find any assignments matching your current search parameters. You can clear filters or register for automated notifications.")}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 rounded-[5px] bg-[#E30613] text-white text-sm font-semibold hover:bg-[#111827] transition-colors cursor-pointer"
                  >
                    {lang === 'NL' ? 'Bekijk alle vacatures' : 'Reset Filters & View All'}
                  </button>
                  <button
                    onClick={() => onNavigate && onNavigate('jobalert')}
                    className="px-6 py-2.5 rounded-[5px] border border-gray-300 bg-white text-gray-700 text-sm font-semibold hover:border-[#E30613] hover:text-[#E30613] transition-colors cursor-pointer"
                  >
                    {lang === 'NL' ? 'Maak Job Alert' : 'Create Job Alert'}
                  </button>
                </div>
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

                    <h3
                      onClick={() => handleOpenModal(proj)}
                      className="text-xl sm:text-2xl font-bold font-display text-gray-900 hover:text-[#E30613] cursor-pointer transition-colors inline-block"
                      title={lang === 'NL' ? 'Klik om volledige vacaturedetails te bekijken' : 'Click to view full project details'}
                    >
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
                        Competitive Market Rate
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
      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />



      {/* 5. Job Alert Banner (Positioned above FAQ as requested in Point 43) */}
      <JobalertBanner onNavigate={onNavigate} />

      {/* 6. Tailored Project & Vacancy FAQs */}
      <PageFaqSection
        id="projects-faq"
        badge="Frequently Asked Questions"
        titlePrefix="Frequently Asked"
        titleHighlight="Questions"
        description="Learn more about submitting your CV, application timelines, hybrid options, and how our recruitment desk operates."
        faqs={PROJECTS_FAQS}
        onNavigate={onNavigate}
        background="gray"
      />

      {/* 7. Contact Form Section */}
      <ContactFormSection title="Have questions about our open projects?" />
    </div>
  );
};
