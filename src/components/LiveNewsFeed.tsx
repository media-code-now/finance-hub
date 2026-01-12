'use client'

import { useState, useEffect } from 'react'
import { NewsAPI } from '@/services/api'
import type { FinancialNews } from '@/services/api'
import { Toast, NewBadge } from '@/components/NewsNotifications'

interface LiveNewsFeedProps {
  searchQuery?: string
  selectedSource?: string
}

export function LiveNewsFeed({ searchQuery = '', selectedSource = 'all' }: LiveNewsFeedProps) {
  const [news, setNews] = useState<FinancialNews[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('general')
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [previousNewsCount, setPreviousNewsCount] = useState(0)

  const categories = [
    { 
      id: 'general', 
      name: 'Breaking News', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
          <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
        </svg>
      )
    },
    { 
      id: 'markets', 
      name: 'Markets', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2h-2a2 2 0 00-2-2" />
        </svg>
      )
    },
    { 
      id: 'stocks', 
      name: 'Stocks', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    { 
      id: 'crypto', 
      name: 'Cryptocurrency', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
        </svg>
      )
    },
    { 
      id: 'economy', 
      name: 'Economy', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    { 
      id: 'investing', 
      name: 'Investing', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      id: 'technology', 
      name: 'FinTech', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      id: 'real-estate', 
      name: 'Real Estate', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    }
  ]

  useEffect(() => {
    fetchNews()
    // Auto-refresh every 5 minutes for more frequent updates
    const interval = setInterval(() => {
      fetchNews(true) // Pass true to indicate auto-refresh
    }, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [selectedCategory])

  const fetchNews = async (isAutoRefresh = false) => {
    if (!isAutoRefresh) {
      setLoading(true)
    }
    try {
      let newsData: FinancialNews[]
      
      switch (selectedCategory) {
        case 'markets':
          newsData = await NewsAPI.getMarketNews()
          break
        case 'stocks':
          newsData = await NewsAPI.getCategoryNews('stocks')
          break
        case 'crypto':
          newsData = await NewsAPI.getCategoryNews('cryptocurrency')
          break
        case 'economy':
          newsData = await NewsAPI.getCategoryNews('economy')
          break
        case 'fintech':
        case 'technology':
          newsData = await NewsAPI.getCategoryNews('technology')
          break
        case 'real-estate':
          newsData = await NewsAPI.getCategoryNews('real-estate')
          break
        default:
          newsData = await NewsAPI.getMarketNews()
      }
      
      // Check for new articles if this is an auto-refresh
      if (isAutoRefresh && newsData.length > previousNewsCount && previousNewsCount > 0) {
        const newCount = newsData.length - previousNewsCount
        setToastMessage(`${newCount} new article${newCount > 1 ? 's' : ''} available`)
      }
      
      setNews(newsData)
      setPreviousNewsCount(newsData.length)
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Failed to fetch news:', error)
      // If API fails, show error state
      setNews([])
    }
    setLoading(false)
  }

  // Filter news based on search query
  const filteredNews = news.filter(article => 
    searchQuery === '' || 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.source.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const published = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - published.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <Toast 
          message={toastMessage} 
          onClose={() => setToastMessage(null)} 
        />
      )}
      {/* Category Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Live Financial News
          </h2>
          {lastUpdate && (
            <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
              <span className="whitespace-nowrap">Updated: {lastUpdate.toLocaleTimeString()}</span>
              <span className="ml-2 text-xs">(Auto-refresh: 5 min)</span>
            </div>
          )}
        </div>
        
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center space-x-2 min-w-fit ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600'
              }`}
            >
              {category.icon}
              <span className="whitespace-nowrap">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* News Feed */}
      <div className="space-y-6">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((article, index) => (
              <article key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  {article.urlToImage && (
                    <div className="h-40 sm:h-48 overflow-hidden">
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2 sm:px-3 py-1 rounded-full">
                          {article.source}
                        </span>
                        <NewBadge publishedDate={new Date(article.publishedAt)} />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTimeAgo(article.publishedAt)}
                      </span>
                    </div>
                    
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                      {article.description}
                    </p>
                    
                    <div className="inline-flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 font-medium text-sm">
                      Read Full Article
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        )}
        
        {!loading && filteredNews.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No articles found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
      
      {/* Refresh Button */}
      <div className="text-center">
        <button
          onClick={() => fetchNews()}
          disabled={loading}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className={`w-5 h-5 mr-2 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {loading ? 'Refreshing...' : 'Refresh News'}
        </button>
      </div>
    </div>
  )
}

// Trusted sources info component
export function TrustedSources() {
  const sources = [
    { 
      name: 'Reuters', 
      logo: 'https://logo.clearbit.com/reuters.com',
      description: 'Global financial news and analysis' 
    },
    { 
      name: 'Bloomberg', 
      logo: 'https://logo.clearbit.com/bloomberg.com',
      description: 'Business and market intelligence' 
    },
    { 
      name: 'Financial Times', 
      logo: 'https://logo.clearbit.com/ft.com',
      description: 'International business news' 
    },
    { 
      name: 'MarketWatch', 
      logo: 'https://logo.clearbit.com/marketwatch.com',
      description: 'Stock market and investment news' 
    },
    { 
      name: 'Yahoo Finance', 
      logo: 'https://logo.clearbit.com/finance.yahoo.com',
      description: 'Personal finance and investing' 
    },
    { 
      name: 'CNBC', 
      logo: 'https://logo.clearbit.com/cnbc.com',
      description: 'Business and economic news' 
    }
  ]
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Trusted News Sources
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {sources.map((source, index) => (
          <div key={index} className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <div className="flex justify-center mb-3">
              <img 
                src={source.logo} 
                alt={`${source.name} logo`}
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  // Fallback to text if logo fails to load
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              <div className="hidden font-bold text-lg text-gray-900 dark:text-white">
                {source.name.split(' ').map(word => word[0]).join('')}
              </div>
            </div>
            <div className="font-medium text-gray-900 dark:text-white text-sm mb-1">{source.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{source.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}