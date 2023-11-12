import { Field } from "./Field";
import {
    emailValidation, telValidation,
    fullNameValidation, passwordValidation,
    siteValidation
} from "../utils/validation";
import { useState, useEffect } from "react";
interface IForm extends React.PropsWithChildren {

}

export const Form: React.FC<IForm> = ({ children }) => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [msgStatusStyle, setMsgStatusStyle] = useState('border-gray-400 bg-white text-black');
    const [msgStatus, setMsgStatus] = useState('Don\'t rush :)');
    const handleFieldValueChange = (id: string, value: string) => {
        setFormData((prevFormData: any) => ({ ...prevFormData, [id]: value }));
    }
    useEffect(() => { }, [msgStatus, msgStatusStyle]);
    const isValidated = () => {
        let isAllFieldsValid = true;

        Object.entries(formData).forEach(([fieldName, fieldValue]) => {
            switch (fieldName) {
                case 'password':
                    if (!passwordValidation(fieldValue)) {
                        isAllFieldsValid = false;
                        break;
                    }
                    break;
                case 'confirm-password':
                    if (!confirmedPasswordValidation(fieldValue)) {
                        isAllFieldsValid = false;
                        break;
                    }
                    break;
                case 'full-name':
                    if (!fullNameValidation(fieldValue)) {
                        isAllFieldsValid = false;
                        break;
                    }
                    break;
                case 'phone':
                    if (!telValidation(fieldValue)) {
                        isAllFieldsValid = false;
                        break;
                    }
                    break;
                case 'email':
                    if (!emailValidation(fieldValue)) {
                        isAllFieldsValid = false;
                        break;
                    }
                    break;
                case 'website-url':
                    if (!siteValidation(fieldValue)) {
                        isAllFieldsValid = false;
                        break;
                    }
                    break;
                default:
                // Handle other fields' validation if needed
            }
        });
        return isAllFieldsValid;

    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValidated()) {
            console.log("Form submitted with data:", formData);
            setMsgStatusStyle('border-green-400 bg-white text-green-400');
            setMsgStatus('All fields are valid!');
        } else {
            setMsgStatusStyle('border-red-500 bg-white text-red-500');
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
