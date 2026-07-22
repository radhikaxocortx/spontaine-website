import { showError } from '@/components/ui/alerts'
import { imageBlock } from '@/Modules/PageBuilder/Blocks/LeftImageBlock'
import { defaultPricePlanBlock } from '@/Modules/PageBuilder/Blocks/PricePlanCards/PricePlanCardTypes'
import { richTextData } from '@/Modules/PageBuilder/Blocks/RichText/RichTextBlock'
import { BlockFieldValues } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import { Block, ItemListField, PageBlock } from '@/Modules/PageBuilder/page_interfaces'
import { dpaAccordionBlock } from '../Blocks/DPAAccordion/DPAAccordion'
import { faqBlock } from '../Blocks/FAQ'
import { fullWidthImageWithTItleBlock } from '../Blocks/FullWidthImageWithTItle'
import { gridWithVideoBlock } from '../Blocks/GridWithVideo'
import { imageCardsBlock } from '../Blocks/ImageCards'
import { leadCaptureBlock } from '../Blocks/LeadCapture'
import { bannerBlock } from '../Blocks/SectionBanner'
import { textBlock } from '../Blocks/SectionCallToAction'
import { heroImageBlock } from '../Blocks/SectionHero'
import { defaultTestimonialBlock } from '../Blocks/SectionTestimonial'
import { videoBlock } from '../Blocks/SectionVideo'
import { richTextSPData } from '../Blocks/SpontaineBlocks/RichTextSP'
import { arcBlock } from '../Blocks/SpontaineBlocks/SectionArc'
import { sectionBannerCleanBlock } from '../Blocks/SpontaineBlocks/SectionBannerClean'
import { sectionBannerDarkBlock } from '../Blocks/SpontaineBlocks/SectionBannerDark'
import { sectionBannerGradientBlock } from '../Blocks/SpontaineBlocks/SectionBannerGradient'
import { sectionBannerSPBlock } from '../Blocks/SpontaineBlocks/SectionBannerSP'
import { bentoCardsSPBlock } from '../Blocks/SpontaineBlocks/SectionBentoCardsSP'
import { breadcrumbsData } from '../Blocks/SpontaineBlocks/SectionBreadcrumbs'
import { sectionCarouselBlock } from '../Blocks/SpontaineBlocks/SectionCarousel'
import { sectionCTASPBlock } from '../Blocks/SpontaineBlocks/SectionCTASP'
import { featureCarouselSPBlock } from '../Blocks/SpontaineBlocks/SectionFeatureCarouselSP'
import { sectionFullWidthVideoSPBlock } from '../Blocks/SpontaineBlocks/SectionFullWidthVideoSP'
import { heroImageBlock as heroImageSPBlock } from '../Blocks/SpontaineBlocks/SectionHeroImageSP'
import { heroVideoBlock } from '../Blocks/SpontaineBlocks/SectionHeroVideoSP'
import { imageCarouselSPBlock } from '../Blocks/SpontaineBlocks/SectionImageCarouselSP'
import { marqueeSPBlock } from '../Blocks/SpontaineBlocks/SectionMarqueeSP'
import { sectionCtaV3Block } from '../Blocks/SpontaineV3/SectionCtaV3'
import { sectionFeatureSplitV3Block } from '../Blocks/SpontaineV3/SectionFeatureSplitV3'
import { sectionHeroV3Block } from '../Blocks/SpontaineV3/SectionHeroV3'
import { sectionLargeHeroV3Block } from '../Blocks/SpontaineV3/SectionLargeHeroV3'
import { sectionRichTextV3Block } from '../Blocks/SpontaineV3/SectionRichTextV3'

