import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Language } from '@/components/ui/ui_interfaces'
import InertiaLink from '@/Modules/PageBuilder/Components/InertiaLink'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { NavMenu } from '@/Modules/PageBuilder/page_interfaces'
import { Link, usePage } from '@inertiajs/react'
import { ChevronDown } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

const NavbarLinks = () => {
  const { nav, lang = 'en' } = usePage().props as unknown as {
    nav?: NavMenu[]
    lang?: Language
  }
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof window.setTimeout> | null>(null)

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current == null) {
      return
    }

    window.clearTimeout(closeTimerRef.current)
    closeTimerRef.current = null
  }, [])

  const openMenu = useCallback(
    (menuId: string) => {
      clearCloseTimer()
      setOpenMenuId(menuId)
    },
    [clearCloseTimer]
  )

  const closeMenu = useCallback(() => {
    clearCloseTimer()
    closeTimerRef.current = window.setTimeout(() => {
      setOpenMenuId(null)
      closeTimerRef.current = null
    }, 140)
  }, [clearCloseTimer])

  useEffect(() => clearCloseTimer, [clearCloseTimer])

  return (
    <div className='flex items-center gap-7'>
      {nav?.map((menuItem) => {
        const menuId = menuItem.id.toString()
        const sectionGroups =
          menuItem.items?.items?.filter((section) => section.links.length > 0) ?? []
        const hasSubMenuItems = sectionGroups.length > 0

        if (!hasSubMenuItems) {
          return (
            <Link
              key={menuId}
              href={menuItem.link_info?.link ?? '#'}
              target={menuItem.link_info?.external ? '_blank' : undefined}
              rel={menuItem.link_info?.external ? 'noopener noreferrer' : undefined}
              className='font-body text-[15px] font-medium text-spontaine-text-primary transition-colors duration-200 hover:text-spontaine-text-accent-dark'
            >
              <Localization
                text={{
                  english: menuItem.title,
                  malayalam: menuItem.title_malayalam ?? '',
                }}
                language={lang}
              />
            </Link>
          )
        }

        return (
          <DropdownMenu
            modal={false}
            key={menuId}
            open={openMenuId === menuId}
            onOpenChange={(nextOpen) => {
              if (nextOpen) {
                openMenu(menuId)
                return
              }

              setOpenMenuId(null)
            }}
          >
            <DropdownMenuTrigger asChild>
              <div
                className='flex items-center gap-1'
                role='button'
                tabIndex={0}
                aria-label={`Open ${menuItem.title} submenu`}
                aria-expanded={openMenuId === menuId}
                onMouseEnter={() => openMenu(menuId)}
                onMouseLeave={closeMenu}
              >
                <Link
                  href={menuItem.link_info?.link ?? '#'}
                  target={menuItem.link_info?.external ? '_blank' : undefined}
                  rel={menuItem.link_info?.external ? 'noopener noreferrer' : undefined}
                  onPointerDown={(event) => event.stopPropagation()}
                  className='font-body text-[15px] font-medium text-spontaine-text-primary transition-colors duration-200 hover:text-spontaine-text-accent-dark'
                >
                  <Localization
                    text={{
                      english: menuItem.title,
                      malayalam: menuItem.title_malayalam ?? '',
                    }}
                    language={lang}
                  />
                </Link>

                <span
                  aria-hidden='true'
                  className='flex h-7 w-7 items-center justify-center rounded-[var(--radius-pill)] text-spontaine-text-primary transition-colors duration-200 hover:bg-spontaine-surface-cream hover:text-spontaine-text-accent-dark data-[state=open]:bg-spontaine-surface-cream data-[state=open]:text-spontaine-text-accent-dark'
                >
                  <ChevronDown className='h-4 w-4' />
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='start'
              side='bottom'
              sideOffset={10}
              onMouseEnter={() => openMenu(menuId)}
              onMouseLeave={closeMenu}
              className='z-[60] w-[260px] rounded-[14px] bg-spontaine-surface-paper p-2 shadow-card-lift'
            >
              {sectionGroups.map((section) => (
                <div
                  key={section.id}
                  className='py-1'
                >
                  <DropdownMenuLabel className='px-2 pb-1 pt-2 font-mono text-[0.66rem] font-medium uppercase tracking-[0.12em] text-spontaine-text-tertiary'>
                    <Localization
                      text={section.section}
                      language={lang}
                    />
                  </DropdownMenuLabel>
                  {section.links.map((link) => (
                    <DropdownMenuItem
                      key={link.id}
                      className='rounded-[10px] p-0 focus:bg-spontaine-surface-cream focus:text-spontaine-text-accent-dark'
                    >
                      <InertiaLink
                        link={link}
                        language={lang}
                        className='block w-full rounded-[10px] px-2.5 py-2 font-body text-sm font-medium text-spontaine-text-primary transition-colors duration-200 hover:bg-spontaine-surface-cream hover:text-spontaine-text-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spontaine-accent-dark'
                      />
                    </DropdownMenuItem>
                  ))}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      })}
    </div>
  )
}

export default NavbarLinks
