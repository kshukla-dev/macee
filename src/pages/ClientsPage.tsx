import React, { useState } from 'react';
import {
  Award,
  Globe2,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Building2,
  Tag,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Clock,
  Users,
  Search,
  Sparkles,
  Layers,
  Check
} from 'lucide-react';
import { ContactFormSection } from '../components/ContactFormSection';
import { PageFaqSection } from '../components/PageFaqSection';
import { CLIENTS_FAQS } from '../data/pageFaqs';
import clientsDataEn from '../data/clientsData.json';
import clientsDataNl from '../data/clientsData_nl.json';
import { useLanguage } from '../context/LanguageContext';
import './ClientsPage.css';

interface ClientsPageProps {
  onNavigate: (page: string, options?: any) => void;
  onSelectService?: (serviceId: string) => void;
}

export const ClientsPage: React.FC<ClientsPageProps> = ({ onNavigate, onSelectService }) => {
  const { lang, t } = useLanguage();
  const clientsData = lang === 'NL' ? clientsDataNl : clientsDataEn;
  const [selectedExpertiseDomain, setSelectedExpertiseDomain] = useState<string>('all');
  const [expandedCerts, setExpandedCerts] = useState<Record<string, boolean>>({
    sna: true,
    ind: false,
    sbb: false,
  });
  const [isIndustriesExpanded, setIsIndustriesExpanded] = useState<boolean>(false);

  const toggleCert = (id: string) => {
    setExpandedCerts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filtered expertise items
  const filteredExpertise = selectedExpertiseDomain === 'all'
    ? clientsData.expertise.items
    : clientsData.expertise.items.filter((item) => item.domain.toLowerCase().includes(selectedExpertiseDomain.toLowerCase()));

  return (
    <div className="clients-page">
      {/* 1. Header / Intro Hero Section */}
      <section className="clients-hero-section">
        <div className="clients-container">
          <div className="clients-hero-grid">
            {/* Left: Heading & Intro Text */}
            <div className="clients-hero-content">
              <div className="clients-pill-badge">
                <Building2 className="w-3.5 h-3.5 text-[#E30613] shrink-0" />
                <span>{clientsData.hero.pill}</span>
              </div>

              <h1 className="clients-hero-title">
                What can <span className="text-[#E30613]">Macee</span> do for your organisation?
              </h1>

              <p className="clients-hero-text">
                {clientsData.hero.text}
              </p>

              <div className="clients-hero-actions">
                <button
                  onClick={() => {
                    const el = document.getElementById(clientsData.hero.primaryCta.target);
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="clients-btn-primary"
                >
                  <span>{clientsData.hero.primaryCta.text}</span>
                  <ChevronRight size={16} />
                </button>

                <div className="clients-trust-badge">
                  <CheckCircle2 size={16} className="clients-trust-icon" />
                  <span>{clientsData.hero.trustBadge}</span>
                </div>
              </div>

              {/* 3 Quick Hirer Trust Pills (Client Value Assurance) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-gray-200/80 text-left">
                <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-gray-200/80 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-[#E30613]/10 text-[#E30613] flex items-center justify-center shrink-0 font-bold text-xs">
                    48h
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#111827]">
                      {lang === 'NL' ? 'Snelle Shortlist SLA' : '48-72h Shortlist SLA'}
                    </div>
                    <div className="text-[11px] text-gray-500 font-medium">
                      {lang === 'NL' ? 'Geverifieerde kandidaatprofielen' : 'Pre-screened candidate profiles'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-gray-200/80 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-[#111827]/10 text-[#111827] flex items-center justify-center shrink-0 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-[#111827]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#111827]">
                      {lang === 'NL' ? '100% NEN 4400-1 Vrijwaring' : '100% NEN 4400-1 Protection'}
                    </div>
                    <div className="text-[11px] text-gray-500 font-medium">
                      {lang === 'NL' ? 'Geen ketenaansprakelijkheid' : 'Zero chain liability exposure'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-gray-200/80 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-[#E30613]/10 text-[#E30613] flex items-center justify-center shrink-0 font-bold text-xs">
                    <FileCheck className="w-4 h-4 text-[#E30613]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#111827]">
                      {lang === 'NL' ? 'Wet DBA & WAADI Compliant' : 'Wet DBA & WAADI Compliant'}
                    </div>
                    <div className="text-[11px] text-gray-500 font-medium">
                      {lang === 'NL' ? 'Goedgekeurde modelovereenkomsten' : 'Approved model contracts & audit'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Desk Image with screens and keyboard */}
            <div className="clients-hero-media">
              <div className="clients-hero-image-wrapper">
                <img
                  src={clientsData.hero.image.src}
                  alt={clientsData.hero.image.alt}
                  className="clients-hero-image"
                  onError={(e) => {
                    e.currentTarget.src = clientsData.hero.image.fallback;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 4-STEP HIRER WORKFLOW (Dedicated for Clients) */}
      <section className="clients-section-alt">
        <div className="clients-container">
          <div className="clients-section-header">
            <div className="clients-pill-badge mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#E30613] shrink-0" />
              <span>{lang === 'NL' ? 'Onze Werkwijze' : 'How We Work'}</span>
            </div>
            <h2 className="clients-section-heading">
              {lang === 'NL' ? 'In 4 Stappen naar de Juiste Specialist' : 'How We Partner With Your Organisation'}
            </h2>
            <div className="clients-subheading">
              {lang === 'NL' ? 'Snel, compliant en met volledige garantie' : 'Fast, compliant, and fully guaranteed'}
            </div>
            <p className="clients-section-desc">
              {lang === 'NL'
                ? 'Van de eerste rolverkenning tot compliant contractbeheer en continue opvolging — transparant en zorgeloos.'
                : 'From initial role intake and rapid sourcing to fully compliant contract administration and ongoing success.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#111827]/10 text-[#111827] group-hover:bg-[#E30613] group-hover:text-white flex items-center justify-center font-bold text-sm mb-5 transition-colors">
                  01
                </div>
                <h3 className="text-lg font-bold font-display text-[#111827] mb-2">
                  {lang === 'NL' ? 'Intake & Rolverkenning' : 'Role Intake & Scoping'}
                </h3>
                <p className="text-sm text-[#54595F] leading-relaxed">
                  {lang === 'NL'
                    ? 'Binnen 24 uur analyseren we uw technische vereisten, teamdynamiek, projectdoelstellingen en de ideale kandidaat-match.'
                    : 'Within 24 hours, we deep-dive into your tech stack, team culture, project deliverables, and rate parameters.'}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-gray-100 text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#E30613]" />
                <span>{lang === 'NL' ? 'Binnen 24 uur' : 'Turnaround: 24h'}</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#111827]/10 text-[#111827] group-hover:bg-[#E30613] group-hover:text-white flex items-center justify-center font-bold text-sm mb-5 transition-colors">
                  02
                </div>
                <h3 className="text-lg font-bold font-display text-[#111827] mb-2">
                  {lang === 'NL' ? 'Geverifieerde Shortlist' : 'Vetted Shortlist'}
                </h3>
                <p className="text-sm text-[#54595F] leading-relaxed">
                  {lang === 'NL'
                    ? 'We presenteren 2 à 3 grondig gescreende, direct inzetbare senior specialisten met geverifieerde track records.'
                    : 'We present 2 to 3 thoroughly vetted, interview-ready senior professionals with proven project achievements.'}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-gray-100 text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#E30613]" />
                <span>{lang === 'NL' ? '48 – 72 uur SLA' : '48 – 72h SLA'}</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#111827]/10 text-[#111827] group-hover:bg-[#E30613] group-hover:text-white flex items-center justify-center font-bold text-sm mb-5 transition-colors">
                  03
                </div>
                <h3 className="text-lg font-bold font-display text-[#111827] mb-2">
                  {lang === 'NL' ? 'Compliant Onboarding' : 'Compliant Onboarding'}
                </h3>
                <p className="text-sm text-[#54595F] leading-relaxed">
                  {lang === 'NL'
                    ? 'Wij verzorgen alle overeenkomsten (detachering, ZZP of EOR), screening, WAADI-naleving en G-rekeningzekerheid.'
                    : 'We execute DBA-proof model contracts, verify tax IDs, manage payroll, and handle G-account compliance.'}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-gray-100 text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E30613]" />
                <span>{lang === 'NL' ? '100% Juridisch gedekt' : '100% Legally Audited'}</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#111827]/10 text-[#111827] group-hover:bg-[#E30613] group-hover:text-white flex items-center justify-center font-bold text-sm mb-5 transition-colors">
                  04
                </div>
                <h3 className="text-lg font-bold font-display text-[#111827] mb-2">
                  {lang === 'NL' ? 'Begeleiding & Garantie' : 'Support & Guarantee'}
                </h3>
                <p className="text-sm text-[#54595F] leading-relaxed">
                  {lang === 'NL'
                    ? 'Een vast aanspreekpunt, periodieke evaluaties en een no-sourcing-fee vervangingsgarantie voor maximale rust.'
                    : 'Dedicated account manager, regular milestone reviews, and a risk-free candidate replacement guarantee.'}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-gray-100 text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#E30613]" />
                <span>{lang === 'NL' ? 'Vervangingsgarantie' : 'Replacement Guarantee'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Certifications Section */}
      <section className="clients-section">
        <div className="clients-container">
          <div className="clients-section-header">
            <h2 className="clients-section-heading">{clientsData.certifications.title}</h2>
            <p className="clients-section-desc">
              {clientsData.certifications.description}
            </p>
          </div>

          <div className="clients-cert-list">
            {clientsData.certifications.items.map((cert) => {
              const isExpanded = expandedCerts[cert.id] ?? false;
              return (
                <div
                  key={cert.id}
                  className={`clients-cert-card ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}
                >
                  {/* Card Header: Clickable on mobile to expand/collapse */}
                  <div
                    onClick={() => toggleCert(cert.id)}
                    className="clients-cert-header-interactive cursor-pointer md:cursor-default"
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleCert(cert.id);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className={`clients-cert-tag ${cert.accent ? 'accent' : ''}`}>
                          {cert.id === 'sna' ? (
                            <Award size={16} />
                          ) : cert.id === 'ind' ? (
                            <Globe2 size={16} />
                          ) : (
                            <Briefcase size={16} />
                          )}
                          <span>{cert.tag}</span>
                        </div>
                        <h3 className="clients-cert-title mt-2 sm:mt-2.5">{cert.title}</h3>
                      </div>

                      {/* Mobile Expand / Collapse Chevron Indicator */}
                      <div className="md:hidden shrink-0 pt-0.5">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isExpanded
                              ? 'bg-[#E30613]/10 text-[#E30613]'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-300 ${
                              isExpanded ? 'rotate-180 text-[#E30613]' : ''
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Body: Expandable on mobile, always visible on desktop */}
                  <div className={`clients-cert-body ${isExpanded ? 'block' : 'hidden md:block'}`}>
                    {cert.image ? (
                      <div className="clients-cert-grid mt-4">
                        <div className="clients-cert-content">
                          <p className="clients-cert-text">{cert.text}</p>
                        </div>
                        <div className="clients-cert-media">
                          <div className="clients-cert-logo-box">
                            <img
                              src={cert.image.src}
                              alt={cert.image.alt}
                              className="clients-cert-logo"
                              onError={(e) => {
                                e.currentTarget.src = cert.image.fallback;
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="clients-cert-content mt-4">
                        <p className="clients-cert-text">{cert.text}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Industries Section (Original Content Preserved) */}
      <section className="clients-section-alt">
        <div className="clients-container">
          <div className="clients-industries-panel">
            <h2 className="clients-section-heading">{clientsData.industries.title}</h2>
            <div className="clients-subheading">{clientsData.industries.subheading}</div>

            <div className="clients-industries-body">
              {clientsData.industries.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Industry quick tags (3 visible on mobile initially + Show more tag button) */}
            <div className="clients-tags-container">
              {clientsData.industries.tags.map((ind, i) => {
                const isHiddenOnMobile = !isIndustriesExpanded && i >= 3;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onNavigate && onNavigate('projects', { branche: ind })}
                    className={`clients-industry-tag ${
                      isHiddenOnMobile ? 'is-hidden-mobile !hidden md:!inline-flex' : 'inline-flex'
                    } cursor-pointer group hover:!border-[#E30613] hover:!text-[#E30613] transition-all`}
                    title={lang === 'NL' ? `Bekijk opdrachten in ${ind}` : `View projects in ${ind}`}
                  >
                    <Tag className="w-3.5 h-3.5 text-[#E30613] shrink-0" />
                    <span>{ind}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 text-gray-400 group-hover:text-[#E30613] group-hover:translate-x-0.5 transition-all" />
                  </button>
                );
              })}

              {/* Mobile View Toggle: Show More / Show Less Tag Button */}
              {clientsData.industries.tags.length > 3 && (
                <button
                  type="button"
                  onClick={() => setIsIndustriesExpanded(!isIndustriesExpanded)}
                  className="clients-industry-tag clients-industry-tag-toggle md:hidden cursor-pointer group !border-[#E30613]/40 bg-[#E30613]/5 hover:bg-[#E30613] !text-[#E30613] hover:!text-white transition-all font-semibold"
                  aria-expanded={isIndustriesExpanded}
                >
                  <Tag className="w-3.5 h-3.5 text-[#E30613] group-hover:text-white shrink-0 transition-colors" />
                  <span>
                    {isIndustriesExpanded
                      ? (lang === 'NL' ? 'Toon minder' : 'Show less')
                      : (lang === 'NL'
                          ? `Toon meer (+${clientsData.industries.tags.length - 3})`
                          : `Show more (+${clientsData.industries.tags.length - 3})`)}
                  </span>
                  {isIndustriesExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5 ml-1 text-[#E30613] group-hover:text-white transition-colors" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 ml-1 text-[#E30613] group-hover:text-white transition-colors" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Expertise Section (Original Content Preserved with Interactive Filter Pills) */}
      <section className="clients-section">
        <div className="clients-container">
          <div className="clients-section-header clients-expertise-intro">
            <h2 className="clients-section-heading">{clientsData.expertise.title}</h2>
            <div className="clients-subheading">{clientsData.expertise.subheading}</div>
            <p>{clientsData.expertise.intro}</p>
            <p className="clients-expertise-prompt">{clientsData.expertise.prompt}</p>
          </div>

          {/* Interactive Domain Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedExpertiseDomain('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                selectedExpertiseDomain === 'all'
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-400'
              }`}
            >
              {lang === 'NL' ? 'Alle Domeinen (6)' : 'All Domains (6)'}
            </button>
            {clientsData.expertise.items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedExpertiseDomain(item.domain)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  selectedExpertiseDomain === item.domain
                    ? 'bg-[#E30613] text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-400'
                }`}
              >
                {item.domain}
              </button>
            ))}
          </div>

          <div className="clients-expertise-grid">
            {filteredExpertise.map((item, idx) => (
              <div key={idx} className="clients-expertise-item">
                <span className="clients-domain-badge">{item.domain}</span>
                <p className="clients-tech-text">{item.technologies}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Tailored Client & Hiring FAQs */}
      <PageFaqSection
        id="clients-faq"
        badge="Frequently Asked Questions"
        titlePrefix="Frequently Asked"
        titleHighlight="Questions"
        description="Clear answers on our hiring turnaround, candidate replacement guarantee, Wet DBA risk mitigation, and fee structures."
        faqs={CLIENTS_FAQS}
        onNavigate={onNavigate}
        background="white"
      />

      {/* 7. Contact Form Section */}
      <div id="contact-form-clients" className="clients-contact-wrapper">
        <ContactFormSection
          title={clientsData.contact.title}
          badge={clientsData.contact.badge}
          subtitle={clientsData.contact.subtitle}
        />
      </div>
    </div>
  );
};
