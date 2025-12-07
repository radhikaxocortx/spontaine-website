import ActionButton from '@/components/CustomUI/FormFields/ActionButton'
import InputCheckBox from '@/components/CustomUI/FormFields/InputCheckBox'
import InputDescription from '@/components/CustomUI/FormFields/InputDescription'
import InputText from '@/components/CustomUI/FormFields/InputText'
import { handleHttpErrors, showError } from '@/components/ui/alerts'
import { LinkData, NavLinkMedia } from '@/Modules/PageBuilder/page_interfaces'
import axios from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface Properties {
  onLink: (data: LinkData | null) => void
  data?: LinkData
  showRemove?: boolean
}

const NavLinkForm = ({ onLink, data, showRemove = false }: Properties) => {
  const [linkName, setLinkName] = useState('')
  const [malayalamName, setMalayalamName] = useState('')
  const [link, setLink] = useState('')
  const [external, setExternal] = useState(false)

  const [descEn, setDescEn] = useState('')
  const [descMl, setDescMl] = useState('')

  const [mediaType, setMediaType] = useState<'image' | 'video' | ''>('')
  const [mediaSource, setMediaSource] = useState<'upload' | 'url' | ''>('')
  const [mediaUrl, setMediaUrl] = useState('')
  const [uploading, setUploading] = useState(false)

  const initialMedia = useMemo<NavLinkMedia | null>(() => data?.media ?? null, [data])

  useEffect(() => {
    if (!data) return
    setLink(data.link ?? '')
    setLinkName(data.name.english ?? '')
    setMalayalamName(data.name.malayalam ?? '')
    setExternal(!!data.external)

    setDescEn(data.description?.english ?? '')
    setDescMl(data.description?.malayalam ?? '')

    if (initialMedia) {
      const t =
        initialMedia.type === 'image' || initialMedia.type === 'video' ? initialMedia.type : ''
      const s =
        initialMedia.source === 'upload' || initialMedia.source === 'url' ? initialMedia.source : ''
      setMediaType(t as 'image' | 'video' | '')
      setMediaSource(s as 'upload' | 'url' | '')
      setMediaUrl(initialMedia.pathOrUrl ?? '')
    }
  }, [data, initialMedia])

  const doUpload = useCallback(
    (file: File) => {
      if (!file) return
      const t = mediaType || 'image'
      setUploading(true)
      const form = new FormData()
      form.append('type', t)
      form.append('file', file)
      axios
        .post('/nav/media-upload', form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          if (res.data?.created && res.data?.record?.url) {
            setMediaUrl(res.data.record.url)
            setMediaSource('upload')
            return
          }
          showError(res.data?.message ?? 'Upload failed')
        })
        .catch(handleHttpErrors)
        .finally(() => setUploading(false))
    },
    [mediaType]
  )

  const onSubmit = useCallback(() => {
    const payload: LinkData = {
      name: { english: linkName, malayalam: malayalamName },
      link,
      external,
      description: { english: descEn || null, malayalam: descMl || null },
      media:
        mediaType && mediaSource && mediaUrl
          ? { type: mediaType, source: mediaSource, pathOrUrl: mediaUrl }
          : undefined,
    }
    onLink(payload)
  }, [
    linkName,
    malayalamName,
    link,
    external,
    descEn,
    descMl,
    mediaType,
    mediaSource,
    mediaUrl,
    onLink,
  ])

  return (
    <div className='space-y-3'>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
        <InputText
          label='English Name'
          value={linkName}
          setValue={setLinkName}
        />
        <InputText
          label='Name (Alternate Language)'
          value={malayalamName}
          setValue={setMalayalamName}
        />
      </div>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
        <InputText
          label='Link'
          value={link}
          setValue={setLink}
        />
        <InputCheckBox
          label='Link To Another Website'
          value={external}
          toggleValue={() => setExternal((v) => !v)}
        />
      </div>

      <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
        <InputDescription
          label='Description (English)'
          value={descEn}
          setValue={setDescEn}
        />
        <InputDescription
          label='Description (Alternate Language)'
          value={descMl}
          setValue={setDescMl}
        />
      </div>

      <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
        <div className='flex items-center gap-3'>
          <label className='text-sm font-medium'>Media Type</label>
          <select
            className='select select-bordered select-sm'
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value as 'image' | 'video' | '')}
          >
            <option value=''>None</option>
            <option value='image'>Image</option>
            <option value='video'>Video</option>
          </select>
        </div>
        <div className='flex items-center gap-3'>
          <label className='text-sm font-medium'>Source</label>
          <select
            className='select select-bordered select-sm'
            value={mediaSource}
            onChange={(e) => setMediaSource(e.target.value as 'upload' | 'url' | '')}
          >
            <option value=''>None</option>
            <option value='upload'>Upload</option>
            <option value='url'>External URL</option>
          </select>
        </div>
        {mediaSource === 'url' && (
          <InputText
            label='Media URL'
            value={mediaUrl}
            setValue={setMediaUrl}
          />
        )}
      </div>

      {mediaSource === 'upload' && (
        <div className='flex items-center gap-3'>
          <input
            type='file'
            accept={mediaType === 'image' ? 'image/*' : 'video/*'}
            onChange={(e) => e.target.files && doUpload(e.target.files[0])}
          />
          {uploading && <span className='text-xs text-gray-500'>Uploading…</span>}
        </div>
      )}

      {mediaUrl && (
        <div className='mt-2'>
          {mediaType === 'image' ? (
            <img
              src={mediaUrl}
              alt='nav media'
              className='h-24 w-40 rounded-md border object-cover'
            />
          ) : (
            <video
              src={mediaUrl}
              className='h-24 w-40 rounded-md border'
              muted
              controls={false}
            />
          )}
        </div>
      )}

      <div className='flex w-full justify-end gap-2'>
        <ActionButton
          label={data == null ? 'ADD' : 'UPDATE'}
          onClick={onSubmit}
        />
        {showRemove && (
          <ActionButton
            label='REMOVE'
            variant='destructive'
            onClick={() => onLink(null)}
          />
        )}
      </div>
    </div>
  )
}

export default NavLinkForm
