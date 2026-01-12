'use client'

import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Header } from '@/components/Header'

const IconComponent = ({ iconName, className = "w-6 h-6" }: { iconName: string, className?: string }) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    home: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    chart: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    'credit-card': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    money: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'bar-chart': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2h-2a2 2 0 00-2-2" />
      </svg>
    ),
    target: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    refresh: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  }
  
  return iconMap[iconName] || (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  )
}

interface Tool {
  id: string
  title: string
  description: string
  icon: string
  href: string
  category: string
  popular: boolean
  difficulty: 'Basic' | 'Intermediate' | 'Advanced'
  tags: string[]
  users: string
}

const tools: Tool[] = [
  {
    id: 'mortgage',
    title: 'Mortgage Calculator',
    description: 'Calculate monthly payments, total interest, and amortization schedules for home loans',
    icon: 'home',
    href: '/calculators/mortgage',
    category: 'Real Estate',
    popular: true,
    difficulty: 'Basic',
    tags: ['mortgage', 'home', 'loan', 'interest', 'payment'],
    users: '52K+'
  },
  {
    id: 'investment',
    title: 'Investment Return Calculator',
    description: 'Plan your portfolio and track potential returns with compound growth analysis',
    icon: 'chart',
    href: '/calculators/investment',
    category: 'Investments',
    popular: true,
    difficulty: 'Intermediate',
    tags: ['investment', 'returns', 'compound', 'portfolio', 'growth'],
    users: '38K+'
  },
  {
    id: 'retirement',
    title: 'Retirement Planning Calculator',
    description: 'See if you\'re on track for your dream retirement with detailed projections',
    icon: 'beach',
    href: '/calculators/investment',
    category: 'Retirement',
    popular: true,
    difficulty: 'Advanced',
    tags: ['retirement', '401k', 'pension', 'planning', 'savings'],
    users: '45K+'
  },
  {
    id: 'loan',
    title: 'Loan Payment Calculator',
    description: 'Get exact payments for auto, personal, and business loans with amortization',
    icon: 'credit-card',
    href: '/calculators/loan',
    category: 'Loans',
    popular: true,
    difficulty: 'Basic',
    tags: ['loan', 'payment', 'auto', 'personal', 'business'],
    users: '29K+'
  },
  {
    id: 'compound',
    title: 'Compound Interest Calculator',
    description: 'See how your money grows over time with the power of compound interest',
    icon: 'money',
    href: '/calculators/investment',
    category: 'Investments',
    popular: false,
    difficulty: 'Basic',
    tags: ['compound', 'interest', 'growth', 'savings', 'time'],
    users: '22K+'
  },
  {
    id: 'budget',
    title: 'Budget Planner',
    description: 'Create and manage your monthly budget with income and expense tracking',
    icon: 'bar-chart',
    href: '/calculators/mortgage',
    category: 'Budgeting',
    popular: false,
    difficulty: 'Basic',
    tags: ['budget', 'planning', 'expenses', 'income', 'tracking'],
    users: '31K+'
  },
  {
    id: 'savings',
    title: 'Savings Goal Calculator',
    description: 'Calculate how much to save monthly to reach your financial goals',
    icon: 'target',
    href: '/calculators/investment',
    category: 'Savings',
    popular: false,
    difficulty: 'Basic',
    tags: ['savings', 'goals', 'monthly', 'target', 'planning'],
    users: '18K+'
  },
  {
    id: 'debt',
    title: 'Debt Payoff Calculator',
    description: 'Create a strategic plan to pay off credit cards and debt faster',
    icon: 'unlock',
    href: '/calculators/loan',
    category: 'Debt Management',
    popular: false,
    difficulty: 'Intermediate',
    tags: ['debt', 'payoff', 'credit', 'cards', 'strategy'],
    users: '25K+'
  },
  {
    id: 'tax',
    title: 'Tax Calculator',
    description: 'Estimate your federal and state tax liability for the current year',
    icon: 'receipt',
    href: '/calculators/investment',
    category: 'Taxes',
    popular: false,
    difficulty: 'Advanced',
    tags: ['tax', 'federal', 'state', 'liability', 'estimate'],
    users: '33K+'
  },
  {
    id: 'refinance',
    title: 'Refinance Calculator',
    description: 'Determine if refinancing your mortgage will save you money',
    icon: 'refresh',
    href: '/calculators/mortgage',
    category: 'Real Estate',
    popular: false,
    difficulty: 'Intermediate',
    tags: ['refinance', 'mortgage', 'savings', 'rates', 'comparison'],
    users: '19K+'
  },
  {
    id: 'auto-loan',
    title: 'Auto Loan Calculator',
    description: 'Calculate car loan payments and compare financing options',
    icon: 'car',
    href: '/calculators/loan',
    category: 'Loans',
    popular: false,
    difficulty: 'Basic',
    tags: ['auto', 'car', 'loan', 'financing', 'payment'],
    users: '27K+'
  },
  {
    id: 'college',
    title: 'College Savings Calculator',
    description: 'Plan and save for your child\'s college education expenses',
    icon: '🎓',
    href: '/calculators/college-savings',
    category: 'Education',
    popular: false,
    difficulty: 'Intermediate',
    tags: ['college', 'education', 'savings', '529', 'planning'],
    users: '16K+'
  }
]

