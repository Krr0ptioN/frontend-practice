import React, { useState } from "react";

interface IFieldProps extends React.PropsWithChildren {
    placeholder: string;
    id: string;
    type: string;
    onFieldChange: (id: string, value: string) => void;
    inputValidation?: (value: string) => boolean | undefined;
}

export const Field: React.FC<IFieldProps> = ({ type, id, placeholder, children, onFieldChange, inputValidation }) => {
    const [value, setValue] = useState('');
    const [borderColor, setBorderColor] = useState('ring-gray-400 focus:ring-gray-700');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        setValue(newValue);
        onFieldChange(id, newValue);
        if (inputValidation !== undefined) {
            if (inputValidation(newValue)) {
                setBorderColor('ring-green-400');
            } else {
                setBorderColor('ring-red-400');
            }
        }
    }
    return (<div className='w-full'>
        <label htmlFor={id} className='w-full text-lg font-semibold' >{children} </label>
        <input id={id} value={value} onChange={handleInputChange} type={type} className={`rounded-md p-4 my-2 w-full ring-2 h-10 ${borderColor}`} placeholder={placeholder} />
    </div >);
}
