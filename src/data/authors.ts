export interface Author {
  id: string
  name: string
  title: string
  credentials: string[]
  bio: string
  imageUrl: string
  linkedIn?: string
  twitter?: string
  expertise: string[]
  yearsExperience: number
  education: string[]
  publications?: string[]
}

export const authors: Record<string, Author> = {
  'michael-chen': {
    id: 'michael-chen',
    name: 'Michael Chen, CFP®',
    title: 'Senior Financial Analyst',
    credentials: ['CFP® (Certified Financial Planner)', 'MBA Finance', 'CFA Level III Candidate'],
    bio: 'Michael has over 15 years of experience in financial planning and investment management. He specializes in retirement planning, portfolio optimization, and tax-efficient investment strategies. Prior to Finance Hub, Michael worked at Goldman Sachs and Fidelity Investments.',
    imageUrl: '/images/authors/michael-chen.jpg',
    linkedIn: 'https://linkedin.com/in/michaelchen-cfp',
    twitter: '@MichaelChenCFP',
    expertise: ['Retirement Planning', 'Investment Strategy', 'Tax Planning', 'Portfolio Management'],
    yearsExperience: 15,
    education: ['MBA Finance, Wharton School', 'BS Economics, MIT'],
    publications: [
      'The Modern Retirement Blueprint (2023)',
      'Tax-Efficient Investing Strategies, Financial Planning Journal (2022)'
    ]
  },
  'sarah-johnson': {
    id: 'sarah-johnson',
    name: 'Sarah Johnson, CFA',
    title: 'Chief Investment Strategist',
    credentials: ['CFA® (Chartered Financial Analyst)', 'MS Financial Engineering'],
    bio: 'Sarah brings 12+ years of institutional investment experience, having managed multi-billion dollar portfolios at BlackRock. She specializes in quantitative analysis, risk management, and market research. Sarah regularly appears as a financial commentator on CNBC and Bloomberg.',
    imageUrl: '/images/authors/sarah-johnson.jpg',
    linkedIn: 'https://linkedin.com/in/sarahjohnsoncfa',
    expertise: ['Market Analysis', 'Risk Management', 'Quantitative Finance', 'Asset Allocation'],
    yearsExperience: 12,
    education: ['MS Financial Engineering, Columbia University', 'BS Mathematics, Stanford'],
    publications: [
      'Market Volatility and Portfolio Protection Strategies (2024)',
      'Quantitative Approaches to Asset Allocation, Journal of Portfolio Management (2023)'
    ]
  },
  'david-rodriguez': {
    id: 'david-rodriguez',
    name: 'David Rodriguez, CPA',
    title: 'Tax & Financial Planning Expert',
    credentials: ['CPA (Certified Public Accountant)', 'EA (Enrolled Agent)', 'MBA Taxation'],
    bio: 'David has 18 years of experience in tax planning and financial advisory services. He helps individuals and families optimize their tax strategies while building wealth. David previously served as a senior tax consultant at Deloitte and KPMG.',
    imageUrl: '/images/authors/david-rodriguez.jpg',
    linkedIn: 'https://linkedin.com/in/davidrodriguezcpa',
    expertise: ['Tax Planning', 'Estate Planning', 'Business Finance', 'Wealth Management'],
    yearsExperience: 18,
    education: ['MBA Taxation, NYU Stern', 'BS Accounting, University of Texas'],
    publications: [
      'Smart Tax Strategies for High Earners (2023)',
      'Estate Planning in 2024: What You Need to Know, Tax Planning Review (2024)'
    ]
  },
  'emily-watson': {
    id: 'emily-watson',
    name: 'Dr. Emily Watson',
    title: 'Behavioral Finance Researcher',
    credentials: ['PhD Economics', 'Behavioral Finance Specialist', 'Former Fed Researcher'],
    bio: 'Dr. Watson holds a PhD in Economics from Princeton and spent 8 years at the Federal Reserve researching investor behavior and market psychology. She translates complex economic concepts into practical financial advice for everyday investors.',
    imageUrl: '/images/authors/emily-watson.jpg',
    linkedIn: 'https://linkedin.com/in/emilywatsonphd',
    expertise: ['Behavioral Finance', 'Economic Research', 'Market Psychology', 'Consumer Finance'],
    yearsExperience: 10,
    education: ['PhD Economics, Princeton University', 'BA Economics, Harvard'],
    publications: [
      'The Psychology of Investment Decisions (2022)',
      'Behavioral Biases in Retirement Planning, Economic Review (2023)',
      'Federal Reserve Research Papers on Consumer Finance (2018-2021)'
    ]
  },
  'james-mitchell': {
    id: 'james-mitchell',
    name: 'James Mitchell',
    title: 'Real Estate & Mortgage Specialist',
    credentials: ['Licensed Mortgage Broker', '20+ Years Real Estate Experience', 'Real Estate Investment Specialist'],
    bio: 'James has facilitated over $500 million in mortgage transactions throughout his 20-year career. He specializes in helping first-time homebuyers and real estate investors navigate the complex world of real estate financing.',
    imageUrl: '/images/authors/james-mitchell.jpg',
    linkedIn: 'https://linkedin.com/in/jamesmitchellmortgage',
    expertise: ['Mortgage Planning', 'Real Estate Finance', 'Property Investment', 'Home Buying'],
    yearsExperience: 20,
    education: ['BS Business Administration, UCLA', 'NMLS Licensed Mortgage Originator'],
    publications: [
      'The Complete Guide to Mortgage Optimization (2023)',
      'Real Estate Investment Strategies for 2024'
    ]
  }
}

// Helper function to get author by ID
export const getAuthor = (id: string): Author | undefined => {
  return authors[id]
}

// Get all authors
export const getAllAuthors = (): Author[] => {
  return Object.values(authors)
}

// Get random author (for demo/default)
export const getRandomAuthor = (): Author => {
  const authorList = getAllAuthors()
  return authorList[Math.floor(Math.random() * authorList.length)]
}
