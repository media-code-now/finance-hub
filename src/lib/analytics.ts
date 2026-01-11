import { GoogleAnalytics } from '@next/third-parties/google'

// Google Analytics 4 Configuration
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Event tracking functions
export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag(...args)
  }
}

// Page view tracking
export const pageview = (url: string) => {
  gtag('config', GA_MEASUREMENT_ID, {
    page_location: url,
  })
}

// Custom event tracking
export const event = (
  eventName: string,
  parameters?: {
    action?: string
    category?: string
    label?: string
    value?: number
    [key: string]: any
  }
) => {
  gtag('event', eventName, {
    event_category: parameters?.category,
    event_label: parameters?.label,
    value: parameters?.value,
    ...parameters
  })
}

// Financial tool usage tracking
export const trackCalculatorUsage = (calculatorType: string, inputs: any) => {
  event('calculator_used', {
    category: 'Tools',
    label: calculatorType,
    calculator_type: calculatorType,
    custom_parameters: {
      loan_amount: inputs.loanAmount,
      interest_rate: inputs.interestRate,
      term_years: inputs.termYears
    }
  })
}

export const trackNewsClick = (newsSource: string, category: string) => {
  event('news_click', {
    category: 'Engagement',
    label: newsSource,
    news_source: newsSource,
    news_category: category
  })
}

export const trackMarketDataView = (symbols: string[]) => {
  event('market_data_view', {
    category: 'Data',
    label: symbols.join(','),
    symbols: symbols.length
  })
}

export const trackNewsletterSignup = (source: string) => {
  event('newsletter_signup', {
    category: 'Conversion',
    label: source,
    signup_source: source
  })
}

// Blog engagement tracking
export const trackBlogRead = (articleTitle: string, category: string, readTime: string) => {
  event('blog_article_read', {
    category: 'Content',
    label: articleTitle,
    article_category: category,
    estimated_read_time: readTime
  })
}

export const trackBlogShare = (articleTitle: string, platform: string) => {
  event('blog_article_share', {
    category: 'Social',
    label: platform,
    article_title: articleTitle,
    share_platform: platform
  })
}

// Enhanced e-commerce tracking for premium features (future)
export const trackPurchase = (transactionId: string, value: number, currency: string, items: any[]) => {
  gtag('event', 'purchase', {
    transaction_id: transactionId,
    value: value,
    currency: currency,
    items: items
  })
}

// User engagement metrics
export const trackUserEngagement = (engagementTime: number) => {
  gtag('event', 'user_engagement', {
    engagement_time_msec: engagementTime
  })
}

// Search tracking
export const trackSiteSearch = (searchTerm: string, resultsCount: number) => {
  event('search', {
    category: 'Search',
    label: searchTerm,
    search_term: searchTerm,
    results_count: resultsCount
  })
}

/**
 * Get the Google Analytics Measurement ID
 */
export function getGAMeasurementId(): string | undefined {
  return GA_MEASUREMENT_ID
}