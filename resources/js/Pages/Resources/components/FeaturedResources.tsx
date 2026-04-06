import { Page } from '@/Modules/PageBuilder/page_interfaces'
import TextPill from '@/components/CustomUI/Pills/TextPill'
import { Button } from '@/components/ui/button'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface FeaturedResourcesProps {
  featuredPosts: Page[]
  onPostClick: (post: Page) => void
}

const FeaturedResources = ({ featuredPosts, onPostClick }: FeaturedResourcesProps) => {
  const featuredSectionRef = useRef<HTMLElement>(null)
  const featuredCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (featuredPosts.length > 0 && featuredCardRef.current) {
        const featuredRefs = [featuredCardRef.current]

        gsap.set(featuredRefs, {
          opacity: 0,
          y: 80,
        })

        featuredRefs.forEach((ref, index) => {
          if (ref) {
            gsap.to(ref, {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: ref,
                start: 'top 85%',
                end: 'top 30%',
                toggleActions: 'play none none reverse',
              },
              delay: index * 0.12,
            })
          }
        })
      }
    }, featuredSectionRef)

    return () => ctx.revert()
  }, [featuredPosts.length])

  if (featuredPosts.length === 0) {
    return null
  }

  const featuredPost = featuredPosts[0]

  return (
    <section
      ref={featuredSectionRef}
      className='mb-16'
    >
      <div
        ref={featuredCardRef}
        className='overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-sm'
      >
        <div
          role='button'
          tabIndex={0}
          onClick={() => onPostClick(featuredPost)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onPostClick(featuredPost)
            }
          }}
          className='grid min-h-[480px] cursor-pointer grid-cols-1 md:grid-cols-2'
        >
          <div className='flex w-full flex-col gap-4 p-10'>
            <TextPill
              text='Featured'
              className='bg-spontaine-accent/20 text-slate-900'
            />

            <h2 className='font-heading text-4xl font-bold text-spontaine-dark'>
              {featuredPost.page_title}
            </h2>

            <p className='line-clamp-3 font-body text-sm text-spontaine-dark group-hover:text-spontaine-accent-footer'>
              {featuredPost.description}
            </p>

            <div className='pt-8'>
              <Button
                size='lg'
                className='relative overflow-hidden rounded-full bg-spontaine-accent py-6 text-spontaine-dark shadow-2xl'
              >
                <span className='nav-cta-text'>Read Report </span>
              </Button>
            </div>
          </div>

          <div className='flex w-full items-center justify-center bg-gradient-to-br from-spontaine-accent/10 to-spontaine-accent-bright/10 p-10'>
            <div className='flex w-full flex-col items-center justify-center rounded-[16px] border border-white/60 bg-gradient-to-br from-spontaine-accent/15 to-spontaine-accent-bright/15 p-10 shadow-inner backdrop-blur-[2px]'>
              <div className='relative flex h-full w-full items-center justify-center'>
                <div className='relative rotate-[3deg]'>
                  <div className='w-[220px] md:w-[260px]'>
                    {/* Portrait Frame */}
                    <div className='aspect-[3/4] w-full rounded-[20px] bg-white p-3 shadow-[0_20px_40px_rgba(0,0,0,0.15)]'>
                      <div className='h-full w-full overflow-hidden rounded-[16px]'>
                        {featuredPost.preview_image ? (
                          <img
                            src={featuredPost.preview_image}
                            alt={featuredPost.page_title}
                            className='h-full w-full object-cover'
                          />
                        ) : (
                          <div className='flex h-full w-full items-center justify-center bg-slate-100 text-slate-400'>
                            No Image
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedResources
