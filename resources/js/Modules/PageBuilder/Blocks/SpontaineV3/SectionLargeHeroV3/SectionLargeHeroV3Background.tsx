import type { SectionLargeHeroV3Model } from './useSectionLargeHeroV3Model'

interface SectionLargeHeroV3BackgroundProps {
  model: SectionLargeHeroV3Model
}

const SectionLargeHeroV3Background = ({ model }: SectionLargeHeroV3BackgroundProps) => {
  const { backgroundColor, backgroundImage, hasImage, overlayColor, overlayOpacity } = model

  return (
    <div className='absolute inset-0 z-0'>
      {hasImage ? (
        <>
          <img
            src={backgroundImage?.url}
            alt={backgroundImage?.caption || 'Large hero background'}
            className='animate-v3-ken-burns absolute inset-0 h-full w-full object-cover'
          />
          <div
            className='pointer-events-none absolute inset-0'
            style={{
              backgroundColor: overlayColor,
              opacity: overlayOpacity / 100,
            }}
          />
        </>
      ) : (
        !backgroundColor && (
          <div
            aria-hidden='true'
            className='animate-v3-ken-burns-slow absolute inset-0 bg-pagebuilder-hero-wash'
          />
        )
      )}
    </div>
  )
}

export default SectionLargeHeroV3Background
