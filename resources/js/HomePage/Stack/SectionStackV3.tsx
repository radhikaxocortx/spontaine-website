import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface StackCardData {
  readonly label: string
  readonly title: string
  readonly description: readonly string[]
  readonly artwork: StackArtworkKind
  readonly titleTone?: 'default' | 'green'
  readonly compactRightPadding?: boolean
}

type StackArtworkKind = 'connectors' | 'meaning' | 'answers' | 'persistence' | 'safety' | 'new-ip'

const stackCards: StackCardData[] = [
  {
    label: 'Connectors',
    title: 'Connect any source, from anywhere.',
    description: [
      'Spontaine plugs into your data systems in-place, and runs automatically so your processes are untouched. Nothing to replace, nothing to reconfigure.',
      'And unlike enterprise vendors, you’re not locked in to any one stack or limited by a set of supported connectors.',
    ],
    artwork: 'connectors',
  },
  {
    label: 'Meaning',
    title: 'Knows your business, not just your data',
    description: [
      "Spontaine doesn't just know what a number means. It knows what it means for you - your org structure, how you operate, what you're actually trying to achieve. That context shapes the answer, not just the definition behind it.",
      "Ask a nuanced question, get an answer built to be acted on, with the logical next question already suggested. Insight doesn't dead-end at the first answer.",
    ],
    artwork: 'meaning',
  },
  {
    label: 'Answers',
    title: "Answers built for who's asking",
    description: [
      'A partner and an associate ask "what\'s our margin on this account," and each gets exactly what they are looking for.',
      "Context isn't just what's being asked. It's also who's asking.",
      'Every answer carries its own reasoning and traces straight back to the source data behind it.',
    ],
    artwork: 'answers',
    titleTone: 'green',
  },
  {
    label: 'Persistence',
    title: 'Generated once and staying alive.',
    description: [
      "A Persistent Block isn't a frozen snapshot - generated once, pulls data and stays interactive forever. Filter it, drill into it, explore it independently, without asking the AI again.",
      'AI inference runs down toward the minimum as use expands.',
    ],
    artwork: 'persistence',
    titleTone: 'green',
  },
  {
    label: 'Safety',
    title: 'Safe by architecture, not by policy.',
    description: [
      'AI never sees your raw data. Only its shape. Anything sensitive - names, IDs - gets pseudonymised before the model sees it, and the AI has no ability to submit queries to your database directly.',
      'Every answer traces back to what produced it. Safe to run at scale, not just safe in a demo.',
    ],
    artwork: 'safety',
    compactRightPadding: true,
  },
  {
    label: 'New IP',
    title: 'Your platform. Your IP. Your revenue.',
    description: [
      'Codified skills and persistent endpoints remove the real barrier to productising a service line: the build cost.',
      "Connected workflows and automated actions get easier to assemble, and each one keeps uncovering value long after it's built.",
      "Spontaine's core runs inside your perimeter. Everything built on top of it is yours - new IP, not a vendor's feature you're renting.",
    ],
    artwork: 'new-ip',
    titleTone: 'green',
    compactRightPadding: true,
  },
]

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
const figmaStackOffsets = [
  { x: 0, y: 0 },
  { x: 19, y: 40 },
  { x: 35, y: 86 },
  { x: 56, y: 122 },
  { x: 79, y: 172 },
  { x: 107, y: 216 },
] as const
const hiddenCardOffset = 900

