import React from 'react';
import { ContactFormSection } from '../components/ContactFormSection';
import { ShieldCheck, Award, CheckCircle2, Quote } from 'lucide-react';

interface ClientsPageProps {
  onNavigate: (page: string) => void;
}

export const ClientsPage: React.FC<ClientsPageProps> = ({ onNavigate }) => {
  return (
    <div className="page_clients">
      {/* Header Banner */}
      <section className="bg-[#2a0209] text-white py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 relative z-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            What can we do for your organisation ?
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#f8dada] font-heading font-medium">
            Staffing Partner &amp; External Hiring Desk Extension
          </p>
        </div>
      </section>

      {/* Intro Overview with Image */}
      <section className="py-16 sm:py-24 bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#e8382e]">
                FOR CLIENTS
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900 leading-tight">
                Your Flexible Staffing Partner
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                We are a staffing partner specialising in flexible workforce solutions, but what we offer goes far beyond recruitment alone. MACEE is the seamless extension of your External Hiring Desk, serving as the secure link between your organisation and external talent — ensuring efficiency, full compliance, and complete peace of mind. Always tailored. Always aligned with your needs. What can we support you with?
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('contact-form-clients');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="is-btn"
                >
                  Contact Our Team
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="relative max-w-md w-full">
                <img
                  src="/uploads/Software-Development-3.jpg"
                  alt="Macee Clients Solutions"
                  className="hard-shadow w-full h-auto object-cover max-h-[440px]"
                  onError={(e) => {
                    e.currentTarget.src = 'https://www.macee.com/uploads/Software-Development-3.jpg';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24 bg-[#F8FAFB] border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900">
              Services
            </h2>
            <p className="text-base text-gray-600 mt-2">
              Comprehensive end-to-end management for contractors, freelancers, and permanent placements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-pink p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">
                  Recruitment
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  When looking for specific expertise temporary (or permanent) we will always analyse exactly what you are looking for regarding expertise, culture aspects and soft skills. We are independent so we will only look for candidates with proven track record and expertise. We are not limited in our search within our local Dutch network, but we also have access to a broad international network.
                </p>
              </div>
            </div>

            <div className="card-pink p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">
                  Contract administration
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  When the right candidate is selected after the interview, we will take care of the candidate onboarding and manage all compliance procedures relating to local labour, immigration and fiscal legislation, whether it relates to a Contractor, Freelancer (ZZP) or an Expat (HSM).
                </p>
              </div>
            </div>

            <div className="card-pink p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">
                  Tailor-Made Solutions
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  From secondment to payroll services, from project support to legal employment services (EOR), MACEE will provide the best ‘tailor-made’ solution for the needs of your organisation. Please do not hesitate to contact us and together we can discuss and agree on the most suitable solution for your company.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 sm:py-20 bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900">
              Certifications
            </h2>
            <p className="text-base text-gray-600 mt-2">
              Audited, compliant, and accredited across Dutch and international hiring standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="p-8 rounded-2xl bg-[#F8FAFB] border border-gray-200 text-center flex flex-col items-center justify-center">
              <img
                src="/uploads/NEN-4400-1.png"
                alt="NEN-4400-1 Certification"
                className="h-24 w-auto object-contain mb-4"
                onError={(e) => {
                  e.currentTarget.src = 'https://www.macee.com/uploads/NEN-4400-1.png';
                }}
              />
              <h3 className="text-lg font-bold font-heading text-gray-900">NEN-4400-1</h3>
              <p className="text-xs text-gray-600 mt-1">
                Labor market standards compliance guaranteeing zero liability risks.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#F8FAFB] border border-gray-200 text-center flex flex-col items-center justify-center">
              <img
                src="/uploads/Accredited work placement company (2).png"
                alt="Accredited work placement company"
                className="h-24 w-auto object-contain mb-4"
                onError={(e) => {
                  e.currentTarget.src = 'https://www.macee.com/uploads/Accredited%20work%20placement%20company%20(2).png';
                }}
              />
              <h3 className="text-lg font-bold font-heading text-gray-900">Accredited Work Placement</h3>
              <p className="text-xs text-gray-600 mt-1">
                Official recognized training & employment partner in the Netherlands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries & Expertise */}
      <section className="py-16 sm:py-24 bg-[#F8FAFB] border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Industries */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-gray-900">
                Industries
              </h2>
              <p className="text-base text-gray-700 leading-relaxed">
                We serve clients in various industries, such as Telecoms, FMCG, Oil and Gas, Consultancy, Healthcare, Pharma, Energy/Utilities and many more. MACEE has extensive experience in the finance sector, working with Banks, Investment and Asset Management, Pension funds, Payment Platforms and other Fintech companies.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  'IT & Software',
                  'Telecoms',
                  'Banking & Fintech',
                  'High Tech Hotspots',
                  'Public Sector & Government',
                  'Oil & Gas / Energy',
                  'FMCG & Logistics',
                  'Healthcare & Pharma'
                ].map((ind, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-[#e8382e] shrink-0" />
                    <span>{ind}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expertise */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-gray-900">
                Expertise
              </h2>
              <p className="text-sm font-bold text-[#e8382e]">
                Proven track record in technical skills &amp; experience
              </p>
              <div className="space-y-3 text-xs sm:text-sm text-gray-700 bg-white p-6 rounded-2xl border border-gray-200">
                <p>
                  <strong className="text-gray-900">Software Development:</strong> .NET, C / C++ / C#, JAVA, Python etc.
                </p>
                <p>
                  <strong className="text-gray-900">BI &amp; Data:</strong> Spark, MSBI, PowerBI, Informatica PowerCenter, AI, ML, Kafka, ETL, Datavault, Tableau, Hadoop etc.
                </p>
                <p>
                  <strong className="text-gray-900">Project Management:</strong> PMO, Program Manager, Change Manager, Transition Manager, Service Level Manager etc.
                </p>
                <p>
                  <strong className="text-gray-900">Cloud:</strong> AWS, Azure, Kubernetes etc.
                </p>
                <p>
                  <strong className="text-gray-900">Security:</strong> CISM, CISSP, CISO, Cyber Security, IAM, RBAC, DLP, CyberArk, Third Party Risk, Network, Infrastructure
                </p>
                <p>
                  <strong className="text-gray-900">Finance Risk Management:</strong> Regulatory reporting, AML, FEC, KYC, Modelling, QRM, Audit, Trading, Markets, Corep, Finrep, EMIR etc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold font-heading text-gray-900">
              Client Testimonials
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card-pink p-8 relative flex flex-col justify-between">
              <Quote className="w-8 h-8 text-[#e8382e] mb-4 opacity-50" />
              <p className="text-base font-heading italic text-gray-800">
                " Testimonial "
              </p>
              <div className="mt-6 pt-4 border-t border-[#f8dada]">
                <p className="text-sm font-bold text-gray-900">Jane Doe</p>
                <p className="text-xs text-gray-600">Customer Support, Getnoticed</p>
              </div>
            </div>

            <div className="card-pink p-8 relative flex flex-col justify-between">
              <Quote className="w-8 h-8 text-[#e8382e] mb-4 opacity-50" />
              <p className="text-base font-heading italic text-gray-800">
                " Testimonial 2 "
              </p>
              <div className="mt-6 pt-4 border-t border-[#f8dada]">
                <p className="text-sm font-bold text-gray-900">Dick Noorlander</p>
                <p className="text-xs text-gray-600">Getnoticed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <div id="contact-form-clients">
        <ContactFormSection title="Neem contact met ons op" />
      </div>
    </div>
  );
};
