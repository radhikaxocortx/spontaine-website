import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/Components/CustomUI/FormFields/InputOtp'
import { Button } from '@/components/ui/button'
import useCustomForm from '@/hooks/useCustomForm'
import useInertiaPost from '@/hooks/useInertiaPost'
import GuestLayout from '@/Layouts/GuestLayout'
import StrongText from '@/typography/StrongText'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { FormEvent, useCallback } from 'react'

interface Props {
  customerId: string
}

const OtpPage = ({ customerId }: Props) => {
  const { formData, setFormValue } = useCustomForm({
    otp: '',
    customerId: customerId,
  })

  const { post } = useInertiaPost(route('validate-otp'))

  const onFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      post(formData)
    },
    [post, formData]
  )

  const handleOtpChange = (value: string) => {
    setFormValue('otp')(value)
  }

  return (
    <GuestLayout>
      <div className='flex items-center justify-center'>
        <form
          className='flex flex-col items-center gap-4 rounded-xl p-4'
          onSubmit={onFormSubmit}
        >
          <StrongText className='mb-2'>Enter OTP</StrongText>

          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            onChange={(value: string) => handleOtpChange(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <Button
            type='submit'
            className='mt-4'
          >
            Submit
          </Button>
        </form>
      </div>
    </GuestLayout>
  )
}

export default OtpPage
