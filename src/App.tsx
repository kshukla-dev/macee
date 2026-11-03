import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { Hero } from './components/Hero';
import { WhatWeDo } from './components/WhatWeDo';
import { WhyWorkforceSolutions } from './components/WhyWorkforceSolutions';
import { CurrentJobListings } from './components/CurrentJobListings';
import { JobalertBanner } from './components/JobalertBanner';
import { HRRiskBanner } from './components/HRRiskBanner';
import { PageFaqSection } from './components/PageFaqSection';
import { HOME_FAQS } from './data/pageFaqs';
import { ContactFormSection } from './components/ContactFormSection';
import { Footer } from './components/Footer';

import { ConsultationModal } from './components/ConsultationModal';
import { HRRiskSurveyModal } from './components/HRRiskSurveyModal';
import { ResourceModal } from './components/ResourceModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { FaqModal } from './components/FaqModal';
import { OpenApplicationModal } from './components/OpenApplicationModal';
import { CreateJobalertModal } from './components/CreateJobalertModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { AboutPage } from './pages/AboutPage';
import { ClientsPage } from './pages/ClientsPage';
import { ProfessionalsPage } from './pages/ProfessionalsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';

import { getResourcesData, getServicesData } from './data/content';
import { ResourceItem, JobListing, ServiceItem } from './types';

import { Language } from './components/LanguageSelector';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

