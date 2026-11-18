import { cn } from '@/lib/utils'
import { ArrowDown, ArrowRight } from 'lucide-react'

export interface Pillar {
  readonly title: string
  readonly line: string
  /** "#anchor" jumps within the page (and opens a matching accordion row); anything else is a link. */
  readonly href?: string
}

interface PillarsRowProps {
  readonly eyebrow?: string
  readonly title?: string
  readonly pillars: readonly Pillar[]
  /** Frosted glass panel, for bands that sit on the glass wash. */
  readonly glass?: boolean
}

const PillarContent = ({ pillar }: { readonly pillar: Pillar }) => {
  const Icon = pillar.href?.startsWith('#') ? ArrowDown : ArrowRight

  return (
    <>
      <span className='flex items-start justify-between gap-4'>
        <span className='font-display text-[clamp(1.2rem,1.6vw,1.4rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-spontaine-text-primary'>
          {pillar.title}
        </span>
        {pillar.href && (
          <Icon
            aria-hidden='true'
            className={cn(
              'mt-[3px] h-5 w-5 flex-none text-spontaine-text-accent-dark transition-transform duration-300',
              Icon === ArrowDown ? 'group-hover:translate-y-[3px]' : 'group-hover:translate-x-[3px]'
            )}
          />
        )}
      </span>
      <span className='mt-2.5 block max-w-[340px] font-body text-base leading-[1.55] text-spontaine-text-secondary'>
        {pillar.line}
      </span>
    </>
  )
}

export default function PillarsRow({ eyebrow, title, pillars, glass = false }: PillarsRowProps) {
  const content = (
    <>
      {(eyebrow || title) && (
        <div
          data-stack-item
          className='grid max-w-[760px] gap-[18px]'
        >
          {eyebrow && <p className='eyebrow text-spontaine-gray-cool'>{eyebrow}</p>}
          {title && (
            <h2 className='display-section text-balance text-spontaine-text-primary'>{title}</h2>
          )}
        </div>
      )}

      <ul className='mt-14 grid md:grid-cols-3 md:gap-7'>
        {pillars.map((pillar) => (
          <li
            key={pillar.title}
            data-stack-item
          >
            {pillar.href ? (
              <a
                href={pillar.href}
                className='group block border-t border-[var(--spontaine-border-medium)] pb-[26px] pt-[22px] transition-colors duration-300 hover:border-spontaine-text-accent-dark focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-spontaine-accent'
              >
                <PillarContent pillar={pillar} />
              </a>
            ) : (
              <div className='border-t border-[var(--spontaine-border-medium)] pb-[26px] pt-[22px]'>
                <PillarContent pillar={pillar} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  )

  if (!glass) {
    return content
  }

  return (
    <div className='rounded-[var(--radius-panel)] border border-spontaine-white/75 bg-spontaine-white/40 px-[var(--space-shell-sm)] py-10 shadow-surface backdrop-blur-xl backdrop-saturate-[1.15] md:p-12 lg:p-14'>
      {content}
    </div>
  )
}
