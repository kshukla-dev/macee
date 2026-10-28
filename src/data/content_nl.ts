import { ServiceItem, ResourceItem, DifferencePillar, RiskQuestion, FaqItem, JobListing } from '../types';

export const SERVICES_DATA_NL: ServiceItem[] = [
  {
    id: 'recruitment-staffing',
    title: 'Werving & Selectie',
    shortDesc: 'Gespecialiseerde sourcing voor interim- en vaste expertise, met diepgaande analyse van technische vaardigheden, cultuur en soft skills.',
    fullDesc: 'Bij het zoeken naar specifieke expertise op tijdelijke (of vaste) basis analyseren wij altijd exact wat uw organisatie nodig heeft op het gebied van vakkennis, bedrijfscultuur en soft skills. Als onafhankelijke bemiddelaar bevelen we uitsluitend professionals aan met een bewezen staat van dienst. We beperken ons niet tot ons lokale Nederlandse netwerk—we hebben directe toegang tot een omvangrijk internationaal netwerk.',
    features: [
      'Werving & Selectie voor Vaste Dienstverbanden',
      'Interim- en Tijdelijke Projectbemiddeling',
      'Uitgebreid Nederlands & Internationaal Netwerk',
      'Grondige Technische & Culturele Vetting',
      'Korte Time-to-Hire voor Senior Specialisten'
    ],
    icon: 'Users',
    category: 'Clients'
  },
  {
    id: 'contract-administration',
    title: 'Contractbeheer & Payroll',
    shortDesc: 'Volledige onboarding van kandidaten en compliancebeheer volgens de Nederlandse arbeids-, immigratie- en belastingwetgeving.',
    fullDesc: 'Zodra de juiste kandidaat is geselecteerd, verzorgt MACEE de volledige onboarding en regelen we alle compliance-procedures rond lokale arbeids-, immigratie- en fiscale wetgeving—ongeacht of het een aannemer, ZZP’er of expat (kennismigrant) betreft. Van detachering tot payroll, van projectondersteuning tot juridisch werkgeverschap (EOR): MACEE biedt de best passende oplossing op maat.',
    features: [
      'Turnkey Onboarding & Registratie van Kandidaten',
      'Compliante Overeenkomsten voor ZZP, Detachering & Expats',
      'Geautomatiseerde Salaris- & Factuurverwerking',
      'Juridisch Werkgeverschap (Employer of Record / EOR)',
      'Persoonlijke Begeleiding voor Inlener én Professional'
    ],
    icon: 'Briefcase',
    category: 'Clients'
  },
  {
    id: 'compliancy-support',
    title: 'Compliance & Ondersteuning',
    shortDesc: 'Heldere, transparante en rechtsgeldige overeenkomsten ondersteund door diepgaande kennis van Nederlandse en Europese wetgeving.',
    fullDesc: 'MACEE staat voor duidelijke, transparante en conforme afspraken dankzij onze diepgaande kennis van wet- en regelgeving (WAADI, Wet DBA, WTT/A1, WIK). We zorgen ervoor dat alle relevante wetten nauwgezet worden nageleefd en gemonitord bij de inzet van contractanten, ZZP’ers en expats. Indien nodig treden wij op als mediator bij geschillen, waardoor extern inhuren volledig zorgeloos verloopt.',
    features: [
      'SNA / NEN 4400-1 Geauditeerde Kwaliteitsstandaard',
      'Uitsluiting van Inlenersaansprakelijkheid (Ketenrisico)',
      'Volledige Naleving van Wet DBA & Modelovereenkomsten',
      'Onafhankelijke Bemiddeling & Deskundig Advies',
      'Proactieve Begeleiding bij Veranderende Arbeidswetgeving'
    ],
    icon: 'ShieldCheck',
    category: 'Clients'
  },
  {
    id: 'contracting-secondment',
    title: 'Detachering & Payrolling',
    shortDesc: 'Flexibele projectinzet waarbij professionals op de payroll van MACEE staan met volledige rechtszekerheid.',
    fullDesc: 'Werk aan een tijdelijke opdracht of interim-rol terwijl u in loondienst bent bij MACEE. Door strengere regelgeving rond de inhuur van zzp’ers in Nederland zijn zelfstandige constructies vaak aan banden gelegd. MACEE biedt hiervoor de betrouwbare Detacherings- en Payroll-oplossing met behoud van flexibiliteit én zekerheid.',
    features: [
      'Volledige Zekerheid van Nederlands Dienstverband via MACEE',
      'Geen Risico op Schijnzelfstandigheid voor Opdrachtgever',
      'Deta-Vast Mogelijkheden (Contract-to-Perm)',
      'Tijdige en Betrouwbare Maandelijkse Uitbetaling',
      'Goede Pensioenregeling & Secundaire Arbeidsvoorwaarden'
    ],
    icon: 'UserCheck',
    category: 'Professionals'
  },
  {
    id: 'freelance-zzp',
    title: 'Freelance / ZZP Bemiddeling',
    shortDesc: 'Gerichte projectopdrachten voor zelfstandige ondernemers die hun eigen tarief en werkwijze bepalen.',
    fullDesc: 'Tijdelijke projecten geschikt voor zelfstandige professionals (ZZP), werkzaam voor verschillende opdrachtgevers zonder gezagsverhouding. Als ZZP’er bepaalt u zelf uw uurtarief, werktijden en werkwijze. MACEE verbindt u met toonaangevende enterprise-projecten die aansluiten op uw expertise en garandeert duidelijke modelcontracten en stipte betalingen.',
    features: [
      'Uitdagende Opdrachten bij Toonaangevende Bedrijven',
      'Zelfstandige Werkwijze & Vrije Tariefbepaling',
      'Transparante Afspraken & Snelle Factuurverwerking',
      'Modelovereenkomsten Conform de Wet DBA',
      'Deskundige Begeleiding bij Projectverlengingen & SOW'
    ],
    icon: 'Award',
    category: 'Professionals'
  },
  {
    id: 'hsm-expats',
    title: 'Kennismigranten & Visum Sponsoring',
    shortDesc: 'Officieel IND Erkend Referent voor het overbrengen van hooggekwalificeerde IT-specialisten en hulp bij de 30%-regeling.',
    fullDesc: 'Door de schaarste aan gespecialiseerde IT-kennis in Nederland is talent niet altijd binnen de landsgrenzen of de EU te vinden. MACEE is een officieel "Erkend Referent" bij de Immigratie- en Naturalisatiedienst (IND). Hierdoor kunnen wij specialisten van buiten de EU snel naar Nederland halen onder de kennismigrantenregeling, gezinsvisa verzorgen en assisteren bij de 30%-belastingregeling.',
    features: [
      'Versnelde IND Kennismigranten Visumaanvraag',
      'Verblijfsvergunningen voor Partner en Kinderen',
      'Aanvraagbegeleiding voor de 30%-Belastingregeling',
      'Volledige Relocatiehulp: BSN, Bankrekening & Huisvesting',
      'Internationale Fiscale & Sociale Zekerheid Afstemming'
    ],
    icon: 'FileCheck',
    category: 'Professionals'
  },
  {
    id: 'it-outsourcing',
    title: 'Outsourcing & Projectdiensten',
    shortDesc: 'Resultaatgerichte projectuitvoering waarbij gespecialiseerde teams mijlpalen realiseren onder managed responsibility.',
    fullDesc: 'Het uitbesteden van werkzaamheden op basis van een contract voor opdracht, waarbij een extern team onder eigen leiding werkt en verantwoordelijk is voor het eindresultaat. Ideaal voor afgebakende projecten, specialistische kennis of snelle capaciteitsuitbreiding zonder vaste personeelsverplichtingen.',
    features: [
      'Statement of Work (SOW) & Mijlpaalgerichte Oplevering',
      'Duidelijke SLA’s en Transparante KPI-Rapportages',
      'Gespecialiseerde Ontwikkelteams (Onsite / Remote / Hybrid)',
      'Volledige Risicospreiding & Compliance Borging',
      'Flexibel Schaalbaar naar Uw Projectbehoeften'
    ],
    icon: 'Layers',
    category: 'Clients'
  }
];

