import { API_CONFIG, CACHE_CONFIG } from '@/config/api'

// Types for financial data
export interface StockQuote {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
  high: number
  low: number
  open: number
  previousClose: number
  timestamp: string
}

export interface MarketIndex {
  name: string
  symbol: string
  value: number
  change: number
  changePercent: number
  timestamp: string
}

export interface CurrencyRate {
  base: string
  target: string
  rate: number
  timestamp: string
}

export interface FinancialNews {
  title: string
  description: string
  url: string
  source: string
  publishedAt: string
  urlToImage?: string
  sentiment?: 'positive' | 'negative' | 'neutral'
}

// Cache utility for API responses
class APICache {
  private cache = new Map<string, { data: any, timestamp: number, ttl: number }>()

  set(key: string, data: any, ttl: number) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl * 1000 // Convert to milliseconds
    })
  }

  get(key: string) {
    const item = this.cache.get(key)
    if (!item) return null
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }
    
    return item.data
  }

  clear() {
    this.cache.clear()
  }
}

const cache = new APICache()

// Stock market data service
export class StockMarketService {
  
  // Get real-time stock quote
  static async getStockQuote(symbol: string): Promise<StockQuote | null> {
    const cacheKey = `stock_${symbol}`
    const cached = cache.get(cacheKey)
    if (cached) return cached

    try {
      // Try IEX Cloud first (more generous limits)
      const response = await fetch(
        `${API_CONFIG.IEX_CLOUD.BASE_URL}/stock/${symbol}/quote?token=${API_CONFIG.IEX_CLOUD.API_KEY}`
      )
      
      if (response.ok) {
        const data = await response.json()
        const quote: StockQuote = {
          symbol: data.symbol,
          price: data.latestPrice,
          change: data.change,
          changePercent: data.changePercent * 100,
          volume: data.latestVolume,
          marketCap: data.marketCap,
          high: data.high,
          low: data.low,
          open: data.open,
          previousClose: data.previousClose,
          timestamp: new Date().toISOString()
        }
        
        cache.set(cacheKey, quote, CACHE_CONFIG.STOCK_QUOTES)
        return quote
      }
      
      // Fallback to Alpha Vantage
      const alphaResponse = await fetch(
        `${API_CONFIG.ALPHA_VANTAGE.BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_CONFIG.ALPHA_VANTAGE.API_KEY}`
      )
      
      if (alphaResponse.ok) {
        const alphaData = await alphaResponse.json()
        const globalQuote = alphaData['Global Quote']
        
        const quote: StockQuote = {
          symbol: globalQuote['01. Symbol'],
          price: parseFloat(globalQuote['05. price']),
          change: parseFloat(globalQuote['09. change']),
          changePercent: parseFloat(globalQuote['10. change percent'].replace('%', '')),
          volume: parseInt(globalQuote['06. volume']),
          marketCap: 0, // Not available in Alpha Vantage basic quote
          high: parseFloat(globalQuote['03. high']),
          low: parseFloat(globalQuote['04. low']),
          open: parseFloat(globalQuote['02. open']),
          previousClose: parseFloat(globalQuote['08. previous close']),
          timestamp: new Date().toISOString()
        }
        
        cache.set(cacheKey, quote, CACHE_CONFIG.STOCK_QUOTES)
        return quote
      }
      
    } catch (error) {
      console.error('Error fetching stock quote:', error)
    }
    
    return null
  }

  // Get multiple stock quotes (batch)
  static async getBatchQuotes(symbols: string[]): Promise<StockQuote[]> {
    const cacheKey = `batch_${symbols.join(',')}`
    const cached = cache.get(cacheKey)
    if (cached) return cached

    try {
      const symbolsStr = symbols.join(',')
      const response = await fetch(
        `${API_CONFIG.IEX_CLOUD.BASE_URL}/stock/market/batch?symbols=${symbolsStr}&types=quote&token=${API_CONFIG.IEX_CLOUD.API_KEY}`
      )
      
      if (response.ok) {
        const data = await response.json()
        const quotes: StockQuote[] = Object.keys(data).map(symbol => {
          const quote = data[symbol].quote
          return {
            symbol: quote.symbol,
            price: quote.latestPrice,
            change: quote.change,
            changePercent: quote.changePercent * 100,
            volume: quote.latestVolume,
            marketCap: quote.marketCap,
            high: quote.high,
            low: quote.low,
            open: quote.open,
            previousClose: quote.previousClose,
            timestamp: new Date().toISOString()
          }
        })
        
        cache.set(cacheKey, quotes, CACHE_CONFIG.STOCK_QUOTES)
        return quotes
      }
      
    } catch (error) {
      console.error('Error fetching batch quotes:', error)
    }
    
    return []
  }

