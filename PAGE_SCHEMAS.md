# Macee Website — Complete Page Schemas (SEO JSON-LD & Data Schemas)

This document contains the complete technical schemas for every page of the **Macee External Workforce Solutions** platform.

It includes:
1. **Google SEO Structured Data (JSON-LD Schema.org)** for Rich Search Results, Knowledge Graph, and FAQ snippets.
2. **Page Data Architecture (TypeScript Data Schemas)** defining the internal data models of every page.

---

## Part 1: Schema.org (JSON-LD) Structured Data for SEO

### 1. Global Organization Schema (Base Entity)
Applies across all pages to establish Macee's identity, SNA NEN 4400-1 certification, and IND sponsor status:

```json
{
  "@context": "https://schema.org",
  "@type": "EmploymentAgency",
  "@id": "https://macee.nl/#organization",
  "name": "Macee",
  "alternateName": "Macee External Workforce Solutions",
  "url": "https://macee.nl",
  "logo": "https://macee.nl/images/macee-logo.png",
  "image": "https://macee.nl/uploads/people-working-dsk.jpg",
  "description": "Leading partner for flexible staffing, contract administration, compliance, and international recruitment in the Netherlands. SNA NEN 4400-1 certified and IND Recognised Sponsor.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Willemsplein 44",
    "addressLocality": "Arnhem",
    "postalCode": "6811 KD",
    "addressCountry": "NL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.9851,
    "longitude": 5.8987
  },
  "telephone": "+31 (0) 26 785 1010",
  "email": "info@macee.nl",
  "priceRange": "$$$",
  "areaServed": [
    { "@type": "Country", "name": "Netherlands" },
    { "@type": "AdministrativeArea", "name": "European Union" }
  ],
  "knowsAbout": [
    "External Workforce Desk",
    "Secondment (Detachering)",
    "Freelance / ZZP Brokerage",
    "IND Visa Sponsorship",
    "30% Tax Ruling (30%-regeling)",
    "SNA NEN 4400-1 Compliance",
    "Dutch WAADI Legislation",
    "Wet DBA Risk Mitigation"
  ]
}
```

---

### 2. Home Page (`/`) — WebSite & FAQPage Schema

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://macee.nl/#website",
      "url": "https://macee.nl/",
      "name": "Macee | External Workforce Solutions",
      "publisher": { "@id": "https://macee.nl/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://macee.nl/projects?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://macee.nl/#webpage",
      "url": "https://macee.nl/",
      "name": "Macee | Think Better. Recruit Smarter. External Workforce Solutions",
      "isPartOf": { "@id": "https://macee.nl/#website" },
      "about": { "@id": "https://macee.nl/#organization" },
      "description": "SNA NEN 4400-1 certified external workforce and hiring desk in the Netherlands. Providing compliant staffing, international talent sourcing, and IND sponsorships."
    },
    {
      "@type": "FAQPage",
      "@id": "https://macee.nl/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is an External Workforce Desk and how does Macee manage it?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An External Workforce Desk acts as your central partner for sourcing, contracting, and managing external talent (contractors, secondment professionals, and interim specialists). Macee takes full responsibility for sourcing, contract administration, compliance audits, and payroll."
          }
        },
        {
          "@type": "Question",
          "name": "How does Macee guarantee 100% compliance with Dutch labor regulations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Macee is SNA NEN 4400-1 certified and an official IND Recognised Sponsor. We strictly adhere to Dutch WAADI legislation, DBA regulations (mitigating bogus self-employment), and operate a verified G-account."
          }
        },
        {
          "@type": "Question",
          "name": "What contract models does Macee offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We provide Secondment, Freelance / ZZP brokerage, Contract-to-Permanent (Deta-Vast), and Permanent recruitment models."
          }
        },
        {
          "@type": "Question",
          "name": "In which sectors does Macee have proven recruitment expertise?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "High Tech & Software Engineering, Data & AI, Cloud & Infrastructure, Cybersecurity, Financial Risk & Regulatory Compliance (AML, KYC, Corep/Finrep), Energy & Utilities, and Government."
          }
        },
        {
          "@type": "Question",
          "name": "Can Macee recruit and sponsor international talent from outside the EU?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. As an official IND Recognised Sponsor, Macee fast-tracks work permits, Highly Skilled Migrant (Kennismigrant) visas, and family reunification permits."
          }
        }
      ]
    }
  ]
}
```

---

### 3. About Page (`/about`) — AboutPage & FAQ Schema

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://macee.nl/about#webpage",
      "url": "https://macee.nl/about",
      "name": "About Macee | 30+ Years in Contracting & Workforce Solutions",
      "isPartOf": { "@id": "https://macee.nl/#website" },
      "description": "Learn about Macee's mission, team, 30+ years of recruitment expertise, SNA NEN 4400-1 certification, and IND sponsor accreditation."
    },
    {
      "@type": "FAQPage",
      "@id": "https://macee.nl/about#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What sets Macee apart from traditional recruitment agencies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "With over 30 years of combined recruitment and contracting experience, Macee operates with a personal desk philosophy, building enduring relationships with technical depth, cultural fit, and zero-risk legal frameworks."
          }
        },
        {
          "@type": "Question",
          "name": "Why is the SNA NEN 4400-1 certification critical for our clients?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "NEN 4400-1 certification guarantees that Macee correctly files taxes, pays social security premiums, and protects clients against chain liability (ketenaansprakelijkheid) from the Dutch Tax Administration."
          }
        },
        {
          "@type": "Question",
          "name": "Where is Macee located and what areas do you serve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Macee is headquartered in Arnhem, Netherlands, operating nationwide across Amsterdam, Utrecht, Rotterdam, Eindhoven, and cross-border European talent corridors."
          }
        },
        {
          "@type": "Question",
          "name": "How does the Macee internal team operate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our dedicated team combines specialized technical recruiters, legal compliance officers, and candidate care managers, providing a named single point of contact."
          }
        }
      ]
    }
  ]
}
```

