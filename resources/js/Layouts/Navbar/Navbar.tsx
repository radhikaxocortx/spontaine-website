import { CalendarBooking } from '@/components/CalendarBooking'
import ApplicationLogo2 from '@/components/CustomUI/ApplicationLogo2'
import { Button } from '@/components/ui/button'
import { trackEvent } from '@/lib/analytics'
import { Link } from '@inertiajs/react'
import { MobileNav } from './MobileNav/MobileNav'
import NavbarLinks from './NavbarLinks'

const Navbar = () => {
  return (
    // Slides up while <html data-nav-hidden> is set (e.g. while the homepage architecture section is pinned).
    <nav className='fixed left-0 top-0 z-50 w-full bg-spontaine-surface-paper/50 backdrop-blur-md transition-transform duration-500 [transition-timing-function:cubic-bezier(0.215,0.61,0.355,1)] [html[data-nav-hidden]_&]:-translate-y-full'>
      <div className='mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <Link
          href='/'
          aria-label='Go to Spontaine home page'
          className='flex items-center'
        >
          <ApplicationLogo2
            aria-hidden='true'
            focusable='false'
            className='h-9 w-auto'
          />
        </Link>

        <div className='hidden items-center gap-8 lg:flex'>
          <NavbarLinks />

          <CalendarBooking>
            {({ openCalendar }) => (
              <Button
                type='button'
                onClick={() => {
                  trackEvent('cta_clicked', {
                    label: 'Book the working session',
                    section: 'header',
                  })
                  openCalendar()
                }}
                variant='v3NavPrimary'
                size='v3Hero'
                className='min-h-10 px-5 py-2 text-[15px]'
              >
                <span className='xl:hidden'>Book a session</span>
                <span className='hidden xl:inline'>Book the working session</span>
              </Button>
            )}
          </CalendarBooking>
        </div>

        <div className='flex items-center gap-3 lg:hidden'>
          <MobileNav />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
