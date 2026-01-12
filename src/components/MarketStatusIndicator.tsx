'use client'

import { useEffect, useState } from 'react'

interface MarketStatus {
  name: string
  isOpen: boolean
  nextEvent: string
  timeUntil: string
  color: string
}

export function MarketStatusIndicator() {
  const [markets, setMarkets] = useState<MarketStatus[]>([])

  useEffect(() => {
    const updateMarketStatus = () => {
      const now = new Date()
      
      // Convert to ET (Eastern Time) for NYSE/NASDAQ
      const etOptions: Intl.DateTimeFormatOptions = { 
        timeZone: 'America/New_York',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        weekday: 'short'
      }
      const etTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }))
      const etHour = etTime.getHours()
      const etMinute = etTime.getMinutes()
      const etDay = etTime.getDay() // 0 = Sunday, 6 = Saturday
      
      // NYSE/NASDAQ: Mon-Fri 9:30 AM - 4:00 PM ET
      const isWeekday = etDay >= 1 && etDay <= 5
      const currentMinutes = etHour * 60 + etMinute
      const marketOpen = 9 * 60 + 30 // 9:30 AM
      const marketClose = 16 * 60 // 4:00 PM
      
      const nyseOpen = isWeekday && currentMinutes >= marketOpen && currentMinutes < marketClose
      
      // Calculate time until next event for NYSE
      let nyseNextEvent = ''
      let nyseTimeUntil = ''
      
      if (!isWeekday) {
        const daysUntilMonday = etDay === 0 ? 1 : (8 - etDay)
        nyseNextEvent = 'Opens Monday 9:30 AM ET'
        nyseTimeUntil = `${daysUntilMonday}d`
      } else if (currentMinutes < marketOpen) {
        const minutesUntilOpen = marketOpen - currentMinutes
        nyseNextEvent = 'Opens at 9:30 AM ET'
        nyseTimeUntil = `${Math.floor(minutesUntilOpen / 60)}h ${minutesUntilOpen % 60}m`
      } else if (currentMinutes < marketClose) {
        const minutesUntilClose = marketClose - currentMinutes
        nyseNextEvent = 'Closes at 4:00 PM ET'
        nyseTimeUntil = `${Math.floor(minutesUntilClose / 60)}h ${minutesUntilClose % 60}m`
      } else {
        if (etDay === 5) {
          nyseNextEvent = 'Opens Monday 9:30 AM ET'
          nyseTimeUntil = '3d'
        } else {
          nyseNextEvent = 'Opens tomorrow 9:30 AM ET'
          nyseTimeUntil = '1d'
        }
      }
      
      // Crypto: Always open
      const cryptoStatus: MarketStatus = {
        name: 'Crypto',
        isOpen: true,
        nextEvent: '24/7 Trading',
        timeUntil: 'Always Open',
        color: 'green'
      }
      
      // NYSE/NASDAQ status
      const nyseStatus: MarketStatus = {
        name: 'NYSE/NASDAQ',
        isOpen: nyseOpen,
        nextEvent: nyseNextEvent,
        timeUntil: nyseTimeUntil,
        color: nyseOpen ? 'green' : 'red'
      }
      
      setMarkets([nyseStatus, cryptoStatus])
    }

    // Initial update
    updateMarketStatus()
    
    // Update every minute
    const interval = setInterval(updateMarketStatus, 60000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {markets.map((market) => (
            <div key={market.name} className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  market.color === 'green' 
                    ? 'bg-green-500 animate-pulse' 
                    : 'bg-red-500'
                }`} />
                <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                  {market.name}
                </span>
              </div>
              <span className={`text-xs sm:text-sm font-medium ${
                market.isOpen 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {market.isOpen ? 'OPEN' : 'CLOSED'}
              </span>
              <span className="hidden sm:inline text-xs text-gray-500 dark:text-gray-400">
                •
              </span>
              <span className="hidden sm:inline text-xs text-gray-600 dark:text-gray-400">
                {market.nextEvent}
              </span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
                {market.timeUntil}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