const categories = ['All', 'Real Estate', 'Investments', 'Retirement', 'Loans', 'Budgeting', 'Savings', 'Debt Management', 'Taxes', 'Education']

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showPopularOnly, setShowPopularOnly] = useState(false)

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory
    const matchesPopular = !showPopularOnly || tool.popular
    
    return matchesSearch && matchesCategory && matchesPopular
  })

  const popularTools = tools.filter(tool => tool.popular)

  return (
    <>
      <Head>
        <title>Financial Tools & Calculators - Finance Hub</title>
        <meta name="description" content="Comprehensive collection of free financial calculators and planning tools. Mortgage, investment, retirement, loan calculators and more." />
        <meta name="keywords" content="financial calculators, mortgage calculator, investment calculator, retirement planning, loan calculator, budget planner" />
      </Head>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">🛠️ Financial Tools & Calculators</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Comprehensive suite of financial calculators and planning tools to help you make informed money decisions. 
            All tools are free, secure, and run entirely in your browser.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 max-w-2xl mx-auto">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3 text-blue-100">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-sm">15+ Specialized Tools</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3 text-blue-100">
              <span className="mr-2">🔒</span>
              <span className="text-sm">100% Private & Secure</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3 text-blue-100">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm">Instant Results</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Quick Access - Most Popular Tools */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            <div className="flex items-center mb-6">
              <svg className="w-6 h-6 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Most Popular Tools</span>
            </div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTools.map((tool) => (
              <Link key={tool.id} href={tool.href} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 border border-orange-200 dark:border-orange-800">
                  <div className="absolute -top-2 -right-2">
                    <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      HOT
                    </span>
                  </div>
                  <div className="text-4xl mb-4 text-center">{tool.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center">{tool.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-4 line-clamp-2">{tool.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {tool.users}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:text-blue-800 dark:group-hover:text-blue-300">
                      Try Now →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Search and Filter Controls */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              <div className="flex items-center mb-6">
                <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">Find Your Perfect Financial Tool</span>
              </div>
            </h2>
            
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search calculators (e.g., mortgage, investment, retirement...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">Filter by Category</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Filters */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowPopularOnly(!showPopularOnly)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  showPopularOnly
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-orange-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                  {showPopularOnly ? 'Showing Popular Only' : 'Show Popular Only'}
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Results Count */}
        <div className="mb-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Showing <span className="font-bold text-blue-600 dark:text-blue-400">{filteredTools.length}</span> of {tools.length} tools
            {selectedCategory !== 'All' && (
              <span> in <span className="font-semibold">{selectedCategory}</span></span>
            )}
            {searchTerm && (
              <span> matching "<span className="font-semibold">{searchTerm}</span>"</span>
            )}
          </p>
        </div>

        {/* All Tools Grid */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            <div className="flex items-center mb-8">
              <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">All Financial Tools</span>
            </div>
          </h2>
          
          {filteredTools.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">😕</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No tools found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your search terms or category filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                  setShowPopularOnly(false)
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredTools.map((tool) => (
                <div key={tool.id} className="group">
                  <Link href={tool.href}>
                    <div className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 h-full ${
                      tool.popular ? 'border-2 border-orange-200 dark:border-orange-800' : 'border border-gray-200 dark:border-gray-700'
                    }`}>
                      
                      {/* Popular Badge */}
                      {tool.popular && (
                        <div className="absolute -top-2 -right-2">
                          <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            <div className="flex items-center">
                              <svg className="w-3 h-3 text-orange-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                              </svg>
                              POPULAR
                            </div>
                          </span>
                        </div>
                      )}

                      {/* Difficulty Badge */}
                      <div className="absolute -top-2 -left-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          tool.difficulty === 'Basic' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                          tool.difficulty === 'Intermediate' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                          'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        }`}>
                          {tool.difficulty}
                        </span>
                      </div>

                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center">
                          <IconComponent iconName={tool.icon} className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">{tool.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed text-center line-clamp-3">
                        {tool.description}
                      </p>
                      
                      {/* Category and Users */}
                      <div className="mb-4 text-center">
                        <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded mr-2">
                          {tool.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {tool.users}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {tool.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="text-center">
                        <span className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 transform group-hover:scale-105 shadow-lg inline-block">
                          Calculate Now →
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Bottom CTA */}
        <section className="mt-20 text-center">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-2xl p-12 border border-green-200 dark:border-green-700">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              We're constantly adding new calculators and tools based on user feedback. 
              Let us know what financial calculator would help you most!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold transition duration-300 transform hover:scale-105 shadow-lg">
                <div className="flex items-center">
                  <span>Request a Calculator</span>
                  <svg className="w-5 h-5 text-yellow-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM6 10a1 1 0 01-1 1H4a1 1 0 110-2h1a1 1 0 011 1zM6.464 14.95A1 1 0 105.05 13.536l-.707.707a1 1 0 001.414 1.414l.707-.707zM10 17a1 1 0 102 0v-1a1 1 0 10-2 0v1zM14.95 13.536a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM10 5a3 3 0 000 6 3 3 0 000-6z" />
                  </svg>
                </div>
              </Link>
              <Link href="/blog" className="bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 dark:hover:bg-gray-700 transition duration-300">
                Learn More 📚
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-lg font-semibold mb-4">Finance Hub</h5>
              <p className="text-gray-400 dark:text-gray-500">Your trusted source for financial calculators, tools, and insights.</p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Popular Tools</h6>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                <li><Link href="/calculators/mortgage" className="hover:text-white">Mortgage Calculator</Link></li>
                <li><Link href="/calculators/investment" className="hover:text-white">Investment Calculator</Link></li>
                <li><Link href="/calculators/retirement" className="hover:text-white">Retirement Planning</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Resources</h6>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                <li><Link href="/blog" className="hover:text-white">Financial Blog</Link></li>
                <li><Link href="/tools" className="hover:text-white">All Tools</Link></li>
                <li><Link href="/guides" className="hover:text-white">Guides</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Company</h6>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
            <p>&copy; 2026 Finance Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}