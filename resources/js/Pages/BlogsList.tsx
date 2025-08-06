import BlogDetailDrawer from '@/components/BlogDetailDrawer'
import AppLayout from '@/Layouts/AppLayout'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { Page } from '@/Modules/PageBuilder/page_interfaces'
import SectionBody from '@/typography/SectionBody'
import SectionDescription from '@/typography/SectionDescription'
import SectionSubheading from '@/typography/SectionSubheading'
import SectionTitle from '@/typography/SectionTitle'
import { Link } from '@inertiajs/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

// Banner Component
const BlogsBanner = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, descriptionRef.current], {
        opacity: 0,
        y: 40,
      })

      // Ken Burns effect on background
      gsap.set(backgroundRef.current, {
        scale: 1,
        x: 0,
        y: 0,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      }).to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.6'
      )

      // Ken Burns effect - slow zoom and pan
      gsap.to(backgroundRef.current, {
        scale: 1.2,
        x: -20,
        y: -10,
        duration: 20,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className='relative h-[50vh] min-h-[400px] w-full overflow-hidden text-white'
      data-banner-section='true'
    >
      {/* Ken Burns Background */}
      <div
        ref={backgroundRef}
        className='absolute inset-0 h-full w-full'
        style={{
          backgroundImage: `url('/imge/home/talk.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Overlay for better text readability */}
      <div className='absolute inset-0' />

      {/* Content */}
      <div className='relative z-10 flex h-full flex-col justify-end pb-16 lg:pb-16'>
        <AppLayoutPadding>
          <div className='max-w-4xl'>
            {/* Title */}
            <div
              ref={titleRef}
              className='mb-6'
            >
              <SectionTitle
                theme='dark'
                alignment='left'
                style={{
                  background:
                    'linear-gradient(135deg, #c7ec93 0%, #a3d5ff 25%, #7c83e7 50%, #ff9a9e 75%, #fecfef 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: 'clamp(32px, 5vw, 64px)',
                  fontWeight: 'medium',
                  lineHeight: '1.2',
                }}
              >
                Resources & Case Studies
              </SectionTitle>
            </div>

            {/* Description */}
            <div
              ref={descriptionRef}
              className='max-w-2xl'
            >
              <SectionDescription
                theme='dark'
                size='medium'
                maxWidth='3xl'
              >
                Spontaine transforms all your systems - and databases into a powerful AI-driven
                command center.
              </SectionDescription>
            </div>
          </div>
        </AppLayoutPadding>
      </div>
    </section>
  )
}

// Breadcrumb Component
const Breadcrumbs = () => (
  <AppLayoutPadding>
    <nav className='flex items-center space-x-1 py-4 text-sm text-gray-600'>
      <Link
        href='/'
        className='font-space-grotesk text-xs'
      >
        Home
      </Link>
      <span className='mx-2 text-gray-400'>/</span>
      <span className='font-space-grotesk text-xs'>Blogs</span>
    </nav>
  </AppLayoutPadding>
)

interface BlogsListProps {
  featuredPosts: Page[]
  allPosts: {
    data: Page[]
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
  selectedBlogSlug?: string
}

interface BlogCardProps {
  post: Page
  stacked?: boolean
  aspectRatio?: string
  onClick?: (post: Page) => void
}

const BlogCard = ({ post, stacked = false, aspectRatio = '', onClick }: BlogCardProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onClick?.(post)
  }

  if (!stacked) {
    return (
      <div
        onClick={handleClick}
        className='group block cursor-pointer overflow-hidden'
      >
        <div className='grid grid-cols-2 gap-4'>
          {/* thumbnail image  */}
          <div className='overflow-hidden rounded-lg'>
            {post.preview_image ? (
              <img
                src={post.preview_image}
                alt={post.title}
                className='w-full rounded-lg object-cover transition-transform group-hover:scale-105'
              />
            ) : (
              <div className='flex h-64 w-full items-center justify-center rounded-lg bg-gray-200 text-gray-400 lg:h-80'>
                <span className='text-sm'>No Image</span>
              </div>
            )}
          </div>

          {/* Featured Content */}
          <div className='flex flex-col'>
            {/* Author and Date */}
            <div className='mb-4 flex gap-2 text-sm text-gray-600'>
              <SectionBody
                theme='light'
                size='sm'
                weight='normal'
                className='text-gray-500'
              >
                {post.author && `${post.author} • `}
                {post.created_at && new Date(post.created_at).toLocaleDateString()}
              </SectionBody>
            </div>

            {/* Title */}
            <SectionSubheading
              theme='light'
              size='medium'
              weight='bold'
              className='group-hover:text-[#378727]'
            >
              {post.title}
            </SectionSubheading>

            {/* Description */}
            <SectionBody
              theme='light'
              size='sm'
              className='group-hover:text-[#378727]'
            >
              {post.description}
            </SectionBody>

            {/* Read More */}
          </div>
        </div>
      </div>
    )
  }

  // Big card for featured posts
  return (
    <div
      onClick={handleClick}
      className='group block cursor-pointer overflow-hidden'
    >
      {/* Image */}
      <div className={`${aspectRatio} overflow-hidden rounded-lg`}>
        {post.preview_image ? (
          <img
            src={post.preview_image}
            alt={post.title}
            className='w-full rounded-lg object-cover object-center transition-transform group-hover:scale-105'
          />
        ) : (
          <div className='flex aspect-video items-center justify-center bg-gray-200 text-gray-400'>
            <span className='text-sm'>No Image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className='space-y-2'>
        {/* Author and Date */}
        <div className='flex items-center gap-2 py-2 text-xs text-gray-500'>
          <SectionBody
            theme='light'
            size='sm'
            weight='normal'
            className='text-gray-500 group-hover:text-[#378727]'
          >
            {post.author && `${post.author} • `}
            {post.created_at && new Date(post.created_at).toLocaleDateString()}
          </SectionBody>
        </div>

        {/* Title */}
        <SectionSubheading
          theme='light'
          size='medium'
          weight='bold'
          className='group-hover:text-[#378727]'
        >
          {post.title}
        </SectionSubheading>

        {/* Description */}
        <SectionBody
          theme='light'
          size='sm'
          className='group-hover:text-[#378727]'
        >
          {post.description}
        </SectionBody>
      </div>
    </div>
  )
}

const BlogsList = ({ featuredPosts, allPosts, selectedBlogSlug }: BlogsListProps) => {
  const featuredSectionRef = useRef<HTMLElement>(null)
  const allPostsSectionRef = useRef<HTMLElement>(null)
  const featuredCardRef = useRef<HTMLDivElement>(null)
  const miniCard1Ref = useRef<HTMLDivElement>(null)
  const miniCard2Ref = useRef<HTMLDivElement>(null)
  const allPostsCardsRef = useRef<HTMLDivElement[]>([])

  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Page | null>(null)

  // Helper function to find post by slug from URL
  const findPostBySlug = (slug: string): Page | null => {
    const allBlogPosts = [...featuredPosts, ...allPosts.data]
    return (
      allBlogPosts.find(
        (post) => post.url === slug || post.url === `/${slug}` || post.url === `/blog/${slug}`
      ) || null
    )
  }

  // Handle URL-based blog loading
  useEffect(() => {
    if (selectedBlogSlug) {
      const post = findPostBySlug(selectedBlogSlug)
      if (post) {
        setSelectedPost(post)
        setIsDrawerOpen(true)
      }
    }
  }, [selectedBlogSlug, featuredPosts, allPosts.data])

  // Handle opening the drawer
  const handlePostClick = (post: Page) => {
    setSelectedPost(post)
    setIsDrawerOpen(true)

    // Update URL to reflect the blog post
    const blogSlug = post.url.startsWith('/') ? post.url.substring(1) : post.url
    const newUrl = `/blog/${blogSlug}`

    // Use replace to avoid adding to history stack when opening drawer
    window.history.replaceState({}, '', newUrl)
  }

  // Handle closing the drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)

    // Navigate back to blogs list
    window.history.replaceState({}, '', '/blogs-list')

    // Optional: Clear selected post after animation completes
    setTimeout(() => {
      if (!isDrawerOpen) {
        setSelectedPost(null)
      }
    }, 500)
  }

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const currentPath = window.location.pathname
      if (currentPath === '/blogs-list') {
        setIsDrawerOpen(false)
        setSelectedPost(null)
      } else if (currentPath.startsWith('/blog/')) {
        const slug = currentPath.replace('/blog/', '')
        const post = findPostBySlug(slug)
        if (post) {
          setSelectedPost(post)
          setIsDrawerOpen(true)
        } else {
          // Invalid slug, redirect to blogs list
          window.history.replaceState({}, '', '/blogs-list')
          setIsDrawerOpen(false)
          setSelectedPost(null)
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [featuredPosts, allPosts.data])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Featured section animations
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

      // All posts section animations
      const allPostsCards = allPostsCardsRef.current.filter(Boolean)

      // Set initial state for all posts cards
      gsap.set(allPostsCards, {
        opacity: 0,
        y: 80,
      })

      // Animate all posts cards with stagger
      allPostsCards.forEach((ref, index) => {
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
            delay: index * 0.1, // Shorter delay for grid items
          })
        }
      })
    }, [featuredSectionRef, allPostsSectionRef])

    return () => ctx.revert()
  }, [featuredPosts.length, allPosts.data.length])

  const generatePageNumbers = () => {
    const pages = []
    const maxVisible = 5
    const start = Math.max(1, allPosts.current_page - Math.floor(maxVisible / 2))
    const end = Math.min(allPosts.last_page, start + maxVisible - 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <AppLayout>
      {/* Banner Section */}
      <BlogsBanner />

      {/* Breadcrumbs */}
      <Breadcrumbs />

      <div className='min-h-screen bg-gray-50 py-12'>
        <AppLayoutPadding>
          {/* Featured Articles Section */}
          {featuredPosts.length > 0 && (
            <section
              ref={featuredSectionRef}
              className='mb-16'
            >
              <SectionSubheading
                theme='light'
                size='large'
                weight='bold'
                centered={false}
                className='mb-8'
              >
                Featured Articles
              </SectionSubheading>

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
                      onClick={handlePostClick}
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
                        onClick={handlePostClick}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* All Posts Section */}
          <section ref={allPostsSectionRef}>
            <SectionSubheading
              theme='light'
              size='large'
              weight='bold'
              centered={false}
              className='py-4'
            >
              All Posts
            </SectionSubheading>

            {/* Posts Grid */}
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {allPosts.data.map((post, index) => (
                <div
                  key={post.id}
                  ref={(el) => (allPostsCardsRef.current[index] = el!)}
                >
                  <BlogCard
                    post={post}
                    stacked={true}
                    onClick={handlePostClick}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {allPosts.last_page > 1 && (
              <div className='flex items-center justify-center gap-2'>
                {/* Previous Button */}
                {allPosts.current_page > 1 && (
                  <Link
                    href={`/blogs-list?page=${allPosts.current_page - 1}`}
                    className='flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100'
                  >
                    <ChevronLeft className='h-4 w-4' />
                    Previous
                  </Link>
                )}

                {/* Page Numbers */}
                {generatePageNumbers().map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={`/blogs-list?page=${pageNum}`}
                    className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                      pageNum === allPosts.current_page
                        ? 'bg-lime-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </Link>
                ))}

                {/* Next Button */}
                {allPosts.current_page < allPosts.last_page && (
                  <Link
                    href={`/blogs-list?page=${allPosts.current_page + 1}`}
                    className='flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100'
                  >
                    Next
                    <ChevronRight className='h-4 w-4' />
                  </Link>
                )}
              </div>
            )}
          </section>
        </AppLayoutPadding>
      </div>

      {/* Blog Detail Drawer */}
      <BlogDetailDrawer
        isOpen={isDrawerOpen}
        post={selectedPost}
        onClose={handleCloseDrawer}
      />
    </AppLayout>
  )
}

export default BlogsList
