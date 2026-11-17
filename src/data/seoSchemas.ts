import { HOME_FAQS, ABOUT_FAQS, CLIENTS_FAQS, PROFESSIONALS_FAQS, PROJECTS_FAQS, CONTACT_FAQS } from './pageFaqs';

export const BASE_ORGANIZATION_SCHEMA = {
  '@type': 'EmploymentAgency',
  '@id': 'https://macee.com/#organization',
  name: 'Macee',
  alternateName: 'Macee External Workforce Solutions',
  url: 'https://macee.com',
  logo: 'https://macee.com/images/macee-logo.png',
  image: 'https://macee.com/uploads/people-working-dsk.jpg',
  description:
    'Leading partner for flexible staffing, contract administration, compliance, secondment and international recruitment in the Netherlands. SNA NEN 4400-1 certified and IND Recognised Sponsor.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Willemsplein 44',
    addressLocality: 'Arnhem',
    postalCode: '6811 KD',
    addressCountry: 'NL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.9851,
    longitude: 5.8987,
  },
  telephone: '+31 (0) 26 785 1010',
  email: 'info@macee.com',
  priceRange: '$$$',
  areaServed: [
    { '@type': 'Country', name: 'Netherlands' },
    { '@type': 'AdministrativeArea', name: 'European Union' },
  ],
  knowsAbout: [
    'External Workforce Desk',
    'Secondment (Detachering)',
    'Freelance / ZZP Brokerage',
    'IND Visa Sponsorship',
    '30% Tax Ruling (30%-regeling)',
    'SNA NEN 4400-1 Compliance',
    'Dutch WAADI Legislation',
    'Wet DBA Risk Mitigation',
  ],
};

