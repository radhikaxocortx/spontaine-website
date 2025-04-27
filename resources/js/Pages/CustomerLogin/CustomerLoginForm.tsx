import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import AppLayout from '@/Layouts/AppLayout'
import LargeText from '@/typography/LargeText'
import NormalText from '@/typography/NormalText'
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
    <AppLayout>
      <Card className='m-4'>
        <div className='grid grid-cols-1 rounded-xl md:grid-cols-2'>
          <div className='flex flex-1 flex-col gap-8 p-8 md:p-12 lg:p-16'>
            {/* Header */}
            <div className='gap-4'>
              <LargeText className='text-primary-950'>Sign In</LargeText>
              <br />
              <NormalText className='text-neutral-graige-700'>
                Sign in to your account to manage your business profile and verification.
              </NormalText>
            </div>

            {/* Form */}
            <div className='flex-1'>
              <div className=''>
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

                  <div className='flex w-full items-center justify-center'>
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
                      className='ml-4 w-full'
                      disabled={processing}
                      size='xl'
                    >
                      Sign in
                    </Button>
                  </div>
                </form>

                {/* Sign Up Link */}
                <div className='mt-1 text-center'>
                  <p className='text-sm text-gray-600'>
                    Don't have an account?{' '}
                    <Link
                      href={route('sign-up.create')}
                      className='font-medium text-primary-600 underline hover:text-primary-500'
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className='relative hidden h-full rounded-xl md:block'>
            <img
              src='/imge/login.png'
              alt='Login Process'
              className='absolute inset-0 h-full w-full rounded-r-xl object-cover object-center'
            />
            <div className='absolute inset-0 bg-black/10' />
          </div>
        </div>
      </Card>
    </AppLayout>
  )
}
