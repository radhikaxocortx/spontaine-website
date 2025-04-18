import { cn } from '@/utils'
import React from 'react'

interface Props {
  className?: string
  children: React.ReactNode
}

export default function HeroTextBlock({ className = '', children }: Props) {
  return (
    <span className={cn('text-base font-medium leading-7 2xl:text-lg', className)}>{children}</span>
  )
}
