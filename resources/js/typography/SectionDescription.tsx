import { cn } from '@/lib/utils'
import React from 'react'

interface SectionDescriptionProps {
  children: React.ReactNode
  className?: string
  theme?: 'light' | 'dark' | 'muted'
  size?: 'small' | 'medium' | 'large'
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  centered?: boolean
}

const SectionDescription = ({
  children,
  className,
  theme = 'light',
  size = 'medium',
  maxWidth = '4xl',
  centered = true,
}: SectionDescriptionProps) => {
  const themeColors = {
    light: 'text-black',
    dark: 'text-white',
    muted: 'text-gray-300',
  }

  const sizes = {
    small: 'text-sm sm:text-base',
    medium: 'text-sm sm:text-base',
    large: 'text-base sm:text-lg',
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
        "font-['Space_Grotesk'] font-light leading-relaxed",
        themeColors[theme],
        sizes[size],
        centered && 'mx-auto',
        maxWidths[maxWidth],
        className
      )}
    >
      {children}
    </p>
  )
}

export default SectionDescription
