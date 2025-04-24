import SelectList from '@/components/CustomUI/FormFields/SelectList'
import SelectUploadedVideo from '@/Modules/PageBuilder/Components/Forms/VideoUpload/SelectUploadedVideo'
import UploadNewVideo from '@/Modules/PageBuilder/Components/Forms/VideoUpload/UploadNewVideo'
import VideoLinkInput from '@/Modules/PageBuilder/Components/Forms/VideoUpload/VideoLinkInput'
import { Video } from '@/Modules/PageBuilder/page_interfaces'
import { useState } from 'react'

const tabItems = [{ value: 'Upload New Video' }, { value: 'Select Video' }, { value: 'Video Link' }]

interface Properties {
  onVideo: (video: Video) => void
}

const ChooseVideo = ({ onVideo }: Properties) => {
  const [selectedTab, setSelectedTab] = useState('Upload New Video')
  return (
    <div className='p-2'>
      <div className='w-full'>
        <SelectList
          list={tabItems}
          value={selectedTab}
          setValue={setSelectedTab}
          dataKey='value'
          displayKey='value'
        />
      </div>
      {selectedTab === 'Upload New Video' && <UploadNewVideo onUpload={onVideo} />}
      {selectedTab === 'Select Video' && <SelectUploadedVideo onSelect={onVideo} />}
      {selectedTab === 'Video Link' && <VideoLinkInput onVideo={onVideo} />}
    </div>
  )
}

export default ChooseVideo
