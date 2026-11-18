import { type SolutionTab } from './SolutionsTabs'

export const solutionsEyebrow = 'What Spontaine does'

/** Shown once for every homepage tab (SolutionsTabs fixedHeadline). */
export const solutionsHeadline = 'Data first.\nThen AI that works.'

const rolloutLink = { label: 'See a four-week rollout', href: '#first-question' }

/**
 * Homepage solutions tabs. Also the default content for the
 * "Spontaine V3 - Solutions Tabs" page builder block.
 * Ids are stable: ?solution=industrial and friends deep-link to them.
 */
export const solutionTabs: readonly SolutionTab[] = [
  {
    id: 'ai',
    label: 'Cross-system unification',
    description: 'ERPs, shop floor, CRM and WIP',
    tag: 'Platform',
    headline: solutionsHeadline,
    points: [
      {
        title: 'Connect disparate systems in place',
        line: 'Pull live signals from legacy ERPs, PLCs, time and billing tools, and CRMs without migrations or disrupting daily operations.',
      },
      {
        title: 'Reconcile business rules once',
        line: 'Codify how your organisation calculates true margin, capacity and delivery risk, and end the conflicting Friday spreadsheets.',
      },
      {
        title: 'Turn answers into daily execution',
        line: 'Push live alerts into CRM, flag margin drift mid-shift or mid-project, and publish governed customer portals you own.',
      },
    ],
    link: rolloutLink,
  },
  {
    id: 'industrial',
    label: 'Industrial and manufacturing',
    description: 'Quote-to-actual, OTIF and supply',
    tag: 'Industry',
    headline: solutionsHeadline,
    points: [
      {
        title: 'Automatic shop-floor capture',
        line: 'Pull cycle times, scrap and quality results directly from machines and MES without manual entry.',
      },
      {
        title: 'Backward and forward sync',
        line: 'Connect supplier lead-time slips and raw material costs directly to active orders and CRM quoting.',
      },
      {
        title: 'Zero line disruption',
        line: 'Deploy across acquired plants and mixed ERPs in weeks without touching active production workflows.',
      },
    ],
    link: rolloutLink,
  },
  {
    id: 'professional-services',
    label: 'Professional services',
    description: 'Engagement margin, WIP and utilisation',
    tag: 'Industry',
    headline: solutionsHeadline,
    points: [
      {
        title: 'Unify practice and financial systems',
        line: 'Connect time tracking, WIP, CRM pipeline and ERP ledgers without manual partner reconciliation.',
      },
      {
        title: 'Protect engagement margin early',
        line: 'Flag scope creep, senior staffing over-allocation and realisation drift before month-end write-offs.',
      },
      {
        title: 'Productise delivery judgement',
        line: 'Package repeatable advisory methods and benchmarks into governed client deliverables you own.',
      },
    ],
    link: rolloutLink,
  },
  {
    id: 'data-products',
    label: 'Customer data products',
    description: 'Portals, certificates and governed feeds',
    tag: 'Platform',
    headline: solutionsHeadline,
    points: [
      {
        title: 'Every governed dataset is API-ready',
        line: 'Expose live order status, quality certificates or client benchmarks without custom portal builds.',
      },
      {
        title: 'Strict perimeter control',
        line: 'You decide the exact fields each buyer or client sees; proprietary cost and tolerance data never leaves.',
      },
      {
        title: 'Turn reporting into retention',
        line: 'Replace manual spreadsheet exports with live customer visibility that wins renewals and tenders.',
      },
    ],
    link: rolloutLink,
  },
]
