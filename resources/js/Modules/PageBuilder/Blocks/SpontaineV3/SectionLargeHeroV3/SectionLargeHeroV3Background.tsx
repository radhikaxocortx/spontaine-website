import { cn } from '@/lib/utils'
import type { SectionLargeHeroV3Model } from './useSectionLargeHeroV3Model'

interface SectionLargeHeroV3BackgroundProps {
  model: SectionLargeHeroV3Model
}

const SectionLargeHeroV3Background = ({ model }: SectionLargeHeroV3BackgroundProps) => {
  const {
    backgroundColor,
    backgroundImage,
    fadesIntoNext,
    hasImage,
    overlayColor,
    overlayOpacity,
  } = model
  // A background image is decorative unless an editor gave it a caption.
  const caption = backgroundImage?.caption?.trim() ?? ''

  return (
    <div
      className={cn(
        'absolute inset-0 z-0',
        fadesIntoNext && !backgroundColor && 'bg-glass-wash-base'
      )}
    >
      {hasImage ? (
        <>
          <img
            src={backgroundImage?.url}
            alt={caption}
            aria-hidden={caption === '' ? true : undefined}
            className={cn(
              'animate-v3-ken-burns absolute inset-0 h-full w-full object-cover',
              fadesIntoNext && 'v3-hero-fade-mask object-right opacity-35 md:opacity-100'
            )}
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
        !backgroundColor &&
        !fadesIntoNext && (
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
