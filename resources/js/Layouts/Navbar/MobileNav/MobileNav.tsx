import ApplicationLogo from '@/components/CustomUI/ApplicationLogo'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { Language } from '@/components/ui/ui_interfaces'
import InertiaLink from '@/Modules/PageBuilder/Components/InertiaLink'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { NavMenu } from '@/Modules/PageBuilder/page_interfaces'
import { Link, usePage } from '@inertiajs/react'
import { ChevronDownIcon, Menu } from 'lucide-react'
import { useState } from 'react'

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

const MobileNavItem = ({ item, lang = 'en' }: { item: NavMenu; lang?: Language }) => {
  const [isOpen, setIsOpen] = useState(false)
  const hasSubMenuItems = item.items?.items && item.items.items.length > 0
  const linkInfo = item.link_info

  if (!hasSubMenuItems) {
    return (
      <Link
        href={linkInfo?.link ?? '#'}
        target={linkInfo?.external ? '_blank' : undefined}
        rel={linkInfo?.external ? 'noopener noreferrer' : undefined}
        className='text-base font-medium text-neutral-700 hover:text-neutral-900'
      >
        <Localization
          text={{
            english: item.title,
            malayalam: item.title_malayalam ?? '',
          }}
          language={lang}
        />
      </Link>
    )
  }

  return (
    <div className='space-y-2'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex w-full items-center justify-between text-base font-medium text-neutral-700 hover:text-neutral-900'
      >
        <Localization
          text={{
            english: item.title,
            malayalam: item.title_malayalam ?? '',
          }}
          language={lang}
        />
        <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className='ml-4 space-y-2 border-l border-neutral-200 pl-4'>
          {item.items?.items.map((subItem) => (
            <div
              key={subItem.id}
              className='space-y-2'
            >
              <div className='text-sm font-semibold text-gray-600'>
                <Localization
                  text={subItem.section}
                  language={lang}
                />
              </div>
              <div className='space-y-1'>
                {subItem.links.map((link) => (
                  <div key={link.id}>
                    <InertiaLink
                      className='block text-neutral-600 hover:text-neutral-900'
                      link={link}
                      language={lang}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function MobileNav() {
  const {
    nav,
    lang = 'en',
    auth,
  } = usePage().props as unknown as {
    nav?: NavMenu[]
    lang?: Language
    auth: { user?: AuthUser; customer?: AuthCustomer }
  }
  //   const isCustomerLoggedIn = !!auth.customer

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          aria-label='Open menu'
          className=''
        >
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
            {nav?.map((menuItem) => (
              <MobileNavItem
                key={menuItem.id.toString()}
                item={menuItem}
                lang={lang}
              />
            ))}
          </div>
        </div>
        <SheetFooter>
          {/* <div className='flex w-full flex-col space-y-4'>
            <div className='mt-4 flex justify-center'>
              <CountrySelector />
            </div>
            {!isCustomerLoggedIn ? (
              <>
                <Button variant='outline'>Login</Button>
                <Button variant='default'>Get Started</Button>
              </>
            ) : (
              <Button variant='default'>My Account</Button>
            )}
          </div> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
