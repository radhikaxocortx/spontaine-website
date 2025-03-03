import InputText from '@/Components/CustomUI/FormFields/InputText'
import FullSpinnerWrapper from '@/Components/CustomUI/FullSpinnerWrapper'
import RestPagination from '@/Components/CustomUI/RestPagination'
import { handleHttpErrors } from '@/Components/ui/alerts'
import { Paginator } from '@/Components/ui/ui_interfaces'
import { Video } from '@/Modules/PageBuilder/page_interfaces'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

interface Properties {
  onSelect: (file: Video) => void
}

const SelectUploadedVideo = ({ onSelect }: Properties) => {
  const [fileName, setFileName] = useState('')
  const [files, setFiles] = useState<Paginator<Video> | null>(null)
  const [processing, setProcessing] = useState(false)

  const fetchData = useCallback(
    (page = 1) => {
      setProcessing(true)
      axios
        .get(`/video-search?page=${page}&search=${fileName}`)
        .then((result) => setFiles(result.data))
        .catch(handleHttpErrors)
        .finally(() => setProcessing(false))
    },
    [fileName]
  )

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const onNewPage = (page: number) => {
    fetchData(page)
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col'>
        <InputText
          label='Search'
          setValue={setFileName}
          value={fileName}
        />
      </div>
      <FullSpinnerWrapper processing={processing}>
        <div className='grid grid-cols-2 gap-5 p-5 md:grid-cols-3 lg:grid-cols-4'>
          {files?.data.map((file) => (
            <div
              key={file.id.toString()}
              className='flex cursor-pointer gap-2 rounded-md bg-neutral-600 px-5 py-3 shadow hover:bg-neutral-500 hover:shadow-lg'
              onClick={() => onSelect(file)}
            >
              <video
                className='aspect-video w-full'
                controls
              >
                <source
                  src={file.url ?? ''}
                  type={file.mime}
                />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
        {files != null && (
          <RestPagination
            pagination={files}
            onNewPage={onNewPage}
          />
        )}
      </FullSpinnerWrapper>
    </div>
  )
}

export default SelectUploadedVideo
