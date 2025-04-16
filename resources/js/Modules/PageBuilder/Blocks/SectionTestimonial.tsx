import { Language } from '@/Components/ui/ui_interfaces'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import SubHeading from '@/typography/SubHeading'
import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { Dispatch, useCallback } from 'react'
import AddLabel from '../Components/AddLabel'
import { BlocKFieldInfo } from '../Components/BlockEditor/BlockEditor'
import EditLabel from '../Components/EditLabel'
import Localization from '../Components/Localization'
import { PageBuilderAction } from '../hooks/pageBuilderService'
import {
  Block,
  BlockConfiguration,
  BlockImage,
  ItemListField,
  loremIpsum,
  placeholderImage,
  placeholderTitle,
  TextData,
} from '../page_interfaces'
export interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: TestimonialBlock
  language?: Language
  dispatch?: Dispatch<PageBuilderAction>
}
export interface TestimonialCard {
  id?: number
  image: BlockImage
  companyLogo: BlockImage
  title: TextData
  role: TextData
  date: TextData
  description: TextData
}
export interface TestimonialBlock extends Block, BlockConfiguration {
  title: TextData
  description: TextData
  actions: ItemListField<TestimonialCard>
}
export const defaultTestimonialBlock = {
  description: { english: placeholderTitle, malayalam: '' },
  title: { english: loremIpsum, malayalam: '' },
  actions: {
    lastUUID: 0,
    items: [],
  },
}

const defaultTestimonialCard: TestimonialCard = {
  image: placeholderImage,
  companyLogo: placeholderImage,
  title: { english: loremIpsum, malayalam: '' },
  role: { english: loremIpsum, malayalam: '' },
  date: { english: '', malayalam: '' },
  description: { english: placeholderTitle, malayalam: '' },
}

