import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  SlidersHorizontal, 
  Tag, 
  Calendar, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  Upload,
  Globe2,
  Euro
} from 'lucide-react';
import { JobalertBanner } from '../components/JobalertBanner';
import { ContactFormSection } from '../components/ContactFormSection';

export interface ProjectAssignmentItem {
  id: string;
  title: string;
  category: string;
  branche: string;
  location: string;
  contractType: string;
  hours: string;
  rate: string;
  experience: string;
  description: string;
  requirements: string[];
  skills: string[];
  postedDate: string;
  isFeatured?: boolean;
}

export const ALL_PROJECTS: ProjectAssignmentItem[] = [
  {
    id: 'macee-p1',
    title: 'Senior Full Stack .NET Developer',
    category: 'ICT & Cloud',
    branche: 'Banking and insurance',
    location: 'Arnhem / Hybrid',
    contractType: 'Contracting',
    hours: '36-40 hours',
    rate: '€85 - €105 / hour',
    experience: '5+ Years',
    description: 'We are seeking an experienced Senior Full Stack .NET Developer to design resilient cloud microservices on Microsoft Azure. You will work in a high-compliance fintech environment alongside solution architects, product owners, and security officers.',
    requirements: [
      '.NET 8 / C#, ASP.NET Core Web API',
      'Angular or React frontend architecture',
      'Azure Cloud native services (AKS, Service Bus, CosmosDB)',
      'CI/CD pipeline automation & clean code principles'
    ],
    skills: ['.NET 8', 'C#', 'Azure AKS', 'React', 'Microservices'],
    postedDate: 'Active Assignment',
    isFeatured: true
  },
  {
    id: 'macee-p2',
    title: 'Lead Data Engineer (Spark / Kafka)',
    category: 'Data & Analytics',
    branche: 'Public sector',
    location: 'Den Haag / Hybrid',
    contractType: 'Freelance / ZZP',
    hours: '32-40 hours',
    rate: '€95 - €115 / hour',
    experience: '6+ Years',
    description: 'For a major Dutch public sector organization in The Hague, we are looking for a Lead Data Engineer to design high-throughput streaming pipelines, modernise data lakehouse architectures, and enforce stringent data privacy governance.',
    requirements: [
      'Apache Spark, PySpark, and Kafka streaming pipelines',
      'Databricks or Snowflake ecosystem experience',
      'Knowledge of Dutch public sector compliance & security',
      'Fluency in English; Dutch proficiency is a strong advantage'
    ],
    skills: ['Spark', 'Kafka', 'Databricks', 'Python', 'Data Lakehouse'],
    postedDate: 'Active Assignment',
    isFeatured: true
  },
  {
    id: 'macee-p3',
    title: 'Cyber Security & IAM Specialist',
    category: 'Cybersecurity',
    branche: 'High Tech Industry',
    location: 'Eindhoven / Hybrid',
    contractType: 'Contracting',
    hours: '40 hours',
    rate: 'Competitive Day Rate',
    experience: '5+ Years',
    description: 'Join an international high-tech manufacturing leader in the Brainport Eindhoven region. You will lead Identity & Access Management (IAM), privileged access governance (CyberArk), and zero-trust perimeter implementations.',
    requirements: [
      'CISSP, CISM, or comparable security certifications',
      'Hands-on expertise with CyberArk, SailPoint, or Microsoft Entra ID',
      'Third-party security assessments & risk mitigation',
      'Excellent stakeholder communication in English'
    ],
    skills: ['CyberArk', 'IAM', 'Zero Trust', 'CISM', 'SailPoint'],
    postedDate: 'Recently posted',
    isFeatured: true
  },
  {
    id: 'macee-p4',
    title: 'Regulatory Reporting Specialist (Corep / Finrep)',
    category: 'Finance & Risk',
    branche: 'Banking and insurance',
    location: 'Amsterdam / Hybrid',
    contractType: 'Permanent / Contract to perm',
    hours: '36 hours',
    rate: 'Market conform + benefits',
    experience: '4+ Years',
    description: 'Support a prominent financial institution in Amsterdam with mandatory DNB/EBA regulatory returns, Finrep/Corep data mapping, and credit risk modelling reconciliation under Basel IV guidelines.',
    requirements: [
      'Proven track record with DNB / EBA regulatory frameworks',
      'Strong knowledge of Basel III/IV guidelines',
      'Data analysis skills in SQL / Python',
      'Master’s degree in Economics, Finance, or Quantitative field'
    ],
    skills: ['Finrep', 'Corep', 'DNB Reporting', 'Basel IV', 'SQL'],
    postedDate: 'Recently posted'
  },
  {
    id: 'macee-p5',
    title: 'Senior Java / Cloud Microservices Specialist',
    category: 'ICT & Cloud',
    branche: 'High Tech Industry',
    location: 'Eindhoven / Hybrid',
    contractType: 'HSM Visa Sponsorship Available',
    hours: '40 hours',
    rate: 'Market conform + 30% Tax Ruling',
    experience: '7+ Years',
    description: 'Develop mission-critical precision control systems and distributed backend microservices in the world-renowned Brainport Eindhoven corridor. Macee is an official IND Recognised Sponsor managing fast-track HSM visas and 30% ruling filings.',
    requirements: [
      'Mastery of modern Java (17/21), Spring Boot, and reactive programming',
      'Experience in high-throughput, low-latency, and distributed systems architecture',
      'Eligible for fast-track Dutch Highly Skilled Migrant (HSM) visa processing sponsored by MACEE',
      'Relocation guidance, BSN registration, and 30% tax benefit support provided'
    ],
    skills: ['Java 21', 'Spring Boot', 'Kafka', 'Docker', 'HSM Visa'],
    postedDate: 'Active Assignment',
    isFeatured: true
  },
  {
    id: 'macee-p6',
    title: 'Lead Data Engineer & BI Specialist',
    category: 'Data & Analytics',
    branche: 'Banking and insurance',
    location: 'Amsterdam / Hybrid',
    contractType: 'Freelance / ZZP',
    hours: '36-40 hours',
    rate: '€90 - €110 / hour',
    experience: '6+ Years',
    description: 'Build automated high-throughput data pipelines, ETL workflows, and regulatory BI dashboards for a leading Dutch financial institution. Clear ZZP contracts under Dutch Wet DBA guidelines.',
    requirements: [
      'Proven track record with Apache Spark, Kafka, Python, and SQL data warehousing',
      'Hands-on expertise in PowerBI, MSBI, and cloud data platforms (Azure Synapse / Snowflake)',
      'Experience in financial risk modelling, regulatory reporting, or KYC analytics',
      'Registered as an independent professional (ZZP) with the Dutch KvK'
    ],
    skills: ['PowerBI', 'Azure Synapse', 'Python', 'ETL', 'ZZP'],
    postedDate: 'Recently posted'
  },
  {
    id: 'macee-p7',
    title: 'Cloud Infrastructure & DevOps Engineer',
    category: 'Cloud & DevOps',
    branche: 'Energy Transition & Telecom',
    location: 'Utrecht / Hybrid',
    contractType: 'Contracting',
    hours: '36-40 hours',
    rate: 'Competitive Hourly Rate',
    experience: '4+ Years',
    description: 'Design and automate scalable infrastructure on Microsoft Azure and AWS for smart grid monitoring. You will build resilient CI/CD pipelines, Terraform modules, and maintain Kubernetes clusters.',
    requirements: [
      'Strong expertise in Terraform, Ansible, and GitOps workflows',
      'Production experience with Kubernetes (AKS/EKS) and Docker',
      'Monitoring and observability with Prometheus, Grafana, and Datadog',
      'Focus on security, zero-trust infrastructure, and automation'
    ],
    skills: ['Terraform', 'Kubernetes', 'AWS', 'Azure', 'GitOps'],
    postedDate: 'Recently posted'
  },
  {
    id: 'macee-p8',
    title: 'Technical Project & Delivery Manager',
    category: 'Project Management',
    branche: 'Banking and insurance',
    location: 'Rotterdam / Hybrid',
    contractType: 'Freelance / ZZP',
    hours: '36-40 hours',
    rate: '€95 - €110 / hour',
    experience: '7+ Years',
    description: 'Lead multi-disciplinary software squads executing enterprise core banking modernisation and customer onboarding portals. You will balance scope, delivery milestones, and executive stakeholder alignment.',
    requirements: [
      'Extensive track record delivering complex IT initiatives in financial services',
      'Certification in Agile/Scrum (PSM/CSM, SAFe) or Prince2/PMP',
      'Skilled in cross-functional coordination, risk mitigation, and budget tracking',
      'Strong bilingual communication in English and Dutch'
    ],
    skills: ['Agile / SAFe', 'Project Delivery', 'Fintech', 'Jira', 'Stakeholder Mgt'],
    postedDate: 'Active Assignment'
  }
];

