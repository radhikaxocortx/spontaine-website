import ApplicationLogo2 from '@/components/CustomUI/ApplicationLogo2'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTrigger } from '@/components/ui/sheet'
import { Language } from '@/components/ui/ui_interfaces'
import InertiaLink from '@/Modules/PageBuilder/Components/InertiaLink'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { NavMenu } from '@/Modules/PageBuilder/page_interfaces'
import { Link, usePage } from '@inertiajs/react'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
const MobileNavItem = ({
  item,
  lang = 'en',
  onNavigateSub,
}: {
  item: NavMenu
  lang?: Language
  onNavigateSub: (item: NavMenu) => void
}) => {
  const hasSubMenuItems = item.items?.items && item.items.items.length > 0
  const linkInfo = item.link_info

  if (!hasSubMenuItems) {
    return (
      <Link
        href={linkInfo?.link ?? '#'}
        target={linkInfo?.external ? '_blank' : undefined}
        rel={linkInfo?.external ? 'noopener noreferrer' : undefined}
        className='flex items-center justify-between border-b border-white/30 py-4 text-[28px] font-normal leading-tight text-black transition-opacity hover:opacity-70'
      >
        <Localization
          text={{
            english: item.title,
            malayalam: item.title_malayalam ?? '',
          }}
          language={lang}
        />
        <i className='fas fa-arrow-right-long text-2xl' />
      </Link>
    )
  }

  return (
    <button
      onClick={() => onNavigateSub(item)}
      className='flex w-full items-center justify-between border-b border-white/30 py-4 text-left text-[28px] font-normal leading-tight text-black transition-opacity hover:opacity-70'
    >
      <Localization
        text={{
          english: item.title,
          malayalam: item.title_malayalam ?? '',
        }}
        language={lang}
      />
      <i className='fas fa-arrow-right-long text-2xl' />
    </button>
  )
}

export function MobileNav() {
  const { nav, lang = 'en' } = usePage().props as unknown as {
    nav?: NavMenu[]
    lang?: Language
  }
  const [view, setView] = useState<'root' | 'submenu'>('root')
  const [activeMenu, setActiveMenu] = useState<NavMenu | null>(null)

  const handleNavigateSub = (item: NavMenu) => {
    setActiveMenu(item)
    setView('submenu')
  }

  const handleBack = () => {
    setView('root')
    setActiveMenu(null)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          aria-label='Open menu'
          className=''
        >
          <Menu
            size={24}
            className='text-white'
          />
        </button>
      </SheetTrigger>

      <SheetContent className='bg-spontaine-accent-ring !fixed !inset-0 z-[100] !flex !h-screen !w-screen !max-w-none !flex-col !justify-between !space-y-0 !overflow-hidden !rounded-none !border-0 !p-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 [&>button]:hidden'>
        {/* Root and Submenu views with slide transitions */}
        <div className='relative flex h-full w-full flex-col'>
          {/* Root view */}
          <div
            className={`absolute inset-0 flex h-full w-full flex-col bg-white/0 px-6 py-5 transition-transform duration-200 ${view === 'root' ? 'translate-x-0' : '-translate-x-full'}`}
          >
            {/* Header: Logo left, CTA + Close button right (matches mobile navbar layout) */}
            <div className='mb-12 flex items-center justify-between'>
              <Link href='/'>
                <ApplicationLogo2 className='h-8' />
              </Link>
              <div className='flex items-center gap-3'>
                <Link href='/how-it-works'>
                  <Button
                    size='lg'
                    className='relative overflow-hidden rounded-full bg-spontaine-highlight px-4 py-2 text-white shadow-2xl'
                  >
                    <span className='nav-cta-text'>Book Demo</span>
                  </Button>
                </Link>
                <SheetClose asChild>
                  <button
                    aria-label='Close menu'
                    className='text-white'
                  >
                    <X size={24} />
                  </button>
                </SheetClose>
              </div>
            </div>
            <nav className='flex flex-col'>
              {nav?.map((menuItem) => (
                <MobileNavItem
                  key={menuItem.id.toString()}
                  item={menuItem}
                  lang={lang}
                  onNavigateSub={handleNavigateSub}
                />
              ))}
            </nav>
          </div>

          {/* Submenu view */}
          <div
            className={`absolute inset-0 flex h-full w-full flex-col overflow-y-auto bg-white/0 px-6 py-5 transition-transform duration-200 ${view === 'submenu' ? 'translate-x-0' : 'translate-x-full'}`}
          >
            {/* Header: Back button + Logo left, CTA + Close button right */}
            <div className='mb-12 flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <button
                  type='button'
                  onClick={handleBack}
                  className='text-white transition-opacity hover:opacity-70'
                  aria-label='Back to main menu'
                >
                  <i className='fas fa-arrow-left text-2xl' />
                </button>
                <Link href='/'>
                  <ApplicationLogo2 className='h-8' />
                </Link>
              </div>
              <div className='flex items-center gap-3'>
                <Link href='/how-it-works'>
                  <Button
                    size='lg'
                    className='relative overflow-hidden rounded-full bg-spontaine-highlight px-4 py-2 text-white shadow-2xl'
                  >
                    <span className='nav-cta-text'>Book Demo</span>
                  </Button>
                </Link>
                <SheetClose asChild>
                  <button
                    aria-label='Close menu'
                    className='text-white'
                  >
                    <X size={24} />
                  </button>
                </SheetClose>
              </div>
            </div>
            <nav className='flex flex-col'>
              {activeMenu?.items?.items?.map((subItem) => (
                <div key={subItem.id}>
                  {subItem.links.map((link) => (
                    <InertiaLink
                      key={link.id}
                      className='flex items-center justify-between border-b border-white/30 py-4 text-[28px] font-normal leading-tight text-black transition-opacity hover:opacity-70'
                      link={link}
                      language={lang}
                    >
                      <span>
                        <Localization
                          text={link.name}
                          language={lang}
                        />
                      </span>
                      <i className='fas fa-arrow-right-long text-2xl' />
                    </InertiaLink>
                  ))}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </SheetContent>
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
    </Sheet>
  )
}
