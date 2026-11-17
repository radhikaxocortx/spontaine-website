type EventParams = Record<string, string | number | boolean>

type GtagWindow = Window & {
  gtag?: (command: 'event', eventName: string, params?: EventParams) => void
}

/**
 * Sends a GA4 event through the gtag snippet loaded in app.blade.php.
 * Event names are snake_case, matching the existing naming style.
 */
export function trackEvent(eventName: string, params: EventParams = {}): void {
  if (typeof window === 'undefined') {
    return
  }

  ;(window as GtagWindow).gtag?.('event', eventName, params)
}
