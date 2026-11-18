import { useSolutionsAutoplay } from '@/hooks/useSolutionsAutoplay'
import { motionDuration, prefersReducedMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { ArrowRight, Pause, Play } from 'lucide-react'
import { type KeyboardEvent, type MouseEvent, Fragment, useEffect, useRef, useState } from 'react'

export interface SolutionPoint {
  readonly title: string
  readonly line: string
}

export interface SolutionLink {
  readonly label: string
  readonly href: string
}

export interface SolutionTab {
  readonly id: string
  readonly label: string
  /** Optional short line under the label (desktop only). */
  readonly description?: string
  readonly tag: string
  /** Use a line break ("\n") to control where the headline wraps. */
  readonly headline: string
  readonly points: readonly SolutionPoint[]
  readonly link?: SolutionLink | null
}

export type SolutionSelectSource = 'click' | 'keyboard' | 'url'

interface SolutionsTabsProps {
  readonly eyebrow: string
  readonly tabs: readonly SolutionTab[]
  /** Unique per page so ids stay unique when the block is used twice. */
  readonly idPrefix: string
  readonly autoplay?: boolean
  /** One headline for every tab: it stays put while the tabs change, and the per-tab tag is hidden. */
  readonly fixedHeadline?: string
  /** Open this tab (by id) and stop autoplay, e.g. from ?solution= in the URL. */
  readonly requestedTabId?: string | null
  readonly onSelect?: (tab: SolutionTab, source: SolutionSelectSource) => void
  readonly onLinkClick?: (tab: SolutionTab, event: MouseEvent<HTMLAnchorElement>) => void
}

/** The panel lags the tabs by one crossfade so the swap happens while it is invisible. */
const useCrossfade = (active: number) => {
  const [displayed, setDisplayed] = useState(active)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    if (active === displayed) {
      return
    }

    if (prefersReducedMotion()) {
      setDisplayed(active)
      return
    }

    setIsFading(true)
    const timeout = window.setTimeout(() => {
      setDisplayed(active)
      setIsFading(false)
    }, motionDuration.crossfadeOutMs)

    return () => window.clearTimeout(timeout)
  }, [active, displayed])

  return { displayed, isFading }
}

const Headline = ({ text }: { readonly text: string }) => (
  <>
    {text.split('\n').map((line, index) => (
      <Fragment key={line}>
        {index > 0 && <br />}
        {line}
      </Fragment>
    ))}
  </>
)

