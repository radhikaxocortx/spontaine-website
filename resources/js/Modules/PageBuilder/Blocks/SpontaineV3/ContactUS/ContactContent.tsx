import type { Language } from '@/components/ui/ui_interfaces'
import AddLabel from '../../../Components/AddLabel'
import type { BlocKFieldInfo } from '../../../Components/BlockEditor/BlockEditor'
import EditLabel from '../../../Components/EditLabel'
import Localization from '../../../Components/Localization'
import type { ContactSectionModel } from './useContactSectionModel'
import type { ContactUsBlockInterface } from './types'

interface ContactContentProps {
  blockData?: ContactUsBlockInterface
  editMode: boolean
  language: Language
  model: ContactSectionModel
  onFieldEdit?: (field: BlocKFieldInfo) => void
}

const ContactContent = ({
  blockData,
  editMode,
  language,
  model,
  onFieldEdit,
}: ContactContentProps) => (
  <div
    className='flex flex-col items-start'
    style={model.contentTextStyle}
  >
    <div
      data-v3-contact-reveal
      className='mb-5'
    >
      <p
        className={`eyebrow ${model.eyebrowColor ? 'text-[inherit]' : 'text-spontaine-gray-cool'}`}
        style={model.eyebrowStyle}
      >
        <Localization
          language={language}
          text={
            blockData?.eyebrow || {
              english: 'Talk to the founding team',
              malayalam: 'Talk to the founding team',
            }
          }
        />
      </p>
      {editMode && onFieldEdit && (
        <EditLabel
          label='Edit Eyebrow'
          onClick={() =>
            onFieldEdit({
              action: 'INSERT',
              field: 'eyebrow',
              fieldType: 'text',
              oldValue: blockData?.eyebrow,
            })
          }
        />
      )}
    </div>

    <div
      data-v3-contact-reveal
      className='space-y-3'
    >
      <h2
        className={`font-display text-4xl font-bold leading-[0.95] tracking-[-0.06em] md:text-5xl ${model.textColor ? 'text-[inherit]' : 'text-spontaine-text-primary'}`}
      >
        <strong
          className='block font-bold leading-[inherit] tracking-[inherit] text-[inherit]'
          style={model.titleOneStyle}
        >
          <Localization
            language={language}
            text={
              blockData?.titleOne ||
              blockData?.title || {
                english: 'Send a message.',
                malayalam: 'Send a message.',
              }
            }
          />
        </strong>
        <strong
          className={`block font-bold leading-[inherit] tracking-[inherit] ${model.titleTwoColor ? 'text-[inherit]' : 'text-spontaine-text-accent-dark'}`}
          style={model.titleTwoStyle}
        >
          <Localization
            language={language}
            text={
              blockData?.titleTwo || {
                english: 'A person reads every one.',
                malayalam: 'A person reads every one.',
              }
            }
          />
        </strong>
      </h2>

      {editMode && onFieldEdit && (
        <div className='flex flex-wrap gap-2'>
          <EditLabel
            label='Edit Title Line 1'
            onClick={() =>
              onFieldEdit({
                action: 'UPDATE',
                field: 'titleOne',
                fieldType: 'text',
                oldValue: blockData?.titleOne ??
                  blockData?.title ?? {
                    english: 'Send a message.',
                    malayalam: 'Send a message.',
                  },
              })
            }
          />
          <EditLabel
            label='Edit Title Line 2'
            onClick={() =>
              onFieldEdit({
                action: 'UPDATE',
                field: 'titleTwo',
                fieldType: 'text',
                oldValue: blockData?.titleTwo ?? {
                  english: 'A person reads every one.',
                  malayalam: 'A person reads every one.',
                },
              })
            }
          />
        </div>
      )}
    </div>

    <div
      data-v3-contact-reveal
      className={`mt-6 max-w-[420px] space-y-2 font-body text-base leading-[1.52] ${model.descriptionColor ? 'text-[inherit]' : 'text-spontaine-text-secondary'}`}
      style={model.descriptionStyle}
    >
      {blockData?.description?.items.map((item) => (
        <p
          key={item.id.toString()}
          className='m-0'
        >
          <Localization
            text={item.item}
            language={language}
          />
          {editMode && onFieldEdit && (
            <EditLabel
              onClick={() => {
                onFieldEdit({
                  field: 'description',
                  fieldType: 'textItems',
                  oldValue: item.item,
                  action: 'UPDATE',
                  itemIndex: item.id,
                })
              }}
            />
          )}
        </p>
      )) || (
        <p className='m-0'>
          No ticket queue, no auto-reply. Tell us what you&apos;re working on and someone from the
          team gets back to you directly.
        </p>
      )}
      {editMode && onFieldEdit && (
        <AddLabel
          onClick={() => {
            onFieldEdit({
              field: 'description',
              fieldType: 'textItems',
              oldValue: null,
              action: 'INSERT',
            })
          }}
          label='Add Description Line'
        />
      )}
    </div>
  </div>
)

export default ContactContent
