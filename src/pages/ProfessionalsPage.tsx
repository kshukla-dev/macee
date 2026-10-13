import React, { useState } from 'react';
import { Laptop, Landmark, Database, ArrowRight, Users } from 'lucide-react';
import { ContactFormSection } from '../components/ContactFormSection';
import './ProfessionalsPage.css';

interface ProfessionalsPageProps {
  onNavigate?: (page: string) => void;
}

interface IndustryItem {
  id: string;
  name: string;
  image: string;
  imgTitle: string;
  imgDesc: string;
  text: string;
}

const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'ict',
    name: 'ICT',
    image: '/uploads/Software-Development-2.jpg',
    imgTitle: 'ICT & Software Development',
    imgDesc: 'From software engineers to cloud architects, cybersecurity specialists, and DevOps.',
    text: 'Is our bread and butter. With years of experience in the placement of temporary ICT professionals, we have an in-depth understanding of this industry. We understand the dynamics of the market, know what matters to clients, and speak the language of professionals.',
  },
  {
    id: 'telecom',
    name: 'Telecom',
    image: '/uploads/Telecom (1).jpg',
    imgTitle: 'Telecoms & Connectivity',
    imgDesc: 'High-speed networks, 5G rollouts, infrastructure, and next-gen telecom engineering.',
    text: 'The telecoms industry is constantly changing – and that\'s what makes it so interesting. From high-speed internet to smart networks and innovative solutions, our telecoms clients are at the heart of this dynamic environment.',
  },
  {
    id: 'finance',
    name: 'Banking / Fintech / Finance',
    image: '/uploads/Finance-reporting.jpg',
    imgTitle: 'Banking & Financial Technology',
    imgDesc: 'Shaping the future of money, regulatory compliance, risk modeling, and fintech rails.',
    text: 'The Fintech industry is where technology and finance converge to shape the future of money. MACEE supports them with professionals who are just as agile and innovative as the industry itself.',
  },
  {
    id: 'hightech',
    name: 'High Tech Industry',
    image: '/uploads/Hightech-Industry-3.jpg',
    imgTitle: 'High-Tech & Precision Engineering',
    imgDesc: 'Eindhoven Brainport & Delft hubs for robotics, semiconductor, and embedded systems.',
    text: 'The Netherlands is a global player in the high-tech industry. Regions such as Eindhoven and Delft are hubs for innovation, precision and technology. We work closely with progressive organisations in these high-tech hotspots.',
  },
  {
    id: 'government',
    name: 'Government',
    image: '/uploads/Dutch-government-3.jpg',
    imgTitle: 'Public Sector & Ministries',
    imgDesc: 'Digital transformation, citizen platforms, and secure IT governance.',
    text: 'The public sector is undergoing rapid change. Digital transformation, process optimisation and secure IT solutions require strong IT and business professionals.',
  },
  {
    id: 'oil-gas',
    name: 'Oil & Gas',
    image: '/uploads/Oil--Gas-3.jpg',
    imgTitle: 'Energy & Infrastructure Hub',
    imgDesc: 'Real-time telemetry, IoT, cloud analytics, and energy transition monitoring.',
    text: 'The Dutch energy hub in Rotterdam and beyond requires advanced ICT solutions—ranging from real-time data analytics and cloud computing to cybersecurity and sustainability monitoring.',
  },
];

