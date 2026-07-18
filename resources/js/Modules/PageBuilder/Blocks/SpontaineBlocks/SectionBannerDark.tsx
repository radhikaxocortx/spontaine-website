import { Language } from '@/components/ui/ui_interfaces'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { cn } from '@/lib/utils'
import AddLabel from '@/Modules/PageBuilder/Components/AddLabel'
import { BlocKFieldInfo } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import EditLabel from '@/Modules/PageBuilder/Components/EditLabel'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { BlockConfiguration, ItemListField, TextData } from '@/Modules/PageBuilder/page_interfaces'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export interface SectionBannerDarkBlock extends BlockConfiguration {
  id?: number
  title: TextData
  description: ItemListField<TextData>
}

interface SectionBannerDarkProps {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: SectionBannerDarkBlock
  language?: Language
}

export const sectionBannerDarkBlock: SectionBannerDarkBlock = {
  title: {
    english: 'Strategies and Perspectives',
    malayalam: 'Strategies and Perspectives',
  },
  description: {
    lastUUID: 1,
    items: [
      {
        id: 1,
        item: {
          english:
            'Expert perspectives on data, leadership, and the future of data, AI and business intelligence. Read case studies on regaining trust, expert takes on industry shifts, and the thinking behind our semantic revolution.',
          malayalam:
            'Expert perspectives on data, leadership, and the future of data, AI and business intelligence. Read case studies on regaining trust, expert takes on industry shifts, and the thinking behind our semantic revolution.',
        },
      },
    ],
  },
}

export default function SectionBannerDark({
  editMode = false,
  onFieldEdit,
  blockData = sectionBannerDarkBlock,
  language = 'en',
}: SectionBannerDarkProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!editMode) {
      const ctx = gsap.context(() => {
        gsap.set([titleRef.current, descriptionRef.current], {
          opacity: 0,
          y: 40,
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        })

        tl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }).to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.6'
        )
      }, sectionRef)

      return () => ctx.revert()
    }
  }, [editMode])

  const title = blockData.title as TextData

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative flex w-full flex-col items-center justify-center bg-[#1B754C] pb-20 pt-40 text-white',
        blockData.paddingTop || '',
        blockData.paddingBottom,
        blockData.marginTop || '',
        blockData.marginBottom
      )}
      data-banner-section='true'
    >
      {/* Content */}
      <div className='relative z-10 flex w-full flex-col items-center justify-center'>
        <AppLayoutPadding>
          <div className='mx-auto max-w-5xl text-center'>
            {/* Title */}
            <div
              ref={titleRef}
              className='mb-8'
            >
              <h1 className='font-display text-[48px] font-medium leading-[1] text-white sm:text-[64px] lg:text-[80px] xl:text-[96px]'>
                <Localization
                  text={title}
                  language={language}
                />
                {editMode && onFieldEdit && (
                  <EditLabel
                    label='Edit Title'
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
              </h1>
            </div>

            {/* Description */}
            <div
              ref={descriptionRef}
              className='mx-auto max-w-3xl'
            >
              {blockData?.description?.items.map((item) => (
                <p
                  key={item.id.toString()}
                  className='mx-auto max-w-[560px] font-body text-[16px] font-normal leading-[1.8] text-gray-300 sm:text-[20px]'
                >
                  <Localization
                    text={item.item}
                    language={language}
                  />
                  {editMode && onFieldEdit && (
                    <EditLabel
                      label='Edit Description'
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
                </p>
              ))}
              {editMode && onFieldEdit && (
                <AddLabel
                  onClick={() => {
                    onFieldEdit({
                      field: 'description',
                      fieldType: 'textItems',
                      oldValue: null,
                      action: 'INSERT',
                    })
                  }}
                  label='Add Description'
                />
              )}
            </div>
          </div>
        </AppLayoutPadding>
      </div>
    </section>
  )
}
