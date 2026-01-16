import { NextResponse } from 'next/server'

// Major indices and popular stocks to display in ticker
const TICKER_SYMBOLS = [
  { symbol: 'SPY', name: 'S&P 500' },
  { symbol: 'DIA', name: 'Dow Jones' },
  { symbol: 'QQQ', name: 'NASDAQ' },
  { symbol: 'AAPL', name: 'Apple' },
  { symbol: 'MSFT', name: 'Microsoft' },
  { symbol: 'GOOGL', name: 'Google' },
  { symbol: 'AMZN', name: 'Amazon' },
  { symbol: 'TSLA', name: 'Tesla' },
  { symbol: 'NVDA', name: 'NVIDIA' },
  { symbol: 'META', name: 'Meta' },
]

interface TickerData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

// Cache ticker data for 1 minute to avoid excessive API calls
let cachedData: TickerData[] | null = null
let cacheTime = 0
const CACHE_DURATION = 60000 // 1 minute

async function fetchAlphaVantageData(symbol: string): Promise<TickerData | null> {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY

  if (!apiKey) {
    console.log('Alpha Vantage API key not configured for ticker')
    return null
  }

  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
    const response = await fetch(url, { 
      next: { revalidate: 60 },
      headers: { 'User-Agent': 'FinanceHub/1.0' }
    })
    
    if (!response.ok) {
      console.error(`Alpha Vantage ticker API returned ${response.status}`)
      return null
    }
    
    const data = await response.json()
    
    // Check for API rate limit
    if (data['Note'] || data['Information']) {
      console.error('Alpha Vantage rate limit:', data['Note'] || data['Information'])
      return null
    }

    const quote = data['Global Quote']
    if (!quote || !quote['05. price']) {
      console.error('Invalid Alpha Vantage ticker response')
      return null
    }

    const price = parseFloat(quote['05. price'])
    const change = parseFloat(quote['09. change'])
    const changePercent = parseFloat(quote['10. change percent'].replace('%', ''))

    console.log(`✓ Ticker data for ${symbol}:`, { price, change, changePercent })

    return {
      symbol,
      name: TICKER_SYMBOLS.find(t => t.symbol === symbol)?.name || symbol,
      price,
      change,
      changePercent,
    }
  } catch (error) {
    console.error(`Error fetching Alpha Vantage ticker for ${symbol}:`, error)
    return null
  }
}

async function fetchYahooFinanceData(symbol: string): Promise<TickerData | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`
    const response = await fetch(url, { 
      next: { revalidate: 60 },
      headers: { 'User-Agent': 'Mozilla/5.0' }
    })
    
    if (!response.ok) {
      return null
    }
    
    const data = await response.json()
    const result = data?.chart?.result?.[0]
    
    if (!result) {
      return null
    }
    
    const meta = result.meta
    const price = meta.regularMarketPrice || meta.previousClose
    const previousClose = meta.chartPreviousClose || meta.previousClose
    const change = price - previousClose
    const changePercent = (change / previousClose) * 100
    
    console.log(`✓ Yahoo ticker data for ${symbol}:`, { price, change, changePercent })
    
    return {
      symbol,
      name: TICKER_SYMBOLS.find(t => t.symbol === symbol)?.name || symbol,
      price,
      change,
      changePercent,
    }
  } catch (error) {
    console.error(`Error fetching Yahoo ticker for ${symbol}:`, error)
    return null
  }
}

export async function GET() {
  try {
    // Check cache
    const now = Date.now()
    if (cachedData && (now - cacheTime) < CACHE_DURATION) {
      return NextResponse.json(cachedData)
    }

    // Try Alpha Vantage first, then fallback to Yahoo Finance, then demo data
    const tickerPromises = TICKER_SYMBOLS.map(async ({ symbol }) => {
      // Try Alpha Vantage
      let data = await fetchAlphaVantageData(symbol)
      
      // Fallback to Yahoo Finance
      if (!data) {
        console.log(`Alpha Vantage failed for ${symbol}, trying Yahoo Finance...`)
        data = await fetchYahooFinanceData(symbol)
      }
      
      // Only use demo data if all sources fail
      if (!data) {
        console.warn(`All sources failed for ${symbol}, using demo data`)
        const demoPrice = 100 + Math.random() * 400
        const demoChange = (Math.random() - 0.5) * 10
        data = {
          symbol,
          name: TICKER_SYMBOLS.find(t => t.symbol === symbol)?.name || symbol,
          price: parseFloat(demoPrice.toFixed(2)),
          change: parseFloat(demoChange.toFixed(2)),
          changePercent: parseFloat((demoChange / demoPrice * 100).toFixed(2)),
        }
      }
      
      return data
    })

    const results = await Promise.all(tickerPromises)
    const validData = results.filter((item): item is TickerData => item !== null)

    // Update cache
    cachedData = validData
    cacheTime = now

    return NextResponse.json(validData)
  } catch (error) {
    console.error('Error in ticker API:', error)
    
    // Return demo data on error
    const demoData: TickerData[] = TICKER_SYMBOLS.map(({ symbol, name }) => {
      const demoPrice = 100 + Math.random() * 400
      const demoChange = (Math.random() - 0.5) * 10
      return {
        symbol,
        name,
        price: parseFloat(demoPrice.toFixed(2)),
        change: parseFloat(demoChange.toFixed(2)),
        changePercent: parseFloat((demoChange / demoPrice * 100).toFixed(2)),
      }
    })
    
    return NextResponse.json(demoData)
  }
}
