import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { cn } from '@/lib/utils'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

interface FeatureData {
  id: number
  title: string
  description: string
  videoSrc: string
}

interface SectionAIIntegrationProps {
  className?: string
}

// Static feature data with video sources
const FEATURES: FeatureData[] = [
  {
    id: 1,
    title: 'Automated Data Sourcing',
    description:
      'Extract from almost any data source: databases, APIs, and more. On a scheduled, hands-free basis.',
    videoSrc: '/imge/videos/1.mp4',
  },
  {
    id: 2,
    title: 'No-Code Single Source of Truth',
    description:
      'Create a centralized data semantic layer accessible to business users, eliminating data silos. Without writing any code at all.',
    videoSrc: '/imge/videos/2.mp4',
  },
  {
    id: 3,
    title: 'A perfect on-ramp to AI driven transformation.',
    description:
      'Track KPIs, trigger autonomous actions, derive deep insights using natural language.',
    videoSrc: '/imge/videos/3.mp4',
  },
]

const SectionAIIntegration = ({ className }: SectionAIIntegrationProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [activeFeature, setActiveFeature] = useState(0)
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])
  const progressLineRefs = useRef<(HTMLDivElement | null)[]>([])
  const lastFeatureRef = useRef(0)
  const isTransitioningRef = useRef(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the sticky section when it comes into view
      ScrollTrigger.create({
        trigger: stickyRef.current,
        start: 'top top',
        end: `+=${FEATURES.length * window.innerHeight}`,
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const progress = self.progress

          // Calculate which feature should be active based on visual paragraph positions
          let featureIndex = 0
          if (progress >= 0.6) {
            featureIndex = 2
          } else if (progress >= 0.2) {
            featureIndex = 1
          }

          if (featureIndex !== lastFeatureRef.current) {
            lastFeatureRef.current = featureIndex
            setActiveFeature(featureIndex)
            console.log(`Progress: ${progress.toFixed(3)}, Feature: ${featureIndex}`)
          }

          // Update progress lines
          progressLineRefs.current.forEach((lineRef, index) => {
            if (lineRef) {
              gsap.to(lineRef, {
                backgroundColor: index === featureIndex ? '#a3e635' : '#e5e7eb',
                duration: 0.3,
                ease: 'power3.out',
              })
            }
          })

          // Update feature paragraphs
          featureRefs.current.forEach((ref, index) => {
            if (ref) {
              gsap.to(ref, {
                opacity: index === featureIndex ? 1 : 0.3,
                backgroundColor: index === featureIndex ? 'rgba(163, 230, 53, 0.1)' : 'transparent',
                duration: 0.5,
                ease: 'power3.out',
              })
            }
          })
        },
      })

      // Initial setup - hide all paragraphs except first
      featureRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.set(ref, {
            opacity: index === 0 ? 1 : 0.3,
            backgroundColor: index === 0 ? 'e5e7eb' : 'transparent',
          })
        }
      })

      // Initial progress lines setup - all gray except first
      progressLineRefs.current.forEach((lineRef, index) => {
        if (lineRef) {
          gsap.set(lineRef, {
            backgroundColor: index === 0 ? '#a3e635' : '#e5e7eb',
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [activeFeature])

  // Handle video transitions
  useEffect(() => {
    if (!videoRef.current || isTransitioningRef.current) return
    isTransitioningRef.current = true

    const video = videoRef.current

    // Fade out
    gsap.to(video, {
      opacity: 0,
      duration: 0.3,
      ease: 'power3.out',
      onComplete: () => {
        video.src = FEATURES[activeFeature].videoSrc
        video.load()

        const handleLoaded = () => {
          video.play().catch(console.log)
          gsap.to(video, {
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            onComplete: () => {
              isTransitioningRef.current = false // Allow next update
            },
          })
        }

        const handleError = () => {
          console.log('Video failed:', FEATURES[activeFeature].videoSrc)
          gsap.to(video, {
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            onComplete: () => {
              isTransitioningRef.current = false
            },
          })
        }

        video.addEventListener('loadeddata', handleLoaded, { once: true })
        video.addEventListener('error', handleError, { once: true })
      },
    })
  }, [activeFeature])

  // Initialize first video
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current
      video.src = FEATURES[0].videoSrc
      video.load()
      video.addEventListener(
        'loadeddata',
        () => {
          video.play().catch(() => {
            console.log('Video autoplay prevented')
          })
        },
        { once: true }
      )

      video.addEventListener(
        'error',
        () => {
          console.log('Initial video failed to load:', FEATURES[0].videoSrc)
        },
        { once: true }
      )
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={cn('bg-white', className)}
    >
      <AppLayoutPadding>
        {/* Section Header */}
        <div className='py-8 text-center'>
          <h2 className="mb-6 font-['Urbanist'] text-5xl font-normal leading-tight text-black">
            Effortless AI integration
            <br />- On your terms.
          </h2>
          <p className="mx-auto max-w-4xl font-['Space_Grotesk'] text-lg font-light leading-relaxed text-black">
            Spontaine transforms all your systems - and databases into a powerful AI-driven command
            center.
            <br />
            Free to mix, match, and scale. You can gain deep, real-time, strategic insights without
            replacing the systems you already trust.
          </p>
        </div>

        {/* Sticky Content Section */}
        <div
          ref={stickyRef}
          className='min-h-[300vh]'
        >
          <div className='grid min-h-[100vh] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8'>
            {/* Left Column - Feature List with Individual Progress Lines */}
            <div className='flex h-full flex-col justify-center space-y-4'>
              {FEATURES.map((feature, index) => (
                <div
                  key={feature.id}
                  className='flex items-center gap-6'
                >
                  {/* Individual Progress Line Segment */}
                  <div className='flex flex-shrink-0 items-center'>
                    <div
                      ref={(el) => (progressLineRefs.current[index] = el)}
                      className='h-20 w-1 rounded-full bg-gray-200 transition-all duration-300'
                    />
                  </div>

                  {/* Feature Content */}
                  <div
                    ref={(el) => (featureRefs.current[index] = el)}
                    className='max-w-lg rounded-lg px-4 py-3'
                  >
                    <h3 className="mb-4 font-['Urbanist'] text-lg font-bold leading-normal text-zinc-900">
                      {feature.title}
                    </h3>
                    <p className="font-['Space_Grotesk'] text-base font-normal leading-relaxed text-zinc-900">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Video Player */}
            <div className='flex h-full items-center justify-center'>
              <div className='w-full max-w-2xl'>
                <video
                  ref={videoRef}
                  className='h-auto w-full rounded-lg drop-shadow-xl'
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ aspectRatio: '16/9' }}
                >
                  <source
                    src={FEATURES[activeFeature].videoSrc}
                    type='video/mp4'
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Spacer - Reduced since pinSpacing handles this */}
        <div className='h-32' />
      </AppLayoutPadding>
    </section>
  )
}

export default SectionAIIntegration
