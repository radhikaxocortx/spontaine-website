import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { XIcon } from 'lucide-react'
import { ChangeEvent } from 'react'

export interface Props {
  file?: File | null
  label?: string
  error?: string
  styles?: string
  setValue: (value: File | null) => unknown
  accept?: string
}

function fileSizeInMB(sizeInBytes?: number): string {
  return ((sizeInBytes ?? 0) / (1024 * 1024)).toFixed(2)
}

export default function FileInput({ file, label, error, setValue, accept }: Props) {
  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setValue(e.target.files[0])
    }
  }

  return (
    <div className='space-y-2'>
      {!file ? (
        <div className='space-y-1'>
          {label && <Label className='text-sm font-medium'>{label}</Label>}
          <Input
            type='file'
            onChange={onFile}
            accept={accept}
            className='cursor-pointer'
          />
          {error && <p className='text-sm text-red-500'>{error}</p>}
        </div>
      ) : (
        <div className='flex flex-col items-center space-y-2 rounded-lg border p-4 text-center'>
          <p className='font-medium'>{file.name}</p>
          <p className='text-sm text-gray-500'>{fileSizeInMB(file.size)} MB</p>
          <p className='text-sm text-gray-500'>{file.type}</p>
          <Button
            variant='destructive'
            size='sm'
            onClick={() => setValue(null)}
            className='flex items-center gap-1'
          >
            <XIcon size={16} />
            Remove File
          </Button>
        </div>
      )}
    </div>
  )
}
