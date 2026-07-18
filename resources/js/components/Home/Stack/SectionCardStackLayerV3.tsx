import { motion, MotionValue, useTransform } from 'framer-motion'
import SectionCardStackCardV3 from './SectionCardStackCardV3'
import { getCardProgress, STACK_CARD_COUNT, type StackCardData } from './sectionCardStackV3Content'

interface SectionCardStackLayerV3Props {
  readonly card: StackCardData
  readonly index: number
  readonly scrollYProgress: MotionValue<number>
  readonly isActive: boolean
  readonly compact?: boolean
}

export default function SectionCardStackLayerV3({
  card,
  index,
  scrollYProgress,
  isActive,
  compact = false,
}: SectionCardStackLayerV3Props) {
  const layerProgress = useTransform(scrollYProgress, (value) => getCardProgress(value, index))
  const y = useTransform(
    layerProgress,
    [-1.15, -0.2, 0, 1, 2, 3],
    compact ? [68, 20, 0, 16, 30, 42] : [92, 28, 0, 24, 46, 66]
  )
  const x = useTransform(
    layerProgress,
    [-1.15, -0.2, 0, 1, 2, 3],
    compact ? [0, 0, 0, 8, 14, 20] : [0, 0, 0, 12, 24, 36]
  )
  const scale = useTransform(
    layerProgress,
    [-1.15, -0.2, 0, 1, 2, 3],
    compact ? [0.99, 0.997, 1, 0.978, 0.956, 0.938] : [0.99, 0.997, 1, 0.975, 0.95, 0.93]
  )
  const opacity = useTransform(
    layerProgress,
    [-1.2, -0.35, 0, 1, 2, 3],
    [0, 0.42, 1, 0.78, 0.58, 0.36]
  )
  const rotate = useTransform(layerProgress, [-1, 0, 1, 2, 3], [0.6, 0, -0.8, -1.4, -2])
  const brightness = useTransform(layerProgress, [-1, 0, 1, 2, 3], [1, 1, 0.94, 0.9, 0.88])
  const filter = useTransform(brightness, (value) => `brightness(${value})`)

  return (
    <motion.div
      className='absolute inset-0 origin-top-left will-change-transform'
      style={{
        x,
        y,
        scale,
        opacity,
        rotate,
        filter,
        zIndex: isActive ? STACK_CARD_COUNT + 1 : STACK_CARD_COUNT - index,
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      <SectionCardStackCardV3
        card={card}
        isActive={isActive}
        fitStage
        compact={compact}
      />
    </motion.div>
  )
}
