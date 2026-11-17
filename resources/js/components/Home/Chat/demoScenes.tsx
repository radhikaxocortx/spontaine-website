import { type PillProps } from '@/components/ui/pill'
import { type DemoTabId } from './demoTabState'

export interface DemoRow {
  readonly cells: readonly [string, string, string, string]
}

export interface DemoScene {
  readonly id: DemoTabId
  readonly label: string
  readonly questions: readonly string[]
  readonly pills: readonly { readonly variant: PillProps['variant']; readonly label: string }[]
  readonly columns: readonly [string, string, string, string]
  /** Tailwind grid template for the desktop table (kept here so Tailwind sees it). */
  readonly gridClassName: string
  readonly rows: readonly DemoRow[]
  readonly metricLabel: string
  readonly metricValue: string
  readonly sparkPath: string
  readonly whatChanged: string
  readonly alertLabel: string
  readonly alertTitle: string
}

// Professional services: unchanged from the live page.
const professionalServices: DemoScene = {
  id: 'professional-services',
  label: 'Professional services',
  questions: [
    'Which engagements are likely to miss target margin this quarter?',
    'Where did delayed billing change expected realization?',
  ],
  pills: [
    { variant: 'variant1', label: 'Create interactive view' },
    { variant: 'variant4', label: 'Sources: Finance, time & WIP' },
    { variant: 'neutral', label: 'This quarter' },
  ],
  columns: ['Engagement', 'Margin', 'vs target', 'Partner'],
  gridClassName: 'grid-cols-[2.5fr_0.8fr_0.8fr_0.9fr]',
  rows: [
    { cells: ['Euroline Group -- advisory', '24.6%', '-13.4 pts', 'K. Keller'] },
    { cells: ['Riverton Energy -- audit', '31.2%', '-6.8 pts', 'E. Moretti'] },
  ],
  metricLabel: 'Margin at risk',
  metricValue: '€12,596.98',
  sparkPath:
    'M0 52 L13 44 L24 52 L37 36 L50 40 L63 19 L78 40 L93 26 L106 52 L120 48 L133 59 L148 47 L160 60 L177 40 L188 30 L202 46 L215 19 L229 36 L250 28',
  whatChanged:
    'The bottom T&M projects have fallen below target margin. The pattern points to delayed billing and senior time used below its value.',
  alertLabel: 'Opportunity found · 05:47',
  alertTitle: 'One client may qualify for an energy-tax deduction.',
}

// Industrial: illustrative data. Never implies a real customer.
const industrial: DemoScene = {
  id: 'industrial',
  label: 'Industrial',
  questions: ['Why did margin on Programme 4410 fall at Plant B but not Plant A?'],
  pills: [
    { variant: 'variant1', label: 'Create interactive view' },
    { variant: 'variant4', label: 'Sources: ERP, MES, pricing' },
    { variant: 'neutral', label: 'This quarter' },
  ],
  columns: ['Plant', 'Margin', 'vs plan', 'Main driver'],
  gridClassName: 'grid-cols-[0.8fr_0.7fr_0.7fr_1.9fr]',
  rows: [
    { cells: ['Plant A', '18.2%', '-0.4 pts', 'Volume mix'] },
    { cells: ['Plant B', '11.7%', '-6.9 pts', 'Resin cost not passed through'] },
  ],
  metricLabel: 'Plant B margin, last four quarters',
  metricValue: '18.6% → 11.7%',
  sparkPath: 'M0 14 L40 16 L80 15 L120 22 L150 30 L180 41 L215 50 L250 56',
  whatChanged:
    'Resin cost at Plant B rose in Q3. Price changes to the two largest customers did not follow. Plant A reprices quarterly; Plant B reprices yearly.',
  alertLabel: 'Price leakage found · 05:47',
  alertTitle: 'Two customers below cost-plus floor at Plant B.',
}

export const demoScenes: Readonly<Record<DemoTabId, DemoScene>> = {
  'professional-services': professionalServices,
  industrial,
}

export const demoSceneList: readonly DemoScene[] = [professionalServices, industrial]