export interface PageBuilderAction {
  action:
    | 'ADD_BLOCK'
    | 'REMOVE_BLOCK'
    | 'UPDATE_BLOCK'
    | 'MOVE_BLOCK_UP'
    | 'MOVE_BLOCK_DOWN'
    | 'UPDATE_BLOCK_FIELD'
    | 'INSERT_INTO_LIST'
    | 'UPDATE_LIST_ITEM'
    | 'MOVE_LIST_ITEM_UP'
    | 'MOVE_LIST_ITEM_DOWN'
    | 'UPDATE_LIST_ITEM_FIELD'
    | 'REMOVE_LIST_ITEM'
    | 'UPDATE_BLOCK_FIELDS'
  blockName?: string
  blockId?: number
  fieldName?: string
  fieldValue?: BlockFieldValues
  itemId?: number
  blockData?: Record<string, BlockFieldValues>
  position?: 'top' | 'end'
}

const getBlockDefaultData = (blockName: string) => {
  switch (blockName) {
    case 'Sample - Left Image': {
      return {
        ...imageBlock,
      }
    }
    case 'Home - Hero Section': {
      return {
        ...heroImageBlock,
      }
    }

    case 'Home - Hero Video Section': {
      return {
        ...heroImageBlock,
      }
    }

    case 'Spontaine - Hero Image With Overlay': {
      return {
        ...heroImageSPBlock,
      }
    }

    case 'Home - Image Cards': {
      return {
        ...imageCardsBlock,
      }
    }
    case 'Home - Banner With Image': {
      return {
        ...bannerBlock,
      }
    }
    case 'Home - Video Section': {
      return {
        ...videoBlock,
      }
    }
    case 'Home - Testimonial Section': {
      return {
        ...defaultTestimonialBlock,
      }
    }
    case 'Home - Grid With Video': {
      return {
        ...gridWithVideoBlock,
      }
    }
    case 'Home - Full Width Image With Title': {
      return {
        ...fullWidthImageWithTItleBlock,
      }
    }

    case 'Content Section - FAQ Style Accordion with Links': {
      return {
        ...faqBlock,
      }
    }

    case 'Content Section - Price Plan': {
      return {
        ...defaultPricePlanBlock,
      }
    }

    case 'Content Section - DPA Accordion': {
      return {
        ...dpaAccordionBlock,
      }
    }

    case 'Content Section - Lead Capture': {
      return {
        ...leadCaptureBlock,
      }
    }

    case 'Formatted Text': {
      return {
        ...richTextData,
      }
    }
    case 'Home - Call To Action': {
      return {
        ...textBlock,
      }
    }
    case 'Spontaine - Banner Section': {
      return {
        ...sectionBannerSPBlock,
      }
    }
    case 'Spontaine - Clean Banner': {
      return {
        ...sectionBannerCleanBlock,
      }
    }
    case 'Spontaine - Dark Banner': {
      return {
        ...sectionBannerDarkBlock,
      }
    }
    case 'Spontaine - Gradient Banner': {
      return {
        ...sectionBannerGradientBlock,
      }
    }
    case 'Spontaine - Breadcrumbs': {
      return {
        ...breadcrumbsData,
      }
    }
    case 'Spontaine - Carousel': {
      return {
        ...sectionCarouselBlock,
      }
    }
    case 'Spontaine - Hero Video': {
      return {
        ...heroVideoBlock,
      }
    }
    case 'Spontaine - Full Width Video': {
      return {
        ...sectionFullWidthVideoSPBlock,
      }
    }
    case 'Spontaine - Arc': {
      return {
        ...arcBlock,
      }
    }
    case 'Spontaine - Rich Text': {
      return {
        ...richTextSPData,
      }
    }
    case 'Spontaine - Company Marquee': {
      return {
        ...marqueeSPBlock,
      }
    }
    case 'Spontaine - Feature Carousel': {
      return {
        ...featureCarouselSPBlock,
      }
    }
    case 'Spontaine - Call To Action': {
      return {
        ...sectionCTASPBlock,
      }
    }
    case 'Spontaine - Image Carousel': {
      return {
        ...imageCarouselSPBlock,
      }
    }
    case 'Spontaine - Bento Cards': {
      return {
        ...bentoCardsSPBlock,
      }
    }
    case 'Spontaine V3 - Hero': {
      return {
        ...sectionHeroV3Block,
      }
    }
    case 'Spontaine V3 - Hero Large': {
      return {
        ...sectionLargeHeroV3Block,
      }
    }
    case 'Spontaine V3 - CTA': {
      return {
        ...sectionCtaV3Block,
      }
    }
    case 'Spontaine V3 - Feature Split': {
      return {
        ...sectionFeatureSplitV3Block,
      }
    }
    case 'Spontaine V3 - Rich Text': {
      return {
        ...sectionRichTextV3Block,
      }
    }

    default: {
      return {}
    }
  }
}

