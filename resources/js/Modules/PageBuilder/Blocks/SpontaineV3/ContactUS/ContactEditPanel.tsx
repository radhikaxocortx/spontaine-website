import type { Language } from '@/components/ui/ui_interfaces'
import type { Dispatch } from 'react'
import type { BlocKFieldInfo } from '../../../Components/BlockEditor/BlockEditor'
import EditLabel from '../../../Components/EditLabel'
import Localization from '../../../Components/Localization'
import V3ColorControls from '../../../Components/V3ColorControls'
import V3RoundedTopToggle from '../../../Components/V3RoundedTopToggle'
import type { PageBuilderAction } from '../../../hooks/pageBuilderService'
import type { ContactUsBlockInterface } from './types'

interface ContactEditPanelProps {
  blockData?: ContactUsBlockInterface
  dispatch?: Dispatch<PageBuilderAction>
  language: Language
  onFieldEdit?: (field: BlocKFieldInfo) => void
}

const ContactEditPanel = ({
  blockData,
  dispatch,
  language,
  onFieldEdit,
}: ContactEditPanelProps) => (
  <div className='rounded-lg bg-spontaine-surface-paper p-4 shadow-surface lg:col-span-2'>
    <div className='flex flex-wrap gap-4'>
      {onFieldEdit && (
        <>
          <div className='flex items-center gap-2'>
            <p className='m-0 text-sm font-medium text-spontaine-text-primary'>Mail Subject:</p>
            <p className='m-0 text-sm text-spontaine-text-secondary'>
              <Localization
                language={language}
                text={blockData?.mailSubject}
              />
            </p>
            <EditLabel
              label='Edit Mail Subject'
              onClick={() =>
                onFieldEdit({
                  action: 'INSERT',
                  field: 'mailSubject',
                  fieldType: 'text',
                  oldValue: blockData?.mailSubject,
                })
              }
            />
          </div>
          <div className='flex items-center gap-2'>
            <p className='m-0 text-sm font-medium text-spontaine-text-primary'>Receiver Email:</p>
            <p className='m-0 text-sm text-spontaine-text-secondary'>
              <Localization
                language={language}
                text={blockData?.receiverMail}
              />
            </p>
            <EditLabel
              label='Edit Mail Address'
              onClick={() =>
                onFieldEdit({
                  action: 'INSERT',
                  field: 'receiverMail',
                  fieldType: 'text',
                  oldValue: blockData?.receiverMail,
                })
              }
            />
          </div>
        </>
      )}
      {dispatch && blockData?.id != null && (
        <div className='flex items-center gap-2'>
          <p className='m-0 text-sm font-medium text-spontaine-text-primary'>Section Shape:</p>
          <V3RoundedTopToggle
            blockId={blockData.id}
            dispatch={dispatch}
            language={language}
            overlapTop={blockData.overlapTop}
            roundedTop={blockData.roundedTop}
          />
        </div>
      )}
      <V3ColorControls
        backgroundColor={blockData?.backgroundColor}
        descriptionColor={blockData?.descriptionColor}
        eyebrowColor={blockData?.eyebrowColor}
        onFieldEdit={onFieldEdit}
        textColor={blockData?.textColor}
        titleOneColor={blockData?.titleOneColor}
        titleTwoColor={blockData?.titleTwoColor}
      />
    </div>
  </div>
)

export default ContactEditPanel
