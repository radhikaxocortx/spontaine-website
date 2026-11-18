import { type PillProps } from '@/components/ui/pill'
import { type DemoSceneId } from './demoTabState'

export interface DemoRow {
  readonly cells: readonly [string, string, string, string]
}

export interface DemoScene {
  readonly id: DemoSceneId
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

// Professional services: fixed-fee margin drift. Illustrative data.
const professionalServices: DemoScene = {
  id: 'professional-services',
  label: 'Professional services',
  questions: [
    'Which fixed-fee client engagements are drifting below 35% target margin due to senior staffing mix or unbilled scope?',
  ],
  pills: [
    { variant: 'variant1', label: 'Create interactive view' },
    { variant: 'variant4', label: 'Sources: Finance, time & WIP' },
    { variant: 'neutral', label: 'This quarter' },
  ],
  columns: ['Engagement', 'Margin', 'vs 35% target', 'Main driver'],
  gridClassName: 'grid-cols-[1.7fr_0.6fr_0.8fr_1.1fr]',
  rows: [
    { cells: ['Euroline Group, advisory', '24.6%', '-10.4 pts', 'Senior staffing mix'] },
    { cells: ['Riverton Energy, audit', '31.2%', '-3.8 pts', 'Unbilled scope'] },
  ],
  metricLabel: 'Fixed-fee margin at risk',
  metricValue: '€126,400',
  sparkPath:
    'M0 52 L13 44 L24 52 L37 36 L50 40 L63 19 L78 40 L93 26 L106 52 L120 48 L133 59 L148 47 L160 60 L177 40 L188 30 L202 46 L215 19 L229 36 L250 28',
  whatChanged:
    'Senior hours on Euroline are running at twice the plan. On Riverton, three change requests were delivered but never billed.',
  alertLabel: 'Unbilled scope found · 05:47',
  alertTitle: 'Three delivered change requests on Riverton Energy are not yet billed.',
}

// Industrial: on-time in-full risk across Plant A and Plant B. Illustrative data. Never implies a real customer.
const industrial: DemoScene = {
  id: 'industrial',
  label: 'Industrial',
  questions: [
    'Which open orders across Plant A and Plant B will miss OTIF due to scrap or supplier delays, and what is the margin hit?',
  ],
  pills: [
    { variant: 'variant1', label: 'Create interactive view' },
    { variant: 'variant4', label: 'Sources: ERP, MES, suppliers, CRM' },
    { variant: 'neutral', label: 'Open orders' },
  ],
  columns: ['Open order', 'Plant', 'vs promise', 'Cause'],
  gridClassName: 'grid-cols-[1.5fr_0.6fr_0.7fr_1.1fr]',
  rows: [
    { cells: ['SO-22817 · Brackets', 'Plant A', '+5 days', 'Scrap on line 3'] },
    { cells: ['SO-22904 · Pump housings', 'Plant B', '+3 days', 'Supplier delay'] },
  ],
  metricLabel: 'Margin hit, 11 open orders',
  metricValue: '€168,300',
  sparkPath: 'M0 60 L30 59 L60 57 L90 55 L120 48 L150 41 L180 33 L215 24 L250 15',
  whatChanged:
    'Scrap on line 3 at Plant A doubled this month, and the alloy supplier for Plant B is running 9 days late. Expedited freight and penalties carry most of the cost.',
  alertLabel: 'OTIF risk found · 05:47',
  alertTitle: 'Re-sequence two Plant A orders to protect a key customer delivery.',
}

// Industrial, on-time in-full risk: used on /industrial-groups only. Illustrative data.
const industrialOtif: DemoScene = {
  id: 'industrial-otif',
  label: 'Industrial',
  questions: [
    'Which open orders across our Ohio and Brno plants are at risk of missing OTIF due to alloy lead-time slips, and what is the margin impact?',
  ],
  pills: [
    { variant: 'variant1', label: 'Create interactive view' },
    { variant: 'variant4', label: 'Sources: ERP, MES, suppliers, CRM' },
    { variant: 'neutral', label: 'Open orders' },
  ],
  columns: ['Open order', 'Plant', 'vs promise', 'Margin impact'],
  gridClassName: 'grid-cols-[1.7fr_0.6fr_0.7fr_0.9fr]',
  rows: [
    { cells: ['SO-22817 · Tier-1 auto brackets', 'Brno', '+6 days', '-€41,200'] },
    { cells: ['SO-22904 · Pump housings', 'Ohio', '+3 days', '-€12,900'] },
  ],
  metricLabel: 'Margin at risk, 14 open orders',
  metricValue: '€214,600',
  sparkPath: 'M0 60 L30 59 L60 57 L90 55 L120 48 L150 41 L180 33 L215 24 L250 15',
  whatChanged:
    'Alloy 6082 lead time from the main mill rose from 21 to 32 days. Fourteen open orders depend on it, nine at Brno and five at Ohio. Expedited freight and late-delivery penalties carry most of the cost.',
  alertLabel: 'OTIF risk found · 05:47',
  alertTitle: 'Move 40 t of alloy from Ohio stock to protect three Brno orders.',
}

export const demoScenes: Readonly<Record<DemoSceneId, DemoScene>> = {
  'professional-services': professionalServices,
  industrial,
  'industrial-otif': industrialOtif,
}

export const demoSceneList: readonly DemoScene[] = [
  professionalServices,
  industrial,
  industrialOtif,
]
