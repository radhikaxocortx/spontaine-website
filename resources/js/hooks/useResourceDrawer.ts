import { Page } from '@/Modules/PageBuilder/page_interfaces'
import { useEffect, useState } from 'react'

interface UseResourceDrawerProps {
  featuredPosts: Page[]
  allPosts: Page[]
  selectedResourceSlug?: string
}

interface UseResourceDrawerReturn {
  isDrawerOpen: boolean
  selectedPost: Page | null
  handlePostClick: (post: Page) => void
  handleCloseDrawer: () => void
}

export const useResourceDrawer = ({
  featuredPosts,
  allPosts,
  selectedResourceSlug,
}: UseResourceDrawerProps): UseResourceDrawerReturn => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Page | null>(null)

  const findPostBySlug = (slug: string): Page | null => {
    const allResourcePosts = [...featuredPosts, ...allPosts]
    return (
      allResourcePosts.find(
        (post) =>
          post.url === slug ||
          post.url === `/${slug}` ||
          post.url === `/resources/${slug}` ||
          post.url === `/resource/${slug}`
      ) || null
    )
  }

  useEffect(() => {
    if (selectedResourceSlug == null) {
      return
    }

    const post = findPostBySlug(selectedResourceSlug)
    if (post == null) {
      return
    }

    setSelectedPost(post)
    setIsDrawerOpen(true)

    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedResourceSlug, featuredPosts, allPosts])

  const handlePostClick = (post: Page) => {
    setSelectedPost(post)
    setIsDrawerOpen(true)

    const resourceSlug = post.url.startsWith('/') ? post.url.substring(1) : post.url
    const newUrl = `/resources/${resourceSlug}`

    window.history.replaceState({}, '', newUrl)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    window.history.replaceState({}, '', '/resources')

    setTimeout(() => {
      setSelectedPost(null)
    }, 500)
  }

  useEffect(() => {
    const handlePopState = () => {
      const currentPath = window.location.pathname
      if (currentPath === '/resources') {
        setIsDrawerOpen(false)
        setSelectedPost(null)
      } else if (currentPath.startsWith('/resources/')) {
        const slug = currentPath.replace('/resources/', '')
        const post = findPostBySlug(slug)
        if (post == null) {
          window.history.replaceState({}, '', '/resources')
          setIsDrawerOpen(false)
          setSelectedPost(null)
          return
        }

        setSelectedPost(post)
        setIsDrawerOpen(true)
      } else if (currentPath.startsWith('/resource/')) {
        const slug = currentPath.replace('/resource/', '')
        const post = findPostBySlug(slug)
        if (post == null) {
          window.history.replaceState({}, '', '/resources')
          setIsDrawerOpen(false)
          setSelectedPost(null)
          return
        }

        setSelectedPost(post)
        setIsDrawerOpen(true)
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
