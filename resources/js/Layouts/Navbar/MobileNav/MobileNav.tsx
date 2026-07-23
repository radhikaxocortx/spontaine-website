import { CalendarBooking } from '@/components/CalendarBooking'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Language } from '@/components/ui/ui_interfaces'
import InertiaLink from '@/Modules/PageBuilder/Components/InertiaLink'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { NavMenu } from '@/Modules/PageBuilder/page_interfaces'
import { Link, usePage } from '@inertiajs/react'
import { ChevronDown, Menu } from 'lucide-react'
import { useState } from 'react'
import { MobileNavHeader } from './MobileNavHeader'

function MobileNavItem({
  item,
  lang = 'en',
  onNavigate,
  isOpen,
  onToggle,
}: {
  item: NavMenu
  lang?: Language
  onNavigate: () => void
  isOpen: boolean
  onToggle: () => void
}) {
  const sectionGroups = item.items?.items?.filter((section) => section.links.length > 0) ?? []
  const hasSubMenuItems = sectionGroups.length > 0

  if (!hasSubMenuItems) {
    return (
      <div className='py-3'>
        <Link
          href={item.link_info?.link ?? '#'}
          target={item.link_info?.external ? '_blank' : undefined}
          rel={item.link_info?.external ? 'noopener noreferrer' : undefined}
          onClick={onNavigate}
          className='block min-w-0 font-body text-[15px] font-medium text-spontaine-text-primary transition-colors duration-200 hover:text-spontaine-text-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-spontaine-accent-dark'
        >
          <Localization
            text={{
              english: item.title,
              malayalam: item.title_malayalam ?? '',
            }}
            language={lang}
          />
        </Link>
      </div>
    )
  }

  return (
    <div className='py-3'>
      <div
        role='button'
        tabIndex={0}
        aria-label={`Toggle ${item.title} submenu`}
        aria-expanded={isOpen}
        onClick={onToggle}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onToggle()
          }
        }}
        className='flex cursor-pointer items-center justify-between gap-3 rounded-[14px] transition-colors duration-200 hover:text-spontaine-text-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spontaine-accent-dark'
      >
        <Link
          href={item.link_info?.link ?? '#'}
          target={item.link_info?.external ? '_blank' : undefined}
          rel={item.link_info?.external ? 'noopener noreferrer' : undefined}
          onClick={(event) => {
            event.stopPropagation()
            onNavigate()
          }}
          className='block min-w-0 max-w-full flex-none truncate font-body text-[15px] font-medium text-spontaine-text-primary transition-colors duration-200 hover:text-spontaine-text-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-spontaine-accent-dark'
        >
          <Localization
            text={{
              english: item.title,
              malayalam: item.title_malayalam ?? '',
            }}
            language={lang}
          />
        </Link>

        <span
          aria-hidden='true'
          className='min-w-4 flex-1 self-stretch'
        />

        <span className='flex h-7 w-7 flex-none items-center justify-center rounded-[var(--radius-pill)] text-spontaine-text-primary transition-colors duration-200 hover:bg-spontaine-surface-cream hover:text-spontaine-text-accent-dark'>
          <ChevronDown
            aria-hidden='true'
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-spontaine-text-accent-dark' : ''
            }`}
          />
        </span>
      </div>

      {isOpen && (
        <div className='mt-4 space-y-3 rounded-[18px] bg-spontaine-surface-cream/45 p-3'>
          {sectionGroups.map((section) => (
            <div
              key={section.id}
              className='space-y-1.5'
            >
              <p className='px-2 font-mono text-[0.66rem] font-medium uppercase tracking-[0.12em] text-spontaine-text-tertiary'>
                <Localization
                  text={section.section}
                  language={lang}
                />
              </p>

              <div className='space-y-1'>
                {section.links.map((link) => (
                  <InertiaLink
                    key={link.id}
                    link={link}
                    language={lang}
                    onClick={onNavigate}
                    className='block rounded-[12px] px-2.5 py-2 font-body text-sm font-medium text-spontaine-text-primary transition-colors duration-200 hover:bg-spontaine-surface-paper hover:text-spontaine-text-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spontaine-accent-dark'
                  />
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
  const { nav, lang = 'en' } = usePage().props as unknown as {
    nav?: NavMenu[]
    lang?: Language
  }
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  const handleBookDemoClick = (openCalendar: () => void) => {
    setIsSheetOpen(false)
    setTimeout(openCalendar, 100)
  }

  return (
    <>
      <Sheet
        open={isSheetOpen}
        onOpenChange={(nextOpen) => {
          setIsSheetOpen(nextOpen)

          if (!nextOpen) {
            setOpenMenuId(null)
          }
        }}
      >
        <SheetTrigger asChild>
          <button
            type='button'
            aria-label='Open menu'
            className='flex h-9 w-9 items-center justify-center rounded-[var(--radius-pill)] text-spontaine-text-primary transition-colors duration-200 hover:bg-spontaine-surface-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spontaine-accent-dark'
          >
            <Menu
              aria-hidden='true'
              className='h-5 w-5'
            />
          </button>
        </SheetTrigger>

        <SheetContent className='!fixed !inset-0 z-[100] !flex !h-screen !w-screen !max-w-none !flex-col !space-y-0 !overflow-hidden !rounded-none !border-0 bg-spontaine-surface-paper !p-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 [&>button]:hidden'>
          <div className='flex min-h-0 w-full flex-1 flex-col overflow-hidden px-[var(--space-shell-sm)] py-5'>
            <MobileNavHeader />

            <p className='mb-5 font-mono text-[0.72rem] font-medium uppercase tracking-[0.14em] text-spontaine-text-tertiary'>
              Navigation
            </p>

            <nav className='flex min-h-0 flex-1 flex-col overflow-y-auto'>
              {nav?.map((menuItem) => (
                <MobileNavItem
                  key={menuItem.id.toString()}
                  item={menuItem}
                  lang={lang}
                  isOpen={openMenuId === menuItem.id.toString()}
                  onToggle={() => {
                    const menuId = menuItem.id.toString()
                    setOpenMenuId((currentMenuId) => (currentMenuId === menuId ? null : menuId))
                  }}
                  onNavigate={() => {
                    setIsSheetOpen(false)
                    setOpenMenuId(null)
                  }}
                />
              ))}
            </nav>
          </div>

          <div className='flex-none bg-spontaine-surface-cream/45 p-[var(--space-shell-sm)]'>
            <CalendarBooking>
              {({ openCalendar }) => (
                <Button
                  type='button'
                  onClick={() => handleBookDemoClick(openCalendar)}
                  variant='v3NavPrimary'
                  size='v3Hero'
                  className='min-h-10 w-full px-5 py-2 text-[15px]'
                >
                  Book a session
                </Button>
              )}
            </CalendarBooking>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
