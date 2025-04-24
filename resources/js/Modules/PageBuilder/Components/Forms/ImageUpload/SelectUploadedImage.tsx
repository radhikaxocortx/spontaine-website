import InputText from '@/components/CustomUI/FormFields/InputText'
import FullSpinnerWrapper from '@/components/CustomUI/FullSpinnerWrapper'
import RestPagination from '@/components/CustomUI/RestPagination'
import { handleHttpErrors } from '@/components/ui/alerts'
import { Paginator } from '@/components/ui/ui_interfaces'
import { Image } from '@/Modules/PageBuilder/page_interfaces'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

interface Properties {
  onSelect: (file: Image) => void
}

const SelectUploadedImage = ({ onSelect }: Properties) => {
  const [fileName, setFileName] = useState('')
  const [files, setFiles] = useState<Paginator<Image> | null>(null)
  const [processing, setProcessing] = useState(false)

  const fetchData = useCallback(
    (page = 1) => {
      setProcessing(true)
      axios
        .get(`/image-search?page=${page}&search=${fileName}`)
        .then((result) => setFiles(result.data))
        .catch(handleHttpErrors)
        .finally(() => setProcessing(false))
    },
    [fileName]
  )

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const onNewPageSelect = (page: number) => {
    fetchData(page)
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col'>
        <InputText
          label='Search'
          setValue={setFileName}
          value={fileName}
          preventFormSubmit={true}
        />
      </div>
      <FullSpinnerWrapper processing={processing}>
        <div className='grid grid-cols-2 gap-5 p-5 md:grid-cols-3 lg:grid-cols-4'>
          {files?.data.map((file) => (
            <div
              key={file.id.toString()}
              className='flex cursor-pointer flex-col gap-2 rounded-md bg-neutral-100 shadow hover:bg-neutral-200 hover:shadow-lg'
              onClick={() => onSelect(file)}
            >
              <img
                src={file.url ?? ''}
                alt={file.name}
                className='aspect-[4/3] w-full'
                loading='lazy'
              />
              <div className='p-2'>
                <span>{file.name}</span>
              </div>
            </div>
          ))}
        </div>
        {files != null && (
          <RestPagination
            pagination={files}
            onNewPage={onNewPageSelect}
          />
        )}
      </FullSpinnerWrapper>
    </div>
  )
}

export default SelectUploadedImage
