'use client'

import { useState, useEffect } from 'react'
import { StockAPI, NewsAPI, CurrencyAPI } from '@/services/api'
import type { StockQuote, MarketIndex, FinancialNews, CurrencyRate } from '@/services/api'

// Live Market Indicators Widget
export function LiveMarketIndicators() {
  const [indices, setIndices] = useState<MarketIndex[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  useEffect(() => {
    fetchMarketData()
    // Refresh every 5 minutes
    const interval = setInterval(fetchMarketData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const fetchMarketData = async () => {
    try {
      const marketData = await StockAPI.getMarketIndices()
      setIndices(marketData)
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Failed to fetch market data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Market Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Market Overview
        </h3>
        {lastUpdate && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Updated: {lastUpdate.toLocaleTimeString()}
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {indices.map((index) => (
          <div key={index.symbol} className="text-center">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {index.name}
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              ${index.value.toFixed(2)}
            </div>
            <div className={`text-sm font-medium ${
              index.change >= 0 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} 
              ({index.changePercent.toFixed(2)}%)
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={fetchMarketData}
        className="mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 text-sm font-medium flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refresh Data
      </button>
    </div>
  )
}

// Live Financial News Widget
export function LiveFinancialNews() {
  const [news, setNews] = useState<FinancialNews[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('market')

  useEffect(() => {
    fetchNews()
  }, [category])

  const fetchNews = async () => {
    setLoading(true)
    try {
      const newsData = category === 'market' 
        ? await NewsAPI.getMarketNews()
        : await NewsAPI.getCategoryNews(category)
      setNews(newsData)
    } catch (error) {
      console.error('Failed to fetch news:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { 
      id: 'market', 
      name: 'Market', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2h-2a2 2 0 00-2-2" />
        </svg>
      )
    },
    { 
      id: 'stocks', 
      name: 'Stocks', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    { 
      id: 'crypto', 
      name: 'Crypto', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
        </svg>
      )
    },
    { 
      id: 'economy', 
      name: 'Economy', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Financial News
      </h3>
      
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
              category === cat.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600'
            }`}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {news.slice(0, 5).map((article, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:bg-gray-50 dark:hover:bg-gray-700 rounded p-2 -m-2 transition-colors"
              >
                <div className="flex gap-3">
                  {/* Thumbnail Image */}
                  {article.urlToImage && (
                    <div className="flex-shrink-0 w-24 h-24 rounded overflow-hidden bg-gray-200 dark:bg-gray-600">
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">
                      {article.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2 mb-2">
                      {article.description}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>{article.source}</span>
                      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
          
          <button
            onClick={fetchNews}
            className="w-full mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 text-sm font-medium flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh News
          </button>
        </div>
      )}
    </div>
  )
}

// Live Currency Exchange Widget
export function LiveCurrencyExchange() {
  const [rates, setRates] = useState<CurrencyRate[]>([])
  const [loading, setLoading] = useState(true)
  const [baseCurrency, setBaseCurrency] = useState('USD')

  const targetCurrencies = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF']

  useEffect(() => {
    fetchRates()
    // Refresh every hour
    const interval = setInterval(fetchRates, 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [baseCurrency])

  const fetchRates = async () => {
    try {
      const ratesData = await CurrencyAPI.getMultipleCurrencies(baseCurrency, targetCurrencies)
      setRates(ratesData)
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Currency Exchange
        </h3>
        <select
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
          className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="animate-pulse flex justify-between">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {rates.map((rate) => (
            <div key={rate.target} className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                {baseCurrency}/{rate.target}
              </span>
              <span className="font-bold text-gray-900 dark:text-white">
                {rate.rate.toFixed(4)}
              </span>
            </div>
          ))}
          
          <button
            onClick={fetchRates}
            className="w-full mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 text-sm font-medium flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Update Rates
          </button>
        </div>
      )}
    </div>
  )
}

// Stock Quote Widget
export function LiveStockQuote({ symbol }: { symbol: string }) {
  const [quote, setQuote] = useState<StockQuote | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchQuote()
    // Refresh every minute during market hours
    const interval = setInterval(fetchQuote, 60 * 1000)
    return () => clearInterval(interval)
  }, [symbol])

  const fetchQuote = async () => {
    try {
      const quoteData = await StockAPI.getStockQuote(symbol)
      setQuote(quoteData)
    } catch (error) {
      console.error('Failed to fetch stock quote:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    )
  }

  if (!quote) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="text-center text-gray-500 dark:text-gray-400">
          Unable to load {symbol} quote
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-900 dark:text-white">{quote.symbol}</h4>
        <button
          onClick={fetchQuote}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 text-xs flex items-center gap-1"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">
        ${quote.price.toFixed(2)}
      </div>
      <div className={`text-sm font-medium ${
        quote.change >= 0 
          ? 'text-green-600 dark:text-green-400' 
          : 'text-red-600 dark:text-red-400'
      }`}>
        {quote.change >= 0 ? '+' : ''}{quote.change.toFixed(2)} 
        ({quote.changePercent.toFixed(2)}%)
      </div>
    </div>
  )
}