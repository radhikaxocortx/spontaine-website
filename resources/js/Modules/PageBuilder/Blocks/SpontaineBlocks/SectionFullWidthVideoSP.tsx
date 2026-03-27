import { BlockConfiguration, BlockImage, TextData } from '@/Modules/PageBuilder/page_interfaces'

import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import {
  BlocKFieldInfo,
  BlockFieldTypes,
  BlockFieldValues,
} from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import EditLabel from '@/Modules/PageBuilder/Components/EditLabel'
import { Language } from '@/Modules/PageBuilder/Pages/PageBuilder'
import useBlockStyling from '@/Modules/PageBuilder/hooks/useBlockStyling'
import { useState } from 'react'

export interface SectionFullWidthVideoSPBlock extends BlockConfiguration {
  poster?: BlockImage | null
  videoLink?: TextData | null
}

const placeholderPoster = {
  url: '/imge/videoposter.png',
  caption: 'placeholder poster',
}

export const sectionFullWidthVideoSPBlock = {
  poster: placeholderPoster,
  videoLink: {
    english: 'https://www.youtube.com/embed/GfbifwbtGVU?autoplay=1',
    malayalam: 'https://www.youtube.com/embed/GfbifwbtGVU?autoplay=1',
  },
}

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: SectionFullWidthVideoSPBlock
  language?: Language
}

const SectionFullWidthVideoSP = ({
  editMode = false,
  onFieldEdit,
  blockData = sectionFullWidthVideoSPBlock,
  language = 'en',
}: Properties) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const blockStyling = useBlockStyling(blockData)

  const onEdit = (
    field: string,
    fieldType: BlockFieldTypes,
    oldValue: BlockFieldValues,
    action: 'UPDATE' | 'REMOVE' | 'INSERT'
  ) => {
    if (onFieldEdit == null) {
      return
    }

    onFieldEdit({
      field,
      fieldType,
      oldValue,
      action,
    })
  }

  const videoUrl =
    language === 'mal' ? blockData.videoLink?.malayalam : blockData.videoLink?.english

  return (
    <AppLayoutPadding>
      <section className={editMode ? 'py-6' : blockStyling}>
        <div className='relative w-full rounded-3xl'>
          <div className='relative aspect-video w-full overflow-hidden rounded-3xl'>
            {isVideoPlaying ? (
              <iframe
                width='100%'
                height='100%'
                src={videoUrl ?? ''}
                title='Video'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen
                className='absolute inset-0 h-full w-full'
              />
            ) : (
              <>
                <img
                  src={blockData.poster?.url ?? ''}
                  alt={blockData.poster?.caption ?? 'Video poster'}
                  className='absolute inset-0 h-full w-full object-cover object-center'
                  loading='lazy'
                />

                <button
                  type='button'
                  onClick={() => setIsVideoPlaying(true)}
                  className='absolute inset-0 flex items-center justify-center text-[var(--spontaine-accent)] transition-colors hover:text-spontaine-accent-bright'
                  aria-label='Play video'
                >
                  <div className='rounded-full p-1 transition-transform duration-200 hover:scale-105'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='72'
                      height='72'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='#FFFFFF'
                      strokeWidth='4'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='feather feather-play-circle'
                    >
                      <circle
                        cx='12'
                        cy='12'
                        r='10'
                        fill='#ffffff'
                      ></circle>
                      <polygon
                        points='10 8 16 12 10 16 10 8'
                        stroke='currentColor'
                        fill='currentColor'
                      ></polygon>
                    </svg>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>

        {editMode && (
          <div className='mt-4 flex flex-wrap gap-3 px-4'>
            <EditLabel
              label='Edit Poster'
              onClick={() => onEdit('poster', 'image', blockData.poster, 'INSERT')}
            />
            <EditLabel
              label='Edit Video'
              onClick={() => onEdit('videoLink', 'text', blockData.videoLink, 'INSERT')}
            />
          </div>
        )}
      </section>
    </AppLayoutPadding>
  )
}

export default SectionFullWidthVideoSP