export default function SolutionsTabs({
  eyebrow,
  tabs,
  idPrefix,
  autoplay = true,
  fixedHeadline,
  requestedTabId,
  onSelect,
  onLinkClick,
}: SolutionsTabsProps) {
  const {
    active,
    containerRef,
    interactionHandlers,
    isAutoplaying,
    isProgressPaused,
    select,
    showPauseControl,
    togglePause,
    userPaused,
  } = useSolutionsAutoplay({ count: tabs.length, enabled: autoplay })
  const { displayed, isFading } = useCrossfade(active)
  const listRef = useRef<HTMLDivElement | null>(null)
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])

  const labelId = `${idPrefix}-label`
  const panelId = `${idPrefix}-panel`
  const tabId = (index: number) => `${idPrefix}-tab-${index}`

  // Deep link: open the requested tab once.
  useEffect(() => {
    if (!requestedTabId) {
      return
    }

    const index = tabs.findIndex((tab) => tab.id === requestedTabId)

    if (index >= 0) {
      select(index)
      onSelect?.(tabs[index], 'url')
    }
    // Only react to a new request, not to tab edits.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedTabId])

  // On the mobile strip, keep the selected tab in view.
  useEffect(() => {
    const list = listRef.current
    const button = buttonRefs.current[active]

    if (!list || !button || list.scrollWidth <= list.clientWidth) {
      return
    }

    list.scrollTo({
      left: button.offsetLeft - list.offsetLeft - 19,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }, [active])

  const choose = (index: number, source: SolutionSelectSource) => {
    select(index)
    onSelect?.(tabs[index], source)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const steps: Record<string, number> = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    }
    const step = steps[event.key]

    if (step == null) {
      return
    }

    event.preventDefault()
    const next = (index + step + tabs.length) % tabs.length
    buttonRefs.current[next]?.focus()
    choose(next, 'keyboard')
  }

  const tab = tabs[displayed] ?? tabs[0]

  if (!tab) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className='grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-x-24 lg:gap-y-14'
      {...interactionHandlers}
    >
      {/* Tab list: vertical with hairlines on desktop, a scrolling strip on mobile */}
      <div className='min-w-0 lg:col-start-1 lg:row-start-1'>
        <div className='mb-[22px] flex min-h-8 items-center justify-between'>
          <p
            id={labelId}
            className='eyebrow text-spontaine-gray-cool'
          >
            {eyebrow}
          </p>

          {showPauseControl && (
            <button
              type='button'
              onClick={togglePause}
              aria-pressed={userPaused}
              aria-label={userPaused ? 'Resume rotating the tabs' : 'Pause rotating the tabs'}
              className='grid h-8 w-8 place-items-center rounded-[var(--radius-pill)] text-spontaine-text-secondary shadow-[inset_0_0_0_1px_var(--spontaine-border-medium)] transition-colors duration-200 hover:bg-spontaine-white/60 hover:text-spontaine-text-primary focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-spontaine-accent'
            >
              {userPaused ? (
                <Play
                  aria-hidden='true'
                  className='h-3.5 w-3.5'
                />
              ) : (
                <Pause
                  aria-hidden='true'
                  className='h-3.5 w-3.5'
                />
              )}
            </button>
          )}
        </div>

        <div
          ref={listRef}
          role='tablist'
          aria-labelledby={labelId}
          className='-mx-[var(--space-shell-sm)] flex gap-7 overflow-x-auto border-b border-[var(--spontaine-border-medium)] px-[var(--space-shell-sm)] [scroll-padding-inline:var(--space-shell-sm)] [scrollbar-width:none] md:-mx-[var(--space-shell)] md:px-[var(--space-shell)] lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-b-0 lg:border-t lg:px-0 [&::-webkit-scrollbar]:hidden'
        >
          {tabs.map((item, index) => {
            const isSelected = index === active

            return (
              <button
                key={item.id}
                ref={(node) => {
                  buttonRefs.current[index] = node
                }}
                id={tabId(index)}
                type='button'
                role='tab'
                aria-selected={isSelected}
                aria-controls={panelId}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => choose(index, 'click')}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={cn(
                  'group relative flex min-h-[52px] flex-none items-center justify-between gap-4 whitespace-nowrap text-left font-body text-[16px] font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-spontaine-accent lg:min-h-16 lg:whitespace-normal lg:border-b lg:border-[var(--spontaine-border-medium)] lg:px-1 lg:text-[clamp(1.05rem,1.4vw,1.2rem)]',
                  isSelected
                    ? 'text-spontaine-text-primary'
                    : 'text-spontaine-text-tertiary hover:text-spontaine-text-primary'
                )}
              >
                <span>
                  {item.label}
                  {item.description && (
                    <span
                      className={cn(
                        'mt-1 hidden font-body text-[0.82rem] font-normal leading-[1.4] lg:block',
                        isSelected
                          ? 'text-spontaine-text-secondary'
                          : 'text-spontaine-text-tertiary'
                      )}
                    >
                      {item.description}
                    </span>
                  )}
                </span>
                <ArrowRight
                  aria-hidden='true'
                  className={cn(
                    'hidden h-[18px] w-[18px] flex-none text-spontaine-text-accent-dark transition-[opacity,transform] duration-300 lg:block',
                    isSelected ? 'translate-x-0 opacity-100' : '-translate-x-1.5 opacity-0'
                  )}
                />
                <span
                  key={isSelected ? `progress-${active}` : undefined}
                  aria-hidden='true'
                  className={cn(
                    'absolute inset-x-0 -bottom-px h-0.5 origin-left bg-spontaine-text-accent-dark',
                    !isSelected && 'scale-x-0',
                    isSelected && !isAutoplaying && 'scale-x-100',
                    isSelected && isAutoplaying && 'solution-progress-run',
                    isSelected && isProgressPaused && 'solution-progress-paused'
                  )}
                />
              </button>
            )
          })}
        </div>
      </div>

      {/* Tag and headline: a fixed headline stays put while the tabs change */}
      {fixedHeadline ? (
        <div className='min-w-0 lg:col-start-1 lg:row-start-2 lg:self-end'>
          <h2 className='display-section max-w-[600px] text-balance text-spontaine-text-primary'>
            <Headline text={fixedHeadline} />
          </h2>
        </div>
      ) : (
        <div
          className={cn(
            'min-w-0 transition-[opacity,transform] [transition-timing-function:cubic-bezier(0.215,0.61,0.355,1)] lg:col-start-1 lg:row-start-2 lg:self-end',
            isFading
              ? 'translate-y-1.5 opacity-0 duration-200'
              : 'translate-y-0 opacity-100 duration-300'
          )}
        >
          <span className='inline-flex h-7 items-center rounded-[var(--radius-control)] bg-spontaine-white/70 px-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.075em] text-spontaine-text-secondary shadow-[inset_0_0_0_1px_var(--spontaine-border-subtle)]'>
            {tab.tag}
          </span>
          <h2 className='display-section mt-5 max-w-[600px] text-balance text-spontaine-text-primary'>
            <Headline text={tab.headline} />
          </h2>
        </div>
      )}

      {/* Outcomes and link */}
      <div
        id={panelId}
        role='tabpanel'
        aria-labelledby={tabId(displayed)}
        className={cn(
          'min-w-0 transition-[opacity,transform] [transition-timing-function:cubic-bezier(0.215,0.61,0.355,1)] lg:col-start-2 lg:row-span-2 lg:row-start-1',
          isFading
            ? 'translate-y-1.5 opacity-0 duration-200'
            : 'translate-y-0 opacity-100 duration-300'
        )}
      >
        <ul className='grid gap-[34px]'>
          {tab.points.map((point) => (
            <li key={point.title}>
              <h3 className='font-display text-[clamp(1.2rem,1.7vw,1.45rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-spontaine-text-primary'>
                {point.title}
              </h3>
              <p className='mt-2 max-w-[470px] font-body text-base leading-[1.55] text-spontaine-text-secondary'>
                {point.line}
              </p>
            </li>
          ))}
        </ul>

        {tab.link && (
          <a
            href={tab.link.href}
            onClick={(event) => onLinkClick?.(tab, event)}
            className='group mt-10 inline-flex items-center gap-2 border-b border-[var(--spontaine-border-medium)] pb-[3px] font-body text-[15px] font-medium text-spontaine-text-primary transition-colors duration-200 hover:border-spontaine-text-accent-dark focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-spontaine-accent'
          >
            {tab.link.label}
            <ArrowRight
              aria-hidden='true'
              className='h-4 w-4 text-spontaine-text-accent-dark transition-transform duration-300 group-hover:translate-x-[3px]'
            />
          </a>
        )}
      </div>
    </div>
  )
}
