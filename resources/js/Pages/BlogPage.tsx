import BlogContentRenderer from '@/components/BlogContentRenderer'
import AppLayout from '@/Layouts/AppLayout'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { Page } from '@/Modules/PageBuilder/page_interfaces'
import SectionDescription from '@/typography/SectionDescription'
import SectionSubheading from '@/typography/SectionSubheading'
import SectionTitle from '@/typography/SectionTitle'
import { Link } from '@inertiajs/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Copy, Linkedin, Share2 } from 'lucide-react'
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
const Breadcrumbs = ({ postTitle }: { postTitle: string }) => (
  <AppLayoutPadding>
    <nav className='flex items-center space-x-1 py-4 text-sm text-gray-600'>
      <Link
        href='/'
        className='font-space-grotesk text-xs hover:text-gray-900'
      >
        Home
      </Link>
      <span className='mx-2 text-gray-400'>/</span>
      <Link
        href='/blogs-list'
        className='font-space-grotesk text-xs hover:text-gray-900'
      >
        Blogs
      </Link>
      <span className='mx-2 text-gray-400'>/</span>
      <span className='font-space-grotesk text-xs text-gray-900'>{postTitle}</span>
    </nav>
  </AppLayoutPadding>
)

interface BlogPageProps {
  post: Page
}

const BlogPage = ({ post }: BlogPageProps) => {
  const [showShareMenu, setShowShareMenu] = useState(false)

  const currentUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/blog/${post.url?.replace(/^\//, '')}`
      : `/blog/${post.url?.replace(/^\//, '')}`

  const shareUrls = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${post.title} - ${currentUrl}`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
  }

  const handleShare = (platform: keyof typeof shareUrls) => {
    if (typeof window !== 'undefined') {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    }
    setShowShareMenu(false)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setShowShareMenu(false)
      // You could add a toast notification here
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = currentUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setShowShareMenu(false)
    }
  }

  return (
    <AppLayout
      title={`${post.title} | Spontaine Blog`}
      description={post.description || ''}
      image={post.preview_image || 'https://spontaine.com/storage/images/16.png'}
      url={
        typeof window !== 'undefined'
          ? `${window.location.origin}/blog/${post.url?.replace(/^\//, '')}`
          : `https://spontaine.com/blog/${post.url?.replace(/^\//, '')}`
      }
    >
      {/* Banner Section */}
      <BlogsBanner />

      {/* Breadcrumbs */}
      <Breadcrumbs postTitle={post.title} />

      <div className='min-h-screen bg-gray-50 py-6'>
        <AppLayoutPadding>
          <div className='flex flex-col items-center justify-center'>
            {/* Header Section */}
            <div className='text-center'>
              <SectionSubheading
                theme='light'
                size='2xl'
                weight='bold'
                className='mb-6'
              >
                {post.title}
              </SectionSubheading>

              {/* Author and Date */}
              <div className='flex items-center justify-center gap-4 text-gray-600'>
                {post.author && (
                  <span className='font-urbanist text-sm font-semibold'>{post.author}</span>
                )}
                {post.created_at && (
                  <span className='text-sm'>
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                )}
              </div>

              {/* Share Button */}
              <div className='relative inline-block py-2'>
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className='flex h-8 w-8 items-center justify-center rounded-full bg-lime-500 text-white shadow-lg transition-all hover:bg-lime-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2'
                >
                  <Share2 className='h-4 w-4' />
                </button>

                {/* Share Menu */}
                {showShareMenu && (
                  <div className='absolute right-0 top-full z-10 mt-2 w-44 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
                    <div className='py-1'>
                      <button
                        onClick={handleCopyLink}
                        className='flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      >
                        <Copy className='h-4 w-4 text-gray-500' />
                        Copy Link
                      </button>
                      <button
                        onClick={() => handleShare('whatsapp')}
                        className='flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      >
                        <svg
                          className='h-4 w-4 text-green-500'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382z' />
                        </svg>
                        WhatsApp
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className='flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      >
                        <Linkedin className='h-4 w-4 text-blue-700' />
                        LinkedIn
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Featured Image */}
            {post.preview_image && (
              <div className='mb-6 py-4'>
                <div className='overflow-hidden rounded-2xl'>
                  <img
                    src={post.preview_image}
                    alt={post.title}
                    className='w-full object-cover'
                  />
                </div>
              </div>
            )}

            {/* Content Section */}
            <div className='prose prose-lg mx-auto max-w-none'>
              <BlogContentRenderer post={post} />
            </div>
          </div>
        </AppLayoutPadding>
      </div>
    </AppLayout>
  )
}

export default BlogPage