// 1. Home Page Schema
export function getHomeSchema(lang: 'EN' | 'NL' = 'EN') {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      BASE_ORGANIZATION_SCHEMA,
      {
        '@type': 'WebSite',
        '@id': 'https://macee.com/#website',
        url: 'https://macee.com/',
        name: 'Macee | External Workforce Solutions',
        publisher: { '@id': 'https://macee.com/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://macee.com/projects?search={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://macee.com/#webpage',
        url: 'https://macee.com/',
        name:
          lang === 'NL'
            ? 'Macee | Externe Workforce Solutions Nederland'
            : 'Macee | External Workforce Solutions Netherlands',
        isPartOf: { '@id': 'https://macee.com/#website' },
        about: { '@id': 'https://macee.com/#organization' },
        description:
          'SNA NEN 4400-1 certified external workforce and hiring desk in the Netherlands. Providing compliant staffing, international talent sourcing, and IND sponsorships.',
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://macee.com/#faq',
        mainEntity: HOME_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

// 2. About Page Schema
export function getAboutSchema(lang: 'EN' | 'NL' = 'EN') {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      BASE_ORGANIZATION_SCHEMA,
      {
        '@type': 'AboutPage',
        '@id': 'https://macee.com/about#webpage',
        url: 'https://macee.com/about',
        name:
          lang === 'NL'
            ? 'Over Macee | 30+ Jaar Ervaring in Detachering'
            : 'About Macee | 30+ Years in Staffing & Contracting',
        isPartOf: { '@id': 'https://macee.com/#website' },
        description:
          "Learn about Macee's mission, team, 30+ years of recruitment expertise, SNA NEN 4400-1 certification, and IND sponsor accreditation.",
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://macee.com/' },
          { '@type': 'ListItem', position: 2, name: lang === 'NL' ? 'Over ons' : 'About Us', item: 'https://macee.com/about' },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://macee.com/about#faq',
        mainEntity: ABOUT_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

// 3. Clients Page Schema
export function getClientsSchema(lang: 'EN' | 'NL' = 'EN') {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      BASE_ORGANIZATION_SCHEMA,
      {
        '@type': 'Service',
        '@id': 'https://macee.com/clients#service',
        serviceType: 'External Workforce & Hiring Desk Solutions',
        provider: { '@id': 'https://macee.com/#organization' },
        areaServed: 'Netherlands',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Enterprise Staffing Services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Secondment & Interim Deployment' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Contract Compliance & Wet DBA Screening' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Master Vendor & MSP Brokerage' } },
          ],
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://macee.com/' },
          { '@type': 'ListItem', position: 2, name: lang === 'NL' ? 'Opdrachtgevers' : 'Clients', item: 'https://macee.com/clients' },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://macee.com/clients#faq',
        mainEntity: CLIENTS_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

// 4. Professionals Page Schema
export function getProfessionalsSchema(lang: 'EN' | 'NL' = 'EN') {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      BASE_ORGANIZATION_SCHEMA,
      {
        '@type': 'Service',
        '@id': 'https://macee.com/professionals#service',
        serviceType: 'Contractor Management & Expat Visa Sponsorship',
        provider: { '@id': 'https://macee.com/#organization' },
        areaServed: 'Netherlands',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://macee.com/' },
          { '@type': 'ListItem', position: 2, name: lang === 'NL' ? 'Professionals' : 'Professionals', item: 'https://macee.com/professionals' },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://macee.com/professionals#faq',
        mainEntity: PROFESSIONALS_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

// 5. Projects Listing Page Schema
export function getProjectsSchema(lang: 'EN' | 'NL' = 'EN', sampleJobs: any[] = []) {
  const items = sampleJobs.slice(0, 10).map((job, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    url: `https://macee.com/projects/${String(job.id).replace(/^otys-/, '')}`,
    name: job.title,
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      BASE_ORGANIZATION_SCHEMA,
      {
        '@type': 'CollectionPage',
        '@id': 'https://macee.com/projects#webpage',
        url: 'https://macee.com/projects',
        name: lang === 'NL' ? 'Actuele Projecten & Vacatures | Macee' : 'Current Projects & Vacancies | Macee',
        description:
          'Explore active IT, Finance, Engineering, and Interim Consulting assignments across the Netherlands.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://macee.com/' },
          { '@type': 'ListItem', position: 2, name: lang === 'NL' ? 'Vacatures' : 'Projects', item: 'https://macee.com/projects' },
        ],
      },
      ...(items.length > 0
        ? [
            {
              '@type': 'ItemList',
              itemListElement: items,
            },
          ]
        : []),
      {
        '@type': 'FAQPage',
        '@id': 'https://macee.com/projects#faq',
        mainEntity: PROJECTS_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

// 6. Project Detail Page (JobPosting Schema)
export function getProjectDetailSchema(project: any) {
  if (!project) return null;
  const cleanId = String(project.id).replace(/^otys-/, '').replace(/^macee-/, '');
  const url = `https://macee.com/projects/${cleanId}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      BASE_ORGANIZATION_SCHEMA,
      {
        '@type': 'JobPosting',
        '@id': `${url}#job`,
        title: project.title,
        description: project.description || project.title,
        datePosted: project.rawDate || project.postedDate || new Date().toISOString().split('T')[0],
        employmentType:
          project.contractType?.toLowerCase().includes('freelance') || project.contractType?.toLowerCase().includes('zzp')
            ? 'CONTRACTOR'
            : project.contractType?.toLowerCase().includes('part')
            ? 'PART_TIME'
            : 'FULL_TIME',
        hiringOrganization: {
          '@id': 'https://macee.com/#organization',
        },
        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: project.location || 'Netherlands',
            addressCountry: 'NL',
          },
        },
        baseSalary: {
          '@type': 'MonetaryAmount',
          currency: 'EUR',
          value: {
            '@type': 'QuantitativeValue',
            value: project.rate ? parseInt(project.rate.replace(/\D/g, ''), 10) || 85 : 85,
            unitText: 'HOUR',
          },
        },
        directApply: true,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://macee.com/' },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://macee.com/projects' },
          { '@type': 'ListItem', position: 3, name: project.title, item: url },
        ],
      },
    ],
  };
}

// 7. Complete All-Inclusive FAQ Page Schema
export function getFaqPageSchema(allFaqs: Array<{ question: string; answer: string }>, lang: 'EN' | 'NL' = 'EN') {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      BASE_ORGANIZATION_SCHEMA,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://macee.com/' },
          { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://macee.com/faq' },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://macee.com/faq#faq',
        mainEntity: allFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

// 8. Contact Page Schema
export function getContactSchema(lang: 'EN' | 'NL' = 'EN') {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      BASE_ORGANIZATION_SCHEMA,
      {
        '@type': 'ContactPage',
        '@id': 'https://macee.com/contact#webpage',
        url: 'https://macee.com/contact',
        name: lang === 'NL' ? 'Contact Macee | Kantoor Arnhem' : 'Contact Macee | Arnhem Office',
        description:
          "Get in touch with Macee's workforce specialists. Schedule a consultation or reach our Arnhem headquarters.",
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://macee.com/#localbusiness',
        name: 'Macee Arnhem Office',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Willemsplein 44',
          addressLocality: 'Arnhem',
          postalCode: '6811 KD',
          addressCountry: 'NL',
        },
        telephone: '+31 (0) 26 785 1010',
        email: 'info@macee.com',
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:30',
            closes: '17:30',
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://macee.com/' },
          { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://macee.com/contact' },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://macee.com/contact#faq',
        mainEntity: CONTACT_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}
