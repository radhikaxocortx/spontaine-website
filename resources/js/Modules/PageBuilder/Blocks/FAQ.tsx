import {
  Block,
  BlockConfiguration,
  ItemListField,
  LinkData,
  TextData,
} from '@/Modules/PageBuilder/page_interfaces'

import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { BlocKFieldInfo } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import EditLabel from '@/Modules/PageBuilder/Components/EditLabel'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { Language } from '@/Modules/PageBuilder/Pages/PageBuilder'
import useBlockStyling from '@/Modules/PageBuilder/hooks/useBlockStyling'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import HeroHeadline from '@/typography/HeroHeadline'
import HeroTextBlock from '@/typography/HeroTextBlock'
import LargeText from '@/typography/LargeText'
import { ArrowRightIcon } from 'lucide-react'
import { Dispatch, useCallback } from 'react'
import AddLabel from '../Components/AddLabel'
import InertiaLink from '../Components/InertiaLink'
import { PageBuilderAction } from '../hooks/pageBuilderService'

export interface FAQItemData {
  title: TextData
  description: TextData
  link?: LinkData
}

export interface FAQBlockInfo extends BlockConfiguration, Block {
  title: TextData
  description: ItemListField<TextData>
  link?: LinkData
  faq: ItemListField<FAQItemData>
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

export const faqBlock = {
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
  link: {
    name: {
      english: 'Contact Us',
      malayalam: '',
    },
    link: '/',
    external: false,
  },
  faq: {
    lastUUID: 0,
    items: [],
  },
}

const defaultFaqItem = {
  title: {
    english: placeholderTitle,
    malayalam: placeholderTitleMal,
  },
  description: {
    english: placeholderParagraph,
    malayalam: placeholderParagraph,
  },
}

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: FAQBlockInfo
  language?: Language
  dispatch?: Dispatch<PageBuilderAction>
}

