import { NextResponse } from 'next/server'
import { parseStringPromise } from 'xml2js'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface RSSItem {
  title: string[]
  description: string[]
  link: string[]
  pubDate: string[]
  'media:content'?: Array<{
    $: {
      url: string
    }
  }>
  enclosure?: Array<{
    $: {
      url: string
    }
  }>
}

interface RSSFeed {
  rss?: {
    channel: Array<{
      item: RSSItem[]
    }>
  }
  feed?: {
    entry: Array<{
      title: string[]
      summary: string[]
      link: Array<{ $: { href: string } }>
      updated: string[]
    }>
  }
}

// Financial news RSS feeds from major sources
const NEWS_FEEDS = {
  markets: [
    'https://feeds.bloomberg.com/markets/news.rss',
    'https://www.cnbc.com/id/10001147/device/rss/rss.html', // Markets
    'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10000664', // Investing
  ],
  stocks: [
    'https://www.cnbc.com/id/10000664/device/rss/rss.html', // Stocks
    'https://feeds.bloomberg.com/markets/news.rss',
  ],
  crypto: [
    'https://www.coindesk.com/arc/outboundfeeds/rss/',
    'https://cointelegraph.com/rss',
  ],
  economy: [
    'https://www.cnbc.com/id/10000664/device/rss/rss.html',
    'https://feeds.bloomberg.com/economics/news.rss',
  ],
  technology: [
    'https://feeds.bloomberg.com/technology/news.rss',
    'https://www.cnbc.com/id/19854910/device/rss/rss.html',
  ],
  'real-estate': [
    'https://www.cnbc.com/id/10000115/device/rss/rss.html',
  ],
  default: [
    'https://feeds.bloomberg.com/markets/news.rss',
    'https://www.cnbc.com/id/10001147/device/rss/rss.html',
    'https://feeds.a.dj.com/rss/RSSMarketsMain.xml', // Wall Street Journal
  ]
}

async function fetchRSSFeed(url: string): Promise<RSSFeed | null> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; FinanceHub/1.0)',
      },
      cache: 'no-store',
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.error(`Failed to fetch RSS feed from ${url}: ${response.status}`)
      return null
    }

    const xmlText = await response.text()
    const parsed = await parseStringPromise(xmlText)
    return parsed
  } catch (error) {
    console.error(`Error fetching RSS feed from ${url}:`, error)
    return null
  }
}

function extractImageUrl(item: RSSItem): string | undefined {
  // Try media:content
  if (item['media:content'] && item['media:content'][0]?.$?.url) {
    return item['media:content'][0].$.url
  }
  
  // Try enclosure
  if (item.enclosure && item.enclosure[0]?.$?.url) {
    return item.enclosure[0].$.url
  }
  
  // Try to extract from description
  if (item.description && item.description[0]) {
    const imgMatch = item.description[0].match(/<img[^>]+src="([^">]+)"/)
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1]
    }
  }
  
  return undefined
}

function cleanDescription(description: string): string {
  // Remove HTML tags
  let cleaned = description.replace(/<[^>]+>/g, '')
  // Decode HTML entities
  cleaned = cleaned
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
  // Trim and limit length
  cleaned = cleaned.trim()
  if (cleaned.length > 200) {
    cleaned = cleaned.substring(0, 200) + '...'
  }
  return cleaned
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || 'default'
    const limit = parseInt(searchParams.get('limit') || '10', 10)

    console.log(`[News API] Fetching news for category: ${category}, limit: ${limit}`)

    const feedUrls = NEWS_FEEDS[category as keyof typeof NEWS_FEEDS] || NEWS_FEEDS.default

    console.log(`[News API] Using feed URLs:`, feedUrls)

    // Fetch all RSS feeds in parallel
    const feedPromises = feedUrls.map(url => fetchRSSFeed(url))
    const feeds = await Promise.all(feedPromises)

    console.log(`[News API] Fetched ${feeds.filter(f => f !== null).length} feeds successfully`)

    const allArticles: any[] = []

    for (const feed of feeds) {
      if (!feed) continue

      // Handle RSS 2.0 format
      if (feed.rss?.channel?.[0]?.item) {
        const items = feed.rss.channel[0].item
        console.log(`[News API] Found ${items.length} RSS 2.0 items`)
        for (const item of items) {
          if (!item.title || !item.link) continue

          allArticles.push({
            title: item.title[0],
            description: item.description?.[0] ? cleanDescription(item.description[0]) : '',
            url: item.link[0],
            source: new URL(item.link[0]).hostname.replace('www.', ''),
            publishedAt: item.pubDate?.[0] || new Date().toISOString(),
            urlToImage: extractImageUrl(item),
          })
        }
      }

      // Handle Atom format
      if (feed.feed?.entry) {
        const entries = feed.feed.entry
        console.log(`[News API] Found ${entries.length} Atom entries`)
        for (const entry of entries) {
          if (!entry.title || !entry.link) continue

          allArticles.push({
            title: entry.title[0],
            description: entry.summary?.[0] ? cleanDescription(entry.summary[0]) : '',
            url: entry.link[0]?.$.href || '',
            source: new URL(entry.link[0]?.$.href || '').hostname.replace('www.', ''),
            publishedAt: entry.updated?.[0] || new Date().toISOString(),
          })
        }
      }
    }

    console.log(`[News API] Total articles collected: ${allArticles.length}`)

    // Sort by date (newest first)
    allArticles.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime()
      const dateB = new Date(b.publishedAt).getTime()
      return dateB - dateA
    })

    // Limit results
    const limitedArticles = allArticles.slice(0, limit)

    console.log(`[News API] Returning ${limitedArticles.length} articles`)

    return NextResponse.json({
      success: true,
      articles: limitedArticles,
      total: limitedArticles.length,
      category,
    })
  } catch (error) {
    console.error('[News API] Error in news API route:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch news',
        articles: [],
      },
      { status: 500 }
    )
  }
}
