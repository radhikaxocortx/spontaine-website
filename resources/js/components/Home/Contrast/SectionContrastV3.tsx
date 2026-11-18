interface ContrastColumn {
  readonly versus: string
  readonly title: string
  readonly body: string
}

const contrastColumns: readonly ContrastColumn[] = [
  {
    versus: 'Vs. traditional BI and spreadsheets',
    title: 'Last month, after the clean-up.',
    body: 'Dashboards show what happened last month after manual cleanup. Spontaine connects live operational systems so teams act while orders and engagements are still running.',
  },
  {
    versus: 'Vs. heavy process mining and SIs',
    title: 'Months of modelling first.',
    body: 'Enterprise suites demand months of event-log modelling and specialist consultants. Spontaine solves one urgent operational bottleneck in four weeks, without disrupting the line or the practice.',
  },
  {
    versus: 'Vs. unchecked generic AI',
    title: 'Guesses across messy tables.',
    body: 'Raw models guess across messy tables. Spontaine codifies your exact definitions and permissions once, delivering auditable answers and workflows you own outright.',
  },
]

/** Why teams choose Spontaine: three alternatives, side by side. Replaces the "old choices" cards. */
export default function SectionContrastV3() {
  return (
    <section
      id='choices'
      aria-labelledby='contrast-title'
      className='relative w-full overflow-hidden rounded-t-section-sm bg-spontaine-surface-ice py-[105px] md:rounded-t-section-md md:py-[130px] lg:rounded-t-section-lg lg:pb-[155px] xl:rounded-t-section-xl'
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <div className='mx-auto max-w-[820px] text-center'>
          <p
            data-stack-item
            className='eyebrow mb-5 text-spontaine-gray-cool'
          >
            Why teams choose Spontaine
          </p>
          <h2
            id='contrast-title'
            data-stack-item
            className='display-xl text-balance text-spontaine-dark'
          >
            Skip the 18-month data warehouse build.
            <br />
            <span className='text-spontaine-text-accent-dark'>
              Get cross-system control in weeks.
            </span>
          </h2>
          <p
            data-stack-item
            className='body-lg mx-auto mt-6 max-w-[620px] text-spontaine-text-secondary'
          >
            You do not need to become a software company, or lock your business logic inside rigid
            enterprise tools, to run on one live set of numbers.
          </p>
        </div>

        <ul className='mt-14 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8 lg:gap-12'>
          {contrastColumns.map((column) => (
            <li
              key={column.versus}
              data-stack-item
              className='border-t border-[rgb(16_24_40/0.14)] pt-[22px]'
            >
              <p className='eyebrow text-spontaine-text-accent-dark'>{column.versus}</p>
              <h3 className='mt-3 font-display text-[1.25rem] font-semibold leading-[1.2] tracking-[-0.02em] text-spontaine-text-primary'>
                {column.title}
              </h3>
              <p className='mt-3 font-body text-[0.95rem] leading-[1.6] text-spontaine-text-secondary'>
                {column.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
