import { Page } from '@/Modules/PageBuilder/page_interfaces'
import SectionSubheading from '@/typography/SectionSubheading'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
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
          className='absolute -left-5 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2'
          aria-label='Close blog detail'
        >
          <X className='h-3 w-3' />
        </button>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto p-10'>
          <div className='relative'>
            {/* Header Section with Title and Author */}
            <div className='px-12 pb-6 pt-16'>
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
                <div className='flex items-center gap-3 md:flex-shrink-0'>
                  {/* Author Info */}
                  <div className='flex flex-col pr-10'>
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
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {post.preview_image && (
              <div className='px-12 pb-6'>
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
            <div className='space-y-1 px-12'>
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
