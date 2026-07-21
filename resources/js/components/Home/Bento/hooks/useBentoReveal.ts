import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export function useBentoReveal<TElement extends HTMLElement = HTMLDivElement>() {
  const itemRefs = useRef<Array<TElement | null>>([])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const cardElements = itemRefs.current.filter(Boolean) as TElement[]

    if (!cardElements.length) {
      return
    }

    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (shouldReduceMotion) {
      cardElements.forEach((card) => {
        card.style.visibility = 'visible'
      })
      gsap.set(cardElements, { opacity: 1, y: 0 })
      return
    }

    gsap.set(cardElements, { opacity: 0, y: 32 })
    cardElements.forEach((card) => {
      card.style.visibility = 'hidden'
    })

    const triggers = cardElements.map((card) => {
      const revealCard = () => {
        gsap.to(card, {
          duration: 0.75,
          ease: 'power3.out',
          onStart: () => {
            card.style.visibility = 'visible'
          },
          opacity: 1,
          y: 0,
        })
      }

      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 82%',
        once: true,
        onEnter: revealCard,
      })

      const bounds = card.getBoundingClientRect()
      const threshold = window.innerHeight * 0.82

      if (trigger.isActive || (bounds.top <= threshold && bounds.bottom >= 0)) {
        revealCard()
      }

      return trigger
    })

    return () => {
      triggers.forEach((trigger) => trigger.kill())
      gsap.killTweensOf(cardElements)
    }
  }, [])

  return (index: number) => (node: TElement | null) => {
    itemRefs.current[index] = node
  }
}
