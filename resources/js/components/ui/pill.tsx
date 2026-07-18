import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const pillVariants = cva(
  'inline-flex items-center gap-2 rounded-[var(--radius-pill)] font-mono text-[0.63rem] font-medium tracking-[-0.035em] [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        variant1:
          'bg-[var(--spontaine-pill-variant-1-bg)] text-[var(--spontaine-pill-variant-1-text)]',
        variant2:
          'bg-[var(--spontaine-pill-variant-2-bg)] text-[var(--spontaine-pill-variant-2-text)]',
        variant3:
          'bg-[var(--spontaine-pill-variant-3-bg)] text-[var(--spontaine-pill-variant-3-text)]',
        variant4:
          'bg-[var(--spontaine-pill-variant-4-bg)] text-[var(--spontaine-pill-variant-4-text)]',
        neutral:
          'bg-[var(--spontaine-pill-variant-neutral-bg)] text-[var(--spontaine-pill-variant-neutral-text)]',
      },
      size: {
        sm: 'px-[9px] py-0.5',
        md: 'px-2.5 py-[7px]',
      },
    },
    defaultVariants: {
      variant: 'variant1',
      size: 'sm',
    },
  }
)

export interface PillProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pillVariants> {}

const Pill = React.forwardRef<HTMLDivElement, PillProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(pillVariants({ variant, size, className }))}
      {...props}
    />
  )
)

Pill.displayName = 'Pill'

export { Pill, pillVariants }
