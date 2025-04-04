import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import GuestLayout from '@/Layouts/GuestLayout'
import StrongText from '@/typography/StrongText'
import { Link, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'

interface Props {
  status?: string
  canResetPassword: boolean
}

export default function CustomerrLoginForm({ status, canResetPassword }: Readonly<Props>) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false as boolean,
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('validate-customer'), {
      onFinish: () => reset('password'),
    })
  }

  return (
    <GuestLayout>
      <div className='items-center justify-center p-4'>
        <StrongText className='items-center'>CUSTOMER LOGIN</StrongText>
      </div>
      {status && <div className='mb-4 text-sm font-medium text-green-600'>{status}</div>}
      <form
        onSubmit={submit}
        className='space-y-4'
      >
        <div>
          <StrongText>Email</StrongText>
          <Input
            id='email'
            type='email'
            name='email'
            value={data.email}
            autoComplete='username'
            autoFocus
            onChange={(e) => setData('email', e.target.value)}
          />
          {errors.email && <p className='text-sm text-red-600'>{errors.email}</p>}
        </div>

        <div>
          <StrongText>Password</StrongText>
          <Input
            id='password'
            type='password'
            name='password'
            value={data.password}
            autoComplete='current-password'
            onChange={(e) => setData('password', e.target.value)}
          />
          {errors.password && <p className='text-sm text-red-600'>{errors.password}</p>}
        </div>

        <div className='flex items-center gap-2'>
          <Checkbox
            id='remember'
            checked={data.remember}
            onCheckedChange={(checked) => setData('remember', checked as boolean)}
          />
          <StrongText>Remember me</StrongText>
        </div>

        <div className='flex items-center justify-end'>
          {canResetPassword && (
            <Link
              href={route('password.request')}
              className='text-sm text-gray-600 underline hover:text-gray-900'
            >
              Forgot your password?
            </Link>
          )}

          <Button
            type='submit'
            className='ml-4'
            disabled={processing}
          >
            <Link href=''> Log in</Link>
          </Button>
        </div>
      </form>
    </GuestLayout>
  )
}
