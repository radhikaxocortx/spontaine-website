import { cn } from '@/lib/utils'
import React from 'react'

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
  theme?: 'light' | 'dark'
  alignment?: 'left' | 'center' | 'right'
}

const SectionTitle = ({
  children,
  className,
  theme = 'light',
  alignment = 'center',
}: SectionTitleProps) => {
  const textColor = theme === 'light' ? 'text-black' : 'text-white'
  const alignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[alignment]

  return (
    <h2
      className={cn(
        "break-words font-['Urbanist'] text-3xl font-normal leading-tight sm:text-4xl md:text-5xl md:leading-none",
        textColor,
        alignmentClass,
        className
      )}
    >
      {children}
    </h2>
  )
}

export default SectionTitle