const FAQ = ({
  editMode = false,
  onFieldEdit,
  blockData,
  language = 'en',
  dispatch,
}: Properties) => {
  const addNewAction = useCallback(() => {
    if (dispatch != null) {
      dispatch({
        action: 'INSERT_INTO_LIST',
        blockId: blockData?.id,
        fieldName: 'faq',
        fieldValue: defaultFaqItem,
      })
    }
  }, [dispatch, blockData])

  const blockStyling = useBlockStyling(blockData ?? {})

  return (
    <div
      className={`bg-gradient-to-r from-secondary-100 to-white py-6 ${editMode ? '' : blockStyling}`}
    >
      <AppLayoutPadding>
        <div className='gris-cols-1 grid gap-8 md:grid-cols-2'>
          <div className={`flex w-full flex-col gap-2`}>
            <div className='w-full justify-start'>
              <HeroHeadline className='text-black-tertiary-950'>
                <Localization
                  text={blockData?.title}
                  language={language}
                />
                {editMode && onFieldEdit != null && (
                  <EditLabel
                    onClick={() =>
                      onFieldEdit({
                        field: 'title',
                        fieldType: 'text',
                        action: 'UPDATE',
                        oldValue: blockData?.title,
                      })
                    }
                  />
                )}
              </HeroHeadline>
            </div>
            <div className='flex w-full flex-col'>
              {blockData?.description?.items.map((item) => {
                return (
                  <HeroTextBlock
                    className='text-neutral-graige-600'
                    key={item.id.toString()}
                  >
                    <Localization
                      text={item.item}
                      language={language}
                    />
                    {editMode && onFieldEdit != null && (
                      <EditLabel
                        label='Edit Description'
                        onClick={() =>
                          onFieldEdit({
                            field: 'description',
                            oldValue: item.item,
                            fieldType: 'textItems',
                            action: 'UPDATE',
                            itemIndex: item.id,
                          })
                        }
                      />
                    )}
                  </HeroTextBlock>
                )
              })}
            </div>
            <div>
              {blockData?.link != null && (
                <InertiaLink
                  link={blockData.link}
                  language={language}
                  className='flex w-full shrink-0 items-start justify-start space-x-2 py-1 text-base md:w-auto md:py-4 lg:mx-2 lg:mt-2'
                >
                  <Button size='md'>
                    <Localization
                      language={language}
                      text={blockData.link.name}
                    />
                    <ArrowRightIcon className='ml-2 h-4 w-4' />
                  </Button>
                </InertiaLink>
              )}
            </div>
            {editMode && onFieldEdit != null && (
              <EditLabel
                label='Edit Button'
                onClick={() =>
                  onFieldEdit({
                    field: 'link',
                    fieldType: 'link',
                    oldValue: blockData?.link,
                    action: 'UPDATE',
                  })
                }
              />
            )}
          </div>
          <div>
            <Accordion
              type='single'
              collapsible
            >
              {blockData?.faq.items.map((item) => {
                return (
                  <AccordionItem
                    value={item.id.toString()}
                    key={item.id.toString()}
                  >
                    <AccordionTrigger>
                      <LargeText className='font-semibold text-black-tertiary-950'>
                        <Localization
                          text={item.item.title}
                          language={language}
                        />
                      </LargeText>
                      <div>
                        {editMode && onFieldEdit != null && (
                          <EditLabel
                            onClick={() =>
                              onFieldEdit({
                                field: 'faq',
                                oldValue: item.item.title,
                                itemField: 'title',
                                itemIndex: item.id,
                                fieldType: 'text',
                                action: 'UPDATE',
                              })
                            }
                          />
                        )}
                        &nbsp;
                        {editMode && dispatch != null && (
                          <div className='flex gap-2'>
                            <EditLabel
                              label='Move Up'
                              onClick={() => {
                                dispatch({
                                  action: 'MOVE_LIST_ITEM_UP',
                                  blockId: blockData?.id,
                                  fieldName: 'faq',
                                  itemId: item.id,
                                })
                              }}
                            />
                            <EditLabel
                              label='Move Down'
                              onClick={() => {
                                dispatch({
                                  action: 'MOVE_LIST_ITEM_DOWN',
                                  blockId: blockData?.id,
                                  fieldName: 'faq',
                                  itemId: item.id,
                                })
                              }}
                            />
                          </div>
                        )}
                        {editMode && dispatch != null && (
                          <EditLabel
                            label='Remove Item'
                            onClick={() => {
                              dispatch({
                                action: 'REMOVE_LIST_ITEM',
                                blockId: blockData?.id,
                                fieldName: 'faq',
                                itemId: item.id,
                              })
                            }}
                          />
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <HeroTextBlock className='text-neutral-graige-600'>
                        <Localization
                          text={item.item.description}
                          language={language}
                        />
                      </HeroTextBlock>
                      {editMode && onFieldEdit != null && (
                        <EditLabel
                          onClick={() =>
                            onFieldEdit({
                              field: 'faq',
                              oldValue: item.item.description,
                              itemField: 'description',
                              itemIndex: item.id,
                              fieldType: 'textarea',
                              action: 'UPDATE',
                            })
                          }
                        />
                      )}
                      {item.item.link != null && (
                        <InertiaLink
                          link={item.item.link}
                          language={language}
                          className='flex w-full shrink-0 items-start justify-start space-x-2 py-1 text-base md:w-auto md:py-4 lg:mx-2 lg:mt-2'
                        >
                          <Button size='md'>
                            <Localization
                              language={language}
                              text={item.item.link.name}
                            />
                          </Button>
                        </InertiaLink>
                      )}
                      {editMode && onFieldEdit != null && (
                        <EditLabel
                          label='Edit Button'
                          onClick={() =>
                            onFieldEdit({
                              field: 'link',
                              fieldType: 'link',
                              oldValue: item.item.link,
                              action: 'UPDATE',
                            })
                          }
                        />
                      )}
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
              {editMode && onFieldEdit != null && (
                <div className='flex w-full justify-center py-4'>
                  <AddLabel
                    label='ADD ITEM'
                    onClick={addNewAction}
                  />
                </div>
              )}
            </Accordion>
          </div>
        </div>
      </AppLayoutPadding>
    </div>
  )
}
export default FAQ
