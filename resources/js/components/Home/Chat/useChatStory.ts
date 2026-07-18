import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type RefObject, useCallback, useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

export type ChatStoryState = 'typing' | 'table' | 'approval'

interface UseChatStoryProps {
  stageRef: RefObject<HTMLDivElement>
  tableRef: RefObject<HTMLDivElement>
  approvalRef: RefObject<HTMLDivElement>
}

export function useChatStory({ stageRef, tableRef, approvalRef }: UseChatStoryProps) {
  const [storyState, setStoryState] = useState<ChatStoryState>('typing')
  const typingCompleteRef = useRef(false)
  const stageReadyRef = useRef(false)
  const revealTimelineRef = useRef<gsap.core.Timeline | null>(null)

  const playReveal = useCallback(() => {
    if (!typingCompleteRef.current || !stageReadyRef.current) {
      return
    }

    revealTimelineRef.current?.restart()
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const stage = stageRef.current
    const table = tableRef.current
    const approval = approvalRef.current

    if (!stage || !table || !approval) {
      return
    }

    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (shouldReduceMotion) {
      gsap.set([table, approval], { autoAlpha: 1, y: 0 })
      setStoryState('approval')
      return
    }

    let trigger: ScrollTrigger | null = null
    let timeline: gsap.core.Timeline | null = null

    const context = gsap.context(() => {
      timeline = gsap.timeline({
        paused: true,
        defaults: {
          ease: 'power3.out',
        },
        onStart: () => setStoryState('table'),
        onComplete: () => setStoryState('approval'),
      })

      timeline
        .fromTo(
          table,
          { autoAlpha: 0, y: 46 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.82,
          }
        )
        .fromTo(
          approval,
          { autoAlpha: 0, y: 54 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
          },
          '-=0.38'
        )

      revealTimelineRef.current = timeline

      const resetReveal = () => {
        if (!timeline) {
          return
        }

        timeline.pause(0)
        gsap.set(table, { autoAlpha: 0, y: 46 })
        gsap.set(approval, { autoAlpha: 0, y: 54 })
        stageReadyRef.current = false
        setStoryState('typing')
      }

      resetReveal()

      trigger = ScrollTrigger.create({
        trigger: stage,
        start: 'top 72%',
        end: 'bottom top',
        onEnter: () => {
          stageReadyRef.current = true
          playReveal()
        },
        onEnterBack: () => {
          stageReadyRef.current = true
          playReveal()
        },
        onLeaveBack: resetReveal,
      })

      if (trigger.isActive) {
        stageReadyRef.current = true
        playReveal()
      }
    }, stage)

    return () => {
      revealTimelineRef.current = null
      trigger?.kill()
      timeline?.kill()
      context.revert()
    }
  }, [approvalRef, playReveal, stageRef, tableRef])

  const onTypingComplete = useCallback(() => {
    typingCompleteRef.current = true
    playReveal()
  }, [playReveal])

  return {
    storyState,
    onTypingComplete,
  }
}