  // Get major market indices
  static async getMarketIndices(): Promise<MarketIndex[]> {
    const cacheKey = 'market_indices'
    const cached = cache.get(cacheKey)
    if (cached) return cached

    // If using demo API keys, return mock data
    if (this.isDemoMode()) {
      const mockData = this.getMockMarketIndices()
      cache.set(cacheKey, mockData, CACHE_CONFIG.MARKET_DATA)
      return mockData
    }

    const indices = ['SPY', 'QQQ', 'IWM', 'VTI'] // ETFs representing major indices
    
    try {
      const quotes = await this.getBatchQuotes(indices)
      if (quotes.length === 0) {
        // Fallback to mock data if API fails
        return this.getMockMarketIndices()
      }
      
      const marketIndices: MarketIndex[] = quotes.map(quote => ({
        name: this.getIndexName(quote.symbol),
        symbol: quote.symbol,
        value: quote.price,
        change: quote.change,
        changePercent: quote.changePercent,
        timestamp: quote.timestamp
      }))
      
      cache.set(cacheKey, marketIndices, CACHE_CONFIG.MARKET_DATA)
      return marketIndices
      
    } catch (error) {
      console.error('Error fetching market indices:', error)
      // Return mock data as fallback
      return this.getMockMarketIndices()
    }
  }

  private static getIndexName(symbol: string): string {
    const indexNames: { [key: string]: string } = {
      'SPY': 'S&P 500',
      'QQQ': 'NASDAQ-100',
      'IWM': 'Russell 2000',
      'VTI': 'Total Stock Market'
    }
    return indexNames[symbol] || symbol
  }

  // Check if running in demo mode (no real API keys)
  private static isDemoMode(): boolean {
    return API_CONFIG.ALPHA_VANTAGE.API_KEY === 'demo' && 
           API_CONFIG.IEX_CLOUD.API_KEY === 'pk_test_demo'
  }

  // Generate realistic mock market data
  private static getMockMarketIndices(): MarketIndex[] {
    const baseTime = Date.now()
    const randomVariation = () => (Math.random() - 0.5) * 4 // -2% to +2%
    
    return [
      {
        name: 'S&P 500',
        symbol: 'SPX',
        value: 4756.50 + (Math.random() - 0.5) * 100,
        change: randomVariation() * 50,
        changePercent: randomVariation(),
        timestamp: new Date(baseTime).toISOString()
      },
      {
        name: 'NASDAQ',
        symbol: 'IXIC',
        value: 14893.75 + (Math.random() - 0.5) * 200,
        change: randomVariation() * 80,
        changePercent: randomVariation(),
        timestamp: new Date(baseTime).toISOString()
      },
      {
        name: 'Dow Jones',
        symbol: 'DJI',
        value: 37689.54 + (Math.random() - 0.5) * 150,
        change: randomVariation() * 100,
        changePercent: randomVariation(),
        timestamp: new Date(baseTime).toISOString()
      },
      {
        name: 'Russell 2000',
        symbol: 'RUT',
        value: 2089.17 + (Math.random() - 0.5) * 50,
        change: randomVariation() * 25,
        changePercent: randomVariation(),
        timestamp: new Date(baseTime).toISOString()
      }
    ]
  }
}

// Currency exchange service
export class CurrencyService {
  
