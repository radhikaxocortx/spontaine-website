import {
  ArrowUpRight,
  Building2,
  EyeOff,
  KeyRound,
  Lock,
  type LucideIcon,
  MapPin,
  Server,
  ShieldCheck,
} from 'lucide-react'

/** Icons an editor can pick for a trust item. */
export const trustIcons = {
  server: Server,
  'map-pin': MapPin,
  'eye-off': EyeOff,
  'shield-check': ShieldCheck,
  lock: Lock,
  key: KeyRound,
  building: Building2,
} satisfies Record<string, LucideIcon>

export type TrustIconName = keyof typeof trustIcons

export interface TrustItem {
  readonly icon: TrustIconName
  readonly title: string
  /** Approved claim wording. Never shorten so a qualifier disappears. */
  readonly text: string
}

interface TrustBandProps {
  readonly titleId: string
  readonly eyebrow?: string
  readonly title: string
  readonly items: readonly TrustItem[]
  /** Optional sector-specific line under the items (e.g. for regulated suppliers). */
  readonly extraLine?: string
  readonly link?: { readonly label: string; readonly href: string } | null
}

/** Security facts on the ink band. Mint is for icons only: it fails contrast as text. */
export default function TrustBand({
  titleId,
  eyebrow,
  title,
  items,
  extraLine,
  link,
}: TrustBandProps) {
  return (
    <>
      <div className='mx-auto max-w-[820px] text-center'>
        {eyebrow && (
          <p
            data-stack-item
            className='eyebrow mb-5 text-spontaine-white-faint'
          >
            {eyebrow}
          </p>
        )}
        <h2
          id={titleId}
          data-stack-item
          className='display-xl text-balance text-spontaine-text-on-dark'
        >
          {title}
        </h2>
      </div>

      <ul className='mx-auto mt-16 grid max-w-[1080px] md:grid-cols-2 md:gap-y-9 xl:grid-cols-4'>
        {items.map(({ title: itemTitle, text, icon }) => {
          const Icon = trustIcons[icon] ?? ShieldCheck

          return (
            <li
              key={itemTitle}
              data-stack-item
              className='border-t border-[var(--spontaine-border-on-dark)] py-6 md:border-l md:border-t-0 md:py-1 md:pl-6 md:pr-7'
            >
              <Icon
                aria-hidden='true'
                className='h-[22px] w-[22px] text-spontaine-accent'
                strokeWidth={1.5}
              />
              <h3 className='mt-[18px] font-display text-[1.02rem] font-semibold leading-[1.25] tracking-[-0.015em] text-spontaine-text-on-dark'>
                {itemTitle}
              </h3>
              <p className='mt-1.5 font-body text-[0.92rem] leading-[1.55] text-spontaine-text-on-dark-secondary'>
                {text}
              </p>
            </li>
          )
        })}
      </ul>

      {extraLine && (
        <p
          data-stack-item
          className='mx-auto mt-12 max-w-[760px] text-center font-body text-[0.95rem] leading-[1.6] text-spontaine-text-on-dark-secondary'
        >
          {extraLine}
        </p>
      )}

      {link && (
        <div className='mt-14 text-center'>
          <a
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className='group inline-flex items-center gap-2 border-b border-[var(--spontaine-border-on-dark)] pb-[3px] font-body text-[15px] font-medium text-spontaine-text-on-dark transition-colors duration-200 hover:border-spontaine-accent focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-spontaine-accent'
          >
            {link.label}
            <ArrowUpRight
              aria-hidden='true'
              className='h-4 w-4 text-spontaine-accent transition-transform duration-300 [transition-timing-function:cubic-bezier(0.215,0.61,0.355,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
            />
          </a>
        </div>
      )}
    </>
  )
}