const sortBlocks = (blocks: Block[]): Block[] => {
  return blocks.sort((a, b) => a.position - b.position)
}

const addNewBlock = (
  page: PageBlock,
  blockName?: string,
  position: 'top' | 'end' = 'end'
): PageBlock => {
  if (blockName == null) {
    return page
  }
  const defaultContent = getBlockDefaultData(blockName)
  const newBlock = {
    id: page.lastUUID + 1,
    position: position === 'top' ? 1 : page.blocks.length + 1,
    blockName: blockName,
    ...defaultContent,
  }

  // If adding to top, increment positions of existing blocks
  const updatedBlocks =
    position === 'top'
      ? page.blocks.map((block) => ({
          ...block,
          position: block.position + 1,
        }))
      : page.blocks

  return {
    lastUUID: page.lastUUID + 1,
    blocks: position === 'top' ? [newBlock, ...updatedBlocks] : [...updatedBlocks, newBlock],
  }
}

const insertIntoList = <T extends BlockFieldValues>(
  page: PageBlock,
  blockId?: number,
  fieldName?: string,
  fieldValue?: T
): PageBlock => {
  if (blockId == null || fieldName == null || fieldValue == null) {
    return page
  }
  return {
    lastUUID: page.lastUUID,
    blocks: page.blocks.map((block) => {
      if (block.id === blockId) {
        const field = (block[fieldName as keyof Block] as unknown as ItemListField<T>) ?? {
          lastUUID: 0,
          items: [],
        }
        const newData: ItemListField<T> = {
          ...field,
          lastUUID: field.lastUUID + 1,
          items: [
            ...field.items,
            {
              id: field.lastUUID + 1,
              item: fieldValue,
            },
          ],
        }
        return {
          ...block,
          [fieldName]: newData,
        }
      }
      return block
    }),
  }
}

const updateInList = <T extends BlockFieldValues>(
  page: PageBlock,
  blockId?: number,
  fieldName?: string,
  fieldValue?: T,
  itemId?: number
): PageBlock => {
  if (blockId == null || fieldName == null || fieldValue == null || itemId == null) {
    return page
  }
  return {
    lastUUID: page.lastUUID,
    blocks: page.blocks.map((block) => {
      if (block.id === blockId) {
        const field = block[fieldName as keyof Block] as unknown as ItemListField<T>
        const newData: ItemListField<T> = {
          ...field,
          items: field.items.map((item) => {
            if (item.id === itemId) {
              return {
                ...item,
                item: fieldValue,
              }
            }
            return item
          }),
        }
        return {
          ...block,
          [fieldName]: newData,
        }
      }
      return block
    }),
  }
}

const moveListItemUp = <T extends BlockFieldValues>(
  page: PageBlock,
  blockId?: number,
  fieldName?: string,
  itemId?: number
): PageBlock => {
  if (blockId == null || fieldName == null || itemId == null) {
    return page
  }
  return {
    lastUUID: page.lastUUID,
    blocks: page.blocks.map((block) => {
      if (block.id === blockId) {
        if (block[fieldName as keyof Block] == null) {
          return block
        }
        const field = block[fieldName as keyof Block] as unknown as ItemListField<T>
        const oldItems = field.items
        const itemIndex = oldItems.findIndex((item) => item.id === itemId)
        if (itemIndex === 0 || itemIndex === -1) {
          return block
        }
        const oldBlock = oldItems[itemIndex]
        oldItems.splice(itemIndex, 1)
        oldItems.splice(itemIndex - 1, 0, oldBlock)
        return {
          ...block,
          [fieldName]: {
            ...field,
            items: [...oldItems],
          },
        }
      }
      return block
    }),
  }
}

