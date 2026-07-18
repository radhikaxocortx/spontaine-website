import { CalendarBooking } from '@/components/CalendarBooking'
import { Button } from '@/components/ui/button'
import { Language } from '@/components/ui/ui_interfaces'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { BlocKFieldInfo } from '../../Components/BlockEditor/BlockEditor'
import { CTAEditModal } from '../../Components/CTAEditModal'
import EditLabel from '../../Components/EditLabel'
import Localization from '../../Components/Localization'
import { OverlayEditModal } from '../../Components/OverlayEditModal'
import { BlockConfiguration, BlockImage, LinkData, TextData } from '../../page_interfaces'

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)

export interface HeroImageBlock extends BlockConfiguration {
  id?: number
  title: TextData
  subtitle: TextData
  description: TextData
  backgroundImage?: BlockImage | null
  overlayColor?: string
  overlayOpacity?: number
  showArc?: boolean
  cta?: LinkData | null
  calendarUrl?: string | null
  titleColor?: TextData
  descriptionColor?: TextData
}

const placeholderTitle = 'One Source of Truth.'
const placeholderTitleMal = 'സത്യത്തിന്റെ ഒരു ഉറവിടം.'

const placeholderSubtitle = 'Infinite Automation.'
const placeholderSubtitleMal = 'അനന്തമായ യാന്ത്രികവൽക്കരണം.'

const placeholderDescription =
  'Spontaine unifies all your data into one insights machine, empowering your internal experts to execute strategically'
const placeholderDescriptionMal =
  'സ്‌പോൺടൈൻ നിങ്ങളുടെ എല്ലാ ഡാറ്റയും ഒരു സ്‌ഥിതിവിവരക്കണക്ക് യന്ത്രത്തിലേക്ക് ഏകീകരിക്കുന്നു, നിങ്ങളുടെ ആന്തരിക വിദഗ്ധരെ തന്ത്രപരമായി നടപ്പിലാക്കാൻ ശാക്തീകരിക്കുകയും AI-നയിക്കുന്ന ഓട്ടോമേഷൻ 100 മടങ്ങ് വേഗത്തിലും തികഞ്ഞ കൃത്യതയോടെയും സമാരംഭിക്കുകയും ചെയ്യുന്നു.'

export const placeholderImage = {
  url: '/imge/home/hero.png',
  caption: 'Hero background',
}

export const heroImageBlock: HeroImageBlock = {
  title: {
    english: placeholderTitle,
    malayalam: placeholderTitleMal,
  },
  subtitle: {
    english: placeholderSubtitle,
    malayalam: placeholderSubtitleMal,
  },
  description: {
    english: placeholderDescription,
    malayalam: placeholderDescriptionMal,
  },
  backgroundImage: placeholderImage,
  overlayColor: '#000000',
  overlayOpacity: 0,
  showArc: false,
  cta: null,
  calendarUrl: null,
  titleColor: { english: '#000000', malayalam: '#000000' },
  descriptionColor: { english: '#1F2937', malayalam: '#1F2937' },
}

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: HeroImageBlock
  language?: Language
}

