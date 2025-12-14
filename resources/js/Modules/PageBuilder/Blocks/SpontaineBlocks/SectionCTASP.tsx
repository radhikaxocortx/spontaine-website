import { CalendarBooking } from '@/components/CalendarBooking'
import { Button } from '@/components/ui/button'
import useMounted from '@/hooks/useMounted'
import { cn } from '@/lib/utils'
import { BlocKFieldInfo } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import { CTAEditModal } from '@/Modules/PageBuilder/Components/CTAEditModal'
import EditLabel from '@/Modules/PageBuilder/Components/EditLabel'
import { displayText } from '@/Modules/PageBuilder/Components/Localization'
import {
  Block,
  BlockConfiguration,
  LinkData,
  TextData,
} from '@/Modules/PageBuilder/page_interfaces'
import { Language } from '@/Modules/PageBuilder/Pages/PageBuilder'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

export interface SectionCTASPBlock extends Block, BlockConfiguration {
  backgroundColor: TextData
  title: TextData
  titleColor: TextData
  showCTA: TextData // 'true' | 'false'
  cta?: LinkData | null
  calendarUrl?: string | null
}

interface SectionCTASPProps {
  blockData?: SectionCTASPBlock
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  language?: Language
  className?: string
}

export const sectionCTASPBlock: Omit<SectionCTASPBlock, keyof Block> = {
  backgroundColor: {
    english: 'linear-gradient(0deg, #44ECA0 0%, #C3FF6E 100%)',
    malayalam: '',
  },
  title: {
    english: 'Ready for your PoC?',
    malayalam: '',
  },
  titleColor: {
    english: '#1a1a1a',
    malayalam: '',
  },
  showCTA: {
    english: 'true',
    malayalam: '',
  },
  cta: null,
  calendarUrl: 'intuonfx/30min',
  marginTop: '',
  marginBottom: '',
  paddingTop: '',
  paddingBottom: '',
}

const SectionCTASP = ({
  blockData = sectionCTASPBlock as SectionCTASPBlock,
  editMode = false,
  onFieldEdit,
  language = 'en',
  className,
}: SectionCTASPProps) => {
  const isMounted = useMounted()
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [showCTAEditModal, setShowCTAEditModal] = useState(false)

  const backgroundColor =
    displayText(blockData.backgroundColor, language) ||
    'linear-gradient(0deg, #44ECA0 0%, #C3FF6E 100%)'
  const title = displayText(blockData.title, language) || ''
  const titleColor = displayText(blockData.titleColor, language) || '#1a1a1a'
  const showCTA = displayText(blockData.showCTA, language) === 'true'

  const handleCTAClick = () => {
    if (blockData.cta?.link) {
      if (blockData.cta.external) {
        window.open(blockData.cta.link, '_blank')
      } else {
        window.location.href = blockData.cta.link
      }
    }
  }

  const handleCTASave = (data: { cta?: LinkData | null; calendarUrl?: string | null }) => {
    Object.assign(blockData, data)
  }

  const onEdit = (field: string, fieldType: 'text' | 'image', oldValue: TextData) => {
    if (onFieldEdit) {
      onFieldEdit({
        field,
        fieldType,
        oldValue: oldValue ?? '',
        action: 'UPDATE',
      })
    }
  }

  useEffect(() => {
    if (!isMounted || editMode) return

    const ctx = gsap.context(() => {
      gsap.set([headingRef.current, buttonRef.current], { opacity: 0, y: 40 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })

      if (showCTA) {
        tl.to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.6'
        )
      }
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [isMounted, editMode, showCTA])

  return (
    <section
      ref={sectionRef}
      data-section-cta
      className={cn(
        'relative w-full overflow-hidden',
        blockData.marginTop,
        blockData.marginBottom,
        blockData.paddingTop,
        blockData.paddingBottom,
        className
      )}
      style={{
        background: backgroundColor,
      }}
    >
      {isMounted && (
        <div className='relative flex min-h-[600px] items-center justify-center'>
          <div className='relative z-10 mx-auto mb-16 flex max-w-4xl flex-col items-center justify-center px-6 text-center'>
            {/* Title */}
            {title && (
              <h2
                ref={headingRef}
                className='mb-8 font-heading text-5xl font-normal leading-tight sm:mb-12 sm:text-6xl lg:text-7xl xl:text-[88.9px] xl:leading-[120px]'
                style={{ color: titleColor }}
              >
                {title}
              </h2>
            )}
            {editMode && (
              <div className='mb-4 flex flex-wrap justify-center gap-2'>
                <EditLabel
                  label='Edit Title'
                  onClick={() => onEdit('title', 'text', blockData.title)}
                />
                <EditLabel
                  label='Edit Title Color'
                  onClick={() => onEdit('titleColor', 'text', blockData.titleColor)}
                />
              </div>
            )}

            {/* CTA Button */}
            {showCTA && (blockData.cta || blockData.calendarUrl || editMode) && (
              <div className='mb-4'>
                {blockData.calendarUrl ? (
                  <CalendarBooking>
                    {({ openCalendar }) => (
                      <Button
                        ref={buttonRef}
                        onClick={openCalendar}
                        size='lg'
                        className='relative overflow-hidden rounded-full bg-spontaine-highlight py-6 text-white shadow-2xl'
                      >
                        <span className='nav-cta-text'>Book Demo</span>
                      </Button>
                    )}
                  </CalendarBooking>
                ) : (
                  blockData.cta && (
                    <Button
                      ref={buttonRef}
                      onClick={handleCTAClick}
                      size='lg'
                      className='relative overflow-hidden rounded-full bg-spontaine-highlight py-6 text-white shadow-2xl'
                    >
                      <span className='nav-cta-text'>
                        {blockData.cta?.name?.english || 'Get Started'}
                      </span>
                    </Button>
                  )
                )}
              </div>
            )}

            {editMode && (
              <div className='flex flex-wrap justify-center gap-2'>
                <EditLabel
                  label={showCTA ? 'Hide CTA Button' : 'Show CTA Button'}
                  onClick={() =>
                    onEdit(
                      'showCTA',
                      'text',
                      showCTA
                        ? { english: 'false', malayalam: '' }
                        : { english: 'true', malayalam: '' }
                    )
                  }
                />
                {showCTA && (
                  <EditLabel
                    label='Edit CTA'
                    onClick={() => setShowCTAEditModal(true)}
                  />
                )}
                <EditLabel
                  label='Edit Background'
                  onClick={() => onEdit('backgroundColor', 'text', blockData.backgroundColor)}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* CTA EDIT MODAL */}
      <CTAEditModal
        show={showCTAEditModal && editMode}
        onClose={() => setShowCTAEditModal(false)}
        currentCTA={blockData.cta}
        currentCalendarUrl={blockData.calendarUrl}
        onSave={handleCTASave}
      />
    </section>
  )
}

export default SectionCTASP
