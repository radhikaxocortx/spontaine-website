import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { BlocKFieldInfo } from '../Components/BlockEditor/BlockEditor'
import EditLabel from '../Components/EditLabel'
import { BlockConfiguration, BlockVideo } from '../page_interfaces'

export interface VideoImageBlock extends BlockConfiguration {
  id?: number
  video: BlockVideo
}

interface Properties {
  blockData?: VideoImageBlock
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
}

export const videoBlock: VideoImageBlock = {
  video: {
    url: 'https://cdn.web.imagine.art/imagine-dashboard/video-dashboard/videos/248_hd.mp4',
    mime: 'video/mp4',
  },
}

const SectionVideo = ({ editMode = false, blockData = videoBlock, onFieldEdit }: Properties) => {
  return (
    <div
      className={`flex w-full items-center justify-center py-2 ${blockData.marginTop} ${blockData.marginBottom} ${blockData.paddingTop} ${blockData.paddingBottom}`}
    >
      <AppLayoutPadding>
        <div className='overflow-hidden rounded-3xl text-opacity-95 shadow-lg'>
          {blockData.video?.url && (
            <video
              key={blockData.video.url}
              autoPlay
              muted
              loop
              playsInline
              className='h-full w-full object-cover'
              controls={editMode}
            >
              <source
                src={blockData.video.url}
                type={blockData.video.mime}
              />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        {editMode && onFieldEdit != null && (
          <EditLabel
            label='Edit Video'
            onClick={() =>
              onFieldEdit({
                field: 'video',
                fieldType: 'video',
                oldValue: blockData.video,
                action: 'INSERT',
              })
            }
          />
        )}
      </AppLayoutPadding>
    </div>
  )
}

export default SectionVideo
