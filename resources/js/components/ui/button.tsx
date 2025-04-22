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
          'bg-primary-900 text-white shadow transition-all duration-300 relative overflow-hidden hover:bg-gradient-to-r hover:from-primary-950 hover:to-secondary-500 hover:text-white hover:border-none dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent hover:before:animate-[shimmer_2s_infinite]',
        destructive:
          'bg-red-500 text-neutral-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90',
        outline:
          'border border-black-tertiary-700 bg-white shadow-sm transition-all duration-300 relative overflow-hidden hover:bg-gradient-to-r hover:from-primary-950 hover:to-secondary-500 hover:text-white hover:border-none dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent hover:before:animate-[shimmer_2s_infinite]',
        secondary:
          'bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80',
        outlineSecondary:
          'border border-black-tertiary-950 bg-white text-primary-500 shadow-sm hover:bg-primary-400 hover:text-white hover:border-none dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        ghost:
          'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        link: 'text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50',
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
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
