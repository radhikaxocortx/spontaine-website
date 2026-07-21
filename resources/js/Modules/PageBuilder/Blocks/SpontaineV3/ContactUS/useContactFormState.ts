import React from 'react'
import useCustomForm from '../../../../../hooks/useCustomForm'
import useInertiaPost from '../../../../../hooks/useInertiaPost'
import { fieldClass, type ContactUsBlockInterface, type RequiredFieldKey } from './types'

export const useContactFormState = (blockData?: ContactUsBlockInterface) => {
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

  return {
    formData,
    formError,
    getFieldClass,
    loading,
    onSubmit,
    setFormValue,
    setRequiredFieldValue,
  }
}

export type ContactFormState = ReturnType<typeof useContactFormState>
