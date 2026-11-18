import { Pill } from '@/components/ui/pill'
import { trackEvent } from '@/lib/analytics'
import { prefersReducedMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { Paperclip, SendHorizontal } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import ApprovalCard from './ApprovalCard'
import ChatSurface from './ChatSurface'
import { demoSceneList, demoScenes } from './demoScenes'
import DemoTabs, { demoTabButtonId } from './DemoTabs'
import {
  DEFAULT_DEMO_TAB,
  type DemoSceneId,
  type DemoTabSource,
  onDemoTabRequest,
  readDemoTabFromUrl,
} from './demoTabState'
import ResultsTable from './ResultsTable'
import { useChatStory } from './useChatStory'

const CROSSFADE_OUT_MS = 200

const useTypewriter = (
  questions: readonly string[],
  onTypingComplete: () => void,
  typingSpeed = 80,
  deletingSpeed = 30
) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const hasReportedCompletionRef = useRef(false)
  const questionsRef = useRef(questions)

  // A new scene restarts typing from its first question.
  useEffect(() => {
    if (questionsRef.current === questions) {
      return
    }

    questionsRef.current = questions
    setDisplayText('')
    setCurrentIndex(0)
    setIsDeleting(false)
  }, [questions])

  useEffect(() => {
    const currentQuestion = questions[currentIndex] ?? questions[0]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentQuestion.length) {
            setDisplayText(currentQuestion.substring(0, displayText.length + 1))
          } else {
            if (!hasReportedCompletionRef.current) {
              hasReportedCompletionRef.current = true
              onTypingComplete()
            }

            setTimeout(() => setIsDeleting(true), 2200)
          }
        } else if (displayText.length > 0) {
          setDisplayText(currentQuestion.substring(0, displayText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length)
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    )

    return () => clearTimeout(timeout)
  }, [
    currentIndex,
    deletingSpeed,
    displayText,
    isDeleting,
    onTypingComplete,
    questions,
    typingSpeed,
  ])

  return displayText
}

/** Selected tab, the tab on stage (lags during the crossfade), and the ways a tab gets chosen. */
const useDemoTab = (initialTab: DemoSceneId, syncWithPage: boolean) => {
  const [activeTab, setActiveTab] = useState<DemoSceneId>(initialTab)
  const [displayedTab, setDisplayedTab] = useState<DemoSceneId>(initialTab)
  const [isFading, setIsFading] = useState(false)
  const activeTabRef = useRef(activeTab)

  const selectTab = useCallback((tab: DemoSceneId, source: DemoTabSource) => {
    if (tab === activeTabRef.current) {
      return
    }

    activeTabRef.current = tab
    setActiveTab(tab)
    trackEvent('demo_tab_switched', { tab, source })
  }, [])

  // Homepage only: ?tab= links and in-page requests can switch the tab.
  useEffect(() => {
    if (!syncWithPage) {
      return
    }

    const tabFromUrl = readDemoTabFromUrl()

    if (tabFromUrl && tabFromUrl !== DEFAULT_DEMO_TAB) {
      activeTabRef.current = tabFromUrl
      setActiveTab(tabFromUrl)
      setDisplayedTab(tabFromUrl)
      trackEvent('demo_tab_switched', { tab: tabFromUrl, source: 'url' })
    }

    return onDemoTabRequest(selectTab)
  }, [selectTab, syncWithPage])

  useEffect(() => {
    if (activeTab === displayedTab) {
      return
    }

    if (prefersReducedMotion()) {
      setDisplayedTab(activeTab)
      return
    }

    setIsFading(true)
    const timeout = window.setTimeout(() => {
      setDisplayedTab(activeTab)
      setIsFading(false)
    }, CROSSFADE_OUT_MS)

    return () => window.clearTimeout(timeout)
  }, [activeTab, displayedTab])

  return { activeTab, displayedTab, isFading, selectTab }
}

export interface WorkedExampleProps {
  /** Scenes to offer; tabs appear only when there is more than one. */
  readonly scenes: readonly DemoSceneId[]
  readonly idPrefix: string
  readonly eyebrow?: string
  /** Shown in soft grey. */
  readonly titleOne: string
  readonly titleTwo?: string
  readonly description?: string
  /** Listen to ?tab= and in-page tab requests (homepage). */
  readonly syncWithPage?: boolean
}

