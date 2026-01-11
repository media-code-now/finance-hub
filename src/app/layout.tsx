import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeProvider'
import { Analytics } from '@/components/Analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://financehub.com'),
  title: {
    default: 'Finance Hub - Your Complete Financial Resource Center',
    template: '%s | Finance Hub'
  },
  description: 'Free financial calculators, tools, and insights. Get mortgage calculations, investment planning, retirement planning, and the latest financial news all in one place.',
  keywords: [
    'finance calculator',
    'mortgage calculator', 
    'investment calculator',
    'retirement planning',
    'financial planning',
    'money management',
    'compound interest',
    'budget planner',
    'loan calculator',
    'financial news'
  ],
  authors: [{ name: 'Finance Hub', url: 'https://financehub.com' }],
  creator: 'Finance Hub',
  publisher: 'Finance Hub',
  applicationName: 'Finance Hub',
  generator: 'Next.js',
  category: 'finance',
  classification: 'Financial Tools and Resources',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://financehub.com',
    siteName: 'Finance Hub',
    title: 'Finance Hub - Your Complete Financial Resource Center',
    description: 'Free financial calculators, tools, and insights for smart money management. Calculate mortgages, plan investments, and stay updated with financial news.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Finance Hub - Financial Calculators and Tools',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finance Hub - Financial Calculators & Tools',
    description: 'Free financial calculators and tools for smart money management.',
    creator: '@financehub',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://financehub.com',
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
  other: {
    'theme-color': '#1E40AF',
    'color-scheme': 'light',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://financehub.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Finance Hub',
              url: 'https://financehub.com',
              logo: 'https://financehub.com/logo.png',
              description: 'Free financial calculators, tools, and insights for smart money management.',
              sameAs: [
                'https://twitter.com/financehub',
                'https://facebook.com/financehub',
                'https://linkedin.com/company/financehub'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-555-123-4567',
                contactType: 'Customer Service'
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              url: 'https://financehub.com',
              name: 'Finance Hub',
              description: 'Your complete financial resource center with free calculators and tools.',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://financehub.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
        {/* Google Analytics - Replace with your tracking ID */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_TRACKING_ID');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light" storageKey="finance-hub-theme">
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}