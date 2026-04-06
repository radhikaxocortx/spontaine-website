import { CalendarBooking } from '@/components/CalendarBooking'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Language } from '@/components/ui/ui_interfaces'
import InertiaLink from '@/Modules/PageBuilder/Components/InertiaLink'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { NavMenu } from '@/Modules/PageBuilder/page_interfaces'
import { Link, usePage } from '@inertiajs/react'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { MobileNavHeader } from './MobileNavHeader'

// Reusable arrow icon component
const RightArrowIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='h-6 w-6 flex-shrink-0'
  >
    <path d='M5 12h14M12 5l7 7-7 7' />
  </svg>
)

const LeftArrowIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='h-6 w-6'
  >
    <path d='M19 12H5M12 19l-7-7 7-7' />
  </svg>
)

// Shared menu item styles
const MENU_ITEM_CLASS =
  'flex items-center justify-between border-b border-white/30 py-4 text-xl leading-[1.2] text-spontaine-light transition-opacity hover:opacity-70'

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

  const content = (
    <>
      <Localization
        text={{
          english: item.title,
          malayalam: item.title_malayalam ?? '',
        }}
        language={lang}
      />
      <RightArrowIcon />
    </>
  )

  if (!hasSubMenuItems) {
    return (
      <Link
        href={linkInfo?.link ?? '#'}
        target={linkInfo?.external ? '_blank' : undefined}
        rel={linkInfo?.external ? 'noopener noreferrer' : undefined}
        className={MENU_ITEM_CLASS}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      onClick={() => onNavigateSub(item)}
      className={`w-full text-left ${MENU_ITEM_CLASS}`}
    >
      {content}
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
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [shouldOpenCalendar, setShouldOpenCalendar] = useState(false)

  const handleNavigateSub = (item: NavMenu) => {
    setActiveMenu(item)
    setView('submenu')
  }

  const handleBack = () => {
    setView('root')
    setActiveMenu(null)
  }

  const handleBookDemoClick = () => {
    setIsSheetOpen(false)
    setShouldOpenCalendar(true)
  }

  const handleSheetOpenChange = (open: boolean) => {
    setIsSheetOpen(open)
    // Reset to root view when sheet is closed
    if (!open) {
      setView('root')
      setActiveMenu(null)
    }
  }

  return (
    <>
      <Sheet
        open={isSheetOpen}
        onOpenChange={handleSheetOpenChange}
      >
        <SheetTrigger asChild>
          <button
            aria-label='Open menu'
            className=''
          >
            <Menu
              size={24}
              className='text-spontaine-light'
            />
          </button>
        </SheetTrigger>

        <SheetContent className='!fixed !inset-0 z-[100] !flex !h-screen !w-screen !max-w-none !flex-col !justify-between !space-y-0 !overflow-hidden !rounded-none !border-0 bg-spontaine-dark !p-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 [&>button]:hidden'>
          {/* Root and Submenu views with slide transitions */}
          <div className='relative flex h-full w-full flex-1 flex-col overflow-hidden'>
            {/* Root view */}
            <div
              className={`absolute inset-0 flex h-full w-full flex-col bg-white/0 px-6 py-6 transition-transform duration-200 ${view === 'root' ? 'translate-x-0' : '-translate-x-full'}`}
            >
              <MobileNavHeader />

              {/* Navigation label */}
              <div className='mb-6'>
                <p className='text-base font-light tracking-wide text-spontaine-light/60'>
                  Navigation
                </p>
              </div>

              <nav className='flex flex-col overflow-y-auto'>
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
              className={`absolute inset-0 flex h-full w-full flex-col bg-white/0 px-6 py-6 transition-transform duration-200 ${view === 'submenu' ? 'translate-x-0' : 'translate-x-full'}`}
            >
              <MobileNavHeader />

              {/* Back button with parent menu title */}
              <div className='mb-6 flex items-center gap-3'>
                <button
                  type='button'
                  onClick={handleBack}
                  className='text-spontaine-light transition-opacity hover:opacity-70'
                  aria-label='Back to main menu'
                >
                  <LeftArrowIcon />
                </button>
                <p className='text-base font-light tracking-wide text-spontaine-light/50'>
                  <Localization
                    text={{
                      english: activeMenu?.title ?? '',
                      malayalam: activeMenu?.title_malayalam ?? '',
                    }}
                    language={lang}
                  />
                </p>
              </div>

              <nav className='flex flex-col overflow-y-auto'>
                {activeMenu?.items?.items?.map((subItem) => (
                  <div key={subItem.id}>
                    {subItem.links.map((link) => (
                      <InertiaLink
                        key={link.id}
                        className={MENU_ITEM_CLASS}
                        link={link}
                        language={lang}
                      >
                        <Localization
                          text={link.name}
                          language={lang}
                        />
                        <RightArrowIcon />
                      </InertiaLink>
                    ))}
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Footer CTA - Always visible at bottom */}
          <div className='flex-shrink-0 border-t border-white/10 bg-white/0 p-6'>
            <Button
              onClick={handleBookDemoClick}
              size='lg'
              className='w-full rounded-full bg-spontaine-accent-bright py-6 text-white shadow-2xl'
            >
              <span className='nav-cta-text'>Book Demo</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* CalendarBooking outside Sheet to avoid unmounting issues */}
      <CalendarBooking>
        {({ openCalendar }) => {
          // Auto-open calendar when shouldOpenCalendar is true
          if (shouldOpenCalendar) {
            setShouldOpenCalendar(false)
            setTimeout(openCalendar, 100)
          }
          return null
        }}
      </CalendarBooking>
    </>
  )
}
