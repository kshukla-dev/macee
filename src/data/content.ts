import { ServiceItem, ResourceItem, DifferencePillar, JobListing, RiskQuestion, FaqItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'recruitment-staffing',
    title: 'Recruitment & Staffing',
    shortDesc: 'Specialised sourcing for interim and permanent expertise, analyzing technical skills, cultural aspects, and soft skills.',
    fullDesc: 'When looking for specific expertise temporary (or permanent), we always analyze exactly what you need regarding expertise, cultural aspects, and soft skills. As an independent broker, we only recommend candidates with proven track records. We are not limited to our local Dutch network—we have direct access to an extensive international network.',
    features: [
      'Permanent Search & Selection',
      'Interim & Temporary Project Staffing',
      'Extensive Dutch & International Sourcing',
      'In-Depth Technical & Cultural Vetting',
      'Fast Time-to-Match for Senior Profiles'
    ],
    icon: 'Users',
    category: 'Clients'
  },
  {
    id: 'contract-administration',
    title: 'Contract Administration',
    shortDesc: 'Complete candidate onboarding and compliance management under Dutch labour, immigration, and fiscal legislation.',
    fullDesc: 'When the right candidate is selected, MACEE manages candidate onboarding and handles all compliancy procedures relating to local labour, immigration, and fiscal legislation—whether for a Contractor, Freelancer (ZZP), or Expat (HSM). From secondment to payroll, project support to legal employment services (EOR), MACEE provides the best tailor-made solution.',
    features: [
      'Turnkey Candidate Onboarding & Registration',
      'Compliant Contracts for ZZP, Secondment & Expats',
      'Automated Payroll & Invoicing Processing',
      'Legal Employment Services (Employer of Record / EOR)',
      'Direct Support for Both Hirer and Professional'
    ],
    icon: 'Briefcase',
    category: 'Clients'
  },
  {
    id: 'compliancy-support',
    title: 'Compliancy & Support',
    shortDesc: 'Clear, transparent, and compliant agreements backed by expert knowledge of Dutch and European regulations.',
    fullDesc: 'MACEE stands for clear, transparent, and compliant agreements made possible by our expert knowledge of local legislation. We know all relevant labour, immigration, and fiscal laws inside out, providing specific expertise for Contractors, Freelancers (ZZP), and Expats (HSM). If necessary, we act as your intermediary in disputes, making external hiring completely stress-free.',
    features: [
      'SNA / NEN 4400-1 Audited Standards',
      'Elimination of Chain Liability (Inlenersaansprakelijkheid)',
      'Wet DBA & Model Agreements Compliance',
      'Dispute Mediation & Objective Representation',
      'Proactive Guidance on Changing Dutch Employment Laws'
    ],
    icon: 'ShieldCheck',
    category: 'Clients'
  },
  {
    id: 'contracting-secondment',
    title: 'Contracting & Secondment',
    shortDesc: 'Flexible project placement where professionals are employed on the payroll of MACEE with full legal protection.',
    fullDesc: 'Work on a temporary position, project, or interim role while employed on the payroll of MACEE. Due to increasing legal restrictions in hiring external talent in the Netherlands, interim roles considered suitable for a Freelancer (ZZP) are restricted—leading to an increased need for the reliable Payroll and Secondment solution that MACEE provides.',
    features: [
      'Full Security of Dutch Employment on MACEE Payroll',
      'Mitigation of False Self-Employment (Schijnzelfstandigheid)',
      'Contract-to-Perm (Deta-Vast) Arrangements',
      'Prompt, Reliable Monthly Remuneration',
      'Comprehensive Pension & Secondary Benefit Options'
    ],
    icon: 'UserCheck',
    category: 'Professionals'
  },
  {
    id: 'freelance-zzp',
    title: 'Freelance / ZZP Mediation',
    shortDesc: 'Specific project positions for self-employed professionals determining their own rate and schedule.',
    fullDesc: 'Temporary projects suitable for self-employed Freelancers (ZZP), working with different clients without any form of employment. As a Freelancer (ZZP), you determine your own rate, working hours, and working method. MACEE connects you to enterprise projects matching your unique expertise and ensures clear agreements and on-time payments.',
    features: [
      'High-Impact Enterprise Client Assignments',
      'Autonomous Working Method & Rate Determination',
      'Transparent Terms & Prompt Invoicing',
      'Independent Contractor Agreement Verification',
      'Project Extension & SOW Management'
    ],
    icon: 'Award',
    category: 'Professionals'
  },
  {
    id: 'hsm-expats',
    title: 'HSM / Expats / Visa Sponsorship',
    shortDesc: 'Official IND Recognised Sponsor relocating Highly Skilled Migrants and assisting with the 30% tax benefit.',
    fullDesc: 'Due to the scarcity of specialized skills in the Netherlands, finding talent solely in Dutch or EU markets is not always possible. MACEE is a "Recognised Sponsor" (Erkend referent) with the Dutch Immigration Service (IND), enabling us to hire non-EU specialists under the fast-track Highly-Skilled Migrant scheme, arrange family visas, and assist with the 30% tax ruling.',
    features: [
      'Fast-Track IND Highly Skilled Migrant Visa Processing',
      'Partner & Children Residence Permit Applications',
      'Application Support for the 30% Tax Benefit Ruling',
      'Relocation Guidance: BSN, Dutch Bank Account & Housing',
      'Cross-Border Tax & Social Security Alignment'
    ],
    icon: 'FileCheck',
    category: 'Professionals'
  },
  {
    id: 'it-outsourcing',
    title: 'Outsourcing & Project Services',
    shortDesc: 'Outcome-based project delivery where specialized external teams execute milestones under managed responsibility.',
    fullDesc: 'Outsourcing work to an external party on a temporary contract basis, whereby the external party performs work under its own management and is responsible for the result, instead of taking on permanent employees. Used for temporary projects, specialist knowledge, or responding flexibly to operational needs without permanent obligations.',
    features: [
      'Statement of Work (SOW) Milestone Engagements',
      'Specialist Project Squads in ICT & Finance',
      'Deliverable-Based Accountability & SLAs',
      'Flexible Scaling Without Permanent Headcount',
      'Full Quality & Compliance Governance'
    ],
    icon: 'Cpu',
    category: 'Clients'
  }
];

