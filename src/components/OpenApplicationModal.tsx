import React, { useState } from 'react';
import { X, UploadCloud, CheckCircle2, Loader2, FileText, Trash2 } from 'lucide-react';
import { uploadCvFile, submitOpenApplication } from '../lib/api';
import { isOtysConfigured } from '../lib/auth';
import { useLanguage } from '../context/LanguageContext';

interface OpenApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OpenApplicationModal: React.FC<OpenApplicationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang } = useLanguage();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleReset = () => {
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setPrivacyAgreed(false);
    setCvFile(null);
    setIsSubmitting(false);
    setIsSuccess(false);
    setStatusMessage('');
    setErrorMessage('');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!privacyAgreed) {
      setErrorMessage('Please agree with the privacy conditions to proceed.');
      return;
    }

    setIsSubmitting(true);

    try {
      let fileId: string | undefined;
      let owsFileUid: string | undefined;

      // 1. Upload CV to OTYS /files API if file provided
      if (cvFile && isOtysConfigured()) {
        try {
          const uploadRes = await uploadCvFile(cvFile);
          fileId = typeof uploadRes === 'object' ? uploadRes.fileId : String(uploadRes);
          owsFileUid = typeof uploadRes === 'object' && uploadRes.owsFileUid ? uploadRes.owsFileUid : undefined;
        } catch (uploadErr: any) {
          console.warn('[OpenApplication] CV upload warning:', uploadErr.message);
        }
      }

      // 2. Submit Open Application: POST /api/open_application
      if (isOtysConfigured()) {
        const res = await submitOpenApplication({
          firstName,
          lastName,
          email,
          phone,
          privacyAgreed,
          fileId,
          owsFileUid,
        });
        setStatusMessage(res.message);
      } else {
        setStatusMessage(
          `Thank you, ${firstName} ${lastName}. Your open application has been logged with Macee Arnhem Desk!`
        );
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit open application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-2xl sm:text-3xl font-light text-gray-800 tracking-tight font-heading">
            {lang === 'NL' ? 'Open sollicitatie' : 'Open application'}
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-700 transition-colors p-1 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {isSuccess ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-2xl font-bold font-display text-gray-900">
                {lang === 'NL' ? 'Sollicitatie ontvangen!' : 'Application Received!'}
              </h4>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                {statusMessage}
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-4 px-8 py-2.5 rounded-md bg-[#111827] hover:bg-black text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                {lang === 'NL' ? 'Sluiten' : 'Close'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3.5 rounded-md bg-red-50 border border-red-200 text-xs text-red-700">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Inputs */}
                <div className="md:col-span-6 space-y-4">
                  {/* First name & Last name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder={lang === 'NL' ? 'Voornaam *' : 'First name *'}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-md border border-gray-300 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827]"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder={lang === 'NL' ? 'Achternaam *' : 'Last name *'}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-md border border-gray-300 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827]"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder={lang === 'NL' ? 'Telefoonnummer *' : 'Phone *'}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-md border border-gray-300 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827]"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      required
                      placeholder={lang === 'NL' ? 'E-mailadres *' : 'Email *'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-md border border-gray-300 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827]"
                    />
                  </div>

                  {/* Privacy checkbox */}
                  <div className="pt-1">
                    <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacyAgreed}
                        onChange={(e) => setPrivacyAgreed(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-[#111827] focus:ring-[#111827] cursor-pointer"
                      />
                      <span>
                        {lang === 'NL'
                          ? 'Ik ga akkoord met de privacyvoorwaarden.'
                          : 'I agree with the privacy conditions.'}
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-[#111827] hover:bg-black text-white text-sm font-semibold transition-colors cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{lang === 'NL' ? 'Sollicitatie verzenden...' : 'Sending application...'}</span>
                        </>
                      ) : (
                        <span>{lang === 'NL' ? 'Sollicitatie versturen' : 'Send application'}</span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Right Side: Red dashed CV Upload Box */}
                <div className="md:col-span-6 h-full">
                  <div className="border-2 border-dashed border-red-300/80 rounded-lg p-8 sm:p-12 flex flex-col items-center justify-center text-center hover:border-red-400 hover:bg-red-50/15 transition-all relative min-h-[200px]">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setCvFile(e.target.files[0]);
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      title={lang === 'NL' ? 'Klik of sleep om CV te uploaden' : 'Click or drag to upload CV'}
                    />

                    {cvFile ? (
                      <div className="space-y-2 z-10 pointer-events-auto">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div className="text-sm font-bold text-gray-900 truncate max-w-xs">
                          {cvFile.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {(cvFile.size / 1024).toFixed(0)} KB
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCvFile(null);
                          }}
                          className="inline-flex items-center gap-1 text-xs text-red-600 hover:underline pt-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{lang === 'NL' ? 'Bestand verwijderen' : 'Remove file'}</span>
                        </button>
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="w-14 h-14 text-[#E30613] stroke-[1.4] mb-2" />
                        <span className="text-sm font-bold text-[#E30613]">
                          {lang === 'NL' ? 'Upload CV' : 'Upload CV'}
                        </span>
                        <span className="text-xs text-gray-400 mt-0.5">
                          {lang === 'NL' ? 'Sleep bestand hierheen of blader' : 'Drag & Drop or Browse'}
                        </span>
                      </>
                    )}
                  </div>
                </div>

              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
