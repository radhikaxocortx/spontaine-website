import gsap from 'gsap'
import { ChartNoAxesCombined, Link2, Zap } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

/**
 * VideoFeatureCarousel Component
 *
 * A smooth, animated carousel displaying feature cards with videos.
 * Matches sanas.ai carousel behavior with:
 * - GSAP-powered smooth sliding transitions
 * - Touch/mouse swipe gestures
 * - Autoplay with pause on interaction
 * - Lazy video loading with IntersectionObserver
 * - Responsive: 2 cards on large screens, 1 on mobile (with peek)
 * - Navigation arrows and dot indicators
 */

interface FeatureCard {
  id: number
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  videoUrl: string
}

// Feature cards data
const features: FeatureCard[] = [
  {
    id: 1,
    icon: ChartNoAxesCombined,
    title: 'Business Intelligence',
    description:
      'Empower every team member to instantly create and visualize trends, track KPIs, and drill deep into performance in natural language.',
    videoUrl: '/imge/home/card-video1.mp4', // Replace with your video URLs
  },
  {
    id: 2,
    icon: Link2,
    title: 'Data Integration',
    description:
      'Automatically ingest, clean, and unify data from your ERP, CRM, and Finance systems into a single, governed source of truth.',
    videoUrl: '/imge/home/card-video2.mp4',
  },
  {
    id: 3,
    icon: Zap,
    title: 'Intelligent Workflows',
    description:
      'Deploy AI agents that understand your business rules to automate approvals, forecasts, and complex operational decisions safely.',
    videoUrl: '/imge/home/card-video3.mp4',
  },
]

