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
    // Return demo data if no API key
    const demoPrice = 100 + Math.random() * 400
    const demoChange = (Math.random() - 0.5) * 10
    return {
      symbol,
      name: TICKER_SYMBOLS.find(t => t.symbol === symbol)?.name || symbol,
      price: parseFloat(demoPrice.toFixed(2)),
      change: parseFloat(demoChange.toFixed(2)),
      changePercent: parseFloat((demoChange / demoPrice * 100).toFixed(2)),
    }
  }

  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
    const response = await fetch(url, { next: { revalidate: 60 } })
    const data = await response.json()

    const quote = data['Global Quote']
    if (!quote || !quote['05. price']) {
      return null
    }

    const price = parseFloat(quote['05. price'])
    const change = parseFloat(quote['09. change'])
    const changePercent = parseFloat(quote['10. change percent'].replace('%', ''))

    return {
      symbol,
      name: TICKER_SYMBOLS.find(t => t.symbol === symbol)?.name || symbol,
      price,
      change,
      changePercent,
    }
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error)
    return null
  }
}

async function fetchFinancialModelingPrepData(symbol: string): Promise<TickerData | null> {
  try {
    // Free tier available at financialmodelingprep.com
    const url = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=demo`
    const response = await fetch(url, { next: { revalidate: 60 } })
    const data = await response.json()

    if (!data || data.length === 0) {
      return null
    }

    const quote = data[0]
    return {
      symbol,
      name: TICKER_SYMBOLS.find(t => t.symbol === symbol)?.name || symbol,
      price: quote.price,
      change: quote.change,
      changePercent: quote.changesPercentage,
    }
  } catch (error) {
    console.error(`Error fetching FMP data for ${symbol}:`, error)
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

    // Try Alpha Vantage first, then fallback to Financial Modeling Prep, then demo data
    const tickerPromises = TICKER_SYMBOLS.map(async ({ symbol }) => {
      // Try Alpha Vantage
      let data = await fetchAlphaVantageData(symbol)
      
      // Fallback to Financial Modeling Prep
      if (!data) {
        data = await fetchFinancialModelingPrepData(symbol)
      }
      
      // Fallback to demo data
      if (!data) {
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
