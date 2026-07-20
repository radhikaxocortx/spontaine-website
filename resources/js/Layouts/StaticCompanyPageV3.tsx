import MetaTags from '@/components/MetaTags'
import SectionCompanyHeroV3 from '@/components/Company/SectionCompanyHeroV3'
import { useSmoothPageScroll } from '@/hooks/useSmoothPageScroll'
import { FooterDataInterface } from '@/Modules/PageBuilder/FooterEditor/FooterEditor'
import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import Footer from './Footer/Footer'
import Navbar from './Navbar/Navbar'

interface StaticCompanyPageV3Props {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
}

const StaticCompanyPageV3 = ({
  title = 'Company | Spontaine',
  description = 'Spontaine is governed intelligence for professional-services firms, built from seven years of doing the hard work inside enterprise and government environments.',
  image = 'https://spontaine.com/storage/images/16.png',
  noIndex = false,
}: StaticCompanyPageV3Props) => {
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
        <SectionCompanyHeroV3 />
      </div>
      <Footer blockData={footer.items} />
    </div>
  )
}

export default StaticCompanyPageV3
