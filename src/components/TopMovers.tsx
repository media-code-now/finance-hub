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
      // Simulate fetching top movers data
      // In production, this would call a real API
      const mockGainers: MoverData[] = [
        { symbol: 'NVDA', name: 'NVIDIA Corp', price: 145.82, change: 8.45, changePercent: 6.15, volume: 45800000 },
        { symbol: 'AMD', name: 'Advanced Micro Devices', price: 178.32, change: 9.12, changePercent: 5.39, volume: 38200000 },
        { symbol: 'TSLA', name: 'Tesla Inc', price: 412.50, change: 18.75, changePercent: 4.76, volume: 52100000 },
        { symbol: 'META', name: 'Meta Platforms', price: 628.30, change: 24.50, changePercent: 4.06, volume: 28900000 },
        { symbol: 'NFLX', name: 'Netflix Inc', price: 542.18, change: 19.82, changePercent: 3.79, volume: 12400000 },
      ]

      const mockLosers: MoverData[] = [
        { symbol: 'AAPL', name: 'Apple Inc', price: 258.21, change: -8.45, changePercent: -3.17, volume: 39400000 },
        { symbol: 'MSFT', name: 'Microsoft Corp', price: 445.89, change: -12.34, changePercent: -2.69, volume: 24800000 },
        { symbol: 'GOOGL', name: 'Alphabet Inc', price: 192.45, change: -4.85, changePercent: -2.46, volume: 18600000 },
        { symbol: 'AMZN', name: 'Amazon.com Inc', price: 218.75, change: -5.12, changePercent: -2.29, volume: 31200000 },
        { symbol: 'JPM', name: 'JPMorgan Chase', price: 224.18, change: -4.28, changePercent: -1.87, volume: 14900000 },
      ]

      setGainers(mockGainers)
      setLosers(mockLosers)
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
