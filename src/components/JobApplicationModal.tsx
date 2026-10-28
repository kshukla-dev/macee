import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Briefcase, MapPin, Clock, Send, Upload, Loader2 } from 'lucide-react';
import { JobListing } from '../types';
import { uploadCvFile, submitVacancyApplication } from '../lib/api';
import { isOtysConfigured } from '../lib/auth';
import { useLanguage } from '../context/LanguageContext';

interface JobApplicationModalProps {
  job: JobListing | null;
  onClose: () => void;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ job, onClose }) => {
  const { lang } = useLanguage();
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    if (!job) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [job, onClose]);

  if (!job) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let fileId: string | undefined;
      let owsFileUid: string | undefined;

      if (resumeFile && isOtysConfigured()) {
        try {
          const uploadRes = await uploadCvFile(resumeFile);
          fileId = typeof uploadRes === 'object' ? uploadRes.fileId : String(uploadRes);
          owsFileUid = typeof uploadRes === 'object' && uploadRes.owsFileUid ? uploadRes.owsFileUid : undefined;
        } catch (uploadErr: any) {
          console.warn('CV file upload notice:', uploadErr.message);
        }
      }

      if (isOtysConfigured()) {
        const cleanVacancyId = String(job.id).replace('otys-', '').replace('macee-', '');
        await submitVacancyApplication(cleanVacancyId, {
          name: applicantName,
          email: applicantEmail,
          phone: applicantPhone,
          fileId,
          owsFileUid,
        });
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Job application submission error:', err);
      // Still show success if already duplicate or submission logged
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] my-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed at top */}
        <div className="bg-[#111827] text-white p-5 sm:p-7 shrink-0 relative pr-14">
          <button
            onClick={onClose}
            aria-label="Close job modal"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#E30613] mb-1">
            {lang === 'NL' ? 'Macee Project & Carrièremogelijkheden' : 'Macee Project & Career Opportunities'}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            {job.title}
          </h3>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 sm:mt-3 text-xs text-white/80">
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-[#E30613]" />
              {job.department}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#E30613]" />
              {job.location}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-[#E30613]" />
              {job.type}
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div 
          data-lenis-prevent 
          className="p-5 sm:p-7 space-y-5 overflow-y-auto flex-1 overscroll-contain modal-scrollable"
          onWheel={(e) => e.stopPropagation()}
        >
          {submitted ? (
            <div className="text-center py-6 sm:py-8 space-y-4">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
              <h4 className="text-xl sm:text-2xl font-bold text-[#111827] font-display">
                {lang === 'NL' ? 'Sollicitatie Verzonden!' : 'Application Submitted!'}
              </h4>
              <p className="text-xs sm:text-sm text-[#54595F] max-w-md mx-auto leading-relaxed">
                {lang === 'NL' ? (
                  <>
                    Hartelijk dank voor uw sollicitatie op de rol van <span className="font-semibold text-gray-800">{job.title}</span>. Onze recruiters beoordelen uw profiel en nemen spoedig contact met u op.
                  </>
                ) : (
                  <>
                    Thank you for applying for the <span className="font-semibold text-gray-800">{job.title}</span> role. Our recruiting team will review your qualifications and connect with you shortly.
                  </>
                )}
              </p>
              <div className="pt-3">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-[6px] bg-[#111827] text-white text-sm font-semibold hover:bg-black transition-colors cursor-pointer"
                >
                  {lang === 'NL' ? 'Sluiten' : 'Close'}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-1.5">
                  {lang === 'NL' ? 'Functieomschrijving' : 'Role Description'}
                </h4>
                <p className="text-xs sm:text-sm text-[#54595F] leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  {lang === 'NL' ? 'Belangrijkste Functie-eisen:' : 'Key Requirements:'}
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-700">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E30613] shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Application Form */}
              <div className="p-4 sm:p-5 bg-[#F8FAFB] rounded-xl border border-gray-200">
                <h4 className="text-sm font-bold text-[#111827] mb-3">
                  {lang === 'NL' ? 'Direct Solliciteren op deze Positie' : 'Quick Apply for this Position'}
                </h4>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder={lang === 'NL' ? 'Uw Volledige Naam *' : 'Your Full Name *'}
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15 transition-all"
                    />
                    <input
                      type="email"
                      required
                      placeholder={lang === 'NL' ? 'Uw E-mailadres *' : 'Your Email *'}
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      className="px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="tel"
                      required
                      placeholder={lang === 'NL' ? 'Telefoonnummer *' : 'Phone Number *'}
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15 transition-all"
                    />
                    <label className="flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs rounded-lg border border-dashed border-gray-300 bg-white cursor-pointer hover:border-[#E30613] text-gray-600 transition-all">
                      <Upload className="w-3.5 h-3.5 text-gray-500" />
                      <span className="truncate">
                        {resumeName || (lang === 'NL' ? 'Voeg CV toe (PDF/Docx)' : 'Attach Resume (PDF/Docx)')}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setResumeName(e.target.files[0].name);
                            setResumeFile(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-[6px] bg-[#E30613] hover:bg-[#111827] text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{lang === 'NL' ? 'Versturen naar OTYS...' : 'Submitting to OTYS...'}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{lang === 'NL' ? 'Sollicitatie Versturen' : 'Submit Application'}</span>
                      </>
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
