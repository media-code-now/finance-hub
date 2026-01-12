import { NextResponse } from 'next/server'

interface InterestRate {
  name: string
  rate: number
  change?: number
  updated: string
  category: 'fed' | 'treasury' | 'mortgage' | 'savings' | 'cd' | 'loan' | 'credit'
}

// Cache interest rates data for 1 hour (rates don't change frequently)
let cachedData: InterestRate[] | null = null
let cacheTime = 0
const CACHE_DURATION = 3600000 // 1 hour

async function fetchFederalReserveRates(): Promise<InterestRate[]> {
  try {
    // Federal Reserve Economic Data (FRED) API
    // Free API, no key required for basic data
    const apiKey = process.env.FRED_API_KEY || 'demo'
    
    const rates: InterestRate[] = []
    
    // Fed Funds Rate
    try {
      const fedResponse = await fetch(
        `https://api.stlouisfed.org/fred/series/observations?series_id=DFF&api_key=${apiKey}&file_type=json&limit=1&sort_order=desc`,
        { next: { revalidate: 3600 } }
      )
      const fedData = await fedResponse.json()
      
      if (fedData.observations && fedData.observations.length > 0) {
        rates.push({
          name: 'Federal Funds Rate',
          rate: parseFloat(fedData.observations[0].value),
          updated: fedData.observations[0].date,
          category: 'fed'
        })
      }
    } catch (error) {
      console.error('Error fetching Fed Funds Rate:', error)
    }

    // 10-Year Treasury
    try {
      const treasury10Response = await fetch(
        `https://api.stlouisfed.org/fred/series/observations?series_id=DGS10&api_key=${apiKey}&file_type=json&limit=2&sort_order=desc`,
        { next: { revalidate: 3600 } }
      )
      const treasury10Data = await treasury10Response.json()
      
      if (treasury10Data.observations && treasury10Data.observations.length >= 2) {
        const current = parseFloat(treasury10Data.observations[0].value)
        const previous = parseFloat(treasury10Data.observations[1].value)
        
        rates.push({
          name: '10-Year Treasury',
          rate: current,
          change: current - previous,
          updated: treasury10Data.observations[0].date,
          category: 'treasury'
        })
      }
    } catch (error) {
      console.error('Error fetching 10-Year Treasury:', error)
    }

    // 2-Year Treasury
    try {
      const treasury2Response = await fetch(
        `https://api.stlouisfed.org/fred/series/observations?series_id=DGS2&api_key=${apiKey}&file_type=json&limit=2&sort_order=desc`,
        { next: { revalidate: 3600 } }
      )
      const treasury2Data = await treasury2Response.json()
      
      if (treasury2Data.observations && treasury2Data.observations.length >= 2) {
        const current = parseFloat(treasury2Data.observations[0].value)
        const previous = parseFloat(treasury2Data.observations[1].value)
        
        rates.push({
          name: '2-Year Treasury',
          rate: current,
          change: current - previous,
          updated: treasury2Data.observations[0].date,
          category: 'treasury'
        })
      }
    } catch (error) {
      console.error('Error fetching 2-Year Treasury:', error)
    }

    // 30-Year Treasury
    try {
      const treasury30Response = await fetch(
        `https://api.stlouisfed.org/fred/series/observations?series_id=DGS30&api_key=${apiKey}&file_type=json&limit=2&sort_order=desc`,
        { next: { revalidate: 3600 } }
      )
      const treasury30Data = await treasury30Response.json()
      
      if (treasury30Data.observations && treasury30Data.observations.length >= 2) {
        const current = parseFloat(treasury30Data.observations[0].value)
        const previous = parseFloat(treasury30Data.observations[1].value)
        
        rates.push({
          name: '30-Year Treasury',
          rate: current,
          change: current - previous,
          updated: treasury30Data.observations[0].date,
          category: 'treasury'
        })
      }
    } catch (error) {
      console.error('Error fetching 30-Year Treasury:', error)
    }

    // 30-Year Mortgage Rate
    try {
      const mortgage30Response = await fetch(
        `https://api.stlouisfed.org/fred/series/observations?series_id=MORTGAGE30US&api_key=${apiKey}&file_type=json&limit=2&sort_order=desc`,
        { next: { revalidate: 3600 } }
      )
      const mortgage30Data = await mortgage30Response.json()
      
      if (mortgage30Data.observations && mortgage30Data.observations.length >= 2) {
        const current = parseFloat(mortgage30Data.observations[0].value)
        const previous = parseFloat(mortgage30Data.observations[1].value)
        
        rates.push({
          name: '30-Year Fixed Mortgage',
          rate: current,
          change: current - previous,
          updated: mortgage30Data.observations[0].date,
          category: 'mortgage'
        })
      }
    } catch (error) {
      console.error('Error fetching 30-Year Mortgage Rate:', error)
    }

    // 15-Year Mortgage Rate
    try {
      const mortgage15Response = await fetch(
        `https://api.stlouisfed.org/fred/series/observations?series_id=MORTGAGE15US&api_key=${apiKey}&file_type=json&limit=2&sort_order=desc`,
        { next: { revalidate: 3600 } }
      )
      const mortgage15Data = await mortgage15Response.json()
      
      if (mortgage15Data.observations && mortgage15Data.observations.length >= 2) {
        const current = parseFloat(mortgage15Data.observations[0].value)
        const previous = parseFloat(mortgage15Data.observations[1].value)
        
        rates.push({
          name: '15-Year Fixed Mortgage',
          rate: current,
          change: current - previous,
          updated: mortgage15Data.observations[0].date,
          category: 'mortgage'
        })
      }
    } catch (error) {
      console.error('Error fetching 15-Year Mortgage Rate:', error)
    }

    return rates
  } catch (error) {
    console.error('Error in fetchFederalReserveRates:', error)
    return []
  }
}

