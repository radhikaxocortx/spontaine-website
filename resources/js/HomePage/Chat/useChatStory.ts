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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const typingCompleteRef = useRef(false)
  const tableUnlockedRef = useRef(false)
  const approvalUnlockedRef = useRef(false)
  const tableScrolledUpRef = useRef(false)
  const stageReadyRef = useRef(false)
  const stageInViewportRef = useRef(false)
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const unlockTableRef = useRef<() => void>(() => {})

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => mediaQuery.removeEventListener('change', updatePreference)
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

    const ownedTriggers: ScrollTrigger[] = []

    const clearIdleTimer = () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
        idleTimerRef.current = null
      }
    }

    const setTableHidden = () => {
      gsap.killTweensOf(table)

      if (prefersReducedMotion) {
        gsap.set(table, { autoAlpha: 0, y: 0 })
        return
      }

      gsap.to(table, {
        autoAlpha: 0,
        y: 80,
        duration: 0.35,
        ease: 'power2.out',
      })
    }

    const setApprovalHidden = () => {
      gsap.killTweensOf(approval)

      if (prefersReducedMotion) {
        gsap.set(approval, { autoAlpha: 0, x: 0, y: 0 })
        return
      }

      gsap.to(approval, {
        autoAlpha: 0,
        x: 0,
        y: 120,
        duration: 0.35,
        ease: 'power2.out',
      })
    }

    const showTable = (isInitialReveal = false) => {
      if (!tableUnlockedRef.current || !stageInViewportRef.current) {
        return
      }

      gsap.killTweensOf(table)

      if (prefersReducedMotion) {
        gsap.set(table, { autoAlpha: 1, y: 0 })
        return
      }

      gsap.to(table, {
        autoAlpha: 1,
        y: 0,
        duration: isInitialReveal ? 0.9 : 0.65,
        ease: 'power3.out',
      })
    }

    const showApproval = (isInitialReveal = false) => {
      if (!approvalUnlockedRef.current || !stageInViewportRef.current) {
        return
      }

      gsap.killTweensOf(approval)

      if (prefersReducedMotion) {
        gsap.set(approval, { autoAlpha: 1, x: 0, y: 0 })
        return
      }

      gsap.to(approval, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration: isInitialReveal ? 1.15 : 0.9,
        ease: 'back.out(1)',
      })
    }

    const hideUnlockedCards = () => {
      if (tableUnlockedRef.current) {
        setTableHidden()
      }

      if (approvalUnlockedRef.current) {
        setApprovalHidden()
      }
    }

    const markStageInViewport = () => {
      stageInViewportRef.current = true
    }

    const unlockApproval = () => {
      if (approvalUnlockedRef.current || !tableUnlockedRef.current) {
        return
      }

      approvalUnlockedRef.current = true
      setStoryState('approval')
      showApproval(true)
    }

    const maybeRevealApproval = () => {
      if (!tableUnlockedRef.current || !tableScrolledUpRef.current || !stageInViewportRef.current) {
        return
      }

      if (approvalUnlockedRef.current) {
        showApproval()
        return
      }

      unlockApproval()
    }

    const unlockTable = () => {
      if (tableUnlockedRef.current) {
        return
      }

      clearIdleTimer()
      tableUnlockedRef.current = true
      setStoryState('table')
      showTable(true)
      maybeRevealApproval()
      ScrollTrigger.refresh()
    }

    const updateStageVisibility = (isInViewport: boolean) => {
      stageInViewportRef.current = isInViewport

      if (!isInViewport) {
        hideUnlockedCards()
      }
    }

    const scheduleIdleReveal = () => {
      if (!typingCompleteRef.current || tableUnlockedRef.current) {
        return
      }

      clearIdleTimer()
      idleTimerRef.current = setTimeout(() => {
        if (stageReadyRef.current) {
          unlockTable()
        }
      }, 1000)
    }

    unlockTableRef.current = unlockTable

    gsap.set(table, {
      autoAlpha: tableUnlockedRef.current && stageInViewportRef.current ? 1 : 0,
      y: tableUnlockedRef.current || prefersReducedMotion ? 0 : 360,
    })

    gsap.set(approval, {
      autoAlpha: approvalUnlockedRef.current && stageInViewportRef.current ? 1 : 0,
      x: 0,
      y: approvalUnlockedRef.current || prefersReducedMotion ? 0 : 120,
    })

    const stageTrigger = ScrollTrigger.create({
      trigger: stage,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => updateStageVisibility(true),
      onEnterBack: () => updateStageVisibility(true),
      onLeave: () => updateStageVisibility(false),
      onLeaveBack: () => updateStageVisibility(false),
    })
    ownedTriggers.push(stageTrigger)

    updateStageVisibility(stageTrigger.isActive)

    const stageReadyTrigger = ScrollTrigger.create({
      trigger: stage,
      start: 'top 75%',
      end: 'bottom top',
      onEnter: () => {
        stageReadyRef.current = true
        scheduleIdleReveal()
      },
      onEnterBack: () => {
        stageReadyRef.current = true
        scheduleIdleReveal()
      },
      onLeave: () => {
        stageReadyRef.current = false
      },
      onLeaveBack: () => {
        stageReadyRef.current = false
      },
    })
    ownedTriggers.push(stageReadyTrigger)
    stageReadyRef.current = stageReadyTrigger.isActive
    if (stageReadyRef.current) {
      scheduleIdleReveal()
    }

    const tableTrigger = ScrollTrigger.create({
      trigger: stage,
      start: 'top 75%',
      onEnter: () => {
        markStageInViewport()

        if (tableUnlockedRef.current) {
          showTable()
          return
        }

        unlockTable()
      },
      onEnterBack: () => {
        markStageInViewport()

        if (tableUnlockedRef.current) {
          showTable()
        }
      },
    })
    ownedTriggers.push(tableTrigger)

    const approvalTableTrigger = ScrollTrigger.create({
      trigger: table,
      start: 'center 50%',
      onEnter: () => {
        tableScrolledUpRef.current = true
        markStageInViewport()
        maybeRevealApproval()
      },
      onEnterBack: () => {
        tableScrolledUpRef.current = true
        markStageInViewport()
        maybeRevealApproval()
      },
      onLeaveBack: () => {
        tableScrolledUpRef.current = false
      },
    })
    ownedTriggers.push(approvalTableTrigger)
    tableScrolledUpRef.current = approvalTableTrigger.isActive
    if (approvalTableTrigger.isActive) {
      markStageInViewport()
      maybeRevealApproval()
    }

    const activityEvents = [
      'scroll',
      'wheel',
      'pointerdown',
      'pointermove',
      'keydown',
      'touchstart',
    ]
    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, scheduleIdleReveal, { passive: true })
    })

    return () => {
      clearIdleTimer()
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, scheduleIdleReveal)
      })
      gsap.killTweensOf([table, approval])
      ownedTriggers.forEach((trigger) => trigger.kill())
    }
  }, [approvalRef, prefersReducedMotion, stageRef, tableRef])

  const onTypingComplete = useCallback(() => {
    if (typingCompleteRef.current) {
      return
    }

    typingCompleteRef.current = true

    if (!tableUnlockedRef.current) {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }

      idleTimerRef.current = setTimeout(() => {
        if (stageReadyRef.current) {
          unlockTableRef.current()
        }
      }, 1000)
    }
  }, [])

  return {
    storyState,
    onTypingComplete,
    prefersReducedMotion,
  }
}
