import React, { useState, useEffect } from 'react';
import { Laptop, Landmark, Database, ArrowRight, UserCheck, Award, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { ContactFormSection } from '../components/ContactFormSection';
import { PageFaqSection } from '../components/PageFaqSection';
import { PROFESSIONALS_FAQS } from '../data/pageFaqs';
import professionalsDataEn from '../data/professionalsData.json';
import professionalsDataNl from '../data/professionalsData_nl.json';
import { useLanguage } from '../context/LanguageContext';
import { getAllJobs, getCachedJobs } from '../lib/api';
import { isOtysConfigured } from '../lib/auth';
import { ProjectAssignmentItem, matchesProjectBranche } from './ProjectsPage';
import './ProfessionalsPage.css';

interface ProfessionalsPageProps {
  onNavigate?: (page: string, options?: any) => void;
  onSelectService?: (serviceId: string) => void;
}

export const ProfessionalsPage: React.FC<ProfessionalsPageProps> = ({ onNavigate, onSelectService }) => {
  const { lang, t } = useLanguage();
  const professionalsData = lang === 'NL' ? professionalsDataNl : professionalsDataEn;
  const INDUSTRIES_DATA = professionalsData.industries.items;
  const [activeIndustryId, setActiveIndustryId] = useState<string>('ict');
  const [vacancies, setVacancies] = useState<ProjectAssignmentItem[]>(() => getCachedJobs() || []);
  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({
    'freelance-zzp': true,
    'contracting-secondment': false,
    'hsm-expats': false,
  });

  const toggleService = (id: string) => {
    setExpandedServices((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Carousel State for Section 2 (What We Do) on Mobile
  const [whatSlide, setWhatSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const totalWhatSlides = professionalsData.whatWeDo.items.length;

  const handlePrevWhat = () => {
    setWhatSlide((prev) => (prev > 0 ? prev - 1 : totalWhatSlides - 1));
  };

  const handleNextWhat = () => {
    setWhatSlide((prev) => (prev < totalWhatSlides - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 45) {
      handleNextWhat();
    } else if (distance < -45) {
      handlePrevWhat();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  useEffect(() => {
    let isMounted = true;
    async function loadVacancies() {
      try {
        if (isOtysConfigured()) {
          const jobs = await getAllJobs({ itemsPerPage: 50 });
          if (isMounted && Array.isArray(jobs) && jobs.length > 0) {
            setVacancies(jobs);
          }
        }
      } catch (err) {
        // Silent catch
      }
    }
    loadVacancies();
    return () => {
      isMounted = false;
    };
  }, []);

  const getTargetBranche = (id: string): string => {
    switch (id) {
      case 'ict':
        return 'ICT';
      case 'telecom':
        return 'Telecom';
      case 'finance':
        return 'Banking and insurance';
      case 'hightech':
        return 'ICT';
      case 'government':
        return 'Public sector';
      case 'oil-gas':
        return 'Energy Transition';
      default:
        return 'ICT';
    }
  };

  const getProjectCountForIndustry = (indId: string): number => {
    if (!vacancies || vacancies.length === 0) {
      return 0;
    }
    const targetBranche = getTargetBranche(indId);
    return vacancies.filter((v) => matchesProjectBranche(v, targetBranche)).length;
  };

  const activeIndustry =
    INDUSTRIES_DATA.find((ind) => ind.id === activeIndustryId) || INDUSTRIES_DATA[0];

  const activeProjectCount = getProjectCountForIndustry(activeIndustry.id);

  const renderWhatCard = (item: typeof professionalsData.whatWeDo.items[0]) => {
    const getBranche = () => {
      const t = item.title.toLowerCase();
      if (t.includes('ict') || t.includes('software')) return 'ICT';
      if (t.includes('public') || t.includes('overheid') || t.includes('publiek')) return 'Public sector';
      if (t.includes('bank') || t.includes('finan') || t.includes('fintech')) return 'Banking and insurance';
      return 'ICT';
    };
    const targetBranche = getBranche();

    return (
      <div className="prof-what-card h-full">
        <div className="prof-what-media">
          <span className="prof-what-num-badge">{item.num}</span>
          <img
            src={item.image}
            alt={item.alt}
            className="prof-what-img"
            onError={(e) => {
              e.currentTarget.src = item.fallback;
            }}
          />
          <svg
            className="prof-what-wave-svg"
            viewBox="0 0 400 45"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 45H400V15C310 38 180 5 0 28V45Z"
              fill="#ffffff"
            />
          </svg>
          <div className="prof-what-floating-icon">
            {item.icon === 'Laptop' ? (
              <Laptop size={20} />
            ) : item.icon === 'Landmark' ? (
              <Landmark size={20} />
            ) : (
              <Database size={20} />
            )}
          </div>
        </div>

        <div className="prof-what-body flex-1 flex flex-col justify-between">
          <div>
            <h3 className="prof-what-title">{item.title}</h3>
            <span className="prof-what-title-line" />
            <p className="prof-what-text">{item.text}</p>
          </div>

          <div>
            <div className="prof-what-tags">
              {item.tags.map((tag, tIdx) => (
                <button
                  key={tIdx}
                  type="button"
                  onClick={() => onNavigate && onNavigate('projects', { branche: targetBranche, query: tag })}
                  className="prof-what-tag hover:!bg-[#E30613] hover:!text-white transition-colors cursor-pointer border-0"
                  title={lang === 'NL' ? `Zoek ${tag} opdrachten` : `Search ${tag} assignments`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="prof-what-footer">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('projects', { branche: targetBranche })}
                className="prof-what-learn-btn"
                title={lang === 'NL' ? `Bekijk alle ${item.title} opdrachten` : `View all ${item.title} projects`}
              >
                <span>{lang === 'NL' ? 'Bekijk projecten' : 'View projects'}</span>
                <span className="prof-what-btn-arrow">
                  <ArrowRight size={14} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="prof-page">

      {/* Top Banner / Hero */}
      <section className="prof-hero-banner">
        <div className="prof-container">
          <div className="prof-hero-badge flex items-center gap-2">
            <UserCheck className="w-3.5 h-3.5 text-[#E30613] shrink-0" />
            <span>{professionalsData.hero.badge}</span>
          </div>
          <h1 className="prof-hero-title">
            For <span className="text-[#E30613]">Professionals</span>
          </h1>
          <p className="prof-hero-subtitle">{professionalsData.hero.subtitle}</p>
        </div>
      </section>

      {/* 1. WHAT CAN WE DO FOR YOU */}
      <section className="prof-section">
        <div className="prof-container">
          <div className="prof-section-header">
            <h2 className="prof-section-title">{professionalsData.whatCanWeDo.title}</h2>
            <p className="prof-section-desc">{professionalsData.whatCanWeDo.description}</p>
          </div>

          <div className="prof-service-list">
            {professionalsData.whatCanWeDo.services.map((svc) => {
              const isExpanded = expandedServices[svc.id] ?? false;
              return (
                <div
                  key={svc.id}
                  className={`prof-service-item hover:border-[#E30613] hover:shadow-lg transition-all duration-300 group ${
                    svc.highlight ? 'highlight' : ''
                  } ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}
                >
                  {/* Header: Clickable on mobile to expand/collapse, on desktop opens service modal */}
                  <div
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        toggleService(svc.id);
                      } else if (onSelectService) {
                        onSelectService(svc.id);
                      }
                    }}
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (window.innerWidth < 768) {
                          toggleService(svc.id);
                        } else if (onSelectService) {
                          onSelectService(svc.id);
                        }
                      }
                    }}
                    title={lang === 'NL' ? 'Klik om toelichting te bekijken' : 'Click to view details'}
                  >
                    {svc.tag && (
                      <div className="prof-service-tag">
                        <span>{svc.tag}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="prof-service-title group-hover:text-[#E30613] transition-colors mb-0">
                        {svc.title}
                      </h3>
                      {/* Desktop arrow */}
                      <ArrowRight className="hidden md:block w-4 h-4 text-gray-400 group-hover:text-[#E30613] group-hover:translate-x-1 transition-all shrink-0" />
                      {/* Mobile Expand / Collapse Chevron */}
                      <div className="md:hidden shrink-0">
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

                  {/* Expandable Body: Always visible on desktop (md:block), toggled on mobile */}
                  <div className={`prof-service-body ${isExpanded ? 'block' : 'hidden md:block'} mt-2.5`}>
                    <p className="prof-service-desc">{svc.description}</p>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectService) onSelectService(svc.id);
                      }}
                      className="mt-4 pt-3 border-t border-gray-100 flex items-center text-xs font-semibold text-[#E30613] hover:underline cursor-pointer"
                    >
                      <span>
                        {lang === 'NL'
                          ? 'Bekijk volledige toelichting & voordelen'
                          : 'View full explanation & key features'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. WHAT WE DO */}
      <section className="prof-section-alt prof-what-section">
        <div className="prof-container">
          <div className="prof-what-header-wrap">
            <div className="prof-what-header-left">
              <div className="prof-what-eyebrow">
                <span>{professionalsData.whatWeDo.eyebrow}</span>
              </div>
              <h2 className="prof-what-main-title">
                {professionalsData.whatWeDo.titlePrefix}{' '}
                <span className="prof-what-title-highlight">
                  {professionalsData.whatWeDo.titleHighlight}
                </span>
              </h2>
              <p className="prof-what-header-desc">
                {professionalsData.whatWeDo.description}
              </p>
            </div>

            <div className="prof-what-header-right hidden md:flex">
              <div className="prof-what-map-bg">
                <svg viewBox="0 0 160 140" fill="none" className="prof-what-map-svg" aria-hidden="true">
                  <path
                    d="M75 10 C85 8, 95 14, 102 22 C110 32, 118 35, 128 42 C135 48, 142 58, 138 68 C135 76, 126 80, 122 88 C116 98, 118 108, 110 118 C104 125, 92 130, 84 128 C74 125, 66 116, 58 112 C48 108, 38 114, 30 108 C22 102, 25 90, 28 82 C32 72, 38 64, 42 54 C46 44, 44 32, 52 24 C60 16, 68 12, 75 10 Z"
                    fill="currentColor"
                  />
                  <circle cx="85" cy="35" r="2.5" fill="currentColor" opacity="0.7" />
                  <circle cx="100" cy="45" r="2.5" fill="currentColor" opacity="0.7" />
                  <circle cx="70" cy="55" r="2.5" fill="currentColor" opacity="0.7" />
                  <circle cx="90" cy="65" r="2.5" fill="currentColor" opacity="0.7" />
                  <circle cx="110" cy="75" r="2.5" fill="currentColor" opacity="0.7" />
                  <circle cx="60" cy="85" r="2.5" fill="currentColor" opacity="0.7" />
                  <circle cx="80" cy="95" r="2.5" fill="currentColor" opacity="0.7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile View: Swipeable Carousel */}
          <div
            className="md:hidden relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Navigation Controls: Counter & Arrow Buttons */}
            <div className="flex items-center justify-end gap-2 mb-4 px-1">
              <span className="text-xs font-bold text-gray-500 bg-white border border-gray-200/80 px-2.5 py-1 rounded-full shadow-2xs">
                <span className="text-[#111827]">{whatSlide + 1}</span> / {totalWhatSlides}
              </span>
              <button
                type="button"
                onClick={handlePrevWhat}
                aria-label="Previous slide"
                className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:border-[#E30613] hover:bg-[#E30613] text-[#111827] hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs cursor-pointer group"
              >
                <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
              </button>
              <button
                type="button"
                onClick={handleNextWhat}
                aria-label="Next slide"
                className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:border-[#E30613] hover:bg-[#E30613] text-[#111827] hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs cursor-pointer group"
              >
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Slides Track */}
            <div
              className="flex items-stretch transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${whatSlide * 100}%)` }}
            >
              {professionalsData.whatWeDo.items.map((item) => (
                <div key={item.num} className="w-full shrink-0 px-1 flex flex-col">
                  {renderWhatCard(item)}
                </div>
              ))}
            </div>

            {/* Bottom Dots Indicator (Centered) */}
            <div className="flex items-center justify-center gap-2 mt-5">
              {professionalsData.whatWeDo.items.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setWhatSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                    idx === whatSlide ? 'w-6 bg-[#E30613]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop View: Pristine 3 Columns Grid */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-7">
            {professionalsData.whatWeDo.items.map((item) => (
              <div key={item.num} className="h-full flex flex-col">
                {renderWhatCard(item)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INDUSTRIES */}
      <section className="prof-section">
        <div className="prof-container">
          <div className="prof-section-header">
            <h2 className="prof-section-title">{professionalsData.industries.title}</h2>
            <p className="prof-section-desc">{professionalsData.industries.description}</p>
          </div>

          <div className="prof-ind-layout">
            {/* Left Media Column */}
            <div className="prof-ind-sticky-media">
              <div className="prof-ind-img-box">
                <img
                  key={activeIndustry.image}
                  src={activeIndustry.image}
                  alt={activeIndustry.imgTitle}
                  className="prof-ind-large-img"
                  onError={(e) => {
                    e.currentTarget.src = `https://www.macee.com${activeIndustry.image}`;
                  }}
                />
                {/* Floating Notification Button on the Picture */}
                <div key={`notif-${activeIndustry.id}`} className="prof-ind-floating-notification">
                  <button
                    type="button"
                    onClick={() => onNavigate && onNavigate('projects', { branche: getTargetBranche(activeIndustry.id) })}
                    className="prof-ind-notif-btn group cursor-pointer"
                    title={lang === 'NL' ? `Bekijk alle ${activeProjectCount} openstaande opdrachten direct` : `View all ${activeProjectCount} open projects right now`}
                  >
                    <span className="prof-ind-notif-count">{activeProjectCount}</span>
                    <span className="prof-ind-notif-label">
                      {lang === 'NL' ? 'Openstaande Opdrachten' : 'Open Projects'}
                    </span>
                    <span className="prof-ind-notif-arrow">
                      <ArrowRight size={13} />
                    </span>
                  </button>
                </div>

                <div className="prof-ind-img-overlay">
                  <span className="prof-ind-active-badge">Active Focus</span>
                  <h4 className="prof-ind-img-title">{activeIndustry.imgTitle}</h4>
                  <p className="prof-ind-img-desc">{activeIndustry.imgDesc}</p>
                </div>
              </div>
            </div>

            {/* Right Industries Content */}
            <div className="prof-ind-list">
              {INDUSTRIES_DATA.map((ind) => {
                const isActive = activeIndustryId === ind.id;
                return (
                  <div
                    key={ind.id}
                    onClick={() => setActiveIndustryId(ind.id)}
                    className={`prof-ind-item ${isActive ? 'active' : ''}`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveIndustryId(ind.id);
                      }
                    }}
                  >
                    <div className="prof-ind-header-row">
                      <h3 className="prof-ind-name">{ind.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="prof-ind-count-badge">
                          {getProjectCountForIndustry(ind.id)} {lang === 'NL' ? 'posities' : 'open'}
                        </span>
                        {isActive && <span className="prof-ind-selected-tag">Selected</span>}
                      </div>
                    </div>
                    <p className="prof-ind-text">{ind.text}</p>
                    {isActive && (
                      <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate && onNavigate('projects', { branche: getTargetBranche(ind.id) });
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E30613] hover:underline cursor-pointer"
                        >
                          <span>
                            {lang === 'NL'
                              ? `Bekijk alle ${getProjectCountForIndustry(ind.id)} opdrachten in ${ind.name}`
                              : `View all ${getProjectCountForIndustry(ind.id)} projects in ${ind.name}`}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXPERTISES */}
      <section className="prof-section-alt">
        <div className="prof-container">
          <div className="prof-section-header">
            <h2 className="prof-section-title">{professionalsData.expertises.title}</h2>
            <h3 className="prof-roles-subtitle">{professionalsData.expertises.subtitle}</h3>
            <p className="prof-roles-desc">{professionalsData.expertises.description}</p>
          </div>

          {/* Skill Pills */}
          <div className="prof-skills-pills">
            {professionalsData.expertises.pills.map((pill, pIdx) => (
              <span key={pIdx} className="prof-skill-pill">{pill}</span>
            ))}
          </div>

          {/* Roles Grid */}
          <div className="prof-roles-grid">
            {professionalsData.expertises.roles.map((role, rIdx) => (
              <div key={rIdx} className="prof-role-card">
                <h4 className="prof-role-title">{role.title}</h4>
                <p className="prof-role-tech">{role.tech}</p>
              </div>
            ))}
          </div>

          {/* 2 Images side by side with red dot badges matching the screenshot */}
          <div className="prof-roles-gallery">
            {professionalsData.expertises.gallery.map((img, gIdx) => (
              <div key={gIdx} className="prof-gallery-item relative">
                <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/95 shadow-xs flex items-center justify-center text-[#E30613] z-10">
                  <Award className="w-3.5 h-3.5" />
                </span>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="prof-gallery-img"
                  onError={(e) => {
                    e.currentTarget.src = img.fallback;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Tailored Professionals FAQs */}
      <PageFaqSection
        id="professionals-faq"
        badge="Frequently Asked Questions"
        titlePrefix="Frequently Asked"
        titleHighlight="Questions"
        description="Key information on IND work visa sponsorship, 30% tax benefit, contracting options, and relocation support."
        faqs={PROFESSIONALS_FAQS}
        onNavigate={onNavigate}
        background="white"
      />

      {/* 6. Contact Section */}
      <div className="prof-contact-wrapper">
        <div className="prof-container">
          <ContactFormSection
            id="contact-form-professionals"
            title={professionalsData.contact.title}
          />
        </div>
      </div>
    </div>
  );
};
