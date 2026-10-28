import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'EN' | 'NL';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  EN: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.clients': 'Clients',
    'nav.professionals': 'Professionals',
    'nav.projects': 'Projects',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.getInTouch': 'Get in Touch',
    'nav.call': 'Call: +31 (0)26 744 0024',

    // Hero
    'hero.badge': 'Think Better. Recruit Smarter.',
    'hero.title1': 'External Workforce',
    'hero.title2': 'Solutions',
    'hero.desc': "Hiring external and temporary staff shouldn't slow you down. From sourcing to onboarding, contract administration to full compliancy, we take the complexity off your hands.",
    'hero.cta.primary': 'Explore Projects & Talent',
    'hero.cta.secondary': 'Our Services',
    'hero.trust.nen': 'SNA NEN 4400-1 Certified',
    'hero.trust.ind': 'Official IND Recognised Sponsor',
    'hero.trust.exp': '30+ Years Proven Experience',

    // What We Do
    'whatwedo.badge': 'OUR CORE EXPERTISE',
    'whatwedo.title': 'What Does MACEE Do?',
    'whatwedo.subtitle': 'Comprehensive workforce solutions tailored for Dutch enterprises, international contractors, and flexible specialists.',
    'whatwedo.cta': 'Explore All Services',
    'whatwedo.learnMore': 'Learn More',

    // Why Workforce Solutions
    'why.badge': 'DISCOVER THE DIFFERENCE',
    'why.title': 'Why Choose Macee as Your Workforce Partner?',
    'why.subtitle': 'Over 30 years of specialized experience navigating Dutch labour regulations, international recruitment, and flexible workforce compliance.',
    'why.cta': 'Request a Consultation',

    // Resources
    'resources.badge': 'KNOWLEDGE & GUIDANCE',
    'resources.title': 'Downloadable Macee Guides & Compliance Details',
    'resources.subtitle': 'Gain actionable insights into Dutch labour laws, SNA NEN 4400-1 standards, and cross-border expat hiring.',
    'resources.viewGuide': 'View Guide',
    'resources.download': 'Download PDF',

    // Current Job Listings
    'jobs.badge': 'LATEST OPPORTUNITIES',
    'jobs.title': 'Current Projects & Assignments',
    'jobs.subtitle': 'Explore hand-picked interim, contract, and permanent positions at top-tier Dutch enterprises.',
    'jobs.all': 'All',
    'jobs.viewAll': 'Explore All Projects & Assignments',
    'jobs.apply': 'Apply Directly',
    'jobs.details': 'View Details',
    'jobs.location': 'Location',
    'jobs.type': 'Type',
    'jobs.department': 'Branche',
    'jobs.noJobs': 'No vacancies found matching your criteria.',

    // Job Alert Banner
    'jobalert.badge': 'CAREER & ASSIGNMENT ALERTS',
    'jobalert.title': "Can't find the project you are looking for?",
    'jobalert.desc': 'Make a Jobalert and receive notifications automatically by email when there are suitable projects!',
    'jobalert.btn.create': 'Create a Job alert',
    'jobalert.btn.openApp': 'Open application',
    'jobalert.security': 'Your information is secure and confidential.',

    // Compliance Risk Banner
    'risk.badge': 'COMPLIANCE AUDIT',
    'risk.title': 'Protect Your Business from Wet DBA & Chain Liability Risks',
    'risk.desc': 'Are your freelance (ZZP) and secondment contracts 100% compliant with Dutch Tax Authority regulations? Take our quick compliance survey to identify potential exposure.',
    'risk.cta': 'Start Compliance Survey',

    // Contact Form Section
    'contact.title': 'Get in contact with us',
    'contact.subtitle': 'Do you have questions about flexible staffing, contract administration, or compliancy? Send us a message and our specialists will respond within 24 hours.',
    'contact.name': 'Your name',
    'contact.firstName': 'First name',
    'contact.lastName': 'Last name',
    'contact.email': 'Email address',
    'contact.phone': 'Phone number',
    'contact.company': 'Company name',
    'contact.subject': 'Subject',
    'contact.message': 'Your message / inquiry',
    'contact.privacy': 'I agree with the privacy statement and terms.',
    'contact.submit': 'Send message',
    'contact.submitting': 'Sending...',
    'contact.success': 'Thank you! Your message has been sent successfully.',

    // Footer
    'footer.company': 'Company',
    'footer.information': 'Information',
    'footer.forCandidates': 'For Candidates',
    'footer.services': 'Services',
    'footer.searchVacancies': 'Search vacancies',
    'footer.createJobalert': 'Create a Job alert',
    'footer.openApplication': 'Open application',
    'footer.contracting': 'Contracting & Freelance (ZZP)',
    'footer.expats': 'Expats & Visa Sponsorship (HSM)',
    'footer.clientsOverview': 'Clients Overview',
    'footer.contractAdmin': 'Contract Administration',
    'footer.complianceSurvey': 'Compliance Risk Survey',
    'footer.getInTouch': 'Get in touch',
    'footer.copyright': 'Copyright © 2026 Macee BV | External Workforce Solutions',

    // Modals
    'modal.openApp.title': 'Open application',
    'modal.openApp.cv': 'Upload CV',
    'modal.openApp.drag': 'Drag & Drop or Browse',
    'modal.openApp.submit': 'Send application',
    'modal.jobalert.title': 'Create Jobalert',
    'modal.jobalert.branche': 'Branche',
    'modal.jobalert.contract': 'Type of contract',
    'modal.jobalert.language': 'Language',
    'modal.jobalert.keyword': 'Search jobs by keyword',
    'modal.jobalert.freq': 'How often do you wish to receive vacancies?',
    'modal.jobalert.email': 'What is your email address?',
    'modal.jobalert.daily': 'Daily',
    'modal.jobalert.weekly': 'Weekly',
    'modal.jobalert.monthly': 'Monthly',
    'modal.jobalert.submit': 'Create Jobalert',
    'modal.jobalert.showMore': 'Show more',
    'modal.jobalert.showLess': 'Show less',
    'modal.close': 'Close',

    // Projects Page
    'projects.title': 'Projects & Assignments',
    'projects.filter.search': 'Search by keyword, skill or reference...',
    'projects.filter.location': 'All Locations',
    'projects.filter.branche': 'All Branches',
    'projects.filter.contract': 'All Contract Types',
    'projects.liveBadge': 'Live OTYS Web API Connected',
    'projects.backOverview': 'Back to overview',
    'projects.applyNow': 'Apply for this project',
  },
  NL: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'Over ons',
    'nav.clients': 'Opdrachtgevers',
    'nav.professionals': 'Professionals',
    'nav.projects': 'Vacatures',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.getInTouch': 'Neem contact op',
    'nav.call': 'Bel: +31 (0)26 744 0024',

    // Hero
    'hero.badge': 'Beter Denken. Slimmer Werven.',
    'hero.title1': 'Externe Personeels',
    'hero.title2': 'oplossingen',
    'hero.desc': 'Het inhuren van extern en tijdelijk personeel hoeft uw organisatie niet te vertragen. Van werving tot onboarding, van contractbeheer tot 100% compliance: wij nemen alle complexiteit uit handen.',
    'hero.cta.primary': 'Bekijk Projecten & Talent',
    'hero.cta.secondary': 'Onze Diensten',
    'hero.trust.nen': 'SNA NEN 4400-1 Gecertificeerd',
    'hero.trust.ind': 'Officieel IND Erkend Referent',
    'hero.trust.exp': '30+ Jaar Bewezen Ervaring',

    // What We Do
    'whatwedo.badge': 'ONZE KERNEXPERTISE',
    'whatwedo.title': 'Wat doet MACEE?',
    'whatwedo.subtitle': 'Complete personeelsoplossingen op maat voor Nederlandse opdrachtgevers, internationale aannemers en flexibele specialisten.',
    'whatwedo.cta': 'Bekijk Alle Diensten',
    'whatwedo.learnMore': 'Meer informatie',

    // Why Workforce Solutions
    'why.badge': 'ONTDEK HET VERSCHIL',
    'why.title': 'Waarom kiezen voor Macee als uw personeelspartner?',
    'why.subtitle': 'Ruim 30 jaar gespecialiseerde ervaring in de Nederlandse arbeidsmarkt, internationale werving en flexibele compliance.',
    'why.cta': 'Vraag een adviesgesprek aan',

    // Resources
    'resources.badge': 'KENNIS & INZICHT',
    'resources.title': 'Downloadbare Macee Gidsen & Compliance Informatie',
    'resources.subtitle': 'Krijg praktisch inzicht in Nederlands arbeidsrecht, SNA NEN 4400-1 normen en de inhuur van buitenlandse expats.',
    'resources.viewGuide': 'Bekijk Gids',
    'resources.download': 'Download PDF',

    // Current Job Listings
    'jobs.badge': 'ACTUEEL AANBOD',
    'jobs.title': 'Actuele Projecten & Opdrachten',
    'jobs.subtitle': 'Bekijk geselecteerde interim-, contract- en vaste functies bij toonaangevende Nederlandse bedrijven.',
    'jobs.all': 'Alle',
    'jobs.viewAll': 'Bekijk alle projecten & opdrachten',
    'jobs.apply': 'Direct Solliciteren',
    'jobs.details': 'Bekijk Details',
    'jobs.location': 'Locatie',
    'jobs.type': 'Type contract',
    'jobs.department': 'Branche',
    'jobs.noJobs': 'Geen vacatures gevonden die voldoen aan uw criteria.',

    // Job Alert Banner
    'jobalert.badge': 'VACATURES & PROJECT NOTIFICATIES',
    'jobalert.title': 'Kunt u het project dat u zoekt niet vinden?',
    'jobalert.desc': 'Maak een Jobalert aan en ontvang automatisch meldingen per e-mail wanneer er geschikte vacatures zijn!',
    'jobalert.btn.create': 'Jobalert aanmaken',
    'jobalert.btn.openApp': 'Open sollicitatie',
    'jobalert.security': 'Uw gegevens worden strikt vertrouwelijk en veilig verwerkt.',

    // Compliance Risk Banner
    'risk.badge': 'COMPLIANCE AUDIT',
    'risk.title': 'Bescherm uw organisatie tegen Wet DBA & Inlenersaansprakelijkheid',
    'risk.desc': 'Zijn uw ZZP- en detacheringsovereenkomsten 100% compliant volgens de richtlijnen van de Belastingdienst? Doe onze snelle compliance-check om risico’s uit te sluiten.',
    'risk.cta': 'Start Compliance Check',

    // Contact Form Section
    'contact.title': 'Neem contact met ons op',
    'contact.subtitle': 'Heeft u vragen over flexibele inhuur, contractbeheer of compliance? Stuur ons een bericht en onze specialisten reageren binnen 24 uur.',
    'contact.name': 'Uw naam',
    'contact.firstName': 'Voornaam',
    'contact.lastName': 'Achternaam',
    'contact.email': 'E-mailadres',
    'contact.phone': 'Telefoonnummer',
    'contact.company': 'Bedrijfsnaam',
    'contact.subject': 'Onderwerp',
    'contact.message': 'Uw bericht / vraag',
    'contact.privacy': 'Ik ga akkoord met de privacyverklaring en voorwaarden.',
    'contact.submit': 'Verstuur bericht',
    'contact.submitting': 'Verzenden...',
    'contact.success': 'Bedankt! Uw bericht is succesvol verzonden.',

    // Footer
    'footer.company': 'Bedrijf',
    'footer.information': 'Informatie',
    'footer.forCandidates': 'Voor kandidaten',
    'footer.services': 'Diensten',
    'footer.searchVacancies': 'Zoek vacatures',
    'footer.createJobalert': 'Jobalert aanmaken',
    'footer.openApplication': 'Open sollicitatie',
    'footer.contracting': 'Detachering & Freelance (ZZP)',
    'footer.expats': 'Expats & Visum Sponsoring (Kennismigrant)',
    'footer.clientsOverview': 'Overzicht Opdrachtgevers',
    'footer.contractAdmin': 'Contractbeheer & Payroll',
    'footer.complianceSurvey': 'Compliance Risico Check',
    'footer.getInTouch': 'Neem contact op',
    'footer.copyright': 'Copyright © 2026 Macee BV | Externe Personeelsoplossingen',

    // Modals
    'modal.openApp.title': 'Open sollicitatie',
    'modal.openApp.cv': 'Upload CV',
    'modal.openApp.drag': 'Sleep bestand hierheen of Bladeren',
    'modal.openApp.submit': 'Verstuur sollicitatie',
    'modal.jobalert.title': 'Jobalert aanmaken',
    'modal.jobalert.branche': 'Branche',
    'modal.jobalert.contract': 'Type contract',
    'modal.jobalert.language': 'Taal',
    'modal.jobalert.keyword': 'Zoek vacatures op trefwoord',
    'modal.jobalert.freq': 'Hoe vaak wilt u vacatures ontvangen?',
    'modal.jobalert.email': 'Wat is uw e-mailadres?',
    'modal.jobalert.daily': 'Dagelijks',
    'modal.jobalert.weekly': 'Wekelijks',
    'modal.jobalert.monthly': 'Maandelijks',
    'modal.jobalert.submit': 'Jobalert aanmaken',
    'modal.jobalert.showMore': 'Toon meer',
    'modal.jobalert.showLess': 'Toon minder',
    'modal.close': 'Sluiten',

    // Projects Page
    'projects.title': 'Projecten & Opdrachten',
    'projects.filter.search': 'Zoek op trefwoord, vaardigheid of referentie...',
    'projects.filter.location': 'Alle Locaties',
    'projects.filter.branche': 'Alle Branches',
    'projects.filter.contract': 'Alle Contractvormen',
    'projects.liveBadge': 'Live OTYS Web API Verbonden',
    'projects.backOverview': 'Terug naar overzicht',
    'projects.applyNow': 'Solliciteer direct op dit project',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'EN',
  setLang: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem('macee_lang') as Language) || 'EN';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('macee_lang', newLang);
  };

  const t = (key: string): string => {
    return TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS['EN']?.[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  return useContext(LanguageContext);
};
