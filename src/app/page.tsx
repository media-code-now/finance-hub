import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LiveMarketIndicators, LiveFinancialNews, LiveCurrencyExchange } from '@/components/LiveData'
import { CalculatorButton, NewsletterButton } from '@/components/AnalyticsButtons'
import { HeroImage, CardImage, AuthorAvatar } from '@/components/SimpleImage'
import { HERO_IMAGES, FEATURE_IMAGES, getCalculatorImage, getBlogPostImage } from '@/lib/images'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Finance Hub</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <nav className="hidden md:flex space-x-4 lg:space-x-8">
                <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Home
                </Link>
                <Link href="/calculators" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Calculators
                </Link>
                <Link href="/tools" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Tools
                </Link>
                <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  News
                </Link>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section with Background Image */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <img
          src={HERO_IMAGES.home}
          alt="Financial planning and investment concepts"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 to-purple-900/85" />
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 sm:mb-8 drop-shadow-2xl leading-tight">
                Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Financial Future</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-8 sm:mb-12 max-w-4xl mx-auto drop-shadow-lg leading-relaxed px-4">
                Unlock financial freedom with our comprehensive suite of calculators, real-time market data, 
                and expert insights. Make smarter money decisions with tools trusted by thousands.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
                <Link href="/calculators" className="group bg-white text-blue-600 px-8 sm:px-12 py-4 sm:py-5 rounded-2xl text-base sm:text-lg font-bold hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 hover:scale-105">
                  <span className="flex items-center justify-center">
                    Financial Tools
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
                <Link href="/blog" className="group bg-white/10 border-2 border-white/40 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl text-base sm:text-lg font-bold hover:bg-white/20 transition-all duration-300 backdrop-blur-lg shadow-2xl hover:shadow-white/25 transform hover:-translate-y-1">
                  <span className="flex items-center justify-center">
                    Live News Feed
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </span>
                </Link>
              </div>
              
              {/* Value Propositions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/30 hover:border-white/50 transition-all duration-300 transform hover:-translate-y-1 hover:bg-white/15">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Precision Tools</h3>
                  <p className="text-blue-100 leading-relaxed text-sm sm:text-base">Advanced calculators with real-time data for accurate financial planning</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/30 hover:border-white/50 transition-all duration-300 transform hover:-translate-y-1 hover:bg-white/15">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2h-2a2 2 0 00-2-2" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Market Intelligence</h3>
                  <p className="text-blue-100 leading-relaxed text-sm sm:text-base">Live market indicators and expert analysis to guide your decisions</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/30 hover:border-white/50 transition-all duration-300 transform hover:-translate-y-1 hover:bg-white/15">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Secure & Private</h3>
                  <p className="text-blue-100 leading-relaxed text-sm sm:text-base">All calculations run locally in your browser - your data stays private</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Market Indicators */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LiveMarketIndicators />
        </div>
      </section>

      {/* Featured Financial Tools - Most Popular */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Financial Tools
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Precision calculators trusted by thousands for important financial decisions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Mortgage Calculator",
                description: "Calculate monthly payments, total interest, and find your perfect home loan",
                icon: "home",
                href: "/calculators/mortgage",
                popular: true,
                users: "50K+ users"
              },
              {
                title: "Investment Calculator", 
                description: "Plan your portfolio and track potential returns with compound growth",
                icon: "trending",
                href: "/calculators/investment",
                popular: true,
                users: "35K+ users"
              },
              {
                title: "Loan Calculator",
                description: "Get exact payments for auto, personal, and business loans",
                icon: "card",
                href: "/calculators/loan",
                popular: false,
                users: "28K+ users"
              },
              {
                title: "Retirement Planner",
                description: "See if you're on track for your retirement goals",
                icon: "savings",
                href: "/calculators/retirement",
                popular: true,
                users: "42K+ users"
              }
            ].map((calc, index) => {
              const getIcon = (iconType: string) => {
                const iconMap: { [key: string]: React.ReactElement } = {
                  home: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
                  trending: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
                  card: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
                  savings: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                }
                return iconMap[iconType] || iconMap.home
              }
              
              const getCalculatorImage = (type: string) => {
                const imageMap: { [key: string]: string } = {
                  'Mortgage Calculator': FEATURE_IMAGES.mortgage,
                  'Investment Calculator': FEATURE_IMAGES.investment,
                  'Loan Calculator': FEATURE_IMAGES.loan,
                  'Savings Calculator': FEATURE_IMAGES.savings
                }
                return imageMap[type] || FEATURE_IMAGES.mortgage
              }
              
              return (
                <div key={index} className={`group relative overflow-hidden ${calc.popular ? 'bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-800' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'} rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}>
                  {calc.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <CardImage
                      src={getCalculatorImage(calc.title)}
                      alt={`${calc.title} - Financial planning tool`}
                      className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                      aspectRatio="16:9"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
                        {getIcon(calc.icon)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{calc.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">{calc.description}</p>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                        {calc.users}
                      </span>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <CalculatorButton 
                      href={calc.href} 
                      title={calc.title}
                      className={`w-full text-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${calc.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg' : 'bg-gray-800 hover:bg-gray-700 text-white dark:bg-gray-700 dark:hover:bg-gray-600'} transform hover:scale-105`}
                    >
                      Start Calculating →
                    </CalculatorButton>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Call-to-Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-8 border border-blue-200 dark:border-blue-700">
              <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Take Control of Your Finances</h4>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">Explore our complete suite of financial calculators and planning tools</p>
              <Link href="/calculators" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-medium transition duration-200 shadow-sm">
                View All Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Financial News & Insights */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Market Intelligence
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Expert analysis, market trends, and actionable financial insights
            </p>
          </div>
          
          {/* Live News and Currency Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <LiveFinancialNews />
            </div>
            <div>
              <LiveCurrencyExchange />
            </div>
          </div>
          
          {/* Featured Financial Content & Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Featured Article */}
            <div className="lg:row-span-2">
              <article className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden h-full group hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <CardImage
                    src={FEATURE_IMAGES.investment}
                    alt="2026 Investment Market Analysis"
                    className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                    aspectRatio="16:9"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-600/40 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold border border-white/30">
                      FEATURED ANALYSIS
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2h-2a2 2 0 00-2-2" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-3">Market Analysis • Featured</div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    2026 Investment Outlook: AI, Clean Energy & Market Predictions
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Our comprehensive analysis of emerging investment opportunities, market volatility predictions,
                    and strategic portfolio recommendations for the evolving financial landscape.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <AuthorAvatar
                        name="Sarah Chen"
                        size="sm"
                        className="border-2 border-white shadow-md"
                      />
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">Sarah Chen</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Lead Market Analyst</div>
                      </div>
                    </div>
                    <Link
                      href="/blog/2026-investment-outlook"
                      className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition-colors group"
                    >
                      Read Analysis
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            </div>
            
            {/* News Cards */}
            <div className="space-y-6">
              <article className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-700">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                    <CardImage
                      src={FEATURE_IMAGES.business}
                      alt="Fed Rate Decisions"
                      className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                      aspectRatio="square"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1 uppercase tracking-wider">CENTRAL BANKING</div>
                    <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Fed Signals Potential Rate Cuts in Q2 2024
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Federal Reserve officials hint at monetary policy adjustments...</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</span>
                      <Link href="/news/fed-rate-signals" className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors">
                        Read more →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>

              <article className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-700">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                    <CardImage
                      src={FEATURE_IMAGES.technology}
                      alt="Crypto Market Update"
                      className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                      aspectRatio="square"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold mb-1 uppercase tracking-wider">CRYPTOCURRENCY</div>
                    <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      Bitcoin ETFs Drive Institutional Adoption
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Major financial institutions increase crypto exposure through ETF products...</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">4 hours ago</span>
                      <Link href="/news/bitcoin-etf-adoption" className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-semibold transition-colors">
                        Read more →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>

              <article className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-700">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                    <CardImage
                      src={FEATURE_IMAGES.energy}
                      alt="Green Investment Trends"
                      className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                      aspectRatio="square"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-green-600 dark:text-green-400 font-semibold mb-1 uppercase tracking-wider">SUSTAINABLE FINANCE</div>
                    <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      ESG Funds Reach $50B Milestone in 2024
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Environmental and social investing continues strong growth trajectory...</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">6 hours ago</span>
                      <Link href="/news/esg-funds-milestone" className="text-xs text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-semibold transition-colors">
                        Read more →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
          
          {/* Newsletter Signup CTA with Analytics */}
          <div className="mt-16 bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 text-white text-center">
            <h4 className="text-2xl font-semibold mb-4">Weekly Market Intelligence</h4>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join 25,000+ professionals who receive our curated market analysis and financial insights.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <NewsletterButton 
                source="homepage_news_section"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 whitespace-nowrap"
              >
                Subscribe Free
              </NewsletterButton>
            </div>
            <p className="text-blue-200 text-sm mt-3">No spam, unsubscribe anytime. Privacy policy protected.</p>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/blog" className="bg-blue-600 dark:bg-blue-700 text-white px-10 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-300 transform hover:scale-105 shadow-lg">
              Explore All Articles 📚
            </Link>
          </div>
        </div>
      </section>

      {/* Call-to-Action Sections */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left CTA - Calculators */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-8 border border-green-200 dark:border-green-700">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Free Financial Calculators</h4>
                  <p className="text-green-700 dark:text-green-300">Trusted by 50K+ users monthly</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Make confident financial decisions with our suite of professional-grade calculators. 
                From mortgages to retirement planning, get precise calculations instantly.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-green-700 dark:text-green-300">
                  <span className="mr-3">✓</span>
                  <span>15+ specialized calculators</span>
                </div>
                <div className="flex items-center text-green-700 dark:text-green-300">
                  <span className="mr-3">✓</span>
                  <span>Real-time market data integration</span>
                </div>
                <div className="flex items-center text-green-700 dark:text-green-300">
                  <span className="mr-3">✓</span>
                  <span>100% free, no registration required</span>
                </div>
              </div>
              <Link href="/calculators" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold transition duration-300 transform hover:scale-105 shadow-lg block text-center">
                Start Calculating →
              </Link>
            </div>
            
            {/* Right CTA - Expert Resources */}
            <div className="bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900/30 dark:to-slate-900/30 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-gray-900 dark:text-white">Expert Financial Guidance</h4>
                  <p className="text-gray-700 dark:text-gray-300">Learn from certified professionals</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Access comprehensive guides, market analysis, and educational content created by 
                certified financial planners and market experts.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-purple-700 dark:text-purple-300">
                  <span className="mr-3">✓</span>
                  <span>Weekly market analysis & trends</span>
                </div>
                <div className="flex items-center text-purple-700 dark:text-purple-300">
                  <span className="mr-3">✓</span>
                  <span>Step-by-step financial guides</span>
                </div>
                <div className="flex items-center text-purple-700 dark:text-purple-300">
                  <span className="mr-3">✓</span>
                  <span>Expert interviews & insights</span>
                </div>
              </div>
              <Link href="/blog" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-bold transition duration-300 transform hover:scale-105 shadow-lg block text-center">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-lg font-semibold mb-4">Finance Hub</h5>
              <p className="text-gray-400 dark:text-gray-500">Your trusted source for financial calculators, tools, and insights.</p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Calculators</h6>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                <li><Link href="/calculators/mortgage" className="hover:text-white">Mortgage Calculator</Link></li>
                <li><Link href="/calculators/investment" className="hover:text-white">Investment Calculator</Link></li>
                <li><Link href="/calculators/retirement" className="hover:text-white">Retirement Planning</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Resources</h6>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                <li><Link href="/blog" className="hover:text-white">Live Financial News</Link></li>
                <li><Link href="/tools" className="hover:text-white">Tools</Link></li>
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
  )
}