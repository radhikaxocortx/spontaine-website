export const PAGE_TYPE_VALUES = [
  'Page',
  'Blog',
  'Article',
  'Opinion',
  'Whitepapers',
  'Use Cases',
  'Case Studies',
] as const

export type PageType = (typeof PAGE_TYPE_VALUES)[number]

export const PAGE_TYPE_OPTIONS = PAGE_TYPE_VALUES.map((value) => ({
  value,
  label: value,
}))
