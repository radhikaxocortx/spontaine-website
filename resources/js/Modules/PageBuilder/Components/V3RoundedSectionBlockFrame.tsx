import { RoundedSection, type RoundedSectionProps } from '@/components/ui/rounded-section'
import { cn } from '@/lib/utils'
import * as React from 'react'

const v3RoundedSectionOverlapClassName = 'relative z-20 -mt-8 md:-mt-10 lg:-mt-12 xl:-mt-16'

export const v3RoundedSectionTopPaddingClassName =
  'pt-[128px] md:pt-[150px] lg:pt-[172px] xl:pt-[188px]'

export interface V3RoundedSectionBlockFrameProps extends RoundedSectionProps {
  overlapTop?: boolean
}

export const V3RoundedSectionBlockFrame = React.forwardRef<
  HTMLElement,
  V3RoundedSectionBlockFrameProps
>(({ roundedTop = false, overlapTop = false, ...props }, ref) => {
  const shouldOverlap = roundedTop && overlapTop

  return (
    <div className={cn(shouldOverlap && v3RoundedSectionOverlapClassName)}>
      <RoundedSection
        ref={ref}
        roundedTop={roundedTop}
        {...props}
      />
    </div>
  )
})

V3RoundedSectionBlockFrame.displayName = 'V3RoundedSectionBlockFrame'

export default V3RoundedSectionBlockFrame
