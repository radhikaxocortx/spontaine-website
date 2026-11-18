import {
  motionDuration,
  motionEase,
  motionStagger,
  prefersReducedMotion,
  stackUpOffset,
} from '@/lib/motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

interface StackUpOptions {
  /**
   * Move the whole band. Turn this off for bands that ScrollTrigger pins,
   * because a transform on a pinned element breaks the pin.
   */
  readonly moveBand?: boolean
  /** Turn the entrance off entirely, e.g. inside the page builder editor. */
  readonly enabled?: boolean
}

/**
 * Stack-up entrance: the band rises onto the one before it, then any children
 * marked with `data-stack-item` settle in with a short stagger. Fires once.
 * Bands already in view on load are left alone so nothing flashes.
 */
export function useStackUp<TElement extends HTMLElement = HTMLElement>({
  moveBand = true,
  enabled = true,
}: StackUpOptions = {}) {
  const bandRef = useRef<TElement | null>(null)

  useEffect(() => {
    const band = bandRef.current

    if (!band || !enabled || prefersReducedMotion()) {
      return
    }

    if (band.getBoundingClientRect().top < window.innerHeight * 0.92) {
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const items = Array.from(band.querySelectorAll<HTMLElement>('[data-stack-item]'))

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        paused: true,
        defaults: { ease: motionEase.settle },
      })

      if (moveBand) {
        gsap.set(band, { y: stackUpOffset, scale: 0.985, transformOrigin: '50% 0%' })
        timeline.to(band, {
          y: 0,
          scale: 1,
          duration: motionDuration.stackUp,
          clearProps: 'transform',
        })
      }

      if (items.length > 0) {
        gsap.set(items, { autoAlpha: 0, y: 28 })
        timeline.to(
          items,
          {
            autoAlpha: 1,
            y: 0,
            duration: motionDuration.settle,
            stagger: motionStagger.items,
            clearProps: 'transform,opacity,visibility',
          },
          moveBand ? 0.18 : 0
        )
      }

      ScrollTrigger.create({
        trigger: band,
        start: 'top 92%',
        once: true,
        onEnter: () => timeline.play(),
      })
    }, band)

    return () => context.revert()
  }, [moveBand, enabled])

  return bandRef
}
