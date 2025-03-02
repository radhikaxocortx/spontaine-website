import { useCallback, useState } from 'react'
import ImagePickButton from '../../../ui/button/ImagePickButton'
import Modal from '../../../ui/modal/Modal'
import ChooseImage from '../../Common/ImageUpload/ChooseImage'
import { Image } from '../../../DataStructures/data_interfaces'

interface Properties {
  imageUrl: string
  onChange: (value: string) => void
  error?: string
  label: string
}

const ImageInput = ({ imageUrl, onChange, error, label }: Properties) => {
  const [showImageUpload, setShowImageUpload] = useState(false)

  const onImage = useCallback(
    (file: Image | null) => {
      setShowImageUpload(false)
      if (file == null || file.url == null) {
        onChange('')
        return
      }
      onChange(file.url)
    },
    [onChange]
  )

  return (
    <>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-start gap-5'>
          <span>{label}</span>
          <ImagePickButton onClick={() => setShowImageUpload(true)} />
          <div className='flex flex-col gap-3'>
            {imageUrl != '' && (
              <img
                className='h-12 w-12 rounded-full'
                src={imageUrl}
                alt={''}
                loading='lazy'
              />
            )}
          </div>
        </div>
        {error && <span className='text-red-500'>{error}</span>}
      </div>
      {showImageUpload && (
        <Modal
          setShowModal={setShowImageUpload}
          title='Add Image'
          large
        >
          <ChooseImage onImage={onImage} />
        </Modal>
      )}
    </>
  )
}

export default ImageInput
