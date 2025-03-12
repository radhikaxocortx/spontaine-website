import ApplicationLogo from '@/Components/CustomUI/ApplicationLogo'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { User } from '@/types'
import Heading from '@/typography/Heading'
import NormalText from '@/typography/NormalText'
import SubHeading from '@/typography/SubHeading'
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
    <div className='flex flex-row items-center justify-between px-4'>
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <div className='flex flex-row items-center gap-4 p-7 hover:cursor-pointer'>
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
              <Link href='/'>
                <ApplicationLogo className='block h-6 w-auto fill-current text-gray-800' />
              </Link>
            </div>
          </SheetTrigger>

          <div className='flex items-center justify-end space-x-2'>
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
                    <SubHeading>Logged in as {userName}</SubHeading>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href='/logout'
                      method='post'
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

          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle className='p-5'>
                <Heading>KADODO</Heading>
              </SheetTitle>

              <div className='w-full'>
                <Accordion
                  type='single'
                  collapsible
                >
                  {SidebarMenuItems.map((menu) => (
                    <AccordionItem
                      key={menu.title}
                      value={menu.title}
                    >
                      <AccordionTrigger className='p-4 font-bold'>{menu.title}</AccordionTrigger>

                      <AccordionContent className='pl-4'>
                        {menu.items.map((item) => (
                          <Button
                            key={item.name}
                            onClick={() => router.get(item.url || '')}
                            className='items-left flex w-full p-2 text-left'
                            variant='ghost'
                          >
                            {typeof item.image !== 'string' && item.image?.svg && (
                              <span
                                className='mr-2'
                                dangerouslySetInnerHTML={{ __html: item.image.svg }}
                              />
                            )}
                            {item.name}
                          </Button>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </SheetHeader>

            <SheetFooter>{/* <SheetClose asChild></SheetClose> */}</SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