export const RESOURCES_DATA: ResourceItem[] = [
  {
    id: 'external-workforce-guide',
    title: 'External Workforce & Contractor Hiring Guide',
    description: 'A comprehensive guide on managing external talent in the Netherlands—from sourcing to onboarding, secondment models, and mitigating ZZP classification risks.',
    image: '/images/macee-team.jpg',
    type: 'Client & Hiring Guide',
    pages: '16 Pages · PDF',
    topics: [
      'Sourcing-to-onboarding workflow for flexible staff',
      'Understanding Secondment, Freelance (ZZP), and Payroll models',
      'Navigating Dutch Wet DBA and VBAR regulations',
      'Mitigating chain liability (inlenersaansprakelijkheid)',
      'Why external workforce desks partner with specialized brokers'
    ],
    downloadName: 'Macee_External_Workforce_Hiring_Guide.pdf'
  },
  {
    id: 'sna-compliance-overview',
    title: 'SNA NEN 4400-1 & IND Sponsor Compliance Overview',
    description: 'Learn how MACEE’s NEN 4400-1 registration and IND Recognised Sponsor status protect hirers from liability and expedite international recruitment.',
    image: '/images/resource-gavel.jpg',
    type: 'Official Certification Whitepaper',
    pages: '10 Pages · PDF',
    topics: [
      'What Stichting Normering Arbeid (SNA) registration means for hirers',
      'NEN 4400-1 audit requirements for tax and wage compliance',
      'How hirers eliminate financial and tax liability risks',
      'IND Recognised Sponsor fast-track process for non-EU specialists',
      'WAADI compliance and legal workforce intermediation standards'
    ],
    downloadName: 'Macee_SNA_NEN4400_IND_Compliance_Overview.pdf'
  },
  {
    id: 'expat-tax-blueprint',
    title: 'Netherlands Expat & 30% Tax Ruling Blueprint',
    description: 'A step-by-step roadmap for hiring and relocating international specialists to the Netherlands, navigating IND visas, and applying for the 30% tax facility.',
    image: '/images/macee-finance.jpg',
    type: 'Expat & Fiscal Roadmap',
    pages: '14 Pages · PDF',
    topics: [
      'Eligibility criteria for the Dutch 30% ruling tax facility',
      'Highly Skilled Migrant (Kennismigrant) salary thresholds',
      'Step-by-step IND visa and residence permit timeline',
      'Family visa sponsorship for partners and children',
      'Onboarding, BSN registration, healthcare, and banking essentials'
    ],
    downloadName: 'Macee_Netherlands_Expat_30_Tax_Ruling_Guide.pdf'
  }
];

