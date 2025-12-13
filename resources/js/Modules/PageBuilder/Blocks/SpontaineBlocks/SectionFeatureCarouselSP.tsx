import useMounted from '@/hooks/useMounted'
import gsap from 'gsap'
import { Dispatch, useCallback, useEffect, useRef, useState } from 'react'
import AddLabel from '../../Components/AddLabel'
import {
  BlocKFieldInfo,
  BlockFieldTypes,
  BlockFieldValues,
} from '../../Components/BlockEditor/BlockEditor'
import EditLabel from '../../Components/EditLabel'
import { displayText } from '../../Components/Localization'
import { PageBuilderAction } from '../../hooks/pageBuilderService'
import {
  Block,
  BlockConfiguration,
  BlockImage,
  ItemListField,
  TextData,
} from '../../page_interfaces'
import { Language } from '../../Pages/PageBuilder'

export interface FeatureCarouselSPData extends Block, BlockConfiguration {
  backgroundColor: TextData
  label: TextData
  slides: ItemListField<FeatureSlide>
}

export interface FeatureSlide {
  id?: number
  icon: BlockImage
  title: TextData
  title2?: TextData
  description: TextData
  image: BlockImage
}

interface Props {
  blockData?: FeatureCarouselSPData
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  language?: Language
  dispatch?: Dispatch<PageBuilderAction>
}

export const featureCarouselSPBlock = {
  backgroundColor: { english: '#ffffff', malayalam: '' },
  label: { english: 'Features', malayalam: '' },
  slides: {
    lastUUID: 0,
    items: [],
  },
}

const defaultSlide: FeatureSlide = {
  icon: { url: '/images/icons/placeholder-icon.png', caption: 'Icon' },
  title: { english: 'Feature Title', malayalam: '' },
  title2: { english: 'Second Title', malayalam: '' },
  description: {
    english: 'Feature description goes here. Add compelling details about this feature.',
    malayalam: '',
  },
  image: { url: '/images/placeholder-feature.png', caption: 'Feature Image' },
}

