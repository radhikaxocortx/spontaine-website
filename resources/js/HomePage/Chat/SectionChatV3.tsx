import ApprovalCard from './ApprovalCard'
import ChatSurface from './ChatSurface'
import ResultsTable from './ResultsTable'
import { useChatStory } from './useChatStory'
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)

const useTypewriter = (
  questions: string[],
  onTypingComplete: () => void,
  typingSpeed = 80,
  deletingSpeed = 30
) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const hasReportedCompletionRef = useRef(false)

  useEffect(() => {
    const currentQuestion = questions[currentIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentQuestion.length) {
            setDisplayText(currentQuestion.substring(0, displayText.length + 1))
          } else {
            if (!hasReportedCompletionRef.current) {
              hasReportedCompletionRef.current = true
              onTypingComplete()
            }

            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else if (displayText.length > 0) {
          setDisplayText(currentQuestion.substring(0, displayText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length)
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    )

    return () => clearTimeout(timeout)
  }, [
    currentIndex,
    deletingSpeed,
    displayText,
    isDeleting,
    onTypingComplete,
    questions,
    typingSpeed,
  ])

  return displayText
}

export default function SectionChatV3() {
  const arcTopRef = useRef<SVGPathElement>(null)
  const sendButtonRef = useRef<HTMLButtonElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const approvalRef = useRef<HTMLDivElement>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const { storyState, onTypingComplete } = useChatStory({
    stageRef,
    tableRef,
    approvalRef,
  })

  useEffect(() => {
    const topArc = arcTopRef.current

    const shouldReduceMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!topArc || shouldReduceMotion) {
      return
    }

    const normalTopArc =
      'M1920 128C1635.2 46.4 1308 0 960 0C612 0 284.8 46.4 0 128V183.067H1920V128Z'
    const inwardTopArc =
      'M1920 128C1635.2 70 1308 30 960 30C612 30 284.8 70 0 128V183.067H1920V128Z'

    const topTl = gsap.timeline({ paused: true })

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

    const arcTrigger = ScrollTrigger.create({
      trigger: topArc,
      animation: topTl,
      start: 'top 80%',
      end: 'top 20%',
      toggleActions: 'play none none reverse',
    })

    return () => {
      arcTrigger.kill()
      topTl.kill()
    }
  }, [])

  const questions = [
    'Build me a dashboard about revenue realization.',
    'Can you find current customer satisfaction numbers?',
    'Where do we have recurring SLA breaches?',
  ]

  const typewriterText = useTypewriter(questions, onTypingComplete)

  const generateOptions = ['Dashboard', 'Insights & Advice', 'Data Exploration']
  const sourceOptions = ['All', 'Finance', 'Sales', 'ERP']
  const timeOptions = ['Last 7 Days', 'Last Month', 'Last Year', '3 Years']

  const [selectedGenerate, setSelectedGenerate] = useState('Dashboard')
  const [selectedSource, setSelectedSource] = useState('All')
  const [selectedTime, setSelectedTime] = useState('Last 7 Days')

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.pill-dropdown')) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <section
      className='relative -mt-32 w-full pb-0 md:pb-0 lg:pb-32'
      data-story-state={storyState}
    >
      <div className='relative w-full'>
        <svg
          viewBox='0 0 1920 183'
          preserveAspectRatio='none'
          className='block w-full'
        >
          <path
            ref={arcTopRef}
            d='M1920 128C1635.2 46.4 1308 0 960 0C612 0 284.8 46.4 0 128V183.067H1920V128Z'
            fill='#ffffff'
          />
        </svg>
      </div>

      <div className='relative -mt-1 bg-white py-4 sm:py-10 lg:py-8'>
        <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-12'>
          <div className='mb-12 text-center sm:mb-16 lg:mb-20'>
            <h2 className='font-display text-3xl font-semibold sm:text-4xl lg:text-5xl'>
              <p className='block text-[#AFC1BD]'>The smallest unit of owned intelligence:</p>
              <p className='block font-bold text-[#4A4A4A]'>one answer everyone can depend on.</p>
            </h2>
          </div>

          <div className='mx-auto max-w-4xl'>
            <ChatSurface
              variant='input'
              size='lg'
              className='group relative overflow-visible transition-all duration-300'
            >
              <div className='flex items-center gap-3 sm:gap-4'>
                <button
                  type='button'
                  className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-gray-500 transition-all duration-200 hover:cursor-default sm:h-11 sm:w-11'
                  aria-label='Attach file'
                >
                  <svg
                    className='h-5 w-5 sm:h-6 sm:w-6'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'
                    />
                  </svg>
                </button>

                <div className='flex-1 py-2'>
                  <p className='font-body text-base text-gray-600 sm:text-lg lg:text-xl'>
                    {typewriterText}
                    <span className='ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-spontaine-accent sm:h-6'></span>
                  </p>
                </div>

                <button
                  ref={sendButtonRef}
                  type='button'
                  className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-spontaine-accent-dark text-white shadow-md transition-all duration-200 hover:cursor-default sm:h-14 sm:w-14'
                  aria-label='Send message'
                >
                  <svg
                    className='h-5 w-5 sm:h-6 sm:w-6'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' />
                  </svg>
                </button>
              </div>

              <div className='mt-4 flex flex-wrap items-center gap-2 sm:gap-3'>
                <div className='pill-dropdown relative'>
                  <button
                    type='button'
                    onClick={() => toggleDropdown('generate')}
                    className='group/pill inline-flex items-center gap-2 rounded-full border border-spontaine-accent/30 bg-spontaine-accent/10 px-4 py-2 text-sm font-medium text-gray-800 transition-all duration-200 hover:border-spontaine-accent/50 hover:bg-spontaine-accent/20 sm:px-5 sm:py-2.5 sm:text-base'
                  >
                    <span className='text-spontaine-accent'>⚡</span>
                    <span>Generate: {selectedGenerate}</span>
                    <svg
                      className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${openDropdown === 'generate' ? 'rotate-180' : ''}`}
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </button>
                  {openDropdown === 'generate' && (
                    <div className='absolute left-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg'>
                      {generateOptions.map((option) => (
                        <button
                          key={option}
                          type='button'
                          onClick={() => {
                            setSelectedGenerate(option)
                            setOpenDropdown(null)
                          }}
                          className='w-full px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-spontaine-accent/10 hover:text-gray-900'
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className='pill-dropdown relative hidden md:block'>
                  <button
                    type='button'
                    onClick={() => toggleDropdown('source')}
                    className='group/pill inline-flex items-center gap-2 rounded-full border border-spontaine-accent-ring/30 bg-spontaine-accent-ring/10 px-4 py-2 text-sm font-medium text-gray-800 transition-all duration-200 hover:border-spontaine-accent-ring/50 hover:bg-spontaine-accent-ring/20 sm:px-5 sm:py-2.5 sm:text-base'
                  >
                    <span className='text-spontaine-dark'>🔗</span>
                    <span>Sources: {selectedSource}</span>
                    <svg
                      className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${openDropdown === 'source' ? 'rotate-180' : ''}`}
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </button>
                  {openDropdown === 'source' && (
                    <div className='absolute left-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg'>
                      {sourceOptions.map((option) => (
                        <button
                          key={option}
                          type='button'
                          onClick={() => {
                            setSelectedSource(option)
                            setOpenDropdown(null)
                          }}
                          className='w-full px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-spontaine-accent/10 hover:text-gray-900'
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className='pill-dropdown relative hidden md:block'>
                  <button
                    type='button'
                    onClick={() => toggleDropdown('time')}
                    className='group/pill inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-gray-300 hover:bg-gray-100 sm:px-5 sm:py-2.5 sm:text-base'
                  >
                    <span>📅</span>
                    <span>{selectedTime}</span>
                    <svg
                      className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${openDropdown === 'time' ? 'rotate-180' : ''}`}
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </button>
                  {openDropdown === 'time' && (
                    <div className='absolute left-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg'>
                      {timeOptions.map((option) => (
                        <button
                          key={option}
                          type='button'
                          onClick={() => {
                            setSelectedTime(option)
                            setOpenDropdown(null)
                          }}
                          className='w-full px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-spontaine-accent/10 hover:text-gray-900'
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ChatSurface>
          </div>

          <div
            ref={stageRef}
            className='relative mx-auto mt-14 min-h-[520px] max-w-6xl overflow-hidden px-2 sm:px-6 lg:overflow-visible'
          >
            <div
              ref={tableRef}
              className='mx-auto max-w-4xl'
            >
              <ResultsTable />
            </div>

            <div
              ref={approvalRef}
              className='relative z-10 mx-auto mt-8 w-full max-w-[480px] pb-2 md:pb-0 lg:absolute lg:-bottom-48 lg:right-10 lg:mt-0'
            >
              <ApprovalCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
