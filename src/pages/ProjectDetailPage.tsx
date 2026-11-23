import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Clock,
  Euro,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Send,
  FileText,
  Upload,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Share2,
  Briefcase,
  Calendar,
  Check,
  Sparkles,
  ChevronRight,
  Building2,
  UserCheck
} from 'lucide-react';
import {
  getJobDetails,
  uploadCvFile,
  submitVacancyApplication,
  getAllJobs,
  getCachedJobs,
  sanitizeHtml,
  API_ENDPOINTS
} from '../lib/api';
import { isOtysConfigured } from '../lib/auth';
import { useLanguage } from '../context/LanguageContext';
import { ProjectAssignmentItem } from './ProjectsPage';
import { PageFaqSection } from '../components/PageFaqSection';
import { PROJECTS_FAQS } from '../data/pageFaqs';
import { SEO } from '../components/SEO';
import { getProjectDetailSchema } from '../data/seoSchemas';
import {
  isValidEmail,
  isValidPhone,
  isValidName,
  validateCvFile,
  VALIDATION_MESSAGES
} from '../lib/validation';

export interface ProjectDetailPageProps {
  projectId?: string | null;
  initialProject?: ProjectAssignmentItem | null;
  onNavigate: (page: string, options?: any) => void;
  onOpenConsultation?: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  projectId,
  initialProject,
  onNavigate,
  onOpenConsultation
}) => {
  const { lang, t } = useLanguage();
  const msgs = VALIDATION_MESSAGES[lang] || VALIDATION_MESSAGES.EN;

  const [project, setProject] = useState<ProjectAssignmentItem | null>(initialProject || null);
  const [isLoading, setIsLoading] = useState(!initialProject);
  const [isLoadingExtra, setIsLoadingExtra] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<ProjectAssignmentItem[]>([]);
  const [isCopied, setIsCopied] = useState(false);

  // Application form state
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantRate, setApplicantRate] = useState('');
  const [applicantNote, setApplicantNote] = useState('');
  const [applicantFile, setApplicantFile] = useState<File | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applySubmitted, setApplySubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [applyError, setApplyError] = useState('');

  // 1. Resolve project by ID or initialProject
  useEffect(() => {
    let isCancelled = false;

    // Scroll to top upon page navigation
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    async function loadProject() {
      const targetId = projectId || (initialProject ? initialProject.id : null);
      if (!targetId && !initialProject) {
        setIsLoading(false);
        setError(lang === 'NL' ? 'Geen vacature geselecteerd.' : 'No vacancy selected.');
        return;
      }

      // If initialProject already provided, start with it
      if (initialProject && !project) {
        setProject(initialProject);
      }

      const cleanId = String(targetId).replace(/^otys-/, '').replace(/^macee-/, '').trim();

      // If we don't have full rich details yet, fetch them from OTYS
      if (isOtysConfigured() && cleanId) {
        setIsLoadingExtra(true);
        try {
          const fullDetails = await getJobDetails(cleanId);
          if (!isCancelled && fullDetails && fullDetails.title) {
            setProject(fullDetails);
            setError(null);
          }
        } catch (apiErr: any) {
          console.warn('[ProjectDetailPage] Could not fetch extra details from details endpoint:', apiErr?.message);
        } finally {
          if (!isCancelled) setIsLoadingExtra(false);
        }
      }

      // If still no project (e.g. direct URL visit or refreshed page), resolve from all jobs
      if (!project && !initialProject && cleanId) {
        setIsLoading(true);
        try {
          // Check cached jobs first
          const cached = getCachedJobs();
          let found = cached?.find((p) => {
            const pClean = String(p.id).replace(/^otys-/, '').replace(/^macee-/, '');
            return pClean === cleanId || p.id === targetId || p.slug === cleanId;
          });

          if (!found) {
            const all = await getAllJobs({ itemsPerPage: 50 });
            found = all.find((p) => {
              const pClean = String(p.id).replace(/^otys-/, '').replace(/^macee-/, '');
              return (
                pClean === cleanId ||
                p.id === targetId ||
                p.slug === cleanId ||
                p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === cleanId.toLowerCase()
              );
            });
          }

          if (!isCancelled) {
            if (found) {
              setProject(found);
              setError(null);
            } else {
              setError(
                lang === 'NL'
                  ? 'Vacature niet gevonden of mogelijk reeds vervuld.'
                  : 'Vacancy not found or may have expired.'
              );
            }
          }
        } catch (err: any) {
          if (!isCancelled) {
            setError(
              lang === 'NL'
                ? 'Er is een fout opgetreden bij het laden van de vacature.'
                : 'An error occurred while loading this vacancy.'
            );
          }
        } finally {
          if (!isCancelled) setIsLoading(false);
        }
      } else {
        if (!isCancelled) setIsLoading(false);
      }

      // Load 3 related projects
      try {
        const cached = getCachedJobs();
        const all = cached && cached.length > 0 ? cached : await getAllJobs({ itemsPerPage: 10 });
        if (!isCancelled && all) {
          const currentIdStr = String(targetId);
          const others = all.filter((p) => String(p.id) !== currentIdStr).slice(0, 3);
          setRelatedProjects(others);
        }
      } catch (relatedErr) {
        console.warn('Could not load related projects:', relatedErr);
      }
    }

    loadProject();

    return () => {
      isCancelled = true;
    };
  }, [projectId, initialProject, lang]);

  // Update document title for SEO
  useEffect(() => {
    if (project?.title) {
      const orig = document.title;
      document.title = `${project.title} | Macee External Workforce Solutions`;
      return () => {
        document.title = orig;
      };
    }
  }, [project?.title]);

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'applicantName':
        if (!value.trim()) return msgs.fullNameRequired;
        if (!isValidName(value)) return msgs.fullNameRequired;
        return '';
      case 'applicantEmail':
        if (!value.trim()) return msgs.emailRequired;
        if (!isValidEmail(value)) return msgs.emailInvalid;
        return '';
      case 'applicantPhone':
        if (!value.trim()) return msgs.phoneInvalid;
        if (!isValidPhone(value)) return msgs.phoneInvalid;
        return '';
      default:
        return '';
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    if (field === 'applicantName') setApplicantName(value);
    if (field === 'applicantEmail') setApplicantEmail(value);
    if (field === 'applicantPhone') setApplicantPhone(value);
    if (field === 'applicantRate') setApplicantRate(value);
    if (field === 'applicantNote') setApplicantNote(value);

    if (touched[field]) {
      const err = validateField(field, value);
      setFieldErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleFieldBlur = (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, value);
    setFieldErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setApplicantFile(null);
      setFieldErrors((prev) => ({ ...prev, applicantFile: '' }));
      return;
    }
    const check = validateCvFile(file, lang);
    if (!check.valid) {
      setFieldErrors((prev) => ({ ...prev, applicantFile: check.error || '' }));
      setApplicantFile(null);
    } else {
      setFieldErrors((prev) => ({ ...prev, applicantFile: '' }));
      setApplicantFile(file);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
      }
    } catch (err) {
      console.warn('Share copy failed:', err);
    }
  };

  const scrollToApply = () => {
    const el = document.getElementById('apply-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;

    const newErrors: Record<string, string> = {
      applicantName: validateField('applicantName', applicantName),
      applicantEmail: validateField('applicantEmail', applicantEmail),
      applicantPhone: validateField('applicantPhone', applicantPhone),
    };

    if (applicantFile) {
      const fileCheck = validateCvFile(applicantFile, lang);
      if (!fileCheck.valid) {
        newErrors.applicantFile = fileCheck.error || '';
      }
    }

    setFieldErrors(newErrors);
    setTouched({
      applicantName: true,
      applicantEmail: true,
      applicantPhone: true,
      applicantFile: true,
    });

    const hasErrors = Object.values(newErrors).some((err) => Boolean(err));
    if (hasErrors) {
      return;
    }

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
          console.warn('CV file upload notice:', uploadErr?.message);
        }
      }

      // 2. Submit application into OTYS recruitment system
      if (isOtysConfigured()) {
        const cleanVacancyId = String(project.id).replace(/^otys-/, '').replace(/^macee-/, '');
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
        setSubmitMessage(
          lang === 'NL'
            ? `Bedankt, ${applicantName || 'kandidaat'}. Uw sollicitatie voor ${project.title} is succesvol ontvangen door het Macee recruitment team.`
            : `Thank you, ${applicantName || 'Applicant'}. Your application for ${project.title} has been received by Macee's recruitment team.`
        );
      }

      setApplySubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setApplyError(err.message || 'Submission error. Please verify your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading skeleton screen
  if (isLoading) {
    return (
      <div className="page_project_detail min-h-screen bg-[#F8FAFB]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="h-6 bg-gray-200 rounded w-48 mb-8 animate-pulse" />
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6 animate-pulse">
              <div className="flex gap-3">
                <div className="h-6 bg-red-100 rounded-full w-28" />
                <div className="h-6 bg-gray-100 rounded-full w-24" />
              </div>
              <div className="h-10 bg-gray-200 rounded w-3/4" />
              <div className="flex gap-6">
                <div className="h-5 bg-gray-100 rounded w-32" />
                <div className="h-5 bg-gray-100 rounded w-28" />
                <div className="h-5 bg-gray-100 rounded w-40" />
              </div>
            </div>
          </div>
        </div>
        );
  }

        // Error screen
        if (error || !project) {
    return (
        <div className="page_project_detail min-h-screen bg-[#F8FAFB] py-16 px-4">
          <div className="max-w-xl mx-auto text-center bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-red-50 text-[#E30613] flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold font-display text-gray-900 mb-2">
              {lang === 'NL' ? 'Vacature niet beschikbaar' : 'Vacancy not available'}
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              {error || (lang === 'NL' ? 'Deze vacature is niet gevonden.' : 'This vacancy could not be found.')}
            </p>
            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[5px] bg-[#E30613] text-white font-semibold text-sm hover:bg-[#111827] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'NL' ? 'Bekijk alle vacatures' : 'Explore all vacancies'}</span>
            </button>
          </div>
        </div>
        );
  }

        return (
        <div className="page_project_detail min-h-screen bg-[#F8FAFB]">
          <SEO
            title={`${project.title} | ${project.location || 'Netherlands'} | Macee`}
            description={
              project.description
                ? project.description.slice(0, 155).replace(/\s+/g, ' ')
                : `Apply for ${project.title} in ${project.location || 'the Netherlands'}. Top assignment with Macee External Workforce Solutions.`
            }
            canonicalPath={`/projects/${String(project.id).replace(/^otys-/, '')}`}
            lang={lang}
            schema={getProjectDetailSchema(project)}
          />

          {/* 1. Header / Breadcrumb & Back Strip */}
          <section className="bg-white border-b border-gray-200">
              <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Breadcrumbs */}
                  <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
                    <button
                      onClick={() => onNavigate('home')}
                      className="hover:text-[#E30613] transition-colors cursor-pointer"
                    >
                      {lang === 'NL' ? 'Home' : 'Home'}
                    </button>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <button
                      onClick={() => onNavigate('projects')}
                      className="hover:text-[#E30613] transition-colors cursor-pointer"
                    >
                      {lang === 'NL' ? 'Vacatures & Opdrachten' : 'Projects & Vacancies'}
                    </button>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-xs">
                      {project.title}
                    </span>
                  </nav>

                  {/* Back button */}
                  <button
                    onClick={() => onNavigate('projects')}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#E30613] transition-colors cursor-pointer shrink-0"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{lang === 'NL' ? 'Terug naar alle vacatures' : 'Back to all projects'}</span>
                  </button>
                </div>
              </div>
          </section>

          {/* 2. Vacancy Hero Title Card */}
          <section className="relative bg-gradient-to-b from-white via-white to-[#F8FAFB] pt-8 sm:pt-12 pb-8 border-b border-gray-100">
              <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="space-y-4 max-w-3xl">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#f8dada] text-[#E30613]">
                        {project.branche || 'Consultancy & IT'}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 border border-gray-200 text-gray-800">
                        {project.contractType || 'Contracting'}
                      </span>

                      {isLoadingExtra && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 animate-pulse">
                          <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
                          {lang === 'NL' ? 'Details synchroniseren...' : 'Syncing live details...'}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-gray-900 tracking-tight leading-tight">
                      {project.title}
                    </h1>

                    {/* Meta pills strip */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 pt-1">
                      <span className="flex items-center gap-1.5 font-medium">
                        <MapPin className="w-4 h-4 text-[#E30613]" />
                        {project.location}
                      </span>
                      <span className="text-gray-300 hidden sm:inline">·</span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-4 h-4 text-[#E30613]" />
                        {project.hours}
                      </span>
                      <span className="text-gray-300 hidden sm:inline">·</span>
                      <span className="flex items-center gap-1.5 font-bold text-gray-900">
                        <Euro className="w-4 h-4 text-[#E30613]" />
                        {project.rate || 'Competitive Market Rate'}
                      </span>
                      {project.postedDate && (
                        <>
                          <span className="text-gray-300 hidden sm:inline">·</span>
                          <span className="flex items-center gap-1.5 text-gray-500 font-mono text-xs">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            {project.postedDate}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Top Quick Actions */}
                  <div className="flex flex-row sm:flex-row lg:flex-col gap-3 shrink-0 pt-2 lg:pt-0">
                    <button
                      onClick={scrollToApply}
                      className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[5px] bg-[#E30613] hover:bg-[#111827] text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                    >
                      <span>{lang === 'NL' ? 'Direct Solliciteren' : 'Apply Now'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={handleShare}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-[5px] bg-white border border-gray-300 hover:border-[#111827] text-gray-700 hover:text-[#111827] font-semibold text-sm transition-all duration-200 cursor-pointer"
                      title={lang === 'NL' ? 'Kopieer vacaturelink' : 'Copy vacancy link'}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">{lang === 'NL' ? 'Gekopieerd!' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-4 h-4 text-gray-500" />
                          <span>{lang === 'NL' ? 'Delen' : 'Share'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
          </section>

          {/* 3. Main Detail Content (2 Columns: Detail specs & Description on Left, Sticky Apply Card on Right) */}
          <section className="py-10 sm:py-14">
              <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                  {/* Left Column: Full Specifications, Description & Requirements (7 Cols) */}
                  <div className="lg:col-span-7 space-y-8">
                    {/* Assignment Overview / Opdracht Specificaties (Prominent Card matching user screenshot) */}
                    {project.shortDescriptionHtml ? (
                      <div className="p-6 sm:p-7 rounded-2xl bg-white border border-gray-200/90 shadow-xs">
                        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-100">
                          <Sparkles className="w-4 h-4 text-[#E30613]" />
                          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-700 font-display">
                            {lang === 'NL' ? 'Opdracht Specificaties' : 'Assignment Overview'}
                          </h2>
                        </div>
                        <div
                          className="text-sm text-gray-800 leading-relaxed font-sans space-y-2 [&_p]:mb-1.5 [&_br]:block font-medium"
                          dangerouslySetInnerHTML={{
                            __html: sanitizeHtml(project.shortDescriptionHtml),
                          }}
                        />
                      </div>
                    ) : null}

                    {/* Job Description */}
                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4">
                      <h2 className="text-2xl sm:text-3xl font-normal font-display text-gray-900">
                        {lang === 'NL' ? 'Functieomschrijving' : 'Job description'}
                      </h2>

                      {project.jobDescriptionHtml ? (
                        <div
                          className="text-sm sm:text-base text-gray-700 leading-relaxed font-sans
                      [&_p]:mb-4 [&_p]:leading-relaxed
                      [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-4 [&_ul]:space-y-2.5
                      [&_li]:text-gray-700 [&_li]:leading-relaxed
                      [&_strong]:font-semibold [&_strong]:text-gray-900
                    "
                          dangerouslySetInnerHTML={{
                            __html: sanitizeHtml(project.jobDescriptionHtml),
                          }}
                        />
                      ) : (
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                          {project.description}
                        </p>
                      )}
                    </div>

                    {/* Requirements & Qualifications */}
                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4">
                      <h2 className="text-2xl sm:text-3xl font-normal font-display text-gray-900">
                        {lang === 'NL' ? 'Functie-eisen' : 'Requirements'}
                      </h2>

                      {project.requirementsHtml ? (
                        <div
                          className="text-sm sm:text-base text-gray-700 leading-relaxed font-sans
                      [&_p]:mb-3 [&_p]:text-gray-900 [&_p]:font-medium
                      [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul]:space-y-2.5
                      [&_li]:text-gray-700 [&_li]:leading-relaxed
                      [&_strong]:font-semibold [&_strong]:text-gray-900
                    "
                          dangerouslySetInnerHTML={{
                            __html: sanitizeHtml(project.requirementsHtml),
                          }}
                        />
                      ) : (
                        <div>
                          <p className="text-sm font-semibold text-gray-900 mb-3">
                            {lang === 'NL' ? 'Gewenste Kennis & Ervaring' : 'Required Skills & Experience'}
                          </p>
                          <ul className="list-disc pl-5 space-y-2.5 text-sm sm:text-base text-gray-700">
                            {(project.requirements || []).map((req, rIdx) => (
                              <li key={rIdx} className="leading-relaxed">
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Skill Chips */}
                      {project.skills && project.skills.length > 0 && (
                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
                            {lang === 'NL' ? 'Kerncompetenties & Domeinen' : 'Core Skills & Domains'}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            {project.skills.map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-3 py-1 rounded-md text-xs font-semibold bg-gray-50 border border-gray-200 text-gray-800"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Recruiter / Contact Person Card */}
                    {project.contactPerson && (
                      <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-base shadow-xs">
                          {project.contactPerson.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-700 space-y-1">
                          <span className="font-bold text-gray-900 text-base block font-display">
                            {project.contactPerson.name}
                          </span>
                          <span className="text-gray-500 block">
                            {project.contactPerson.jobTitle || 'Resourcing Manager'} · Macee External Workforce
                          </span>
                          <div className="flex flex-wrap items-center gap-3 pt-1.5 text-gray-600 font-medium">
                            {project.contactPerson.email && (
                              <a
                                href={`mailto:${project.contactPerson.email}`}
                                className="hover:text-[#E30613] underline"
                              >
                                {project.contactPerson.email}
                              </a>
                            )}
                            {project.contactPerson.phone && (
                              <span>· {project.contactPerson.phone}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Macee Compliance Waarborg Guarantee */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200 flex items-start gap-4 shadow-xs">
                      <div className="w-10 h-10 rounded-full bg-red-50 text-[#E30613] flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        <strong className="text-gray-900 block font-bold text-sm sm:text-base mb-1 font-display">
                          {lang === 'NL' ? 'Macee Compliance Waarborg' : 'Macee Compliance Assurance'}
                        </strong>
                        {lang === 'NL'
                          ? 'Alle opdrachten worden uitgevoerd onder strikte SNA NEN 4400-1 normen, waarmee inlenersaansprakelijkheid wordt uitgesloten conform de Wet DBA en WAADI.'
                          : 'All engagements are fully managed under SNA NEN 4400-1 audit protocols, mitigating hiring chain liability (inlenersaansprakelijkheid) and strictly conforming with Dutch Wet DBA / WAADI guidelines.'}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Sticky Direct Application Card (5 Cols) */}
                  <div className="lg:col-span-5 lg:sticky lg:top-24">
                    <div
                      id="apply-card"
                      className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-md scroll-mt-28"
                    >
                      {applySubmitted ? (
                        <div className="text-center py-8 space-y-4">
                          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                            <CheckCircle2 className="w-9 h-9" />
                          </div>
                          <h3 className="text-2xl font-bold font-display text-gray-900">
                            {lang === 'NL' ? 'Sollicitatie Ontvangen!' : 'Application Received!'}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {submitMessage ||
                              (lang === 'NL'
                                ? `Bedankt, ${applicantName || 'kandidaat'}. Uw reactie voor ${project.title} is succesvol doorgestuurd naar onze recruitment consultants.`
                                : `Thank you, ${applicantName || 'Applicant'}. Your application for ${project.title} has been received by Macee's recruitment team.`)}
                          </p>
                          <div className="pt-4 flex flex-col gap-2">
                            <button
                              onClick={() => {
                                setApplySubmitted(false);
                                setApplicantFile(null);
                              }}
                              className="w-full py-3 px-6 rounded-[5px] bg-[#E30613] text-white text-sm font-semibold hover:bg-[#111827] transition-colors cursor-pointer"
                            >
                              {lang === 'NL' ? 'Nog een sollicitatie indienen' : 'Submit Another Application'}
                            </button>
                            <button
                              onClick={() => onNavigate('projects')}
                              className="w-full py-3 px-6 rounded-[5px] bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                              {lang === 'NL' ? 'Verder bladeren in vacatures' : 'Browse More Vacancies'}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {/* Header */}
                          <div className="mb-6 pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-2 mb-1">
                              <Send className="w-4 h-4 text-[#E30613]" />
                              <h3 className="text-xl font-bold font-display text-gray-900">
                                {lang === 'NL' ? 'Direct Solliciteren' : 'Direct Application'}
                              </h3>
                            </div>
                            <p className="text-xs text-gray-500">
                              {lang === 'NL'
                                ? 'Reageer direct op deze opdracht. Wij nemen binnen 24-48 uur contact met u op.'
                                : 'Apply directly for this assignment. Our resourcing team will connect with you within 24-48 hrs.'}
                            </p>
                          </div>

                          <form onSubmit={handleApplySubmit} noValidate className="space-y-4">
                            {/* Full Name */}
                            <div>
                              <label className="block text-xs font-semibold text-gray-700 mb-1">
                                {lang === 'NL' ? 'Volledige naam *' : 'Full Name *'}
                              </label>
                              <input
                                type="text"
                                placeholder={lang === 'NL' ? 'bijv. Robin van Dijk' : 'e.g. Robin van Dijk'}
                                value={applicantName}
                                onChange={(e) => handleFieldChange('applicantName', e.target.value)}
                                onBlur={() => handleFieldBlur('applicantName', applicantName)}
                                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none transition-all ${fieldErrors.applicantName
                                  ? 'border-[#E30613] focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15'
                                  : 'border-gray-300 focus:border-[#E30613]'
                                  }`}
                              />
                              {fieldErrors.applicantName && (
                                <p className="mt-1 text-xs text-[#E30613] font-medium flex items-center gap-1 animate-fadeIn">
                                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                  <span>{fieldErrors.applicantName}</span>
                                </p>
                              )}
                            </div>

                            {/* Email */}
                            <div>
                              <label className="block text-xs font-semibold text-gray-700 mb-1">
                                {lang === 'NL' ? 'E-mailadres *' : 'Email Address *'}
                              </label>
                              <input
                                type="email"
                                placeholder="e.g. robin@example.com"
                                value={applicantEmail}
                                onChange={(e) => handleFieldChange('applicantEmail', e.target.value)}
                                onBlur={() => handleFieldBlur('applicantEmail', applicantEmail)}
                                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none transition-all ${fieldErrors.applicantEmail
                                  ? 'border-[#E30613] focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15'
                                  : 'border-gray-300 focus:border-[#E30613]'
                                  }`}
                              />
                              {fieldErrors.applicantEmail && (
                                <p className="mt-1 text-xs text-[#E30613] font-medium flex items-center gap-1 animate-fadeIn">
                                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                  <span>{fieldErrors.applicantEmail}</span>
                                </p>
                              )}
                            </div>

                            {/* Phone */}
                            <div>
                              <label className="block text-xs font-semibold text-gray-700 mb-1">
                                {lang === 'NL' ? 'Telefoonnummer *' : 'Phone Number *'}
                              </label>
                              <input
                                type="tel"
                                placeholder="+31 6 1234 5678"
                                value={applicantPhone}
                                onChange={(e) => handleFieldChange('applicantPhone', e.target.value)}
                                onBlur={() => handleFieldBlur('applicantPhone', applicantPhone)}
                                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none transition-all ${fieldErrors.applicantPhone
                                  ? 'border-[#E30613] focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15'
                                  : 'border-gray-300 focus:border-[#E30613]'
                                  }`}
                              />
                              {fieldErrors.applicantPhone && (
                                <p className="mt-1 text-xs text-[#E30613] font-medium flex items-center gap-1 animate-fadeIn">
                                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                  <span>{fieldErrors.applicantPhone}</span>
                                </p>
                              )}
                            </div>

                            {/* Target Rate or Salary */}
                            <div>
                              <label className="block text-xs font-semibold text-gray-700 mb-1">
                                {lang === 'NL' ? 'Gewenst tarief of salarisindicatie' : 'Target Rate or Salary Expectation'}
                              </label>
                              <input
                                type="text"
                                placeholder={lang === 'NL' ? 'bijv. €95/uur of €85k/jaar' : 'e.g. €95/hr or €85k/yr'}
                                value={applicantRate}
                                onChange={(e) => handleFieldChange('applicantRate', e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#E30613]"
                              />
                            </div>

                            {/* CV File Upload */}
                            <div>
                              <label className="block text-xs font-semibold text-gray-700 mb-1">
                                {lang === 'NL' ? 'Curriculum Vitae / CV (PDF of Word)' : 'Resume / CV (PDF or Word)'}
                              </label>
                              <div
                                className={`relative border border-dashed rounded-lg p-3.5 text-center transition-colors bg-gray-50/50 ${fieldErrors.applicantFile
                                  ? 'border-[#E30613] bg-red-50/20'
                                  : 'border-gray-300 hover:border-[#E30613]'
                                  }`}
                              >
                                <input
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      handleFileChange(e.target.files[0]);
                                    }
                                  }}
                                  className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                                  {applicantFile ? (
                                    <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                                  ) : (
                                    <Upload className="w-4 h-4 text-[#E30613] shrink-0" />
                                  )}
                                  <span className="truncate">
                                    {applicantFile ? (
                                      <span className="font-semibold text-gray-900">
                                        {applicantFile.name} ({(applicantFile.size / 1024).toFixed(0)} KB)
                                      </span>
                                    ) : lang === 'NL' ? (
                                      'Klik of sleep uw CV hierheen (.pdf, max 10MB)'
                                    ) : (
                                      'Click or drag your CV here (.pdf, max 10MB)'
                                    )}
                                  </span>
                                </div>
                              </div>
                              {fieldErrors.applicantFile && (
                                <p className="mt-1 text-xs text-[#E30613] font-medium flex items-center gap-1 animate-fadeIn">
                                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                  <span>{fieldErrors.applicantFile}</span>
                                </p>
                              )}
                            </div>

                            {/* Short Motivation */}
                            <div>
                              <label className="block text-xs font-semibold text-gray-700 mb-1">
                                {lang === 'NL' ? 'Korte motivatie / Beschikbaarheid' : 'Short Motivation / Availability'}
                              </label>
                              <textarea
                                rows={2}
                                placeholder={
                                  lang === 'NL'
                                    ? 'Per direct beschikbaar, 36-40 uur/week...'
                                    : 'Available immediately, 36-40 hrs/week...'
                                }
                                value={applicantNote}
                                onChange={(e) => setApplicantNote(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#E30613]"
                              />
                            </div>

                            {/* Error Alert */}
                            {applyError && (
                              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-[#E30613] shrink-0 mt-0.5" />
                                <span>{applyError}</span>
                              </div>
                            )}

                            {/* Submit Button */}
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full py-3.5 px-6 rounded-[5px] bg-[#E30613] hover:bg-[#111827] text-white font-semibold text-sm shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  <span>{lang === 'NL' ? 'Sollicitatie verzenden...' : 'Submitting Application...'}</span>
                                </>
                              ) : (
                                <>
                                  <span>{lang === 'NL' ? 'Sollicitatie Verzenden' : 'Submit Application'}</span>
                                  <ArrowRight className="w-4 h-4" />
                                </>
                              )}
                            </button>

                            <div className="text-center pt-2">
                              <span className="text-[11px] text-gray-400">
                                {lang === 'NL'
                                  ? 'Uw gegevens worden uitsluitend verwerkt conform onze privacyverklaring.'
                                  : 'Your information is strictly processed per Macee’s GDPR privacy standards.'}
                              </span>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
          </section>

          {/* 4. Related Vacancies Section */}
          {relatedProjects.length > 0 && (
            <section className="py-12 bg-white border-t border-gray-200">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#E30613] font-display">
                        {lang === 'NL' ? 'Meer Mogelijkheden' : 'Explore More Opportunities'}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 mt-1">
                        {lang === 'NL' ? 'Andere Actuele Opdrachten' : 'Similar Open Positions'}
                      </h2>
                    </div>
                    <button
                      onClick={() => onNavigate('projects')}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#E30613] hover:text-[#111827] transition-colors cursor-pointer"
                    >
                      <span>{lang === 'NL' ? 'Alle vacatures bekijken' : 'View all vacancies'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedProjects.map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => onNavigate(`projects/${rel.id}`, rel)}
                        className="p-5 rounded-xl border border-gray-100 bg-[#F8FAFB] hover:bg-white hover:border-[#111827]/30 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#f8dada] text-[#E30613]">
                              {rel.branche || 'Consultancy'}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-700">
                              {rel.contractType || 'Contracting'}
                            </span>
                          </div>
                          <h3 className="text-base font-bold font-display text-gray-900 group-hover:text-[#E30613] transition-colors line-clamp-2">
                            {rel.title}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-[#E30613]" />
                              {rel.location}
                            </span>
                            <span>·</span>
                            <span className="flex items-center gap-1 font-mono">
                              <Clock className="w-3.5 h-3.5 text-[#E30613]" />
                              {rel.hours}
                            </span>
                          </div>
                        </div>

                        <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#E30613] group-hover:text-[#111827]">
                          <span>{lang === 'NL' ? 'Bekijk Opdracht' : 'View Opportunity'}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            </section>
          )}

          {/* 5. FAQs Section */}
          <PageFaqSection
            id="project-faq"
            pageKey="projects"
            badge={lang === 'NL' ? 'Veelgestelde Vragen' : 'Application FAQs'}
            titlePrefix={lang === 'NL' ? 'Vragen over' : 'Frequently Asked'}
            titleHighlight={lang === 'NL' ? 'Sollicitaties & Detachering' : 'Questions & Process'}
            description={
              lang === 'NL'
                ? 'Alles wat u moet weten over onze selectieprocedure, tarieven, en SNA NEN 4400-1 waarborgen.'
                : 'Everything you need to know about our recruitment procedure, contracting models, and Dutch compliance.'
            }
            faqs={PROJECTS_FAQS}
            onNavigate={onNavigate}
            background="gray"
          />
        </div>
        );
};

        export default ProjectDetailPage;
