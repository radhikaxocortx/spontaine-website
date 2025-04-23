import SelectList from '@/components/CustomUI/FormFields/SelectList'
import { Image } from '@/Modules/PageBuilder/page_interfaces'
import { useState } from 'react'
import SelectUploadedImage from './SelectUploadedImage'
import UploadNewImage from './UploadNewImage'

const tabItems = [{ value: 'Upload New Image' }, { value: 'Select File' }]

interface Properties {
  onImage: (file: Image) => void
}

const ChooseImage = ({ onImage }: Properties) => {
  const [selectedTab, setSelectedTab] = useState('Upload New Image')

  return (
    <div className='p-2'>
      <div className='w-full'>
        <SelectList
          setValue={setSelectedTab}
          list={tabItems}
          dataKey='value'
          displayKey='value'
          value={selectedTab}
        />
      </div>
      {selectedTab == 'Upload New Image' && <UploadNewImage onUpload={onImage} />}
      {selectedTab === 'Select File' && <SelectUploadedImage onSelect={onImage} />}
    </div>
  )
}

export default ChooseImage
