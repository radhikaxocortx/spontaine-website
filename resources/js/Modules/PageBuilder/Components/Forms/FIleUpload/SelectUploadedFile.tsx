import React, { useCallback, useEffect, useState } from 'react'
import Input from '../../../ui/form/Input'
import axios from 'axios'
import { handleHttpErrors } from '../../../ui/alerts'
import { UploadedFile } from '../../../DataStructures/data_interfaces'
import FullSpinnerWrapper from '../../../ui/FullSpinnerWrapper'
import { getDisplayDate } from '../../../libs/dates'
import { Paginator } from '../../../ui/ui_interfaces'
import RestPagination from '../../../ui/table/RestPagination'
import NumberInput from '../../../ui/form/NumberInput'

interface Properties {
  onUpload: (file: UploadedFile) => void
  setListPosition?: React.Dispatch<React.SetStateAction<string>>
  listPosition?: string
}

const SelectUploadedFile = ({ onUpload, setListPosition, listPosition }: Properties) => {
  const [fileName, setFileName] = useState('')
  const [files, setFiles] = useState<Paginator<UploadedFile> | null>(null)
  const [processing, setProcessing] = useState(false)

  const fetchData = useCallback(
    (page = 1) => {
      setProcessing(true)
      axios
        .get(`/file-search?page=${page}&search=${fileName}`)
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
        <Input
          label='Search'
          setData={setFileName}
          data={fileName}
        />
      </div>
      <FullSpinnerWrapper processing={processing}>
        <div className='grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-4'>
          {files?.data.map((file) => (
            <div
              key={file.id}
              onClick={() => onUpload(file)}
              className='flex cursor-pointer gap-2 rounded-md bg-neutral-600 px-5 py-3 shadow hover:bg-neutral-500 hover:shadow-lg'
            >
              <div className='flex flex-grow flex-col gap-2'>
                <div className='flex flex-row gap-2'>
                  <span className='text-xl'>{file.name}</span>
                </div>
                <div className='flex flex-row gap-2'>
                  <span className='text-sm'>Uploaded At</span>
                  <span className='text-sm font-bold'>{getDisplayDate(file.created_at)}</span>
                </div>
              </div>
            </div>
          ))}
          {setListPosition && (
            <div className='flex flex-col'>
              <NumberInput
                min={0}
                setData={setListPosition}
                data={listPosition}
                label='Ordering Priority'
              />
            </div>
          )}
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

export default SelectUploadedFile
