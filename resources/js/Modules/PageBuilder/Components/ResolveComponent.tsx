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
import DPAAccordion, { DPAAccordionBlockData } from '../Blocks/DPAAccordion/DPAAccordion'
import LeadCapture, { LeadCaptureBlockInterface } from '../Blocks/LeadCapture'

import FAQ, { FAQBlockInfo } from '../Blocks/FAQ'
import FullWidthImageWithTItle, {
  FullWidthImageWithTItleBlock,
} from '../Blocks/FullWidthImageWithTItle'
import GridWithVideo, { GridWithVideoBlock } from '../Blocks/GridWithVideo'
import ImageCards, { ImageCardsBlock } from '../Blocks/ImageCards'
import PricePlanCards from '../Blocks/PricePlanCards/PricePlanCards'
import { PricePlanBlock } from '../Blocks/PricePlanCards/PricePlanCardTypes'
import SectionBanner, { BannerBlock } from '../Blocks/SectionBanner'
import SectionCallToAction, { TextBlock } from '../Blocks/SectionCallToAction'
import SectionHero, { HeroImageBlock } from '../Blocks/SectionHero'
import SectionMarquee, { MarqueeData } from '../Blocks/SectionMarquee'
import SectionTestimonial, { TestimonialBlock } from '../Blocks/SectionTestimonial'
import SectionVideo, { VideoImageBlock } from '../Blocks/SectionVideo'
import RichTextSP, { RichTextSPBlockData } from '../Blocks/SpontaineBlocks/RichTextSP'
import SectionArc, { ArcBlock } from '../Blocks/SpontaineBlocks/SectionArc'
import SectionBannerClean, {
  SectionBannerCleanBlock,
} from '../Blocks/SpontaineBlocks/SectionBannerClean'
import SectionBannerDark, {
  SectionBannerDarkBlock,
} from '../Blocks/SpontaineBlocks/SectionBannerDark'
import SectionBannerGradient, {
  SectionBannerGradientBlock,
} from '../Blocks/SpontaineBlocks/SectionBannerGradient'
import SectionBannerSP, { SectionBannerSPBlock } from '../Blocks/SpontaineBlocks/SectionBannerSP'
import SectionBentoCardsSP, {
  BentoCardsSPData,
} from '../Blocks/SpontaineBlocks/SectionBentoCardsSP'
import SectionBreadcrumbs, {
  SectionBreadcrumbsData,
} from '../Blocks/SpontaineBlocks/SectionBreadcrumbs'
import SectionCarousel, { SectionCarouselBlock } from '../Blocks/SpontaineBlocks/SectionCarousel'
import SectionCTASP, { SectionCTASPBlock } from '../Blocks/SpontaineBlocks/SectionCTASP'
import SectionFeatureCarouselSP, {
  FeatureCarouselSPData,
} from '../Blocks/SpontaineBlocks/SectionFeatureCarouselSP'
import SectionFullWidthVideoSP, {
  SectionFullWidthVideoSPBlock,
} from '../Blocks/SpontaineBlocks/SectionFullWidthVideoSP'
import SectionHeroImageSP, {
  HeroImageBlock as HeroImageSPBlock,
} from '../Blocks/SpontaineBlocks/SectionHeroImageSP'
import SectionHeroVideoSP, { HeroVideoBlock } from '../Blocks/SpontaineBlocks/SectionHeroVideoSP'
import SectionImageCarouselSP, {
  ImageCarouselSPData,
} from '../Blocks/SpontaineBlocks/SectionImageCarouselSP'
import SectionMarqueeSP, { MarqueeSPData } from '../Blocks/SpontaineBlocks/SectionMarqueeSP'
import ContactUS, { ContactUsBlockInterface } from '../Blocks/SpontaineV3/ContactUS'
import SectionHeroV3, {
  SectionHeroV3Block,
} from '../Blocks/SpontaineV3/SectionHeroV3'

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
      {blockName === 'Home - Hero Video Section' && (
        <SectionHeroImageSP
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as HeroImageSPBlock}
          language={language}
        />
      )}
      {blockName === 'Spontaine - Hero Image With Overlay' && (
        <SectionHeroImageSP
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as HeroImageSPBlock}
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
          blockData={block as unknown as ContactUsBlockInterface}
          language={language}
          dispatch={dispatch}
        />
      )}
      {blockName === 'Content Section - Lead Capture' && (
        <LeadCapture
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as LeadCaptureBlockInterface}
          language={language}
        />
      )}
      {blockName === 'Content Section - DPA Accordion' && (
        <DPAAccordion
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as DPAAccordionBlockData}
          language={language}
          dispatch={dispatch}
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
        <PricePlanCards
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as PricePlanBlock}
          language={language}
          dispatch={dispatch}
        />
      )}
      {blockName === 'Spontaine - Banner Section' && (
        <SectionBannerSP
          blockData={block as unknown as SectionBannerSPBlock}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          language={language}
        />
      )}
      {blockName === 'Spontaine - Clean Banner' && (
        <SectionBannerClean
          blockData={block as unknown as SectionBannerCleanBlock}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          language={language}
        />
      )}
      {blockName === 'Spontaine - Dark Banner' && (
        <SectionBannerDark
          blockData={block as unknown as SectionBannerDarkBlock}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          language={language}
        />
      )}
      {blockName === 'Spontaine - Gradient Banner' && (
        <SectionBannerGradient
          blockData={block as unknown as SectionBannerGradientBlock}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          language={language}
        />
      )}
      {blockName === 'Spontaine - Breadcrumbs' && (
        <SectionBreadcrumbs
          block={block as unknown as SectionBreadcrumbsData}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          language={language}
        />
      )}
      {blockName === 'Spontaine - Carousel' && (
        <SectionCarousel
          blockData={block as unknown as SectionCarouselBlock}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          language={language}
          dispatch={dispatch}
        />
      )}
      {blockName === 'Spontaine - Hero Video' && (
        <SectionHeroVideoSP
          blockData={block as unknown as HeroVideoBlock}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          language={language}
        />
      )}
      {blockName === 'Spontaine - Full Width Video' && (
        <SectionFullWidthVideoSP
          blockData={block as unknown as SectionFullWidthVideoSPBlock}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          language={language}
        />
      )}
      {blockName === 'Spontaine - Arc' && (
        <SectionArc
          blockData={block as unknown as ArcBlock}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          language={language}
        />
      )}
      {blockName === 'Spontaine - Rich Text' && (
        <RichTextSP
          blockData={block as unknown as RichTextSPBlockData}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          language={language}
        />
      )}
      {blockName === 'Spontaine - Company Marquee' && (
        <SectionMarqueeSP
          blockData={block as unknown as MarqueeSPData}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          language={language}
          dispatch={dispatch}
        />
      )}
      {blockName === 'Spontaine - Feature Carousel' && (
        <SectionFeatureCarouselSP
          blockData={block as unknown as FeatureCarouselSPData}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          language={language}
          dispatch={dispatch}
        />
      )}
      {blockName === 'Spontaine - Call To Action' && (
        <SectionCTASP
          blockData={block as unknown as SectionCTASPBlock}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          language={language}
        />
      )}
      {blockName === 'Spontaine - Image Carousel' && (
        <SectionImageCarouselSP
          blockData={block as unknown as ImageCarouselSPData}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          language={language}
          dispatch={dispatch}
        />
      )}
      {blockName === 'Spontaine - Bento Cards' && (
        <SectionBentoCardsSP
          blockData={block as unknown as BentoCardsSPData}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          language={language}
          dispatch={dispatch}
        />
      )}
      {blockName === 'Spontaine V3 - Hero' && (
        <SectionHeroV3
          blockData={block as unknown as SectionHeroV3Block}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          language={language}
          dispatch={dispatch}
        />
      )}
    </>
  )
}

export default ResolveComponent