export const RESOURCES_DATA_NL: ResourceItem[] = [
  {
    id: 'resource-1',
    title: 'Macee Whitepaper: Wet DBA & Compliance Gids 2026',
    description: 'Een essentieel juridisch en fiscaal overzicht voor Nederlandse werkgevers en opdrachtgevers over het elimineren van inlenersaansprakelijkheid en schijnzelfstandigheid.',
    image: '/images/resource-gavel.jpg',
    type: 'Whitepaper (PDF)',
    pages: '16 Pagina’s',
    topics: ['Wet DBA Richtlijnen', 'Keten- & Inlenersaansprakelijkheid', 'Modelovereenkomsten', 'Belastingdienst Checklist'],
    downloadName: 'Macee_Wet_DBA_Compliance_Gids_2026.pdf'
  },
  {
    id: 'resource-2',
    title: 'SNA NEN 4400-1 Certificeringsnorm: Bedrijfsoverzicht',
    description: 'Waarom certificering volgens NEN 4400-1 van de Stichting Normering Arbeid essentieel is om financiële boetes en fiscale risico’s bij flexibele inhuur te voorkomen.',
    image: '/images/resource-papers.jpg',
    type: 'Audit Dossier',
    pages: '12 Pagina’s',
    topics: ['SNA Kwaliteitsnorm', 'WKA Verklaringen', 'G-Rekening Betalingen', 'Identificatieplicht'],
    downloadName: 'Macee_SNA_NEN_4400_Overzicht.pdf'
  },
  {
    id: 'resource-3',
    title: 'Gids Kennismigranten: IND Sponsoring & 30%-Regeling',
    description: 'Stapsgewijze gids voor HR-managers en internationale professionals over IND-sponsoring, kennismigrantenvisa en het toepassen van het 30%-belastingvoordeel in Nederland.',
    image: '/images/resource-laptop.jpg',
    type: 'Praktijkgids',
    pages: '20 Pagina’s',
    topics: ['IND Erkend Referentschap', '30%-Regeling Voorwaarden', 'Gezinshereniging', 'Relocatie Begeleiding'],
    downloadName: 'Macee_Kennismigranten_Gids_Nederland.pdf'
  }
];

