export interface JobAssignment {
  id: string;
  title: string;
  category: string;
  branche: string;
  location: string;
  contractType: string;
  hours: string;
  rate?: string;
  description: string;
  requirements: string[];
  postedDate: string;
}

export interface FaqItem {
  id: string;
  categoryId: number;
  categoryName: string;
  question: string;
  answer: string;
  date: string;
}

export const MACEE_FAQS: FaqItem[] = [
  // Category 1: What does MACEE do
  {
    id: 'faq-1-1',
    categoryId: 1,
    categoryName: 'What does MACEE do',
    question: 'In which branches is MACEE active ?',
    answer: 'We are active is different branches like: High Tech, Finance and Banking, Consultancy, Oil & Gas, Utility and Energy, Government, Pharma, eCommerce and more',
    date: 'February 6, 2026'
  },
  {
    id: 'faq-1-2',
    categoryId: 1,
    categoryName: 'What does MACEE do',
    question: 'What expertise does MACEE mostly recruit for ?',
    answer: 'Software Development: .NET, C / C++ / C#, JAVA, Python\n\nBI & Data: Spark, MSBI, PowerBI, Informatica PowerCenter, AI, ML, Kafka, ETL, Datavault, Tableau, Hadoop\n\nProject Management: PMO, Program Manager\n\nCloud: AWS, Azure, Kubernetes\n\nSecurity: CISM, CISSP, CISO, Cyber Security, IAM, RBAC, DLP, CyberArk, Third Party Risk, Network, Infrastructure\n\nFinance Risk Management: Regulatory reporting, AML, FEC, KYC, Modelling, QRM, Audit, Trading, Markets, Corep, Finrep, EMIR',
    date: 'March 16, 2023'
  },
  {
    id: 'faq-1-3',
    categoryId: 1,
    categoryName: 'What does MACEE do',
    question: 'Why do business with MACEE ?',
    answer: "We have for almost every situation a solution, more than 30 years of experience in contracting and (IT) recruitment business so we have a broad international network, in debt experience and knowledge of IT expertise and development in last years. Doing business with us we help and service on a personal way, with us you’re not a number.",
    date: 'February 6, 2026'
  },
  // Category 2: Services and Contract options
  {
    id: 'faq-2-1',
    categoryId: 2,
    categoryName: 'Services and Contract options',
    question: 'What kind of services can MACEE provide ?',
    answer: '• Helping with the application for the 30% tax benefit ruling\n• Visa application for partner and children\n• Recruitment for temporary projects and permanent positions',
    date: 'February 6, 2026'
  },
  {
    id: 'faq-2-2',
    categoryId: 2,
    categoryName: 'Services and Contract options',
    question: 'What kind of contracts can MACEE provide ?',
    answer: '• Secondment\n• Freelance / ZZP\n• Permanent positions at clients of MACEE\n• Contract to perm (Deta-Vast)',
    date: 'February 6, 2026'
  },
  {
    id: 'faq-2-3',
    categoryId: 2,
    categoryName: 'Services and Contract options',
    question: 'Can MACEE sponsor my work Visa ?',
    answer: 'Yes, we can be your sponsor for your work Visa when you have a project with a client. MACEE is an official IND registered company.',
    date: 'February 6, 2026'
  },
  // Category 3: Specialties and positions
  {
    id: 'faq-3-1',
    categoryId: 3,
    categoryName: 'Specialties and positions',
    question: 'What kind of roles is MACEE recruiting for ?',
    answer: 'MACEE can supply a wide range of people, but our network is mainly focussed on senior-level professionals. These include professionals in positions such as: Business/Information Analyst, Data Engineer, (Cyber) Security Consultant, Testers, Software Developers, Reporting/Finance Specialist and Technical/Functional Project Managers etc.',
    date: 'February 6, 2026'
  },
  {
    id: 'faq-3-2',
    categoryId: 3,
    categoryName: 'Specialties and positions',
    question: 'What kind of roles and projects does MACEE handle for her clients ?',
    answer: 'We serve multiple clients in multiple branches, most projects are IT / Business related and you can think within: Infrastructure, Network, Software Development, (Finance) Risk & compliancy, Reporting, Security, Project & Program Management, Information and Data and more.',
    date: 'February 6, 2026'
  }
];

