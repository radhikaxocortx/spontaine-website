import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { LinkData } from '../page_interfaces'

const defaultCalendarPath = 'intuonfx/30min'

interface CTAEditModalProps {
  show: boolean
  onClose: () => void
  currentCTA?: LinkData | null
  currentCalendarUrl?: string | null
  onSave: (data: { cta?: LinkData | null; calendarUrl?: string | null }) => void
}

export const CTAEditModal = ({
  show,
  onClose,
  currentCTA,
  currentCalendarUrl,
  onSave,
}: CTAEditModalProps) => {
  const [ctaEnglishName, setCtaEnglishName] = useState('')
  const [ctaMalayalamName, setCtaMalayalamName] = useState('')
  const [ctaLink, setCtaLink] = useState('')
  const [ctaExternal, setCtaExternal] = useState(false)
  const [ctaIsCalendar, setCtaIsCalendar] = useState(false)

  useEffect(() => {
    if (show) {
      if (currentCalendarUrl) {
        setCtaEnglishName(currentCTA?.name?.english || 'Book Demo')
        setCtaMalayalamName(currentCTA?.name?.malayalam || '')
        setCtaLink(currentCalendarUrl)
        setCtaExternal(false)
        setCtaIsCalendar(true)
      } else if (currentCTA) {
        setCtaEnglishName(currentCTA.name?.english || '')
        setCtaMalayalamName(currentCTA.name?.malayalam || '')
        setCtaLink(currentCTA.link || '')
        setCtaExternal(currentCTA.external || false)
        setCtaIsCalendar(false)
      } else {
        setCtaEnglishName('Get Started')
        setCtaMalayalamName('')
        setCtaLink('')
        setCtaExternal(false)
        setCtaIsCalendar(false)
      }
    }
  }, [currentCTA, currentCalendarUrl, show])

  const handleSave = () => {
    if (ctaIsCalendar) {
      onSave({
        calendarUrl: ctaLink.trim() || defaultCalendarPath,
        cta: {
          name: {
            english: ctaEnglishName || 'Book Demo',
            malayalam: ctaMalayalamName || null,
          },
          link: ctaLink.trim() || defaultCalendarPath,
          external: false,
        },
      })
    } else {
      onSave({
        cta: {
          name: {
            english: ctaEnglishName || 'Get Started',
            malayalam: ctaMalayalamName || null,
          },
          link: ctaLink || '',
          external: ctaExternal,
        },
        calendarUrl: null,
      })
    }
    onClose()
  }

  const handleRemove = () => {
    onSave({
      cta: null,
      calendarUrl: null,
    })
    onClose()
  }

  if (!show) return null

  return (
    <div
      className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm'
      onClick={onClose}
    >
      <div
        className='relative w-[95%] max-w-2xl overflow-hidden rounded-2xl bg-white p-6 shadow-2xl'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute right-4 top-4 z-10 rounded-full bg-gray-100 p-1 text-2xl text-gray-600 hover:bg-gray-200 hover:text-gray-800'
        >
          ×
        </button>

        <h3 className='mb-6 text-2xl font-semibold'>Edit CTA Button</h3>

        <div className='space-y-4'>
          {/* English Name */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              Button Text (English)
            </label>
            <input
              type='text'
              value={ctaEnglishName}
              onChange={(e) => setCtaEnglishName(e.target.value)}
              placeholder='Get Started'
              className='w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Malayalam Name */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              Button Text (Malayalam)
            </label>
            <input
              type='text'
              value={ctaMalayalamName}
              onChange={(e) => setCtaMalayalamName(e.target.value)}
              placeholder='ആരംഭിക്കുക'
              className='w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Link */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              {ctaIsCalendar ? 'Cal.com Event Path' : 'Link URL'}
            </label>
            <input
              type='text'
              value={ctaLink}
              onChange={(e) => setCtaLink(e.target.value)}
              placeholder={ctaIsCalendar ? defaultCalendarPath : 'https://example.com or /about'}
              className='w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {ctaIsCalendar && (
              <p className='mt-2 text-sm text-gray-500'>
                Enter the Cal.com path only, for example {defaultCalendarPath}. Do not include
                https://cal.com/.
              </p>
            )}
          </div>

          {/* Is Calendar Link Checkbox */}
          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              id='cta-is-calendar'
              checked={ctaIsCalendar}
              onChange={(e) => {
                setCtaIsCalendar(e.target.checked)
                if (e.target.checked) {
                  setCtaExternal(false)
                  setCtaLink((currentLink) => currentLink.trim() || defaultCalendarPath)
                }
              }}
              className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500'
            />
            <label
              htmlFor='cta-is-calendar'
              className='text-sm font-medium text-gray-700'
            >
              This is a Cal.com calendar link
            </label>
          </div>

          {/* External Link Checkbox (only show if not calendar) */}
          {!ctaIsCalendar && (
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='cta-external'
                checked={ctaExternal}
                onChange={(e) => setCtaExternal(e.target.checked)}
                className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500'
              />
              <label
                htmlFor='cta-external'
                className='text-sm font-medium text-gray-700'
              >
                Link for other websites (opens in new tab)
              </label>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className='mt-6 flex flex-col gap-2 sm:flex-row'>
          <Button
            onClick={handleSave}
            className='flex-1'
          >
            Save CTA
          </Button>
          <Button
            onClick={onClose}
            variant='outline'
            className='flex-1'
          >
            Cancel
          </Button>
          <Button
            onClick={handleRemove}
            variant='destructive'
            className='flex-1'
          >
            Remove CTA
          </Button>
        </div>
      </div>
    </div>
  )
}
