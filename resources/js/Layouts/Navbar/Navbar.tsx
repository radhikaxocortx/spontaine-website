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

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      setIsHeroVisible(!!e.detail)
    }
    window.addEventListener('hero-section-visible', handler as EventListener)

    // Trigger ScrollTrigger refresh to set initial state
    ScrollTrigger.refresh()

    return () => window.removeEventListener('hero-section-visible', handler as EventListener)
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
            <div className='flex items-center justify-center py-6'>
              {/* Navigation Links */}

              <div className='hidden items-center gap-4 font-["Urbanist"] lg:flex'>
                <div className='font-accent flex items-center gap-8 rounded-full border border-transparent bg-green-400 px-6 py-2 text-sm tracking-wide shadow-white backdrop-blur-md'>
                  {/* Logo */}
                  <div className='flex items-center'>
                    <Link href='/'>
                      <div className='justify-center self-stretch text-center text-2xl font-bold uppercase leading-[60px] tracking-[4.25px] text-white/75'>
                        <img
                          src='/logo.png'
                          alt=''
                        />
                      </div>
                    </Link>
                  </div>

                  {/* Navigation Links */}
                  <NavbarLinks />

                  {/* CTA Button */}
                  <div className='hidden lg:block'>
                    <Link href='/how-it-works'>
                      <Button
                        size='lg'
                        className='relative overflow-hidden rounded-full bg-white py-6 text-black shadow-2xl'
                      >
                        <span className='nav-cta-text'>Book Demo</span>
                        {/* <i className='fas fa-arrow-right-long hero-cta-icon' /> */}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className='lg:hidden'>
                <MobileNav />
              </div>
            </div>
          </AppLayoutPadding>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default Navbar
