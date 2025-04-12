import { Video } from '@/Modules/PageBuilder/page_interfaces'
import { useState } from 'react'

interface Properties {
  onVideo: (video: Video) => void
}

const VideoLinkInput = ({ onVideo }: Properties) => {
  const [videoUrl, setVideoUrl] = useState('')
  const [mimeType, setMimeType] = useState('video/mp4')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (videoUrl) {
      onVideo({
        url: videoUrl,
        mime: mimeType,
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 p-4'
    >
      <div className='flex flex-col gap-2'>
        <label
          htmlFor='videoUrl'
          className='text-sm font-medium text-gray-700'
        >
          Video URL
        </label>
        <input
          type='url'
          id='videoUrl'
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className='rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500'
          placeholder='https://example.com/video.mp4'
          required
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label
          htmlFor='mimeType'
          className='text-sm font-medium text-gray-700'
        >
          MIME Type
        </label>
        <select
          id='mimeType'
          value={mimeType}
          onChange={(e) => setMimeType(e.target.value)}
          className='rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500'
        >
          <option value='video/mp4'>MP4</option>
          <option value='video/webm'>WebM</option>
          <option value='video/ogg'>Ogg</option>
        </select>
      </div>
      <button
        type='submit'
        className='rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
      >
        Use Video Link
      </button>
    </form>
  )
}

export default VideoLinkInput
