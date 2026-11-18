export type DemoTabId = 'professional-services' | 'industrial'

/** Every scene a worked example can show. Only DemoTabId scenes can be picked by ?tab= on the homepage. */
export type DemoSceneId = DemoTabId | 'industrial-otif'

export type DemoTabSource = 'click' | 'url'

export const DEMO_TAB_IDS: readonly DemoTabId[] = ['professional-services', 'industrial']

export const DEFAULT_DEMO_TAB: DemoTabId = 'professional-services'

const DEMO_TAB_EVENT = 'spontaine:demo-tab'

interface DemoTabEventDetail {
  readonly tab: DemoTabId
  readonly source: DemoTabSource
}

export const isDemoTabId = (value: string | null): value is DemoTabId =>
  value != null && (DEMO_TAB_IDS as readonly string[]).includes(value)

export const readDemoTabFromUrl = (): DemoTabId | null => {
  if (typeof window === 'undefined') {
    return null
  }

  const value = new URLSearchParams(window.location.search).get('tab')

  return isDemoTabId(value) ? value : null
}

export const requestDemoTab = (tab: DemoTabId, source: DemoTabSource): void => {
  window.dispatchEvent(
    new CustomEvent<DemoTabEventDetail>(DEMO_TAB_EVENT, { detail: { tab, source } })
  )
}

export const onDemoTabRequest = (
  handler: (tab: DemoTabId, source: DemoTabSource) => void
): (() => void) => {
  const listener = (event: Event) => {
    const { tab, source } = (event as CustomEvent<DemoTabEventDetail>).detail
    handler(tab, source)
  }

  window.addEventListener(DEMO_TAB_EVENT, listener)

  return () => window.removeEventListener(DEMO_TAB_EVENT, listener)
}
