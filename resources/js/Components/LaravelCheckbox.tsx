import { InputHTMLAttributes } from 'react'

export default function LaravelCheckbox({
                                            className = '',
                                            ...props
                                        }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 ' +
                className
            }
        />
    )
}
