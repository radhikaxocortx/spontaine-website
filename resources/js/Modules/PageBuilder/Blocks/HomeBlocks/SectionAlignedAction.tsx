import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)

/**
 * SectionAlignedAction Component
 *
 * - Outward top arc (convex)
 * - Inward bottom arc (concave) - matches HeroArcInteractive
 * - Gradient background
 * - Exact Bento layout:
 *
 *  ┌──────────────┬──────────────┐
 *  │  Card 1      │   Card 2     │
 *  │  (tall)      │   (short)    │
 *  ├──────────────┼──────────────┤
 *  │  Card 1      │   Card 4     │
 *  ├──────────────┼──────────────┤
 *  │  Card 3      │   Card 4     │
 *  │ (short)      │   (tall)     │
 *  └──────────────┴──────────────┘
 */

interface BentoCardProps {
  title: string
  titleText: string
  desc: string
  descText: string
  image: string
  bg: string
  gridClasses?: string
}

function BentoCard({ title, titleText, desc, descText, image, bg, gridClasses }: BentoCardProps) {
  return (
    <div
      className={`flex flex-col rounded-[32px] shadow-lg sm:rounded-[40px] ${bg} ${gridClasses}`}
    >
      <div className='p-8 text-center sm:p-10 lg:p-12'>
        <h3
          className={`font-heading mb-4 text-3xl font-semibold sm:text-4xl lg:text-[38px] ${titleText}`}
        >
          {title}
        </h3>
        <p
          className={`font-body text-xl font-light leading-relaxed lg:text-2xl lg:leading-[30px] ${descText}`}
        >
          {desc}
        </p>
      </div>
      <div className='mt-auto overflow-hidden rounded-3xl'>
        <img
          src={image}
          className='h-auto w-full object-cover'
          alt={title}
        />
      </div>
    </div>
  )
}