export const PILLARS_DATA_NL: DifferencePillar[] = [
  {
    id: 'experience',
    title: '30+ Jaar Ervaring',
    description: 'Voor vrijwel elke situatie bieden wij een oplossing, ondersteund door meer dan 30 jaar gecombineerde ervaring in detachering, flexibele inhuur en technische IT-werving.',
    iconName: 'UserCheck',
    highlight: '30+ Jaar Bewezen Expertise'
  },
  {
    id: 'network',
    title: 'Wereldwijd Talentnetwerk',
    description: 'We beperken ons niet tot het lokale Nederlandse netwerk. We hebben directe toegang tot een omvangrijk internationaal netwerk van geverifieerde contractanten, zzp’ers en expats.',
    iconName: 'Share2',
    highlight: 'Internationaal Bereik'
  },
  {
    id: 'efficiency',
    title: 'Van Sourcing tot Onboarding',
    description: 'Een transparant en efficiënt proces dat alle complexiteit uit handen neemt. Van de eerste werving tot volledige onboarding wordt alles met uiterste zorg geregeld.',
    iconName: 'Clock',
    highlight: 'Zorgeloze Inhuur'
  },
  {
    id: 'sna-certified',
    title: 'SNA / NEN 4400-1 Gecertificeerd',
    description: 'MACEE is geregistreerd bij de Stichting Normering Arbeid en NEN 4400-1 gecertificeerd, waarmee ketenaansprakelijkheid voor inleners effectief wordt uitgesloten.',
    iconName: 'ShieldCheck',
    highlight: 'Kwaliteit & Compliance'
  },
  {
    id: 'ind-sponsor',
    title: 'IND Erkend Referent',
    description: 'De officiële sponsorstatus bij de Immigratie- en Naturalisatiedienst stelt ons in staat om kennismigranten van buiten de EU snel naar Nederland te halen.',
    iconName: 'HeartHandshake',
    highlight: 'Erkend Referent'
  },
  {
    id: 'tailored-contracts',
    title: 'Maatwerk & Rechtsgeldige Overeenkomsten',
    description: 'Van ZZP-modelovereenkomsten tot payroll en detachering: altijd waterdicht en afgestemd op de veranderende wetgeving in Nederland.',
    iconName: 'Layers',
    highlight: 'Maatwerkoplossingen'
  }
];

