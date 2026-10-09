import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { Hero } from './components/Hero';
import { WhatWeDo } from './components/WhatWeDo';
import { DownloadableResources } from './components/DownloadableResources';
import { WhyWorkforceSolutions } from './components/WhyWorkforceSolutions';
import { CurrentJobListings } from './components/CurrentJobListings';
import { HRRiskBanner } from './components/HRRiskBanner';
import { Footer } from './components/Footer';

import { ConsultationModal } from './components/ConsultationModal';
import { HRRiskSurveyModal } from './components/HRRiskSurveyModal';
import { ResourceModal } from './components/ResourceModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { JobApplicationModal } from './components/JobApplicationModal';
import { FaqModal } from './components/FaqModal';
import { AboutPage } from './pages/AboutPage';

import { SERVICES_DATA, RESOURCES_DATA, JOBS_DATA } from './data/content';
import { ResourceItem, ServiceItem, JobListing } from './types';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isRiskSurveyOpen, setIsRiskSurveyOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);

  // Synchronize route with browser URL / history
  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/about' || path === '/about-us' || hash === '#about' || hash === '#about-us') {
        setCurrentPage('about');
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

  const handleNavigatePage = (page: string) => {
    setIsMobileMenuOpen(false);
    if (page === 'about' || page === 'about-us') {
      setCurrentPage('about');
      window.history.pushState(null, '', '/about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      window.history.pushState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Initialize Lenis & GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

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

      // Resources reveal
      ScrollTrigger.create({
        trigger: '#resources',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.from('.resources-heading', {
            opacity: 0,
            y: 20,
            duration: 0.7,
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
      gsap.ticker.remove(updateTicker);
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
    if (currentPage !== 'home') {
      setCurrentPage('home');
      window.history.pushState(null, '', '/');
      setTimeout(() => {
        if (sectionId === 'faq') {
          setIsFaqOpen(true);
          return;
        }
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    if (sectionId === 'faq') {
      setIsFaqOpen(true);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset: -70 });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceById = (serviceId: string) => {
    const service = SERVICES_DATA.find((s) => s.id === serviceId);
    if (service) {
      setSelectedService(service);
    } else {
      handleNavigateSection('what-we-do');
    }
  };

  const handleSelectResourceById = (resourceId: string) => {
    const resource = RESOURCES_DATA.find((r) => r.id === resourceId);
    if (resource) {
      setSelectedResource(resource);
    } else {
      handleNavigateSection('resources');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#333333] font-body selection:bg-[#1D454C] selection:text-white">
      {/* 1. Top Bar: Phone & Socials */}
      <TopBar />

      {/* 2. Main Sticky Navigation */}
      <Header
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onSelectService={handleSelectServiceById}
        onSelectResource={handleSelectResourceById}
        onNavigateSection={handleNavigateSection}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
      />

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onSelectService={handleSelectServiceById}
        onNavigateSection={handleNavigateSection}
        onNavigatePage={handleNavigatePage}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'about' ? (
          <AboutPage onNavigate={handleNavigatePage} />
        ) : (
          <>
            {/* 3. Hero Section: "External Workforce Solutions" */}
            <Hero
              onStartJourney={() => setIsConsultationOpen(true)}
              onExploreServices={() => handleNavigateSection('what-we-do')}
            />

            {/* 4. What We Do: 7 Core Macee Offerings */}
            <WhatWeDo
              onSelectService={handleSelectServiceById}
              onExploreAllServices={() => handleNavigateSection('why-wfs')}
            />

            {/* 5. Downloadable Resources: 3 Macee Guides & Certifications */}
            <DownloadableResources
              onSelectResource={(res) => setSelectedResource(res)}
            />

            {/* 6. Discover the Difference: Why Choose Macee (30+ Years) */}
            <WhyWorkforceSolutions
              onStartConsultation={() => setIsConsultationOpen(true)}
            />

            {/* 7. Current Projects & Assignments */}
            <CurrentJobListings
              onSelectJob={(job) => setSelectedJob(job)}
              onExploreAllJobs={() => {
                if (JOBS_DATA.length > 0) setSelectedJob(JOBS_DATA[0]);
              }}
            />

            {/* 8. Compliance Risk Assessment Banner */}
            <HRRiskBanner
              onBeginSurvey={() => setIsRiskSurveyOpen(true)}
            />
          </>
        )}
      </main>

      {/* 9. Comprehensive Footer */}
      <Footer
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onSelectService={handleSelectServiceById}
        onNavigateSection={handleNavigateSection}
        onNavigatePage={handleNavigatePage}
      />

      {/* Interactive Modals */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
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
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onStartConsultation={() => {
          setSelectedService(null);
          setIsConsultationOpen(true);
        }}
      />

      <JobApplicationModal
        job={selectedJob}
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
    </div>
  );
}
