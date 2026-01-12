'use client'

import { useEffect, useState } from 'react'

interface InterestRate {
  name: string
  rate: number
  change?: number
  updated: string
  category: 'fed' | 'treasury' | 'mortgage' | 'savings' | 'cd' | 'loan' | 'credit'
}

const categoryConfig = {
  fed: {
    title: 'Federal Reserve',
    gradient: 'from-blue-600 via-blue-500 to-indigo-600',
    textColor: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  treasury: {
    title: 'Treasury Yields',
    gradient: 'from-emerald-600 via-green-500 to-teal-600',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  mortgage: {
    title: 'Mortgage Rates',
    gradient: 'from-purple-600 via-purple-500 to-pink-600',
    textColor: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  savings: {
    title: 'Savings Rates',
    gradient: 'from-teal-600 via-cyan-500 to-blue-600',
    textColor: 'text-teal-600 dark:text-teal-400',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    borderColor: 'border-teal-200 dark:border-teal-800',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  cd: {
    title: 'CD Rates',
    gradient: 'from-indigo-600 via-indigo-500 to-purple-600',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  loan: {
    title: 'Auto Loan Rates',
    gradient: 'from-orange-600 via-amber-500 to-yellow-600',
    textColor: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    )
  },
  credit: {
    title: 'Credit Card APR',
    gradient: 'from-rose-600 via-red-500 to-pink-600',
    textColor: 'text-rose-600 dark:text-rose-400',
    bgColor: 'bg-rose-50 dark:bg-rose-900/20',
    borderColor: 'border-rose-200 dark:border-rose-800',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )
  }
}

export function InterestRatesDashboard() {
  const [rates, setRates] = useState<InterestRate[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchRates()
    const interval = setInterval(fetchRates, 3600000)
    return () => clearInterval(interval)
  }, [])

  const fetchRates = async () => {
    try {
      setRefreshing(true)
      const response = await fetch('/api/rates')
      const data = await response.json()
      setRates(data)
      setLastUpdate(new Date())
      setLoading(false)
    } catch (error) {
      console.error('Error fetching interest rates:', error)
      setLoading(false)
    } finally {
      setRefreshing(false)
    }
  }

  const getCategoryRates = (category: string) => {
    return rates.filter(rate => rate.category === category)
  }

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Stylish Header */}
        <div className="text-center space-y-4">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Live Interest Rates
            </h2>
            <div className="h-1.5 w-40 mx-auto bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full animate-pulse" />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real-time rates from Federal Reserve Economic Data and market sources
          </p>
        </div>
        
        {/* Loading Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden animate-pulse border border-gray-200 dark:border-gray-700">
              <div className="h-28 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const categories = ['fed', 'treasury', 'mortgage', 'savings', 'cd', 'loan', 'credit']

  return (
    <div className="space-y-8">
      {/* Stylish Header */}
      <div className="text-center space-y-4">
        <div className="inline-block">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Live Interest Rates
          </h2>
          <div className="h-1.5 w-40 mx-auto bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full" />
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Real-time rates from Federal Reserve Economic Data and market sources
        </p>
        
        {/* Last Update & Refresh */}
        <div className="flex items-center justify-center gap-4 text-sm">
          {lastUpdate && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Updated {lastUpdate.toLocaleTimeString()}</span>
            </div>
          )}
          <button
            onClick={fetchRates}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* Rates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => {
          const categoryRates = getCategoryRates(category)
          if (categoryRates.length === 0) return null
          
          const config = categoryConfig[category as keyof typeof categoryConfig]

          return (
            <div 
              key={category} 
              className="group bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
            >
              {/* Gradient Header with Icon */}
              <div className={`relative bg-gradient-to-br ${config.gradient} p-6 text-white overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12" />
                <div className="relative flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    {config.icon}
                  </div>
                  <h3 className="text-xl font-bold">{config.title}</h3>
                </div>
              </div>

              {/* Rates List */}
              <div className="p-6 space-y-4">
                {categoryRates.map((rate, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-4 rounded-xl ${config.bgColor} border ${config.borderColor} hover:shadow-md transition-shadow`}
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {rate.name}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-3xl font-extrabold ${config.textColor}`}>
                          {rate.rate.toFixed(2)}%
                        </span>
                        {rate.change !== undefined && (
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            rate.change >= 0 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {rate.change >= 0 ? '↑' : '↓'} {Math.abs(rate.change).toFixed(2)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
