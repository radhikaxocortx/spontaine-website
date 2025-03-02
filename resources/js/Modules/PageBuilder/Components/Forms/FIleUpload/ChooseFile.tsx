import React, { useState } from 'react'
import Tabs from '../../../ui/Tab/Tabs'
import UploadNewFile from './UploadNewFile'
import SelectUploadedFile from './SelectUploadedFile'
import { UploadedFile } from '../../../DataStructures/data_interfaces'

const uploadNewFile = 'Upload New File'
const selectFile = 'Select File'

const tabItems = [{ value: uploadNewFile }, { value: selectFile }]

interface Properties {
  onFile: (file: UploadedFile) => void
  setListPosition?: React.Dispatch<React.SetStateAction<string>>
  listPosition?: string
}

const ChooseFile = ({ onFile, setListPosition, listPosition }: Properties) => {
  const [selectedTab, setSelectedTab] = useState('Upload New File')

  return (
    <div className='p-2'>
      <div className='w-full'>
        <Tabs
          items={tabItems}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
      {selectedTab == uploadNewFile && (
        <UploadNewFile
          onUpload={onFile}
          setListPosition={setListPosition}
          listPosition={listPosition}
        />
      )}
      {selectedTab === selectFile && (
        <SelectUploadedFile
          onUpload={onFile}
          setListPosition={setListPosition}
          listPosition={listPosition}
        />
      )}
    </div>
  )
}

export default ChooseFile