export default function WorkedExample({
  scenes,
  idPrefix,
  eyebrow,
  titleOne,
  titleTwo,
  description,
  syncWithPage = false,
}: WorkedExampleProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const approvalRef = useRef<HTMLDivElement>(null)

  const sceneIds = scenes.length > 0 ? scenes : [DEFAULT_DEMO_TAB]
  const { activeTab, displayedTab, isFading, selectTab } = useDemoTab(sceneIds[0], syncWithPage)
  const stagePanelId = `${idPrefix}-stage`
  const scene = demoScenes[displayedTab]

  const { storyState, onTypingComplete } = useChatStory({
    stageRef,
    tableRef,
    approvalRef,
  })

  const typewriterText = useTypewriter(scene.questions, onTypingComplete)
  const longestQuestion = scene.questions.reduce(
    (longest, question) => (question.length > longest.length ? question : longest),
    ''
  )

  return (
    <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
      <div className='mx-auto max-w-[760px] text-center'>
        {eyebrow && (
          <p
            data-stack-item
            className='eyebrow mb-5 text-spontaine-gray-cool'
          >
            {eyebrow}
          </p>
        )}
        <h2
          data-stack-item
          className='font-display text-[clamp(2.5rem,4.4vw,4.45rem)] font-bold leading-[0.95] tracking-[-0.06em]'
        >
          <span className='m-0 block font-display font-bold leading-[inherit] tracking-[inherit] text-spontaine-text-accent-grey'>
            {titleOne}
          </span>
          {titleTwo && (
            <span className='m-0 block font-display font-bold leading-[inherit] tracking-[inherit] text-spontaine-dark'>
              {titleTwo}
            </span>
          )}
        </h2>
        {description && (
          <p
            data-stack-item
            className='body-lg mx-auto mt-[21px] max-w-[570px] font-body text-spontaine-gray-muted'
          >
            {description}
          </p>
        )}

        {sceneIds.length > 1 && (
          <div
            data-stack-item
            className='mt-9'
          >
            <DemoTabs
              tabs={demoSceneList.filter((item) => sceneIds.includes(item.id))}
              value={activeTab}
              panelId={stagePanelId}
              idPrefix={idPrefix}
              onChange={(tab) => selectTab(tab, 'click')}
            />
          </div>
        )}

        <p
          aria-live='polite'
          className='sr-only'
        >
          {`Showing the ${demoScenes[activeTab].label} example`}
        </p>
      </div>

      <div
        ref={stageRef}
        id={stagePanelId}
        role={sceneIds.length > 1 ? 'tabpanel' : undefined}
        aria-labelledby={sceneIds.length > 1 ? demoTabButtonId(activeTab, idPrefix) : undefined}
        data-story-state={storyState}
        className={cn(
          'mx-auto mt-9 w-full min-w-0 transition-opacity [transition-timing-function:cubic-bezier(0.215,0.61,0.355,1)]',
          isFading ? 'opacity-0 duration-200' : 'opacity-100 duration-300'
        )}
      >
        <div className='mx-auto max-w-[690px]'>
          <ChatSurface
            variant='input'
            size='none'
            className='px-[18px] py-4'
          >
            <div className='flex items-center gap-2 sm:gap-3'>
              <button
                type='button'
                className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[var(--radius-pill)] text-spontaine-gray-muted transition-colors hover:text-spontaine-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spontaine-accent-dark focus-visible:ring-offset-2 sm:h-[42px] sm:w-[42px]'
                aria-label='Attach file'
              >
                <Paperclip
                  aria-hidden='true'
                  className='h-5 w-5'
                />
              </button>

              {/* The invisible copy of the longest question holds the box at its final height,
                  so typing never pushes the page around (Safari does not anchor scroll). */}
              <p className='grid min-w-0 flex-1 break-words font-body text-[0.88rem] leading-relaxed text-spontaine-gray-muted'>
                <span
                  aria-hidden='true'
                  className='invisible [grid-area:1/1]'
                >
                  {longestQuestion}
                  <span className='ml-0.5 inline-block h-4 w-0.5 align-middle' />
                </span>
                <span className='[grid-area:1/1]'>
                  {typewriterText}
                  <span className='ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-spontaine-accent align-middle' />
                </span>
              </p>

              <button
                type='button'
                className='grid h-10 w-10 flex-shrink-0 place-items-center rounded-[var(--radius-pill)] bg-spontaine-accent text-spontaine-white shadow-cta-glow transition-colors hover:bg-spontaine-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spontaine-accent-dark focus-visible:ring-offset-2 sm:h-[42px] sm:w-[42px]'
                aria-label='Send message'
              >
                <SendHorizontal
                  aria-hidden='true'
                  className='h-5 w-5'
                />
              </button>
            </div>

            <div className='mt-[14px] flex flex-wrap gap-[7px]'>
              {scene.pills.map((pill) => (
                <Pill
                  key={pill.label}
                  variant={pill.variant}
                  size='md'
                >
                  {pill.label}
                </Pill>
              ))}
            </div>
          </ChatSurface>
        </div>

        <div className='mx-auto mt-8 grid w-full min-w-0 max-w-[908px] gap-4 md:mt-[39px] md:gap-[22px] lg:grid-cols-[1.65fr_0.82fr] lg:gap-[26px]'>
          <div
            ref={tableRef}
            className='min-w-0'
          >
            <ResultsTable scene={scene} />
          </div>

          <div
            ref={approvalRef}
            className='min-w-0 self-stretch lg:self-end'
          >
            <ApprovalCard
              label={scene.alertLabel}
              title={scene.alertTitle}
            />
          </div>
        </div>

        <p className='eyebrow mt-[22px] flex items-center justify-center gap-2 text-spontaine-text-tertiary'>
          <span
            aria-hidden='true'
            className='h-1.5 w-1.5 rounded-[var(--radius-pill)] bg-spontaine-gray-soft'
          />
          Illustrative data
        </p>
      </div>
    </div>
  )
}
