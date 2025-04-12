import { Language } from '@/Components/ui/ui_interfaces'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
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
    <AppLayoutPadding>
      <div className='overflow-hidden'>
        <div className='flex items-center justify-center'>
          <div className='relative my-12 w-11/12 lg:w-3/5'>
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
                                  viewBox='0 0 34 26'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M7.83297 10.6667C7.4613 10.6667 7.10463 10.7233 6.74963 10.775C6.86463 10.3883 6.98297 9.99501 7.17297 9.64167C7.36297 9.12834 7.65963 8.68334 7.95463 8.23501C8.2013 7.75001 8.6363 7.42167 8.9563 7.00667C9.2913 6.60334 9.74797 6.33501 10.1096 6.00001C10.4646 5.65001 10.9296 5.47501 11.2996 5.22834C11.6863 5.00667 12.023 4.76167 12.383 4.64501L13.2813 4.27501L14.0713 3.94667L13.263 0.716675L12.268 0.956674C11.9496 1.03667 11.5613 1.13001 11.1196 1.24167C10.668 1.32501 10.1863 1.55334 9.64963 1.76167C9.11963 1.99834 8.5063 2.15834 7.9363 2.53834C7.36296 2.90167 6.7013 3.20501 6.11797 3.69167C5.55297 4.19334 4.8713 4.62834 4.36796 5.26667C3.81796 5.86334 3.27463 6.49001 2.85297 7.20334C2.36463 7.88334 2.03296 8.63001 1.68296 9.36834C1.3663 10.1067 1.1113 10.8617 0.902965 11.595C0.507965 13.065 0.331298 14.4617 0.262965 15.6567C0.206298 16.8533 0.239632 17.8483 0.309632 18.5683C0.334632 18.9083 0.381298 19.2383 0.414632 19.4667L0.456298 19.7467L0.499632 19.7367C0.796067 21.1214 1.47847 22.3939 2.4679 23.407C3.45734 24.4201 4.71337 25.1323 6.0907 25.4614C7.46803 25.7904 8.91037 25.7228 10.2509 25.2664C11.5914 24.81 12.7753 23.9833 13.6656 22.8821C14.556 21.781 15.1164 20.4502 15.282 19.0438C15.4476 17.6375 15.2117 16.2129 14.6015 14.935C13.9913 13.6572 13.0319 12.5781 11.8341 11.8228C10.6362 11.0674 9.24906 10.6666 7.83297 10.6667ZM26.1663 10.6667C25.7946 10.6667 25.438 10.7233 25.083 10.775C25.198 10.3883 25.3163 9.99501 25.5063 9.64167C25.6963 9.12834 25.993 8.68334 26.288 8.23501C26.5346 7.75001 26.9696 7.42167 27.2896 7.00667C27.6246 6.60334 28.0813 6.33501 28.443 6.00001C28.798 5.65001 29.263 5.47501 29.633 5.22834C30.0196 5.00667 30.3563 4.76167 30.7163 4.64501L31.6146 4.27501L32.4046 3.94667L31.5963 0.716675L30.6013 0.956674C30.283 1.03667 29.8946 1.13001 29.453 1.24167C29.0013 1.32501 28.5196 1.55334 27.983 1.76167C27.4546 2.00001 26.8396 2.15834 26.2696 2.54001C25.6963 2.90334 25.0346 3.20667 24.4513 3.69334C23.8863 4.19501 23.2046 4.63001 22.7013 5.26667C22.1513 5.86334 21.608 6.49001 21.1863 7.20334C20.698 7.88334 20.3663 8.63001 20.0163 9.36834C19.6996 10.1067 19.4446 10.8617 19.2363 11.595C18.8413 13.065 18.6646 14.4617 18.5963 15.6567C18.5396 16.8533 18.573 17.8483 18.643 18.5683C18.668 18.9083 18.7146 19.2383 18.748 19.4667L18.7896 19.7467L18.833 19.7367C19.1294 21.1214 19.8118 22.3939 20.8012 23.407C21.7907 24.4201 23.0467 25.1323 24.424 25.4614C25.8014 25.7904 27.2437 25.7228 28.5842 25.2664C29.9247 24.81 31.1086 23.9833 31.999 22.8821C32.8893 21.781 33.4497 20.4502 33.6153 19.0438C33.7809 17.6375 33.545 16.2129 32.9349 14.935C32.3247 13.6572 31.3652 12.5781 30.1674 11.8228C28.9696 11.0674 27.5824 10.6666 26.1663 10.6667Z'
                                    fill='#4B5563'
                                  />
                                </svg>
                              </div>
                              <p className='px-8 text-base leading-normal sm:px-20'>
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
                              </p>
                              <div className='flex justify-end'>
                                <svg
                                  width='54'
                                  height='54'
                                  viewBox='0 0 40 40'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M29.1671 23.3333C29.5387 23.3333 29.8954 23.2767 30.2504 23.225C30.1354 23.6117 30.0171 24.005 29.8271 24.3583C29.6371 24.8717 29.3404 25.3167 29.0454 25.765C28.7987 26.25 28.3637 26.5783 28.0437 26.9933C27.7087 27.3967 27.2521 27.665 26.8904 28C26.5354 28.35 26.0704 28.525 25.7004 28.7717C25.3137 28.9933 24.9771 29.2383 24.6171 29.355L23.7187 29.725L22.9287 30.0533L23.7371 33.2833L24.7321 33.0433C25.0504 32.9633 25.4387 32.87 25.8804 32.7583C26.3321 32.675 26.8137 32.4467 27.3504 32.2383C27.8804 32.0017 28.4937 31.8417 29.0637 31.4617C29.6371 31.0983 30.2987 30.795 30.8821 30.3083C31.4471 29.8067 32.1287 29.3717 32.6321 28.7333C33.1821 28.1367 33.7254 27.51 34.1471 26.7967C34.6354 26.1167 34.9671 25.37 35.3171 24.6317C35.6337 23.8933 35.8887 23.1383 36.0971 22.405C36.4921 20.935 36.6687 19.5383 36.7371 18.3433C36.7937 17.1467 36.7604 16.1517 36.6904 15.4317C36.6654 15.0917 36.6187 14.7617 36.5854 14.5333L36.5437 14.2533L36.5004 14.2633C36.204 12.8786 35.5216 11.6061 34.5321 10.593C33.5427 9.57994 32.2867 8.86767 30.9093 8.53862C29.532 8.20956 28.0897 8.27716 26.7491 8.7336C25.4086 9.19004 24.2247 10.0167 23.3344 11.1179C22.444 12.219 21.8837 13.5498 21.718 14.9562C21.5524 16.3625 21.7883 17.7871 22.3985 19.065C23.0087 20.3428 23.9682 21.4219 25.166 22.1772C26.3638 22.9326 27.751 23.3334 29.1671 23.3333ZM10.8337 23.3333C11.2054 23.3333 11.5621 23.2767 11.9171 23.225C11.8021 23.6117 11.6837 24.005 11.4937 24.3583C11.3037 24.8717 11.0071 25.3167 10.7121 25.765C10.4654 26.25 10.0304 26.5783 9.7104 26.9933C9.3754 27.3967 8.91874 27.665 8.55707 28C8.20207 28.35 7.73707 28.525 7.36707 28.7717C6.9804 28.9933 6.64373 29.2383 6.28373 29.355L5.3854 29.725L4.5954 30.0533L5.40373 33.2833L6.39874 33.0433C6.71707 32.9633 7.1054 32.87 7.54707 32.7583C7.99873 32.675 8.4804 32.4467 9.01707 32.2383C9.5454 32 10.1604 31.8417 10.7304 31.46C11.3037 31.0967 11.9654 30.7933 12.5487 30.3067C13.1137 29.805 13.7954 29.37 14.2987 28.7333C14.8487 28.1367 15.3921 27.51 15.8137 26.7967C16.3021 26.1167 16.6337 25.37 16.9837 24.6317C17.3004 23.8933 17.5554 23.1383 17.7637 22.405C18.1587 20.935 18.3354 19.5383 18.4037 18.3433C18.4604 17.1467 18.4271 16.1517 18.3571 15.4317C18.3321 15.0917 18.2854 14.7617 18.2521 14.5333L18.2104 14.2533L18.1671 14.2633C17.8706 12.8786 17.1882 11.6061 16.1988 10.593C15.2094 9.57994 13.9533 8.86767 12.576 8.53862C11.1987 8.20956 9.75632 8.27716 8.41581 8.7336C7.07529 9.19004 5.89139 10.0167 5.00105 11.1179C4.11072 12.219 3.55032 13.5498 3.3847 14.9562C3.21909 16.3625 3.45501 17.7871 4.06518 19.065C4.67535 20.3428 5.63484 21.4219 6.83265 22.1772C8.03046 22.9326 9.41764 23.3334 10.8337 23.3333Z'
                                    fill='#4B5563'
                                  />
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
      </div>
    </AppLayoutPadding>
  )
}
