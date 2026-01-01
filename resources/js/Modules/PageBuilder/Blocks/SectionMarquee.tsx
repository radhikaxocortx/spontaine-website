import { Language } from '@/components/ui/ui_interfaces'
import useMounted from '@/hooks/useMounted'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { Dispatch, useCallback } from 'react'
import Marquee from 'react-fast-marquee'
import AddLabel from '../Components/AddLabel'
import { BlocKFieldInfo } from '../Components/BlockEditor/BlockEditor'
import EditLabel from '../Components/EditLabel'
import InertiaLink from '../Components/InertiaLink'
import { PageBuilderAction } from '../hooks/pageBuilderService'
import {
  Block,
  BlockConfiguration,
  BlockImage,
  ItemListField,
  LinkData,
  TextData,
} from '../page_interfaces'

export interface MarqueeData extends Block, BlockConfiguration {
  description: TextData
  link: LinkData
  actions: ItemListField<MarqueeImages>
}

export interface MarqueeImages {
  id?: number
  image: BlockImage
  link: LinkData
}

interface Props {
  blockData?: MarqueeData
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  language?: Language
  dispatch?: Dispatch<PageBuilderAction>
}

export const defaultMarqueeImageBlock = {
  description: { english: 'Description here', malayalam: '' },
  link: {
    external: false,
    link: '',
    name: { english: 'placeholder', malayalam: '' },
  },
  actions: {
    lastUUID: 0,
    items: [],
  },
}

const defaultMarqueeImageCard: MarqueeImages = {
  image: { url: '/imge/logos/1.png', caption: 'Company Logo' },
  link: {
    link: null,
    name: { english: '', malayalam: '' },
    external: false,
  },
}

const SectionMarquee = ({ editMode, onFieldEdit, blockData, language = 'en', dispatch }: Props) => {
  const isMounted = useMounted()
  const addNewAction = useCallback(() => {
    if (dispatch != null) {
      dispatch({
        action: 'INSERT_INTO_LIST',
        blockId: blockData?.id,
        fieldName: 'actions',
        fieldValue: defaultMarqueeImageCard,
      })
    }
  }, [dispatch, blockData])

  return (
    <div
      className={`flex w-full flex-col items-center ${blockData?.marginTop} ${blockData?.marginBottom} ${blockData?.paddingTop} ${blockData?.paddingBottom}`}
    >
      {isMounted && (
        <AppLayoutPadding>
          <div className='flex w-full flex-col items-center justify-center gap-0 lg:flex-row lg:gap-10'>
            <div className='w-full'>
              <Marquee
                pauseOnHover
                direction='left'
                gradient={false}
                speed={editMode ? 30 : 60}
              >
                {blockData?.actions?.items.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='mx-12'
                    >
                      <InertiaLink
                        link={item.item.link}
                        language={language}
                      >
                        <img
                          src={item.item.image.url ?? ''}
                          alt={''}
                          className='flex h-10 w-auto px-4 py-0 lg:h-14 lg:px-8 lg:py-3 2xl:h-20'
                          loading='lazy'
                        />
                      </InertiaLink>
                      <div className='flex flex-col items-center gap-1'>
                        <div>
                          {editMode && onFieldEdit != null && (
                            <EditLabel
                              label='Update Image'
                              onClick={() =>
                                onFieldEdit({
                                  field: 'actions',
                                  oldValue: null,
                                  itemField: 'image',
                                  itemIndex: item.id,
                                  fieldType: 'image',
                                  action: 'UPDATE',
                                })
                              }
                            />
                          )}
                        </div>
                        <div>
                          {editMode && onFieldEdit != null && (
                            <EditLabel
                              label='Update Link'
                              onClick={() =>
                                onFieldEdit({
                                  field: 'actions',
                                  oldValue: item.item.link,
                                  itemField: 'link',
                                  itemIndex: item.id,
                                  fieldType: 'link',
                                  action: 'UPDATE',
                                })
                              }
                            />
                          )}
                        </div>
                        <div className=' '>
                          {editMode && dispatch != null && (
                            <EditLabel
                              label='Remove Slide'
                              onClick={() => {
                                dispatch({
                                  action: 'REMOVE_LIST_ITEM',
                                  blockId: blockData?.id,
                                  fieldName: 'actions',
                                  itemId: item.id,
                                })
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Marquee>
              {editMode && onFieldEdit != null && (
                <div>
                  <AddLabel
                    label='ADD IMAGE'
                    onClick={addNewAction}
                  />
                </div>
              )}
            </div>
          </div>
        </AppLayoutPadding>
      )}
    </div>
  )
}

export default SectionMarquee
