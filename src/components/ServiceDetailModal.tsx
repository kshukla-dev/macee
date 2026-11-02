import React, { useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Users,
  Briefcase,
  ShieldCheck,
  UserCheck,
  Award,
  FileCheck,
  Cpu,
  ArrowRight,
  ExternalLink,
  Building2
} from 'lucide-react';
import { ServiceItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenConsultation: () => void;
  onNavigatePage?: (page: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onOpenConsultation,
  onNavigatePage
}) => {
  const { lang } = useLanguage();

  useEffect(() => {
    if (!service) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [service, onClose]);

  if (!service) return null;

  const getIcon = (id: string) => {
    switch (id) {
      case 'recruitment-staffing':
      case 'recruitment':
        return <Users className="w-6 h-6 text-white" />;
      case 'contract-administration':
        return <Briefcase className="w-6 h-6 text-white" />;
      case 'compliancy-support':
        return <ShieldCheck className="w-6 h-6 text-white" />;
      case 'contracting-secondment':
        return <UserCheck className="w-6 h-6 text-white" />;
      case 'freelance-zzp':
        return <Award className="w-6 h-6 text-white" />;
      case 'hsm-expats':
        return <FileCheck className="w-6 h-6 text-white" />;
      case 'it-outsourcing':
      case 'outsourcing':
        return <Cpu className="w-6 h-6 text-white" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-white" />;
    }
  };

  const getTargetPage = (id: string) => {
    switch (id) {
      case 'recruitment-staffing':
      case 'recruitment':
      case 'contract-administration':
      case 'compliancy-support':
        return 'clients';
      case 'contracting-secondment':
      case 'freelance-zzp':
      case 'hsm-expats':
        return 'professionals';
      case 'it-outsourcing':
      case 'outsourcing':
        return 'projects';
      default:
        return 'clients';
    }
  };

  const targetPage = getTargetPage(service.id);
  const isProfessional = service.category === 'Professionals' || ['contracting-secondment', 'freelance-zzp', 'hsm-expats'].includes(service.id);

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto modal-scrollable"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] my-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#111827] text-white p-6 sm:p-8 shrink-0 relative pr-14">
          <button
            onClick={onClose}
            aria-label="Close service modal"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-[#E30613] flex items-center justify-center shrink-0 shadow-md">
              {getIcon(service.id)}
            </div>
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#E30613]">
                {isProfessional
                  ? (lang === 'NL' ? 'Voor Professionals & Specialisten' : 'For Professionals & Contractors')
                  : (lang === 'NL' ? 'Voor Opdrachtgevers & Inleners' : 'For Enterprise Hirers & Clients')}
              </span>
              <p className="text-xs text-gray-300">
                {lang === 'NL' ? 'Macee Externe Personeelsoplossing' : 'Macee Workforce Service Model'}
              </p>
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold font-display text-white leading-tight">
            {service.title}
          </h3>
          <p className="text-sm text-gray-300 mt-2 leading-relaxed">
            {service.shortDesc}
          </p>
        </div>

        {/* Scrollable Content Body */}
        <div
          data-lenis-prevent
          className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 overscroll-contain modal-scrollable"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Detailed In-Depth Explanation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E30613]">
              {lang === 'NL' ? 'Uitgebreide Toelichting' : 'Detailed Overview & Explanation'}
            </h4>
            <div className="text-sm sm:text-base text-[#333333] leading-relaxed bg-[#F8FAFB] p-5 rounded-xl border border-gray-200/80">
              <p>{service.fullDesc}</p>
            </div>
          </div>

          {/* Key Features / Bullet points */}
          {Array.isArray(service.features) && service.features.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                {lang === 'NL' ? 'Belangrijkste Voordelen & Kenmerken' : 'Key Features & Deliverables'}
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {service.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white border border-gray-200/80 shadow-2xs hover:border-[#E30613]/30 transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#E30613] shrink-0 mt-0.5" />
                    <span className="text-sm text-[#333333] font-medium leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compliance & Assurance Banner */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#54595F]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E30613] shrink-0" />
              <span>
                {lang === 'NL'
                  ? 'Gewaarborgd door SNA NEN 4400-1 normering & IND Erkend Referent'
                  : 'Governed under SNA NEN 4400-1 labour compliance & IND Recognised Sponsor standards'}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 font-semibold text-[#111827] shrink-0">
              <Building2 className="w-3.5 h-3.5 text-[#E30613]" />
              Arnhem HQ
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => {
              onClose();
              if (onNavigatePage) {
                onNavigatePage(targetPage);
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-sm font-semibold text-[#111827] transition-colors cursor-pointer"
          >
            <span>
              {isProfessional
                ? (lang === 'NL' ? 'Bekijk Professionals Pagina' : 'View Professionals Page')
                : (lang === 'NL' ? 'Bekijk Opdrachtgevers Pagina' : 'View Hirers Page')}
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenConsultation();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#E30613] hover:bg-[#111827] text-white text-sm font-semibold shadow-sm transition-all cursor-pointer"
          >
            <span>{lang === 'NL' ? 'Direct Advies Aanvragen' : 'Inquire About This Service'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

