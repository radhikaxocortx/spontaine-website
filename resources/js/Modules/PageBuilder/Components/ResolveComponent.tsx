import Footer from '@/Layouts/Footer/Footer'
import LeftImageBlock, { ImageBlock } from '@/Modules/PageBuilder/Blocks/LeftImageBlock'
import RichTextBlock, {
  RichTextBlockData,
} from '@/Modules/PageBuilder/Blocks/RichText/RichTextBlock'
import { BlocKFieldInfo } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import { FooterDataInterface } from '@/Modules/PageBuilder/FooterEditor/FooterEditor'
import { PageBuilderAction } from '@/Modules/PageBuilder/hooks/pageBuilderService'
import { Block, PageDataDependencies } from '@/Modules/PageBuilder/page_interfaces'
import { Language } from '@/Modules/PageBuilder/Pages/PageBuilder'
import React from 'react'
import ContactUS from '../Blocks/ContactUS'
import ContactUS from '../Blocks/ContactUS'
import FAQ, { FAQBlockInfo } from '../Blocks/FAQ'
import FullWidthImageWithTItle, {
  FullWidthImageWithTItleBlock,
} from '../Blocks/FullWidthImageWithTItle'
import GridWithVideo, { GridWithVideoBlock } from '../Blocks/GridWithVideo'
import ImageCards, { ImageCardsBlock } from '../Blocks/ImageCards'
import PricePlan, { PricePlanBlock } from '../Blocks/PricePlan'
import PricePlan, { PricePlanBlock } from '../Blocks/PricePlan'
import SectionBanner, { BannerBlock } from '../Blocks/SectionBanner'
import SectionCallToAction, { TextBlock } from '../Blocks/SectionCallToAction'
import SectionHero, { HeroImageBlock } from '../Blocks/SectionHero'
import SectionMarquee, { MarqueeData } from '../Blocks/SectionMarquee'
import SectionTestimonial, { TestimonialBlock } from '../Blocks/SectionTestimonial'
import SectionVideo, { VideoImageBlock } from '../Blocks/SectionVideo'

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
          blockData={block as unknown as HeroImageBlock}
          language={language}
        />
      )}
      {blockName === 'Home - Company Marquee' && (
        <SectionMarquee
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as MarqueeData}
          language={language}
          dispatch={dispatch}
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
      {blockName === 'Home - Video Section' && (
        <SectionVideo
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as VideoImageBlock}
        />
      )}
      {blockName === 'Home - Testimonial Section' && (
        <SectionTestimonial
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as TestimonialBlock}
          language={language}
          dispatch={dispatch}
        />
      )}
      {blockName === 'Home - Banner With Image' && (
        <SectionBanner
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as BannerBlock}
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
      {blockName === 'Content Section - Contact Us' && (
        <ContactUS
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as RichTextBlockData}
          language={language}
        />
      )}
      {blockName === 'Home - Call To Action' && (
        <SectionCallToAction
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as TextBlock}
          language={language}
        />
      )}
      {blockName === 'Footer' && (
        <Footer
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as FooterDataInterface}
          language={language}
        />
      )}
      {blockName === 'Content Section - Price Plan' && (
        <PricePlan
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as PricePlanBlock}
          language={language}
          dispatch={dispatch}
        />
      )}
    </>
  )
}

export default ResolveComponent
