import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Dispatch, useCallback, useEffect, useRef } from 'react'
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

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)

export interface BentoCardsSPData extends Block, BlockConfiguration {
  backgroundColor: TextData
  title: TextData
  titleColor: TextData
  cards: ItemListField<BentoCard>
}

export interface BentoCard {
  id?: number
  title: TextData
  description: TextData
  image: BlockImage
  backgroundColor: TextData
  textColor: TextData
  gridClasses: TextData
}

interface Props {
  blockData?: BentoCardsSPData
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  language?: Language
  dispatch?: Dispatch<PageBuilderAction>
}

export const bentoCardsSPBlock = {
  backgroundColor: { english: 'linear-gradient(0deg, #44ECA0 0%, #D0D9FB 100%)', malayalam: '' },
  title: {
    english: 'Strategy-aligned action.\nFast, at scale.',
    malayalam: '',
  },
  titleColor: { english: '#1a1a1a', malayalam: '' },
  cards: {
    lastUUID: 4,
    items: [
      {
        id: 1,
        item: {
          title: { english: 'Deploy in days', malayalam: '' },
          description: {
            english:
              'Launch your unified data foundation and first automated workflow in under three weeks - no massive IT projects.',
            malayalam: '',
          },
          image: { url: '/imge/home/card1.png', caption: 'Card 1' },
          backgroundColor: { english: '#44ECA0', malayalam: '' },
          textColor: { english: '#6b7280', malayalam: '' },
          gridClasses: { english: 'lg:row-start-1 lg:row-end-3', malayalam: '' },
        },
      },
      {
        id: 2,
        item: {
          title: { english: 'Unify once. Iterate forever.', malayalam: '' },
          description: {
            english:
              'Build a single, self-maintaining insights layer that powers endless new use cases, dashboards, and AI agents.',
            malayalam: '',
          },
          image: { url: '/imge/home/card2.png', caption: 'Card 2' },
          backgroundColor: { english: '#C3FF6E', malayalam: '' },
          textColor: { english: '#6b7280', malayalam: '' },
          gridClasses: { english: 'lg:row-start-1 lg:row-end-2', malayalam: '' },
        },
      },
      {
        id: 3,
        item: {
          title: { english: 'Scale profitable growth', malayalam: '' },
          description: {
            english:
              'Accelerate revenue velocity while simultaneously cutting operational waste, ensuring every new spend adds directly to your bottom line.',
            malayalam: '',
          },
          image: { url: '/imge/home/card4.png', caption: 'Card 3' },
          backgroundColor: { english: '#2a2a2a', malayalam: '' },
          textColor: { english: '#e5e7eb', malayalam: '' },
          gridClasses: { english: 'lg:row-start-2 lg:row-end-4', malayalam: '' },
        },
      },
      {
        id: 4,
        item: {
          title: { english: 'Execute with confidence', malayalam: '' },
          description: {
            english:
              'Every AI action is auditable, explainable, and governed by your own business rules and human experts.',
            malayalam: '',
          },
          image: { url: '/imge/home/card3.png', caption: 'Card 4' },
          backgroundColor: { english: '#2a2a2a', malayalam: '' },
          textColor: { english: '#e5e7eb', malayalam: '' },
          gridClasses: { english: 'lg:row-start-3 lg:row-end-4', malayalam: '' },
        },
      },
    ],
  },
}

const defaultCard: BentoCard = {
  title: { english: 'New Card', malayalam: '' },
  description: {
    english: 'Add a compelling description for this card.',
    malayalam: '',
  },
  image: { url: '/images/placeholder-card.png', caption: 'Card Image' },
  backgroundColor: { english: '#44ECA0', malayalam: '' },
  textColor: { english: '#1a1a1a', malayalam: '' },
  gridClasses: { english: '', malayalam: '' },
}

