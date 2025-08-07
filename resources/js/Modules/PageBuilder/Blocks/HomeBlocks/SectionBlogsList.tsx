import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import AppSectionPadding from '@/Layouts/AppSectionPadding'
import { cn } from '@/lib/utils'
import SectionDescription from '@/typography/SectionDescription'
import SectionSubheading from '@/typography/SectionSubheading'
import SectionSubtitle from '@/typography/SectionSubtitle'
import SectionTitle from '@/typography/SectionTitle'
import { router } from '@inertiajs/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

interface BlogPost {
  id: number
  title: string
  description: string
  image: string
  slug: string
}

interface SectionBlogsListProps {
  className?: string
}

// Static blog data with slugs for navigation
const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title:
      "The C-Suite's Dirty Secret: Why Best Strategy Discussions Start With Data Reconciliation",
    description:
      "Every Monday morning, executives face the same embarrassing ritual: spending the first half of their strategy meetings figuring out which numbers are actually right. While they're reconciling conflicting reports, their highest-performing competitors have already moved on to making decisions with data they actually trust.",
    image: '/imge/home/blogs/people.png',
    slug: 'the-c-suites-dirty-secret-why-best-strategy-discussions-start-with-data-reconciliation',
  },
  {
    id: 2,
    title: 'Why Traditional BI Tools Fail for SMEs (and What to Do Instead)',
    description:
      'Discover how artificial intelligence can streamline operations, enhance decision-making, and drive growth, helping you stay competitive in a rapidly evolving market',
    image: '/imge/home/blogs/calculator.png',
    slug: 'why-traditional-bi-tools-fail-for-smes-and-what-to-do-instead',
  },
  {
    id: 3,
    title: 'A Perfect Lever: 80% of Transformative Value : 10% effort',
    description:
      'Discover how artificial intelligence can streamline operations, enhance decision-making, and drive growth, helping you stay competitive in a rapidly evolving market',
    image: '',
    slug: 'a-perfect-lever-80-of-transformative-value--10-effort',
  },
]

const SectionBlogsList = ({ className }: SectionBlogsListProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const blog1Ref = useRef<HTMLDivElement>(null)
  const blog2Ref = useRef<HTMLDivElement>(null)
  const blog3Ref = useRef<HTMLDivElement>(null)

  // Handle blog click navigation
  const handleBlogClick = (blog: BlogPost) => {
    router.visit(`/blog/${blog.slug}`)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set([blog1Ref.current, blog2Ref.current, blog3Ref.current], {
        opacity: 0,
        y: 80,
      })

      // Individual ScrollTrigger for each blog with smooth fade-in
      const refs = [blog1Ref.current, blog2Ref.current, blog3Ref.current]
      refs.forEach((ref, index) => {
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
            delay: index * 0.15, // Slight stagger delay
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={cn('bg-white bg-cover bg-center bg-no-repeat', className)}
      style={{ backgroundImage: 'url(/imge/home/grid-bg.png)' }}
    >
      <AppSectionPadding>
        <AppLayoutPadding>
          {/* Header Section */}
          <div className='mb-8 space-y-6 text-center sm:mb-10'>
            <SectionTitle theme='light'>
              Navigating a Tech-Driven Future Does Not
              <br className='hidden sm:block' />
              Need You To Be A Developer
            </SectionTitle>
            <div className='mx-auto max-w-2xl space-y-2'>
              <SectionSubtitle
                theme='light'
                size='medium'
                centered={false}
              >
                We are at an inflection point.
              </SectionSubtitle>
              <SectionDescription
                theme='light'
                size='medium'
                maxWidth='2xl'
                centered={false}
              >
                With generative AI reshaping industries at unprecedented speed,
                <br />
                there is false pressure on executives to become technical experts.
              </SectionDescription>
            </div>
          </div>

          {/* Blog Posts */}
          <div className='space-y-8'>
            {/* Blog 1 - Full Width */}
            <div
              ref={blog1Ref}
              className='group w-full cursor-pointer rounded-lg bg-white p-8'
              onClick={() => handleBlogClick(BLOG_POSTS[0])}
            >
              <article>
                <div className='grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-5'>
                  {/* Left Side - Content (1/3) */}
                  <div className='lg:col-span-2'>
                    <SectionSubheading
                      theme='light'
                      size='2xl'
                      weight='bold'
                      maxWidth='2xl'
                      className='mb-3 group-hover:text-[#378727]'
                    >
                      {BLOG_POSTS[0].title}
                    </SectionSubheading>

                    <SectionDescription
                      theme='light'
                      size='medium'
                      maxWidth='2xl'
                      className='mb-4 group-hover:text-[#378727]'
                    >
                      {BLOG_POSTS[0].description}
                    </SectionDescription>
                  </div>
                  {/* Right Side - Image (2/3) */}
                  <div className='lg:col-span-3'>
                    <div className='overflow-hidden rounded-lg'>
                      <img
                        src={BLOG_POSTS[0].image}
                        alt={BLOG_POSTS[0].title}
                        className='h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105 lg:h-80'
                      />
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* Blog 2 & 3 - Side by Side */}
            <div className='grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3'>
              {/* Blog 2 - Takes 2/3 width */}
              <div
                ref={blog2Ref}
                className='group h-full cursor-pointer rounded-lg bg-gray-200 lg:col-span-2'
                onClick={() => handleBlogClick(BLOG_POSTS[1])}
              >
                <article>
                  <div className='grid h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
                    {/* Left Side - Content */}
                    <div className='flex flex-col justify-center p-8'>
                      <SectionSubheading
                        theme='light'
                        size='medium'
                        weight='bold'
                        maxWidth='2xl'
                        className='mb-3 group-hover:text-[#378727]'
                      >
                        {BLOG_POSTS[1].title}
                      </SectionSubheading>
                      <SectionDescription
                        theme='light'
                        size='small'
                        maxWidth='2xl'
                        className='group-hover:text-[#378727]'
                      >
                        {BLOG_POSTS[1].description}
                      </SectionDescription>
                    </div>

                    {/* Right Side - Image */}
                    <div className='relative h-full overflow-hidden rounded-r-lg'>
                      <img
                        src={BLOG_POSTS[1].image}
                        alt={BLOG_POSTS[1].title}
                        className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                      />
                    </div>
                  </div>
                </article>
              </div>

              {/* Blog 3 - Takes 1/3 width */}
              <div
                ref={blog3Ref}
                className='group col-span-1 h-full cursor-pointer rounded-lg bg-orange-50 p-8 lg:col-span-1'
                onClick={() => handleBlogClick(BLOG_POSTS[2])}
              >
                <article>
                  <div>
                    <SectionSubheading
                      theme='light'
                      size='medium'
                      weight='bold'
                      maxWidth='2xl'
                      className='mb-3 group-hover:text-[#378727]'
                    >
                      {BLOG_POSTS[2].title}
                    </SectionSubheading>
                    <SectionDescription
                      theme='light'
                      size='small'
                      maxWidth='2xl'
                      className='group-hover:text-[#378727]'
                    >
                      {BLOG_POSTS[2].description}
                    </SectionDescription>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </AppLayoutPadding>
      </AppSectionPadding>
    </section>
  )
}

export default SectionBlogsList
