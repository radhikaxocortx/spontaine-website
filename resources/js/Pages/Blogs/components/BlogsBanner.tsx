import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const BlogsBanner = () => {
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
      className='relative flex w-full flex-col items-center justify-center bg-white pb-20 pt-40 text-black'
      data-banner-section='true'
    >
      {/* Content */}
      <div className='relative z-10 flex w-full flex-col items-center justify-center px-6'>
        <div className='mx-auto max-w-5xl text-center'>
          {/* Title */}
          <div
            ref={titleRef}
            className='mb-8'
          >
            <h1 className='font-heading text-[48px] font-medium leading-[1] text-spontaine-dark sm:text-[64px] lg:text-[80px] xl:text-[96px]'>
              Strategies and Perspectives
            </h1>
          </div>

          {/* Description */}
          <div
            ref={descriptionRef}
            className='mx-auto max-w-3xl'
          >
            <p className='mx-auto max-w-[560px] font-body text-[16px] font-normal leading-[1.8] text-gray-800 sm:text-[20px]'>
              Expert perspectives on data, leadership, and the future of intelligent automation.
              Relevant opinion and thinking on industry shifts, and the thinking behind our semantic
              revolution.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogsBanner
