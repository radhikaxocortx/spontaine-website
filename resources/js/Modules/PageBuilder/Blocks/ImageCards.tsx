import {
  BlockConfiguration,
  BlockImage,
  ItemListField,
  LinkData,
  TextData,
} from '@/Modules/PageBuilder/page_interfaces'

import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import {
  BlocKFieldInfo,
  BlockFieldTypes,
  BlockFieldValues,
} from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import EditLabel from '@/Modules/PageBuilder/Components/EditLabel'
import InertiaLink from '@/Modules/PageBuilder/Components/InertiaLink'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { Language } from '@/Modules/PageBuilder/Pages/PageBuilder'
import useBlockStyling from '@/Modules/PageBuilder/hooks/useBlockStyling'
import { Button } from '@/components/ui/button'
import HeroHeadline from '@/typography/HeroHeadline'
import HeroTextBlock from '@/typography/HeroTextBlock'
import { ArrowRightIcon } from 'lucide-react'

export interface ImageCardsBlock extends BlockConfiguration {
  title: TextData
  description: ItemListField<TextData>
  image?: BlockImage | null
  image2?: BlockImage | null
  link?: LinkData | null
  link2?: LinkData | null
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

export const imageCardsBlock = {
  title: {
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
  image2: placeholderImage,
  link: {
    name: {
      english: 'Start Now',
      malayalam: '',
    },
    link: '/',
    external: false,
  },
  link2: {
    name: {
      english: 'Start Now',
      malayalam: '',
    },
    link: '/',
    external: false,
  },
}

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: ImageCardsBlock
  language?: Language
}

const ImageCards = ({
  editMode = false,
  onFieldEdit,
  blockData = imageCardsBlock,
  language = 'en',
}: Properties) => {
  const onEdit = (
    field: string,
    fieldType: BlockFieldTypes,
    oldValue: BlockFieldValues,
    action: 'UPDATE' | 'REMOVE' | 'INSERT',
    index?: number
  ) => {
    if (onFieldEdit) {
      onFieldEdit({
        field,
        fieldType,
        oldValue,
        action,
        itemIndex: index,
      })
    }
  }

  const blockStyling = useBlockStyling(blockData)

  return (
    <div
      className={`flex w-full flex-col items-center bg-secondary-100 ${editMode ? '' : blockStyling}`}
    >
      <AppLayoutPadding>
        <div className='flex flex-col space-y-4 rounded-3xl px-4 py-12 md:space-y-6 md:py-16 lg:py-20'>
          <div className='flex w-full justify-start'>
            <HeroHeadline className='text-primary-950'>
              <Localization
                text={blockData.title}
                language={language}
              />
              {editMode && (
                <EditLabel onClick={() => onEdit('title', 'text', blockData.title, 'INSERT')} />
              )}
            </HeroHeadline>
          </div>
          <div className='flex w-full flex-col justify-start lg:w-3/4'>
            {blockData.description.items.map((item) => {
              return (
                <HeroTextBlock
                  className='text-neutral-graige-600'
                  key={item.id.toString()}
                >
                  <Localization
                    text={item.item}
                    language={language}
                  />
                  {editMode && (
                    <EditLabel
                      onClick={() =>
                        onEdit('description', 'textItems', item.item, 'UPDATE', item.id)
                      }
                    />
                  )}
                </HeroTextBlock>
              )
            })}
          </div>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='relative w-4/5 rounded-3xl'>
              {blockData.image != null && (
                <img
                  className='relative max-h-[320px] w-full max-w-[512px] rounded-3xl object-cover object-center'
                  alt={blockData.image.caption ?? ''}
                  src={blockData.image?.url ?? ''}
                  loading='lazy'
                />
              )}

              <div className='absolute -bottom-10 -right-6 flex items-end justify-end p-12 md:p-8 lg:p-12 2xl:right-36'>
                {blockData.link != null && (
                  <InertiaLink
                    link={blockData.link}
                    language={language}
                    className='flex w-full shrink-0 items-start justify-start space-x-2 py-1 text-base md:w-auto md:py-3 lg:mx-2 lg:mt-2'
                  >
                    <Button
                      size='md'
                      variant={'outline'}
                      className='transition-all duration-300 hover:bg-gradient-to-r hover:from-primary-950 hover:to-secondary-500 hover:text-white'
                    >
                      <Localization
                        language={language}
                        text={blockData.link.name}
                      />
                      <ArrowRightIcon className='ml-2 h-4 w-4' />
                    </Button>
                  </InertiaLink>
                )}
              </div>
            </div>
            <div className='relative w-4/5 rounded-3xl'>
              {blockData.image2 != null && (
                <img
                  className='relative max-h-[320px] w-full max-w-[512px] rounded-3xl object-cover object-center'
                  alt={blockData.image2.caption ?? ''}
                  src={blockData.image2?.url ?? ''}
                  loading='lazy'
                />
              )}

              <div className='absolute -bottom-10 -right-6 flex items-end justify-end p-12 md:p-8 lg:p-12 2xl:right-36'>
                {blockData.link2 != null && (
                  <InertiaLink
                    link={blockData.link2}
                    language={language}
                    className='flex w-full shrink-0 items-start justify-end space-x-2 py-1 text-base md:w-auto md:py-3 lg:mx-2 lg:mt-2'
                  >
                    <Button
                      size='md'
                      variant={'outline'}
                      className='transition-all duration-300 hover:bg-gradient-to-r hover:from-primary-950 hover:to-secondary-500 hover:text-white'
                    >
                      {blockData.link2.name.english}
                      <ArrowRightIcon className='ml-2 h-4 w-4' />
                    </Button>
                  </InertiaLink>
                )}
              </div>
            </div>
          </div>
          <div className='flex justify-between'>
            {editMode && (
              <EditLabel
                label='Update Image1'
                onClick={() => onEdit('image', 'image', null, 'INSERT')}
              />
            )}
            {editMode && (
              <EditLabel
                label='Update Image2'
                onClick={() => onEdit('image2', 'image', null, 'INSERT')}
              />
            )}
          </div>

          <div className='mt-4 flex justify-between'>
            {editMode && onFieldEdit != null && (
              <EditLabel
                label='Edit Button'
                onClick={() =>
                  onFieldEdit({
                    field: 'link',
                    fieldType: 'link',
                    oldValue: blockData.link,
                    action: 'UPDATE',
                  })
                }
              />
            )}
            {editMode && onFieldEdit != null && (
              <EditLabel
                label='Edit Button'
                onClick={() =>
                  onFieldEdit({
                    field: 'link2',
                    fieldType: 'link',
                    oldValue: blockData.link2,
                    action: 'UPDATE',
                  })
                }
              />
            )}
          </div>
        </div>
      </AppLayoutPadding>
    </div>
  )
}
export default ImageCards