function generateDemoRates(): InterestRate[] {
  const today = new Date().toISOString().split('T')[0]
  
  return [
    {
      name: 'Federal Funds Rate',
      rate: 5.33,
      updated: today,
      category: 'fed'
    },
    {
      name: '2-Year Treasury',
      rate: 4.45,
      change: -0.05,
      updated: today,
      category: 'treasury'
    },
    {
      name: '10-Year Treasury',
      rate: 4.25,
      change: 0.03,
      updated: today,
      category: 'treasury'
    },
    {
      name: '30-Year Treasury',
      rate: 4.42,
      change: 0.01,
      updated: today,
      category: 'treasury'
    },
    {
      name: '30-Year Fixed Mortgage',
      rate: 6.82,
      change: -0.12,
      updated: today,
      category: 'mortgage'
    },
    {
      name: '15-Year Fixed Mortgage',
      rate: 6.10,
      change: -0.08,
      updated: today,
      category: 'mortgage'
    },
    {
      name: 'High-Yield Savings',
      rate: 4.50,
      updated: today,
      category: 'savings'
    },
    {
      name: '1-Year CD',
      rate: 5.25,
      updated: today,
      category: 'cd'
    },
    {
      name: '5-Year CD',
      rate: 4.75,
      updated: today,
      category: 'cd'
    },
    {
      name: '48-Month Auto Loan',
      rate: 7.18,
      updated: today,
      category: 'loan'
    },
    {
      name: '60-Month Auto Loan',
      rate: 7.45,
      updated: today,
      category: 'loan'
    },
    {
      name: 'Credit Card Average APR',
      rate: 24.37,
      updated: today,
      category: 'credit'
    }
  ]
}

export async function GET() {
  try {
    // Check cache
    const now = Date.now()
    if (cachedData && (now - cacheTime) < CACHE_DURATION) {
      return NextResponse.json(cachedData)
    }

    // Fetch real data
    let rates = await fetchFederalReserveRates()
    
    // Add estimated rates for other categories
    const today = new Date().toISOString().split('T')[0]
    
    // If we got Fed/Treasury/Mortgage data, add estimated rates for others
    if (rates.length > 0) {
      const additionalRates: InterestRate[] = [
        {
          name: 'High-Yield Savings',
          rate: 4.50,
          updated: today,
          category: 'savings'
        },
        {
          name: '1-Year CD',
          rate: 5.25,
          updated: today,
          category: 'cd'
        },
        {
          name: '5-Year CD',
          rate: 4.75,
          updated: today,
          category: 'cd'
        },
        {
          name: '48-Month Auto Loan',
          rate: 7.18,
          updated: today,
          category: 'loan'
        },
        {
          name: '60-Month Auto Loan',
          rate: 7.45,
          updated: today,
          category: 'loan'
        },
        {
          name: 'Credit Card Average APR',
          rate: 24.37,
          updated: today,
          category: 'credit'
        }
      ]
      
      rates = [...rates, ...additionalRates]
    } else {
      // Fallback to demo data
      rates = generateDemoRates()
    }

    // Update cache
    cachedData = rates
    cacheTime = now

    return NextResponse.json(rates)
  } catch (error) {
    console.error('Error in interest rates API:', error)
    
    // Return demo data on error
    const demoRates = generateDemoRates()
    return NextResponse.json(demoRates)
  }
}
