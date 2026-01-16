'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { TradingViewWidget } from '@/components/TradingViewWidget'
import { TopMovers } from '@/components/TopMovers'
import Link from 'next/link'

interface AssetData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  category: 'Stocks' | 'Crypto' | 'Indices'
  tvSymbol: string
}

export default function StockMarketPage() {
  const [selectedAsset, setSelectedAsset] = useState<AssetData>({
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 258.21,
    change: -1.75,
    changePercent: -0.67,
    category: 'Stocks',
    tvSymbol: 'NASDAQ:AAPL'
  })
  
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [timeframe, setTimeframe] = useState('1D')

  const popularAssets: AssetData[] = [
    { symbol: 'AAPL', name: 'Apple', price: 258.21, change: -1.75, changePercent: -0.67, category: 'Stocks', tvSymbol: 'NASDAQ:AAPL' },
    { symbol: 'TSLA', name: 'Tesla', price: 412.50, change: 8.32, changePercent: 2.06, category: 'Stocks', tvSymbol: 'NASDAQ:TSLA' },
    { symbol: 'MSFT', name: 'Microsoft', price: 445.89, change: 3.21, changePercent: 0.73, category: 'Stocks', tvSymbol: 'NASDAQ:MSFT' },
    { symbol: 'GOOGL', name: 'Alphabet', price: 192.45, change: -2.15, changePercent: -1.10, category: 'Stocks', tvSymbol: 'NASDAQ:GOOGL' },
    { symbol: 'AMZN', name: 'Amazon', price: 218.75, change: 4.50, changePercent: 2.10, category: 'Stocks', tvSymbol: 'NASDAQ:AMZN' },
    { symbol: 'META', name: 'Meta', price: 628.30, change: 12.40, changePercent: 2.01, category: 'Stocks', tvSymbol: 'NASDAQ:META' },
    { symbol: 'NVDA', name: 'NVIDIA', price: 145.82, change: -3.28, changePercent: -2.20, category: 'Stocks', tvSymbol: 'NASDAQ:NVDA' },
    { symbol: 'BTC', name: 'Bitcoin', price: 102450.00, change: 1250.00, changePercent: 1.24, category: 'Crypto', tvSymbol: 'BITSTAMP:BTCUSD' },
    { symbol: 'ETH', name: 'Ethereum', price: 3842.50, change: -45.20, changePercent: -1.16, category: 'Crypto', tvSymbol: 'BITSTAMP:ETHUSD' },
    { symbol: 'SPX', name: 'S&P 500', price: 5995.54, change: 28.45, changePercent: 0.48, category: 'Indices', tvSymbol: 'FOREXCOM:SPXUSD' },
  ]

  const timeframes = ['1D', '1W', '1M', '3M', '1Y', 'ALL']

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(isDark ? 'dark' : 'light')
    }
  }, [])

  const isPositive = selectedAsset.change >= 0

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />

      <div className="flex">
        {/* Sidebar - Robinhood Style */}
        <aside className="hidden lg:block w-80 border-r border-gray-200 dark:border-gray-800 h-[calc(100vh-180px)] sticky top-[180px] overflow-y-auto">
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Popular
            </h2>
            <div className="space-y-2">
              {popularAssets.map((asset) => {
                const assetPositive = asset.change >= 0
                const isSelected = selectedAsset.symbol === asset.symbol
                return (
                  <button
                    key={asset.symbol}
                    onClick={() => {
                      setSelectedAsset(asset)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      isSelected
                        ? 'bg-green-50 dark:bg-green-900/10'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 dark:text-white">
                          {asset.symbol}
                        </span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          asset.category === 'Crypto' 
                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                            : asset.category === 'Indices'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
                        }`}>
                          {asset.category === 'Indices' ? 'Index' : asset.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        ${asset.price.toLocaleString()}
                      </span>
                      <span className={`text-xs font-medium ${
                        assetPositive ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {assetPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 pt-6 pb-20">
          <div className="max-w-[1400px] mx-auto">
            {/* Asset Header - Robinhood Style */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedAsset.name}
                  </h1>
                  <p className="text-lg text-gray-500 dark:text-gray-400">
                    {selectedAsset.symbol}
                  </p>
                </div>
                
                {/* Theme Toggle - Minimalist */}
                <button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                >
                  {theme === 'light' ? (
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Price Display - Large and Clean */}
              <div className="mb-6">
                <div className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2">
                  ${selectedAsset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className={`flex items-center text-xl font-medium ${
                  isPositive ? 'text-green-500' : 'text-red-500'
                }`}>
                  <span className="mr-2">{isPositive ? '↑' : '↓'}</span>
                  <span>${Math.abs(selectedAsset.change).toFixed(2)}</span>
                  <span className="ml-2">({isPositive ? '+' : ''}{selectedAsset.changePercent.toFixed(2)}%)</span>
                  <span className="ml-3 text-sm text-gray-500 dark:text-gray-400 font-normal">Today</span>
                </div>
              </div>

              {/* Timeframe Selector - Robinhood Style */}
              <div className="flex items-center gap-1 border-b border-gray-200 dark:border-gray-800">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                      timeframe === tf
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {tf}
                    {timeframe === tf && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart - Full Width, No Border */}
            <div className="mb-12">
              <div className="rounded-lg overflow-hidden" style={{ height: '500px' }}>
                <TradingViewWidget
                  symbol={selectedAsset.tvSymbol}
                  theme={theme}
                  height={500}
                  autosize={true}
                />
              </div>
            </div>

            {/* Top Movers Section */}
            <div className="mb-12">
              <TopMovers />
            </div>

            {/* Mobile Asset Grid - Below Chart on Mobile */}
            <div className="lg:hidden mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Popular
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {popularAssets.map((asset) => {
                  const assetPositive = asset.change >= 0
                  return (
                    <button
                      key={asset.symbol}
                      onClick={() => {
                        setSelectedAsset(asset)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      className={`p-5 rounded-xl text-left transition-all border ${
                        selectedAsset.symbol === asset.symbol
                          ? 'bg-green-50 dark:bg-green-900/10 border-green-500 dark:border-green-500'
                          : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white mb-1">
                            {asset.symbol}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {asset.name}
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          asset.category === 'Crypto' 
                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                            : asset.category === 'Indices'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
                        }`}>
                          {asset.category === 'Indices' ? 'Index' : asset.category === 'Crypto' ? 'Crypto' : 'Stock'}
                        </span>
                      </div>
                      
                      <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        ${asset.price.toLocaleString()}
                      </div>
                      
                      <div className={`text-sm font-medium ${
                        assetPositive ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {assetPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* About Section - Clean and Informative */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                About {selectedAsset.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Chart Features
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Real-time price updates and historical data</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Advanced technical indicators and overlays</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Multiple timeframes from 1 day to all-time</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Drawing tools and chart customization</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Market Coverage
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>US stocks including NASDAQ, NYSE, and OTC markets</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Major cryptocurrencies and digital assets</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Global market indices and ETFs</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Forex pairs and commodities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-green-200 dark:border-gray-700">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to make smarter financial decisions?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Use our comprehensive suite of calculators to plan your financial future
            </p>
            <Link
              href="/calculators"
              className="inline-flex items-center px-8 py-4 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-all shadow-lg hover:shadow-xl"
            >
              Explore Calculators
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      </main>
    </div>
    </div>
  )
}
