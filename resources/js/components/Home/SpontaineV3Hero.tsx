import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { Pill, type PillProps } from '@/components/ui/pill'

const decisionStates = [
  {
    label: 'Governed answer',
    variant: 'variant1',
  },
  {
    label: 'Reusable Block',
    variant: 'variant2',
  },
  {
    label: 'Secure endpoint',
    variant: 'variant3',
  },
  {
    label: 'Workflow',
    variant: 'variant4',
  },
] satisfies Array<{ label: string; variant: PillProps['variant'] }>

export default function SpontaineV3Hero() {
  const heroRef = useRef<HTMLElement | null>(null)
  const promptCardRef = useRef<HTMLDivElement | null>(null)
  const calloutRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const hero = heroRef.current
    const promptCard = promptCardRef.current
    const callout = calloutRef.current

    if (!hero || !promptCard || !callout) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      promptCard.style.visibility = 'visible'
      gsap.set(promptCard, { opacity: 1, y: 0 })
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const showPrompt = () => {
        gsap.to(promptCard, {
          duration: 0.9,
          ease: 'power3.out',
          onStart: () => {
            promptCard.style.visibility = 'visible'
          },
          opacity: 1,
          overwrite: 'auto',
          y: 0,
        })
      }

      const resetPrompt = () => {
        gsap.to(promptCard, {
          duration: 0.45,
          ease: 'power2.out',
          onComplete: () => {
            promptCard.style.visibility = 'hidden'
          },
          opacity: 0,
          overwrite: 'auto',
          y: 140,
        })
      }

      gsap.set(promptCard, {
        opacity: 0,
        y: 140,
      })
      promptCard.style.visibility = 'hidden'

      ScrollTrigger.create({
        trigger: callout,
        start: 'top bottom',
        onEnter: showPrompt,
        onEnterBack: showPrompt,
        onLeaveBack: resetPrompt,
      })
    }, hero)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      id='hero'
      aria-labelledby='spontaine-v3-hero-title'
      className='relative isolate overflow-hidden bg-hero-wash px-[var(--space-shell-sm)] pb-[150px] pt-20 md:px-[var(--space-shell)] md:pb-[150px] md:pt-[168px] lg:pt-[120px]'
    >
      {/* Diagonal ambient band behind the prism */}
      <div
        aria-hidden='true'
        className='animate-v3-ken-burns-slow absolute inset-x-[-15%] bottom-[20%] z-0 hidden h-40 opacity-[0.76] blur-sm lg:block'
      >
        <div className='h-full w-full rotate-[-13deg] bg-hero-band' />
      </div>

      {/* Curved paper mask into the next section */}
      {/* <div
        aria-hidden='true'
        className='absolute inset-x-[-4%] -bottom-20 z-0 h-[180px] rounded-t-[50%] bg-spontaine-light'
      /> */}

      <div className='relative z-10 mx-auto grid w-full max-w-[1180px] pl-2 md:pl-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-10'>
        {/* Hero message and primary actions */}
        <div className='relative z-10 max-w-[760px] pb-8 pt-12 md:pb-20 md:pt-16 lg:pb-0'>
          <p className='eyebrow mb-6 max-w-[560px] text-spontaine-gray-cool'>
            The owned intelligence layer for professional services and private equity
          </p>

          <h1
            id='spontaine-v3-hero-title'
            className='display-hero text-spontaine-dark'
          >
            Turn your firm’s data and judgment
            <br />
            <span className='display-hero text-spontaine-text-accent-dark'>
              into an intelligence system you own.
            </span>
          </h1>

          <p className='body-lg mt-7 max-w-[570px] text-spontaine-gray-muted'>
            Your data and experience are already an advantage. Spontaine turns them into a governed
            intelligence layer your firm owns, so the answers your people create can be reused in
            dashboards, workflows, client products, and the next decision.
          </p>

          <div className='mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
            <Button
              asChild
              variant='v3Primary'
              size='v3Hero'
            >
              <a href='/product'>
                The Product
                <ArrowUpRight
                  aria-hidden='true'
                  className='h-4 w-4'
                  strokeWidth={2}
                />
              </a>
            </Button>

            <Button
              asChild
              variant='v3Secondary'
              size='v3Hero'
            >
              <a href='/spontaine-video'>
                View video
                <ArrowUpRight
                  aria-hidden='true'
                  className='h-4 w-4'
                  strokeWidth={2}
                />
              </a>
            </Button>
          </div>

          <p className='mt-5 font-mono text-xs text-spontaine-gray-deep'>
            A 30-minute working session. No deck. No obligation.
          </p>
        </div>

        {/* Governed intelligence product visual */}
        <div
          className='pointer-events-none absolute inset-x-0 top-12 z-0 h-full min-h-[520px] w-full lg:relative lg:top-auto lg:mx-auto lg:min-h-[480px] lg:max-w-none'
          aria-hidden='true'
        >
          {/* Organic glass prism */}
          <div className='animate-v3-ken-burns absolute right-[-10%] top-[70px] aspect-square w-[330px] opacity-60 sm:right-[-2%] sm:w-[410px] md:right-[4%] md:top-[54px] md:w-[460px] lg:right-[2%] lg:top-16 lg:w-[382px] lg:opacity-100'>
            <div className='relative h-full w-full rotate-[15deg] overflow-hidden rounded-[42%_58%_63%_37%/41%_44%_56%_59%] bg-prism-surface shadow-prism'>
              <div className='absolute inset-[12%] rotate-[38deg] skew-x-[-12deg] border border-spontaine-gray/20' />
              <div className='absolute inset-x-[3%] inset-y-[28%] rotate-[-22deg] border border-spontaine-gray/20 bg-gradient-to-r from-transparent via-spontaine-white/70 to-transparent' />
            </div>
          </div>

          {/* Answer prompt card */}
          <div
            ref={promptCardRef}
            className='absolute bottom-5 left-0 hidden w-[min(470px,100%)] rounded-[18px] border border-spontaine-white/90 bg-spontaine-white/[0.84] px-[17px] py-[15px] shadow-surface backdrop-blur-lg lg:bottom-[15px] lg:block'
          >
            <p className='font-body text-[0.78rem] font-semibold text-[var(--spontaine-text-slate)]'>
              Which engagements are likely to miss target margin this quarter?
            </p>

            <div className='mt-3 flex flex-wrap gap-[7px]'>
              {decisionStates.map((state) => (
                <Pill
                  key={state.label}
                  variant={state.variant}
                  size='sm'
                >
                  {state.label}
                </Pill>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio intelligence callout */}
      <div
        ref={calloutRef}
        className='relative left-1/2 z-20 mt-6 w-screen -translate-x-1/2'
      >
        <div className='border border-spontaine-white/70 bg-spontaine-white/35 backdrop-blur-[6px]'>
          <div className='mx-auto grid min-h-[66px] w-full max-w-[1180px] gap-[7px] px-[var(--space-shell-sm)] py-[17px] font-body text-[0.76rem] md:grid-cols-[1.15fr_2fr_0.75fr] md:items-center md:gap-[18px] md:px-[var(--space-shell)]'>
            <strong className='text-[0.8rem] font-semibold text-spontaine-dark'>
              For private equity operating teams
            </strong>
            <span className='text-spontaine-gray-muted'>
              Bring portfolio signals into one governed intelligence layer without replacing each
              company&apos;s systems.
            </span>
            <a
              href='/private-equity'
              className='inline-flex items-center gap-2 font-body text-[0.76rem] font-bold text-spontaine-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-spontaine-accent-dark md:justify-self-end md:text-right'
            >
              Explore portfolio intelligence
              <ArrowRight
                aria-hidden='true'
                className='h-4 w-4'
                strokeWidth={2}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
