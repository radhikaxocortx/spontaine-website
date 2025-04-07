import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/Components/CustomUI/FormFields/InputOtp'
import { showError, showSuccess } from '@/Components/ui/alerts'
import { Button } from '@/components/ui/button'
import { LaravelFlash } from '@/Components/ui/ui_interfaces'
import useCustomForm from '@/hooks/useCustomForm'
import useInertiaPost from '@/hooks/useInertiaPost'
import StrongText from '@/typography/StrongText'
import { usePage } from '@inertiajs/react'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { FormEvent, useCallback, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

interface Props {
  customerId: string
}

const OtpPage = ({ customerId }: Props) => {
  const { flash } = usePage().props as unknown as { flash?: LaravelFlash }
  useEffect(() => {
    if (flash?.error != null) {
      showError(flash.error)
    }
    if (flash?.message != null) {
      showSuccess(flash.message)
    }
  }, [flash])

  const { formData, setFormValue } = useCustomForm({
    otp: '',
    customerId: customerId,
  })

  const { post } = useInertiaPost(route('validate-otp'))

  const onFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      console.log(formData)
      event.preventDefault()
      post(formData)
    },
    [post, formData]
  )

  const handleOtpChange = (value: string) => {
    setFormValue('otp')(value)
  }

  return (
    <>
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
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        toastClassName='toast-container'
      />
    </>
  )
}

export default OtpPage
