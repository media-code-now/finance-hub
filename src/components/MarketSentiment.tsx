'use client'

import { useState, useEffect } from 'react'

interface SentimentIndicator {
  name: string
  value: number
  status: 'extreme-fear' | 'fear' | 'neutral' | 'greed' | 'extreme-greed'
  description: string
  change: number
  category: 'sentiment' | 'volatility' | 'options' | 'breadth'
}

export function MarketSentiment() {
  const [indicators, setIndicators] = useState<SentimentIndicator[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  useEffect(() => {
    fetchSentimentData()
    const interval = setInterval(fetchSentimentData, 300000) // Update every 5 minutes
    return () => clearInterval(interval)
  }, [])

  const fetchSentimentData = () => {
    // Simulated real-time data with slight variations - in production, fetch from API
    const now = new Date()
    const randomVariation = () => (Math.random() - 0.5) * 2 // -1 to +1 variation
    const sentiment: SentimentIndicator[] = [
      {
        name: 'Fear & Greed Index',
        value: Math.max(0, Math.min(100, 62 + randomVariation())),
        status: 'greed',
        description: 'Market showing signs of greed based on 7 key indicators',
        change: 5 + randomVariation(),
        category: 'sentiment'
      },
      {
        name: 'VIX (Volatility Index)',
        value: 18.45 + randomVariation() * 0.5,
        status: 'neutral',
        description: 'Moderate volatility - normal market conditions',
        change: -2.3 + randomVariation() * 0.3,
        category: 'volatility'
      },
      {
        name: 'Put/Call Ratio',
        value: Math.max(0.5, 0.87 + randomVariation() * 0.1),
        status: 'greed',
        description: 'More calls than puts - bullish sentiment',
        change: -0.12 + randomVariation() * 0.05,
        category: 'options'
      },
      {
        name: 'Advance/Decline Ratio',
        value: Math.max(0.5, 1.45 + randomVariation() * 0.1),
        status: 'greed',
        description: 'More stocks advancing than declining',
        change: 0.08 + randomVariation() * 0.05,
        category: 'breadth'
      },
      {
        name: 'Market Breadth',
        value: Math.max(0, Math.min(100, 68 + randomVariation())),
        status: 'greed',
        description: '68% of stocks above 200-day moving average',
        change: 3 + randomVariation(),
        category: 'breadth'
      },
      {
        name: 'High-Low Index',
        value: Math.max(0, Math.min(100, 72 + randomVariation())),
        status: 'greed',
        description: 'Strong upward momentum in the market',
        change: 4 + randomVariation(),
        category: 'breadth'
      }
    ]

    setIndicators(sentiment)
    setLastUpdate(now)
    setLoading(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'extreme-fear':
        return {
          gradient: 'from-red-600 to-red-700',
          bg: 'bg-red-50 dark:bg-red-900/20',
          text: 'text-red-600 dark:text-red-400',
          border: 'border-red-200 dark:border-red-700',
          badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
        }
      case 'fear':
        return {
          gradient: 'from-orange-600 to-red-600',
          bg: 'bg-orange-50 dark:bg-orange-900/20',
          text: 'text-orange-600 dark:text-orange-400',
          border: 'border-orange-200 dark:border-orange-700',
          badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
        }
      case 'neutral':
        return {
          gradient: 'from-gray-600 to-gray-700',
          bg: 'bg-gray-50 dark:bg-gray-800/50',
          text: 'text-gray-600 dark:text-gray-400',
          border: 'border-gray-200 dark:border-gray-700',
          badge: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
        }
      case 'greed':
        return {
          gradient: 'from-green-600 to-emerald-600',
          bg: 'bg-green-50 dark:bg-green-900/20',
          text: 'text-green-600 dark:text-green-400',
          border: 'border-green-200 dark:border-green-700',
          badge: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
        }
      case 'extreme-greed':
        return {
          gradient: 'from-emerald-600 to-green-700',
          bg: 'bg-emerald-50 dark:bg-emerald-900/20',
          text: 'text-emerald-600 dark:text-emerald-400',
          border: 'border-emerald-200 dark:border-emerald-700',
          badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
        }
      default:
        return {
          gradient: 'from-gray-600 to-gray-700',
          bg: 'bg-gray-50 dark:bg-gray-800/50',
          text: 'text-gray-600 dark:text-gray-400',
          border: 'border-gray-200 dark:border-gray-700',
          badge: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
        }
    }
  }

  const getStatusLabel = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'sentiment':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'volatility':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        )
      case 'options':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        )
      case 'breadth':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        )
    }
  }

  // Calculate overall market sentiment
  const overallSentiment = () => {
    const greedCount = indicators.filter(i => i.status === 'greed' || i.status === 'extreme-greed').length
    const fearCount = indicators.filter(i => i.status === 'fear' || i.status === 'extreme-fear').length
    const total = indicators.length

    if (greedCount > total / 2) return { label: 'Bullish', color: 'text-green-600 dark:text-green-400' }
    if (fearCount > total / 2) return { label: 'Bearish', color: 'text-red-600 dark:text-red-400' }
    return { label: 'Neutral', color: 'text-gray-600 dark:text-gray-400' }
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-3">
              Market Sentiment
            </h2>
            <div className="h-1.5 w-40 mx-auto bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full animate-pulse" />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Loading real-time sentiment indicators...
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden animate-pulse border border-gray-200 dark:border-gray-700">
              <div className="h-24 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
              <div className="p-6 space-y-3">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const sentiment = overallSentiment()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 px-4 sm:px-0">
        <div className="inline-block">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-3 px-4">
            Market Sentiment
          </h2>
          <div className="h-1.5 w-32 sm:w-40 mx-auto bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full" />
        </div>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
          Real-time analysis of market psychology and investor sentiment
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 backdrop-blur-xl bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-700/50">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">Live • Updated {lastUpdate?.toLocaleTimeString()}</span>
          </div>
          <button
            onClick={fetchSentimentData}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-2 transition-colors backdrop-blur-xl bg-blue-50/50 dark:bg-blue-900/20 px-4 py-2.5 rounded-full border border-blue-200/50 dark:border-blue-700/50 active:scale-95 touch-manipulation min-h-[44px]"
            title="Refresh sentiment data"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Data
          </button>
        </div>
      </div>

      {/* Overall Sentiment Card */}
      <div className="max-w-2xl mx-auto px-4 sm:px-0">
        <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-3xl shadow-2xl p-6 sm:p-8 text-white text-center backdrop-blur-xl">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
            <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Overall Market Sentiment</h3>
          </div>
          <div className="text-5xl sm:text-6xl font-extrabold mb-2">{sentiment.label}</div>
          <p className="text-base sm:text-lg opacity-90">
            Based on {indicators.length} key indicators
          </p>
          <div className="mt-4 text-xs sm:text-sm opacity-90 bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 inline-block border border-white/20">
            🔄 Auto-updates every 5 minutes
          </div>
        </div>
      </div>

      {/* Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
        {indicators.map((indicator, index) => {
          const colors = getStatusColor(indicator.status)
          
          return (
            <div
              key={index}
              className={`group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98] touch-manipulation border-2 ${colors.border}`}
            >
              {/* Header */}
              <div className={`relative bg-gradient-to-br ${colors.gradient} p-5 text-white`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                      {getCategoryIcon(indicator.category)}
                    </div>
                    <h3 className="text-lg font-bold leading-tight">
                      {indicator.name}
                    </h3>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase bg-white/20 backdrop-blur-sm`}>
                    {getStatusLabel(indicator.status)}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`p-5 sm:p-6 ${colors.bg}`}>
                {/* Value Display */}
                <div className="flex items-baseline justify-between mb-4">
                  <div className={`text-4xl font-extrabold ${colors.text}`}>
                    {indicator.name.includes('Ratio') || indicator.name.includes('VIX') 
                      ? indicator.value.toFixed(2) 
                      : indicator.value}
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${
                    indicator.change >= 0 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {indicator.change >= 0 ? '↑' : '↓'}
                    {Math.abs(indicator.change).toFixed(2)}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {indicator.description}
                </p>

                {/* Visual Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${colors.gradient} transition-all duration-500`}
                      style={{ 
                        width: `${indicator.name.includes('Index') || indicator.name.includes('Breadth') || indicator.name.includes('High-Low')
                          ? indicator.value 
                          : indicator.name.includes('Ratio') 
                          ? Math.min(indicator.value * 50, 100)
                          : Math.min(indicator.value * 5, 100)}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="max-w-4xl mx-auto px-4 sm:px-0">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Sentiment Scale
          </h3>
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 text-center">
              <div className="w-full h-3 bg-gradient-to-r from-red-600 to-red-500 rounded-l-full" />
              <div className="text-xs font-semibold text-red-600 dark:text-red-400 mt-2">
                Extreme Fear
              </div>
            </div>
            <div className="flex-1 text-center">
              <div className="w-full h-3 bg-gradient-to-r from-orange-500 to-orange-400" />
              <div className="text-xs font-semibold text-orange-600 dark:text-orange-400 mt-2">
                Fear
              </div>
            </div>
            <div className="flex-1 text-center">
              <div className="w-full h-3 bg-gradient-to-r from-gray-400 to-gray-500" />
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mt-2">
                Neutral
              </div>
            </div>
            <div className="flex-1 text-center">
              <div className="w-full h-3 bg-gradient-to-r from-green-400 to-green-500" />
              <div className="text-xs font-semibold text-green-600 dark:text-green-400 mt-2">
                Greed
              </div>
            </div>
            <div className="flex-1 text-center">
              <div className="w-full h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-r-full" />
              <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
                Extreme Greed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
