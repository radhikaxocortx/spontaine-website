import { cn } from '@/lib/utils'
import { Page } from '@/Modules/PageBuilder/page_interfaces'
import { router } from '@inertiajs/react'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'

/**
 * SectionBlogsCarousel Component
 *
 * A horizontal carousel displaying blog posts with rounded cards
 * - Manual navigation with prev/next arrows and dot indicators
 * - Smooth GSAP slide transitions
 * - "Insights" badge overlay
 * - Card design: white content area with rounded image
 * - Background: spontaine-card-yellow (#C3FF6E)
 */

interface SectionBlogsCarouselProps {
  className?: string
  featuredBlogs?: Page[]
}

// Fallback blog data when no featured blogs are available
const FALLBACK_BLOGS: Page[] = [
  {
    id: 1,
    title:
      "The C-Suite's Dirty Secret: Why Best Strategy Discussions Start With Data Reconciliation",
    description:
      "Every Monday, executives face the same embarrassing ritual: spending the first half of their strategy meetings figuring out which numbers are actually right. While they're reconciling conflicting reports, their highest-performing competitors have already moved on to making decisions with data they actually trust.",
    preview_image: '/imge/home/blogs/people.png',
    url: '/the-c-suites-dirty-secret-why-best-strategy-discussions-start-with-data-reconciliation',
    page_title:
      "The C-Suite's Dirty Secret: Why Best Strategy Discussions Start With Data Reconciliation",
    type: 'Blog',
    published: true,
    featured: true,
    author: 'Spontaine Team',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    blocks: { lastUUID: 0, blocks: [] },
  },
  {
    id: 2,
    title: 'Why Traditional BI Tools Fail for SMEs (and What to Do Instead)',
    description:
      'Discover how artificial intelligence can streamline operations, enhance decision-making, and drive growth, helping you stay competitive in a rapidly evolving market',
    preview_image: '/imge/home/blogs/calculator.png',
    url: '/why-traditional-bi-tools-fail-for-smes-and-what-to-do-instead',
    page_title: 'Why Traditional BI Tools Fail for SMEs (and What to Do Instead)',
    type: 'Blog',
    published: true,
    featured: true,
    author: 'Spontaine Team',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    blocks: { lastUUID: 0, blocks: [] },
  },
  {
    id: 3,
    title: 'A Perfect Lever: 80% of Transformative Value with 10% Effort',
    description:
      'From chaos to clarity in weeks, not years. Discover how the 80/20 principle delivers exactly what you need - a unified view of your data that actually works.',
    preview_image: '/imge/home/blogs/placeholder.png',
    url: '/a-perfect-lever-80-of-transformative-value-10-effort',
    page_title: 'A Perfect Lever: 80% of Transformative Value with 10% Effort',
    type: 'Blog',
    published: true,
    featured: true,
    author: 'Spontaine Team',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    blocks: { lastUUID: 0, blocks: [] },
  },
] as Page[]

