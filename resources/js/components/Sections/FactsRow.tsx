export interface Fact {
  readonly value: string
  readonly label: string
  readonly link?: { readonly label: string; readonly href: string } | null
}

interface FactsRowProps {
  readonly eyebrow?: string
  readonly facts: readonly Fact[]
}

/** Large-value facts with hairlines: the honest stand-in for a logo and metrics strip. */
export default function FactsRow({ eyebrow, facts }: FactsRowProps) {
  return (
    <>
      {eyebrow && (
        <p
          data-stack-item
          className='eyebrow text-spontaine-gray-cool'
        >
          {eyebrow}
        </p>
      )}
      <ul className='mt-12 grid sm:grid-cols-2 sm:gap-x-7 lg:grid-cols-4'>
        {facts.map((fact) => (
          <li
            key={fact.value}
            data-stack-item
            className='border-t border-[var(--spontaine-border-medium)] pb-7 pt-6'
          >
            <p className='font-display text-[clamp(1.9rem,2.8vw,2.6rem)] font-bold leading-none tracking-[-0.05em] text-spontaine-text-primary'>
              {fact.value}
            </p>
            <p className='mt-3.5 max-w-[250px] font-body text-[0.95rem] leading-[1.5] text-spontaine-text-secondary'>
              {fact.label}
              {fact.link && (
                <>
                  {' '}
                  <a
                    href={fact.link.href}
                    className='border-b border-[var(--spontaine-border-medium)] text-spontaine-text-primary transition-colors duration-200 hover:border-spontaine-text-accent-dark focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-spontaine-accent'
                  >
                    {fact.link.label}
                  </a>
                </>
              )}
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}