const SectionHeroImageSP = ({
  editMode = false,
  onFieldEdit,
  blockData = heroImageBlock,
  language = 'en',
}: Properties) => {
  const arcRef = useRef(null)
  const [showBgEditModal, setShowBgEditModal] = useState(false)
  const [showCTAEditModal, setShowCTAEditModal] = useState(false)

  const handleCTAClick = () => {
    if (blockData.cta?.link) {
      if (blockData.cta.external) {
        window.open(blockData.cta.link, '_blank')
      } else {
        window.location.href = blockData.cta.link
      }
    }
  }

  const handleOverlaySave = (data: { overlayColor: string; overlayOpacity: number }) => {
    Object.assign(blockData, data)
  }

  const handleCTASave = (data: { cta?: LinkData | null; calendarUrl?: string | null }) => {
    Object.assign(blockData, data)
  }

  useEffect(() => {
    if (!blockData.showArc) return

    const arc = arcRef.current

    const normalArc = 'M0,80 C300,20 900,20 1200,80 L1200,200 L0,200 Z'
    const inwardArc = 'M0,80 C300,5 900,5 1200,80 L1200,200 L0,200 Z'

    // Subtle fluid animation when arc enters viewport
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#arc-wrapper',
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.to(arc, {
      morphSVG: inwardArc,
      duration: 1.2,
      ease: 'power2.inOut',
    }).to(arc, {
      morphSVG: normalArc,
      duration: 1.2,
      ease: 'power2.inOut',
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [blockData.showArc])

  return (
    <section
      id='hero'
      className={`relative min-h-screen w-full overflow-hidden ${blockData?.marginTop} ${blockData?.marginBottom} ${blockData?.paddingTop} ${blockData?.paddingBottom}`}
    >
      {/* BACKGROUND IMAGE */}
      {blockData?.backgroundImage?.url && (
        <img
          src={blockData.backgroundImage.url}
          alt={blockData.backgroundImage.caption || 'Hero background'}
          className='absolute inset-0 z-0 h-full w-full object-cover'
        />
      )}

      {/* OVERLAY */}
      <div
        className='pointer-events-none absolute inset-0 z-[1]'
        style={{
          backgroundColor: blockData.overlayColor || '#000000',
          opacity: (blockData.overlayOpacity ?? 0) / 100,
        }}
      ></div>

      {editMode && onFieldEdit != null && (
        <div className='absolute left-4 top-4 z-20 flex flex-col gap-2'>
          <EditLabel
            onClick={() => setShowBgEditModal(true)}
            label='Edit Overlay'
          />
          <EditLabel
            onClick={() => {
              onFieldEdit({
                action: 'INSERT',
                field: 'backgroundImage',
                fieldType: 'image',
                oldValue: blockData.backgroundImage,
              })
            }}
            label='Edit Background Image'
          />
        </div>
      )}

      {/* HERO CONTENT */}
      <AppLayoutPadding>
        <div className='relative z-10 flex min-h-screen flex-col items-center justify-center pb-12 pt-32 text-center sm:pb-20 sm:pt-48'>
          {/* Main Title */}
          <div className='mb-8'>
            <h1
              className='mb-2 font-display text-[48px] font-medium leading-[1] sm:text-[64px] lg:text-[80px] xl:text-[96px]'
              style={{ color: blockData.titleColor?.english || '#000000' }}
            >
              <Localization
                text={blockData.title}
                language={language}
              />
              {editMode && onFieldEdit != null && (
                <EditLabel
                  label='Edit Title'
                  onClick={() => {
                    onFieldEdit({
                      field: 'title',
                      fieldType: 'text',
                      oldValue: blockData.title,
                      action: 'UPDATE',
                    })
                  }}
                />
              )}
            </h1>
            <h2
              className='font-display text-[48px] font-medium leading-[1.1] sm:text-[64px] lg:text-[80px] xl:text-[96px]'
              style={{ color: blockData.titleColor?.english || '#000000' }}
            >
              <em className='font-light italic'>
                <Localization
                  text={blockData.subtitle}
                  language={language}
                />
              </em>
              {editMode && onFieldEdit != null && (
                <EditLabel
                  label='Edit Subtitle'
                  onClick={() => {
                    onFieldEdit({
                      field: 'subtitle',
                      fieldType: 'text',
                      oldValue: blockData.subtitle,
                      action: 'UPDATE',
                    })
                  }}
                />
              )}
            </h2>
          </div>
          {/* Color Edit Controls */}
          {editMode && onFieldEdit != null && (
            <div className='flex flex-col gap-2'>
              <EditLabel
                onClick={() => {
                  onFieldEdit({
                    field: 'titleColor',
                    fieldType: 'text',
                    oldValue: blockData.titleColor || { english: '#000000', malayalam: '#000000' },
                    action: 'UPDATE',
                  })
                }}
                label='Title Color (Hex)'
              />
              <EditLabel
                onClick={() => {
                  onFieldEdit({
                    field: 'descriptionColor',
                    fieldType: 'text',
                    oldValue: blockData.descriptionColor || {
                      english: '#1F2937',
                      malayalam: '#1F2937',
                    },
                    action: 'UPDATE',
                  })
                }}
                label='Description Color (Hex)'
              />
            </div>
          )}

          {/* Description */}
          <div className='mb-12'>
            <p
              className='mx-auto max-w-[560px] font-body text-[16px] font-normal leading-[1.8] sm:text-[20px]'
              style={{ color: blockData.descriptionColor?.english || '#1F2937' }}
            >
              <Localization
                text={blockData.description}
                language={language}
              />
              {editMode && onFieldEdit != null && (
                <EditLabel
                  label='Edit Description'
                  onClick={() => {
                    onFieldEdit({
                      field: 'description',
                      fieldType: 'text',
                      oldValue: blockData.description,
                      action: 'UPDATE',
                    })
                  }}
                />
              )}
            </p>
          </div>

          {/* CTA Button */}
          {(blockData.cta || blockData.calendarUrl || editMode) && (
            <div className='mb-8'>
              {blockData.calendarUrl ? (
                <CalendarBooking>
                  {({ openCalendar }) => (
                    <Button
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
                    onClick={handleCTAClick}
                    size='lg'
                    className='relative overflow-hidden rounded-full bg-spontaine-highlight py-6 text-white shadow-2xl'
                  >
                    <span className='nav-cta-text'>
                      <Localization
                        text={blockData.cta?.name || { english: 'Get Started', malayalam: null }}
                        language={language}
                      />
                    </span>
                  </Button>
                )
              )}
              {editMode && onFieldEdit != null && (
                <div className='mt-2'>
                  <EditLabel
                    label='Edit CTA'
                    onClick={() => setShowCTAEditModal(true)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </AppLayoutPadding>

      {/* ARC AT THE END OF HERO */}
      {blockData.showArc && (
        <div
          id='arc-wrapper'
          className='absolute bottom-0 left-0 w-full'
        >
          <svg
            viewBox='0 0 1200 200'
            preserveAspectRatio='none'
            className='h-[200px] w-full'
          >
            <path
              ref={arcRef}
              fill='#ffffff'
              d='M0,80 C300,20 900,20 1200,80 L1200,200 L0,200 Z'
            />
          </svg>
        </div>
      )}

      {/* MODALS */}
      <OverlayEditModal
        show={showBgEditModal && editMode}
        onClose={() => setShowBgEditModal(false)}
        currentColor={blockData.overlayColor}
        currentOpacity={blockData.overlayOpacity}
        onSave={handleOverlaySave}
      />

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

export default SectionHeroImageSP
