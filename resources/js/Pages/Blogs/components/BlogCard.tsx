import { BlogCardProps } from '@/components/ui/ui_interfaces'
import SectionBody from '@/typography/SectionBody'

const BlogCard = ({ post, stacked = false, aspectRatio = '', onClick }: BlogCardProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onClick?.(post)
  }

  if (!stacked) {
    return (
      <div
        onClick={handleClick}
        className='group block cursor-pointer overflow-hidden'
      >
        <div className='grid grid-cols-2 gap-4'>
          {/* thumbnail image  */}
          <div className='overflow-hidden rounded-lg'>
            {post.preview_image ? (
              <img
                src={post.preview_image}
                alt={post.page_title}
                className='w-full rounded-lg object-cover transition-transform group-hover:scale-105'
              />
            ) : (
              <div className='flex h-64 w-full items-center justify-center rounded-lg bg-gray-200 text-gray-400 lg:h-80'>
                <span className='text-sm'>No Image</span>
              </div>
            )}
          </div>

          {/* Featured Content */}
          <div className='flex flex-col'>
            {/* Title */}
            <h3 className='font-heading text-2xl font-bold text-spontaine-dark group-hover:text-spontaine-accent-footer'>
              {post.page_title}
            </h3>

            {/* Description */}
            <p className='line-clamp-3 font-body text-base text-spontaine-gray group-hover:text-spontaine-accent-footer'>
              {post.description}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Big card for featured posts
  return (
    <div
      onClick={handleClick}
      className='group block cursor-pointer overflow-hidden'
    >
      {/* Image */}
      <div className={`${aspectRatio} overflow-hidden rounded-lg`}>
        {post.preview_image ? (
          <img
            src={post.preview_image}
            alt={post.page_title}
            className='w-full rounded-lg object-cover object-center transition-transform group-hover:scale-105'
          />
        ) : (
          <div className='flex aspect-video items-center justify-center bg-gray-200 text-gray-400'>
            <span className='text-sm'>No Image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className='space-y-2'>
        {/* Author and Date */}
        <div className='flex items-center gap-2 py-2 text-xs text-gray-500'>
          <SectionBody
            theme='light'
            size='sm'
            weight='normal'
            className='text-gray-500 group-hover:text-spontaine-accent-footer'
          >
            {post.author && `${post.author} • `}
            {post.created_at && new Date(post.created_at).toLocaleDateString()}
          </SectionBody>
        </div>

        {/* Title */}
        <h3 className='font-heading text-2xl font-bold text-spontaine-dark group-hover:text-spontaine-accent-footer'>
          {post.page_title}
        </h3>

        {/* Description */}
        <p className='line-clamp-3 font-body text-base text-spontaine-gray group-hover:text-spontaine-accent-footer'>
          {post.description}
        </p>
      </div>
    </div>
  )
}

export default BlogCard
