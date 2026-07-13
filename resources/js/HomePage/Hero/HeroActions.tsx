const actionBase =
  'inline-flex h-[52px] items-center justify-center rounded-[8px] px-7 font-urbanist text-[14px] font-bold leading-5 transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#12d6a0] focus-visible:ring-offset-[3px]'

export default function HeroActions() {
  return (
    <div className='flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center'>
      <a
        href='/proof#book'
        className={`${actionBase} w-full bg-[#0FE5A8] text-[#0f172a] hover:bg-[#11c895] sm:w-[229px]`}
      >
        See it at your Company &rarr;
      </a>
      <a
        href='/architecture'
        className={`${actionBase} w-full border-[1.5px] border-[#d1d5db] bg-white/20 text-[#0f172a] backdrop-blur-[2px] hover:bg-[#2BEFB6] sm:w-[149px]`}
      >
        Play the video
      </a>
    </div>
  )
}
