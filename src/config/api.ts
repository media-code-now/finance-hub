// API Configuration
export const API_CONFIG = {
  // Alpha Vantage - Free tier: 25 requests/day, 5 requests/minute
  ALPHA_VANTAGE: {
    BASE_URL: 'https://www.alphavantage.co/query',
    API_KEY: process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY || 'demo',
    ENDPOINTS: {
      QUOTE: 'GLOBAL_QUOTE',
      INTRADAY: 'TIME_SERIES_INTRADAY',
      DAILY: 'TIME_SERIES_DAILY',
      FOREX: 'FX_RATE',
      NEWS: 'NEWS_SENTIMENT'
    }
  },
  
  // IEX Cloud - More generous free tier
  IEX_CLOUD: {
    BASE_URL: 'https://cloud.iexapis.com/stable',
    API_KEY: process.env.NEXT_PUBLIC_IEX_CLOUD_API_KEY || 'pk_test_demo',
    ENDPOINTS: {
      QUOTE: 'stock/{symbol}/quote',
      BATCH: 'stock/market/batch',
      STATS: 'stock/{symbol}/stats',
      NEWS: 'stock/{symbol}/news'
    }
  },

  // Finnhub - Good for forex and crypto
  FINNHUB: {
    BASE_URL: 'https://finnhub.io/api/v1',
    API_KEY: process.env.NEXT_PUBLIC_FINNHUB_API_KEY || 'demo',
    ENDPOINTS: {
      QUOTE: 'quote',
      FOREX: 'forex/rates',
      CRYPTO: 'crypto/symbol',
      NEWS: 'news'
    }
  },

  // NewsAPI for financial news
  NEWS_API: {
    BASE_URL: 'https://newsapi.org/v2',
    API_KEY: process.env.NEXT_PUBLIC_NEWS_API_KEY || 'demo',
    ENDPOINTS: {
      EVERYTHING: 'everything',
      TOP_HEADLINES: 'top-headlines'
    }
  },

  // ExchangeRate-API for currency exchange
  EXCHANGE_RATE_API: {
    BASE_URL: 'https://api.exchangerate-api.com/v4',
    ENDPOINTS: {
      LATEST: 'latest',
      HISTORICAL: 'history'
    }
  },

  // Fixer.io as backup for currency
  FIXER: {
    BASE_URL: 'https://api.fixer.io/v1',
    API_KEY: process.env.NEXT_PUBLIC_FIXER_API_KEY || 'demo',
    ENDPOINTS: {
      LATEST: 'latest',
      HISTORICAL: 'historical'
    }
  }
}

// Rate limiting configuration
export const RATE_LIMITS = {
  ALPHA_VANTAGE: {
    requests_per_minute: 5,
    requests_per_day: 25
  },
  IEX_CLOUD: {
    requests_per_second: 100, // Free tier
    requests_per_month: 50000
  },
  FINNHUB: {
    requests_per_minute: 60,
    requests_per_month: 1000000
  },
  NEWS_API: {
    requests_per_day: 1000
  }
}

// Cache configuration
export const CACHE_CONFIG = {
  STOCK_QUOTES: 60, // seconds
  MARKET_DATA: 300, // 5 minutes
  NEWS: 900, // 15 minutes
  CURRENCY: 3600, // 1 hour
  ECONOMIC_DATA: 86400 // 24 hours
}