export const DIFFERENCE_PILLARS_NL: DifferencePillar[] = PILLARS_DATA_NL;

export const FAQ_DATA_NL: FaqItem[] = [
  {
    id: 'faq-nl-1',
    category: 'Wat doet MACEE',
    question: 'In welke branches is MACEE actief?',
    answer: 'MACEE is actief in diverse sectoren waaronder High Tech, Banken & Verzekeringen, Consultancy, Energie & Utilities, Overheid, Pharma en eCommerce.'
  },
  {
    id: 'faq-nl-2',
    category: 'Wat doet MACEE',
    question: 'Voor welke functies werft MACEE voornamelijk?',
    answer: 'Wij werven voornamelijk voor Software Ontwikkeling (.NET, Java, Python, C#), Data & BI (PowerBI, Spark, AI/ML), Project- & Programmamanagement, Cloud & DevOps (AWS, Azure, Kubernetes), Cyber Security en Financieel Risicomanagement (AML, KYC, Compliance).'
  },
  {
    id: 'faq-nl-3',
    category: 'Diensten en Contracten',
    question: 'Welke contractvormen biedt MACEE aan?',
    answer: 'Wij bieden Detachering, Payrolling, Freelance / ZZP bemiddeling, Werving & Selectie voor vaste posities en Deta-Vast constructies.'
  },
  {
    id: 'faq-nl-4',
    category: 'Diensten en Contracten',
    question: 'Kan MACEE een werkvisum sponsoren?',
    answer: 'Ja, als officieel IND Erkend Referent verzorgen wij de visumsponsoring voor kennismigranten van buiten de EU, inclusief partner- en gezinsaanvragen en ondersteuning bij de 30%-regeling.'
  }
];

