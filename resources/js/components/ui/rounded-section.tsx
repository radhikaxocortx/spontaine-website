import { cn } from '@/lib/utils'
import * as React from 'react'

export const roundedSectionTopClassName =
  'rounded-t-section-sm md:rounded-t-section-md lg:rounded-t-section-lg xl:rounded-t-section-xl'

export interface RoundedSectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  roundedTop?: boolean
}

export const RoundedSection = React.forwardRef<HTMLElement, RoundedSectionProps>(
  ({ as: Component = 'section', roundedTop = false, className, ...props }, ref) =>
    React.createElement(Component, {
      ref,
      className: cn(roundedTop && roundedSectionTopClassName, className),
      ...props,
    })
)

RoundedSection.displayName = 'RoundedSection'
