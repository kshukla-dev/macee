export interface AllFaqItem {
  id: string;
  categoryKey: string;
  categoryTitle: string;
  pageSource: string;
  question: string;
  answer: string;
  tag: string;
}

export interface FaqCategoryDef {
  key: string;
  title: string;
  description: string;
  page: string;
  icon?: string;
  image?: string;
}

export const FAQ_CATEGORIES_EN: FaqCategoryDef[] = [
  {
    key: 'all',
    title: 'All Questions',
    description: 'Browse the complete directory of frequently asked questions across all Macee services.',
    page: 'all',
  },
  {
    key: 'home',
    title: 'Workforce Desk & General',
    description: 'Learn about Macee’s external workforce desk, contract models, and turnkey management.',
    page: 'home',
    image: '/uploads/Dutch-government-3.jpg',
  },
  {
    key: 'about',
    title: 'About Macee & Certifications',
    description: '30+ years of recruitment expertise, Arnhem headquarters, SNA NEN 4400-1 accreditation, and team.',
    page: 'about',
    image: '/uploads/people-working-dsk.jpg',
  },
  {
    key: 'clients',
    title: 'Clients & Hiring Managers',
    description: 'Turnaround SLAs, candidate vetting, quality guarantees, MSP solutions, and fee structures.',
    page: 'clients',
    image: '/uploads/Software-Development-2.jpg',
  },
  {
    key: 'professionals',
    title: 'Professionals & Contractors',
    description: 'Secondment, ZZP brokerage, IND visa sponsorships, 30% tax ruling, and prompt payment cycles.',
    page: 'professionals',
    image: '/uploads/Finance-reporting.jpg',
  },
  {
    key: 'projects',
    title: 'Projects & Vacancies',
    description: 'Applying for assignments, CV formats, recruiter review workflows, and hybrid remote policies.',
    page: 'projects',
    image: '/uploads/PM-2.jpg',
  },
  {
    key: 'compliance',
    title: 'Compliance, Wet DBA & WAADI',
    description: 'Eliminating false self-employment risks, G-account tax protection, and Dutch labor regulations.',
    page: 'compliance',
    image: '/uploads/Dutch-government-3.jpg',
  },
  {
    key: 'contact',
    title: 'Contact & Urgencies',
    description: 'Response times, Arnhem office visits, emergency staffing requests, and confidential consultations.',
    page: 'contact',
    image: '/uploads/people-working-dsk.jpg',
  },
];

export const FAQ_CATEGORIES_NL: FaqCategoryDef[] = [
  {
    key: 'all',
    title: 'Alle Vragen',
    description: 'Bekijk het volledige overzicht van alle veelgestelde vragen over Macee.',
    page: 'all',
  },
  {
    key: 'home',
    title: 'Inhuurdesk & Algemeen',
    description: 'Ontdek hoe Macee’s externe inhuurdesk werkt, contractvormen en flexibele personeelsoplossingen.',
    page: 'home',
    image: '/uploads/Dutch-government-3.jpg',
  },
  {
    key: 'about',
    title: 'Over Macee & Certificeringen',
    description: '30+ jaar recruitmentexpertise, hoofdkantoor Arnhem, SNA NEN 4400-1 accreditatie en ons team.',
    page: 'about',
    image: '/uploads/people-working-dsk.jpg',
  },
  {
    key: 'clients',
    title: 'Voor Opdrachtgevers',
    description: 'Shortlist SLA’s, screening van kandidaten, no-risk vervangingsgarantie en MSP-dienstverlening.',
    page: 'clients',
    image: '/uploads/Software-Development-2.jpg',
  },
  {
    key: 'professionals',
    title: 'Voor Professionals & ZZP’ers',
    description: 'Detachering, ZZP-bemiddeling, IND-kennismigrantenvisa, 30%-regeling en stipte uitbetaling.',
    page: 'professionals',
    image: '/uploads/Finance-reporting.jpg',
  },
  {
    key: 'projects',
    title: 'Vacatures & Solliciteren',
    description: 'Sollicitatieprocedure, gewenste CV-formaten, reactietijden en hybride werkvormen.',
    page: 'projects',
    image: '/uploads/PM-2.jpg',
  },
  {
    key: 'compliance',
    title: 'Compliance, Wet DBA & WAADI',
    description: 'Voorkomen van schijnzelfstandigheid, G-rekening fiscale zekerheid en ketenaansprakelijkheid.',
    page: 'compliance',
    image: '/uploads/Dutch-government-3.jpg',
  },
  {
    key: 'contact',
    title: 'Contact & Spoedaanvragen',
    description: 'Reactietijden, bezoek aan kantoor Arnhem, spoedinterim en vertrouwelijke adviesgesprekken.',
    page: 'contact',
    image: '/uploads/people-working-dsk.jpg',
  },
];

