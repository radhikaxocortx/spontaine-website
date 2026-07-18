import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)

/**
 * Custom Typewriter Hook
 *
 * Implements a character-by-character typewriter effect that:
 * 1. Types out the current question
 * 2. Pauses when complete
 * 3. Backspaces the question
 * 4. Moves to the next question in the array
 * 5. Loops infinitely
 */
const useTypewriter = (questions: string[], typingSpeed = 80, deletingSpeed = 30) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentQuestion = questions[currentIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing forward
          if (displayText.length < currentQuestion.length) {
            setDisplayText(currentQuestion.substring(0, displayText.length + 1))
          } else {
            // Pause at end before deleting
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          // Deleting backward
          if (displayText.length > 0) {
            setDisplayText(currentQuestion.substring(0, displayText.length - 1))
          } else {
            // Move to next question
            setIsDeleting(false)
            setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length)
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentIndex, questions, typingSpeed, deletingSpeed])

  return displayText
}

/**
 * SectionChat Component
 *
 * A hero-style section featuring:
 * - Large two-line headline with green highlighted word
 * - Chat-style input box with typewriter placeholder
 * - Interactive pills and action buttons
 * - Fully responsive design matching Figma specifications
 */
export default function SectionChat() {
  const arcTopRef = useRef(null)
  const sendButtonRef = useRef<HTMLButtonElement>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Arc animation
  useEffect(() => {
    const topArc = arcTopRef.current

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

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  // Questions for typewriter animation
  const questions = [
    // 'What were the top 3 complaints from last week?',
    // 'Show me risk alerts for the last 7 days.',
    // 'Generate a dashboard for customer insights.',
    // 'Which products had the highest return rate?',
    // 'Summarize all feedback from enterprise clients.',
    'Build me a dashboard about revenue realization.',
    'Can you find current customer satisfaction numbers?',
    'Where do we have recurring SLA breaches?',
  ]

  const typewriterText = useTypewriter(questions)

  // Dropdown options
  const generateOptions = ['Dashboard', 'Insights & Advice', 'Data Exploration']
  const sourceOptions = ['All', 'Finance', 'Sales', 'ERP']
  const timeOptions = ['Last 7 Days', 'Last Month', 'Last Year', '3 Years']

  // Current selections
  const [selectedGenerate, setSelectedGenerate] = useState('Dashboard')
  const [selectedSource, setSelectedSource] = useState('All')
  const [selectedTime, setSelectedTime] = useState('Last 7 Days')

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  // Close dropdowns when clicking outside
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
    <section className='relative -mt-32 w-full'>
      {/* TOP ARC - overlaps with hero section */}
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

      {/* MAIN CONTENT with white background */}
      <div className='relative -mt-1 bg-white py-4 sm:py-10 lg:py-8'>
        <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-12'>
          {/* Headline */}
          <div className='mb-12 text-center sm:mb-16 lg:mb-20'>
            <h2 className='font-display text-6xl leading-[1] text-spontaine-gray-soft'>
              Connect every signal.
              <br />
              Give your people{' '}
              <span className='text-6xl font-bold italic text-spontaine-accent-dark'>
                superpowers.
              </span>
            </h2>
          </div>

          {/* Chat Input Container */}
          <div className='mx-auto max-w-4xl'>
            <div
              className='group relative overflow-visible rounded-[32px] bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] sm:p-5 lg:p-6'
              style={{
                border: '2px solid transparent',
                backgroundImage:
                  'linear-gradient(white, white), linear-gradient(0deg, #44ECA0 0%, #D0D9FB 100%)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
            >
              {/* Main Input Row */}
              <div className='flex items-center gap-3 sm:gap-4'>
                {/* Attachment Icon Button */}
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

                {/* Typewriter Placeholder Text */}
                <div className='flex-1 py-2'>
                  <p className='font-body text-base text-gray-600 sm:text-lg lg:text-xl'>
                    {typewriterText}
                    <span className='ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-spontaine-accent sm:h-6'></span>
                  </p>
                </div>

                {/* Send Button */}
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

              {/* Pills Row */}
              <div className='mt-4 flex flex-wrap items-center gap-2 sm:gap-3'>
                {/* Generate Dropdown Pill */}
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

                {/* Sources Dropdown Pill */}
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

                {/* Time Range Dropdown Pill */}
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
            </div>

            {/* Subtle Helper Text Below (Optional) */}
            {/* <p className='mt-6 text-center font-space-grotesk text-sm text-gray-500 sm:text-base'>
            Ask anything about your data - insights in seconds.
          </p> */}
          </div>
        </div>
      </div>
    </section>
  )
}
