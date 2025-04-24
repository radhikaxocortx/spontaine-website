import { Button } from '@/components/ui/button'
import { Language } from '@/components/ui/ui_interfaces'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import HeroHeadline from '@/typography/HeroHeadline'
import HeroTextBlock from '@/typography/HeroTextBlock'
import { useEffect, useRef, useState } from 'react'
import AddLabel from '../Components/AddLabel'
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

export interface HeroImageBlock extends BlockConfiguration {
  id?: number
  title: TextData
  description: ItemListField<TextData>
  image?: BlockImage | null
  link?: LinkData | null
  link2?: LinkData | null
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

export const heroImageBlock: HeroImageBlock = {
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
  image: placeholderImage,
}

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: HeroImageBlock
  language?: Language
}

const SectionHero = ({
  editMode = false,
  onFieldEdit,
  blockData = heroImageBlock,
  language = 'en',
}: Properties) => {
  const [isVisible, setIsVisible] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imageRef.current) {
      observer.observe(imageRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`flex w-full flex-col items-center py-12 ${blockData?.marginTop} ${blockData?.marginBottom} ${blockData?.paddingTop} ${blockData?.paddingBottom}`}
    >
      <AppLayoutPadding>
        <div className='flex w-full flex-col items-center justify-center gap-6'>
          <div className='flex flex-col items-start justify-between gap-8 md:flex-row md:gap-12 2xl:items-center'>
            <div className='flex flex-col gap-6 text-left 2xl:gap-10'>
              {/* Banner title */}
              <HeroHeadline className='w-full text-primary-950 md:w-3/4 2xl:w-2/3'>
                <Localization
                  text={blockData.title}
                  language={language}
                />
                {editMode && onFieldEdit != null && (
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
              <div className='flex w-full flex-col gap-4 md:w-3/4 2xl:w-2/3'>
                {blockData?.description?.items.map((item) => (
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
                {editMode && onFieldEdit != null && (
                  <AddLabel
                    onClick={() => {
                      onFieldEdit({
                        field: 'description',
                        fieldType: 'textItems',
                        oldValue: null,
                        action: 'INSERT',
                      })
                    }}
                    label='Add Subtitle Line'
                  />
                )}
              </div>

              {/* Call to Action */}
              <div className='flex items-center gap-6'>
                {blockData.link && (
                  <InertiaLink link={blockData.link}>
                    <Button
                      size='lg'
                      className='min-w-[160px] justify-center'
                    >
                      <Localization
                        text={blockData.link.name}
                        language={language}
                      />
                    </Button>
                  </InertiaLink>
                )}

                {blockData.link2 && (
                  <InertiaLink link={blockData.link2}>
                    <Button
                      variant='outline'
                      size='lg'
                      className='min-w-[160px] justify-center'
                    >
                      <Localization
                        text={blockData.link2.name}
                        language={language}
                      />
                    </Button>
                  </InertiaLink>
                )}

                {editMode && onFieldEdit != null && (
                  <div className='flex gap-4'>
                    <EditLabel
                      label='Edit Primary Button'
                      onClick={() => {
                        onFieldEdit({
                          field: 'link',
                          fieldType: 'link',
                          oldValue: blockData.link,
                          action: 'UPDATE',
                        })
                      }}
                    />
                    <EditLabel
                      label='Edit Secondary Button'
                      onClick={() => {
                        onFieldEdit({
                          field: 'link2',
                          fieldType: 'link',
                          oldValue: blockData.link2,
                          action: 'UPDATE',
                        })
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Hero Image */}
            <div
              ref={imageRef}
              className='flex w-full flex-col overflow-hidden 2xl:w-1/2'
            >
              {blockData?.image && (
                <div
                  className={`relative w-full overflow-hidden rounded-3xl ${isVisible ? 'animate-reveal' : ''}`}
                >
                  <img
                    className='w-full object-cover object-center'
                    src={blockData.image.url}
                    alt={blockData.image.caption}
                  />
                </div>
              )}
              {editMode && onFieldEdit != null && (
                <EditLabel
                  onClick={() => {
                    onFieldEdit({
                      action: 'INSERT',
                      field: 'image',
                      fieldType: 'image',
                      oldValue: blockData.image,
                    })
                  }}
                  label='Edit Image'
                />
              )}
            </div>
          </div>
        </div>
      </AppLayoutPadding>
    </div>
  )
}

export default SectionHero
