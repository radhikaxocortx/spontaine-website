import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import AppSectionPadding from '@/Layouts/AppSectionPadding'
import { cn } from '@/lib/utils'
import SectionDescription from '@/typography/SectionDescription'
import SectionTitle from '@/typography/SectionTitle'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

interface VideoData {
  id: number
  title: string
  description: string
  thumbnail: string
  videoSrc: string
  category: string
}

interface SectionVideosProps {
  className?: string
}

// Static video data
const VIDEOS: VideoData[] = [
  {
    id: 1,
    title: 'Enabling prioritized decisions that keep lights shining',
    description: 'Energy sector optimization through intelligent data management',
    thumbnail: '/imge/home/poster1.png',
    videoSrc: 'https://cdn.pixabay.com/video/2024/03/25/205625-927347898_large.mp4',
    category: 'Energy',
  },
  {
    id: 2,
    title: 'Swarms of Automated Weather Stations to critical early warning systems',
    description: 'Agricultural technology transforming farming intelligence',
    thumbnail: '/imge/home/poster2.png',
    videoSrc: 'https://cdn.pixabay.com/video/2023/01/30/148596-794221551_large.mp4',
    category: 'Agriculture',
  },
  {
    id: 3,
    title:
      'Replacing brittle compliance reporting with bulletproof semantic layers that scale with regulatory complexity',
    description: 'Financial compliance made simple with automated reporting',
    thumbnail: '/imge/home/poster3.png',
    videoSrc: 'https://cdn.pixabay.com/video/2025/07/23/293084_large.mp4',
    category: 'Finance',
  },
  {
    id: 4,
    title: 'Transforming scattered government data into transparent public-facing insights',
    description: 'Government transparency through unified data systems',
    thumbnail: '/imge/home/poster4.png',
    videoSrc: 'https://cdn.pixabay.com/video/2018/07/02/17013-278400948_large.mp4',
    category: 'Government',
  },
]

const SectionVideos = ({ className }: SectionVideosProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [firstVideoPlayed, setFirstVideoPlayed] = useState(false)

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

          {/* Video Cards Container */}
          <div className='relative'>
            {/* Video Cards Grid */}
            <div
              ref={cardsRef}
              className='relative z-30 -mb-[10vh] grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4'
            >
              {VIDEOS.map((video, index) => (
                <div
                  key={video.id}
                  className='video-card hover:shadow-3xl group relative cursor-pointer overflow-hidden rounded-xl bg-gray-900 shadow-2xl transition-all duration-300 hover:scale-105'
                  onMouseEnter={() => handleVideoHover(video.id, true)}
                  onMouseLeave={() => handleVideoHover(video.id, false)}
                >
                  {/* Vertical Green Accent Bar */}
                  <div className='absolute left-0 top-0 z-20 h-full w-1 bg-lime-400' />
                  {/* Video Element */}
                  <div className='relative aspect-[9/12.8]'>
                    <video
                      ref={(el) => (videoRefs.current[video.id] = el)}
                      className='h-full w-full object-cover'
                      poster={video.thumbnail}
                      preload='metadata'
                      muted
                      loop
                      onEnded={() => setPlayingVideo(null)}
                      onClick={() => handlePlayVideo(video.id)}
                    >
                      <source
                        src={video.videoSrc}
                        type='video/mp4'
                      />
                    </video>
                  </div>

                  {/* Content Overlay */}
                  <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6'>
                    <h3 className="font-['Urbanist'] text-sm font-bold leading-tight text-white hover:text-lime-400">
                      {video.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AppLayoutPadding>
      </AppSectionPadding>
    </section>
  )
}

export default SectionVideos