const moveListItemDown = (
  page: PageBlock,
  blockId?: number,
  fieldName?: string,
  itemId?: number
): PageBlock => {
  if (blockId == null || fieldName == null || itemId == null) {
    return page
  }
  return {
    lastUUID: page.lastUUID,
    blocks: page.blocks.map((block) => {
      if (block.id === blockId) {
        if (block[fieldName as keyof Block] == null) {
          return block
        }
        const field = block[fieldName as keyof Block] as unknown as ItemListField<BlockFieldValues>
        const oldItems = field.items
        const itemIndex = oldItems.findIndex((item) => item.id === itemId)
        if (itemIndex === oldItems.length - 1 || itemIndex === -1) {
          return block
        }
        const oldBlock = oldItems[itemIndex]
        oldItems.splice(itemIndex, 1)
        oldItems.splice(itemIndex + 1, 0, oldBlock)
        return {
          ...block,
          [fieldName]: {
            ...field,
            items: [...oldItems],
          },
        }
      }
      return block
    }),
  }
}

const updateListField = (
  page: PageBlock,
  blockId?: number,
  fieldName?: string,
  blockData?: Record<string, BlockFieldValues>,
  itemId?: number
): PageBlock => {
  if (blockId == null || blockData == null || itemId == null || fieldName == null) {
    showError('Invalid parameters')
    return page
  }
  return {
    lastUUID: page.lastUUID,
    blocks: page.blocks.map((block) => {
      if (block.id === blockId) {
        const field = block[fieldName as keyof Block] as unknown as ItemListField<BlockFieldValues>
        const newData: ItemListField<BlockFieldValues> = {
          ...field,
          items: field.items.map((item) => {
            if (item.id === itemId) {
              return {
                ...item,
                item: {
                  ...item.item,
                  ...blockData,
                },
              }
            }
            return item
          }),
        }
        return {
          ...block,
          [fieldName]: newData,
        }
      }
      return {
        ...block,
      }
    }),
  }
}

const removeFromList = <T extends BlockFieldValues>(
  page: PageBlock,
  blockId?: number,
  fieldName?: string,
  itemId?: number
): PageBlock => {
  if (blockId == null || fieldName == null || itemId == null) {
    return page
  }
  return {
    lastUUID: page.lastUUID,
    blocks: page.blocks.map((block) => {
      if (block.id === blockId) {
        const field = block[fieldName as keyof Block] as unknown as ItemListField<T>
        const newData: ItemListField<T> = {
          ...field,
          items: field.items.filter((item) => item.id !== itemId),
        }
        return {
          ...block,
          [fieldName]: newData,
        }
      }
      return block
    }),
  }
}

const removeBlock = (page: PageBlock, blockId?: number): PageBlock => {
  const oldBlock = page.blocks.find((block) => block.id === blockId)
  if (oldBlock == null || blockId == null) {
    return page
  }
  return {
    lastUUID: page.lastUUID,
    blocks: page.blocks
      .filter((block) => block.id !== blockId)
      .map((block) => {
        if (block.position > oldBlock.position) {
          return {
            ...block,
            position: block.position - 1,
          }
        }
        return block
      }),
  }
}

