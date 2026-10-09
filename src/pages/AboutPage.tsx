import React from 'react';
import { ContactFormSection } from '../components/ContactFormSection';
import { 
  CheckCircle2, 
  Mail, 
  Phone, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Briefcase, 
  ArrowUpRight, 
  ArrowRight,
  Award,
  Globe2,
  Calendar
} from 'lucide-react';

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

const TEAM_MEMBERS = [
  {
    name: 'Dick Noorlander',
    role: 'Senior Accountmanager',
    image: 'https://www.macee.com/media/cache/square_crop_center/rc/sMzvFzco/uploads/Bredere%20foto.png',
    email: 'dick.noorlander@macee.com',
    phone: '+31 (0)6 28 35 77 04',
  },
  {
    name: 'Maartje Koekebakker',
    role: 'Contractmanager',
    image: 'https://www.macee.com/media/cache/square_crop_center/rc/IAJ6bXf8/uploads/maarten-koekebakker.jpeg%20%281%29.jpg',
    email: 'maartje.koekebakker@macee.com',
    phone: '+31 (0)6 82 85 97 10',
  },
  {
    name: 'Adam Nichols',
    role: 'Recruiter',
    image: 'https://www.macee.com/media/cache/square_crop_center/rc/k8LJpK7C/uploads/adam-nichols.jpeg.jpg',
    email: 'adam.nichols@macee.com',
    phone: '+31 (0)6 82 85 97 29',
  },
  {
    name: 'Michael Stip',
    role: 'Financieel Manager',
    image: 'https://www.macee.com/media/cache/square_crop_center/rc/WALuDQhd/uploads/michael-siep.png',
    email: 'michael.stip@macee.com',
    phone: '+31 (0)6 82 85 97 06',
  },
  {
    name: 'Amir Davis',
    role: 'Relatiemanager',
    image: 'https://www.macee.com/media/cache/square_crop_center/rc/2JLI5vyn/uploads/amin-david.jpeg.jpg',
    email: 'amir.davis@macee.com',
    phone: '+31 (0)6 28 35 77 05',
  },
  {
    name: 'Victor Weijdeman',
    role: 'Relatiemanager',
    image: 'https://www.macee.com/media/cache/square_crop_center/rc/sjXS1wcB/uploads/Nicky%20.jpg',
    email: 'victor.weijdeman@macee.com',
    phone: '+31 (0)6 28 35 77 06',
  },
];

