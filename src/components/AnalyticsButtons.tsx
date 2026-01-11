'use client'

import Link from 'next/link'
import { trackCalculatorUsage } from '@/lib/analytics'

interface CalculatorButtonProps {
  href: string
  title: string
  className: string
  children: React.ReactNode
}

export function CalculatorButton({ href, title, className, children }: CalculatorButtonProps) {
  return (
    <Link 
      href={href} 
      onClick={() => trackCalculatorUsage(title.toLowerCase().replace(/ /g, '_'), 'homepage')}
      className={className}
    >
      {children}
    </Link>
  )
}

interface NewsletterButtonProps {
  source: string
  className: string
  children: React.ReactNode
}

export function NewsletterButton({ source, className, children }: NewsletterButtonProps) {
  const { trackNewsletterSignup } = require('@/lib/analytics')
  
  return (
    <button 
      onClick={() => trackNewsletterSignup(source)}
      className={className}
    >
      {children}
    </button>
  )
}