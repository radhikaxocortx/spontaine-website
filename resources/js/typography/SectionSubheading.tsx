import { cn } from '@/lib/utils'
import React from 'react'

interface SectionSubheadingProps {
  children: React.ReactNode
  className?: string
  theme?: 'light' | 'dark' | 'muted'
  size?: 'small' | 'medium' | 'large' | '2xl'
  weight?: 'semibold' | 'bold'
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  centered?: boolean
}

const SectionSubheading = ({
  children,
  className,
  theme = 'light',
  size = 'medium',
  weight = 'semibold',
  maxWidth = '2xl',
  centered = true,
}: SectionSubheadingProps) => {
  const themeColors = {
    light: 'text-black',
    dark: 'text-white',
    muted: 'text-gray-300',
  }

  const sizes = {
    small: 'text-base',
    medium: 'text-lg',
    large: 'text-xl sm:text-2xl',
    '2xl': 'text-2xl sm:text-3xl',
  }

  const weights = {
    semibold: 'font-semibold',
    bold: 'font-bold',
  }

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
  }

  return (
    <p
      className={cn(
        "font-['Urbanist'] leading-normal",
        themeColors[theme],
        sizes[size],
        weights[weight],
        centered && 'mx-auto',
        maxWidths[maxWidth],
        className
      )}
    >
      {children}
    </p>
  )
}

export default SectionSubheading