export default function VideoFeatureCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(2)
  const [isDragging, setIsDragging] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragStartXRef = useRef(0)
  const dragCurrentXRef = useRef(0)
  const dragStartTimeRef = useRef(0)
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map())

  const maxIndex = features.length - cardsPerView

  // Calculate responsive cards per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setCardsPerView(width >= 1024 ? 2 : 1)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Slide to specific index with GSAP
  const slideTo = (index: number, immediate = false) => {
    if (!trackRef.current) return

    const clampedIndex = Math.max(0, Math.min(index, maxIndex))
    setCurrentIndex(clampedIndex)

    const cardWidth = trackRef.current.offsetWidth / features.length
    const offset = -clampedIndex * cardWidth * cardsPerView

    if (immediate) {
      gsap.set(trackRef.current, { x: offset })
    } else {
      gsap.to(trackRef.current, {
        x: offset,
        duration: 0.6,
        ease: 'power2.out',
      })
    }
  }

  // Navigation handlers
  const goToNext = () => {
    if (currentIndex < maxIndex) {
      slideTo(currentIndex + 1)
    }
  }

  const goToPrev = () => {
    if (currentIndex > 0) {
      slideTo(currentIndex - 1)
    }
  }

  const goToSlide = (index: number) => {
    slideTo(index)
  }

  // Swipe gesture handlers for both touch and mouse
  const handlePointerDown = (e: React.PointerEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX

    setIsDragging(true)
    dragStartXRef.current = clientX
    dragCurrentXRef.current = clientX
    dragStartTimeRef.current = Date.now()

    if (trackRef.current && !('touches' in e)) {
      trackRef.current.style.cursor = 'grabbing'
    }
  }

  const handlePointerMove = (e: React.PointerEvent | React.TouchEvent) => {
    if (!isDragging || !trackRef.current) return

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const diff = clientX - dragCurrentXRef.current
    const absDiff = Math.abs(clientX - dragStartXRef.current)

    // Only prevent default if moving horizontally (for swipe)
    if (absDiff > 10) {
      e.preventDefault()
    }

    dragCurrentXRef.current = clientX
    const currentX = gsap.getProperty(trackRef.current, 'x') as number
    gsap.set(trackRef.current, { x: currentX + diff })
  }

  const handlePointerUp = (e: React.PointerEvent | React.TouchEvent) => {
    if (!isDragging || !trackRef.current) return

    setIsDragging(false)
    if (!('touches' in e)) {
      trackRef.current.style.cursor = 'grab'
    }

    const totalDiff = dragCurrentXRef.current - dragStartXRef.current
    const duration = Date.now() - dragStartTimeRef.current
    const velocity = Math.abs(totalDiff) / duration

    // Lower threshold for faster swipes
    const threshold = velocity > 0.5 ? 30 : 50

    if (Math.abs(totalDiff) > threshold) {
      if (totalDiff > 0 && currentIndex > 0) {
        slideTo(currentIndex - 1)
      } else if (totalDiff < 0 && currentIndex < maxIndex) {
        slideTo(currentIndex + 1)
      } else {
        slideTo(currentIndex) // Snap back
      }
    } else {
      slideTo(currentIndex) // Snap back
    }
  }

  // Lazy video loading with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoId = parseInt(entry.target.getAttribute('data-video-id') || '0')
          const video = videoRefs.current.get(videoId)

          if (video) {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              // Card is in view, play video
              video.play().catch(() => {
                // Handle autoplay restrictions
              })
            } else {
              // Card out of view, pause video
              video.pause()
            }
          }
        })
      },
      {
        threshold: [0, 0.5, 1],
        root: containerRef.current,
      }
    )

    // Observe all cards
    const cards = containerRef.current?.querySelectorAll('[data-video-id]')
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  // Generate dot indicators
  const dotCount = maxIndex + 1
  const dots = Array.from({ length: dotCount }, (_, i) => i)

  return (
    <section className='relative w-full overflow-hidden bg-white py-16 sm:py-24 lg:py-32'>
      <div className='mx-auto w-full'>
        {/* Section Label */}
        <div className='mb-16 flex justify-center'>
          <div className='rounded-md bg-black/5 px-6 py-2.5'>
            <p className='font-roboto-mono text-sm tracking-tight text-spontaine-gray'>Features</p>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={containerRef}
          className='relative overflow-visible px-4 sm:px-8 lg:px-20'
        >
          {/* Cards Track */}
          <div
            ref={trackRef}
            className='flex gap-6 lg:gap-6'
            style={{ cursor: 'grab', touchAction: 'pan-y pinch-zoom' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
          >
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                cardsPerView={cardsPerView}
                videoRefs={videoRefs}
              />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className='mt-10 flex items-center justify-center gap-3 sm:mt-14'>
            {/* Previous Button */}
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f7f7] text-spontaine-gray transition-all hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30'
              aria-label='Previous slide'
            >
              <svg
                className='h-4 w-4'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.5'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>

            {/* Dot Indicators */}
            <div className='flex items-center gap-2'>
              {dots.map((index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2.5 rounded-md transition-all duration-300 ${
                    currentIndex === index
                      ? 'w-2.5 bg-spontaine-accent-soft'
                      : 'w-2.5 bg-spontaine-gray hover:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              disabled={currentIndex === maxIndex}
              className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f7f7] text-spontaine-gray transition-all hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30'
              aria-label='Next slide'
            >
              <svg
                className='h-4 w-4'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.5'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * FeatureCard Component
 *
 * Individual card with icon, title, description, and video
 */
interface FeatureCardProps {
  feature: FeatureCard
  cardsPerView: number
  videoRefs: React.MutableRefObject<Map<number, HTMLVideoElement>>
}

function FeatureCard({ feature, cardsPerView, videoRefs }: FeatureCardProps) {
  // Calculate card width based on cards per view (with gap consideration)
  const cardWidthClass = cardsPerView === 2 ? 'lg:w-[calc(50%-16px)]' : 'w-full'
  const minWidthClass =
    cardsPerView === 1 ? 'min-w-[90vw] sm:min-w-[75vw]' : 'min-w-[90vw] lg:min-w-[calc(50%-16px)]'

  const IconComponent = feature.icon

  return (
    <div
      data-video-id={feature.id}
      className={`flex-shrink-0 ${minWidthClass} ${cardWidthClass}`}
    >
      <div className='flex h-full min-h-[700px] flex-col overflow-hidden rounded-[40px] bg-spontaine-dark-bg p-10 sm:p-12 lg:min-h-[800px] lg:p-14'>
        {/* Icon */}
        <div className='mb-10 flex justify-center'>
          <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-spontaine-icon-bg'>
            <IconComponent className='h-8 w-8 text-spontaine-icon-text' />
          </div>
        </div>

        {/* Title */}
        <h3 className='mb-8 text-center font-heading text-4xl font-medium leading-tight text-white lg:text-[40px]'>
          {feature.title}
        </h3>

        {/* Description */}
        <p className='mb-10 text-center font-body text-xl font-light leading-relaxed text-white lg:text-2xl lg:leading-[30px]'>
          {feature.description}
        </p>

        {/* Video */}
        <div className='overflow-hidden rounded-2xl'>
          <video
            ref={(el) => {
              if (el) videoRefs.current.set(feature.id, el)
            }}
            className='h-auto w-full object-cover'
            loop
            muted
            playsInline
            preload='metadata'
          >
            <source
              src={feature.videoUrl}
              type='video/mp4'
            />
          </video>
        </div>
      </div>
    </div>
  )
}
