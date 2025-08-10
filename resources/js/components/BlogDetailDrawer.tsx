import { Page } from '@/Modules/PageBuilder/page_interfaces'
import SectionSubheading from '@/typography/SectionSubheading'
import { gsap } from 'gsap'
import { Copy, Linkedin, Share2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import BlogContentRenderer from './BlogContentRenderer'

interface BlogDetailDrawerProps {
  isOpen: boolean
  post: Page | null
  onClose: () => void
  relatedPosts?: Page[]
  onPostClick?: (post: Page) => void
}

const BlogDetailDrawer = ({
  isOpen,
  post,
  onClose,
  relatedPosts = [],
  onPostClick,
}: BlogDetailDrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [previousFocusedElement, setPreviousFocusedElement] = useState<HTMLElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [showShareMenu, setShowShareMenu] = useState(false)

  // Handle opening animation
  useEffect(() => {
    if (isOpen && post) {
      // Store previously focused element for accessibility
      setPreviousFocusedElement(document.activeElement as HTMLElement)

      // Disable body scroll
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = getScrollbarWidth() + 'px'

      setIsAnimating(true)

      // Initial state
      gsap.set(overlayRef.current, { opacity: 0 })
      gsap.set(contentRef.current, {
        x: window.innerWidth > 768 ? '100%' : 0,
        y: window.innerWidth > 768 ? 0 : '100%',
      })

      // Animate in
      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false)
          // Focus the close button for accessibility
          closeButtonRef.current?.focus()
        },
      })

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      }).to(
        contentRef.current,
        {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: 'power3.out',
        },
        '-=0.1'
      )
    }
  }, [isOpen, post])

  // Handle closing animation
  const handleClose = () => {
    if (isAnimating) return

    setIsAnimating(true)

    const tl = gsap.timeline({
      onComplete: () => {
        // Re-enable body scroll
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''

        // Restore focus to previously focused element
        if (previousFocusedElement) {
          previousFocusedElement.focus()
        }

        onClose()
        setIsAnimating(false)
      },
    })

    tl.to(contentRef.current, {
      x: window.innerWidth > 768 ? '100%' : 0,
      y: window.innerWidth > 768 ? 0 : '100%',
      duration: 0.4,
      ease: 'power3.in',
    }).to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      },
      '-=0.2'
    )
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  // Focus trap
  useEffect(() => {
    if (!isOpen) return

    const focusableElements = drawerRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>

    if (!focusableElements || focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTabKey)
    return () => document.removeEventListener('keydown', handleTabKey)
  }, [isOpen])

  // Handle content update animation when post changes
  useEffect(() => {
    if (!isOpen || !post || !contentRef.current) return

    // Smooth content transition when post changes
    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
    )
  }, [post?.id, isOpen])

  // Get scrollbar width for proper padding adjustment
  const getScrollbarWidth = () => {
    const outer = document.createElement('div')
    outer.style.visibility = 'hidden'
    outer.style.overflow = 'scroll'
    document.body.appendChild(outer)

    const inner = document.createElement('div')
    outer.appendChild(inner)

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth
    outer.parentNode?.removeChild(outer)

    return scrollbarWidth
  }

  // Share functionality
  const currentUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/blog/${post?.url?.replace(/^\//, '') || ''}`
      : ''

  const shareUrls = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${post?.title} - ${currentUrl}`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
  }

  const handleShare = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400')
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

  if (!isOpen || !post) return null

  return (
    <div
      ref={drawerRef}
      className='fixed inset-0 z-50 flex items-end justify-end md:items-center'
      role='dialog'
      aria-modal='true'
      aria-labelledby='drawer-title'
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={handleClose}
        aria-hidden='true'
      />

      {/* Drawer Content */}
      <div
        ref={contentRef}
        className='relative flex h-[85vh] w-full flex-col overflow-visible rounded-t-3xl bg-white shadow-2xl md:h-full md:w-3/4 md:rounded-l-3xl md:rounded-t-none'
      >
        {/* Close Button - Half Outside Drawer */}
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          className='absolute -top-2 right-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 md:-left-5 md:top-6'
          aria-label='Close blog detail'
        >
          <X className='h-3 w-3' />
        </button>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto p-2 md:p-10'>
          <div className='relative'>
            {/* Header Section with Title and Author */}
            <div className='px-4 pb-2 pt-6 md:px-12 md:pb-6 md:pt-16'>
              <div className='flex flex-col md:flex-row md:items-start md:justify-between'>
                {/* Title Section */}
                <div
                  className='flex-1'
                  id='drawer-title'
                >
                  <SectionSubheading
                    theme='light'
                    size='2xl'
                    weight='bold'
                    maxWidth='2xl'
                    className='mb-3'
                  >
                    {post.title}
                  </SectionSubheading>
                </div>

                {/* Author Section - Top Right */}
                <div className='flex items-center justify-center gap-3 md:flex-shrink-0'>
                  {/* Author Info */}
                  <div className='flex flex-col pr-10 pt-1'>
                    {post.author && (
                      <span className='font-urbanist text-sm font-semibold text-gray-900'>
                        {post.author}
                      </span>
                    )}
                    {post.created_at && (
                      <span className='text-xs text-gray-500'>
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                    {/* Share Button - Below Close Button */}
                    <div className='relative flex w-full items-center justify-center py-2'>
                      <button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className='flex h-8 w-8 items-center justify-center rounded-full bg-lime-500 text-white shadow-lg transition-all hover:bg-lime-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2'
                        aria-label='Share blog post'
                        title='Share this blog post'
                      >
                        <Share2 className='h-4 w-4' />
                      </button>

                      {/* Share Dropdown Menu */}
                      {showShareMenu && (
                        <div className='absolute right-0 top-full z-20 mt-2 w-44 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
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
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {post.preview_image && (
              <div className='px-2 pb-2 md:px-12 md:pb-6'>
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
            <div className='space-y-1'>
              {/* Description/Excerpt */}
              {/* {post.description && (
                <div>
                  <SectionSubheading
                    theme='light'
                    size='small'
                    weight='semibold'
                    className='leading-relaxed text-gray-600'
                  >
                    {post.description}
                  </SectionSubheading>
                </div>
              )} */}

              {/* Real Content from Page Builder Blocks */}
              <BlogContentRenderer post={post} />

              {/* Latest Posts Section */}
              {relatedPosts.length > 0 && (
                <div className='mt-12 border-t border-gray-200 pt-8'>
                  <h3 className='mb-6 text-xl font-bold text-gray-900'>Latest Posts</h3>
                  <div className='grid gap-6 md:grid-cols-3'>
                    {relatedPosts.slice(0, 3).map((relatedPost) => (
                      <div
                        key={relatedPost.id}
                        onClick={() => onPostClick?.(relatedPost)}
                        className='group cursor-pointer'
                      >
                        {/* Post Image */}
                        <div className='mb-3 aspect-video overflow-hidden rounded-lg bg-gray-200'>
                          {relatedPost.preview_image ? (
                            <img
                              src={relatedPost.preview_image}
                              alt={relatedPost.title}
                              className='h-full w-full object-cover transition-transform group-hover:scale-105'
                            />
                          ) : (
                            <div className='flex h-full w-full items-center justify-center text-gray-400'>
                              <span className='text-sm'>No Image</span>
                            </div>
                          )}
                        </div>

                        {/* Post Date */}
                        {relatedPost.created_at && (
                          <p className='mb-2 text-xs text-gray-500'>
                            {new Date(relatedPost.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        )}

                        {/* Post Title */}
                        <h4 className='mb-2 line-clamp-2 text-base font-semibold text-gray-900 group-hover:text-[#378727]'>
                          {relatedPost.title}
                        </h4>

                        {/* Post Description */}
                        {relatedPost.description && (
                          <p className='line-clamp-2 text-sm text-gray-600 group-hover:text-gray-800'>
                            {relatedPost.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetailDrawer
