import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Language } from '@/components/ui/ui_interfaces'
import AddLabel from '@/Modules/PageBuilder/Components/AddLabel'
import EditLabel from '@/Modules/PageBuilder/Components/EditLabel'
import TitleInput from '@/Modules/PageBuilder/Components/Forms/TitleInput'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { PageBuilderAction } from '@/Modules/PageBuilder/hooks/pageBuilderService'
import {
  ItemListField,
  ListItem,
  RequiredTextData,
  TextData,
} from '@/Modules/PageBuilder/page_interfaces'
import { Dispatch, useState } from 'react'

interface PricePlanCardFeaturesProps {
  readonly features: ItemListField<RequiredTextData>
  readonly language?: Language
  readonly editMode?: boolean
  readonly dispatch?: Dispatch<PageBuilderAction>
  readonly blockId?: number
  readonly cardId: number
  readonly addNewFeature: (id: number) => void
}

const updateFeature = (
  features: ItemListField<RequiredTextData>,
  feature: ListItem<RequiredTextData>,
  data: TextData
) => {
  const updatedItems = features.items.map((item) => {
    if (item.id === feature.id) {
      return {
        ...item,
        item: {
          english: data.english ?? '',
          malayalam: data.malayalam ?? '',
        },
      }
    }
    return item
  })

  const updatedFeaturesList: ItemListField<RequiredTextData> = {
    lastUUID: features.lastUUID,
    items: updatedItems,
  }

  return updatedFeaturesList
}

const removeFeature = (
  features: ItemListField<RequiredTextData>,
  feature: ListItem<RequiredTextData>
) => {
  const updatedItems = features.items.filter((item) => item.id !== feature.id)

  const updatedFeaturesList: ItemListField<RequiredTextData> = {
    lastUUID: features.lastUUID,
    items: updatedItems,
  }

  return updatedFeaturesList
}

export default function PricePlanCardFeatures({
  features,
  language = 'en',
  editMode,
  dispatch,
  cardId,
  blockId,
  addNewFeature,
}: Readonly<PricePlanCardFeaturesProps>) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingFeature, setEditingFeature] = useState<ListItem<RequiredTextData> | null>(null)

  const handleEditClick = (feature: ListItem<RequiredTextData>) => {
    setEditingFeature(feature)
    setDialogOpen(true)
  }

  const handleEditSubmit = (data: TextData | null) => {
    if (blockId == null || dispatch == null || editingFeature == null) {
      return
    }

    const currentFeatures = features

    let updatedFeaturesList: ItemListField<RequiredTextData>
    if (data != null) {
      updatedFeaturesList = updateFeature(currentFeatures, editingFeature, data)
    } else {
      updatedFeaturesList = removeFeature(currentFeatures, editingFeature)
    }
    dispatch({
      action: 'UPDATE_LIST_ITEM_FIELD',
      blockId: blockId,
      fieldName: 'actions',
      itemId: cardId,
      blockData: { features: updatedFeaturesList },
    })

    setDialogOpen(false)
    setEditingFeature(null)
  }

  return (
    <div className='flex-grow'>
      <ul className='space-y-3'>
        {features?.items?.map((feature) => (
          <li
            key={feature.id.toString()}
            className='flex items-center text-sm text-gray-600'
          >
            <svg
              className='mr-2 h-5 w-5 text-primary-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M5 13l4 4L19 7'
              />
            </svg>
            <Localization
              text={feature.item}
              language={language}
            />
            {editMode && dispatch != null && <EditLabel onClick={() => handleEditClick(feature)} />}
          </li>
        ))}
      </ul>
      {editMode && dispatch != null && (
        <AddLabel
          onClick={() => addNewFeature(cardId)}
          label='Add Features'
        />
      )}

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Feature</DialogTitle>
          </DialogHeader>
          {editingFeature && (
            <TitleInput
              onSubmit={handleEditSubmit}
              data={{
                english: editingFeature.item.english ?? '',
                malayalam: editingFeature.item.malayalam || '',
              }}
              showRemove={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
