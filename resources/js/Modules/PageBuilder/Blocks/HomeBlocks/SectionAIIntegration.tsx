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
  const fillAnimationRefs = useRef<(HTMLDivElement | null)[]>([])
  const lastFeatureRef = useRef(0)
  const [videoProgress, setVideoProgress] = useState<{ [key: number]: number }>({})
  const currentListenersRef = useRef<{
    timeupdate?: () => void
    ended?: () => void
  }>({})

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the entire section when it comes into view
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${FEATURES.length * window.innerHeight}`,
        scrub: true,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress

          // Calculate which feature should be active with evenly distributed thresholds
          let featureIndex = 0
          if (progress >= 0.67) {
            featureIndex = 2
          } else if (progress >= 0.33) {
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

          // Update feature paragraphs opacity only
          featureRefs.current.forEach((ref, index) => {
            if (ref) {
              gsap.to(ref, {
                opacity: index === featureIndex ? 1 : 0.3,
                duration: 0.5,
                ease: 'power3.out',
              })
            }
          })

          // Reset fill animations for non-active features
          fillAnimationRefs.current.forEach((fillRef, index) => {
            if (fillRef && index !== featureIndex) {
              gsap.set(fillRef, {
                background: 'linear-gradient(to right, #a3e63530 0%, transparent 0%)',
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
          })
        }
      })

      // Initial fill animation setup
      fillAnimationRefs.current.forEach((fillRef, index) => {
        if (fillRef) {
          gsap.set(fillRef, {
            background: 'linear-gradient(to right, #a3e63530 0%, transparent 0%)',
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
  }, [])

  // Handle video transitions and sync fill animation
  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current
    const newSrc = FEATURES[activeFeature].videoSrc

    // Only change video if source is different
    if (video.src.includes(newSrc.split('/').pop() || '')) {
      return
    }

    console.log('Changing video to:', newSrc)

    // Reset fill animation for current feature
    const currentFillRef = fillAnimationRefs.current[activeFeature]
    if (currentFillRef) {
      gsap.set(currentFillRef, {
        background: 'linear-gradient(to right, #a3e63530 0%, transparent 0%)',
      })
    }

    // Quick transition without blocking
    gsap.to(video, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out',
      onComplete: () => {
        video.src = newSrc
        video.load()

        const handleCanPlay = () => {
          video.play().catch(console.log)
          gsap.to(video, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
          })
        }

        const handleTimeUpdate = () => {
          if (!video.duration) return

          const progress = video.currentTime / video.duration
          const fillPercentage = Math.min(progress * 100, 100)

          if (currentFillRef) {
            gsap.set(currentFillRef, {
              background: `linear-gradient(to right, #a3e63530 ${fillPercentage}%, transparent ${fillPercentage}%)`,
            })
          }

          setVideoProgress((prev) => ({
            ...prev,
            [activeFeature]: progress,
          }))
        }

        const handleVideoEnded = () => {
          if (currentFillRef) {
            gsap.set(currentFillRef, {
              background: '#a3e63530',
            })
          }
        }

        // Remove existing event listeners
        if (currentListenersRef.current.timeupdate) {
          video.removeEventListener('timeupdate', currentListenersRef.current.timeupdate)
        }
        if (currentListenersRef.current.ended) {
          video.removeEventListener('ended', currentListenersRef.current.ended)
        }

        // Store references to current listeners
        currentListenersRef.current.timeupdate = handleTimeUpdate
        currentListenersRef.current.ended = handleVideoEnded

        // Add new event listeners
        video.addEventListener('canplay', handleCanPlay, { once: true })
        video.addEventListener('timeupdate', handleTimeUpdate)
        video.addEventListener('ended', handleVideoEnded, { once: true })

        // Fallback in case video fails
        setTimeout(() => {
          gsap.to(video, { opacity: 1, duration: 0.3 })
        }, 500)
      },
    })
  }, [activeFeature])

  // Initialize first video with fill animation
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current
      const firstFillRef = fillAnimationRefs.current[0]

      video.src = FEATURES[0].videoSrc
      video.load()

      const handleLoadedData = () => {
        video.play().catch(() => {
          console.log('Video autoplay prevented')
        })
      }

      const handleTimeUpdate = () => {
        if (!video.duration) return

        const progress = video.currentTime / video.duration
        const fillPercentage = Math.min(progress * 100, 100)

        if (firstFillRef) {
          gsap.set(firstFillRef, {
            background: `linear-gradient(to right, #a3e63530 ${fillPercentage}%, transparent ${fillPercentage}%)`,
          })
        }

        setVideoProgress((prev) => ({
          ...prev,
          [0]: progress,
        }))
      }

      const handleVideoEnded = () => {
        if (firstFillRef) {
          gsap.set(firstFillRef, {
            background: '#a3e63530',
          })
        }
      }

      const handleError = () => {
        console.log('Initial video failed to load:', FEATURES[0].videoSrc)
      }

      // Store initial listeners
      currentListenersRef.current.timeupdate = handleTimeUpdate
      currentListenersRef.current.ended = handleVideoEnded

      video.addEventListener('loadeddata', handleLoadedData, { once: true })
      video.addEventListener('timeupdate', handleTimeUpdate)
      video.addEventListener('ended', handleVideoEnded, { once: true })
      video.addEventListener('error', handleError, { once: true })

      // Cleanup function
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData)
        video.removeEventListener('timeupdate', handleTimeUpdate)
        video.removeEventListener('ended', handleVideoEnded)
        video.removeEventListener('error', handleError)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={cn('bg-white', className)}
    >
      <AppLayoutPadding>
        {/* Section Header */}
        <div className='py-2 text-center'>
          <h2 className="mb-6 font-['Urbanist'] text-5xl font-normal leading-tight text-black">
            Effortless AI integration
            <br />- On your terms.
          </h2>
          <p className="mx-auto max-w-4xl font-['Space_Grotesk'] text-base font-light leading-relaxed text-black">
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
          className='py-8'
        >
          <div className='grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-4'>
            {/* Left Column - Feature List with Individual Progress Lines */}
            <div className='flex h-full flex-col justify-center space-y-2'>
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
                    className='relative max-w-lg rounded-lg px-4 py-2'
                  >
                    {/* Fill Animation Background */}
                    <div
                      ref={(el) => (fillAnimationRefs.current[index] = el)}
                      className='absolute inset-0 rounded-lg'
                      style={{
                        background: 'transparent',
                        zIndex: -1,
                      }}
                    />
                    <h3 className="mb-1 font-['Urbanist'] font-bold leading-normal text-black">
                      {feature.title}
                    </h3>
                    <p className="font-['Space_Grotesk'] text-sm font-normal leading-relaxed text-black">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Video Player */}
            <div className='flex h-full items-center justify-center rounded-lg'>
              <div className='w-full max-w-2xl rounded-lg'>
                <video
                  ref={videoRef}
                  className='h-auto w-full rounded-lg'
                  autoPlay
                  muted
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

        {/* Bottom Spacer - Reduced gap to Trusted Partners section */}
        <div className='h-16' />
      </AppLayoutPadding>
    </section>
  )
}

export default SectionAIIntegration
