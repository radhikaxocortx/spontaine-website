import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { cn } from '@/lib/utils'
import { Link } from '@inertiajs/react'
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
  link: string
}

interface SectionBlogsListProps {
  className?: string
}

// Static blog data
const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title:
      "The C-Suite's Dirty Secret: Why Best Strategy Discussions Start With Data Reconciliation",
    description:
      "Every Monday morning, executives face the same embarrassing ritual: spending the first half of their strategy meetings figuring out which numbers are actually right. While they're reconciling conflicting reports, their highest-performing competitors have already moved on to making decisions with data they actually trust.",
    image: '/imge/home/blogs/people.png',
    link: '/blog1',
  },
  {
    id: 2,
    title: 'Why Traditional BI Tools Fail for SMEs (and What to Do Instead)',
    description:
      'Discover how artificial intelligence can streamline operations, enhance decision-making, and drive growth, helping you stay competitive in a rapidly evolving market',
    image: '/imge/home/blogs/calculator.png',
    link: '/blog2',
  },
  {
    id: 3,
    title: 'A Perfect Lever: 80% of Transformative Value : 10% effort',
    description:
      'Discover how artificial intelligence can streamline operations, enhance decision-making, and drive growth, helping you stay competitive in a rapidly evolving market',
    image: '',
    link: '/blog3',
  },
]

const SectionBlogsList = ({ className }: SectionBlogsListProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const blog1Ref = useRef<HTMLDivElement>(null)
  const blog2Ref = useRef<HTMLDivElement>(null)
  const blog3Ref = useRef<HTMLDivElement>(null)

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
      className={cn('bg-white py-16', className)}
    >
      <AppLayoutPadding>
        {/* Header Section */}
        <div className='mb-16 text-center'>
          <h2 className="mb-6 font-['Urbanist'] text-5xl font-normal leading-tight text-black">
            Navigating a Tech-Driven Future Does Not
            <br />
            Need You To Be A Developer
          </h2>
          <div className='mx-auto max-w-2xl space-y-2'>
            <p className="font-['Space_Grotesk'] text-lg font-semibold text-black">
              We are at an inflection point.
            </p>
            <p className="font-['Space_Grotesk'] text-base font-light leading-relaxed text-black">
              With generative AI reshaping industries at unprecedented speed,
              <br />
              there is false pressure on executives to become technical experts.
            </p>
          </div>
        </div>

        {/* Blog Posts */}
        <div className='space-y-8'>
          {/* Blog 1 - Full Width */}
          <Link href={BLOG_POSTS[0].link}>
            <div
              ref={blog1Ref}
              className='group cursor-pointer rounded-lg bg-white p-8 transition-shadow duration-300 hover:shadow-lg'
            >
              <article>
                <div className='grid grid-cols-1 items-center gap-8 lg:grid-cols-5'>
                  {/* Left Side - Content (1/3) */}
                  <div className='lg:col-span-2'>
                    <h3 className="mb-4 font-['Urbanist'] text-3xl font-bold leading-tight text-black">
                      {BLOG_POSTS[0].title}
                    </h3>
                    <p className="font-['Space_Grotesk'] text-base font-light leading-relaxed text-gray-700">
                      {BLOG_POSTS[0].description}
                    </p>
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
          </Link>

          {/* Blog 2 & 3 - Side by Side */}
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
            {/* Blog 2 - Takes 2/3 width */}
            <Link
              href={BLOG_POSTS[1].link}
              className='group cursor-pointer rounded-lg bg-gray-200 transition-shadow duration-300 hover:shadow-lg lg:col-span-2'
            >
              <div
                ref={blog2Ref}
                className='h-full'
              >
                <article>
                  <div className='grid h-full grid-cols-1 lg:grid-cols-2'>
                    {/* Left Side - Content */}
                    <div className='flex flex-col justify-center p-8'>
                      <h3 className="mb-4 font-['Urbanist'] text-2xl font-bold leading-tight text-black">
                        {BLOG_POSTS[1].title}
                      </h3>
                      <p className="font-['Space_Grotesk'] text-base font-light leading-relaxed text-gray-700">
                        {BLOG_POSTS[1].description}
                      </p>
                    </div>
                    {/* Right Side - Image */}
                    <div className='relative h-full min-h-[300px] overflow-hidden rounded-r-lg'>
                      <img
                        src={BLOG_POSTS[1].image}
                        alt={BLOG_POSTS[1].title}
                        className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                      />
                    </div>
                  </div>
                </article>
              </div>
            </Link>

            {/* Blog 3 - Takes 1/3 width */}
            <Link
              href={BLOG_POSTS[2].link}
              className='group col-span-1 cursor-pointer rounded-lg bg-orange-50 p-8 transition-shadow duration-300 hover:shadow-lg lg:col-span-1'
            >
              <div
                ref={blog3Ref}
                className='h-full'
              >
                <article>
                  <div>
                    <h3 className="mb-4 font-['Urbanist'] text-xl font-bold leading-tight text-black">
                      {BLOG_POSTS[2].title}
                    </h3>
                    <p className="font-['Space_Grotesk'] text-sm font-light leading-relaxed text-gray-700">
                      {BLOG_POSTS[2].description}
                    </p>
                  </div>
                </article>
              </div>
            </Link>
          </div>
        </div>
      </AppLayoutPadding>
    </section>
  )
}

export default SectionBlogsList
