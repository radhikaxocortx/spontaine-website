import { useStackUp } from '@/hooks/useStackUp'
import { type ReactNode } from 'react'

interface StackUpBandProps {
  readonly children: ReactNode
  readonly className?: string
}

/** Wraps an existing band so it stacks up into view without touching its own refs. */
export default function StackUpBand({ children, className }: StackUpBandProps) {
  const bandRef = useStackUp<HTMLDivElement>()

  return (
    <div
      ref={bandRef}
      className={className}
    >
      {children}
    </div>
  )
}
