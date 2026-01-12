'use client'

import { useEffect, useRef } from 'react'

interface TradingViewWidgetProps {
  symbol?: string
  interval?: string
  theme?: 'light' | 'dark'
  height?: number
  width?: string
  autosize?: boolean
}

export function TradingViewWidget({
  symbol = 'NASDAQ:AAPL',
  interval = 'D',
  theme = 'light',
  height = 500,
  width = '100%',
  autosize = true,
}: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    if (scriptLoadedRef.current) return

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/tv.js'
    script.async = true
    script.onload = () => {
      scriptLoadedRef.current = true
      initWidget()
    }

    document.head.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  useEffect(() => {
    if (scriptLoadedRef.current) {
      initWidget()
    }
  }, [symbol, interval, theme])

  const initWidget = () => {
    if (containerRef.current && (window as any).TradingView) {
      // Clear existing widget
      containerRef.current.innerHTML = ''

      new (window as any).TradingView.widget({
        symbol: symbol,
        interval: interval,
        timezone: 'Etc/UTC',
        theme: theme,
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: containerRef.current.id,
        autosize: autosize,
        height: height,
        width: width,
        studies: [
          'STD;SMA',
        ],
        show_popup_button: true,
        popup_width: '1000',
        popup_height: '650',
      })
    }
  }

  return (
    <div 
      id={`tradingview-widget-${symbol.replace(':', '-')}`}
      ref={containerRef}
      className="tradingview-widget-container"
      style={{ height: autosize ? '100%' : `${height}px`, width }}
    />
  )
}

interface MiniChartWidgetProps {
  symbol?: string
  theme?: 'light' | 'dark'
  height?: number
  width?: string
}

export function MiniChartWidget({
  symbol = 'NASDAQ:AAPL',
  theme = 'light',
  height = 220,
  width = '100%',
}: MiniChartWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbol: symbol,
      width: width,
      height: height,
      locale: 'en',
      dateRange: '12M',
      colorTheme: theme,
      trendLineColor: 'rgba(41, 98, 255, 1)',
      underLineColor: 'rgba(41, 98, 255, 0.3)',
      underLineBottomColor: 'rgba(41, 98, 255, 0)',
      isTransparent: false,
      autosize: false,
      largeChartUrl: '',
    })

    if (containerRef.current) {
      containerRef.current.appendChild(script)
    }

    return () => {
      if (containerRef.current && script.parentNode) {
        containerRef.current.removeChild(script)
      }
    }
  }, [symbol, theme, height, width])

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  )
}

interface TickerTapeWidgetProps {
  symbols?: { proName: string; title: string }[]
  theme?: 'light' | 'dark'
}

export function TickerTapeWidget({
  symbols = [
    { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500' },
    { proName: 'FOREXCOM:NSXUSD', title: 'US 100' },
    { proName: 'FX_IDC:EURUSD', title: 'EUR/USD' },
    { proName: 'BITSTAMP:BTCUSD', title: 'Bitcoin' },
    { proName: 'BITSTAMP:ETHUSD', title: 'Ethereum' },
  ],
  theme = 'light',
}: TickerTapeWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbols: symbols,
      showSymbolLogo: true,
      colorTheme: theme,
      isTransparent: false,
      displayMode: 'adaptive',
      locale: 'en',
    })

    if (containerRef.current) {
      containerRef.current.appendChild(script)
    }

    return () => {
      if (containerRef.current && script.parentNode) {
        containerRef.current.removeChild(script)
      }
    }
  }, [theme])

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  )
}
