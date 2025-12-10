import ApplicationLogo2 from '@/components/CustomUI/ApplicationLogo2'
import { Button } from '@/components/ui/button'
import { Link } from '@inertiajs/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useState } from 'react'
import AppLayoutPadding from '../AppLayoutPadding'
import { MobileNav } from './MobileNav/MobileNav'
import NavbarLinks from './NavbarLinks'

const Navbar = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isHoveringPill, setIsHoveringPill] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [hideNavbar, setHideNavbar] = useState(false)

  const handleBookDemo = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      setIsHeroVisible(!!e.detail)
    }
    window.addEventListener('hero-section-visible', handler as EventListener)

    // Trigger ScrollTrigger refresh to set initial state
    ScrollTrigger.refresh()

    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop
      setIsCollapsed(y > 24)

      // Check if SectionCTA or Footer is in viewport
      const footer = document.querySelector('footer')
      const sectionCTA = document.querySelector('[data-section-cta]')

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
          className='fixed left-0 top-0 z-50 w-full bg-transparent'
        >
          <AppLayoutPadding>
            <div
              className='flex items-center justify-center py-6'
              onMouseEnter={() => setIsHoveringPill(true)}
              onMouseLeave={() => setIsHoveringPill(false)}
            >
              <div className='hidden items-center gap-4 lg:flex'>
                <div
                  className={`font-accent flex items-center gap-8 rounded-full border border-transparent bg-spontaine-accent px-6 py-2 text-sm tracking-wide shadow-white transition-all duration-200 ${isCollapsed && !isHoveringPill ? 'px-4 py-2' : 'px-6 py-2'}`}
                >
                  {/* Logo (switches to icon when collapsed) */}
                  <div className='flex items-center'>
                    <Link href='/'>
                      {isCollapsed && !isHoveringPill ? (
                        <img
                          src='/logo-icon.svg'
                          alt='Spontaine'
                          className='h-8 w-8 brightness-0'
                        />
                      ) : (
                        //
                        <ApplicationLogo2 className='h-10 w-auto' />
                      )}
                    </Link>
                  </div>

                  {/* Navigation Links (hidden when collapsed, shown on hover) */}
                  {(!isCollapsed || isHoveringPill) && <NavbarLinks />}

                  {/* CTA Button (always visible) */}
                  <div className='hidden lg:block'>
                    <Button
                      onClick={handleBookDemo}
                      size='lg'
                      className='relative overflow-hidden rounded-full bg-spontaine-highlight py-6 text-white shadow-2xl'
                    >
                      <span className='nav-cta-text'>Book Demo</span>
                    </Button>
                  </div>
                </div>
              </div>
              {/* Mobile layout: curved pill with logo left, CTA + hamburger right */}
              <div className='w-full lg:hidden'>
                <div className='font-accent flex items-center justify-between gap-4 rounded-full border border-transparent bg-spontaine-accent px-4 py-2 text-sm tracking-wide'>
                  {/* Logo */}
                  <Link
                    href='/'
                    className='flex gap-2'
                  >
                    <ApplicationLogo2 className='h-8 w-auto' />
                  </Link>
                  {/* Right: CTA + Hamburger */}
                  <div className='flex items-center gap-3'>
                    <Button
                      onClick={handleBookDemo}
                      size='lg'
                      className='relative overflow-hidden rounded-full bg-spontaine-highlight px-4 py-2 text-white shadow-2xl'
                    >
                      <span className='nav-cta-text'>Book Demo</span>
                    </Button>
                    <MobileNav />
                  </div>
                </div>
              </div>
            </div>
          </AppLayoutPadding>
        </motion.nav>
      )}

      {/* MODAL WITH IFRAME */}
      {showModal && (
        <div
          className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm'
          onClick={closeModal}
        >
          <div
            className='relative w-[90%] max-w-6xl overflow-hidden rounded-2xl bg-white p-14 shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className='absolute right-4 top-1 z-10 rounded-full p-1 text-2xl text-gray-600 hover:bg-white hover:text-gray-800'
            >
              ×
            </button>

            {/* Calendar Iframe */}
            <iframe
              src='https://cal.com/intuonfx/30min?embed=true&layout=month_view'
              className='h-[475px] w-full border-0'
              allow='fullscreen'
            ></iframe>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Navbar
