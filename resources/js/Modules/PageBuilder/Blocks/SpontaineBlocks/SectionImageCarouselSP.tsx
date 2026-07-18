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
  BlockVideo,
  ItemListField,
  TextData,
} from '../../page_interfaces'
import { Language } from '../../Pages/PageBuilder'

export interface ImageCarouselSPData extends Block, BlockConfiguration {
  backgroundColor: TextData
  label?: TextData | null
  title?: TextData | null
  titleColor: TextData
  description?: TextData | null
  descriptionColor: TextData
  slides: ItemListField<ImageSlide>
}

export interface ImageSlide {
  id?: number
  image?: BlockImage
  video?: BlockVideo
  mediaType?: 'image' | 'video'
}

interface Props {
  blockData?: ImageCarouselSPData
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  language?: Language
  dispatch?: Dispatch<PageBuilderAction>
}

export const imageCarouselSPBlock = {
  backgroundColor: { english: '#ffffff', malayalam: '' },
  label: null,
  title: null,
  titleColor: { english: '#1a1a1a', malayalam: '' },
  description: null,
  descriptionColor: { english: '#6b7280', malayalam: '' },
  slides: {
    lastUUID: 0,
    items: [],
  },
}

const defaultSlide: ImageSlide = {
  image: { url: '/placeholder.jpeg', caption: 'Slide Image' },
  video: undefined,
  mediaType: 'image',
}

