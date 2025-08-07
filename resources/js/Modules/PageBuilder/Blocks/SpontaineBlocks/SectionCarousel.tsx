import { Button } from '@/components/ui/button'
import { Language } from '@/components/ui/ui_interfaces'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { cn } from '@/lib/utils'
import AddLabel from '@/Modules/PageBuilder/Components/AddLabel'
import { BlocKFieldInfo } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import EditLabel from '@/Modules/PageBuilder/Components/EditLabel'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { PageBuilderAction } from '@/Modules/PageBuilder/hooks/pageBuilderService'
import {
  BlockConfiguration,
  BlockImage,
  ItemListField,
  TextData,
} from '@/Modules/PageBuilder/page_interfaces'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'
import { Dispatch, useCallback, useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

export interface CarouselCard {
  image: BlockImage
  title: TextData
  description: TextData
}

export interface SectionCarouselBlock extends BlockConfiguration {
  id?: number
  title: TextData
  subtitle: TextData
  cards: ItemListField<CarouselCard>
}

interface SectionCarouselProps {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: SectionCarouselBlock
  language?: Language
  dispatch?: Dispatch<PageBuilderAction>
}

export const defaultCarouselCard: CarouselCard = {
  image: {
    url: '/placeholder.jpeg',
    caption: 'Carousel image',
  },
  title: {
    english: 'Card Title',
    malayalam: 'Card Title',
  },
  description: {
    english: 'Transform your business with our innovative solutions and expert guidance.',
    malayalam: 'Transform your business with our innovative solutions and expert guidance.',
  },
}

export const sectionCarouselBlock: SectionCarouselBlock = {
  title: {
    english: 'Featured Solutions',
    malayalam: 'Featured Solutions',
  },
  subtitle: {
    english: 'Discover our comprehensive suite of services designed to elevate your business',
    malayalam: 'Discover our comprehensive suite of services designed to elevate your business',
  },
  cards: {
    lastUUID: 3,
    items: [
      {
        id: 1,
        item: {
          ...defaultCarouselCard,
          title: {
            english: 'Decision Intelligence',
            malayalam: 'Decision Intelligence',
          },
          description: {
            english:
              'Unify fragmented data into trustworthy insights with our AI-powered platform.',
            malayalam:
              'Unify fragmented data into trustworthy insights with our AI-powered platform.',
          },
        },
      },
      {
        id: 2,
        item: {
          ...defaultCarouselCard,
          title: {
            english: 'Data Transformation',
            malayalam: 'Data Transformation',
          },
          description: {
            english: 'Convert chaos into clarity with our advanced semantic layer technology.',
            malayalam: 'Convert chaos into clarity with our advanced semantic layer technology.',
          },
        },
      },
      {
        id: 3,
        item: {
          ...defaultCarouselCard,
          title: {
            english: 'Business Analytics',
            malayalam: 'Business Analytics',
          },
          description: {
            english: 'Deliver 80% of business value from 20% of initiatives with precision.',
            malayalam: 'Deliver 80% of business value from 20% of initiatives with precision.',
          },
        },
      },
    ],
  },
}

export default function SectionCarousel({
  editMode = false,
  onFieldEdit,
  blockData = sectionCarouselBlock,
  language = 'en',
  dispatch,
}: SectionCarouselProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const cards = blockData.cards?.items || []
  const totalCards = cards.length

  // Auto-play interval (disabled in edit mode)
  useEffect(() => {
    if (!editMode && totalCards > 1) {
      const interval = setInterval(() => {
        nextSlide()
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [currentIndex, editMode, totalCards])

  // GSAP animations
  useEffect(() => {
    if (!editMode) {
      const ctx = gsap.context(() => {
        gsap.set([titleRef.current, subtitleRef.current], {
          opacity: 0,
          y: 30,
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        })

        tl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }).to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.4'
        )
      }, sectionRef)

      return () => ctx.revert()
    }
  }, [editMode])

  const nextSlide = useCallback(() => {
    if (isAnimating || totalCards <= 1) return
    setIsAnimating(true)

    gsap.to(carouselRef.current, {
      x: '-100%',
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % totalCards)
        gsap.set(carouselRef.current, { x: '100%' })
        gsap.to(carouselRef.current, {
          x: '0%',
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => setIsAnimating(false),
        })
      },
    })
  }, [isAnimating, totalCards])

  const prevSlide = useCallback(() => {
    if (isAnimating || totalCards <= 1) return
    setIsAnimating(true)

    gsap.to(carouselRef.current, {
      x: '100%',
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards)
        gsap.set(carouselRef.current, { x: '-100%' })
        gsap.to(carouselRef.current, {
          x: '0%',
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => setIsAnimating(false),
        })
      },
    })
  }, [isAnimating, totalCards])

  const addNewCard = useCallback(() => {
    if (dispatch) {
      dispatch({
        action: 'INSERT_INTO_LIST',
        blockId: blockData?.id,
        fieldName: 'cards',
        fieldValue: defaultCarouselCard,
      })
    }
  }, [dispatch, blockData?.id])

  const removeCard = useCallback(
    (itemId: number) => {
      if (dispatch) {
        dispatch({
          action: 'REMOVE_LIST_ITEM',
          blockId: blockData?.id,
          fieldName: 'cards',
          itemId: itemId,
        })
        // Reset carousel position if needed
        if (currentIndex >= totalCards - 1) {
          setCurrentIndex(0)
        }
      }
    },
    [dispatch, blockData?.id, currentIndex, totalCards]
  )

  const currentCard = cards[currentIndex]?.item

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative w-full overflow-hidden bg-gradient-to-br from-secondary-50 to-white',
        blockData.paddingTop && `pt-[${blockData.paddingTop}]`,
        blockData.paddingBottom && `pb-[${blockData.paddingBottom}]`,
        blockData.marginTop && `mt-[${blockData.marginTop}]`,
        blockData.marginBottom && `mb-[${blockData.marginBottom}]`
      )}
    >
      <AppLayoutPadding>
        <div className='py-16 lg:py-24'>
          {/* Header Section */}
          <div className='mb-16 text-center'>
            <h2
              ref={titleRef}
              className='mb-4 text-4xl font-medium text-primary-950 md:text-5xl lg:text-6xl'
            >
              <Localization
                text={blockData.title}
                language={language}
              />
              {editMode && onFieldEdit && (
                <EditLabel
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
            </h2>

            <p
              ref={subtitleRef}
              className='mx-auto max-w-3xl text-lg text-gray-600 md:text-xl'
            >
              <Localization
                text={blockData.subtitle}
                language={language}
              />
              {editMode && onFieldEdit && (
                <EditLabel
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
            </p>
          </div>

          {/* Carousel Section */}
          <div className='relative h-[50vh] min-h-[400px] overflow-hidden rounded-2xl'>
            {currentCard && (
              <div
                ref={carouselRef}
                className='relative h-full w-full'
              >
                {/* Background Image */}
                <div
                  className='absolute inset-0 bg-cover bg-center bg-no-repeat'
                  style={{
                    backgroundImage: `url('${currentCard.image.url}')`,
                  }}
                />

                {/* Overlay */}
                <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent' />

                {/* Content */}
                <div className='relative z-10 flex h-full flex-col justify-end p-8 md:p-12 lg:p-16'>
                  <div className='max-w-2xl text-white'>
                    <h3 className='mb-4 text-3xl font-semibold md:text-4xl lg:text-5xl'>
                      <Localization
                        text={currentCard.title}
                        language={language}
                      />
                      {editMode && onFieldEdit && (
                        <EditLabel
                          onClick={() => {
                            onFieldEdit({
                              field: 'cards',
                              oldValue: currentCard.title,
                              itemField: 'title',
                              itemIndex: cards[currentIndex].id,
                              fieldType: 'text',
                              action: 'UPDATE',
                            })
                          }}
                        />
                      )}
                    </h3>

                    <p className='mb-6 text-lg text-gray-200 md:text-xl'>
                      <Localization
                        text={currentCard.description}
                        language={language}
                      />
                      {editMode && onFieldEdit && (
                        <EditLabel
                          onClick={() => {
                            onFieldEdit({
                              field: 'cards',
                              oldValue: currentCard.description,
                              itemField: 'description',
                              itemIndex: cards[currentIndex].id,
                              fieldType: 'textarea',
                              action: 'UPDATE',
                            })
                          }}
                        />
                      )}
                    </p>
                  </div>

                  {/* Edit Controls */}
                  {editMode && onFieldEdit && (
                    <div className='mt-4 flex gap-3'>
                      <EditLabel
                        onClick={() => {
                          onFieldEdit({
                            field: 'cards',
                            oldValue: currentCard.image,
                            itemField: 'image',
                            itemIndex: cards[currentIndex].id,
                            fieldType: 'image',
                            action: 'UPDATE',
                          })
                        }}
                        label='Change Image'
                      />
                      {totalCards > 1 && (
                        <Button
                          onClick={() => removeCard(cards[currentIndex].id)}
                          size='sm'
                          variant='destructive'
                          className='flex items-center gap-2'
                        >
                          <Trash2 size={16} />
                          Remove Card
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Controls */}
            {!editMode && totalCards > 1 && (
              <>
                <Button
                  onClick={prevSlide}
                  disabled={isAnimating}
                  size='lg'
                  variant='secondary'
                  className='absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30 disabled:opacity-50'
                >
                  <ChevronLeft size={24} />
                </Button>

                <Button
                  onClick={nextSlide}
                  disabled={isAnimating}
                  size='lg'
                  variant='secondary'
                  className='absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30 disabled:opacity-50'
                >
                  <ChevronRight size={24} />
                </Button>
              </>
            )}

            {/* Indicators */}
            {totalCards > 1 && (
              <div className='absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2'>
                {cards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => !isAnimating && setCurrentIndex(index)}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
                    )}
                    disabled={isAnimating}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Add Card Button - Edit Mode */}
          {editMode && dispatch && (
            <div className='mt-8 text-center'>
              <AddLabel
                label='Add New Card'
                onClick={addNewCard}
              />
            </div>
          )}

          {/* No Cards State - Edit Mode */}
          {editMode && totalCards === 0 && (
            <div className='flex h-[400px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-300'>
              <div className='text-center'>
                <p className='mb-4 text-gray-500'>No cards in carousel</p>
                <AddLabel
                  label='Add First Card'
                  onClick={addNewCard}
                />
              </div>
            </div>
          )}
        </div>
      </AppLayoutPadding>
    </section>
  )
}
