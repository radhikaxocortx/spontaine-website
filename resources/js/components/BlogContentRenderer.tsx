import ResolveComponent from '@/Modules/PageBuilder/Components/ResolveComponent'
import { Page } from '@/Modules/PageBuilder/page_interfaces'
import SectionSubheading from '@/typography/SectionSubheading'
import React, { Fragment } from 'react'

interface BlogContentRendererProps {
  post: Page
}

const BlogContentRenderer: React.FC<BlogContentRendererProps> = ({ post }) => {
  // If no blocks exist, show a message
  if (!post.blocks || !post.blocks.blocks || post.blocks.blocks.length === 0) {
    return (
      <div className='space-y-4'>
        <hr className='border-gray-200' />
        <div>
          <SectionSubheading
            theme='light'
            size='large'
            weight='bold'
            className='mb-4'
          >
            Content
          </SectionSubheading>
          <div className='rounded-lg bg-gray-50 p-6 text-center'>
            <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200'>
              <svg
                className='h-6 w-6 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
            </div>
            <h3 className='mb-2 text-lg font-medium text-gray-900'>Content Coming Soon</h3>
            <p className='text-gray-600'>
              This blog post is ready to read, but the detailed content is still being prepared.
              Check back soon for the full article!
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <hr className='border-gray-200' />
      <div>
        <SectionSubheading
          theme='light'
          size='large'
          weight='bold'
          className='mb-6'
        >
          Content
        </SectionSubheading>

        <div className='space-y-6'>
          {post.blocks.blocks.map((block) => (
            <Fragment key={block.id.toString()}>
              <div className='blog-block-wrapper overflow-hidden'>
                <ResolveComponent
                  key={block.id}
                  blockName={block.blockName}
                  block={block}
                  language={'en'}
                  dependencies={{}}
                  currentDate=''
                  editMode={false}
                />
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogContentRenderer
