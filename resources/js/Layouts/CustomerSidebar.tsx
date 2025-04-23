import { Customer } from '@/components/Interface/data_interface'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import NormalText from '@/typography/NormalText'
import { Link, usePage } from '@inertiajs/react'
import { useMemo, useRef } from 'react'

export default function CustomerSidebar() {
  const userInfo = usePage().props.auth as unknown as { customer: Customer }
  const User = useMemo(() => {
    return userInfo.customer ?? null
  }, [userInfo])

  const userInitial = User?.first_name ? User.first_name.charAt(0).toUpperCase() : ''
  const userName = User?.first_name || ''

  const profileRef = useRef<HTMLDivElement>(null)

  return (
    <div className='flex flex-row justify-between p-4 px-4'>
      <div className='flex justify-start'></div>
      <div className='flex justify-end space-x-2'>
        <svg
          width={24}
          height={24}
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M21.0004 21L16.6504 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z'
            stroke='#1B1D28'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <svg
          width={24}
          height={24}
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10 3H3V10H10V3Z'
            stroke='#1B1D28'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M21 3H14V10H21V3Z'
            stroke='#1B1D28'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M21 14H14V21H21V14Z'
            stroke='#1B1D28'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M10 14H3V21H10V14Z'
            stroke='#1B1D28'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <div
          className=''
          ref={profileRef}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                className='flex items-center space-x-2 text-2xl'
              >
                <span>{userInitial}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='w-48'
            >
              <DropdownMenuItem>
                <NormalText>Logged in as {userName}</NormalText>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href='/customer-login'
                  method='get'
                  className='flex w-full items-center px-4 py-2'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-logout pr-2'
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
                  <NormalText>Sign out</NormalText>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
