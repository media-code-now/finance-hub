import { GoogleAnalytics } from '@next/third-parties/google'

/**
 * Analytics component for Next.js App Router
 * Add this to your root layout to enable Google Analytics tracking
 */
export function Analytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
}