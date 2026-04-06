import ActionButton from '@/components/CustomUI/FormFields/ActionButton'
import InputText from '@/components/CustomUI/FormFields/InputText'
import Modal from '@/components/CustomUI/Modal/Modal'
import LaravelInputError from '@/components/LaravelInputError'
import { FormEvent } from 'react'

interface TypeOption {
  value: 'document' | 'image' | 'video'
  label: string
}

interface ValidationErrors {
  name?: string
  type?: string
  file?: string
}

interface UploadMediaFormProps {
  showModal: boolean
  processing: boolean
  typeOptions: TypeOption[]
  uploadType: 'document' | 'image' | 'video'
  name: string
  errors: ValidationErrors
  onUploadTypeChange: (value: 'document' | 'image' | 'video') => void
  onNameChange: (value: string) => void
  onFileChange: (file: File | null) => void
  onClose: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const UploadMediaForm = ({
  showModal,
  processing,
  typeOptions,
  uploadType,
  name,
  errors,
  onUploadTypeChange,
  onNameChange,
  onFileChange,
  onClose,
  onSubmit,
}: UploadMediaFormProps) => {
  if (!showModal) {
    return null
  }

  return (
    <Modal
      setShowModal={(show) => {
        if (!show) {
          onClose()
        }
      }}
      title='Upload Media'
    >
      <form
        onSubmit={onSubmit}
        className='space-y-3'
      >
        <div className='flex w-full flex-col p-2'>
          <label className='mb-2 text-sm font-medium'>Type</label>
          <select
            value={uploadType}
            onChange={(event) =>
              onUploadTypeChange(event.target.value as 'document' | 'image' | 'video')
            }
            className='select select-bordered select-sm w-full'
          >
            {typeOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
          <LaravelInputError
            message={errors.type}
            className='mt-2'
          />
        </div>

        <div className='flex w-full flex-col p-2'>
          <InputText
            label='Name'
            value={name}
            setValue={onNameChange}
          />
          <LaravelInputError
            message={errors.name}
            className='mt-2'
          />
        </div>

        <div className='flex w-full flex-col p-2'>
          <label className='mb-2 text-sm font-medium'>File</label>
          <input
            type='file'
            onChange={(event) => onFileChange(event.target.files?.[0] || null)}
            className='file-input file-input-bordered file-input-sm w-full'
          />
          <LaravelInputError
            message={errors.file}
            className='mt-2'
          />
        </div>

        <div className='flex w-full justify-end gap-2 p-2'>
          <ActionButton
            type='button'
            label='CANCEL'
            variant='outline'
            onClick={() => onClose()}
          />
          <ActionButton
            type='submit'
            label={processing ? 'UPLOADING...' : 'UPLOAD'}
            disabled={processing}
          />
        </div>
      </form>
    </Modal>
  )
}

export default UploadMediaForm