  static async getExchangeRate(base: string, target: string): Promise<CurrencyRate | null> {
    const cacheKey = `exchange_${base}_${target}`
    const cached = cache.get(cacheKey)
    if (cached) return cached

    try {
      // Try ExchangeRate-API first (free, no API key needed)
      const response = await fetch(
        `${API_CONFIG.EXCHANGE_RATE_API.BASE_URL}/latest/${base}`
      )
      
      if (response.ok) {
        const data = await response.json()
        if (data.rates && data.rates[target]) {
          const rate: CurrencyRate = {
            base,
            target,
            rate: data.rates[target],
            timestamp: new Date().toISOString()
          }
          
          cache.set(cacheKey, rate, CACHE_CONFIG.CURRENCY)
          return rate
        }
      }
      
      // Fallback to Fixer.io if API key available
      if (API_CONFIG.FIXER.API_KEY !== 'demo') {
        const fixerResponse = await fetch(
          `${API_CONFIG.FIXER.BASE_URL}/latest?access_key=${API_CONFIG.FIXER.API_KEY}&base=${base}&symbols=${target}`
        )
        
        if (fixerResponse.ok) {
          const fixerData = await fixerResponse.json()
          if (fixerData.rates && fixerData.rates[target]) {
            const rate: CurrencyRate = {
              base,
              target,
              rate: fixerData.rates[target],
              timestamp: new Date().toISOString()
            }
            
            cache.set(cacheKey, rate, CACHE_CONFIG.CURRENCY)
            return rate
          }
        }
      }
      
    } catch (error) {
      console.error('Error fetching exchange rate:', error)
    }
    
    // Return mock data as fallback
    return this.getMockCurrencyRate(base, target)
  }

  static async getMultipleCurrencies(base: string, targets: string[]): Promise<CurrencyRate[]> {
    const cacheKey = `multi_exchange_${base}_${targets.join(',')}`
    const cached = cache.get(cacheKey)
    if (cached) return cached

    try {
      const response = await fetch(
        `${API_CONFIG.EXCHANGE_RATE_API.BASE_URL}/latest/${base}`
      )
      
      if (response.ok) {
        const data = await response.json()
        const rates: CurrencyRate[] = targets
          .filter(target => data.rates && data.rates[target])
          .map(target => ({
            base,
            target,
            rate: data.rates[target],
            timestamp: new Date().toISOString()
          }))
        
        cache.set(cacheKey, rates, CACHE_CONFIG.CURRENCY)
        return rates
      }
      
    } catch (error) {
      console.error('Error fetching multiple currencies:', error)
    }
    
    // Return mock data as fallback
    return this.getMockMultipleCurrencies(base, targets)
  }

  // Generate mock currency rate
  private static getMockCurrencyRate(base: string, target: string): CurrencyRate {
    const mockRates: { [key: string]: number } = {
      'USD_EUR': 0.85,
      'USD_GBP': 0.73,
      'USD_JPY': 110.0,
      'USD_CAD': 1.25,
      'EUR_USD': 1.18,
      'GBP_USD': 1.37
    }
    
    const key = `${base}_${target}`
    const baseRate = mockRates[key] || 1.0
    const variation = (Math.random() - 0.5) * 0.1 // ±5% variation
    
    return {
      base,
      target,
      rate: baseRate * (1 + variation),
      timestamp: new Date().toISOString()
    }
  }

  // Generate mock multiple currency rates
  private static getMockMultipleCurrencies(base: string, targets: string[]): CurrencyRate[] {
    return targets.map(target => this.getMockCurrencyRate(base, target))
  }
}

// Financial news service
export class NewsService {
  
