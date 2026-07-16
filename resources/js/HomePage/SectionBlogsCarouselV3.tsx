import { cn } from '@/lib/utils'
import { Page } from '@/Modules/PageBuilder/page_interfaces'
import { router } from '@inertiajs/react'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'

interface SectionBlogsCarouselV3Props {
  readonly className?: string
  readonly featuredBlogs?: Page[]
}

const FALLBACK_BLOGS: Page[] = [
  {
    id: 1,
    title: 'AI: Axe or Amplifier for Junior Talent?',
    description:
      'AWS CEO Matt Garman calls replacing junior workers with AI "the dumbest thing." AI must be amplifying, not being the "axe". Discover how Spontaine can be the 1000x multiplier of junior talent by democratizing your pockets of brilliance.',
    preview_image: '/imge/home/blogs/people.png',
    url: '/ai-axe-or-amplifier-for-junior-talent',
    page_title: 'AI: Axe or Amplifier for Junior Talent?',
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
    title:
      "The C-Suite's Dirty Secret: Why Best Strategy Discussions Start With Data Reconciliation",
    description:
      'Every Monday, executives face the same embarrassing ritual: spending the first half of their strategy meetings figuring out which numbers are actually right.',
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
    id: 3,
    title: 'Why Traditional BI Tools Fail for SMEs',
    description:
      'Discover how artificial intelligence can streamline operations, enhance decision-making, and drive growth.',
    preview_image: '/imge/home/blogs/calculator.png',
    url: '/why-traditional-bi-tools-fail-for-smes-and-what-to-do-instead',
    page_title: 'Why Traditional BI Tools Fail for SMEs',
    type: 'Blog',
    published: true,
    featured: true,
    author: 'Spontaine Team',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    blocks: { lastUUID: 0, blocks: [] },
  },
]

const getBlogSlug = (url: string) => {
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url

  return cleanUrl.split('/').pop() || cleanUrl
}

const getBlogPosts = (featuredBlogs: Page[]) => {
  const filteredBlogs = featuredBlogs.filter(
    (post) => post.featured && post.type === 'Blog' && post.published
  )

  const sortedBlogs = [...filteredBlogs]
    .sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0

      return dateB - dateA
    })
    .slice(0, 3)

  return sortedBlogs.length > 0 ? sortedBlogs : FALLBACK_BLOGS
}

export default function SectionBlogsCarouselV3({
  className,
  featuredBlogs = [],
}: SectionBlogsCarouselV3Props) {
  const blogPosts = getBlogPosts(featuredBlogs)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < blogPosts.length - 1

  const handleBlogClick = (blog: Page) => {
    router.visit(`/blog/${getBlogSlug(blog.url)}`)
  }

  useEffect(() => {
    if (!trackRef.current) {
      return
    }

    const cardWidth = trackRef.current.children[0]?.getBoundingClientRect().width || 0

    gsap.to(trackRef.current, {
      x: -currentIndex * cardWidth,
      duration: 0.6,
      ease: 'power2.out',
    })
  }, [currentIndex])

  return (
    <section
      className={cn('relative overflow-hidden bg-[#efecdc] py-8 sm:py-10 lg:py-12', className)}
    >
      <div className='mx-auto w-full max-w-[980px] px-6'>
        <div className='flex justify-center'>
          <span className='rounded-md bg-[#e4e0cf] px-6 py-2.5 font-mono text-xs tracking-tight text-[#303033]'>
            Insights
          </span>
        </div>

        <div className='mx-auto mt-16 w-full max-w-[790px] overflow-hidden lg:mt-20'>
          <div
            ref={trackRef}
            className='flex'
          >
            {blogPosts.map((blog) => (
              <div
                key={blog.id}
                className='w-full flex-shrink-0'
              >
                <button
                  type='button'
                  onClick={() => handleBlogClick(blog)}
                  className='group block w-full rounded-2xl bg-white p-6 text-left shadow-sm transition-transform duration-300 hover:-translate-y-0.5 sm:p-7'
                >
                  <article className='grid h-[430px] gap-6 md:h-[260px] md:grid-cols-[minmax(0,1fr)_360px] md:items-center'>
                    <div className='min-w-0'>
                      <h3 className='line-clamp-3 font-display text-2xl font-bold leading-[1.1] text-[#303033] transition-colors group-hover:text-spontaine-ink-soft sm:text-[27px]'>
                        {blog.page_title || blog.title}
                      </h3>
                      <p className='text-[#303033]/42 mt-4 line-clamp-5 font-body text-sm leading-6 sm:text-[15px]'>
                        {blog.description}
                      </p>
                      {blog.description && blog.description.length > 220 && (
                        <span className='mt-1 inline-block font-body text-sm font-semibold text-[#303033]/60'>
                          ...more
                        </span>
                      )}
                    </div>

                    <div className='overflow-hidden rounded-xl bg-[#0a095f] md:h-[204px]'>
                      <img
                        src={blog.preview_image || '/imge/home/blogs/placeholder.png'}
                        alt={blog.page_title || blog.title}
                        className='aspect-[16/9] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 md:aspect-auto'
                      />
                    </div>
                  </article>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className='relative mx-auto mt-16 max-w-[790px]'>
          <div className='flex items-center justify-center gap-4'>
            <button
              type='button'
              onClick={() => setCurrentIndex((index) => Math.max(index - 1, 0))}
              disabled={!canGoPrev}
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-md transition-colors',
                canGoPrev
                  ? 'text-spontaine-accent hover:bg-white/45'
                  : 'cursor-not-allowed text-[#9da6ad]/70'
              )}
              aria-label='Previous blog'
            >
              <svg
                className='h-4 w-4'
                viewBox='0 0 20 20'
                fill='none'
                aria-hidden='true'
              >
                <path
                  d='M12 5L7 10L12 15'
                  stroke='currentColor'
                  strokeWidth='1.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>

            <div className='flex items-center gap-2'>
              {blogPosts.map((blog, index) => (
                <button
                  key={blog.id}
                  type='button'
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'h-2 w-2 rounded-full transition-colors',
                    index === currentIndex ? 'bg-spontaine-accent' : 'bg-[#aeb4b5]'
                  )}
                  aria-label={`Show blog ${index + 1}`}
                  aria-current={index === currentIndex ? 'true' : undefined}
                />
              ))}
            </div>

            <button
              type='button'
              onClick={() => setCurrentIndex((index) => Math.min(index + 1, blogPosts.length - 1))}
              disabled={!canGoNext}
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-md transition-colors',
                canGoNext
                  ? 'text-spontaine-accent hover:bg-white/45'
                  : 'cursor-not-allowed text-[#9da6ad]/70'
              )}
              aria-label='Next blog'
            >
              <svg
                className='h-4 w-4'
                viewBox='0 0 20 20'
                fill='none'
                aria-hidden='true'
              >
                <path
                  d='M8 5L13 10L8 15'
                  stroke='currentColor'
                  strokeWidth='1.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>

          <div className='mt-5 flex justify-end'>
            <a
              href='/blogs-list'
              className='group inline-flex items-center gap-2 font-body text-[11px] text-[#8f9697] transition-colors hover:text-spontaine-ink-soft'
            >
              All Resources
              <svg
                className='h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5'
                viewBox='0 0 16 16'
                fill='none'
                aria-hidden='true'
              >
                <path
                  d='M6 4L10 8L6 12'
                  stroke='currentColor'
                  strokeWidth='1.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
