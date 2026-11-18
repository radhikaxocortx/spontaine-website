import { motionDuration, prefersReducedMotion } from '@/lib/motion'
import { type FocusEvent, useCallback, useEffect, useRef, useState } from 'react'

const DESKTOP_QUERY = '(min-width: 1024px)'

interface SolutionsAutoplayOptions {
  /** Number of tabs. */
  readonly count: number
  /** Turn autoplay off entirely (for example in the page builder editor). */
  readonly enabled?: boolean
}

/**
 * Celonis-style tab rotation: each tab stays up for `solutionDwell` seconds while
 * the section is on screen. Desktop only, never with reduced motion. It pauses on
 * hover, keyboard focus or the pause button, and stops for good once someone picks
 * a tab. WCAG 2.2.2 needs that visible pause control because the content moves on
 * its own for longer than five seconds.
 */
export function useSolutionsAutoplay({ count, enabled = true }: SolutionsAutoplayOptions) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const dwellMs = motionDuration.solutionDwell * 1000

  const [active, setActive] = useState(0)
  const [canAutoplay, setCanAutoplay] = useState(false)
  const [stopped, setStopped] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [interactionPaused, setInteractionPaused] = useState(false)
  const [inView, setInView] = useState(false)

  const remainingRef = useRef(dwellMs)
  const startedAtRef = useRef(0)
  const advancedRef = useRef(false)

  // Autoplay only where it helps: desktop, motion allowed, not in the editor.
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      setCanAutoplay(false)
      return
    }

    const query = window.matchMedia(DESKTOP_QUERY)
    const update = () => setCanAutoplay(query.matches && !prefersReducedMotion())

    update()
    query.addEventListener('change', update)

    return () => query.removeEventListener('change', update)
  }, [enabled])

  useEffect(() => {
    const container = containerRef.current

    if (!container || typeof IntersectionObserver === 'undefined') {
      return
    }

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.4,
    })

    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  const isRunning = canAutoplay && !stopped && !userPaused && !interactionPaused && inView

  useEffect(() => {
    if (!isRunning || count < 2) {
      return
    }

    startedAtRef.current = Date.now()
    const timeout = window.setTimeout(() => {
      advancedRef.current = true
      setActive((current) => (current + 1) % count)
    }, remainingRef.current)

    return () => {
      window.clearTimeout(timeout)

      if (advancedRef.current) {
        // The tab moved on: the next one gets a full dwell.
        advancedRef.current = false
        remainingRef.current = dwellMs
        return
      }

      // Paused part-way: resume from where the progress line stopped.
      const elapsed = Date.now() - startedAtRef.current
      remainingRef.current = Math.max(remainingRef.current - elapsed, 300)
    }
  }, [isRunning, active, count, dwellMs])

  /** A visitor chose a tab: show it and stop rotating for good. */
  const select = useCallback((index: number) => {
    setStopped(true)
    setActive(index)
  }, [])

  const togglePause = useCallback(() => setUserPaused((paused) => !paused), [])

  const interactionHandlers = {
    onMouseEnter: () => setInteractionPaused(true),
    onMouseLeave: () => setInteractionPaused(false),
    onFocus: () => setInteractionPaused(true),
    onBlur: (event: FocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
        setInteractionPaused(false)
      }
    },
  }

  const isAutoplaying = canAutoplay && !stopped

  return {
    active,
    containerRef,
    interactionHandlers,
    /** The progress line should be animating (it may be paused). */
    isAutoplaying,
    /** The progress line should be frozen where it is. */
    isProgressPaused: isAutoplaying && !isRunning,
    select,
    showPauseControl: isAutoplaying,
    togglePause,
    userPaused,
  }
}
