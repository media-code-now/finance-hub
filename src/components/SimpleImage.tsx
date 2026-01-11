'use client'

import { useState, useCallback } from 'react'
import { generateAuthorAvatar } from '@/lib/images'

// Simple image component that always works
interface SimpleImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

export function SimpleImage({ src, alt, className = '', width, height }: SimpleImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
  }

  const style = {
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : 'auto',
    objectFit: 'cover' as const
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded flex items-center justify-center"
          style={style}
        >
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`transition-opacity duration-300 rounded ${className}`}
        style={style}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
}

// Hero image component using simple img tag
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
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ display: 'block', minHeight: '400px' }}
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
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        style={{ display: 'block' }}
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
  const sizeMap = { sm: 32, md: 48, lg: 64 }
  const pixelSize = typeof size === 'string' ? sizeMap[size] : size
  
  return (
    <div className={`relative rounded-full overflow-hidden ${className}`} style={{ width: pixelSize, height: pixelSize }}>
      <img
        src={generateAuthorAvatar(name, pixelSize)}
        alt={`${name} avatar`}
        className="w-full h-full object-cover"
        style={{ display: 'block' }}
      />
    </div>
  )
}