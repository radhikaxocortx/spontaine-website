import ApplicationLogo from '@/Components/CustomUI/ApplicationLogo'
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
            <ApplicationLogo className='w-24' />
          </div>
          <div className='hidden lg:block'>
            <NavLinks />
          </div>

          <div className='hidden items-center space-x-4 lg:flex'>
            <Button
              variant='outline'
              size='xxl'
            >
              {' '}
              Login{' '}
            </Button>
            <Button size='md'> Get Started </Button>
          </div>
          <MobileNav />
        </div>
      </AppLayoutPadding>
    </nav>
  )
}
export default Navbar
