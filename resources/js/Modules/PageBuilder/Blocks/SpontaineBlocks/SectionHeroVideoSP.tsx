import { Button } from '@/components/ui/button'
import { Language } from '@/components/ui/ui_interfaces'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { BlocKFieldInfo } from '../../Components/BlockEditor/BlockEditor'
import EditLabel from '../../Components/EditLabel'
import Localization from '../../Components/Localization'
import { BlockConfiguration, BlockVideo, LinkData, TextData } from '../../page_interfaces'

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)

export interface HeroVideoBlock extends BlockConfiguration {
  id?: number
  title: TextData
  subtitle: TextData
  description: TextData
  backgroundVideo?: BlockVideo | null
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

export const placeholderVideo = {
  url: 'https://cdn.web.imagine.art/imagine-dashboard/video-dashboard/videos/248_hd.mp4',
  mime: 'video/mp4',
}

export const heroVideoBlock: HeroVideoBlock = {
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
  backgroundVideo: null,
  overlayColor: '#000000',
  overlayOpacity: 30,
  showArc: false,
  cta: null,
  calendarUrl: null,
  titleColor: { english: '#FFFFFF', malayalam: '#FFFFFF' },
  descriptionColor: { english: '#E5E7EB', malayalam: '#E5E7EB' },
}

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: HeroVideoBlock
  language?: Language
}

