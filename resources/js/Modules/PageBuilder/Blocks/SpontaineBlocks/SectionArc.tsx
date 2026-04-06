import { Language } from '@/components/ui/ui_interfaces'
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { BlocKFieldInfo } from '../../Components/BlockEditor/BlockEditor'
import EditLabel from '../../Components/EditLabel'
import { BlockConfiguration, TextData } from '../../page_interfaces'

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)

export interface ArcBlock extends BlockConfiguration {
  id?: number
  backgroundColor?: TextData
  arcPosition?: 'top' | 'bottom'
  enableAnimation?: boolean
}

export const arcBlock: ArcBlock = {
  backgroundColor: {
    english: '#ffffff',
    malayalam: '#ffffff',
  },
  arcPosition: 'top',
  enableAnimation: true,
}

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: ArcBlock
  language?: Language
}

const SectionArc = ({ editMode = false, onFieldEdit, blockData = arcBlock }: Properties) => {
  const arcRef = useRef(null)

  // Determine if background is gradient
  const bgValue = blockData.backgroundColor?.english || '#ffffff'
  const isGradient = bgValue.includes('gradient')

  useEffect(() => {
    if (!blockData.enableAnimation) return

    const arc = arcRef.current

    // Top arc paths
    const normalTopArc =
      'M1920 128C1635.2 46.4 1308 0 960 0C612 0 284.8 46.4 0 128V183.067H1920V128Z'
    const inwardTopArc =
      'M1920 128C1635.2 70 1308 30 960 30C612 30 284.8 70 0 128V183.067H1920V128Z'

    // Bottom arc paths
    const normalBottomArc = 'M0,80 C300,20 900,20 1200,80 L1200,200 L0,200 Z'
    const inwardBottomArc = 'M0,80 C300,5 900,5 1200,80 L1200,200 L0,200 Z'

    const normalPath = blockData.arcPosition === 'top' ? normalTopArc : normalBottomArc
    const inwardPath = blockData.arcPosition === 'top' ? inwardTopArc : inwardBottomArc

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: arcRef.current,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.to(arc, {
      morphSVG: inwardPath,
      duration: 1.2,
      ease: 'power2.inOut',
    }).to(arc, {
      morphSVG: normalPath,
      duration: 1.2,
      ease: 'power2.inOut',
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [blockData.enableAnimation, blockData.arcPosition])

  const topArcViewBox = '0 0 1920 183'
  const bottomArcViewBox = '0 0 1200 200'

  const topArcPath = 'M1920 128C1635.2 46.4 1308 0 960 0C612 0 284.8 46.4 0 128V183.067H1920V128Z'
  const bottomArcPath = 'M0,80 C300,20 900,20 1200,80 L1200,200 L0,200 Z'

  return (
    <section
      className={`relative w-full ${blockData?.marginTop} ${blockData?.marginBottom} ${blockData?.paddingTop} ${blockData?.paddingBottom}`}
    >
      {editMode && onFieldEdit != null && (
        <div className='absolute left-4 top-4 z-20 flex flex-col gap-2'>
          <EditLabel
            onClick={() => {
              onFieldEdit({
                field: 'backgroundColor',
                fieldType: 'text',
                oldValue: blockData.backgroundColor,
                action: 'UPDATE',
              })
            }}
            label='Edit Background Color'
          />
          <EditLabel
            onClick={() => {
              onFieldEdit({
                field: 'arcPosition',
                fieldType: 'text',
                oldValue: { english: blockData.arcPosition || 'top', malayalam: null },
                action: 'UPDATE',
              })
            }}
            label='Position (top/bottom)'
          />
          <EditLabel
            onClick={() => {
              onFieldEdit({
                field: 'enableAnimation',
                fieldType: 'text',
                oldValue: { english: String(blockData.enableAnimation ?? true), malayalam: null },
                action: 'UPDATE',
              })
            }}
            label='Enable Animation (true/false)'
          />
        </div>
      )}

      <div className='relative z-10 -mt-[8%] w-full'>
        <svg
          viewBox={blockData.arcPosition === 'top' ? topArcViewBox : bottomArcViewBox}
          preserveAspectRatio='none'
          className='block w-full'
          style={{ height: 'auto' }}
        >
          {isGradient ? (
            <>
              <defs>
                <linearGradient
                  id={`arc-gradient-${blockData.id || 'default'}`}
                  x1='0%'
                  y1='0%'
                  x2='100%'
                  y2='0%'
                >
                  {/* Parse gradient string - simple implementation */}
                  <stop
                    offset='0%'
                    stopColor='#44ECA0'
                  />
                  <stop
                    offset='100%'
                    stopColor='#3B82F6'
                  />
                </linearGradient>
              </defs>
              <path
                ref={arcRef}
                d={blockData.arcPosition === 'top' ? topArcPath : bottomArcPath}
                fill={`url(#arc-gradient-${blockData.id || 'default'})`}
              />
            </>
          ) : (
            <path
              ref={arcRef}
              d={blockData.arcPosition === 'top' ? topArcPath : bottomArcPath}
              fill={bgValue}
            />
          )}
        </svg>
      </div>
    </section>
  )
}

export default SectionArc