export const JOBS_DATA_NL: JobListing[] = [
  {
    id: 'macee-net-dev',
    title: 'Senior .NET / Azure Cloud Ontwikkelaar',
    department: 'ICT / Softwareontwikkeling',
    location: 'Arnhem, Nederland (Hybride)',
    type: 'Detachering / Payroll',
    experience: '5+ Jaar',
    description: 'Versterk een toonaangevende enterprise opdrachtgever in Arnhem bij het ontwerpen van schaalbare cloud microservices, REST API’s en event-driven architecturen op Microsoft Azure en .NET 8.',
    requirements: [
      'Ruime ervaring met C#, .NET Core / .NET 8 en moderne ASP.NET Core architecturen',
      'Gedegen kennis van Microsoft Azure, Docker, Kubernetes en CI/CD automatisering',
      'Sterk begrip van microservices, gedistribueerde systemen en message brokers (Kafka / RabbitMQ)',
      'Vloeiend in het Nederlands of Engels'
    ]
  },
  {
    id: 'macee-data-eng',
    title: 'Lead Data Engineer & BI Specialist',
    department: 'Bankwezen & Fintech',
    location: 'Amsterdam, Nederland (Hybride)',
    type: 'Freelance / ZZP',
    experience: '6+ Jaar',
    description: 'Bouw geautomatiseerde high-throughput datapipelines, ETL workflows en rapportagedashboards voor een toonaangevende Nederlandse financiële instelling.',
    requirements: [
      'Aantoonbare ervaring met Apache Spark, Kafka, Python en SQL data warehousing',
      'Praktijkkennis van PowerBI, MSBI en moderne cloud dataplatformen (Azure Synapse / Snowflake)',
      'Ervaring met financieel risicomodellering, toezichtrapportages of KYC/AML analytics',
      'Ingeschreven als zelfstandige (ZZP) bij de Nederlandse Kamer van Koophandel (KVK)'
    ]
  },
  {
    id: 'macee-sec-arch',
    title: 'Cyber Security & IAM Specialist',
    department: 'Overheid & Publieke Sector',
    location: 'Den Haag, Nederland',
    type: 'Detachering / Payroll',
    experience: '5+ Jaar',
    description: 'Ondersteun cruciale digitale transformaties binnen de Nederlandse overheid door het ontwerpen van robuust Identity & Access Management (IAM), RBAC-beleid en dreigingsverdediging.',
    requirements: [
      'Relevante certificeringen zoals CISM, CISSP of CISO kwalificaties',
      'Diepgaande ervaring met CyberArk, SailPoint, Azure AD en beheer van geprivilegieerde toegang',
      'Grondige kennis van de BIO (Baseline Informatiebeveiliging Overheid) en AVG wetgeving',
      'Bereidheid tot het ondergaan van een veiligheidsonderzoek (VGB screening)'
    ]
  },
  {
    id: 'macee-java-dev',
    title: 'Senior Java / Microservices Specialist',
    department: 'High Tech Industrie',
    location: 'Eindhoven, Nederland',
    type: 'Kennismigranten Visumsponsoring Mogelijk',
    experience: '7+ Jaar',
    description: 'Ontwikkel geavanceerde besturingssoftware en gedistribueerde backend-systemen in de wereldberoemde Brainport Eindhoven high-tech regio.',
    requirements: [
      'Uitstekende beheersing van moderne Java (17/21), Spring Boot en reactieve programmering',
      'Ervaring met high-throughput, low-latency en gedistribueerde systeemarchitectuur',
      'Mogelijkheid tot versnelde kennismigranten visumprocedure via MACEE als IND Erkend Referent',
      'Relocatiebegeleiding en ondersteuning bij de aanvraag van de 30%-belastingregeling'
    ]
  }
];