---

### 4. Clients Page (`/clients`) — B2B Service & FAQ Schema

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://macee.nl/clients#service",
      "serviceType": "External Workforce & Hiring Desk Solutions",
      "provider": { "@id": "https://macee.nl/#organization" },
      "areaServed": "Netherlands",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Enterprise Staffing Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Secondment & Interim Deployment" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Contract Compliance & Wet DBA Screening" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Master Vendor & MSP Brokerage" } }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://macee.nl/clients#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How fast can Macee deliver verified candidate profiles?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For standard high-demand roles, we typically present shortlisted, pre-screened candidate profiles within 48 to 72 hours of briefing."
          }
        },
        {
          "@type": "Question",
          "name": "What guarantee does Macee provide if an interim professional is not the right fit?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "During the initial transition window, if a consultant does not meet agreed project benchmarks, we replace the professional swiftly at no additional sourcing charge."
          }
        },
        {
          "@type": "Question",
          "name": "How does Macee protect hiring clients from Wet DBA / False Self-Employment risks?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We conduct formal contract assessments, use Tax Authority-approved model agreements, monitor operational independence, and offer secondment structures as a compliant alternative."
          }
        },
        {
          "@type": "Question",
          "name": "Can Macee act as a Master Vendor or Managed Service Provider (MSP)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Macee can consolidate your external contractor desk, streamlining onboarding, rate benchmarking, supplier management, and unified monthly invoicing."
          }
        },
        {
          "@type": "Question",
          "name": "What is your fee structure for interim vs permanent placements?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For interim and secondment assignments, we operate on transparent, all-inclusive hourly billing. For permanent recruitment, our fee is milestone-based."
          }
        }
      ]
    }
  ]
}
```

---

### 5. Professionals Page (`/professionals`) — Expat & Contractor Mobility Schema

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://macee.nl/professionals#service",
      "serviceType": "Contractor Management & Expat Visa Sponsorship",
      "provider": { "@id": "https://macee.nl/#organization" }
    },
    {
      "@type": "FAQPage",
      "@id": "https://macee.nl/professionals#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can Macee sponsor my Dutch residence and Highly Skilled Migrant work permit?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Macee is an officially registered IND Recognised Sponsor (Erkend Referent). We submit and manage your Highly Skilled Migrant visa application within 2 to 4 weeks."
          }
        },
        {
          "@type": "Question",
          "name": "Does Macee support applications for the 30% Tax Ruling (30%-regeling)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. If you are recruited from abroad and meet Dutch Tax Authority requirements, our payroll experts prepare and submit your 30% ruling application directly."
          }
        },
        {
          "@type": "Question",
          "name": "Can my spouse and dependent children move to the Netherlands with me?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. As an IND sponsor, Macee coordinates dependent family residence permits simultaneously, allowing partners to work freely in the Netherlands."
          }
        },
        {
          "@type": "Question",
          "name": "What contract options are available for professionals working through Macee?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Secondment employment contract (steady salary, paid holidays, pension), Freelance / ZZP broker agreement, or Contract-to-perm (Deta-Vast)."
          }
        },
        {
          "@type": "Question",
          "name": "How promptly are contractor invoices paid?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Upon timesheet approval, contractor payments are processed within agreed terms, with optional fast-track invoice discounting."
          }
        }
      ]
    }
  ]
}
```

