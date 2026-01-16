'use client'

import { useEffect, useState } from 'react'

interface MoverData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
}

export function TopMovers() {
  const [gainers, setGainers] = useState<MoverData[]>([])
  const [losers, setLosers] = useState<MoverData[]>([])
  const [activeTab, setActiveTab] = useState<'gainers' | 'losers'>('gainers')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTopMovers()
    const interval = setInterval(fetchTopMovers, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  const fetchTopMovers = async () => {
    try {
      // Fetch real stock data for multiple symbols
      const symbols = [
        { symbol: 'NVDA', name: 'NVIDIA Corp' },
        { symbol: 'AMD', name: 'Advanced Micro Devices' },
        { symbol: 'TSLA', name: 'Tesla Inc' },
        { symbol: 'META', name: 'Meta Platforms' },
        { symbol: 'NFLX', name: 'Netflix Inc' },
        { symbol: 'AAPL', name: 'Apple Inc' },
        { symbol: 'MSFT', name: 'Microsoft Corp' },
        { symbol: 'GOOGL', name: 'Alphabet Inc' },
        { symbol: 'AMZN', name: 'Amazon.com Inc' },
        { symbol: 'JPM', name: 'JPMorgan Chase' },
        { symbol: 'BA', name: 'Boeing Co' },
        { symbol: 'DIS', name: 'Walt Disney' },
        { symbol: 'V', name: 'Visa Inc' },
        { symbol: 'WMT', name: 'Walmart Inc' },
        { symbol: 'COIN', name: 'Coinbase Global' },
      ]

      // Fetch data for all symbols in parallel
      const promises = symbols.map(async ({ symbol, name }) => {
        try {
          const response = await fetch(`/api/price?symbol=${symbol}`)
          if (!response.ok) throw new Error('API error')
          const data = await response.json()
          
          return {
            symbol,
            name,
            price: data.price || 0,
            change: data.change || 0,
            changePercent: data.changePercent || 0,
            volume: data.volume || 0,
          }
        } catch (err) {
          console.error(`Error fetching ${symbol}:`, err)
          return null
        }
      })

      const results = await Promise.all(promises)
      const validResults = results.filter((r): r is MoverData => r !== null && r.price > 0)

      // Sort by changePercent
      const sorted = [...validResults].sort((a, b) => b.changePercent - a.changePercent)
      
      // Get top 5 gainers and losers
      const topGainers = sorted.filter(s => s.changePercent > 0).slice(0, 5)
      const topLosers = sorted.filter(s => s.changePercent < 0).slice(-5).reverse()

      setGainers(topGainers)
      setLosers(topLosers)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching top movers:', error)
      setLoading(false)
    }
  }

  const displayData = activeTab === 'gainers' ? gainers : losers

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header with Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mr-4">
            Top Movers
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('gainers')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'gainers'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Gainers
            </button>
            <button
              onClick={() => setActiveTab('losers')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'losers'
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Losers
            </button>
          </div>
          <div className="ml-auto flex items-center text-xs text-gray-500 dark:text-gray-400">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Live
          </div>
        </div>
      </div>

      {/* Movers List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {displayData.map((mover, index) => (
          <div
            key={mover.symbol}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-8 text-center">
                  <span className="text-sm font-bold text-gray-400 dark:text-gray-600">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 dark:text-white">
                    {mover.symbol}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {mover.name}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${mover.price.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Vol: {(mover.volume / 1000000).toFixed(1)}M
                  </div>
                </div>
                
                <div className="text-right min-w-[80px]">
                  <div className={`text-sm font-bold ${
                    mover.change >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {mover.change >= 0 ? '+' : ''}{mover.change.toFixed(2)}
                  </div>
                  <div className={`text-xs font-medium ${
                    mover.change >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {mover.change >= 0 ? '+' : ''}{mover.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Updated 1 minute ago • Market hours: 9:30 AM - 4:00 PM ET
        </p>
      </div>
    </div>
  )
}
