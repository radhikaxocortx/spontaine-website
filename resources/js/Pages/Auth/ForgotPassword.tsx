import LaravelInputError from '@/components/LaravelInputError'
import LaravelPrimaryButton from '@/components/LaravelPrimaryButton'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'
import LaravelTextInput from '@/components/LaravelTextInput'

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('password.email'))
    }

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <LaravelTextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <LaravelInputError message={errors.email} className="mt-2" />

                <div className="mt-4 flex items-center justify-end">
                    <LaravelPrimaryButton className="ms-4" disabled={processing}>
                        Email Password Reset Link
                    </LaravelPrimaryButton>
                </div>
            </form>
        </GuestLayout>
    )
}
