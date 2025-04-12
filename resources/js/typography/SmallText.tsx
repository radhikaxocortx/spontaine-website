import { cn } from '@/utils'
import React from 'react'

interface Props {
  className?: string
  children: React.ReactNode
}

export default function SmallText({ className = '', children }: Props) {
  return <span className={cn('text-xs', className)}>{children}</span>
}