  static async getFinancialNews(query: string = 'finance', pageSize: number = 10): Promise<FinancialNews[]> {
    const cacheKey = `news_${query}_${pageSize}`
    const cached = cache.get(cacheKey)
    if (cached) return cached

    try {
      // Use our internal API route that fetches RSS feeds from real news sources
      const response = await fetch(
        `/api/news?category=${encodeURIComponent(query)}&limit=${pageSize}`,
        { cache: 'no-store' }
      )
      
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.articles && data.articles.length > 0) {
          const news: FinancialNews[] = data.articles.map((article: any) => ({
            title: article.title,
            description: article.description,
            url: article.url,
            source: article.source,
            publishedAt: article.publishedAt,
            urlToImage: article.urlToImage
          }))
          
          cache.set(cacheKey, news, CACHE_CONFIG.NEWS)
          return news
        }
      }
    } catch (error) {
      console.error('Error fetching news from internal API:', error)
    }

    try {
      // Use NewsAPI if API key is available
      if (API_CONFIG.NEWS_API.API_KEY !== 'demo') {
        const response = await fetch(
          `${API_CONFIG.NEWS_API.BASE_URL}/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=${pageSize}&apiKey=${API_CONFIG.NEWS_API.API_KEY}`
        )
        
        if (response.ok) {
          const data = await response.json()
          const news: FinancialNews[] = data.articles.map((article: any) => ({
            title: article.title,
            description: article.description,
            url: article.url,
            source: article.source.name,
            publishedAt: article.publishedAt,
            urlToImage: article.urlToImage
          }))
          
          cache.set(cacheKey, news, CACHE_CONFIG.NEWS)
          return news
        }
      }
      
      // Fallback to Alpha Vantage news if available
      if (API_CONFIG.ALPHA_VANTAGE.API_KEY !== 'demo') {
        const alphaResponse = await fetch(
          `${API_CONFIG.ALPHA_VANTAGE.BASE_URL}?function=NEWS_SENTIMENT&topics=financial_markets&apikey=${API_CONFIG.ALPHA_VANTAGE.API_KEY}`
        )
        
        if (alphaResponse.ok) {
          const alphaData = await alphaResponse.json()
          const news: FinancialNews[] = alphaData.feed?.slice(0, pageSize).map((item: any) => ({
            title: item.title,
            description: item.summary,
            url: item.url,
            source: item.source,
            publishedAt: item.time_published,
            sentiment: item.overall_sentiment_label?.toLowerCase()
          })) || []
          
          cache.set(cacheKey, news, CACHE_CONFIG.NEWS)
          return news
        }
      }
      
    } catch (error) {
      console.error('Error fetching financial news:', error)
    }
    
    // Return empty array if all sources fail
    return []
  }

  static async getMarketNews(): Promise<FinancialNews[]> {
    return this.getFinancialNews('markets', 10)
  }

  static async getCategoryNews(category: string): Promise<FinancialNews[]> {
    // Map category names to our API route categories
    const categoryMap: { [key: string]: string } = {
      'stocks': 'stocks',
      'cryptocurrency': 'crypto',
      'crypto': 'crypto',
      'forex': 'markets',
      'bonds': 'markets',
      'commodities': 'markets',
      'economy': 'economy',
      'technology': 'technology',
      'real-estate': 'real-estate'
    }
    
    const mappedCategory = categoryMap[category] || 'markets'
    return this.getFinancialNews(mappedCategory, 10)
  }
}

// Economic indicators service
export class EconomicService {
  
  static async getFederalFundRate(): Promise<{ rate: number, date: string } | null> {
    const cacheKey = 'fed_funds_rate'
    const cached = cache.get(cacheKey)
    if (cached) return cached

    try {
      // This would typically use FRED API or similar
      // For demo, we'll use a mock implementation
      const rate = {
        rate: 5.25, // Current fed funds rate
        date: new Date().toISOString()
      }
      
      cache.set(cacheKey, rate, CACHE_CONFIG.ECONOMIC_DATA)
      return rate
      
    } catch (error) {
      console.error('Error fetching federal funds rate:', error)
      return null
    }
  }

  static async getInflationRate(): Promise<{ rate: number, date: string } | null> {
    const cacheKey = 'inflation_rate'
    const cached = cache.get(cacheKey)
    if (cached) return cached

    try {
      // Mock implementation - in production, use official data sources
      const rate = {
        rate: 3.2, // Current inflation rate
        date: new Date().toISOString()
      }
      
      cache.set(cacheKey, rate, CACHE_CONFIG.ECONOMIC_DATA)
      return rate
      
    } catch (error) {
      console.error('Error fetching inflation rate:', error)
      return null
    }
  }
}

// Export all services
export {
  StockMarketService as StockAPI,
  CurrencyService as CurrencyAPI,
  NewsService as NewsAPI,
  EconomicService as EconomicAPI
}