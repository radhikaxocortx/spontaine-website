import {
  BlockConfiguration,
  BlockImage,
  BlockVideo,
  ItemListField,
  LinkData,
  TextData,
} from '@/Modules/PageBuilder/page_interfaces'

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

export interface ImageBlock extends BlockConfiguration {
  title: TextData
  title2?: TextData
  description: ItemListField<TextData>
  image?: BlockImage | null
  link?: LinkData | null
  video?: BlockVideo | null
  videoLink?: TextData | null
  date?: TextData
  categoryLink?: LinkData
  category?: TextData
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
}

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: ImageBlock
  language?: Language
}

const LeftImageBlock = ({
  editMode = false,
  onFieldEdit,
  blockData = imageBlock,
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
    // <AppLayoutPadding>
    <div className={`${editMode ? '' : blockStyling}`}>
      <div className={`bg-theme_color_2 flex w-full flex-wrap`}>
        <div className='flex w-full flex-col md:w-5/12 lg:w-4/12'>
          {blockData.image != null && (
            <img
              className='aspect-[3/3] w-full object-cover object-center'
              alt={blockData.image.caption ?? ''}
              src={blockData.image?.url ?? ''}
              loading='lazy'
            />
          )}
          {editMode && <EditLabel onClick={() => onEdit('image', 'image', null, 'INSERT')} />}
        </div>
        <div className='mt-6 flex w-full flex-col justify-center pl-4 pt-4 md:w-7/12 md:pl-8 md:pt-0 lg:w-8/12 lg:pl-16'>
          <div className='w-full justify-start md:w-full md:justify-start xl:w-2/3'>
            <p className='lg:supersizethick supersizethick-md supersizethick-sm'>
              <Localization
                text={blockData.title}
                language={language}
              />
              {editMode && (
                <EditLabel onClick={() => onEdit('title', 'text', blockData.title, 'INSERT')} />
              )}
            </p>
          </div>
          <div className='flex w-full flex-col lg:w-3/4'>
            {blockData.description.items.map((item) => {
              return (
                <p
                  className='lg:subheadingthin md:subheadingthin-md subheadingthin-sm mt-8 justify-start xl:pr-0 2xl:pr-24'
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
                </p>
              )
            })}
          </div>
          <div className='mt-4 flex justify-start'>
            {blockData.link != null && (
              <InertiaLink
                link={blockData.link}
                language={language}
                className='flex w-full shrink-0 items-start justify-center space-x-2 py-1 text-base transition duration-700 hover:-translate-y-3 md:w-auto md:py-4 lg:mx-2 lg:mt-2'
              >
                <p className='smButtonText md:lgButtonText'>
                  <Localization
                    language={language}
                    text={blockData.link.name}
                  />
                </p>
                <svg
                  width='20'
                  viewBox='0 0 41 41'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M20.5 0C9.17816 0 0 9.17816 0 20.5C0 31.8218 9.17816 41 20.5 41C31.8218 41 41 31.8218 41 20.5C41 9.17816 31.8218 0 20.5 0ZM1 20.5C1 9.73044 9.73044 1 20.5 1C31.2696 1 40 9.73044 40 20.5C40 31.2696 31.2696 40 20.5 40C9.73044 40 1 31.2696 1 20.5ZM26.8536 20.1465L17.5001 10.793L16.793 11.5001L25.793 20.5001L16.793 29.5001L17.5001 30.2072L26.8536 20.8536C27.0489 20.6584 27.0489 20.3418 26.8536 20.1465Z'
                    fill='white'
                  />
                </svg>
              </InertiaLink>
            )}
            {editMode && onFieldEdit != null && (
              <EditLabel
                label='Edit Link'
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
          </div>
        </div>
      </div>
    </div>
    // </AppLayoutPadding>
  )
}
export default LeftImageBlock
