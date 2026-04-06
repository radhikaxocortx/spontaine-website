import { Page } from '@/Modules/PageBuilder/page_interfaces'
import { useEffect, useState } from 'react'

interface UseBlogDrawerProps {
  featuredPosts: Page[]
  allPosts: Page[]
  selectedBlogSlug?: string
}

interface UseBlogDrawerReturn {
  isDrawerOpen: boolean
  selectedPost: Page | null
  handlePostClick: (post: Page) => void
  handleCloseDrawer: () => void
}

export const useBlogDrawer = ({
  featuredPosts,
  allPosts,
  selectedBlogSlug,
}: UseBlogDrawerProps): UseBlogDrawerReturn => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Page | null>(null)

  // Helper function to find post by slug from URL
  const findPostBySlug = (slug: string): Page | null => {
    const allBlogPosts = [...featuredPosts, ...allPosts]
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
        // Ensure page starts at top when loading with a blog slug
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 100)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBlogSlug, featuredPosts, allPosts])

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

    // Clear selected post after animation completes
    setTimeout(() => {
      setSelectedPost(null)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featuredPosts, allPosts])

  return {
    isDrawerOpen,
    selectedPost,
    handlePostClick,
    handleCloseDrawer,
  }
}
