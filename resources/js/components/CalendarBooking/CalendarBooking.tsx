import { useState } from 'react'
import { createPortal } from 'react-dom'

interface CalendarBookingProps {
  calLink?: string
  layout?: 'month_view' | 'week_view' | 'column_view'
  brandColor?: string
  children: (props: { openCalendar: () => void; isLoading: boolean }) => React.ReactNode
}

interface CalWindow extends Window {
  Cal?: (action: string, config?: unknown) => void
}

// Detect iOS devices
const isIOS = () => {
  if (typeof window === 'undefined') return false
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

let calScriptPromise: Promise<void> | null = null

const loadCalScript = () => {
  if (typeof window === 'undefined') {
    return Promise.resolve()
  }

  if ((window as CalWindow).Cal) {
    return Promise.resolve()
  }

  if (calScriptPromise) {
    return calScriptPromise
  }

  calScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://app.cal.com/embed/embed.js"]'
    )

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(new Error('Cal.com failed to load')), {
        once: true,
      })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://app.cal.com/embed/embed.js'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Cal.com failed to load'))
    document.body.appendChild(script)
  })

  return calScriptPromise
}

export const CalendarBooking = ({
  calLink = 'intuonfx/30min',
  layout = 'month_view',
  brandColor = '#44ECA0',
  children,
}: CalendarBookingProps) => {
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const openCalendar = async () => {
    // On iOS, use Cal.com's native modal
    if (!isIOS()) {
      setShowModal(true)
      return
    }

    setIsLoading(true)

    try {
      await loadCalScript()

      const Cal = typeof window !== 'undefined' ? (window as CalWindow).Cal : undefined

      if (Cal) {
        Cal('init', { origin: 'https://cal.com' })
        Cal('ui', {
          styles: { branding: { brandColor } },
          hideEventTypeDetails: false,
          layout,
        })
        Cal('openModal', {
          calLink,
          config: { layout },
        })
        return
      }

      setShowModal(true)
    } finally {
      setIsLoading(false)
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      {children({ openCalendar, isLoading })}

      {/* MODAL WITH IFRAME (Desktop/Android only) */}
      {showModal &&
        createPortal(
          <div
            className='fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm'
            onClick={closeModal}
          >
            <div
              className='relative w-[90%] max-w-6xl overflow-hidden rounded-2xl bg-white p-1 shadow-2xl md:p-4 lg:p-14'
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className='absolute right-4 top-1 z-10 rounded-full p-1 text-2xl text-gray-600 hover:bg-white hover:text-gray-800'
                aria-label='Close calendar'
              >
                ×
              </button>

              {/* Calendar Iframe */}
              <iframe
                src={`https://cal.com/${calLink}?embed=true&layout=${layout}`}
                className='h-[475px] w-full border-0'
                allow='fullscreen'
                title='Book a meeting'
              ></iframe>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default CalendarBooking
