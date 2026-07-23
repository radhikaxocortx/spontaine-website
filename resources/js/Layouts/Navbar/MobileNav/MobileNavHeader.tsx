import ApplicationLogo2 from '@/components/CustomUI/ApplicationLogo2'
import { SheetClose } from '@/components/ui/sheet'
import { Link } from '@inertiajs/react'
import { X } from 'lucide-react'

export const MobileNavHeader = () => (
  <div className='mb-8 flex items-center justify-between'>
    <Link
      href='/'
      aria-label='Go to Spontaine home page'
    >
      <ApplicationLogo2
        aria-hidden='true'
        focusable='false'
        className='h-8 w-auto'
      />
    </Link>
    <SheetClose asChild>
      <button
        aria-label='Close menu'
        className='text-spontaine-text-primary transition-colors duration-200 hover:text-spontaine-text-accent-dark'
      >
        <X
          size={26}
          strokeWidth={1.5}
        />
      </button>
    </SheetClose>
  </div>
)