export const RISK_SURVEY_QUESTIONS_NL: RiskQuestion[] = [
  {
    id: 1,
    category: 'Wet DBA & ZZP Compliance',
    question: 'Hoe controleert uw organisatie of zelfstandige professionals (ZZP) voldoen aan de fiscale criteria ter voorkoming van schijnzelfstandigheid?',
    options: [
      { label: 'Wij maken gebruik van goedgekeurde modelovereenkomsten en detacheringsconstructies voor kwetsbare functies', riskScore: 0, feedback: 'Uitstekend! Het gebruik van getoetste contracten en detachering beschermt u tegen naheffingen van de Belastingdienst.' },
      { label: 'Wij huren ZZP’ers rechtstreeks in zonder systematische juridische of tarieftoetsing', riskScore: 18, feedback: 'Matig risico. Met de handhaving op de Wet DBA/VBAR brengt inhuur zonder formele screening naheffingsrisico’s met zich mee.' },
      { label: 'We weten niet zeker of onze ingehuurde krachten volgens de wet als echte zelfstandigen worden aangemerkt', riskScore: 25, feedback: 'Kritiek risico! De Belastingdienst legt zware boetes en naheffingen op bij schijnzelfstandigheid.' }
    ]
  },
  {
    id: 2,
    category: 'SNA (NEN 4400-1) & Ketenbeheersing',
    question: 'Zijn al uw personele tussenpersonen en detacheerders geregistreerd bij de Stichting Normering Arbeid (SNA) en NEN 4400-1 gecertificeerd?',
    options: [
      { label: 'Ja, al onze leveranciers zijn SNA / NEN 4400-1 gecertificeerd (zoals MACEE)', riskScore: 0, feedback: 'Optimale bescherming! Exclusief samenwerken met SNA-gecertificeerde partijen vrijwaart u van inlenersaansprakelijkheid.' },
      { label: 'Sommige leveranciers zijn gecertificeerd, maar we controleren het register niet systematisch', riskScore: 14, feedback: 'Aandachtspunt. Niet-gecertificeerde leveranciers kunnen uw organisatie blootstellen aan ketenaansprakelijkheid.' },
      { label: 'Wij controleren de SNA-registratie van onze leveranciers niet', riskScore: 25, feedback: 'Hoog risico! Volgens de Wet WAADI en ketenaansprakelijkheid is de inlener aansprakelijk voor niet-afgedragen loonheffingen.' }
    ]
  },
  {
    id: 3,
    category: 'Internationale Inhuur & IND Sponsoring',
    question: 'Beschikt uw personeelspartner over de status van IND Erkend Referent bij de inzet van niet-EU specialisten?',
    options: [
      { label: 'Ja, onze partner is officieel IND Erkend Referent en verzorgt de versnelde kennismigrantenprocedure', riskScore: 0, feedback: 'Volledig compliant. Deze status waarborgt een snelle en juridisch waterdichte tewerkstelling.' },
      { label: 'Wij verzorgen visa intern of werken met ad-hoc oplossingen', riskScore: 12, feedback: 'Operationeel tijdrovend. Interne sponsoring vergt voortdurende controle op strikte IND-voorwaarden.' },
      { label: 'Er werken niet-EU krachten zonder geverifieerde visumsponsoring of geldige tewerkstellingsvergunning', riskScore: 25, feedback: 'Ernstig risico! Overtreding van de Wet arbeid vreemdelingen (Wav) kan leiden tot boetes van meer dan € 8.000 per overtreding.' }
    ]
  },
  {
    id: 4,
    category: 'Contractbeheer & WAADI Inlenersbeloning',
    question: 'Heeft uw organisatie een gestructureerd contractbeheer waarin gelijke beloning (inlenersbeloning) geborgd is?',
    options: [
      { label: 'Ja, contracten worden centraal beheerd met gecontroleerde inlenersbeloning', riskScore: 0, feedback: 'Sterke compliance! Naleving van de inlenersbeloning voorkomt loonvorderingen en geschillen.' },
      { label: 'Inhuur wordt informeel geregeld door individuele afdelingsmanagers', riskScore: 16, feedback: 'Matig risico. Versnipperde inhuur leidt sneller tot ontbrekende documenten en ongelijke beloning.' },
      { label: 'Wij hebben geen centraal inhuurloket of formele tariefbenchmarks', riskScore: 25, feedback: 'Hoog risico! Ongecontroleerde inhuur leidt tot onnodig hoge kosten en compliance-leemtes.' }
    ]
  },
  {
    id: 5,
    category: '30%-Regeling & Fiscale Begeleiding',
    question: 'Worden internationale expats ondersteund met een tijdige en correcte aanvraag voor de 30%-belastingregeling?',
    options: [
      { label: 'Ja, begeleid door fiscale specialisten met tijdige indiening bij de Belastingdienst', riskScore: 0, feedback: 'Volledig compliant. Een tijdige aanvraag waarborgt het maximale fiscale voordeel voor uw expert.' },
      { label: 'De expat moet dit zelfstandig regelen met de Belastingdienst', riskScore: 12, feedback: 'Verhoogd risico. Het missen van deadlines leidt tot definitief verlies van het belastingvoordeel.' },
      { label: 'Wij zijn niet bekend met de specifieke regels rondom grensoverschrijdend werken en de 30%-regeling', riskScore: 25, feedback: 'Hoog risico. Fiscale onjuistheden kunnen leiden tot forse naheffingen bij de loonadministratie.' }
    ]
  }
];

