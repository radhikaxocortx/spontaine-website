import { type ReactNode } from 'react'

import CopilotArtwork from '../Artwork/CopilotArtwork'
import PowerBiArtwork from '../Artwork/PowerBiArtwork'
import SpontaineLogo from '../Artwork/SpontaineLogo'

export interface BentoCardData {
  readonly title: string
  readonly body: ReactNode
  readonly surface: string
  readonly text: string
  readonly className: string
  readonly contentClassName?: string
  readonly titleClassName?: string
  readonly bodyClassName?: string
  readonly header?: ReactNode
  readonly media?: ReactNode
}

export const bentoCards: BentoCardData[] = [
  {
    title: 'Traditional Business Analytics',
    surface: 'bg-spontaine-surface-cream',
    text: 'text-[#565555]',
    className: '',
    body: (
      <>
        <p>Power BI, Tableau etc. are good display layers - and you can keep yours.</p>
        <p className='mt-5 font-bold'>
          The problem is not the dashboard; it is that it shows numbers people still argue about,
          and can really only show you a version of history. Spontaine&apos;s shared truth and
          shared understanding extends speed of thought intelligence.
        </p>
        <p className='font-bold'>
          Many clients also keep their dashboards and simply point them at data everyone finally
          trusts.
        </p>
      </>
    ),
    media: <PowerBiArtwork />,
  },
  {
    title: 'Bolt-on co-pilot',
    surface: 'bg-[rgba(74,74,74,0.6)]',
    text: 'text-slate-200',
    className: 'py-2',
    body: (
      <>
        <p>
          General AI over ungoverned data answers confidently. And differently every time you ask.
          Higher risk of data leakage, cost overruns at scale, and limited ability to expand beyond
          available integrations.
        </p>
        <p className='mt-5 font-bold'>
          Spontaine&apos;s answers are governed by architecture: same question, controlled answers
          and full explainability. Connect to any data source, expand to any automation you like.
        </p>
      </>
    ),
    media: <CopilotArtwork />,
  },
  {
    title: 'Commission a build',
    surface: 'bg-[#4A4A4A]',
    text: 'text-[#D5DDE9]',
    className: '',
    body: (
      <>
        <p>
          A consultancy warehouse takes 6-18 months and seven figures: and the methodology stays
          theirs.
        </p>
        <p className='mt-7 font-bold'>
          Spontaine is live in weeks, in your cloud, and everything built on it belongs to you. Once
          built out, Spontaine can be managed and expanded without requiring new data engineering
          hires.
        </p>
      </>
    ),
  },
  {
    title: 'Unify once. Iterate forever.',
    surface: 'bg-[rgba(213,221,233,0.3)]',
    text: 'text-spontaine-ink-soft',
    className:
      'shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]',
    contentClassName: '',
    titleClassName: 'mx-auto max-w-[340px]',
    bodyClassName: '!mt-auto max-w-[520px] text-left',
    header: <SpontaineLogo />,
    body: (
      <p className='font-bold'>
        With Spontaine, you can build a single, self-maintaining insights layer that powers endless
        new use cases, dashboards, and AI agents.
      </p>
    ),
  },
]

export const bentoColumns: readonly BentoCardData[][] = [
  [bentoCards[0], bentoCards[3]],
  [bentoCards[2], bentoCards[1]],
]
