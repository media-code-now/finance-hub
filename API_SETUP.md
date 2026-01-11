# API Setup Guide for Finance Hub

This guide will help you set up all the necessary API integrations for live financial data.

## 🔑 Required API Keys

To enable live financial data on your Finance Hub, you'll need to obtain API keys from the following providers:

### 1. Alpha Vantage (Primary Stock Data)
- **Website**: https://www.alphavantage.co/support/#api-key
- **Plan**: Free (500 API requests per day)
- **Usage**: Real-time stock quotes, market data
- **Environment Variable**: `ALPHA_VANTAGE_API_KEY`

### 2. IEX Cloud (Backup Stock Data)
- **Website**: https://iexcloud.io/pricing/
- **Plan**: Free (500K API calls per month)
- **Usage**: Backup stock data, financial metrics
- **Environment Variable**: `IEX_CLOUD_API_KEY`

### 3. Finnhub (Additional Market Data)
- **Website**: https://finnhub.io/pricing
- **Plan**: Free (60 API calls per minute)
- **Usage**: Alternative financial data source
- **Environment Variable**: `FINNHUB_API_KEY`

### 4. NewsAPI (Financial News)
- **Website**: https://newsapi.org/pricing
- **Plan**: Free (1,000 requests per day)
- **Usage**: Live financial news aggregation
- **Environment Variable**: `NEWS_API_KEY`

### 5. ExchangeRate-API (Currency Data)
- **Website**: https://exchangerate-api.com/pricing
- **Plan**: Free (1,500 requests per month)
- **Usage**: Real-time currency exchange rates
- **Environment Variable**: `EXCHANGE_RATE_API_KEY`

### 6. Google Analytics 4 (Analytics)
- **Website**: https://analytics.google.com/
- **Setup**: Create GA4 property
- **Usage**: User behavior tracking and analytics
- **Environment Variable**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`

## 📋 Setup Instructions

### Step 1: Obtain API Keys
1. Visit each provider's website above
2. Sign up for a free account
3. Generate your API keys
4. Note down each key securely

### Step 2: Create Environment File
1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your API keys:
   ```env
   # Financial Data APIs
   ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key_here
   IEX_CLOUD_API_KEY=your_iex_cloud_key_here
   FINNHUB_API_KEY=your_finnhub_key_here
   
   # News API
   NEWS_API_KEY=your_news_api_key_here
   
   # Currency Exchange API
   EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key_here
   
   # Google Analytics
   NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_measurement_id
   ```

### Step 3: Test the Setup
1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:3000 and check:
   - Live market indicators show real data
   - Financial news updates automatically
   - Currency exchange rates are current
   - Analytics tracking is active (check browser dev tools)

## 🔧 Configuration Options

### Rate Limiting
The system automatically handles rate limits for each API. Current limits:

- **Alpha Vantage**: 5 requests per minute
- **IEX Cloud**: 100 requests per second  
- **Finnhub**: 60 requests per minute
- **NewsAPI**: 1000 requests per day
- **ExchangeRate-API**: 1500 requests per month

### Caching
API responses are cached to improve performance:

- **Stock quotes**: 5 minutes
- **Market data**: 15 minutes
- **News articles**: 30 minutes
- **Currency rates**: 1 hour

### Error Handling
The system includes comprehensive fallbacks:

- If primary API fails, backup APIs are used
- Cached data is served when APIs are unavailable
- Graceful degradation to static content

## 🚀 Advanced Features

### Custom Stock Symbols
Add your preferred stocks to track by editing `/src/config/api.ts`:

```typescript
export const DEFAULT_SYMBOLS = [
  'SPY',    // S&P 500 ETF
  'QQQ',    // NASDAQ ETF
  'DIA',    // Dow Jones ETF
  'BTC-USD', // Bitcoin
  'YOUR_SYMBOL_HERE'
]
```

### News Categories
Customize financial news categories in `/src/services/api.ts`:

```typescript
const categories = [
  'business',
  'technology',
  'your_custom_category'
]
```

### Analytics Events
Track custom user interactions by adding to `/src/lib/analytics.ts`:

```typescript
export const trackCustomEvent = (eventName: string, parameters?: any) => {
  // Your custom tracking logic
}
```

## 🆘 Troubleshooting

### API Keys Not Working
1. Verify keys are correctly copied (no extra spaces)
2. Check if free tier limits are exceeded
3. Ensure `.env.local` file exists in project root
4. Restart the development server

### Data Not Loading
1. Check browser console for error messages
2. Verify internet connection
3. Test individual API endpoints
4. Check rate limit status

### Analytics Not Tracking
1. Verify GA4 Measurement ID format (starts with 'G-')
2. Check if ad blockers are interfering
3. Ensure GDPR compliance if applicable

## 📞 Support

If you encounter issues:

1. Check the browser console for errors
2. Review API provider documentation
3. Test API keys with their official tools
4. Ensure all environment variables are set

## 🔒 Security Notes

- Never commit `.env.local` to version control
- Use different API keys for development and production
- Regularly rotate API keys for security
- Monitor API usage to prevent unexpected charges
- Consider upgrading to paid plans for production use

## 📈 Monitoring Usage

Keep track of your API usage:

- **Alpha Vantage**: Check dashboard for daily usage
- **IEX Cloud**: Monitor monthly consumption
- **NewsAPI**: Track daily request count
- **ExchangeRate-API**: Monitor monthly limits

Upgrade to paid plans when approaching limits for uninterrupted service.