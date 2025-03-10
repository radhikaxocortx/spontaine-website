import { cn } from '@/utils'
import React from 'react'

interface Props {
  className?: string
  children: React.ReactNode
}

export default function HeroTextBlock({ className = '', children }: Props) {
  return <span className={cn('text-base leading-7', className)}>{children}</span>
}
