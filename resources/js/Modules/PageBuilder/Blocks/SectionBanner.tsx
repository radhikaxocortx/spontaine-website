import { Language } from '@/Components/ui/ui_interfaces'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import HeroHeadline from '@/typography/HeroHeadline'
import HeroTextBlock from '@/typography/HeroTextBlock'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { BlocKFieldInfo } from '../Components/BlockEditor/BlockEditor'
import EditLabel from '../Components/EditLabel'
import InertiaLink from '../Components/InertiaLink'
import Localization from '../Components/Localization'
import {
  BlockConfiguration,
  BlockImage,
  ItemListField,
  LinkData,
  TextData,
} from '../page_interfaces'

export interface BannerBlock extends BlockConfiguration {
  id?: number
  title: TextData
  description: ItemListField<TextData>
  bulletPoint1: TextData
  bulletPoint2: TextData
  image?: BlockImage
  link?: LinkData
  iconColor?: TextData
}

const placeholderParagraph =
  'Whether as a business or an individual. Build trust, access new opportunities, and grow with confidence.'

const placeholderParagraphMal =
  'ന്യായമായ പ്രവൃത്തിസമയം ഇടക്കിടക്കു ശമ്പളത്തോടുകൂടിയ ഒഴിവുദിവസങ്ങൾ, ഒഴിവുസമയം, വിശ്രമം ഇതുകൾക്ക്‌ ഏതൊരാൾക്കും അവകാശമുള്ളതാണ്‌.'

const placeholderTitle = 'Unlock Your Full Potential with Verification'
const placeholderTitleMal = 'സാമുദായികവും സാംസ്കാരികവും സാമ്പത്തികവുമായ'

export const placeholderImage = {
  url: '/placeholder.jpeg',
  caption: 'placeholder image',
}

export const bannerBlock = {
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
  bulletPoint1: {
    english: 'Build Credibility',
    malayalam: '',
  },
  bulletPoint2: {
    english: 'Expand Reach',
    malayalam: '',
  },
  image: placeholderImage,

  link: {
    name: {
      english: 'Find out how you can verify you business',
      malayalam: '',
    },
    link: '/',
    external: false,
  },
}

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: BannerBlock
  language?: Language
}

const SectionBanner = ({
  editMode = false,
  onFieldEdit,
  blockData = bannerBlock,
  language = 'en',
}: Properties) => {
  return (
    <div className='relative w-full py-4 sm:py-6 md:py-8'>
      <AppLayoutPadding>
        <div className='flex flex-col gap-6 md:flex-row md:items-start md:gap-8 lg:gap-12'>
          <div className='flex max-w-xl flex-col gap-4 sm:gap-6'>
            {/* Featured Icon */}
            <div className='relative h-7 w-7 rounded-full bg-primary-100/50 sm:h-8 sm:w-8'>
              <svg
                viewBox='0 0 24 24'
                className='absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-primary-950 sm:h-6 sm:w-6'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>

            {/* Banner title */}
            <HeroHeadline className='text-primary-950'>
              <Localization
                text={blockData.title}
                language={language}
              />
              {editMode && onFieldEdit && (
                <EditLabel
                  onClick={() => {
                    onFieldEdit({
                      field: 'title',
                      fieldType: 'text',
                      oldValue: blockData.title,
                      action: 'UPDATE',
                    })
                  }}
                />
              )}
            </HeroHeadline>

            {/* Banner description */}
            <div className='flex w-full flex-col gap-3 sm:gap-4 md:w-3/4'>
              {blockData?.description?.items.map((item) => (
                <HeroTextBlock
                  className='text-neutral-graige-600'
                  key={item.id.toString()}
                >
                  <Localization
                    text={item.item}
                    language={language}
                  />
                  {editMode && onFieldEdit && (
                    <EditLabel
                      onClick={() => {
                        onFieldEdit({
                          field: 'description',
                          fieldType: 'textItems',
                          oldValue: item.item,
                          action: 'UPDATE',
                          itemIndex: item.id,
                        })
                      }}
                    />
                  )}
                </HeroTextBlock>
              ))}
            </div>

            {/* Bullet Points */}
            <div className='flex flex-col gap-3 sm:gap-4'>
              <div className='flex items-center gap-2'>
                <CheckCircle className='h-4 w-4 text-primary-950 sm:h-5 sm:w-5' />
                <span className='text-sm font-semibold sm:text-base'>
                  <Localization
                    text={blockData.bulletPoint1}
                    language={language}
                  />
                </span>
                {editMode && onFieldEdit && (
                  <EditLabel
                    onClick={() => {
                      onFieldEdit({
                        field: 'bulletPoint1',
                        fieldType: 'text',
                        oldValue: blockData.bulletPoint1,
                        action: 'UPDATE',
                      })
                    }}
                  />
                )}
              </div>
              <div className='flex items-center gap-2'>
                <CheckCircle className='h-4 w-4 text-primary-950 sm:h-5 sm:w-5' />
                <span className='text-sm font-semibold sm:text-base'>
                  <Localization
                    text={blockData.bulletPoint2}
                    language={language}
                  />
                </span>
                {editMode && onFieldEdit && (
                  <EditLabel
                    onClick={() => {
                      onFieldEdit({
                        field: 'bulletPoint2',
                        fieldType: 'text',
                        oldValue: blockData.bulletPoint2,
                        action: 'UPDATE',
                      })
                    }}
                  />
                )}
              </div>
            </div>

            {/* Link */}
            {blockData?.link != null && (
              <InertiaLink
                className='group inline-flex items-center gap-1 text-xs font-semibold text-primary-800 hover:text-primary-500 sm:gap-2 sm:text-sm'
                language={language}
                link={blockData?.link}
              >
                <ArrowRight className='h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4' />
                <span>{blockData.link.name.english}</span>
              </InertiaLink>
            )}
            {editMode && onFieldEdit != null && (
              <div>
                <EditLabel
                  label='Edit Link'
                  onClick={() => {
                    onFieldEdit({
                      action: 'INSERT',
                      field: 'link',
                      fieldType: 'link',
                      oldValue: blockData.link ?? null,
                    })
                  }}
                />
              </div>
            )}
          </div>

          {/* Hero Image */}
          <div className='w-full md:w-[30%]'>
            {blockData?.image && (
              <img
                className='h-auto w-full rounded-2xl object-cover object-center sm:rounded-3xl'
                src={blockData.image.url}
                alt={blockData.image.caption}
              />
            )}
            {editMode && onFieldEdit && (
              <EditLabel
                onClick={() => {
                  onFieldEdit({
                    action: 'INSERT',
                    field: 'image',
                    fieldType: 'image',
                    oldValue: blockData.image ?? null,
                  })
                }}
                label='Edit Image'
              />
            )}
          </div>
        </div>
      </AppLayoutPadding>
    </div>
  )
}

export default SectionBanner
