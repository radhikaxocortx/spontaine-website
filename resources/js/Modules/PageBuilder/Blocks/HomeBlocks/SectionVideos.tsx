import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import AppSectionPadding from '@/Layouts/AppSectionPadding'
import { cn } from '@/lib/utils'
import { Page } from '@/Modules/PageBuilder/page_interfaces'
import SectionDescription from '@/typography/SectionDescription'
import SectionTitle from '@/typography/SectionTitle'
import { router } from '@inertiajs/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

interface SectionVideosProps {
  className?: string
  featuredPosts?: Page[]
}

// Default fallback video data when no featured posts are available
const FALLBACK_VIDEOS: Page[] = [
  {
    id: 1,
    title: 'Enabling prioritized decisions that keep lights shining',
    description: 'Energy sector optimization through intelligent data management',
    preview_image: '/imge/home/poster1-1.png',
    preview_video: 'https://cdn.pixabay.com/video/2024/03/25/205625-927347898_large.mp4',
    type: 'Blog',
    author: 'Spontaine Team',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    page_title: 'Energy Decision Intelligence',
    url: '/energy-decision-intelligence',
    published: true,
    featured: true,
    blocks: { lastUUID: 0, blocks: [] },
  },
  {
    id: 2,
    title: 'Swarms of Automated Weather Stations to critical early warning systems',
    description: 'Agricultural technology transforming farming intelligence',
    preview_image: '/imge/home/poster2.png',
    preview_video: 'https://cdn.pixabay.com/video/2023/01/30/148596-794221551_large.mp4',
    type: 'Blog',
    author: 'Spontaine Team',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    page_title: 'Agricultural Intelligence',
    url: '/agricultural-intelligence',
    published: true,
    featured: true,
    blocks: { lastUUID: 0, blocks: [] },
  },
  {
    id: 3,
    title:
      'Replacing brittle compliance reporting with bulletproof semantic layers that scale with regulatory complexity',
    description: 'Financial compliance made simple with automated reporting',
    preview_image: '/imge/home/poster3.png',
    preview_video: 'https://cdn.pixabay.com/video/2025/07/23/293084_large.mp4',
    type: 'Blog',
    author: 'Spontaine Team',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    page_title: 'Financial Compliance Intelligence',
    url: '/financial-compliance-intelligence',
    published: true,
    featured: true,
    blocks: { lastUUID: 0, blocks: [] },
  },
  {
    id: 4,
    title: 'Transforming scattered government data into transparent public-facing insights',
    description: 'Government transparency through unified data systems',
    preview_image: '/imge/home/poster4.png',
    preview_video: 'https://cdn.pixabay.com/video/2018/07/02/17013-278400948_large.mp4',
    type: 'Blog',
    author: 'Spontaine Team',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    page_title: 'Government Data Intelligence',
    url: '/government-data-intelligence',
    published: true,
    featured: true,
    blocks: { lastUUID: 0, blocks: [] },
  },
] as Page[]