export const PILLARS_DATA: DifferencePillar[] = [
  {
    id: 'experience',
    title: '30+ Years Experience',
    description: 'We have a solution for almost every situation, backed by more than 30 years of combined experience in contracting, flexible staffing, and technical (IT) recruitment.',
    iconName: 'UserCheck',
    highlight: '30+ Years Track Record'
  },
  {
    id: 'network',
    title: 'Global Talent Network',
    description: 'We are not limited in our search within our local Dutch network. We have direct access to a broad international network of vetted contractors, freelancers, and expats.',
    iconName: 'Share2',
    highlight: 'Global Sourcing Reach'
  },
  {
    id: 'efficiency',
    title: 'Streamlined From Sourcing to Onboarding',
    description: 'We provide a transparent, efficient process that takes the complexity off your hands. From sourcing to onboarding, everything is handled with clarity and care.',
    iconName: 'Clock',
    highlight: 'Zero Hassle Hiring'
  },
  {
    id: 'sna-certified',
    title: 'SNA / NEN 4400-1 Certified',
    description: 'MACEE is registered with Stichting Normering Arbeid and holds NEN 4400-1 certification, strictly limiting chain liability risks for hirers and commissioning clients.',
    iconName: 'ShieldCheck',
    highlight: 'Quality & Compliancy'
  },
  {
    id: 'ind-sponsor',
    title: 'IND Recognised Sponsor',
    description: 'Official sponsor status with the Dutch Immigration Service allows us to relocate non-EU specialist candidates under the fast-track Highly-Skilled Migrant visa scheme.',
    iconName: 'HeartHandshake',
    highlight: 'Erkend Referent'
  },
  {
    id: 'tailored-contracts',
    title: 'Tailored & Compliant Contracts',
    description: 'From secondment to payroll, freelance agreements to legal Employer of Record (EOR), we tailor every solution to the exact operational needs of your organisation.',
    iconName: 'Layers',
    highlight: 'Flexible Contract Options'
  }
];

export const JOBS_DATA: JobListing[] = [
  {
    id: 'macee-net-dev',
    title: 'Senior .NET / Azure Cloud Developer',
    department: 'ICT / Software Development',
    location: 'Arnhem, Netherlands (Hybrid)',
    type: 'Contracting / Secondment',
    experience: '5+ Years',
    description: 'Join an enterprise client in Arnhem designing resilient cloud microservices, REST APIs, and event-driven backend architectures on Microsoft Azure and .NET 8.',
    requirements: [
      'Extensive experience with C#, .NET Core / .NET 8, and modern ASP.NET Core',
      'Solid background in Microsoft Azure, Docker, Kubernetes, and CI/CD automation',
      'Strong grasp of microservices, distributed architectures, and event queues (Kafka / RabbitMQ)',
      'Fluent in English; Dutch proficiency is a distinct advantage'
    ]
  },
  {
    id: 'macee-data-eng',
    title: 'Lead Data Engineer & BI Specialist',
    department: 'Banking & Fintech',
    location: 'Amsterdam, Netherlands (Hybrid)',
    type: 'Freelance / ZZP',
    experience: '6+ Years',
    description: 'Build automated high-throughput data pipelines, ETL workflows, and regulatory BI dashboards for a leading Dutch financial institution.',
    requirements: [
      'Proven track record with Apache Spark, Kafka, Python, and SQL data warehousing',
      'Hands-on expertise in PowerBI, MSBI, and cloud data platforms (Azure Synapse / Snowflake)',
      'Experience in financial risk modelling, regulatory reporting (Finrep/Corep), or KYC analytics',
      'Registered as a self-employed professional (ZZP) with the Dutch Chamber of Commerce (KVK)'
    ]
  },
  {
    id: 'macee-sec-arch',
    title: 'Cyber Security & IAM Specialist',
    department: 'Government & Public Sector',
    location: 'The Hague, Netherlands',
    type: 'Contracting / Secondment',
    experience: '5+ Years',
    description: 'Support critical Dutch public sector digital transformations by engineering robust Identity & Access Management (IAM), RBAC policies, and threat defense.',
    requirements: [
      'Professional security certifications such as CISM, CISSP, or CISO credentials',
      'In-depth experience in CyberArk, SailPoint, Azure AD, and privileged access governance',
      'Strong knowledge of BIO (Baseline Informatiebeveiliging Overheid) and GDPR standards',
      'Eligible for Dutch security screening (VGB)'
    ]
  },
  {
    id: 'macee-java-dev',
    title: 'Senior Java / Microservices Specialist',
    department: 'High Tech Industry',
    location: 'Eindhoven, Netherlands',
    type: 'HSM Visa Sponsorship Available',
    experience: '7+ Years',
    description: 'Develop precision control systems and distributed backend architectures in the world-renowned Brainport Eindhoven high-tech corridor.',
    requirements: [
      'Mastery of modern Java (17/21), Spring Boot, and reactive programming paradigms',
      'Experience in high-throughput, low-latency, and distributed systems architecture',
      'Eligible for fast-track Dutch Highly Skilled Migrant (HSM) visa processing sponsored by MACEE',
      'Relocation guidance and 30% tax benefit ruling application support provided'
    ]
  }
];