const SectionBentoCardsSP = ({
  editMode,
  onFieldEdit,
  blockData = bentoCardsSPBlock,
  language = 'en',
  dispatch,
}: Props) => {
  const arcRef = useRef(null)
  const arcTopRef = useRef(null)

  const cards = blockData?.cards?.items || []

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

  const addNewCard = useCallback(() => {
    if (dispatch != null) {
      const lastUUID = blockData?.cards?.lastUUID || 0
      const cardWithId = { ...defaultCard, id: lastUUID + 1 }
      dispatch({
        action: 'INSERT_INTO_LIST',
        blockId: blockData?.id,
        fieldName: 'cards',
        fieldValue: cardWithId,
      })
    }
  }, [dispatch, blockData])

  useEffect(() => {
    if (editMode) return

    const topArc = arcTopRef.current
    const bottomArc = arcRef.current

    // Top arc animation
    const normalTopArc =
      'M1920 128C1635.2 46.4 1308 0 960 0C612 0 284.8 46.4 0 128V183.067H1920V128Z'
    const inwardTopArc =
      'M1920 128C1635.2 70 1308 30 960 30C612 30 284.8 70 0 128V183.067H1920V128Z'

    const topTl = gsap.timeline({
      scrollTrigger: {
        trigger: arcTopRef.current,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    })

    topTl
      .to(topArc, {
        morphSVG: inwardTopArc,
        duration: 1.2,
        ease: 'power2.inOut',
      })
      .to(topArc, {
        morphSVG: normalTopArc,
        duration: 1.2,
        ease: 'power2.inOut',
      })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [editMode])

  const backgroundColor = displayText(blockData.backgroundColor, language)
  const titleText = displayText(blockData.title, language)
  const titleColor = displayText(blockData.titleColor, language) || '#1a1a1a'

  return (
    <section
      className={`relative w-full ${blockData.marginTop} ${blockData.marginBottom} ${blockData.paddingTop} ${blockData.paddingBottom}`}
    >
      {/* TOP OUTWARD ARC - bulges upward */}
      <div className='relative -mb-1 w-full'>
        <svg
          viewBox='0 0 1920 183'
          preserveAspectRatio='none'
          className='block w-full'
        >
          <path
            ref={arcTopRef}
            d='M1920 128C1635.2 46.4 1308 0 960 0C612 0 284.8 46.4 0 128V183.067H1920V128Z'
            fill={backgroundColor?.split(',')[0]?.match(/#[A-Fa-f0-9]{6}/)?.[0] || '#D0D9FB'}
          />
        </svg>
      </div>

      {/* MAIN CONTENT with gradient background */}
      <div
        className='relative'
        style={{
          background: backgroundColor || 'linear-gradient(0deg, #44ECA0 0%, #D0D9FB 100%)',
        }}
      >
        {/* HEADING */}
        <div className='mx-auto max-w-7xl px-6 pb-12 text-center sm:px-8 sm:pb-16 lg:px-12 lg:pb-20'>
          {titleText && (
            <h2
              className='whitespace-pre-line font-heading text-5xl font-normal leading-tight sm:text-6xl lg:text-7xl xl:text-[88px]'
              style={{ color: titleColor }}
            >
              {titleText}
            </h2>
          )}
          {editMode && (
            <div className='mt-6 flex flex-wrap justify-center gap-2'>
              <EditLabel
                label='Edit Title'
                onClick={() => onEdit('title', 'text', blockData.title)}
              />
              <EditLabel
                label='Edit Title Color'
                onClick={() => onEdit('titleColor', 'text', blockData.titleColor)}
              />
              <EditLabel
                label='Edit Background'
                onClick={() => onEdit('backgroundColor', 'text', blockData.backgroundColor)}
              />
            </div>
          )}
        </div>

        {/* BENTO GRID */}
        <div className='mx-auto max-w-7xl px-6 pb-32 sm:px-8 sm:pb-40 lg:px-12 lg:pb-48'>
          {cards.length > 0 ? (
            <div className='lg:grid-rows-auto grid grid-cols-1 gap-6 md:grid-cols-2'>
              {cards.map((card, index) => (
                <BentoCardComponent
                  key={card.id || index}
                  card={card.item}
                  language={language}
                  editMode={editMode}
                  onFieldEdit={onFieldEdit}
                  dispatch={dispatch}
                  blockData={blockData}
                />
              ))}
            </div>
          ) : (
            editMode && (
              <div className='flex min-h-[400px] items-center justify-center'>
                <p className='text-sm text-gray-500'>No cards added yet</p>
              </div>
            )
          )}

          {editMode && (
            <div className='mt-8 flex justify-center'>
              <AddLabel
                label='ADD CARD'
                onClick={addNewCard}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/**
 * BentoCardComponent
 */
interface BentoCardComponentProps {
  card: BentoCard
  language: Language
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  dispatch?: Dispatch<PageBuilderAction>
  blockData?: BentoCardsSPData
}

function BentoCardComponent({
  card,
  language,
  editMode,
  onFieldEdit,
  dispatch,
  blockData,
}: BentoCardComponentProps) {
  const cardTitle = displayText(card.title, language)
  const cardDesc = displayText(card.description, language)
  const cardBg = displayText(card.backgroundColor, language) || '#44ECA0'
  const cardTextColor = displayText(card.textColor, language) || '#1a1a1a'
  const gridClasses = displayText(card.gridClasses, language) || ''

  return (
    <div
      className={`flex flex-col rounded-[32px] shadow-lg sm:rounded-[40px] ${gridClasses}`}
      style={{ backgroundColor: cardBg }}
    >
      <div className='p-8 text-center sm:p-10 lg:p-12'>
        <h3
          className='mb-4 font-heading text-3xl font-semibold sm:text-4xl lg:text-[38px]'
          style={{ color: cardTextColor }}
        >
          {cardTitle}
        </h3>
        {editMode && (
          <div className='mb-4 flex flex-wrap justify-center gap-2'>
            <EditLabel
              label='Edit Title'
              onClick={() =>
                onFieldEdit?.({
                  field: 'cards',
                  oldValue: card.title,
                  itemField: 'title',
                  itemIndex: card.id,
                  fieldType: 'text',
                  action: 'UPDATE',
                })
              }
            />
          </div>
        )}

        <p
          className='font-body text-xl font-light leading-relaxed lg:text-2xl lg:leading-[30px]'
          style={{ color: cardTextColor }}
        >
          {cardDesc}
        </p>
        {editMode && (
          <div className='mt-4 flex flex-wrap justify-center gap-2'>
            <EditLabel
              label='Edit Description'
              onClick={() =>
                onFieldEdit?.({
                  field: 'cards',
                  oldValue: card.description,
                  itemField: 'description',
                  itemIndex: card.id,
                  fieldType: 'text',
                  action: 'UPDATE',
                })
              }
            />
          </div>
        )}
      </div>

      <div className='mt-auto overflow-hidden rounded-3xl'>
        {card.image?.url && (
          <img
            src={card.image.url}
            className='h-auto w-full object-cover'
            alt={card.image.caption || cardTitle || 'Card'}
          />
        )}
      </div>

      {editMode && (
        <div className='flex flex-wrap justify-center gap-2 p-4'>
          <EditLabel
            label='Update Image'
            onClick={() =>
              onFieldEdit?.({
                field: 'cards',
                oldValue: null,
                itemField: 'image',
                itemIndex: card.id,
                fieldType: 'image',
                action: 'UPDATE',
              })
            }
          />
          <EditLabel
            label='Edit Background'
            onClick={() =>
              onFieldEdit?.({
                field: 'cards',
                oldValue: card.backgroundColor,
                itemField: 'backgroundColor',
                itemIndex: card.id,
                fieldType: 'text',
                action: 'UPDATE',
              })
            }
          />
          <EditLabel
            label='Edit Text Color'
            onClick={() =>
              onFieldEdit?.({
                field: 'cards',
                oldValue: card.textColor,
                itemField: 'textColor',
                itemIndex: card.id,
                fieldType: 'text',
                action: 'UPDATE',
              })
            }
          />
          <EditLabel
            label='Edit Grid Classes'
            onClick={() =>
              onFieldEdit?.({
                field: 'cards',
                oldValue: card.gridClasses,
                itemField: 'gridClasses',
                itemIndex: card.id,
                fieldType: 'text',
                action: 'UPDATE',
              })
            }
          />
          <EditLabel
            label='Remove Card'
            onClick={() => {
              dispatch?.({
                action: 'REMOVE_LIST_ITEM',
                blockId: blockData?.id,
                fieldName: 'cards',
                itemId: card.id,
              })
            }}
          />
        </div>
      )}
    </div>
  )
}

export default SectionBentoCardsSP
