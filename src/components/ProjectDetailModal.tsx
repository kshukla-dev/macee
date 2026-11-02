import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Clock,
  Euro,
  Loader2,
  CheckCircle2,
  ChevronUp,
  ChevronDown,
  ShieldCheck,
  Send,
  FileText,
  Upload,
  AlertCircle
} from 'lucide-react';
import {
  getJobDetails,
  uploadCvFile,
  submitVacancyApplication,
  sanitizeHtml
} from '../lib/api';
import { isOtysConfigured } from '../lib/auth';
import { useLanguage } from '../context/LanguageContext';
import { ProjectAssignmentItem } from '../pages/ProjectsPage';
import { JobListing } from '../types';

export interface ProjectDetailModalProps {
  project: ProjectAssignmentItem | JobListing | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  const { lang } = useLanguage();

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

  // Handle ESC key to close modal
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  // Load project details whenever project prop changes
  useEffect(() => {
    if (!project) {
      setActiveProject(null);
      return;
    }

    // Adapt JobListing or ProjectAssignmentItem into initial activeProject structure
    const initialItem: ProjectAssignmentItem = {
      id: project.id,
      title: project.title,
      category: ('category' in project ? project.category : '') || ('department' in project ? project.department : '') || 'Consultancy & IT',
      branche: ('branche' in project ? project.branche : '') || ('department' in project ? project.department : '') || 'Consultancy & IT',
      location: project.location || (lang === 'NL' ? 'Nederland' : 'Netherlands'),
      contractType: ('contractType' in project ? project.contractType : '') || ('type' in project ? project.type : '') || (lang === 'NL' ? 'Contracting / Interim' : 'Contracting / Interim'),
      hours: ('hours' in project ? project.hours : '') || ('type' in project ? project.type : '') || '32 - 40 hrs',
      rate: ('rate' in project ? project.rate : '') || 'Competitive Market Rate',
      experience: ('experience' in project ? project.experience : '') || 'Professional',
      description: project.description || '',
      shortDescriptionHtml: 'shortDescriptionHtml' in project ? project.shortDescriptionHtml : undefined,
      jobDescriptionHtml: 'jobDescriptionHtml' in project ? project.jobDescriptionHtml : undefined,
      requirementsHtml: 'requirementsHtml' in project ? project.requirementsHtml : undefined,
      requirements: project.requirements || [],
      skills: ('skills' in project ? project.skills : []) || [],
      postedDate: project.postedDate || '',
      contactPerson: 'contactPerson' in project ? project.contactPerson : undefined,
    };

    setActiveProject(initialItem);
    setApplySubmitted(false);
    setSubmitMessage('');
    setApplyError('');
    setApplicantFile(null);
    setIsDescriptionExpanded(false);

    // Fetch complete vacancy details from OTYS API if configured
    let isCancelled = false;
    if (isOtysConfigured()) {
      setIsLoadingDetails(true);
      const cleanId = String(project.id).replace(/^otys-/, '').replace(/^macee-/, '');
      getJobDetails(cleanId)
        .then((fullDetails) => {
          if (!isCancelled && fullDetails) {
            setActiveProject(fullDetails);
          }
        })
        .catch((err) => {
          console.warn('[ProjectDetailModal] Could not fetch extra details from API:', err?.message);
        })
        .finally(() => {
          if (!isCancelled) {
            setIsLoadingDetails(false);
          }
        });
    }

    return () => {
      isCancelled = true;
    };
  }, [project, lang]);