export const RISK_SURVEY_QUESTIONS: RiskQuestion[] = [
  {
    id: 1,
    category: 'Wet DBA & Freelance (ZZP) Compliance',
    question: 'How does your organisation verify that independent contractors (ZZP) meet Dutch tax criteria and avoid false self-employment (schijnzelfstandigheid)?',
    options: [
      { label: 'We use verified Model Agreements and independent secondment/payroll for vulnerable roles', riskScore: 0, feedback: 'Compliant! Using verified model contracts and payroll where required protects against tax clawbacks.' },
      { label: 'We hire ZZP directly without formal independent screening or rate tests', riskScore: 18, feedback: 'Moderate risk. With enforcement of Wet DBA/VBAR, hiring ZZP without formal audits carries retroactive payroll tax risk.' },
      { label: 'We are unsure whether our contractors qualify as genuine self-employed under Dutch law', riskScore: 25, feedback: 'Critical exposure! Dutch tax authorities (Belastingdienst) enforce severe penalties for misclassification.' }
    ]
  },
  {
    id: 2,
    category: 'SNA (NEN 4400-1) & Chain Liability',
    question: 'Are all your staffing intermediaries and secondment agencies registered with the SNA (Stichting Normering Arbeid) and NEN 4400-1 certified?',
    options: [
      { label: 'Yes, all staffing vendors are verified SNA / NEN 4400-1 certified (like MACEE)', riskScore: 0, feedback: 'Excellent protection! Working exclusively with SNA-certified partners shields your firm from chain liability.' },
      { label: 'Some vendors are certified, but we do not systematically audit SNA registration', riskScore: 14, feedback: 'Moderate exposure. Uncertified brokers expose the hiring company to unpaid wage tax and VAT claims.' },
      { label: 'We do not check SNA certification for our external staffing providers', riskScore: 25, feedback: 'High risk! Under the Dutch WAADI and Chain Liability acts, hirers are co-liable for uncertified vendor defaults.' }
    ]
  },
  {
    id: 3,
    category: 'International Hiring & IND Sponsorship',
    question: 'When hiring non-EU specialists, does your workforce partner hold official IND Recognised Sponsor (Erkend referent) status?',
    options: [
      { label: 'Yes, our partner is an official IND Recognised Sponsor managing fast-track HSM visas', riskScore: 0, feedback: 'Compliant. IND sponsor status guarantees legal work authorization and expedited processing.' },
      { label: 'We sponsor visas internally or use ad-hoc arrangements', riskScore: 12, feedback: 'Moderate operational burden. Internal sponsorship requires significant ongoing IND compliance oversight.' },
      { label: 'We have non-EU contractors working on standard EU contracts without verified visa sponsorship', riskScore: 25, feedback: 'Severe risk! Illegal employment under the Wav (Wet arbeid vreemdelingen) incurs fines exceeding €8,000 per worker.' }
    ]
  },
  {
    id: 4,
    category: 'Contract Administration & WAADI Compliance',
    question: 'Does your organisation maintain structured contract administration ensuring equal pay (inlenersbeloning) and WAADI compliance?',
    options: [
      { label: 'Yes, fully administered with verified equal pay benchmarks and registered intermediaries', riskScore: 0, feedback: 'Strong compliance! Adherence to WAADI equal pay rules ensures fair treatment and avoids union claims.' },
      { label: 'Handled informally by individual hiring managers across departments', riskScore: 16, feedback: 'Moderate risk. Inconsistent rates and missing documentation can trigger equal pay disputes.' },
      { label: 'We have no centralized external workforce desk or formal rate benchmarking', riskScore: 25, feedback: 'High exposure! Unregulated hiring leads to runaway costs and compliance oversights.' }
    ]
  },
  {
    id: 5,
    category: '30% Tax Benefit & Fiscal Documentation',
    question: 'Are incoming international expats and cross-border contractors structured with proper 30% tax facility filings and fiscal documentation?',
    options: [
      { label: 'Yes, supported by specialist fiscal advisors with timely 30% ruling submissions', riskScore: 0, feedback: 'Compliant. Timely applications ensure international talent benefits from maximum tax advantages.' },
      { label: 'Left to the individual expat to handle independently with the tax office', riskScore: 12, feedback: 'Moderate exposure. Expats who miss deadlines lose eligibility, impacting retention and satisfaction.' },
      { label: 'We are unfamiliar with Dutch cross-border fiscal requirements', riskScore: 25, feedback: 'High risk. Improper withholding or cross-border misalignments create costly Dutch tax corrections.' }
    ]
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'What does MACEE do',
    question: 'In which branches is MACEE active?',
    answer: 'We are active in diverse sectors including High Tech, Finance & Banking, Consultancy, Oil & Gas, Utility & Energy, Telecom, and Government / Public Sector. ICT is our bread and butter, where we have decades of experience placing senior professionals.'
  },
  {
    id: 'faq-2',
    category: 'What does MACEE do',
    question: 'What expertise does MACEE mostly recruit for?',
    answer: 'We focus on senior-level professionals across Software Development (.NET, C#, C++, Java, Python), BI & Data (Spark, MSBI, PowerBI, Kafka, AI, ML), Cloud & DevOps (AWS, Azure, Kubernetes), Cybersecurity (CISM, CISSP, CISO, IAM), Project Management (PMO, Program Managers, Agile Leaders), and Financial Risk Management (AML, KYC, Corep, Finrep, Modelling).'
  },
  {
    id: 'faq-3',
    category: 'What does MACEE do',
    question: 'Why do business with MACEE?',
    answer: 'We have a solution for almost every situation, backed by more than 30 years of combined experience in contracting and recruitment. We are SNA / NEN 4400-1 certified and an official IND Recognised Sponsor, providing full compliance, convenience, and complete peace of mind.'
  },
  {
    id: 'faq-4',
    category: 'Services and Contract options',
    question: 'What kind of services can MACEE provide?',
    answer: 'MACEE provides Recruitment & Staffing for temporary and permanent positions, Contract Administration, Payroll and Secondment, Compliancy and Legal support, assistance with the Dutch 30% tax benefit ruling, and visa applications for international specialists and their families.'
  },
  {
    id: 'faq-5',
    category: 'Services and Contract options',
    question: 'What kind of contracts can MACEE provide?',
    answer: 'We provide Secondment, Freelance / ZZP agreements, Permanent placements at clients of MACEE, Contract-to-Perm (Deta-Vast), and outcome-based Outsourcing project agreements.'
  },
  {
    id: 'faq-6',
    category: 'Services and Contract options',
    question: 'Can MACEE sponsor my work Visa?',
    answer: 'Yes! We can be your sponsor for your work Visa when you have a project with a client. MACEE is an official IND (Immigration and Naturalisation Service) registered sponsor, enabling fast-track Highly-Skilled Migrant (HSM) visa processing for you and your family.'
  },
  {
    id: 'faq-7',
    category: 'Specialties and positions',
    question: 'What kind of roles is MACEE recruiting for?',
    answer: 'MACEE supplies a wide range of professionals, but our network is primarily focused on senior-level specialists including Software Engineers, Cloud Architects, Data Engineers, Cybersecurity Officers, Risk Specialists, and Program Managers.'
  },
  {
    id: 'faq-8',
    category: 'Specialties and positions',
    question: 'Can’t find the project you are looking for?',
    answer: 'You can create a Jobalert on our website to receive automated notifications by email whenever matching projects are published, or submit an open application directly to our talent team.'
  }
];
