import { Page } from '@/Modules/PageBuilder/page_interfaces'
import SectionSubheading from '@/typography/SectionSubheading'
import SectionTitle from '@/typography/SectionTitle'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import BlogContentRenderer from './BlogContentRenderer'

interface BlogDetailDrawerProps {
  isOpen: boolean
  post: Page | null
  onClose: () => void
}

const BlogDetailDrawer = ({ isOpen, post, onClose }: BlogDetailDrawerProps) => {
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
        className='relative flex h-[85vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl md:h-full md:w-3/4 md:rounded-l-3xl md:rounded-t-none'
      >
        {/* Header */}
        <div className='flex items-center justify-between border-b border-gray-200 p-6'>
          <div className='flex items-center space-x-2'>
            <div className='h-1 w-8 rounded-full bg-gray-300 md:hidden' />
            <span className='hidden text-sm font-medium text-gray-500 md:block'>Blog Detail</span>
          </div>

          <button
            ref={closeButtonRef}
            onClick={handleClose}
            className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2'
            aria-label='Close blog detail'
          >
            <X className='h-5 w-5' />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto'>
          <div className='space-y-6 p-6'>
            {/* Featured Image */}
            {post.preview_image && (
              <div className='aspect-video overflow-hidden rounded-2xl'>
                <img
                  src={post.preview_image}
                  alt={post.title}
                  className='h-full w-full object-cover'
                />
              </div>
            )}

            {/* Meta Information */}
            <div className='flex items-center gap-4 text-sm text-gray-500'>
              <span className='font-medium capitalize'>{post.type}</span>
              <span>•</span>
              <span>
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            {/* Title */}
            <div id='drawer-title'>
              <SectionTitle
                theme='light'
                className='mb-4'
              >
                {post.title}
              </SectionTitle>
            </div>

            {/* Description/Excerpt */}
            {post.description && (
              <div>
                <SectionSubheading
                  theme='light'
                  size='medium'
                  weight='semibold'
                  className='leading-relaxed text-gray-600'
                >
                  {post.description}
                </SectionSubheading>
              </div>
            )}

            {/* Real Content from Page Builder Blocks */}
            <BlogContentRenderer post={post} />

            {/* Preview Video - if available */}
            {post.preview_video && (
              <div className='space-y-4'>
                <hr className='border-gray-200' />
                <div>
                  <SectionSubheading
                    theme='light'
                    size='large'
                    weight='bold'
                    className='mb-4'
                  >
                    Video
                  </SectionSubheading>

                  <div className='aspect-video overflow-hidden rounded-2xl bg-gray-100'>
                    <video
                      src={post.preview_video}
                      controls
                      className='h-full w-full object-cover'
                      preload='metadata'
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            )}

            {/* Tags - if available */}
            <div className='border-t border-gray-200 pt-6'>
              <div className='flex flex-wrap gap-2'>
                <span className='inline-flex items-center rounded-full bg-lime-100 px-3 py-1 text-sm font-medium text-lime-800'>
                  {post.type}
                </span>
                {post.featured && (
                  <span className='inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800'>
                    Featured
                  </span>
                )}
                {post.published ? (
                  <span className='inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800'>
                    Published
                  </span>
                ) : (
                  <span className='inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800'>
                    Draft
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetailDrawer
