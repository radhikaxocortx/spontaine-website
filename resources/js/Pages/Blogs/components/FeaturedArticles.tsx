import { Page } from '@/Modules/PageBuilder/page_interfaces'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import BlogCard from './BlogCard'

gsap.registerPlugin(ScrollTrigger)

interface FeaturedArticlesProps {
  featuredPosts: Page[]
  onPostClick: (post: Page) => void
}

const FeaturedArticles = ({ featuredPosts, onPostClick }: FeaturedArticlesProps) => {
  const featuredSectionRef = useRef<HTMLElement>(null)
  const featuredCardRef = useRef<HTMLDivElement>(null)
  const miniCard1Ref = useRef<HTMLDivElement>(null)
  const miniCard2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (featuredPosts.length > 0) {
        const featuredRefs = [
          featuredCardRef.current,
          miniCard1Ref.current,
          miniCard2Ref.current,
        ].filter(Boolean)

        // Set initial state for featured cards
        gsap.set(featuredRefs, {
          opacity: 0,
          y: 80,
        })

        // Animate featured cards with stagger
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
                end: 'top 20%',
                toggleActions: 'play none none reverse',
              },
              delay: index * 0.15,
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

  return (
    <section
      ref={featuredSectionRef}
      className='mb-16'
    >
      <h2 className='mb-8 font-display text-4xl font-bold text-spontaine-dark'>
        Featured Articles
      </h2>

      <div className='grid grid-cols-1 gap-10 md:gap-8 lg:grid-cols-2 lg:gap-4'>
        {/* Left Large Feature */}
        {featuredPosts[0] && (
          <div
            ref={featuredCardRef}
            className=''
          >
            <BlogCard
              key={featuredPosts[0].id}
              post={featuredPosts[0]}
              stacked={true}
              aspectRatio='aspect-[10/4]'
              onClick={onPostClick}
            />
          </div>
        )}

        {/* Right Vertical Stack */}
        <div className='space-y-6'>
          {featuredPosts.slice(1, 3).map((post, index) => (
            <div
              key={post.id}
              ref={index === 0 ? miniCard1Ref : miniCard2Ref}
            >
              <BlogCard
                post={post}
                stacked={false}
                onClick={onPostClick}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedArticles
