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
    compact ? [82, 24, 0, 18, 34, 48] : [120, 34, 0, 30, 58, 84]
  )
  const x = useTransform(
    layerProgress,
    [-1.15, -0.2, 0, 1, 2, 3],
    compact ? [0, 0, 0, 10, 18, 24] : [0, 0, 0, 22, 40, 56]
  )
  const scale = useTransform(
    layerProgress,
    [-1.15, -0.2, 0, 1, 2, 3],
    compact ? [0.985, 0.995, 1, 0.972, 0.946, 0.925] : [0.985, 0.995, 1, 0.96, 0.92, 0.9]
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
