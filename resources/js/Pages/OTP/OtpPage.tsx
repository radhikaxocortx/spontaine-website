import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/Components/CustomUI/FormFields/InputOtp'
import { Button } from '@/components/ui/button'
import StrongText from '@/typography/StrongText'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import React from 'react'

const OtpPage = () => {
  const [value, setValue] = React.useState('')
  console.log(value)

  return (
    <div className='flex items-center justify-center'>
      <div className='flex flex-col items-center gap-4 rounded-xl p-4'>
        <StrongText className='mb-2'>Enter OTP</StrongText>
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          onChange={(value) => setValue(value)}
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
        <Button type='submit'>Submit</Button>
      </div>
    </div>
  )
}
export default OtpPage
