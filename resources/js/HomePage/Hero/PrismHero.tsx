import HeroContent from './HeroContent'
import HeroRouterStrip from './HeroRouterStrip'
import HeroVideo from './HeroVideo'

export default function PrismHero() {
  return (
    <section
      id='hero'
      className='bg-spontaine-surface-cream relative isolate flex min-h-[760px] w-full flex-col overflow-hidden lg:min-h-[1046px] 2xl:min-h-[1293px]'
    >
      <HeroVideo />

      <div className='relative z-10 flex w-full items-start'>
        <HeroContent />
      </div>

      <HeroRouterStrip />

      <div className='pointer-events-none relative z-10 h-40 bg-gradient-to-b from-transparent to-white md:h-44 lg:h-[140px] 2xl:h-[247px]' />
    </section>
  )
}
