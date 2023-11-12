import React, { useState } from "react";

interface IFieldProps extends React.PropsWithChildren {
    placeholder: string;
    id: string;
    type: string;
    onFieldChange: (id: string, value: string) => void;
}

export const Field: React.FC<IFieldProps> = ({ type, id, placeholder, children, onFieldChange }) => {
    const [value, setValue] = useState('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        onFieldChange(id, newValue)
    }
    return (<div className='w-full'>
        <label htmlFor={id} className='w-full text-lg' >{children} </label>
        <input id={id} value={value} onChange={handleInputChange} type={type} className='p-4 my-2 w-full h-10 border-black' placeholder={placeholder} />
    </div >);
}
