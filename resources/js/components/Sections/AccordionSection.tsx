import { cn } from '@/lib/utils'
import { ArrowRight, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface AccordionEntry {
  readonly title: string
  readonly line: string
  readonly link?: { readonly label: string; readonly href: string } | null
}

export interface AccordionItem {
  readonly title: string
  /** Optional in-page anchor: visiting #anchor opens this row. */
  readonly anchor?: string
  /** FAQ answer, used when the row has no entries. */
  readonly body?: string
  readonly entries?: readonly AccordionEntry[]
}

export type AccordionVariant = 'grouped' | 'faq'

interface AccordionSectionProps {
  readonly idPrefix: string
  readonly variant?: AccordionVariant
  readonly eyebrow?: string
  readonly title: string
  readonly note?: string
  readonly link?: { readonly label: string; readonly href: string } | null
  readonly items: readonly AccordionItem[]
}

const toAnchor = (value?: string) => value?.trim().replace(/^#/, '') || undefined

/** One row open at a time; grouped mode opens the first row, FAQ mode starts closed. */
const useOpenRow = (items: readonly AccordionItem[], variant: AccordionVariant) => {
  const [open, setOpen] = useState<number | null>(variant === 'grouped' && items.length ? 0 : null)

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.replace(/^#/, '')
      const index = items.findIndex((item) => toAnchor(item.anchor) === hash)

      if (index >= 0) {
        setOpen(index)
      }
    }

    openFromHash()
    window.addEventListener('hashchange', openFromHash)

    return () => window.removeEventListener('hashchange', openFromHash)
  }, [items])

  return {
    open,
    toggle: (index: number) => setOpen((current) => (current === index ? null : index)),
  }
}

export default function AccordionSection({
  idPrefix,
  variant = 'grouped',
  eyebrow,
  title,
  note,
  link,
  items,
}: AccordionSectionProps) {
  const { open, toggle } = useOpenRow(items, variant)
  const isFaq = variant === 'faq'

  return (
    <div className='grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24'>
      <div
        data-stack-item
        className='lg:sticky lg:top-28 lg:self-start'
      >
        {eyebrow && <p className='eyebrow mb-[18px] text-spontaine-gray-cool'>{eyebrow}</p>}
        <h2 className='max-w-[460px] text-balance font-display text-[clamp(2rem,3.4vw,3.2rem)] font-bold leading-none tracking-[-0.055em] text-spontaine-text-primary'>
          {title}
        </h2>
        {note && (
          <p className='mt-[18px] max-w-[420px] font-body text-[0.95rem] leading-[1.55] text-spontaine-text-secondary'>
            {note}
          </p>
        )}
        {link && (
          <a
            href={link.href}
            className='group mt-6 inline-flex items-center gap-2 border-b border-[var(--spontaine-border-medium)] pb-[3px] font-body text-[15px] font-medium text-spontaine-text-primary transition-colors duration-200 hover:border-spontaine-text-accent-dark focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-spontaine-accent'
          >
            {link.label}
            <ArrowRight
              aria-hidden='true'
              className='h-4 w-4 text-spontaine-text-accent-dark transition-transform duration-300 group-hover:translate-x-[3px]'
            />
          </a>
        )}
      </div>

      <div
        data-stack-item
        className='border-t border-[var(--spontaine-border-medium)]'
      >
        {items.map((item, index) => {
          const isOpen = open === index
          const buttonId = `${idPrefix}-row-${index}`
          const panelId = `${idPrefix}-panel-${index}`

          return (
            <div
              key={`${item.title}-${index}`}
              id={toAnchor(item.anchor)}
              className='scroll-mt-28 border-b border-[var(--spontaine-border-medium)]'
            >
              <h3 className='m-0'>
                <button
                  id={buttonId}
                  type='button'
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                  className='group flex min-h-[76px] w-full items-center justify-between gap-5 py-[18px] text-left focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-spontaine-accent'
                >
                  <span
                    className={cn(
                      'font-display font-semibold text-spontaine-text-primary',
                      isFaq
                        ? 'text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.3] tracking-[-0.015em]'
                        : 'text-[clamp(1.15rem,1.6vw,1.4rem)] leading-[1.25] tracking-[-0.02em]'
                    )}
                  >
                    {item.title}
                  </span>
                  <span className='grid h-9 w-9 flex-none place-items-center rounded-[var(--radius-control)] bg-[var(--spontaine-pill-variant-neutral-bg)] text-spontaine-text-secondary transition-colors duration-200 group-hover:bg-[var(--spontaine-surface-mint-soft)] group-hover:text-spontaine-text-accent-dark'>
                    <Plus
                      aria-hidden='true'
                      className={cn(
                        'h-4 w-4 transition-transform duration-300 motion-reduce:transition-none',
                        isOpen && 'rotate-45'
                      )}
                    />
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                role='region'
                aria-labelledby={buttonId}
                aria-hidden={!isOpen}
                className={cn(
                  'grid transition-[grid-template-rows] [transition-duration:450ms] [transition-timing-function:cubic-bezier(0.215,0.61,0.355,1)] motion-reduce:transition-none',
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                )}
              >
                <div className='overflow-hidden'>
                  <div
                    className={cn(
                      'pb-[26px] transition-[opacity,transform] duration-300 motion-reduce:transition-none md:pr-14',
                      isOpen ? 'translate-y-0 opacity-100 delay-75' : '-translate-y-1 opacity-0'
                    )}
                  >
                    {item.entries && item.entries.length > 0 ? (
                      <ul>
                        {item.entries.map((entry) => (
                          <li
                            key={entry.title}
                            className='border-[var(--spontaine-border-subtle)] py-3 [&+&]:border-t'
                          >
                            <p className='font-body text-[15px] font-semibold leading-[1.4] text-spontaine-text-primary'>
                              {entry.title}
                            </p>
                            <p className='mt-1 font-body text-[0.95rem] leading-[1.55] text-spontaine-text-secondary'>
                              {entry.line}
                            </p>
                            {entry.link && (
                              <a
                                href={entry.link.href}
                                tabIndex={isOpen ? undefined : -1}
                                className='group mt-1.5 inline-flex items-center gap-1.5 font-body text-sm font-medium text-spontaine-text-accent-dark focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-spontaine-accent'
                              >
                                {entry.link.label}
                                <ArrowRight
                                  aria-hidden='true'
                                  className='h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-[3px]'
                                />
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className='max-w-[620px] font-body text-base leading-[1.6] text-spontaine-text-secondary'>
                        {item.body}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