  if (!project || !activeProject) return null;

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
          console.warn('CV file upload notice:', uploadErr?.message);
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
        setSubmitMessage(
          `Thank you, ${applicantName || 'Applicant'}. Your application for ${activeProject.title} has been received by Macee's recruitment team.`
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

  const rawDescriptionText = activeProject.jobDescriptionHtml
    ? activeProject.jobDescriptionHtml.replace(/<[^>]+>/g, '').trim()
    : (activeProject.description || '').trim();
  const isLongDescription = rawDescriptionText.length > 200;

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto modal-scrollable"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] my-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
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
                Competitive Market Rate
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div
          data-lenis-prevent
          className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 modal-scrollable"
          onWheel={(e) => e.stopPropagation()}
        >
          {applySubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-2xl font-bold font-display text-gray-900">
                Application Received!
              </h4>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                {submitMessage ||
                  `Thank you, ${applicantName || 'Applicant'}. Your application for ${activeProject.title} has been received by Macee's recruitment team.`}
              </p>
              <button
                onClick={() => {
                  setApplySubmitted(false);
                  setApplicantFile(null);
                  onClose();
                }}
                className="mt-4 px-8 py-3 rounded-[5px] bg-[#E30613] text-white text-sm font-semibold hover:bg-[#111827] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : isLoadingDetails ? (
            /* Skeleton Loader while details API loads */
            <div className="space-y-6 animate-pulse">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-44" />
                <div className="h-3.5 bg-gray-100 rounded w-full" />
                <div className="h-3.5 bg-gray-100 rounded w-11/12" />
                <div className="h-3.5 bg-gray-100 rounded w-4/5" />
                <div className="h-3.5 bg-gray-100 rounded w-9/12" />
              </div>

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
                </div>
              </div>

              <div className="h-20 bg-gray-50 border border-gray-100 rounded-xl" />

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
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    {lang === 'NL' ? 'Opdracht Specificaties' : 'Assignment Overview'}
                  </h5>
                  <div
                    className="text-sm text-gray-800 leading-relaxed font-sans space-y-1 [&_p]:mb-1 [&_br]:block font-medium"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(activeProject.shortDescriptionHtml),
                    }}
                  />
                </div>
              ) : null}

              {/* 2. Job Description with Show More / Show Less Toggle */}
              <div className="pt-2">
                <h4
                  id="job-modal-description-heading"
                  className="text-xl sm:text-2xl font-normal text-gray-900 font-display mb-3"
                >
                  {lang === 'NL' ? 'Functieomschrijving' : 'Job description'}
                </h4>

                <div className="relative">
                  {activeProject.jobDescriptionHtml ? (
                    <div
                      className={`text-sm text-gray-700 leading-relaxed transition-all duration-300
                        [&_p]:mb-4 [&_p]:text-sm [&_p]:leading-relaxed
                        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3.5 [&_ul]:space-y-2.5 [&_ul]:text-sm
                        [&_li]:text-gray-700 [&_li]:leading-relaxed
                        [&_strong]:font-semibold [&_strong]:text-gray-900
                        ${isLongDescription && !isDescriptionExpanded ? 'max-h-56 overflow-hidden' : ''}
                      `}
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(activeProject.jobDescriptionHtml),
                      }}
                    />
                  ) : (
                    <p
                      className={`text-sm text-gray-700 leading-relaxed whitespace-pre-line transition-all duration-300 ${
                        isLongDescription && !isDescriptionExpanded
                          ? 'line-clamp-4 max-h-28 overflow-hidden'
                          : ''
                      }`}
                    >
                      {activeProject.description}
                    </p>
                  )}

                  {/* Gradient fade overlay when collapsed */}
                  {isLongDescription && !isDescriptionExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
                  )}
                </div>

                {/* Show More / Show Less Toggle Button */}
                {isLongDescription && (
                  <div className="mt-3.5 flex items-center">
                    <button
                      type="button"
                      onClick={() => {
                        if (isDescriptionExpanded) {
                          document
                            .getElementById('job-modal-description-heading')
                            ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                        setIsDescriptionExpanded(!isDescriptionExpanded);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg border border-red-200 hover:border-[#E30613] bg-red-50/70 hover:bg-[#E30613] text-[#E30613] hover:text-white font-semibold text-xs sm:text-sm shadow-xs hover:shadow transition-all duration-200 cursor-pointer group"
                    >
                      <span>
                        {lang === 'NL'
                          ? isDescriptionExpanded
                            ? 'Minder tonen'
                            : 'Meer tonen'
                          : isDescriptionExpanded
                          ? 'Show Less'
                          : 'Show More'}
                      </span>
                      {isDescriptionExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#E30613] group-hover:text-white transition-transform duration-200 group-hover:-translate-y-0.5" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#E30613] group-hover:text-white transition-transform duration-200 group-hover:translate-y-0.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* 3. Requirements & Qualifications */}
              <div className="pt-2">
                <h4 className="text-xl sm:text-2xl font-normal text-gray-900 font-display mb-2">
                  {lang === 'NL' ? 'Functie-eisen' : 'Requirements'}
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
                    <p className="text-sm font-normal text-gray-900 mb-2">
                      {lang === 'NL' ? 'Gewenste Kennis & Ervaring' : 'Required Skills & Experience'}
                    </p>
                    <ul className="list-disc pl-5 space-y-2.5 text-sm text-gray-700">
                      {(activeProject.requirements || []).map((req, rIdx) => (
                        <li key={rIdx} className="leading-relaxed">
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Contact Person / Recruiter Card */}
              {activeProject.contactPerson && (
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-sm">
                    {activeProject.contactPerson.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div className="text-xs text-gray-700 space-y-0.5">
                    <span className="font-semibold text-gray-900 text-sm block">
                      {activeProject.contactPerson.name}
                    </span>
                    <span className="text-gray-500 block">
                      {activeProject.contactPerson.jobTitle || 'Resourcing Manager'} · Macee
                    </span>
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-gray-600">
                      {activeProject.contactPerson.email && (
                        <a
                          href={`mailto:${activeProject.contactPerson.email}`}
                          className="hover:text-[#E30613] underline font-medium"
                        >
                          {activeProject.contactPerson.email}
                        </a>
                      )}
                      {activeProject.contactPerson.phone && (
                        <span>· {activeProject.contactPerson.phone}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Compliance Guarantee */}
              <div className="p-4 rounded-xl bg-[#F8FAFB] border border-gray-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#E30613] shrink-0 mt-0.5" />
                <div className="text-xs text-gray-600 leading-relaxed">
                  <strong className="text-gray-900 block font-semibold mb-0.5">
                    {lang === 'NL' ? 'Macee Compliance Waarborg' : 'Macee Compliance Assurance'}
                  </strong>
                  {lang === 'NL'
                    ? 'Alle opdrachten worden uitgevoerd onder SNA NEN 4400-1 normen, waarmee inlenersaansprakelijkheid wordt uitgesloten conform de Wet DBA en WAADI.'
                    : 'All engagements are fully covered under SNA NEN 4400-1 audit protocols, mitigating chain liability (inlenersaansprakelijkheid) and conforming with Dutch Wet DBA / WAADI guidelines.'}
                </div>
              </div>

              {/* Direct Application Form */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-base font-bold font-display text-gray-900 mb-3 flex items-center gap-2">
                  <Send className="w-4 h-4 text-[#E30613]" />
                  <span>{lang === 'NL' ? 'Direct Solliciteren' : 'Direct Application Form'}</span>
                </h4>

                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        {lang === 'NL' ? 'Volledige naam *' : 'Full Name *'}
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
                        {lang === 'NL' ? 'E-mailadres *' : 'Email Address *'}
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
                        {lang === 'NL' ? 'Telefoonnummer *' : 'Phone Number *'}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+31 6 1234 5678"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#E30613]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        {lang === 'NL' ? 'Gewenst tarief of salarisindicatie' : 'Target Rate or Salary Expectation'}
                      </label>
                      <input
                        type="text"
                        placeholder={lang === 'NL' ? 'bijv. €95/uur of €85k/jaar' : 'e.g. €95/hr or €85k/yr'}
                        value={applicantRate}
                        onChange={(e) => setApplicantRate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#E30613]"
                      />
                    </div>
                  </div>

                  {/* File upload to OTYS */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {lang === 'NL' ? 'Curriculum Vitae / CV (PDF of Word)' : 'Resume / CV (PDF or Word)'}
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
                          ) : lang === 'NL' ? (
                            'Klik of sleep uw CV hierheen (.pdf, .doc, .docx)'
                          ) : (
                            'Click or drag your CV here (.pdf, .doc, .docx)'
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

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

                  {/* Inline Error Alert Banner */}
                  {applyError && (
                    <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-start gap-2 animate-fadeIn">
                      <AlertCircle className="w-4 h-4 text-[#E30613] shrink-0 mt-0.5" />
                      <span>{applyError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-[5px] bg-[#E30613] hover:bg-[#111827] text-white font-semibold text-sm shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{lang === 'NL' ? 'Verzenden naar OTYS...' : 'Submitting Application...'}</span>
                      </>
                    ) : (
                      <span>{lang === 'NL' ? 'Sollicitatie Verzenden' : 'Submit Application'}</span>
                    )}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

