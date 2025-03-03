import RichTextDisplay from '@/Modules/PageBuilder/Blocks/RichText/RichTextDisplay'
import {
  BlocKFieldInfo,
  BlockFieldTypes,
  BlockFieldValues,
} from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import EditLabel from '@/Modules/PageBuilder/Components/EditLabel'
import { displayText } from '@/Modules/PageBuilder/Components/Localization'
import { BlockConfiguration, TextData } from '@/Modules/PageBuilder/page_interfaces'
import { Language } from '@/Modules/PageBuilder/Pages/PageBuilder'

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: RichTextBlockData
  language?: Language
}

export interface RichTextBlockData extends BlockConfiguration {
  text: TextData
}

export const richTextData = {
  text: {
    english: '',
    malayalam: '',
  },
}

const RichTextBlock = ({
  editMode = false,
  onFieldEdit,
  blockData = richTextData,
  language = 'en',
}: Properties) => {
  const onEdit = (field: string, fieldType: BlockFieldTypes, oldValue: BlockFieldValues) => {
    if (onFieldEdit) {
      onFieldEdit({
        field,
        fieldType,
        oldValue,
        action: 'UPDATE',
      })
    }
  }

  return (
    <>
      <div
        className={`w-full ${blockData.marginTop} ${blockData.marginBottom} ${blockData.paddingTop} ${blockData.paddingBottom}`}
      >
        <RichTextDisplay data={displayText(blockData.text, language)} />
      </div>
      <div className='flex'>
        {editMode && <EditLabel onClick={() => onEdit('text', 'html', blockData.text)} />}
      </div>
    </>
  )
}

export default RichTextBlock
