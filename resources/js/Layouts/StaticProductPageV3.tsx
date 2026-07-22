import MetaTags from '@/components/MetaTags'
import SectionProductCompoundV3 from '@/components/Product/SectionProductCompoundV3'
import SectionProductCTAV3 from '@/components/Product/SectionProductCTAV3'
import SectionProductExpertV3 from '@/components/Product/SectionProductExpertV3'
import SectionProductGalleryV3 from '@/components/Product/SectionProductGalleryV3'
import SectionProductHeroV3 from '@/components/Product/SectionProductHeroV3'
import SectionProductOwnershipV3 from '@/components/Product/SectionProductOwnershipV3'
import SectionProductReachV3 from '@/components/Product/SectionProductReachV3'
import { useSmoothPageScroll } from '@/hooks/useSmoothPageScroll'
import { FooterDataInterface } from '@/Modules/PageBuilder/FooterEditor/FooterEditor'
import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import Footer from './Footer/Footer'
import Navbar from './Navbar/Navbar'

interface StaticProductPageV3Props {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
}

const StaticProductPageV3 = ({
  title = 'Governed AI Data Infrastructure Your Firm Owns',
  description = 'Spontaine ingests your data into a governed, client-exclusive environment — nothing migrates out. Your firm keeps full ownership of every workflow, dashboard, and output.',
  image = 'https://spontaine.com/storage/images/16.png',
  noIndex = false,
}: StaticProductPageV3Props) => {
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
        <SectionProductHeroV3 />
        <div className='relative z-20 -mt-8 md:-mt-10 lg:-mt-12 xl:-mt-16'>
          <SectionProductCompoundV3 />
        </div>
        <div className='relative z-20 -mt-8 md:-mt-10 lg:-mt-12 xl:-mt-16'>
          <SectionProductExpertV3 />
        </div>
        <div className='relative z-20 -mt-8 md:-mt-10 lg:-mt-12 xl:-mt-16'>
          <SectionProductReachV3 />
        </div>
        <div className='relative z-20 -mt-8 md:-mt-10 lg:-mt-12 xl:-mt-16'>
          <SectionProductOwnershipV3 />
        </div>
        <div className='relative z-20 -mt-8 md:-mt-10 lg:-mt-12 xl:-mt-16'>
          <SectionProductGalleryV3 />
        </div>
        <div className='relative z-20 -mt-8 md:-mt-10 lg:-mt-12 xl:-mt-16'>
          <SectionProductCTAV3 />
        </div>
      </div>
      <Footer blockData={footer.items} />
    </div>
  )
}

export default StaticProductPageV3
