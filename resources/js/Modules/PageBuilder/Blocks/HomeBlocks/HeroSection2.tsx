import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { useEffect, useRef } from 'react'

const HeroSection2 = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Auto-play video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle autoplay restrictions
        console.log('Video autoplay was prevented')
      })
    }
  }, [])
  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-white'>
      {/* Background Video */}
      <div className='absolute inset-0 h-full w-full'>
        <video
          ref={videoRef}
          className='animate-ken-burns absolute inset-0 h-full w-full object-cover'
          autoPlay
          muted
          loop
          playsInline
          poster='/imge/home/hero.png'
        >
          <source
            src='/imge/home/hero-video2.mp4'
            type='video/mp4'
          />
          {/* Fallback for unsupported video */}
        </video>
        {/* White overlay to match Figma design */}
        <div className='absolute inset-0 bg-[rgba(255,255,255,0.37)]' />
      </div>

      <AppLayoutPadding>
        <div className='relative z-10 mx-auto flex max-w-4xl flex-col items-center pt-32 text-center sm:pt-40'>
          {/* Main Title */}
          <div className='mb-8'>
            <h1 className='mb-2 font-urbanist text-[48px] font-medium leading-[1.1] text-black sm:text-[64px] lg:text-[80px] xl:text-[96px]'>
              One Source of Truth.
            </h1>
            <h2 className='font-urbanist text-[48px] font-medium leading-[1.1] text-black sm:text-[64px] lg:text-[80px] xl:text-[96px]'>
              <em className='font-light italic'>Infinite</em> Automation.
            </h2>
          </div>

          {/* Description */}
          <div className='mb-12'>
            <p className='mx-auto max-w-[560px] font-space-grotesk text-[16px] font-light leading-[1.6] text-gray-800 sm:text-[18px]'>
              Spontaine unifies all your data into one insights machine, empowering your internal
              experts to execute strategically, and launch AI-driven automation 100x faster and with
              perfect accuracy.
            </p>
          </div>
        </div>
      </AppLayoutPadding>
    </div>
  )
}

export default HeroSection2
