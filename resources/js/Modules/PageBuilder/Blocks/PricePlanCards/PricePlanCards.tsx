import { Language } from '@/components/ui/ui_interfaces'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import AddLabel from '@/Modules/PageBuilder/Components/AddLabel'
import { BlocKFieldInfo } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import EditLabel from '@/Modules/PageBuilder/Components/EditLabel'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { PageBuilderAction } from '@/Modules/PageBuilder/hooks/pageBuilderService'
import { ItemListField, TextData } from '@/Modules/PageBuilder/page_interfaces'
import HeroHeadline from '@/typography/HeroHeadline'
import HeroTextBlock from '@/typography/HeroTextBlock'
import { Dispatch, useCallback, useEffect } from 'react'
import PricePlanCard from './PricePlanCard'
import { PricePlanBlock, defaultPricePlanCard } from './PricePlanCardTypes'

export interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: PricePlanBlock
  language?: Language
  dispatch?: Dispatch<PageBuilderAction>
}

export default function PricePlanCards({
  editMode,
  onFieldEdit,
  blockData,
  language = 'en',
  dispatch,
}: Readonly<Properties>) {
  const addNewAction = useCallback(() => {
    if (dispatch != null) {
      dispatch({
        action: 'INSERT_INTO_LIST',
        blockId: blockData?.id,
        fieldName: 'actions',
        fieldValue: defaultPricePlanCard,
      })
    }
  }, [dispatch, blockData])

  const addNewFeature = useCallback(
    (id: number) => {
      if (dispatch == null || !blockData) {
        return
      }
      const card = blockData.actions.items.find((item) => item.id === id)
      if (!card) {
        return
      }
      const currentFeatures = card.item.features
      const newItemId = currentFeatures.lastUUID + 1
      const newFeaturesList: ItemListField<TextData> = {
        lastUUID: newItemId,
        items: [
          ...currentFeatures.items,
          { id: newItemId, item: { english: 'New Feature Text', malayalam: '' } },
        ],
      }
      dispatch({
        action: 'UPDATE_LIST_ITEM_FIELD',
        blockId: blockData.id,
        fieldName: 'actions',
        itemId: id,
        blockData: { features: newFeaturesList },
      })
    },
    [dispatch, blockData]
  )

  useEffect(() => {
    console.log(blockData)
  }, [blockData])

  return (
    <div
      className={`${blockData?.marginTop} ${blockData?.marginBottom} ${blockData?.paddingTop} ${blockData?.paddingBottom} pb-4`}
    >
      <AppLayoutPadding>
        <div className='overflow-y-hidden rounded-2xl'>
          <div className='flex flex-col py-12'>
            {/* Header Section */}
            <div className='mb-12 flex flex-col items-start space-y-4'>
              <HeroHeadline className='text-primary-950'>
                <Localization
                  text={blockData?.title}
                  language={language}
                />
                {editMode && onFieldEdit != null && (
                  <EditLabel
                    onClick={() =>
                      onFieldEdit({
                        action: 'INSERT',
                        field: 'title',
                        fieldType: 'text',
                        oldValue: blockData?.title,
                      })
                    }
                  />
                )}
              </HeroHeadline>
              <HeroTextBlock className='text-neutral-graige-600'>
                <Localization
                  text={blockData?.description}
                  language={language}
                />
                {editMode && onFieldEdit != null && (
                  <EditLabel
                    onClick={() =>
                      onFieldEdit({
                        action: 'UPDATE',
                        field: 'description',
                        fieldType: 'textarea',
                        oldValue: blockData?.description,
                      })
                    }
                  />
                )}
              </HeroTextBlock>
            </div>

            {/* Pricing Cards Grid */}
            <div className='mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {blockData?.actions.items?.map((item) => (
                <PricePlanCard
                  key={item.id.toString()}
                  item={item}
                  editMode={editMode}
                  onFieldEdit={onFieldEdit}
                  language={language}
                  dispatch={dispatch}
                  blockId={blockData?.id}
                  addNewFeature={addNewFeature}
                />
              ))}
            </div>

            {/* Add New Plan Button */}
            {editMode && onFieldEdit != null && (
              <div className='mt-8 flex justify-center'>
                <AddLabel
                  label='ADD CARD'
                  onClick={addNewAction}
                />
              </div>
            )}
          </div>
        </div>
      </AppLayoutPadding>
    </div>
  )
}
