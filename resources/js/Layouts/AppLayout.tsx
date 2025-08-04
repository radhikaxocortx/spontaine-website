import Navbar from '@/Layouts/Navbar/Navbar'
import CompanyLogosSection from '@/Modules/PageBuilder/Blocks/HomeBlocks/CompanyLogosSection'
import HeroSection from '@/Modules/PageBuilder/Blocks/HomeBlocks/HeroSection'
import SectionAI from '@/Modules/PageBuilder/Blocks/HomeBlocks/SectionAI'
import SectionBlogsList from '@/Modules/PageBuilder/Blocks/HomeBlocks/SectionBlogsList'
import SectionLargeText from '@/Modules/PageBuilder/Blocks/HomeBlocks/SectionLargeText'
import SectionTalk from '@/Modules/PageBuilder/Blocks/HomeBlocks/SectionTalk'
import SectionTestimonial from '@/Modules/PageBuilder/Blocks/HomeBlocks/SectionTestimonial'
import SectionTrustedPartners from '@/Modules/PageBuilder/Blocks/HomeBlocks/SectionTrustedPartners'
import SectionVideos from '@/Modules/PageBuilder/Blocks/HomeBlocks/SectionVideos'
import { FooterDataInterface } from '@/Modules/PageBuilder/FooterEditor/FooterEditor'
import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'
import Footer from './Footer/Footer'

interface Properties {
  children: React.ReactNode
}

const AppLayout = ({ children }: Properties) => {
  // Get footer data from Inertia shared props
  const { footer } = usePage<PageProps & { footer: { items: FooterDataInterface } }>().props

  // Premium smooth scroll implementation comparable to Devin.ai
  useEffect(() => {
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
      <div className='relative min-h-screen w-full bg-white'>
        <HeroSection />

        <div className='hidden md:-mt-12 md:block'>
          <CompanyLogosSection />
        </div>

        <div className=''>
          <SectionAI />
        </div>
        <SectionTrustedPartners />
        <SectionBlogsList />
        <SectionVideos />
        <SectionLargeText />
        <SectionTestimonial />
        <SectionTalk />
      </div>
      <Footer blockData={footer.items} />
    </>
  )
}

export default AppLayout
