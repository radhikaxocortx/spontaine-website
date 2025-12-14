import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface OverlayEditModalProps {
  show: boolean
  onClose: () => void
  currentColor?: string
  currentOpacity?: number
  onSave: (data: { overlayColor: string; overlayOpacity: number }) => void
}

export const OverlayEditModal = ({
  show,
  onClose,
  currentColor = '#000000',
  currentOpacity = 0,
  onSave,
}: OverlayEditModalProps) => {
  const [tempOverlayColor, setTempOverlayColor] = useState(currentColor)
  const [tempOverlayOpacity, setTempOverlayOpacity] = useState(currentOpacity)

  // Update temp values when modal opens with new props
  useState(() => {
    if (show) {
      setTempOverlayColor(currentColor)
      setTempOverlayOpacity(currentOpacity)
    }
  })

  const handleSave = () => {
    onSave({
      overlayColor: tempOverlayColor,
      overlayOpacity: tempOverlayOpacity,
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

        <h3 className='mb-6 text-2xl font-semibold'>Edit Overlay</h3>

        {/* Overlay Settings */}
        <div>
          <h4 className='mb-4 text-lg font-semibold'>Overlay Settings</h4>

          {/* Overlay Color */}
          <div className='mb-4'>
            <label className='mb-2 block text-sm font-medium text-gray-700'>Overlay Color</label>
            <div className='flex gap-2'>
              <input
                type='color'
                value={tempOverlayColor}
                onChange={(e) => setTempOverlayColor(e.target.value)}
                className='h-12 w-20 cursor-pointer rounded border border-gray-300'
              />
              <input
                type='text'
                value={tempOverlayColor}
                onChange={(e) => setTempOverlayColor(e.target.value)}
                placeholder='#ffffff'
                className='flex-1 rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>

          {/* Overlay Opacity */}
          <div className='mb-4'>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              Overlay Opacity: {tempOverlayOpacity}%
            </label>
            <input
              type='range'
              min='0'
              max='100'
              value={tempOverlayOpacity}
              onChange={(e) => setTempOverlayOpacity(Number(e.target.value))}
              className='w-full'
            />
          </div>
        </div>

        {/* Save Button */}
        <div className='mt-6 flex gap-2'>
          <Button
            onClick={handleSave}
            className='flex-1'
          >
            Save Settings
          </Button>
          <Button
            onClick={onClose}
            variant='outline'
            className='flex-1'
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
