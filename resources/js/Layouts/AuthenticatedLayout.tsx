import ApplicationLogo from '@/components/CustomUI/ApplicationLogo'
import { Link, usePage } from '@inertiajs/react'
import { PropsWithChildren, ReactNode } from 'react'

export default function Authenticated({
  header,
  children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  const user = usePage().props.auth.user

  return (
    <div className='min-h-screen bg-gray-100'>
      <nav className='border-b border-gray-100 bg-white'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex h-16 justify-between'>
            <div className='flex'>
              <div className='flex shrink-0 items-center'>
                <Link href='/'>
                  <ApplicationLogo className='block h-9 w-auto fill-current text-gray-800' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}