const SectionVideos = ({ className, featuredPosts = [] }: SectionVideosProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [firstVideoPlayed, setFirstVideoPlayed] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Filter for featured posts with videos, fallback to default videos (4 total)
  const allVideoPosts =
    featuredPosts.length > 0
      ? featuredPosts.filter((post) => post.featured && post.preview_video)
      : FALLBACK_VIDEOS

  // Use featured posts if available, otherwise fallback to default 4 videos
  const videoPosts = allVideoPosts.length > 0 ? allVideoPosts.slice(0, 4) : FALLBACK_VIDEOS

  // Responsive cards per screen: mobile=1, tablet=2, laptop=3, desktop=4
  const getCardsPerScreen = () => {
    if (typeof window === 'undefined') return 4
    const width = window.innerWidth
    if (width < 640) return 1
    if (width < 768) return 2
    if (width < 1024) return 3
    return 4
  }

  const [cardsPerScreen, setCardsPerScreen] = useState(getCardsPerScreen)
  // Calculate max slides to prevent empty spaces
  const maxSlides = videoPosts.length > cardsPerScreen ? videoPosts.length - cardsPerScreen : 0

  // Update cards per screen on resize
  useEffect(() => {
    const handleResize = () => {
      const newCardsPerScreen = getCardsPerScreen()
      setCardsPerScreen(newCardsPerScreen)
      // Reset slide if current position is invalid
      const newMaxSlides = Math.max(0, videoPosts.length - newCardsPerScreen)
      if (currentSlide > newMaxSlides) {
        setCurrentSlide(newMaxSlides)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentSlide, videoPosts.length])

  // Extract slug from URL and navigate to blogs page
  const extractSlugFromUrl = (url: string): string => {
    // Remove leading slash if present
    const cleanUrl = url.startsWith('/') ? url.substring(1) : url
    // Extract the last part as slug (e.g., from '/energy-decision-intelligence' get 'energy-decision-intelligence')
    return cleanUrl.split('/').pop() || cleanUrl
  }

  // Handle post click to navigate to blogs page
  const handlePostClick = (post: Page) => {
    const slug = extractSlugFromUrl(post.url)
    router.visit(`/blog/${slug}`)
  }

  // Carousel navigation
  const goToNextSlide = useCallback(() => {
    if (currentSlide < maxSlides) {
      setCurrentSlide((prev) => prev + 1)
    }
  }, [currentSlide, maxSlides])

  const goToPrevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1)
    }
  }, [currentSlide])

  // Auto-advance carousel (optional)
  useEffect(() => {
    if (videoPosts.length <= cardsPerScreen) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = prev + 1
        return next > maxSlides ? 0 : next
      })
    }, 8000) // Change slide every 8 seconds

    return () => clearInterval(interval)
  }, [maxSlides, videoPosts.length, cardsPerScreen])

  // GSAP animations for carousel
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state for video cards
      gsap.set('.video-card', {
        opacity: 0,
        y: 80,
      })

      // Animate video cards in
      gsap.to('.video-card', {
        opacity: 1,
        y: 0,
        duration: 1.6,
        stagger: 0.3,
        ease: 'power2.out',
        delay: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Smooth slide transitions with GSAP
  useEffect(() => {
    if (cardsRef.current) {
      // Calculate the translate percentage to show cards without empty spaces
      const cardWidth = 100 / videoPosts.length
      const translateX = currentSlide * cardWidth * cardsPerScreen

      gsap.to(cardsRef.current, {
        x: `-${translateX}%`,
        duration: 0.8,
        ease: 'power2.out',
      })
    }
  }, [currentSlide, cardsPerScreen, videoPosts.length])

  const handlePlayVideo = (videoId: number) => {
    const video = videoRefs.current[videoId]
    if (video) {
      if (playingVideo === videoId) {
        video.pause()
        setPlayingVideo(null)
      } else {
        // Pause all other videos
        videoRefs.current.forEach((v, index) => {
          if (v && index !== videoId) {
            v.pause()
          }
        })
        video.play()
        setPlayingVideo(videoId)
      }
    }
  }

  const handleVideoHover = (videoId: number, isHovering: boolean) => {
    const video = videoRefs.current[videoId]
    if (video) {
      if (isHovering) {
        // Pause all other videos first
        videoRefs.current.forEach((v, index) => {
          if (v && index !== videoId) {
            v.pause()
          }
        })
        video.play()
        setPlayingVideo(videoId)
      } else {
        video.pause()
        setPlayingVideo(null)
      }
    }
  }

  // Auto-play first video on mount
  useEffect(() => {
    if (!firstVideoPlayed && videoRefs.current[0]) {
      const firstVideo = videoRefs.current[0]
      setTimeout(() => {
        firstVideo
          .play()
          .then(() => {
            setPlayingVideo(0)
            setFirstVideoPlayed(true)
          })
          .catch(() => {
            console.log('First video autoplay prevented')
          })
      }, 1000) // Delay to ensure video is loaded
    }
  }, [firstVideoPlayed])

  return (
    <section
      ref={sectionRef}
      className={cn('relative z-20 overflow-visible bg-black pb-0 text-white', className)}
    >
      <AppSectionPadding>
        <AppLayoutPadding>
          {/* Header Section */}
          <div className='mb-12 space-y-4 text-center sm:mb-16'>
            <SectionTitle theme='dark'>Spontaine Is For Every Industry</SectionTitle>
            <SectionDescription
              theme='muted'
              size='large'
            >
              Every industry has unique challenges. Our customizable IT solutions are designed to
              <br className='hidden sm:block' />
              meet the specific needs of various sectors, ensuring you have the right tools and
              <br className='hidden sm:block' />
              support to drive success
            </SectionDescription>
          </div>

          {/* Video Cards Container - Carousel */}
          <div className='relative -mb-[10vh]'>
            {/* Navigation Buttons */}
            {videoPosts.length > cardsPerScreen && (
              <>
                <button
                  onClick={goToPrevSlide}
                  disabled={currentSlide === 0}
                  className={cn(
                    'absolute -left-6 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition-all duration-300',
                    currentSlide === 0
                      ? 'cursor-not-allowed bg-gray-700 text-gray-500'
                      : 'bg-white text-gray-800 hover:scale-110 hover:bg-lime-400 hover:text-white'
                  )}
                  aria-label='Previous videos'
                >
                  <ChevronLeft className='h-6 w-6' />
                </button>
                <button
                  onClick={goToNextSlide}
                  disabled={currentSlide >= maxSlides}
                  className={cn(
                    'absolute -right-6 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition-all duration-300',
                    currentSlide >= maxSlides
                      ? 'cursor-not-allowed bg-gray-700 text-gray-500'
                      : 'bg-white text-gray-800 hover:scale-110 hover:bg-lime-400 hover:text-white'
                  )}
                  aria-label='Next videos'
                >
                  <ChevronRight className='h-6 w-6' />
                </button>
              </>
            )}

            {/* Carousel Container */}
            <div className='overflow-hidden'>
              <div
                ref={cardsRef}
                className='flex transition-transform'
                style={{
                  width: `${(videoPosts.length / cardsPerScreen) * 100}%`,
                }}
              >
                {videoPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className='flex-shrink-0 px-2 sm:p-8 sm:px-8'
                    style={{
                      width: `${100 / videoPosts.length}%`,
                    }}
                  >
                    <div
                      className='video-card hover:shadow-3xl group relative cursor-pointer overflow-hidden rounded-xl bg-gray-900 shadow-2xl transition-all duration-300 hover:scale-105'
                      onMouseEnter={() => handleVideoHover(post.id, true)}
                      onMouseLeave={() => handleVideoHover(post.id, false)}
                      onClick={() => handlePostClick(post)}
                    >
                      {/* Vertical Green Accent Bar */}
                      <div className='absolute left-0 top-0 z-20 h-full w-1 bg-lime-400' />
                      {/* Video Element */}
                      <div className='relative aspect-[9/12.8]'>
                        <video
                          ref={(el) => (videoRefs.current[post.id] = el)}
                          className='h-full w-full object-cover'
                          poster={post.preview_image || '/imge/home/poster1-1.png'}
                          preload='metadata'
                          muted
                          loop
                          onEnded={() => setPlayingVideo(null)}
                          onClick={(e) => {
                            e.stopPropagation()
                            // Only play/pause video on double click, single click opens drawer
                            if (e.detail === 2) {
                              handlePlayVideo(post.id)
                            } else {
                              handlePostClick(post)
                            }
                          }}
                        >
                          {post.preview_video && (
                            <source
                              src={post.preview_video}
                              type='video/mp4'
                            />
                          )}
                        </video>
                      </div>

                      {/* Content Overlay */}
                      <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6'>
                        <h3 className="font-['Urbanist'] text-sm font-bold leading-tight text-white transition-colors duration-300 group-hover:text-lime-400">
                          {post.page_title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Indicators */}
            {videoPosts.length > cardsPerScreen && (
              <div className='mt-8 flex justify-center space-x-2'>
                {Array.from({ length: maxSlides + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={cn(
                      'h-2 w-8 rounded-full transition-all duration-300',
                      currentSlide === index ? 'bg-lime-400' : 'bg-gray-600 hover:bg-gray-400'
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </AppLayoutPadding>
      </AppSectionPadding>
    </section>
  )
}

export default SectionVideos
