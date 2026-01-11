# Finance Hub - Copilot Instructions

## Project Overview
A comprehensive financial platform built with Next.js, TypeScript, and Tailwind CSS, featuring live financial data integration, **real-time news from major sources**, and advanced analytics tracking.

## Key Features
- **Live Financial News**: Real-time articles from Bloomberg, CNBC, Reuters, CoinDesk via RSS feeds (no API keys required!)
- **Live Financial Data**: Real-time market indicators, stock quotes, and currency exchange rates
- **Financial Calculators**: Mortgage, investment, retirement, and loan calculators with analytics tracking
- **Multi-Category News Feed**: Markets, Stocks, Crypto, Economy, Tech, Real Estate news with search and filtering
- **API Integrations**: Custom RSS aggregation API + optional Alpha Vantage, IEX Cloud, Finnhub with fallback systems
- **Analytics**: Google Analytics 4 with custom event tracking for user engagement
- **Dark Mode**: Complete theme system with persistent user preferences

## Tech Stack
- **Framework**: Next.js 16.1.1 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **News**: RSS feed aggregation from major financial outlets (Bloomberg, CNBC, WSJ, CoinDesk, etc.)
- **APIs**: Multiple financial data providers with rate limiting and caching
- **Analytics**: Google Analytics 4 integration
- **Deployment**: Static export ready

## Development Guidelines
- Use TypeScript for all new files
- Follow Next.js App Router conventions
- Implement proper error handling for API integrations
- Add analytics tracking for user interactions
- Ensure responsive design with dark mode support
- Optimize for SEO and performance

## API Configuration
Optional environment variables in `.env.local`:
- `ALPHA_VANTAGE_API_KEY` - Stock data (optional)
- `NEWS_API_KEY` - Additional news source (optional)
- `EXCHANGE_RATE_API_KEY` - Currency data (optional)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Analytics

**Note**: News feed works without any API keys using RSS feeds!

See `API_SETUP.md` for detailed configuration instructions.
See `REAL_NEWS_IMPLEMENTATION.md` for news API documentation.

## Project Status: ✅ COMPLETE
All major features implemented:
- ✅ Real live news from RSS feeds (Bloomberg, CNBC, Reuters, CoinDesk, etc.)
- ✅ Live data integration with multiple API providers
- ✅ Comprehensive financial calculators
- ✅ Multi-category news feed with search and filtering
- ✅ Google Analytics 4 integration
- ✅ Responsive design with dark mode
- ✅ Production build successful
- ✅ NO DEMO DATA - 100% real content