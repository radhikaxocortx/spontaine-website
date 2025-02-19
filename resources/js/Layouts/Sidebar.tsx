import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { User } from '@/types'
import { Link, router, usePage } from '@inertiajs/react'
import { useMemo, useRef, useState } from 'react'
import SidebarMenuItems from './sidebar-menu-items'

const SHEET_SIDES = ['left'] as const

type SidebarType = (typeof SHEET_SIDES)[number]

export default function Sidebar() {
  const userInfo = usePage().props.auth as unknown as { user: User }
  const User = useMemo(() => {
    if (userInfo.user) {
      return userInfo.user
    }
    return null
  }, [userInfo])
  const userInitial = User?.name ? User.name.charAt(0).toUpperCase() : ''
  const userName = User?.name || ''

  const profileRef = useRef<HTMLDivElement>(null)
  const [isProfileDropdown, setIsProfileDropdown] = useState(false)

  return (
    <div className='grid grid-cols-2 gap-2'>
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <div className='p-7 hover:cursor-pointer'>
              <svg
                fill='#000000'
                width='32'
                height='33'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g data-name='Layer 2'>
                  <g data-name='menu'>
                    <rect
                      width='24'
                      height='24'
                      transform='rotate(180 12 12)'
                      opacity='0'
                    />

                    <rect
                      x='3'
                      y='11'
                      width='18'
                      height='2'
                      rx='.95'
                      ry='.95'
                    />

                    <rect
                      x='3'
                      y='16'
                      width='18'
                      height='2'
                      rx='.95'
                      ry='.95'
                    />

                    <rect
                      x='3'
                      y='6'
                      width='18'
                      height='2'
                      rx='.95'
                      ry='.95'
                    />
                  </g>
                </g>
              </svg>
            </div>
          </SheetTrigger>
          <div
            className='ml-auto mt-6 flex flex-shrink-0 items-center justify-center p-5 sm:relative sm:justify-normal'
            ref={profileRef}
          >
            <div className='flex flex-col items-center'>
              <div className='flex'>
                <button
                  className='h1-stop flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-1stop-gray bg-1stop-accent2 text-2xl text-black'
                  onClick={() => setIsProfileDropdown(!isProfileDropdown)}
                >
                  {userInitial}
                </button>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className={`mt-4 h-5 w-5 transform cursor-pointer duration-300 md:h-6 md:w-6 ${isProfileDropdown ? 'rotate-180' : ''}`}
                  onClick={() => setIsProfileDropdown(!isProfileDropdown)}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                  />
                </svg>
              </div>

              {isProfileDropdown && (
                <div className='mt-2 flex justify-center'>
                  <div className='bg:opacity-100 z-50 w-48 rounded-xl border border-1stop-highlight bg-1stop-white p-2 shadow sm:absolute sm:right-10'>
                    {/* User Name */}
                    <div className='px-4 py-2 text-center'>
                      <p className='small-1stop text-gray-900'>Logged in as {userName}</p>
                    </div>
                    <hr />
                    {/* Logout Button */}
                    <div className='py-2'>
                      <Link
                        href='/logout'
                        method='post'
                        className='text-black-700 small-1stop flex w-full rounded px-4 py-2 text-left hover:bg-1stop-gray'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon icon-tabler icon-tabler-logout'
                          width={20}
                          height={20}
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path
                            stroke='none'
                            d='M0 0h24v24H0z'
                          />
                          <path d='M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2' />
                          <path d='M7 12h14l-3 -3m0 6l3 -3' />
                        </svg>
                        <span className='ml-2 text-sm'>Sign out</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle className='h3-1stop p-5'>KADODO</SheetTitle>
              <div className='mr-auto flex flex-col'>
                {SidebarMenuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => router.get(item.url || '')}
                    className='small-1stop-header mr-auto p-5 text-1stop-dark'
                  >
                    {/* <span
                      dangerouslySetInnerHTML={{
                        __html: typeof item.image === 'string' ? item.image : item.image.svg,
                      }}
                    /> */}
                    {item.name}
                  </button>
                ))}
              </div>
            </SheetHeader>

            <SheetFooter>{/* <SheetClose asChild></SheetClose> */}</SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
