import LaravelDangerButton from '@/Components/LaravelDangerButton'
import LaravelInputError from '@/Components/LaravelInputError'
import LaravelInputLabel from '@/Components/LaravelInputLabel'
import LaravelModal from '@/Components/LaravelModal'
import LaravelSecondaryButton from '@/Components/LaravelSecondaryButton'
import { useForm } from '@inertiajs/react'
import { FormEventHandler, useRef, useState } from 'react'
import LaravelTextInput from '@/Components/LaravelTextInput'

export default function DeleteUserForm({
                                           className = '',
                                       }: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false)
    const passwordInput = useRef<HTMLInputElement>(null)

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    })

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true)
    }

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault()

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        })
    }

    const closeModal = () => {
        setConfirmingUserDeletion(false)

        clearErrors()
        reset()
    }

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Delete Account
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <LaravelDangerButton onClick={confirmUserDeletion}>
                Delete Account
            </LaravelDangerButton>

            <LaravelModal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </p>

                    <div className="mt-6">
                        <LaravelInputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <LaravelTextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <LaravelInputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <LaravelSecondaryButton onClick={closeModal}>
                            Cancel
                        </LaravelSecondaryButton>

                        <LaravelDangerButton className="ms-3" disabled={processing}>
                            Delete Account
                        </LaravelDangerButton>
                    </div>
                </form>
            </LaravelModal>
        </section>
    )
}
