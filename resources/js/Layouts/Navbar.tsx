import ApplicationLogo from '@/Components/CustomUI/ApplicationLogo'
import CountrySelector from '@/Components/CustomUI/CountrySelector'
import { Button } from '@/components/ui/button'
import AppLayoutPadding from './AppLayoutPadding'
import { MobileNav } from './Nav/MobileNav'
import { NavLinks } from './Nav/NavLinks'

const Navbar = () => {
  return (
    <nav className='sticky top-0 z-50 place-items-center bg-white shadow-md'>
      <AppLayoutPadding>
        <div className='flex items-center justify-between py-4'>
          <div className='flex items-center'>
            <ApplicationLogo className='w-28 2xl:w-36' />
          </div>
          <div className='hidden items-center gap-4 lg:flex'>
            <NavLinks />
            <Button size='md'>Verify Your Business</Button>
            <CountrySelector />
          </div>

          <MobileNav />
        </div>
      </AppLayoutPadding>
    </nav>
  )
}
export default Navbar