export const MACEE_PROJECTS: JobAssignment[] = [
  {
    id: 'macee-p1',
    title: 'Senior Full Stack .NET Developer',
    category: 'ICT',
    branche: 'Banking and insurance',
    location: 'Arnhem / Hybrid',
    contractType: 'Contracting',
    hours: '36-40 hours',
    rate: 'Competitive / Market compliant',
    description: 'We are seeking an experienced Senior Full Stack .NET Developer to build scalable enterprise cloud microservices on Azure. You will work closely with architectural leads, product owners, and security officers in a high-compliance fintech environment.',
    requirements: [
      '.NET 8 / C#, ASP.NET Core Web API',
      'Angular or React frontend experience',
      'Azure Cloud native services (AKS, Service Bus, CosmosDB)',
      'CI/CD pipeline automation & clean code principles'
    ],
    postedDate: 'Recently posted'
  },
  {
    id: 'macee-p2',
    title: 'Lead Data Engineer (Spark / Kafka)',
    category: 'ICT',
    branche: 'Public sector',
    location: 'Den Haag / Hybrid',
    contractType: 'Freelance / ZZP',
    hours: '32-40 hours',
    rate: '€95 - €115 / hour',
    description: 'For a major government agency in The Hague, we are looking for a Lead Data Engineer to design high-throughput streaming pipelines, modernise data lakehouse architectures, and enforce data security governance.',
    requirements: [
      'Apache Spark, PySpark, Kafka streaming',
      'Databricks or Snowflake ecosystem experience',
      'Experience in Dutch public sector compliance & security',
      'Fluency in Dutch and English'
    ],
    postedDate: 'Recently posted'
  },
  {
    id: 'macee-p3',
    title: 'Cyber Security & IAM Specialist',
    category: 'ICT',
    branche: 'High Tech Industry',
    location: 'Eindhoven / Hybrid',
    contractType: 'Contracting',
    hours: '40 hours',
    rate: 'Competitive Day Rate',
    description: 'Join an international high-tech manufacturing leader in Eindhoven. You will lead identity and access management (IAM), privileged access management (CyberArk), and zero-trust perimeter implementations.',
    requirements: [
      'CISSP, CISM or comparable security certifications',
      'Hands-on expertise with CyberArk, SailPoint, or Azure AD / Entra ID',
      'Third-party security assessments & risk mitigation',
      'Excellent stakeholder management skills'
    ],
    postedDate: 'Recently posted'
  },
  {
    id: 'macee-p4',
    title: 'Regulatory Reporting Specialist (Corep / Finrep)',
    category: 'Finance',
    branche: 'Banking and insurance',
    location: 'Amsterdam / Hybrid',
    contractType: 'Permanent / Contract to perm',
    hours: '36 hours',
    rate: 'Market conform + benefits',
    description: 'Support a prominent financial institution in Amsterdam with mandatory DNB/EBA regulatory returns, Finrep/Corep data mapping, and credit risk modelling reconciliation.',
    requirements: [
      'Proven track record with DNB / EBA regulatory frameworks',
      'Strong knowledge of Basel III/IV guidelines',
      'Data analysis skills in SQL / Python',
      'Master’s degree in Economics, Finance, or Quantitative field'
    ],
    postedDate: 'Recently posted'
  }
];

export const BRANCHES_LIST = [
  'ICT',
  'Public sector',
  'Banking and insurance',
  'Advice / Consultancy / Interim',
  'Education',
  'Healthcare / Wellbeing',
  'Marketing',
  'Telecom',
  'Non profit',
  'Energy Transition',
  'Industry',
  'Logistics',
  'Production',
  'Business service',
  'Sales',
  'Techniek',
  'Juridisch',
  'Landbouw/visserij',
  'Wetenschap en onderzoek',
  'Accountancy/administratiekantoor',
  'Bouw/installatie/vastgoed',
  'Communicatie',
  'Detailhandel/winkel',
  'FMCG',
  'Grafisch',
  'Handel/groothandel',
  'Horeca/recreatie/toerisme',
  'Kunst en cultuur',
  'Recruitment'
];