export const ALL_FAQS_EN: AllFaqItem[] = [
  {
    id: "faq-home-1",
    categoryKey: "home",
    categoryTitle: "Workforce Desk & General",
    pageSource: "Home",
    question: "What is an External Workforce Desk and how does Macee manage it? ",
    answer:
      "An External Workforce Desk acts as your central partner for sourcing, contracting, and managing external talent (contractors, secondment professionals, and interim specialists). Macee takes full responsibility for sourcing, contract administration, compliance audits, and payroll, allowing your internal teams to focus on core operations.",
    tag: "Turnkey Workforce Management",
  },
  {
    id: "faq-home-2",
    categoryKey: "home",
    categoryTitle: "Workforce Desk & General",
    pageSource: "Home",
    question: "How does Macee guarantee 100% compliance with Dutch labor regulations?",
    answer:
      "Macee is SNA NEN 4400-1 certified. We strictly adhere to the Dutch WAADI legislation, DBA regulations (mitigating bogus self-employment / schijnzelfstandigheid), and operate a verified G-account for transparent payroll taxes and social security contributions.",
    tag: "SNA NEN 4400-1 Certified",
  },
  {
    id: "faq-home-3",
    categoryKey: "home",
    categoryTitle: "Workforce Desk & General",
    pageSource: "Home",
    question: "What contract models does Macee offer?",
    answer:
      "We provide flexible contracting options tailored to your project scope:\n• Secondment (interim project deployment with full employer liability management)\n• Freelance / ZZP brokerage and contract compliance\n• Employer of Record (EOR / Legal Employment Services with full local & international compliance)\n• Contract-to-Permanent (Deta-Vast) models\n• Permanent recruitment and executive search",
    tag: "Flexible Engagement Models",
  },
  {
    id: "faq-home-4",
    categoryKey: "home",
    categoryTitle: "Workforce Desk & General",
    pageSource: "Home",
    question: "In which sectors does Macee have proven recruitment expertise?",
    answer:
      "MACEE works with clients in various industries, such as Telecoms, FMCG, Oil and Gas, Consultancy, Pharma, Energy/Utilities and many more. MACEE has extensive experience in the finance sector, working with Banks, Investment and Asset Management, Pension funds, Payment Platforms and other Fintech companies.",
    tag: "Specialized Domain Verticals",
  },
  {
    id: "faq-home-5",
    categoryKey: "home",
    categoryTitle: "Workforce Desk & General",
    pageSource: "Home",
    question: "How quickly can Macee deploy qualified professionals to a project?",
    answer:
      "For high-demand roles across IT, Data, Cybersecurity, and Financial Risk, our pre-screened specialist network enables us to introduce verified candidate shortlists within 48 to 72 hours, with rapid contract execution.",
    tag: "Rapid 48-72h Deployment",
  },
  {
    id: "faq-about-1",
    categoryKey: "about",
    categoryTitle: "About Macee & Certifications",
    pageSource: "About",
    question: "What sets Macee apart from traditional recruitment agencies?",
    answer:
      "With over 30 years of combined recruitment and contracting experience, Macee operates with a \"personal desk\" philosophy. We are not a transactional resume shop. We build enduring relationships with senior professionals and enterprise hiring managers, ensuring technical depth, cultural fit, and zero-risk legal frameworks.",
    tag: "30+ Years Industry Experience",
  },
  {
    id: "faq-about-2",
    categoryKey: "about",
    categoryTitle: "About Macee & Certifications",
    pageSource: "About",
    question: "Why is the SNA NEN 4400-1 certification critical for our clients?",
    answer:
      "NEN 4400-1 certification guarantees that Macee correctly files taxes, pays social security premiums, and verifies the legal right to work in the Netherlands. For our clients, this provides complete indemnity against chain liability (ketenaansprakelijkheid) from the Dutch Tax Administration (Belastingdienst).",
    tag: "Chain Liability Protection",
  },
  {
    id: "faq-about-3",
    categoryKey: "about",
    categoryTitle: "About Macee & Certifications",
    pageSource: "About",
    question: "Where is Macee located and what areas do you serve?",
    answer:
      "Macee is headquartered in Arnhem, Netherlands, and operates nationwide across Amsterdam, Utrecht, Rotterdam, Eindhoven, and cross-border European talent corridors, supplying both on-site and hybrid specialists.",
    tag: "Arnhem Headquarters & National Reach",
  },
  {
    id: "faq-about-4",
    categoryKey: "about",
    categoryTitle: "About Macee & Certifications",
    pageSource: "About",
    question: "How does the Macee internal team operate?",
    answer:
      "Our dedicated team combines specialized technical recruiters, legal compliance officers, and candidate care managers. Every client and candidate has a named single point of contact for contracts, onboarding, timesheets, and invoicing.",
    tag: "Dedicated Account Managers",
  },
  {
    id: "faq-clients-1",
    categoryKey: "clients",
    categoryTitle: "Clients & Hiring Managers",
    pageSource: "Clients",
    question: "How fast can Macee deliver verified candidate profiles?",
    answer:
      "For standard high-demand roles (such as Senior Developers, Cloud Architects, or Financial Risk Consultants), we typically present shortlisted, pre-screened candidate profiles within 48 to 72 hours of receiving the briefing.",
    tag: "48 - 72 Hour Turnaround",
  },
  {
    id: "faq-clients-2",
    categoryKey: "clients",
    categoryTitle: "Clients & Hiring Managers",
    pageSource: "Clients",
    question: "What guarantee does Macee provide if an interim professional is not the right fit?",
    answer:
      "We stand behind our talent with a comprehensive replacement guarantee. During the initial probation or transition window, if a consultant does not meet agreed project benchmarks, we replace the professional swiftly at no additional sourcing charge.",
    tag: "Placement & Quality Guarantee",
  },
  {
    id: "faq-clients-3",
    categoryKey: "clients",
    categoryTitle: "Clients & Hiring Managers",
    pageSource: "Clients",
    question: "How does Macee protect hiring clients from Wet DBA / False Self-Employment risks?",
    answer:
      "We conduct formal contract assessments, use Tax Authority-approved model agreements, monitor operational independence, and offer secondment structures as a compliant alternative whenever ZZP qualification poses regulatory exposure.",
    tag: "Wet DBA & Fiscal Risk Elimination",
  },
  {
    id: "faq-clients-4",
    categoryKey: "clients",
    categoryTitle: "Clients & Hiring Managers",
    pageSource: "Clients",
    question: "Can Macee act as a Master Vendor or Managed Service Provider (MSP)?",
    answer:
      "Yes. Macee can consolidate your external contractor desk, streamlining onboarding, rate benchmarking, supplier management, and unified monthly invoicing under a single SLA.",
    tag: "MSP & Vendor Consolidation",
  },
  {
    id: "faq-clients-5",
    categoryKey: "clients",
    categoryTitle: "Clients & Hiring Managers",
    pageSource: "Clients",
    question: "What is your fee structure for interim vs permanent placements?",
    answer:
      "For interim and secondment assignments, we operate on transparent, all-inclusive hourly billing with no hidden markups. For permanent recruitment, our competitive fee is milestone-based and only payable upon successful commencement.",
    tag: "Transparent Milestone Pricing",
  },
  {
    id: "faq-professionals-1",
    categoryKey: "professionals",
    categoryTitle: "Professionals & Contractors",
    pageSource: "Professionals",
    question: "What onboarding and relocation support does Macee offer to professionals?",
    answer:
      "Macee provides end-to-end guidance for specialists joining Dutch projects, including 30% tax ruling application support, Dutch municipal registration (BSN) guidance, and transparent contract onboarding.",
    tag: "Onboarding & Relocation Guidance",
  },
  {
    id: "faq-professionals-2",
    categoryKey: "professionals",
    categoryTitle: "Professionals & Contractors",
    pageSource: "Professionals",
    question: "Does Macee support applications for the 30% Tax Ruling (30%-regeling)?",
    answer:
      "Yes. If you are recruited from abroad and meet Dutch Tax Authority requirements (specific expertise, minimum salary criteria, and distance conditions), our payroll experts prepare and submit your 30% ruling application directly.",
    tag: "30% Tax Ruling Support",
  },
  {
    id: "faq-professionals-3",
    categoryKey: "professionals",
    categoryTitle: "Professionals & Contractors",
    pageSource: "Professionals",
    question: "Can my spouse and dependent children move to the Netherlands with me?",
    answer:
      "Yes. For international professionals relocating for long-term project engagements, Macee assists with family settling-in guidance, schooling information, and practical local logistics in the Netherlands.",
    tag: "Family Relocation Assistance",
  },
  {
    id: "faq-professionals-4",
    categoryKey: "professionals",
    categoryTitle: "Professionals & Contractors",
    pageSource: "Professionals",
    question: "What contract options are available for professionals working through Macee?",
    answer:
      "You can choose the contract model that best fits your situation:\n• Secondment employment contract with steady monthly salary, paid holiday allowance, and pension\n• Employer of Record (EOR / Legal Employment) with complete immigration & payroll compliance\n• Freelance / ZZP broker agreement with swift invoice payment cycles\n• Contract-to-perm (Deta-Vast) opportunities with top enterprise employers",
    tag: "Flexible Contracting Choices",
  },
  {
    id: "faq-professionals-5",
    categoryKey: "professionals",
    categoryTitle: "Professionals & Contractors",
    pageSource: "Professionals",
    question: "How promptly are contractor invoices paid?",
    answer:
      "Macee offers fast, reliable payment cycles. Upon timesheet approval, contractor payments are processed within agreed terms, with optional fast-track invoice discounting available.",
    tag: "Guaranteed On-Time Invoicing",
  },
  {
    id: "faq-projects-1",
    categoryKey: "projects",
    categoryTitle: "Projects & Vacancies",
    pageSource: "Projects",
    question: "What format should my CV and portfolio be in when applying?",
    answer:
      "We recommend submitting your CV in PDF or DOCX format. Make sure to detail your recent project experience, primary tech stack (programming languages, cloud providers, certifications), and your current availability date.",
    tag: "PDF / DOCX Recommended",
  },
  {
    id: "faq-projects-2",
    categoryKey: "projects",
    categoryTitle: "Projects & Vacancies",
    pageSource: "Projects",
    question: "What happens after I apply for an open project on Macee?",
    answer:
      "Your application is immediately routed to our OTYS recruitment system. A specialized recruitment consultant in your domain will review your profile and contact you within 24 to 48 hours for an exploratory conversation and project briefing.",
    tag: "24 - 48 Hour Recruiter Review",
  },
  {
    id: "faq-projects-3",
    categoryKey: "projects",
    categoryTitle: "Projects & Vacancies",
    pageSource: "Projects",
    question: "Are remote or hybrid work arrangements available for open assignments?",
    answer:
      "The majority of our technology and finance projects offer hybrid working (e.g., 2–3 days remote, 1–2 days on-site at client premises in Amsterdam, Utrecht, Rotterdam, or Eindhoven). Specific remote policies are clearly stated in each project description.",
    tag: "Flexible Hybrid Options",
  },
  {
    id: "faq-projects-4",
    categoryKey: "projects",
    categoryTitle: "Projects & Vacancies",
    pageSource: "Projects",
    question: "What should I do if there is no open project currently matching my skill set?",
    answer:
      "You can submit an Open Application or activate a custom Job Alert on our platform. Whenever a matching assignment is registered by our clients, our system will notify you instantly before public advertisement.",
    tag: "Job Alerts & Open Registration",
  },
  {
    id: "faq-projects-5",
    categoryKey: "projects",
    categoryTitle: "Projects & Vacancies",
    pageSource: "Projects",
    question: "Are all projects published on this website real and currently active?",
    answer:
      "Yes. Our job board synchronizes in real time with our live OTYS recruitment desk. Filled or expired roles are unlisted automatically, so every position you view is actively recruiting.",
    tag: "Live OTYS Desk Synchronization",
  },
  {
    id: "faq-compliance-1",
    categoryKey: "compliance",
    categoryTitle: "Compliance, Wet DBA & WAADI",
    pageSource: "Compliance & Legal",
    question: "What is the Wet DBA and how does Macee protect clients from enforcement penalties?",
    answer:
      "The Wet DBA (Deregulering Beoordeling Arbeidsrelaties) enforces strict boundaries between true self-employment (ZZP) and disguised employment (schijnzelfstandigheid). Macee uses officially verified model agreements, monitors relationship parameters, and provides secondment alternatives to shield clients from retroactive wage taxes and fines.",
    tag: "Zero DBA Exposure",
  },
  {
    id: "faq-compliance-2",
    categoryKey: "compliance",
    categoryTitle: "Compliance, Wet DBA & WAADI",
    pageSource: "Compliance & Legal",
    question: "What is a G-account (G-rekening) and how does it protect hiring companies?",
    answer:
      "A G-account is a restricted bank account used solely to pay payroll taxes and VAT to the Dutch Tax Administration. When clients pay the tax portion into Macee’s verified G-account, they are legally indemnified against chain liability under Dutch law.",
    tag: "G-Account Tax Guarantee",
  },
  {
    id: "faq-compliance-3",
    categoryKey: "compliance",
    categoryTitle: "Compliance, Wet DBA & WAADI",
    pageSource: "Compliance & Legal",
    question: "What is the WAADI legislation and is Macee registered?",
    answer:
      "The WAADI (Wet allocatie arbeidskrachten door intermediairs) requires all intermediaries providing personnel in the Netherlands to be formally registered with the Dutch Chamber of Commerce (KvK). Macee is 100% WAADI compliant and registered.",
    tag: "WAADI Registered Intermediary",
  },
  {
    id: "faq-contact-1",
    categoryKey: "contact",
    categoryTitle: "Contact & Urgencies",
    pageSource: "Contact",
    question: "How quickly does Macee respond to website inquiries?",
    answer:
      "Our team responds to all form submissions and inquiries within 24 business hours. If your requirement is urgent, you can also call our Arnhem office directly at +31 (0) 26 785 1010.",
    tag: "Response Within 24 Business Hours",
  },
  {
    id: "faq-contact-2",
    categoryKey: "contact",
    categoryTitle: "Contact & Urgencies",
    pageSource: "Contact",
    question: "Can I visit Macee’s Arnhem office for an in-person consultation?",
    answer:
      "Yes, we welcome in-person meetings at our Arnhem office (Willemsplein 44, 6811 KD Arnhem). Please schedule an appointment in advance so we can ensure the relevant specialist or account director is available to meet you.",
    tag: "Willemsplein 44, Arnhem",
  },
  {
    id: "faq-contact-3",
    categoryKey: "contact",
    categoryTitle: "Contact & Urgencies",
    pageSource: "Contact",
    question: "How can an employer request an emergency / urgent interim replacement?",
    answer:
      "For critical staffing emergencies (e.g., unexpected departures or urgent regulatory deadlines), indicate \"Urgent\" in your contact message or call our direct phone line. We can mobilize available bench consultants within 24 to 48 hours.",
    tag: "Emergency Staffing Desk",
  },
  {
    id: "faq-contact-4",
    categoryKey: "contact",
    categoryTitle: "Contact & Urgencies",
    pageSource: "Contact",
    question: "Are phone consultations free of charge and confidential?",
    answer:
      "Yes. All initial consultations, hiring requirement assessments, and candidate career discussions are 100% complimentary and strictly confidential under Dutch privacy and GDPR guidelines.",
    tag: "Free & Confidential Assessment",
  }
];

