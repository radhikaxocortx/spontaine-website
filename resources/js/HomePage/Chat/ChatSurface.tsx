import { cn } from '@/lib/utils'
import { type CSSProperties, type HTMLAttributes, type ReactNode } from 'react'

interface ChatSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  size?: 'none' | 'sm' | 'md' | 'lg'
  variant?: 'card' | 'input'
}

const variantClasses = {
  card: 'rounded-[28px] border border-white/70 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.14)]',
  input:
    'rounded-[32px] border-2 border-transparent bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]',
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
  style,
  variant = 'card',
  ...props
}: ChatSurfaceProps) {
  const variantStyle: CSSProperties =
    variant === 'input'
      ? {
          backgroundImage:
            'linear-gradient(white, white), linear-gradient(0deg, #44ECA0 0%, #D0D9FB 100%)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
        }
      : {}

  return (
    <div
      className={cn(
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      style={{ ...variantStyle, ...style }}
      {...props}
    >
      {children}
    </div>
  )
}
