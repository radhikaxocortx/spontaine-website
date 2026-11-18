import { trackEvent } from '@/lib/analytics'
import { useEffect } from 'react'

/**
 * Fires `section_viewed` once per band, when half of it (or half the viewport,
 * for bands taller than the screen) is in view.
 */
export function useSectionViewed(sectionIds: readonly string[]) {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return
    }

    const seen = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id
          const visibleHeight = entry.intersectionRect.height
          const isHalfVisible =
            entry.intersectionRatio >= 0.5 || visibleHeight >= window.innerHeight * 0.5

          if (!isHalfVisible || seen.has(id)) {
            return
          }

          seen.add(id)
          trackEvent('section_viewed', { section: id })
          observer.unobserve(entry.target)
        })
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element != null)
      .forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [sectionIds])
}