const SectionImageCarouselSP = ({
  editMode,
  onFieldEdit,
  blockData = imageCarouselSPBlock,
  language = 'en',
  dispatch,
}: Props) => {
  const isMounted = useMounted()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragStartXRef = useRef(0)
  const dragStartYRef = useRef(0)
  const dragCurrentXRef = useRef(0)
  const dragStartTimeRef = useRef(0)
  const swipeDirectionRef = useRef<'horizontal' | 'vertical' | null>(null)

  const slides = blockData?.slides?.items || []
  const maxIndex = Math.max(0, slides.length - 1)

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

  // Slide to specific index with GSAP
  const slideTo = (index: number, immediate = false) => {
    if (!trackRef.current || slides.length === 0) return

    const clampedIndex = Math.max(0, Math.min(index, maxIndex))
    setCurrentIndex(clampedIndex)

    // Get actual card width from first card element
    const firstCard = trackRef.current.querySelector('[data-slide-id]') as HTMLElement
    if (!firstCard) return

    const cardWidth = firstCard.offsetWidth
    const gap = 24 // 6 * 4px = 24px gap between cards
    const offset = -clampedIndex * (cardWidth + gap)

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
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

    setIsDragging(true)
    dragStartXRef.current = clientX
    dragStartYRef.current = clientY
    dragCurrentXRef.current = clientX
    dragStartTimeRef.current = Date.now()
    swipeDirectionRef.current = null

    if (trackRef.current && !('touches' in e)) {
      trackRef.current.style.cursor = 'grabbing'
    }
  }

  const handlePointerMove = (e: React.PointerEvent | React.TouchEvent) => {
    if (!isDragging || !trackRef.current) return

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

    const diffX = Math.abs(clientX - dragStartXRef.current)
    const diffY = Math.abs(clientY - dragStartYRef.current)

    // Determine swipe direction on first significant movement
    if (swipeDirectionRef.current === null && (diffX > 10 || diffY > 10)) {
      swipeDirectionRef.current = diffX > diffY ? 'horizontal' : 'vertical'
    }

    // If vertical swipe, allow default scrolling behavior
    if (swipeDirectionRef.current === 'vertical') {
      setIsDragging(false)
      return
    }

    // Only handle horizontal swipes for carousel
    if (swipeDirectionRef.current === 'horizontal') {
      e.preventDefault()
      const diff = clientX - dragCurrentXRef.current
      dragCurrentXRef.current = clientX
      const currentX = gsap.getProperty(trackRef.current, 'x') as number
      gsap.set(trackRef.current, { x: currentX + diff })
    }
  }

  const handlePointerUp = () => {
    if (!isDragging || !trackRef.current) return

    setIsDragging(false)
    trackRef.current.style.cursor = 'grab'

    // Only process if it was a horizontal swipe
    if (swipeDirectionRef.current !== 'horizontal') {
      swipeDirectionRef.current = null
      return
    }

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

    swipeDirectionRef.current = null
  }

  const backgroundColor = displayText(blockData.backgroundColor, language) || '#ffffff'
  const labelText = blockData.label ? displayText(blockData.label, language) : null
  const titleText = blockData.title ? displayText(blockData.title, language) : null
  const titleColor = displayText(blockData.titleColor, language) || '#1a1a1a'
  const descriptionText = blockData.description
    ? displayText(blockData.description, language)
    : null
  const descriptionColor = displayText(blockData.descriptionColor, language) || '#6b7280'

  // Generate dot indicators
  const dots = Array.from({ length: slides.length }, (_, i) => i)

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
                  label={labelText ? 'Edit Label' : 'Add Label'}
                  onClick={() =>
                    onEdit('label', 'text', blockData.label || { english: '', malayalam: '' })
                  }
                />
              )}
            </div>
          )}
          <div className='flex flex-col gap-4'>
            {/* Title */}
            {titleText && (
              <h2
                className='mx-auto max-w-4xl text-center font-display text-5xl font-normal leading-tight sm:text-6xl lg:text-7xl xl:text-[88.9px] xl:leading-[90px]'
                style={{ color: titleColor }}
              >
                {titleText}
              </h2>
            )}
            {editMode && (
              <div className='mb-6 flex flex-wrap justify-center gap-2'>
                <EditLabel
                  label={titleText ? 'Edit Title' : 'Add Title'}
                  onClick={() =>
                    onEdit('title', 'text', blockData.title || { english: '', malayalam: '' })
                  }
                />
                <EditLabel
                  label='Edit Title Color'
                  onClick={() => onEdit('titleColor', 'text', blockData.titleColor)}
                />
              </div>
            )}

            {/* Description */}
            {descriptionText && (
              <p
                className='mx-auto mb-8 max-w-2xl text-center font-urbanist text-lg leading-relaxed sm:mb-12 sm:text-xl'
                style={{ color: descriptionColor }}
              >
                {descriptionText}
              </p>
            )}
            {editMode && (
              <div className='mb-6 flex flex-wrap justify-center gap-2'>
                <EditLabel
                  label={descriptionText ? 'Edit Description' : 'Add Description'}
                  onClick={() =>
                    onEdit(
                      'description',
                      'text',
                      blockData.description || { english: '', malayalam: '' }
                    )
                  }
                />
                <EditLabel
                  label='Edit Description Color'
                  onClick={() => onEdit('descriptionColor', 'text', blockData.descriptionColor)}
                />
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
          </div>
          {/* Carousel Container */}
          {slides.length > 0 ? (
            <div
              ref={containerRef}
              className='relative overflow-hidden px-4 sm:px-8 lg:px-20'
            >
              {/* Cards Track */}
              <div
                ref={trackRef}
                className='flex gap-6'
                style={{ cursor: editMode ? 'default' : 'grab' }}
                onPointerDown={editMode ? undefined : handlePointerDown}
                onPointerMove={editMode ? undefined : handlePointerMove}
                onPointerUp={editMode ? undefined : handlePointerUp}
                onPointerLeave={editMode ? undefined : handlePointerUp}
                onTouchStart={editMode ? undefined : handlePointerDown}
                onTouchMove={editMode ? undefined : handlePointerMove}
                onTouchEnd={editMode ? undefined : handlePointerUp}
              >
                {slides.map((slide, index) => (
                  <ImageCard
                    key={slide.id || index}
                    slide={slide.item}
                    language={language}
                    editMode={editMode}
                    onFieldEdit={onFieldEdit}
                    dispatch={dispatch}
                    blockData={blockData}
                  />
                ))}
              </div>

              {/* Navigation Controls */}
              {slides.length > 1 && (
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
 * ImageCard Component
 */
interface ImageCardProps {
  slide: ImageSlide
  language: Language
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  dispatch?: Dispatch<PageBuilderAction>
  blockData?: ImageCarouselSPData
}

function ImageCard({
  slide,
  language,
  editMode,
  onFieldEdit,
  dispatch,
  blockData,
}: ImageCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const mediaType = slide.mediaType || 'image'

  // Auto-play video when slide enters viewport
  useEffect(() => {
    if (!videoRef.current || editMode || mediaType !== 'video') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Play when in viewport
            videoRef.current
              ?.play()
              .then(() => setIsPlaying(true))
              .catch(() => console.log('Video autoplay prevented'))
          } else {
            // Pause when out of viewport
            videoRef.current?.pause()
            setIsPlaying(false)
          }
        })
      },
      {
        threshold: 0.5, // Play when 50% of slide is visible
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [editMode, mediaType])

  const handleVideoHover = (isHovering: boolean) => {
    // Hover interaction is now optional/supplementary
    if (videoRef.current && !editMode && mediaType === 'video') {
      if (isHovering) {
        videoRef.current.play()
        setIsPlaying(true)
      }
      // Don't pause on hover leave - let viewport observer handle it
    }
  }

  const switchMediaType = (newType: 'image' | 'video') => {
    if (dispatch && blockData) {
      dispatch({
        action: 'UPDATE_LIST_ITEM_FIELD',
        blockId: blockData.id,
        fieldName: 'slides',
        itemId: slide.id,
        blockData: {
          mediaType: newType,
        },
      })
    }
  }

  return (
    <div
      ref={containerRef}
      className='w-[90%] flex-shrink-0 sm:w-[85%] lg:w-[80%]'
      data-slide-id={slide.id}
    >
      <div
        className='relative overflow-hidden rounded-3xl bg-gray-100'
        onMouseEnter={() => handleVideoHover(true)}
        onMouseLeave={() => handleVideoHover(false)}
      >
        {/* Media Content */}
        {mediaType === 'video' && slide.video?.url ? (
          <video
            ref={videoRef}
            className='h-auto w-full object-cover'
            style={{ aspectRatio: '16/9' }}
            muted
            loop
            playsInline
            key={slide.video.url}
          >
            <source
              src={slide.video.url}
              type={slide.video.mime || 'video/mp4'}
            />
            Your browser does not support the video tag.
          </video>
        ) : mediaType === 'image' && slide.image?.url ? (
          <img
            src={slide.image.url}
            alt={slide.image.caption || 'Slide'}
            className='h-auto w-full object-cover'
            style={{ aspectRatio: '16/9' }}
          />
        ) : (
          <div
            className='flex items-center justify-center bg-gray-200'
            style={{ aspectRatio: '16/9' }}
          >
            <p className='text-gray-400'>No {mediaType}</p>
          </div>
        )}

        {editMode && (
          <div className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-2'>
            <div className='flex gap-2'>
              <EditLabel
                label={mediaType === 'image' ? 'Update Image' : 'Update Video'}
                onClick={() =>
                  onFieldEdit?.({
                    field: 'slides',
                    oldValue: null,
                    itemField: mediaType,
                    itemIndex: slide.id,
                    fieldType: mediaType,
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
            <div className='flex gap-2'>
              <EditLabel
                label={mediaType === 'image' ? 'Switch to Video' : 'Switch to Image'}
                onClick={() => switchMediaType(mediaType === 'image' ? 'video' : 'image')}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SectionImageCarouselSP
