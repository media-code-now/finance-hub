'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface IPO {
  symbol: string
  name: string
  industry: string
  status: 'upcoming' | 'rumored' | 'recent'
  date: string
  priceRange?: string
  ipoPrice?: string
  currentPrice?: string
  change?: string
  valuation: string
  exchange: string
  description: string
}

export function LiveIPOTracker() {
  const [ipos, setIPOs] = useState<IPO[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchIPOs = async () => {
    try {
      // Mock data - in production, this would fetch from an IPO API
      const mockIPOs: IPO[] = [
        {
          symbol: 'STRIPE',
          name: 'Stripe Inc.',
          industry: 'Payment Processing',
          status: 'upcoming',
          date: 'Q2 2026',
          priceRange: '$50-$55',
          valuation: '$50B',
          exchange: 'NYSE',
          description: 'Leading online payment processing platform serving millions of businesses globally'
        },
        {
          symbol: 'SPACEX',
          name: 'SpaceX',
          industry: 'Aerospace Technology',
          status: 'rumored',
          date: 'TBA 2026',
          valuation: '$180B',
          exchange: 'NASDAQ',
          description: 'Revolutionary space exploration company with satellite internet and Mars missions'
        },
        {
          symbol: 'RDDT',
          name: 'Reddit Inc.',
          industry: 'Social Media',
          status: 'recent',
          date: 'Dec 2025',
          ipoPrice: '$34.00',
          currentPrice: '$52.30',
          change: '+53.8%',
          valuation: '$6.4B',
          exchange: 'NYSE',
          description: 'Popular social news and discussion platform with 500M+ monthly active users'
        },
        {
          symbol: 'DATABRICKS',
          name: 'Databricks Inc.',
          industry: 'Data & AI',
          status: 'upcoming',
          date: 'Q3 2026',
          priceRange: '$45-$50',
          valuation: '$43B',
          exchange: 'NASDAQ',
          description: 'Unified analytics platform for big data and artificial intelligence'
        },
        {
          symbol: 'DISCORD',
          name: 'Discord Inc.',
          industry: 'Communications',
          status: 'rumored',
          date: 'Late 2026',
          valuation: '$15B',
          exchange: 'NYSE',
          description: 'Voice, video, and text communication platform with 150M+ active users'
        },
        {
          symbol: 'KLARNA',
          name: 'Klarna Bank AB',
          industry: 'Fintech',
          status: 'upcoming',
          date: 'Q1 2026',
          priceRange: '$28-$32',
          valuation: '$6.7B',
          exchange: 'NASDAQ',
          description: 'Buy now, pay later service provider with global shopping network'
        }
      ]

      setIPOs(mockIPOs)
      setLastUpdate(new Date())
      setLoading(false)
    } catch (error) {
      console.error('Error fetching IPO data:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIPOs()
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchIPOs, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      case 'rumored':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
      case 'recent':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'Upcoming'
      case 'rumored':
        return 'Rumored'
      case 'recent':
        return 'Recently Listed'
      default:
        return status
    }
  }

  const getBorderColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600'
      case 'rumored':
        return 'border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600'
      case 'recent':
        return 'border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600'
      default:
        return 'border-gray-200 dark:border-gray-700'
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-6 px-2 sm:px-0">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 backdrop-blur-xl bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-700/50">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-medium">Live • Updated {lastUpdate.toLocaleTimeString()}</span>
        </div>
        <button
          onClick={fetchIPOs}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-2 backdrop-blur-xl bg-blue-50/50 dark:bg-blue-900/20 px-4 py-2.5 rounded-full border border-blue-200/50 dark:border-blue-700/50 active:scale-95 transition-all touch-manipulation min-h-[44px]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
        {ipos.map((ipo) => (
          <div
            key={ipo.symbol}
            className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg p-5 sm:p-6 border-2 ${getBorderColor(ipo.status)} transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] touch-manipulation`}
          >
            <div className="flex items-start justify-between mb-5 gap-3">
              <div className="flex-1">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1.5 leading-tight">{ipo.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{ipo.industry}</p>
              </div>
              <span className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusBadge(ipo.status)}`}>
                {getStatusText(ipo.status)}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {ipo.status === 'recent' ? 'IPO Date:' : 'Expected Date:'}
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{ipo.date}</span>
              </div>
              
              {ipo.priceRange && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Price Range:</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{ipo.priceRange}</span>
                </div>
              )}
              
              {ipo.ipoPrice && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">IPO Price:</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{ipo.ipoPrice}</span>
                </div>
              )}
              
              {ipo.currentPrice && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Current:</span>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {ipo.currentPrice} {ipo.change && `(${ipo.change})`}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Valuation:</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{ipo.valuation}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Exchange:</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{ipo.exchange}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {ipo.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