export type PageRoute = 'home' | 'about' | 'clients' | 'professionals' | 'projects' | 'faq' | 'contact';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const { lang, setLang } = useLanguage();
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationNotes, setConsultationNotes] = useState('');
  const [isRiskSurveyOpen, setIsRiskSurveyOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isOpenApplicationOpen, setIsOpenApplicationOpen] = useState(false);
  const [isJobalertModalOpen, setIsJobalertModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);

  const isAnyModalOrMenuOpen =
    isConsultationOpen ||
    isRiskSurveyOpen ||
    isFaqOpen ||
    isOpenApplicationOpen ||
    isJobalertModalOpen ||
    Boolean(selectedResource) ||
    Boolean(selectedJob) ||
    Boolean(selectedService) ||
    isMobileMenuOpen;

  useEffect(() => {
    if (isAnyModalOrMenuOpen) {
      document.body.style.overflow = 'hidden';
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = '';
      lenisRef.current?.start();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAnyModalOrMenuOpen]);

  // Synchronize route with browser URL / history
  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/about' || path === '/about-us' || hash === '#about' || hash === '#about-us' || hash === '#about-services' || hash === '#services') {
        setCurrentPage('about');
        if (hash === '#about-services' || hash === '#services') {
          setTimeout(() => {
            const el = document.getElementById('about-services');
            if (el) {
              if (lenisRef.current) {
                lenisRef.current.scrollTo(el, { offset: -90 });
              } else {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }, 200);
        }
      } else if (path === '/clients' || path === '/clients-page' || hash === '#clients' || hash === '#clients-page') {
        setCurrentPage('clients');
      } else if (path === '/professionals' || path === '/professionals-page' || hash === '#professionals' || hash === '#professionals-page') {
        setCurrentPage('professionals');
      } else if (path === '/projects' || path === '/assignments' || path === '/vacancies' || hash === '#projects' || hash === '#assignments') {
        setCurrentPage('projects');
      } else if (path === '/faq' || path === '/faqs' || path === '/faq-guides' || path === '/guides' || hash === '#faq' || hash === '#guides') {
        setCurrentPage('faq');
      } else if (path === '/contact' || path === '/contact-us' || path === '/get-in-touch' || hash === '#contact' || hash === '#contact-us' || hash === '#get-in-touch') {
        setCurrentPage('contact');
      } else {
        setCurrentPage('home');
      }
    };
    handleLocation();
    window.addEventListener('popstate', handleLocation);
    window.addEventListener('hashchange', handleLocation);
    return () => {
      window.removeEventListener('popstate', handleLocation);
      window.removeEventListener('hashchange', handleLocation);
    };
  }, []);

  // Ensure scroll resets to top whenever route changes, unless targeting a specific section hash
  useEffect(() => {
    document.body.style.overflow = '';
    const hash = window.location.hash.toLowerCase();
    if (hash === '#about-services' || hash === '#services') {
      const tScroll = setTimeout(() => {
        const el = document.getElementById('about-services');
        if (el) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(el, { offset: -90 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 150);
      return () => clearTimeout(tScroll);
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(t);
  }, [currentPage]);

  const handleNavigatePage = (page: string) => {
    setIsMobileMenuOpen(false);
    setSelectedService(null);
    setSelectedResource(null);
    setSelectedJob(null);
    setIsConsultationOpen(false);
    setIsRiskSurveyOpen(false);
    setIsFaqOpen(false);
    setIsOpenApplicationOpen(false);
    setIsJobalertModalOpen(false);
    document.body.style.overflow = '';
    lenisRef.current?.start();

    if (page === 'open-application' || page === 'open_application') {
      setIsOpenApplicationOpen(true);
      return;
    }
    if (page === 'jobalert' || page === 'job-alert' || page === 'create-jobalert') {
      setIsJobalertModalOpen(true);
      return;
    }
    if (page === 'about-services' || page === 'about#about-services' || page === 'services') {
      window.history.pushState(null, '', '/about#about-services');
      if (currentPage !== 'about') {
        setCurrentPage('about');
      }
      setTimeout(() => {
        const el = document.getElementById('about-services');
        if (el) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(el, { offset: -90 });
          } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 180);
      return;
    }
    if (page === 'about' || page === 'about-us') {
      setCurrentPage('about');
      window.history.pushState(null, '', '/about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'clients' || page === 'clients-page') {
      setCurrentPage('clients');
      window.history.pushState(null, '', '/clients');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'professionals' || page === 'professionals-page') {
      setCurrentPage('professionals');
      window.history.pushState(null, '', '/professionals');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'projects' || page === 'assignments' || page === 'vacancies') {
      setCurrentPage('projects');
      window.history.pushState(null, '', '/projects');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'faq' || page === 'faqs' || page === 'faq-guides' || page === 'guides') {
      setCurrentPage('faq');
      window.history.pushState(null, '', '/faq');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'contact' || page === 'contact-us' || page === 'get-in-touch') {
      setCurrentPage('contact');
      window.history.pushState(null, '', '/contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      window.history.pushState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenServiceDetail = (serviceId: string) => {
    const services = getServicesData(lang);
    let normId = serviceId.toLowerCase().trim();
    if (normId === 'recruitment' || normId === 'permanent' || normId === 'recruitment-&-selection') normId = 'recruitment-staffing';
    if (normId === 'outsourcing' || normId === 'it-projects') normId = 'it-outsourcing';
    if (normId === 'contracting' || normId === 'secondment') normId = 'contracting-secondment';
    if (normId === 'zzp' || normId === 'freelance') normId = 'freelance-zzp';
    if (normId === 'expats' || normId === 'hsm' || normId === 'expat') normId = 'hsm-expats';
    if (normId === 'compliance' || normId === 'compliancy') normId = 'compliancy-support';
    if (normId === 'administration' || normId === 'payroll' || normId === 'backoffice') normId = 'contract-administration';

    const found =
      services.find((s) => s.id === normId || s.id.toLowerCase().includes(normId) || normId.includes(s.id.toLowerCase())) ||
      services[0];
    setSelectedService(found);
  };

  // Initialize Lenis & GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      allowNestedScroll: true,
      prevent: (node) => {
        return (
          node instanceof HTMLElement &&
          (node.hasAttribute('data-lenis-prevent') ||
            Boolean(node.closest?.('[data-lenis-prevent]')) ||
            Boolean(node.closest?.('.modal-scrollable')) ||
            Boolean(node.closest?.('[role="dialog"]')) ||
            Boolean(node.closest?.('.fixed')) ||
            Boolean(node.closest?.('.overflow-y-auto')) ||
            Boolean(node.closest?.('.overflow-auto')))
        );
      },
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Subtle GSAP scroll reveal animations
    const ctx = gsap.context(() => {
      // Hero reveal
      gsap.from('.hero-content', {
        opacity: 0,
        y: 25,
        duration: 0.9,
        ease: 'power2.out',
      });
      gsap.from('.hero-image-container', {
        opacity: 0,
        x: 25,
        duration: 0.9,
        delay: 0.2,
        ease: 'power2.out',
      });

      // What We Do reveal
      ScrollTrigger.create({
        trigger: '#what-we-do',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.from('.what-we-do-image', {
            opacity: 0,
            x: -25,
            duration: 0.8,
            ease: 'power2.out',
          });
          gsap.from('.what-we-do-content', {
            opacity: 0,
            x: 25,
            duration: 0.8,
            ease: 'power2.out',
          });
        },
      });


      // Why Macee reveal
      ScrollTrigger.create({
        trigger: '#why-wfs',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.from('.why-wfs-header', {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: 'power2.out',
          });
        },
      });

      // Current Job Listings reveal
      ScrollTrigger.create({
        trigger: '#jobs',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.from('.jobs-content', {
            opacity: 0,
            x: -20,
            duration: 0.8,
            ease: 'power2.out',
          });
          gsap.from('.jobs-image', {
            opacity: 0,
            x: 20,
            duration: 0.8,
            ease: 'power2.out',
          });
        },
      });
    });

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  // Smooth scroll handler for anchor targets
  const handleNavigateSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (sectionId === 'about' || sectionId === 'about-us') {
      handleNavigatePage('about');
      return;
    }
    if (sectionId === 'jobs' || sectionId === 'projects' || sectionId === 'assignments') {
      handleNavigatePage('projects');
      return;
    }
    if (sectionId === 'resources' || sectionId === 'faq' || sectionId === 'guides') {
      handleNavigatePage('faq');
      return;
    }
    if (sectionId === 'contact' || sectionId === 'contact-us' || sectionId === 'get-in-touch') {
      handleNavigatePage('contact');
      return;
    }
    if (currentPage !== 'home') {
      setCurrentPage('home');
      window.history.pushState(null, '', '/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset: -70 });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectResourceById = (resourceId: string) => {
    const resource = getResourcesData(lang).find((r) => r.id === resourceId);
    if (resource) {
      setSelectedResource(resource);
    } else {
      handleNavigateSection('resources');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#333333] font-body selection:bg-[#E30613] selection:text-white">
      {/* 1. Top Bar: Phone & Socials */}
      <TopBar />

      {/* 2. Main Sticky Navigation */}
      <Header
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onSelectResource={handleSelectResourceById}
        onNavigateSection={handleNavigateSection}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
        currentLang={lang}
        onChangeLang={setLang}
      />

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onNavigateSection={handleNavigateSection}
        onNavigatePage={handleNavigatePage}
        currentPage={currentPage}
        currentLang={lang}
        onChangeLang={setLang}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'about' ? (
          <AboutPage onNavigate={handleNavigatePage} onSelectService={handleOpenServiceDetail} />
        ) : currentPage === 'clients' ? (
          <ClientsPage onNavigate={handleNavigatePage} onSelectService={handleOpenServiceDetail} />
        ) : currentPage === 'professionals' ? (
          <ProfessionalsPage onNavigate={handleNavigatePage} onSelectService={handleOpenServiceDetail} />
        ) : currentPage === 'projects' ? (
          <ProjectsPage onNavigate={handleNavigatePage} />
        ) : currentPage === 'faq' ? (
          <FaqPage onNavigate={handleNavigatePage} onOpenConsultation={() => setIsConsultationOpen(true)} />
        ) : currentPage === 'contact' ? (
          <ContactPage onNavigate={handleNavigatePage} onOpenConsultation={() => setIsConsultationOpen(true)} />
        ) : (
          <>
            {/* 3. Hero Section: "External Workforce Solutions" */}
            <Hero
              onStartJourney={() => handleNavigatePage('projects')}
              onExploreServices={() => handleNavigateSection('what-we-do')}
              onNavigate={handleNavigatePage}
            />

            {/* 4. What We Do: 7 Core Macee Offerings */}
            <WhatWeDo
              onNavigate={handleNavigatePage}
              onExploreAllServices={() => handleNavigatePage('about-services')}
              onSelectService={handleOpenServiceDetail}
            />

            {/* 5. Discover the Difference: Why Choose Macee (30+ Years) */}
            <WhyWorkforceSolutions
              onStartConsultation={() => setIsConsultationOpen(true)}
            />

            {/* 7. Current Projects & Assignments */}
            <CurrentJobListings
              onSelectJob={(job) => setSelectedJob(job)}
              onExploreAllJobs={() => setCurrentPage('projects')}
            />

            {/* 8. Compliance Risk Assessment Banner */}
            <HRRiskBanner
              onBeginSurvey={() => setIsRiskSurveyOpen(true)}
            />

            {/* Can't find the project you are looking for? / Job Alert & Open Application */}
            <JobalertBanner onNavigate={handleNavigatePage} />

            {/* 9. Tailored Home Page FAQs */}
            <PageFaqSection
              id="home-faq"
              badge="Frequently Asked Questions"
              titlePrefix="Frequently Asked"
              titleHighlight="Questions"
              description="Learn more about how Macee's external hiring desk operates, our Dutch compliance standards, and flexible staffing models."
              faqs={HOME_FAQS}
              onNavigate={handleNavigatePage}
              background="white"
            />

            {/* 10. Get In Touch With Us Section */}
            <div id="contact">
              <ContactFormSection />
            </div>
          </>
        )}
      </main>

      {/* 9. Comprehensive Footer */}
      <Footer
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onNavigateSection={handleNavigateSection}
        onNavigatePage={handleNavigatePage}
      />

      {/* Interactive Modals */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => {
          setIsConsultationOpen(false);
          setConsultationNotes('');
        }}
        initialNotes={consultationNotes}
      />

      <HRRiskSurveyModal
        isOpen={isRiskSurveyOpen}
        onClose={() => setIsRiskSurveyOpen(false)}
        onRequestAudit={() => {
          setIsRiskSurveyOpen(false);
          setIsConsultationOpen(true);
        }}
      />

      <ResourceModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
        onOpenConsultation={() => {
          setSelectedResource(null);
          setIsConsultationOpen(true);
        }}
      />

      <ProjectDetailModal
        project={selectedJob}
        onClose={() => setSelectedJob(null)}
      />

      <FaqModal
        isOpen={isFaqOpen}
        onClose={() => setIsFaqOpen(false)}
        onOpenConsultation={() => {
          setIsFaqOpen(false);
          setIsConsultationOpen(true);
        }}
      />

      <OpenApplicationModal
        isOpen={isOpenApplicationOpen}
        onClose={() => setIsOpenApplicationOpen(false)}
      />

      <CreateJobalertModal
        isOpen={isJobalertModalOpen}
        onClose={() => setIsJobalertModalOpen(false)}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenConsultation={(defaultNotes) => {
          setSelectedService(null);
          setConsultationNotes(defaultNotes || '');
          setIsConsultationOpen(true);
        }}
        onNavigatePage={(page) => {
          setSelectedService(null);
          handleNavigatePage(page);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
