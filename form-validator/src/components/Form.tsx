import { Field } from "./Field";
import {
    emailValidation, telValidation,
    fullNameValidation, passwordValidation,
    siteValidation,
} from "../utils/validation";
import { useState, useEffect } from "react";


const validation = {
    'password': passwordValidation,
    'full-name': fullNameValidation,
    'phone-number': telValidation,
    'email': emailValidation,
    'website-url': siteValidation,
}

export const Form: React.FC = () => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [msgStatusStyle, setMsgStatusStyle] = useState('border-gray-400 bg-white text-black');
    const [msgStatus, setMsgStatus] = useState('Don\'t rush :)');
    const handleFieldValueChange = (id: string, value: string) => {
        setFormData((prevFormData: any) => ({ ...prevFormData, [id]: value }));
    }
    useEffect(() => { }, [msgStatus, msgStatusStyle]);
    const isValidated = () => {
        let isAllFieldsValid = true;

        Object.keys(formData).forEach((fieldName) => {
            if (validation[fieldName as keyof typeof validation]) {
                const fieldValue = formData[fieldName];
                if (!validation[fieldName as keyof typeof validation](fieldValue)) {
                    isAllFieldsValid = false;
                }
            }
        });
        return isAllFieldsValid;
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValidated()) {
            console.log("Form submitted with data:", formData);
            setMsgStatusStyle('border-green-400 bg-white text-green-600');
            setMsgStatus('All fields are valid!');
        } else {
            setMsgStatusStyle('border-red-500 bg-white text-red-700');
            setMsgStatus('Invalid input in one or more fields.');
        }
    };

    const confirmedPasswordValidation = (value: string) => {
        return formData['password'] === value;
    }

    return (
        <form onSubmit={handleSubmit}>
            <Field onFieldChange={handleFieldValueChange} inputValidation={fullNameValidation} placeholder='Full Name' id='full-name' type='text'>Full Name</Field>
            <Field onFieldChange={handleFieldValueChange} inputValidation={telValidation} placeholder='555-555-5555' id='phone-number' type='tel'>Phone Number</Field>
            <Field onFieldChange={handleFieldValueChange} inputValidation={emailValidation} placeholder='user@email.com' id='email-address' type='email'>Email Address</Field>
            <Field onFieldChange={handleFieldValueChange} inputValidation={siteValidation} placeholder='https://site.com' id='website-url' type='url'>Website URL</Field>
            <Field onFieldChange={handleFieldValueChange} inputValidation={passwordValidation} placeholder='Create password (Min. 8 character)' id='password' type='password'>Password</Field>
            <Field onFieldChange={handleFieldValueChange} inputValidation={confirmedPasswordValidation} placeholder='Confirm Password' id='confirm-password' type='password'>Confirm Password</Field>
            <button className="p-3 my-3 w-full text-2xl font-bold text-white bg-black rounded-md h-17" type="submit">Register</button>
            <div className={`flex justify-center items-center p-3 border-4 rounded-md text-lg ${msgStatusStyle}`}>{msgStatus}</div>
        </form >
    )
};
