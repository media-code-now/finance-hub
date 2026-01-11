'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { optimizeImageUrl, generateAuthorAvatar } from '@/lib/images'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  sizes?: string
  fill?: boolean
  onLoad?: () => void
  onError?: () => void
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 80,
  placeholder = 'empty',
  sizes,
  fill = false,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleLoad = useCallback(() => {
    setIsLoading(false)
    onLoad?.()
  }, [onLoad])

  const handleError = useCallback(() => {
    setImageError(true)
    setIsLoading(false)
    onError?.()
  }, [onError])

  if (imageError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 ${className}`}
        style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
      >
        <div className="text-center text-gray-500 dark:text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">Image unavailable</p>
        </div>
      </div>
    )
  }

  const optimizedSrc = optimizeImageUrl(src, width, quality)

  return (
    <div className={`relative ${className}`}>
      {/* Loading overlay */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"
          style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
        >
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      
      <Image
        src={optimizedSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        sizes={sizes}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${fill ? 'object-cover' : ''}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
}

// Hero image component with responsive behavior
interface HeroImageProps {
  src: string
  alt: string
  className?: string
  overlay?: boolean
  overlayColor?: string
  children?: React.ReactNode
}

export function HeroImage({ 
  src, 
  alt, 
  className = '', 
  overlay = true, 
  overlayColor = 'bg-black/40',
  children 
}: HeroImageProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        width={1920}
        height={800}
        fill
        priority
        className="absolute inset-0"
        sizes="100vw"
      />
      
      {overlay && (
        <div className={`absolute inset-0 ${overlayColor}`} />
      )}
      
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  )
}

// Card image component
interface CardImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  aspectRatio?: 'square' | '16:9' | '4:3' | '3:2'
}

export function CardImage({ 
  src, 
  alt, 
  width = 400, 
  height = 300, 
  className = '', 
  aspectRatio 
}: CardImageProps) {
  const aspectRatioClasses = {
    'square': 'aspect-square',
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '3:2': 'aspect-[3/2]'
  }

  return (
    <div className={`relative overflow-hidden rounded-lg ${aspectRatio ? aspectRatioClasses[aspectRatio] : ''} ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={!!aspectRatio}
        className="hover:scale-105 transition-transform duration-300"
      />
    </div>
  )
}

// Author avatar component
interface AuthorAvatarProps {
  name: string
  size?: number | 'sm' | 'md' | 'lg'
  className?: string
}

export function AuthorAvatar({ 
  name, 
  size = 'md', 
  className = '' 
}: AuthorAvatarProps) {
  // Convert size to number
  const sizeMap = { sm: 32, md: 48, lg: 64 }
  const pixelSize = typeof size === 'string' ? sizeMap[size] : size
  
  return (
    <div className={`relative rounded-full overflow-hidden ${className}`} style={{ width: pixelSize, height: pixelSize }}>
      <OptimizedImage
        src={generateAuthorAvatar(name)}
        alt={`${name} avatar`}
        width={pixelSize}
        height={pixelSize}
        className="rounded-full"
      />
    </div>
  )
}