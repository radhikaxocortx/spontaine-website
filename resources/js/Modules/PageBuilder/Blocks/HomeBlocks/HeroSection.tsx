import { Button } from '@/components/ui/button'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

const HeroSection = () => {
  // Animation refs
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const questionsRef = useRef<HTMLDivElement>(null)
  const typewriterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states - hide elements
      gsap.set([titleRef.current, descriptionRef.current, ctaRef.current], {
        opacity: 0,
        y: 60,
      })

      gsap.set(questionsRef.current, {
        opacity: 0,
        y: 40,
      })

      // Video zoom animation - slow, subtle movement
      if (videoRef.current) {
        gsap.set(videoRef.current, { scale: 1 })
        gsap.to(videoRef.current, {
          scale: 1.1,
          duration: 20,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        })
      }

      // ScrollTrigger to track hero section visibility for navbar
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          // Dispatch custom event to control navbar visibility
          const event = new CustomEvent('hero-section-visible', {
            detail: self.isActive
          })
          window.dispatchEvent(event)
        },
        onRefresh: (self) => {
          // Also dispatch on refresh to ensure correct initial state
          const event = new CustomEvent('hero-section-visible', {
            detail: self.isActive
          })
          window.dispatchEvent(event)
        }
      })

      // Create main timeline for content animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      // Animate title with elastic ease
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
      })

      // Animate description
      tl.to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.8'
      )

      // Animate CTA button with bounce
      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
        },
        '-=0.6'
      )

      // Animate questions section last
      tl.to(
        questionsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4'
      )

      // Hover animation for CTA button
      if (ctaRef.current) {
        const button = ctaRef.current.querySelector('button')
        const arrow = ctaRef.current.querySelector('.arrow-icon')

        if (button && arrow) {
          // Set initial arrow position
          gsap.set(arrow, { x: 0 })

          button.addEventListener('mouseenter', () => {
            gsap.to(button, {
              scale: 1.05,
              duration: 0.3,
              ease: 'power2.out',
            })
            gsap.to(arrow, {
              x: 4,
              duration: 0.3,
              ease: 'power2.out',
            })
          })

          button.addEventListener('mouseleave', () => {
            gsap.to(button, {
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
            })
            gsap.to(arrow, {
              x: 0,
              duration: 0.3,
              ease: 'power2.out',
            })
          })
        }
      }

      // Parallax effect for the entire hero section
      gsap.to(heroRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Typewriter animation for questions
  useEffect(() => {
    const questions = [
      'What sales insights do you have for me?',
      'What about vendor payments in June 2025?',
      'Who are our best performing distributors in Q3?',
    ]

    let currentQuestion = 0
    let isDeleting = false
    let text = ''
    let delta = 200 - Math.random() * 100

    const tick = () => {
      const fullText = questions[currentQuestion]

      if (isDeleting) {
        text = fullText.substring(0, text.length - 1)
      } else {
        text = fullText.substring(0, text.length + 1)
      }

      if (typewriterRef.current) {
        typewriterRef.current.textContent = text
      }

      if (isDeleting) {
        delta /= 2
      }

      if (!isDeleting && text === fullText) {
        delta = 800
        isDeleting = true
      } else if (isDeleting && text === '') {
        isDeleting = false
        currentQuestion = (currentQuestion + 1) % questions.length
        delta = 1000
      }

      setTimeout(tick, delta)
    }

    // Start typewriter animation after a delay
    const timer = setTimeout(() => {
      tick()
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

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
    <div
      ref={heroRef}
      className='relative flex items-center justify-center overflow-hidden pt-36'
    >
      {/* Background Video */}
      <div className='absolute inset-0 h-full w-full'>
        <video
          ref={videoRef}
          className='absolute inset-0 h-full w-full object-cover'
          autoPlay
          muted
          loop
          playsInline
          poster='/imge/home/hero-poster.png'
        >
          <source
            src='/imge/home/hero-video.mp4'
            type='video/mp4'
          />
          {/* Fallback for unsupported video */}
        </video>
        {/* Dark overlay for better text readability */}
        <div className='absolute inset-0 bg-black/50' />
      </div>

      {/* Background geometric shapes for additional visual interest */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute right-1/4 top-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl sm:h-80 sm:w-80 lg:h-96 lg:w-96' />
        <div className='absolute bottom-1/4 left-1/4 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl sm:h-64 sm:w-64 lg:h-80 lg:w-80' />
        <div className='absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-blue-600/5 to-purple-600/5 blur-3xl sm:h-[450px] sm:w-[450px] lg:h-[600px] lg:w-[600px]' />
      </div>

      <AppLayoutPadding>
        <div className='relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 text-center sm:px-6 lg:px-8'>
          {/* Main Title */}
          <div
            ref={titleRef}
            className='mb-6 sm:mb-8'
          >
            <h1 className='hero-title'>
              Turn Disconnected Data <br />
              Into Strategic Execution.
            </h1>
          </div>

          {/* Questions Section with Typewriter Animation */}
          <div
            ref={questionsRef}
            className='mb-8 flex flex-col items-center sm:mb-12'
          >
            <div className='hero-typewriter-container'>
              <span
                ref={typewriterRef}
                className='hero-typewriter-text'
              >
                {/* Typewriter content will be inserted here */}
              </span>
              <span className='hero-typewriter-cursor'>|</span>
            </div>
          </div>

          {/* Description */}
          <div
            ref={descriptionRef}
            className='mb-8 sm:mb-12'
          >
            <p className='hero-description'>
              Instant AI power for all your systems. <br />
              Deep insights & unified decision intelligence. All done in weeks.
            </p>
          </div>

          {/* CTA Button */}
          <div
            ref={ctaRef}
            className='mb-16'
          >
            <a href='/how-it-works'>
              <Button
                size='lg'
                className='rounded-full border-0 bg-lime-400 px-6 py-3 text-black shadow-lg transition-all duration-300 hover:bg-lime-300 hover:shadow-xl sm:px-8 sm:py-4'
              >
                <span className='flex items-center gap-2 sm:gap-3'>
                  <span className='hero-cta-text'>Book a Demo</span>
                  <i className='fas fa-arrow-right-long hero-cta-icon' />
                </span>
              </Button>
            </a>
          </div>
        </div>
      </AppLayoutPadding>

      {/* Scroll indicator */}
      {/* <div className='absolute bottom-8 left-1/2 -translate-x-1/2 transform'>
        <div className='flex h-10 w-6 justify-center rounded-full border-2 border-white/30'>
          <div className='mt-2 h-3 w-1 animate-bounce rounded-full bg-white/60' />
        </div>
      </div> */}
    </div>
  )
}

export default HeroSection
