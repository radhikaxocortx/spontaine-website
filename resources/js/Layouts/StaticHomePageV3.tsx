import SectionBuildV3 from '@/components/Home/Build/SectionBuildV3'
import SectionChatV3 from '@/components/Home/Chat/SectionChatV3'
import SectionContrastV3 from '@/components/Home/Contrast/SectionContrastV3'
import SectionFaqV3 from '@/components/Home/Faq/SectionFaqV3'
import SectionBlogsCarouselV3 from '@/components/Home/SectionBlogsCarouselV3'
import SectionCTAV3 from '@/components/Home/SectionCTAV3'
import SectionTestBannerV3 from '@/components/Home/SectionTestBannerV3'
import SectionSolutionsV3 from '@/components/Home/Solutions/SectionSolutionsV3'
import SpontaineV3Hero from '@/components/Home/SpontaineV3Hero'
import SectionStackV3 from '@/components/Home/Stack/SectionStackV3'
import StackUpBand from '@/components/Home/StackUpBand'
import SectionStartV3 from '@/components/Home/Start/SectionStartV3'
import SectionTrustV3 from '@/components/Home/Trust/SectionTrustV3'
import MetaTags from '@/components/MetaTags'
import { useSectionViewed } from '@/hooks/useSectionViewed'
import { useSmoothPageScroll } from '@/hooks/useSmoothPageScroll'
import { FooterDataInterface } from '@/Modules/PageBuilder/FooterEditor/FooterEditor'
import { Page } from '@/Modules/PageBuilder/page_interfaces'
import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import Footer from './Footer/Footer'
import Navbar from './Navbar/Navbar'

/** Fixed anchor ids: other pages and outbound emails link to these. */
const HOME_SECTION_IDS = [
  'top',
  'solutions',
  'example',
  'choices',
  'architecture',
  'build',
  'faq',
  'first-question',
  'security',
  'belief',
  'book',
] as const

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
  title = 'Unify your operational stack and unlock working AI in weeks',
  description = "Professional services and industrial operations don't fail at AI for lack of ambition. Their data is trapped in legacy ERPs, machines, time tools and CRMs. Spontaine unifies your stack in place in four weeks.",
  image = 'https://spontaine.com/images/home/home-share.jpg',
  noIndex = false,
}: StaticHomePageV3Props) => {
  const { footer } = usePage<PageProps & { footer: { items: FooterDataInterface } }>().props

  useSmoothPageScroll()
  useSectionViewed(HOME_SECTION_IDS)

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
        {/* The hero background extends behind the solutions glass panel */}
        <div className='relative isolate overflow-hidden bg-hero-wash'>
          <SpontaineV3Hero />
          <SectionSolutionsV3 />
        </div>

        <div
          id='product'
          className='relative z-30 -mt-8 md:-mt-10 lg:-mt-12 xl:-mt-20'
        >
          <SectionChatV3 />
        </div>
        {/* <VideoFeatureCarousel /> */}
        <StackUpBand className='relative'>
          <SectionContrastV3 />
        </StackUpBand>
        {/* <CompanyLogosMarquee /> */}
        <div className='relative z-20 -mt-8 md:-mt-10 lg:-mt-12 xl:-mt-16'>
          <SectionStackV3 />
        </div>
        <div className='relative z-20'>
          <SectionBuildV3 />
        </div>
        <div className='relative z-20 -mt-8 md:-mt-10 lg:-mt-12 xl:-mt-16'>
          <SectionFaqV3 />
        </div>
        <div className='relative z-20 -mt-8 md:-mt-10 lg:-mt-12 xl:-mt-16'>
          <SectionStartV3 />
        </div>
        <div className='relative z-20'>
          <SectionTrustV3 />
        </div>
        {/* Belief, quote and resources read as one cream band */}
        <StackUpBand className='relative z-20 -mt-8 md:-mt-10 lg:-mt-12 xl:-mt-16'>
          <SectionTestBannerV3 />
          {/* <SectionTestimonial /> */}
          <div id='resources'>
            <SectionBlogsCarouselV3 featuredBlogs={featuredBlogs} />
          </div>
        </StackUpBand>
        <StackUpBand className='relative z-20 -mt-8 md:-mt-10 lg:-mt-12 xl:-mt-20'>
          <SectionCTAV3 />
        </StackUpBand>
      </div>
      <Footer blockData={footer.items} />
    </div>
  )
}

export default StaticHomePageV3
