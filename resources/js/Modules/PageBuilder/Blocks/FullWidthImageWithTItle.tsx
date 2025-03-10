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

export interface FullWidthImageWithTItleBlock extends BlockConfiguration {
  title: TextData
  description: ItemListField<TextData>
  image?: BlockImage | null
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

export const fullWidthImageWithTItleBlock = {
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
}

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: FullWidthImageWithTItleBlock
  language?: Language
}

const FullWidthImageWithTItle = ({
  editMode = false,
  onFieldEdit,
  blockData = fullWidthImageWithTItleBlock,
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
    <div className={`bg-white py-6 ${editMode ? '' : blockStyling}`}>
      <AppLayoutPadding>
        <div className={`flex w-full flex-col gap-2`}>
          <div className='w-full justify-start'>
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
          <div className='flex w-full flex-col lg:w-3/4'>
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
          <div className=''>
            {blockData.image != null && (
              <img
                className='w-full rounded-3xl object-cover object-center'
                alt={blockData.image.caption ?? ''}
                src={blockData.image?.url ?? ''}
                loading='lazy'
              />
            )}
          </div>
          <div className='flex justify-between'>
            {editMode && (
              <EditLabel
                label='Update Image1'
                onClick={() => onEdit('image', 'image', null, 'INSERT')}
              />
            )}
          </div>
        </div>
      </AppLayoutPadding>
    </div>
  )
}
export default FullWidthImageWithTItle
