import { Button } from '@/components/ui/button'
import { Language } from '@/components/ui/ui_interfaces'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import HeroHeadline from '@/typography/HeroHeadline'
import HeroTextBlock from '@/typography/HeroTextBlock'
import { Crown } from 'lucide-react'
import { Dispatch, useCallback } from 'react'
import AddLabel from '../Components/AddLabel'
import { BlocKFieldInfo } from '../Components/BlockEditor/BlockEditor'
import EditLabel from '../Components/EditLabel'
import InertiaLink from '../Components/InertiaLink'
import Localization from '../Components/Localization'
import { PageBuilderAction } from '../hooks/pageBuilderService'
import {
  Block,
  BlockConfiguration,
  ItemListField,
  LinkData,
  loremIpsum,
  placeholderTitle,
  TextData,
} from '../page_interfaces'

export interface PricePlanCard {
  id?: number
  name: TextData
  price: TextData
  duration: TextData
  billing: TextData
  link: LinkData
  features: ItemListField<TextData>
  isPopular: boolean
}

export interface PricePlanBlock extends Block, BlockConfiguration {
  title: TextData
  description: TextData
  actions: ItemListField<PricePlanCard>
}

export const defaultPricePlanBlock = {
  description: { english: placeholderTitle, malayalam: '' },
  title: { english: loremIpsum, malayalam: '' },
  actions: {
    lastUUID: 0,
    items: [],
  },
}

const defaultPricePlanCard: PricePlanCard = {
  name: { english: 'Basic Plan', malayalam: '' },
  price: { english: 'GH₵10', malayalam: '' },
  duration: { english: 'month', malayalam: '' },
  billing: { english: 'Billed Annually', malayalam: '' },
  link: {
    external: false,
    link: '',
    name: { english: 'Get Started', malayalam: '' },
  },
  features: {
    lastUUID: 1,
    items: [
      {
        id: 1,
        item: {
          english: 'Access to all basic features',
          malayalam: '',
        },
      },
    ],
  },
  isPopular: false,
}

export interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: PricePlanBlock
  language?: Language
  dispatch?: Dispatch<PageBuilderAction>
}

export default function PricePlan({
  editMode,
  onFieldEdit,
  blockData,
  language = 'en',
  dispatch,
}: Properties) {
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
                <div
                  key={item.id.toString()}
                  className={`relative flex w-full flex-col items-center justify-center gap-4 rounded-xl border bg-white p-8 shadow-sm transition-all duration-300 hover:bg-primary-50 hover:shadow-lg ${
                    item.item.isPopular
                      ? 'border-primary-500 ring-1 ring-primary-500'
                      : 'border-gray-200'
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
                        {' '}
                        /{' '}
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
                  <div className='flex-grow'>
                    <ul className='space-y-3'>
                      {item.item.features?.items?.map((feature) => (
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
                          {editMode && onFieldEdit != null && (
                            <EditLabel
                              onClick={() => {
                                onFieldEdit({
                                  field: 'actions',
                                  oldValue: feature.item,
                                  itemField: 'features',
                                  itemIndex: item.id,
                                  fieldType: 'textItems',
                                  action: 'UPDATE',
                                })
                              }}
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                    {editMode && onFieldEdit != null && (
                      <AddLabel
                        onClick={() => {
                          onFieldEdit({
                            field: 'actions',
                            oldValue: null,
                            itemField: 'features',
                            itemIndex: item.id,
                            fieldType: 'textItems',
                            action: 'INSERT',
                          })
                        }}
                        label='Add Features'
                      />
                    )}
                  </div>

                  {/* CTA Button */}
                  <div className='mt-auto w-full'>
                    <InertiaLink link={item.item.link}>
                      <Button
                        size='lg'
                        className={`w-full justify-center`}
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
                      onClick={() => {
                        dispatch({
                          action: 'REMOVE_LIST_ITEM',
                          blockId: blockData?.id,
                          fieldName: 'actions',
                          itemId: item.id,
                        })
                      }}
                    />
                  )}
                </div>
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
