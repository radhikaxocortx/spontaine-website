import Navbar from '@/Layouts/Navbar/Navbar'
import CompanyLogosSection from '@/Modules/PageBuilder/Blocks/HomeBlocks/CompanyLogosSection'
import HeroSection from '@/Modules/PageBuilder/Blocks/HomeBlocks/HeroSection'
import SectionAIIntegration from '@/Modules/PageBuilder/Blocks/HomeBlocks/SectionAIIntegration'
import SectionBlogsList from '@/Modules/PageBuilder/Blocks/HomeBlocks/SectionBlogsList'
import SectionLargeText from '@/Modules/PageBuilder/Blocks/HomeBlocks/SectionLargeText'
import SectionTrustedPartners from '@/Modules/PageBuilder/Blocks/HomeBlocks/SectionTrustedPartners'
import SectionVideos from '@/Modules/PageBuilder/Blocks/HomeBlocks/SectionVideos'
import { FooterDataInterface } from '@/Modules/PageBuilder/FooterEditor/FooterEditor'
import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'
import React from 'react'
import Footer from './Footer/Footer'

interface Properties {
  children: React.ReactNode
}

const AppLayout = ({ children }: Properties) => {
  // Get footer data from Inertia shared props
  const { footer } = usePage<PageProps & { footer: { items: FooterDataInterface } }>().props

  return (
    <>
      <Navbar />
      <div className='relative min-h-screen w-full'>
        <HeroSection />
        <div className='-mt-12'>
          <CompanyLogosSection />
        </div>
        <div className=''>
          <SectionAIIntegration />
        </div>
        <SectionTrustedPartners />
        <SectionBlogsList />
        <SectionVideos />
        <SectionLargeText />
      </div>
      <Footer blockData={footer.items} />
    </>
  )
}

export default AppLayout
