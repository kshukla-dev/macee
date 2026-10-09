import React, { useState } from 'react';
import { X, CheckCircle2, Briefcase, MapPin, Clock, Send, Upload } from 'lucide-react';
import { JobListing } from '../types';

interface JobApplicationModalProps {
  job: JobListing | null;
  onClose: () => void;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ job, onClose }) => {
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden my-8 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1D454C] text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            aria-label="Close job modal"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#E5B5D0] mb-1">
            Macee Project & Career Opportunities
          </span>
          <h3 className="text-2xl font-bold font-display text-white">
            {job.title}
          </h3>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-white/80">
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5" />
              {job.department}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {job.location}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5" />
              {job.type}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
              <h4 className="text-2xl font-bold text-[#1D454C] font-display">
                Application Submitted!
              </h4>
              <p className="text-sm text-[#54595F] max-w-md mx-auto">
                Thank you for applying for the <span className="font-semibold text-gray-800">{job.title}</span> role. Our recruiting team will review your qualifications and connect with you shortly.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2 rounded-[5px] bg-[#1D454C] text-white text-sm font-semibold hover:bg-[#153439] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1D454C] mb-2">
                  Role Description
                </h4>
                <p className="text-sm text-[#54595F] leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Key Requirements:
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-700">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#6B0D43] font-bold">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Application Form */}
              <div className="p-5 bg-[#F8FAFB] rounded-xl border border-gray-200">
                <h4 className="text-sm font-bold text-[#1D454C] mb-3">
                  Quick Apply for this Position
                </h4>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="px-3.5 py-2 text-xs sm:text-sm rounded border border-gray-300 bg-white focus:outline-none focus:border-[#1D454C]"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Email *"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      className="px-3.5 py-2 text-xs sm:text-sm rounded border border-gray-300 bg-white focus:outline-none focus:border-[#1D454C]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number *"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="px-3.5 py-2 text-xs sm:text-sm rounded border border-gray-300 bg-white focus:outline-none focus:border-[#1D454C]"
                    />
                    <label className="flex items-center justify-center gap-2 px-3.5 py-2 text-xs rounded border border-dashed border-gray-300 bg-white cursor-pointer hover:border-[#1D454C] text-gray-600">
                      <Upload className="w-3.5 h-3.5 text-gray-500" />
                      <span className="truncate">{resumeName || 'Attach Resume (PDF/Docx)'}</span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setResumeName(e.target.files[0].name);
                          }
                        }}
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-[5px] bg-[#6B0D43] hover:bg-[#1D454C] text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Application</span>
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
