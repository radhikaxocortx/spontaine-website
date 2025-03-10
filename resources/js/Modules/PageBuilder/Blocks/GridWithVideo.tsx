import {
  BlockConfiguration,
  BlockImage,
  ItemListField,
  TextData,
} from '@/Modules/PageBuilder/page_interfaces'

import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import {
  BlocKFieldInfo,
  BlockFieldTypes,
  BlockFieldValues,
} from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import EditLabel from '@/Modules/PageBuilder/Components/EditLabel'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { Language } from '@/Modules/PageBuilder/Pages/PageBuilder'
import useBlockStyling from '@/Modules/PageBuilder/hooks/useBlockStyling'
import HeroHeadline from '@/typography/HeroHeadline'
import HeroTextBlock from '@/typography/HeroTextBlock'
import { useState } from 'react'

export interface GridWithVideoBlock extends BlockConfiguration {
  title: TextData
  description: ItemListField<TextData>
  title2?: TextData
  title3?: TextData
  image?: BlockImage | null
  image2?: BlockImage | null
  videoLink?: TextData | null
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

export const placeholderPoster = {
  url: '/imge/videoposter.png',
  caption: 'placeholder poster',
}

export const gridWithVideoBlock = {
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
  title2: {
    english: '500+',
    malayalam: placeholderTitleMal,
  },
  title3: {
    english: 'Verified Businesses',
    malayalam: placeholderTitleMal,
  },
  image: placeholderImage,
  image2: placeholderPoster,
  videoLink: {
    english: 'https://www.youtube.com/embed/GfbifwbtGVU?si=mAiMdv8kLvv3mUUl?autoplay=1',
    malayalam: 'https://www.youtube.com/embed/GfbifwbtGVU?si=mAiMdv8kLvv3mUUl?autoplay=1',
  },
}

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: GridWithVideoBlock
  language?: Language
}

const GridWithVideo = ({
  editMode = false,
  onFieldEdit,
  blockData = gridWithVideoBlock,
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const onPlayVideo = () => {
    setIsVideoPlaying(true)
  }

  return (
    <div
      className={`bg-gradient-to-r from-secondary-100 to-white py-6 ${editMode ? '' : blockStyling}`}
    >
      <AppLayoutPadding>
        <div className={`grid grid-cols-1 md:grid-cols-12 md:gap-6 lg:gap-4`}>
          <div className='col-span-1 w-full justify-start md:col-span-6'>
            <HeroHeadline className='text-black-tertiary-950'>
              <Localization
                text={blockData.title}
                language={language}
              />
              {editMode && (
                <EditLabel onClick={() => onEdit('title', 'text', blockData.title, 'INSERT')} />
              )}
            </HeroHeadline>
          </div>
          <div className='col-span-1 flex w-full flex-col md:col-span-6'>
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
        </div>
        <div className='grid grid-cols-2 gap-2 md:grid-cols-12 md:gap-4 lg:gap-16'>
          <div className='relative col-span-1 mt-8 rounded-3xl md:col-span-4'>
            {blockData.image != null && (
              <img
                className='aspect-square w-full rounded-3xl object-cover object-center'
                alt={blockData.image.caption ?? ''}
                src={blockData.image?.url ?? ''}
                loading='lazy'
              />
            )}

            <HeroHeadline className='absolute inset-0 flex p-8 text-white'>
              <Localization
                text={blockData.title2}
                language={language}
              />
            </HeroHeadline>
            <HeroTextBlock className='absolute inset-0 flex px-9 py-20 text-white'>
              <Localization
                text={blockData.title3}
                language={language}
              />
            </HeroTextBlock>
          </div>
          {blockData.videoLink && (
            <div className='relative col-span-8 mt-8 overflow-hidden rounded-3xl px-0 md:px-8'>
              {isVideoPlaying ? (
                <iframe
                  width='100%'
                  height='100%'
                  src={blockData.videoLink?.english ?? ''}
                  title='YouTube video'
                  frameBorder='0'
                  allowFullScreen
                  className='rounded-3xl'
                />
              ) : (
                <img
                  src={blockData.image2?.url ?? ''}
                  alt='hero poster'
                  className='h-full w-full rounded-3xl object-cover object-center'
                />
              )}
              <a
                href='javascript:void(0)'
                onClick={onPlayVideo}
              >
                <div className='transition-filter absolute bottom-3 right-8 block rounded-full p-1 transition-transform duration-200 hover:scale-105 hover:brightness-90'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='52'
                    height='52'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#FFFFFF'
                    strokeWidth='4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='feather feather-play-circle'
                  >
                    <circle
                      cx='12'
                      cy='12'
                      r='10'
                      fill='#ffffff'
                    ></circle>
                    <polygon
                      points='10 8 16 12 10 16 10 8'
                      stroke='#1D4ED8'
                      fill='1D4ED8'
                    ></polygon>
                  </svg>
                </div>
              </a>
            </div>
          )}
        </div>
        <div className='col-span-12 flex justify-between gap-2'>
          {editMode && (
            <EditLabel
              label='Update Image1'
              onClick={() => onEdit('image', 'image', blockData.image, 'INSERT')}
            />
          )}

          {editMode && (
            <EditLabel
              label='Edit Title2'
              onClick={() => onEdit('title2', 'text', blockData.title2, 'INSERT')}
            />
          )}
          {editMode && (
            <EditLabel
              label='Edit Title3'
              onClick={() => onEdit('title3', 'text', blockData.title3, 'INSERT')}
            />
          )}
          {editMode && (
            <EditLabel
              label='Edit Poster'
              onClick={() => onEdit('image2', 'image', blockData.image2, 'INSERT')}
            />
          )}
          {editMode && (
            <EditLabel
              label='Edit Video'
              onClick={() => onEdit('videoLink', 'text', blockData.videoLink, 'INSERT')}
            />
          )}
        </div>
      </AppLayoutPadding>
    </div>
  )
}
export default GridWithVideo
