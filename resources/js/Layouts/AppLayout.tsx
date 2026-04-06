import MetaTags from '@/components/MetaTags'
import Navbar from '@/Layouts/Navbar/Navbar'
import { FooterDataInterface } from '@/Modules/PageBuilder/FooterEditor/FooterEditor'
import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect } from 'react'
import Footer from './Footer/Footer'

interface Properties {
  children: React.ReactNode
  title?: string
  description?: string
  image?: string
  url?: string
  noIndex?: boolean
}

const AppLayout = ({
  children,
  title = 'Spontaine',
  description = `Transform your disconnected systems into an AI-driven command center with Spontaine’s no-code data integration platform. Get real-time insights, eliminate data silos, and enable AI adoption across your organization - all in weeks, not quarters.`,
  image = 'https://spontaine.com/storage/images/16.png',
  url,
  noIndex = false,
}: Properties) => {
  // Get footer data from Inertia shared props
  const { footer } = usePage<PageProps & { footer: { items: FooterDataInterface } }>().props

  // Premium smooth scroll implementation comparable to Devin.ai
  useEffect(() => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // GSAP animation to hide navbar after first block
    const triggerNavbarHiding = () => {
      // Find the first content block (banner section) - target the specific banner section
      const firstBlock =
        document.querySelector('[data-banner-section="true"]') || // BlogsList banner section
        document.querySelector('section[class*="h-[50vh]"]') || // Banner section with 50vh height
        document.querySelector('section[class*="min-h-[400px]"]') || // Banner section with min height
        document.querySelector('.min-h-screen > div > section:first-child') || // First section in page
        document.querySelector('[data-block-type]') || // Page builder blocks have this attribute
        document.querySelector('.min-h-screen > *:first-child > *:first-child') // First child of first child

      //   console.log('First block found:', firstBlock) // Debug log

      if (firstBlock) {
        // Create custom event dispatcher for navbar visibility
        const dispatchHeroVisibility = (isVisible: boolean) => {
          const event = new CustomEvent('hero-section-visible', { detail: isVisible })
          window.dispatchEvent(event)
        }

        // Initially navbar is visible
        dispatchHeroVisibility(true)

        // Create ScrollTrigger to hide navbar after first block
        ScrollTrigger.create({
          trigger: firstBlock,
          start: 'bottom top+=80px', // Hide when first block is 80px past the top
          end: 'bottom top+=80px',
          onEnter: () => {
            console.log('Hiding navbar') // Debug log
            dispatchHeroVisibility(false)
          },
          onLeaveBack: () => {
            console.log('Showing navbar') // Debug log
            dispatchHeroVisibility(true)
          },
          markers: false, // Set to true for debugging
        })
      } else {
        // Fallback: simple scroll-based navbar hiding
        console.log('No first block found, using scroll-based fallback')

        const dispatchHeroVisibility = (isVisible: boolean) => {
          const event = new CustomEvent('hero-section-visible', { detail: isVisible })
          window.dispatchEvent(event)
        }

        // Initially navbar is visible
        dispatchHeroVisibility(true)

        // Simple scroll trigger at viewport height
        ScrollTrigger.create({
          start: 'top top',
          end: '+=100vh', // After one viewport height
          onUpdate: (self) => {
            if (self.progress > 0.5) {
              dispatchHeroVisibility(false)
            } else {
              dispatchHeroVisibility(true)
            }
          },
        })
      }
    }

    // Wait for DOM to be ready, then trigger navbar hiding
    const timeoutId = setTimeout(triggerNavbarHiding, 100)
    // Enhanced smooth scroll with premium feel
    const style = document.createElement('style')
    style.textContent = `
      /* Premium smooth scroll with optimized performance */
      html {
        scroll-behavior: smooth;
        scroll-padding-top: 80px; /* Account for fixed navbar */
        -webkit-overflow-scrolling: touch; /* iOS momentum scrolling */
      }

      /* Enhanced smooth scrolling for all elements */
      * {
        scroll-behavior: smooth;
      }

      /* Respect user's motion preferences for accessibility */
      @media (prefers-reduced-motion: reduce) {
        html, * {
          scroll-behavior: auto !important;
        }
      }

      /* Premium scrollbar design - minimal and elegant */
      ::-webkit-scrollbar {
        width: 4px;
        height: 4px;
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background: rgba(163, 230, 53, 0.2);
        border-radius: 2px;
        transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
      }

      ::-webkit-scrollbar-thumb:hover {
        background: rgba(163, 230, 53, 0.5);
      }

      ::-webkit-scrollbar-thumb:active {
        background: rgba(163, 230, 53, 0.7);
      }

      /* Firefox scrollbar */
      html {
        scrollbar-width: thin;
        scrollbar-color: rgba(163, 230, 53, 0.2) transparent;
      }

      /* Smooth page transitions and optimized rendering */
      body {
        overflow-x: hidden;
        will-change: scroll-position;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
      }

      /* Optimize scroll performance */
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }
    `
    document.head.appendChild(style)

    // Enhanced scroll event handling with throttling for performance
    let ticking = false
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up'

          // Add smooth momentum feeling
          document.body.style.setProperty('--scroll-direction', scrollDirection)
          lastScrollY = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    // Smooth anchor link scrolling with easing
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.hash && target.hash.startsWith('#')) {
        const element = document.querySelector(target.hash)
        if (element) {
          e.preventDefault()

          // Enhanced smooth scrolling with custom easing
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          })

          // Add subtle focus indication
          setTimeout(() => {
            element.setAttribute('tabindex', '-1')
            element.focus()
            element.removeAttribute('tabindex')
          }, 500)
        }
      }
    }

    // Keyboard navigation enhancement
    const handleKeyNavigation = (e: KeyboardEvent) => {
      if (e.key === 'PageDown' || e.key === 'PageUp') {
        e.preventDefault()
        const direction = e.key === 'PageDown' ? 1 : -1
        const scrollAmount = window.innerHeight * 0.8 * direction

        window.scrollBy({
          top: scrollAmount,
          behavior: 'smooth',
        })
      }
    }

    // Add event listeners with passive options for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleAnchorClick, { passive: false })
    document.addEventListener('keydown', handleKeyNavigation, { passive: false })

    // Initial scroll position handling
    if (window.location.hash) {
      setTimeout(() => {
        const element = document.querySelector(window.location.hash)
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      }, 100)
    }

    // Cleanup function
    return () => {
      clearTimeout(timeoutId)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleAnchorClick)
      document.removeEventListener('keydown', handleKeyNavigation)
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  return (
    <>
      <Navbar />
      <MetaTags
        title={title}
        description={description}
        image={image}
        url={url}
        noIndex={noIndex}
      />
      <div className='relative min-h-screen w-full bg-white'>{children}</div>

      <Footer blockData={footer.items} />
    </>
  )
}

export default AppLayout
