import { Pill } from '@/components/ui/pill'
import { Paperclip, SendHorizontal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import ApprovalCard from './ApprovalCard'
import ChatSurface from './ChatSurface'
import ResultsTable from './ResultsTable'
import { useChatStory } from './useChatStory'

const useTypewriter = (
  questions: string[],
  onTypingComplete: () => void,
  typingSpeed = 80,
  deletingSpeed = 30
) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const hasReportedCompletionRef = useRef(false)

  useEffect(() => {
    const currentQuestion = questions[currentIndex]

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

const questions = [
  'Which engagements are likely to miss target margin this quarter?',
  'Where did delayed billing change expected realization?',
  'Which client work should become a reusable Block?',
]

export default function SectionChatV3() {
  const stageRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const approvalRef = useRef<HTMLDivElement>(null)

  const { storyState, onTypingComplete } = useChatStory({
    stageRef,
    tableRef,
    approvalRef,
  })

  const typewriterText = useTypewriter(questions, onTypingComplete)

  return (
    <section
      className='rounded-t-section-sm bg-spontaine-surface-paper md:rounded-t-section-md lg:rounded-t-section-lg xl:rounded-t-section-xl relative z-30 w-full overflow-hidden pb-[110px] pt-[104px] md:pb-[130px] md:pt-[130px] lg:pb-[150px] lg:pt-[136px] xl:pt-[144px]'
      data-story-state={storyState}
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <div className='mx-auto max-w-[760px] text-center'>
          <h2 className='font-display text-[clamp(2.5rem,4.4vw,4.45rem)] font-bold leading-[0.95] tracking-[-0.06em]'>
            <p className='text-spontaine-text-accent-grey m-0 block font-display font-bold leading-[inherit] tracking-[inherit]'>
              An answer is useful once.
            </p>
            <p className='m-0 block font-display font-bold leading-[inherit] tracking-[inherit] text-spontaine-dark'>
              A capability works every day.
            </p>
          </h2>
          <p className='body-lg mx-auto mt-[21px] max-w-[570px] font-body text-spontaine-gray-muted'>
            Ask a question your firm cares about. Spontaine gives you a governed answer with the
            right context, then lets you keep the useful work as a reusable Block.
          </p>
        </div>

        <div
          ref={stageRef}
          className='mx-auto mt-[50px] w-full'
        >
          <div className='mx-auto max-w-[690px]'>
            <ChatSurface
              variant='input'
              size='none'
              className='px-[18px] py-4'
            >
              <div className='flex items-center gap-3'>
                <button
                  type='button'
                  className='flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-[var(--radius-pill)] text-spontaine-gray-muted transition-colors hover:text-spontaine-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spontaine-accent-dark focus-visible:ring-offset-2'
                  aria-label='Attach file'
                >
                  <Paperclip
                    aria-hidden='true'
                    className='h-5 w-5'
                  />
                </button>

                <p className='min-w-0 flex-1 font-body text-[0.88rem] leading-relaxed text-spontaine-gray-muted'>
                  {typewriterText}
                  <span className='ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-spontaine-accent align-middle' />
                </p>

                <button
                  type='button'
                  className='hover:bg-spontaine-accent-hover grid h-[42px] w-[42px] flex-shrink-0 place-items-center rounded-[var(--radius-pill)] bg-spontaine-accent text-spontaine-white shadow-cta-glow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spontaine-accent-dark focus-visible:ring-offset-2'
                  aria-label='Send message'
                >
                  <SendHorizontal
                    aria-hidden='true'
                    className='h-5 w-5'
                  />
                </button>
              </div>

              <div className='mt-[14px] flex flex-wrap gap-[7px]'>
                <Pill
                  variant='variant1'
                  size='md'
                >
                  Create interactive view
                </Pill>

                <Pill
                  variant='variant4'
                  size='md'
                >
                  Sources: Finance, time &amp; WIP
                </Pill>

                <Pill
                  variant='neutral'
                  size='md'
                >
                  This quarter
                </Pill>
              </div>
            </ChatSurface>
          </div>

          <div className='mx-auto mt-[39px] grid w-full max-w-[908px] gap-[26px] lg:grid-cols-[1.65fr_0.82fr]'>
            <div ref={tableRef}>
              <ResultsTable />
            </div>

            <div
              ref={approvalRef}
              className='self-end'
            >
              <ApprovalCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
