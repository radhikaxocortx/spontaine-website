import { useEffect } from 'react'

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

const scrollToElement = (element: Element) => {
  element.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
    inline: 'nearest',
  })
}

const getHashElement = (hash: string) => {
  const rawId = hash.replace(/^#/, '')
  let id = rawId

  try {
    id = decodeURIComponent(rawId)
  } catch {
    id = rawId
  }

  return id ? document.getElementById(id) : null
}

const isEditableTarget = (target: EventTarget | null) =>
  target instanceof HTMLInputElement ||
  target instanceof HTMLTextAreaElement ||
  target instanceof HTMLSelectElement ||
  (target instanceof HTMLElement && target.isContentEditable)

export function useSmoothPageScroll() {
  useEffect(() => {
    let ticking = false
    let lastScrollY = window.scrollY
    let initialHashTimeout: number | undefined

    const handleScroll = () => {
      if (ticking) {
        return
      }

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const direction = currentScrollY > lastScrollY ? 'down' : 'up'

        document.body.style.setProperty('--scroll-direction', direction)
        lastScrollY = currentScrollY
        ticking = false
      })

      ticking = true
    }

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null

      if (!(target instanceof HTMLAnchorElement) || !target.hash) {
        return
      }

      const element = getHashElement(target.hash)

      if (!element) {
        return
      }

      event.preventDefault()
      scrollToElement(element)
    }

    const handleKeyNavigation = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        isEditableTarget(event.target) ||
        (event.key !== 'PageDown' && event.key !== 'PageUp')
      ) {
        return
      }

      event.preventDefault()

      const direction = event.key === 'PageDown' ? 1 : -1
      window.scrollBy({
        top: window.innerHeight * 0.8 * direction,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleAnchorClick)
    document.addEventListener('keydown', handleKeyNavigation)

    if (window.location.hash) {
      initialHashTimeout = window.setTimeout(() => {
        const element = getHashElement(window.location.hash)

        if (element) {
          scrollToElement(element)
        }
      }, 100)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleAnchorClick)
      document.removeEventListener('keydown', handleKeyNavigation)

      if (initialHashTimeout) {
        window.clearTimeout(initialHashTimeout)
      }
    }
  }, [])
}
