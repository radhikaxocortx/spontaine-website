import BlogContentRenderer from '@/components/BlogContentRenderer'
import { Button } from '@/components/ui/button'
import AppLayout from '@/Layouts/AppLayout'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { Page } from '@/Modules/PageBuilder/page_interfaces'
import { Link } from '@inertiajs/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Copy, Linkedin, Share2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

const ResourcesBanner = ({ post, onShareClick }: { post: Page; onShareClick: () => void }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [canToggleDescription, setCanToggleDescription] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, {
        opacity: 0,
        y: 40,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const el = descriptionRef.current

    if (!el) return

    const isOverflowing = el.scrollHeight > el.clientHeight

    setCanToggleDescription(isOverflowing)
  }, [post.description])

  return (
    <section
      ref={sectionRef}
      className='relative flex w-full flex-col items-center justify-center bg-white pt-16 text-black'
      data-banner-section='true'
    >
      <div
        ref={contentRef}
        className='relative z-10 flex w-full flex-col items-center justify-center px-6 pb-12 pt-10'
      >
        <div className='mx-auto max-w-3xl text-center'>
          <h1 className='mb-6 font-display text-[32px] font-semibold leading-tight text-spontaine-dark sm:text-[40px]'>
            {post.title}
          </h1>

          <div className='mb-4 flex items-center justify-center gap-6 text-base text-spontaine-dark'>
            {post.author && <span className='font-body tracking-wide'>{post.author}</span>}
            {post.created_at && (
              <span className='font-body tracking-wide'>
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}
          </div>

          <div className='mb-6 inline-block'>
            <button
              onClick={onShareClick}
              className='flex h-[50px] w-[50px] items-center justify-center rounded-full bg-spontaine-accent shadow-lg transition-all hover:bg-spontaine-accent-dark hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-spontaine-accent focus:ring-offset-2'
              aria-label='Share resource'
            >
              <Share2 className='h-6 w-6 text-white' />
            </button>
          </div>

          {post.description && (
            <div className='mx-auto max-w-2xl'>
              <p
                ref={descriptionRef}
                className={`font-body text-base leading-[1.8] text-gray-700 sm:text-lg ${
                  !isExpanded ? 'line-clamp-3' : ''
                }`}
              >
                {post.description}
              </p>
              {canToggleDescription && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className='mt-3 font-body text-sm font-medium text-spontaine-accent transition-colors hover:text-spontaine-accent-dark'
                >
                  {isExpanded ? '...less' : '...more'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

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
        href='/resources'
        className='font-space-grotesk text-xs hover:text-gray-900'
      >
        Resources
      </Link>
      <span className='mx-2 text-gray-400'>/</span>
      <span className='font-space-grotesk text-xs text-gray-900'>{postTitle}</span>
    </nav>
  </AppLayoutPadding>
)

interface ResourcePageProps {
  post: Page
}

const ResourcePage = ({ post }: ResourcePageProps) => {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const coverImage = post.cover_image || post.preview_image

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const currentUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/resource/${post.url?.replace(/^\//, '')}`
      : `/resource/${post.url?.replace(/^\//, '')}`

  const normalizedDownloadTarget =
    post.download_url == null || post.download_url.trim() === ''
      ? null
      : (() => {
          const normalized = post.download_url.startsWith('/')
            ? post.download_url
            : `/${post.download_url}`

          return normalized.replace(/^\/manage-media\/file\//, '/media/file/')
        })()

  const downloadLeadCaptureUrl =
    normalizedDownloadTarget == null
      ? null
      : `/resource-download?download=${encodeURIComponent(normalizedDownloadTarget)}&resource=${encodeURIComponent(post.title)}`

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
    } catch (err) {
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
      title={`${post.title} | Spontaine Resource`}
      description={post.description || ''}
      image={
        coverImage
          ? `https://spontaine.com${coverImage}`
          : 'https://spontaine.com/storage/images/8205df31-7880-4c23-902d-6b222d8174b5.png'
      }
      url={
        typeof window !== 'undefined'
          ? `${window.location.origin}/resource/${post.url?.replace(/^\//, '')}`
          : `https://spontaine.com/resource/${post.url?.replace(/^\//, '')}`
      }
    >
      <ResourcesBanner
        post={post}
        onShareClick={() => setShowShareMenu(!showShareMenu)}
      />

      <Breadcrumbs postTitle={post.title} />

      {showShareMenu && (
        <div className='fixed left-1/2 top-32 z-50 w-44 -translate-x-1/2 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
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

      <div className='min-h-screen bg-gray-50 py-6'>
        <AppLayoutPadding>
          {coverImage && (
            <div className='mb-6 py-4'>
              <div className='relative overflow-hidden rounded-2xl'>
                <img
                  src={coverImage}
                  alt={post.title}
                  className='w-full bg-spontaine-light object-cover'
                />
                {downloadLeadCaptureUrl && (
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <Button
                      asChild
                      size='lg'
                      className='relative overflow-hidden rounded-full bg-spontaine-accent py-6 text-spontaine-dark shadow-2xl'
                    >
                      <a
                        href={downloadLeadCaptureUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <span className='nav-cta-text'>Download Report</span>
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className='prose prose-lg mx-auto max-w-none'>
            <BlogContentRenderer post={post} />
          </div>
        </AppLayoutPadding>
      </div>
      <div className='pt-32'></div>
    </AppLayout>
  )
}

export default ResourcePage
