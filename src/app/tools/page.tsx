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
    href: '/calculators/retirement',
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
    href: '/calculators/budget',
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
    href: '/calculators/savings',
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
    href: '/calculators/debt',
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
    href: '/calculators/tax',
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
    href: '/calculators/refinance',
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
    href: '/calculators/auto-loan',
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
    icon: 'academic-cap',
    href: '/calculators/college',
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      {/* Enhanced Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(59, 130, 246) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-6 shadow-2xl">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" /></svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Financial Tools & Calculators
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive suite of professional financial calculators and planning tools. 
              Trusted by thousands, powered by certified financial experts.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">12+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Free Tools</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">100K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Users</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Free</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">Secure</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">No Data Stored</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Quick Access - Most Popular Tools */}
        <section className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <svg className="w-8 h-8 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Most Popular Tools</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTools.map((tool) => (
              <Link key={tool.id} href={tool.href} className="group relative">
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border-2 border-transparent group-hover:border-orange-400 dark:group-hover:border-orange-500">
                  <div className="absolute -top-3 -right-3">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      POPULAR
                    </span>
                  </div>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl shadow-lg">
                      <IconComponent iconName={tool.icon} className="w-10 h-10" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-4 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full font-semibold">
                      {tool.users}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-sm group-hover:text-blue-800 dark:group-hover:text-blue-300 flex items-center">
                      Try Now 
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Search and Filter Controls */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8 border border-blue-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center flex items-center justify-center">
              <svg className="w-7 h-7 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
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
              <svg className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
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
                    <div className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 h-full ${
                      tool.popular ? 'border-2 border-orange-400 dark:border-orange-600 group-hover:border-orange-500' : 'border border-gray-200 dark:border-gray-700 group-hover:border-blue-400'
                    }`}>
                      
                      {/* Popular Badge */}
                      {tool.popular && (
                        <div className="absolute -top-3 -right-3 z-10">
                          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                            POPULAR
                          </span>
                        </div>
                      )}

                      {/* Difficulty Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shadow-md ${
                          tool.difficulty === 'Basic' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                          tool.difficulty === 'Intermediate' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                          'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        }`}>
                          {tool.difficulty}
                        </span>
                      </div>

                      {/* Gradient Icon */}
                      <div className="flex justify-center mb-6 mt-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <IconComponent iconName={tool.icon} className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{tool.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed text-center line-clamp-3">
                        {tool.description}
                      </p>
                      
                      {/* Category and Users */}
                      <div className="mb-4 flex justify-center items-center gap-2 flex-wrap">
                        <span className="text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full">
                          {tool.category}
                        </span>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full">
                          {tool.users}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2 justify-center">
                          {tool.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-2.5 py-1 rounded-md border border-gray-200 dark:border-gray-600">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="text-center mt-6">
                        <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg group-hover:shadow-xl">
                          Try Now 
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
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
                Learn More
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