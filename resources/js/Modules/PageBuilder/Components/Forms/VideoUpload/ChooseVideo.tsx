import { Video } from '../../../DataStructures/data_interfaces'
import { useState } from 'react'
import Tabs from '../../../ui/Tab/Tabs'
import UploadNewVideo from './UploadNewVideo'
import SelectUploadedVideo from './SelectUploadedVideo'

const tabItems = [{ value: 'Upload New Video' }, { value: 'Select Video' }]

interface Properties {
  onVideo: (video: Video) => void
}

const ChooseVideo = ({ onVideo }: Properties) => {
  const [selectedTab, setSelectedTab] = useState('Upload New Video')
  return (
    <div className='p-2'>
      <div className='w-full'>
        <Tabs
          items={tabItems}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
      {selectedTab == 'Upload New Video' && <UploadNewVideo onUpload={onVideo} />}
      {selectedTab === 'Select Video' && <SelectUploadedVideo onSelect={onVideo} />}
    </div>
  )
}

export default ChooseVideo
