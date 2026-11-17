import { trackEvent } from '@/lib/analytics'
import { prefersReducedMotion } from '@/lib/motion'
import { ArrowRight } from 'lucide-react'
import { type MouseEvent } from 'react'
import { type DemoTabId, requestDemoTab } from '../Chat/demoTabState'

type DoorId = 'ps' | 'acquisition' | 'industrial'

interface HeroDoor {
  readonly id: DoorId
  readonly title: string
  readonly line: string
  readonly href: string
  /** When set, the door opens this tab of the worked example on the homepage. */
  readonly demoTab?: DemoTabId
}

// From 28 Nov, the industrial door points to /solutions/industrial-groups (drop demoTab).
const doors: readonly HeroDoor[] = [
  {
    id: 'ps',
    title: 'Professional services',
    line: 'Margin and realisation per engagement, partner and client.',
    href: '/?tab=professional-services#example',
    demoTab: 'professional-services',
  },
  {
    id: 'acquisition',
    title: 'Grown by acquisition',
    line: 'Make every company you acquire comparable from the first weeks.',
    href: '/solutions/buy-and-build',
  },
  {
    id: 'industrial',
    title: 'Multi-site manufacturers and distributors',
    line: 'Profit per customer, programme and plant, across every site.',
    href: '/?tab=industrial#example',
    demoTab: 'industrial',
  },
]

const openDemoTab = (event: MouseEvent<HTMLAnchorElement>, tab: DemoTabId) => {
  if (window.location.pathname !== '/') {
    return
  }

  event.preventDefault()
  requestDemoTab(tab, 'door')
  document.getElementById('example')?.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })
}

export default function HeroDoors() {
  return (
    <nav
      aria-labelledby='hero-doors-label'
      className='border-y border-spontaine-white/75 bg-spontaine-white/40 backdrop-blur-[8px]'
    >
      <div className='mx-auto grid w-full max-w-[1180px] px-[var(--space-shell-sm)] md:grid-cols-[190px_repeat(3,minmax(0,1fr))] md:px-[var(--space-shell)]'>
        <p
          id='hero-doors-label'
          className='eyebrow self-center pb-2 pl-2 pt-[22px] text-spontaine-gray-cool md:py-[22px] md:pl-8 md:pr-6'
        >
          Where are you starting from?
        </p>

        {doors.map((door) => (
          <a
            key={door.id}
            href={door.href}
            onClick={(event) => {
              trackEvent('door_clicked', { door: door.id })

              if (door.demoTab) {
                openDemoTab(event, door.demoTab)
              }
            }}
            className='group relative flex min-h-[132px] flex-col border-t border-[var(--spontaine-border-subtle)] py-[22px] pl-2 pr-[52px] transition-colors duration-300 hover:bg-spontaine-white/65 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-spontaine-accent md:border-l md:border-t-0 md:border-l-spontaine-white/85 md:pl-[22px]'
          >
            <span className='font-display text-[1.08rem] font-semibold leading-[1.18] tracking-[-0.02em] text-spontaine-text-primary'>
              {door.title}
            </span>
            <span className='mt-2 font-body text-[0.84rem] leading-[1.45] text-spontaine-text-secondary'>
              {door.line}
            </span>
            <ArrowRight
              aria-hidden='true'
              className='absolute bottom-[22px] right-[22px] h-[18px] w-[18px] text-spontaine-text-accent-dark transition-transform duration-300 [transition-timing-function:cubic-bezier(0.215,0.61,0.355,1)] group-hover:translate-x-1'
              strokeWidth={2}
            />
          </a>
        ))}
      </div>
    </nav>
  )
}
