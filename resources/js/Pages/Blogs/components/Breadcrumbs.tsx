import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { Link } from '@inertiajs/react'

const Breadcrumbs = () => (
  <AppLayoutPadding>
    <nav className='flex items-center space-x-1 py-4 text-sm text-gray-600'>
      <Link
        href='/'
        className='font-space-grotesk text-xs'
      >
        Home
      </Link>
      <span className='mx-2 text-gray-400'>/</span>
      <span className='font-space-grotesk text-xs'>Blogs</span>
    </nav>
  </AppLayoutPadding>
)

export default Breadcrumbs
