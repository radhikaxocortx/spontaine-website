import LaravelInputError from '@/Components/LaravelInputError'
import LaravelInputLabel from '@/Components/LaravelInputLabel'
import LaravelPrimaryButton from '@/Components/LaravelPrimaryButton'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'
import LaravelTextInput from '@/Components/LaravelTextInput'

export default function ResetPassword({
                                          token,
                                          email,
                                      }: {
    token: string;
    email: string;
}) {
    
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        })
    }

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <form onSubmit={submit}>
                <div>
                    <LaravelInputLabel htmlFor="email" value="Email" />

                    <LaravelTextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <LaravelInputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <LaravelInputLabel htmlFor="password" value="Password" />

                    <LaravelTextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <LaravelInputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <LaravelInputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />
                    <LaravelTextInput
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />

                    <LaravelInputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <LaravelPrimaryButton className="ms-4" disabled={processing}>
                        Reset Password
                    </LaravelPrimaryButton>
                </div>
            </form>
        </GuestLayout>
    )
}
