import { Page } from '@/Modules/PageBuilder/page_interfaces'
import { Link } from '@inertiajs/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import BlogCard from './BlogCard'

gsap.registerPlugin(ScrollTrigger)

interface AllPostsProps {
  posts: Page[]
  currentPage: number
  lastPage: number
  onPostClick: (post: Page) => void
}

const AllPosts = ({ posts, currentPage, lastPage, onPostClick }: AllPostsProps) => {
  const allPostsSectionRef = useRef<HTMLElement>(null)
  const allPostsCardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, allPostsSectionRef)

    return () => ctx.revert()
  }, [posts.length])

  const generatePageNumbers = () => {
    const pages = []
    const maxVisible = 5
    const start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    const end = Math.min(lastPage, start + maxVisible - 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <section ref={allPostsSectionRef}>
      <h2 className='py-4 font-display text-4xl font-bold text-spontaine-dark'>All Posts</h2>

      {/* Posts Grid */}
      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {posts.map((post, index) => (
          <div
            key={post.id}
            ref={(el) => (allPostsCardsRef.current[index] = el!)}
          >
            <BlogCard
              post={post}
              stacked={true}
              onClick={onPostClick}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {lastPage > 1 && (
        <div className='flex items-center justify-center gap-2'>
          {/* Previous Button */}
          {currentPage > 1 && (
            <Link
              href={`/blogs-list?page=${currentPage - 1}`}
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
                pageNum === currentPage
                  ? 'bg-lime-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {pageNum}
            </Link>
          ))}

          {/* Next Button */}
          {currentPage < lastPage && (
            <Link
              href={`/blogs-list?page=${currentPage + 1}`}
              className='flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100'
            >
              Next
              <ChevronRight className='h-4 w-4' />
            </Link>
          )}
        </div>
      )}
    </section>
  )
}

export default AllPosts
