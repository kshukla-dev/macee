import React from 'react';
import { ContactFormSection } from '../components/ContactFormSection';
import { ArrowRight, CheckCircle2, Globe, FileText, UserCheck, Briefcase } from 'lucide-react';

interface ProfessionalsPageProps {
  onNavigate: (page: string) => void;
}

export const ProfessionalsPage: React.FC<ProfessionalsPageProps> = ({ onNavigate }) => {
  return (
    <div className="page_professionals">
      {/* Page Header */}
      <section className="bg-[#2a0209] text-white py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 relative z-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            FOR PROFESSIONALS
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#f8dada] font-heading font-medium">
            Freelance, Contracting, and Relocation Opportunities
          </p>
        </div>
      </section>

      {/* 1. WHAT WE DO */}
      <section className="py-16 sm:py-24 bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900 leading-tight">
              WHAT WE DO
            </h2>
            <p className="text-base text-gray-600 mt-2">
              Connecting senior professionals to premier organizations in the Netherlands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ICT */}
            <div className="card-pink p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-extrabold font-heading text-[#e8382e]">6</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-800 bg-white/70 px-2.5 py-1 rounded-full">
                    Vacatures
                  </span>
                </div>
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">
                  ICT
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  ICT is our bread and butter. With years of experience in the placement of temporary ICT professionals, we have an in-depth understanding of this industry. We understand the dynamics of the market, know what matters to clients, and speak the language of professionals.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#f8dada]">
                <button
                  onClick={() => onNavigate('assignments')}
                  className="flex items-center gap-1.5 text-sm font-bold text-[#e8382e] hover:underline cursor-pointer"
                >
                  <span>Bekijk vacatures</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Overheid */}
            <div className="card-pink p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-extrabold font-heading text-[#e8382e]">4</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-800 bg-white/70 px-2.5 py-1 rounded-full">
                    Vacatures
                  </span>
                </div>
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">
                  Overheid
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  The public sector is undergoing rapid change. Digital transformation, process optimisation and secure IT solutions require strong IT and business professionals. We support public sector organisations with specialists who effectively combine technology and policy.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#f8dada]">
                <button
                  onClick={() => onNavigate('assignments')}
                  className="flex items-center gap-1.5 text-sm font-bold text-[#e8382e] hover:underline cursor-pointer"
                >
                  <span>Bekijk vacatures</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bank- en verzekeringswezen */}
            <div className="card-pink p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-extrabold font-heading text-[#e8382e]">2</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-800 bg-white/70 px-2.5 py-1 rounded-full">
                    Vacatures
                  </span>
                </div>
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">
                  Bank- en verzekeringswezen
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  MACEE has extensive experience in the finance sector, working with Banks, Investment and Asset Management, Pension funds, Payment Platforms and other Fintech companies.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#f8dada]">
                <button
                  onClick={() => onNavigate('assignments')}
                  className="flex items-center gap-1.5 text-sm font-bold text-[#e8382e] hover:underline cursor-pointer"
                >
                  <span>Bekijk vacatures</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT CAN WE DO FOR YOU (Contract Forms) */}
      <section className="py-16 sm:py-24 bg-[#F8FAFB] border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900">
              What can we do for you
            </h2>
            <p className="text-base text-gray-700 mt-2">
              MACEE fills vacancies on behalf of our clients in all areas. Either temporary positions on a project basis, interim roles or internal permanent positions. Here is a brief overview of the roles we fill:
            </p>
          </div>

          <div className="space-y-6">
            {/* Freelance / ZZP */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">
                Freelance / ZZP
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Temporary projects suitable for self-employed Freelancers (ZZP), working with different clients and without any form of employment with their customer. As a Freelancer (ZZP) you determine your own rate, working hours and working method. These are often specific project positions that require your unique expertise and for which you are paid per hour or per (half) day.
              </p>
            </div>

            {/* Contracting / Secondment */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">
                Contracting / Secondment
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Working on a temporary position, project or interim role whereby you will be employed on the payroll of MACEE. Due to the increasing legal restrictions in hiring external talent, the interim roles considered suitable for a Freelancer (ZZP) are restricted. Leading to an increased need for the ‘Payroll Solution’ that MACEE offers.
              </p>
            </div>

            {/* Outsourcing */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">
                Outsourcing
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Outsourcing work to an external party on a temporary contract basis, whereby the external party performs the work with its own staff and under its own management and is responsible for the result, instead of taking on a permanent employee. It is used for temporary projects, specialist knowledge or to respond flexibly to needs, without the obligations of permanent employment.
              </p>
            </div>

            {/* Permanent */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">
                Permanent
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Additionally MACEE also actively assists clients with the ‘Search and Selection’ of candidates for their internal permanent positions.
              </p>
            </div>

            {/* HSM / Expats / Visa Sponsorship */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border-2 border-[#e8382e]/30 bg-gradient-to-r from-white to-[#f8dada]/20">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e8382e] mb-1">
                <Globe className="w-4 h-4" />
                <span>IND Recognised Sponsor</span>
              </div>
              <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">
                HSM / Expats / Visa Sponsorship
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Having found your new temporary contract or project, MACEE will arrange your VISA / Work permit application as we are an official IND (Immigration Service) Recognised Sponsor. Holding this IND registration enables MACEE to relocate highly skilled migrants (HSM Expats) to the Netherlands via a fast and streamlined procedure, making life easier for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INDUSTRIES IN DEPTH */}
      <section className="py-16 sm:py-24 bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900">
              Industries
            </h2>
            <p className="text-base text-gray-700 mt-2 font-medium">
              Experience and proven track record in multiple industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ICT */}
            <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm flex flex-col">
              <img
                src="/uploads/Software-Development-2.jpg"
                alt="ICT"
                className="w-full h-44 object-cover"
              />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">ICT</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Is our bread and butter. With years of experience in the placement of temporary ICT professionals, we have an in-depth understanding of this industry. We understand the dynamics of the market, know what matters to clients, and speak the language of professionals.
                  </p>
                </div>
              </div>
            </div>

            {/* Telecom */}
            <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm flex flex-col">
              <img
                src="/uploads/Telecom (1).jpg"
                alt="Telecom"
                className="w-full h-44 object-cover"
              />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Telecom</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    The telecoms industry is constantly changing – and that's what makes it so interesting. From high-speed internet to smart networks and innovative solutions, our telecoms clients are at the heart of this dynamic environment.
                  </p>
                </div>
              </div>
            </div>

            {/* Banking / Fintech / Finance */}
            <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm flex flex-col">
              <img
                src="/uploads/Finance-reporting.jpg"
                alt="Banking / Fintech / Finance"
                className="w-full h-44 object-cover"
              />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Banking / Fintech / Finance</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    The Fintech industry is where technology and finance converge to shape the future of money. MACEE supports them with professionals who are just as agile and innovative as the industry itself.
                  </p>
                </div>
              </div>
            </div>

            {/* High Tech Industry */}
            <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm flex flex-col">
              <img
                src="/uploads/Hightech-Industry-3.jpg"
                alt="High Tech Industry"
                className="w-full h-44 object-cover"
              />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">High Tech Industry</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    The Netherlands is a global player in the high-tech industry. Regions such as Eindhoven and Delft are hubs for innovation, precision and technology. We work closely with progressive organisations in these high-tech hotspots.
                  </p>
                </div>
              </div>
            </div>

            {/* Government */}
            <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm flex flex-col">
              <img
                src="/uploads/Dutch-government-3.jpg"
                alt="Government"
                className="w-full h-44 object-cover"
              />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Government</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    The public sector is undergoing rapid change. Digital transformation, process optimisation and secure IT solutions require strong IT and business professionals.
                  </p>
                </div>
              </div>
            </div>

            {/* Oil & Gas */}
            <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm flex flex-col">
              <img
                src="/uploads/Oil--Gas-3.jpg"
                alt="Oil & Gas"
                className="w-full h-44 object-cover"
              />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Oil &amp; Gas</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    The Dutch energy hub in Rotterdam and beyond requires advanced ICT solutions—ranging from real-time data analytics and cloud computing to cybersecurity and sustainability monitoring.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Contact Section */}
      <ContactFormSection title="Get in contact with us" />
    </div>
  );
};
