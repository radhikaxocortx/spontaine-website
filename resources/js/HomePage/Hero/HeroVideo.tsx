export default function HeroVideo() {
  return (
    <div
      className='pointer-events-none absolute inset-0 overflow-hidden'
      aria-hidden='true'
    >
      <img
        src='/imge/home/hero-poster.png'
        alt=''
        className='absolute left-0 top-0 h-full w-[112%] max-w-none -translate-x-[6%] object-cover object-center opacity-100'
      />
      <video
        className='absolute left-0 top-0 hidden h-full w-[112%] max-w-none -translate-x-[6%] object-cover object-center opacity-100 motion-safe:block motion-reduce:hidden'
        autoPlay
        muted
        loop
        playsInline
        poster='/imge/home/hero-poster.png'
      >
        <source
          src='/imge/home/hero-video2.mp4'
          type='video/mp4'
        />
      </video>
      <div className='absolute inset-0 bg-white/15' />
      <div className='from-spontaine-surface-cream/75 via-spontaine-surface-cream/35 absolute inset-y-0 left-0 w-full bg-gradient-to-r to-transparent lg:w-[58%]' />
    </div>
  )
}
