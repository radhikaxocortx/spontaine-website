import FullSpinner from '@/components/CustomUI/FullSpinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Language } from '@/components/ui/ui_interfaces'
import React from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import useCustomForm from '../../../hooks/useCustomForm'
import useInertiaPost from '../../../hooks/useInertiaPost'
import AddLabel from '../Components/AddLabel'
import type { BlocKFieldInfo } from '../Components/BlockEditor/BlockEditor'
import EditLabel from '../Components/EditLabel'
import Localization from '../Components/Localization'
import V3RoundedSectionBlockFrame, {
  v3RoundedSectionTopPaddingClassName,
} from '../Components/V3RoundedSectionBlockFrame'
import V3RoundedTopToggle, {
  isV3RoundedTopEnabled,
  isV3TopOverlapEnabled,
} from '../Components/V3RoundedTopToggle'
import type { PageBuilderAction } from '../hooks/pageBuilderService'
import type { Block, BlockConfiguration, ItemListField, LinkData, TextData } from '../page_interfaces'

type EnquiryKey =
  | 'general_enquiries'
  | 'partner_enquiries'
  | 'investor_enquiries'
  | 'career_enquiries'
  | 'support'
  | 'other'

type RequiredFieldKey = 'name' | 'email' | 'phone' | 'message'

const enquiryOptions: readonly { key: EnquiryKey; label: string }[] = [
  { key: 'general_enquiries', label: 'General' },
  { key: 'partner_enquiries', label: 'Partnership' },
  { key: 'investor_enquiries', label: 'Investment' },
  { key: 'career_enquiries', label: 'Careers' },
  { key: 'support', label: 'Support' },
  { key: 'other', label: 'Other' },
]

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: ContactUsBlockInterface
  language?: Language
  dispatch?: React.Dispatch<PageBuilderAction>
}

export interface ContactUsBlockInterface extends Block, BlockConfiguration {
  lineOne?: TextData
  lineTwo?: TextData
  lineThree?: TextData
  iframe?: TextData
  phone?: TextData
  email?: TextData
  eyebrow?: TextData
  overlapTop?: TextData
  roundedTop?: TextData
  title?: TextData
  titleOne?: TextData
  titleTwo?: TextData
  mailSubject?: TextData
  receiverMail?: TextData
  description?: ItemListField<TextData>
  twitter?: LinkData
  facebook?: LinkData
  instagram?: LinkData
}

const fieldClass =
  'w-full rounded-xl border border-neutral-200 bg-spontaine-surface-paper px-4 py-3 font-body text-[15px] text-spontaine-text-primary shadow-sm transition-colors placeholder:text-spontaine-gray-cool focus:border-spontaine-accent focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0'