export const ProfessionalsPage: React.FC<ProfessionalsPageProps> = ({ onNavigate }) => {
  const [activeIndustryId, setActiveIndustryId] = useState<string>('ict');

  const activeIndustry =
    INDUSTRIES_DATA.find((ind) => ind.id === activeIndustryId) || INDUSTRIES_DATA[0];

  return (
    <div className="prof-page">
      {/* Top Banner / Hero */}
      <section className="prof-hero-banner">
        <div className="prof-container">
          <div className="prof-hero-badge">
            <span className="prof-hero-badge-dot" />
            <span>Opportunities in the Netherlands</span>
          </div>
          <h1 className="prof-hero-title">FOR PROFESSIONALS</h1>
          <p className="prof-hero-subtitle">
            Freelance, Contracting, and Relocation Opportunities with leading Dutch and international organisations.
          </p>
        </div>
      </section>

      {/* 1. WHAT WE DO */}
      <section className="prof-section prof-what-section">
        <div className="prof-container">
          <div className="prof-what-header-wrap">
            <div className="prof-what-header-left">
              <div className="prof-what-eyebrow">
                <span>OUR EXPERTISE</span>
              </div>
              <h2 className="prof-what-main-title">
                What <span className="prof-what-title-highlight">We Do</span>
              </h2>
              <p className="prof-what-header-desc">
                Connecting senior professionals to premier organisations across sectors in the Netherlands.
              </p>
            </div>

            <div className="prof-what-header-right">
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

          <div className="prof-what-grid">
            {/* Card 1: ICT */}
            <div className="prof-what-card">
              <div className="prof-what-media">
                <span className="prof-what-num-badge">01</span>
                <img
                  src="/uploads/Software-Development-2.jpg"
                  alt="ICT Software Development"
                  className="prof-what-img"
                  onError={(e) => {
                    e.currentTarget.src = 'https://www.macee.com/uploads/Software-Development-2.jpg';
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
                  <Laptop size={20} />
                </div>
              </div>

              <div className="prof-what-body">
                <h3 className="prof-what-title">ICT</h3>
                <span className="prof-what-title-line" />
                <p className="prof-what-text">
                  ICT is our bread and butter. With years of experience in the placement of temporary ICT professionals, we have an in-depth understanding of this industry. We understand the dynamics of the market, know what matters to clients, and speak the language of professionals.
                </p>

                <div className="prof-what-tags">
                  <span className="prof-what-tag">IT Specialists</span>
                  <span className="prof-what-tag">Digital Transformation</span>
                  <span className="prof-what-tag">Cloud</span>
                </div>

                <div className="prof-what-footer">
                  <button
                    onClick={() => onNavigate && onNavigate('clients')}
                    className="prof-what-learn-btn"
                  >
                    <span>Learn more</span>
                    <span className="prof-what-btn-arrow">
                      <ArrowRight size={14} />
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Framework contracts Overheid */}
            <div className="prof-what-card">
              <div className="prof-what-media">
                <span className="prof-what-num-badge">02</span>
                <img
                  src="/uploads/Dutch-government-3.jpg"
                  alt="Framework contracts Overheid"
                  className="prof-what-img"
                  onError={(e) => {
                    e.currentTarget.src = 'https://www.macee.com/uploads/Dutch-government-3.jpg';
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
                  <Landmark size={20} />
                </div>
              </div>

              <div className="prof-what-body">
                <h3 className="prof-what-title">Framework contracts Overheid</h3>
                <span className="prof-what-title-line" />
                <p className="prof-what-text">
                  Framework contracts with government entities ensure steady opportunities for specialists in IT, policy, infrastructure, and digital transformation. We connect senior talent with impact-driven public sector projects across ministries and executive agencies.
                </p>

                <div className="prof-what-tags">
                  <span className="prof-what-tag">Public Sector</span>
                  <span className="prof-what-tag">Policy &amp; Strategy</span>
                  <span className="prof-what-tag">Infrastructure</span>
                </div>

                <div className="prof-what-footer">
                  <button
                    onClick={() => onNavigate && onNavigate('clients')}
                    className="prof-what-learn-btn"
                  >
                    <span>Learn more</span>
                    <span className="prof-what-btn-arrow">
                      <ArrowRight size={14} />
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Bank- en verzekeringswezen */}
            <div className="prof-what-card">
              <div className="prof-what-media">
                <span className="prof-what-num-badge">03</span>
                <img
                  src="/uploads/Finance-reporting.jpg"
                  alt="Bank- en verzekeringswezen"
                  className="prof-what-img"
                  onError={(e) => {
                    e.currentTarget.src = 'https://www.macee.com/uploads/Finance-reporting.jpg';
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
                  <Database size={20} />
                </div>
              </div>

              <div className="prof-what-body">
                <h3 className="prof-what-title">Bank- en verzekeringswezen</h3>
                <span className="prof-what-title-line" />
                <p className="prof-what-text">
                  MACEE has extensive experience in the finance sector, working with Banks, Investment and Asset Management, Pension funds, Payment Platforms and other Fintech companies. Delivering expertise in risk, compliance, cloud architecture, and fintech innovation.
                </p>

                <div className="prof-what-tags">
                  <span className="prof-what-tag">Banking</span>
                  <span className="prof-what-tag">Investment Management</span>
                  <span className="prof-what-tag">Fintech</span>
                </div>

                <div className="prof-what-footer">
                  <button
                    onClick={() => onNavigate && onNavigate('clients')}
                    className="prof-what-learn-btn"
                  >
                    <span>Learn more</span>
                    <span className="prof-what-btn-arrow">
                      <ArrowRight size={14} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT CAN WE DO FOR YOU */}
      <section className="prof-section-alt">
        <div className="prof-container">
          <div className="prof-section-header">
            <h2 className="prof-section-title">What can we do for you</h2>
            <p className="prof-section-desc">
              MACEE fills vacancies on behalf of our clients in all areas. Either temporary positions on a project basis, interim roles or internal permanent positions. Here is a brief overview of the contract forms we support:
            </p>
          </div>

          <div className="prof-service-list">
            {/* Freelance / ZZP */}
            <div className="prof-service-item">
              <h3 className="prof-service-title">Freelance / ZZP</h3>
              <p className="prof-service-desc">
                Temporary projects suitable for self-employed Freelancers (ZZP), working with different clients and without any form of employment with their customer. As a Freelancer (ZZP) you determine your own rate, working hours and working method. These are often specific project positions that require your unique expertise and for which you are paid per hour or per (half) day.
              </p>
            </div>

            {/* Contracting / Secondment */}
            <div className="prof-service-item">
              <h3 className="prof-service-title">Contracting / Secondment</h3>
              <p className="prof-service-desc">
                Working on a temporary position, project or interim role whereby you will be employed on the payroll of MACEE. Due to the increasing legal restrictions in hiring external talent, the interim roles considered suitable for a Freelancer (ZZP) are restricted. Leading to an increased need for the ‘Payroll Solution’ that MACEE offers.
              </p>
            </div>

            {/* Outsourcing */}
            <div className="prof-service-item">
              <h3 className="prof-service-title">Outsourcing</h3>
              <p className="prof-service-desc">
                Outsourcing work to an external party on a temporary contract basis, whereby the external party performs the work with its own staff and under its own management and is responsible for the result, instead of taking on a permanent employee. It is used for temporary projects, specialist knowledge or to respond flexibly to needs, without the obligations of permanent employment.
              </p>
            </div>

            {/* Permanent */}
            <div className="prof-service-item">
              <h3 className="prof-service-title">Permanent</h3>
              <p className="prof-service-desc">
                Additionally MACEE also actively assists clients with the ‘Search and Selection’ of candidates for their internal permanent positions.
              </p>
            </div>

            {/* HSM / Expats / Visa Sponsorship */}
            <div className="prof-service-item highlight">
              <div className="prof-service-tag">
                <span>IND Recognised Sponsor</span>
              </div>
              <h3 className="prof-service-title">HSM / Expats / Visa Sponsorship</h3>
              <p className="prof-service-desc">
                Having found your new temporary contract or project, MACEE will arrange your VISA / Work permit application as we are an official IND (Immigration Service) Recognised Sponsor. Holding this IND registration enables MACEE to relocate highly skilled migrants (HSM Expats) to the Netherlands via a fast and streamlined procedure, making life easier for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INDUSTRIES */}
      <section className="prof-section">
        <div className="prof-container">
          <div className="prof-section-header">
            <h2 className="prof-section-title">Industries</h2>
            <p className="prof-section-desc">
              Experience and proven track record in multiple industries. Click on any industry to view details and domain focus.
            </p>
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
                      {isActive && <span className="prof-ind-selected-tag">Selected</span>}
                    </div>
                    <p className="prof-ind-text">{ind.text}</p>
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
            <h2 className="prof-section-title">EXPERTISES</h2>
            <h3 className="prof-roles-subtitle">Rollen</h3>
            <p className="prof-roles-desc">
              Software development, Cloud, Data, Cyber Security, Testing, Reporting and PMO / Project Management.
            </p>
          </div>

          {/* Skill Pills */}
          <div className="prof-skills-pills">
            <span className="prof-skill-pill">Software Development (.NET, Java, Python, React)</span>
            <span className="prof-skill-pill">Cloud &amp; DevOps (AWS, Azure, GCP, Kubernetes)</span>
            <span className="prof-skill-pill">BI, Data &amp; AI (PowerBI, Snowflake, Databricks)</span>
            <span className="prof-skill-pill">Cyber Security (CISO, SOC, ISO 27001)</span>
            <span className="prof-skill-pill">Testing &amp; QA Automation</span>
            <span className="prof-skill-pill">Project Management &amp; Scrum</span>
            <span className="prof-skill-pill">Financial Risk &amp; Compliance (AML/KYC)</span>
          </div>

          {/* Roles Grid */}
          <div className="prof-roles-grid">
            <div className="prof-role-card">
              <h4 className="prof-role-title">Software Development</h4>
              <p className="prof-role-tech">
                Backend, Frontend, Fullstack (.NET, C#, Java, Python, Angular, React, Vue, PHP, Mobile apps).
              </p>
            </div>
            <div className="prof-role-card">
              <h4 className="prof-role-title">Cloud &amp; DevOps</h4>
              <p className="prof-role-tech">
                AWS, Azure, Google Cloud, Docker, Kubernetes, Terraform, CI/CD pipelines, Site Reliability Engineering.
              </p>
            </div>
            <div className="prof-role-card">
              <h4 className="prof-role-title">Data &amp; Artificial Intelligence</h4>
              <p className="prof-role-tech">
                Data Engineering, Data Science, Machine Learning, PowerBI, Databricks, Snowflake, Apache Spark, SQL.
              </p>
            </div>
            <div className="prof-role-card">
              <h4 className="prof-role-title">Cyber Security</h4>
              <p className="prof-role-tech">
                CISO, Ethical Hacking, Security Operations Center (SOC), Identity &amp; Access Management (IAM), Compliance.
              </p>
            </div>
            <div className="prof-role-card">
              <h4 className="prof-role-title">Testing &amp; Quality Assurance</h4>
              <p className="prof-role-tech">
                Test Automation Engineers, QA Leads, Selenium, Cypress, Performance &amp; Integration Testing.
              </p>
            </div>
            <div className="prof-role-card">
              <h4 className="prof-role-title">Project &amp; Agile Management</h4>
              <p className="prof-role-tech">
                PMO Leads, Technical Project Managers, Agile Coaches, Scrum Masters, Product Owners.
              </p>
            </div>
          </div>

          {/* 2 Images side by side with red dot badges matching the screenshot */}
          <div className="prof-roles-gallery">
            <div className="prof-gallery-item">
              <span className="prof-gallery-dot" />
              <img
                src="/uploads/Software-Development-2.jpg"
                alt="Development and coding"
                className="prof-gallery-img"
                onError={(e) => {
                  e.currentTarget.src = 'https://www.macee.com/uploads/Software-Development-2.jpg';
                }}
              />
            </div>
            <div className="prof-gallery-item">
              <span className="prof-gallery-dot" />
              <img
                src="/uploads/people-working-dsk.jpg"
                alt="Team working around desk"
                className="prof-gallery-img"
                onError={(e) => {
                  e.currentTarget.src = 'https://www.macee.com/uploads/people-working-dsk.jpg';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Contact Section - Reusing ContactFormSection with custom styled theme container */}
      <div className="prof-contact-wrapper">
        <div className="prof-container">
          <ContactFormSection
            id="contact-form-professionals"
            title="Get in contact with us"
          />
        </div>
      </div>
    </div>
  );
};
