import type { SectionHeroV3Model } from './useSectionHeroV3Model'

interface SectionHeroV3BackgroundProps {
  model: SectionHeroV3Model
}

const SectionHeroV3Background = ({ model }: SectionHeroV3BackgroundProps) => {
  const { backgroundColor, backgroundImage, hasImage, overlayColor, overlayOpacity } = model

  return (
    <div className='absolute inset-0 z-0'>
      {hasImage ? (
        <>
          <img
            src={backgroundImage?.url}
            alt={backgroundImage?.caption || 'Hero background'}
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
            className='animate-v3-ken-burns-slow bg-pagebuilder-hero-wash absolute inset-0'
            aria-hidden='true'
          />
        )
      )}
    </div>
  )
}

export default SectionHeroV3Background
