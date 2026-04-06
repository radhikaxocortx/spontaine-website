import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import RichTextDisplay from '@/Modules/PageBuilder/Blocks/RichText/RichTextDisplay'
import {
  BlocKFieldInfo,
  BlockFieldTypes,
  BlockFieldValues,
} from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import EditLabel from '@/Modules/PageBuilder/Components/EditLabel'
import { displayText } from '@/Modules/PageBuilder/Components/Localization'
import { usePageBuilderContext } from '@/Modules/PageBuilder/contexts/PageBuilderContext'
import { BlockConfiguration, TextData } from '@/Modules/PageBuilder/page_interfaces'
import { Language } from '@/Modules/PageBuilder/Pages/PageBuilder'

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: RichTextSPBlockData
  language?: Language
}

export interface RichTextSPBlockData extends BlockConfiguration {
  text: TextData
}

export const richTextSPData = {
  text: {
    english: '',
    malayalam: '',
  },
}

const RichTextSP = ({
  editMode = false,
  onFieldEdit,
  blockData = richTextSPData,
  language = 'en',
}: Properties) => {
  const { renderMode } = usePageBuilderContext()

  const onEdit = (field: string, fieldType: BlockFieldTypes, oldValue: BlockFieldValues) => {
    if (onFieldEdit) {
      onFieldEdit({
        field,
        fieldType,
        oldValue: oldValue ?? richTextSPData.text,
        action: 'UPDATE',
      })
    }
  }

  const renderContent = () => {
    const content = (
      <div className='mx-auto max-w-xl justify-center py-16 sm:py-24 lg:py-32'>
        <RichTextDisplay data={displayText(blockData.text, language)} />
      </div>
    )

    if (renderMode === 'page') {
      return <AppLayoutPadding>{content}</AppLayoutPadding>
    }

    // Drawer mode
    return <div className='px-2 md:px-12'>{content}</div>
  }

  return (
    <>
      <div
        className={`w-full bg-white ${blockData.marginTop} ${blockData.marginBottom} ${blockData.paddingTop} ${blockData.paddingBottom}`}
      >
        {renderContent()}
      </div>
      <div className='flex'>
        {editMode && <EditLabel onClick={() => onEdit('text', 'html', blockData.text)} />}
      </div>
    </>
  )
}

export default RichTextSP
