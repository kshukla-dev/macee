import React from 'react';
import { Award, Globe2, Briefcase, CheckCircle2, ChevronRight, Building2, Tag } from 'lucide-react';
import { ContactFormSection } from '../components/ContactFormSection';
import { PageFaqSection } from '../components/PageFaqSection';
import { CLIENTS_FAQS } from '../data/pageFaqs';
import clientsData from '../data/clientsData.json';
import './ClientsPage.css';

interface ClientsPageProps {
  onNavigate: (page: string) => void;
}

export const ClientsPage: React.FC<ClientsPageProps> = ({ onNavigate }) => {
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
                {clientsData.hero.title}
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

      {/* 2. Services Section */}
      <section className="clients-section">
        <div className="clients-container">
          <div className="clients-section-header">
            <h2 className="clients-section-heading">{clientsData.services.title}</h2>
            <p className="clients-section-desc">
              {clientsData.services.description}
            </p>
          </div>

          <div className="clients-services-grid">
            {clientsData.services.items.map((service) => (
              <div key={service.id} className="clients-service-card">
                <h3 className="clients-service-title">{service.title}</h3>
                <p className="clients-service-desc">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Certifications Section */}
      <section className="clients-section-alt">
        <div className="clients-container">
          <div className="clients-section-header">
            <h2 className="clients-section-heading">{clientsData.certifications.title}</h2>
            <p className="clients-section-desc">
              {clientsData.certifications.description}
            </p>
          </div>

          <div className="clients-cert-list">
            {clientsData.certifications.items.map((cert) => (
              <div key={cert.id} className="clients-cert-card">
                {cert.image ? (
                  <div className="clients-cert-grid">
                    <div className="clients-cert-content">
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
                      <h3 className="clients-cert-title">{cert.title}</h3>
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
                  <div className="clients-cert-content">
                    <div className={`clients-cert-tag ${cert.accent ? 'accent' : ''}`}>
                      <Globe2 size={16} />
                      <span>{cert.tag}</span>
                    </div>
                    <h3 className="clients-cert-title">{cert.title}</h3>
                    <p className="clients-cert-text">{cert.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Industries Section */}
      <section className="clients-section">
        <div className="clients-container">
          <div className="clients-industries-panel">
            <h2 className="clients-section-heading">{clientsData.industries.title}</h2>
            <div className="clients-subheading">{clientsData.industries.subheading}</div>

            <div className="clients-industries-body">
              {clientsData.industries.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Industry quick tags */}
            <div className="clients-tags-container">
              {clientsData.industries.tags.map((ind, i) => (
                <span key={i} className="clients-industry-tag">
                  <Tag className="w-3 h-3 text-[#E30613] shrink-0" />
                  <span>{ind}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Expertise Section */}
      <section className="clients-section-alt">
        <div className="clients-container">
          <div className="clients-section-header clients-expertise-intro">
            <h2 className="clients-section-heading">{clientsData.expertise.title}</h2>
            <div className="clients-subheading">{clientsData.expertise.subheading}</div>
            <p>{clientsData.expertise.intro}</p>
            <p className="clients-expertise-prompt">{clientsData.expertise.prompt}</p>
          </div>

          <div className="clients-expertise-grid">
            {clientsData.expertise.items.map((item, idx) => (
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

      {/* 7. Contact Form Section matching image */}
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
