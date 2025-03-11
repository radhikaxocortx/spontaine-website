import LeftImageBlock, { ImageBlock } from '@/Modules/PageBuilder/Blocks/LeftImageBlock'
import RichTextBlock, {
  RichTextBlockData,
} from '@/Modules/PageBuilder/Blocks/RichText/RichTextBlock'
import { BlocKFieldInfo } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import { PageBuilderAction } from '@/Modules/PageBuilder/hooks/pageBuilderService'
import { Block, PageDataDependencies } from '@/Modules/PageBuilder/page_interfaces'
import { Language } from '@/Modules/PageBuilder/Pages/PageBuilder'
import React from 'react'
import FAQ, { FAQBlockInfo } from '../Blocks/FAQ'
import FullWidthImageWithTItle, {
  FullWidthImageWithTItleBlock,
} from '../Blocks/FullWidthImageWithTItle'
import GridWithVideo, { GridWithVideoBlock } from '../Blocks/GridWithVideo'
import ImageCards, { ImageCardsBlock } from '../Blocks/ImageCards'
import SectionHero from '../Blocks/SectionHero'

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
      {blockName === 'Formatted Text' && (
        <RichTextBlock
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as RichTextBlockData}
          language={language}
        />
      )}
      {blockName === 'Home - Hero Section' && (
        <SectionHero
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as ImageBlock}
          language={language}
        />
      )}
      {blockName === 'Home - Image Cards' && (
        <ImageCards
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as ImageCardsBlock}
          language={language}
        />
      )}
      {blockName === 'Home - Grid With Video' && (
        <GridWithVideo
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as GridWithVideoBlock}
          language={language}
        />
      )}
      {blockName === 'Home - Full Width Image With Title' && (
        <FullWidthImageWithTItle
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as FullWidthImageWithTItleBlock}
          language={language}
        />
      )}
      {blockName === 'Content Section - FAQ Style Accordion with Links' && (
        <FAQ
          language={language}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as FAQBlockInfo}
          dispatch={dispatch}
        />
      )}
    </>
  )
}

export default ResolveComponent
