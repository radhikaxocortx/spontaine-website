import { Button } from '@/components/ui/button'
import { Language } from '@/Components/ui/ui_interfaces'
import useMounted from '@/hooks/useMounted'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import HeroHeadline from '@/typography/HeroHeadline'
import HeroTextBlock from '@/typography/HeroTextBlock'
import { ArrowRight } from 'lucide-react'
import { Dispatch, useCallback } from 'react'
import AddLabel from '../Components/AddLabel'
import { BlocKFieldInfo } from '../Components/BlockEditor/BlockEditor'
import EditLabel from '../Components/EditLabel'
import InertiaLink from '../Components/InertiaLink'
import Localization from '../Components/Localization'
import { PageBuilderAction } from '../hooks/pageBuilderService'
import {
  BlockConfiguration,
  BlockImage,
  BlockVideo,
  ItemListField,
  LinkData,
  TextData,
} from '../page_interfaces'

export interface SectionHeroProps {
  className?: string
}
export interface MarqueeImages {
  id?: number
  image: BlockImage
  link?: LinkData
}
export interface ImageBlock extends BlockConfiguration {
  id?: number
  title: TextData
  title2?: TextData
  description: ItemListField<TextData>
  image?: BlockImage | null
  link?: LinkData | null
  link2?: LinkData | null
  video?: BlockVideo | null
  videoLink?: TextData | null
  date?: TextData
  categoryLink?: LinkData
  category?: TextData
  actions?: ItemListField<MarqueeImages>
}

const placeholderParagraph =
  'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. ' +
  'He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly'

const placeholderParagraphMal =
  'ന്യായമായ പ്രവൃത്തിസമയം ഇടക്കിടക്കു ശമ്പളത്തോടുകൂടിയ ഒഴിവുദിവസങ്ങൾ, ഒഴിവുസമയം, വിശ്രമം ഇതുകൾക്ക്‌ ഏതൊരാൾക്കും അവകാശമുള്ളതാണ്‌. ' +
  'അവരുടെ അധികാരത്തിലിരിക്കുന്ന ജനങ്ങളെക്കൊണ്ടും ഫലപ്രദമാകത്തക്ക രീതിയിൽ അംഗീകരിപ്പിക്കുവാൻ ശ്രമിക്കേണ്ടതുമാണ്‌.'

const placeholderTitle = 'Gregor then turned to look out'
const placeholderTitleMal = 'സാമുദായികവും സാംസ്കാരികവും സാമ്പത്തികവുമായ'

export const placeholderImage = {
  url: '/placeholder.jpeg',
  caption: 'placeholder image',
}

export const imageBlock = {
  title: {
    english: placeholderTitle,
    malayalam: placeholderTitleMal,
  },
  title2: {
    english: placeholderTitle,
    malayalam: placeholderTitleMal,
  },
  description: {
    lastUUID: 1,
    items: [
      {
        id: 1,
        item: {
          english: placeholderParagraph,
          malayalam: placeholderParagraphMal,
        },
      },
    ],
  },
  image: placeholderImage,
  actions: {
    lastUUID: 0,
    items: [],
  },
}

const defaultMarqueeImageCard: MarqueeImages = {
  image: { url: '/placeholdermarquee.png', caption: 'Placeholder' },
}

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: ImageBlock
  language?: Language
  dispatch?: Dispatch<PageBuilderAction>
}