---

### 6. Projects Page (`/projects`) — JobPosting & CollectionPage Schema

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://macee.nl/projects#webpage",
      "url": "https://macee.nl/projects",
      "name": "Current Projects & Vacancies | Macee",
      "description": "Explore active IT, Finance, Engineering, and Interim Consulting assignments across the Netherlands."
    },
    {
      "@type": "JobPosting",
      "title": "Senior Cloud Infrastructure Engineer",
      "description": "Architect and deploy secure AWS/Azure landing zones with Terraform and Kubernetes for an enterprise client in Amsterdam.",
      "datePosted": "2026-10-01",
      "employmentType": "CONTRACTOR",
      "hiringOrganization": { "@id": "https://macee.nl/#organization" },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Amsterdam",
          "addressRegion": "North Holland",
          "addressCountry": "NL"
        }
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "EUR",
        "value": {
          "@type": "QuantitativeValue",
          "value": 95,
          "unitText": "HOUR"
        }
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://macee.nl/projects#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What format should my CV and portfolio be in when applying?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We recommend submitting your CV in PDF or DOCX format detailing recent project experience, primary tech stack, and your availability date."
          }
        },
        {
          "@type": "Question",
          "name": "What happens after I apply for an open project on Macee?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Your application routes directly to our OTYS system. A domain recruiter will review your profile and contact you within 24 to 48 hours."
          }
        },
        {
          "@type": "Question",
          "name": "Are remote or hybrid work arrangements available for open assignments?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The majority of our technology and finance projects offer hybrid working (e.g. 2–3 days remote, 1–2 days on-site in Amsterdam, Utrecht, Rotterdam, or Eindhoven)."
          }
        },
        {
          "@type": "Question",
          "name": "What should I do if there is no open project currently matching my skill set?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can submit an Open Application or activate a custom Job Alert to receive notifications before public advertisement."
          }
        },
        {
          "@type": "Question",
          "name": "Are all projects published on this website real and currently active?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Our job board synchronizes in real time with our live OTYS recruitment desk. Filled or expired roles are unlisted automatically."
          }
        }
      ]
    }
  ]
}
```

---

### 7. Contact Page (`/contact`) — ContactPage & LocalBusiness Schema

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://macee.nl/contact#webpage",
      "url": "https://macee.nl/contact",
      "name": "Contact Macee | Arnhem Office",
      "description": "Get in touch with Macee's workforce specialists. Schedule a consultation or reach our Arnhem headquarters."
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://macee.nl/#localbusiness",
      "name": "Macee Arnhem Office",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Willemsplein 44",
        "addressLocality": "Arnhem",
        "postalCode": "6811 KD",
        "addressCountry": "NL"
      },
      "telephone": "+31 (0) 26 785 1010",
      "email": "info@macee.nl",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:30",
          "closes": "17:30"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://macee.nl/contact#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How quickly does Macee respond to website inquiries?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our team responds to all form submissions and inquiries within 24 business hours. For urgent inquiries, call +31 (0) 26 785 1010."
          }
        },
        {
          "@type": "Question",
          "name": "Can I visit Macee’s Arnhem office for an in-person consultation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we welcome in-person meetings at our Arnhem office (Willemsplein 44, 6811 KD Arnhem). Please schedule an appointment in advance."
          }
        },
        {
          "@type": "Question",
          "name": "How can an employer request an emergency / urgent interim replacement?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Indicate 'Urgent' in your message or call our direct phone line. We can mobilize available bench consultants within 24 to 48 hours."
          }
        },
        {
          "@type": "Question",
          "name": "Are phone consultations free of charge and confidential?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. All initial consultations, hiring requirement assessments, and candidate career discussions are 100% complimentary and GDPR confidential."
          }
        }
      ]
    }
  ]
}
```

