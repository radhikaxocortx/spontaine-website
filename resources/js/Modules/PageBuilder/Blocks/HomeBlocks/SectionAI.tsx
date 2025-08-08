import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import AppSectionPadding from '@/Layouts/AppSectionPadding'
import { cn } from '@/lib/utils'
import SectionBody from '@/typography/SectionBody'
import SectionDescription from '@/typography/SectionDescription'
import SectionSubtitle from '@/typography/SectionSubtitle'
import SectionTitle from '@/typography/SectionTitle'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface FeatureData {
  id: number
  title: string
  description: string
  videoSrc: string
}

interface SectionAIProps {
  className?: string
}

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
    title: 'A Perfect On-Ramp To AI Driven Transformation.',
    description:
      'Track KPIs, trigger autonomous actions, derive deep insights using natural language.',
    videoSrc: '/imge/videos/3.mp4',
  },
]

const SectionAI = ({ className }: SectionAIProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [activeFeature, setActiveFeature] = useState(0)
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])
  const progressLineRefs = useRef<(HTMLDivElement | null)[]>([])
  const playedVideos = useRef<Set<number>>(new Set())
  const hasEnteredViewport = useRef<boolean>(false)

  // Handle hover interactions
  const handleFeatureHover = (index: number) => {
    if (index !== activeFeature) {
      setActiveFeature(index)
    }
  }

  // Handle hover effects with 3D transforms
  const handleFeatureMouseEnter = (index: number) => {
    const featureElement = featureRefs.current[index]
    if (featureElement) {
      gsap.to(featureElement, {
        scale: 1.005,
        rotateX: 1,
        rotateY: 1,
        z: 10,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const handleFeatureMouseLeave = (index: number) => {
    const featureElement = featureRefs.current[index]
    if (featureElement) {
      gsap.to(featureElement, {
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        z: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple viewport detection for initial video play
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          if (!hasEnteredViewport.current) {
            hasEnteredViewport.current = true
            // Play initial video when first entering viewport
            if (videoRef.current && !playedVideos.current.has(0)) {
              videoRef.current.play().catch(() => {
                console.log('Initial video autoplay prevented')
              })
              playedVideos.current.add(0)
            }
          }
        },
      })

      // Set up 3D perspective for feature containers
      featureRefs.current.forEach((ref) => {
        if (ref) {
          gsap.set(ref, {
            transformPerspective: 1000,
            transformStyle: 'preserve-3d',
          })
        }
      })

      // Initial setup for progress lines and feature states
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

  // Handle active feature changes
  useEffect(() => {
    // Update progress lines with smooth transitions
    progressLineRefs.current.forEach((lineRef, index) => {
      if (lineRef) {
        gsap.to(lineRef, {
          backgroundColor: index === activeFeature ? '#a3e635' : '#e5e7eb',
          duration: 0.4,
          ease: 'power2.inOut',
        })
      }
    })
  }, [activeFeature])

  // Handle video changes
  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current
    const newSrc = FEATURES[activeFeature].videoSrc

    // Only change if different video
    if (video.src.includes(newSrc.split('/').pop() || '')) {
      // Same video, but play if not played yet
      if (!playedVideos.current.has(activeFeature)) {
        video.currentTime = 0
        video.play().catch(() => {
          console.log('Video autoplay prevented')
        })
        playedVideos.current.add(activeFeature)
      }
      return
    }

    // Smooth video transition
    gsap.to(video, {
      opacity: 0,
      duration: 0.15,
      ease: 'power2.inOut',
      onComplete: () => {
        video.src = newSrc
        video.load()

        const handleCanPlay = () => {
          // Always play video on hover (once per hover)
          video.currentTime = 0
          video.play().catch(() => {
            console.log('Video autoplay prevented')
          })
          playedVideos.current.add(activeFeature)

          gsap.to(video, {
            opacity: 1,
            duration: 0.15,
            ease: 'power2.inOut',
          })
        }

        video.addEventListener('canplay', handleCanPlay, { once: true })

        // Fallback
        setTimeout(() => {
          gsap.to(video, { opacity: 1, duration: 0.15 })
        }, 300)
      },
    })
  }, [activeFeature])

  // Initialize first video (load but don't play)
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current
      video.src = FEATURES[0].videoSrc
      video.load()
      console.log('🎬 Initial video loaded and ready')
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={cn('bg-white bg-cover bg-center bg-no-repeat', className)}
      style={{ backgroundImage: 'url(/imge/home/grid-bg.png)' }}
    >
      <AppSectionPadding>
        <AppLayoutPadding>
          {/* Header */}
          <div className='mb-12 text-center'>
            <div className='mb-6'>
              <SectionTitle theme='light'>
                Effortless AI integration
                <br />- On your terms.
              </SectionTitle>
            </div>
            <SectionDescription
              theme='light'
              size='medium'
              maxWidth='3xl'
            >
              Spontaine transforms all your systems - and databases into a powerful AI-driven
              command center. Free to mix, match, and scale. You can gain deep, real-time, strategic
              insights without replacing the systems you already trust.
            </SectionDescription>
          </div>

          {/* Content Grid */}
          <div className='grid grid-cols-1 items-start gap-8 md:gap-12 lg:grid-cols-2'>
            {/* Left Column - Features */}
            <div className='space-y-2 lg:space-y-2'>
              {FEATURES.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`group cursor-pointer rounded-xl p-4 transition-all duration-300 md:p-6 ${
                    index === activeFeature ? 'bg-gray-100' : 'hover:bg-white/5'
                  }`}
                  onMouseEnter={() => {
                    handleFeatureHover(index)
                    handleFeatureMouseEnter(index)
                  }}
                  onMouseLeave={() => handleFeatureMouseLeave(index)}
                >
                  <div className='flex gap-3 md:gap-4'>
                    {/* Progress Line */}
                    <div className='flex flex-shrink-0 items-start pt-2'>
                      <div
                        ref={(el) => (progressLineRefs.current[index] = el)}
                        className='h-12 w-1 rounded-full bg-gray-200 transition-all duration-300 md:h-16'
                      />
                    </div>

                    {/* Feature Content */}
                    <div
                      ref={(el) => (featureRefs.current[index] = el)}
                      className='flex-1 space-y-2'
                    >
                      <SectionSubtitle
                        theme='light'
                        size='small'
                        weight='bold'
                        centered={false}
                        className={`mb-1 transition-colors duration-300 ${
                          index === activeFeature ? 'text-[#378727]' : 'group-hover:text-[#378727]'
                        }`}
                      >
                        {feature.title}
                      </SectionSubtitle>
                      <SectionBody
                        theme='light'
                        size='sm'
                        lineHeight='relaxed'
                        centered={false}
                        className={`transition-all duration-300 ${
                          index === activeFeature ? '' : 'opacity-70 group-hover:opacity-90'
                        }`}
                      >
                        {feature.description}
                      </SectionBody>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Video Player */}
            <div className='mt-6 hidden lg:mt-0 lg:block'>
              {/* Video Player */}
              <div className='relative overflow-hidden rounded-2xl border border-lime-400'>
                <video
                  ref={videoRef}
                  className='h-auto w-full transition-all duration-300'
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

                {/* Video overlay for loading state */}
                <div className='absolute inset-0 flex items-center justify-center bg-gray-900/20 opacity-0 transition-opacity duration-300'>
                  <div className='h-8 w-8 animate-spin rounded-full border-2 border-lime-400 border-t-transparent'></div>
                </div>
              </div>

              {/* Feature indicator dots */}
              <div className='mt-4 flex justify-center gap-2 md:mt-6'>
                {FEATURES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      index === activeFeature ? 'w-8 bg-lime-400' : 'bg-gray-400 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </AppLayoutPadding>
      </AppSectionPadding>
    </section>
  )
}

export default SectionAI
