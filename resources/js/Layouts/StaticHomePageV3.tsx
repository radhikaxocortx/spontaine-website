import SpontaineV3Hero from '@/components/Home/SpontaineV3Hero'
import MetaTags from '@/components/MetaTags'
import { useSmoothPageScroll } from '@/hooks/useSmoothPageScroll'
import CompanyLogosMarquee from '@/Modules/PageBuilder/Blocks/HomeBlocks/CompanyLogosMarquee'
import SectionAlignedAction from '@/Modules/PageBuilder/Blocks/HomeBlocks/SectionAlignedAction'
import SectionBlogsCarousel from '@/Modules/PageBuilder/Blocks/HomeBlocks/SectionBlogsCarousel'
import SectionChat from '@/Modules/PageBuilder/Blocks/HomeBlocks/SectionChat'
import SectionCTA from '@/Modules/PageBuilder/Blocks/HomeBlocks/SectionCTA'
import SectionTestimonial from '@/Modules/PageBuilder/Blocks/HomeBlocks/SectionTestimonial'
import VideoFeatureCarousel from '@/Modules/PageBuilder/Blocks/HomeBlocks/VideoFeatureCarousel'
import { FooterDataInterface } from '@/Modules/PageBuilder/FooterEditor/FooterEditor'
import { Page } from '@/Modules/PageBuilder/page_interfaces'
import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import Footer from './Footer/Footer'
import Navbar from './Navbar/Navbar'

interface StaticHomePageV3Props {
  featuredVideoPosts?: Page[]
  featuredBlogs?: Page[]
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
}

const StaticHomePageV3 = ({
  featuredBlogs = [],
  title = 'Governed Intelligence Your Firm Owns',
  description = `Spontaine turns firm data and experience into a governed intelligence layer your people can reuse in dashboards, workflows, client products, and decisions.`,
  image = 'https://spontaine.com/storage/images/16.png',
  noIndex = false,
}: StaticHomePageV3Props) => {
  const { footer } = usePage<PageProps & { footer: { items: FooterDataInterface } }>().props

  useSmoothPageScroll()

  useEffect(() => {
    const loadCookieConsent = async () => {
      await import('cookieconsent/build/cookieconsent.min.css')
      await import('cookieconsent')

      // @ts-expect-error - cookieconsent is loaded as a global
      if (window.cookieconsent) {
        // @ts-expect-error - cookieconsent is loaded as a global
        window.cookieconsent.initialise({
          palette: {
            popup: {
              background: 'var(--spontaine-dark)',
              text: 'var(--spontaine-white)',
            },
            button: {
              background: 'var(--spontaine-accent)',
              text: 'var(--spontaine-dark)',
            },
          },
          theme: 'classic',
          position: 'bottom-right',
          type: 'opt-in',
          content: {
            message:
              'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.',
            dismiss: 'Reject All',
            allow: 'Accept All',
            link: 'Privacy Policy',
            href: '/privacy-policy',
          },
        })
      }
    }

    loadCookieConsent()
  }, [])

  return (
    <div className='overflow-x-hidden'>
      <Navbar />
      <MetaTags
        title={title}
        description={description}
        image={image}
        noIndex={noIndex}
      />
      <div className='relative w-full max-w-full overflow-x-hidden bg-spontaine-white'>
        <SpontaineV3Hero />

        <div id='product'>
          <SectionChat />
        </div>
        <VideoFeatureCarousel />
        <SectionAlignedAction />
        <CompanyLogosMarquee />
        <SectionTestimonial />

        <div id='resources'>
          <SectionBlogsCarousel featuredBlogs={featuredBlogs} />
        </div>
        <SectionCTA />
      </div>
      <Footer blockData={footer.items} />
    </div>
  )
}

export default StaticHomePageV3
