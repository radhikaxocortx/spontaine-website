import LaravelInputError from '@/Components/LaravelInputError'
import LaravelInputLabel from '@/Components/LaravelInputLabel'
import LaravelPrimaryButton from '@/Components/LaravelPrimaryButton'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'
import LaravelTextInput from '@/Components/LaravelTextInput'

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        })
    }

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="mb-4 text-sm text-gray-600">
                This is a secure area of the application. Please confirm your
                password before continuing.
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <LaravelInputLabel htmlFor="password" value="Password" />
                    <LaravelTextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <LaravelInputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <LaravelPrimaryButton className="ms-4" disabled={processing}>
                        Confirm
                    </LaravelPrimaryButton>
                </div>
            </form>
        </GuestLayout>
    )
}
