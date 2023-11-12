import { Field } from "./Field";
import { useState } from "react";
interface IForm extends React.PropsWithChildren {

}

export const Form: React.FC<IForm> = ({ children }) => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const handleFieldValueChange = (id: string, value: string) => {
        setFormData((prevFormData: any) => ({ ...prevFormData, [id]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData['password'] === formData['confirm-password'])
            console.log("Form submitted with data:", formData);
        else
            console.log('Invalid password');
    };

    const passwordValidation = (value: string) => {
        return /^.{8,}$/.test(value);
    }
    const siteValidation = (value: string) => {
        const isValidURL = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
        return isValidURL.test(value);
    }

    const fullNameValidation = (value: string) => {
        return /^[A-Za-z\s\.'-]*$/.test(value);
    }
    const telValidation = (value: string) => {
        return /^\+?[0-9\s\-]+$/.test(value);
    }
    const emailValidation = (value: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

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
            <button type="submit">Submit</button>
        </form>
    )
};