const SectionBlogsCarousel = ({ className, featuredBlogs = [] }: SectionBlogsCarouselProps) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Filter for featured blog posts
  const filteredBlogs = featuredBlogs.filter(
    (post) => post.featured && post.type === 'Blog' && post.published
  )

  // Sort by date (newest first) and take latest 3 blogs
  const sortedBlogs = filteredBlogs
    .sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
      return dateB - dateA
    })
    .slice(0, 3)

  // Use featured blogs if available, otherwise fallback
  const blogPosts = sortedBlogs.length > 0 ? sortedBlogs : FALLBACK_BLOGS.slice(0, 3)

  // Debug: Log what we're using
  console.log('SectionBlogsCarousel - Featured blogs received:', featuredBlogs.length)
  console.log('SectionBlogsCarousel - Raw featured blogs:', featuredBlogs)
  console.log('SectionBlogsCarousel - Filtered blogs:', filteredBlogs.length)
  console.log('SectionBlogsCarousel - Using blogs:', blogPosts.length, blogPosts)
  console.log('SectionBlogsCarousel - First blog data:', blogPosts[0])

  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < blogPosts.length - 1

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  // Extract slug from URL and navigate to blog page
  const extractSlugFromUrl = (url: string): string => {
    const cleanUrl = url.startsWith('/') ? url.substring(1) : url
    return cleanUrl.split('/').pop() || cleanUrl
  }

  const handleBlogClick = (blog: Page) => {
    const slug = extractSlugFromUrl(blog.url)
    router.visit(`/blog/${slug}`)
  }

  // Slide animation on index change
  useEffect(() => {
    if (!trackRef.current) return

    const cardWidth = trackRef.current.children[0]?.getBoundingClientRect().width || 0
    const gap = 32 // 2rem gap

    gsap.to(trackRef.current, {
      x: -currentIndex * (cardWidth + gap),
      duration: 0.6,
      ease: 'power2.out',
    })
  }, [currentIndex])

  return (
    <section
      className={cn(
        'bg-spontaine-accent-bright relative w-full overflow-hidden border-t border-[#f1f1f1]',
        className
      )}
    >
      <div className='py-8 sm:py-20 lg:py-10'>
        {/* Insights Badge */}
        <div className='mb-12 flex justify-center'>
          <div className='rounded-md bg-black/5 px-6 py-2.5'>
            <p className='text-spontaine-dark-bg font-roboto-mono text-sm tracking-tight'>
              Insights
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div className='relative mx-auto max-w-[1200px] overflow-hidden px-6'>
          {/* Track */}
          <div
            ref={trackRef}
            className='flex gap-8'
          >
            {blogPosts.map((blog) => (
              <div
                key={blog.id}
                className='w-full flex-shrink-0 cursor-pointer'
                onClick={() => handleBlogClick(blog)}
              >
                {/* Card with gradient border effect */}
                <div className='rounded-xl bg-spontaine-accent p-8'>
                  <div className='h-full rounded-[21px] bg-white p-8'>
                    <div className='grid h-[400px] grid-cols-1 items-start gap-6 md:h-[320px] md:grid-cols-2 lg:h-[280px]'>
                      {/* Left - Content */}
                      <div className='group flex h-full flex-col space-y-4'>
                        <h3 className='text-spontaine-dark font-heading group-hover:text-spontaine-accent-footer line-clamp-3 text-2xl font-bold leading-tight transition-colors duration-200 sm:text-3xl'>
                          {blog.page_title || blog.title}
                        </h3>
                        <div className='flex-1'>
                          <p className='font-body group-hover:text-spontaine-accent-footer line-clamp-4 text-base leading-relaxed text-spontaine-gray transition-colors duration-200 sm:text-lg'>
                            {blog.description}
                          </p>
                          {blog.description && blog.description.length > 200 && (
                            <span className='text-spontaine-dark group-hover:text-spontaine-accent-footer mt-1 inline-block text-sm font-medium transition-colors duration-200 hover:underline'>
                              ...more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right - Image */}
                      <div className='h-full overflow-hidden rounded-2xl'>
                        <img
                          src={blog.preview_image || '/imge/home/blogs/placeholder.png'}
                          alt={blog.page_title || blog.title}
                          className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className='relative mx-auto mt-12 max-w-[1200px] px-6'>
          {/* Center: Previous + Dots + Next */}
          <div className='flex items-center justify-center gap-4'>
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200',
                canGoPrev
                  ? 'cursor-pointer text-spontaine-accent-dark hover:bg-black/5'
                  : 'cursor-not-allowed text-gray-400'
              )}
              aria-label='Previous blog'
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12 16L6 10L12 4'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>

            {/* Dot Indicators */}
            <div className='flex items-center gap-[5px]'>
              {blogPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={cn(
                    'h-[10px] w-[10px] rounded-[5px] transition-all duration-300',
                    index === currentIndex ? 'bg-spontaine-accent' : 'bg-gray-400 hover:bg-gray-500'
                  )}
                  aria-label={`Go to blog ${index + 1}`}
                  aria-current={index === currentIndex ? 'true' : 'false'}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200',
                canGoNext
                  ? 'cursor-pointer text-spontaine-accent-dark hover:bg-black/5'
                  : 'cursor-not-allowed text-gray-400'
              )}
              aria-label='Next blog'
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8 4L14 10L8 16'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>

          {/* Right: View All Articles Link */}
          <a
            href='/blogs-list'
            className='hover:text-spontaine-accent-footer group absolute right-6 top-1/2 inline-flex -translate-y-1/2 items-center gap-2 rounded-lg px-6 py-3 font-space-grotesk text-xs font-semibold text-spontaine-gray transition-all duration-200'
          >
            All Resources
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='transition-transform duration-200 group-hover:translate-x-1'
            >
              <path
                d='M6 12L10 8L6 4'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default SectionBlogsCarousel