export const ALL_FAQS_NL: AllFaqItem[] = [
  {
    id: "faq-home-1",
    categoryKey: "home",
    categoryTitle: "Workforce Desk & General",
    pageSource: "Home",
    question: "Wat is een Externe Inhuurdesk en hoe beheert Macee dit?",
    answer:
      "Een Externe Inhuurdesk fungeert als uw centrale partner voor werving, contractering en beheer van extern talent (interim professionals, gedetacheerden en ZZP’ers). Macee neemt de volledige verantwoordelijkheid voor werving, contractadministratie, compliance-audits en salarisadministratie.",
    tag: "Turnkey Workforce Management",
  },
  {
    id: "faq-home-2",
    categoryKey: "home",
    categoryTitle: "Workforce Desk & General",
    pageSource: "Home",
    question: "Hoe garandeert Macee 100% naleving van Nederlandse arbeidswetgeving?",
    answer:
      "Macee is SNA NEN 4400-1 gecertificeerd. We hanteren strikt de WAADI-wetgeving, Wet DBA-regelgeving (ter voorkoming van schijnzelfstandigheid) en beschikken over een geverifieerde G-rekening voor loonheffingen en sociale premies.",
    tag: "SNA NEN 4400-1 Certified",
  },
  {
    id: "faq-home-3",
    categoryKey: "home",
    categoryTitle: "Workforce Desk & General",
    pageSource: "Home",
    question: "Welke contractvormen biedt Macee aan?",
    answer:
      "Wij bieden flexibele contractmodellen aan:\n• Detachering (interim projectinzet met volledig werkgeversrisicobeheer)\n• ZZP-bemiddeling en contractcompliance\n• Employer of Record (juridisch werkgeverschap met volledige naleving)\n• Deta-Vast trajecten\n• Werving & Selectie voor vaste posities",
    tag: "Flexible Engagement Models",
  },
  {
    id: "faq-home-4",
    categoryKey: "home",
    categoryTitle: "Workforce Desk & General",
    pageSource: "Home",
    question: "In welke sectoren heeft Macee bewezen recruitmentexpertise?",
    answer:
      "Macee werkt voor opdrachtgevers in Telecom, FMCG, Olie & Gas, Consultancy, Pharma, Energie en Overheid, met bijzondere expertise in Banking, Financiële Instellingen, Risicomanagement en Fintech.",
    tag: "Specialized Domain Verticals",
  },
  {
    id: "faq-home-5",
    categoryKey: "home",
    categoryTitle: "Workforce Desk & General",
    pageSource: "Home",
    question: "Hoe snel kan Macee gekwalificeerde professionals inzetten?",
    answer:
      "Voor veelgevraagde rollen in IT, Data, Cybersecurity en Financial Risk presenteren wij dankzij ons voorgeselecteerde netwerk binnen 48 tot 72 uur geverifieerde kandidaten.",
    tag: "Rapid 48-72h Deployment",
  },
  {
    id: "faq-about-1",
    categoryKey: "about",
    categoryTitle: "About Macee & Certifications",
    pageSource: "About",
    question: "Wat onderscheidt Macee van traditionele wervingsbureaus?",
    answer:
      "Met meer dan 30 jaar gecombineerde ervaring werken wij volgens een persoonlijke \"desk\"-filosofie. Wij zijn geen cv-schuivers, maar bouwen langdurige relaties op basis van technische diepgang en nul juridisch risico.",
    tag: "30+ Years Industry Experience",
  },
  {
    id: "faq-about-2",
    categoryKey: "about",
    categoryTitle: "About Macee & Certifications",
    pageSource: "About",
    question: "Waarom is de SNA NEN 4400-1 certificering essentieel voor opdrachtgevers?",
    answer:
      "NEN 4400-1 garandeert dat Macee loonheffingen en sociale premies correct afdraagt en de identiteit en het recht op arbeid van kandidaten controleert. Dit vrijwaart opdrachtgevers van ketenaansprakelijkheid.",
    tag: "Chain Liability Protection",
  },
  {
    id: "faq-about-3",
    categoryKey: "about",
    categoryTitle: "About Macee & Certifications",
    pageSource: "About",
    question: "Waar is Macee gevestigd en in welke regio’s zijn jullie actief?",
    answer:
      "Macee is gevestigd in Arnhem en opereert landelijk in onder meer Amsterdam, Utrecht, Rotterdam, Eindhoven en internationale Europese talentcorridors.",
    tag: "Arnhem Headquarters & National Reach",
  },
  {
    id: "faq-about-4",
    categoryKey: "about",
    categoryTitle: "About Macee & Certifications",
    pageSource: "About",
    question: "Hoe werkt het interne team van Macee?",
    answer:
      "Ons team combineert gespecialiseerde technische recruiters, compliance officers en candidate care managers. Zowel opdrachtgevers als professionals hebben één vast aanspreekpunt.",
    tag: "Dedicated Account Managers",
  },
  {
    id: "faq-clients-1",
    categoryKey: "clients",
    categoryTitle: "Clients & Hiring Managers",
    pageSource: "Clients",
    question: "Hoe snel levert Macee geverifieerde kandidaatprofielen?",
    answer:
      "Voor gangbare specialistische rollen presenteren wij binnen 48 tot 72 uur na briefing een gerichte shortlist van voorgescreende kandidaten.",
    tag: "48 - 72 Hour Turnaround",
  },
  {
    id: "faq-clients-2",
    categoryKey: "clients",
    categoryTitle: "Clients & Hiring Managers",
    pageSource: "Clients",
    question: "Welke garantie biedt Macee als een interim professional niet past?",
    answer:
      "Mocht een kandidaat tijdens de proefperiode niet aan de gestelde projectverwachtingen voldoen, dan zorgen wij kosteloos voor een snelle, passende vervanging.",
    tag: "Placement & Quality Guarantee",
  },
  {
    id: "faq-clients-3",
    categoryKey: "clients",
    categoryTitle: "Clients & Hiring Managers",
    pageSource: "Clients",
    question: "Hoe beschermt Macee opdrachtgevers tegen Wet DBA / schijnzelfstandigheid?",
    answer:
      "We hanteren door de Belastingdienst goedgekeurde modelovereenkomsten, monitoren de zelfstandigheid en bieden detachering als risicoloos alternatief.",
    tag: "Wet DBA & Fiscal Risk Elimination",
  },
  {
    id: "faq-clients-4",
    categoryKey: "clients",
    categoryTitle: "Clients & Hiring Managers",
    pageSource: "Clients",
    question: "Kan Macee optreden als Master Vendor of MSP?",
    answer:
      "Ja, Macee kan uw complete externe inhuur centraliseren: van leveranciersbeheer en tariefbenchmarks tot gestroomlijnde facturatie onder één SLA.",
    tag: "MSP & Vendor Consolidation",
  },
  {
    id: "faq-clients-5",
    categoryKey: "clients",
    categoryTitle: "Clients & Hiring Managers",
    pageSource: "Clients",
    question: "Wat is de tariefstructuur voor interim vs vaste plaatsingen?",
    answer:
      "Voor interim- en detacheringsopdrachten hanteren we een transparant all-in uurtarief zonder verborgen kosten. Voor werving & selectie geldt een resultaatafhankelijke fee.",
    tag: "Transparent Milestone Pricing",
  },
  {
    id: "faq-professionals-1",
    categoryKey: "professionals",
    categoryTitle: "Professionals & Contractors",
    pageSource: "Professionals",
    question: "Welke begeleiding biedt Macee aan specialisten en expats?",
    answer:
      "Macee begeleidt professionals met contractonboarding, aanvraag van de 30%-regeling en praktische vestiging in Nederland.",
    tag: "Onboarding & Relocation Guidance",
  },
  {
    id: "faq-professionals-2",
    categoryKey: "professionals",
    categoryTitle: "Professionals & Contractors",
    pageSource: "Professionals",
    question: "Ondersteunt Macee de aanvraag voor de 30%-regeling?",
    answer:
      "Ja, voor specialisten die vanuit het buitenland worden aangeworven en aan de voorwaarden voldoen, verzorgen onze salarisexperts de complete aanvraag bij de Belastingdienst.",
    tag: "30% Tax Ruling Support",
  },
  {
    id: "faq-professionals-3",
    categoryKey: "professionals",
    categoryTitle: "Professionals & Contractors",
    pageSource: "Professionals",
    question: "Kan mijn gezin meekomen naar Nederland?",
    answer:
      "Ja, voor internationale professionals ondersteunen wij bij praktische vestiging, registratie en informatie over wonen en onderwijs in Nederland.",
    tag: "Family Relocation Assistance",
  },
  {
    id: "faq-professionals-4",
    categoryKey: "professionals",
    categoryTitle: "Professionals & Contractors",
    pageSource: "Professionals",
    question: "Welke contractopties zijn beschikbaar voor professionals?",
    answer:
      "U kunt kiezen uit detachering (vast maandsalaris, vakantiegeld en pensioen), ZZP-bemiddeling met snelle betaling, of een Deta-Vast constructie bij toonaangevende opdrachtgevers.",
    tag: "Flexible Contracting Choices",
  },
  {
    id: "faq-professionals-5",
    categoryKey: "professionals",
    categoryTitle: "Professionals & Contractors",
    pageSource: "Professionals",
    question: "Hoe snel worden declaraties en facturen uitbetaald?",
    answer:
      "Na goedkeuring van de urenregistratie worden betalingen volgens de overeengekomen termijn vlot en correct afgehandeld, met opties voor versnelde betaling.",
    tag: "Guaranteed On-Time Invoicing",
  },
  {
    id: "faq-projects-1",
    categoryKey: "projects",
    categoryTitle: "Projects & Vacancies",
    pageSource: "Projects",
    question: "In welk formaat kan ik mijn CV het beste indienen?",
    answer:
      "Wij adviseren een actueel CV in PDF- of DOCX-formaat met vermelding van recente projecten, primaire techstack, opleidingen en uw actuele beschikbaarheid.",
    tag: "PDF / DOCX Recommended",
  },
  {
    id: "faq-projects-2",
    categoryKey: "projects",
    categoryTitle: "Projects & Vacancies",
    pageSource: "Projects",
    question: "Wat gebeurt er na mijn sollicitatie op een openstaande opdracht?",
    answer:
      "Uw sollicitatie komt direct binnen in ons OTYS-wervingssysteem. Een gespecialiseerde consultant beoordeelt uw profiel en neemt binnen 24 tot 48 uur contact met u op.",
    tag: "24 - 48 Hour Recruiter Review",
  },
  {
    id: "faq-projects-3",
    categoryKey: "projects",
    categoryTitle: "Projects & Vacancies",
    pageSource: "Projects",
    question: "Zijn hybride of remote opdrachten mogelijk?",
    answer:
      "Het merendeel van onze opdrachten biedt een hybride werkvorm (bijv. 2-3 dagen thuis en 1-2 dagen op locatie in Amsterdam, Utrecht, Rotterdam of Eindhoven).",
    tag: "Flexible Hybrid Options",
  },
  {
    id: "faq-projects-4",
    categoryKey: "projects",
    categoryTitle: "Projects & Vacancies",
    pageSource: "Projects",
    question: "Wat kan ik doen als er nu geen passende opdracht tussen staat?",
    answer:
      "U kunt een Open Sollicitatie versturen of een Job Alert instellen. Zodra een nieuwe rol binnenkomt die aansluit bij uw wensen, ontvangt u direct bericht.",
    tag: "Job Alerts & Open Registration",
  },
  {
    id: "faq-projects-5",
    categoryKey: "projects",
    categoryTitle: "Projects & Vacancies",
    pageSource: "Projects",
    question: "Zijn alle op de website getoonde vacatures actueel?",
    answer:
      "Ja, onze vacatures synchroniseren realtime met ons actieve OTYS-wervingssysteem. Ingevulde of gesloten posities verdwijnen direct automatisch.",
    tag: "Live OTYS Desk Synchronization",
  },
  {
    id: "faq-compliance-1",
    categoryKey: "compliance",
    categoryTitle: "Compliance, Wet DBA & WAADI",
    pageSource: "Compliance & Legal",
    question: "Wat houdt de Wet DBA in en hoe beschermt Macee opdrachtgevers?",
    answer:
      "De Wet DBA bewaakt de grens tussen echt ondernemerschap en schijnzelfstandigheid. Macee gebruikt getoetste modelcontracten en biedt detachering om naheffingen en boetes uit te sluiten.",
    tag: "Zero DBA Exposure",
  },
  {
    id: "faq-compliance-2",
    categoryKey: "compliance",
    categoryTitle: "Compliance, Wet DBA & WAADI",
    pageSource: "Compliance & Legal",
    question: "Wat is een G-rekening en welke zekerheid biedt dit?",
    answer:
      "Een G-rekening is een geblokkeerde bankrekening waarmee uitsluitend loonheffingen aan de Belastingdienst worden betaald. Hierdoor zijn opdrachtgevers gevrijwaard van ketenaansprakelijkheid.",
    tag: "G-Account Tax Guarantee",
  },
  {
    id: "faq-compliance-3",
    categoryKey: "compliance",
    categoryTitle: "Compliance, Wet DBA & WAADI",
    pageSource: "Compliance & Legal",
    question: "Wat is de WAADI en is Macee geregistreerd?",
    answer:
      "De WAADI verplicht uitleners van arbeidskrachten geregistreerd te zijn in het Handelsregister. Macee voldoet aan alle WAADI-voorwaarden en beschikt over de vereiste registratie.",
    tag: "WAADI Registered Intermediary",
  },
  {
    id: "faq-contact-1",
    categoryKey: "contact",
    categoryTitle: "Contact & Urgencies",
    pageSource: "Contact",
    question: "Hoe snel reageert Macee op contactaanvragen?",
    answer:
      "Ons team reageert binnen 24 werkuren op elk formulier of bericht. Voor spoed kunt u ons kantoor in Arnhem direct bellen op +31 (0) 26 785 1010.",
    tag: "Response Within 24 Business Hours",
  },
  {
    id: "faq-contact-2",
    categoryKey: "contact",
    categoryTitle: "Contact & Urgencies",
    pageSource: "Contact",
    question: "Kan ik langskomen op kantoor in Arnhem voor een kennismaking?",
    answer:
      "Jazeker, wij ontvangen u graag op afspraak op Willemsplein 44 te Arnhem om uw inhuur- of carrièredoelen persoonlijk door te nemen.",
    tag: "Willemsplein 44, Arnhem",
  },
  {
    id: "faq-contact-3",
    categoryKey: "contact",
    categoryTitle: "Contact & Urgencies",
    pageSource: "Contact",
    question: "Hoe vraagt een werkgever een spoedinterim kandidaat aan?",
    answer:
      "Vermeld \"Spoed\" in uw aanvraag of bel onze directe lijn. Wij kunnen binnen 24 tot 48 uur beschikbare specialisten uit ons netwerk voordragen.",
    tag: "Emergency Staffing Desk",
  },
  {
    id: "faq-contact-4",
    categoryKey: "contact",
    categoryTitle: "Contact & Urgencies",
    pageSource: "Contact",
    question: "Zijn telefonische adviesgesprekken kosteloos en vertrouwelijk?",
    answer:
      "Ja, al onze oriënterende gesprekken en inhuurscans zijn 100% kosteloos en strikt vertrouwelijk conform AVG en privacyrichtlijnen.",
    tag: "Free & Confidential Assessment",
  }
];

export function getFullFaqList(lang: 'EN' | 'NL' = 'EN') {
  return lang === 'NL' ? ALL_FAQS_NL : ALL_FAQS_EN;
}

export function getFaqCategories(lang: 'EN' | 'NL' = 'EN') {
  return lang === 'NL' ? FAQ_CATEGORIES_NL : FAQ_CATEGORIES_EN;
}
