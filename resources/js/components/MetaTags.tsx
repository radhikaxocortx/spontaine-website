import { Head } from '@inertiajs/react'

export interface MetaTagsFields {
  title?: string
  description?: string
  image?: string
  url?: string
  noIndex?: boolean
}

const fallbackUrl = 'https://spontaine.com/'
const fallbackImage =
  'https://spontaine.com/storage/images/8205df31-7880-4c23-902d-6b222d8174b5.png'

const resolveAbsoluteUrl = (value?: string, fallback = fallbackUrl): string => {
  const trimmedValue = value?.trim()

  if (!trimmedValue) {
    return fallback
  }

  if (trimmedValue.startsWith('http://') || trimmedValue.startsWith('https://')) {
    return trimmedValue
  }

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : fallbackUrl

  return new URL(trimmedValue, baseUrl).toString()
}

const MetaTags = ({
  title = 'Spontaine',
  description = 'Governed AI data infrastructure for professional services firms.',
  image = fallbackImage,
  url,
  noIndex = false,
}: MetaTagsFields) => {
  const domain = 'spontaine.com'
  const resolvedUrl = url ?? (typeof window !== 'undefined' ? window.location.href : fallbackUrl)
  const absoluteUrl = resolveAbsoluteUrl(resolvedUrl)
  const absoluteImage = resolveAbsoluteUrl(image, fallbackImage)

  return (
    <Head title={title}>
      {/* Robots */}
      <meta
        name='robots'
        content={noIndex ? 'noindex' : 'index,follow'}
      />

      {/* Canonical */}
      <link
        rel='canonical'
        href={absoluteUrl}
      />

      {/* Open Graph */}
      <meta
        property='og:site_name'
        content='Spontaine'
      />
      <meta
        property='og:title'
        content={title}
      />
      <meta
        property='og:description'
        content={description}
      />
      <meta
        property='og:image'
        content={absoluteImage}
      />
      <meta
        property='og:image:width'
        content='1200'
      />
      <meta
        property='og:image:height'
        content='630'
      />
      <meta
        property='og:url'
        content={absoluteUrl}
      />
      <meta
        property='og:type'
        content='website'
      />

      {/* Twitter */}

      <meta
        name='twitter:card'
        content='summary_large_image'
      />
      <meta
        name='twitter:title'
        content={title}
      />
      <meta
        name='twitter:description'
        content={description}
      />
      <meta
        name='twitter:url'
        content={absoluteUrl}
      />
      <meta
        name='twitter:image'
        content={absoluteImage}
      />
      <meta
        name='twitter:domain'
        content={domain}
      />

      {/* SEO */}
      <meta
        name='description'
        content={description}
      />

      <meta
        name='keywords'
        content='governed AI, professional services AI, enterprise intelligence, AI data infrastructure, data governance, firm-owned AI, workflow automation'
      ></meta>

      <meta
        name='author'
        content='Spontaine'
      />
    </Head>
  )
}

export default MetaTags
