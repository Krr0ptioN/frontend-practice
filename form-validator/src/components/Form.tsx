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
    return (
        <form onSubmit={handleSubmit}>
            <Field onFieldChange={handleFieldValueChange} placeholder='Full Name' id='full-name' type='text'>Full Name</Field>
            <Field onFieldChange={handleFieldValueChange} placeholder='555-555-5555' id='phone-number' type='tel'>Phone Number</Field>
            <Field onFieldChange={handleFieldValueChange} placeholder='user@email.com' id='email-address' type='email'>Email Address</Field>
            <Field onFieldChange={handleFieldValueChange} placeholder='https://site.com' id='website-url' type='url'>Website URL</Field>
            <Field onFieldChange={handleFieldValueChange} placeholder='Create password (Min. 8 character)' id='password' type='password'>Password</Field>
            <Field onFieldChange={handleFieldValueChange} placeholder='Confirm Password' id='confirm-password' type='password'>Confirm Password</Field>
            <button type="submit">Submit</button>
        </form>
    )
};