const SectionFeatureCarouselSP = ({
  editMode,
  onFieldEdit,
  blockData = featureCarouselSPBlock,
  language = 'en',
  dispatch,
}: Props) => {
  const isMounted = useMounted()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(2)
  const [isDragging, setIsDragging] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragStartXRef = useRef(0)
  const dragCurrentXRef = useRef(0)
  const dragStartTimeRef = useRef(0)

  const slides = blockData?.slides?.items || []
  const maxIndex = Math.max(0, slides.length - cardsPerView)

  const onEdit = (field: string, fieldType: BlockFieldTypes, oldValue: BlockFieldValues) => {
    if (onFieldEdit) {
      onFieldEdit({
        field,
        fieldType,
        oldValue: oldValue ?? '',
        action: 'UPDATE',
      })
    }
  }

  const addNewSlide = useCallback(() => {
    if (dispatch != null) {
      // Ensure unique id for each slide
      const lastUUID = blockData?.slides?.lastUUID || 0
      const slideWithId = { ...defaultSlide, id: lastUUID + 1 }
      dispatch({
        action: 'INSERT_INTO_LIST',
        blockId: blockData?.id,
        fieldName: 'slides',
        fieldValue: slideWithId,
      })
    }
  }, [dispatch, blockData])

  // Calculate responsive cards per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setCardsPerView(width >= 1024 ? 2 : 1)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Slide to specific index with GSAP
  const slideTo = (index: number, immediate = false) => {
    if (!trackRef.current || slides.length === 0) return

    const clampedIndex = Math.max(0, Math.min(index, maxIndex))
    setCurrentIndex(clampedIndex)

    const cardWidth = trackRef.current.offsetWidth / slides.length
    const offset = -clampedIndex * cardWidth * cardsPerView

    if (immediate) {
      gsap.set(trackRef.current, { x: offset })
    } else {
      gsap.to(trackRef.current, {
        x: offset,
        duration: 0.6,
        ease: 'power2.out',
      })
    }
  }

  // Navigation handlers
  const goToNext = () => {
    if (currentIndex < maxIndex) {
      slideTo(currentIndex + 1)
    }
  }

  const goToPrev = () => {
    if (currentIndex > 0) {
      slideTo(currentIndex - 1)
    }
  }

  const goToSlide = (index: number) => {
    slideTo(index)
  }

  // Swipe gesture handlers for both touch and mouse
  const handlePointerDown = (e: React.PointerEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX

    setIsDragging(true)
    dragStartXRef.current = clientX
    dragCurrentXRef.current = clientX
    dragStartTimeRef.current = Date.now()

    if (trackRef.current && !('touches' in e)) {
      trackRef.current.style.cursor = 'grabbing'
    }
  }

  const handlePointerMove = (e: React.PointerEvent | React.TouchEvent) => {
    if (!isDragging || !trackRef.current) return

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const diff = clientX - dragCurrentXRef.current
    const absDiff = Math.abs(clientX - dragStartXRef.current)

    // Only prevent default if moving horizontally (for swipe)
    if (absDiff > 10) {
      e.preventDefault()
    }

    dragCurrentXRef.current = clientX
    const currentX = gsap.getProperty(trackRef.current, 'x') as number
    gsap.set(trackRef.current, { x: currentX + diff })
  }

  const handlePointerUp = () => {
    if (!isDragging || !trackRef.current) return

    setIsDragging(false)
    trackRef.current.style.cursor = 'grab'

    const totalDiff = dragCurrentXRef.current - dragStartXRef.current
    const duration = Date.now() - dragStartTimeRef.current
    const velocity = Math.abs(totalDiff) / duration

    // Lower threshold for faster swipes - one slide at a time
    const threshold = velocity > 0.5 ? 30 : 50

    if (Math.abs(totalDiff) > threshold) {
      if (totalDiff > 0 && currentIndex > 0) {
        slideTo(currentIndex - 1)
      } else if (totalDiff < 0 && currentIndex < maxIndex) {
        slideTo(currentIndex + 1)
      } else {
        slideTo(currentIndex) // Snap back
      }
    } else {
      slideTo(currentIndex) // Snap back
    }
  }

  const backgroundColor = displayText(blockData.backgroundColor, language) || '#ffffff'
  const labelText = displayText(blockData.label, language)

  // Generate dot indicators
  const dotCount = maxIndex + 1
  const dots = Array.from({ length: dotCount }, (_, i) => i)

  return (
    <section
      className={`relative w-full overflow-hidden py-16 sm:py-24 lg:py-32 ${blockData.marginTop} ${blockData.marginBottom} ${blockData.paddingTop} ${blockData.paddingBottom}`}
      style={{ backgroundColor }}
    >
      {isMounted && (
        <div className='mx-auto w-full'>
          {/* Section Label */}
          {(labelText || editMode) && (
            <div className='mb-16 flex justify-center'>
              {labelText && (
                <div className='rounded-md bg-black/5 px-6 py-2.5'>
                  <p className='font-roboto-mono text-sm tracking-tight text-spontaine-gray'>
                    {labelText}
                  </p>
                </div>
              )}
              {editMode && (
                <EditLabel
                  label='Edit Label'
                  onClick={() => onEdit('label', 'text', blockData.label)}
                />
              )}
            </div>
          )}

          {/* Background Color Editor */}
          {editMode && (
            <div className='mb-6 flex justify-center'>
              <EditLabel
                label='Edit Background Color'
                onClick={() => onEdit('backgroundColor', 'text', blockData.backgroundColor)}
              />
            </div>
          )}

          {/* Carousel Container */}
          {slides.length > 0 ? (
            <div
              ref={containerRef}
              className='relative overflow-visible px-4 sm:px-8 lg:px-20'
            >
              {/* Cards Track */}
              <div
                ref={trackRef}
                className='scrollbar-hide flex touch-pan-x gap-6 overflow-x-auto sm:overflow-x-auto lg:gap-6'
                style={{ cursor: editMode ? 'default' : 'grab', touchAction: 'pan-x pinch-zoom' }}
                onPointerDown={editMode ? undefined : handlePointerDown}
                onPointerMove={editMode ? undefined : handlePointerMove}
                onPointerUp={editMode ? undefined : handlePointerUp}
                onPointerLeave={editMode ? undefined : handlePointerUp}
                onTouchStart={editMode ? undefined : handlePointerDown}
                onTouchMove={editMode ? undefined : handlePointerMove}
                onTouchEnd={editMode ? undefined : handlePointerUp}
              >
                {slides.map((slide, index) => (
                  <FeatureCard
                    key={slide.id || index}
                    slide={slide.item}
                    cardsPerView={cardsPerView}
                    language={language}
                    editMode={editMode}
                    onFieldEdit={onFieldEdit}
                    dispatch={dispatch}
                    blockData={blockData}
                  />
                ))}
              </div>

              {/* Navigation Controls */}
              {slides.length > cardsPerView && (
                <div className='mt-10 flex items-center justify-center gap-3 sm:mt-14'>
                  {/* Previous Button */}
                  <button
                    onClick={goToPrev}
                    disabled={currentIndex === 0}
                    className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f7f7] text-spontaine-gray transition-all hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30'
                    aria-label='Previous slide'
                  >
                    <svg
                      className='h-4 w-4'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2.5'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15 19l-7-7 7-7'
                      />
                    </svg>
                  </button>

                  {/* Dot Indicators */}
                  <div className='flex items-center gap-2'>
                    {dots.map((index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2.5 rounded-md transition-all duration-300 ${
                          currentIndex === index
                            ? 'w-2.5 bg-spontaine-accent-soft'
                            : 'w-2.5 bg-spontaine-gray hover:bg-gray-500'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={goToNext}
                    disabled={currentIndex === maxIndex}
                    className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f7f7] text-spontaine-gray transition-all hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30'
                    aria-label='Next slide'
                  >
                    <svg
                      className='h-4 w-4'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2.5'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ) : (
            editMode && (
              <div className='flex min-h-[400px] items-center justify-center'>
                <p className='text-sm text-gray-500'>No slides added yet</p>
              </div>
            )
          )}

          {editMode && (
            <div className='mt-8 flex justify-center'>
              <AddLabel
                label='ADD SLIDE'
                onClick={addNewSlide}
              />
            </div>
          )}
        </div>
      )}
    </section>
  )
}

/**
 * FeatureCard Component
 */
interface FeatureCardProps {
  slide: FeatureSlide
  cardsPerView: number
  language: Language
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  dispatch?: Dispatch<PageBuilderAction>
  blockData?: FeatureCarouselSPData
}

function FeatureCard({
  slide,
  cardsPerView,
  language,
  editMode,
  onFieldEdit,
  dispatch,
  blockData,
}: FeatureCardProps) {
  const cardWidthClass = cardsPerView === 2 ? 'lg:w-[calc(50%-16px)]' : 'w-full'
  const minWidthClass =
    cardsPerView === 1 ? 'min-w-[90vw] sm:min-w-[75vw]' : 'min-w-[90vw] lg:min-w-[calc(50%-16px)]'

  const titleText = displayText(slide.title, language)
  const title2Text = displayText(slide.title2, language)
  const descriptionText = displayText(slide.description, language)

  return (
    <div className={`flex-shrink-0 ${minWidthClass} ${cardWidthClass}`}>
      <div className='flex h-full max-h-[800px] flex-col overflow-hidden rounded-[40px] bg-spontaine-dark-bg p-10 sm:p-12 lg:max-h-[800px] lg:p-14'>
        {/* Icon */}
        <div className='mb-10 flex justify-center'>
          <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-spontaine-icon-bg'>
            {slide.icon?.url && (
              <img
                src={slide.icon.url}
                alt={slide.icon.caption || 'Icon'}
                className='h-8 w-8 object-contain'
              />
            )}
          </div>
          {editMode && (
            <EditLabel
              label='Update Icon'
              onClick={() =>
                onFieldEdit?.({
                  field: 'slides',
                  oldValue: null,
                  itemField: 'icon',
                  itemIndex: slide.id,
                  fieldType: 'image',
                  action: 'UPDATE',
                })
              }
            />
          )}
        </div>

        {/* Title */}
        <h3 className='text-center font-heading text-4xl font-medium leading-tight text-white lg:text-[40px]'>
          {titleText}
        </h3>
        {editMode && (
          <div className='flex justify-center'>
            <EditLabel
              label='Edit Title'
              onClick={() =>
                onFieldEdit?.({
                  field: 'slides',
                  oldValue: slide.title,
                  itemField: 'title',
                  itemIndex: slide.id,
                  fieldType: 'text',
                  action: 'UPDATE',
                })
              }
            />
          </div>
        )}
        {/* Second Title */}
        <h3 className='mb-8 text-center font-heading text-4xl font-medium leading-tight text-white lg:text-[40px]'>
          {title2Text}
        </h3>
        {editMode && (
          <div className='mb-4 flex justify-center'>
            <EditLabel
              label='Edit Second Title'
              onClick={() =>
                onFieldEdit?.({
                  field: 'slides',
                  oldValue: slide.title2,
                  itemField: 'title2',
                  itemIndex: slide.id,
                  fieldType: 'text',
                  action: 'UPDATE',
                })
              }
            />
          </div>
        )}

        {/* Description */}
        <p className='mb-10 text-center font-body text-xl font-light leading-relaxed text-white lg:text-2xl lg:leading-[30px]'>
          {descriptionText}
        </p>
        {editMode && (
          <div className='mb-4 flex justify-center'>
            <EditLabel
              label='Edit Description'
              onClick={() =>
                onFieldEdit?.({
                  field: 'slides',
                  oldValue: slide.description,
                  itemField: 'description',
                  itemIndex: slide.id,
                  fieldType: 'text',
                  action: 'UPDATE',
                })
              }
            />
          </div>
        )}

        {/* Image */}
        <div className='overflow-hidden rounded-2xl'>
          {slide.image?.url && (
            <img
              src={slide.image.url}
              alt={slide.image.caption || 'Feature'}
              className=''
            />
          )}
        </div>
        {editMode && (
          <div className='mt-4 flex justify-center gap-2'>
            <EditLabel
              label='Update Image'
              onClick={() =>
                onFieldEdit?.({
                  field: 'slides',
                  oldValue: null,
                  itemField: 'image',
                  itemIndex: slide.id,
                  fieldType: 'image',
                  action: 'UPDATE',
                })
              }
            />
            <EditLabel
              label='Remove Slide'
              onClick={() => {
                dispatch?.({
                  action: 'REMOVE_LIST_ITEM',
                  blockId: blockData?.id,
                  fieldName: 'slides',
                  itemId: slide.id,
                })
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default SectionFeatureCarouselSP
