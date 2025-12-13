import useMounted from '@/hooks/useMounted'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { Dispatch, useCallback } from 'react'
import Marquee from 'react-fast-marquee'
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
  LinkData,
  TextData,
} from '../../page_interfaces'
import { Language } from '../../Pages/PageBuilder'

export interface MarqueeSPData extends Block, BlockConfiguration {
  label: TextData
  title: TextData
  backgroundColor: TextData
  fontColor: TextData
  logos: ItemListField<MarqueeLogoItem>
}

export interface MarqueeLogoItem {
  id?: number
  image: BlockImage
  link: LinkData
}

interface Props {
  blockData?: MarqueeSPData
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  language?: Language
  dispatch?: Dispatch<PageBuilderAction>
}

export const marqueeSPBlock = {
  label: { english: 'Our customers', malayalam: '' },
  title: {
    english: 'Trusted by\nhigh-impact organizations',
    malayalam: '',
  },
  backgroundColor: { english: '#ffffff', malayalam: '' },
  fontColor: { english: '#000000', malayalam: '' },
  logos: {
    lastUUID: 0,
    items: [],
  },
}

const defaultLogoItem: MarqueeLogoItem = {
  image: { url: '/images/logos/placeholder-logo.png', caption: 'Company Logo' },
  link: {
    link: null,
    name: { english: '', malayalam: '' },
    external: false,
  },
}

const SectionMarqueeSP = ({
  editMode,
  onFieldEdit,
  blockData = marqueeSPBlock,
  language = 'en',
  dispatch,
}: Props) => {
  const isMounted = useMounted()

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

  const addNewLogo = useCallback(() => {
    if (dispatch != null) {
      dispatch({
        action: 'INSERT_INTO_LIST',
        blockId: blockData?.id,
        fieldName: 'logos',
        fieldValue: defaultLogoItem,
      })
    }
  }, [dispatch, blockData])

  const backgroundColor = displayText(blockData.backgroundColor, language) || '#ffffff'
  const fontColor = displayText(blockData.fontColor, language) || '#000000'
  const labelText = displayText(blockData.label, language)
  const titleText = displayText(blockData.title, language)

  return (
    <section
      className={`relative w-full overflow-hidden ${blockData.marginTop} ${blockData.marginBottom} ${blockData.paddingTop} ${blockData.paddingBottom}`}
    >
      {/* MAIN CONTENT */}
      <div
        className='relative py-4 sm:py-2 lg:py-2'
        style={{ backgroundColor }}
      >
        {isMounted && (
          <AppLayoutPadding>
            {/* Section Label */}
            <div className='mb-12 flex justify-center'>
              <div className='rounded-md bg-black/5 px-6 py-2.5'>
                <p
                  className='font-roboto-mono text-sm tracking-tight'
                  style={{ color: fontColor }}
                >
                  {labelText}
                </p>
              </div>
              {editMode && (
                <EditLabel
                  label='Edit Label'
                  onClick={() => onEdit('label', 'text', blockData.label)}
                />
              )}
            </div>

            {/* Heading */}
            <div className='mx-auto mb-12 max-w-xl px-6 text-center sm:mb-16 lg:mb-20'>
              <h2
                className='whitespace-pre-line font-heading text-5xl font-normal leading-tight sm:text-6xl lg:text-7xl xl:text-[88.9px] xl:leading-[90px]'
                style={{ color: fontColor }}
              >
                {titleText}
              </h2>
              {editMode && (
                <EditLabel
                  label='Edit Title'
                  onClick={() => onEdit('title', 'text', blockData.title)}
                />
              )}
            </div>

            {/* Background Color Editor */}
            {editMode && (
              <div className='mb-6 flex justify-center gap-4'>
                <EditLabel
                  label='Edit Background Color'
                  onClick={() => onEdit('backgroundColor', 'text', blockData.backgroundColor)}
                />
                <EditLabel
                  label='Edit Font Color'
                  onClick={() => onEdit('fontColor', 'text', blockData.fontColor)}
                />
              </div>
            )}

            {/* Marquee Container */}
            <div className='relative mx-auto max-w-3xl overflow-hidden px-6'>
              {/* Fade Gradients on Edges */}
              <div
                className='pointer-events-none absolute inset-y-0 left-0 z-10 w-24'
                style={{
                  background: `linear-gradient(to right, ${backgroundColor}, transparent)`,
                }}
              />
              <div
                className='pointer-events-none absolute inset-y-0 right-0 z-10 w-24'
                style={{
                  background: `linear-gradient(to left, ${backgroundColor}, transparent)`,
                }}
              />

              {/* Marquee Track */}
              {blockData?.logos?.items && blockData.logos.items.length > 0 ? (
                <Marquee
                  pauseOnHover
                  direction='left'
                  gradient={false}
                  speed={editMode ? 30 : 60}
                >
                  {blockData.logos.items.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className='mx-8 flex-shrink-0 sm:mx-10 lg:mx-12'
                    >
                      <div className='flex items-center justify-center'>
                        <img
                          src={item.item.image.url ?? '/images/logos/placeholder-logo.png'}
                          alt={item.item.image.caption || 'Company Logo'}
                          className='h-auto w-full max-w-[80px] object-contain transition-all duration-300 hover:opacity-100 hover:grayscale-0'
                          loading='lazy'
                        />
                      </div>
                      {editMode && (
                        <div className='mt-2 flex flex-col items-center gap-1'>
                          <EditLabel
                            label='Update Image'
                            onClick={() =>
                              onFieldEdit?.({
                                field: 'logos',
                                oldValue: null,
                                itemField: 'image',
                                itemIndex: item.id,
                                fieldType: 'image',
                                action: 'UPDATE',
                              })
                            }
                          />
                          <EditLabel
                            label='Update Link'
                            onClick={() =>
                              onFieldEdit?.({
                                field: 'logos',
                                oldValue: item.item.link,
                                itemField: 'link',
                                itemIndex: item.id,
                                fieldType: 'link',
                                action: 'UPDATE',
                              })
                            }
                          />
                          <EditLabel
                            label='Remove'
                            onClick={() => {
                              dispatch?.({
                                action: 'REMOVE_LIST_ITEM',
                                blockId: blockData?.id,
                                fieldName: 'logos',
                                itemId: item.id,
                              })
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </Marquee>
              ) : (
                editMode && (
                  <div className='flex min-h-[100px] items-center justify-center'>
                    <p
                      className='text-sm opacity-50'
                      style={{ color: fontColor }}
                    >
                      No logos added yet
                    </p>
                  </div>
                )
              )}

              {editMode && (
                <div className='mt-6 flex justify-center'>
                  <AddLabel
                    label='ADD LOGO'
                    onClick={addNewLogo}
                  />
                </div>
              )}
            </div>
          </AppLayoutPadding>
        )}
      </div>
    </section>
  )
}

export default SectionMarqueeSP
