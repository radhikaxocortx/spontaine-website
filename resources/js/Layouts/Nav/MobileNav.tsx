import ApplicationLogo from '@/components/CustomUI/ApplicationLogo'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { Link } from '@inertiajs/react'
import { Menu } from 'lucide-react'

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className='lg:hidden'>
          <Menu size={24} />
        </button>
      </SheetTrigger>

      <SheetContent
        side='left'
        className='flex flex-col justify-between space-y-6 p-6'
      >
        <div className='flex flex-col space-y-6'>
          <SheetHeader>
            <ApplicationLogo className='w-24' />
          </SheetHeader>

          <div className='flex flex-col space-y-4'>
            <Link
              href='#'
              className='hover:text-primary-500'
            >
              Home
            </Link>
            <Link
              href='#'
              className='hover:text-blue-500'
            >
              Products
            </Link>
            <Link
              href='#'
              className='hover:text-blue-500'
            >
              Pricing
            </Link>
            <Link
              href='#'
              className='hover:text-blue-500'
            >
              Contact Us
            </Link>
          </div>
        </div>
        <SheetFooter>
          <div className='flex w-full flex-col space-y-4'>
            <Button variant='outline'>Login</Button>
            <Button variant='default'>Get Started</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
