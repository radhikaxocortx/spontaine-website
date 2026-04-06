import { Page } from '@/Modules/PageBuilder/page_interfaces'
import ResourceCard from '@/Pages/Resources/components/ResourceCard'
import { Link } from '@inertiajs/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface AllResourcesProps {
  posts: Page[]
  currentPage: number
  lastPage: number
  resourceTabs: Array<{
    type: string
    count: number
  }>
  activeResourceType: string | null
  onPostClick: (post: Page) => void
}

const AllResources = ({
  posts,
  currentPage,
  lastPage,
  resourceTabs,
  activeResourceType,
  onPostClick,
}: AllResourcesProps) => {
  const allResourcesSectionRef = useRef<HTMLElement>(null)
  const allResourceCardsRef = useRef<HTMLDivElement[]>([])
  const tabsWithItems = resourceTabs.filter((tab) => tab.count > 0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const allResourceCards = allResourceCardsRef.current.filter(Boolean)

      gsap.set(allResourceCards, {
        opacity: 0,
        y: 80,
      })

      allResourceCards.forEach((ref, index) => {
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
            delay: index * 0.1,
          })
        }
      })
    }, allResourcesSectionRef)

    return () => ctx.revert()
  }, [posts.length])

  useEffect(() => {
    allResourceCardsRef.current = []
  }, [activeResourceType, currentPage])

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

  const buildResourcesHref = (page: number, type: string | null) => {
    const params = new URLSearchParams()

    if (page > 1) {
      params.set('page', page.toString())
    }

    if (type) {
      params.set('type', type)
    }

    const query = params.toString()
    return query.length > 0 ? `/resources?${query}` : '/resources'
  }

  return (
    <section
      ref={allResourcesSectionRef}
      className='rounded-[24px] border border-slate-100 bg-white p-10 pb-28 shadow-sm'
    >
      <h2 className='py-4 font-heading text-[36px] font-bold text-slate-900 sm:text-[44px]'>
        All Resources
      </h2>

      {tabsWithItems.length > 0 && (
        <div className='mb-10 mt-8 flex flex-wrap items-end gap-8 border-b border-slate-200'>
          {tabsWithItems.map((tab) => {
            const isActive = tab.type === activeResourceType

            return (
              <Link
                key={tab.type}
                href={buildResourcesHref(1, tab.type)}
                className={`rounded-t-xl px-4 py-2 font-body text-[15px] font-semibold transition-all duration-200 ${
                  isActive
                    ? 'border border-spontaine-accent border-b-white bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                {tab.type}
              </Link>
            )
          })}
        </div>
      )}

      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-2'>
        {posts.map((post, index) => (
          <div
            key={post.id}
            ref={(el) => {
              if (el) {
                allResourceCardsRef.current[index] = el
              }
            }}
          >
            <ResourceCard
              post={post}
              onClick={onPostClick}
            />
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className='py-28 text-center'>
          <p className='font-body text-[18px] text-slate-500'>
            No resources found for this category.
          </p>
        </div>
      )}

      {lastPage > 1 && (
        <div className='mt-28 flex flex-wrap items-center justify-center gap-2'>
          {currentPage > 1 && (
            <Link
              href={buildResourcesHref(currentPage - 1, activeResourceType)}
              className='flex items-center gap-1 rounded-full border border-slate-200 px-14 py-8 text-[14px] text-slate-600 transition-colors hover:bg-slate-50'
            >
              <ChevronLeft className='h-4 w-4' />
              Previous
            </Link>
          )}

          {generatePageNumbers().map((pageNum) => (
            <Link
              key={pageNum}
              href={buildResourcesHref(pageNum, activeResourceType)}
              className={`rounded-full px-14 py-8 text-[14px] font-medium transition-colors ${
                pageNum === currentPage
                  ? 'bg-spontaine-accent text-slate-900'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {pageNum}
            </Link>
          ))}

          {currentPage < lastPage && (
            <Link
              href={buildResourcesHref(currentPage + 1, activeResourceType)}
              className='flex items-center gap-1 rounded-full border border-slate-200 px-14 py-8 text-[14px] text-slate-600 transition-colors hover:bg-slate-50'
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

export default AllResources
