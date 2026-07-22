import SectionBentoV3 from '@/components/Home/Bento/SectionBentoV3'
import SectionChatV3 from '@/components/Home/Chat/SectionChatV3'
import SectionBlogsCarouselV3 from '@/components/Home/SectionBlogsCarouselV3'
import SectionCTAV3 from '@/components/Home/SectionCTAV3'
import SectionTestBannerV3 from '@/components/Home/SectionTestBannerV3'
import SpontaineV3Hero from '@/components/Home/SpontaineV3Hero'
import SectionStackV3 from '@/components/Home/Stack/SectionStackV3'
import MetaTags from '@/components/MetaTags'
import { useSmoothPageScroll } from '@/hooks/useSmoothPageScroll'
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
  title = 'Governed AI Data Infrastructure for Professional Services',
  description = `Spontaine turns your firm's data and judgment into governed intelligence you own - one system orchestrating client delivery, workflows, dashboards, and outputs.`,
  image = 'https://spontaine.com/storage/images/8205df31-7880-4c23-902d-6b222d8174b5.png',
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

        <div
          id='product'
          className='relative z-30 -mt-8 md:-mt-10 lg:-mt-12 xl:-mt-20'
        >
          <SectionChatV3 />
        </div>
        {/* <VideoFeatureCarousel /> */}
        <SectionBentoV3 />
        {/* <CompanyLogosMarquee /> */}
        <div className='relative z-20 -mt-8 md:-mt-10 lg:-mt-12 xl:-mt-16'>
          <SectionStackV3 />
        </div>
        <SectionTestBannerV3 />
        {/* <SectionTestimonial /> */}

        <div id='resources'>
          <SectionBlogsCarouselV3 featuredBlogs={featuredBlogs} />
        </div>
        <div className='relative z-20 -mt-8 md:-mt-10 lg:-mt-12 xl:-mt-20'>
          <SectionCTAV3 />
        </div>
      </div>
      <Footer blockData={footer.items} />
    </div>
  )
}

export default StaticHomePageV3
