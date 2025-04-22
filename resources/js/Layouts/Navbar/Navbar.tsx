import ApplicationLogo from '@/Components/CustomUI/ApplicationLogo'
import { Language } from '@/Components/ui/ui_interfaces'
import { usePage } from '@inertiajs/react'
import AppLayoutPadding from '../AppLayoutPadding'

import CountrySelector from '@/Components/CustomUI/CountrySelector'
import { MobileNav } from '../Nav/MobileNav'
import NavbarLinks from './NavbarLinks'

const Navbar = () => {
  const { lang = 'en' } = usePage().props as unknown as {
    lang?: Language
  }

  return (
    <nav className='sticky top-0 z-50 place-items-center bg-white shadow-md'>
      <AppLayoutPadding>
        <div className='flex items-center justify-between py-4'>
          <div className='flex items-center'>
            <ApplicationLogo className='w-28 2xl:w-36' />
          </div>
          <div className='hidden items-center gap-4 lg:flex'>
            <NavbarLinks />
            {/* <Button size='md'>Verify Your Business</Button> */}
            <CountrySelector />
          </div>

          <MobileNav />
        </div>
      </AppLayoutPadding>
    </nav>
  )
}

export default Navbar
