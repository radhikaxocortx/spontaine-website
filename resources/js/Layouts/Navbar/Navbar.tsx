import { CalendarBooking } from '@/components/CalendarBooking'
import ApplicationLogo2 from '@/components/CustomUI/ApplicationLogo2'
import { Button } from '@/components/ui/button'
import { Link } from '@inertiajs/react'
import { MobileNav } from './MobileNav/MobileNav'
import NavbarLinks from './NavbarLinks'

const Navbar = () => {
  return (
    <nav className='fixed left-0 top-0 z-50 w-full bg-spontaine-surface-paper/50 backdrop-blur-md'>
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
                onClick={openCalendar}
                variant='v3NavPrimary'
                size='v3Hero'
                className='min-h-10 px-5 py-2 text-[15px]'
              >
                Book a session
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
