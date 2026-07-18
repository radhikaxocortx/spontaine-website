import { cn } from '@/lib/utils'
import { type Page } from '@/Modules/PageBuilder/page_interfaces'
import { router } from '@inertiajs/react'
import { gsap } from 'gsap'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { type KeyboardEvent, useEffect, useRef, useState } from 'react'

interface SectionBlogsCarouselV3Props {
  className?: string
  featuredBlogs?: Page[]
}

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

const extractSlugFromUrl = (url: string): string => {
  const cleanUrl = url.startsWith('/') ? url.substring(1) : url

  return cleanUrl.split('/').pop() || cleanUrl
}

const goToBlog = (blog: Page) => {
  router.visit(`/blog/${extractSlugFromUrl(blog.url)}`)
}

export default function SectionBlogsCarouselV3({
  className,
  featuredBlogs = [],
}: SectionBlogsCarouselV3Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const filteredBlogs = featuredBlogs.filter(
    (post) => post.featured && post.type === 'Blog' && post.published
  )

  const sortedBlogs = filteredBlogs
    .sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0

      return dateB - dateA
    })
    .slice(0, 3)

  const blogPosts = sortedBlogs.length > 0 ? sortedBlogs : FALLBACK_BLOGS.slice(0, 3)
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

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>, blog: Page) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      goToBlog(blog)
    }
  }

  useEffect(() => {
    if (!trackRef.current) {
      return
    }

    const cardWidth = trackRef.current.children[0]?.getBoundingClientRect().width || 0
    const gap = 32

    gsap.to(trackRef.current, {
      x: -currentIndex * (cardWidth + gap),
      duration: 0.6,
      ease: 'power2.out',
    })
  }, [currentIndex])

  return (
    <section className={cn('bg-spontaine-surface-cream pb-[140px] pt-[105px]', className)}>
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <div className='text-center'>
          <p className='eyebrow mb-5 text-spontaine-gray-cool'>FROM THE FIELD</p>
          <h2 className='display-xl text-spontaine-text-primary mx-auto font-display'>
            The AI-native firm is built, not bought.
          </h2>
        </div>

        <div className='mx-auto mt-[42px] w-full max-w-[810px] overflow-hidden'>
          <div
            ref={trackRef}
            className='flex gap-8'
          >
            {blogPosts.map((blog) => (
              <article
                key={blog.id}
                role='button'
                tabIndex={0}
                onClick={() => goToBlog(blog)}
                onKeyDown={(event) => handleCardKeyDown(event, blog)}
                className='bg-spontaine-surface-paper grid w-full flex-shrink-0 cursor-pointer grid-cols-1 gap-[25px] rounded-[19px] p-[22px] shadow-card-lift transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-spontaine-accent-dark md:grid-cols-[1.05fr_0.95fr] md:p-6'
              >
                <div className='flex min-h-[190px] flex-col justify-center'>
                  <h3 className='text-spontaine-text-primary line-clamp-3 font-display text-[1.4rem] font-bold leading-[1.08] tracking-[-0.035em]'>
                    {blog.page_title || blog.title}
                  </h3>

                  <p className='text-spontaine-text-secondary mt-[13px] line-clamp-5 font-body text-[0.82rem] leading-[1.55]'>
                    {blog.description}
                  </p>

                  <span className='text-spontaine-text-accent-dark mt-[18px] inline-flex items-center gap-2 font-body text-[0.74rem] font-bold'>
                    Read the perspective
                    <ArrowUpRight
                      aria-hidden='true'
                      className='h-3.5 w-3.5'
                    />
                  </span>
                </div>

                <div className='bg-spontaine-surface-ice/45 min-h-[190px] overflow-hidden rounded-[13px]'>
                  {blog.preview_image ? (
                    <img
                      src={blog.preview_image}
                      alt={blog.page_title || blog.title}
                      className='h-full min-h-[190px] w-full object-cover transition-transform duration-300 hover:scale-[1.03]'
                    />
                  ) : (
                    <div className='flex h-full min-h-[190px] items-center justify-center px-6 text-center font-body text-[0.82rem] font-semibold text-spontaine-gray-muted'>
                      Resource perspective
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className='mx-auto mt-7 flex w-full max-w-[810px] flex-col items-center justify-center gap-3'>
          <div className='flex items-center justify-center gap-4'>
            <button
              type='button'
              onClick={handlePrev}
              disabled={!canGoPrev}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-[var(--radius-control)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spontaine-accent-dark',
                canGoPrev
                  ? 'text-spontaine-text-accent-dark hover:bg-spontaine-surface-paper/70'
                  : 'text-spontaine-text-tertiary cursor-not-allowed'
              )}
              aria-label='Previous blog'
            >
              <ChevronLeft
                aria-hidden='true'
                className='h-4 w-4'
              />
            </button>

            <div className='flex items-center gap-1.5'>
              {blogPosts.map((blog, index) => (
                <button
                  type='button'
                  key={blog.id}
                  onClick={() => handleDotClick(index)}
                  className={cn(
                    'h-2 w-2 rounded-[var(--radius-pill)] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spontaine-accent-dark',
                    index === currentIndex
                      ? 'bg-spontaine-accent'
                      : 'bg-spontaine-gray-muted/45 hover:bg-spontaine-gray-muted/70'
                  )}
                  aria-label={`Go to blog ${index + 1}`}
                  aria-current={index === currentIndex ? 'true' : 'false'}
                />
              ))}
            </div>

            <button
              type='button'
              onClick={handleNext}
              disabled={!canGoNext}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-[var(--radius-control)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spontaine-accent-dark',
                canGoNext
                  ? 'text-spontaine-text-accent-dark hover:bg-spontaine-surface-paper/70'
                  : 'text-spontaine-text-tertiary cursor-not-allowed'
              )}
              aria-label='Next blog'
            >
              <ChevronRight
                aria-hidden='true'
                className='h-4 w-4'
              />
            </button>
          </div>

          <div className='flex w-full justify-end'>
            <a
              href='/blogs-list'
              className='hover:text-spontaine-text-accent-dark inline-flex items-center justify-center gap-2 font-body text-[0.68rem] font-bold text-spontaine-gray-muted transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spontaine-accent-dark'
            >
              Explore all resources
              <ArrowUpRight
                aria-hidden='true'
                className='h-3 w-3'
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
