import { cn } from '@/lib/utils'
import React from 'react'

interface SectionBodyProps {
  children: React.ReactNode
  className?: string
  theme?: 'light' | 'dark' | 'gray'
  size?: 'xs' | 'sm' | 'base'
  weight?: 'light' | 'normal'
  lineHeight?: 'normal' | 'relaxed'
  centered?: boolean
}

const SectionBody = ({
  children,
  className,
  theme = 'light',
  size = 'base',
  weight = 'normal',
  lineHeight = 'relaxed',
  centered = false,
}: SectionBodyProps) => {
  const themeColors = {
    light: 'text-black',
    dark: 'text-white',
    gray: 'text-gray-700',
  }

  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
  }

  const weights = {
    light: 'font-light',
    normal: 'font-normal',
  }

  const lineHeights = {
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
  }

  return (
    <p
      className={cn(
        "font-['Space_Grotesk']",
        themeColors[theme],
        sizes[size],
        weights[weight],
        lineHeights[lineHeight],
        centered && 'mx-auto',
        className
      )}
    >
      {children}
    </p>
  )
}

export default SectionBody
