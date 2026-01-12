'use client'

import { useEffect, useState } from 'react'

interface TickerData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

export function LiveStockTicker() {
  const [tickerData, setTickerData] = useState<TickerData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        const response = await fetch('/api/ticker')
        const data = await response.json()
        setTickerData(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching ticker data:', error)
        setLoading(false)
      }
    }

    // Initial fetch
    fetchTickerData()

    // Update every 60 seconds
    const interval = setInterval(fetchTickerData, 60000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-2 overflow-hidden">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Loading market data...
        </div>
      </div>
    )
  }

  // Duplicate the data to create seamless loop
  const duplicatedData = [...tickerData, ...tickerData]

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700 overflow-hidden relative">
      <div className="ticker-wrapper">
        <div className="ticker-content">
          {duplicatedData.map((item, index) => (
            <div
              key={`${item.symbol}-${index}`}
              className="ticker-item inline-flex items-center px-6 py-2"
            >
              <span className="font-bold text-gray-900 dark:text-white mr-2">
                {item.symbol}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-3">
                {item.name}
              </span>
              <span className="font-semibold text-gray-900 dark:text-white mr-2">
                ${item.price.toFixed(2)}
              </span>
              <span
                className={`text-sm font-medium ${
                  item.change >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {item.change >= 0 ? '▲' : '▼'} {Math.abs(item.change).toFixed(2)} (
                {Math.abs(item.changePercent).toFixed(2)}%)
              </span>
              <span className="mx-4 text-gray-300 dark:text-gray-600">|</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ticker-wrapper {
          width: 100%;
          overflow: hidden;
        }

        .ticker-content {
          display: inline-flex;
          animation: scroll 40s linear infinite;
          white-space: nowrap;
        }

        .ticker-item {
          flex-shrink: 0;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .ticker-content:hover {
          animation-play-state: paused;
        }

        /* Ensure smooth transition at loop point */
        @media (prefers-reduced-motion: reduce) {
          .ticker-content {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}