const moveBlockUp = (page: PageBlock, blockId?: number): PageBlock => {
  const oldBlock = page.blocks.find((block) => block.id === blockId)
  if (oldBlock == null || blockId == null) {
    return page
  }
  if (oldBlock.position === 1) {
    return page
  }

  const rePositionedBlocks = page.blocks.map((block) => {
    if (block.position === oldBlock.position - 1) {
      return {
        ...block,
        position: block.position + 1,
      }
    }
    if (block.position === oldBlock.position) {
      return {
        ...block,
        position: block.position - 1,
      }
    }
    return block
  })

  return {
    lastUUID: page.lastUUID,
    blocks: sortBlocks(rePositionedBlocks),
  }
}

const moveBlockDown = (page: PageBlock, blockId?: number): PageBlock => {
  const oldBlock = page.blocks.find((block) => block.id === blockId)
  if (oldBlock == null || blockId == null) {
    return page
  }
  if (oldBlock.position === page.blocks.length) {
    return page
  }
  const rePositionedBlocks = page.blocks.map((block) => {
    if (block.position === oldBlock.position + 1) {
      return {
        ...block,
        position: block.position - 1,
      }
    }
    if (block.position === oldBlock.position) {
      return {
        ...block,
        position: block.position + 1,
      }
    }
    return block
  })
  return {
    lastUUID: page.lastUUID,
    blocks: sortBlocks(rePositionedBlocks),
  }
}

const updateBlockField = (
  page: PageBlock,
  blockId?: number,
  fieldName?: string,
  fieldValue?: BlockFieldValues
): PageBlock => {
  if (blockId == null || fieldName == null || fieldValue === undefined) {
    return page
  }
  const updatedBlocks = page.blocks.map((block) => {
    if (block.id === blockId) {
      return {
        ...block,
        [fieldName]: fieldValue,
      }
    }
    return block
  })
  return {
    lastUUID: page.lastUUID,
    blocks: updatedBlocks,
  }
}

const updateBlockFields = (
  page: PageBlock,
  blockId?: number,
  blockData?: Record<string, BlockFieldValues>
): PageBlock => {
  if (blockId == null || blockData == null) {
    return page
  }
  const updatedBlocks = page.blocks.map((block) => {
    if (block.id === blockId) {
      return {
        ...block,
        ...blockData,
      }
    }
    return block
  })
  return {
    lastUUID: page.lastUUID,
    blocks: updatedBlocks,
  }
}

const PageBuilderService = (state: PageBlock, action: PageBuilderAction): PageBlock => {
  switch (action.action) {
    case 'ADD_BLOCK': {
      return addNewBlock(state, action.blockName, action.position)
    }
    case 'MOVE_LIST_ITEM_UP': {
      return moveListItemUp(state, action.blockId, action.fieldName, action.itemId)
    }
    case 'MOVE_LIST_ITEM_DOWN': {
      return moveListItemDown(state, action.blockId, action.fieldName, action.itemId)
    }
    case 'REMOVE_BLOCK': {
      return removeBlock(state, action.blockId)
    }
    case 'MOVE_BLOCK_UP': {
      return moveBlockUp(state, action.blockId)
    }
    case 'MOVE_BLOCK_DOWN': {
      return moveBlockDown(state, action.blockId)
    }
    case 'UPDATE_BLOCK_FIELD': {
      return updateBlockField(state, action.blockId, action.fieldName, action.fieldValue)
    }
    case 'UPDATE_BLOCK_FIELDS': {
      return updateBlockFields(state, action.blockId, action.blockData)
    }
    case 'INSERT_INTO_LIST': {
      return insertIntoList(state, action.blockId, action.fieldName, action.fieldValue)
    }
    case 'UPDATE_LIST_ITEM': {
      return updateInList(state, action.blockId, action.fieldName, action.fieldValue, action.itemId)
    }
    case 'UPDATE_LIST_ITEM_FIELD': {
      return updateListField(
        state,
        action.blockId,
        action.fieldName,
        action.blockData,
        action.itemId
      )
    }
    case 'REMOVE_LIST_ITEM': {
      return removeFromList(state, action.blockId, action.fieldName, action.itemId)
    }
  }
  return state
}

export default PageBuilderService
