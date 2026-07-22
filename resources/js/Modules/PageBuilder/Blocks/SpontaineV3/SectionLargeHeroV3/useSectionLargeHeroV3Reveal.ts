import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

export const useSectionLargeHeroV3Reveal = (
  sectionRef: RefObject<HTMLElement>,
  editMode: boolean
) => {
  useEffect(() => {
    const section = sectionRef.current

    if (section == null || editMode) {
      return
    }

    const revealItems = Array.from(
      section.querySelectorAll<HTMLElement>('[data-v3-large-hero-reveal]')
    )

    if (revealItems.length === 0) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      revealItems.forEach((item) => {
        item.style.opacity = '1'
        item.style.visibility = 'visible'
        item.style.transform = 'none'
      })
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      revealItems.forEach((item) => {
        item.style.opacity = '0'
        item.style.visibility = 'hidden'
      })

      gsap.set(revealItems, { y: 18 })

      gsap.to(revealItems, {
        duration: 0.55,
        ease: 'power2.out',
        opacity: 1,
        stagger: 0.1,
        y: 0,
        onStart: () => {
          revealItems.forEach((item) => {
            item.style.visibility = 'visible'
          })
        },
        scrollTrigger: {
          once: true,
          start: 'top 80%',
          trigger: section,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [editMode, sectionRef])
}
