import { Button } from '@/components/ui/button'
import { Language } from '@/components/ui/ui_interfaces'
import { BlocKFieldInfo } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import EditLabel from '@/Modules/PageBuilder/Components/EditLabel'
import InertiaLink from '@/Modules/PageBuilder/Components/InertiaLink'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { PageBuilderAction } from '@/Modules/PageBuilder/hooks/pageBuilderService'
import { Crown } from 'lucide-react'
import { Dispatch } from 'react'
import PricePlanCardFeatures from './PricePlanCardFeatures'
import { PricePlanCard as PricePlanCardType } from './PricePlanCardTypes'

interface PricePlanCardProps {
  readonly item: { id: number; item: PricePlanCardType }
  readonly editMode?: boolean
  readonly onFieldEdit?: (field: BlocKFieldInfo) => void
  readonly language?: Language
  readonly dispatch?: Dispatch<PageBuilderAction>
  readonly blockId?: number
  readonly addNewFeature: (id: number) => void
}

export default function PricePlanCard({
  item,
  editMode,
  onFieldEdit,
  language = 'en',
  dispatch,
  blockId,
  addNewFeature,
}: Readonly<PricePlanCardProps>) {
  const handleRemoveCard = () => {
    if (dispatch && blockId) {
      dispatch({
        action: 'REMOVE_LIST_ITEM',
        blockId: blockId,
        fieldName: 'actions',
        itemId: item.id,
      })
    }
  }

  return (
    <div
      key={item.id.toString()}
      className={`relative flex w-full flex-col items-center justify-center gap-4 rounded-xl border bg-white p-8 shadow-sm transition-all duration-300 hover:bg-primary-50 hover:shadow-lg ${
        item.item.isPopular ? 'border-primary-500 ring-1 ring-primary-500' : 'border-gray-200'
      }`}
    >
      {/* Popular Badge */}
      {item.item.isPopular && (
        <div className='absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-primary-500 px-3 py-1 text-xs font-medium text-white'>
          <Crown className='h-3 w-3' />
          Popular
        </div>
      )}

      {/* Plan Name */}
      <div className=''>
        <p className='text-xl font-bold text-gray-900'>
          <Localization
            text={item.item.name}
            language={language}
          />
          {editMode && onFieldEdit != null && (
            <EditLabel
              label='Edit Price Plan name'
              onClick={() =>
                onFieldEdit({
                  field: 'actions',
                  oldValue: item.item.name,
                  itemField: 'name',
                  itemIndex: item.id,
                  fieldType: 'text',
                  action: 'UPDATE',
                })
              }
            />
          )}
        </p>
      </div>

      {/* Price and Duration */}
      <div className=''>
        <p className='text-3xl font-bold text-gray-900'>
          <Localization
            language={language}
            text={item.item.price}
          />
          <span className='text-base font-normal text-gray-500'>
            <Localization
              language={language}
              text={item.item.duration}
            />
          </span>
        </p>
        {editMode && onFieldEdit != null && (
          <div className='mt-2 flex gap-2'>
            <EditLabel
              label='Edit Price'
              onClick={() =>
                onFieldEdit({
                  field: 'actions',
                  oldValue: item.item.price,
                  itemField: 'price',
                  itemIndex: item.id,
                  fieldType: 'text',
                  action: 'UPDATE',
                })
              }
            />
            <EditLabel
              label='Edit Duration'
              onClick={() =>
                onFieldEdit({
                  field: 'actions',
                  oldValue: item.item.duration,
                  itemField: 'duration',
                  itemIndex: item.id,
                  fieldType: 'text',
                  action: 'UPDATE',
                })
              }
            />
          </div>
        )}
      </div>

      {/* Billing Info */}
      <div className=''>
        <p className='text-sm text-gray-500'>
          <Localization
            language={language}
            text={item.item.billing}
          />
        </p>
        {editMode && onFieldEdit != null && (
          <EditLabel
            label='Edit billing'
            onClick={() =>
              onFieldEdit({
                field: 'actions',
                oldValue: item.item.billing,
                itemField: 'billing',
                itemIndex: item.id,
                fieldType: 'text',
                action: 'UPDATE',
              })
            }
          />
        )}
      </div>

      {/* Features List */}
      <PricePlanCardFeatures
        features={item.item.features}
        language={language}
        editMode={editMode}
        dispatch={dispatch}
        blockId={blockId}
        cardId={item.id}
        addNewFeature={addNewFeature}
      />

      {/* CTA Button */}
      <div className='mt-auto w-full'>
        <InertiaLink link={item.item.link}>
          <Button
            size='lg'
            className='w-full justify-center'
            variant='outline'
          >
            <Localization
              text={item.item.link.name}
              language={language}
            />
          </Button>
        </InertiaLink>
        {editMode && onFieldEdit != null && (
          <div className='mt-2 flex justify-center gap-2'>
            <EditLabel
              label='Edit Button'
              onClick={() => {
                onFieldEdit({
                  field: 'actions',
                  oldValue: item.item.link,
                  itemField: 'link',
                  itemIndex: item.id,
                  fieldType: 'link',
                  action: 'UPDATE',
                })
              }}
            />
            <EditLabel
              label='Toggle Popular'
              onClick={() =>
                onFieldEdit({
                  field: 'actions',
                  oldValue: {
                    english: item.item.isPopular ? 'true' : 'false',
                    malayalam: item.item.isPopular ? 'true' : 'false',
                  },
                  itemField: 'isPopular',
                  itemIndex: item.id,
                  fieldType: 'text',
                  action: 'UPDATE',
                })
              }
            />
          </div>
        )}
      </div>
      {editMode && dispatch != null && (
        <EditLabel
          label='Remove Card'
          onClick={handleRemoveCard}
        />
      )}
    </div>
  )
}
