const actionBase =
  'inline-flex h-[52px] items-center justify-center rounded-lg px-7 font-display text-sm font-bold leading-5 transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-spontaine focus-visible:ring-spontaine-ink-accent focus-visible:ring-offset-spontaine'

export default function HeroActions() {
  return (
    <div className='flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center'>
      <a
        href='/proof#book'
        className={`${actionBase} text-spontaine-ink-dark hover:bg-spontaine-ink-highlight w-full bg-spontaine-accent-approved sm:w-[229px]`}
      >
        See it at your Company &rarr;
      </a>
      <a
        href='/architecture'
        className={`${actionBase} border-spontaine-border-muted text-spontaine-ink-dark hover:bg-spontaine-accent-hover w-full border-[1.5px] bg-white/20 backdrop-blur-spontaine-sm sm:w-[149px]`}
      >
        Play the video
      </a>
    </div>
  )
}
