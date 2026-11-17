import React from 'react';
import {
  Compass,
  Home,
  Users,
  Briefcase,
  HelpCircle,
  Phone,
  Building2,
  FileText,
  ShieldCheck,
  Globe2,
  CheckCircle2,
  ArrowRight,
  Code2,
  Landmark,
  Radio,
  Zap,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';

interface SitemapPageProps {
  onNavigate: (page: string, options?: any) => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate }) => {
  const { lang } = useLanguage();

  const mainPages = [
    {
      title: lang === 'NL' ? 'Home' : 'Home',
      url: '/',
      path: 'home',
      icon: Home,
      description:
        lang === 'NL'
          ? 'Externe workforce desk, flexibele staffing, detachering en compliance in Nederland.'
          : 'External workforce desk, flexible staffing, secondment, and compliance across the Netherlands.',
    },
    {
      title: lang === 'NL' ? 'Over ons' : 'About Us',
      url: '/about',
      path: 'about',
      icon: Building2,
      description:
        lang === 'NL'
          ? 'Meer dan 30 jaar ervaring in recruitment, onze filosofie, hoofdkantoor Arnhem en SNA-certificering.'
          : '30+ years of recruitment expertise, dedicated staffing desk, Arnhem headquarters, and certifications.',
    },
    {
      title: lang === 'NL' ? 'Voor Opdrachtgevers' : 'For Clients & Employers',
      url: '/clients',
      path: 'clients',
      icon: Users,
      description:
        lang === 'NL'
          ? 'Inhuurdesk, 48-72u shortlist SLA, no-risk vervangingsgarantie, Wet DBA en MSP-oplossingen.'
          : 'External workforce desk, 48-72h shortlist SLA, replacement guarantee, Wet DBA, and MSP solutions.',
    },
    {
      title: lang === 'NL' ? 'Voor Professionals' : 'For Professionals & Contractors',
      url: '/professionals',
      path: 'professionals',
      icon: Briefcase,
      description:
        lang === 'NL'
          ? 'Detachering, ZZP-bemiddeling, IND-kennismigrantenvisa, 30%-regeling en stipte uitbetaling.'
          : 'Secondment, ZZP brokerage, IND visa sponsorship, 30% tax ruling, and guaranteed on-time payments.',
    },
    {
      title: lang === 'NL' ? 'Projecten & Vacatures' : 'Projects & Vacancies',
      url: '/projects',
      path: 'projects',
      icon: FileText,
      description:
        lang === 'NL'
          ? 'Actuele IT-, Data-, Cloud- en Finance-posities gesynchroniseerd met onze OTYS-wervingsdesk.'
          : 'Active IT, Data, Cloud, and Finance positions synchronized live with our OTYS recruitment desk.',
    },
    {
      title: lang === 'NL' ? 'Veelgestelde Vragen (FAQ)' : 'FAQ & Knowledge Base',
      url: '/faq',
      path: 'faq',
      icon: HelpCircle,
      description:
        lang === 'NL'
          ? 'Complete kennisbank met alle vragen over inhuur, contracten, Wet DBA, visa en salarissen.'
          : 'Complete knowledge base covering all questions regarding hiring, contracting, Wet DBA, and visas.',
    },
    {
      title: lang === 'NL' ? 'Contact' : 'Contact Us',
      url: '/contact',
      path: 'contact',
      icon: Phone,
      description:
        lang === 'NL'
          ? 'Kantoor Willemsplein 44 te Arnhem, telefoon +31 (0) 26 785 1010 en spoedinterimdesk.'
          : 'Arnhem headquarters (Willemsplein 44), phone +31 (0) 26 785 1010, and emergency staffing desk.',
    },
  ];

  const services = [
    {
      title: lang === 'NL' ? 'Detachering & Interim' : 'Secondment & Interim Deployment',
      description:
        lang === 'NL'
          ? 'Flexibele inzet met volledig werkgeversrisicobeheer en zekerheid.'
          : 'Flexible project staffing with full employer liability management.',
      target: 'clients',
    },
    {
      title: lang === 'NL' ? 'ZZP Bemiddeling & Contractering' : 'Freelance / ZZP Brokerage',
      description:
        lang === 'NL'
          ? 'Getoetste modelovereenkomsten ter voorkoming van schijnzelfstandigheid.'
          : 'Tax Authority-approved model contracts eliminating false self-employment.',
      target: 'clients',
    },
    {
      title: lang === 'NL' ? 'IND Erkend Referent (Kennismigranten)' : 'IND Visa Sponsorship',
      description:
        lang === 'NL'
          ? 'Snelle visumprocedures voor hoogopgeleide internationale specialisten.'
          : 'Fast-track work and residence permits for highly skilled migrants.',
      target: 'professionals',
    },
    {
      title: lang === 'NL' ? '30%-Regeling Begeleiding' : '30% Tax Ruling Support',
      description:
        lang === 'NL'
          ? 'Fiscaal voordeel voor internationale kenniswerkers in Nederland.'
          : 'Expert preparation and submission to the Dutch Tax Administration.',
      target: 'professionals',
    },
    {
      title: lang === 'NL' ? 'SNA NEN 4400-1 & G-Rekening' : 'SNA NEN 4400-1 Compliance',
      description:
        lang === 'NL'
          ? 'Vrijwaring van ketenaansprakelijkheid en transparante loonafdrachten.'
          : 'Complete indemnity against chain liability and verified tax escrows.',
      target: 'about',
    },
    {
      title: lang === 'NL' ? 'Master Vendor & MSP Oplossingen' : 'Master Vendor & MSP Brokerage',
      description:
        lang === 'NL'
          ? 'Consolidatie van al uw externe inhuur onder één overzichtelijke SLA.'
          : 'Consolidate supplier management, rate benchmarking, and billing.',
      target: 'clients',
    },
  ];

  const branches = [
    {
      name: lang === 'NL' ? 'ICT & Software Engineering' : 'ICT & Software Engineering',
      icon: Code2,
      branche: 'ICT',
    },
    {
      name: lang === 'NL' ? 'Banking, Verzekeringen & Fintech' : 'Banking, Insurance & Fintech',
      icon: Landmark,
      branche: 'Banking and insurance',
    },
    {
      name: lang === 'NL' ? 'Publieke Sector & Overheid' : 'Public Sector & Government',
      icon: Building2,
      branche: 'Public sector',
    },
    {
      name: lang === 'NL' ? 'Telecom & Netwerkinfrastructuur' : 'Telecom & Infrastructure',
      icon: Radio,
      branche: 'Telecom',
    },
    {
      name: lang === 'NL' ? 'Energietransitie & Utilities' : 'Energy Transition & Utilities',
      icon: Zap,
      branche: 'Energy Transition',
    },
  ];

  return (
    <div className="page_sitemap min-h-screen bg-[#F8FAFB]">
      <SEO
        title={
          lang === 'NL'
            ? 'Website Sitemap & Paginaoverzicht | Macee'
            : 'Website Sitemap & Page Directory | Macee'
        }
        description={
          lang === 'NL'
            ? 'Volledig sitemap-overzicht van Macee: ontdek al onze inhuurdiensten, vacatures, compliance-richtlijnen, contactgegevens en XML-sitemap.'
            : 'Complete sitemap and directory of Macee External Workforce Solutions. Explore staffing services, job vacancies, compliance guides, and contact information.'
        }
        canonicalPath="/sitemap"
        lang={lang}
      />

      {/* Hero Header */}
      <section
        className="relative py-20 sm:py-28 bg-cover bg-center text-white overflow-hidden"
        style={{ backgroundImage: `url("/uploads/PM-2.jpg")` }}
      >
        <div className="absolute inset-0 bg-[#2a0209]/85 backdrop-blur-[2px]" />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white/95 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-xs mb-4">
            <Compass className="w-3.5 h-3.5 text-[#E30613]" />
            <span>{lang === 'NL' ? 'Website Overzicht' : 'Website Directory'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-tight">
            Macee <span className="text-[#E30613]">Sitemap</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-[#f8dada] font-medium max-w-2xl mx-auto leading-relaxed">
            {lang === 'NL'
              ? 'Bekijk de complete structuur van onze website met directe links naar alle pagina’s, diensten en branches.'
              : 'Browse the complete structure of our website with direct navigation links to all pages, services, and industries.'}
          </p>

          {/* Direct link to Search Engine XML Sitemap */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all backdrop-blur-xs"
            >
              <span>{lang === 'NL' ? 'Bekijk XML Sitemap (Zoekmachines)' : 'View XML Sitemap (Search Engines)'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#E30613]" />
            </a>
            <span className="text-xs text-white/70 font-mono">
              https://macee.com/sitemap.xml
            </span>
          </div>
        </div>
      </section>

      {/* Main Directory Body */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* 1. Main Navigation Pages */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Compass className="w-5 h-5 text-[#E30613]" />
              <h2 className="text-2xl font-bold font-display text-gray-900">
                {lang === 'NL' ? '1. Hoofdpagina’s' : '1. Main Navigation Pages'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mainPages.map((page, idx) => {
                const Icon = page.icon;
                return (
                  <div
                    key={idx}
                    onClick={() => onNavigate(page.path)}
                    className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#E30613] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#E30613]/10 text-[#E30613] flex items-center justify-center group-hover:bg-[#E30613] group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono text-gray-400">
                          {page.url}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold font-display text-gray-900 group-hover:text-[#E30613] transition-colors mb-2">
                        {page.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {page.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#E30613]">
                      <span>{lang === 'NL' ? 'Bezoek pagina' : 'Visit page'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Key Services Directory */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="w-5 h-5 text-[#E30613]" />
              <h2 className="text-2xl font-bold font-display text-gray-900">
                {lang === 'NL' ? '2. Inhuur- & Detacheringsdiensten' : '2. Workforce & Staffing Solutions'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigate(srv.target)}
                  className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#111827] transition-all cursor-pointer"
                >
                  <h3 className="text-base font-bold font-display text-gray-900 mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    {srv.description}
                  </p>
                  <span className="text-xs font-semibold text-[#E30613] flex items-center gap-1">
                    <span>{lang === 'NL' ? 'Lees meer' : 'Learn more'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Industry Verticals Directory */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Globe2 className="w-5 h-5 text-[#E30613]" />
              <h2 className="text-2xl font-bold font-display text-gray-900">
                {lang === 'NL' ? '3. Sectoren & Branches (Vacatures)' : '3. Industry Verticals (Openings)'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {branches.map((br, idx) => {
                const Icon = br.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onNavigate('projects', { branche: br.branche })}
                    className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-[#E30613] hover:shadow-xs transition-all text-left cursor-pointer group"
                  >
                    <Icon className="w-6 h-6 text-[#E30613] mb-3 group-hover:scale-110 transition-transform" />
                    <h4 className="text-sm font-bold font-display text-gray-900 group-hover:text-[#E30613] transition-colors leading-snug">
                      {br.name}
                    </h4>
                    <span className="text-[11px] text-gray-400 mt-2 block">
                      {lang === 'NL' ? 'Bekijk vacatures →' : 'View roles →'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Technical File Links Card */}
          <div className="p-8 rounded-2xl bg-[#111827] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E30613]">
                {lang === 'NL' ? 'Zoekmachine Bestanden' : 'Search Engine Crawlers'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display">
                XML Sitemap &amp; Robots.txt
              </h3>
              <p className="text-sm text-gray-300 max-w-xl">
                {lang === 'NL'
                  ? 'Voor Google Search Console, Bing Webmaster Tools en geautomatiseerde indexering kunt u onze officiële XML- en robotsbestanden raadplegen.'
                  : 'For Google Search Console, Bing Webmaster Tools, and automated indexers, refer to our official XML sitemap and robots directives.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-[#E30613] hover:bg-[#be040f] text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
              >
                <span>/sitemap.xml</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-colors inline-flex items-center gap-1.5"
              >
                <span>/robots.txt</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