export default function SectionTestimonial({
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
        fieldValue: defaultTestimonialCard,
      })
    }
  }, [dispatch, blockData])
  return (
    <div
      className={`flex w-full flex-col items-center ${blockData?.marginTop} ${blockData?.marginBottom} ${blockData?.paddingTop} ${blockData?.paddingBottom}`}
    >
      <AppLayoutPadding>
        <div className='flex items-center justify-center'>
          <div className='relative my-12 w-full lg:w-3/5 xl:w-full'>
            <CarouselProvider
              naturalSlideWidth={0}
              naturalSlideHeight={125}
              totalSlides={blockData?.actions?.items.length ?? 0}
              infinite={true}
              isIntrinsicHeight={true}
              isPlaying={true}
              interval={5000}
            >
              <Slider>
                {blockData?.actions?.items.map((item, index) => {
                  return (
                    <Slide
                      key={item.id.toString()}
                      index={index}
                    >
                      <div className='flex items-center justify-center'>
                        <div className='flex items-center justify-center'>
                          <div className='flex w-full flex-col items-center rounded-md pb-6'>
                            {/* company logo */}
                            <div className='w-20'>
                              <img
                                src={item.item.companyLogo.url ?? ''}
                                alt={''}
                                className='aspect-square w-full object-contain object-center'
                                loading='lazy'
                              />
                              <div>
                                {editMode && onFieldEdit != null && (
                                  <EditLabel
                                    onClick={() =>
                                      onFieldEdit({
                                        field: 'actions',
                                        oldValue: null,
                                        itemField: 'companyLogo',
                                        itemIndex: item.id,
                                        fieldType: 'image',
                                        action: 'UPDATE',
                                      })
                                    }
                                  />
                                )}
                              </div>
                            </div>

                            <div className=''>
                              <div className='flex justify-start'>
                                <svg
                                  width='44'
                                  height='44'
                                  viewBox='0 0 24 24'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <g>
                                    <path
                                      fill='none'
                                      d='M0 0h24v24H0z'
                                    />
                                    <path d='M9.583 17.321C8.553 16.227 8 15 8 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z' />
                                  </g>
                                </svg>
                              </div>
                              <SubHeading className='px-8'>
                                <Localization
                                  language={language}
                                  text={item.item.description}
                                />
                                {editMode && onFieldEdit != null && (
                                  <EditLabel
                                    label='Edit description'
                                    onClick={() =>
                                      onFieldEdit({
                                        field: 'actions',
                                        oldValue: item.item.description,
                                        itemField: 'description',
                                        itemIndex: item.id,
                                        fieldType: 'textarea',
                                        action: 'UPDATE',
                                      })
                                    }
                                  />
                                )}
                              </SubHeading>
                              <div className='flex justify-end'>
                                <svg
                                  width='44'
                                  height='44'
                                  viewBox='0 0 24 24'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <g>
                                    <path
                                      fill='none'
                                      d='M0 0h24v24H0z'
                                    />
                                    <path d='M14.417 6.679C15.447 7.773 16 9 16 10.989c0 3.5-2.457 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621-.537.278-1.24.375-1.929.311C9.591 12.322 8.17 10.841 8.17 9a3.5 3.5 0 0 1 3.5-3.5c1.073 0 2.099.49 2.748 1.179z' />
                                  </g>
                                </svg>
                              </div>
                              <div className='flex flex-col items-center justify-center'>
                                <div className='w-28'>
                                  <img
                                    src={item.item.image.url ?? ''}
                                    alt={''}
                                    className='aspect-square w-full rounded-full object-cover object-center'
                                    loading='lazy'
                                  />
                                  <div>
                                    {editMode && onFieldEdit != null && (
                                      <EditLabel
                                        onClick={() =>
                                          onFieldEdit({
                                            field: 'actions',
                                            oldValue: null,
                                            itemField: 'image',
                                            itemIndex: item.id,
                                            fieldType: 'image',
                                            action: 'UPDATE',
                                          })
                                        }
                                      />
                                    )}
                                  </div>
                                </div>
                                <span className='px-8 italic leading-tight text-gray-500 sm:px-20'>
                                  {editMode && item.item.date === null && <span>DD/MM/YYYY</span>}
                                  <Localization
                                    language={language}
                                    text={item.item.date}
                                  />
                                  {editMode && onFieldEdit != null && (
                                    <EditLabel
                                      label='Edit date'
                                      onClick={() =>
                                        onFieldEdit({
                                          field: 'actions',
                                          oldValue: item.item.date,
                                          itemField: 'date',
                                          itemIndex: item.id,
                                          fieldType: 'text',
                                          action: 'UPDATE',
                                        })
                                      }
                                    />
                                  )}
                                </span>
                                <h2 className='px-8 pt-2 text-xl font-semibold leading-tight sm:px-20'>
                                  <Localization
                                    language={language}
                                    text={item.item.title}
                                  />
                                  {editMode && onFieldEdit != null && (
                                    <EditLabel
                                      label='Edit name'
                                      onClick={() =>
                                        onFieldEdit({
                                          field: 'actions',
                                          oldValue: item.item.title,
                                          itemField: 'title',
                                          itemIndex: item.id,
                                          fieldType: 'text',
                                          action: 'UPDATE',
                                        })
                                      }
                                    />
                                  )}
                                </h2>
                                <p className='px-8 pt-2 text-xs leading-none sm:px-20'>
                                  <Localization
                                    language={language}
                                    text={item.item.role}
                                  />
                                  {editMode && onFieldEdit != null && (
                                    <EditLabel
                                      label='Edit role'
                                      onClick={() =>
                                        onFieldEdit({
                                          field: 'actions',
                                          oldValue: item.item.role,
                                          itemField: 'role',
                                          itemIndex: item.id,
                                          fieldType: 'text',
                                          action: 'UPDATE',
                                        })
                                      }
                                    />
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {editMode && dispatch != null && (
                        <EditLabel
                          label='Remove Slide'
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
                    </Slide>
                  )
                })}
              </Slider>
              {editMode && onFieldEdit != null && (
                <div>
                  <AddLabel
                    label='ADD SLIDE'
                    onClick={addNewAction}
                  />
                </div>
              )}
              <div className='px-8 pb-6 sm:px-20'>
                <ButtonBack>
                  <div className='absolute right-14 top-0 cursor-pointer'>
                    <svg
                      width={8}
                      height={14}
                      viewBox='0 0 8 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M7 1L1 7L7 13'
                        stroke='black'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                </ButtonBack>
                <ButtonNext>
                  <div className='absolute right-5 top-0 ml-5 cursor-pointer'>
                    <svg
                      width={8}
                      height={14}
                      viewBox='0 0 8 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M1 1L7 7L1 13'
                        stroke='black'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                </ButtonNext>
              </div>
            </CarouselProvider>
          </div>
        </div>
      </AppLayoutPadding>
    </div>
  )
}
