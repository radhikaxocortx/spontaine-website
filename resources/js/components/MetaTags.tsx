import { Head } from '@inertiajs/react'

export interface MetaTagsFields {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
}

const MetaTags = ({
  title = 'No-Code Data Integration & AI Platform for Enterprise',
  description = `Transform your disconnected systems into an AI-driven command center with Spontaine’s no-code data integration platform. Get real-time insights, eliminate data silos, and enable AI adoption across your organization - all in weeks, not quarters.`,
  image = 'https://spontaine.com/storage/images/14.png',
  noIndex = false,
}: MetaTagsFields) => {
  const url = 'https://spontaine.com/'

  return (
    <Head title={title}>
      <meta
        name='robots'
        content={`${noIndex ? 'noindex' : 'index'}`}
      />

      <meta
        name='twitter:card'
        content='summary_large_image'
      />
      <meta
        name='twitter:title'
        content='Spontaine - No-Code AI Data Integration Platform'
      />
      <meta
        name='twitter:domain'
        content={url}
      />
      <meta
        name='twitter:image:src'
        content={image}
      />
      <meta
        name='twitter:description'
        content={description}
      />
      <meta
        name='title'
        property='og:title'
        content={title}
      />
      <meta
        property='og:type'
        content='article'
      />
      <meta
        name='og:url'
        content={url}
      />
      <meta
        name='image'
        property='og:image'
        content={image}
      />
      <meta
        name='description'
        property='og:description'
        content={description}
      />
      <meta
        name='author'
        content='Spontaine'
      />
      <meta
        property='og:title'
        content='Spontaine - No-Code AI Data Integration Platform'
      />
      <meta
        property='og:type'
        content='website'
      />
      <meta
        property='og:url'
        content={url}
      />
      <meta
        property='og:image'
        content={image}
      />
      <meta
        property='og:description'
        content='Transform disconnected systems into an AI-driven command center. Get deep insights & unified decision intelligence in weeks, not quarters.'
      />
      <meta
        name='keywords'
        content='no-code data integration, AI data platform, business intelligence, data unification, semantic layer, automated data sourcing, enterprise data integration, real-time insights, data silos elimination, AI adoption'
      ></meta>
    </Head>
  )
}

export default MetaTags
