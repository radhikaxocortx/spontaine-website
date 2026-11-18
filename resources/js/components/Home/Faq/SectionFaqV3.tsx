import AccordionSection, { type AccordionItem } from '@/components/Sections/AccordionSection'
import { useStackUp } from '@/hooks/useStackUp'

const faqItems: readonly AccordionItem[] = [
  {
    title:
      'We run different ERPs across acquired plants or regional offices. Do we need to standardise them first?',
    body: 'No. Spontaine connects to multiple ERPs, local shop-floor systems, time tools and CRMs in place, reconciling definitions in our semantic layer without an ERP consolidation project.',
  },
  {
    title:
      'Our IT team is lean and focused on keeping core operations running. How much internal engineering does this require?',
    body: 'Virtually none. Our domain specialists handle the system connectors and initial workflow setup alongside your operational leads, with no data engineers or custom middleware needed from your team.',
  },
  {
    title: 'How is this different from Celonis, Snowflake or hiring a systems integrator?',
    body: 'Traditional data warehouses and process-mining suites need months of schema modelling before they deliver value, often trapping your logic inside vendor-specific tools. Spontaine solves a live operational bottleneck in four weeks, and you own the resulting data model and endpoints outright.',
  },
  {
    title:
      'How do you connect shop-floor machines or time and WIP systems without disrupting active work?',
    body: 'Spontaine is a non-invasive read-and-govern layer. We pull signals from existing databases, historians, APIs or scheduled exports without modifying production PLC logic or interrupting daily billing and delivery tools.',
  },
  {
    title:
      'Can we push live margin and delivery data into our CRM and customer portals without custom APIs?',
    body: 'Yes. Every governed dataset in Spontaine is exposed as a secure, permissioned endpoint, so you can surface live capacity, margin alerts or customer quality portals directly inside the tools you already use.',
  },
  {
    title: 'What does a four-week initial rollout actually cost and deliver?',
    body: 'You start with one high-friction cross-system bottleneck, such as quote-to-actual margin, multi-plant OTIF or engagement realisation, and leave with a live, production-grade workflow running on your real data. Fixed scope and fixed fee, agreed before we start, with full ownership of the results.',
  },
]

/** Executive FAQ: sticky heading on the left, one-open-at-a-time answers on the right. */
export default function SectionFaqV3() {
  const sectionRef = useStackUp<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      id='faq'
      aria-label='Frequently asked questions'
      className='relative w-full overflow-hidden rounded-t-section-sm bg-[var(--glass-wash-warm)] pb-[120px] pt-[105px] md:rounded-t-section-md md:pt-[130px] lg:rounded-t-section-lg lg:pb-[150px] xl:rounded-t-section-xl'
    >
      <div className='mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        <AccordionSection
          idPrefix='home-faq'
          variant='faq'
          eyebrow='Straight answers'
          title='What leaders ask before the first session.'
          note='Clear answers for operations, practice leaders, finance and lean IT teams.'
          items={faqItems}
        />
      </div>
    </section>
  )
}
