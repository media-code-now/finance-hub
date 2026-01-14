'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { TradingViewWidget } from '@/components/TradingViewWidget'
import { EconomicCalendar } from '@/components/EconomicCalendar'
import Link from 'next/link'

export default function StocksMarketPage() {
  const [selectedSymbol, setSelectedSymbol] = useState('NASDAQ:AAPL')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const popularSymbols = [
    { symbol: 'NASDAQ:AAPL', name: 'Apple', category: 'Stocks' },
    { symbol: 'NASDAQ:TSLA', name: 'Tesla', category: 'Stocks' },
    { symbol: 'NASDAQ:MSFT', name: 'Microsoft', category: 'Stocks' },
    { symbol: 'NASDAQ:GOOGL', name: 'Google', category: 'Stocks' },
    { symbol: 'NASDAQ:AMZN', name: 'Amazon', category: 'Stocks' },
    { symbol: 'NASDAQ:META', name: 'Meta', category: 'Stocks' },
    { symbol: 'NASDAQ:NVDA', name: 'NVIDIA', category: 'Stocks' },
    { symbol: 'BITSTAMP:BTCUSD', name: 'Bitcoin', category: 'Crypto' },
    { symbol: 'BITSTAMP:ETHUSD', name: 'Ethereum', category: 'Crypto' },
    { symbol: 'BINANCE:SOLUSD', name: 'Solana', category: 'Crypto' },
    { symbol: 'BINANCE:ADAUSD', name: 'Cardano', category: 'Crypto' },
    { symbol: 'FOREXCOM:SPXUSD', name: 'S&P 500', category: 'Indices' },
    { symbol: 'FOREXCOM:NSXUSD', name: 'NASDAQ 100', category: 'Indices' },
    { symbol: 'DJ:DJI', name: 'Dow Jones', category: 'Indices' },
  ]

  const categories = ['All', 'Stocks', 'Crypto', 'Indices']
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredSymbols = selectedCategory === 'All' 
    ? popularSymbols 
    : popularSymbols.filter(s => s.category === selectedCategory)

  // Detect system theme
  useState(() => {
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(isDark ? 'dark' : 'light')
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Stock Market Analytics
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Professional trading charts, real-time data, and economic calendar. Track market events and analyze stocks with advanced technical indicators.
            </p>
          </div>
        </div>
      </section>

      {/* Main Chart Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Chart Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {popularSymbols.find(s => s.symbol === selectedSymbol)?.name || 'Chart'}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedSymbol}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {theme === 'light' ? 'Dark' : 'Light'}
                  </button>
                </div>
              </div>
            </div>

            {/* TradingView Chart */}
            <div className="p-6">
              <div className="rounded-lg overflow-hidden" style={{ height: '600px' }}>
                <TradingViewWidget
                  symbol={selectedSymbol}
                  theme={theme}
                  height={600}
                  autosize={true}
                />
              </div>
            </div>

            {/* Chart Features */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Chart Features
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { 
                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
                    label: 'Multiple Timeframes' 
                  },
                  { 
                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>,
                    label: 'Technical Indicators' 
                  },
                  { 
                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
                    label: 'Drawing Tools' 
                  },
                  { 
                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
                    label: 'Save Layouts' 
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="flex-shrink-0">{feature.icon}</span>
                    <span>{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Symbol Selector */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Select Asset to Chart
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Choose from popular stocks, cryptocurrencies, and market indices
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Symbol Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {filteredSymbols.map((item) => (
              <button
                key={item.symbol}
                onClick={() => {
                  setSelectedSymbol(item.symbol)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className={`p-4 rounded-xl transition-all ${
                  selectedSymbol === item.symbol
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-md'
                }`}
              >
                <div className="text-sm font-semibold mb-1">{item.name}</div>
                <div className={`text-xs ${
                  selectedSymbol === item.symbol 
                    ? 'text-blue-100' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {item.category}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Economic Calendar */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EconomicCalendar />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Need More Financial Tools?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore our comprehensive suite of calculators and analytical tools
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/calculators"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Financial Calculators
            </Link>
            <Link
              href="/tools"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-lg border border-gray-200 dark:border-gray-700"
            >
              More Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
