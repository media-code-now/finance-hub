import { Organization, WithContext, Person, WebPage } from 'schema-dts'

export const organizationSchema: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://finance-feed.netlify.app/#organization',
  name: 'Finance Hub',
  url: 'https://finance-feed.netlify.app',
  logo: 'https://finance-feed.netlify.app/logo.png',
  description: 'Expert financial planning tools and resources backed by CFP®, CFA®, and CPA certified professionals with 75+ years combined experience.',
  foundingDate: '2024',
  slogan: 'Your trusted partner in financial education and planning',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'contact@financehub.com',
    availableLanguage: ['English']
  },
  sameAs: [
    'https://twitter.com/financehub',
    'https://linkedin.com/company/financehub'
  ]
}

export const financialServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialProduct',
  '@id': 'https://finance-feed.netlify.app/#service',
  name: 'Finance Hub - Financial Planning Tools',
  description: 'Free financial calculators and educational resources for mortgages, investments, retirement planning, and personal finance. Developed by certified financial professionals.',
  url: 'https://finance-feed.netlify.app',
  brand: {
    '@type': 'Organization',
    '@id': 'https://finance-feed.netlify.app/#organization'
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Mortgage Calculator',
      description: 'Calculate monthly mortgage payments, total interest, and amortization schedules',
      price: '0',
      priceCurrency: 'USD'
    },
    {
      '@type': 'Offer',
      name: 'Investment Calculator',
      description: 'Project investment growth with compound interest calculations',
      price: '0',
      priceCurrency: 'USD'
    },
    {
      '@type': 'Offer',
      name: 'Retirement Calculator',
      description: 'Plan your retirement savings and estimate future needs',
      price: '0',
      priceCurrency: 'USD'
    },
    {
      '@type': 'Offer',
      name: 'Loan Calculator',
      description: 'Calculate loan payments and total cost across various loan types',
      price: '0',
      priceCurrency: 'USD'
    }
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '2547',
    bestRating: '5'
  }
}

export function getAuthorSchema(author: {
  name: string
  title: string
  credentials: string[]
  bio: string
  linkedIn?: string
  twitter?: string
  education: string[]
  yearsExperience: number
}): WithContext<Person> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.title,
    description: author.bio,
    hasCredential: author.credentials.map(cred => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: cred
    })),
    alumniOf: author.education.map(edu => ({
      '@type': 'EducationalOrganization',
      name: edu
    })),
    worksFor: {
      '@type': 'Organization',
      '@id': 'https://finance-feed.netlify.app/#organization'
    },
    sameAs: [
      author.linkedIn,
      author.twitter
    ].filter(Boolean) as string[],
    knowsAbout: [
      'Financial Planning',
      'Investment Management',
      'Retirement Planning',
      'Tax Planning',
      'Personal Finance'
    ]
  }
}

export function getWebPageSchema(
  title: string,
  description: string,
  url: string,
  author?: any,
  datePublished?: string,
  dateModified?: string
): WithContext<WebPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': url,
    name: title,
    description: description,
    url: url,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://finance-feed.netlify.app/#website',
      url: 'https://finance-feed.netlify.app',
      name: 'Finance Hub'
    },
    ...(author && {
      author: {
        '@type': 'Person',
        name: author.name,
        jobTitle: author.title,
        credential: author.credentials
      }
    }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    publisher: {
      '@type': 'Organization',
      '@id': 'https://finance-feed.netlify.app/#organization'
    }
  }
}