interface ProjectsPageProps {
  onNavigate: (page: string) => void;
  initialQuery?: string;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate, initialQuery = '' }) => {
  const [keyword, setKeyword] = useState(initialQuery);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedBranche, setSelectedBranche] = useState('All');
  const [selectedContract, setSelectedContract] = useState('All');
  const [activeProject, setActiveProject] = useState<ProjectAssignmentItem | null>(null);
  const [applySubmitted, setApplySubmitted] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantRate, setApplicantRate] = useState('');
  const [applicantNote, setApplicantNote] = useState('');
  const [cvFileName, setCvFileName] = useState('');

  // Dropdown options
  const locations = ['All', 'Arnhem', 'Amsterdam', 'Den Haag', 'Eindhoven', 'Utrecht', 'Rotterdam'];
  const branches = [
    'All',
    'Banking and insurance',
    'Public sector',
    'High Tech Industry',
    'Energy Transition & Telecom'
  ];
  const contractTypes = [
    'All',
    'Contracting',
    'Freelance / ZZP',
    'Permanent / Contract to perm',
    'HSM Visa Sponsorship Available'
  ];

  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((proj) => {
      const q = keyword.trim().toLowerCase();
      const matchesKeyword =
        !q ||
        proj.title.toLowerCase().includes(q) ||
        proj.description.toLowerCase().includes(q) ||
        proj.category.toLowerCase().includes(q) ||
        proj.skills.some((s) => s.toLowerCase().includes(q)) ||
        proj.requirements.some((r) => r.toLowerCase().includes(q));

      const matchesLocation =
        selectedLocation === 'All' ||
        proj.location.toLowerCase().includes(selectedLocation.toLowerCase());

      const matchesBranche =
        selectedBranche === 'All' ||
        proj.branche.toLowerCase() === selectedBranche.toLowerCase();

      const matchesContract =
        selectedContract === 'All' ||
        proj.contractType.toLowerCase().includes(selectedContract.toLowerCase());

      return matchesKeyword && matchesLocation && matchesBranche && matchesContract;
    });
  }, [keyword, selectedLocation, selectedBranche, selectedContract]);

  const handleOpenModal = (proj: ProjectAssignmentItem) => {
    setActiveProject(proj);
    setApplySubmitted(false);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySubmitted(true);
  };

  const handleResetFilters = () => {
    setKeyword('');
    setSelectedLocation('All');
    setSelectedBranche('All');
    setSelectedContract('All');
  };

  const hasActiveFilters =
    Boolean(keyword) ||
    selectedLocation !== 'All' ||
    selectedBranche !== 'All' ||
    selectedContract !== 'All';

  return (
    <div className="page_projects min-h-screen bg-[#F8FAFB]">
      {/* 1. Hero Banner */}
      <section
        className="relative py-20 sm:py-28 bg-cover bg-center text-white overflow-hidden"
        style={{ backgroundImage: `url("/uploads/PM-2.jpg")` }}
      >
        <div className="absolute inset-0 bg-[#2a0209]/80 backdrop-blur-[2px]" />
        
        {/* Glow ambient shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#E30613]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-black/40 blur-3xl pointer-events-none" />

        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white/95 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-xs mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E30613]" />
            <span>Macee Project &amp; Assignment Desk</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-tight">
            Projects &amp; <span className="text-[#E30613]">Vacancies</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-[#f8dada] font-medium max-w-2xl mx-auto leading-relaxed">
            Discover top-tier contract, interim, secondment, and permanent IT and Finance assignments across the Netherlands.
          </p>

          {/* Micro trust indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-white/90">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#E30613]" />
              SNA NEN 4400-1 Certified
            </span>
            <span className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-[#E30613]" />
              IND Recognised Sponsor
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E30613]" />
              100% Wet DBA / WAADI Compliant
            </span>
          </div>
        </div>
      </section>

      {/* 2. Main Filter Bar & Listings */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filter Container */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 mb-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-wider">
                <SlidersHorizontal className="w-4 h-4 text-[#E30613]" />
                <span>Search &amp; Filter Assignments</span>
              </div>
              <span className="text-xs text-gray-500 font-mono">
                {filteredProjects.length} of {ALL_PROJECTS.length} roles shown
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Keyword Search */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Search keyword / tech
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. .NET, Kafka, Java, Security..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 focus:outline-none focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613]"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Location Select */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-gray-900 focus:outline-none focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613]"
                >
                  {locations.map((loc, i) => (
                    <option key={i} value={loc}>
                      {loc === 'All' ? 'All Locations' : loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Branche / Industry Select */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Sector / Branche
                </label>
                <select
                  value={selectedBranche}
                  onChange={(e) => setSelectedBranche(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-gray-900 focus:outline-none focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613]"
                >
                  {branches.map((br, i) => (
                    <option key={i} value={br}>
                      {br === 'All' ? 'All Sectors' : br}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contract Type Select */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Contract Model
                </label>
                <select
                  value={selectedContract}
                  onChange={(e) => setSelectedContract(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-gray-900 focus:outline-none focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613]"
                >
                  {contractTypes.map((ct, i) => (
                    <option key={i} value={ct}>
                      {ct === 'All' ? 'All Contracts' : ct}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-600">
                  Filters applied. Found <strong>{filteredProjects.length}</strong> matching vacancies.
                </span>
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-[#E30613] hover:underline cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>

          {/* 3. Project Cards Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold font-display text-gray-900">
                Current Opportunities ({filteredProjects.length})
              </h2>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8 shadow-xs">
                <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-xl font-bold font-display text-gray-900 mb-2">
                  No matching projects found
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  We didn't find any assignments matching your current search parameters. You can clear filters or register for automated notifications.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 px-6 py-2.5 rounded-[5px] bg-[#E30613] text-white text-sm font-semibold hover:bg-[#111827] transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="group bg-white rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md border border-gray-200 hover:border-[#E30613]/50 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  {/* Left: Role Details */}
                  <div className="space-y-3.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#f8dada] text-[#E30613]">
                        {proj.branche}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                        {proj.contractType}
                      </span>
                      {proj.isFeatured && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#111827] text-white">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-900 group-hover:text-[#E30613] transition-colors">
                      {proj.title}
                    </h3>

                    {/* Metadata pills */}
                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-600">
                      <span className="flex items-center gap-1.5 font-medium">
                        <MapPin className="w-4 h-4 text-[#E30613]" />
                        {proj.location}
                      </span>
                      <span className="text-gray-300 hidden sm:inline">·</span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-4 h-4 text-[#E30613]" />
                        {proj.hours}
                      </span>
                      <span className="text-gray-300 hidden sm:inline">·</span>
                      <span className="flex items-center gap-1.5 font-bold text-gray-900">
                        <Euro className="w-4 h-4 text-[#E30613]" />
                        {proj.rate}
                      </span>
                    </div>

                    {/* Description excerpt */}
                    <p className="text-sm text-gray-700 leading-relaxed max-w-3xl">
                      {proj.description}
                    </p>

                    {/* Skill chips */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {proj.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#F8FAFB] border border-gray-200 text-gray-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[200px]">
                    <button
                      onClick={() => handleOpenModal(proj)}
                      className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-[5px] bg-[#E30613] hover:bg-[#111827] text-white font-semibold text-sm shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                    >
                      <span>View &amp; Apply</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleOpenModal(proj)}
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-[5px] border border-gray-200 hover:border-gray-300 bg-white text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Project Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 4. Modal for Detailed View & Application */}
      {activeProject && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] my-auto animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#111827] text-white p-6 sm:p-7 shrink-0 relative pr-14">
              <button
                onClick={() => setActiveProject(null)}
                aria-label="Close project modal"
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E30613] text-white">
                  {activeProject.contractType}
                </span>
                <span className="text-xs text-gray-300 font-mono">
                  {activeProject.branche}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                {activeProject.title}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-300 mt-3">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#E30613]" />
                  {activeProject.location}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#E30613]" />
                  {activeProject.hours}
                </span>
                <span>·</span>
                <span className="font-semibold text-white">
                  {activeProject.rate}
                </span>
              </div>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
              {applySubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-2xl font-bold font-display text-gray-900">
                    Application Received!
                  </h4>
                  <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{applicantName || 'Applicant'}</strong>. Your application for{' '}
                    <strong>{activeProject.title}</strong> has been logged with Macee’s recruitment team in Arnhem. We will review your profile and reach out within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setActiveProject(null);
                      setApplySubmitted(false);
                    }}
                    className="mt-4 px-8 py-3 rounded-[5px] bg-[#E30613] text-white text-sm font-semibold hover:bg-[#111827] transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  {/* Overview */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-2">
                      Assignment Overview
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {activeProject.description}
                    </p>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-2">
                      Key Qualifications &amp; Skills
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {activeProject.requirements.map((req, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#E30613] shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Compliance Guarantee */}
                  <div className="p-4 rounded-xl bg-[#F8FAFB] border border-gray-200 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#E30613] shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-600 leading-relaxed">
                      <strong className="text-gray-900 block font-semibold mb-0.5">
                        Macee Compliance Assurance
                      </strong>
                      All engagements are fully covered under SNA NEN 4400-1 audit protocols, mitigating chain liability (inlenersaansprakelijkheid) and conforming with Dutch Wet DBA / WAADI guidelines.
                    </div>
                  </div>

                  {/* Quick Application Form */}
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-base font-bold font-display text-gray-900 mb-3 flex items-center gap-2">
                      <Send className="w-4 h-4 text-[#E30613]" />
                      <span>Direct Application Form</span>
                    </h4>

                    <form onSubmit={handleApplySubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Robin van Dijk"
                            value={applicantName}
                            onChange={(e) => setApplicantName(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#E30613]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. robin@example.com"
                            value={applicantEmail}
                            onChange={(e) => setApplicantEmail(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#E30613]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            placeholder="+31 6 1234 5678"
                            value={applicantPhone}
                            onChange={(e) => setApplicantPhone(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#E30613]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Target Rate or Salary Expectation
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. €95/hr or €85k/yr"
                            value={applicantRate}
                            onChange={(e) => setApplicantRate(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#E30613]"
                          />
                        </div>
                      </div>

                      {/* File upload simulated */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Resume / CV (PDF or Word)
                        </label>
                        <div className="relative border border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-[#E30613] transition-colors bg-gray-50/50">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setCvFileName(e.target.files[0].name);
                              }
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                            <Upload className="w-4 h-4 text-[#E30613]" />
                            <span>
                              {cvFileName ? (
                                <strong className="text-gray-900">{cvFileName}</strong>
                              ) : (
                                'Click or drag your CV here (optional)'
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Short Motivation / Availability
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Available immediately, 36-40 hrs/week..."
                          value={applicantNote}
                          onChange={(e) => setApplicantNote(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#E30613]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 rounded-[5px] bg-[#E30613] hover:bg-[#111827] text-white font-semibold text-sm shadow-sm transition-all duration-200 cursor-pointer"
                      >
                        Submit Application to Macee Arnhem Desk
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. Job Alert Banner */}
      <JobalertBanner
        onNavigate={onNavigate}
        bgImage="/uploads/Hightech-Industry-3.jpg"
      />

      {/* 6. Contact Form Section */}
      <ContactFormSection title="Have questions about our open projects?" />
    </div>
  );
};
