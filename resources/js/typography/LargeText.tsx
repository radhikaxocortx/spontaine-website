import { cn } from '@/utils'
import React from 'react'

interface Props {
  className?: string
  children: React.ReactNode
}

export default function LargeText({ className = '', children }: Props) {
  return <span className={cn('text-2xl leading-7', className)}>{children}</span>
}
