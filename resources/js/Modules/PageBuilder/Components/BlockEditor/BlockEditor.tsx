import ButtonBorderIcon from '@/components/CustomUI/Button/ButtonBorderIcon'
import { default as BlockConfigurationForm } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditorForms/BlockConfigurationForm'
import ChangeDescriptionForm from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditorForms/ChangeDescriptionForm'
import ChangeImageForm from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditorForms/ChangeImageForm'
import ChangeLinkForm from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditorForms/ChangeLinkForm'
import ChangeTextForm from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditorForms/ChangeTextForm'
import ChangeVideoForm from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditorForms/ChangeVideoForm'
import ResolveComponent from '@/Modules/PageBuilder/Components/ResolveComponent'
import TinyMCE from '@/Modules/PageBuilder/Components/TinyMCE/TinyMce'
import { Language } from '@/Modules/PageBuilder/Pages/PageBuilder'
import { PageBuilderAction } from '@/Modules/PageBuilder/hooks/pageBuilderService'
import useBlockStyling from '@/Modules/PageBuilder/hooks/useBlockStyling'
import {
  Block,
  BlockConfiguration,
  BlockImage,
  BlockVideo,
  ItemListField,
  LinkData,
  PageDataDependencies,
  RequiredTextData,
  TextData,
} from '@/Modules/PageBuilder/page_interfaces'
import { ArrowDownIcon, ArrowUpIcon, Settings2Icon, XIcon } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import { FAQItemData } from '../../Blocks/FAQ'

interface Properties {
  block: Block
  dispatch: React.Dispatch<PageBuilderAction>
  language: Language
  dependencies?: PageDataDependencies
}

export type BlockFieldTypes =
  | 'text'
  | 'textarea'
  | 'image'
  | 'images'
  | 'video'
  | 'videos'
  | 'link'
  | 'links'
  | 'html'
  | 'textItems'

export type BlockFieldValues =
  | RequiredTextData
  | TextData
  | LinkData
  | BlockImage
  | BlockVideo
  | FAQItemData
  | ItemListField<TextData>
  | { link: LinkData }
  | null
  | undefined

export interface BlocKFieldInfo {
  field: string
  fieldType: BlockFieldTypes
  oldValue: BlockFieldValues
  action: 'UPDATE' | 'INSERT' | 'REMOVE'
  itemIndex?: number
  itemField?: string
}

export type onFieldEdit = (field: BlocKFieldInfo) => void

const BlockEditor = ({ block, dispatch, language, dependencies }: Properties) => {
  const [selectedField, setSelectedField] = useState<BlocKFieldInfo | null>(null)
  const [showConfigurationForm, setShowConfigurationForm] = useState(false)

  const moveUP = () => {
    dispatch({ action: 'MOVE_BLOCK_UP', blockId: block.id })
  }

  const moveDOWN = () => {
    dispatch({ action: 'MOVE_BLOCK_DOWN', blockId: block.id })
  }

  const remove = () => {
    dispatch({ action: 'REMOVE_BLOCK', blockId: block.id })
  }

  const onFieldEdit = (field: BlocKFieldInfo) => {
    setSelectedField(field)
  }

  const onHtmlInput = useCallback(
    (html: string) => {
      const oldValue = selectedField?.oldValue as TextData
      dispatch({
        action: 'UPDATE_BLOCK_FIELD',
        blockId: block.id,
        fieldName: selectedField?.field,
        fieldValue: {
          english: language == 'en' ? html : oldValue.english,
          malayalam: language == 'mal' ? html : oldValue.malayalam,
        },
      })
      setSelectedField(null)
    },
    [selectedField, block, dispatch, language]
  )

  const updateConfig = useCallback(
    (field: BlockConfiguration) => {
      dispatch({
        action: 'UPDATE_BLOCK_FIELDS',
        blockId: block.id,
        blockData: field as Record<string, BlockFieldValues>,
      })
    },
    [dispatch, block]
  )

  const blockStyling = useBlockStyling(block)

  return (
    <div className={`relative ${blockStyling}`}>
      <div className='absolute right-2 top-1 z-20 flex flex-wrap gap-2'>
        <ButtonBorderIcon onClick={() => setShowConfigurationForm(true)}>
          <></>
          <Settings2Icon className='h-4 w-5' />
        </ButtonBorderIcon>
        <ButtonBorderIcon onClick={moveUP}>
          <ArrowUpIcon className='h-5 w-4' />
        </ButtonBorderIcon>
        <ButtonBorderIcon onClick={moveDOWN}>
          <ArrowDownIcon className='h-4 w-5' />
        </ButtonBorderIcon>
        <ButtonBorderIcon onClick={remove}>
          <XIcon className='h-4 w-4' />
        </ButtonBorderIcon>
      </div>
      <div className='relative z-10 flex min-h-11 items-center border-b border-gray-200 bg-gray-50 px-4 py-2 pr-40'>
        <p className='m-0 font-mono text-xs font-semibold uppercase tracking-wide text-gray-600'>
          {block.blockName}
        </p>
      </div>
      {selectedField?.fieldType !== 'html' && (
        <ResolveComponent
          blockName={block.blockName}
          editMode
          onFieldEdit={onFieldEdit}
          block={block}
          language={language}
          dispatch={dispatch}
          dependencies={dependencies}
        />
      )}
      {selectedField?.fieldType === 'html' && (
        <div className='w-full'>
          <TinyMCE
            data={
              language == 'en'
                ? ((selectedField?.oldValue as TextData)?.english as string)
                : ((selectedField?.oldValue as TextData)?.malayalam as string)
            }
            setData={onHtmlInput}
            setShowModal={() => setSelectedField(null)}
            variant={block.blockName === 'Spontaine V3 - Rich Text' ? 'v3' : 'default'}
          />
        </div>
      )}
      <ChangeTextForm
        block={block}
        dispatch={dispatch}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
      />
      <ChangeDescriptionForm
        block={block}
        dispatch={dispatch}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
      />
      <ChangeLinkForm
        block={block}
        dispatch={dispatch}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
      />
      <ChangeImageForm
        block={block}
        dispatch={dispatch}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
      />
      <ChangeVideoForm
        block={block}
        dispatch={dispatch}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
      />
      <BlockConfigurationForm
        showForm={showConfigurationForm}
        setShowForm={setShowConfigurationForm}
        onConfigUpdate={updateConfig}
        block={block}
      />
    </div>
  )
}

export default BlockEditor
