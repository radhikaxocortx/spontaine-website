import Localization from '@/Modules/PageBuilder/Components/Localization'
import { LinkData } from '@/Modules/PageBuilder/page_interfaces'
import { Language } from '@/Modules/PageBuilder/Pages/PageBuilder'
import { Link } from '@inertiajs/react'
import React, { useMemo } from 'react'

interface Properties {
  link?: LinkData
  className?: string
  language?: Language
  children?: React.ReactNode
}

const InertiaLink = ({ link, className = '', language = 'en', children }: Properties) => {
  const customUrl = useMemo(() => {
    if (link == null || link.link == null) {
      return ''
    }
    if (link.external || language === 'en') {
      return link.link
    }
    const hasOtherParameters = link.link.includes('?')
    if (hasOtherParameters) {
      return `${link.link}&lang=${language}`
    }
    return `${link.link}?lang=${language}`
  }, [language, link])

  return (
    <>
      {link != null && (
        <>
          {link.external && (
            <a
              href={customUrl}
              className={className}
              target='_blank'
              rel='noreferrer'
              aria-label='External Link'
            >
              {children == null && (
                <Localization
                  text={link.name}
                  language={language}
                />
              )}
              {children}
            </a>
          )}
          {!link.external && (
            <Link
              as='a'
              href={customUrl}
              className={className}
            >
              {children == null && (
                <Localization
                  text={link.name}
                  language={language}
                />
              )}
              {children}
            </Link>
          )}
        </>
      )}
    </>
  )
}

export default InertiaLink
