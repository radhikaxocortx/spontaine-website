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
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('hero-section-visible', handler as EventListener)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {isHeroVisible && (
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
                          className='h-8 w-8'
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
                    <Link href='/how-it-works'>
                      <Button
                        size='lg'
                        className='relative overflow-hidden rounded-full bg-spontaine-highlight py-6 text-white shadow-2xl'
                      >
                        <span className='nav-cta-text'>Book Demo</span>
                      </Button>
                    </Link>
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
                    <Link href='/how-it-works'>
                      <Button
                        size='lg'
                        className='relative overflow-hidden rounded-full bg-spontaine-highlight px-4 py-2 text-white shadow-2xl'
                      >
                        <span className='nav-cta-text'>Book Demo</span>
                      </Button>
                    </Link>
                    <MobileNav />
                  </div>
                </div>
              </div>
            </div>
          </AppLayoutPadding>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default Navbar
