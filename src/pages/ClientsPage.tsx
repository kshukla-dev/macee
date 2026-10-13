import React from 'react';
import { Users, FileCheck, ShieldAlert, Award, Globe2, Briefcase, CheckCircle2, ChevronRight } from 'lucide-react';
import { ContactFormSection } from '../components/ContactFormSection';
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
                <span className="clients-pill-dot" />
                Solutions for Organisations
              </div>

              <h1 className="clients-hero-title">
                What can we do for your organisation ?
              </h1>

              <p className="clients-hero-text">
                We are a staffing partner specializing in relative workforce solutions. But what we do goes far beyond recruitment alone. MACEE is the seamless extension of your talent sourcing team, serving as the secure link between your organization and external talent — maximizing efficiency, risk compliancy, and complete peace of mind. Always tailored. Always aligned with your mission. What can we support you with?
              </p>

              <div className="clients-hero-actions">
                <button
                  onClick={() => {
                    const el = document.getElementById('contact-form-clients');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="clients-btn-primary"
                >
                  <span>Get in touch with us</span>
                  <ChevronRight size={16} />
                </button>

                <div className="clients-trust-badge">
                  <CheckCircle2 size={16} className="clients-trust-icon" />
                  <span>NEN 4400-1 Certified &amp; IND Sponsor</span>
                </div>
              </div>
            </div>

            {/* Right: Desk Image with screens and keyboard */}
            <div className="clients-hero-media">
              <div className="clients-hero-image-wrapper">
                <img
                  src="/uploads/people-working-dsk.jpg"
                  alt="Macee developer working at desk with multiple screens"
                  className="clients-hero-image"
                  onError={(e) => {
                    e.currentTarget.src = 'https://www.macee.com/uploads/people-working-dsk.jpg';
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
            <h2 className="clients-section-heading">Services</h2>
            <p className="clients-section-desc">
              End-to-end recruitment, contracting, and compliance management tailored to your specific workforce challenges.
            </p>
          </div>

          <div className="clients-services-grid">
            {/* Service 1: Recruitment */}
            <div className="clients-service-card">

              <h3 className="clients-service-title">Recruitment</h3>
              <p className="clients-service-desc">
                When looking for specific expertise temporary (or permanent) we will always analyse exactly what you are looking for regarding expertise, culture aspects and soft skills. We are independent so we will only look for candidates with proven track record and expertise. We are not limited in our search within our local Dutch network, but we also have access to a broad international network.
              </p>
            </div>

            {/* Service 2: Contract Administration */}
            <div className="clients-service-card">

              <h3 className="clients-service-title">Contract administration</h3>
              <p className="clients-service-desc">
                When the right candidate is selected after the interview we will take care of the candidate onboarding and manage all compliance procedures relating to local labour, immigration and fiscal legislation, whether it relates to a Contractor, Freelancer (ZZP), or an Expat (HSM). From secondment to payroll services, from project support to legal employment services (EOR), MACEE will provide the best tailor-made solution for the needs of your organisation. Please do not hesitate to contact us and together we can discuss and agree on the most suitable solution for your company.
              </p>
            </div>

            {/* Service 3: Compliancy & Support */}
            <div className="clients-service-card">

              <h3 className="clients-service-title">Compliancy &amp; Support</h3>
              <p className="clients-service-desc">
                MACEE strives for clear, transparent and compliant agreements. This is made possible by our in-depth knowledge of local legislation and regulations (WAADI, DBA law, WTT/A1, WIK/AOF) and we ensure all relevant labour, immigration and fiscal laws are observed and continuous to monitor when it comes to the compliancy/hiring of Contractors, Freelancers (ZZP) and Expats (HSM). And if necessary, we can act as your transaction in the event of disputes or problems, taking the burden of extra legal resources off your shoulders. MACEE is your partner for all your HR processes. Innovative and refreshing, we always find a solution that works best for your organisation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Certifications Section */}
      <section className="clients-section-alt">
        <div className="clients-container">
          <div className="clients-section-header">
            <h2 className="clients-section-heading">Certifications</h2>
            <p className="clients-section-desc">
              Audited, transparent, and officially certified across Dutch labour market quality and immigration standards.
            </p>
          </div>

          <div className="clients-cert-list">
            {/* Cert 1: SNA NEN 4400-1 */}
            <div className="clients-cert-card">
              <div className="clients-cert-grid">
                <div className="clients-cert-content">
                  <div className="clients-cert-tag">
                    <Award size={16} />
                    <span>SNA Labour Standard</span>
                  </div>
                  <h3 className="clients-cert-title">
                    MACEE is registered with the SNA (Stichting Normering Arbeid)
                  </h3>
                  <p className="clients-cert-text">
                    The SNA is the quality mark for flexible labour and all companies in the Netherlands that have developed a fact, the need for hiring of external labour and clients commissioned work. MACEE is listed the NEN 4400-1 certification confirming our commitment to quality and compliancy.
                  </p>
                </div>
                <div className="clients-cert-media">
                  <div className="clients-cert-logo-box">
                    <img
                      src="/uploads/NEN-4400-1.png"
                      alt="NEN 4400-1 Certified Logo"
                      className="clients-cert-logo"
                      onError={(e) => {
                        e.currentTarget.src = 'https://www.macee.com/uploads/NEN-4400-1.png';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Cert 2: IND Recognised Sponsor */}
            <div className="clients-cert-card">
              <div className="clients-cert-content">
                <div className="clients-cert-tag accent">
                  <Globe2 size={16} />
                  <span>Dutch Immigration Service (IND)</span>
                </div>
                <h3 className="clients-cert-title">
                  IND Recognised Sponsor (Erkend referent)
                </h3>
                <p className="clients-cert-text">
                  Due to the scarcity of specialised skills in the Netherlands, it is not always possible to find the talent you need in the Dutch or even EU. Did you know: MACEE is a Recognised Sponsor with the Dutch Immigration Service IND, which allows us to hire non-EU specialist candidates under the fast-track Highly Skilled Migrant Visa and Residence Permit scheme. This allows MACEE to leverage its extensive international network when searching for the right talent.
                </p>
              </div>
            </div>

            {/* Cert 3: Recognised training company */}
            <div className="clients-cert-card">
              <div className="clients-cert-grid">
                <div className="clients-cert-content">
                  <div className="clients-cert-tag">
                    <Briefcase size={16} />
                    <span>SBB Vocational Education</span>
                  </div>
                  <h3 className="clients-cert-title">
                    Recognised training company
                  </h3>
                  <p className="clients-cert-text">
                    MACEE is a recognised training company, we contribute to future generations of enthusiastic employees in the workforce. As an organisation that has been officially approved by the Cooperative Organisation for Vocational Education, Training and the Labour Market (SBB) we provide practical training to vocational students. We offer a safe learning environment with qualified coaches to execute tasks and learn that is relevant to the training programme.
                  </p>
                </div>
                <div className="clients-cert-media">
                  <div className="clients-cert-logo-box">
                    <img
                      src="/uploads/Accredited work placement company (2).png"
                      alt="We Train Professionals - Accredited work placement company"
                      className="clients-cert-logo"
                      onError={(e) => {
                        e.currentTarget.src = 'https://www.macee.com/uploads/Accredited%20work%20placement%20company%20(2).png';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Industries Section */}
      <section className="clients-section">
        <div className="clients-container">
          <div className="clients-industries-panel">
            <h2 className="clients-section-heading">Industries</h2>
            <div className="clients-subheading">Experience and proven track record</div>

            <div className="clients-industries-body">
              <p>
                Our clients range from start-ups to global multinational corporates and multinationals who demand seamless mobility of diverse nationalities and are open to attracting finest talent from all over the world.
              </p>
              <p>
                MACEE works with clients in various industries, such as Telecoms, FMCG, Oil and Gas, Consultancy, Healthcare, Pharma, Energy/Utilities and many more. MACEE has extensive experience in the finance sector, working with Banks, Investment and Asset Management, Pension funds, Payment Platforms and other Fintech companies.
              </p>
            </div>

            {/* Industry quick tags */}
            <div className="clients-tags-container">
              {[
                'Telecoms',
                'FMCG',
                'Oil & Gas',
                'Consultancy',
                'Healthcare & Pharma',
                'Energy & Utilities',
                'Banking & Fintech',
                'Investment & Asset Management',
                'Pension Funds',
                'Payment Platforms'
              ].map((ind, i) => (
                <span key={i} className="clients-industry-tag">
                  <span className="clients-tag-dot" />
                  {ind}
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
            <h2 className="clients-section-heading">Expertise</h2>
            <div className="clients-subheading">
              Proven track record in technical skills &amp; experience
            </div>
            <p>
              We can supply a wide range of people, but our network is mainly focused on senior level professionals. These include professionals in positions such as: Business/Information Analyst, Data Engineer, (Cyber) Security Consultant, Testers, Software Developers, Reporting/Finance Specialists and technical/cultural PMO and Project Managers.
            </p>
            <p className="clients-expertise-prompt">
              Below our skills &amp; experience where we have a proven track record in;
            </p>
          </div>

          <div className="clients-expertise-grid">
            {/* Software Development */}
            <div className="clients-expertise-item">
              <span className="clients-domain-badge">Software Development</span>
              <p className="clients-tech-text">
                .NET, C / C++ / C#, JAVA, Python etc.
              </p>
            </div>

            {/* BI & Data */}
            <div className="clients-expertise-item">
              <span className="clients-domain-badge">BI &amp; Data</span>
              <p className="clients-tech-text">
                Spark, MSBI, PowerBI, Informatica PowerCenter, AI, ML, Kafka, ETL, Datavault, Tableau, Hadoop etc.
              </p>
            </div>

            {/* Project Management */}
            <div className="clients-expertise-item">
              <span className="clients-domain-badge">Project Management</span>
              <p className="clients-tech-text">
                PMO, Program Manager, Change Manager, Transition Manager, Service Level Manager etc.
              </p>
            </div>

            {/* Cloud */}
            <div className="clients-expertise-item">
              <span className="clients-domain-badge">Cloud</span>
              <p className="clients-tech-text">
                AWS, Azure, Kubernetes etc.
              </p>
            </div>

            {/* Security */}
            <div className="clients-expertise-item">
              <span className="clients-domain-badge">Security</span>
              <p className="clients-tech-text">
                CISM, CISSP, CISO, Cyber Security, IAM, RBAC, DLP, CyberArk, Third Party Risk, Network, Information/Finance
              </p>
            </div>

            {/* Finance Risk Management */}
            <div className="clients-expertise-item">
              <span className="clients-domain-badge">Finance Risk Management</span>
              <p className="clients-tech-text">
                Regulatory reporting, AML, FEC, KYC, Modelling, QRM, Audit, Trading, Markets, Corep, Finrep, EMIR etc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Contact Form Section matching image */}
      <div id="contact-form-clients" className="clients-contact-wrapper">
        <ContactFormSection
          title="Neem contact met ons op"
          badge="Reach Out To Macee"
          subtitle="Do you have questions about flexible staffing, contract administration, or compliance? Contact our team in Arnhem."
        />
      </div>
    </div>
  );
};
