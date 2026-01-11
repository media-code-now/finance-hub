// Reliable image utilities for Finance Hub
// Using placeholder services for consistent, fast-loading images

export interface ImageConfig {
  width: number
  height: number
  quality?: number
  fit?: 'crop' | 'fill' | 'inside' | 'outside'
}

// Free placeholder service for consistent images
const PLACEHOLDER_BASE = 'https://via.placeholder.com'

// Get real finance images from Unsplash (open source, no API key needed)
export const getFinanceImage = (
  category: string,
  width: number = 600,
  height: number = 400,
  photoId?: string
): string => {
  // Verified working Unsplash images for financial content
  const imageUrls = {
    finance: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3',        // Financial charts/city
    investment: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e',     // Stock market data
    real_estate: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',      // Modern house exterior
    business: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',       // Business meeting
    technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475',     // Technology/computers
    banking: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f',        // Bank building/finance
    energy: 'https://images.unsplash.com/photo-1509391366360-2e959784a276',         // Solar panels
    crypto: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247',         // Cryptocurrency
    savings: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d',        // Piggy bank/coins
    charts: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',            // Analytics charts
    planning: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',       // Planning documents
    people: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f'          // Business professionals
  } as const

  const baseUrl = imageUrls[category as keyof typeof imageUrls] || imageUrls.finance
  
  // Add Unsplash transformation parameters
  return `${baseUrl}?auto=format&fit=crop&w=${width}&h=${height}&q=80`
}

// Professional author avatars from UI Avatars (free service)
export const generateAuthorAvatar = (name: string, size: number = 200): string => {
  const colors = ['3B82F6', '8B5CF6', '10B981', 'F59E0B', 'EF4444', '6366F1']
  const colorIndex = name.length % colors.length
  const bgColor = colors[colorIndex]
  
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${size}&background=${bgColor}&color=fff&font-size=0.33&bold=true`
}

// Calculator-specific images
export const getCalculatorImage = (calculatorTitle: string): string => {
  const calculatorImages: { [key: string]: string } = {
    'Mortgage Calculator': getFinanceImage('real_estate', 600, 400),
    'Investment Calculator': getFinanceImage('investment', 600, 400),
    'Loan Calculator': getFinanceImage('business', 600, 400),
    'Retirement Calculator': getFinanceImage('planning', 600, 400),
    'Savings Calculator': getFinanceImage('savings', 600, 400),
    'Auto Loan Calculator': getFinanceImage('finance', 600, 400),
    'Personal Loan Calculator': getFinanceImage('banking', 600, 400),
    'Crypto Calculator': getFinanceImage('crypto', 600, 400)
  }
  
  return calculatorImages[calculatorTitle] || getFinanceImage('finance', 600, 400)
}

// Predefined hero images using beautiful Unsplash photos
export const HERO_IMAGES = {
  home: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1920&h=1080&q=80',        // Modern city skyline
  calculators: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1920&h=800&q=80',   // Financial charts
  blog: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1920&h=600&q=80',        // Laptop workspace
  tools: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&h=800&q=80',       // Business analytics
  about: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&h=600&q=80'        // Team meeting
}

// Blog post images based on category
export const getBlogPostImage = (category: string, postId: string): string => {
  const categoryMap: { [key: string]: string } = {
    'Investment Strategies': 'investment',
    'Real Estate': 'real_estate',
    'Personal Finance': 'savings', 
    'Market Analysis': 'charts',
    'Technology': 'technology',
    'Business': 'business'
  }
  
  const imageCategory = categoryMap[category] || 'finance'
  return getFinanceImage(imageCategory, 800, 600)
}

// Featured section images using real Unsplash photos
export const FEATURE_IMAGES = {
  mortgage: getFinanceImage('real_estate', 600, 400),
  investment: getFinanceImage('investment', 600, 400), 
  loan: getFinanceImage('business', 600, 400),
  retirement: getFinanceImage('planning', 600, 400),
  savings: getFinanceImage('savings', 600, 400),
  business: getFinanceImage('banking', 300, 300),
  technology: getFinanceImage('crypto', 300, 300),
  energy: getFinanceImage('energy', 300, 300)
}

// Default placeholder for missing images
export const PLACEHOLDER_IMAGE = getFinanceImage('finance', 400, 300, 'Loading...')

// Image optimization helper (minimal since we're using placeholders)
export const optimizeImageUrl = (
  src: string,
  width: number = 800,
  quality: number = 75
): string => {
  return src // Return as-is since placeholders are already optimized
}