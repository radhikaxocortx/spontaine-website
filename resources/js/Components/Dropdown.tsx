import { PropsWithChildren, useState } from 'react';


const Dropdown = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <div className="relative">{children}</div>
    );
};

export default Dropdown;
