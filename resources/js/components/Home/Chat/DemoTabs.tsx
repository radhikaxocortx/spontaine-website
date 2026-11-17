import { motionDuration, motionEase } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { motion, useReducedMotion } from 'framer-motion'
import { type KeyboardEvent, useRef } from 'react'
import { type DemoTabId } from './demoTabState'

interface DemoTab {
  readonly id: DemoTabId
  readonly label: string
}

interface DemoTabsProps {
  readonly tabs: readonly DemoTab[]
  readonly value: DemoTabId
  readonly panelId: string
  readonly onChange: (tab: DemoTabId) => void
}

export const demoTabButtonId = (tab: DemoTabId) => `demo-tab-${tab}`

export default function DemoTabs({ tabs, value, panelId, onChange }: DemoTabsProps) {
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])
  const shouldReduceMotion = useReducedMotion()

  const focusTab = (index: number) => {
    const nextIndex = (index + tabs.length) % tabs.length
    buttonRefs.current[nextIndex]?.focus()
    onChange(tabs[nextIndex].id)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keyActions: Record<string, () => void> = {
      ArrowRight: () => focusTab(index + 1),
      ArrowLeft: () => focusTab(index - 1),
      Home: () => focusTab(0),
      End: () => focusTab(tabs.length - 1),
    }

    const action = keyActions[event.key]

    if (action) {
      event.preventDefault()
      action()
    }
  }

  return (
    <div
      role='tablist'
      aria-label='Worked example'
      className='flex w-full rounded-[var(--radius-pill)] bg-[var(--spontaine-pill-variant-neutral-bg)] p-1 shadow-[inset_0_0_0_1px_var(--spontaine-border-subtle)] sm:inline-flex sm:w-auto'
    >
      {tabs.map((tab, index) => {
        const isSelected = tab.id === value

        return (
          <button
            key={tab.id}
            ref={(node) => {
              buttonRefs.current[index] = node
            }}
            id={demoTabButtonId(tab.id)}
            type='button'
            role='tab'
            aria-selected={isSelected}
            aria-controls={panelId}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              'relative min-h-11 flex-1 rounded-[var(--radius-pill)] px-[18px] font-body text-[14px] font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-spontaine-accent sm:flex-none',
              isSelected
                ? 'text-spontaine-text-primary'
                : 'text-spontaine-gray-cool hover:text-spontaine-text-primary'
            )}
          >
            {isSelected && (
              <motion.span
                layoutId='tab-pill'
                aria-hidden='true'
                className='absolute inset-0 rounded-[var(--radius-pill)] bg-spontaine-white shadow-card-lift'
                transition={{
                  duration: shouldReduceMotion ? 0 : motionDuration.indicator,
                  ease: motionEase.settleBezier,
                }}
              />
            )}
            <span className='relative z-10'>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
