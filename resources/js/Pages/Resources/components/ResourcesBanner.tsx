import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const ResourcesBanner = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, descriptionRef.current], {
        opacity: 0,
        y: 40,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      }).to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.6'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className='relative flex w-full flex-col items-center justify-center overflow-hidden bg-[url("/imge/resoucesbg.png")] bg-cover bg-center bg-no-repeat pb-20 pt-40 text-white'
      data-banner-section='true'
    >
      {/* <div className='absolute inset-0 bg-black/45' /> */}

      <div className='relative z-10 flex w-full flex-col items-center justify-center px-6'>
        <div className='mx-auto max-w-5xl text-center'>
          <div
            ref={titleRef}
            className='mb-8'
          >
            <h1 className='font-heading text-[48px] font-medium leading-[1] text-white sm:text-[64px] lg:text-[80px] xl:text-[96px]'>
              Resources
            </h1>
          </div>

          <div
            ref={descriptionRef}
            className='mx-auto max-w-3xl'
          >
            <p className='mx-auto max-w-[900px] font-body text-[16px] font-normal leading-[1.8] text-white/90 sm:text-[20px]'>
              Expert perspectives on data, leadership, and the future of data, AI and business
              intelligence. Read case studies on regaining trust, expert takes on industry shifts,
              and the thinking behind our semantic revolution.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResourcesBanner
