import { cn } from '@/utils'
import React from 'react'

interface Props {
  className?: string
  children: React.ReactNode
}

export default function HeroHeadline({ className = '', children }: Props) {
  return (
    <h1 className={cn('text-3xl font-semibold md:text-4xl lg:text-5xl', className)}>{children}</h1>
  )
}
