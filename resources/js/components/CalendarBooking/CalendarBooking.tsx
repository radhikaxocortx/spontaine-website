import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface CalendarBookingProps {
  calLink?: string
  layout?: 'month_view' | 'week_view' | 'column_view'
  brandColor?: string
  children: (props: { openCalendar: () => void; isLoading: boolean }) => React.ReactNode
}

// Detect iOS devices
const isIOS = () => {
  if (typeof window === 'undefined') return false
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

export const CalendarBooking = ({
  calLink = 'intuonfx/30min',
  layout = 'month_view',
  brandColor = '#44ECA0',
  children,
}: CalendarBookingProps) => {
  const [showModal, setShowModal] = useState(false)
  const [calLoaded, setCalLoaded] = useState(false)

  // Load Cal.com embed script (only once globally)
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check if script is already loaded
    const existingScript = document.querySelector(
      'script[src="https://app.cal.com/embed/embed.js"]'
    )

    if (existingScript) {
      // Script already exists, just set loaded state
      setCalLoaded(true)
      return
    }

    // Load the script for the first time
    const script = document.createElement('script')
    script.src = 'https://app.cal.com/embed/embed.js'
    script.async = true
    script.onload = () => setCalLoaded(true)
    document.body.appendChild(script)

    // Don't remove the script on cleanup - keep it for other instances
  }, [])

  const openCalendar = () => {
    // On iOS, use Cal.com's native modal
    if (isIOS() && calLoaded && typeof window !== 'undefined' && (window as any).Cal) {
      const Cal = (window as any).Cal
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
    } else {
      // Desktop/Android: show iframe modal
      setShowModal(true)
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      {children({ openCalendar, isLoading: !calLoaded })}

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
