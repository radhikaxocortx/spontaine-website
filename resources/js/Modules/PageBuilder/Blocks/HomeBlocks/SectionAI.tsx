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
  const currentVideoPlaying = useRef<boolean>(false)
  const hasEnteredViewport = useRef<boolean>(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Viewport detection ScrollTrigger
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          console.log('🎬 Section entering viewport')
          if (!hasEnteredViewport.current) {
            hasEnteredViewport.current = true
            // Play initial video when first entering viewport
            if (videoRef.current && !playedVideos.current.has(0)) {
              console.log('🎬 Playing initial video on viewport enter')
              videoRef.current.play().catch(() => {
                console.log('Initial video autoplay prevented')
              })
              playedVideos.current.add(0)
            }
          }
        },
        onLeave: () => {
          console.log('🎬 Section leaving viewport (down)')
        },
        onEnterBack: () => {
          console.log('🎬 Section re-entering viewport (up)')
          console.log('🎬 Clearing played videos for replay')
          playedVideos.current.clear()
          // Force replay current video
          if (videoRef.current) {
            console.log('🎬 Force replaying current video')
            videoRef.current.currentTime = 0
            videoRef.current.play().catch(() => {
              console.log('Video autoplay prevented on re-enter')
            })
            playedVideos.current.add(activeFeature)
          }
        },
        onLeaveBack: () => {
          console.log('🎬 Section leaving viewport (up)')
        },
      })

      // Pin the section during scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${FEATURES.length * window.innerHeight}`,
        scrub: true,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress

          // Calculate which feature should be active
          let featureIndex = 0
          if (progress >= 0.67) {
            featureIndex = 2
          } else if (progress >= 0.33) {
            featureIndex = 1
          }

          if (featureIndex !== activeFeature) {
            setActiveFeature(featureIndex)
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

          // Update feature opacity
          featureRefs.current.forEach((ref, index) => {
            if (ref) {
              gsap.to(ref, {
                opacity: index === featureIndex ? 1 : 0.4,
                duration: 0.5,
                ease: 'power3.out',
              })
            }
          })
        },
      })

      // Initial setup
      featureRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.set(ref, {
            opacity: index === 0 ? 1 : 0.4,
          })
        }
      })

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

  // Handle video changes
  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current
    const newSrc = FEATURES[activeFeature].videoSrc

    // Only change if different video
    if (video.src.includes(newSrc.split('/').pop() || '')) {
      return
    }

    // Smooth video transition
    gsap.to(video, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out',
      onComplete: () => {
        video.src = newSrc
        video.load()

        const handleCanPlay = () => {
          console.log(
            `🎬 Video ${activeFeature} can play. Has been played:`,
            playedVideos.current.has(activeFeature)
          )
          // Only play if this video hasn't been played before
          if (!playedVideos.current.has(activeFeature)) {
            console.log(`🎬 Playing video ${activeFeature}`)
            currentVideoPlaying.current = true
            video.play().catch(() => {
              console.log('Video autoplay prevented')
              currentVideoPlaying.current = false
            })
            playedVideos.current.add(activeFeature)
          }
          gsap.to(video, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
          })
        }

        video.addEventListener('canplay', handleCanPlay, { once: true })

        // Fallback
        setTimeout(() => {
          gsap.to(video, { opacity: 1, duration: 0.3 })
        }, 500)
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
      className={cn('bg-white', className)}
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
          <div className='grid grid-cols-1 items-start gap-12 lg:grid-cols-2'>
            {/* Left Column - Features */}
            <div className='space-y-4'>
              {FEATURES.map((feature, index) => (
                <div
                  key={feature.id}
                  className='flex gap-2'
                >
                  {/* Progress Line */}
                  <div className='flex flex-shrink-0 items-start pt-2'>
                    <div
                      ref={(el) => (progressLineRefs.current[index] = el)}
                      className='h-16 w-1 rounded-full bg-gray-200'
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
                      className='mb-1'
                    >
                      {feature.title}
                    </SectionSubtitle>
                    <SectionBody
                      theme='gray'
                      size='sm'
                      lineHeight='relaxed'
                      centered={false}
                    >
                      {feature.description}
                    </SectionBody>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Video & Logos */}
            <div className='hidden lg:block'>
              {/* Video Player */}
              <div className=''>
                <video
                  ref={videoRef}
                  className='h-auto w-full rounded-lg'
                  autoPlay
                  muted
                  playsInline
                  onEnded={() => {
                    currentVideoPlaying.current = false
                  }}
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
        </AppLayoutPadding>
      </AppSectionPadding>
    </section>
  )
}

export default SectionAI