export default function SectionStackV3() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const progressBarRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const currentCardRef = useRef(0)
  const [currentCard, setCurrentCard] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) {
      return
    }

    const section = sectionRef.current
    const progressBar = progressBarRef.current
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]

    if (!section || !progressBar || cards.length !== stackCards.length) {
      return
    }

    const step = 1 / (stackCards.length + 1)
    const revealWindow = step * 1.75
    const totalCards = stackCards.length
    const setProgress = gsap.quickSetter(progressBar, 'scaleX') as (value: number) => void

    const setters = cards.map((card, index) => {
      gsap.set(card, {
        transformOrigin: '50% 50%',
        zIndex: index + 1,
      })

      return {
        opacity: gsap.quickSetter(card, 'autoAlpha') as (value: number) => void,
        scale: gsap.quickSetter(card, 'scale') as (value: number) => void,
        x: gsap.quickSetter(card, 'x', 'px') as (value: number) => void,
        y: gsap.quickSetter(card, 'y', 'px') as (value: number) => void,
        setPointerEvents: (value: 'auto' | 'none') => {
          card.style.pointerEvents = value
        },
      }
    })

    const updateStack = (progress: number) => {
      let nextCurrentCard = 0
      const layerProgressByIndex = stackCards.map((_, index) => {
        const start = index * step
        const layerProgress = clamp((progress - start) / revealWindow, 0, 1)

        if (layerProgress > 0.5) {
          nextCurrentCard = index
        }

        return layerProgress
      })

      setters.forEach((setter, index) => {
        const stackOffset =
          figmaStackOffsets[index] ?? figmaStackOffsets[figmaStackOffsets.length - 1]

        if (index <= nextCurrentCard) {
          const depth = nextCurrentCard - index

          setter.opacity(index === nextCurrentCard ? 1 : clamp(0.78 - depth * 0.04, 0.65, 0.78))
          setter.x(stackOffset.x)
          setter.y(stackOffset.y)
          setter.scale(1)
          setter.setPointerEvents(index === nextCurrentCard ? 'auto' : 'none')
          return
        }

        setter.opacity(0)
        setter.x(0)
        setter.y(hiddenCardOffset)
        setter.scale(0.98)
        setter.setPointerEvents('none')
      })

      setProgress(progress)

      if (nextCurrentCard !== currentCardRef.current) {
        currentCardRef.current = nextCurrentCard
        setCurrentCard(nextCurrentCard)
      }
    }

    updateStack(0)

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=450%',
      pin: true,
      scrub: true,
      onUpdate: (self) => updateStack(self.progress),
    })

    return () => {
      trigger.kill()
      gsap.killTweensOf([progressBar, ...cards])
    }
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      className='relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28'
    >
      <AppLayoutPadding>
        <div className='mx-auto flex w-full max-w-[1224px] flex-col items-center'>
          <div className='text-center'>
            <h2 className='max-w-3xl font-display text-3xl font-bold leading-tight text-spontaine-ink-soft sm:text-4xl lg:text-3xl'>
              Governed data and safe AI Inference
            </h2>
            <p className='mx-auto mt-2 max-w-2xl font-display text-2xl font-bold leading-tight text-[#9fb2ad] sm:text-3xl lg:text-3xl'>
              from what you already own.
            </p>
          </div>

          <div className='mt-12 grid w-full grid-cols-1 gap-8 lg:grid-cols-[150px_minmax(0,1fr)] lg:items-start lg:gap-10'>
            <div className='flex flex-col gap-7 lg:pt-1'>
              {stackCards.map((card, index) => (
                <div
                  key={card.label}
                  className={[
                    'flex items-center gap-3 font-mono text-xs transition-colors duration-200',
                    index === currentCard
                      ? 'font-semibold text-spontaine-ink-soft'
                      : 'text-spontaine-ink-normal/60 font-normal',
                  ].join(' ')}
                >
                  <span
                    aria-hidden='true'
                    className={[
                      'h-2 w-2 shrink-0 rounded-full transition-colors duration-200',
                      index === currentCard ? 'bg-spontaine-accent' : 'bg-spontaine-bright-gray',
                    ].join(' ')}
                  />
                  <span>{card.label}</span>
                </div>
              ))}
            </div>

            <div className='flex min-w-0 flex-col items-center'>
              {prefersReducedMotion ? (
                <div className='flex w-full max-w-[750px] flex-col items-center'>
                  <div className='grid w-full gap-5'>
                    {stackCards.map((card) => (
                      <StackCard
                        key={card.label}
                        card={card}
                        isActive
                      />
                    ))}
                  </div>

                  <div className='mt-14 h-1 w-full max-w-[300px] overflow-hidden rounded-full bg-[#f6f8f9]'>
                    <div
                      ref={progressBarRef}
                      className='h-full origin-left scale-x-100 rounded-full bg-spontaine-accent'
                    />
                  </div>
                </div>
              ) : (
                <div className='relative min-h-[540px] w-full max-w-[750px] sm:min-h-[600px]'>
                  {stackCards.map((card, index) => (
                    <div
                      key={card.label}
                      ref={(node) => {
                        cardRefs.current[index] = node
                      }}
                      className='absolute inset-0'
                    >
                      <StackCard
                        card={card}
                        isActive={index === currentCard}
                      />
                    </div>
                  ))}

                  <div className='absolute bottom-6 left-1/2 z-20 h-1 w-full max-w-[300px] -translate-x-1/2 overflow-hidden rounded-full bg-[#90c0e4]'>
                    <div
                      ref={progressBarRef}
                      className='h-full origin-left scale-x-0 rounded-full bg-spontaine-accent'
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </AppLayoutPadding>
    </section>
  )
}

