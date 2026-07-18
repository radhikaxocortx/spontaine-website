import { CalendarBooking } from '@/components/CalendarBooking'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Language } from '@/components/ui/ui_interfaces'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { NavMenu } from '@/Modules/PageBuilder/page_interfaces'
import { Link, usePage } from '@inertiajs/react'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { MobileNavHeader } from './MobileNavHeader'

function MobileNavItem({
  item,
  lang = 'en',
  onNavigate,
}: {
  item: NavMenu
  lang?: Language
  onNavigate: () => void
}) {
  return (
    <Link
      href={item.link_info?.link ?? '#'}
      target={item.link_info?.external ? '_blank' : undefined}
      rel={item.link_info?.external ? 'noopener noreferrer' : undefined}
      onClick={onNavigate}
      className='border-b border-spontaine-border-subtle py-4 font-display text-[28px] font-semibold leading-[1.1] tracking-[-0.03em] text-spontaine-text-primary transition-colors duration-200 hover:text-spontaine-text-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-spontaine-accent-dark'
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

export function MobileNav() {
  const { nav, lang = 'en' } = usePage().props as unknown as {
    nav?: NavMenu[]
    lang?: Language
  }
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [shouldOpenCalendar, setShouldOpenCalendar] = useState(false)

  const handleBookDemoClick = () => {
    setIsSheetOpen(false)
    setShouldOpenCalendar(true)
  }

  return (
    <>
      <Sheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
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

        <SheetContent className='!fixed !inset-0 z-[100] !flex !h-screen !w-screen !max-w-none !flex-col !justify-between !space-y-0 !overflow-hidden !rounded-none !border-0 bg-spontaine-surface-paper !p-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 [&>button]:hidden'>
          <div className='flex h-full w-full flex-1 flex-col overflow-hidden px-[var(--space-shell-sm)] py-5'>
            <MobileNavHeader />

            <p className='mb-5 font-mono text-[0.72rem] font-medium uppercase tracking-[0.14em] text-spontaine-text-tertiary'>
              Navigation
            </p>

            <nav className='flex flex-col overflow-y-auto'>
              {nav?.map((menuItem) => (
                <MobileNavItem
                  key={menuItem.id.toString()}
                  item={menuItem}
                  lang={lang}
                  onNavigate={() => setIsSheetOpen(false)}
                />
              ))}
            </nav>
          </div>

          <div className='border-t border-spontaine-border-subtle bg-spontaine-surface-cream/45 p-[var(--space-shell-sm)]'>
            <Button
              type='button'
              onClick={handleBookDemoClick}
              variant='v3NavPrimary'
              size='v3Hero'
              className='w-full'
            >
              Book Demo
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <CalendarBooking>
        {({ openCalendar }) => {
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
