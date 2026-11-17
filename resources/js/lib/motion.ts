/**
 * Shared motion vocabulary for the Spontaine V3 marketing pages.
 * Every new animation reads its timing from here so the page moves with one rhythm.
 */
export const motionEase = {
  /** GSAP name for the settle curve used across the site. */
  settle: 'power3.out',
  /** The same curve as a cubic-bezier, for Framer Motion. */
  settleBezier: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
} as const

export const motionDuration = {
  /** Content settling into place. */
  settle: 0.75,
  /** A whole band rising onto the one before it. */
  stackUp: 1.05,
  /** Tab indicator travel. */
  indicator: 0.45,
  /** Connector line fill on the PathSteps band. */
  connector: 1.4,
} as const

export const motionStagger = {
  /** Default gap between sibling items. */
  items: 0.07,
} as const

/** Distance a band travels when it stacks up into view. */
export const stackUpOffset = 72

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
