import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/CustomUI/FormFields/InputOtp'
import { Button } from '@/components/ui/button'
import useCustomForm from '@/hooks/useCustomForm'
import useInertiaPost from '@/hooks/useInertiaPost'
import AppLayout from '@/Layouts/AppLayout'
import GuestLayout from '@/Layouts/GuestLayout'
import ErrorText from '@/typography/ErrorText'
import NormalText from '@/typography/NormalText'
import Paragraph from '@/typography/Paragraph'
import StrongText from '@/typography/StrongText'
import { router } from '@inertiajs/react'
import { AnimatePresence, motion } from 'framer-motion'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { CheckCircle2, XCircle } from 'lucide-react'
import { FormEvent, useCallback, useEffect, useState } from 'react'

interface Props {
  customerId: string
  verifyingEmail: boolean
  submitUrl?: string
}

const OtpPage = ({ customerId, verifyingEmail, submitUrl }: Props) => {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [sentOtp, setSentOtp] = useState(30)
  const { formData, setFormValue } = useCustomForm({
    otp: '',
    customerId: customerId,
    verifyingEmail: verifyingEmail,
  })

  const { post } = useInertiaPost(submitUrl || route('validate-otp'), {
    onComplete: () => {
      setSuccess(true)
      setError(null)
    },
    onError: () => {
      setError('The secret key you have entered is incorrect.')
      setCountdown(30)
      setSentOtp(30)
    },
  })

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [countdown])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (sentOtp > 0) {
      timer = setInterval(() => {
        setSentOtp((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [sentOtp])

  const onFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      post(formData)
    },
    [formData, post]
  )

  const handleOtpChange = (value: string) => {
    setFormValue('otp')(value)
    setError(null)
  }

  const regenerateOtp = () => {
    router.get(
      route('customer-verification', { customerId: customerId, verifyingEmail: verifyingEmail })
    )
  }

  return (
    <AppLayout>
      <GuestLayout>
        <div className='flex items-center justify-center'>
          <form
            className='flex flex-col items-center gap-2 rounded-xl p-4'
            onSubmit={onFormSubmit}
          >
            <StrongText className=''>One Time Use Key</StrongText>
            <NormalText className='mb-2'>
              A one time secret key has been sent you your email. Please enter it here to proceed.
            </NormalText>

            <AnimatePresence mode='wait'>
              {success ? (
                <motion.div
                  key='success'
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className='flex flex-col items-center gap-2'
                >
                  <CheckCircle2 className='h-12 w-12 text-green-600' />
                  <Paragraph className='text-green-600'>
                    One time use key verified successfully!
                  </Paragraph>
                </motion.div>
              ) : (
                <motion.div
                  key='form'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className='flex flex-col items-center gap-2'
                >
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

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className='mt-2 flex items-center gap-2'
                      >
                        <XCircle className='h-5 w-5 text-highlight-500' />
                        <ErrorText>
                          {`${error}${countdown > 0 ? ` You can retry in ${countdown} seconds` : ''}`}
                        </ErrorText>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div
                    onClick={sentOtp === 0 ? regenerateOtp : undefined}
                    className={`cursor-pointer text-xs ${sentOtp === 0 ? 'text-blue-900 hover:underline' : 'text-gray-400'} `}
                  >
                    Regenerate One Time Secret Key
                  </div>
                  <Button
                    type='submit'
                    className='mt-4'
                    disabled={countdown > 0}
                  >
                    {countdown > 0 ? `Retry in ${countdown}s` : 'Submit'}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </GuestLayout>
    </AppLayout>
  )
}

export default OtpPage
