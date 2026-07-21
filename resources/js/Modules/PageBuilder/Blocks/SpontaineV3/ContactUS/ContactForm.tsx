import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { enquiryOptions } from './types'
import type { ContactFormState } from './useContactFormState'

interface ContactFormProps {
  formState: ContactFormState
}

const ContactForm = ({ formState }: ContactFormProps) => {
  const {
    formData,
    formError,
    getFieldClass,
    loading,
    onSubmit,
    setFormValue,
    setRequiredFieldValue,
  } = formState

  return (
    <form
      data-v3-contact-reveal
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
  )
}

export default ContactForm
