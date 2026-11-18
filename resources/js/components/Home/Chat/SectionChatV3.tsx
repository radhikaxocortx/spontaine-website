import { useStackUp } from '@/hooks/useStackUp'
import { DEMO_TAB_IDS } from './demoTabState'
import WorkedExample from './WorkedExample'

export default function SectionChatV3() {
  const sectionRef = useStackUp<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      id='example'
      className='relative z-30 w-full scroll-mt-16 overflow-hidden rounded-t-section-sm bg-spontaine-surface-paper pb-[110px] pt-[104px] md:rounded-t-section-md md:pb-[130px] md:pt-[130px] lg:rounded-t-section-lg lg:pb-[150px] lg:pt-[136px] xl:rounded-t-section-xl xl:pt-[144px]'
    >
      <WorkedExample
        scenes={DEMO_TAB_IDS}
        idPrefix='demo'
        eyebrow='See it work'
        titleOne='An answer is useful once.'
        titleTwo='A capability works every day.'
        description='Lock any verified question into an automated alert, a CRM insight or a customer feed.'
        syncWithPage
      />
    </section>
  )
}
