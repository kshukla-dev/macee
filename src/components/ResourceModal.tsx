import React, { useState } from 'react';
import { X, Download, CheckCircle2, FileText, ArrowRight, BookOpen } from 'lucide-react';
import { ResourceItem } from '../types';

interface ResourceModalProps {
  resource: ResourceItem | null;
  onClose: () => void;
}

export const ResourceModal: React.FC<ResourceModalProps> = ({ resource, onClose }) => {
  const [email, setEmail] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  if (!resource) return null;

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloaded(true);
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
            aria-label="Close resource modal"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#E5B5D0] mb-1">
            {resource.type}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white leading-snug">
            {resource.title}
          </h3>
          <p className="text-xs sm:text-sm text-white/80 mt-2 font-mono">
            {resource.pages} · Free Digital Download
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-full sm:w-44 h-32 sm:h-auto aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
              <img
                src={resource.image}
                alt={resource.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2 flex-1">
              <h4 className="text-sm font-bold text-[#1D454C] uppercase tracking-wide">
                Overview & Strategic Intent
              </h4>
              <p className="text-sm text-[#54595F] leading-relaxed">
                {resource.description}
              </p>
            </div>
          </div>

          {/* Topics & Key Takeaways */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              Included In This Download:
            </h4>
            <div className="space-y-2">
              {resource.topics.map((topic, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#1D454C] shrink-0 mt-0.5" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Download Form / Success */}
          <div className="p-5 bg-[#F8FAFB] rounded-xl border border-gray-200/80">
            {downloaded ? (
              <div className="text-center py-4 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h5 className="text-base font-bold text-[#1D454C]">
                  Your Download Has Started!
                </h5>
                <p className="text-xs text-[#54595F]">
                  A copy has also been dispatched to <span className="font-semibold text-gray-800">{email || 'your email'}</span>.
                </p>
                <div className="pt-2">
                  <a
                    href={`/images/${resource.downloadName.replace('.pdf', '')}`}
                    download={resource.downloadName}
                    onClick={(e) => {
                      e.preventDefault();
                      // Trigger download alert or dummy file
                      const blob = new Blob([`${resource.title}\n\nMacee External Workforce Solutions Guide\nVisit: https://www.macee.com/\nPhone: +31 (0)26 744 0024`], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${resource.downloadName.replace('.pdf', '')}.txt`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#1D454C] text-white text-xs font-semibold hover:bg-[#153439] cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Save {resource.downloadName}</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDownload} className="space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your business email for instant access"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#1D454C]"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto shrink-0 px-6 py-2.5 rounded-[5px] bg-[#6B0D43] hover:bg-[#1D454C] text-white text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Free</span>
                  </button>
                </div>
                <p className="text-[11px] text-gray-500 text-center sm:text-left">
                  Instant PDF access. We respect your privacy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
