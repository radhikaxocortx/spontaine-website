import ApplicationLogo from '@/components/CustomUI/ApplicationLogo'
import { Link, usePage } from '@inertiajs/react'
import AppLayoutPadding from '../AppLayoutPadding'

import CountrySelector from '@/components/CustomUI/CountrySelector'
import CustomerSidebar from '../CustomerSidebar'
import { MobileNav } from './MobileNav/MobileNav'
import NavbarLinks from './NavbarLinks'

interface AuthUser {
  id: number
  name: string
  email: string
}

interface AuthCustomer {
  id: number
  first_name: string
  last_name: string
  email: string
}

const Navbar = () => {
  const { auth } = usePage().props as { auth: { user?: AuthUser; customer?: AuthCustomer } }
  const isCustomerLoggedIn = !!auth.customer

  return (
    <nav className='sticky top-0 z-50 place-items-center bg-white shadow-md'>
      <AppLayoutPadding>
        <div className='flex items-center justify-between py-4'>
          <div className='flex items-center'>
            <Link href='/'>
              <ApplicationLogo className='w-32 2xl:w-36' />
            </Link>
          </div>
          <div className='hidden items-center gap-4 lg:flex'>
            <NavbarLinks />
            {/* <Button size='md'>Verify Your Business</Button> */}
            <CountrySelector />
            {isCustomerLoggedIn && <CustomerSidebar />}
          </div>
          <div className='lg:hidden'>
            <MobileNav />
          </div>
        </div>
      </AppLayoutPadding>
    </nav>
  )
}

export default Navbar
