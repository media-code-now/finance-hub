'use client'

import { useEffect, useState } from 'react'

interface PriceData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  high24h?: number
  low24h?: number
  volume?: number
  marketCap?: number
}

interface LivePriceCardProps {
  symbol: string
  name: string
  type?: 'stock' | 'crypto'
  icon?: React.ReactNode
}

export function LivePriceCard({ symbol, name, type = 'stock', icon }: LivePriceCardProps) {
  const [priceData, setPriceData] = useState<PriceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [priceChange, setPriceChange] = useState<'up' | 'down' | 'neutral'>('neutral')

  useEffect(() => {
    fetchPrice()
    
    // Update every 30 seconds for real-time feel
    const interval = setInterval(fetchPrice, 30000)
    
    return () => clearInterval(interval)
  }, [symbol, type])

  const fetchPrice = async () => {
    try {
      const response = await fetch(`/api/price?symbol=${symbol}&type=${type}`)
      const data = await response.json()
      
      // Animate price change
      if (priceData && data.price !== priceData.price) {
        setPriceChange(data.price > priceData.price ? 'up' : 'down')
        setTimeout(() => setPriceChange('neutral'), 1000)
      }
      
      setPriceData(data)
      setLoading(false)
    } catch (error) {
      console.error(`Error fetching price for ${symbol}:`, error)
      setLoading(false)
    }
  }

  const formatNumber = (num: number | undefined) => {
    if (!num) return 'N/A'
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`
    return `$${num.toFixed(2)}`
  }

  const formatVolume = (num: number | undefined) => {
    if (!num) return 'N/A'
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(2)}B`
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`
    return num.toFixed(0)
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
      </div>
    )
  }

  if (!priceData) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="text-center text-gray-500 dark:text-gray-400">
          Failed to load price data
        </div>
      </div>
    )
  }

  const isPositive = priceData.change >= 0

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {priceData.symbol}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              type === 'crypto' 
                ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' 
                : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
            }`}>
              {type === 'crypto' ? 'CRYPTO' : 'STOCK'}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{name}</p>
        </div>
        {icon && (
          <div className="text-gray-400 dark:text-gray-500">
            {icon}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="mb-4">
        <div className={`text-3xl font-bold transition-all duration-300 ${
          priceChange === 'up' ? 'text-green-600 dark:text-green-400 scale-110' :
          priceChange === 'down' ? 'text-red-600 dark:text-red-400 scale-110' :
          'text-gray-900 dark:text-white'
        }`}>
          ${priceData.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className={`flex items-center mt-2 text-sm font-semibold ${
          isPositive 
            ? 'text-green-600 dark:text-green-400' 
            : 'text-red-600 dark:text-red-400'
        }`}>
          <span className="mr-1">
            {isPositive ? '▲' : '▼'}
          </span>
          <span>
            {Math.abs(priceData.change).toFixed(2)} ({Math.abs(priceData.changePercent).toFixed(2)}%)
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        {priceData.high24h && (
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">24h High</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              ${priceData.high24h.toFixed(2)}
            </p>
          </div>
        )}
        {priceData.low24h && (
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">24h Low</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              ${priceData.low24h.toFixed(2)}
            </p>
          </div>
        )}
        {priceData.volume && (
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Volume</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {formatVolume(priceData.volume)}
            </p>
          </div>
        )}
        {priceData.marketCap && (
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Market Cap</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {formatNumber(priceData.marketCap)}
            </p>
          </div>
        )}
      </div>

      {/* Live indicator */}
      <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
        <span className="text-xs text-gray-500 dark:text-gray-400">Live • Updates every 30s</span>
      </div>
    </div>
  )
}
