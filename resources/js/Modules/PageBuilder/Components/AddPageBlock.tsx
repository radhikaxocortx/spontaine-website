import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useState } from 'react'

interface PageBlockOption {
  readonly name: string
  readonly description: string
  readonly badge: string
}

interface PageBlockFolder {
  readonly name: 'Legacy' | 'Spontaine V2' | 'Spontaine V3'
  readonly description: string
  readonly blocks: readonly PageBlockOption[]
}

const blockFolders: readonly PageBlockFolder[] = [
  {
    name: 'Legacy',
    description: 'Original home and content blocks',
    blocks: [
      {
        name: 'Home - Hero Section',
        description: 'A prominent hero section with heading, subheading and call-to-action',
        badge: 'HH',
      },
      {
        name: 'Home - Company Marquee',
        description: 'Showcase company logos or partners in a scrolling marquee',
        badge: 'HM',
      },
      {
        name: 'Home - Image Cards',
        description: 'Display content in a grid of image cards',
        badge: 'IC',
      },
      {
        name: 'Home - Banner With Image',
        description: 'A banner section with background image and text overlay',
        badge: 'BI',
      },
      {
        name: 'Home - Video Section',
        description: 'Embed and showcase video content',
        badge: 'VS',
      },
      {
        name: 'Home - Testimonial Section',
        description: 'Display customer testimonials and reviews',
        badge: 'TS',
      },
      {
        name: 'Home - Call To Action',
        description: 'A section to drive user action with prominent buttons',
        badge: 'CA',
      },
      {
        name: 'Home - Grid With Video',
        description: 'A grid layout featuring video content',
        badge: 'GV',
      },
      {
        name: 'Home - Full Width Image With Title',
        description: 'Large full-width image with title overlay',
        badge: 'FI',
      },
      {
        name: 'Content Section - FAQ Style Accordion with Links',
        description: 'Expandable FAQ sections with links',
        badge: 'FAQ',
      },
      {
        name: 'Content Section - Price Plan',
        description: 'Display pricing plans and packages',
        badge: 'PP',
      },
      {
        name: 'Sample - Left Image',
        description: 'Content with left-aligned image',
        badge: 'LI',
      },
    ],
  },
  {
    name: 'Spontaine V2',
    description: 'Current Spontaine-branded PageBuilder blocks',
    blocks: [
      {
        name: 'Content Section - Lead Capture',
        description: 'Lead capture modal-style section with configurable download CTA',
        badge: 'LC',
      },
      {
        name: 'Content Section - DPA Accordion',
        description: 'Nested legal sections with clauses and accordions for policy pages',
        badge: 'DPA',
      },
      {
        name: 'Formatted Text',
        description: 'Rich text content with formatting options',
        badge: 'FT',
      },
      {
        name: 'Spontaine - Banner Section',
        description: 'Full-width banner with Ken Burns effect and left-aligned content',
        badge: 'SB',
      },
      {
        name: 'Spontaine - Clean Banner',
        description: 'Clean white banner with centered title and description - BlogsList style',
        badge: 'CB',
      },
      {
        name: 'Spontaine - Dark Banner',
        description: 'Dark banner with black background and white text',
        badge: 'DB',
      },
      {
        name: 'Spontaine - Gradient Banner',
        description: 'Banner with gradient background (green to blue) and centered content',
        badge: 'GB',
      },
      {
        name: 'Spontaine - Breadcrumbs',
        description: 'Navigation breadcrumbs with customizable links and styling',
        badge: 'BC',
      },
      {
        name: 'Spontaine - Carousel',
        description: 'Full-width responsive image carousel with smooth GSAP animations',
        badge: 'SC',
      },
      {
        name: 'Spontaine - Hero Image With Overlay',
        description:
          'Full-screen hero section with image background, customizable overlay, and animated arc',
        badge: 'HI',
      },
      {
        name: 'Spontaine - Hero Video',
        description:
          'Full-screen hero section with video background, customizable overlay, and animated arc',
        badge: 'HV',
      },
      {
        name: 'Spontaine - Full Width Video',
        description: 'Full-width video section with poster and play action',
        badge: 'FV',
      },
      {
        name: 'Spontaine - Arc',
        description: 'Animated arc transition with customizable color and gradient support',
        badge: 'AR',
      },
      {
        name: 'Spontaine - Rich Text',
        description: 'Centered rich text content with Urbanist and Space Grotesk typography',
        badge: 'RT',
      },
      {
        name: 'Spontaine - Company Marquee',
        description: 'Animated company logos marquee with arc transition, editable label and title',
        badge: 'CM',
      },
      {
        name: 'Spontaine - Feature Carousel',
        description: 'Swipeable feature carousel with icon, title, description and images',
        badge: 'FC',
      },
      {
        name: 'Spontaine - Call To Action',
        description:
          'Customizable CTA section with gradient background and optional booking button',
        badge: 'CT',
      },
      {
        name: 'Spontaine - Image Carousel',
        description: 'Full-width image carousel with peek of next slide and swipe navigation',
        badge: 'IC',
      },
      {
        name: 'Spontaine - Bento Cards',
        description:
          'Bento grid layout with 4 cards, gradient background, and animated arc transition',
        badge: 'BT',
      },
    ],
  },
  {
    name: 'Spontaine V3',
    description: 'V3-styled PageBuilder blocks',
    blocks: [
      {
        name: 'Spontaine V3 - Hero',
        description: 'V3 hero section with optional eyebrow, image overlay, CTA, and colors',
        badge: 'H3',
      },
      {
        name: 'Spontaine V3 - Hero Large',
        description: 'Large V3 hero with background media, split title, two CTAs, and prism visual',
        badge: 'HL3',
      },
      {
        name: 'Spontaine V3 - CTA',
        description: 'V3 CTA section with optional description, buttons, microcopy, and colors',
        badge: 'C3',
      },
      {
        name: 'Spontaine V3 - Feature Split',
        description: 'V3 split section with editable text, CTA, image, and media side',
        badge: 'FS',
      },
      {
        name: 'Spontaine V3 - Rich Text',
        description: 'V3 rich text section with optional header and one/two-column layout',
        badge: 'RT3',
      },
      {
        name: 'Spontaine V3 - Script Embed',
        description: 'Trusted V3 HTML embed section with script, style, and iframe support',
        badge: 'SE3',
      },
      {
        name: 'Content Section - Contact Us',
        description: 'V3 contact form with founding-team copy and enquiry pills',
        badge: 'CU',
      },
    ],
  },
]

