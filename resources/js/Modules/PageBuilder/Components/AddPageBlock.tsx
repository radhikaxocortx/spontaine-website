import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useState } from 'react'

const pageBlocks = [
  {
    name: 'Home - Hero Section',
    description: 'A prominent hero section with heading, subheading and call-to-action',
    icon: '🎯',
  },
  {
    name: 'Home - Company Marquee',
    description: 'Showcase company logos or partners in a scrolling marquee',
    icon: '🏢',
  },
  {
    name: 'Home - Image Cards',
    description: 'Display content in a grid of image cards',
    icon: '🖼️',
  },
  {
    name: 'Home - Banner With Image',
    description: 'A banner section with background image and text overlay',
    icon: '🎨',
  },
  {
    name: 'Home - Video Section',
    description: 'Embed and showcase video content',
    icon: '🎥',
  },
  {
    name: 'Home - Testimonial Section',
    description: 'Display customer testimonials and reviews',
    icon: '💬',
  },
  {
    name: 'Home - Call To Action',
    description: 'A section to drive user action with prominent buttons',
    icon: '📢',
  },
  {
    name: 'Home - Grid With Video',
    description: 'A grid layout featuring video content',
    icon: '📺',
  },
  {
    name: 'Home - Full Width Image With Title',
    description: 'Large full-width image with title overlay',
    icon: '🖼️',
  },
  {
    name: 'Content Section - FAQ Style Accordion with Links',
    description: 'Expandable FAQ sections with links',
    icon: '❓',
  },
  {
    name: 'Content Section - Contact Us',
    description: 'Contact form and information section',
    icon: '📞',
  },
  {
    name: 'Content Section - Price Plan',
    description: 'Display pricing plans and packages',
    icon: '💰',
  },
  {
    name: 'Sample - Left Image',
    description: 'Content with left-aligned image',
    icon: '🖼️',
  },
  {
    name: 'Formatted Text',
    description: 'Rich text content with formatting options',
    icon: '📝',
  },
  {
    name: 'Spontaine - Banner Section',
    description: 'Full-width banner with Ken Burns effect and left-aligned content',
    icon: '🎭',
  },
  {
    name: 'Spontaine - Breadcrumbs',
    description: 'Navigation breadcrumbs with customizable links and styling',
    icon: '🍞',
  },
  {
    name: 'Spontaine - Carousel',
    description: 'Full-width responsive image carousel with smooth GSAP animations',
    icon: '🎠',
  },
]

interface Properties {
  onBlockAdd: (block: string, position: 'top' | 'end') => void
}

const AddPageBlock = ({ onBlockAdd }: Properties) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null)

  const filteredBlocks = pageBlocks.filter(
    (block) =>
      block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Accordion
      type='single'
      collapsible
      className='w-full bg-white'
    >
      <AccordionItem
        value='blocks'
        className='border-none'
      >
        <AccordionTrigger className='group rounded-lg border border-gray-200 bg-secondary-50 px-6 py-4 transition-all duration-200 hover:bg-secondary-100 hover:no-underline hover:shadow-md'>
          <div className='flex w-full flex-col items-start'>
            <h3 className='text-lg font-medium text-gray-900'>Styled Building Blocks</h3>
            <p className='mt-1 text-sm text-gray-500'>
              Choose from a variety of pre-styled components to build your page
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent className='mt-4'>
          <div className='h-[400px] overflow-y-auto bg-white'>
            <div className='flex w-full justify-end px-2 py-4'>
              <div className='w-64'>
                <input
                  type='text'
                  placeholder='Search blocks...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
              {filteredBlocks.map((block) => (
                <div
                  key={block.name}
                  className='group relative cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-blue-500 hover:shadow-md'
                  onMouseEnter={() => setHoveredBlock(block.name)}
                  onMouseLeave={() => setHoveredBlock(null)}
                >
                  <div className='mb-2 text-2xl'>{block.icon}</div>
                  <h3 className='mb-1 text-lg font-medium text-gray-900'>{block.name}</h3>
                  <p className='text-sm text-gray-500'>{block.description}</p>

                  {/* Hover Buttons */}
                  {hoveredBlock === block.name && (
                    <div className='absolute inset-0 flex items-center justify-center gap-2 rounded-lg bg-black/50 backdrop-blur-sm'>
                      <button
                        onClick={() => onBlockAdd(block.name, 'top')}
                        className='rounded-md bg-primary-950 px-3 py-1.5 text-sm text-white transition-colors hover:bg-primary-600'
                      >
                        Add To Top
                      </button>
                      <button
                        onClick={() => onBlockAdd(block.name, 'end')}
                        className='rounded-md bg-primary-950 px-3 py-1.5 text-sm text-white transition-colors hover:bg-primary-600'
                      >
                        Add To Bottom
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default AddPageBlock