const SectionHeroVideoSP = ({
  editMode = false,
  onFieldEdit,
  blockData = heroVideoBlock,
  language = 'en',
}: Properties) => {
  const arcRef = useRef(null)
  const [showModal, setShowModal] = useState(false)
  const [showBgEditModal, setShowBgEditModal] = useState(false)
  const [tempOverlayColor, setTempOverlayColor] = useState(blockData.overlayColor || '#000000')
  const [tempOverlayOpacity, setTempOverlayOpacity] = useState(blockData.overlayOpacity || 30)

  const handleCTAClick = () => {
    if (blockData.calendarUrl) {
      setShowModal(true)
    } else if (blockData.cta?.link) {
      if (blockData.cta.external) {
        window.open(blockData.cta.link, '_blank')
      } else {
        window.location.href = blockData.cta.link
      }
    }
  }

  const closeModal = () => {
    setShowModal(false)
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
      {/* BACKGROUND VIDEO */}
      {blockData?.backgroundVideo?.url ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className='absolute inset-0 z-0 h-full w-full object-cover'
        >
          <source
            src={blockData.backgroundVideo.url}
            type={blockData.backgroundVideo.mime || 'video/mp4'}
          />
          Your browser does not support the video tag.
        </video>
      ) : (
        editMode && (
          <div className='absolute inset-0 z-0 flex items-center justify-center bg-gray-900'>
            <p className='text-lg text-white'>
              No video selected. Click "Edit Background Video" to add one.
            </p>
          </div>
        )
      )}

      {/* OVERLAY */}
      <div
        className='pointer-events-none absolute inset-0 z-[1]'
        style={{
          backgroundColor: blockData.overlayColor || '#000000',
          opacity: (blockData.overlayOpacity ?? 30) / 100,
        }}
      ></div>

      {editMode && onFieldEdit != null && (
        <div className='absolute left-4 top-4 z-20 flex flex-col gap-2 text-blue-600'>
          <EditLabel
            onClick={() => setShowBgEditModal(true)}
            label='Edit Overlay'
          />
          <EditLabel
            onClick={() => {
              onFieldEdit({
                action: 'INSERT',
                field: 'backgroundVideo',
                fieldType: 'video',
                oldValue: blockData.backgroundVideo,
              })
            }}
            label='Edit Background Video'
          />
        </div>
      )}

      {/* HERO CONTENT */}
      <AppLayoutPadding>
        <div className='relative z-10 flex min-h-screen flex-col items-center justify-center pb-12 pt-32 text-center sm:pt-40'>
          {/* Main Title */}
          <div className='mb-8'>
            <h1
              className='mb-2 font-display text-[48px] font-medium leading-[1] sm:text-[64px] lg:text-[80px] xl:text-[96px]'
              style={{ color: blockData.titleColor?.english || '#FFFFFF' }}
            >
              <Localization
                text={blockData.title}
                language={language}
              />
              <div className='text-blue-600'>
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
              </div>
            </h1>
            <h2
              className='font-display text-[48px] font-medium leading-[1.1] sm:text-[64px] lg:text-[80px] xl:text-[96px]'
              style={{ color: blockData.titleColor?.english || '#FFFFFF' }}
            >
              <em className='font-light italic'>
                <Localization
                  text={blockData.subtitle}
                  language={language}
                />
              </em>
              <div className='text-blue-600'>
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
              </div>
            </h2>
          </div>
          {/* Color Edit Controls */}
          {editMode && onFieldEdit != null && (
            <div className='flex flex-col gap-2 text-blue-600'>
              <EditLabel
                onClick={() => {
                  onFieldEdit({
                    field: 'titleColor',
                    fieldType: 'text',
                    oldValue: blockData.titleColor || { english: '#FFFFFF', malayalam: '#FFFFFF' },
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
                      english: '#E5E7EB',
                      malayalam: '#E5E7EB',
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
              style={{ color: blockData.descriptionColor?.english || '#E5E7EB' }}
            >
              <Localization
                text={blockData.description}
                language={language}
              />
              <div className='text-blue-600'>
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
              </div>
            </p>
          </div>

          {/* CTA Button */}
          {(blockData.cta || blockData.calendarUrl || editMode) && (
            <div className='mb-8'>
              {(blockData.cta || blockData.calendarUrl) && (
                <Button
                  onClick={handleCTAClick}
                  size='lg'
                  className='relative overflow-hidden rounded-full bg-spontaine-highlight py-6 text-white shadow-2xl'
                >
                  <span className='nav-cta-text'>
                    {blockData.calendarUrl ? (
                      'Book Demo'
                    ) : (
                      <Localization
                        text={blockData.cta?.name || { english: 'Get Started', malayalam: null }}
                        language={language}
                      />
                    )}
                  </span>
                </Button>
              )}
              {editMode && onFieldEdit != null && (
                <div className='mt-2 flex gap-2 text-blue-600'>
                  <EditLabel
                    label='Edit CTA Button'
                    onClick={() => {
                      onFieldEdit({
                        field: 'cta',
                        fieldType: 'link',
                        oldValue: blockData.cta,
                        action: 'UPDATE',
                      })
                    }}
                  />
                  <EditLabel
                    onClick={() => {
                      onFieldEdit({
                        field: 'calendarUrl',
                        fieldType: 'text',
                        oldValue: { english: blockData.calendarUrl || '', malayalam: null },
                        action: 'UPDATE',
                      })
                    }}
                    label='Edit Calendar URL'
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

      {/* MODAL WITH IFRAME */}
      {showModal && blockData.calendarUrl && (
        <div
          className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm'
          onClick={closeModal}
        >
          <div
            className='relative w-[95%] max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className='absolute right-4 top-4 z-10 rounded-full bg-white/90 p-1 text-2xl text-gray-600 shadow-md hover:bg-white hover:text-gray-800'
            >
              ×
            </button>

            {/* Calendar Iframe */}
            <iframe
              src={blockData.calendarUrl}
              className='h-[650px] w-full border-0'
              allow='fullscreen'
            ></iframe>
          </div>
        </div>
      )}

      {/* BACKGROUND EDIT MODAL */}
      {showBgEditModal && editMode && onFieldEdit && (
        <div
          className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm'
          onClick={() => setShowBgEditModal(false)}
        >
          <div
            className='relative w-[95%] max-w-2xl overflow-hidden rounded-2xl bg-white p-6 shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowBgEditModal(false)}
              className='absolute right-4 top-4 z-10 rounded-full bg-gray-100 p-1 text-2xl text-gray-600 hover:bg-gray-200 hover:text-gray-800'
            >
              ×
            </button>

            <h3 className='mb-6 text-2xl font-semibold'>Edit Overlay</h3>

            {/* Overlay Settings */}
            <div>
              <h4 className='mb-4 text-lg font-semibold'>Overlay Settings</h4>

              {/* Overlay Color */}
              <div className='mb-4'>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Overlay Color
                </label>
                <div className='flex gap-2'>
                  <input
                    type='color'
                    value={tempOverlayColor}
                    onChange={(e) => setTempOverlayColor(e.target.value)}
                    className='h-12 w-20 cursor-pointer rounded border border-gray-300'
                  />
                  <input
                    type='text'
                    value={tempOverlayColor}
                    onChange={(e) => setTempOverlayColor(e.target.value)}
                    placeholder='#000000'
                    className='flex-1 rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>

              {/* Overlay Opacity */}
              <div className='mb-4'>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Overlay Opacity: {tempOverlayOpacity}%
                </label>
                <input
                  type='range'
                  min='0'
                  max='100'
                  value={tempOverlayOpacity}
                  onChange={(e) => setTempOverlayOpacity(Number(e.target.value))}
                  className='w-full'
                />
              </div>
            </div>

            {/* Save Button */}
            <div className='mt-6 flex gap-2'>
              <Button
                onClick={() => {
                  Object.assign(blockData, {
                    overlayColor: tempOverlayColor,
                    overlayOpacity: tempOverlayOpacity,
                  })
                  setShowBgEditModal(false)
                }}
                className='flex-1'
              >
                Save Settings
              </Button>
              <Button
                onClick={() => setShowBgEditModal(false)}
                variant='outline'
                className='flex-1'
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default SectionHeroVideoSP
