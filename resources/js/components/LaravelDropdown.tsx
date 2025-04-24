import { PropsWithChildren, useState } from 'react'


const LaravelDropdown = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState(false)

    const toggleOpen = () => {
        setOpen((previousState) => !previousState)
    }

    return (
        <div className="relative">{children}</div>
    )
}

export default LaravelDropdown
