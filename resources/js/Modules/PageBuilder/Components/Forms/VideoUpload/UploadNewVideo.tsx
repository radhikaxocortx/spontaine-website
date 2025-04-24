import ActionButton from '@/components/CustomUI/FormFields/ActionButton'
import FileInput from '@/components/CustomUI/FormFields/FileInput'
import InputText from '@/components/CustomUI/FormFields/InputText'
import { handleHttpErrors, showError } from '@/components/ui/alerts'
import { CreateResponse, Image, Video } from '@/Modules/PageBuilder/page_interfaces'
import axios from 'axios'
import { useCallback, useState } from 'react'

interface Properties {
  onUpload: (file: Video) => void
}

const UploadNewVideo = ({ onUpload }: Properties) => {
  const [processing, setProcessing] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState('')

  const uploadFile = useCallback(() => {
    setProcessing(true)
    axios
      .post(
        '/video-upload',
        {
          video: file,
          name: fileName,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((result: CreateResponse<Image>) => {
        console.log(result.data)
        if (result.data.created && result.data.record != null) {
          onUpload(result.data.record)
          return
        }
        showError(result.data.message)
      })
      .catch(handleHttpErrors)
      .finally(() => setProcessing(false))
  }, [fileName, file, onUpload])

  return (
    <div className='mt-5 flex flex-col gap-5'>
      <div className='flex flex-col'>
        <InputText
          label='Video Name'
          value={fileName}
          setValue={setFileName}
        />
      </div>
      <div className='flex flex-col'>
        <FileInput setValue={setFile} />
      </div>
      <div className='flex'>
        <ActionButton
          label='UPLOAD'
          processing={processing}
          onClick={uploadFile}
        />
      </div>
    </div>
  )
}

export default UploadNewVideo