const SectionHero = ({
  editMode = false,
  onFieldEdit,
  blockData = imageBlock,
  language = 'en',
  dispatch,
}: Properties) => {
  const isMounted = useMounted()
  const addNewAction = useCallback(() => {
    if (dispatch != null) {
      dispatch({
        action: 'INSERT_INTO_LIST',
        blockId: blockData?.id,
        fieldName: 'actions',
        fieldValue: {
          ...defaultMarqueeImageCard,
          name: { english: 'link', malayalam: '' },
          external: false,
          link: null,
        },
      })
    }
  }, [dispatch, blockData])

  return (
    <div
      className={`flex flex-col py-6 ${blockData?.marginTop} ${blockData?.marginBottom} ${blockData?.paddingTop} ${blockData?.paddingBottom}`}
    >
      <AppLayoutPadding>
        <div className='flex flex-col gap-4 md:gap-2 lg:gap-0'>
          <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
            <div className='flex max-w-lg flex-col gap-4 pt-6 text-center md:pt-10 md:text-left lg:pt-8'>
              {/* Banner title */}
              <HeroHeadline className='text-primary-graige-900'>
                <Localization
                  text={blockData.title}
                  language={language}
                />
              </HeroHeadline>

              {editMode && onFieldEdit != null && (
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

              {/* Banner description */}
              <div className='flex flex-col'>
                {blockData?.description?.items.map((item) => {
                  return (
                    <HeroTextBlock
                      className='text-neutral-graige-600'
                      key={item.id.toString()}
                    >
                      <Localization
                        text={item.item}
                        language={language}
                      />
                      {editMode && onFieldEdit != null && (
                        <EditLabel
                          onClick={() => {
                            onFieldEdit({
                              field: 'description',
                              fieldType: 'textItems',
                              oldValue: item.item,
                              action: 'UPDATE',
                              itemIndex: item.id,
                            })
                          }}
                        />
                      )}
                      <br />
                    </HeroTextBlock>
                  )
                })}
                {editMode && onFieldEdit != null && (
                  <AddLabel
                    onClick={() => {
                      onFieldEdit({
                        field: 'description',
                        fieldType: 'textItems',
                        oldValue: null,
                        action: 'INSERT',
                      })
                    }}
                    label='Add Subtitle Line'
                  />
                )}
              </div>

              {/* Call to Action */}
              <div className='flex items-center gap-4'>
                <Button size='lg'>
                  {' '}
                  Explore Directory
                  <ArrowRight
                    className='ml-2 inline-block'
                    size={18}
                  />{' '}
                </Button>

                {blockData?.link2 != null && (
                  <InertiaLink
                    className='text-base font-semibold text-black-tertiary-950 underline hover:text-primary-500'
                    language={language}
                    link={blockData?.link2}
                  />
                )}
                {editMode && onFieldEdit != null && (
                  <div>
                    {/* <EditLabel
                    label='Edit LInk'
                    onClick={() => {
                      onFieldEdit({
                        action: 'INSERT',
                        field: 'link',
                        fieldType: 'link',
                        oldValue: blockData.link ?? null,
                      })
                    }}
                  /> */}

                    <EditLabel
                      label='Edit LInk2'
                      onClick={() => {
                        onFieldEdit({
                          action: 'INSERT',
                          field: 'link2',
                          fieldType: 'link',
                          oldValue: blockData.link2 ?? null,
                        })
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Hero Image */}
            <div className='flex flex-col'>
              {blockData?.image != null && (
                <img
                  className='h-auto w-full rounded-3xl object-cover object-center'
                  src={blockData.image.url}
                  alt={blockData.image.caption}
                />
              )}
              {editMode && onFieldEdit != null && (
                <EditLabel
                  onClick={() => {
                    onFieldEdit({
                      action: 'INSERT',
                      field: 'image',
                      fieldType: 'image',
                      oldValue: blockData.image ?? null,
                    })
                  }}
                  label='Edit Image'
                />
              )}
            </div>
          </div>
          {/* Company logos */}
          <div className='grid space-x-4 pt-2 md:grid-cols-5 lg:grid-cols-12'>
            <div className='col-span-full flex md:col-span-1 lg:col-span-2'>
              <HeroTextBlock className='font-semibold leading-5 text-black-tertiary-950'>
                Trusted by the world's biggest brands
              </HeroTextBlock>
            </div>
            <div className='col-span-3 flex items-center'>
              <img
                className=''
                src='/imge/companylogo.png'
                alt='Brands'
              />
            </div>
          </div>
        </div>
      </AppLayoutPadding>
    </div>
  )
}

export default SectionHero
