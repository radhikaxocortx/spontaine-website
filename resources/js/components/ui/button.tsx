import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:bg-gray-200 disabled:text-black [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300',
  {
    variants: {
      variant: {
        default:
          'bg-primary-900 text-white shadow relative overflow-hidden dark:bg-neutral-50 dark:text-neutral-900',
        destructive:
          'bg-red-500 text-neutral-50 shadow-sm relative overflow-hidden dark:bg-red-900 dark:text-neutral-50',
        outline:
          'border border-black-tertiary-700 bg-white shadow-sm relative overflow-hidden dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50',
        secondary:
          'bg-neutral-100 text-neutral-900 shadow-sm relative overflow-hidden dark:bg-neutral-800 dark:text-neutral-50',
        outlineSecondary:
          'border border-black-tertiary-950 bg-white text-primary-500 shadow-sm relative overflow-hidden dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50',
        ghost: 'relative overflow-hidden',
        link: 'text-primary-500 underline-offset-4 hover:text-primary-800 underline dark:text-neutral-50',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-xl px-3 text-xs',
        md: 'h-10 rounded-xl px-6',
        lg: 'h-10 rounded-xl px-8',
        xl: 'h-10 rounded-xl px-10',
        xxl: 'h-10 rounded-xl px-12',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    const getRippleColor = (variant?: string) => {
      switch (variant) {
        case 'outline':
        case 'secondary':
          return 'rgba(0, 0, 0, 0.2)' // Dark ripple on light backgrounds
        case 'default':
        case 'destructive':
        case 'outlineSecondary':
          return 'rgba(255, 255, 255, 0.4)' // Light ripple on dark backgrounds
        case 'ghost':
          return 'rgba(128, 128, 128, 0.3)' // Neutral ripple
        default:
          return 'rgba(255, 255, 255, 0.4)'
      }
    }

    const shouldShowRipple = (variant?: string) => {
      return variant !== 'link' // All variants except link
    }

    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget
      const rect = button.getBoundingClientRect()

      // Calculate cursor position relative to button (CodePen method)
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      const ripple = document.createElement('span')
      ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        background: ${getRippleColor(variant)};
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        animation: ripple 1s linear;
        width: 0px;
        height: 0px;
      `

      button.appendChild(ripple)

      // Store ripple reference for cleanup
      if (!button.dataset.ripples) {
        button.dataset.ripples = '0'
      }
      const rippleCount = parseInt(button.dataset.ripples) + 1
      button.dataset.ripples = rippleCount.toString()
      ripple.dataset.rippleId = rippleCount.toString()

      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.remove()
        }
      }, 1000)
    }

    const createHoverRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (shouldShowRipple(variant)) {
        createRipple(event)
      }
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (shouldShowRipple(variant)) {
        createRipple(event)
      }
      if (props.onClick) {
        props.onClick(event)
      }
    }

    const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
      // Clean up any remaining ripple elements (CodePen pattern)
      const button = event.currentTarget
      const ripples = button.querySelectorAll('span[data-ripple-id]')
      ripples.forEach((ripple) => {
        if (ripple.parentNode) {
          ripple.remove()
        }
      })

      if (props.onMouseLeave) {
        props.onMouseLeave(event)
      }
    }

    const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
      createHoverRipple(event)
      if (props.onMouseEnter) {
        props.onMouseEnter(event)
      }
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