export const AboutPage: React.FC<AboutPageProps> = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="page_about">
      {/* 1. Hero Section - Matching Home Page 2-Column Split Hero */}
      <section 
        id="about-hero"
        className="relative overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFB] to-[#FFFFFF] py-12 sm:py-16 lg:py-20 border-b border-gray-100"
      >
        {/* Subtle background decorative shapes */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#1D454C]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#6B0D43]/5 blur-3xl pointer-events-none" />

        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Heading, Subheading & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1D454C]/10 text-[#1D454C] text-xs sm:text-sm font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#6B0D43]" />
                <span>Think Better. Recruit Smarter.</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-[#1D454C] tracking-tight leading-[1.12]">
                About <span className="text-[#6B0D43] underline decoration-[#6B0D43]/20 decoration-wavy">Macee</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#54595F] leading-relaxed max-w-2xl font-normal">
                Your trusted partner for flexible staffing, contract administration, compliance, and international recruitment across the Netherlands and Europe.
              </p>

              {/* CTAs matching Home Page */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => scrollToSection('about-contact')}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-[5px] bg-[#6B0D43] hover:bg-[#1D454C] text-white font-semibold text-base shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-0.5"
                >
                  <span>Get in Contact</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => scrollToSection('about-services')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-[5px] bg-white border border-[#1D454C]/25 text-[#1D454C] hover:bg-[#F8FAFB] font-semibold text-base transition-colors duration-200 cursor-pointer"
                >
                  <span>Our Services</span>
                </button>
              </div>

              {/* Trust points */}
              <div className="pt-6 border-t border-gray-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-[#333333]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1D454C] shrink-0" />
                  <span className="font-medium">SNA NEN 4400-1 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1D454C] shrink-0" />
                  <span className="font-medium">IND Recognised Sponsor</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#1D454C] shrink-0" />
                  <span className="font-medium">30+ Years Experience</span>
                </div>
              </div>
            </div>

            {/* Right Column: Framed Image with Badge */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-none">
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#1D454C]/15 to-[#6B0D43]/15 rounded-2xl transform rotate-1 scale-[0.99]" />
                
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100">
                  <img
                    src="/images/team-room.jpg"
                    alt="Macee Workforce Solutions Specialists"
                    className="w-full h-auto object-cover max-h-[500px] aspect-[4/4.2] object-center hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Floating strategic badge */}
                <div className="absolute -bottom-5 -left-4 sm:left-4 bg-white/95 backdrop-blur-md border border-gray-200/80 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1D454C] text-white flex items-center justify-center font-bold text-base shadow-xs">
                    M
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1D454C] uppercase tracking-wide">External Workforce Specialists</p>
                    <p className="text-[11px] text-[#54595F]">Arnhem · Amsterdam · Global Talent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE DO */}
      <section id="about-what-we-do" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-gray-100">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Heading, Copy & Feature Pills */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div>
                <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#6B0D43] mb-2">
                  ABOUT US
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#1D454C] tracking-tight">
                  WHAT WE DO
                </h2>
              </div>

              <p className="text-base sm:text-lg text-[#54595F] leading-relaxed font-normal">
                Macee is a leading provider of external workforce hiring solutions, with a strong focus on the IT sector and extensive business experience. We specialise in sourcing and managing international contractors, freelancers, and experts, ensuring seamless integration into your organisation regardless of location.
              </p>

              <p className="text-base text-[#54595F] leading-relaxed font-normal">
                Our dedicated team leverages a global network to connect you with highly skilled professionals who can support your business goals and keep your organisation agile in a rapidly evolving digital landscape.
              </p>

              <p className="text-base text-[#54595F] leading-relaxed font-normal">
                With our expertise in compliance, onboarding, and cross-border workforce management, we offer tailored solutions that meet your unique project requirements and support your business growth.
              </p>

              {/* Highlighting Capability Pills */}
              <div className="pt-2 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#F8FAFB] border border-gray-200/80 text-xs font-semibold text-[#1D454C]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#6B0D43]" />
                  IT Sector Specialisation
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#F8FAFB] border border-gray-200/80 text-xs font-semibold text-[#1D454C]">
                  <Globe2 className="w-3.5 h-3.5 text-[#1D454C]" />
                  Global Talent Network
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#F8FAFB] border border-gray-200/80 text-xs font-semibold text-[#1D454C]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1D454C]" />
                  End-to-End Compliance
                </span>
              </div>
            </div>

            {/* Right Column: Framed Image with Badge */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#1D454C]/15 to-[#6B0D43]/15 rounded-2xl transform rotate-1 scale-[0.99]" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100">
                  <img
                    src="/uploads/macee1.png"
                    alt="What We Do - Macee Workplace"
                    className="w-full h-auto object-cover max-h-[460px] aspect-[4/3] hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.currentTarget.src = '/images/team-room.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-md border border-gray-100">
                    <p className="text-sm font-semibold text-[#1D454C]">The Protective Link for External Talent</p>
                    <p className="text-xs text-[#54595F] mt-0.5">SNA NEN 4400-1 certified · Official IND Recognised Sponsor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW WE WORK */}
      <section id="about-how-we-work" className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFB] border-b border-gray-100">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Framed Image */}
            <div className="lg:col-span-6 order-2 lg:order-1 relative flex justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#6B0D43]/15 to-[#1D454C]/15 rounded-2xl transform -rotate-1 scale-[0.99]" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100">
                  <img
                    src="/uploads/people-working-dsk.jpg"
                    alt="How We Work - Macee Team Collaboration"
                    className="w-full h-auto object-cover max-h-[460px] aspect-[4/3] hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.currentTarget.src = '/images/careers-handshake.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-md border border-gray-100">
                    <p className="text-sm font-semibold text-[#1D454C]">Your External Hiring Desk</p>
                    <p className="text-xs text-[#54595F] mt-0.5">Compliant, convenient, peace of mind</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Heading, Content & Trust Features */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
              <div>
                <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#6B0D43] mb-2">
                  OUR APPROACH
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#1D454C] tracking-tight">
                  HOW WE WORK
                </h2>
              </div>

              <p className="text-base sm:text-lg text-[#54595F] leading-relaxed font-normal">
                We are the broker for your flexible staffing needs, but we do more than just mediate. Think of us as an extension of your External Hiring Desk: the proactive link between your organisation and external talent, providing compliant, convenient, and peace-of-mind workforce solutions.
              </p>

              <p className="text-base text-[#54595F] leading-relaxed font-normal">
                We focus on finding the right professionals for your organisation while taking care of the administrative and compliance requirements behind the scenes.
              </p>

              {/* Three High-Value Feature Rows */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200/80 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-[#1D454C] shrink-0" />
                  <span className="text-sm text-[#333333] font-medium">Full NEN-4400-1 labour &amp; fiscal compliance</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200/80 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-[#1D454C] shrink-0" />
                  <span className="text-sm text-[#333333] font-medium">Official IND Recognised Sponsor for fast work visa relocation</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200/80 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-[#1D454C] shrink-0" />
                  <span className="text-sm text-[#333333] font-medium">Over 30 years of combined contracting and IT recruitment experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES */}
      <section id="about-services" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-gray-100">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#6B0D43] mb-2">
              TAILORED SOLUTIONS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#1D454C] tracking-tight">
              SERVICES
            </h2>
            <p className="mt-3 text-lg font-semibold text-[#1D454C]/80">
              What can we do for you?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1D454C] to-[#6B0D43] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1D454C]/10 text-[#1D454C] group-hover:bg-[#6B0D43] group-hover:text-white flex items-center justify-center transition-colors mb-6 shadow-2xs">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-[#1D454C] group-hover:text-[#6B0D43] transition-colors mb-4">
                  Recruitment &amp; Staffing
                </h3>
                <div className="space-y-3 text-sm text-[#54595F] leading-relaxed">
                  <p>
                    When looking for specific expertise, temporary or permanent, we carefully analyse what you are looking for. We combine relevant expertise, culture fit, and soft skills to identify the right professionals for your organisation.
                  </p>
                  <p>
                    We are independent and focused on finding candidates with the right track record and expertise. Our approach allows us to search widely and connect you with the most suitable talent for your needs.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F8FAFB] text-[#1D454C] border border-gray-200/80">
                  Contracting &amp; Permanent
                </span>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#6B0D43] transition-colors" />
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1D454C] to-[#6B0D43] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1D454C]/10 text-[#1D454C] group-hover:bg-[#6B0D43] group-hover:text-white flex items-center justify-center transition-colors mb-6 shadow-2xs">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-[#1D454C] group-hover:text-[#6B0D43] transition-colors mb-4">
                  Contract Administration
                </h3>
                <div className="space-y-3 text-sm text-[#54595F] leading-relaxed">
                  <p>
                    Once the right candidate is selected for an interview, we take care of the candidate onboarding process and manage all relevant compliance procedures.
                  </p>
                  <p>
                    This includes matters relating to local labour and immigration legislation, payroll, and other applicable requirements. We make sure the complete process is handled efficiently and professionally, allowing you to focus on your core business.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F8FAFB] text-[#1D454C] border border-gray-200/80">
                  Payroll &amp; EOR
                </span>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#6B0D43] transition-colors" />
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1D454C] to-[#6B0D43] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1D454C]/10 text-[#1D454C] group-hover:bg-[#6B0D43] group-hover:text-white flex items-center justify-center transition-colors mb-6 shadow-2xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-[#1D454C] group-hover:text-[#6B0D43] transition-colors mb-4">
                  Compliance &amp; Support
                </h3>
                <div className="space-y-3 text-sm text-[#54595F] leading-relaxed">
                  <p>
                    Macee stands for direct, transparent, and compliant cooperation. Our team has extensive knowledge of local legislation and regulations.
                  </p>
                  <p>
                    We provide support with compliance, labour and immigration requirements, payroll-related matters, and other processes related to external workforce management.
                  </p>
                  <p>
                    Whether you need help with onboarding, compliance, or workforce administration, we work alongside your organisation to provide practical and reliable support.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F8FAFB] text-[#1D454C] border border-gray-200/80">
                  Legal &amp; Risk Defense
                </span>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#6B0D43] transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TEAM MACEE & ANNOUNCEMENTS */}
      <section id="about-team" className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFB] border-b border-gray-100">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#6B0D43] mb-2">
              OUR PEOPLE
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#1D454C] tracking-tight">
              TEAM MACEE
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#54595F] leading-relaxed">
              Meet our team of experienced recruiters, contract managers, and workforce specialists.
            </p>
          </div>

          {/* Symmetrical Grid for the 6 Team Members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 mb-16 pt-8">
            {TEAM_MEMBERS.map((member) => (
              <div 
                key={member.name} 
                className="relative bg-white rounded-[26px] px-6 pb-6 pt-16 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 text-center flex flex-col justify-between group"
              >
                {/* Floating Circular Avatar overlapping top border */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full p-1 bg-white ring-4 ring-[#EFF2F4] shadow-md overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = '/images/careers-handshake.jpg';
                    }}
                  />
                </div>

                {/* Name & Role */}
                <div className="mt-1">
                  <h3 className="text-lg font-bold font-display text-[#1D454C]">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#6B0D43] mt-1.5">
                    {member.role}
                  </p>
                </div>

                {/* Divider Line & Contact Buttons */}
                <div className="mt-8">
                  <div className="w-full border-t border-gray-100 mb-5" />
                  
                  <div className="space-y-2.5">
                    <a 
                      href={`mailto:${member.email}`} 
                      className="flex items-center justify-center gap-2.5 w-full py-2.5 px-3 rounded-xl bg-[#F8FAFB] hover:bg-[#1D454C] hover:text-white text-xs text-[#4B5563] transition-colors group/btn"
                    >
                      <Mail className="w-4 h-4 text-[#1D454C] group-hover/btn:text-white shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </a>
                    <a 
                      href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`} 
                      className="flex items-center justify-center gap-2.5 w-full py-2.5 px-3 rounded-xl bg-[#F8FAFB] hover:bg-[#1D454C] hover:text-white text-xs font-medium text-[#4B5563] transition-colors group/btn"
                    >
                      <Phone className="w-4 h-4 text-[#1D454C] group-hover/btn:text-white shrink-0" />
                      <span>{member.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Announcement Card with Home Page Aesthetics */}
          <div className="max-w-xl mx-auto">
            <div className="p-8 sm:p-10 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1D454C] via-[#6B0D43] to-[#1D454C]" />
              
              <div className="w-16 h-16 rounded-2xl bg-[#1D454C]/5 border border-gray-100 flex items-center justify-center mb-4 p-2 shadow-2xs">
                <img
                  src="/images/macee-logo.png"
                  alt="Macee"
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/uploads/Macee-landscape-tricolore.png';
                  }}
                />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1D454C]/10 text-[#1D454C] mb-3 font-mono">
                <Calendar className="w-3.5 h-3.5 text-[#6B0D43]" />
                <span>13-02-2024</span>
              </div>

              <h3 className="text-xl font-bold font-display text-[#1D454C]">
                Announcement
              </h3>
              
              <p className="text-sm text-[#54595F] mt-2 leading-relaxed">
                Macee continues expanding its international contractor and tech recruitment networks across Arnhem, Amsterdam, and European innovation hubs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Contact Form Section matching Home Page Theme */}
      <div id="about-contact">
        <ContactFormSection title="Get in contact with us" />
      </div>
    </div>
  );
};
