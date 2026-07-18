import { cn } from '@/lib/utils'
import { type HTMLAttributes, type ReactNode } from 'react'

interface ChatSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  size?: 'none' | 'sm' | 'md' | 'lg'
  variant?: 'card' | 'input'
}

const variantClasses = {
  card: 'rounded-[23px]  bg-spontaine-white shadow-surface',
  input:
    'rounded-[var(--radius-card)] border-[1.5px] border-spontaine-accent/80 bg-spontaine-white shadow-card-lift',
}

const sizeClasses = {
  none: '',
  sm: 'p-5 sm:p-7 lg:p-8',
  md: 'p-7 sm:p-9',
  lg: 'p-4 sm:p-5 lg:p-6',
}

export default function ChatSurface({
  children,
  className,
  size = 'none',
  variant = 'card',
  ...props
}: ChatSurfaceProps) {
  return (
    <div
      className={cn(variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </div>
  )
}