const ContactUS = ({
  editMode = false,
  onFieldEdit,
  blockData,
  language = 'en',
  dispatch,
}: Properties) => {
  const [formError, setFormError] = React.useState<string | null>(null)
  const [missingFields, setMissingFields] = React.useState<
    Partial<Record<RequiredFieldKey, boolean>>
  >({})
  const { formData, setFormValue } = useCustomForm({
    name: '',
    email: '',
    phone: '',
    message: '',
    privacy_policy: false,
    general_enquiries: false,
    partner_enquiries: false,
    investor_enquiries: false,
    career_enquiries: false,
    support: false,
    other: false,
  })

  const { post, loading } = useInertiaPost('/send-contact-mail', {
    showErrorToast: true,
    preserveState: false,
    preserveScroll: true,
  })
  const hasRoundedTop = isV3RoundedTopEnabled(blockData?.roundedTop, language)
  const hasTopOverlap = isV3TopOverlapEnabled(blockData?.overlapTop, language)
  const sectionPaddingClass = hasRoundedTop
    ? `${v3RoundedSectionTopPaddingClassName} pb-16 md:pb-20 lg:pb-24`
    : `py-16 md:py-20 lg:py-24 ${blockData?.paddingTop}`

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const nextMissingFields: Partial<Record<RequiredFieldKey, boolean>> = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      phone: !formData.phone.trim(),
      message: !formData.message.trim(),
    }
    const hasMissingFields = Object.values(nextMissingFields).some(Boolean)

    if (hasMissingFields) {
      setMissingFields(nextMissingFields)
      setFormError('Please fill in all fields before submitting.')
      return
    }

    setMissingFields({})
    setFormError(null)

    post({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      privacy_policy: true,
      subject: blockData?.mailSubject?.english || 'Contact Form Submission',
      receiver_mail: blockData?.receiverMail?.english || 'desk@inboxfx.com',
      general_enquiries: formData.general_enquiries,
      partner_enquiries: formData.partner_enquiries,
      investor_enquiries: formData.investor_enquiries,
      career_enquiries: formData.career_enquiries,
      support: formData.support,
      other: formData.other,
    })
  }

  const setRequiredFieldValue = (field: RequiredFieldKey) => (value: string) => {
    if (formError) {
      setFormError(null)
    }
    if (missingFields[field]) {
      setMissingFields((previous) => ({
        ...previous,
        [field]: false,
      }))
    }
    setFormValue(field)(value)
  }

  const getFieldClass = (field: RequiredFieldKey) =>
    missingFields[field]
      ? `${fieldClass} border-spontaine-error focus:border-spontaine-error`
      : fieldClass

  return (
    <V3RoundedSectionBlockFrame
      roundedTop={hasRoundedTop}
      overlapTop={hasTopOverlap}
      className={`relative w-full overflow-hidden bg-hero-wash ${sectionPaddingClass} ${blockData?.marginTop} ${blockData?.marginBottom} ${blockData?.paddingBottom}`}
      style={
        {
          '--PhoneInputCountryFlag-display': 'none',
          '--PhoneInputCountryIcon-display': 'none',
        } as React.CSSProperties
      }
    >
      {loading && (
        <div className='fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm'>
          <span className='sr-only'>Submitting contact form</span>
          <FullSpinner />
        </div>
      )}

      <div className='relative z-10 mx-auto grid w-full max-w-[1180px] items-start gap-10 px-[var(--space-shell-sm)] md:px-[var(--space-shell)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-16'>
        <div className='flex flex-col items-start'>
          <div className='mb-5'>
            <p className='eyebrow text-spontaine-gray-cool'>
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

          <div className='space-y-3'>
            <h2 className='font-display text-4xl font-bold leading-[0.95] tracking-[-0.06em] text-spontaine-text-primary md:text-5xl'>
              <strong className='block font-bold leading-[inherit] tracking-[inherit] text-[inherit]'>
                <Localization
                  language={language}
                  text={
                    blockData?.title || {
                      english: 'Send a message.',
                      malayalam: 'Send a message.',
                    }
                  }
                />
              </strong>
              <strong className='block font-bold leading-[inherit] tracking-[inherit] text-[inherit] text-spontaine-text-accent-dark'>
                A person reads every one.
              </strong>
            </h2>

            {editMode && onFieldEdit && (
              <EditLabel
                label='Edit Title'
                onClick={() =>
                  onFieldEdit({
                    action: 'INSERT',
                    field: 'title',
                    fieldType: 'text',
                    oldValue: blockData?.title,
                  })
                }
              />
            )}
          </div>

          <div className='mt-6 max-w-[420px] space-y-2 font-body text-base leading-[1.52] text-spontaine-text-secondary'>
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
                No ticket queue, no auto-reply. Tell us what you&apos;re working on and someone from
                the team gets back to you directly.
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

        <form
          onSubmit={onSubmit}
          className='w-full rounded-3xl bg-spontaine-surface-paper/70 p-6 shadow-card-lift backdrop-blur-md md:p-8'
        >
          <div className='grid gap-5 sm:grid-cols-2'>
            <div>
              <label
                htmlFor='contact-name'
                className='mb-2 block font-body text-[13px] font-semibold text-spontaine-text-primary'
              >
                Name
              </label>
              <Input
                id='contact-name'
                type='text'
                placeholder='Your name'
                value={formData.name}
                onChange={(e) => setRequiredFieldValue('name')(e.target.value)}
                className={getFieldClass('name')}
              />
            </div>

            <div>
              <label
                htmlFor='contact-email'
                className='mb-2 block font-body text-[13px] font-semibold text-spontaine-text-primary'
              >
                Email
              </label>
              <Input
                id='contact-email'
                type='email'
                placeholder='you@company.com'
                value={formData.email}
                onChange={(e) => setRequiredFieldValue('email')(e.target.value)}
                className={getFieldClass('email')}
              />
            </div>

            <div className='sm:col-span-2'>
              <label className='mb-2 block font-body text-[13px] font-semibold text-spontaine-text-primary'>
                Phone number
              </label>
              <PhoneInput
                placeholder='Phone number'
                value={formData.phone}
                onChange={(value) => setRequiredFieldValue('phone')(value || '')}
                defaultCountry='IN'
                international
                countryCallingCodeEditable={false}
                countrySelectComponent={({ value, onChange, options }) => (
                  <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`${getFieldClass('phone')} h-12 w-[92px] flex-none px-2`}
                  >
                    {options.map(({ value, label }: { value: string; label: string }) => (
                      <option
                        key={value}
                        value={value}
                      >
                        {label}
                      </option>
                    ))}
                  </select>
                )}
                numberInputProps={{
                  className: getFieldClass('phone'),
                }}
                className='flex w-full gap-2'
              />
            </div>

            <div className='sm:col-span-2'>
              <label
                htmlFor='contact-message'
                className='mb-2 block font-body text-[13px] font-semibold text-spontaine-text-primary'
              >
                How can we help?
              </label>
              <Textarea
                id='contact-message'
                rows={4}
                placeholder="Tell us what you're working on..."
                value={formData.message}
                onChange={(e) => setRequiredFieldValue('message')(e.target.value)}
                className={`${getFieldClass('message')} resize-none`}
              />
            </div>

            <div className='sm:col-span-2'>
              <p className='mb-3 font-body text-[13px] font-semibold text-spontaine-text-primary'>
                What&apos;s this about?
              </p>
              <div className='flex flex-wrap gap-2'>
                {enquiryOptions.map((option) => {
                  const isActive = Boolean(formData[option.key])

                  return (
                    <button
                      key={option.key}
                      type='button'
                      aria-pressed={isActive}
                      onClick={() => setFormValue(option.key)(!isActive)}
                      className={
                        isActive
                          ? 'rounded-[var(--radius-pill)] bg-spontaine-accent-soft/30 px-4 py-2 font-body text-[13px] font-medium text-spontaine-accent-dark transition-colors'
                          : 'rounded-[var(--radius-pill)] border border-spontaine-border-subtle bg-spontaine-surface-paper px-4 py-2 font-body text-[13px] font-medium text-spontaine-text-primary transition-colors hover:border-spontaine-accent hover:text-spontaine-accent-dark'
                      }
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {formError && (
            <p
              role='alert'
              className='mt-5 rounded-xl px-4 py-3 font-body text-sm font-medium text-spontaine-error'
            >
              {formError}
            </p>
          )}

          <div className='mt-7'>
            <Button
              type='submit'
              variant='v3Primary'
              size='v3Hero'
              className='w-full sm:w-auto'
              disabled={loading}
            >
              Send to the founders
            </Button>
          </div>
          <p className='mt-4 font-mono text-[11.5px] text-spontaine-gray-cool'>
            We reply within one business day.
          </p>
        </form>

        {editMode && (onFieldEdit || dispatch) && (
          <div className='rounded-lg bg-spontaine-surface-paper p-4 shadow-surface lg:col-span-2'>
            <div className='flex flex-wrap gap-4'>
              {onFieldEdit && (
                <>
                  <div className='flex items-center gap-2'>
                    <p className='m-0 text-sm font-medium text-spontaine-text-primary'>
                      Mail Subject:
                    </p>
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
                    <p className='m-0 text-sm font-medium text-spontaine-text-primary'>
                      Receiver Email:
                    </p>
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
                  <p className='m-0 text-sm font-medium text-spontaine-text-primary'>
                    Section Shape:
                  </p>
                  <V3RoundedTopToggle
                    blockId={blockData.id}
                    dispatch={dispatch}
                    language={language}
                    overlapTop={blockData.overlapTop}
                    roundedTop={blockData.roundedTop}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </V3RoundedSectionBlockFrame>
  )
}

export default ContactUS
