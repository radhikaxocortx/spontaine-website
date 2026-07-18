import { CalendarBooking } from '@/components/CalendarBooking'
import ApplicationLogo2 from '@/components/CustomUI/ApplicationLogo2'
import { Button } from '@/components/ui/button'
import { Link } from '@inertiajs/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useState } from 'react'
import { MobileNav } from './MobileNav/MobileNav'
import NavbarLinks from './NavbarLinks'

const Navbar = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [hideNavbar, setHideNavbar] = useState(false)

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      setIsHeroVisible(!!e.detail)
    }
    window.addEventListener('hero-section-visible', handler as EventListener)

    // Trigger ScrollTrigger refresh to set initial state
    ScrollTrigger.refresh()

    const onScroll = () => {
      // Check if SectionCTA or Footer is in viewport
      const footer = document.querySelector('footer')
      const sectionCTA = document.querySelector('[data-section-cta], #contact')

      let shouldHide = false

      if (footer) {
        const footerRect = footer.getBoundingClientRect()
        if (footerRect.top < window.innerHeight && footerRect.bottom > 0) {
          shouldHide = true
        }
      }

      if (!shouldHide && sectionCTA) {
        const ctaRect = sectionCTA.getBoundingClientRect()
        if (ctaRect.top < window.innerHeight && ctaRect.bottom > 0) {
          shouldHide = true
        }
      }

      setHideNavbar(shouldHide)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // Initial check

    return () => {
      window.removeEventListener('hero-section-visible', handler as EventListener)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {isHeroVisible && !hideNavbar && (
        <motion.nav
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          className='bg-spontaine-surface-paper/50 fixed left-0 top-0 z-50 w-full backdrop-blur-md'
        >
          <div className='mx-auto flex h-16 w-full max-w-[1120px] items-center justify-between px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
            <Link
              href='/'
              className='flex items-center'
            >
              <ApplicationLogo2 className='h-9 w-auto' />
            </Link>

            <div className='hidden items-center gap-8 lg:flex'>
              <NavbarLinks />

              <CalendarBooking>
                {({ openCalendar }) => (
                  <Button
                    type='button'
                    onClick={openCalendar}
                    variant='v3NavPrimary'
                    size='v3Hero'
                    className='min-h-10 px-5 py-2 text-[15px]'
                  >
                    Work out your number
                  </Button>
                )}
              </CalendarBooking>
            </div>

            <div className='flex items-center gap-3 lg:hidden'>
              <CalendarBooking>
                {({ openCalendar }) => (
                  <Button
                    type='button'
                    onClick={openCalendar}
                    variant='v3NavPrimary'
                    size='v3Hero'
                    className='min-h-10 px-4 py-2 text-sm'
                  >
                    Book Demo
                  </Button>
                )}
              </CalendarBooking>
              <MobileNav />
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default Navbar
