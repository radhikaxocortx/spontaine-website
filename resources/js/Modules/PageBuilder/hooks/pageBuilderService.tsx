import { showError } from '@/Components/ui/alerts'
import { imageBlock } from '@/Modules/PageBuilder/Blocks/LeftImageBlock'
import { BlockFieldValues } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import { Block, ItemListField, PageBlock } from '@/Modules/PageBuilder/page_interfaces'

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
}

const getBlockDefaultData = (blockName: string) => {
  switch (blockName) {
    case 'Sample - Left Image': {
      return {
        ...imageBlock,
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

const addNewBlock = (page: PageBlock, blockName?: string): PageBlock => {
  if (blockName == null) {
    return page
  }
  const defaultContent = getBlockDefaultData(blockName)
  return {
    lastUUID: page.lastUUID + 1,
    blocks: [
      ...page.blocks,
      {
        id: page.lastUUID + 1,
        position: page.blocks.length + 1,
        blockName: blockName,
        ...defaultContent,
      },
    ],
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
  if (blockId == null || fieldName == null || fieldValue == null) {
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
      return addNewBlock(state, action.blockName)
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
