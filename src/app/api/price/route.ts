import { NextResponse } from 'next/server'

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

// Cache price data for 30 seconds to avoid excessive API calls
let cachedData: { [key: string]: { data: PriceData, time: number } } = {}
const CACHE_DURATION = 30000 // 30 seconds

async function fetchAlphaVantagePrice(symbol: string): Promise<PriceData | null> {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY

  if (!apiKey) {
    return null
  }

  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
    const response = await fetch(url, { next: { revalidate: 30 } })
    const data = await response.json()

    const quote = data['Global Quote']
    if (!quote || !quote['05. price']) {
      return null
    }

    const price = parseFloat(quote['05. price'])
    const change = parseFloat(quote['09. change'])
    const changePercent = parseFloat(quote['10. change percent'].replace('%', ''))
    const high = parseFloat(quote['03. high'])
    const low = parseFloat(quote['04. low'])
    const volume = parseFloat(quote['06. volume'])

    return {
      symbol,
      name: symbol,
      price,
      change,
      changePercent,
      high24h: high,
      low24h: low,
      volume,
    }
  } catch (error) {
    console.error(`Error fetching Alpha Vantage data for ${symbol}:`, error)
    return null
  }
}

async function fetchCryptoPrice(symbol: string): Promise<PriceData | null> {
  try {
    // CoinGecko API (free, no key required)
    const coinId = symbol.toLowerCase()
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`
    const response = await fetch(url, { next: { revalidate: 30 } })
    const data = await response.json()

    if (!data[coinId]) {
      return null
    }

    const coinData = data[coinId]
    return {
      symbol: symbol.toUpperCase(),
      name: symbol,
      price: coinData.usd,
      change: (coinData.usd * coinData.usd_24h_change) / 100,
      changePercent: coinData.usd_24h_change,
      volume: coinData.usd_24h_vol,
      marketCap: coinData.usd_market_cap,
    }
  } catch (error) {
    console.error(`Error fetching crypto data for ${symbol}:`, error)
    return null
  }
}

function generateDemoData(symbol: string, name: string): PriceData {
  const basePrice = Math.random() * 500 + 50
  const change = (Math.random() - 0.5) * 20
  const changePercent = (change / basePrice) * 100

  return {
    symbol,
    name,
    price: parseFloat(basePrice.toFixed(2)),
    change: parseFloat(change.toFixed(2)),
    changePercent: parseFloat(changePercent.toFixed(2)),
    high24h: parseFloat((basePrice + Math.random() * 10).toFixed(2)),
    low24h: parseFloat((basePrice - Math.random() * 10).toFixed(2)),
    volume: Math.floor(Math.random() * 10000000),
    marketCap: Math.floor(Math.random() * 1000000000),
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol')
  const type = searchParams.get('type') || 'stock' // 'stock' or 'crypto'

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 })
  }

  // Check cache
  const cacheKey = `${type}-${symbol}`
  const now = Date.now()
  if (cachedData[cacheKey] && (now - cachedData[cacheKey].time) < CACHE_DURATION) {
    return NextResponse.json(cachedData[cacheKey].data)
  }

  try {
    let priceData: PriceData | null = null

    if (type === 'crypto') {
      priceData = await fetchCryptoPrice(symbol)
    } else {
      priceData = await fetchAlphaVantagePrice(symbol)
    }

    // Fallback to demo data
    if (!priceData) {
      priceData = generateDemoData(symbol, symbol)
    }

    // Update cache
    cachedData[cacheKey] = {
      data: priceData,
      time: now,
    }

    return NextResponse.json(priceData)
  } catch (error) {
    console.error('Error in price API:', error)
    
    // Return demo data on error
    const demoData = generateDemoData(symbol, symbol)
    return NextResponse.json(demoData)
  }
}
