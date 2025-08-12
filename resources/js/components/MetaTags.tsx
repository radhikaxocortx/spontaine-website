import { Head } from '@inertiajs/react'

export interface MetaTagsFields {
  title?: string
  description?: string
  image?: string
  url?: string
  noIndex?: boolean
}

const MetaTags = ({
  title = 'No-Code Data Integration & AI Platform for Enterprise',
  description = `Transform your disconnected systems into an AI-driven command center with Spontaine’s no-code data integration platform. Get real-time insights, eliminate data silos, and enable AI adoption across your organization - all in weeks, not quarters.`,
  image = 'https://spontaine.com/storage/images/16.png',
  url = 'https://spontaine.com/',
  noIndex = false,
}: MetaTagsFields) => {
  const domain = 'spontaine.com'

  return (
    <Head title={title}>
      {/* Robots */}
      <meta
        name='robots'
        content={noIndex ? 'noindex' : 'index'}
      />

      {/* Canonical */}
      <link
        rel='canonical'
        href={url}
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
        content={image}
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
        name='og:url'
        content={url}
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
        property='twitter:url'
        content={url}
      />
      <meta
        name='twitter:image'
        content={image}
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
        content='no-code data integration, AI data platform, business intelligence, data unification, semantic layer, automated data sourcing, enterprise data integration, real-time insights, data silos elimination, AI adoption'
      ></meta>

      <meta
        name='author'
        content='Spontaine'
      />
    </Head>
  )
}

export default MetaTags