function StackCard({
  card,
  isActive,
}: {
  readonly card: StackCardData
  readonly isActive: boolean
}) {
  return (
    <article
      className={[
        'relative flex flex-col gap-8 overflow-hidden rounded-[27px] px-6 pb-4 pt-4 sm:px-10 md:flex-row md:gap-10',
        isActive
          ? 'bg-[rgba(213,221,233,0.92)] shadow-2xl shadow-spontaine-ink-dark'
          : 'bg-[rgba(213,221,233,0.3)] shadow-none',
        card.compactRightPadding ? 'md:pr-8' : 'md:pr-12',
      ].join(' ')}
    >
      <div className='relative z-10 min-w-0 flex-1'>
        <h3
          className={[
            'font-display text-base font-bold leading-[1.16] transition-colors duration-300 sm:text-lg',
            isActive
              ? card.titleTone === 'green'
                ? 'text-[#1e3a34]'
                : 'text-spontaine-ink-soft'
              : 'text-spontaine-ink-soft/70',
          ].join(' ')}
        >
          {card.title}
        </h3>
        <div
          className={[
            'mt-4 space-y-4 font-body text-sm leading-[1.6] text-[#2b2e33] transition-opacity duration-300 sm:text-sm',
            isActive ? 'opacity-100' : 'hidden',
          ].join(' ')}
        >
          {card.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div
        className={[
          'transition-all duration-300',
          isActive ? 'scale-100 opacity-100 blur-0' : 'scale-105 opacity-25 blur-lg',
        ].join(' ')}
      >
        <StackArtwork artwork={card.artwork} />
      </div>
    </article>
  )
}

function StackArtwork({ artwork }: { readonly artwork: StackArtworkKind }) {
  const className = 'mx-auto h-[180px] w-[190px] shrink-0 md:mx-0 md:h-[205px] md:w-[206px]'

  if (artwork === 'connectors') {
    return (
      <svg
        viewBox='0 0 214 224'
        className={className}
        fill='none'
        aria-hidden='true'
      >
        <path
          d='M130.781 105.447C133.395 116.243 133.311 125.629 130.988 133.101C126.073 148.906 111.136 156.143 90.5034 150.025C60.1164 141.013 28.8824 106.445 20.7402 72.8145C18.1266 62.0191 18.21 52.6326 20.5335 45.1608C25.4481 29.3559 40.3852 22.1185 61.018 28.2372C91.4049 37.2485 122.639 71.8167 130.781 105.447Z'
          fill='#D9D9D9'
        />
        <path
          d='M64.7267 16.3161C44.0939 10.1974 29.1568 17.4348 24.2422 33.2396L20.5361 45.1518C25.4537 29.3534 40.389 22.12 61.0177 28.2375L64.7267 16.3161Z'
          fill='url(#paint0_linear_160_3961)'
        />
        <path
          d='M134.49 93.5263C126.348 59.8956 95.1135 25.3275 64.7265 16.3162L61.0176 28.2376C91.4045 37.2489 122.639 71.8171 130.781 105.448L134.49 93.5263Z'
          fill='url(#paint1_linear_160_3961)'
        />
        <path
          d='M24.2424 33.239C21.919 40.7108 21.8355 50.0974 24.4492 60.8928L20.7402 72.8142C18.1266 62.0188 18.21 52.6322 20.5335 45.1605L24.2424 33.239Z'
          fill='url(#paint2_linear_160_3961)'
        />
        <path
          d='M134.697 121.18C137.02 113.708 137.104 104.322 134.49 93.5264L130.781 105.448C133.395 116.243 133.311 125.63 130.988 133.102L134.697 121.18Z'
          fill='url(#paint3_linear_160_3961)'
        />
        <path
          d='M24.4492 60.8931C32.5914 94.5237 63.8254 129.092 94.2123 138.103L90.5034 150.025C60.1164 141.013 28.8824 106.445 20.7402 72.8145L24.4492 60.8931Z'
          fill='url(#paint4_linear_160_3961)'
        />
        <path
          d='M94.2119 138.103C114.841 144.221 129.776 136.987 134.693 121.189L130.987 133.101C126.073 148.906 111.136 156.143 90.5029 150.025L94.2119 138.103Z'
          fill='url(#paint5_linear_160_3961)'
        />
        <ellipse
          cx='57.3888'
          cy='62.653'
          rx='57.3888'
          ry='62.653'
          transform='matrix(0.958731 0.284314 0.235307 0.971921 9.70605 0)'
          fill='#45EDA1'
        />
        <path
          d='M211.772 136.756C214.75 148.076 214.655 157.918 212.007 165.752C206.406 182.324 189.382 189.913 165.866 183.497C131.234 174.048 95.6359 137.803 86.3561 102.54C83.3773 91.2204 83.4725 81.3783 86.1205 73.5439C91.7218 56.972 108.746 49.3834 132.261 55.799C166.894 65.2477 202.492 101.494 211.772 136.756Z'
          fill='#EBE9D9'
          fillOpacity='0.3'
        />
        <path
          d='M207.215 147.92C210.194 159.24 210.099 169.082 207.451 176.916C201.849 193.488 184.825 201.077 161.31 194.661C126.677 185.213 91.0793 148.967 81.7995 113.704C78.8207 102.384 78.9158 92.5424 81.5639 84.708C87.1652 68.1361 104.189 60.5474 127.705 66.9631C162.337 76.4117 197.935 112.658 207.215 147.92Z'
          fill='#EBE9D9'
          fillOpacity='0.3'
        />
        <path
          d='M108.284 128.003C115.365 133.378 120.148 139.41 122.638 145.513C127.906 158.424 122.917 171.656 107.731 179.659C85.3654 191.445 49.3517 187.428 27.292 170.686C20.2108 165.311 15.4283 159.279 12.9379 153.176C7.67026 140.265 12.6592 127.033 27.8452 119.03C50.2105 107.244 86.2241 111.261 108.284 128.003Z'
          fill='#5DAFE4'
          fillOpacity='0.2'
        />
        <path
          d='M106.19 128.981C113.271 134.356 118.054 140.388 120.544 146.491C125.812 159.402 120.823 172.634 105.637 180.637C83.2716 192.423 47.258 188.406 25.1982 171.664C18.1171 166.29 13.3345 160.257 10.8442 154.154C5.57651 141.243 10.5654 128.011 25.7515 120.008C48.1167 108.222 84.1303 112.239 106.19 128.981Z'
          fill='#5DAFE4'
          fillOpacity='0.2'
        />
        <defs>
          <linearGradient
            id='paint0_linear_160_3961'
            x1='21.964'
            y1='40.5622'
            x2='54.0751'
            y2='50.5526'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#E3E2E1' />
            <stop
              offset='0.5'
              stopColor='#E9E8E7'
            />
            <stop
              offset='1'
              stopColor='#B9B5B5'
            />
          </linearGradient>
          <linearGradient
            id='paint1_linear_160_3961'
            x1='52.3733'
            y1='56.0222'
            x2='137.881'
            y2='82.6252'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#B9B5B5' />
            <stop
              offset='0.5'
              stopColor='#9B878E'
            />
            <stop
              offset='1'
              stopColor='#B9B5B5'
            />
          </linearGradient>
          <linearGradient
            id='paint2_linear_160_3961'
            x1='22.742'
            y1='38.0618'
            x2='30.7747'
            y2='40.5609'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#E3E2E1' />
            <stop
              offset='0.5'
              stopColor='#0CCE97'
            />
            <stop
              offset='1'
              stopColor='#45EDA1'
            />
          </linearGradient>
          <linearGradient
            id='paint3_linear_160_3961'
            x1='133.175'
            y1='97.7535'
            x2='141.208'
            y2='100.253'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#B9B5B5' />
            <stop
              offset='0.5'
              stopColor='#CBCBCB'
            />
            <stop
              offset='1'
              stopColor='#E3E2E1'
            />
          </linearGradient>
          <linearGradient
            id='paint4_linear_160_3961'
            x1='12.096'
            y1='100.599'
            x2='97.6039'
            y2='127.202'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#45EDA1' />
            <stop
              offset='0.5'
              stopColor='#0CCE97'
            />
            <stop
              offset='1'
              stopColor='#45EDA1'
            />
          </linearGradient>
          <linearGradient
            id='paint5_linear_160_3961'
            x1='91.3319'
            y1='147.36'
            x2='123.443'
            y2='157.351'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#45EDA1' />
            <stop
              offset='0.5'
              stopColor='#91FACB'
            />
            <stop
              offset='1'
              stopColor='#E1FEF1'
            />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  if (artwork === 'meaning') {
    return (
      <svg
        viewBox='0 0 206 205'
        className={className}
        fill='none'
        aria-hidden='true'
      >
        <g filter='url(#filter0_d_160_3983)'>
          <path
            d='M170.999 158.156C174.066 162.673 173.901 166.554 171.054 169.597C165.035 176.034 147.023 178.726 122.255 175.777C85.778 171.436 48.4604 156.507 38.9036 142.433C35.8359 137.915 36.0016 134.035 38.8474 130.992C44.8672 124.554 62.879 121.863 87.6469 124.811C124.124 129.153 161.441 144.082 170.999 158.156Z'
            fill='#E25C5C'
            fillOpacity='0.6'
          />
          <path
            d='M171.417 153.898C181.235 167.545 164.167 173.466 126.738 169.223C89.3093 164.981 51.0075 150.479 41.189 136.832C31.3703 123.185 50.5885 118.788 88.0175 123.03C125.447 127.272 161.599 140.251 171.417 153.898Z'
            fill='#EE7007'
            fillOpacity='0.5'
          />
        </g>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M164.424 82.1201L158.814 60.7416C157.02 53.8307 149.722 46.8838 143.239 45.9981L120.552 42.898C117.966 32.8276 109.004 27.0454 99.4726 25.7431C93.0192 24.8612 87.9629 26.2629 86.1657 30.3121C85.3106 32.2388 85.1933 34.765 86.0146 37.9299C86.0383 38.021 68.0167 35.7194 68.0167 35.7194C64.0986 35.184 61.1208 36.9603 59.7803 39.9802C58.9081 41.9457 58.7293 44.4379 59.4364 47.1624L65.0226 67.7621C74.4713 69.1702 84.1264 78.0993 86.6561 87.8473C87.6187 91.5569 87.409 94.8461 86.2616 97.4333C84.3961 101.639 80.0522 103.99 74.2377 103.272L80.5531 127.608C82.3464 134.519 89.0441 140.841 95.5192 141.726L170.75 152.006C174.889 152.571 178.222 150.816 179.618 147.671C180.406 145.896 180.577 143.68 179.931 141.188L173.718 117.539C178.171 117.581 181.325 115.528 182.838 112.119C184.044 109.401 184.207 105.822 183.152 101.757C180.76 92.5402 173.025 84.2612 164.424 82.1201Z'
          fill='#EE7007'
          fillOpacity='0.5'
        />
        <path
          d='M112.165 94.9972C109.325 93.9028 106.12 94.6011 105.007 96.5568C103.893 98.5125 105.293 100.985 108.133 102.079L110.149 98.5384L112.165 94.9972ZM138.607 76.4912C139.392 74.4242 137.639 72.0465 134.691 71.1805C131.743 70.3145 128.717 71.2882 127.932 73.3553L133.27 74.9232L138.607 76.4912ZM110.149 98.5384L108.133 102.079L119.142 106.322L121.158 102.781L123.174 99.2397L112.165 94.9972L110.149 98.5384ZM121.158 102.781L119.142 106.322C122.923 107.779 127.162 106.644 128.208 103.89L122.87 102.322L117.533 100.754C118.185 99.0354 120.817 98.3315 123.174 99.2397L121.158 102.781ZM122.87 102.322L128.208 103.89L138.607 76.4912L133.27 74.9232L127.932 73.3553L117.533 100.754L122.87 102.322Z'
          fill='#E5E7EB'
          fillOpacity='0.6'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M168.571 78.6299L162.961 57.2513C161.167 50.3405 153.869 43.3936 147.388 42.5079L124.699 39.4078C122.114 29.3374 113.151 23.5552 103.62 22.2528C94.096 20.9515 87.6147 24.6234 90.1621 34.4397C90.1857 34.5308 72.1641 32.2292 72.1641 32.2292C65.6961 31.3454 61.7904 36.7613 63.5838 43.6721L69.1701 64.2719C78.6187 65.68 88.2739 74.6091 90.8035 84.3571C93.3313 94.0975 87.776 100.941 78.3852 99.782L84.7005 124.118C86.494 131.029 93.1916 137.352 99.6668 138.236L174.897 148.515C181.373 149.4 185.871 144.608 184.078 137.697L177.866 114.049C185.869 114.125 189.677 107.431 187.3 98.2669C184.907 89.05 177.172 80.771 168.571 78.6299Z'
          fill='#EE7007'
          fillOpacity='0.1'
        />
        <defs>
          <filter
            id='filter0_d_160_3983'
            x='32.6582'
            y='121.477'
            width='145.489'
            height='63.4932'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood
              floodOpacity='0'
              result='BackgroundImageFix'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='4' />
            <feGaussianBlur stdDeviation='2' />
            <feComposite
              in2='hardAlpha'
              operator='out'
            />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow_160_3983'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow_160_3983'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    )
  }

  if (artwork === 'answers') {
    return (
      <svg
        viewBox='0 0 142 148'
        className={className}
        fill='none'
        aria-hidden='true'
      >
        <path
          d='M91.1861 49.3234C90.2629 49.3103 89.3823 48.9329 88.7361 48.2734C88.0843 47.6177 87.7184 46.7306 87.7184 45.8059C87.7184 44.8813 88.0843 43.9942 88.7361 43.3384L91.1861 40.8535C91.5125 40.5271 91.8999 40.2683 92.3263 40.0917C92.7526 39.915 93.2096 39.8241 93.6711 39.8241C94.1326 39.8241 94.5896 39.915 95.016 40.0917C95.4424 40.2683 95.8298 40.5271 96.1561 40.8535C96.4825 41.1798 96.7413 41.5672 96.9179 41.9936C97.0945 42.42 97.1854 42.8769 97.1854 43.3384C97.1854 43.8 97.0945 44.2569 96.9179 44.6833C96.7413 45.1097 96.4825 45.4971 96.1561 45.8234L93.6711 48.2734C93.347 48.6041 92.9604 48.8672 92.5339 49.0475C92.1073 49.2277 91.6492 49.3215 91.1861 49.3234ZM46.6663 49.3234C46.2032 49.3215 45.7451 49.2277 45.3186 49.0475C44.892 48.8672 44.5055 48.6041 44.1813 48.2734L41.6963 45.8234C41.0372 45.1644 40.667 44.2705 40.667 43.3384C40.667 42.4064 41.0372 41.5125 41.6963 40.8535C42.3554 40.1944 43.2492 39.8241 44.1813 39.8241C45.1134 39.8241 46.0072 40.1944 46.6663 40.8535L49.1163 43.3384C49.7682 43.9942 50.1341 44.8813 50.1341 45.8059C50.1341 46.7306 49.7682 47.6177 49.1163 48.2734C48.4701 48.9329 47.5895 49.3103 46.6663 49.3234ZM68.9262 40.0835C67.998 40.0835 67.1077 39.7147 66.4513 39.0583C65.795 38.402 65.4262 37.5117 65.4262 36.5835V33.0835C65.4262 32.1552 65.795 31.265 66.4513 30.6086C67.1077 29.9522 67.998 29.5835 68.9262 29.5835C69.8545 29.5835 70.7447 29.9522 71.4011 30.6086C72.0575 31.265 72.4262 32.1552 72.4262 33.0835V36.5835C72.4262 37.5117 72.0575 38.402 71.4011 39.0583C70.7447 39.7147 69.8545 40.0835 68.9262 40.0835Z'
          fill='#7DE4F4'
          fillOpacity='0.4'
        />
        <path
          d='M44.1816 40.3237C44.9808 40.3238 45.7473 40.6416 46.3125 41.2065L48.7598 43.6899L48.7617 43.6909C49.3205 44.253 49.6338 45.0136 49.6338 45.8062C49.6337 46.5986 49.3204 47.3594 48.7617 47.9214L48.7588 47.9233C48.2058 48.4876 47.4529 48.8105 46.6631 48.8228C46.268 48.8204 45.8767 48.7402 45.5127 48.5864C45.1473 48.4319 44.8158 48.2067 44.5381 47.9233L44.5322 47.9175L42.0469 45.4673C41.4833 44.9023 41.167 44.1365 41.167 43.3384C41.167 42.539 41.4845 41.7718 42.0498 41.2065C42.6151 40.6414 43.3823 40.3237 44.1816 40.3237ZM93.6709 40.3237C94.0666 40.3237 94.4586 40.4019 94.8242 40.5532C95.1899 40.7047 95.5229 40.9267 95.8027 41.2065C96.0826 41.4864 96.3046 41.8193 96.4561 42.1851C96.6075 42.5507 96.6855 42.9426 96.6855 43.3384C96.6855 43.7341 96.6075 44.1261 96.4561 44.4917C96.305 44.8564 96.0835 45.1879 95.8047 45.4673L93.3203 47.9175L93.3145 47.9233C93.0366 48.2068 92.7045 48.4319 92.3389 48.5864C91.9746 48.7403 91.5838 48.8205 91.1885 48.8228C90.399 48.8102 89.6465 48.4873 89.0938 47.9233L89.0908 47.9214L88.8926 47.7017C88.4582 47.1688 88.2188 46.4996 88.2188 45.8062C88.2188 45.0136 88.5321 44.253 89.0908 43.6909L89.0918 43.6899L91.54 41.2065C91.8199 40.9268 92.152 40.7046 92.5176 40.5532C92.8832 40.4018 93.2752 40.3238 93.6709 40.3237ZM68.9258 30.0835C69.7214 30.0835 70.4852 30.3998 71.0479 30.9624C71.6103 31.525 71.9258 32.288 71.9258 33.0835V36.5835C71.9258 37.379 71.6103 38.142 71.0479 38.7046C70.4852 39.2672 69.7214 39.5835 68.9258 39.5835C68.1303 39.5834 67.3672 39.2671 66.8047 38.7046C66.2422 38.142 65.9258 37.379 65.9258 36.5835V33.0835C65.9258 32.288 66.2422 31.525 66.8047 30.9624C67.3672 30.3999 68.1303 30.0836 68.9258 30.0835Z'
          stroke='#4C8EF9'
          strokeOpacity='0.3'
        />
        <path
          d='M92.3522 49.3234C91.429 49.3103 90.5484 48.9329 89.9022 48.2734C89.2503 47.6177 88.8844 46.7306 88.8844 45.8059C88.8844 44.8813 89.2503 43.9942 89.9022 43.3384L92.3522 40.8535C92.6785 40.5271 93.0659 40.2683 93.4923 40.0917C93.9187 39.915 94.3756 39.8241 94.8371 39.8241C95.2986 39.8241 95.7556 39.915 96.182 40.0917C96.6084 40.2683 96.9958 40.5271 97.3221 40.8535C97.6485 41.1798 97.9073 41.5672 98.0839 41.9936C98.2605 42.42 98.3514 42.8769 98.3514 43.3384C98.3514 43.8 98.2605 44.2569 98.0839 44.6833C97.9073 45.1097 97.6485 45.4971 97.3221 45.8234L94.8371 48.2734C94.513 48.6041 94.1264 48.8672 93.6999 49.0475C93.2733 49.2277 92.8152 49.3215 92.3522 49.3234ZM47.8323 49.3234C47.3692 49.3215 46.9111 49.2277 46.4846 49.0475C46.058 48.8672 45.6715 48.6041 45.3473 48.2734L42.8623 45.8234C42.2033 45.1644 41.833 44.2705 41.833 43.3384C41.833 42.4064 42.2033 41.5125 42.8623 40.8535C43.5214 40.1944 44.4153 39.8241 45.3473 39.8241C46.2794 39.8241 47.1732 40.1944 47.8323 40.8535L50.2823 43.3384C50.9342 43.9942 51.3001 44.8813 51.3001 45.8059C51.3001 46.7306 50.9342 47.6177 50.2823 48.2734C49.6361 48.9329 48.7555 49.3103 47.8323 49.3234ZM70.0922 40.0835C69.164 40.0835 68.2737 39.7147 67.6174 39.0583C66.961 38.402 66.5922 37.5117 66.5922 36.5835V33.0835C66.5922 32.1552 66.961 31.265 67.6174 30.6086C68.2737 29.9522 69.164 29.5835 70.0922 29.5835C71.0205 29.5835 71.9107 29.9522 72.5671 30.6086C73.2235 31.265 73.5922 32.1552 73.5922 33.0835V36.5835C73.5922 37.5117 73.2235 38.402 72.5671 39.0583C71.9107 39.7147 71.0205 40.0835 70.0922 40.0835Z'
          fill='#7DE4F4'
          fillOpacity='0.4'
        />
        <path
          d='M45.3477 40.3237C46.1468 40.3238 46.9133 40.6416 47.4785 41.2065L49.9258 43.6899L49.9277 43.6909C50.4865 44.253 50.7998 45.0136 50.7998 45.8062C50.7997 46.5986 50.4864 47.3594 49.9277 47.9214L49.9248 47.9233C49.3718 48.4876 48.6189 48.8105 47.8291 48.8228C47.434 48.8204 47.0427 48.7402 46.6787 48.5864C46.3133 48.4319 45.9818 48.2067 45.7041 47.9233L45.6982 47.9175L43.2129 45.4673C42.6493 44.9023 42.333 44.1365 42.333 43.3384C42.333 42.539 42.6505 41.7718 43.2158 41.2065C43.7811 40.6414 44.5483 40.3237 45.3477 40.3237ZM94.8369 40.3237C95.2326 40.3237 95.6247 40.4019 95.9902 40.5532C96.3559 40.7047 96.6889 40.9267 96.9688 41.2065C97.2487 41.4864 97.4706 41.8193 97.6221 42.1851C97.7735 42.5507 97.8516 42.9426 97.8516 43.3384C97.8516 43.7341 97.7735 44.1261 97.6221 44.4917C97.471 44.8564 97.2495 45.1879 96.9707 45.4673L94.4863 47.9175L94.4805 47.9233C94.2026 48.2068 93.8705 48.4319 93.5049 48.5864C93.1407 48.7403 92.7499 48.8205 92.3545 48.8228C91.565 48.8102 90.8125 48.4873 90.2598 47.9233L90.2568 47.9214L90.0586 47.7017C89.6242 47.1688 89.3848 46.4996 89.3848 45.8062C89.3848 45.0136 89.6981 44.253 90.2568 43.6909L90.2578 43.6899L92.7061 41.2065C92.9859 40.9268 93.3181 40.7046 93.6836 40.5532C94.0492 40.4018 94.4412 40.3238 94.8369 40.3237ZM70.0918 30.0835C70.8874 30.0835 71.6513 30.3998 72.2139 30.9624C72.7763 31.525 73.0918 32.288 73.0918 33.0835V36.5835C73.0918 37.379 72.7763 38.142 72.2139 38.7046C71.6513 39.2672 70.8874 39.5835 70.0918 39.5835C69.2963 39.5834 68.5332 39.2671 67.9707 38.7046C67.4082 38.142 67.0918 37.379 67.0918 36.5835V33.0835C67.0918 32.288 67.4082 31.525 67.9707 30.9624C68.5332 30.3999 69.2963 30.0836 70.0918 30.0835Z'
          stroke='#4C8EF9'
          strokeOpacity='0.3'
        />
        <path
          d='M82.1245 55.5768C80.1488 53.9342 77.8227 52.6484 75.2792 51.7927C72.7357 50.937 70.0246 50.5281 67.3005 50.5895C61.7991 50.7135 56.5793 52.7452 52.7893 56.2378C48.9994 59.7304 47.5258 64.3192 47.6675 69.1345C47.8091 73.9498 49.5543 78.5972 53.5446 81.9144C54.4467 82.6449 55.1733 83.5255 55.6818 84.5048C56.1904 85.484 56.4706 86.5422 56.5062 87.6175V95.0573C56.5062 96.4324 56.8937 97.0124 58.0046 97.9847C59.1154 98.957 61.4736 97.9847 63.0446 97.9847H75.2792C76.8502 97.9847 78.4537 98.957 79.5646 97.9847C80.6754 97.0124 80.1995 96.4324 80.1995 95.0573V87.5915C80.2044 86.5688 80.4397 85.5569 80.892 84.6139C81.3443 83.6709 82.0047 82.8152 82.8353 82.0959C84.8211 80.4155 86.3982 78.4011 87.4721 76.1737C88.546 73.9464 89.0944 71.552 89.0844 69.1345C89.0834 66.5726 88.4627 64.04 87.2631 61.7033C86.0636 59.3665 84.3123 57.2786 82.1245 55.5768Z'
          fill='#F0DE50'
          fillOpacity='0.36'
        />
        <path
          d='M57.0059 87.6011C56.9678 86.4493 56.668 85.3177 56.126 84.2739C55.6519 83.361 55.0013 82.5325 54.208 81.8228L53.8594 81.5259C50.0049 78.3189 48.3053 73.8209 48.167 69.1196C48.0288 64.4205 49.4642 59.9824 53.1279 56.606C56.822 53.2017 61.9229 51.2108 67.3115 51.0894C69.9785 51.0293 72.6324 51.4292 75.1201 52.2661C77.6077 53.103 79.8785 54.3601 81.8047 55.9614L81.8115 55.9663L81.8174 55.9712C83.9508 57.6307 85.6539 59.6629 86.8184 61.9312C87.9826 64.1991 88.583 66.654 88.584 69.1343V69.1362C88.5936 71.4761 88.0632 73.7959 87.0215 75.9565C85.9797 78.1174 84.4476 80.0769 82.5127 81.7144L82.5078 81.7183C81.6282 82.4801 80.9248 83.3901 80.4414 84.3979C79.9579 85.4061 79.7045 86.4909 79.6992 87.5894V95.0571C79.6992 95.429 79.7315 95.7459 79.7588 96.0093C79.7871 96.2827 79.8067 96.4746 79.7988 96.6489C79.7916 96.8089 79.7609 96.9415 79.6895 97.0776C79.6148 97.2198 79.4825 97.3926 79.2354 97.6089C78.8587 97.9384 78.3817 97.9725 77.6758 97.856C77.3133 97.7961 76.971 97.7125 76.5508 97.6304C76.1523 97.5525 75.7203 97.4849 75.2793 97.4849H63.0449C62.6079 97.4849 62.1306 97.5521 61.6689 97.6284C61.1922 97.7072 60.7389 97.7946 60.2871 97.854C59.839 97.9129 59.4375 97.9367 59.0957 97.8979C58.7573 97.8595 58.5105 97.7632 58.334 97.6089C57.7857 97.129 57.4699 96.7895 57.2793 96.4351C57.0961 96.0944 57.0059 95.6958 57.0059 95.0571V87.6011Z'
          stroke='#4C8EF9'
          strokeOpacity='0.3'
        />
        <path
          d='M83.873 52.7878C81.8972 50.9112 79.5712 49.4421 77.0277 48.4645C74.4842 47.4868 71.773 47.0198 69.049 47.0899C63.5476 47.2315 58.3277 49.5528 54.5378 53.543C50.7479 57.5332 48.6983 62.8656 48.8399 68.367C48.9815 73.8684 51.3028 79.0883 55.293 82.8782C56.1952 83.7127 56.9218 84.7188 57.4303 85.8376C57.9388 86.9564 58.2191 88.1654 58.2547 89.3938V97.8938C58.2547 99.4648 58.8787 100.971 59.9896 102.082C61.1004 103.193 62.607 103.817 64.178 103.817H76.0246C77.5956 103.817 79.1022 103.193 80.213 102.082C81.3239 100.971 81.9479 99.4648 81.9479 97.8938V89.3642C81.9528 88.1958 82.1882 87.0397 82.6405 85.9623C83.0928 84.8849 83.7531 83.9073 84.5838 83.0855C86.5695 81.1657 88.1467 78.8643 89.2206 76.3195C90.2944 73.7748 90.8429 71.0393 90.8329 68.2772C90.8319 65.3504 90.2112 62.4569 89.0116 59.7872C87.812 57.1175 86.0607 54.732 83.873 52.7878Z'
          fill='#F0DE50'
          fillOpacity='0.36'
        />
        <path
          d='M56.416 96.0835V101.917C56.416 103.464 57.0921 104.948 58.2954 106.042C59.4988 107.136 61.1309 107.75 62.8327 107.75C62.8327 108.524 63.1707 109.266 63.7724 109.813C64.3741 110.36 65.1901 110.667 66.041 110.667H72.4577C73.3086 110.667 74.1246 110.36 74.7263 109.813C75.328 109.266 75.666 108.524 75.666 107.75C77.3678 107.75 78.9999 107.136 80.2033 106.042C81.4066 104.948 82.0827 103.464 82.0827 101.917V96.0835H56.416Z'
          fill='#42D6EC'
          fillOpacity='0.49'
        />
        <path
          d='M63.333 107.25H62.833C61.2492 107.25 59.7386 106.678 58.6318 105.671C57.5267 104.667 56.916 103.315 56.916 101.917V96.5835H81.583V101.917C81.583 103.315 80.9722 104.667 79.8672 105.671C78.7605 106.678 77.2498 107.25 75.666 107.25H75.166V107.75C75.1659 108.375 74.893 108.985 74.3896 109.443C73.8847 109.902 73.1906 110.166 72.458 110.167H66.041C65.3082 110.167 64.6135 109.902 64.1084 109.443C63.605 108.985 63.3331 108.375 63.333 107.75V107.25Z'
          stroke='#4C8EF9'
          strokeOpacity='0.3'
        />
        <path
          d='M58.166 96.0835V102.85C58.166 104.645 58.796 106.366 59.9173 107.635C61.0386 108.904 62.5594 109.617 64.1452 109.617C64.1452 110.514 64.4602 111.375 65.0208 112.009C65.5815 112.644 66.3419 113 67.1348 113H73.1139C73.9068 113 74.6672 112.644 75.2279 112.009C75.7885 111.375 76.1035 110.514 76.1035 109.617C77.6893 109.617 79.2101 108.904 80.3314 107.635C81.4527 106.366 82.0827 104.645 82.0827 102.85V96.0835H58.166Z'
          fill='#ADDCE3'
        />
        <path
          d='M64.6455 109.117H64.1455C62.7138 109.117 61.3257 108.474 60.292 107.304C59.2565 106.132 58.666 104.531 58.666 102.85V96.5835H81.583V102.85C81.583 104.531 80.9925 106.132 79.957 107.304C78.9234 108.474 77.5353 109.117 76.1035 109.117H75.6035V109.617C75.6035 110.4 75.3283 111.141 74.8535 111.678C74.3806 112.213 73.7531 112.5 73.1143 112.5H67.1348C66.4959 112.5 65.8685 112.214 65.3955 111.678C64.9207 111.141 64.6455 110.4 64.6455 109.617V109.117Z'
          stroke='#4C8EF9'
          strokeOpacity='0.3'
        />
        <path
          d='M100.313 16.7794C91.2603 11.1957 80.7509 8 69.5417 8C35.5531 8 8 37.3813 8 73.625C8 84.123 10.3116 94.0449 14.4216 102.845C15.5139 105.183 15.8774 107.856 15.2442 110.379L11.5787 124.988C9.98749 131.329 15.4281 137.13 21.3752 135.434L35.0746 131.525C37.4411 130.85 39.9476 131.238 42.1404 132.402C50.3922 136.785 59.6968 139.25 69.5417 139.25C103.53 139.25 131.083 109.868 131.083 73.625C131.083 61.6721 128.086 50.4651 122.85 40.8125'
          stroke='#4C8EF9'
          strokeOpacity='0.3'
          strokeWidth='16'
          strokeLinecap='round'
        />
        <path
          d='M103.229 16.7794C94.1773 11.1957 83.6679 8 72.4587 8C38.4701 8 10.917 37.3813 10.917 73.625C10.917 84.123 13.2286 94.0449 17.3386 102.845C18.4309 105.183 18.7944 107.856 18.1612 110.379L14.4957 124.988C12.9045 131.329 18.3451 137.13 24.2921 135.434L37.9916 131.525C40.3581 130.85 42.8646 131.238 45.0574 132.402C53.3092 136.785 62.6138 139.25 72.4587 139.25C106.447 139.25 134 109.868 134 73.625C134 61.6721 131.003 50.4651 125.767 40.8125'
          stroke='#4C8EF9'
          strokeOpacity='0.3'
          strokeWidth='16'
          strokeLinecap='round'
        />
      </svg>
    )
  }

  if (artwork === 'persistence') {
    return (
      <svg
        viewBox='0 0 206 205'
        className={className}
        fill='none'
        aria-hidden='true'
      >
        {[0, 1, 2].map((index) => (
          <rect
            key={index}
            x={28 + index * 34}
            y={66 - index * 12}
            width='122'
            height='105'
            rx='29'
            transform={`rotate(-26 ${28 + index * 34} ${66 - index * 12})`}
            fill={index === 0 ? '#09C7A4' : '#2ECA9E'}
            fillOpacity={0.18 + index * 0.14}
          />
        ))}
        <rect
          x='96'
          y='70'
          width='84'
          height='78'
          rx='24'
          fill='#2ECA9E'
          fillOpacity='0.62'
          transform='rotate(-26 96 70)'
        />
        <path
          d='M91 137l22-36 21 8 21-42'
          stroke='#D7F4EF'
          strokeWidth='9'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    )
  }

  if (artwork === 'safety') {
    return (
      <svg
        viewBox='0 0 206 205'
        className={className}
        fill='none'
        aria-hidden='true'
      >
        <path
          d='M103 21l61 26c9 4 15 13 15 23v31c0 39-28 72-76 88-48-16-76-49-76-88V70c0-10 6-19 15-23l61-26Z'
          fill='#EDD620'
          fillOpacity='0.4'
        />
        <path
          d='M158 52L54 157'
          stroke='white'
          strokeOpacity='0.9'
          strokeWidth='8'
          strokeLinecap='round'
        />
      </svg>
    )
  }

  return (
    <svg
      viewBox='0 0 206 205'
      className={className}
      fill='none'
      aria-hidden='true'
    >
      <path
        d='M62 18h105l34 59-88 109L25 77 62 18Z'
        stroke='#C778EA'
        strokeOpacity='0.65'
        strokeWidth='13'
        strokeLinejoin='round'
      />
      <path
        d='M72 38h85l22 39-66 72-66-72 25-39Z'
        stroke='#F0B6FF'
        strokeOpacity='0.55'
        strokeWidth='9'
        strokeLinejoin='round'
      />
    </svg>
  )
}
