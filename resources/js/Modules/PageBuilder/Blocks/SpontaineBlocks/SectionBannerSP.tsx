import { Language } from '@/components/ui/ui_interfaces'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { cn } from '@/lib/utils'
import { BlocKFieldInfo } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import EditLabel from '@/Modules/PageBuilder/Components/EditLabel'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import {
  BlockConfiguration,
  BlockImage,
  ItemListField,
  TextData,
} from '@/Modules/PageBuilder/page_interfaces'
import SectionDescription from '@/typography/SectionDescription'
import SectionTitle from '@/typography/SectionTitle'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export interface SectionBannerSPBlock extends BlockConfiguration {
  id?: number
  title: TextData
  description: ItemListField<TextData>
  image?: BlockImage
}

interface SectionBannerSPProps {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: SectionBannerSPBlock
  language?: Language
}

export const sectionBannerSPBlock: SectionBannerSPBlock = {
  title: {
    english: 'Go from Data Chaos to Decision Clarity',
    malayalam: 'Go from Data Chaos to Decision Clarity',
  },
  description: {
    lastUUID: 1,
    items: [
      {
        id: 1,
        item: {
          english:
            'Transform your fragmented data into trustworthy insights with our AI-powered Decision Intelligence platform. Get 80% of the business value from 20% of initiatives.',
          malayalam:
            'Transform your fragmented data into trustworthy insights with our AI-powered Decision Intelligence platform. Get 80% of the business value from 20% of initiatives.',
        },
      },
    ],
  },
  image: {
    url: '/home/talk.png',
    caption: 'Banner background image',
  },
}

export default function SectionBannerSP({
  editMode = false,
  onFieldEdit,
  blockData = sectionBannerSPBlock,
  language = 'en',
}: SectionBannerSPProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!editMode) {
      const ctx = gsap.context(() => {
        gsap.set([titleRef.current, descriptionRef.current], {
          opacity: 0,
          y: 40,
        })

        // Ken Burns effect on background
        gsap.set(backgroundRef.current, {
          scale: 1,
          x: 0,
          y: 0,
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

        // Ken Burns effect - slow zoom and pan
        gsap.to(backgroundRef.current, {
          scale: 1.2,
          x: -20,
          y: -10,
          duration: 20,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        })
      }, sectionRef)

      return () => ctx.revert()
    }
  }, [editMode])

  const backgroundImage = blockData.image?.url || '/placeholder.jpeg'
  const title = blockData.title as TextData
  const description = blockData.description?.items?.[0]?.item as TextData

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative h-[50vh] min-h-[400px] w-full overflow-hidden bg-black text-white',
        blockData.paddingTop && `pt-[${blockData.paddingTop}]`,
        blockData.paddingBottom && `pb-[${blockData.paddingBottom}]`,
        blockData.marginTop && `mt-[${blockData.marginTop}]`,
        blockData.marginBottom && `mb-[${blockData.marginBottom}]`
      )}
    >
      {/* Ken Burns Background */}
      <div
        ref={backgroundRef}
        className='absolute inset-0 h-full w-full'
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Overlay for better text readability */}
      <div className='absolute inset-0 bg-black/40' />

      {/* Content */}
      <div className='relative z-10 flex h-full flex-col justify-end pb-16 lg:pb-16'>
        <AppLayoutPadding>
          <div className='max-w-4xl'>
            {/* Title */}
            <div
              ref={titleRef}
              className='mb-6'
            >
              <SectionTitle
                theme='dark'
                alignment='left'
                style={{
                  background:
                    'linear-gradient(135deg, #c7ec93 0%, #a3d5ff 25%, #7c83e7 50%, #ff9a9e 75%, #fecfef 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: 'clamp(32px, 5vw, 64px)',
                  fontWeight: 'medium',
                  lineHeight: '1.2',
                }}
              >
                <Localization
                  text={title}
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
              </SectionTitle>
            </div>

            {/* Description */}
            {description && (
              <div
                ref={descriptionRef}
                className='max-w-2xl'
              >
                <SectionDescription
                  theme='dark'
                  size='medium'
                  maxWidth='3xl'
                >
                  <Localization
                    text={description}
                    language={language}
                  />
                  {editMode && onFieldEdit && (
                    <EditLabel
                      onClick={() => {
                        onFieldEdit({
                          field: 'description',
                          fieldType: 'textItems',
                          oldValue: description,
                          action: 'UPDATE',
                          itemIndex: blockData.description?.items?.[0]?.id,
                        })
                      }}
                    />
                  )}
                </SectionDescription>
              </div>
            )}

            {/* Edit Image */}
            {editMode && onFieldEdit && (
              <div className='mt-4'>
                <EditLabel
                  onClick={() => {
                    onFieldEdit({
                      action: 'INSERT',
                      field: 'image',
                      fieldType: 'image',
                      oldValue: blockData.image ?? null,
                    })
                  }}
                  label='Edit Background Image'
                />
              </div>
            )}
          </div>
        </AppLayoutPadding>
      </div>
    </section>
  )
}
