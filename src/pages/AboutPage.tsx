import React from 'react';
import aboutData from '../data/aboutData.json';
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

const TEAM_MEMBERS = aboutData.team.members;

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
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#111827]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#E30613]/5 blur-3xl pointer-events-none" />

        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Heading, Subheading & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111827]/10 text-[#111827] text-xs sm:text-sm font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#E30613]" />
                <span>{aboutData.hero.badge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-[#111827] tracking-tight leading-[1.12]">
                {aboutData.hero.titlePrefix}{' '}
                <span className="text-[#E30613] underline decoration-[#E30613]/20 decoration-wavy">
                  {aboutData.hero.titleHighlight}
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-[#54595F] leading-relaxed max-w-2xl font-normal">
                {aboutData.hero.description}
              </p>

              {/* CTAs matching Home Page */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => scrollToSection(aboutData.hero.primaryCta.target)}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-[5px] bg-[#E30613] hover:bg-[#111827] text-white font-semibold text-base shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-0.5"
                >
                  <span>{aboutData.hero.primaryCta.text}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => scrollToSection(aboutData.hero.secondaryCta.target)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-[5px] bg-white border border-[#111827]/25 text-[#111827] hover:bg-[#F8FAFB] font-semibold text-base transition-colors duration-200 cursor-pointer"
                >
                  <span>{aboutData.hero.secondaryCta.text}</span>
                </button>
              </div>

              {/* Trust points */}
              <div className="pt-6 border-t border-gray-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-[#333333]">
                {aboutData.hero.trustPoints.map((tp, idx) => (
                  <div key={tp.id || idx} className="flex items-center gap-2">
                    {idx === 0 && <ShieldCheck className="w-4 h-4 text-[#111827] shrink-0" />}
                    {idx === 1 && <CheckCircle2 className="w-4 h-4 text-[#111827] shrink-0" />}
                    {idx === 2 && <Users className="w-4 h-4 text-[#111827] shrink-0" />}
                    <span className="font-medium">{tp.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Framed Image with Badge */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-none">
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#111827]/15 to-[#E30613]/15 rounded-2xl transform rotate-1 scale-[0.99]" />

                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100">
                  <img
                    src={aboutData.hero.image.src}
                    alt={aboutData.hero.image.alt}
                    className="w-full h-auto object-cover max-h-[500px] aspect-[4/4.2] object-center hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Floating strategic badge */}
                <div className="absolute -bottom-5 -left-4 sm:left-4 bg-white/95 backdrop-blur-md border border-gray-200/80 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#111827] text-white flex items-center justify-center font-bold text-base shadow-xs">
                    M
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#111827] uppercase tracking-wide">
                      {aboutData.hero.image.badgeTitle}
                    </p>
                    <p className="text-[11px] text-[#54595F]">
                      {aboutData.hero.image.badgeSubtitle}
                    </p>
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
                <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#E30613] mb-2">
                  {aboutData.whatWeDo.badge}
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#111827] tracking-tight">
                  {aboutData.whatWeDo.title}
                </h2>
              </div>

              {aboutData.whatWeDo.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index === 0
                      ? 'text-base sm:text-lg text-[#54595F] leading-relaxed font-normal'
                      : 'text-base text-[#54595F] leading-relaxed font-normal'
                  }
                >
                  {paragraph}
                </p>
              ))}

              {/* Highlighting Capability Pills */}
              <div className="pt-2 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#F8FAFB] border border-gray-200/80 text-xs font-semibold text-[#111827]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E30613]" />
                  {aboutData.whatWeDo.highlights[0]}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#F8FAFB] border border-gray-200/80 text-xs font-semibold text-[#111827]">
                  <Globe2 className="w-3.5 h-3.5 text-[#111827]" />
                  {aboutData.whatWeDo.highlights[1]}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#F8FAFB] border border-gray-200/80 text-xs font-semibold text-[#111827]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#111827]" />
                  {aboutData.whatWeDo.highlights[2]}
                </span>
              </div>
            </div>

            {/* Right Column: Framed Image with Badge */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#111827]/15 to-[#E30613]/15 rounded-2xl transform rotate-1 scale-[0.99]" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100">
                  <img
                    src={aboutData.whatWeDo.image.src}
                    alt={aboutData.whatWeDo.image.alt}
                    className="w-full h-auto object-cover max-h-[460px] aspect-[4/3] hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.currentTarget.src = aboutData.whatWeDo.image.fallback;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-md border border-gray-100">
                    <p className="text-sm font-semibold text-[#111827]">
                      {aboutData.whatWeDo.image.badgeTitle}
                    </p>
                    <p className="text-xs text-[#54595F] mt-0.5">
                      {aboutData.whatWeDo.image.badgeSubtitle}
                    </p>
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
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#E30613]/15 to-[#111827]/15 rounded-2xl transform -rotate-1 scale-[0.99]" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100">
                  <img
                    src={aboutData.howWeWork.image.src}
                    alt={aboutData.howWeWork.image.alt}
                    className="w-full h-auto object-cover max-h-[460px] aspect-[4/3] hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.currentTarget.src = aboutData.howWeWork.image.fallback;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-md border border-gray-100">
                    <p className="text-sm font-semibold text-[#111827]">
                      {aboutData.howWeWork.image.badgeTitle}
                    </p>
                    <p className="text-xs text-[#54595F] mt-0.5">
                      {aboutData.howWeWork.image.badgeSubtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Heading, Content & Trust Features */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
              <div>
                <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#E30613] mb-2">
                  {aboutData.howWeWork.badge}
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#111827] tracking-tight">
                  {aboutData.howWeWork.title}
                </h2>
              </div>

              {aboutData.howWeWork.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className={
                    idx === 0
                      ? 'text-base sm:text-lg text-[#54595F] leading-relaxed font-normal'
                      : 'text-base text-[#54595F] leading-relaxed font-normal'
                  }
                >
                  {p}
                </p>
              ))}

              {/* Three High-Value Feature Rows */}
              <div className="pt-2 space-y-3">
                {aboutData.howWeWork.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200/80 shadow-2xs">
                    <CheckCircle2 className="w-5 h-5 text-[#111827] shrink-0" />
                    <span className="text-sm text-[#333333] font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES */}
      <section id="about-services" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-gray-100">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#E30613] mb-2">
              {aboutData.services.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#111827] tracking-tight">
              {aboutData.services.title}
            </h2>
            <p className="mt-3 text-lg font-semibold text-[#111827]/80">
              {aboutData.services.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutData.services.items.map((svc) => (
              <div
                key={svc.id}
                className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#111827] to-[#E30613] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#111827]/10 text-[#111827] group-hover:bg-[#E30613] group-hover:text-white flex items-center justify-center transition-colors mb-6 shadow-2xs">
                    {svc.icon === 'Users' ? (
                      <Users className="w-6 h-6" />
                    ) : svc.icon === 'Briefcase' ? (
                      <Briefcase className="w-6 h-6" />
                    ) : (
                      <ShieldCheck className="w-6 h-6" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold font-display text-[#111827] group-hover:text-[#E30613] transition-colors mb-4">
                    {svc.title}
                  </h3>
                  <div className="space-y-3 text-sm text-[#54595F] leading-relaxed">
                    {svc.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F8FAFB] text-[#111827] border border-gray-200/80">
                    {svc.tag}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#E30613] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TEAM MACEE & ANNOUNCEMENTS */}
      <section id="about-team" className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFB] border-b border-gray-100">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#E30613] mb-2">
              {aboutData.team.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#111827] tracking-tight">
              {aboutData.team.title}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#54595F] leading-relaxed">
              {aboutData.team.description}
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
                  <h3 className="text-lg font-bold font-display text-[#111827]">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#E30613] mt-1.5">
                    {member.role}
                  </p>
                </div>

                {/* Divider Line & Contact Buttons */}
                <div className="mt-8">
                  <div className="w-full border-t border-gray-100 mb-5" />

                  <div className="space-y-2.5">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center justify-center gap-2.5 w-full py-2.5 px-3 rounded-xl bg-[#F8FAFB] hover:bg-[#111827] hover:text-white text-xs text-[#4B5563] transition-colors group/btn"
                    >
                      <Mail className="w-4 h-4 text-[#111827] group-hover/btn:text-white shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </a>
                    <a
                      href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`}
                      className="flex items-center justify-center gap-2.5 w-full py-2.5 px-3 rounded-xl bg-[#F8FAFB] hover:bg-[#111827] hover:text-white text-xs font-medium text-[#4B5563] transition-colors group/btn"
                    >
                      <Phone className="w-4 h-4 text-[#111827] group-hover/btn:text-white shrink-0" />
                      <span>{member.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* 6. Contact Form Section matching Home Page Theme */}
      <div id="about-contact">
        <ContactFormSection title={aboutData.contact.title} />
      </div>
    </div>
  );
};
