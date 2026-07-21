import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React from 'react'

gsap.registerPlugin(ScrollTrigger)

const useSectionRichTextV3Reveal = (
  sectionRef: React.RefObject<HTMLElement>,
  editMode: boolean
) => {
  React.useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const context = gsap.context(() => {
      const revealTargets = gsap.utils.toArray<HTMLElement>('[data-v3-rich-text-reveal]')

      if (editMode || prefersReducedMotion) {
        gsap.set(revealTargets, { autoAlpha: 1, y: 0 })
        return
      }

      gsap.set(revealTargets, { autoAlpha: 0, y: 24 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        })
        .to(revealTargets, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: 'power2.out',
        })
    }, section)

    return () => context.revert()
  }, [editMode, sectionRef])
}

export default useSectionRichTextV3Reveal
