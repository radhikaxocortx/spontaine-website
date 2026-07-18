import { Page } from '@/Modules/PageBuilder/page_interfaces'
import { CalendarDays, FileText } from 'lucide-react'

interface ResourceCardProps {
  readonly post: Page
  readonly onClick: (post: Page) => void
}

const ResourceCard = ({ post, onClick }: ResourceCardProps) => {
  const formattedDate =
    post.created_at != null
      ? new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : null

  return (
    <div
      role='button'
      tabIndex={0}
      onClick={() => onClick(post)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onClick(post)
        }
      }}
      className='group flex h-full min-h-[140px] cursor-pointer items-center gap-6 rounded-[16px] border border-slate-200/60 bg-slate-50 p-6 transition-all duration-200 hover:shadow-md'
    >
      {/* Image / Icon Block */}
      <div className='relative w-[80px] shrink-0'>
        <div className='aspect-[3/4] w-full overflow-hidden rounded-[14px] bg-gradient-to-br from-spontaine-accent/20 to-spontaine-accent-bright/20'>
          {post.preview_image ? (
            <img
              src={post.preview_image}
              alt={post.page_title}
              className='h-full w-full object-cover transition-transform duration-200 group-hover:scale-105'
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center text-slate-400'>
              <FileText className='h-5 w-5' />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className='flex min-w-0 flex-1 flex-col justify-center'>
        <h3 className='font-display text-[16px] font-semibold leading-[1.4] text-spontaine-dark transition-colors group-hover:text-spontaine-accent'>
          {post.page_title}
        </h3>

        <div className='mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-500'>
          {formattedDate && (
            <span className='inline-flex items-center gap-1.5 text-xs'>
              <CalendarDays className='h-3.5 w-3.5' />
              {formattedDate}
            </span>
          )}

          <span className='inline-flex items-center gap-1.5 text-xs'>
            <FileText className='h-3.5 w-3.5 text-xs' />
            {post.type}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ResourceCard
