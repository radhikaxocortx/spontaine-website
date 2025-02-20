import LaravelInputError from '@/Components/LaravelInputError'
import LaravelInputLabel from '@/Components/LaravelInputLabel'
import LaravelPrimaryButton from '@/Components/LaravelPrimaryButton'
import { useForm } from '@inertiajs/react'
import { FormEventHandler, useRef } from 'react'
import LaravelTextInput from '@/Components/LaravelTextInput'


export default function UpdatePasswordForm({
                                               className = '',
                                           }: {
    className?: string;
}) {
    const passwordInput = useRef<HTMLInputElement>(null)
    const currentPasswordInput = useRef<HTMLInputElement>(null)

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    })

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault()

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation')
                    passwordInput.current?.focus()
                }

                if (errors.current_password) {
                    reset('current_password')
                    currentPasswordInput.current?.focus()
                }
            },
        })
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <LaravelInputLabel
                        htmlFor="current_password"
                        value="Current Password"
                    />

                    <LaravelTextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                    />

                    <LaravelInputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                <div>
                    <LaravelInputLabel htmlFor="password" value="New Password" />

                    <LaravelTextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <LaravelInputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <LaravelInputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <LaravelTextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <LaravelInputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <LaravelPrimaryButton disabled={processing}>Save</LaravelPrimaryButton>
                    <p className="text-sm text-gray-600">
                        Saved.
                    </p>
                </div>
            </form>
        </section>
    )
}
