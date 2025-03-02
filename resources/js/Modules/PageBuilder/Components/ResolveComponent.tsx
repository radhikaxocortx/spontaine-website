import LeftImageBlock, { ImageBlock } from '@/Modules/PageBuilder/Blocks/LeftImageBlock'
import { BlocKFieldInfo } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import { PageBuilderAction } from '@/Modules/PageBuilder/hooks/pageBuilderService'
import { Block, PageDataDependencies } from '@/Modules/PageBuilder/page_interfaces'
import { Language } from '@/Modules/PageBuilder/Pages/PageBuilder'
import React from 'react'

interface Properties {
  block?: Block
  blockName: string
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  language?: Language
  dispatch?: React.Dispatch<PageBuilderAction>
  dependencies?: PageDataDependencies
  currentDate?: string
}

const ResolveComponent = ({
  blockName,
  editMode = false,
  onFieldEdit,
  block,
  language = 'en',
  dispatch,
  dependencies,
}: Properties) => {
  console.log(blockName)
  return (
    <>
      {blockName === 'Sample - Left Image' && (
        <LeftImageBlock
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as ImageBlock}
          language={language}
        />
      )}
    </>
  )
}

export default ResolveComponent
