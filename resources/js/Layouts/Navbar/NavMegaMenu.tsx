import { Language } from '@/components/ui/ui_interfaces'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { NavMenu } from '@/Modules/PageBuilder/page_interfaces'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import NavLinkItem from './NavLinkItem'

interface Properties {
  menu: NavMenu
  lang?: Language
}

const NavMegaMenu = ({ menu, lang = 'en' }: Properties) => {
  const [isHover, setIsHover] = useState(false)
  const openTimerRef = useRef<number | null>(null)
  const closeTimerRef = useRef<number | null>(null)
  const linkHoverTimerRef = useRef<number | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  // Determine initial active link (first link of first section)
  const firstLink = useMemo(() => {
    const s = menu.items?.items?.[0]
    return s && s.links?.[0] ? s.links[0] : null
  }, [menu.items])
  const [activeLinkId, setActiveLinkId] = useState<number | null>(firstLink?.id ?? null)

  const hasSubMenuItems = menu.items?.items && menu.items.items.length > 0

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (openTimerRef.current) window.clearTimeout(openTimerRef.current)
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
      if (linkHoverTimerRef.current) window.clearTimeout(linkHoverTimerRef.current)
    }
  }, [])

  // A11y: Escape to close and focus trap while open
  useEffect(() => {
    if (!isHover) return
    const panel = panelRef.current
    if (!panel) return

    const selector = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    const getFocusables = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true'
      )

    const focusables = getFocusables()
    // Focus first focusable inside panel
    focusables[0]?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setIsHover(false)
        return
      }
      if (e.key === 'Tab') {
        const items = getFocusables()
        if (items.length === 0) return
        const first = items[0]
        const last = items[items.length - 1]
        const active = document.activeElement as HTMLElement | null
        if (e.shiftKey) {
          if (active === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (active === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isHover])

  return (
    <div
      onMouseEnter={() => {
        if (closeTimerRef.current) {
          window.clearTimeout(closeTimerRef.current)
          closeTimerRef.current = null
        }
        if (!isHover) {
          openTimerRef.current = window.setTimeout(() => setIsHover(true), 120)
        }
      }}
      onMouseLeave={() => {
        if (openTimerRef.current) {
          window.clearTimeout(openTimerRef.current)
          openTimerRef.current = null
        }
        closeTimerRef.current = window.setTimeout(() => setIsHover(false), 160)
      }}
    >
      {/*Menu Title*/}
      <div>
        <NavLinkItem
          item={menu}
          lang={lang}
        />
      </div>
      {hasSubMenuItems && (
        <AnimatePresence>
          {isHover && (
            <motion.div
              ref={panelRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.4, 0.0, 0.2, 1] }}
              role='dialog'
              aria-modal='true'
              aria-label={`${menu.title} menu`}
              className={`absolute left-0 right-0 top-full z-40 mt-2 w-full px-4 sm:px-6 lg:px-8`}
            >
              <div className='mx-auto max-h-[80vh] max-w-7xl overflow-hidden rounded-2xl bg-spontaine-accent text-sm shadow-xl ring-1 ring-black/5'>
                {/* Grid: header, content, footer with media spanning full height */}
                <div className='grid max-h-[calc(80vh-3rem)] min-h-0 gap-6 p-6 lg:grid-cols-2 lg:grid-rows-[auto,1fr,auto]'>
                  {/* Header: Section name (left column, top row) */}
                  <div className='px-0 pt-0 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2'>
                    <p className='font-heading text-spontaine-dark/60 text-lg tracking-wider'>
                      <Localization
                        text={
                          menu.items?.items?.[0]?.section ?? {
                            english: menu.title,
                            malayalam: menu.title_malayalam ?? '',
                          }
                        }
                        language={lang}
                      />
                    </p>
                  </div>
                  {/* Left: list of links (left column, middle row) */}
                  <div className='min-h-0 overflow-y-auto pr-2 lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3'>
                    {menu.items?.items.map((item) => (
                      <div
                        key={item.id}
                        className='mb-4'
                      >
                        <ul className='space-y-1'>
                          {item.links.map((link) => {
                            const isActive = activeLinkId === link.id
                            return (
                              <li key={link.id}>
                                <button
                                  type='button'
                                  onMouseEnter={() => {
                                    if (linkHoverTimerRef.current)
                                      window.clearTimeout(linkHoverTimerRef.current)
                                    linkHoverTimerRef.current = window.setTimeout(
                                      () => setActiveLinkId(link.id),
                                      110
                                    )
                                  }}
                                  onMouseLeave={() => {
                                    if (linkHoverTimerRef.current) {
                                      window.clearTimeout(linkHoverTimerRef.current)
                                      linkHoverTimerRef.current = null
                                    }
                                  }}
                                  onFocus={() => setActiveLinkId(link.id)}
                                  className={`font-heading flex w-full items-start justify-between rounded-lg px-3 py-2 text-left ring-0 ${isActive ? 'text-spontaine-dark' : 'text-spontaine-dark/60'} hover:text-spontaine-dark focus:outline-none focus:ring-0`}
                                >
                                  <div className='flex min-w-0 items-center gap-2'>
                                    <span className='block text-3xl'>
                                      <Localization
                                        text={link.name}
                                        language={lang}
                                      />
                                    </span>
                                    <span
                                      className={`inline-block transition-all duration-150 ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0'}`}
                                      aria-hidden='true'
                                    >
                                      <i className='fa-solid fa-circle-arrow-right text-3xl'></i>
                                    </span>
                                  </div>
                                  {/* <InertiaLink
                                    link={link}
                                    language={lang}
                                    className={`ml-3 shrink-0 text-xs underline ${isActive ? 'text-neutral-800' : 'text-neutral-graige-700'}`}
                                  /> */}
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {/* Right: media preview spanning full height (right column, all rows) */}
                  <div className='flex h-full w-full items-center justify-center overflow-hidden rounded-xl lg:col-start-2 lg:col-end-3 lg:row-span-3'>
                    {(() => {
                      const active = menu.items?.items
                        .flatMap((s) => s.links)
                        .find((l) => l.id === activeLinkId)
                      if (!active || !active.media?.pathOrUrl) {
                        return <div className='h-full w-full rounded-xl bg-white/10'></div>
                      }
                      if (active.media.type === 'image') {
                        return (
                          <motion.img
                            src={active.media.pathOrUrl}
                            alt='preview'
                            className='h-full w-full rounded-xl object-cover'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )
                      }
                      return (
                        <motion.video
                          src={active.media.pathOrUrl}
                          className='h-full w-full rounded-xl object-cover'
                          muted
                          autoPlay
                          loop
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )
                    })()}
                  </div>
                  {/* Footer: description (left column, bottom row) */}
                  <div className='px-0 py-0 lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4'>
                    {(() => {
                      const active = menu.items?.items
                        .flatMap((s) => s.links)
                        .find((l) => l.id === activeLinkId)
                      return (
                        <p className='text-lg text-black/60'>
                          <Localization
                            text={active?.description ?? { english: '', malayalam: '' }}
                            language={lang}
                          />
                        </p>
                      )
                    })()}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

export default NavMegaMenu