interface Properties {
  onBlockAdd: (block: string, position: 'top' | 'end') => void
}

const AddPageBlock = ({ onBlockAdd }: Properties) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null)
  const normalizedSearchQuery = searchQuery.trim().toLowerCase()

  const filteredFolders = blockFolders
    .map((folder) => ({
      ...folder,
      blocks: folder.blocks.filter(
        (block) =>
          block.name.toLowerCase().includes(normalizedSearchQuery) ||
          block.description.toLowerCase().includes(normalizedSearchQuery)
      ),
    }))
    .filter(
      (folder) =>
        folder.blocks.length > 0 || (folder.name === 'Spontaine V3' && normalizedSearchQuery === '')
    )

  const hasVisibleBlocks = filteredFolders.some((folder) => folder.blocks.length > 0)

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
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className='w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                  onClick={(event) => event.stopPropagation()}
                />
              </div>
            </div>

            {filteredFolders.length > 0 ? (
              <Accordion
                type='multiple'
                className='space-y-3 px-2 pb-4'
              >
                {filteredFolders.map((folder) => (
                  <AccordionItem
                    key={folder.name}
                    value={folder.name}
                    className='rounded-lg border border-gray-200 bg-white'
                  >
                    <AccordionTrigger className='px-4 py-3 hover:no-underline'>
                      <div className='flex w-full items-center justify-between pr-4 text-left'>
                        <div>
                          <h3 className='text-base font-semibold text-gray-900'>{folder.name}</h3>
                          <p className='mt-0.5 text-xs text-gray-500'>{folder.description}</p>
                        </div>
                        <span className='rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600'>
                          {folder.blocks.length}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className='px-4 pb-4'>
                      {folder.blocks.length > 0 ? (
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                          {folder.blocks.map((block) => (
                            <div
                              key={block.name}
                              className='group relative cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-blue-500 hover:shadow-md'
                              onMouseEnter={() => setHoveredBlock(block.name)}
                              onMouseLeave={() => setHoveredBlock(null)}
                            >
                              <div className='mb-3 inline-flex h-9 min-w-9 items-center justify-center rounded-md bg-gray-100 px-2 font-mono text-xs font-semibold text-gray-700'>
                                {block.badge}
                              </div>
                              <h3 className='mb-1 text-lg font-medium text-gray-900'>
                                {block.name}
                              </h3>
                              <p className='text-sm text-gray-500'>{block.description}</p>

                              {hoveredBlock === block.name && (
                                <div className='absolute inset-0 flex items-center justify-center gap-2 rounded-lg bg-black/50 backdrop-blur-sm'>
                                  <button
                                    type='button'
                                    onClick={() => onBlockAdd(block.name, 'top')}
                                    className='rounded-md bg-primary-950 px-3 py-1.5 text-sm text-white transition-colors hover:bg-primary-600'
                                  >
                                    Add To Top
                                  </button>
                                  <button
                                    type='button'
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
                      ) : (
                        <div className='rounded-lg border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-sm text-gray-500'>
                          No Spontaine V3 PageBuilder blocks yet.
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className='mx-2 rounded-lg border border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500'>
                No blocks match your search.
              </div>
            )}

            {!hasVisibleBlocks && normalizedSearchQuery === '' && (
              <p className='px-2 pb-4 text-xs text-gray-400'>
                Add future blocks to the Spontaine V3 folder as they become available.
              </p>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default AddPageBlock
