import React, { useState, useEffect } from 'react';
import { X, Download, CheckCircle2, FileText, ArrowRight, BookOpen } from 'lucide-react';
import { ResourceItem } from '../types';

interface ResourceModalProps {
  resource: ResourceItem | null;
  onClose: () => void;
}

export const ResourceModal: React.FC<ResourceModalProps> = ({ resource, onClose }) => {
  const [email, setEmail] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    if (!resource) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resource, onClose]);

  if (!resource) return null;

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloaded(true);
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
            aria-label="Close resource modal"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#E30613] mb-1">
            {resource.type}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white leading-snug">
            {resource.title}
          </h3>
          <p className="text-xs sm:text-sm text-white/80 mt-1 sm:mt-2 font-mono">
            {resource.pages} · Free Digital Download
          </p>
        </div>

        {/* Scrollable Content Body */}
        <div 
          data-lenis-prevent 
          className="p-4 sm:p-6 md:p-8 space-y-5 overflow-y-auto flex-1 overscroll-contain modal-scrollable"
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
            <div className="w-full sm:w-44 h-36 sm:h-auto aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
              <img
                src={resource.image}
                alt={resource.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2 flex-1">
              <h4 className="text-xs sm:text-sm font-bold text-[#111827] uppercase tracking-wide">
                Overview & Strategic Intent
              </h4>
              <p className="text-xs sm:text-sm text-[#54595F] leading-relaxed">
                {resource.description}
              </p>
            </div>
          </div>

          {/* Topics & Key Takeaways */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
              Included In This Download:
            </h4>
            <div className="space-y-2">
              {resource.topics.map((topic, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#E30613] shrink-0 mt-0.5" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Download Form / Success */}
          <div className="p-4 sm:p-5 bg-[#F8FAFB] rounded-xl border border-gray-200/80">
            {downloaded ? (
              <div className="text-center py-4 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h5 className="text-base font-bold text-[#111827]">
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
                      const blob = new Blob([`${resource.title}\n\nMacee External Workforce Solutions Guide\nVisit: https://www.macee.com/\nPhone: +31 (0)26 744 0024`], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${resource.downloadName.replace('.pdf', '')}.txt`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] bg-[#111827] text-white text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
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
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/15 transition-all"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto shrink-0 px-6 py-2.5 rounded-[6px] bg-[#E30613] hover:bg-[#111827] text-white text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
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
