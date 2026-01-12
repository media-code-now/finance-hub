'use client'

import { useState, useEffect } from 'react'

interface EconomicEvent {
  id: string
  title: string
  date: Date
  time?: string
  category: 'fed' | 'inflation' | 'employment' | 'gdp' | 'earnings'
  impact: 'high' | 'medium' | 'low'
  description: string
  status: 'upcoming' | 'today' | 'past'
}

const categoryConfig = {
  fed: {
    name: 'Federal Reserve',
    color: 'from-blue-600 to-indigo-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    textColor: 'text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-200 dark:border-blue-700',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  inflation: {
    name: 'Inflation Data',
    color: 'from-rose-600 to-pink-600',
    bgColor: 'bg-rose-50 dark:bg-rose-900/20',
    textColor: 'text-rose-600 dark:text-rose-400',
    borderColor: 'border-rose-200 dark:border-rose-700',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  employment: {
    name: 'Employment',
    color: 'from-emerald-600 to-teal-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    borderColor: 'border-emerald-200 dark:border-emerald-700',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  gdp: {
    name: 'GDP Report',
    color: 'from-purple-600 to-indigo-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    textColor: 'text-purple-600 dark:text-purple-400',
    borderColor: 'border-purple-200 dark:border-purple-700',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  earnings: {
    name: 'Earnings Season',
    color: 'from-amber-600 to-orange-600',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    textColor: 'text-amber-600 dark:text-amber-400',
    borderColor: 'border-amber-200 dark:border-amber-700',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
}

export function EconomicCalendar() {
  const [events, setEvents] = useState<EconomicEvent[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Update current time every minute for accurate countdowns
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Generate economic events
    const now = new Date()
    const economicEvents: EconomicEvent[] = [
      // Fed Meetings 2026
      {
        id: 'fed-jan-2026',
        title: 'FOMC Meeting Decision',
        date: new Date('2026-01-28T14:00:00'),
        time: '2:00 PM ET',
        category: 'fed',
        impact: 'high',
        description: 'Federal Reserve interest rate decision and policy statement',
        status: 'upcoming'
      },
      {
        id: 'fed-mar-2026',
        title: 'FOMC Meeting Decision',
        date: new Date('2026-03-17T14:00:00'),
        time: '2:00 PM ET',
        category: 'fed',
        impact: 'high',
        description: 'Federal Reserve interest rate decision with economic projections',
        status: 'upcoming'
      },
      {
        id: 'fed-may-2026',
        title: 'FOMC Meeting Decision',
        date: new Date('2026-05-06T14:00:00'),
        time: '2:00 PM ET',
        category: 'fed',
        impact: 'high',
        description: 'Federal Reserve interest rate decision and policy statement',
        status: 'upcoming'
      },
      // CPI Reports
      {
        id: 'cpi-jan-2026',
        title: 'Consumer Price Index (CPI)',
        date: new Date('2026-01-14T08:30:00'),
        time: '8:30 AM ET',
        category: 'inflation',
        impact: 'high',
        description: 'December 2025 inflation data release',
        status: 'upcoming'
      },
      {
        id: 'cpi-feb-2026',
        title: 'Consumer Price Index (CPI)',
        date: new Date('2026-02-12T08:30:00'),
        time: '8:30 AM ET',
        category: 'inflation',
        impact: 'high',
        description: 'January 2026 inflation data release',
        status: 'upcoming'
      },
      {
        id: 'ppi-jan-2026',
        title: 'Producer Price Index (PPI)',
        date: new Date('2026-01-15T08:30:00'),
        time: '8:30 AM ET',
        category: 'inflation',
        impact: 'medium',
        description: 'December 2025 wholesale inflation data',
        status: 'upcoming'
      },
      // Employment Data
      {
        id: 'jobs-jan-2026',
        title: 'Non-Farm Payrolls',
        date: new Date('2026-01-09T08:30:00'),
        time: '8:30 AM ET',
        category: 'employment',
        impact: 'high',
        description: 'December 2025 employment report',
        status: 'past'
      },
      {
        id: 'jobs-feb-2026',
        title: 'Non-Farm Payrolls',
        date: new Date('2026-02-06T08:30:00'),
        time: '8:30 AM ET',
        category: 'employment',
        impact: 'high',
        description: 'January 2026 employment report',
        status: 'upcoming'
      },
      {
        id: 'unemployment-jan-2026',
        title: 'Unemployment Rate',
        date: new Date('2026-01-09T08:30:00'),
        time: '8:30 AM ET',
        category: 'employment',
        impact: 'high',
        description: 'December 2025 unemployment figures',
        status: 'past'
      },
      // GDP Reports
      {
        id: 'gdp-q4-2025',
        title: 'GDP Q4 2025 Advance',
        date: new Date('2026-01-29T08:30:00'),
        time: '8:30 AM ET',
        category: 'gdp',
        impact: 'high',
        description: 'Fourth quarter 2025 GDP first estimate',
        status: 'upcoming'
      },
      {
        id: 'gdp-q4-2025-second',
        title: 'GDP Q4 2025 Second Estimate',
        date: new Date('2026-02-26T08:30:00'),
        time: '8:30 AM ET',
        category: 'gdp',
        impact: 'medium',
        description: 'Fourth quarter 2025 GDP revised estimate',
        status: 'upcoming'
      },
      // Earnings Season
      {
        id: 'earnings-q4-2025',
        title: 'Q4 2025 Earnings Season',
        date: new Date('2026-01-13T09:00:00'),
        time: 'All Day',
        category: 'earnings',
        impact: 'high',
        description: 'Major banks and financial institutions report Q4 earnings',
        status: 'upcoming'
      },
      {
        id: 'earnings-tech-jan',
        title: 'Big Tech Earnings Week',
        date: new Date('2026-01-27T16:00:00'),
        time: 'After Market Close',
        category: 'earnings',
        impact: 'high',
        description: 'Apple, Microsoft, Tesla, Meta earnings reports',
        status: 'upcoming'
      }
    ]

    // Determine status based on current date
    const updatedEvents = economicEvents.map(event => {
      const eventDate = new Date(event.date)
      eventDate.setHours(0, 0, 0, 0)
      const todayDate = new Date(now)
      todayDate.setHours(0, 0, 0, 0)

      if (eventDate < todayDate) {
        return { ...event, status: 'past' as const }
      } else if (eventDate.getTime() === todayDate.getTime()) {
        return { ...event, status: 'today' as const }
      } else {
        return { ...event, status: 'upcoming' as const }
      }
    })

    // Sort by date
    updatedEvents.sort((a, b) => a.date.getTime() - b.date.getTime())
    setEvents(updatedEvents)
  }, [])

  const getCountdown = (eventDate: Date) => {
    const now = currentTime.getTime()
    const target = eventDate.getTime()
    const diff = target - now

    if (diff <= 0) return 'Event has passed'

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(e => e.category === selectedCategory)

  const upcomingEvents = filteredEvents.filter(e => e.status === 'upcoming').slice(0, 6)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-block">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Economic Calendar
          </h2>
          <div className="h-1.5 w-40 mx-auto bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full" />
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Track key economic events, Fed meetings, and market-moving data releases
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          All Events
        </button>
        {Object.entries(categoryConfig).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
              selectedCategory === key
                ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {config.icon}
            <span>{config.name}</span>
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingEvents.map((event) => {
          const config = categoryConfig[event.category]
          const isToday = event.status === 'today'
          const countdown = getCountdown(event.date)

          return (
            <div
              key={event.id}
              className={`group bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 ${
                isToday 
                  ? 'border-yellow-400 dark:border-yellow-500 ring-2 ring-yellow-400 ring-opacity-50' 
                  : config.borderColor
              }`}
            >
              {/* Header */}
              <div className={`relative bg-gradient-to-br ${config.color} p-5 text-white`}>
                {isToday && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    TODAY
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    {config.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold opacity-90 mb-1">
                      {config.name}
                    </div>
                    <h3 className="text-lg font-bold leading-tight">
                      {event.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`p-5 ${config.bgColor}`}>
                {/* Date & Time */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">
                      {event.date.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  {event.time && (
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                      {event.time}
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {event.description}
                </p>

                {/* Countdown & Impact */}
                <div className="flex items-center justify-between">
                  <div className={`text-2xl font-extrabold ${config.textColor}`}>
                    {countdown}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    event.impact === 'high' 
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      : event.impact === 'medium'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {event.impact} Impact
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* No Events Message */}
      {upcomingEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-block p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              No upcoming events in this category
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Check back later or select a different category
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