export default function SectionAlignedAction() {
  const arcRef = useRef(null)
  const arcTopRef = useRef(null)

  useEffect(() => {
    const topArc = arcTopRef.current
    const bottomArc = arcRef.current

    // Top arc animation
    const normalTopArc =
      'M1920 128C1635.2 46.4 1308 0 960 0C612 0 284.8 46.4 0 128V183.067H1920V128Z'
    const inwardTopArc =
      'M1920 128C1635.2 70 1308 30 960 30C612 30 284.8 70 0 128V183.067H1920V128Z'

    const topTl = gsap.timeline({
      scrollTrigger: {
        trigger: arcTopRef.current,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    })

    topTl
      .to(topArc, {
        morphSVG: inwardTopArc,
        duration: 1.2,
        ease: 'power2.inOut',
      })
      .to(topArc, {
        morphSVG: normalTopArc,
        duration: 1.2,
        ease: 'power2.inOut',
      })

    // Bottom arc animation
    const normalBottomArc = 'm1440 96c-213.6-61.2-459-96-720-96s-506.4 34.8-720 96v41.3h1440z'
    const inwardBottomArc = 'm1440 96c-213.6-51.2-459-86-720-86s-506.4 24.8-720 86v41.3h1440z'

    const bottomTl = gsap.timeline({
      scrollTrigger: {
        trigger: arcRef.current,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    })

    bottomTl
      .to(bottomArc, {
        morphSVG: inwardBottomArc,
        duration: 1.2,
        ease: 'power2.inOut',
      })
      .to(bottomArc, {
        morphSVG: normalBottomArc,
        duration: 1.2,
        ease: 'power2.inOut',
      })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  const cards = [
    {
      title: 'Deploy in days',
      desc: 'Launch your unified data foundation and first automated workflow in under three weeks - no massive IT projects.',
      image: '/imge/home/card1.png',
      bg: 'bg-spontaine-accent',
      titleText: 'text-spontaine-gray-muted',
      descText: 'text-spontaine-gray-muted',
      gridClasses: 'lg:row-start-1 lg:row-end-3',
    },
    {
      title: 'Unify once. Iterate forever.',
      desc: 'Build a single, self-maintaining insights layer that powers endless new use cases, dashboards, and AI agents.',
      image: '/imge/home/card2.png',
      bg: 'bg-spontaine-accent-bright',
      titleText: 'text-spontaine-gray-muted',
      descText: 'text-spontaine-gray-muted',
      gridClasses: 'lg:row-start-1 lg:row-end-2',
    },
    {
      title: 'Scale profitable growth',
      desc: 'Accelerate revenue velocity while simultaneously cutting operational waste, ensuring every new spend adds directly to your bottom line.',
      image: '/imge/home/card4.png',
      bg: 'bg-spontaine-dark-bg',
      titleText: 'text-spontaine-gray',
      descText: 'text-spontaine-gray',
      gridClasses: 'lg:row-start-2 lg:row-end-4',
    },
    {
      title: 'Execute with confidence',
      desc: 'Every AI action is auditable, explainable, and governed by your own business rules and human experts.',
      image: '/imge/home/card3.png',
      bg: 'bg-spontaine-dark-bg',
      titleText: 'text-spontaine-gray',
      descText: 'text-spontaine-gray',
      gridClasses: 'lg:row-start-3 lg:row-end-4',
    },
  ]

  return (
    <section className='relative w-full'>
      {/* TOP OUTWARD ARC - bulges upward */}
      <div className='relative -mb-1 w-full'>
        {/* <svg
          viewBox='0 0 1920 183'
          preserveAspectRatio='none'
          className='block w-full'
        >
          <path
            ref={arcTopRef}
            fill='#D0D9FB'
            d='M 0 183.067 L 0 91.533 C 320 30.511 640 0 960 0 C 1280 0 1600 30.511 1920 91.533 L 1920 183.067 Z'
          />
        </svg> */}
        <svg
          viewBox='0 0 1920 183'
          preserveAspectRatio='none'
          className='block w-full'
        >
          <path
            ref={arcTopRef}
            d='M1920 128C1635.2 46.4 1308 0 960 0C612 0 284.8 46.4 0 128V183.067H1920V128Z'
            fill='#D0D9FB'
          />
        </svg>
      </div>

      {/* MAIN CONTENT with gradient background */}
      <div
        className='relative'
        style={{
          background: 'linear-gradient(0deg, #44ECA0 0%, #D0D9FB 100%)',
        }}
      >
        {/* HEADING */}
        <div className='mx-auto max-w-7xl px-6 pb-12 text-center sm:px-8 sm:pb-16 lg:px-12 lg:pb-20'>
          <h2 className='font-heading text-spontaine-dark text-5xl font-normal leading-tight sm:text-6xl lg:text-7xl xl:text-[88px]'>
            Strategy-aligned action.
            <br />
            Fast, at scale.
          </h2>
        </div>

        {/* BENTO GRID */}
        <div className='mx-auto max-w-7xl px-6 pb-32 sm:px-8 sm:pb-40 lg:px-12 lg:pb-48'>
          <div className='lg:grid-rows-auto grid grid-cols-1 gap-6 md:grid-cols-2'>
            {cards.map((card, index) => (
              <BentoCard
                key={index}
                title={card.title}
                titleText={card.titleText}
                desc={card.desc}
                descText={card.descText}
                image={card.image}
                bg={card.bg}
                gridClasses={card.gridClasses}
              />
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM INWARD ARC - matches HeroArcInteractive pattern */}
      <div className='absolute bottom-0 left-0 w-full'>
        <svg
          viewBox='0 0 1440 96'
          preserveAspectRatio='none'
          className='w-full'
        >
          <path
            ref={arcRef}
            fill='#ffffff'
            d='m1440 96c-213.6-61.2-459-96-720-96s-506.4 34.8-720 96v41.3h1440z'
          />
        </svg>
      </div>
    </section>
  )
}