---

## Part 2: TypeScript Data Schemas (Internal Application Models)

### 1. `HomeDataSchema`
```typescript
interface HomeDataSchema {
  hero: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    primaryCta: { text: string; action: string };
    secondaryCta: { text: string; action: string };
    carouselImages: Array<{ src: string; alt: string; title: string; subtitle: string }>;
  };
  whatWeDo: {
    badge: string;
    heading: string;
    items: Array<{ id: string; title: string; description: string; icon: string }>;
    ctaSlot: { title: string; description: string; buttonText: string };
  };
  whyMacee: {
    badge: string;
    title: string;
    stats: Array<{ number: string; label: string }>;
    pillars: Array<{ title: string; desc: string }>;
  };
  faqs: Array<{ question: string; answer: string; tag?: string }>;
}
```

### 2. `AboutDataSchema`
```typescript
interface AboutDataSchema {
  hero: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    trustPoints: Array<{ id: string; text: string }>;
  };
  whatWeDo: {
    badge: string;
    title: string;
    paragraphs: string[];
    highlights: string[];
    image: { src: string; fallback: string; alt: string; badgeTitle: string; badgeSubtitle: string };
  };
  howWeWork: {
    badge: string;
    title: string;
    paragraphs: string[];
    features: string[];
    image: { src: string; fallback: string; alt: string; badgeTitle: string; badgeSubtitle: string };
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{ id: string; title: string; paragraphs: string[]; tag: string; icon: string }>;
  };
  team: {
    badge: string;
    title: string;
    description: string;
    members: Array<{ name: string; role: string; email: string; phone: string; image: string }>;
  };
  faqs: Array<{ question: string; answer: string; tag?: string }>;
}
```

### 3. `ClientsDataSchema`
```typescript
interface ClientsDataSchema {
  hero: {
    pill: string;
    title: string;
    text: string;
    primaryCta: { text: string; target: string };
    trustBadge: string;
    image: { src: string; fallback: string; alt: string };
  };
  services: {
    title: string;
    description: string;
    items: Array<{ id: string; title: string; description: string }>;
  };
  certifications: {
    title: string;
    description: string;
    items: Array<{ id: string; title: string; badge: string; description: string; details: string[] }>;
  };
  industries: {
    title: string;
    subheading: string;
    paragraphs: string[];
    tags: string[];
  };
  expertise: {
    title: string;
    subheading: string;
    intro: string;
    prompt: string;
    items: Array<{ domain: string; technologies: string }>;
  };
  faqs: Array<{ question: string; answer: string; tag?: string }>;
}
```

### 4. `ProfessionalsDataSchema`
```typescript
interface ProfessionalsDataSchema {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
  whatWeDo: {
    eyebrow: string;
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    items: Array<{ num: string; title: string; description: string; image: string; fallback: string; alt: string; icon: string }>;
  };
  industries: {
    title: string;
    items: Array<{ id: string; title: string; headline: string; paragraphs: string[]; image: string; fallback: string; alt: string }>;
  };
  expertises: {
    title: string;
    roles: Array<{ name: string; tech: string }>;
    gallery: Array<{ src: string; fallback: string; alt: string }>;
  };
  faqs: Array<{ question: string; answer: string; tag?: string }>;
}
```

### 5. `ProjectsDataSchema` (OTYS ProjectAssignmentItem)
```typescript
interface ProjectAssignmentItem {
  id: string;
  referenceId?: string;
  title: string;
  functionCategory?: string;
  location: string;
  contractType: 'Secondment' | 'Freelance / ZZP' | 'Permanent' | 'Interim' | 'Deta-Vast';
  duration?: string;
  hoursPerWeek?: string;
  rateOrSalary?: string;
  shortDescription: string;
  fullHtmlDescription?: string;
  requirements?: string[];
  postedDate?: string;
  closingDate?: string;
  isUrgent?: boolean;
  contactPerson?: {
    name: string;
    email: string;
    phone: string;
  };
}
```

### 6. `ContactDataSchema`
```typescript
interface ContactDataSchema {
  hero: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    description: string;
  };
  office: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    email: string;
    businessHours: string;
    mapsEmbedUrl: string;
  };
  consultationBanner: {
    badge: string;
    title: string;
    description: string;
    buttonText: string;
  };
  faqs: Array<{ question: string; answer: string; tag?: string }>;
}
```
